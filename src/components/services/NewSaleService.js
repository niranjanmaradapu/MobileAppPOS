const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'
import { BASE_URL } from '../../commonUtils/Base'
import { GENERATE_RETURN_SLIPS_URL } from '../../commonUtils/ApiConstants'
import axios from 'axios'

class NewSaleService {
    payment() {
        return REACT_NATIVE_APP_BASE_URL + '/paymentgateway/paymentgateway/create_order'
    }

    getAllBarcodes() {
        return REACT_NATIVE_APP_BASE_URL + '/new-sale/newsale/getAllBarcodes'
    }

    saveLineItems() {
        return REACT_NATIVE_APP_BASE_URL + '/new-sale/newsale/savelineitems/2'
    }

    createOrder() {
        return REACT_NATIVE_APP_BASE_URL + '/new-sale/newsale/sale'
    }

    getImageScanning() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/auth/imageScanning'
    }

    getCoupons() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/getGv"
    }

    saveCoupons() {
        return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/changeflaggv";
    }

    getMobileData(mobileNumber) {
        return axios.get(BASE_URL+GENERATE_RETURN_SLIPS_URL.getMobileData+'/'+mobileNumber);
    }
}
export default new NewSaleService()