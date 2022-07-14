import axios from "axios";
import { CREATE_DELEVIRY_SLIP_URL } from "../../commonUtils/ApiConstants";
import { BASE_URL } from "../../commonUtils/Base";

class createDeliverySlip {
  addCustomer(addCustomerObj) {
    console.log({ addCustomerObj });
    return axios.post(BASE_URL + CREATE_DELEVIRY_SLIP_URL.addCustomer, addCustomerObj);
  }
}
export default new createDeliverySlip();
