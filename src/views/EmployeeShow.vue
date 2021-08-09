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
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="First Name"
            aria-label="First Name"
            aria-describedby="addon-wrapping"
            v-model="editEmployeeParams.first_name"
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Last Name"
            aria-label="Last Name"
            aria-describedby="addon-wrapping"
            v-model="editEmployeeParams.last_name"
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Gender"
            aria-label="Gender"
            aria-describedby="addon-wrapping"
            v-model="editEmployeeParams.gender"
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="addon-wrapping"
            v-model="editEmployeeParams.email"
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Phone"
            aria-label="Phone"
            aria-describedby="addon-wrapping"
            v-model="editEmployeeParams.phone"
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Picture URL"
            aria-label="Picture URL"
            aria-describedby="addon-wrapping"
            v-model="editEmployeeParams.picture"
          />
        </div>
        <div class="input-group flex-nowrap">
          <input
            type="text"
            class="form-control"
            placeholder="Department Code"
            aria-label="Department Code"
            aria-describedby="addon-wrapping"
            v-model="editEmployeeParams.department_code"
          />
        </div>
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
