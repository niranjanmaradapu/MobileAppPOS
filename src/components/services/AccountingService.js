import axios from "axios"
import { ACCOUNTING_PORTAL } from '../../commonUtils/ApiConstants'
import { BASE_URL } from '../../commonUtils/Base'

class AccountingService {
  getCreditNotes(obj) {
    return axios.post(BASE_URL + ACCOUNTING_PORTAL.getCreditNotes, obj);
  }

  getDebitNotes(obj) {
    return axios.post(BASE_URL + ACCOUNTING_PORTAL.getCreditNotes, obj);
  }

  getAllMasterTax(){
        return axios.get(BASE_URL+ACCOUNTING_PORTAL.getAllTaxes);
  }

  getAllHsnCodes(){
        return axios.get(BASE_URL+ACCOUNTING_PORTAL.getAllHsnCodesData);
  }

  saveMasterTax(saveTax){
        return axios.post(BASE_URL+ACCOUNTING_PORTAL.saveMasterTax, saveTax);   
  }

  getAllMasterTax(){
        return axios.get(BASE_URL+ACCOUNTING_PORTAL.getAllTaxes);
  }

  getDescrition(){
        return axios.get(BASE_URL+ACCOUNTING_PORTAL.getDescritionData);
  }

  getTaxAppliesOn(){
      return axios.get(BASE_URL+ACCOUNTING_PORTAL.getTaxAppliesOnData);
      }

 saveHsnCode(saveHsnObj) {
  return axios.post(BASE_URL+ACCOUNTING_PORTAL.saveHsnCode, saveHsnObj);
}
}

export default new AccountingService()