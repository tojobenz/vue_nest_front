import CustomerService from '../services/customer.service';

 class paginationFunc {
  next(lim, curr, pg) {
    const limit = lim;
    let index = curr + 1;
 const val = (limit*index) - limit;
 return val
 CustomerService.getAllCustomers(val, limit, index).then(
 response => {
   return {
     result: response.data.results,
     pages: response.data.totalPages,
     currentPage: response.data.currentPage
   }
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

export default new paginationFunc();