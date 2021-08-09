<template>
  <div>
    <h2>{{ employee.first_name }} {{ employee.last_name }}</h2>
    <img :src="employee.picture" alt="" />
    <p>{{ employee.gender }}</p>
    <p>{{ employee.email }}</p>
    <p>{{ employee.phone }}</p>
    <p>{{ employee.job_title }}</p>
    <p>{{ employee.department.name }}</p>
    <router-link to="/">
      <button>Back</button>
    </router-link>
    <button v-on:click="editModal()">Edit</button>
    <dialog id="edit">
      <form method="dialog">
        <h1>Edit Employee</h1>
        <p>First Name:</p>
        <input type="text" v-model="editEmployeeParams.first_name" />
        <p>Last Name:</p>
        <input type="text" v-model="editEmployeeParams.last_name" />
        <p>Gender:</p>
        <input type="text" v-model="editEmployeeParams.gender" />
        <p>Email:</p>
        <input type="text" v-model="editEmployeeParams.email" />
        <p>Phone:</p>
        <input type="text" v-model="editEmployeeParams.phone" />
        <p></p>
        <p>Picture:</p>
        <input type="text" v-model="editEmployeeParams.picture" />
        <p></p>
        <p>Department Code (1: Engineering, 2: Sales, 3: Marketing, 4: Finance, 5: Human Resources):</p>
        <input type="text" v-model="editEmployeeParams.department_code" />
        <p></p>
        <button>Close</button>
        <button v-on:click="editEmployee()">Edit Employee</button>
      </form>
    </dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      employee: {},
      editEmployeeParams: {},
    };
  },
  created: function () {
    this.employeeShow();
  },
  methods: {
    employeeShow: function () {
      axios.get("https://pacific-thicket-40492.herokuapp.com/employees/" + this.$route.params.id).then((response) => {
        this.employee = response.data;
        console.log(response.data);
      });
    },
    editModal: function () {
      console.log("Editing Employee");
      axios.get("https://pacific-thicket-40492.herokuapp.com/employees/" + this.employee.id).then((response) => {
        console.log(response.data);
        this.editEmployeeParams = response.data;
      });
      document.querySelector("#edit").showModal();
    },
    editEmployee: function () {
      axios
        .patch("https://pacific-thicket-40492.herokuapp.com/employees/" + this.employee.id, this.editEmployeeParams)
        .then((response) => {
          console.log(response.data);
          this.$router.go();
        });
    },
  },
};
</script>
