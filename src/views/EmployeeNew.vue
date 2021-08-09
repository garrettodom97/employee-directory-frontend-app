<template>
  <div class="employeeNew">
    <h1>Create a new employee</h1>
    <p v-if="status == 401">You must be logged in to create an employee</p>
    <li v-for="error in errors" :key="error">
      {{ error }}
    </li>
    <form v-on:submit.prevent="createEmployee()">
      <p>First Name:</p>
      <input type="text" v-model="newEmployeeParams.first_name" />
      <p>Last Name:</p>
      <input type="text" v-model="newEmployeeParams.last_name" />
      <p>Gender:</p>
      <input type="text" v-model="newEmployeeParams.gender" />
      <p>Email:</p>
      <input type="text" v-model="newEmployeeParams.email" />
      <p>Phone:</p>
      <input type="text" v-model="newEmployeeParams.phone" />
      <p></p>
      <p>Picture:</p>
      <input type="text" v-model="newEmployeeParams.picture" />
      <p></p>
      <p>Department Code (1: Engineering, 2: Sales, 3: Marketing, 4: Finance, 5: Human Resources):</p>
      <input type="text" v-model="newEmployeeParams.department_code" />
      <p></p>
      <input type="submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newEmployeeParams: { department_code: 1 },
      errors: [],
      status: "",
    };
  },
  methods: {
    createEmployee: function () {
      axios
        .post("https://pacific-thicket-40492.herokuapp.com/employees", this.newEmployeeParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
  },
};
</script>
