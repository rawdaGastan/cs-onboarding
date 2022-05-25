<template>
 <h1 id="title">Login</h1>
  <div class="container">
    <button class="button c" style="width:100%" @click="login()">Login to use the calculator</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'auth-calc',
  data() {
    return {};
  },
  methods: {
    login() {
      axios
        .get("https://localhost:3000/login")
        .then((response) => {
          console.log("Sent successfully login: " + response.data);
          window.location.href = response.data.replaceAll(" ", "");
        })
        .catch((error) => {
          console.log("Failed to send with error: " + error);
        });
    },
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
.button.c {
  color: #D95D4E;
  background: #404D5E;
}

.button.c:hover{
  background: #E0B612;
  color: #fff;
}

</style>
