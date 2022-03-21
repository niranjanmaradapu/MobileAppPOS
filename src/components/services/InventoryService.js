// import base from './Base';
const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097';


class InventoryService {
    //Retail
    createProduct() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/inventoryRetail/createBarcode';
    }

    deleteBarcode() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/inventoryRetail/deleteBarcode';
    }

    updateBarcode() {
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

    //Texttile
    getAllDivisions() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/catalog/ListOfDivisions';
    }

    getAllSections() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/catalog/getcategoriesByid';
    }

    getAllSubSections() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/catalog/getcategoriesByid';
    }
    getAllCategories() {
        return REACT_NATIVE_APP_BASE_URL + '/inventory/catalog/ListOfAllCategories';
    }

    getAllHsnList() {
        return REACT_NATIVE_APP_BASE_URL + '/hsn-details/hsnDetails/getHsnDetails';
    }

    addTextileBarcodes() {
        return REACT_NATIVE_APP_BASE_URL + "/inventory/inventoryTextile/addBarcode_Textile";
    }

    updatTextileBarcodes() {
        return REACT_NATIVE_APP_BASE_URL + "/inventory/inventoryTextile/updateBarcode_Textile";
    }

    getTextileBarcodes() {
        return REACT_NATIVE_APP_BASE_URL + "/inventory/inventoryTextile/getAllBarcodeTextiles";
    }

    getTextileBarcodesDetails() {
        return REACT_NATIVE_APP_BASE_URL + "/inventory/inventoryTextile/getBarcodeTextile"
    }

    deleteTextileBarcode() {
        return REACT_NATIVE_APP_BASE_URL + "/inventory/inventoryTextile/deleteBarcode_Textile";
    }

    getbarcodeTexttileAdjustments() {
        return REACT_NATIVE_APP_BASE_URL + "/inventory/inventoryTextile/getAllAdjustments";
    }

    getStoreNameById() {
        return REACT_NATIVE_APP_BASE_URL + "/user-management/store/storeList";
    }

}
export default new InventoryService();