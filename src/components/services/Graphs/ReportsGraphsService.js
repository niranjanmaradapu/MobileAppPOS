import { BASE_URL } from "../../../commonUtils/Base";
class ReportsGraphsService {
  getInvocesGenerated() {
    return BASE_URL + "/new-sale/reports/InvoicesGenerated";
  }

  getTopFiveSales() {
    return BASE_URL + "/new-sale/reports/getTopfiveSalesByStore";
  }

  getActiveInactivePromos() {
    return BASE_URL + "/connection-pool/promo/activeVSinactivepromos";
  }

  getSaleSummary() {
    return BASE_URL + "/new-sale/reports/getsaleSummery";
  }
}

export default new ReportsGraphsService();