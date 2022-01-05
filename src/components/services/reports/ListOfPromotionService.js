import axios from "axios";
import { PROMOTIONS_LIST_URL } from "../../../commonUtils/ApiConstants";
import { BASE_URL } from "../../../commonUtils/Base";

class ListOfPromotionsService {
    getPromotions(data) {
        return axios.post(BASE_URL + PROMOTIONS_LIST_URL.promotionsList, data);
    }

    getStoreNames(domainId) {
        return axios.get(BASE_URL + PROMOTIONS_LIST_URL.getStoresClientDomainId + '?clientDomianId=' + domainId);
    }


}



export default new ListOfPromotionsService();