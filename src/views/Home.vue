<template>
  <div class="container-fluid">
    <div class="text-center">
      <h1>Nest Customer List App Tutorial</h1>
      <p>Built with Nest.js, Vue.js and MongoDB</p>

      <div v-if="customers.length === 0">
        <h2>No customer found at the moment</h2>
      </div>
    </div>
    <div class="grid grid-rows-3 grid-flow-col gap-4">
      <div class="row-span-3">
        <router-link :to="{ name: 'Create' }"
          ><b-button variant="danger">Create customer</b-button></router-link
        >
      </div>
      <div class="col-span-2">
        <child @clickChild="onClickChild" value="teste"></child>
      </div>
    </div>
    <div>
      <label for="limit">Limit: </label>

      <select name="limit" @change="onChangeLimit($event)" v-model="selectedItem">
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="6">6</option>
      </select>
    </div>
    <!-- <div class="row"> -->
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
            <td>{{ regex(customer.phone) }}</td>
            <td>{{ customer.address }}</td>
            <td>{{  trunc(customer.description) }}</td>
            <td>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group" style="margin-bottom: 20px;">
                  <router-link
                    :to="{ name: 'Edit', params: { id: customer._id } }"
                    class="btn btn-sm btn-outline-secondary"
                    >Edit Customer
                  </router-link>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    @click="openModal('delete', customer._id)"
                  >
                    Delete Customer
                  </button>
                  <button
                    class="btn btn-sm btn-outline-secondary"
                    @click="openModal('duplicate', customer)"
                  >
                    Duplicate
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <button type="button" class="page-link" @click="prevPage()" :disabled="prevActive">Previous</button>
          </li>
          <li
            class="page-item"
            v-for="(index, page) in pagination"
            v-bind:class="{ active: isActive === index }"
            v-bind:key="page"
          >
            <button class="page-link" @click="numberPage(page, index)" >{{
              index
            }}</button>
          </li>
          <li class="page-item">
            <button class="page-link" @click="nextPage()" :disabled="nextActive">Next</button>
          </li>
        </ul>
      </nav>
    </div>
    <Modal v-show="visible" @close="close" :title="title" :type="typeModal" @validate="validate" />
    <!-- </div> -->
  </div>
</template>

<script>
import CustomerService from "../services/customer.service";
import { mapState, mapMutations } from "vuex";
import { router} from '../router.js';
import  Modal from '../components/CustomComponent/modal.vue'
import Truncate from '../helper/truncate'
export default {
   components: {Modal},
  data() {
    return {
      customers: [],
      pagination: Number,
      current: Number,
      isActive: 1,
      limit: "",
      selectedItem: 2,
      visible: false,
      title: "",
      typeModal: "",
      prevActive: true,
      nextActive: false
    };
  },
  computed: {
    ...mapState(["test"])
  },
  created() {
    const a = "Rakoto Paul";
    console.log(a.match(/^[^a-z]/g)); //Autre chose qu'une minuscule en début de chaine
    this.fetchCustomers();
  },
  methods: {
    ...mapMutations("test", ["setFirstname", "setLastName"]),
    onClickChild(v) {
      this.setFirstname("first name");
      // this.$store.commit('test/setFirstname', 'response.data');
      console.log(this.test); // someValue
    },
    regex(int) {
      let phone = int.replace(/(\d{3})(\d{2})(\d{3})(\d{2})/, "$1 $2 $3 $4");
      return phone;
    },
    trunc(input) {
      return Truncate(input, 100)
    },
    fetchCustomers() {
      CustomerService.getAllCustomers().then(
        response => {
          this.customers = response.data.results;
          this.pagination = response.data.totalPages;
          this.current = response.data.currentPage;
          let input = this.customers[1].description;
        },
        error => {
          localStorage.removeItem("user");
          this.customers =
            (error.response && error.response.data.results) ||
            error.message ||
            error.toString();
        }
      );
    },
    deleteCustomer(id) {

      CustomerService.deleteCustomer(id).then(
        /* eslint-disable */

        response => {
          this.fetchCustomers();
        },
        error => {
          console.log(error);
        }
      );
    },
    duplicateCustomer(data) {
      delete data._id, delete data.__v, delete data.created_at
      console.log(data);
           CustomerService.createCustomer(data)
        .then(response => {
          console.log(response)
           router.push('/home');
        })
        .catch(e => {
          console.log(e);
        }); 

    },
    numberPage(a, index) {
      let limit = 2;
      if (this.limit !== "") {
        limit = this.limit;
      }
      const val = limit * index - limit;
      CustomerService.getAllCustomers(val, limit, index).then(
        response => {
          this.customers = response.data.results;
          this.pagination = response.data.totalPages;
          this.isActive = index;
          this.current = index
          if(index == this.pagination){
              this.nextActive = true;
              this.prevActive = false;
            } else if(index!= 1) {
              this.prevActive = false
              this.nextActive = false;
            } else if (index == 1) {
              this.prevActive = true;
              this.nextActive = false
              } else if (index != this.pagination) {
                this.nextActive =false
              } else {
              this.nextActive = false
            }
        },
        error => {
          localStorage.removeItem("user");
          this.customers =
            (error.response && error.response.data.results) ||
            error.message ||
            error.toString();
        }
      );
    },
    nextPage() {
      let limit = 2;
      if (this.limit !== "") {
        limit = this.limit;
      } 
      let index = this.current + 1;
      this.isActive  = index;
      if (index <= this.pagination) {
        const val = limit * index - limit;
        CustomerService.getAllCustomers(val, limit, index).then(
          response => {
            this.customers = response.data.results;
            this.pagination = response.data.totalPages;
            this.current = response.data.currentPage;
            if(index == this.pagination){
              this.nextActive = true;
            } else if(index!= 1) {
              this.prevActive = false
            } else {
              this.nextActive = false
            }
          },
          error => {
            localStorage.removeItem("user");
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
      if (this.limit !== "") {
        limit = this.limit;
      }
      let index = this.current - 1;
      this.isActive  = index;
      if (index > 0) {
        const val = limit * index - limit;
        CustomerService.getAllCustomers(val, limit, index).then(
          response => {
            this.customers = response.data.results;
            this.pagination = response.data.totalPages;
            this.current = response.data.currentPage;
            if(index == 1){
              this.prevActive = true;
              this.nextActive = false;
            } else {
              this.prevActive = false
            }
          },
          error => {
            localStorage.removeItem("user");
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
      this.isActive = index
      if (index > 0) {
        const val = limit * index - limit;
        CustomerService.getAllCustomers(val, limit, index).then(
          response => {
            this.customers = response.data.results;
            this.pagination = response.data.totalPages;
            this.current = response.data.currentPage;
          },
          error => {
            localStorage.removeItem("user");
            this.customers =
              (error.response && error.response.data.results) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
      openModal(type, value) {
      this.visible = true;
      this.typeModal = {type, value}
    },
    close() {
      this.visible = false;
    },
        validate(v) {
          console.log(v);
          switch(v.type) {
            case 'duplicate':
              this.duplicateCustomer(v.value)
              break;
            case 'delete':
              this.deleteCustomer(v.value)
            default: 
              console.log('default');
          }
      this.visible = false;
    },
  }
};
</script>
<style scoped></style>
