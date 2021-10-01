// import base from './Base';
const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'


class LoginService {
    getStores() {
        return REACT_NATIVE_APP_BASE_URL + '/user-store/stores/getstores';
    }
    getAuth() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/auth/login';
    }
}
export default new LoginService()