const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097';

class AccountingPortalGraphsService {
    getDebitnNotesByStores() {
        return REACT_NATIVE_APP_BASE_URL + "/hsn-details/reports/debitNotesByStores";
    }

    getUsedBalancedAmmounts() {
        return REACT_NATIVE_APP_BASE_URL + "/hsn-details/reports/usedAndBalancedAmountByStores";
    }

}

export default new AccountingPortalGraphsService();