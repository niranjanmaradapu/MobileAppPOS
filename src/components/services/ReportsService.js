const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'

class ReportsService {

    estimationSlips() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/getlistofdeliveryslips"
    }

    newSaleReports() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/getlistofsalebills"
    }

    returnSlips(){
        return REACT_NATIVE_APP_BASE_URL + "/customer/customer/getListOfReturnSlips"
    }

    saleReports() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/getsalereport";
    }



    getListOfBarcodes() {
        return REACT_NATIVE_APP_BASE_URL + "/inventory/inventoryTextile/getAllBarcodeTextiles"
    }

    promotionsList() {
        return REACT_NATIVE_APP_BASE_URL + "/connection-pool/promo/listOfPromotionsBySearch";
    }

}

export default new ReportsService();