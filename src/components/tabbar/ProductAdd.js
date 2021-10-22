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
import NetInfo from "@react-native-community/netinfo";
import RNBeep from 'react-native-a-beep';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RNPickerSelect from 'react-native-picker-select';




class ProductAdd extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.camera = null;
        this.barcodeCodes = [];



        // this.toggle = this.toggle.bind(this);
        // this.navigate = this.props.navigation.navigate;
        this.state = {
            image: require('../assets/images/sample.png'),
            images: null,
            productname: "",
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
            .catch((e) => alert(e));
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
                console.log(e);
                Alert.alert(e.message ? e.message : e);
            });

          
    }

     async getImageNameByScan() {
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
                if(response.data){
                console.log("response :", response.data.result[0].name);
                this.setState({ inventoryProductName: response.data.result[0].name})
                this.forceUpdate()
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }





    scaledHeight(oldW, oldH, newW) {
        return (oldH / oldW) * newW;
    }



    renderImage(image) {
        return (
            <Image
                style={{ width: 300, height: 300, resizeMode: 'contain', borderRadius: 150 }}
                source={image}
            />
        );
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image);
        }

        return this.renderImage(image);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
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
        if (this.state.barcodeId.length >= 1) {
            this.inventoryCreate()
        }
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

                            // this.state.quantity = qty
                            // this.state.totalQty = this.state.totalQty + item["qty"]
                            // this.state.totalAmount = this.state.totalAmount + item["netAmount"]
                            this.state.arrayData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount })
                            if (this.state.arrayData.length === 1) {
                                this.setState({ arrayData: this.state.arrayData })
                            }
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
                            console.log(JSON.stringify(item))
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
                                this.state.tableData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount })
                            }
                            else {
                                { RNBeep.beep() }
                                this.state.totalQty = this.state.totalQty + item["qty"]
                                this.state.totalAmount = parseInt(this.state.totalAmount) + parseInt(item["netAmount"] * 1)
                                this.state.tableData.push({ sno: sno, barcode: barcode, itemdesc: itemDesc, netamount: netAmount, qty: qty, netamount: netAmount })
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

    inventoryCreate() {
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
        db.transaction(txn => {
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS tbl_item(item_id INTEGER PRIMARY KEY AUTOINCREMENT, barcode VARCHAR(20), itemDesc VARCHAR(20), qty INT(5), mrp INT(30), promoDisc INT(30), netAmount INT(30), salesMan INT(30), createdDate VARCHAR(255),lastModified VARCHAR(255))`,
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
                'INSERT INTO tbl_item ( barcode, itemDesc, qty, mrp, promoDisc, netAmount, salesMan, createdDate, lastModified) VALUES (?,?,?,?,?,?,?,?,?)',
                [this.state.inventoryBarcodeId, this.state.inventoryProductName, parseInt(this.state.inventoryQuantity), parseInt(this.state.inventoryMRP), parseInt(this.state.inventoryDiscount), parseInt(this.state.inventoryNetAmount), 0, "2021-09-08T17:34:03.015299", "2021-09-09T00:13:42.671451"],
                //[, String(getListOfBarcodes[0][0]["itemDesc"]), getListOfBarcodes[0][0]["qty"], , getListOfBarcodes[0][0]['promoDisc'], getListOfBarcodes[0][0]['netAmount'], getListOfBarcodes[0][0]['salesMan'], String(getListOfBarcodes[0][0]['createdDate']), String(getListOfBarcodes[0][0]['lastModified'])],
                (sqlTxn, res) => {

                    console.log(`added successfully`);
                    // this.setState({ arrayData: [] })
                    // this.setState({ temp: [] })
                    // this.setState({ search: null })
                    // this.getItems()
                    // this.props.navigation.navigate('NewSale')
                    this.props.route.params.onGoBack();
                    this.props.navigation.goBack();
                    return true;

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
                        this.props.navigation.navigate('Orders', { total: this.state.totalAmount, payment: 'RazorPay' })
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
        this.setState({ productname: global.productname })
        console.log('search' + this.state.productname)
        this.barcodeDBStore()
        this.setState({ flagone: true })
        this.setState({ flagtwo: false })
        this.setState({ flagthree: false })
        this.setState({ flagfour: false })
        // }
    }

    refresh() {
        if( global.barcodeId != 'something'){
        this.setState({ inventoryBarcodeId: global.barcodeId })
        }
        // this.setState({ flagone: false })
        // this.setState({ flagtwo: true })
        // this.setState({ flagthree: false })
        // }
    }

    navigateToScanCode() {
       
    }

    navigateToGetBarCode() {
        console.log('tapped')
        global.barcodeId = 'something'
        //this.setState({ barcodeId: global.barcodeId })
        // this.props.navigation.navigate('ScanBarCode', {isFromNewSale:false, isFromAddProduct:true, 
        //     onGoBack: () => this.refresh(),
        // });

        this.props.navigation.navigate('ScanBarCode', {
            isFromNewSale: false, isFromAddProduct: true,
            onGoBack: () => this.refresh(),
          });
    }

    navigateToImageScanner() {
        global.productname = 'something'
        //this.setState({ barcodeId: global.barcodeId })
        this.props.navigation.navigate('ImageScanner', {
            onGoBack: () => this.refresh(),
        });
        
        //this.props.navigation.navigate('ImageScanner')
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

    imageAction() {
        console.log('tapped')
    }



    render() {
        console.log(this.state.inventoryProductName)
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

            <View style={styles.container}>

                <View style={styles.viewswidth}>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        left: 10,
                        top: 30,
                        width: 40,
                        height: 40,
                    }} onPress={() => this.handleBackButtonClick()}>
                        <Image source={require('../assets/images/backButton.png')} />
                    </TouchableOpacity>
                    <Text style={{
                        position: 'absolute',
                        left: 70,
                        top: 47,
                        width: 300,
                        height: 20,
                        fontFamily: 'bold',
                        fontSize: 18,
                        color: '#353C40'
                    }}> Product details </Text>
                    {/* <Text style={styles.signUptext}> Sign Up </Text> */}

                </View>
                <ScrollView>
                    <View>


                        <View style={{
                            flex: 1, justifyContent: 'center', //Centered horizontally
                            alignItems: 'center', color: '#ffffff'
                        }}>
                            <View style={{ flexDirection: 'column', flex: 0, marginLeft: 0, marginTop: 20, marginRight: 0, backgroundColor: "#ffffff", borderRadius: 20, }}>

                                <Image
                                    style={{ width: 80, height: 80, resizeMode: 'contain', borderRadius: 40, borderColor: '#F2F2F2', alignSelf: 'center', borderWidth: 2 }}
                                    source={this.state.image}
                                />
                                <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 10, alignSelf: 'center', top: -20, left: 15 }} onPress={() => this.imageAction()}>
                                    <Image
                                        style={{ width: 30, height: 30, borderRadius: 10, }}
                                        source={require('../assets/images/cameraclick.png')} />

                                </TouchableOpacity>



                                <TouchableOpacity
                                    style={{ backgroundColor: '#ED1C24', borderRadius: 5, width: 300, marginTop: 20, height: 32, alignSelf: 'center' }}
                                    onPress={() => this.pickSingleWithCamera(true)} >
                                    <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('Select Product Image With Camera With Cropping')} </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ backgroundColor: '#ED1C24', borderRadius: 5, width: 300, marginTop: 20, height: 32, alignSelf: 'center' }}
                                    onPress={() => this.pickSingle(true)} >
                                    <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('Select Product Image With Gallery With Cropping')} </Text>
                                </TouchableOpacity>


                                 <Text></Text>



                                {/* <Text style={styles.signInFieldStyle}> Unique BarCode* </Text> */}
                                <View style={{marginTop:10,width:deviceWidth}}>
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
                                  top:45,
                                  width:50,height:50,
                                }} onPress={() => this.navigateToGetBarCode()}>
                                    <Image style={{color:'#ED1C24',fontFamily:'regular',fontSize:12,position:'absolute',right:30,}} source={require('../assets/images/addnew.png')} />
                                    <Text style={{color:'#ED1C24',fontFamily:'regular',fontSize:12,position:'absolute',right:0,}}> scan </Text>
                                </TouchableOpacity>
                                </View>


                                {/* <Text style={styles.signInFieldStyle}> Product Name* </Text> */}
                                <TextInput style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder="PRODUCT NAME"
                                    placeholderTextColor="#353C4050"
                                    textAlignVertical="center"
                                    autoCapitalize="none"
                                    value={this.state.inventoryProductName}
                                    onChangeText={this.handleInventoryProductName}
                                    />

                                {/* <Text style={styles.signInFieldStyle}> Quantity* </Text> */}
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
                                    top: 45,
                                }} >
                                    
                                    <Text style={{color:'#353C4050',fontFamily:'regular',fontSize:14,position:'absolute',right:0,}}> {'Select Unit >'} </Text>
                                </TouchableOpacity>
                                </View>

                                {/* <Text style={styles.signInFieldStyle}> MRP for 1 item* </Text> */}
                               
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
                                    top: 45,
                                }} 
                                //onPress={() => this.navigateToGetBarCode()}
                                >
                                      <Text style={{color:'#353C4050',fontFamily:'regular',fontSize:14,position:'absolute',right:0,}}> {'%'} </Text>
 </TouchableOpacity>
                                
</View>
 


                                    <TouchableOpacity
                                        style={{
                                         margin:20,
                                            height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                                        }}
                                       >
                                        <Text style={{
                                            textAlign: 'center', marginTop: 20, color: "#ffffff", fontSize: 15,
                                            fontFamily: "regular"
                                        }}  onPress={() => this.inventoryCreate()} > ADD PRODUCT </Text>
                                        
                                    </TouchableOpacity>
                                </View>
                          
                        </View>
                        {/* </Modal>  */}

                    </View>
                </ScrollView>

                {/* <Left>
                                <Button transparent style={{ marginTop: -102, marginLeft: -162, width: 50, height: 50 }} onPress={() => this.props.navigation.openDrawer()}>
                                    <Image
                                        source={image}
                                        style={{ width: 32, height: 32 }}
                                    />
                                </Button>
                            </Left> */}


                {/* <Text style={{backgroundColor: 'white'}}>New Sale Screen</Text>   */}
            </View>

        )
    }
}
export default ProductAdd


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
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 84,
    },
    input: {
        justifyContent: 'center',
        margin: 20,
        height: 50,
        marginTop:28,
        marginBottom: 10,
        borderColor: '#DCE3F2',
        borderRadius: 5,
        color:'#353C40',
        backgroundColor: 'white',
        borderWidth: 1,
        fontFamily: 'regular',
        fontSize: 14,
        paddingLeft: 15
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
        backgroundColor: '#FFFFFF'
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
        margin: 18,
        
        backgroundColor: 'grey',
        borderRadius: 20,
        height: 44,
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
