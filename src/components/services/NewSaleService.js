import { BASE_URL } from '../../commonUtils/Base'
import { GENERATE_RETURN_SLIPS_URL } from '../../commonUtils/ApiConstants'
import axios from 'axios'

class NewSaleService {
    payment() {
        return BASE_URL + '/paymentgateway/paymentgateway/create_order'
    }

    getAllBarcodes() {
        return BASE_URL + '/new-sale/newsale/getAllBarcodes'
    }

    saveLineItems() {
        return BASE_URL + '/new-sale/newsale/savelineitems/2'
    }

    createOrder() {
        return BASE_URL + '/new-sale/newsale/sale'
    }

    getImageScanning() {
        return BASE_URL + '/user-management/auth/imageScanning'
    }

    getCoupons() {
        return BASE_URL + "/new-sale/newsale/getGv"
    }

    saveCoupons() {
        return BASE_URL + "/new-sale/newsale/changeflaggv";
    }

    getMobileData(mobileNumber) {
        return axios.get(BASE_URL+GENERATE_RETURN_SLIPS_URL.getMobileData+'/'+mobileNumber);
    }
}
export default new NewSaleService()