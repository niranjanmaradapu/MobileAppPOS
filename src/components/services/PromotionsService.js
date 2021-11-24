const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'

class PromotionService {
    getAllBarcodes() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/pool/getpoollist?isActive=true'
    }
}
export default new PromotionService()