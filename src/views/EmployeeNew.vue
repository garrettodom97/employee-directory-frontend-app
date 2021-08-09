<template>
  <div class="employeeNew">
    <h1>Create a new employee</h1>
    <p v-if="status == 401">You must be logged in to create an employee</p>
    <li v-for="error in errors" :key="error">
      {{ error }}
    </li>
    <div class="d-flex justify-content-center align-items-center">
      <form v-on:submit.prevent="createEmployee()">
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="First Name"
            aria-label="First Name"
            aria-describedby="addon-wrapping"
            v-model="newEmployeeParams.first_name"
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Last Name"
            aria-label="Last Name"
            aria-describedby="addon-wrapping"
            v-model="newEmployeeParams.last_name"
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Gender"
            aria-label="Gender"
            aria-describedby="addon-wrapping"
            v-model="newEmployeeParams.gender"
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="addon-wrapping"
            v-model="newEmployeeParams.email"
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Phone"
            aria-label="Phone"
            aria-describedby="addon-wrapping"
            v-model="newEmployeeParams.phone"
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Picture URL"
            aria-label="Picture URL"
            aria-describedby="addon-wrapping"
            v-model="newEmployeeParams.picture"
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Department Code"
            aria-label="Department Code"
            aria-describedby="addon-wrapping"
            v-model="newEmployeeParams.department_code"
          />
        </div>
        <input type="submit" />
      </form>
    </div>
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

<style>
.input-group {
  width: 500px;
}
</style>
