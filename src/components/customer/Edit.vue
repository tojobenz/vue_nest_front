<template>
   <div>
        <h4 class="text-center mt-20">
         <small>
         <button class="btn btn-success" v-on:click="navigate()"> View All Customers </button>
         </small>
        </h4>

        <div class="col-md-12 form-wrapper">
          <h2> Edit Customer </h2>
          <form id="create-post-form" @submit.prevent="editCustomer">
               <div class="form-group col-md-12">
                <label for="title"> First Name </label>
                <input type="text" id="first_name" v-model="customer.first_name" name="title" class="form-control" placeholder="Enter firstname">
               </div>

               <div class="form-group col-md-12">
                <label for="title"> Last Name </label>
                <input type="text" id="last_name" v-model="customer.last_name" name="title" class="form-control" placeholder="Enter Last name">
               </div>

             <div class="form-group col-md-12">
                <label for="title"> Email </label>
                <input type="text" id="email" v-model="customer.email" name="title" class="form-control" placeholder="Enter email">
            </div>

            <div class="form-group col-md-12">
                <label for="title"> Phone </label>
                <input type="text" id="phone_number" v-model="customer.phone" name="title" class="form-control" placeholder="Enter Phone number">
            </div>

            <div class="form-group col-md-12">
                <label for="title"> Address </label>
                <input type="text" id="address" v-model="customer.address" name="title" class="form-control" placeholder="Enter Address">
            </div>

              <div class="form-group col-md-12">
                  <label for="description"> Description </label>
                  <textarea name="description" id="description" v-model="customer.description" class="form-control" placeholder="Enter Description" cols="30" rows="10"></textarea>
              </div>

              <div class="form-group col-md-4 pull-right">
                  <button class="btn btn-success" type="submit"> Edit Customer </button>
              </div>          
          </form>
        </div>
    </div>
</template>

<script>
import router from "../../router";
import CustomerService from '../../services/customer.service';
export default {
  data() {
    return {
      id: 0,
      customer: {}
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getCustomer();
  },
  methods: {
    editCustomer() {
      let customerData = {
        first_name: this.customer.first_name,
        last_name: this.customer.last_name,
        email: this.customer.email,
        phone: this.customer.phone,
        address: this.customer.address,
        description: this.customer.description
      };

          CustomerService.editCustomer(this.id, customerData).then(
      response => {
        router.push({ name: "home" });
      },
      error => {
        this.customer =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    },
    getCustomer() {
      CustomerService.getOneCustomer(this.id).then(
      response => {
        console.log(response.data);
        this.customer = response.data;
      },
      error => {
        this.customer =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    },
    navigate() {
      router.go(-1);
    }
  }
};
</script>

