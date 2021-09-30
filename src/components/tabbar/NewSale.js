import React, { Component, useState } from 'react'
import { View, Image, FlatList, Animated, ImageBackground, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ActivityIndicator, scrollview, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
//import Menu from './Menu';
//import Login from './Logsin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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


class NewSale extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    // this.toggle = this.toggle.bind(this);
    // this.navigate = this.props.navigation.navigate;
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
      flagtwo: false,
      flagthree: false,
      flagfour: false,
      tableHead: ['S.No', 'Barcode', 'Product', 'Price Per Qty', 'Qty', 'Sales Rate'],
      tableData: [
        // ['01', 'COA238106', 'Perfume', '₹ 100:00', '1', '₹ 100:00'],
        // ['02', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['03', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['04', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['05', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['06', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['07', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['08', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['09', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['10', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['11', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['12', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['13', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['14', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['15', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
        // ['16', 'COA238013', 'Chocolate', '₹ 20:00', '10', '₹ 200:00'],
      ],
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
  }

  getItems = () => {
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
              console.log(JSON.stringify(item))
              // this.state.quantity = qty
              // this.state.totalQty = this.state.totalQty + item["qty"]
              // this.state.totalAmount = this.state.totalAmount + item["netAmount"]
              this.state.arrayData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount })
              this.state.temp.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount })
            }
            //console.log(JSON.stringify(this.state.data));
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
    const qtyarr = [...this.state.arrayData];
    //this.setState({ barcodeId: text })
    let sno = String(this.state.tableData.length + 1)
    let barcode = qtyarr[index].barcode
    //let barcode = item["barcode"]
    let itemDesc = qtyarr[index].itemdesc
    //let itemDesc = item["itemDesc"]
    let qty = qtyarr[index].qty
    let netAmount = qtyarr[index].netamount 
    //let netAmount = String(item["netAmount"])
    // let qty = String(item["qty"])

    let totalAmount = String(qtyarr[index].netamount)
    //console.log(JSON.stringify(item))
    this.state.quantity = qty
    this.state.totalQty = (parseInt(this.state.totalQty) + parseInt(qtyarr[index].qty)).toString()
    this.state.totalAmount = (parseInt(this.state.totalAmount) + parseInt(qtyarr[index].netamount) * qty).toString()
    //this.state.tableData.push([sno, barcode, itemDesc, netAmount, qty, netAmount])
    this.state.tableData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount })
    // this.barcodeDBStore()
    this.setState({ flagone: true })
    this.setState({ flagtwo: false })
    this.setState({ flagthree: false })
    this.setState({ flagfour: false })

  }

  renderHeader = () => {
    return <SearchBar placeholder="Search Here..."
      lightTheme round editable={true}
      value={this.state.search}
      onChangeText={this.updateSearch} />;
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
          console.log("search category" + JSON.stringify(res.rows.length));
          let results = [];
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i)
              let sno = String(this.state.tableData.length + 1)
              let barcode = item["barcode"]
              let itemDesc = item["itemDesc"]
              let netAmount = String(item["netAmount"])
              let qty = String(item["qty"])
              let totalAmount = String(item["netAmount"])
              console.log(JSON.stringify(item))
              this.state.quantity = qty
              this.state.totalQty = this.state.totalQty + item["qty"]
              this.state.totalAmount = parseInt(this.state.totalAmount) + parseInt(item["netAmount"] * item["qty"])
              //parse this.state.totalAmount + item["netAmount"]
              // this.state.tableData.push([sno, barcode, itemDesc, netAmount, qty, netAmount])
              this.state.tableData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount })
              this.setState({ flagone: true })
              this.setState({ flagtwo: false })
              this.setState({ flagthree: false })
              this.setState({ flagfour: false })
            }
          }
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

  pay = () => {
    //  console.log(this.state.totalAmount)
    const params = {
      "amount": JSON.stringify(this.state.totalAmount),
      "info": "order_request"
    }

    axios.post(NewSaleService.payment(), params).then((res) => {
      // this.setState({isPayment: false});
      const data = res.data["result"]
      console.log('amount is' + JSON.stringify(data.amount));
      var options = {
        description: 'Transaction',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: JSON.stringify(data.currency),
        order_id: JSON.stringify(data.id),
        key: 'rzp_test_z8jVsg0bBgLQer', // Your api key
        amount: JSON.stringify(data.amount),
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
        alert(`Success: ${data.razorpay_payment_id}`);
      }).catch((error) => {
        console.log(error)
        // handle failure
        alert(`Error: ${JSON.stringify(error.code)} | ${JSON.stringify(error.description)}`);
      });
    }
    )


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
    this.setState({ modalVisible: true });
    this.setState({ flagone: false })
    this.setState({ flagtwo: true })
    this.setState({ flagthree: false })
    this.setState({ flagfour: false })
  }


  topbarAction3() {
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
    this.setState({ barcodeId: global.barcodeId })
    this.barcodeDBStore()
    this.setState({ flagone: true })
    this.setState({ flagtwo: false })
    this.setState({ flagthree: false })
    this.setState({ flagfour: false })
  }

  navigateToScanCode() {
    global.barcodeId = 'something'
    this.props.navigation.navigate('ScanBarCode', {
      onGoBack: () => this.refresh(),
    });
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
    if (qtyarr[index].qty >= 0) {
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

  increment = (item, index) => {
    const qtyarr = [...this.state.arrayData];
    var additem = parseInt(qtyarr[index].qty) + 1;
    // var priceFor1 = parseInt(item.netAmount)
    // var price = priceFor1  * additem;
    // qtyarr[index].netamount = price.toString()
    qtyarr[index].qty = additem.toString()
    this.setState({ arrayData: qtyarr })

  }

  decreament = (item, index) => {
    const qtyarr = [...this.state.arrayData];

    var additem = parseInt(qtyarr[index].qty) - 1;
    qtyarr[index].qty = additem.toString()
    if (qtyarr[index].qty >= 0) {
      this.setState({ arrayData: qtyarr })
    }

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
      //   // <TouchableOpacity onPress={() => this._alertIndex(index)}>
      //   //   <View style={styles.btn}>
      //   //     <Text style={styles.btnText}>button</Text>
      //   //   </View>
      //   // </TouchableOpacity>

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
        //   onSubmitEditing={value => {
        //     this.setState({ value })
        //     if (value) index.current.focus(); //assumption is TextInput ref is input_2
        //  }}
        onChangeText={this.handleQty}
      // value={this.state.quantity}
      // onFocus={() => this._alertIndex(index)}

      // ref={inputemail => { this.emailValueInput = inputemail }}
      />
    );


    // const element = (data, index) => (
    //   <TouchableOpacity onPress={() => this._alertIndex(index)}>
    //     <View style={styles.btn}>
    //       <Text style={styles.btnText}>button</Text>
    //     </View>
    //   </TouchableOpacity>
    // );

    return (
      <ScrollView>
        <View style={styles.container}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.viewswidth}>
              <Text style={styles.signUptext}> New Sale </Text>
              <TouchableOpacity style={{
                position: 'absolute',
                left: 20,
                top: 50,
                width: 20,
                height: 20,
              }} onPress={() => this.menuAction()}>
                <Image source={require('../assets/images/menu.png')} />
              </TouchableOpacity>
              <Image source={require('../assets/images/filter.png')} style={{
                position: 'absolute',
                right: 20,
                top: 50,
                width: 20,
                height: 20,
              }} />
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
                  }}> ADD CUSTOMER </Text>
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
            {this.state.flagthree && (
              // this.state.error != null ?
              //   <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  }}>
              //     <Text>{this.state.error}</Text>
              //     <Button onPress={
              //       () => {
              //         this.getItems();
              //       }
              //     } title="Reload" />
              //   </View> :
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  marginTop: 0
                }}>
                <FlatList
                  ListHeaderComponent={this.renderHeader}
                  data={this.state.arrayData}
                  keyExtractor={item => item.email}
                  renderItem={({ item, index }) => (
                    <View style={{
                      height: 80,
                      backgroundColor: 'lightgray',
                      margin: 5, borderRadius: 10,
                      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <View style={{ flexDirection: 'column', width: '55%' }}>
                        <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 20, fontFamily: 'bold' }}>
                          Product name: {item.itemdesc}
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 0, marginLeft: 20, fontFamily: 'bold' }}>
                          Price: Rs {(parseInt(item.netamount) * item.qty).toString()}
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 20, marginLeft: 20, fontFamily: 'regular' }}>
                          Qty: {item.qty}
                        </Text>
                        
                      </View>
                      <TextInput
                            style={{
                              justifyContent: 'center',
                              height: 30,
                              width: 80,
                              marginLeft:-80,
                              marginTop: 30,
                              borderColor: '#8F9EB717',
                              borderRadius: 3,
                              backgroundColor: 'white',
                              borderWidth: 1,
                              fontFamily: 'semibold',
                              fontSize: 16
                            }}
                            underlineColorAndroid="transparent"
                            placeholder="0"
                            placeholderTextColor="#8F9EB7"

                            value={'1PC'}
                            onChangeText={(text) => this.updateQtyValue(text, index)}
                          />
                      <View style={{
                        flexDirection: 'column',
                        width: '45%',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        
                        <TouchableOpacity
                          style={{
                            fontSize: 15, fontFamily: 'regular',
                            right: 20, bottom: 10,
                            backgroundColor: '#ED1C24', width: 60, height: 30,
                            textAlign: 'center', justifyContent: 'center', marginTop: 15, //Centered horizontally
                            alignItems: 'center', borderRadius: 20
                          }}
                          onPress={() => this.addAction(item, index)} >
                          <Text style={{
                            color: "#ffffff"
                          }}>
                            ADD
                          </Text>
                        </TouchableOpacity>
                        <View style={{
                          backgroundColor: 'grey',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          height: 30,
                          width: 90
                        }}>
                          <TouchableOpacity>
                            <Text onPress={() => this.increment(item, index)}>+</Text>
                          </TouchableOpacity>
                          {/* <Text> {item.qty}</Text> */}
                          <TextInput
                            style={{
                              justifyContent: 'center',
                              margin: 20,
                              height: 30,
                              width: 30,
                              marginTop: 10,
                              marginBottom: 10,
                              borderColor: '#8F9EB717',
                              borderRadius: 3,
                              backgroundColor: 'white',
                              borderWidth: 1,
                              fontFamily: 'semibold',
                              fontSize: 16
                            }}
                            underlineColorAndroid="transparent"
                            placeholder="0"
                            placeholderTextColor="#8F9EB7"

                            value={item.qty}
                            onChangeText={(text) => this.updateQty(text, index)}
                          />
                          <TouchableOpacity>
                            <Text onPress={() => this.decreament(item, index)}>-</Text>

                          </TouchableOpacity>
                        </View>
                      </View>

                    </View>
                  )}
                />
              </View>
            )}

            {this.state.flagone && (
              <View style={{ flex: 1 }}>
                {/* <RNCamera
                  ref={ref => {
                    this.camera = ref;
                  }}
                  defaultTouchToFocus
                  flashMode={this.state.camera.flashMode}
                  mirrorImage={false}
                  onBarCodeRead={this.onBarCodeRead.bind(this)}
                  onFocusChanged={() => { }}
                  onZoomChanged={() => { }}
                  barCodeTypes={[RNCamera.Constants.BarCodeType.qr, 'qr']}
                  permissionDialogTitle={'Permission to use camera'}
                  permissionDialogMessage={'We need your permission to use your camera phone'}
                  style={styles.preview}
                  type={this.state.camera.type}>
                  <BarcodeMask />
                </RNCamera> */}


                <View style={[styles.overlay, styles.topOverlay]}>
                  <Text style={styles.scanScreenMessage}>Please place and scan the barcode here</Text>
                </View>
                <TextInput style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Enter Barcode"
                  placeholderTextColor="#8F9EB7"
                  textAlignVertical="center"
                  keyboardType={'default'}
                  autoCapitalize="none"
                  onEndEditing
                  onChangeText={(text) => this.handleBarCode(text)}
                  onEndEditing={() => this.endEditing()}
                ///  onSubmitEditing={this.barcodeDBStore}

                // value={this.state.username}
                //   ref={inputemail => { this.emailValueInput = inputemail }}
                />

                <TouchableOpacity style={{
                  position: 'absolute',
                  right: 28,
                  top: 15,
                }} onPress={() => this.navigateToScanCode()}>
                  <Image source={require('../assets/images/barcode.png')} />
                </TouchableOpacity>

                {/* this.props.navigation.navigate('AuthNavigation') */}

              </View>
            )}


            {this.state.flagone && (
              <View style={styles.tablecontainer}>
                <Text style={styles.saleBillsText}> List Of Sale Items </Text>
                <Text style={{
                  color: "#FFFFFF",
                  marginTop: 5,
                  fontFamily: "regular",
                  fontSize: 14, textAlign: 'center', width: 50,
                }}> PAY </Text>

                <Image source={this.state.flagfour ? require('../assets/images/topSelect.png') : null} style={{
                  left: 30, marginTop: 5,
                }} />
                {/* </TouchableOpacity> */}
                {/* <Table borderStyle={{ borderWidth: 2, borderColor: '#FFFFFF', backgroundColor: "#FAFAFF" }}>
                  <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                  {/* <Rows data={this.state.tableData} style={styles.head} textStyle={styles.textData} /> */}
                {/* {
                    state.tableData.map((rowData, index) => (
                      <TableWrapper key={index} style={styles.head} textStyle={styles.textData}>
                        {
                          rowData.map((cellData, cellIndex) => (
                            <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.textData} />
                          ))
                        }
                      </TableWrapper>
                    ))
                  } */}
                {/* {state.tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row} textStyle={styles.textData}>
                      {
                        rowData.map((cellData, cellIndex) => (
                          <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.textData} />
                        ))
                      }
                    </TableWrapper>
                  ))
                  }
                </Table>  */}

                <FlatList
                  // ListHeaderComponent={this.renderHeader}
                  data={this.state.tableData}
                  keyExtractor={item => item.email}
                  renderItem={({ item, index }) => (
                    <View style={{
                      height: 80,
                      backgroundColor: 'lightgray',
                      margin: 5, borderRadius: 10,
                      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <View style={{ flexDirection: 'column', width: '55%' }}>
                        <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 20, fontFamily: 'bold' }}>
                          Product name: {item.itemdesc}
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 0, marginLeft: 20, fontFamily: 'bold' }}>
                          Price: Rs {(parseInt(item.netamount) * item.qty).toString()}
                        </Text>
                        <Text style={{ fontSize: 15, marginBottom: 20, marginLeft: 20, fontFamily: 'regular' }}>
                          Qty: {item.qty}
                        </Text>
                      </View>
                      <TextInput
                            style={{
                              justifyContent: 'center',
                              height: 30,
                              width: 80,
                              marginLeft:-80,
                              marginTop: 30,
                              borderColor: '#8F9EB717',
                              borderRadius: 3,
                              backgroundColor: 'white',
                              borderWidth: 1,
                              fontFamily: 'semibold',
                              fontSize: 16
                            }}
                            underlineColorAndroid="transparent"
                            placeholder="0"
                            placeholderTextColor="#8F9EB7"

                            value={'1PC'}
                            onChangeText={(text) => this.updateQtyValue(text, index)}
                          />
                      <View style={{
                        flexDirection: 'column',
                        width: '45%',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        {/* <TouchableOpacity
                          style={{
                            fontSize: 15, fontFamily: 'regular',
                            right: 20, bottom: 10,
                            backgroundColor: '#ED1C24', width: 170, height: 30,
                            textAlign: 'center', justifyContent: 'center', marginTop: 15, //Centered horizontally
                            alignItems: 'center', borderRadius: 20
                          }}
                          onPress={() => this.addAction(item, index)} >
                          <Text style={{
                            color: "#ffffff"
                          }}>
                            ADD TO NEW SALE
                          </Text>
                        </TouchableOpacity> */}
                        <View style={{
                          backgroundColor: 'grey',
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          height: 30,
                          width: 90
                        }}>
                          <TouchableOpacity>
                            <Text onPress={() => this.incrementForTable(item, index)}>+</Text>
                          </TouchableOpacity>
                          {/* <Text> {item.qty}</Text> */}
                          <TextInput
                            style={{
                              justifyContent: 'center',
                              margin: 20,
                              height: 30,
                              width: 30,
                              marginTop: 10,
                              marginBottom: 10,
                              borderColor: '#8F9EB717',
                              borderRadius: 3,
                              backgroundColor: 'white',
                              borderWidth: 1,
                              fontFamily: 'semibold',
                              fontSize: 16
                            }}
                            underlineColorAndroid="transparent"
                            placeholder="0"
                            placeholderTextColor="#8F9EB7"
                            textAlignVertical="center"
                            value={item.qty}
                            onChangeText={(text) => this.updateQtyForTable(text, index)}
                          />
                          <TouchableOpacity>
                            <Text onPress={() => this.decreamentForTable(item, index)}>-</Text>

                          </TouchableOpacity>
                        </View>
                      </View>

                    </View>
                  )}
                />


                {this.state.tableData.length != 0 && (
                  <View style={styles.TopcontainerforItems}>
                    {/* <TouchableOpacity
                      style={styles.qty}
                    >
                      <Text style={styles.signInButtonText}>  {this.state.totalQty} Qty </Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                      style={styles.itemscount}
                    >
                      <Text style={styles.signInButtonText}>  {this.state.tableData.length} Items </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.itemDetail}

                    >
                      <Text style={{
                        color: "#ED1C24", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
                        fontSize: 12, position: 'absolute', marginTop: 0
                      }}>
                        Tax : ₹0.00 </Text>
                      <Text style={{
                        color: "#ED1C24", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
                        fontSize: 12, position: 'absolute', marginTop: 15
                      }}>
                        Discount : ₹0.00 </Text>
                      <Text style={{
                        color: "#ED1C24", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
                        fontSize: 12, position: 'absolute', marginTop: 30
                      }}>
                        Total Amount :   ₹{this.state.totalAmount}.00 </Text>

                    </TouchableOpacity>
                  </View>
                )}

                {this.state.tableData.length != 0 && (
                  <View style={styles.TopcontainerforPay}>
                    <TouchableOpacity
                      style={styles.signInButton}
                    >
                      <Text style={styles.signInButtonText}> Pay Cash </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.signInButtonRight}
                      onPress={() => this.pay()} >
                      <Text style={styles.signInButtonText}> Pay Card </Text>
                    </TouchableOpacity>

                  </View>
                )}
              </View>



            )}

            {this.state.flagfour && (
              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => this.pay()} >
                <Text style={styles.signInButtonText}> PAY </Text>
              </TouchableOpacity>
            )}

            {this.state.flagtwo && (
              <View>
                <Modal isVisible={this.state.modalVisible}>
                  <View style={{
                    flex: 1, justifyContent: 'center', //Centered horizontally
                    alignItems: 'center',
                  }}>
                    <View style={{ flexDirection: 'column', flex: 0, marginLeft: 20, marginRight: 20, backgroundColor: "#ffffff", borderRadius: 20, }}>
                      <Text style={{
                        color: "#ED1C24", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
                        fontSize: 12,
                      }}>Customer Details</Text>
                      <Text style={styles.signInFieldStyle}> Mobile Number* </Text>
                      <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder=""
                        placeholderTextColor="#0F2851"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        onChangeText={this.handleMobileNumber}
                        ref={inputemail => { this.emailValueInput = inputemail }} />

                      <Text style={styles.signInFieldStyle}> Alternative Mobile Number </Text>
                      <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder=""
                        placeholderTextColor="#0F2851"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        onChangeText={this.handleAltNumber}
                        ref={inputemail => { this.emailValueInput = inputemail }} />

                      <Text style={styles.signInFieldStyle}> Name </Text>
                      <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder=""
                        placeholderTextColor="#0F2851"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        onChangeText={this.handlename}
                        ref={inputemail => { this.emailValueInput = inputemail }} />

                      <Text style={styles.signInFieldStyle}> Gender </Text>
                      <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder=""
                        placeholderTextColor="#0F2851"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        onChangeText={this.handleGender}
                        ref={inputemail => { this.emailValueInput = inputemail }} />

                      <Text style={styles.signInFieldStyle}> gst Number </Text>
                      <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder=""
                        placeholderTextColor="#0F2851"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        onChangeText={this.handleGstnumber}
                        ref={inputemail => { this.emailValueInput = inputemail }} />

                      <Text style={styles.signInFieldStyle}> DOB </Text>
                      <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder=""
                        placeholderTextColor="#0F2851"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        onChangeText={this.handledob}
                        ref={inputemail => { this.emailValueInput = inputemail }} />

                      <Text style={styles.signInFieldStyle}> Anniverary </Text>
                      <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder=""
                        placeholderTextColor="#0F2851"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        onChangeText={this.handleEmail}
                        ref={inputemail => { this.emailValueInput = inputemail }} />

                      <Text style={styles.signInFieldStyle}> Address </Text>
                      <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder=""
                        placeholderTextColor="#0F2851"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        onChangeText={this.handleaddress}
                        ref={inputemail => { this.emailValueInput = inputemail }} />
                      <View style={styles.TopcontainerforModel}>
                        <TouchableOpacity
                          style={{
                            width: "50%",
                            height: 50, backgroundColor: "#ECF7FF", borderBottomLeftRadius: 20,
                          }}
                          onPress={() => this.modelCancel()} >
                          <Text style={{
                            textAlign: 'center', marginTop: 15, color: "#ED1C24", fontSize: 15,
                            fontFamily: "regular",
                          }}> CANCEL </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            width: "50%",
                            height: 50, backgroundColor: "#ED1C24", borderBottomRightRadius: 20,
                          }}
                          onPress={() => this.modelCreate()} >
                          <Text style={{
                            textAlign: 'center', marginTop: 15, color: "#ffffff", fontSize: 15,
                            fontFamily: "regular",
                          }}> CREATE </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            )}

            {/* <Left>
                                <Button transparent style={{ marginTop: -102, marginLeft: -162, width: 50, height: 50 }} onPress={() => this.props.navigation.openDrawer()}>
                                    <Image
                                        source={image}
                                        style={{ width: 32, height: 32 }}
                                    />
                                </Button>
                            </Left> */}

          </SafeAreaView>
          {/* <Text style={{backgroundColor: 'white'}}>New Sale Screen</Text>   */}
        </View>
      </ScrollView>
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
    backgroundColor: '#ED1C24',
    width: deviceWidth,
    textAlign: 'center',
    fontSize: 24,
    height: 84,
  },
  input: {
    justifyContent: 'center',
    margin: 20,
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    borderColor: '#8F9EB717',
    borderRadius: 3,
    backgroundColor: 'white',
    borderWidth: 1,
    fontFamily: 'semibold',
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#ED1C24',
    justifyContent: 'center',
    width: '48%',
    marginLeft: 0,
    marginTop: 10,
    height: 40,
    borderRadius: 30,
    fontWeight: 'bold',
    margin: 10,
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
    width: '48%',
    marginTop: 10,
    height: 40,
    margin: 10,
    borderRadius: 30,
    fontWeight: 'bold',
  },
  signInButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: "regular",
  },
  signInFieldStyle: {
    color: '#456CAF55',
    marginLeft: 20,
    marginTop: 5,
    fontSize: 12,
    fontFamily: "regular",
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
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
    backgroundColor: 'grey',
    height: 50
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
    marginTop: 10,
    width: '100%',
    backgroundColor: '#ffffff',
    borderColor: 'lightgray',
    borderRadius: 0,
    height: 50,
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
  btnText: { textAlign: 'center', color: '#fff' }


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
