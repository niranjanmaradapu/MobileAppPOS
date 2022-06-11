import { BASE_URL } from "../../commonUtils/Base";
class CreateCustomerService {
  createCustomer() {
    return BASE_URL + '/new-sale/newsale/savecustomerdetails';
  }

  addCustomer() {
    return BASE_URL + "/user-management/auth/createUser";
  }
}

export default new CreateCustomerService();
