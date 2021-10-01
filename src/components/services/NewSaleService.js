const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'

class NewSaleService {
    payment() {
        return REACT_NATIVE_APP_BASE_URL + '/paymentgateway/paymentgateway/create_order'
    }

    getAllBarcodes() {
        return REACT_NATIVE_APP_BASE_URL + '/new-sale/newsale/getAllBarcodes'
    }
}
export default new NewSaleService()