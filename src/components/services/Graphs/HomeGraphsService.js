import { BASE_URL } from "../../../commonUtils/Base";
class HomeGraphsService {
  getTodaySale() {
    return BASE_URL + '/new-sale/reports/gettodaysSale';
  }

  getMonthlySale() {
    return BASE_URL + '/new-sale/reports/getMonthlySale';
  }

  getLastVsThisMonthSale() {
    return BASE_URL + '/new-sale/reports/getcurrentMonthSalevsLastMonth';
  }

  getTopFiveSales() {
    return BASE_URL + '/new-sale/reports/getTopFiveSalesByRepresentative';
  }

  getSalesByCategory() {
    return BASE_URL + "/new-sale/reports/getSalesByCategory";
  }

}

export default new HomeGraphsService();