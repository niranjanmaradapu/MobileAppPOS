const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097';

class HomeGraphs {
    getTodaySale() {
        return REACT_NATIVE_APP_BASE_URL + '/new-sale/reports/gettodaysSale';
    }

    getDebitnNotesByStores() {
        return REACT_NATIVE_APP_BASE_URL + "/hsn-details/reports/debitNotesByStores";
    }
}

export default new HomeGraphs();