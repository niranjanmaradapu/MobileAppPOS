const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097';

class HomeGraphsService {
    getTodaySale() {
        return REACT_NATIVE_APP_BASE_URL + '/new-sale/reports/gettodaysSale';
    }

    getMonthlySale() {
        return REACT_NATIVE_APP_BASE_URL + '/new-sale/reports/getMonthlySale';
    }

    getLastVsThisMonthSale() {
        return REACT_NATIVE_APP_BASE_URL + '/new-sale/reports/getMonthlySale';
    }

}

export default new HomeGraphsService();