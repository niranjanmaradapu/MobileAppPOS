// import base from './Base';
const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'


class InventoryService {
    createProduct() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/inventory/createProduct';
    }
    getAllProducts() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/inventory/getAllProducts';
    }
    getAllBarcodes() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/inventory/getAllBarcodes';
    }
    saveUOM() {
        return REACT_NATIVE_APP_BASE_URL + '/uom/saveUom';
    }
    getUOM() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/uom/getAllUom';
    }
}
export default new InventoryService()