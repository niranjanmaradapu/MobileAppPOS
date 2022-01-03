import axios from "axios";
import { REPORTS_GRAPHS } from '../../../commonUtils/ApiConstants';
import { BASE_URL } from '../../../commonUtils/Base';

class ListOfReportsGraphsService {
    getInvoicesGenerated() {
        return axios.get(BASE_URL + REPORTS_GRAPHS.invoicesGenerated);
    }
    getTopFiveSales() {
        return axios.get(BASE_URL + REPORTS_GRAPHS.topFiveSales);
    }
    getActiveInactive() {
        return axios.get(BASE_URL + REPORTS_GRAPHS.activeIactivePromos);
    }
    getSaleSummary() {
        return axios.get(BASE_URL + REPORTS_GRAPHS.saleSummary);
    }
}

export default new ListOfReportsGraphsService();