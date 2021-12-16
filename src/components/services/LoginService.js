// import base from './Base';
const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'


class LoginService {
    getStores() {
        return REACT_NATIVE_APP_BASE_URL + '/user-store/stores/getstores';
    }
    getUserStoresForSuperAdmin() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/store/getClientDomianStores';
    }

    getUserStores() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/auth/getUserStores/';
    }

    getStoreIdWithStoreName() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/store/getStoresWithFilter';
    }

    getDomainsList(){
        return REACT_NATIVE_APP_BASE_URL + '/user-management/client/getDomiansForClient/';
    }


    createUser() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/auth/createUser';
    }

    getUser() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/user/getUser';
    }

    forgotPasswordCodeSent() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/auth/forgetPassword';
    }

    forgotPassword() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/auth/confirmforgetPassword';
    }

    getAuth() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/auth/loginWithTempPass';
    }
}
export default new LoginService()