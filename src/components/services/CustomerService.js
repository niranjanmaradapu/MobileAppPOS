const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'


class CustomerService {
createDeliverySlip(){
    return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/createdeliveryslip";
} 

saveLineItems(){
    return REACT_NATIVE_APP_BASE_URL + "/new-sale/newsale/savelineitems/1";
} 

getDeliverySlip(){
    return REACT_NATIVE_APP_BASE_URL + "/inventory/inventoryTextile/getBarcodeTextile";
} 


}
export default new CustomerService()



