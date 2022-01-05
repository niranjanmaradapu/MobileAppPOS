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

    getPrivilegesByName(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/roles/privilagesByName/"
    } 

    getMasterDomains(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/client/getMasterDomains"
    } 


    saveDomain(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/client/assignDomianToClient"
    }

    saveStore(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/store/createStore"
    }

    editStore(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/store/store"
    } 
 
    getAllStores(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/store/getClientStores/"
    } 

    getStates(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/store/allStates"  
    } 

    getDistricts(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/store/getDistrict"
    }

    getStoresBySearch(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/store/getStoresWithFilter"
    } 

    getRolesByDomainId(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/roles//getRolesForDomian/"
    }

    getAllRoles(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/roles/getRolesForClient/"
    }

    getAllUsers(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/user/getallUsers/"
    } 

    getUserBySearch(){
        return REACT_NATIVE_APP_BASE_URL + "/user-management/user/getUser"
    }

    getRolesBySearch(){
        return REACT_NATIVE_APP_BASE_URL +  "/user-management/roles/rolesWithFilter"
    }

    saveRole(){
        return REACT_NATIVE_APP_BASE_URL +  "/user-management/roles/createRole"
    } 

    editRole(){
        return REACT_NATIVE_APP_BASE_URL +  "/user-management/roles/updateRole"
    } 

    saveUser(){
        return REACT_NATIVE_APP_BASE_URL +  "/user-management/auth/createUser"
    } 

    editUser(){
        return REACT_NATIVE_APP_BASE_URL +  "/user-management/user/updateUser"
    } 
}
export default new UrmService()


