export const ACCOUNTING_PORTAL = {
  getCreditNotes: "/hsn-details/accounting",
  getAllTaxes: "/hsn-details/tax/getTaxDetails",
  getAllHsnCodesData: "/hsn-details/hsn-details/getHsnDetails",
  saveMasterTax: "/hsn-details/tax/addnewtax",
  updateTax: "/hsn-details/tax/updatetax",
  getDescritionData: "/hsn-details/hsn-details/getEnums/description",
  getTaxAppliesOnData: "/hsn-details/hsn-details/getEnums/taxAppliesOn",
  saveHsnCode: "/hsn-details/hsn-details/save",
  updateHsnCode: "/hsn-details/hsn-details/updateHsn",
  saveCredit: "/hsn-details/accounting/save",
  getAllLedgerLogs: "/hsn-details/accounting/ledger-logs",
  saveDebit: "/hsn-details/accounting/sale",
}

export const NEW_SALE_URL = {
  getDeliverySlip: "/inventory/inventory-management/barcode-details",
  getMobileData: "/user-management/user/customer/mobileNo",
  createDeliverySlip: "/new-sale/newsale/createdeliveryslip",
}

export const INVENTORY_PORTAL = {
  getAllBarcodes: "/inventory/inventoryTextile/getAllBarcodeTextiles",
  getAllProductBundleList: "/inventory/productBundle/all",
}

export const BILLING_PORTAL = {
  searchGiftVoucher: "/new-sale/newsale//gvSearching",
}

export const LOGIN_URL = {
  getToken: '/user-management/auth/temporary-login',
}

export const USER_MANAGEMENT_URL = {
  getAllStores: "/user-management/store/client/stores",
  getAllUsers: "/user-management/user/users",
  getAllRoles: "/user-management/roles/client",
  saveUser: "/user-management/auth/create-user",
}
