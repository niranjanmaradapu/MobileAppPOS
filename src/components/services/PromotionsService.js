const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'

class PromotionService {
    //Pools
    getAllPools() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/pool/getpoollist'
    }

    createPool() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/pool/createpool'
    }

    updatePool() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/pool/modifypool'
    }

    deletePool() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/pool/deletepool';
    }

    poolSearch() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/pool/poolSearching';
    }


    //Promotions
    getAllPromotions() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/promo/getpromolist'
    }

    deletePromotions() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/promo/deletepromo';
    }

    addPromoStore() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/promo/addPromoToStore';
    }

    promoSearch() {
        return REACT_NATIVE_APP_BASE_URL + '/connection-pool/pool/searchPromotion';
    }

}
export default new PromotionService()