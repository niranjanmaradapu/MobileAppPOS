import axios from 'axios';
const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'

class CreateCustomerService {
    createCustomer() {
        return  REACT_NATIVE_APP_BASE_URL+'/new-sale/newsale/savecustomerdetails';
    }  
}

export default new CreateCustomerService()
