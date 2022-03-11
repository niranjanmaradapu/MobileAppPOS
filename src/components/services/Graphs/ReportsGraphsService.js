const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097';

class ReportsGraphsService {
    getInvocesGenerated() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/reports/InvoicesGenerated";
    }

    getTopFiveSales() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/reports/getTopfiveSalesByStore";
    }

    getActiveInactivePromos() {
        return REACT_NATIVE_APP_BASE_URL + "/connection-pool/promo/activeVSinactivepromos";
    }

    getSaleSummary() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/reports/getsaleSummery";
    }
}

export default new ReportsGraphsService();