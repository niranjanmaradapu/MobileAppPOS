import {errorLength, urmErrorMessages} from './errors'
var passwordReg = /([^a-zA-Z0-9\s])\w+/g

class validation {


  validateRegisterPage() {
    
  }

  newpassword(password, confirmPassword) {
    let isFormValid = true
    let errors = {}

    if (password === undefined || password.length < errorLength.password || passwordReg.test(password) === false) {
      isFormValid = false
      errors["password1"] = urmErrorMessages.createPassword
    } else {
      errors["password1"] = ""
    }

    console.log(confirmPassword, password)
    if (confirmPassword === undefined || confirmPassword.length < errorLength.password || password !== confirmPassword) {
      isFormValid = false
      errors["password2"] = urmErrorMessages.confirmPassword
    }

    return {isFormValid, errors}
  }

}

export default new validation()