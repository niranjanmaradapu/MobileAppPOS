import { BASE_URL } from "../../../commonUtils/Base";

class AccountingPortalGraphsService {
  getDebitnNotesByStores() {
    return BASE_URL + "/hsn-details/reports/debitNotesByStores";
  }

  getUsedBalancedAmmounts() {
    return BASE_URL + "/hsn-details/reports/usedAndBalancedAmountByStores";
  }

}

export default new AccountingPortalGraphsService();