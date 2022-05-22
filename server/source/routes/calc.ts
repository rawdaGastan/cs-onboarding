import express from 'express';
import controller from '../controllers/calc';
import nacl from 'tweetnacl';
import nacl_util from 'tweetnacl-util';
import "express-session";

const axios = require('axios');
const router = express.Router();

var session = require('express-session');
var cookieParser = require('cookie-parser');

router.use(session({
        secret: "eaifgneaifiea30r3jafeaofoeakfoeak",
        resave: false,
        saveUninitialized: true,
        cookie: { 
            secure: false,
            //maxAge: 24*60*60*1000000000 //1 minute
       } 
    }));
router.use(cookieParser());

router.post('/calc', (req, res, next) => {
    const firstValue: number = req.body.firstValue;
    const operator: string = req.body.operator;
    const secondValue: number = req.body.secondValue;

    const result: number = controller.calc(firstValue, operator, secondValue);

    res.send({ answer: result });
});
//router.post('/calculate', controller.calculate);

// auth

const REDIRECT_URL = "https://login.threefold.me/"
const CALLBACK_URL = "/3bot_callback"
const LOGIN_URL = "/login"

const keys = nacl.box.keyPair()
const public_key = keys["publicKey"];
const private_key = keys["secretKey"];


router.get('/login', (req, res, next) => {

    //next_url = quote(request.query.get("next_url", session.get("next_url", "/")))
    const state = controller.generateString(20);

    //session["next_url"] = next_url
    session.state = state;       

    var app_id = "";
    if(req.headers["host"] != undefined)
        app_id = req.headers["host"];

    const params = {
        "state": state,
        "appid": app_id,
        "scope": JSON.stringify({"user": true, "email": true}),
        "redirecturl": CALLBACK_URL,
        "publickey": nacl_util.encodeBase64(public_key),
    }
    var encoded_params = Object.entries(params).map(
        function([key, value]) {
            if (key == "state")
                return key + '=' + value
            else
                return key + '=' + encodeURIComponent(value)
        } 
    ).join('&')

    //redirect(f"{REDIRECT_URL}?{params}", code=302)
    var redirect_url = REDIRECT_URL+"?"+encoded_params;
        
    res.status(200).send(redirect_url);
    //next();
});

router.get('/3bot_callback', async (req, res, next) => {

    //session = request.environ.get("beaker.session")
    
    var data = req.query["signedAttempt"];
    if (typeof data == 'string')
            data = JSON.parse(data);

    if (!data){
        res.status(400).send("signedAttempt parameter is missing");
    }

    else{
        if (data && !data.hasOwnProperty('signedAttempt')){
            res.status(400).send("signedAttempt value is missing");
        }

        var username = (data as { [key: string]: any })["doubleName"] as string;

        if (!username){
            res.status(400).send("DoubleName is missing");
        }
        
        var response = await axios.get("https://login.threefold.me/api/users/"+username, {"Content-Type": "application/json"})
        if (response.status != 200){
            res.status(400).send("Error getting user pub key");
        }
        
        const pub_key = response.data.publicKey;

        var user_pub_key = nacl_util.decodeBase64(pub_key);//nacl.verify(nacl_util.decodeBase64(pub_key), public_key);
        
        // verify data
        var signedData = (data as { [key: string]: any })["signedAttempt"] as string;

        var verifiedData = nacl_util.encodeUTF8(nacl.sign.open(nacl_util.decodeBase64(signedData), user_pub_key)!);

        data = JSON.parse(verifiedData)

        if (data && !data.hasOwnProperty('doubleName')){
            res.status(400).send("Decrypted data does not contain (doubleName)");
        }

        if (data && !data.hasOwnProperty('signedState')){
            res.status(400).send("Decrypted data does not contain (state)");
        }

        var verified_username = (data as { [key: string]: any })["doubleName"] as string;
        if (data && verified_username != username){
            res.status(400).send("username mismatch!");
        }

        // verify state
        var state = (data as { [key: string]: any })["signedState"] as string;
        var sess_state = session.state;
        if (state != sess_state.replaceAll(" ", "")){
            res.status(400).send("Invalid state. not matching one in user session");
        }

        console.log(state)
        console.log(sess_state)        

        var nonce = (data as { [key: string]: any })["data"]["nonce"] as string;
        var ciphertext = (data as { [key: string]: any })["data"]["ciphertext"] as string;
        
        /*
        priv = j.core.identity.me.nacl.private_key
        box = Box(priv, user_pub_key.to_curve25519_public_key())
        decrypted = box.decrypt(ciphertext, nonce)
        */

        
        try{
            var decrypted = nacl.box.open(nacl_util.decodeBase64(ciphertext), nacl_util.decodeBase64(nonce), user_pub_key, private_key)
            console.log(nonce);
            console.log(nacl_util.encodeBase64(user_pub_key));
            console.log(nacl_util.encodeBase64(public_key));
            console.log(nacl_util.encodeBase64(private_key));
            console.log(decrypted);
        }

        catch {
            res.status(400).send("Error decrypting data");
            next();
        }

        
        /*

        try{
            var result = JSON.parse(nacl_util.encodeUTF8(decrypted));
        }

        catch (JSONDecodeError){
            res.status(400).send("3Bot login returned faulty data");
            next();
        }

        if (!result.hasOwnProperty('email')){
            res.status(400).send("Email is not present in data");
            next();
        }

        var email = result["email"]["email"]

        var sei = result["email"]["sei"]
        var response2 = await axios.post(
            "https://openkyc.live/verification/verify-sei",
            {
                headers:{"Content-Type": "application/json"},
                json:{"signedEmailIdentifier": sei},
            }
        )

        if (response2.status_code != 200){
            var next_url = req.query["next_url"] = "/logout"

            res.status(200).send(next_url);
            next();
        }

        username = username.toLowerCase(); 
        /* 
        session["username"] = username
        session["email"] = email
        session["authorized"] = true
        session["signedAttempt"] = signedData
        */

        res.status(200).redirect("http://localhost:8080/calc");
        
    }

});


router.get('/logout', (req, res, next) => {

    session.state = "";

    res.status(200).send("http://localhost:8080/");
});

export = router;