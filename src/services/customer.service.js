import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/customer/';

class CustomerService {

  getAllCustomers(skip, limit, index) {
    return axios.get(API_URL + 'customers', { headers: authHeader(), 
      params: {
      skip: skip,
      limit: limit,
      index: index,
    }, });
  }

  getOneCustomer(id) {
    return axios.get(API_URL + `customer/${id}`, { headers: authHeader() });
  }

  createCustomer(data) {
    return axios.post( API_URL + `create`, data, { headers: authHeader() });
  }
  editCustomer(id, data) {
    return axios.put( API_URL + `update?customerID=${id}`, data, { headers: authHeader() });
  }

  deleteCustomer(id) {
    return axios.delete( API_URL + `delete?customerID=${id}`, { headers: authHeader() });
  }

}

export default new CustomerService();