const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097';

class URMGraphsService {
    getUsersByRole() {
        return REACT_NATIVE_APP_BASE_URL + "/user-management/reports/usersByRole";
    }

    getActiveUsers() {
        return REACT_NATIVE_APP_BASE_URL + "/user-management/reports/activeVsInactiveUsers";
    }

    getStoresVsEmployees() {
        return REACT_NATIVE_APP_BASE_URL + "/user-management/reports/storesVsEmployees";
    }
}

export default new URMGraphsService();