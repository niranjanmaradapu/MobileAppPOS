import axios from 'axios';
import { NEW_SALE_URL } from '../../commonUtils/ApiConstants';
import { BASE_URL } from '../../commonUtils/Base';

class NewSaleService { 
    
    getDeliverySlipDetails(obj){
        const param = '?dsNumber='+ obj; 
        return axios.get(BASE_URL+NEW_SALE_URL.getDslipData+param);
    }

    getMobileData(mobileNumber) {
        const param = '?mobileNumber='+ mobileNumber;
        return axios.get(BASE_URL+NEW_SALE_URL.getMobileData+param);
    }

    saveSale(obj) {
        return axios.post(BASE_URL+NEW_SALE_URL.saveSale, obj);
    }
}
export default new NewSaleService()