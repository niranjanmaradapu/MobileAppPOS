import { BASE_URL } from "../../../commonUtils/Base";
class URMGraphsService {
  getUsersByRole() {
    return BASE_URL + "/user-management/reports/usersByRole";
  }

  getActiveUsers() {
    return BASE_URL + "/user-management/reports/activeVsInactiveUsers";
  }

  getStoresVsEmployees() {
    return BASE_URL + "/user-management/reports/storesVsEmployees";
  }
}

export default new URMGraphsService();