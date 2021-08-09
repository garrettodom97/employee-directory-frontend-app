<template>
  <div>
    <div class="col-4"></div>
    <div class="card" style="width: 18rem">
      <img :src="employee.picture" alt="" />
      <div class="card-body">
        <h2>{{ employee.first_name }} {{ employee.last_name }}</h2>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">{{ employee.gender }}</li>
        <li class="list-group-item">{{ employee.email }}</li>
        <li class="list-group-item">{{ employee.phone }}</li>
        <li class="list-group-item">{{ employee.job_title }}</li>
      </ul>
      <div class="card-body">
        <router-link to="/">
          <button type="button" class="btn btn-secondary">Back</button>
        </router-link>
        <button v-if="isLoggedIn()" v-on:click="editModal()" type="button" class="btn btn-warning">Edit</button>
        <button v-if="isLoggedIn()" v-on:click="deleteModal()" type="button" class="btn btn-danger">Delete</button>
      </div>
    </div>
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
        <button v-on:click="closeModal()" type="button" class="btn btn-secondary">Close</button>
        <button v-on:click="editEmployee()" type="button" class="btn btn-primary">Edit Employee</button>
      </form>
    </dialog>
    <dialog id="delete">
      <form method="dialog">
        <h1>Are you sure you want to delete this employee?</h1>
        <button v-on:click="deleteEmployee()" type="button" class="btn btn-primary">Yes</button>
        <button v-on:click="closeModal()" type="button" class="btn btn-secondary">No</button>
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
    closeModal: function () {
      this.$router.go();
    },
    deleteModal: function () {
      console.log("Deleting Employee");
      document.querySelector("#delete").showModal();
    },
    deleteEmployee: function () {
      axios.delete("https://pacific-thicket-40492.herokuapp.com/employees/" + this.employee.id).then((response) => {
        console.log(response.data);
        this.$router.push("/");
      });
    },
    isLoggedIn: function () {
      if (localStorage.getItem("jwt")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
.card {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
}
</style>
