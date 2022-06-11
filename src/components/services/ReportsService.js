import { BASE_URL } from "../../commonUtils/Base"
class ReportsService {

    estimationSlips() {
        return BASE_URL + "/new-sale/newsale/getlistofdeliveryslips"
    }

    newSaleReports() {
        return BASE_URL + "/new-sale/newsale/getlistofsalebills"
    }

    returnSlips(){
        return BASE_URL + "/customer/customer/getListOfReturnSlips"
    }

    saleReports() {
        return BASE_URL + "/new-sale/newsale/getsalereport";
    }



    getListOfBarcodes() {
        return BASE_URL + "/inventory/inventoryTextile/getAllBarcodeTextiles"
    }

    promotionsList() {
        return BASE_URL + "/connection-pool/promo/listOfPromotionsBySearch";
    }

}

export default new ReportsService();