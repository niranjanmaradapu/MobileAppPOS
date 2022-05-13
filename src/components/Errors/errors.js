export const urmErrorMessages = {
  userName: "/ Username must be 3-25 characters long",
  nanme: "/ Name must be 3-25 characters long",
  roleName: "/ Rolename must be 3-25 characters long",
  password: "/ Password must be 8-25 characters long",
  createPassword: '/ Use 8-25 characters with a mix of letters, numbers & symbols',
  confirmPassword: "/ Passwords are not matching",
  passwordSpace: "/ whitespaces are not allowed in passwords",
  mobile: "/ Enter a valid 10 digit mobile number",
  email: "/ Enter a valid Email Id, ex: someone@example.com",
  orginisation: "/ Organisation name must be 3-25 characters long",
  description: "/ Enter the Description",
  customerName: "/ Customer name must be 3-25 characters",
}

export const inventoryErrorMessages = {
  name: "/ Name must be 3-25 characters long",
  divisionId: "/ Please select the Division",
  sectionId: "/ Please select the Section",
  subSectionId: "/ Please select the Sub Section",
  category: "/ Please select the category",
  colour: "/ Colour must be 3-12 characters long",
  batchNo: "/ please enter the BatchNo",
  costPrice: "/ Please enter the Cost Price",
  listPrice: "/ Please enter the List Price",
  uom: "/ Please select the UOM",
  hsnCode: "/ Please select the HSN Code",
  empId: "/ Emp Id must be 3-10 characters long",
  qty: "/ Please enter the Qty",
}

export const accountingErrorMessages = {
  domain: "/ Please select the Domain",
  state: "/ Please select the state",
  district: "/ Please select the district",
  storeName: "/ Store Name must be 3 characters or more",
  gst: "/ Enter the valid GST Number"
}

export const errorLength = {
  name: 3,
  storeName: 3,
  roleName: 3,
  barcodeName: 3,
  mobile: 10,
  password: 8,
  smNumber: 4,
  colour: 3,
  empId: 3,
  orginisation: 3,
  gstNumber: 15,
  gvNumber: 8,
}

export const errorLengthMax = {
  name: 25,
  password: 25,
  batchNo: 12,
  mobile: 10,
  color: 12,
  empId: 10,
  organisation: 25
}