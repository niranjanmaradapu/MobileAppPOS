const REACT_NATIVE_APP_BASE_URL = 'http://14.98.164.17:9097'

class ProfileService {
    
    getUser() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/user/get_user_profile/'
    }

    updateUser() {
        return REACT_NATIVE_APP_BASE_URL + '/user-management/user/updateUser'
    }

}
export default new ProfileService()