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
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      employee: {},
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
  },
};
</script>
