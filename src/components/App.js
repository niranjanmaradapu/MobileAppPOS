// import React from 'react';
// import { StyleSheet } from 'react-native';
// import * as Font from 'expo-font';
// import AppRoute from '../Navigation/AppRoute';
// import { openDatabase } from 'react-native-sqlite-storage';
// import axios from 'axios';
// import NewSaleService from './services/NewSaleService';
// import NetInfo from "@react-native-community/netinfo";
// // Connction to access the pre-populated db
// const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });


// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       getListOfBarcodes: []
//     }
//   }


//   async componentDidMount() {
//     Font.loadAsync({
//       bold: require("./assets/fonts/ProductSans-Bold.ttf"),
//       regular: require("./assets/fonts/ProductSans-Regular.ttf"),
//       semibold: require("./assets/fonts/Metropolis-SemiBold.otf"),
//     });

   

//     //     axios.get(NewSaleService.getAllBarcodes()).then((res) => {
//     //       if (res.data["result"]) {
//     //         let len = res.data["result"].length;
//     //         console.log("get products lenth" + len)
//     //         NetInfo.addEventListener(state => {
//     //           if (state.isConnected) {
//     //             //setInterval(() => {
//     //             db.transaction(txn => {
//     //               txn.executeSql(
//     //                 'DROP TABLE tbl_item',
//     //                 [],
//     //                 (sqlTxn, res) => {
//     //                   console.log(`delteted successfully`);
//     //                 },
//     //                 error => {
//     //                   console.log("error on adding category " + error.message);
//     //                 },
//     //               );
//     //             })
        
//     //             db.transaction(txn => {
//     //               txn.executeSql(
//     //                 `CREATE TABLE IF NOT EXISTS tbl_item(item_id INTEGER PRIMARY KEY AUTOINCREMENT, barcode VARCHAR(20), itemDesc VARCHAR(20), qty INT(5), mrp INT(30), promoDisc INT(30), netAmount INT(30), salesMan INT(30), createdDate VARCHAR(255),lastModified VARCHAR(255))`,
//     //                 [],
//     //                 (sqlTxn, res) => {
//     //                   console.log("table created successfully");
//     //                 },
//     //                 error => {
//     //                   console.log("error on creating table " + error.message);
//     //                 },
//     //               );
//     //             });
        
//     //         if (len > 0) {
//     //           for (let i = 0; i < len; i++) {
//     //             let item = res.data["result"][i]
//     //             console.log(item)
//     //             let barcode = String(item["barcode"])
//     //             let itemDesc = String(item["itemDesc"])
//     //             let qty = item["qty"]
//     //             let mrp = item['mrp']
//     //             let promoDisc = item['promoDisc']
//     //             let netAmount = item['netAmount']
//     //             let salesMan = item['salesMan']
//     //             let createdDate = String(item['createdDate'])
//     //             let lastModified = String(item['lastModified'])
//     //             db.transaction(txn => {
//     //               txn.executeSql(
//     //                 'INSERT INTO tbl_item ( barcode, itemDesc, qty, mrp, promoDisc, netAmount, salesMan, createdDate, lastModified) VALUES (?,?,?,?,?,?,?,?,?)',
//     //                 [barcode, itemDesc, qty, mrp, promoDisc, netAmount, salesMan, createdDate, lastModified],
//     //                 //[, String(getListOfBarcodes[0][0]["itemDesc"]), getListOfBarcodes[0][0]["qty"], , getListOfBarcodes[0][0]['promoDisc'], getListOfBarcodes[0][0]['netAmount'], getListOfBarcodes[0][0]['salesMan'], String(getListOfBarcodes[0][0]['createdDate']), String(getListOfBarcodes[0][0]['lastModified'])],
//     //                 (sqlTxn, res) => {

//     //                   console.log(`added successfully`);
//     //                   getProducts()
//     //                 },
//     //                 error => {
//     //                   console.log("error on adding category " + error.message);
//     //                 },
//     //               );
//     //             });
//     //           }
//     //         }
//     //       }
//     //     });
//     //   }
//     //   else{
//     //       db.transaction(txn => {
//     //         txn.executeSql(
//     //           `SELECT * FROM tbl_item`,
//     //           [],
//     //           (sqlTxn, res) => {
//     //             let len = res.rows.length;
//     //             if (len > 0) {
//     //               let results = [];
//     //               for (let i = 0; i < len; i++) {
//     //                 let item = res.rows.item(i)
//     //                 let sno = String(this.state.tableData.length + 1)
//     //                 let barcode = item["barcode"]
//     //                 let itemDesc = item["itemDesc"]
//     //                 let netAmount = String(item["netAmount"])
//     //                 let qty = String(item["qty"])
//     //                 let totalAmount = String(item["netAmount"])
//     //                 console.log(JSON.stringify(item))
//     //                 // this.state.quantity = qty
//     //                 // this.state.totalQty = this.state.totalQty + item["qty"]
//     //                 // this.state.totalAmount = this.state.totalAmount + item["netAmount"]
//     //                 this.state.arrayData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount })
//     //                 this.state.temp.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount })
//     //               }
//     //               //console.log(JSON.stringify(this.state.data));
//     //             }
//     //           },
//     //           error => {
//     //             console.log("error on getting categories " + error.message);
//     //           },
//     //         );
//     //       });
//     //     };
//     // })
//   }
//   //}, 60000); 




//   render() {
//     return (
//       <AppRoute />
//     )
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React, {Component} from 'react';
import {
 StyleSheet,
 View,
 Text,
 TextInput,
 Image,
 ScrollView,
 TouchableHighlight,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Amplify, {API} from 'aws-amplify';

 
// Amplify configuration for API-Gateway
Amplify.configure({
 API: {
   endpoints: [
     {
       name: 'LabellingAPI',   //your api name
       endpoint:'', //Your Endpoint URL
     },
   ],
 },
});
 
class App extends Component {
 constructor(props) {
   super(props);
   this.state = {
     username: 'storeImage.png',
     userId: '',
     image: '',
     capturedImage: '',
     objectName: '',
   };
 }
 
// It selects image from filesystem or capture from camera
 captureImageButtonHandler = () => {
   this.setState({
     objectName: '',
   });
 
   ImagePicker.showImagePicker(
     {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
     response => {
       console.log('Response = ', response);
       if (response.didCancel) {
         console.log('User cancelled image picker');
       } else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
       } else if (response.customButton) {
         console.log('User tapped custom button: ', response.customButton);
       } else {
         // You can also display the image using data:
         const source = {uri: 'data:image/jpeg;base64,' + response.data};
         this.setState({
           capturedImage: response.uri,
           base64String: source.uri,
         });
       }
     },
   );
 };
 
// this method triggers when you click submit. If the image is valid then It will send the image to API Gateway. 
 submitButtonHandler = () => {
   if (
     this.state.capturedImage == '' ||
     this.state.capturedImage == undefined ||
     this.state.capturedImage == null
   ) {
     alert('Please Capture the Image');
   } else {
     const apiName = 'LabellingAPI';
     const path = '/storeimage';
     const init = {
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/x-amz-json-1.1',
       },
       body: JSON.stringify({
         Image: this.state.base64String,
         name: 'storeImage.png',
       }),
     };
 
     API.post(apiName, path, init).then(response => {
       if (JSON.stringify(response.Labels.length) > 0) {
         this.setState({
           objectName: response.Labels[0].Name,
         });
       } else {
         alert('Please Try Again.');
       }
     });
   }
 };
 
 render() {
   if (this.state.image !== '') {
   }
   return (
     <View style={styles.MainContainer}>
       <ScrollView>
         <Text
           style={{
             fontSize: 20,
             color: '#000',
             textAlign: 'center',
             marginBottom: 15,
             marginTop: 10,
           }}>
           Capture Image
         </Text>
         {this.state.capturedImage !== '' && (
           <View style={styles.imageholder}>
             <Image
               source={{uri: this.state.capturedImage}}
               style={styles.previewImage}
             />
           </View>
         )}
         {this.state.objectName ? (
           <TextInput
             underlineColorAndroid="transparent"
             style={styles.TextInputStyleClass}
             value={this.state.objectName}
           />
         ) : null}
         <TouchableHighlight
           style={[styles.buttonContainer, styles.captureButton]}
           onPress={this.captureImageButtonHandler}>
           <Text style={styles.buttonText}>Capture Image</Text>
         </TouchableHighlight>
 
         <TouchableHighlight
           style={[styles.buttonContainer, styles.submitButton]}
           onPress={this.submitButtonHandler}>
           <Text style={styles.buttonText}>Submit</Text>
         </TouchableHighlight>
       </ScrollView>
     </View>
   );
 }
}
 
const styles = StyleSheet.create({
 TextInputStyleClass: {
   textAlign: 'center',
   marginBottom: 7,
   height: 40,
   borderWidth: 1,
   marginLeft: 90,
   width: '50%',
   justifyContent: 'center',
   borderColor: '#D0D0D0',
   borderRadius: 5,
 },
 inputContainer: {
   borderBottomColor: '#F5FCFF',
   backgroundColor: '#FFFFFF',
   borderRadius: 30,
   borderBottomWidth: 1,
   width: 300,
   height: 45,
   marginBottom: 20,
   flexDirection: 'row',
   alignItems: 'center',
 },
 buttonContainer: {
   height: 45,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   marginBottom: 20,
   width: '80%',
   borderRadius: 30,
   marginTop: 20,
   marginLeft: 5,
 },
 captureButton: {
   backgroundColor: '#337ab7',
   width: 350,
 },
 buttonText: {
   color: 'white',
   fontWeight: 'bold',
 },
 horizontal: {
   flexDirection: 'row',
   justifyContent: 'space-around',
   padding: 10,
 },
 submitButton: {
   backgroundColor: '#C0C0C0',
   width: 350,
   marginTop: 5,
 },
 imageholder: {
   borderWidth: 1,
   borderColor: 'grey',
   backgroundColor: '#eee',
   width: '50%',
   height: 150,
   marginTop: 10,
   marginLeft: 90,
   flexDirection: 'row',
   alignItems: 'center',
 },
 previewImage: {
   width: '100%',
   height: '100%',
 },
});
 
export default App;



