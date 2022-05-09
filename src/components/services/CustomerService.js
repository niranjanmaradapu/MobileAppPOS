const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097';


class CustomerService {
    createDeliverySlip() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/createdeliveryslip";
    }

    saveLineItems() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/savelineitems/1";
    }

    getDeliverySlip() {
        return REACT_NATIVE_APP_BASE_URL + "/inventory/inventoryTextile/getBarcodeTextile";
    }

    getHsnDetails() {
        return REACT_NATIVE_APP_BASE_URL + "/hsn-details/hsn-details/getHsnDetails";
    }

    saveSale() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/sale";
    }

    getDsSlip() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/getdeliveryslip";
    }

    getMobileData() {
        return REACT_NATIVE_APP_BASE_URL + "/user-management/user/customer/mobileNo";
    }

    getDiscountReasons() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/discTypes";
    }


    getLineItems() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/savelineitems";
    }

    getCustomerMobile() {
        return REACT_NATIVE_APP_BASE_URL + "/user-management/user/customer/mobileNo";
    }

    getCoupons() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/getGv";
    }


    getGiftVocher() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/getlistofgv";
    }

    saveGiftVocher() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/saveGv";
    }

    getReturnSlip() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/getInvoiceDetails";
    }

    saveRetunSlip() {
        return REACT_NATIVE_APP_BASE_URL + "/customer/customer/createReturnSlip";
    }


    getRetailBarcode() {
        return REACT_NATIVE_APP_BASE_URL + "/inventory/inventoryRetail/getBarcodeId";
    }


    addCustomer() {
        return REACT_NATIVE_APP_BASE_URL + "/user-management/auth/createUser";
    }


}
export default new CustomerService();
