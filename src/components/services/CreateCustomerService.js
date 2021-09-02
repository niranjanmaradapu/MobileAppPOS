import axios from 'axios';
import { CREATE_CUSTOMER_URL } from '../commonUtils/ApiConstants';
import { BASE_URL } from '../commonUtils/Base';

class CreateCustomerService {
    createCustomer(list) {
        return axios.post(BASE_URL+CREATE_CUSTOMER_URL.createCustomer, list);
    }
    posClose(){
        return axios.get(BASE_URL+CREATE_CUSTOMER_URL.posClose);
    }
}

export default new CreateCustomerService()
