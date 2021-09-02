export const LOGIN_URL = {
    getStores:'/user-store/stores/getstores',
    getToken: "/user-management/auth/login",
    saveData:"/createData"
}

export const NEW_SALE_URL = {
    getDslipData: "/new-sale/newsale/getdeliveryslip",
    getMobileData: "/new-sale/newsale/getcustomerdetailsbymobilenuber",
    saveSale: "/new-sale/newsale/sale"
}

export const CREATE_CUSTOMER_URL = {
    createCustomer: "/new-sale/newsale/savecustomerdetails",
    posClose:"/new-sale/newsale/daycloser"
}