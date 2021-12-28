const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'

class UrmService {
    registerUser() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/client/createClient'
    }

    saveUser(){
        return REACT_NATIVE_APP_BASE_URL + '/user-management/auth/createUser'
    } 

    changePassword() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/auth/authResponce'
    }

    getPrivillagesForDomain(){
        return REACT_NATIVE_APP_BASE_URL + '/user-management/roles/privillagesForDomian/' 
    }

    getPrivillagesByRoleName(){
        return REACT_NATIVE_APP_BASE_URL + '/user-management/roles/privilagesByName/' 
    }

    getDomainName(){
        return REACT_NATIVE_APP_BASE_URL + '/user-management/client/domian/'  
    } 

    getDomains(){
        return REACT_NATIVE_APP_BASE_URL + '/user-management/client/getDomiansForClient/'  
    } 
}
export default new UrmService()


