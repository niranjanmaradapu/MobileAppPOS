// import React, { Component, useState } from 'react'
// import { View, Image, FlatList, Animated, ImageBackground, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ActivityIndicator, scrollview, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
// //import Menu from './Menu';
// //import Login from './Logsin';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// var deviceWidth = Dimensions.get('window').width;
// import { Table, TableWrapper, Row, Cell, Rows } from 'react-native-table-component';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import Constants from 'expo-constants';
// import Modal from "react-native-modal";
// import CreateCustomerService from '../services/CreateCustomerService';
// import axios from 'axios';
// import RazorpayCheckout from 'react-native-razorpay';
// import NewSaleService from '../services/NewSaleService';
// import { DrawerActions } from '@react-navigation/native';
// import { openDatabase } from 'react-native-sqlite-storage';
// import { ListItem, SearchBar } from "react-native-elements";
// // Connction to access the pre-populated db
// const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });
// import { RNCamera } from 'react-native-camera';
// import BarcodeMask from 'react-native-barcode-mask';
// import NetInfo from "@react-native-community/netinfo";
// import RNBeep from 'react-native-a-beep';
// import { Alert } from 'react-native';


// class NewSale extends Component {
//   constructor(props) {
//     super(props);
//     this.camera = null;
//     this.barcodeCodes = [];
//     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
//     // this.toggle = this.toggle.bind(this);
//     // this.navigate = this.props.navigation.navigate;
//     this.state = {
//       isFromProducts: false,
//       barcodeId: "",
//       mobileNumber: "",
//       altMobileNo: "",
//       name: "",
//       loading: false,
//       arrayData: [],
//       temp: [],
//       error: null,
//       search: null,
//       totalQty: 0,
//       qty: [false],
//       quantity: '',
//       totalAmount: 0,
//       gender: "Male",
//       gstNumber: "",
//       flagone: true,
//       flagtwo: false,
//       flagthree: false,
//       flagfour: false,
//       dob: "2021-06-21T18:30:00.000Z",
//       address: "",
//       modalVisible: true,
//       flagqtyModelOpen: false,
//       fromProducts: false,
//       inventoryBarcodeId: '',
//       inventoryProductName: '',
//       inventoryQuantity: '',
//       inventoryMRP: '',
//       inventoryDiscount: '',
//       inventoryNetAmount: '',
//       tableHead: ['S.No', 'Barcode', 'Product', 'Price Per Qty', 'Qty', 'Sales Rate'],
//       tableData: [
//       ],
//       camera: {
//         type: RNCamera.Constants.Type.back,
//         flashMode: RNCamera.Constants.FlashMode.auto,
//       }
//     }
//   }

//   handleBackButtonClick() {
//     // global.tableData = tableData
//     this.props.route.params.onGoBack();
//     this.props.navigation.goBack();
//     return true;
//   }

//   // global.barcodeId = e.data
//   //     this.props.route.params.onGoBack();
//   //     this.props.navigation.goBack();


//   async takePicture() {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options);
//       console.log(data.uri);
//     }
//   }

//   pendingView() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: 'lightgreen',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text>Waiting</Text>
//       </View>
//     );
//   }


//   //   toggleModal(visible) {
//   //     this.setState({ modalVisible: visible });
//   //  }
//   async componentDidMount() {
//     // const value = await AsyncStorage.getItem("tableData");
//     //   console.log(value)
//     //   this.setState({ tableData: JSON.parse(value)})
//     // if(this.state.isFromProducts === false){
//     this.setState({
//       tableData: this.props.route.params.tableData,
//       isFromProducts: this.props.route.params.isFromProducts,
//       // isFromAddProduct: this.props.route.params.isFromAddProduct,
//     });
//     this.setState({ fromProducts: true })
//     // }
//     //else{

//     // }
//     //if(this.props.route.params.isFromProducts === true){


//     // this.props.route.params.isFromProducts = false
//     // }

//     console.log(this.state.tableData)
//     // if (tableData.length === null) {
//     this.barcodeDBStore()
//     this.getItems()
//     if (this.state.barcodeId.length >= 1) {
//       this.inventoryCreate()
//     }
//     //   }
//   }

//   getItems = () => {
//     db.transaction(txn => {
//       txn.executeSql(
//         `SELECT * FROM tbl_item`,
//         [],
//         (sqlTxn, res) => {
//           let len = res.rows.length;
//           if (len > 0) {
//             let results = [];
//             for (let i = 0; i < len; i++) {
//               let item = res.rows.item(i)
//               let sno = String(this.state.tableData.length + 1)
//               let barcode = item["barcode"]
//               let itemDesc = item["itemDesc"]
//               let netAmount = String(item["netAmount"])
//               let qty = String(item["qty"])
//               let totalAmount = String(item["netAmount"])
//               let image = item['itemImage']

//               // this.state.quantity = qty
//               // this.state.totalQty = this.state.totalQty + item["qty"]
//               // this.state.totalAmount = this.state.totalAmount + item["netAmount"]
//               this.state.arrayData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount, image: image })
//               if (this.state.arrayData.length === 1) {
//                 this.setState({ arrayData: this.state.arrayData })
//               }
//               this.state.temp.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount, image: image })

//             }
//             //console.log(JSON.stringify(this.state.data));
//           }
//         },
//         error => {
//           console.log("error on getting categories " + error.message);
//         },
//       );
//     });
//   };


//   setResult = (results) => {
//     console.log('vinod data ---------' + len)
//   }

//   addAction = (item, index) => {
//     console.log('vinod data ---------' + item.barcode)
//     this.setState({ barcodeId: item.barcode })
//     this.barcodeDBStore()
//     this.setState({ flagone: true })
//     this.setState({ flagtwo: false })
//     this.setState({ flagthree: false })
//     this.setState({ flagfour: false })
//     // const qtyarr = [...this.state.arrayData];
//     // //this.setState({ barcodeId: text })
//     // let sno = String(this.state.tableData.length + 1)
//     // let barcode = qtyarr[index].barcode
//     // //let barcode = item["barcode"]
//     // let itemDesc = qtyarr[index].itemdesc
//     // //let itemDesc = item["itemDesc"]
//     // let qty = qtyarr[index].qty
//     // let netAmount = qtyarr[index].netamount
//     // //let netAmount = String(item["netAmount"])
//     // // let qty = String(item["qty"])

//     // let totalAmount = String(qtyarr[index].netamount)
//     // //console.log(JSON.stringify(item))
//     // this.state.quantity = qty
//     // this.state.totalQty = (parseInt(this.state.totalQty) + parseInt(qtyarr[index].qty)).toString()
//     // this.state.totalAmount = (parseInt(this.state.totalAmount) + parseInt(qtyarr[index].netamount) * qty)
//     // //this.state.tableData.push([sno, barcode, itemDesc, netAmount, qty, netAmount])
//     // this.state.tableData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount })
//     // // this.barcodeDBStore()
//     // this.setState({ flagone: true })
//     // this.setState({ flagtwo: false })
//     // this.setState({ flagthree: false })
//     // this.setState({ flagfour: false })
//   }

//   renderHeader = () => {
//     return <View>
//       <SearchBar containerStyle={{ marginRight: 40 }} placeholder="Search Here..."
//         lightTheme round editable={true}
//         value={this.state.search}
//         onChangeText={this.updateSearch} >
//       </SearchBar>

//       <TouchableOpacity style={{
//         position: 'absolute',
//         right: 10,
//         top: 20,
//       }} onPress={() => this.navigateToImageScanner()}>
//         <Image source={require('../assets/images/barcode.png')} />
//       </TouchableOpacity>

//       {/* this.props.navigation.navigate('AuthNavigation') */}

//     </View>

//   };

//   updateSearch = search => {
//     this.setState({ search }, () => {
//       if ('' == search) {
//         this.setState({
//           arrayData: [...this.state.temp]
//         });
//         return;
//       }
//       this.state.arrayData = this.state.temp.filter(function (item) {
//         return item.itemdesc.includes(search);
//       }).map(function ({ itemdesc, netamount, barcode, qty }) {
//         return { itemdesc, netamount, barcode, qty };
//       });
//     });
//   };



//   barcodeDBStore = () => {
//     console.log('---------------------------------------------------');
//     db.transaction(txn => {
//       txn.executeSql(
//         'SELECT * FROM tbl_item where barcode = ?',
//         [this.state.barcodeId],
//         (sqlTxn, res) => {
//           let results = [];
//           let len = res.rows.length;
//           if (len > 0) {
//             for (let i = 0; i < len; i++) {
//               let item = res.rows.item(i)
//               let sno = String(this.state.tableData.length + 1)
//               let barcode = item["barcode"]
//               let itemDesc = item["itemDesc"]
//               let netAmount = String(item["netAmount"])
//               let qty = "1"//String(item["qty"])
//               let totalAmount = String(item["netAmount"])
//               let image = item['itemImage']
//               console.log(JSON.stringify(item))
//               this.state.quantity = qty

//               if (this.state.tableData.length > 0) {
//                 for (let i = 0; i < this.state.tableData.length; i++) {
//                   if (this.state.barcodeId == this.state.tableData[i].barcode) {
//                     { RNBeep.beep() }
//                     console.log("search category" + JSON.stringify(res.rows.length));
//                     const qtyarr = [...this.state.tableData];
//                     qtyarr[i].qty = String(parseInt(qtyarr[i].qty) + 1) //parseInt(item["qty"]))
//                     this.setState({ tableData: qtyarr })
//                     this.setState({ totalAmount: this.state.totalAmount })
//                     AsyncStorage.setItem("tableData", JSON.stringify(this.state.tableData)).then(() => {
//                       console.log('table data saved')
//                     }).catch(() => {
//                       console.log('there is error saving token')
//                     })
//                     return
//                   }
//                   this.state.totalQty = this.state.totalQty + item["qty"]
//                   this.state.totalAmount = parseInt(this.state.totalAmount) + parseInt(item["netAmount"] * 1)
//                 }
//                 { RNBeep.beep() }
//                 this.setState({ totalAmount: this.state.totalAmount })
//                 this.state.tableData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount, image: image })
//               }
//               else {
//                 { RNBeep.beep() }
//                 this.state.totalQty = this.state.totalQty + item["qty"]
//                 this.state.totalAmount = parseInt(this.state.totalAmount) + parseInt(item["netAmount"] * 1)
//                 this.state.tableData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount, image: image })
//               }
//               //parse this.state.totalAmount + item["netAmount"]
//               // this.state.tableData.push([sno, barcode, itemDesc, netAmount, qty, netAmount])
//             }
//           }
//           AsyncStorage.setItem("tableData", JSON.stringify(this.state.tableData)).then(() => {
//             console.log('table data saved')
//           }).catch(() => {
//             console.log('there is error saving token')
//           })
//           console.log(JSON.stringify(this.state.tableData.length))
//           console.log(JSON.stringify(totalQty))
//         },
//         error => {
//           console.log("error on search category " + error.message);
//         },
//       );
//     });
//   }

//   modelCancel() {
//     this.setState({ modalVisible: false });
//   }

//   handleInventoryBarcode = (text) => {
//     this.setState({ inventoryBarcodeId: text })
//   }
//   handleInventoryProductName = (text) => {
//     this.setState({ inventoryProductName: text })
//   }
//   handleInventoryQuantity = (value) => {
//     this.setState({ inventoryQuantity: value });
//   }

//   handleInventoryMRP = (text) => {
//     this.setState({ inventoryMRP: text })
//   }
//   handleInventoryDiscount = (text) => {
//     this.setState({ inventoryDiscount: text })
//     console.log(this.state.inventoryMRP)
//     console.log(text)
//     this.setState({ inventoryNetAmount: (parseInt(this.state.inventoryMRP) - parseInt(text)).toString() })
//   }
//   handleInventoryNetAmount = (text) => {
//     this.setState({ inventoryNetAmount: text });
//   }

//   handleMobileNumber = (text) => {
//     this.setState({ mobileNumber: text })
//   }
//   handleAltNumber = (text) => {
//     this.setState({ altMobileNo: text })
//   }
//   handlename = (value) => {
//     this.setState({ name: value });
//   }

//   handleGender = (text) => {
//     this.setState({ gender: text })
//   }
//   handleGstnumber = (text) => {
//     this.setState({ gstNumber: text })
//   }
//   handledob = (value) => {
//     this.setState({ dob: value });
//   }

//   handleaddress = (value) => {
//     this.setState({ address: value });
//   }

//   handleBarCode = (text) => {
//     this.setState({ barcodeId: text })
//   }

//   inventoryCreate() {
//     db.transaction(txn => {
//       txn.executeSql(
//         `CREATE TABLE IF NOT EXISTS tbl_item(item_id INTEGER PRIMARY KEY AUTOINCREMENT, barcode VARCHAR(20), itemDesc VARCHAR(20), qty INT(5), mrp INT(30), promoDisc INT(30), netAmount INT(30), salesMan INT(30), createdDate VARCHAR(255),lastModified VARCHAR(255))`,
//         [],
//         (sqlTxn, res) => {
//           console.log("table created successfully");
//         },
//         error => {
//           console.log("error on creating table " + error.message);
//         },
//       );
//     });
//     db.transaction(txn => {
//       txn.executeSql(
//         'INSERT INTO tbl_item ( barcode, itemDesc, qty, mrp, promoDisc, netAmount, salesMan, createdDate, lastModified) VALUES (?,?,?,?,?,?,?,?,?)',
//         [this.state.inventoryBarcodeId, this.state.inventoryProductName, parseInt(this.state.inventoryQuantity), parseInt(this.state.inventoryMRP), parseInt(this.state.inventoryDiscount), parseInt(this.state.inventoryNetAmount), 0, "2021-09-08T17:34:03.015299", "2021-09-09T00:13:42.671451"],
//         //[, String(getListOfBarcodes[0][0]["itemDesc"]), getListOfBarcodes[0][0]["qty"], , getListOfBarcodes[0][0]['promoDisc'], getListOfBarcodes[0][0]['netAmount'], getListOfBarcodes[0][0]['salesMan'], String(getListOfBarcodes[0][0]['createdDate']), String(getListOfBarcodes[0][0]['lastModified'])],
//         (sqlTxn, res) => {

//           console.log(`added successfully`);
//           this.setState({ arrayData: [] })
//           this.setState({ temp: [] })
//           this.setState({ search: null })
//           this.getItems()
//           this.setState({ flagone: false })
//           this.setState({ flagtwo: false })
//           this.setState({ flagthree: true })

//         },
//         error => {
//           console.log("error on adding category " + error.message);
//         },
//       );
//     });
//   }

//   endEditing() {
//     console.log("end edited")
//     this.barcodeDBStore()
//   }



//   handleQty = (text) => {
//     this.setState({ quantity: text })
//     // this.componentDidMount()
//   }


//   modelCreate() {
//     const params = {
//       "mobileNumber": this.state.mobileNumber,
//       "altMobileNo": this.state.altMobileNo,
//       "name": this.state.name,
//       "gender": 'Male',
//       "gstNumber": this.state.gstNumber,
//       "dob": "2021-06-21T18:30:00.000Z",
//       "anniversary": "1",
//       "address": this.state.address,
//     }
//     console.log('obj' + JSON.stringify(params))
//     console.log(CreateCustomerService.createCustomer())
//     axios.post(CreateCustomerService.createCustomer(), params).then((res) => {
//       console.log(res)
//       if (res.data.statusCode === "OK") {
//         this.setState({ modalVisible: false });
//         // toast.success(res.data.body);
//         this.setState({
//           mobileNumber: "",
//           altMobileNo: "",
//           name: "",
//           gender: "Male",
//           gstNumber: "",
//           dob: "",
//           anniversary: "",
//           address: ""
//         })

//       }
//       else {

//       }
//     });
//   }

//   payCash = () => {
//     console.log('tapped')
//     for (let j = 0; j < this.state.tableData.length; j++) {
//       for (let i = 0; i < this.state.arrayData.length; i++) {
//         if (parseInt(this.state.tableData[j].qty) > parseInt(this.state.arrayData[i].qty)) {
//           alert(`the quantity for  ${this.state.arrayData[i].itemdesc} is only ${this.state.arrayData[i].qty} available in inventory.Please select qty below ${this.state.arrayData[i].qty} only`);
//         }
//         else if (parseInt(this.state.tableData[j].qty) === parseInt(this.state.arrayData[i].qty)) {
//           db.transaction(txn => {
//             txn.executeSql(
//               'DELETE FROM  tbl_item where barcode=?',
//               [this.state.tableData[i].barcode],
//               (sqlTxn, res) => {
//                 console.log("deleted successfully");
//                 this.setState({ tableData: [] })
//                 // this.props.navigation.navigate('Orders', { total: this.state.totalAmount, payment: 'cash' })
//                 this.props.navigation.navigate('Home')
//               },
//               error => {
//                 console.log("error on search category " + error.message);
//               },
//             );
//           });
//         }
//         else {
//           db.transaction(txn => {
//             txn.executeSql(
//               'UPDATE tbl_item set qty=? where barcode=?',
//               [parseInt(this.state.arrayData[i].qty) - parseInt(this.state.tableData[j].qty), this.state.tableData[i].barcode],
//               (sqlTxn, res) => {
//                 console.log("updated successfully");
//                 this.setState({ tableData: [] })
//                 //  this.props.navigation.navigate('Orders', { total: this.state.totalAmount, payment: 'cash' })
//                 this.props.navigation.navigate('Home')
//                 console.log((parseInt(this.state.arrayData[i].qty) - parseInt(this.state.tableData[j].qty)).toString());
//               },
//               error => {
//                 console.log("error on search category " + error.message);
//               },
//             );
//           });
//         }
//       }
//     }

//     // alert(`Please Pay  Rs ${this.state.totalAmount} and inventory updated based on this transaction`);
//   }

//   pay = () => {
//     NetInfo.addEventListener(state => {
//       if (state.isConnected) {
//         //  console.log(this.state.totalAmount)
//         const params = {
//           "amount": JSON.stringify(this.state.totalAmount),
//           "info": "order_request"
//         }

//         axios.post(NewSaleService.payment(), params).then((res) => {
//           // this.setState({isPayment: false});
//           const data = JSON.parse(res.data["result"])

//           //console.log()
//           var options = {
//             description: 'Transaction',
//             image: 'https://i.imgur.com/3g7nmJC.png',
//             currency: data.currency,
//             order_id: data.id,
//             key: 'rzp_test_z8jVsg0bBgLQer', // Your api key
//             amount: data.amount,
//             name: 'OTSI',
//             prefill: {
//               name: "Kadali",
//               email: "kadali@gmail.com",
//               contact: "9999999999",
//             },
//             theme: { color: '#F37254' }
//           }
//           console.log(options)
//           RazorpayCheckout.open(options).then((data) => {
//             // handle success
//             this.setState({ tableData: [] })
//             alert(`Success: ${data.razorpay_payment_id}`);
//             this.props.navigation.navigate('Orders', { total: this.state.totalAmount, payment: 'RazorPay' })
//           }).catch((error) => {
//             console.log(error)
//             // handle failure
//             alert(`Error: ${JSON.stringify(error.code)} | ${JSON.stringify(error.description)}`);
//           });
//         }
//         )
//       }
//       else {
//         alert('Please check your Internet Connection');
//       }
//     })
//   }

//   menuAction() {
//     this.props.navigation.dispatch(DrawerActions.openDrawer())
//   }

//   topbarAction1() {
//     this.setState({ flagone: true })
//     this.setState({ flagtwo: false })
//     this.setState({ flagthree: false })
//     this.setState({ flagfour: false })
//   }


//   topbarAction2() {
//     this.setState({ inventoryBarcodeId: '' });
//     this.setState({ inventoryNetAmount: '' });
//     this.setState({ modalVisible: true });
//     this.setState({ flagone: false })
//     this.setState({ flagtwo: true })
//     this.setState({ flagthree: false })
//     this.setState({ flagfour: false })
//   }


//   topbarAction3() {
//     this.setState({ arrayData: [] })
//     this.setState({ temp: [] })
//     this.setState({ search: null })
//     this.setState({ flagone: false })
//     this.setState({ flagtwo: false })
//     this.setState({ flagthree: true })
//     this.setState({ flagfour: false })
//     this.getItems()
//   }


//   topbarAction4() {
//     this.setState({ flagone: false })
//     this.setState({ flagtwo: false })
//     this.setState({ flagthree: false })
//     this.setState({ flagfour: true })
//   }

//   refresh() {
//     //if( global.barcodeId != 'something'){
//     this.setState({ barcodeId: global.barcodeId })
//     this.barcodeDBStore()
//     this.setState({ flagone: true })
//     this.setState({ flagtwo: false })
//     this.setState({ flagthree: false })
//     this.setState({ flagfour: false })
//     // }
//   }

//   getBarcode() {
//     //if( global.barcodeId != 'something'){
//     this.setState({ inventoryBarcodeId: global.barcodeId })
//     this.setState({ flagone: false })
//     this.setState({ flagtwo: true })
//     this.setState({ flagthree: false })
//     // }
//   }

//   navigateToScanCode() {
//     global.barcodeId = 'something'

//     //this.setState({ barcodeId: global.barcodeId })
//     this.props.navigation.navigate('ScanBarCode', {
//       isFromNewSale: true, isFromAddProduct: false,
//       onGoBack: () => this.refresh(),
//     });
//   }

//   navigateToGetBarCode() {
//     global.barcodeId = 'something'
//     //this.setState({ barcodeId: global.barcodeId })
//     this.props.navigation.navigate('ScanBarCode', {
//       onGoBack: () => this.getBarcode(),
//     });
//   }

//   navigateToImageScanner() {
//     this.props.navigation.navigate('ImageScanner')
//   }

//   updateQtyForTable = (text, index) => {
//     const qtyarr = [...this.state.tableData];
//     qtyarr[index].qty = text;
//     this.setState({ tableData: qtyarr })
//     // this.state.totalQty = (parseInt(this.state.totalQty) - parseInt(text)).toString()
//     this.state.totalQty = (parseInt(this.state.totalQty) + parseInt(qtyarr[index].qty)).toString()
//     this.state.totalAmount = (parseInt(this.state.totalAmount) + parseInt(qtyarr[index].netamount)).toString()
//   }

//   incrementForTable = (item, index) => {
//     const qtyarr = [...this.state.tableData];
//     var additem = parseInt(qtyarr[index].qty) + 1;
//     // var priceFor1 = parseInt(item.netAmount)
//     // var price = priceFor1  * additem;
//     // qtyarr[index].netamount = price.toString()
//     qtyarr[index].qty = additem.toString()
//     this.setState({ tableData: qtyarr })
//     AsyncStorage.setItem("tableData", JSON.stringify(this.state.tableData)).then(() => {
//       console.log('table data saved')
//     }).catch(() => {
//       console.log('there is error saving token')
//     })
//     // var minumsValue = parseInt(this.state.totalQty) - parseInt(qtyarr[index].qty)
//     //console.log('minusdd' + minumsValue)
//     //this.state.totalQty = parseInt(this.state.totalQty) - parseInt(qtyarr[index].qty)
//     // this.state.totalQty =  (parseInt(this.state.totalQty) + parseInt(qtyarr[index].qty)).toString()
//     this.state.totalAmount = (parseInt(this.state.totalAmount) + parseInt(qtyarr[index].netamount)).toString()

//   }

//   decreamentForTable = (item, index) => {
//     const qtyarr = [...this.state.tableData];
//     if (qtyarr[index].qty > 1) {

//       var additem = parseInt(qtyarr[index].qty) - 1;
//       qtyarr[index].qty = additem.toString()
//       this.setState({ tableData: qtyarr })
//     }
//     AsyncStorage.setItem("tableData", JSON.stringify(this.state.tableData)).then(() => {
//       console.log('table data saved')
//     }).catch(() => {
//       console.log('there is error saving token')
//     })
//     //this.state.totalQty = (parseInt(this.state.totalQty) - parseInt(qtyarr[index].qty)).toString()
//     this.state.totalAmount = (parseInt(this.state.totalAmount) - parseInt(qtyarr[index].netamount)).toString()

//   }



//   updateQty = (text, index) => {
//     const qtyarr = [...this.state.arrayData];
//     qtyarr[index].qty = text;
//     this.setState({ arrayData: qtyarr })
//   }

//   updateQtyValue = (text, index) => {
//     const qtyarr = [...this.state.arrayData];
//     //qtyarr[index].qty = text;
//     this.setState({ arrayData: qtyarr })
//   }

//   manageQunatity = (item, index) => {

//     this.setState({ flagqtyModelOpen: true })
//     this.setState({ modalVisible: true });

//   }

//   selectedQty = (item, index) => {
//     console.log('-------ITEM TAPPED')
//     this.setState({ flagqtyModelOpen: false })
//     this.setState({ modalVisible: false });
//   };

//   increment = (item, index) => {
//     const qtyarr = [...this.state.arrayData];
//     var additem = parseInt(qtyarr[index].qty) + 1;

//     // var priceFor1 = parseInt(item.netAmount)
//     // var price = priceFor1  * additem;
//     // qtyarr[index].netamount = price.toString()
//     qtyarr[index].qty = additem.toString()
//     db.transaction(txn => {
//       txn.executeSql(
//         'UPDATE tbl_item set qty=? where barcode=?',
//         [qtyarr[index].qty, item.barcode],
//         (sqlTxn, res) => {
//           console.log("updated successfully");
//         },
//         error => {
//           console.log("error on search category " + error.message);
//         },
//       );
//     });
//     this.setState({ arrayData: qtyarr })

//   }

//   decreament = (item, index) => {
//     const qtyarr = [...this.state.arrayData];
//     var additem = parseInt(qtyarr[index].qty) - 1;
//     qtyarr[index].qty = additem.toString()
//     db.transaction(txn => {
//       txn.executeSql(
//         'UPDATE tbl_item set qty=? where barcode=?',
//         [qtyarr[index].qty, item.barcode],
//         (sqlTxn, res) => {
//           console.log("updated successfully");
//         },
//         error => {
//           console.log("error on search category " + error.message);
//         },
//       );
//     });
//     this.setState({ arrayData: qtyarr })
//     if (qtyarr[index].qty > 0) {
//       this.setState({ arrayData: qtyarr })
//     }

//   }



//   render() {
//     console.log(global.barcodeId)
//     AsyncStorage.getItem("tokenkey").then((value) => {
//       console.log(value)
//     }).catch(() => {
//       console.log('there is error getting token')
//     })
//     const state = this.state;

//     const element = (data, index) => (
//       //   // <TouchableOpacity onPress={() => this._alertIndex(index)}>
//       //   //   <View style={styles.btn}>
//       //   //     <Text style={styles.btnText}>button</Text>
//       //   //   </View>
//       //   // </TouchableOpacity>

//       <TextInput style={styles.btn}
//         underlineColorAndroid="transparent"
//         placeholder=""
//         placeholderTextColor="#48596B"
//         color="#48596B"
//         ref={index}
//         textAlign={'center'}
//         textAlignVertical="center"
//         value={this.state.quantity}
//         autoCapitalize="none"
//         //   onSubmitEditing={value => {
//         //     this.setState({ value })
//         //     if (value) index.current.focus(); //assumption is TextInput ref is input_2
//         //  }}
//         onChangeText={this.handleQty}
//       // value={this.state.quantity}
//       // onFocus={() => this._alertIndex(index)}

//       // ref={inputemail => { this.emailValueInput = inputemail }}
//       />
//     );


//     // const element = (data, index) => (
//     //   <TouchableOpacity onPress={() => this._alertIndex(index)}>
//     //     <View style={styles.btn}>
//     //       <Text style={styles.btnText}>button</Text>
//     //     </View>
//     //   </TouchableOpacity>
//     // );

//     // return (
//     //   <ScrollView>
//     //     <View style={styles.container}>
//     //       <SafeAreaView style={styles.safeArea}>
//     //         <View style={styles.viewswidth}>
//     //           <Text style={styles.signUptext}> New Sale </Text>
//     //           <TouchableOpacity style={{
//     //             position: 'absolute',
//     //             left: 20,
//     //             top: 50,
//     //             width: 20,
//     //             height: 20,
//     //           }} onPress={() => this.menuAction()}>
//     //             <Image source={require('../assets/images/menu.png')} />
//     //           </TouchableOpacity>
//     //           <Image source={require('../assets/images/filter.png')} style={{
//     //             position: 'absolute',
//     //             right: 20,
//     //             top: 50,
//     //             width: 20,
//     //             height: 20,
//     //           }} />
//     //         </View>


//     //         {this.state.flagthree && (
//     //           // this.state.error != null ?
//     //           //   <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  }}>
//     //           //     <Text>{this.state.error}</Text>
//     //           //     <Button onPress={
//     //           //       () => {
//     //           //         this.getItems();
//     //           //       }
//     //           //     } title="Reload" />
//     //           //   </View> :
//     //           <View
//     //             style={{
//     //               flex: 1,
//     //               paddingHorizontal: 0,
//     //               paddingVertical: 0,
//     //               marginTop: 0
//     //             }}>
//     //             <FlatList
//     //               ListHeaderComponent={this.renderHeader}
//     //               data={this.state.arrayData}
//     //               keyExtractor={item => item.email}
//     //               renderItem={({ item, index }) => (
//     //                 <View style={{
//     //                   height: 80,
//     //                   backgroundColor: 'lightgray',
//     //                   margin: 5, borderRadius: 10,
//     //                   flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
//     //                 }}>
//     //                   <View style={{ flexDirection: 'column', width: '55%' }}>
//     //                     <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 20, fontFamily: 'bold' }}>
//     //                       Product name: {item.itemdesc}
//     //                     </Text>
//     //                     <Text style={{ fontSize: 15, marginBottom: 0, marginLeft: 20, fontFamily: 'bold' }}>
//     //                       Price: Rs {(parseInt(item.netamount) * item.qty).toString()}
//     //                     </Text>
//     //                     <Text style={{ fontSize: 15, marginBottom: 20, marginLeft: 20, fontFamily: 'regular' }}>
//     //                       Qty: {item.qty}
//     //                     </Text>

//     //                   </View>
//     //                   <TextInput
//     //                     style={{
//     //                       justifyContent: 'center',
//     //                       height: 30,
//     //                       width: 80,
//     //                       marginLeft: -80,
//     //                       marginTop: 30,
//     //                       borderColor: '#8F9EB717',
//     //                       borderRadius: 3,
//     //                       backgroundColor: 'white',
//     //                       borderWidth: 1,
//     //                       fontFamily: 'semibold',
//     //                       fontSize: 16
//     //                     }}
//     //                     underlineColorAndroid="transparent"
//     //                     placeholder="0"
//     //                     placeholderTextColor="#8F9EB7"

//     //                     value={'1PC'}
//     //                     onChangeText={(text) => this.updateQtyValue(text, index)}
//     //                   />
//     //                   <View style={{
//     //                     flexDirection: 'column',
//     //                     width: '45%',
//     //                     justifyContent: 'space-between',
//     //                     alignItems: 'center'
//     //                   }}>

//     //                     <TouchableOpacity
//     //                       style={{
//     //                         fontSize: 15, fontFamily: 'regular',
//     //                         right: 20, bottom: 10,
//     //                         backgroundColor: '#ED1C24', width: 60, height: 30,
//     //                         textAlign: 'center', justifyContent: 'center', marginTop: 15, //Centered horizontally
//     //                         alignItems: 'center', borderRadius: 20
//     //                       }}
//     //                       onPress={() => this.addAction(item, index)} >
//     //                       <Text style={{
//     //                         color: "#ffffff"
//     //                       }}>
//     //                         ADD
//     //                       </Text>
//     //                     </TouchableOpacity>
//     //                     <View style={{
//     //                       backgroundColor: 'grey',
//     //                       flexDirection: 'row',
//     //                       justifyContent: 'space-around',
//     //                       alignItems: 'center',
//     //                       height: 30,
//     //                       width: 90
//     //                     }}>
//     //                       <TouchableOpacity>
//     //                         <Text onPress={() => this.increment(item, index)}>+</Text>
//     //                       </TouchableOpacity>
//     //                       {/* <Text> {item.qty}</Text> */}
//     //                       <TextInput
//     //                         style={{
//     //                           justifyContent: 'center',
//     //                           margin: 20,
//     //                           height: 30,
//     //                           width: 30,
//     //                           marginTop: 10,
//     //                           marginBottom: 10,
//     //                           borderColor: '#8F9EB717',
//     //                           borderRadius: 3,
//     //                           backgroundColor: 'white',
//     //                           borderWidth: 1,
//     //                           fontFamily: 'semibold',
//     //                           fontSize: 16
//     //                         }}
//     //                         underlineColorAndroid="transparent"
//     //                         placeholder="0"
//     //                         placeholderTextColor="#8F9EB7"

//     //                         value={item.qty}
//     //                         onChangeText={(text) => this.updateQty(text, index)}
//     //                       />
//     //                       <TouchableOpacity>
//     //                         <Text onPress={() => this.decreament(item, index)}>-</Text>

//     //                       </TouchableOpacity>
//     //                     </View>
//     //                   </View>

//     //                 </View>
//     //               )}
//     //             />
//     //           </View>
//     //         )}

//     //         {this.state.flagone && (
//     //           <View style={{ flex: 1 }}>
//     //             {/* <RNCamera
//     //               ref={ref => {
//     //                 this.camera = ref;
//     //               }}
//     //               defaultTouchToFocus
//     //               flashMode={this.state.camera.flashMode}
//     //               mirrorImage={false}
//     //               onBarCodeRead={this.onBarCodeRead.bind(this)}
//     //               onFocusChanged={() => { }}
//     //               onZoomChanged={() => { }}
//     //               barCodeTypes={[RNCamera.Constants.BarCodeType.qr, 'qr']}
//     //               permissionDialogTitle={'Permission to use camera'}
//     //               permissionDialogMessage={'We need your permission to use your camera phone'}
//     //               style={styles.preview}
//     //               type={this.state.camera.type}>
//     //               <BarcodeMask />
//     //             </RNCamera> */}


//     //             <View style={[styles.overlay, styles.topOverlay]}>
//     //               <Text style={styles.scanScreenMessage}>Please place and scan the barcode here</Text>
//     //             </View>
//     //             <TextInput style={styles.input}
//     //               underlineColorAndroid="transparent"
//     //               placeholder="Enter Barcode"
//     //               placeholderTextColor="#8F9EB7"
//     //               textAlignVertical="center"
//     //               keyboardType={'default'}
//     //               autoCapitalize="none"
//     //               onEndEditing
//     //               onChangeText={(text) => this.handleBarCode(text)}
//     //               onEndEditing={() => this.endEditing()}
//     //             ///  onSubmitEditing={this.barcodeDBStore}

//     //             // value={this.state.username}
//     //             //   ref={inputemail => { this.emailValueInput = inputemail }}
//     //             />

//     //             <TouchableOpacity style={{
//     //               position: 'absolute',
//     //               right: 28,
//     //               top: 15,
//     //             }} onPress={() => this.navigateToScanCode()}>
//     //               <Image source={require('../assets/images/barcode.png')} />
//     //             </TouchableOpacity>

//     //             {/* this.props.navigation.navigate('AuthNavigation') */}

//     //           </View>
//     //         )}


//     //         {this.state.flagone && (
//     //           <View style={styles.tablecontainer}>
//     //             <Text style={styles.saleBillsText}> List Of Sale Items </Text>
//     //             <Text style={{
//     //               color: "#FFFFFF",
//     //               marginTop: 5,
//     //               fontFamily: "regular",
//     //               fontSize: 14, textAlign: 'center', width: 50,
//     //             }}> PAY </Text>

//     //             <Image source={this.state.flagfour ? require('../assets/images/topSelect.png') : null} style={{
//     //               left: 30, marginTop: 5,
//     //             }} />
//     //             {/* </TouchableOpacity> */}
//     //             {/* <Table borderStyle={{ borderWidth: 2, borderColor: '#FFFFFF', backgroundColor: "#FAFAFF" }}>
//     //               <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
//     //               {/* <Rows data={this.state.tableData} style={styles.head} textStyle={styles.textData} /> */}
//     //             {/* {
//     //                 state.tableData.map((rowData, index) => (
//     //                   <TableWrapper key={index} style={styles.head} textStyle={styles.textData}>
//     //                     {
//     //                       rowData.map((cellData, cellIndex) => (
//     //                         <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.textData} />
//     //                       ))
//     //                     }
//     //                   </TableWrapper>
//     //                 ))
//     //               } */}
//     //             {/* {state.tableData.map((rowData, index) => (
//     //                 <TableWrapper key={index} style={styles.row} textStyle={styles.textData}>
//     //                   {
//     //                     rowData.map((cellData, cellIndex) => (
//     //                       <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.textData} />
//     //                     ))
//     //                   }
//     //                 </TableWrapper>
//     //               ))
//     //               }
//     //             </Table>  */}

//     //             <FlatList
//     //               // ListHeaderComponent={this.renderHeader}
//     //               data={this.state.tableData}
//     //               keyExtractor={item => item.email}
//     //               renderItem={({ item, index }) => (
//     //                 <View style={{
//     //                   height: 80,
//     //                   backgroundColor: 'lightgray',
//     //                   margin: 5, borderRadius: 10,
//     //                   flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
//     //                 }}>
//     //                   <View style={{ flexDirection: 'column', width: '55%' }}>
//     //                     <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 20, fontFamily: 'bold' }}>
//     //                       Product name: {item.itemdesc}
//     //                     </Text>
//     //                     <Text style={{ fontSize: 15, marginBottom: 0, marginLeft: 20, fontFamily: 'bold' }}>
//     //                       Price: Rs {(parseInt(item.netamount) * item.qty).toString()}
//     //                     </Text>
//     //                     <Text style={{ fontSize: 15, marginBottom: 20, marginLeft: 20, fontFamily: 'regular' }}>
//     //                       Qty: {item.qty}
//     //                     </Text>
//     //                   </View>
//     //                   <TouchableOpacity onPress={() =>
//     //                     this.manageQunatity(item, index)

//     //                   }>
//     //                     <Text
//     //                       style={{
//     //                         justifyContent: 'center',
//     //                         height: 30,
//     //                         width: 80,
//     //                         marginLeft: -80,
//     //                         marginTop: 40,
//     //                         borderColor: '#8F9EB717',
//     //                         borderRadius: 3,
//     //                         backgroundColor: 'white',
//     //                         borderWidth: 1,
//     //                         fontFamily: 'semibold',
//     //                         fontSize: 16,
//     //                         borderRadius: 5,
//     //                       }}>
//     //                       {item.qty} PC
//     //                     </Text>
//     //                   </TouchableOpacity>

//     //                   {this.state.flagqtyModelOpen && (
//     //                     <View>
//     //                       <Modal isVisible={this.state.modalVisible}>
//     //                         <View style={{
//     //                           flex: 1, justifyContent: 'center', //Centered horizontally
//     //                           alignItems: 'center',
//     //                         }}>
//     //                           <View style={{
//     //                             position: 'absolute',
//     //                             right: 20,
//     //                             left: 20,
//     //                             alignItems: 'center',
//     //                             justifyContent: 'flex-start',
//     //                             backgroundColor: "#ffffff", borderRadius: 20,
//     //                           }}>
//     //                             <Text style={{
//     //                               color: "#ED1C24", fontFamily: "semibold", textAlign: 'center', marginTop: 10,
//     //                               fontSize: 12,
//     //                             }}>{item.itemdesc}</Text>
//     //                             <Text style={{
//     //                               color: "#ED1C24", fontFamily: "semibold", textAlign: 'center', marginTop: 10,
//     //                               fontSize: 12,
//     //                             }}> Available Quantitys </Text>
//     //                             <FlatList style={{ marginBottom: 20, }}
//     //                               // ListHeaderComponent={this.renderHeader}
//     //                               data={this.state.tableData}
//     //                               keyExtractor={item => item.email}
//     //                               renderItem={({ item, index }) => (
//     //                                 <TouchableOpacity onPress={() => this.selectedQty(item, index)}>
//     //                                   <View style={{
//     //                                     height: 80,
//     //                                     backgroundColor: 'lightgray',
//     //                                     margin: 5, borderRadius: 10,
//     //                                     flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
//     //                                   }}>
//     //                                     <View style={{ flexDirection: 'row', width: '100%' }}>
//     //                                       <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 20, fontFamily: 'bold' }}>
//     //                                         1Pc   :
//     //                                       </Text>
//     //                                       <Text style={{
//     //                                         textAlign: 'center', // <-- the magic
//     //                                         fontWeight: 'bold',
//     //                                         fontSize: 15,
//     //                                         marginTop: 10,
//     //                                         width: 200,
//     //                                       }}>
//     //                                         Rs. 80
//     //                                       </Text>
//     //                                       <Text style={{ fontSize: 15, position: "absolute", top: 10, right: 20, fontFamily: 'regular', textDecorationLine: 'line-through' }}>
//     //                                         Rs. 100
//     //                                       </Text>

//     //                                     </View>

//     //                                   </View>
//     //                                 </TouchableOpacity>
//     //                               )}
//     //                             />



//     //                           </View>
//     //                         </View>
//     //                       </Modal>
//     //                     </View>

//     //                   )}


//     //                   <View style={{
//     //                     flexDirection: 'column',
//     //                     width: '45%',
//     //                     justifyContent: 'space-between',
//     //                     alignItems: 'center'
//     //                   }}>
//     //                     {/* <TouchableOpacity
//     //                       style={{
//     //                         fontSize: 15, fontFamily: 'regular',
//     //                         right: 20, bottom: 10,
//     //                         backgroundColor: '#ED1C24', width: 170, height: 30,
//     //                         textAlign: 'center', justifyContent: 'center', marginTop: 15, //Centered horizontally
//     //                         alignItems: 'center', borderRadius: 20
//     //                       }}
//     //                       onPress={() => this.addAction(item, index)} >
//     //                       <Text style={{
//     //                         color: "#ffffff"
//     //                       }}>
//     //                         ADD TO NEW SALE
//     //                       </Text>
//     //                     </TouchableOpacity> */}
//     //                     <View style={{
//     //                       backgroundColor: 'grey',
//     //                       flexDirection: 'row',
//     //                       justifyContent: 'space-around',
//     //                       alignItems: 'center',
//     //                       height: 30,
//     //                       width: 90
//     //                     }}>
//     //                       <TouchableOpacity>
//     //                         <Text onPress={() => this.incrementForTable(item, index)}>+</Text>
//     //                       </TouchableOpacity>
//     //                       {/* <Text> {item.qty}</Text> */}
//     //                       <TextInput
//     //                         style={{
//     //                           justifyContent: 'center',
//     //                           margin: 20,
//     //                           height: 30,
//     //                           width: 30,
//     //                           marginTop: 10,
//     //                           marginBottom: 10,
//     //                           borderColor: '#8F9EB717',
//     //                           borderRadius: 3,
//     //                           backgroundColor: 'white',
//     //                           borderWidth: 1,
//     //                           fontFamily: 'semibold',
//     //                           fontSize: 16
//     //                         }}
//     //                         underlineColorAndroid="transparent"
//     //                         placeholder="0"
//     //                         placeholderTextColor="#8F9EB7"
//     //                         textAlignVertical="center"
//     //                         value={item.qty}
//     //                         onChangeText={(text) => this.updateQtyForTable(text, index)}
//     //                       />
//     //                       <TouchableOpacity>
//     //                         <Text onPress={() => this.decreamentForTable(item, index)}>-</Text>

//     //                       </TouchableOpacity>
//     //                     </View>
//     //                   </View>

//     //                 </View>

//     //               )}
//     //             />


//     //             {this.state.tableData.length != 0 && (
//     //               <View style={styles.TopcontainerforItems}>
//     //                 {/* <TouchableOpacity
//     //                   style={styles.qty}
//     //                 >
//     //                   <Text style={styles.signInButtonText}>  {this.state.totalQty} Qty </Text>
//     //                 </TouchableOpacity> */}

//     //                 <TouchableOpacity
//     //                   style={styles.itemscount}
//     //                 >
//     //                   <Text style={styles.signInButtonText}>  {this.state.tableData.length} Items </Text>
//     //                 </TouchableOpacity>

//     //                 <TouchableOpacity
//     //                   style={styles.itemDetail}

//     //                 >
//     //                   <Text style={{
//     //                     color: "#ED1C24", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
//     //                     fontSize: 12, position: 'absolute', marginTop: 0
//     //                   }}>
//     //                     Tax : ₹0.00 </Text>
//     //                   <Text style={{
//     //                     color: "#ED1C24", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
//     //                     fontSize: 12, position: 'absolute', marginTop: 15
//     //                   }}>
//     //                     Discount : ₹0.00 </Text>
//     //                   <Text style={{
//     //                     color: "#ED1C24", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
//     //                     fontSize: 12, position: 'absolute', marginTop: 30
//     //                   }}>
//     //                     Total Amount :   ₹{this.state.totalAmount}.00 </Text>

//     //                 </TouchableOpacity>
//     //               </View>
//     //             )}

//     //             {this.state.tableData.length != 0 && (
//     //               <View style={styles.TopcontainerforPay}>
//     //                 <TouchableOpacity
//     //                   style={styles.signInButton}
//     //                   onPress={() => this.payCash()} >

//     //                   <Text style={styles.signInButtonText}> Pay Cash </Text>
//     //                 </TouchableOpacity>
//     //                 <TouchableOpacity
//     //                   style={styles.signInButtonRight}
//     //                   onPress={() => this.pay()} >
//     //                   <Text style={styles.signInButtonText}> Pay Card </Text>
//     //                 </TouchableOpacity>

//     //               </View>
//     //             )}
//     //           </View>



//     //         )}

//     //         {this.state.flagfour && (
//     //           <TouchableOpacity
//     //             style={styles.signInButton}
//     //             onPress={() => this.pay()} >
//     //             <Text style={styles.signInButtonText}> PAY </Text>
//     //           </TouchableOpacity>
//     //         )}

//     //         {this.state.flagtwo && (
//     //           <View>
//     //             {/* <Modal isVisible={this.state.modalVisible}>
//     //                     <View style={{
//     //                       flex: 1, justifyContent: 'center', //Centered horizontally
//     //                       alignItems: 'center',
//     //                     }}>
//     //                       <View style={{ flexDirection: 'column', flex: 0, marginLeft: 20, marginRight: 20, backgroundColor: "#ffffff", borderRadius: 20, }}>
//     //                         <Text style={{
//     //                           color: "#ED1C24", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
//     //                           fontSize: 12,
//     //                         }}>Customer Details</Text>
//     //                         <Text style={styles.signInFieldStyle}> Mobile Number* </Text>
//     //                         <TextInput style={styles.input}
//     //                           underlineColorAndroid="transparent"
//     //                           placeholder=""
//     //                           placeholderTextColor="#0F2851"
//     //                           textAlignVertical="center"
//     //                           autoCapitalize="none"
//     //                           onChangeText={this.handleMobileNumber}
//     //                           ref={inputemail => { this.emailValueInput = inputemail }} />

//     //                         <Text style={styles.signInFieldStyle}> Alternative Mobile Number </Text>
//     //                         <TextInput style={styles.input}
//     //                           underlineColorAndroid="transparent"
//     //                           placeholder=""
//     //                           placeholderTextColor="#0F2851"
//     //                           textAlignVertical="center"
//     //                           autoCapitalize="none"
//     //                           onChangeText={this.handleAltNumber}
//     //                           ref={inputemail => { this.emailValueInput = inputemail }} />

//     //                         <Text style={styles.signInFieldStyle}> Name </Text>
//     //                         <TextInput style={styles.input}
//     //                           underlineColorAndroid="transparent"
//     //                           placeholder=""
//     //                           placeholderTextColor="#0F2851"
//     //                           textAlignVertical="center"
//     //                           autoCapitalize="none"
//     //                           onChangeText={this.handlename}
//     //                           ref={inputemail => { this.emailValueInput = inputemail }} />

//     //                         <Text style={styles.signInFieldStyle}> Gender </Text>
//     //                         <TextInput style={styles.input}
//     //                           underlineColorAndroid="transparent"
//     //                           placeholder=""
//     //                           placeholderTextColor="#0F2851"
//     //                           textAlignVertical="center"
//     //                           autoCapitalize="none"
//     //                           onChangeText={this.handleGender}
//     //                           ref={inputemail => { this.emailValueInput = inputemail }} />

//     //                         <Text style={styles.signInFieldStyle}> gst Number </Text>
//     //                         <TextInput style={styles.input}
//     //                           underlineColorAndroid="transparent"
//     //                           placeholder=""
//     //                           placeholderTextColor="#0F2851"
//     //                           textAlignVertical="center"
//     //                           autoCapitalize="none"
//     //                           onChangeText={this.handleGstnumber}
//     //                           ref={inputemail => { this.emailValueInput = inputemail }} />

//     //                         <Text style={styles.signInFieldStyle}> DOB </Text>
//     //                         <TextInput style={styles.input}
//     //                           underlineColorAndroid="transparent"
//     //                           placeholder=""
//     //                           placeholderTextColor="#0F2851"
//     //                           textAlignVertical="center"
//     //                           autoCapitalize="none"
//     //                           onChangeText={this.handledob}
//     //                           ref={inputemail => { this.emailValueInput = inputemail }} />

//     //                         <Text style={styles.signInFieldStyle}> Anniverary </Text>
//     //                         <TextInput style={styles.input}
//     //                           underlineColorAndroid="transparent"
//     //                           placeholder=""
//     //                           placeholderTextColor="#0F2851"
//     //                           textAlignVertical="center"
//     //                           autoCapitalize="none"
//     //                           onChangeText={this.handleEmail}
//     //                           ref={inputemail => { this.emailValueInput = inputemail }} />

//     //                         <Text style={styles.signInFieldStyle}> Address </Text>
//     //                         <TextInput style={styles.input}
//     //                           underlineColorAndroid="transparent"
//     //                           placeholder=""
//     //                           placeholderTextColor="#0F2851"
//     //                           textAlignVertical="center"
//     //                           autoCapitalize="none"
//     //                           onChangeText={this.handleaddress}
//     //                           ref={inputemail => { this.emailValueInput = inputemail }} />
//     //                         <View style={styles.TopcontainerforModel}>
//     //                           <TouchableOpacity
//     //                             style={{
//     //                               width: "50%",
//     //                               height: 50, backgroundColor: "#ECF7FF", borderBottomLeftRadius: 20,
//     //                             }}
//     //                             onPress={() => this.modelCancel()} >
//     //                             <Text style={{
//     //                               textAlign: 'center', marginTop: 15, color: "#ED1C24", fontSize: 15,
//     //                               fontFamily: "regular",
//     //                             }}> CANCEL </Text>
//     //                           </TouchableOpacity>

//     //                           <TouchableOpacity
//     //                             style={{
//     //                               width: "50%",
//     //                               height: 50, backgroundColor: "#ED1C24", borderBottomRightRadius: 20,
//     //                             }}
//     //                             onPress={() => this.modelCreate()} >
//     //                             <Text style={{
//     //                               textAlign: 'center', marginTop: 15, color: "#ffffff", fontSize: 15,
//     //                               fontFamily: "regular",
//     //                             }}> CREATE </Text>
//     //                           </TouchableOpacity>
//     //                         </View>
//     //                       </View>
//     //                     </View>
//     //                   </Modal> */}

//     //             {/* <Modal isVisible={this.state.modalVisible}> */}
//     //             <View style={{
//     //               flex: 1, justifyContent: 'center', //Centered horizontally
//     //               alignItems: 'center',
//     //             }}>
//     //               <View style={{ flexDirection: 'column', flex: 0, marginLeft: 20, marginTop: 20, marginRight: 20, backgroundColor: "#ffffff", borderRadius: 20, }}>
//     //                 <Text style={{
//     //                   color: "#ED1C24", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
//     //                   fontSize: 18,
//     //                 }}>Product Details</Text>
//     //                 <Text style={styles.signInFieldStyle}> Unique BarCode* </Text>
//     //                 <TextInput style={styles.input}
//     //                   underlineColorAndroid="transparent"
//     //                   placeholder="Enter Barcode"
//     //                   placeholderTextColor="lightgray"
//     //                   textAlignVertical="center"
//     //                   autoCapitalize="none"
//     //                   value={this.state.inventoryBarcodeId}
//     //                   onChangeText={this.handleInventoryBarcode}
//     //                   ref={inputemail => { this.emailValueInput = inputemail }} />

//     //                 <TouchableOpacity style={{
//     //                   position: 'absolute',
//     //                   right: 28,
//     //                   top: 70,
//     //                 }} onPress={() => this.navigateToGetBarCode()}>
//     //                   <Image source={require('../assets/images/barcode.png')} />
//     //                 </TouchableOpacity>


//     //                 <Text style={styles.signInFieldStyle}> Product Name* </Text>
//     //                 <TextInput style={styles.input}
//     //                   underlineColorAndroid="transparent"
//     //                   placeholder="Enter Productname"
//     //                   placeholderTextColor="lightgray"
//     //                   textAlignVertical="center"
//     //                   autoCapitalize="none"
//     //                   onChangeText={this.handleInventoryProductName}
//     //                   ref={inputemail => { this.emailValueInput = inputemail }} />

//     //                 <Text style={styles.signInFieldStyle}> Quantity* </Text>
//     //                 <TextInput style={styles.input}
//     //                   underlineColorAndroid="transparent"
//     //                   placeholder="Enter Quantity"
//     //                   placeholderTextColor="lightgray"
//     //                   textAlignVertical="center"
//     //                   autoCapitalize="none"
//     //                   onChangeText={this.handleInventoryQuantity}
//     //                   ref={inputemail => { this.emailValueInput = inputemail }} />


//     //                 <Text style={styles.signInFieldStyle}> MRP for 1 item* </Text>
//     //                 <TextInput style={styles.input}
//     //                   underlineColorAndroid="transparent"
//     //                   placeholder="Enter MRP"
//     //                   placeholderTextColor="lightgray"
//     //                   textAlignVertical="center"
//     //                   autoCapitalize="none"
//     //                   onChangeText={this.handleInventoryMRP}
//     //                   ref={inputemail => { this.emailValueInput = inputemail }} />


//     //                 <Text style={styles.signInFieldStyle}> Discount for 1 item* </Text>
//     //                 <TextInput style={styles.input}
//     //                   underlineColorAndroid="transparent"
//     //                   placeholder="Enter Discount Amount"
//     //                   placeholderTextColor="lightgray"
//     //                   textAlignVertical="center"
//     //                   autoCapitalize="none"
//     //                   onChangeText={this.handleInventoryDiscount}
//     //                   ref={inputemail => { this.emailValueInput = inputemail }} />

//     //                 <Text style={styles.signInFieldStyle}> Net Amount* </Text>
//     //                 <TextInput style={styles.input}
//     //                   underlineColorAndroid="transparent"
//     //                   placeholder="Enter Net Amount"
//     //                   placeholderTextColor="lightgray"
//     //                   textAlignVertical="center"
//     //                   autoCapitalize="none"
//     //                   value={this.state.inventoryNetAmount}
//     //                   onChangeText={this.handleInventoryNetAmount}
//     //                   ref={inputemail => { this.emailValueInput = inputemail }} />


//     //                 <View style={styles.TopcontainerforModel}>


//     //                   <TouchableOpacity
//     //                     style={{
//     //                       width: "100%",
//     //                       height: 50, backgroundColor: "#ED1C24", borderRadius: 20,
//     //                     }}
//     //                     onPress={() => this.inventoryCreate()} >
//     //                     <Text style={{
//     //                       textAlign: 'center', marginTop: 15, color: "#ffffff", fontSize: 15,
//     //                       fontFamily: "regular",
//     //                     }}> CREATE </Text>
//     //                     <Text> </Text>
//     //                     <Text> </Text>
//     //                     <Text> </Text>
//     //                   </TouchableOpacity>
//     //                 </View>
//     //               </View>
//     //             </View>
//     //             {/* </Modal>  */}

//     //           </View>
//     //         )}

//     //         {/* <Left>
//     //                             <Button transparent style={{ marginTop: -102, marginLeft: -162, width: 50, height: 50 }} onPress={() => this.props.navigation.openDrawer()}>
//     //                                 <Image
//     //                                     source={image}
//     //                                     style={{ width: 32, height: 32 }}
//     //                                 />
//     //                             </Button>
//     //                         </Left> */}

//     //       </SafeAreaView>
//     //       {/* <Text style={{backgroundColor: 'white'}}>New Sale Screen</Text>   */}
//     //     </View>
//     //   </ScrollView>
//     // )
//     return (
//       //   <ScrollView>
//       <View style={styles.container}>

//         {/* <SafeAreaView> */}
//         {this.state.isFromProducts === true && (<View style={styles.viewswidth}>
//           <TouchableOpacity style={{
//             position: 'absolute',
//             left: 10,
//             top: 30,
//             width: 40,
//             height: 40,
//           }} onPress={() => this.handleBackButtonClick()}>
//             <Image source={require('../assets/images/backButton.png')} />
//           </TouchableOpacity>

//           <Text style={{
//             position: 'absolute',
//             left: 70,
//             top: 47,
//             width: 300,
//             height: 20,
//             fontFamily: 'bold',
//             fontSize: 18,
//             color: '#353C40'
//           }}>  New Sale </Text>
//           <TouchableOpacity
//             style={{ position: 'absolute', right: 20, top: 47, backgroundColor: '#ED1C24', borderRadius: 5, width: 105, height: 32, }}
//             onPress={() => this.navigateToScanCode()}>
//             <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('ADD')} </Text>
//           </TouchableOpacity>

//           {/* <Image style={{position:'absolute',left:0,width:30,height:30,top:2}}source={require('../assets/images/backButton.png')} /> */}



//         </View>)}


//         {this.state.isFromProducts === false && (<View style={styles.viewswidth}>
//           <Text style={{
//             position: 'absolute',
//             left: 10,
//             top: 55,
//             width: 300,
//             height: 20,
//             fontFamily: 'bold',
//             fontSize: 18,
//             color: '#353C40'
//           }}> New Sale </Text>
//           <TouchableOpacity
//             style={{ position: 'absolute', right: 20, top: 47, backgroundColor: '#ED1C24', borderRadius: 5, width: 105, height: 32, }}
//             onPress={() => this.navigateToScanCode()} >
//             <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('ADD NEW')} </Text>
//           </TouchableOpacity>
//         </View>)}





// <View style={styles.Topcontainer}>
//       <TouchableOpacity style={{
//         backgroundColor: this.state.flagone ? "#1CA2FF" : "#ED1C24",
//         alignSelf: "flex-start",
//         //marginHorizontal: "1%",
//         marginBottom: 6,
//         width: "33.3%",
//         height: 50,
//         textAlign: "center",
//       }}
//         onPress={() => this.topbarAction1()} >
//         <View style={{
//           backgroundColor: this.state.flagone ? "#1CA2FF" : "#ED1C24",
//           alignSelf: "flex-start",
//           //marginHorizontal: "1%",
//           marginBottom: 6,
//           width: "33.3%",
//           height: 50,
//         }}>

//           <Text style={{
//             color: this.state.flagone ? "#FFFFFF" : "#BBE3FF",
//             marginTop: 10,
//             fontFamily: "regular", width: 100,
//             fontSize: 14, justifyContent: 'center',
//             alignItems: 'center',
//           }}> NEW SALE </Text>


//           <Image source={this.state.flagone ? require('../assets/images/topSelect.png') : null} style={{
//             left: 30, marginTop: 5,
//           }} />

//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity style={{
//         backgroundColor: this.state.flagtwo ? "#1CA2FF" : "#ED1C24",
//         alignSelf: "flex-start",
//         //marginHorizontal: "1%",
//         marginBottom: 6,
//         width: "33.3%",
//         height: 50,
//         textAlign: "center",
//       }}
//         onPress={() => this.topbarAction2()} >
//         <View style={{
//           backgroundColor: this.state.flagtwo ? "#1CA2FF" : "#ED1C24",
//           alignSelf: "flex-start",
//           //marginHorizontal: "1%",
//           marginBottom: 6,
//           width: "33.3%",
//           height: 50,
//           textAlign: "center",
//         }}>

//           <Text style={{
//             color: this.state.flagtwo ? "#FFFFFF" : "#BBE3FF",
//             marginTop: 10,
//             fontFamily: "regular",
//             fontSize: 14, textAlign: 'center', width: 100,
//           }}> ADD Product/Inventory</Text>
//           <Image source={this.state.flagtwo ? require('../assets/images/topSelect.png') : null} style={{
//             left: 30, marginTop: 5,
//           }} />
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity style={{
//         backgroundColor: this.state.flagthree ? "#1CA2FF" : "#ED1C24",
//         alignSelf: "flex-start",
//         //marginHorizontal: "1%",
//         marginBottom: 6,
//         width: "33.3%",
//         height: 50,
//         textAlign: "center",
//       }}
//         onPress={() => this.topbarAction3()} >
//         <View style={{
//           backgroundColor: this.state.flagthree ? "#1CA2FF" : "#ED1C24",
//           alignSelf: "flex-start",
//           //marginHorizontal: "1%",
//           marginBottom: 6,
//           width: "33.3%",
//           height: 50,
//           textAlign: "center",
//         }}>

//           <Text style={{
//             color: this.state.flagthree ? "#FFFFFF" : "#BBE3FF",
//             marginTop: 10,
//             fontFamily: "regular",
//             fontSize: 14, textAlign: 'center', width: 100,
//           }}> FIND ITEM  </Text>
//           <Image source={this.state.flagthree ? require('../assets/images/topSelect.png') : null} style={{
//             left: 30, marginTop: 5,
//           }} />
//         </View>
//       </TouchableOpacity>
//     </View>

//     < View
//           style={{
//             flex: 1,
//             paddingHorizontal: 0,
//             paddingVertical: 0,
//             marginTop: 0
//           }}>
//           <View>
//             <TextInput style={styles.input}
//               underlineColorAndroid="transparent"
//               placeholder="Enter Barcode"
//               placeholderTextColor="#6F6F6F60"
//               textAlignVertical="center"
//               keyboardType={'default'}
//               autoCapitalize="none"
//               onEndEditing
//               onChangeText={(text) => this.handleBarCode(text)}
//               onEndEditing={() => this.endEditing()}
//             />


//           </View>


//           <FlatList
//             //  ListHeaderComponent={this.renderHeader}
//             data={this.state.tableData}
//             keyExtractor={item => item.email}
//             renderItem={({ item, index }) => (
//               <View style={{
//                 height: 120,
//                 backgroundColor: '#FFFFFF',
//                 borderBottomWidth: 5,
//                 borderBottomColor: '#FBFBFB',
//                 flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
//               }}>

//                 <View style={{ flexDirection: 'column', height: 120, }}>
//                   <Image source={{ uri: item.image }} style={{
//                     position: 'absolute', left: 20, top: 15, width: 90, height: 90,
//                   }} />
//                   <Text style={{ fontSize: 16, marginTop: 10, marginLeft: 130, fontFamily: 'medium', color: '#353C40' }}>
//                     {item.itemdesc}
//                   </Text>
//                   <Text style={{ fontSize: 12, marginLeft: 130, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
//                     QUANTITY:
//                   </Text>
//                   <Text style={{ fontSize: 12, marginLeft: 195, marginTop: -16, fontFamily: 'medium', color: '#353C40' }}>
//                     {item.qty} Pieces
//                   </Text>
//                   <Text style={{ fontSize: 12, marginLeft: 130, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
//                     PRICE/EACH:
//                   </Text>
//                   <Text style={{ fontSize: 12, marginLeft: 205, marginTop: -15, fontFamily: 'medium', color: '#ED1C24' }}>
//                     ₹ {(parseInt(item.netamount)).toString()}
//                   </Text>
//                   <Text style={{ fontSize: 12, marginLeft: 235, marginTop: -15, fontFamily: 'regular', color: '#808080', textDecorationLine: 'line-through' }}>
//                     Rs. 100
//                   </Text>
//                   <Text style={{ fontSize: 12, marginLeft: 130, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
//                     TOTAL:
//                   </Text>
//                   <Text style={{ fontSize: 12, marginLeft: 172, marginTop: -15, fontFamily: 'medium', color: '#ED1C24' }}>
//                     ₹ {(parseInt(item.netamount) * item.qty).toString()}
//                   </Text>
//                 </View>

//                 <View style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-around',
//                   alignItems: 'center',
//                   height: 30,
//                   marginRight: 20,
//                   width: 90,
//                   //borderWidth:1,
//                   //borderColor:'#ED1C24',
//                   // borderRadius:3,
//                 }}>
//                   <TouchableOpacity style={{
//                     borderColor: '#ED1C24',
//                     height: 28,
//                     width: 30, borderBottomLeftRadius: 3,
//                     borderTopLeftRadius: 3,
//                     borderBottomWidth: 1,
//                     borderTopWidth: 1,
//                     borderLeftWidth: 1, paddingLeft: 10, marginLeft: 20,
//                   }}>
//                     <Text style={{ alignSelf: 'center', marginTop: 2, marginLeft: -10, color: '#ED1C24' }}
//                       onPress={() => this.decreamentForTable(item, index)}>-</Text>
//                   </TouchableOpacity>
//                   {/* <Text> {item.qty}</Text> */}
//                   <TextInput
//                     style={{
//                       justifyContent: 'center',
//                       margin: 20,
//                       height: 28,
//                       width: 30,
//                       marginTop: 10,
//                       marginBottom: 10,
//                       borderColor: '#ED1C24',
//                       backgroundColor: 'white',
//                       color: '#353C40',
//                       borderWidth: 1,
//                       fontFamily: 'regular',
//                       fontSize: 12,
//                       paddingLeft: 9,
//                     }}
//                     underlineColorAndroid="transparent"
//                     placeholder="0"
//                     placeholderTextColor="#8F9EB7"

//                     value={item.qty}
//                     onChangeText={(text) => this.updateQty(text, index)}
//                   />
//                   <TouchableOpacity style={{
//                     borderColor: '#ED1C24',
//                     height: 28,
//                     width: 30, borderBottomRightRadius: 3,
//                     borderTopRightRadius: 3,
//                     borderBottomWidth: 1,
//                     borderTopWidth: 1,
//                     borderRightWidth: 1
//                   }}>
//                     <Text style={{ alignSelf: 'center', marginTop: 2, color: '#ED1C24' }}
//                       onPress={() => this.incrementForTable(item, index)}>+</Text>

//                   </TouchableOpacity>

//                 </View>

//               </View>

//             )}
//           />
//           {this.state.tableData.length != 0 && (
//             <View style={{ width: deviceWidth, height: 220, position: 'absolute', bottom: 0, backgroundColor: '#FFFFFF' }}>
//               <Text style={{
//                 color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 30, justifyContent: 'center', textAlign: 'center', marginTop: 10,
//                 fontSize: 14, position: 'absolute',
//               }}>
//                 Total Qty </Text>
//               <Text style={{
//                 color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 30, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
//                 fontSize: 14, position: 'absolute',
//               }}>
//                 55 </Text>
//               <Text style={{
//                 color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 60, justifyContent: 'center', textAlign: 'center', marginTop: 10,
//                 fontSize: 14, position: 'absolute',
//               }}>
//                 Total MRP </Text>
//               <Text style={{
//                 color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 60, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
//                 fontSize: 14, position: 'absolute',
//               }}>
//                 ₹ 1,660.00 </Text>
//               <Text style={{
//                 color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 90, justifyContent: 'center', textAlign: 'center', marginTop: 10,
//                 fontSize: 14, position: 'absolute',
//               }}>
//                 Promo Discount </Text>
//               <Text style={{
//                 color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 90, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
//                 fontSize: 14, position: 'absolute',
//               }}>
//                 ₹ 210.00 </Text>
//               <Text style={{
//                 color: "#353C40", fontFamily: "bold", alignItems: 'center', marginLeft: 16, top: 120, fontSize: 20, justifyContent: 'center', textAlign: 'center', marginTop: 10,
//                 fontSize: 14, position: 'absolute',
//               }}>
//                 Payable Amount </Text>
//               <Text style={{
//                 color: "#353C40", fontFamily: "bold", alignItems: 'center', marginLeft: 16, top: 120, fontSize: 20, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
//                 fontSize: 14, position: 'absolute',
//               }}>
//                 ₹ 1,450.00 </Text>


//               <View style={styles.TopcontainerforPay}>
//                 <TouchableOpacity
//                   style={styles.signInButton}
//                   onPress={() => this.payCash()} >

//                   <Text style={styles.signInButtonText}> Pay Cash </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.signInButtonRight}
//                   onPress={() => this.pay()} >
//                   <Text style={styles.signInButtonText}> Pay Card </Text>
//                 </TouchableOpacity>

//               </View>

//             </View>
//           )}
//         </View>
//       </View>




//     )
//   }
// }
// export default NewSale


// const pickerSelectStyles = StyleSheet.create({
//   placeholder: {
//     color: "#001B4A55",
//     fontFamily: "bold",
//     fontSize: 16,
//   },
//   inputIOS: {
//     marginLeft: 20,
//     marginRight: 20,
//     marginTop: 10,
//     height: 40,
//     backgroundColor: '#ffffff',
//     borderBottomColor: '#456CAF55',
//     color: '#001B4A',
//     fontFamily: "bold",
//     fontSize: 16,
//     borderRadius: 3,
//   },
//   inputAndroid: {
//     marginLeft: 20,
//     marginRight: 20,
//     marginTop: 10,
//     height: 40,
//     backgroundColor: '#ffffff',
//     borderBottomColor: '#456CAF55',
//     color: '#001B4A',
//     fontFamily: "bold",
//     fontSize: 16,
//     borderRadius: 3,
//   },
// })


// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#FAFAFF'
//   },


//   },

//   qty: {
//     backgroundColor: '#ED1C24',
//     justifyContent: 'center',
//     width: '18%',
//     marginTop: 10,
//     height: 40,
//     margin: 5,
//     borderRadius: 5,
//     fontWeight: 'bold',
//   },
//   imagealign: {
//     marginTop: 25,
//     marginRight: 34,
//   },
//   itemscount: {
//     backgroundColor: '#ED1C24',
//     justifyContent: 'center',
//     width: '18%',
//     marginLeft: 0,
//     marginTop: 10,
//     height: 40,
//     borderRadius: 5,
//     fontWeight: 'bold',
//     margin: 5,
//     // alignSelf:'center',
//     // marginBottom:100,
//   },
//   itemDetail: {
//     backgroundColor: '#ffffff',

//     width: '60%',
//     marginLeft: 0,
//     marginTop: 10,
//     height: 40,
//     borderRadius: 5,
//     fontWeight: 'bold',
//     margin: 5,
//     // alignSelf:'center',
//     // marginBottom:100,
//   },

//   signInButtonText: {
//     color: 'white',
//     alignSelf: 'center',
//     fontSize: 14,
//     fontFamily: "regular",
//   },
//   signInFieldStyle: {
//     color: 'black',
//     marginLeft: 20,
//     marginTop: 5,
//     fontSize: 18,
//     fontFamily: "regular",
//     textAlign: 'left',
//   },
//   findIteminput: {
//     marginLeft: 30,
//     marginRight: 30,
//     marginTop: 20,
//     marginBottom: 1000,
//     height: 50,
//     backgroundColor: "#DEF1FF",
//     borderRadius: 10,
//     color: '#001B4A',
//     fontFamily: "regular",
//     fontSize: 12,
//   },
//   qtyInput: {
//     width: 50,
//     height: 25,
//     // marginTop: 20,
//     // marginBottom: 1000,
//     // height: 50,
//     // backgroundColor: "#DEF1FF",
//     // borderRadius: 10,
//     // color: '#001B4A',
//     // fontFamily: "regular",
//     // fontSize: 12,
//   },
//   signUptext: {
//     marginTop: 40,
//     fontFamily: "regular",
//     alignSelf: 'center',
//     color: '#FFFFFF',
//     fontSize: 28,
//   },
//   saleBillsText: {
//     marginLeft: 0,
//     marginTop: -20,
//     marginBottom: 10,
//     fontFamily: "bold",
//     color: '#0F2851',
//     fontSize: 14,
//   },
//   tablecontainer: {
//     flex: 1,
//     // width:deviceWidth,
//     marginLeft: 20,
//     marginRight: 20,
//     padding: 20,
//     paddingTop: 30,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#FAFAFF'
//   },
//   head: {
//     height: 45,
//     borderColor: '#FAFAFF',
//     borderWidth: 1,
//     borderRadius: 10,
//   },
//   text: {
//     margin: 6,
//     color: "#ED1C24",
//     fontFamily: "semibold",
//     fontSize: 11,
//   },
//   textData: {
//     margin: 6,
//     color: "#48596B",
//     fontFamily: "regular",
//     fontSize: 10,
//   },

//   Topcontainer: {
//     flexDirection: 'row',
//     marginLeft: 0,
//     marginRight: 0,
//     width: '100%',
//     backgroundColor: 'grey',
//     height: 50
//   },

//   TopcontainerforModel: {
//     flexDirection: 'row',
//     marginLeft: 0,
//     marginRight: 0,
//     marginTop: 10,
//     width: '100%',
//     backgroundColor: 'grey',
//     borderRadius: 20,
//     height: 50,
//   },

//   TopcontainerforItems: {
//     flexDirection: 'row',
//     marginLeft: 0,
//     marginRight: 0,
//     marginTop: 10,
//     width: '100%',
//     backgroundColor: '#ffffff',
//     borderColor: 'lightgray',
//     borderRadius: 0,
//     height: 50,
//   },
//   redbox: {
//     backgroundColor: "#1CA2FF",
//     alignSelf: "flex-start",

//     //marginHorizontal: "1%",
//     marginBottom: 6,
//     width: "25%",
//     height: 45,
//     textAlign: "center",
//   },
//   bluebox: {
//     backgroundColor: "#ED1C24",
//     alignSelf: "flex-start",
//     //marginHorizontal: "1%",
//     marginBottom: 6,
//     width: "25%",
//     height: 45,
//     textAlign: "center",
//   },
//   blackbox: {
//     backgroundColor: "#ED1C24",
//     alignSelf: "flex-start",
//     //marginHorizontal: "1%",
//     marginBottom: 6,
//     width: "25%",
//     height: 45,
//     textAlign: "center",
//   },
//   greenbox: {
//     backgroundColor: "#ED1C24",
//     alignSelf: "flex-start",
//     //marginHorizontal: "1%",
//     marginBottom: 6,
//     width: "25%",
//     height: 45,
//     textAlign: "center",
//   },





//   tabBar: {
//     flexDirection: 'row',
//     paddingTop: Constants.statusBarHeight,
//   },
//   tabItem: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 16,
//   },
//   box: {
//     width: 50,
//     height: 50,
//   },
//   row: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   button: {
//     paddingHorizontal: 8,
//     paddingVertical: 6,
//     //borderRadius: 4,
//     backgroundColor: "#ED1C24",
//     alignSelf: "flex-start",
//     //marginHorizontal: "1%",
//     marginBottom: 6,
//     width: "25%",
//     height: 45,
//     textAlign: "center",
//   },
//   selected: {
//     backgroundColor: "#BBE3FF",
//     borderWidth: 0,
//     backgroundColor: "#ED1C24",
//   },
//   buttonLabel: {
//     textAlign: "center",
//     color: "#BBE3FF",
//     fontFamily: "regular",
//     fontSize: 14,
//   },
//   selectedLabel: {
//     color: "white",
//     textAlign: "center",
//     alignSelf: "center",
//     marginTop: 10,
//     fontFamily: "regular",
//     fontSize: 14,
//   },
//   label: {
//     textAlign: "center",
//     marginBottom: 10,
//     fontSize: 24,
//   },

//   //model
//   modelcontainer: {
//     alignItems: 'center',
//     backgroundColor: '#ede3f2',
//     padding: 100
//   },
//   modal: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: '#f7021a',
//     padding: 100
//   },
//   modeltext: {
//     color: '#3f2949',
//     marginTop: 10
//   },
//   btn: {
//     width: 40, height: 18, borderWidth: 0.2, borderColor: '#48596B', fontFamily: "regular",
//     fontSize: 10,
//   },
//   btnText: { textAlign: 'center', color: '#fff' }


//   ,
//   preview: {
//     margin: 20,
//     height: 300,
//     marginTop: 5,
//     marginBottom: 10,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   overlay: {
//     position: 'absolute',
//     padding: 16,
//     right: 0,
//     left: 0,
//     alignItems: 'center'
//   },
//   topOverlay: {
//     top: 0,
//     flex: 1,
//     marginLeft: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   bottomOverlay: {
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   enterBarcodeManualButton: {
//     padding: 15,
//     backgroundColor: 'white',
//     borderRadius: 40
//   },
//   scanScreenMessage: {
//     fontSize: 14,
//     color: 'white',
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });


import React, { Component, useState } from 'react'
import { View, Image, FlatList, Animated, ImageBackground, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ActivityIndicator, scrollview, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
//import Menu from './Menu';
//import Login from './Logsin';
import AsyncStorage from '@react-native-async-storage/async-storage';
var deviceWidth = Dimensions.get('window').width;
import { Table, TableWrapper, Row, Cell, Rows } from 'react-native-table-component';
import { TabView, SceneMap } from 'react-native-tab-view';
import Constants from 'expo-constants';
import Modal from "react-native-modal";
import CreateCustomerService from '../services/CreateCustomerService';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import NewSaleService from '../services/NewSaleService';
import { DrawerActions } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import { ListItem, SearchBar } from "react-native-elements";
// Connction to access the pre-populated db
const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import NetInfo from "@react-native-community/netinfo";
import RNBeep from 'react-native-a-beep';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../loader';


class NewSale extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];
    this.state = {
      barcodeId: "",
      mobileNumber: "",
      altMobileNo: "",
      name: "",
      loading: false,
      arrayData: [],
      temp: [],
      error: null,
      search: null,
      totalQty: 0,
      qty: [false],
      quantity: '',
      totalAmount: 0,
      gender: "Male",
      gstNumber: "",
      dob: "2021-06-21T18:30:00.000Z",
      address: "",
      modalVisible: true,
      flagone: true,
      flagqtyModelOpen: false,
      flagtwo: false,
      flagthree: false,
      flagfour: false,
      inventoryBarcodeId: '',
      inventoryProductName: '',
      inventoryQuantity: '',
      inventoryMRP: '',
      inventoryDiscount: '',
      inventoryNetAmount: '',
      tableHead: ['S.No', 'Barcode', 'Product', 'Price Per Qty', 'Qty', 'Sales Rate'],
      tableData: [],
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      }
    }
  }


  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }


  //   toggleModal(visible) {
  //     this.setState({ modalVisible: visible });
  //  }
  async componentDidMount() {
    this.barcodeDBStore()
    this.getItems()
    // if (this.state.barcodeId.length >= 1) {
    //   this.inventoryCreate()
    // }
  }

  getItems = () => {
    this.setState({ arrayData: [] })
    this.setState({ temp: [] })
    this.setState({ search: null })
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM tbl_item`,
        [],
        (sqlTxn, res) => {
          let len = res.rows.length;
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i)
              let sno = String(this.state.tableData.length + 1)
              let barcode = item["barcode"]
              let itemDesc = item["itemDesc"]
              let netAmount = String(item["netAmount"])
              let qty = String(item["qty"])
              let totalAmount = String(item["netAmount"])
              let image = item['itemImage']

              this.state.arrayData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount, image: image })
              if (this.state.arrayData.length === 1) {
                this.setState({ arrayData: this.state.arrayData })
              }
              this.state.temp.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount, image: image })

            }
            console.log(this.state.arrayData)
          }
        },
        error => {
          console.log("error on getting categories " + error.message);
        },
      );
    });
  };


  setResult = (results) => {
    console.log('vinod data ---------' + len)
  }

  addAction = (item, index) => {
    console.log('vinod data ---------' + item.barcode)
    this.setState({ barcodeId: item.barcode })
    this.barcodeDBStore()
    this.setState({ flagone: true })
    this.setState({ flagtwo: false })
    this.setState({ flagthree: false })
    this.setState({ flagfour: false })
    // const qtyarr = [...this.state.arrayData];
    // //this.setState({ barcodeId: text })
    // let sno = String(this.state.tableData.length + 1)
    // let barcode = qtyarr[index].barcode
    // //let barcode = item["barcode"]
    // let itemDesc = qtyarr[index].itemdesc
    // //let itemDesc = item["itemDesc"]
    // let qty = qtyarr[index].qty
    // let netAmount = qtyarr[index].netamount
    // //let netAmount = String(item["netAmount"])
    // // let qty = String(item["qty"])

    // let totalAmount = String(qtyarr[index].netamount)
    // //console.log(JSON.stringify(item))
    // this.state.quantity = qty
    // this.state.totalQty = (parseInt(this.state.totalQty) + parseInt(qtyarr[index].qty)).toString()
    // this.state.totalAmount = (parseInt(this.state.totalAmount) + parseInt(qtyarr[index].netamount) * qty)
    // //this.state.tableData.push([sno, barcode, itemDesc, netAmount, qty, netAmount])
    // this.state.tableData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount })
    // // this.barcodeDBStore()
    // this.setState({ flagone: true })
    // this.setState({ flagtwo: false })
    // this.setState({ flagthree: false })
    // this.setState({ flagfour: false })
  }

  renderHeader = () => {
    return <View>
      <SearchBar containerStyle={{ marginRight: 40 }} placeholder="Search Here..."
        lightTheme round editable={true}
        value={this.state.search}
        onChangeText={this.updateSearch} >
      </SearchBar>

      <TouchableOpacity style={{
        position: 'absolute',
        right: 10,
        top: 20,
      }} onPress={() => this.navigateToImageScanner()}>
        <Image source={require('../assets/images/barcode.png')} />
      </TouchableOpacity>

      {/* this.props.navigation.navigate('AuthNavigation') */}

    </View>

  };

  updateSearch = search => {
    this.setState({ search }, () => {
      if ('' == search) {
        this.setState({
          arrayData: [...this.state.temp]
        });
        return;
      }
      this.state.arrayData = this.state.temp.filter(function (item) {
        return item.itemdesc.includes(search);
      }).map(function ({ itemdesc, netamount, barcode, qty }) {
        return { itemdesc, netamount, barcode, qty };
      });
    });
  };



  barcodeDBStore = () => {
    console.log('---------------------------------------------------');
    db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM tbl_item where barcode = ?',
        [this.state.barcodeId],
        (sqlTxn, res) => {
          let results = [];
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i)
              let sno = String(this.state.tableData.length + 1)
              let barcode = item["barcode"]
              let itemDesc = item["itemDesc"]
              let netAmount = String(item["netAmount"])
              let qty = "1"//String(item["qty"])
              let totalAmount = String(item["netAmount"])
              let image = item['itemImage']
              this.state.quantity = qty

              if (this.state.tableData.length > 0) {
                for (let i = 0; i < this.state.tableData.length; i++) {
                  if (this.state.barcodeId == this.state.tableData[i].barcode) {
                    { RNBeep.beep() }
                    console.log("search category" + JSON.stringify(res.rows.length));
                    const qtyarr = [...this.state.tableData];
                    qtyarr[i].qty = String(parseInt(qtyarr[i].qty) + 1) //parseInt(item["qty"]))
                    this.setState({ tableData: qtyarr })
                    this.setState({ totalAmount: this.state.totalAmount })
                    return
                  }
                  this.state.totalQty = this.state.totalQty + item["qty"]
                  this.state.totalAmount = parseInt(this.state.totalAmount) + parseInt(item["netAmount"] * 1)
                }
                { RNBeep.beep() }
                this.setState({ totalAmount: this.state.totalAmount })
                this.state.tableData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount, image: image })
              }
              else {
                { RNBeep.beep() }
                this.state.totalQty = this.state.totalQty + item["qty"]
                this.state.totalAmount = parseInt(this.state.totalAmount) + parseInt(item["netAmount"] * 1)
                this.state.tableData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount, image: image })
              }
              //parse this.state.totalAmount + item["netAmount"]
              // this.state.tableData.push([sno, barcode, itemDesc, netAmount, qty, netAmount])
            }
          }
          this.setState({ flagone: true })
          this.setState({ flagtwo: false })
          this.setState({ flagthree: false })
          this.setState({ flagfour: false })
          console.log(JSON.stringify(this.state.tableData.length))
          console.log(JSON.stringify(totalQty))
        },
        error => {
          console.log("error on search category " + error.message);
        },
      );
    });
  }

  modelCancel() {
    this.setState({ modalVisible: false });
  }

  handleInventoryBarcode = (text) => {
    this.setState({ inventoryBarcodeId: text })
  }
  handleInventoryProductName = (text) => {
    this.setState({ inventoryProductName: text })
  }
  handleInventoryQuantity = (value) => {
    this.setState({ inventoryQuantity: value });
  }

  handleInventoryMRP = (text) => {
    this.setState({ inventoryMRP: text })
  }
  handleInventoryDiscount = (text) => {
    this.setState({ inventoryDiscount: text })
    console.log(this.state.inventoryMRP)
    console.log(text)
    this.setState({ inventoryNetAmount: (parseInt(this.state.inventoryMRP) - parseInt(text)).toString() })
  }
  handleInventoryNetAmount = (text) => {
    this.setState({ inventoryNetAmount: text });
  }

  handleMobileNumber = (text) => {
    this.setState({ mobileNumber: text })
  }
  handleAltNumber = (text) => {
    this.setState({ altMobileNo: text })
  }
  handlename = (value) => {
    this.setState({ name: value });
  }

  handleGender = (text) => {
    this.setState({ gender: text })
  }
  handleGstnumber = (text) => {
    this.setState({ gstNumber: text })
  }
  handledob = (value) => {
    this.setState({ dob: value });
  }

  handleaddress = (value) => {
    this.setState({ address: value });
  }

  handleBarCode = (text) => {
    this.setState({ barcodeId: text })


  }

  async inventoryCreate() {
    if (this.state.inventoryBarcodeId.length === 0) {
      alert('Please Enter Barcode by using scan/Mannually');
    } else if (this.state.inventoryProductName.length === 0) {
      alert('Please Enter Product name');
    }
    else if (this.state.inventoryQuantity.length === 0) {
      alert('Please Enter Quantity');
    }
    else if (this.state.inventoryMRP.length === 0) {
      alert('Please Enter MRP');
    }
    else if (this.state.inventoryDiscount.length === 0) {
      alert('Please Enter Discount %');
    }
    else {
      this.setState({ loading: true })
      const response = await fetch(this.state.image.uri);
      const blob = await response.blob();
      console.log(blob)
      console.log(blob.size)

      db.transaction(txn => {
        txn.executeSql(
          `CREATE TABLE IF NOT EXISTS tbl_item(item_id INTEGER PRIMARY KEY AUTOINCREMENT, barcode VARCHAR(20), itemDesc VARCHAR(20), qty INT(5), mrp INT(30), promoDisc INT(30), netAmount INT(30), salesMan INT(30), createdDate VARCHAR(255),lastModified VARCHAR(255),itemImage BLOB)`,
          [],
          (sqlTxn, res) => {
            console.log("table created successfully");
          },
          error => {
            console.log("error on creating table " + error.message);
          },
        );
      });
      db.transaction(txn => {
        txn.executeSql(
          'INSERT INTO tbl_item ( barcode, itemDesc, qty, mrp, promoDisc, netAmount, salesMan, createdDate, lastModified,itemImage) VALUES (?,?,?,?,?,?,?,?,?,?)',
          [this.state.inventoryBarcodeId, this.state.inventoryProductName, parseInt(this.state.inventoryQuantity), parseInt(this.state.inventoryMRP), parseInt(this.state.inventoryDiscount), parseInt(this.state.inventoryNetAmount), 0, "2021-09-08T17:34:03.015299", "2021-09-09T00:13:42.671451", this.state.image.uri],
          (sqlTxn, res) => {
            this.setState({ loading: false })
            console.log(`added successfully`);
            this.setState({ arrayData: [] })
            this.setState({ temp: [] })
            this.setState({ search: null })
            this.getItems()
            this.setState({ flagone: false })
            this.setState({ flagtwo: false })
            this.setState({ flagthree: true })

          },
          error => {
            console.log("error on adding category " + error.message);
          },
        );
      });
    }
  }



  endEditing() {
    console.log("end edited")
    this.barcodeDBStore()
  }



  handleQty = (text) => {
    this.setState({ quantity: text })
    // this.componentDidMount()
  }


  modelCreate() {
    const params = {
      "mobileNumber": this.state.mobileNumber,
      "altMobileNo": this.state.altMobileNo,
      "name": this.state.name,
      "gender": 'Male',
      "gstNumber": this.state.gstNumber,
      "dob": "2021-06-21T18:30:00.000Z",
      "anniversary": "1",
      "address": this.state.address,
    }
    console.log('obj' + JSON.stringify(params))
    console.log(CreateCustomerService.createCustomer())
    axios.post(CreateCustomerService.createCustomer(), params).then((res) => {
      console.log(res)
      if (res.data.statusCode === "OK") {
        this.setState({ modalVisible: false });
        // toast.success(res.data.body);
        this.setState({
          mobileNumber: "",
          altMobileNo: "",
          name: "",
          gender: "Male",
          gstNumber: "",
          dob: "",
          anniversary: "",
          address: ""
        })

      }
      else {

      }
    });
  }

  payCash = () => {
    for (let j = 0; j < this.state.tableData.length; j++) {
      for (let i = 0; i < this.state.arrayData.length; i++) {
        if (parseInt(this.state.tableData[j].qty) > parseInt(this.state.arrayData[i].qty)) {
          alert(`the quantity for  ${this.state.arrayData[i].itemdesc} is only ${this.state.arrayData[i].qty} available in inventory.Please select qty below ${this.state.arrayData[i].qty} only`);
        }
        else if (parseInt(this.state.tableData[j].qty) === parseInt(this.state.arrayData[i].qty)) {
          db.transaction(txn => {
            txn.executeSql(
              'DELETE FROM  tbl_item where barcode=?',
              [this.state.tableData[i].barcode],
              (sqlTxn, res) => {
                console.log("deleted successfully");
                this.setState({ tableData: [] })
                this.props.navigation.navigate('Orders', { total: this.state.totalAmount, payment: 'cash' })
              },
              error => {
                console.log("error on search category " + error.message);
              },
            );
          });
        }
        else {
          db.transaction(txn => {
            txn.executeSql(
              'UPDATE tbl_item set qty=? where barcode=?',
              [parseInt(this.state.arrayData[i].qty) - parseInt(this.state.tableData[j].qty), this.state.tableData[i].barcode],
              (sqlTxn, res) => {
                console.log("updated successfully");
                this.setState({ tableData: [] })
                this.props.navigation.navigate('Orders', { total: this.state.totalAmount, payment: 'cash' })
                console.log((parseInt(this.state.arrayData[i].qty) - parseInt(this.state.tableData[j].qty)).toString());
              },
              error => {
                console.log("error on search category " + error.message);
              },
            );
          });
        }
      }
    }

    // alert(`Please Pay  Rs ${this.state.totalAmount} and inventory updated based on this transaction`);
  }

  pay = () => {
    NetInfo.addEventListener(state => {
      if (state.isConnected) {
        //  console.log(this.state.totalAmount)
        const params = {
          "amount": JSON.stringify(this.state.totalAmount),
          "info": "order_request"
        }

        axios.post(NewSaleService.payment(), params).then((res) => {
          // this.setState({isPayment: false});
          const data = JSON.parse(res.data["result"])

          //console.log()
          var options = {
            description: 'Transaction',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: data.currency,
            order_id: data.id,
            key: 'rzp_test_z8jVsg0bBgLQer', // Your api key
            amount: data.amount,
            name: 'OTSI',
            prefill: {
              name: "Kadali",
              email: "kadali@gmail.com",
              contact: "9999999999",
            },
            theme: { color: '#F37254' }
          }
          console.log(options)
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            this.setState({ tableData: [] })
            alert(`Success: ${data.razorpay_payment_id}`);
            this.props.navigation.navigate('Home')
            //this.props.navigation.navigate('Orders', { total: this.state.totalAmount, payment: 'RazorPay' })
          }).catch((error) => {
            console.log(error)
            // handle failure
            alert(`Error: ${JSON.stringify(error.code)} | ${JSON.stringify(error.description)}`);
          });
        }
        )
      }
      else {
        alert('Please check your Internet Connection');
      }
    })
  }

  menuAction() {
    this.props.navigation.dispatch(DrawerActions.openDrawer())
  }

  topbarAction1() {
    this.setState({ flagone: true })
    this.setState({ flagtwo: false })
    this.setState({ flagthree: false })
    this.setState({ flagfour: false })
  }


  topbarAction2() {
    

    this.setState({ inventoryBarcodeId: '' });
    this.setState({ inventoryProductName: '' });
    this.setState({ inventoryQuantity: '' });
    this.setState({ inventoryMRP: '' });
    this.setState({ inventoryDiscount: '' });
    this.setState({ inventoryNetAmount: '' });
   
    this.setState({ modalVisible: true });
    this.setState({ flagone: false })
    this.setState({ flagtwo: true })
    this.setState({ flagthree: false })
    this.setState({ flagfour: false })
  }


  topbarAction3() {
    this.setState({ arrayData: [] })
    this.setState({ temp: [] })
    this.setState({ search: null })
    this.setState({ flagone: false })
    this.setState({ flagtwo: false })
    this.setState({ flagthree: true })
    this.setState({ flagfour: false })
    this.getItems()
  }


  topbarAction4() {
    this.setState({ flagone: false })
    this.setState({ flagtwo: false })
    this.setState({ flagthree: false })
    this.setState({ flagfour: true })
  }

  refresh() {
    //if( global.barcodeId != 'something'){
    this.setState({ barcodeId: global.barcodeId })
    this.barcodeDBStore()
    this.setState({ flagone: true })
    this.setState({ flagtwo: false })
    this.setState({ flagthree: false })
    this.setState({ flagfour: false })
    // }
  }

  allProductsrefresh() {
    console.log(global.productname)
    this.setState({ search: global.productname })
    console.log('serach text is' + this.state.search)
    search = global.productname
    this.setState({ search }, () => {
      if ('' == search) {
        this.setState({
          arrayData: [...this.state.temp]
        });
        return;
      }
      this.state.arrayData = this.state.temp.filter(function (item) {
        return item.itemdesc.includes(search);
      }).map(function ({ itemdesc, netamount, barcode, qty, image }) {
        return { itemdesc, netamount, barcode, qty, image };
      });
    });
    this.forceUpdate()
  }

  getBarcode() {
    //if( global.barcodeId != 'something'){
    this.setState({ inventoryBarcodeId: global.barcodeId })
    this.setState({ flagone: false })
    this.setState({ flagtwo: true })
    this.setState({ flagthree: false })
    // }
  }

  refreshGetBarCode() {
    if (global.barcodeId != 'something') {
      this.setState({ inventoryBarcodeId: global.barcodeId })
    }
  }


  navigateToGetBarCode() {
    console.log('tapped')
    global.barcodeId = 'something'
    this.props.navigation.navigate('ScanBarCode', {
      isFromNewSale: false, isFromAddProduct: true,
      onGoBack: () => this.refreshGetBarCode(),
    });
  }


  navigateToScanCode() {
    global.barcodeId = 'something'
    //this.setState({ barcodeId: global.barcodeId })
    this.props.navigation.navigate('ScanBarCode', {
      onGoBack: () => this.refresh(),
    });
  }

  // navigateToGetBarCode() {
  //   global.barcodeId = 'something'
  //   //this.setState({ barcodeId: global.barcodeId })
  //   this.props.navigation.navigate('ScanBarCode', {
  //     onGoBack: () => this.getBarcode(),
  //   });
  // }

  navigateToImageScanner() {
    //this.props.navigation.navigate('ImageScanner')
    this.setState({ flagqtyModelOpen: true })
    this.setState({ modalVisible: true });
  }

  updateQtyForTable = (text, index) => {
    const qtyarr = [...this.state.tableData];
    qtyarr[index].qty = text;
    this.setState({ tableData: qtyarr })
    // this.state.totalQty = (parseInt(this.state.totalQty) - parseInt(text)).toString()
    this.state.totalQty = (parseInt(this.state.totalQty) + parseInt(qtyarr[index].qty)).toString()
    this.state.totalAmount = (parseInt(this.state.totalAmount) + parseInt(qtyarr[index].netamount)).toString()
  }

  incrementForTable = (item, index) => {
    const qtyarr = [...this.state.tableData];
    var additem = parseInt(qtyarr[index].qty) + 1;
    // var priceFor1 = parseInt(item.netAmount)
    // var price = priceFor1  * additem;
    // qtyarr[index].netamount = price.toString()
    qtyarr[index].qty = additem.toString()
    this.setState({ tableData: qtyarr })
    // var minumsValue = parseInt(this.state.totalQty) - parseInt(qtyarr[index].qty)
    //console.log('minusdd' + minumsValue)
    //this.state.totalQty = parseInt(this.state.totalQty) - parseInt(qtyarr[index].qty)
    // this.state.totalQty =  (parseInt(this.state.totalQty) + parseInt(qtyarr[index].qty)).toString()
    this.state.totalAmount = (parseInt(this.state.totalAmount) + parseInt(qtyarr[index].netamount)).toString()

  }

  decreamentForTable = (item, index) => {
    const qtyarr = [...this.state.tableData];
    var additem = parseInt(qtyarr[index].qty) - 1;
    qtyarr[index].qty = additem.toString()
    if (qtyarr[index].qty > 0) {
      this.setState({ tableData: qtyarr })
    }
    //this.state.totalQty = (parseInt(this.state.totalQty) - parseInt(qtyarr[index].qty)).toString()
    this.state.totalAmount = (parseInt(this.state.totalAmount) - parseInt(qtyarr[index].netamount)).toString()

  }



  updateQty = (text, index) => {
    const qtyarr = [...this.state.arrayData];
    qtyarr[index].qty = text;
    this.setState({ arrayData: qtyarr })
  }

  updateQtyValue = (text, index) => {
    const qtyarr = [...this.state.arrayData];
    //qtyarr[index].qty = text;
    this.setState({ arrayData: qtyarr })
  }

  manageQunatity = (item, index) => {

    this.setState({ flagqtyModelOpen: true })
    this.setState({ modalVisible: true });

  }

  selectedQty = (item, index) => {
    console.log('-------ITEM TAPPED')
    this.setState({ flagqtyModelOpen: false })
    this.setState({ modalVisible: false });
  };

  increment = (item, index) => {
    const qtyarr = [...this.state.arrayData];
    var additem = parseInt(qtyarr[index].qty) + 1;

    // var priceFor1 = parseInt(item.netAmount)
    // var price = priceFor1  * additem;
    // qtyarr[index].netamount = price.toString()
    qtyarr[index].qty = additem.toString()
    db.transaction(txn => {
      txn.executeSql(
        'UPDATE tbl_item set qty=? where barcode=?',
        [qtyarr[index].qty, item.barcode],
        (sqlTxn, res) => {
          console.log("updated successfully");
        },
        error => {
          console.log("error on search category " + error.message);
        },
      );
    });
    this.setState({ arrayData: qtyarr })

  }

  decreament = (item, index) => {
    const qtyarr = [...this.state.arrayData];
    var additem = parseInt(qtyarr[index].qty) - 1;
    qtyarr[index].qty = additem.toString()
    db.transaction(txn => {
      txn.executeSql(
        'UPDATE tbl_item set qty=? where barcode=?',
        [qtyarr[index].qty, item.barcode],
        (sqlTxn, res) => {
          console.log("updated successfully");
        },
        error => {
          console.log("error on search category " + error.message);
        },
      );
    });
    this.setState({ arrayData: qtyarr })
    if (qtyarr[index].qty > 0) {
      this.setState({ arrayData: qtyarr })
    }

  }

  pickSingleWithCameraForProductsAdd(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({ flagqtyModelOpen: false })
        this.setState({ modalVisible: false });
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
        this.getImageNameByScanForProductsAdd()
      })
      .catch((e) => {
        this.setState({ flagqtyModelOpen: false })
        this.setState({ modalVisible: false });
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }


  pickSingleForProductsAdd(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({ flagqtyModelOpen: false })
        this.setState({ modalVisible: false });
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
        this.getImageNameByScanForProductsAdd()
      })
      .catch((e) => {
        this.setState({ flagqtyModelOpen: false })
        this.setState({ modalVisible: false });
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });


  }

  pickSingleWithCamera(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({ flagqtyModelOpen: false })
        this.setState({ modalVisible: false });
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
        this.getImageNameByScan()
      })
      .catch((e) => {
        this.setState({ flagqtyModelOpen: false })
        this.setState({ modalVisible: false });
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }


  pickSingle(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({ flagqtyModelOpen: false })
        this.setState({ modalVisible: false });
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
        this.getImageNameByScan()
      })
      .catch((e) => {
        this.setState({ flagqtyModelOpen: false })
        this.setState({ modalVisible: false });
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });


  }

  imageAction() {
    console.log('tapped')
    this.setState({ flagqtyModelOpen: true })
    this.setState({ modalVisible: true });
  }


  cancel() {
    console.log('clicked')
    //this.setState({ modalVisible: true });
    this.setState({ flagqtyModelOpen: false })
    this.setState({ modalVisible: false });
  }

  async getImageNameByScanForProductsAdd() {
    const formData = new FormData();
    formData.append('image', {
      uri: this.state.image.uri, name: this.state.image.mime, type: this.state.image.mime
    });
    axios({
      url: NewSaleService.getImageScanning(),
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(response => {
        //const productname = response.data.result[0].name
        if (response.data) {
          console.log("response :", response.data.result[0].name);
          this.setState({ inventoryProductName: response.data.result[0].name })
          this.forceUpdate()
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  getImageNameByScan() {
    const formData = new FormData();
    formData.append('image', {
      uri: this.state.image.uri, name: this.state.image.mime, type: this.state.image.mime
    });
    axios({
      url: NewSaleService.getImageScanning(),
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(response => {
        if (response.data) {
          console.log("response :", response.data.result[0].name);
          console.log("response :", global.productname);
          // this.setState({ inventoryProductName: response.data.result[0].name})
          // if (global.productname == "something") {
          { RNBeep.beep() }
          global.productname = response.data.result[0].name
          this.allProductsrefresh()
          //    }
        }

      })
      .catch(function (error) {
        console.log(error);

      })

  }

  onEndReached() {
    this.listRef.scrollToOffset({ offset: 0, animated: true });
  }



  render() {
    console.log(global.barcodeId)
    AsyncStorage.getItem("tokenkey").then((value) => {
      console.log(value)
    }).catch(() => {
      console.log('there is error getting token')
    })
    const state = this.state;

    const element = (data, index) => (
      <TextInput style={styles.btn}
        underlineColorAndroid="transparent"
        placeholder=""
        placeholderTextColor="#48596B"
        color="#48596B"
        ref={index}
        textAlign={'center'}
        textAlignVertical="center"
        value={this.state.quantity}
        autoCapitalize="none"
        onChangeText={this.handleQty}
      />
    );




    return (
      <View style={{flex:1}}>
       
        {/* <View style={styles.container}> */}
        {/* <SafeAreaView> */}
        <View style={styles.viewswidth}>
          <Text style={{
            position: 'absolute',
            left: 10,
            top: 55,
            width: 300,
            height: 20,
            fontFamily: 'bold',
            fontSize: 18,
            color: '#353C40'
          }}> New Sale </Text>
          <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: 47, backgroundColor: '#ED1C24', borderRadius: 5, width: 105, height: 32, }}
            onPress={() => this.navigateToScanCode()} >
            <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('NEW SALE SCAN')} </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Topcontainer}>
          <TouchableOpacity style={{
            backgroundColor: this.state.flagone ? "#1CA2FF" : "#ED1C24",
            alignSelf: "flex-start",
            //marginHorizontal: "1%",
            marginBottom: 6,
            width: "33.3%",
            height: 50,
            textAlign: "center",
          }}
            onPress={() => this.topbarAction1()} >
            <View style={{
              backgroundColor: this.state.flagone ? "#1CA2FF" : "#ED1C24",
              alignSelf: "flex-start",
              //marginHorizontal: "1%",
              marginBottom: 6,
              width: "33.3%",
              height: 50,
            }}>

              <Text style={{
                color: this.state.flagone ? "#FFFFFF" : "#BBE3FF",
                marginTop: 10,
                fontFamily: "regular", width: 100,
                fontSize: 14, justifyContent: 'center',
                alignItems: 'center',
              }}> NEW SALE </Text>


              <Image source={this.state.flagone ? require('../assets/images/topSelect.png') : null} style={{
                left: 30, marginTop: 5,
              }} />

            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: this.state.flagtwo ? "#1CA2FF" : "#ED1C24",
            alignSelf: "flex-start",
            //marginHorizontal: "1%",
            marginBottom: 6,
            width: "33.3%",
            height: 50,
            textAlign: "center",
          }}
            onPress={() => this.topbarAction2()} >
            <View style={{
              backgroundColor: this.state.flagtwo ? "#1CA2FF" : "#ED1C24",
              alignSelf: "flex-start",
              //marginHorizontal: "1%",
              marginBottom: 6,
              width: "33.3%",
              height: 50,
              textAlign: "center",
            }}>

              <Text style={{
                color: this.state.flagtwo ? "#FFFFFF" : "#BBE3FF",
                marginTop: 10,
                fontFamily: "regular",
                fontSize: 14, textAlign: 'center', width: 100,
              }}> ADD Product/Inventory</Text>
              <Image source={this.state.flagtwo ? require('../assets/images/topSelect.png') : null} style={{
                left: 30, marginTop: 5,
              }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: this.state.flagthree ? "#1CA2FF" : "#ED1C24",
            alignSelf: "flex-start",
            //marginHorizontal: "1%",
            marginBottom: 6,
            width: "33.3%",
            height: 50,
            textAlign: "center",
          }}
            onPress={() => this.topbarAction3()} >
            <View style={{
              backgroundColor: this.state.flagthree ? "#1CA2FF" : "#ED1C24",
              alignSelf: "flex-start",
              //marginHorizontal: "1%",
              marginBottom: 6,
              width: "33.3%",
              height: 50,
              textAlign: "center",
            }}>

              <Text style={{
                color: this.state.flagthree ? "#FFFFFF" : "#BBE3FF",
                marginTop: 10,
                fontFamily: "regular",
                fontSize: 14, textAlign: 'center', width: 100,
              }}> FIND ITEM  </Text>
              <Image source={this.state.flagthree ? require('../assets/images/topSelect.png') : null} style={{
                left: 30, marginTop: 5,
              }} />
            </View>
          </TouchableOpacity>
        </View>
        {this.state.flagtwo && (
          <KeyboardAwareScrollView KeyboardAwareScrollView
            enableOnAndroid={true}>
            <View>
            {this.state.loading &&
          <Loader
            loading={this.state.loading} />
        }
              <View style={{
                flex: 1, justifyContent: 'center', //Centered horizontally
                alignItems: 'center', color: '#ffffff'
              }}>
                <View style={{ flexDirection: 'column', flex: 0, marginLeft: 0, marginTop: 30, marginRight: 0, backgroundColor: "#ffffff", borderRadius: 20, }}>

                  <Image
                    style={{ width: 80, height: 80, resizeMode: "cover", borderRadius: 40, borderColor: '#F2F2F2', alignSelf: 'center', borderWidth: 2, }}
                    source={this.state.image}
                  />
                  <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 10, alignSelf: 'center', top: -20, left: 15 }} onPress={() => this.imageAction()}>
                    <Image
                      style={{ width: 30, height: 30, borderRadius: 10, }}
                      source={require('../assets/images/cameraclick.png')} />

                  </TouchableOpacity>

                  {this.state.flagqtyModelOpen && (
                    <View>
                      <Modal isVisible={this.state.modalVisible}>
                        <View style={{
                          flex: 1, justifyContent: 'center', //Centered horizontally
                          alignItems: 'center',
                        }}>
                          <View style={{
                            position: 'absolute',
                            right: 20,
                            left: 20,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            backgroundColor: "#ffffff", borderRadius: 20,
                          }}>
                            <TouchableOpacity
                              style={{ backgroundColor: '#ED1C24', borderRadius: 5, width: 200, marginTop: 20, height: 32, alignSelf: 'center' }}
                              onPress={() => this.pickSingleWithCameraForProductsAdd(true)} >
                              <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('Select Product Image With Camera')} </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={{ backgroundColor: '#ED1C24', borderRadius: 5, width: 200, marginTop: 20, height: 32, alignSelf: 'center' }}
                              onPress={() => this.pickSingleForProductsAdd(true)} >
                              <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('Select Product Image With Gallery')} </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={{ backgroundColor: '#ED1C24', borderRadius: 5, width: 200, marginTop: 20, height: 32, alignSelf: 'center', marginBottom: 20, }}
                              onPress={() => this.cancel()} >
                              <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('Cancel')} </Text>
                            </TouchableOpacity>

                          </View>
                        </View>
                      </Modal>
                    </View>)}


                  <Text></Text>

                  <View style={{ marginTop: 10, width: deviceWidth }}>
                    <TextInput style={styles.input}
                      underlineColorAndroid="transparent"
                      placeholder="BARCODE"
                      placeholderTextColor="#353C4050"
                      textAlignVertical="center"
                      autoCapitalize="none"
                      value={this.state.inventoryBarcodeId}
                      onChangeText={this.handleInventoryBarcode}
                    />

                    <TouchableOpacity style={{
                      position: 'absolute',
                      right: 28,
                      top: 20,
                      width: 50, height: 50,
                    }} onPress={() => this.navigateToGetBarCode()}>
                      <Image style={{ color: '#ED1C24', fontFamily: 'regular', fontSize: 12, position: 'absolute', right: 30, }} source={require('../assets/images/addnew.png')} />
                      <Text style={{ color: '#ED1C24', fontFamily: 'regular', fontSize: 12, position: 'absolute', right: 0, }}> scan </Text>
                    </TouchableOpacity>
                  </View>

                  <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="PRODUCT NAME"
                    placeholderTextColor="#353C4050"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.inventoryProductName}
                    onChangeText={this.handleInventoryProductName}
                  />

                  <View>
                    <TextInput style={styles.input}
                      underlineColorAndroid="transparent"
                      placeholder="QTY"
                      placeholderTextColor="#353C4050"
                      textAlignVertical="center"
                      autoCapitalize="none"
                      value={this.state.inventoryQuantity}
                      onChangeText={this.handleInventoryQuantity}
                      ref={inputemail => { this.emailValueInput = inputemail }} />

                    <TouchableOpacity style={{
                      position: 'absolute',
                      right: 28,
                      top: 20,
                    }} >

                      <Text style={{ color: '#353C4050', fontFamily: 'regular', fontSize: 14, position: 'absolute', right: 0, }}> {'Select Unit >'} </Text>
                    </TouchableOpacity>
                  </View>


                  <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="₹ MRP"
                    placeholderTextColor="#353C4050"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.inventoryMRP}
                    onChangeText={this.handleInventoryMRP}
                    ref={inputemail => { this.emailValueInput = inputemail }} />

                  <View>
                    <TextInput style={styles.input}
                      underlineColorAndroid="transparent"
                      placeholder="DISCOUNT"
                      placeholderTextColor="#353C4050"
                      textAlignVertical="center"
                      autoCapitalize="none"
                      value={this.state.inventoryDiscount}
                      onChangeText={this.handleInventoryDiscount}
                      ref={inputemail => { this.emailValueInput = inputemail }} />

                    <TouchableOpacity style={{
                      position: 'absolute',
                      right: 28,
                      top: 20,
                    }}

                    >
                      <Text style={{ color: '#353C4050', fontFamily: 'regular', fontSize: 14, position: 'absolute', right: 0, }}> {'%'} </Text>
                    </TouchableOpacity>

                  </View>



                  <TouchableOpacity
                    style={{
                      margin: 20,
                      height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                    }}
                  >
                    <Text style={{
                      textAlign: 'center', marginTop: 20, color: "#ffffff", fontSize: 15,
                      fontFamily: "regular"
                    }} onPress={() => this.inventoryCreate()} > ADD PRODUCT </Text>

                  </TouchableOpacity>
                </View>

              </View>
            </View>
            </KeyboardAwareScrollView>
        )}



            {this.state.flagone && (
              <ScrollView>
              < View
                style={{
                  flex: 1,
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  marginTop: 0
                }}>
                <View>
                  <TextInput style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Enter Barcode"
                    placeholderTextColor="#6F6F6F60"
                    textAlignVertical="center"
                    keyboardType={'default'}
                    autoCapitalize="none"
                    onEndEditing
                    onChangeText={(text) => this.handleBarCode(text)}
                    onEndEditing={() => this.endEditing()}
                  />
                </View>
                <FlatList
                  //  ListHeaderComponent={this.renderHeader}
                  data={this.state.tableData}
                  keyExtractor={item => item.email}
                  contentContainerStyle={{ paddingBottom: 200 }}
                  onEndReached={this.onEndReached.bind(this)}
                  scrollEnabled={
                    false
                  }
                  ref={(ref) => { this.listRef = ref; }}
                  renderItem={({ item, index }) => (
                    <View style={{
                      height: 120,
                      backgroundColor: '#FFFFFF',
                      borderBottomWidth: 5,
                      borderBottomColor: '#FBFBFB',
                      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'

                    }}>

                      <View style={{ flexDirection: 'column', height: 120, }}>
                        <Image source={{ uri: item.image }} style={{
                          position: 'absolute', left: 20, top: 15, width: 90, height: 90,
                        }} />
                        <Text style={{ fontSize: 16, marginTop: 10, marginLeft: 130, fontFamily: 'medium', color: '#353C40' }}>
                          {item.itemdesc}
                        </Text>
                        <Text style={{ fontSize: 12, marginLeft: 130, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
                          QUANTITY:
                        </Text>
                        <Text style={{ fontSize: 12, marginLeft: 195, marginTop: -16, fontFamily: 'medium', color: '#353C40' }}>
                          {item.qty} Pieces
                        </Text>
                        <Text style={{ fontSize: 12, marginLeft: 130, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
                          PRICE/EACH:
                        </Text>
                        <Text style={{ fontSize: 12, marginLeft: 205, marginTop: -15, fontFamily: 'medium', color: '#ED1C24' }}>
                          ₹ {(parseInt(item.netamount)).toString()}
                        </Text>
                        <Text style={{ fontSize: 12, marginLeft: 235, marginTop: -15, fontFamily: 'regular', color: '#808080', textDecorationLine: 'line-through' }}>
                          Rs. 100
                        </Text>
                        <Text style={{ fontSize: 12, marginLeft: 130, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
                          TOTAL:
                        </Text>
                        <Text style={{ fontSize: 12, marginLeft: 172, marginTop: -15, fontFamily: 'medium', color: '#ED1C24' }}>
                          ₹ {(parseInt(item.netamount) * item.qty).toString()}
                        </Text>
                      </View>

                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        height: 30,
                        marginRight: 20,
                        width: 90,
                        //borderWidth:1,
                        //borderColor:'#ED1C24',
                        // borderRadius:3,
                      }}>
                        <TouchableOpacity style={{
                          borderColor: '#ED1C24',
                          height: 28,
                          width: 30, borderBottomLeftRadius: 3,
                          borderTopLeftRadius: 3,
                          borderBottomWidth: 1,
                          borderTopWidth: 1,
                          borderLeftWidth: 1, paddingLeft: 10, marginLeft: 20,
                        }}>
                          <Text style={{ alignSelf: 'center', marginTop: 2, marginLeft: -10, color: '#ED1C24' }}
                            onPress={() => this.decreamentForTable(item, index)}>-</Text>
                        </TouchableOpacity>
                        {/* <Text> {item.qty}</Text> */}
                        <TextInput
                          style={{
                            justifyContent: 'center',
                            margin: 20,
                            height: 28,
                            width: 30,
                            marginTop: 10,
                            marginBottom: 10,
                            borderColor: '#ED1C24',
                            backgroundColor: 'white',
                            color: '#353C40',
                            borderWidth: 1,
                            fontFamily: 'regular',
                            fontSize: 12,
                            paddingLeft: 9,
                          }}
                          underlineColorAndroid="transparent"
                          placeholder="0"
                          placeholderTextColor="#8F9EB7"

                          value={item.qty}
                          onChangeText={(text) => this.updateQty(text, index)}
                        />
                        <TouchableOpacity style={{
                          borderColor: '#ED1C24',
                          height: 28,
                          width: 30, borderBottomRightRadius: 3,
                          borderTopRightRadius: 3,
                          borderBottomWidth: 1,
                          borderTopWidth: 1,
                          borderRightWidth: 1
                        }}>
                          <Text style={{ alignSelf: 'center', marginTop: 2, color: '#ED1C24' }}
                            onPress={() => this.incrementForTable(item, index)}>+</Text>

                        </TouchableOpacity>

                      </View>

                    </View>

                  )}
                />
                {this.state.tableData.length != 0 && (
                  <View style={{ width: deviceWidth, height: 220, position: 'absolute', bottom: 0, backgroundColor: '#FFFFFF' }}>
                    <Text style={{
                      color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 30, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                      fontSize: 14, position: 'absolute',
                    }}>
                      Total Qty </Text>
                    <Text style={{
                      color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 30, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                      fontSize: 14, position: 'absolute',
                    }}>
                      55 </Text>
                    <Text style={{
                      color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 60, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                      fontSize: 14, position: 'absolute',
                    }}>
                      Total MRP </Text>
                    <Text style={{
                      color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 60, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                      fontSize: 14, position: 'absolute',
                    }}>
                      ₹ 1,660.00 </Text>
                    <Text style={{
                      color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 90, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                      fontSize: 14, position: 'absolute',
                    }}>
                      Promo Discount </Text>
                    <Text style={{
                      color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 90, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                      fontSize: 14, position: 'absolute',
                    }}>
                      ₹ 210.00 </Text>
                    <Text style={{
                      color: "#353C40", fontFamily: "bold", alignItems: 'center', marginLeft: 16, top: 120, fontSize: 20, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                      fontSize: 14, position: 'absolute',
                    }}>
                      Payable Amount </Text>
                    <Text style={{
                      color: "#353C40", fontFamily: "bold", alignItems: 'center', marginLeft: 16, top: 120, fontSize: 20, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                      fontSize: 14, position: 'absolute',
                    }}>
                      ₹ 1,450.00 </Text>


                    <View style={styles.TopcontainerforPay}>
                      <TouchableOpacity
                        style={styles.signInButton}
                        onPress={() => this.payCash()} >

                        <Text style={styles.signInButtonText}> Pay Cash </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.signInButtonRight}
                        onPress={() => this.pay()} >
                        <Text style={styles.signInButtonText}> Pay Card </Text>
                      </TouchableOpacity>

                    </View>

                  </View>
                )}
              </View>
              </ScrollView>
            )}


            {this.state.flagthree && (

              <View style={styles.container}>
                {/* <SafeAreaView> */}
                {/* <View style={styles.viewswidth}> */}

                {/* <Text style={{
                position: 'absolute',
                left: 10,
                top: 55,
                width: 300,
                height: 20,
                fontFamily: 'bold',
                fontSize: 18,
                color: '#353C40'
              }}> List of Products </Text>
              <TouchableOpacity
                style={{ position: 'absolute', right: 20, top: 47, backgroundColor: '#ED1C24', borderRadius: 5, width: 105, height: 32, }}
                onPress={() => this.addnew()} >
                <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('ADD NEW')} </Text>
              </TouchableOpacity>
            </View> */}
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 0,
                    paddingVertical: 0,
                    marginTop: 0
                  }}>
                  <View>
                    <SearchBar containerStyle={{ marginRight: 40 }} placeholder="Search products with Name"
                      //inputStyle={{backgroundColor: '#FBFBFB'}}
                      lightTheme editable={true}
                      value={this.state.search}
                      onChangeText={this.updateSearch} >
                    </SearchBar>

                    <TouchableOpacity style={{
                      position: 'absolute',
                      right: 10,
                      top: 20,
                    }} onPress={() => this.navigateToImageScanner()}>
                      <Image source={require('../assets/images/barcode.png')} />
                    </TouchableOpacity>

                    {/* this.props.navigation.navigate('AuthNavigation') */}

                  </View>

                  {this.state.flagqtyModelOpen && (
                    <View>
                      <Modal isVisible={this.state.modalVisible}>
                        <View style={{
                          flex: 1, justifyContent: 'center', //Centered horizontally
                          alignItems: 'center',
                        }}>
                          <View style={{
                            position: 'absolute',
                            right: 20,
                            left: 20,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            backgroundColor: "#ffffff", borderRadius: 20,
                          }}>
                            <TouchableOpacity
                              style={{ backgroundColor: '#ED1C24', borderRadius: 5, width: 200, marginTop: 20, height: 32, alignSelf: 'center' }}
                              onPress={() => this.pickSingleWithCamera(true)} >
                              <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('Product Image Scan With Camera')} </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={{ backgroundColor: '#ED1C24', borderRadius: 5, width: 200, marginTop: 20, height: 32, alignSelf: 'center' }}
                              onPress={() => this.pickSingle(true)} >
                              <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('Product Image Scan With Gallery')} </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={{ backgroundColor: '#ED1C24', borderRadius: 5, width: 200, marginTop: 20, height: 32, alignSelf: 'center', marginBottom: 20, }}
                              onPress={() => this.cancel()} >
                              <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('Cancel')} </Text>
                            </TouchableOpacity>

                          </View>
                        </View>
                      </Modal>
                    </View>)}

                  <FlatList
                    data={this.state.arrayData}
                    keyExtractor={item => item.email}
                    renderItem={({ item, index }) => (
                      <View style={{
                        height: 120,
                        backgroundColor: '#FFFFFF',
                        borderBottomWidth: 5,
                        borderBottomColor: '#FBFBFB',
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                      }}>
                        <View style={{ flexDirection: 'column', width: '100%', height: 120, }}>
                          <Image source={{ uri: item.image }} style={{
                            position: 'absolute', left: 20, top: 15, width: 90, height: 90, borderwidth: 5, borderColor: "#F6F6F6",
                          }} />
                          <Text style={{ fontSize: 16, marginTop: 30, marginLeft: 130, fontFamily: 'medium', color: '#353C40' }}>
                            {item.itemdesc}
                          </Text>
                          <Text style={{ fontSize: 12, marginLeft: 130, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
                            QUANTITY:
                          </Text>
                          <Text style={{ fontSize: 12, marginLeft: 200, marginTop: -16, fontFamily: 'medium', color: '#353C40' }}>
                            {item.qty} Pieces
                          </Text>
                          <Text style={{ fontSize: 12, marginLeft: 130, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
                            PRICE/EACH:
                          </Text>
                          <Text style={{ fontSize: 12, marginLeft: 210, marginTop: -16, fontFamily: 'medium', color: '#ED1C24' }}>
                            ₹ {(parseInt(item.netamount)).toString()}
                          </Text>


                        </View>






                        <TouchableOpacity
                          style={{
                            fontSize: 15, fontFamily: 'regular',
                            right: 80, bottom: 10,
                            borderColor: '#ED1C24', borderWidth: 1, width: 60, height: 30,
                            textAlign: 'center', justifyContent: 'center', marginTop: -10, //Centered horizontally
                            alignItems: 'center', borderRadius: 5,
                          }}
                          onPress={() => this.addAction(item, index)} >
                          <Text style={{
                            color: "#ED1C24"
                          }}>
                            + ADD
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                          position: 'absolute',
                          right: 50,
                          top: 65,
                          width: 30,
                          height: 30,
                          borderBottomLeftRadius: 5,
                          borderTopLeftRadius: 5,
                          borderWidth: 1,
                          borderColor: "lightgray",
                          // borderRadius:5,
                        }} onPress={() => this.handleeditaction()}>
                          <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/edit.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                          position: 'absolute',
                          right: 20,
                          top: 65,
                          width: 30,
                          height: 30,
                          borderBottomRightRadius: 5,
                          borderTopRightRadius: 5,
                          borderWidth: 1,
                          borderColor: "lightgray",
                        }} onPress={() => this.handledeleteaction(item, index)}>
                          <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/delete.png')} />
                        </TouchableOpacity>
                        <View style={{
                          backgroundColor: 'grey',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          height: 30,
                          width: 90
                        }}>

                        </View>

                      </View>
                    )}
                  />
                </View>
              </View>
            )}
          </View>
        )
        }
}
        export default NewSale


        const pickerSelectStyles = StyleSheet.create({
          placeholder: {
          color: "#001B4A55",
        fontFamily: "bold",
        fontSize: 16,
  },
        inputIOS: {
          marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        height: 40,
        backgroundColor: '#ffffff',
        borderBottomColor: '#456CAF55',
        color: '#001B4A',
        fontFamily: "bold",
        fontSize: 16,
        borderRadius: 3,
  },
        inputAndroid: {
          marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        height: 40,
        backgroundColor: '#ffffff',
        borderBottomColor: '#456CAF55',
        color: '#001B4A',
        fontFamily: "bold",
        fontSize: 16,
        borderRadius: 3,
  },
})


        const styles = StyleSheet.create({
          safeArea: {
          flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FAFAFF'
  },
        viewswidth: {
          backgroundColor: '#FFFFFF',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 84,
  },
        input: {
          justifyContent: 'center',
        margin: 20,
        height: 44,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
  },
        signInButton: {
          backgroundColor: '#ED1C24',
        justifyContent: 'center',
        width: '46%',
        marginLeft: 10,
        marginTop: 10,
        height: 40,
        borderRadius: 10,
        fontWeight: 'bold',
        margin: 5,
    // alignSelf:'center',
    // marginBottom:100,
  },
        qty: {
          backgroundColor: '#ED1C24',
        justifyContent: 'center',
        width: '18%',
        marginTop: 10,
        height: 40,
        margin: 5,
        borderRadius: 5,
        fontWeight: 'bold',
  },
        imagealign: {
          marginTop: 25,
        marginRight: 34,
  },
        itemscount: {
          backgroundColor: '#ED1C24',
        justifyContent: 'center',
        width: '18%',
        marginLeft: 0,
        marginTop: 10,
        height: 40,
        borderRadius: 5,
        fontWeight: 'bold',
        margin: 5,
    // alignSelf:'center',
    // marginBottom:100,
  },
        itemDetail: {
          backgroundColor: '#ffffff',

        width: '60%',
        marginLeft: 0,
        marginTop: 10,
        height: 40,
        borderRadius: 5,
        fontWeight: 'bold',
        margin: 5,
    // alignSelf:'center',
    // marginBottom:100,
  },
        signInButtonRight: {
          backgroundColor: '#ED1C24',
        justifyContent: 'center',
        width: '46%',
        marginRight: 10,
        marginTop: 10,
        height: 40,
        borderRadius: 10,
        fontWeight: 'bold',
        margin: 5,
    // alignSelf:'center',
    // marginBottom:100,
  },
        signInButtonText: {
          color: 'white',
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: "regular",
  },
        signInFieldStyle: {
          color: 'black',
        marginLeft: 20,
        marginTop: 5,
        fontSize: 18,
        fontFamily: "regular",
        textAlign: 'left',
  },
        findIteminput: {
          marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 1000,
        height: 50,
        backgroundColor: "#DEF1FF",
        borderRadius: 10,
        color: '#001B4A',
        fontFamily: "regular",
        fontSize: 12,
  },
        qtyInput: {
          width: 50,
        height: 25,
    // marginTop: 20,
    // marginBottom: 1000,
    // height: 50,
    // backgroundColor: "#DEF1FF",
    // borderRadius: 10,
    // color: '#001B4A',
    // fontFamily: "regular",
    // fontSize: 12,
  },
        signUptext: {
          marginTop: 40,
        fontFamily: "regular",
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 28,
  },
        saleBillsText: {
          marginLeft: 0,
        marginTop: -20,
        marginBottom: 10,
        fontFamily: "bold",
        color: '#0F2851',
        fontSize: 14,
  },
        tablecontainer: {
          flex: 1,
        // width:deviceWidth,
        marginLeft: 20,
        marginRight: 20,
        padding: 20,
        paddingTop: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
  },
        container: {
          flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FAFAFF'
  },
        head: {
          height: 45,
        borderColor: '#FAFAFF',
        borderWidth: 1,
        borderRadius: 10,
  },
        text: {
          margin: 6,
        color: "#ED1C24",
        fontFamily: "semibold",
        fontSize: 11,
  },
        textData: {
          margin: 6,
        color: "#48596B",
        fontFamily: "regular",
        fontSize: 10,
  },

        Topcontainer: {
          flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        width: '90%',
        backgroundColor: 'grey',
        height: 40,
  },

        TopcontainerforModel: {
          flexDirection: 'row',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
        width: '100%',
        backgroundColor: 'grey',
        borderRadius: 20,
        height: 50,
  },
        TopcontainerforPay: {
          flexDirection: 'row',
        marginLeft: 0,
        marginRight: 0,
        // marginTop: 10,
        width: '100%',
        backgroundColor: '#ffffff',
        borderColor: 'lightgray',
        borderRadius: 0,
        height: 50,
        position: 'absolute',
        bottom: 10,
  },
        TopcontainerforItems: {
          flexDirection: 'row',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
        width: '100%',
        backgroundColor: '#ffffff',
        borderColor: 'lightgray',
        borderRadius: 0,
        height: 50,
  },
        redbox: {
          backgroundColor: "#1CA2FF",
        alignSelf: "flex-start",

        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
  },
        bluebox: {
          backgroundColor: "#ED1C24",
        alignSelf: "flex-start",
        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
  },
        blackbox: {
          backgroundColor: "#ED1C24",
        alignSelf: "flex-start",
        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
  },
        greenbox: {
          backgroundColor: "#ED1C24",
        alignSelf: "flex-start",
        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
  },





        tabBar: {
          flexDirection: 'row',
        paddingTop: Constants.statusBarHeight,
  },
        tabItem: {
          flex: 1,
        alignItems: 'center',
        padding: 16,
  },
        box: {
          width: 50,
        height: 50,
  },
        row: {
          flexDirection: "row",
        flexWrap: "wrap",
  },
        button: {
          paddingHorizontal: 8,
        paddingVertical: 6,
        //borderRadius: 4,
        backgroundColor: "#ED1C24",
        alignSelf: "flex-start",
        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
  },
        selected: {
          backgroundColor: "#BBE3FF",
        borderWidth: 0,
        backgroundColor: "#ED1C24",
  },
        buttonLabel: {
          textAlign: "center",
        color: "#BBE3FF",
        fontFamily: "regular",
        fontSize: 14,
  },
        selectedLabel: {
          color: "white",
        textAlign: "center",
        alignSelf: "center",
        marginTop: 10,
        fontFamily: "regular",
        fontSize: 14,
  },
        label: {
          textAlign: "center",
        marginBottom: 10,
        fontSize: 24,
  },

        //model
        modelcontainer: {
          alignItems: 'center',
        backgroundColor: '#ede3f2',
        padding: 100
  },
        modal: {
          flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7021a',
        padding: 100
  },
        modeltext: {
          color: '#3f2949',
        marginTop: 10
  },
        btn: {
          width: 40, height: 18, borderWidth: 0.2, borderColor: '#48596B', fontFamily: "regular",
        fontSize: 10,
  },
        btnText: {textAlign: 'center', color: '#fff' }


        ,
        preview: {
          margin: 20,
        height: 300,
        marginTop: 5,
        marginBottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'center'
  },
        overlay: {
          position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center'
  },
        topOverlay: {
          top: 0,
        flex: 1,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
  },
        bottomOverlay: {
          bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
  },
        enterBarcodeManualButton: {
          padding: 15,
        backgroundColor: 'white',
        borderRadius: 40
  },
        scanScreenMessage: {
          fontSize: 14,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
  }
});
