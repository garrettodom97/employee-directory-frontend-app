<template>
  <div class="home">
    <h1>Employees</h1>
    <div class="row row-cols-1 row-cols-md-6 g-4">
      <div v-for="employee in employees" :key="employee.id">
        <div class="col">
          <div class="card">
            <router-link :to="`/employees/${employee.id}`">
              <img class="thumbnail" :src="employee.picture" alt="" />
            </router-link>
            <div class="card-body">
              <h4>{{ employee.first_name }} {{ employee.last_name }}</h4>
              <p>{{ employee.gender }}</p>
              <p>{{ employee.email }}</p>
              <p>{{ employee.phone }}</p>
              <p>{{ employee.job_title }}</p>
            </div>
          </div>
        </div>
      </div>
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
      axios.get("https://pacific-thicket-40492.herokuapp.com/employees").then((response) => {
        this.employees = response.data;
        console.log(response.data);
      });
    },
  },
};
</script>
