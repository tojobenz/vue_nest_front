<template>
    <div class="container-fluid">

      <div class="text-center">
        <h1>Nest Customer List App Tutorial</h1>
       <p> Built with Nest.js, Vue.js and MongoDB</p>

       <div v-if="customers.length === 0">
            <h2> No customer found at the moment </h2>
        </div>
      </div>
      <div class="grid grid-rows-3 grid-flow-col gap-4">
  <div class="row-span-3">
    <router-link :to="{name: 'Create'}" ><b-button variant="danger">Create customer</b-button></router-link>
  </div>
  <div class="col-span-2">
    <child @clickChild="onClickChild" value="teste"></child>
  </div>
</div> 
<div>
<label for="limit">Limit: </label>  

<select name="limit" @change="onChangeLimit($event)" v-model="limit">
  <option value="2" selected>2</option>
  <option value="4">4</option>
  <option value="6">6</option>
</select>
</div>      <!-- <div class="row"> --> 
        <div class="">
            <table class="table table-bordered">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="customer in customers" :key="customer._id">
                  <td>{{ customer.first_name }}</td>
                  <td>{{ customer.last_name }}</td>
                  <td>{{ customer.email }}</td>
                  <td>{{ customer.phone }}</td>
                  <td>{{ customer.address }}</td>
                  <td>{{ customer.description }}</td>
                  <td>
                    <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group" style="margin-bottom: 20px;">
                                  <router-link :to="{name: 'Edit', params: {id: customer._id}}" class="btn btn-sm btn-outline-secondary">Edit Customer </router-link>
                                  <button class="btn btn-sm btn-outline-secondary" v-on:click="deleteCustomer(customer._id)">Delete Customer</button>
                                </div>
                              </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
  <ul class="pagination" >
    <li class="page-item"><a class="page-link" @click="prevPage()">Previous</a></li>
    <li class="page-item" v-for="(index, page) in pagination" v-bind:class="{ active: isActive  === index }"  v-bind:key="page"><a class="page-link"  @click="numberPage(page, index)">{{ index }}</a></li>
    <li class="page-item"><a class="page-link" @click="nextPage()">Next</a></li>
  </ul>
</nav>
          </div>
      <!-- </div> -->
    </div>
</template>

<script>
import { server } from "../helper";
import axios from "axios";
import CustomerService from '../services/customer.service';
import { mapState, mapMutations  } from 'vuex';
import {PaginationCustom} from '../fonctions/pagination'
export default {
  data() {
    return {
      customers: [],
      pagination: Number,
      current: Number,
      isActive: Number,
      limit: "",
    };
  },
  computed: {
    ...mapState(['test'])
  },
  created() {
    const a = "Rakoto Paul"
    console.log(a.match(/^[^a-z]/g)); //Autre chose qu'une minuscule en début de chaine
    this.fetchCustomers();
  },
  methods: {
    ...mapMutations ('test',[
            'setFirstname',
            'setLastName'
        ]),
    onClickChild(v) {
      this.setFirstname('first name')
      // this.$store.commit('test/setFirstname', 'response.data');
            console.log(this.test) // someValue
    },
    fetchCustomers() {
    CustomerService.getAllCustomers().then(
      response => {
        this.customers = response.data.results;
        this.pagination = response.data.totalPages
        this.current = response.data.currentPage
        console.log(this.current)
      },
      error => {
        localStorage.removeItem('user');
        this.customers =
          (error.response && error.response.data.results) ||
          error.message ||
          error.toString();
      }
    );
    },
    deleteCustomer(id) {
      axios
        .delete(`${server.baseURL}/customer/delete?customerID=${id}`)
        .then(data => {
          console.log(data);
          this.fetchCustomers()
        });

            CustomerService.deleteCustomer(id).then(/* eslint-disable */ 
      response => {
        this.fetchCustomers()
      },
      error => {
        console.log(error)
      }
    );
    },
    numberPage(a, index) {
      let limit = 2;
      if(this.limit !== "") {
        limit = this.limit
      }
      const val = (limit*index) - limit;
      CustomerService.getAllCustomers(val, limit, index).then(
      response => {
        this.customers = response.data.results;
        this.pagination = response.data.totalPages
         this.isActive = index
      },
      error => {
        localStorage.removeItem('user');
        this.customers =
          (error.response && error.response.data.results) ||
          error.message ||
          error.toString();
      }
    );
    },
    nextPage() {
      
         let limit = 2;
      if(this.limit !== "") {
        limit = this.limit
      }
         let index = this.current + 1;
               if(index <= this.pagination) {
      const val = (limit*index) - limit;
      CustomerService.getAllCustomers(val, limit, index).then(
      response => {
        this.customers = response.data.results;
        this.pagination = response.data.totalPages
        this.current = response.data.currentPage
        console.log(response.data)
      },
      error => {
        localStorage.removeItem('user');
        this.customers =
          (error.response && error.response.data.results) ||
          error.message ||
          error.toString();
      }
    );
               }
    },
    prevPage() {
         let limit = 2;
      if(this.limit !== "") {
        limit = this.limit
      }
         let index = this.current - 1;
         console.log(index)
               if(index > 0) {
      const val = (limit*index) - limit;
      CustomerService.getAllCustomers(val, limit, index).then(
      response => {
        this.customers = response.data.results;
        this.pagination = response.data.totalPages
        this.current = response.data.currentPage
        console.log(response.data)
      },
      error => {
        localStorage.removeItem('user');
        this.customers =
          (error.response && error.response.data.results) ||
          error.message ||
          error.toString();
      }
    );
               }
    },
     onChangeLimit(event) {
        this.limit = event.target.value;
            let limit = event.target.value;
         let index = this.current;
               if(index > 0) {
      const val = (limit*index) - limit;
      CustomerService.getAllCustomers(val, limit, index).then(
      response => {
        this.customers = response.data.results;
        this.pagination = response.data.totalPages
        this.current = response.data.currentPage;
      },
      error => {
        localStorage.removeItem('user');
        this.customers =
          (error.response && error.response.data.results) ||
          error.message ||
          error.toString();
      }
    );
               }
        }
  }
};
</script>
<style scoped>
</style>

