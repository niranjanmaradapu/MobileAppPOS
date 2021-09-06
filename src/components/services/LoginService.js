import axios from 'axios';
import base from './Base';
const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'

class LoginService {
    getStores(){
        return  REACT_NATIVE_APP_BASE_URL+'/user-store/stores/getstores';
    }
    getAuth(){
        return  REACT_NATIVE_APP_BASE_URL+'/user-management/auth/login';
    }
    saveData(){
        return axios.post(BASE_URL+LOGIN_URL.saveData,null);
    }
}
export default new LoginService()