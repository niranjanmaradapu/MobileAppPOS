import axios from "axios"
import { USER_MANAGEMENT_URL } from "../../commonUtils/ApiConstants"
import { BASE_URL } from "../../commonUtils/Base"

class UrmService {
  registerUser() {
    return BASE_URL + '/user-management/client/createClient'
  }

  saveUser(saveObj) {
    return axios.post(BASE_URL + USER_MANAGEMENT_URL.saveUser, saveObj)
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

  getAllStores(clientId, pageNumber) {
    const param = '?clientId=' + clientId
    const pages = '?page=' + pageNumber + '&size=10'
    return axios.get(BASE_URL + USER_MANAGEMENT_URL.getAllStores + param)
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

  getRolesByDomainId(clientId) {
    const param = '/' + clientId
    return axios.get(BASE_URL + USER_MANAGEMENT_URL.getAllRoles + param)
  }

  getAllRoles(clientId, pageNumber) {
    const param = '/' + clientId
    const pages = '?page=' + pageNumber + '&size=10'
    return axios.get(BASE_URL + USER_MANAGEMENT_URL.getAllRoles + param + pages)
  }

  getAllUsers(clientId, pageNumber) {
    const param = '/' + parseInt(clientId)
    const pages = '?page=' + pageNumber + '&size=10'
    return axios.get(BASE_URL + USER_MANAGEMENT_URL.getAllUsers + param + pages)
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


  editUser() {
    return BASE_URL + "/user-management/user/updateUser"
  }

  getGSTNumber() {
    return BASE_URL + "/user-management/store/getgstDetails"
  }
}
export default new UrmService()
