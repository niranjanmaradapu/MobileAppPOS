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


class NewSale extends Component {
  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    // this.navigate = this.props.navigation.navigate;
    this.state = {
      barcodeId: "",
      mobileNumber: "",
      altMobileNo: "",
      name: "",
      loading: false,
      data: [],
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
      ]
    }
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
              this.state.quantity = qty
              this.state.totalQty = this.state.totalQty + item["qty"]
              this.state.totalAmount = this.state.totalAmount + item["netAmount"]
              this.state.data.push({ sno, barcode, itemDesc, netAmount, qty, netAmount })
              this.state.temp.push({ sno, barcode, itemDesc, netAmount, qty, netAmount })
            }
            console.log(JSON.stringify(this.state.data));
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
          data: [...this.state.temp]
        });
        return;
      }
      this.state.data = this.state.temp.filter(function (item) {
        return item.itemDesc.includes(search);
      }).map(function ({ itemDesc, netAmount }) {
        return { itemDesc, netAmount };
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
              this.state.totalAmount = this.state.totalAmount + item["netAmount"]
              this.state.tableData.push([sno, barcode, itemDesc, netAmount, qty, netAmount])
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
    const params = {
      "amount": this.state.totalAmount,
      "info": "order_request"
    }
    console.log(NewSaleService.payment());
    axios.post(NewSaleService.payment(), params).then((res) => {
      // this.setState({isPayment: false});
      const data = res.data
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
  }


  topbarAction4() {
    this.setState({ flagone: false })
    this.setState({ flagtwo: false })
    this.setState({ flagthree: false })
    this.setState({ flagfour: true })
  }

  _alertIndex(index) {
    //     const some_array = [...this.state.qty]
    // some_array[index] = this.state.quantity
    // //this.setState({some_array:some_array})
    // //    this.state.qty[index] = this.state.quantity
    //     this.setState({ some_array: some_array })
    //     console.log(some_array)
    //    // Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    console.log(this.state.flagone)
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
              <Text style={styles.signUptext}> Home </Text>
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
                backgroundColor: this.state.flagone ? "#1CA2FF" : "#0196FD",
                alignSelf: "flex-start",
                //marginHorizontal: "1%",
                marginBottom: 6,
                width: "33.3%",
                height: 50,
                textAlign: "center",
              }}
                onPress={() => this.topbarAction1()} >
                <View style={{
                  backgroundColor: this.state.flagone ? "#1CA2FF" : "#0196FD",
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
                backgroundColor: this.state.flagtwo ? "#1CA2FF" : "#0196FD",
                alignSelf: "flex-start",
                //marginHorizontal: "1%",
                marginBottom: 6,
                width: "33.3%",
                height: 50,
                textAlign: "center",
              }}
                onPress={() => this.topbarAction2()} >
                <View style={{
                  backgroundColor: this.state.flagtwo ? "#1CA2FF" : "#0196FD",
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
                backgroundColor: this.state.flagthree ? "#1CA2FF" : "#0196FD",
                alignSelf: "flex-start",
                //marginHorizontal: "1%",
                marginBottom: 6,
                width: "33.3%",
                height: 50,
                textAlign: "center",
              }}
                onPress={() => this.topbarAction3()} >
                <View style={{
                  backgroundColor: this.state.flagthree ? "#1CA2FF" : "#0196FD",
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
      data={this.state.data}
      keyExtractor={item => item.email}
      renderItem={({ item }) => (
        <Text style={{ fontSize: 22,height:50,marginTop:10,marginLeft:20, }}>
          Product name: {item.itemDesc}  Price: {item.netAmount}Rs
        </Text>
      )}
    />
  </View>
            )}

            {this.state.flagone && (

              <View style={{ flex: 1 }}>
                <TextInput style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Scan Barcode"
                  placeholderTextColor="#8F9EB7"
                  textAlignVertical="center"
                  keyboardType={'default'}
                  autoCapitalize="none"
                  onChangeText={(text) => this.handleBarCode(text)}
                ///  onSubmitEditing={this.barcodeDBStore}

                // value={this.state.username}
                //   ref={inputemail => { this.emailValueInput = inputemail }}
                />

                <Image source={require('../assets/images/barcode.png')} style={{
                  position: 'absolute',
                  right: 28,
                  top: 15,
                }} />

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
                <Table borderStyle={{ borderWidth: 2, borderColor: '#FFFFFF', backgroundColor: "#FAFAFF" }}>
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
                  {state.tableData.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row} textStyle={styles.textData}>
                      {
                        rowData.map((cellData, cellIndex) => (
                          <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.textData} />
                        ))
                      }
                    </TableWrapper>
                  ))
                  }
                </Table>

                {this.state.tableData.length != 0 && (
                  <View style={styles.TopcontainerforItems}>
                    <TouchableOpacity
                      style={styles.qty}
                    >
                      <Text style={styles.signInButtonText}>  {this.state.totalQty} Qty </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.itemscount}
                    >
                      <Text style={styles.signInButtonText}>  {this.state.tableData.length} Items </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.itemDetail}

                    >
                      <Text style={{
                        color: "#0196FD", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
                        fontSize: 12, position: 'absolute', marginTop: 0
                      }}>
                        Tax : ₹0.00 </Text>
                      <Text style={{
                        color: "#0196FD", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
                        fontSize: 12, position: 'absolute', marginTop: 15
                      }}>
                        Discount : ₹0.00 </Text>
                      <Text style={{
                        color: "#0196FD", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
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
                        color: "#0196FD", fontFamily: "semibold", alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginTop: 10,
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
                            textAlign: 'center', marginTop: 15, color: "#0196FD", fontSize: 15,
                            fontFamily: "regular",
                          }}> CANCEL </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            width: "50%",
                            height: 50, backgroundColor: "#0196FD", borderBottomRightRadius: 20,
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
    backgroundColor: '#0196FD',
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
    fontSize: 10,
  },
  signInButton: {
    backgroundColor: '#0196FD',
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
    backgroundColor: '#0196FD',
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
    backgroundColor: '#0196FD',
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
    backgroundColor: '#0196FD',
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
    color: "#0196FD",
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
    backgroundColor: "#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height: 45,
    textAlign: "center",
  },
  blackbox: {
    backgroundColor: "#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height: 45,
    textAlign: "center",
  },
  greenbox: {
    backgroundColor: "#0196FD",
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
    backgroundColor: "#0196FD",
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
    backgroundColor: "#0196FD",
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
});
