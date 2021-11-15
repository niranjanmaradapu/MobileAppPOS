// import base from './Base';
const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'


class InventoryService {
    createProduct() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/inventoryRetail/createBarcode';
    }

    deleteBarcode(){
        return REACT_NATIVE_APP_BASE_URL + '/inventory/inventoryRetail/deleteBarcode'; 
    }

    updateBarcode(){
        return REACT_NATIVE_APP_BASE_URL + '/inventory/inventoryRetail/updateBarcode'; 
    }
   
    getAllBarcodes() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/inventoryRetail/getAllBarcodes';
    }
    saveUOM() {
        return REACT_NATIVE_APP_BASE_URL + '/uom/saveUom';
    }
    getUOM() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/uom/getAllUom';
    }
}
export default new InventoryService()