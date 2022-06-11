import { BASE_URL } from "../../commonUtils/Base"
class ProfileService {

  getUser() {
    return BASE_URL + '/user-management/user/get_user_profile/'
  }

  updateUser() {
    return BASE_URL + '/user-management/user/updateUser'
  }

}
export default new ProfileService()