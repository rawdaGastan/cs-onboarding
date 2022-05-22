// calculate equation
  
const calc = (firstValue: number, operator:string, secondValue:number): number => {
    if (operator == "+"){
        return firstValue + secondValue;
    }
    else if (operator == "-"){
        return firstValue - secondValue;
    }
    else if (operator == "/"){
        return firstValue / secondValue;
    }
    else if (operator == "*"){
        return firstValue * secondValue;
    }
    else if (operator == "%"){
        return firstValue % secondValue;
    }
    else if (operator == "//"){
        return Math.round(firstValue / secondValue);
    }
    else if (operator == "^"){
        return firstValue ** secondValue;
    }
    return firstValue;
};


const generateString = (length: number): string => {

    // declare all characters
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};


export default { calc , generateString };
