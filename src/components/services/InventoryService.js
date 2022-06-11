import { BASE_URL } from "../../commonUtils/Base"

class InventoryService {
    //Retail
    createProduct() {
        return BASE_URL + '/inventory/inventoryRetail/createBarcode';
    }

    deleteBarcode() {
      return BASE_URL + '/inventory/inventoryTextile/deleteBarcode_Textile';
    }

    updateBarcode() {
        return BASE_URL + '/inventory/inventoryRetail/updateBarcode';
    }

    getAllBarcodes() {
        return BASE_URL + '/inventory/inventoryRetail/getAllBarcodes';
    }
    saveUOM() {
        return BASE_URL + '/uom/saveUom';
    }
    getUOM() {
        return BASE_URL + '/inventory/uom/getAllUom';
    }

    //Texttile
    getAllDivisions() {
        return BASE_URL + '/inventory/catalog/ListOfDivisions';
    }

    getAllSections() {
        return BASE_URL + '/inventory/catalog/getcategoriesByid';
    }

    getAllSubSections() {
        return BASE_URL + '/inventory/catalog/getcategoriesByid';
    }
    getAllCategories() {
        return BASE_URL + '/inventory/catalog/ListOfAllCategories';
    }

    getAllHsnList() {
        return BASE_URL + '/hsn-details/hsn-details/getHsnDetails';
    }

    addTextileBarcodes() {
        return BASE_URL + "/inventory/inventoryTextile/addBarcode_Textile";
    }

    updatTextileBarcodes() {
        return BASE_URL + "/inventory/inventoryTextile/updateBarcode_Textile";
    }

    getTextileBarcodes() {
        return BASE_URL + "/inventory/inventoryTextile/getAllBarcodeTextiles";
    }

    getTextileBarcodesDetails() {
        return BASE_URL + "/inventory/inventoryTextile/getBarcodeTextile"
    }

    deleteTextileBarcode() {
        return BASE_URL + "/inventory/inventoryTextile/deleteBarcode_Textile";
    }

    getbarcodeTexttileAdjustments() {
        return BASE_URL + "/inventory/inventoryTextile/getAllAdjustments";
    }

    getStoreNameById() {
        return BASE_URL + "/user-management/store/storeList";
    }

    getProductCombo() {
        return BASE_URL + "/inventory/productBundle/all"
    }

    addProductCombo() {
        return BASE_URL + "/inventory/productBundle/add"
    }

}
export default new InventoryService();