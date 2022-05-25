<script>
	export let logged = false;
	export let  current = "";
	export let  op = "";
	export let  firstValue = "";
	export let  secondValue = "";
	export let  display = "";
	export let  answer = "";

	import { onMount } from 'svelte';
	onMount(async () => {
		axios
        .get("https://localhost:3000/verify")
        .then((response) => {
          console.log("Sent successfully verify: " + response.data);
          logged = response.data
        })
        .catch((error) => {
          console.log("Failed to send with error: " + error);
          logged = false
        });
	});

	import axios from "axios";
  import {Link} from "svelte-routing";

	function sendCalculation(object) {
      axios
        .post("https://localhost:3000/calc", object)
        .then((response) => {
          console.log("Sent successfully answer: " + response.data);
          current = response.data.answer;
          answer = response.data.answer;
          console.table(response.data);
        })
        .catch((error) => {
          console.log("Failed to send with error: " + error);
        });
    }

	function num(value) {
      current = current + "" + value;
      display = display + "" + value;
    }

    function clear() {
      current = "";
      display = "";
      answer = "";
    }
	
    function equals() {
      secondValue = current;
      const object = {
        firstValue: firstValue,
        operator: op,
        secondValue: secondValue,
      };
      sendCalculation(object);
    }

    function operatorSelection(operator) { 
      if(!(display.includes("+") || display.includes("/") || display.includes("-") 
      || display.includes("//") || display.includes("x") || display.includes("%"))){
          op = operator;
          firstValue = current;
          current = "";
          
          if (op == "*"){
            display = display + " x ";
          }
          else{
            display = display + " " + op + " ";
          }
      } 
    }

    function dot() {
      if (!current.includes(".")) {
        current = current + ".";
        display = display + ".";
      }
    }

    function logout() {
      axios
        .get("https://localhost:3000/logout")
        .then((response) => {
          console.log("Sent successfully logout: " + response.data);
          window.location.href = response.data.replaceAll(" ", "");
        })
        .catch((error) => {
          console.log("Failed to send with error: " + error);
        });
    }
</script>

<main>
  {#if !logged}
	<div class="container">
	<h2 id="title">You are not allowed here <Link to="/">Please click here to login</Link></h2>
	</div>

  {:else}
	<div v-else class="container">
	<h1 id="title">Calculator</h1>
	<div class="calc-body">
		<div class="calc-screen">
		<div class="calc-operation">{display}</div>
		<div class="calc-typed"> {answer}</div>
		</div>
		<div class="calc-button-row">
		<button class="button l" on:click={() => operatorSelection('%')}>%</button>
		<button class="button l"on:click={() => operatorSelection('^')}>^</button>
		<button class="button l" on:click={() => operatorSelection('//')}>//</button>
		<button class="button c" on:click={clear}>C</button>
		</div>
		<div class="calc-button-row">
		<button class="button" on:click={() => num(7)}>7</button>
		<button class="button" on:click={() => num(8)}>8</button>
		<button class="button" on:click={() => num(9)}>9</button>
		<button class="button l" on:click={() => operatorSelection('/')}>/</button>
		</div>
		<div class="calc-button-row">
		<button class="button" on:click={() => num(4)}>4</button>
		<button class="button" on:click={() => num(5)}>5</button>
		<button class="button" on:click={() => num(6)}>6</button>
		<button class="button l" on:click={() => operatorSelection('*')}>x</button>
		</div>
		<div class="calc-button-row">
		<button class="button" on:click={() => num(1)}>1</button>
		<button class="button" on:click={() => num(2)}>2</button>
		<button class="button" on:click={() => num(3)}>3</button>
		<button class="button l" on:click={() => operatorSelection('-')}>-</button>
		</div>
		<div class="calc-button-row">
		<button class="button" on:click={dot}>.</button>
		<button class="button" on:click={() => num(0)}>0</button>
		<button class="button c" on:click={equals}>=</button>
		<button class="button l" on:click={() => operatorSelection('+')}>+</button>
		</div>
		</div>

		<button class="button c" style="width:50%; margin: 10%;" on:click={logout}>Logout</button>

	</div>
  {/if}
</main>

<style scoped>

* {
  text-align: center;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
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
  margin: 0px;
  width: 24.17%;
  background: #425062;
  color: #fff;
  padding: 20px;
  display: inline-block;
  font-size: 25px;
  text-align: center;
  vertical-align: middle;
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
}

.button.c:hover,
.button.l:hover {
  background: #E0B612;
  color: #fff;
}

</style>