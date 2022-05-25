<template>
 
  <div v-if="!logged" class="container">
  <h2 id="title">You are not allowed here <router-link to="/">Please click here to login</router-link></h2>
  </div>

  <div v-else class="container">
  <h1 id="title">Calculator</h1>
  <div class="calc-body">
    <div class="calc-screen">
      <div class="calc-operation">{{ display }}</div>
      <div class="calc-typed"> {{answer}}</div>
    </div>
    <div class="calc-button-row">
      <button class="button l" @click="operatorSelection('%')">%</button>
      <button class="button l" @click="operatorSelection('^')">^</button>
      <button class="button l" @click="operatorSelection('//')">//</button>
      <button class="button c" @click="clear()">C</button>
    </div>
    <div class="calc-button-row">
      <button class="button" @click="num(7)">7</button>
      <button class="button" @click="num(8)">8</button>
      <button class="button" @click="num(9)">9</button>
      <button class="button l" @click="operatorSelection('/')">/</button>
    </div>
    <div class="calc-button-row">
      <button class="button" @click="num(4)">4</button>
      <button class="button" @click="num(5)">5</button>
      <button class="button" @click="num(6)">6</button>
      <button class="button l" @click="operatorSelection('*')">x</button>
    </div>
    <div class="calc-button-row">
      <button class="button" @click="num(1)">1</button>
      <button class="button" @click="num(2)">2</button>
      <button class="button" @click="num(3)">3</button>
      <button class="button l" @click="operatorSelection('-')">-</button>
    </div>
    <div class="calc-button-row">
      <button class="button" @click="dot()">.</button>
      <button class="button" @click="num(0)">0</button>
      <button class="button c" @click="equals()">=</button>
      <button class="button l" @click="operatorSelection('+')">+</button>
    </div>
    </div>

    <button class="button c" style="width:50%; margin: 10%;" @click="logout()">Logout</button>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'calcOp',
  data() {
    return {
      logged: false,
      current: "",
      previous: "",
      operator: "",
      firstValue: "",
      secondValue: "",
      display: "",
      answer: ""
    };
  },
  methods: {
    sendCalculation(object) {
      axios
        .post("https://localhost:3000/calc", object)
        .then((response) => {
          console.log("Sent successfully answer: " + response.data);
          this.current = response.data.answer;
          this.answer = response.data.answer;
          console.table(response.data);
        })
        .catch((error) => {
          console.log("Failed to send with error: " + error);
        });
    },
    num(value) {
      this.current = this.current + "" + value;
      this.display = this.display + "" + value;
    },
    clear() {
      this.current = "";
      this.display = "";
      this.answer = "";
    },
    equals() {
      this.secondValue = this.current;
      const object = {
        firstValue: this.firstValue,
        operator: this.operator,
        secondValue: this.secondValue,
      };
      this.sendCalculation(object);
      //this.previous = this.current;
    },
    operatorSelection(operator) { 
      if(!(this.display.includes("+") || this.display.includes("/") || this.display.includes("-") 
      || this.display.includes("//") || this.display.includes("x") || this.display.includes("%"))){
          console.log(this.display)
          this.operator = operator;
          this.firstValue = this.current;
          this.current = "";
          
          if (operator == "*"){
            this.display = this.display + " x ";
          }
          else{
            this.display = this.display + " " + operator + " ";
          }
      }
      
    },
    dot() {
      if (!this.current.includes(".")) {
        this.current = this.current + ".";
        this.display = this.display + ".";
      }
    },
    logout() {
      axios
        .get("https://localhost:3000/logout")
        .then((response) => {
          console.log("Sent successfully logout: " + response.data);
          window.location.href = response.data.replaceAll(" ", "");
        })
        .catch((error) => {
          console.log("Failed to send with error: " + error);
        });
    },
  },
  beforeMount(){
    axios
        .get("https://localhost:3000/verify")
        .then((response) => {
          console.log("Sent successfully verify: " + response.data);
          this.logged = response.data
        })
        .catch((error) => {
          console.log("Failed to send with error: " + error);
          this.logged = false
        });
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

body {
  background: #EAEBEC;
}

.container {
  width: 600px;
  margin: auto;
}

.calc-body {
  width: 405px;
  margin: auto;
  min-height: 400px;
  border: solid 1px #3A4655;
  box-shadow: 0 8px 50px -17px black;
}

.calc-screen {
  background: #3A4655;
  width: 100%;
  height: 150px;
  padding: 20px;
}

.calc-operation {
  text-align: right;
  color: #727B86;
  font-size: 21px;
  padding-bottom: 10px;
  border-bottom: dotted 1px;
}

.calc-typed {
  margin-top: 20px;
  font-size: 45px;
  text-align: right;
  color: #fff;
}

.calc-button-row {
  width: 100%;
  background: #3C4857;
}

.button {
  width: 25%;
  background: #425062;
  color: #fff;
  padding: 20px;
  display: inline-block;
  font-size: 25px;
  text-align: center;
  vertical-align: middle;
  border-right: solid 2px #3C4857;
  border-bottom: solid 2px #3C4857;
  transition: all 0.2s ease-in-out;
}

.button.l {
  color: #AEB3BA;
  background: #404D5E;
}

.button.c {
  color: #D95D4E;
  background: #404D5E;
}

.button:hover {
  background: #E0B612;
  transform: rotate(5deg);
}

.button.c:hover,
.button.l:hover {
  background: #E0B612;
  color: #fff;
}

</style>
