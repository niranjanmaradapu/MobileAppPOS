const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'

class PromotionService {
    //Pools
    getAllPools() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/pool/getpoollist?isActive=true'
    }

    createPool() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/pool/createpool'
    }

    deletePool(){
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/pool/deletepool'; 
    }

     //Promotions
     getAllPromotions() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/promo/getpromolist?flag=true'
    }

    deletePromotions(){
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/promo/deletepromo'; 
    }
}
export default new PromotionService()