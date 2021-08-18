<template>
  <div class="login">
    <h1>Login</h1>
    <li v-for="error in errors" :key="error.id">
      {{ error }}
    </li>
    <form v-on:submit.prevent="Login()">
      <p>Email:</p>
      <input type="text" v-model="newSessionParams.email" />
      <p>Password:</p>
      <input type="password" v-model="newSessionParams.password" />
      <p></p>
      <button v-on:click="Login()" type="button" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    Login: function () {
      axios
        .post("https://pacific-thicket-40492.herokuapp.com/sessions", this.newSessionParams)
        .then((response) => {
          console.log(response.data);
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password"];
        });
    },
  },
};
</script>
