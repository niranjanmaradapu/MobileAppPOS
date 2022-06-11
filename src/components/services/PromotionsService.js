import { BASE_URL } from "../../commonUtils/Base"
class PromotionService {
    //Pools
    getAllPools() {
        return BASE_URL + '/connection-pool/pool/getpoollist'
    }

    createPool() {
        return BASE_URL + '/connection-pool/pool/createpool'
    }

    updatePool() {
        return BASE_URL + '/connection-pool/pool/modifypool'
    }

    deletePool() {
        return BASE_URL + '/connection-pool/pool/deletepool';
    }

    poolSearch() {
        return BASE_URL + '/connection-pool/pool/poolSearching';
    }


    //Promotions
    getAllPromotions() {
        return BASE_URL + '/connection-pool/promo/getpromolist'
    }

    addPromotion() {
        return BASE_URL + '/connection-pool/promo/addpromo'
    }

    editPromo(){
        return BASE_URL + '/connection-pool/promo/editpromo'
    }

    deletePromotions() {
        return BASE_URL + '/connection-pool/promo/deletepromo';
    }

    addPromoStore() {
        return BASE_URL + '/connection-pool/promo/addPromoToStore';
    }

    promoSearch() {
        return BASE_URL + '/connection-pool/promo/searchPromotion';
    }

    //loyalty points
    getLoyaltyPoints(){
        return BASE_URL + '/new-sale/newsale/getAllLoyaltyPoints';
    }

    saveLoyaltyPoints(){
        return BASE_URL + '/new-sale/newsale/saveLoyaltyPoints';
    }

    searchLoyaltyPoints(){
        return BASE_URL + '/new-sale/newsale/searchLoyaltyPoints';
    }

    getInvoiceData(){
        return BASE_URL + '/new-sale/newsale/getinvoicedata';
    }


}
export default new PromotionService()