import axios from "axios";
import { BILLING_PORTAL, NEW_SALE_URL } from "../../commonUtils/ApiConstants";
import { BASE_URL } from "../../commonUtils/Base";

class CustomerService {
  createDeliverySlip() {
    return BASE_URL + "/new-sale/newsale/createdeliveryslip";
  }

  saveLineItems(list, type) {
    const param = '?enumName=' + type
    return axios.post(BASE_URL + NEW_SALE_URL.createDeliverySlip + param, list)
  }

  getDeliverySlip(barcodeId, storeId) {
    const param = '?barcode=' + barcodeId + '&storeId=' + storeId
    return axios.get(BASE_URL + NEW_SALE_URL.getDeliverySlip + param)
  }

  getAllDayClosure() {
    return BASE_URL + "/new-sale/newsale/getPendingDeliverySlips"
  }

  dayCloseActivity() {
    return BASE_URL + "/new-sale/newsale/closePendingDeliverySlips"
  }

  getHsnDetails() {
    return BASE_URL + "/hsn-details/hsn-details/getHsnDetails";
  }

  saveSale() {
    return BASE_URL + "/new-sale/newsale/sale";
  }

  getDsSlip() {
    return BASE_URL + "/new-sale/newsale/getdeliveryslip";
  }

  getMobileData() {
    return BASE_URL + "/user-management/user/customer/mobileNo";
  }

  getDiscountReasons() {
    return BASE_URL + "/new-sale/newsale/discTypes";
  }


  getLineItems() {
    return BASE_URL + "/new-sale/newsale/savelineitems";
  }

  getCustomerMobile() {
    return BASE_URL + "/user-management/user/customer/mobileNo";
  }

  getCoupons() {
    return BASE_URL + "/new-sale/newsale/getGv";
  }


  getGiftVocher() {
    return BASE_URL + "/new-sale/newsale/getlistofgv";
  }

  saveGiftVocher() {
    return BASE_URL + "/new-sale/newsale/saveGv";
  }

  getReturnSlip() {
    return BASE_URL + "/new-sale/newsale/getInvoiceDetails";
  }

  saveRetunSlip() {
    return BASE_URL + "/new-sale/return_slip/createReturnSlip";
  }


  getRetailBarcode() {
    return BASE_URL + "/inventory/inventoryRetail/getBarcodeId";
  }


  addCustomer() {
    return BASE_URL + "/user-management/auth/createUser";
  }

  searchGiftVoucher(obj) {
    return axios.post(BASE_URL + BILLING_PORTAL.searchGiftVoucher, obj)
  }


}
export default new CustomerService();
