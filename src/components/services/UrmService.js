import { BASE_URL } from "../../commonUtils/Base"

class UrmService {
    registerUser() {
        return BASE_URL + '/user-management/client/createClient'
    }

    saveUser() {
        return BASE_URL + '/user-management/auth/createUser'
    }

    changePassword() {
        return BASE_URL + '/user-management/auth/authResponce'
    }

    getPrivillagesForDomain() {
        return BASE_URL + '/user-management/roles/privillagesForDomian/'
    }

    getPrivillagesByRoleName() {
        return BASE_URL + '/user-management/roles/privilagesByName/'
    }

    getDomainName() {
        return BASE_URL + '/user-management/client/domian/'
    }

    getDomains() {
        return BASE_URL + '/user-management/client/getDomiansForClient/'
    }

    getPrivilegesByName() {
        return BASE_URL + "/user-management/roles/privilagesByName/"
    }

    getMasterDomains() {
        return BASE_URL + "/user-management/client/getMasterDomains"
    }


    saveDomain() {
        return BASE_URL + "/user-management/client/assignDomianToClient"
    }

    saveStore() {
        return BASE_URL + "/user-management/store/createStore"
    }

    editStore() {
        return BASE_URL + "/user-management/store/store"
    }

    getAllStores() {
        return BASE_URL + "/user-management/store/getClientStores/"
    }

    deleteStore() {
        return BASE_URL + '/user-management/store/deleteStore'
    }

    getStates() {
        return BASE_URL + "/user-management/store/allStates"
    }

    getDistricts() {
        return BASE_URL + "/user-management/store/getDistrict"
    }

    getStoresBySearch() {
        return BASE_URL + "/user-management/store/getStoresWithFilter"
    }

    getRolesByDomainId() {
        return BASE_URL + "/user-management/roles//getRolesForDomian/"
    }

    getAllRoles() {
        return BASE_URL + "/user-management/roles/getRolesForClient/"
    }

    getAllUsers() {
        return BASE_URL + "/user-management/user/getallUsers/"
    }

    getUserBySearch() {
        return BASE_URL + "/user-management/user/getUser"
    }

    getRolesBySearch() {
        return BASE_URL + "/user-management/roles/rolesWithFilter"
    }

    saveRole() {
        return BASE_URL + "/user-management/roles/createRole"
    }

    editRole() {
        return BASE_URL + "/user-management/roles/updateRole"
    }

    saveUser() {
        return BASE_URL + "/user-management/auth/createUser"
    }

    editUser() {
        return BASE_URL + "/user-management/user/updateUser"
    }

    getGSTNumber() {
        return BASE_URL + "/user-management/store/getgstDetails"
    }
}
export default new UrmService()
