<template>
  <div class="home">
    <h1>Employees</h1>
    <div v-for="employee in employees" :key="employee.id">
      <router-link :to="`/employees/${employee.id}`">
        <img :src="employee.picture" alt="" />
        <h4>{{ employee.first_name }} {{ employee.last_name }}</h4>
      </router-link>
      <li>{{ employee.gender }}</li>
      <li>{{ employee.email }}</li>
      <li>{{ employee.phone }}</li>
      <li>{{ employee.job_title }}</li>
      <p></p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      employees: [],
    };
  },
  created: function () {
    this.employeeIndex();
  },
  methods: {
    employeeIndex: function () {
      axios.get("http://localhost:3000/employees").then((response) => {
        this.employees = response.data;
        console.log(response.data);
      });
    },
  },
};
</script>
