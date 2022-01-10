const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097';

class ReportsService {

    estimationSlips() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/getlistofdeliveryslips"
    }

    newSaleReports() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/getlistofsalebills"
    }

    deliverySlipsList() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/getsalereport";
    }

    getStoresClientDomainId() {
        return REACT_NATIVE_APP_BASE_URL + "/user-management/store/getClientDomianStores";
    }

    promoionsList() {
        return REACT_NATIVE_APP_BASE_URL + "/connection-pool/promo/listOfPromotionsBySearch";
    }

}

export default new ReportsService();