<template>
  <div class="home">
    <h1>Employees</h1>
    <div class="d-flex justify-content-center align-items-center">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="searchKeyword" />
    </div>
    <p></p>
    <div class="row row-cols-1 row-cols-md-6 g-4">
      <div
        v-for="employee in filterBy(
          employees,
          searchKeyword,
          'first_name',
          'last_name',
          'email',
          'gender',
          'phone',
          'job_title'
        )"
        :key="employee.id"
      >
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
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      employees: [],
      searchKeyword: "",
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

<style>
.form-control {
  width: 300px;
}
</style>
