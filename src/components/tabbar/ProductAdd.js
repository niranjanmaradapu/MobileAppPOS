import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';
import CreateCustomerService from '../services/CreateCustomerService';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import NewSaleService from '../services/NewSaleService';
import { DrawerActions } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
import { SearchBar } from "react-native-elements";
// Connction to access the pre-populated db
const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });
import { RNCamera } from 'react-native-camera';
import NetInfo from "@react-native-community/netinfo";
import RNBeep from 'react-native-a-beep';
import { Alert } from 'react-native';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ProductAdd extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.camera = null;
        this.barcodeCodes = [];
        this.state = {
            image: null,
            images: null,
            barcodeId: "",
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

    cancel() {
        console.log('clicked')
        //this.setState({ modalVisible: true });
        this.setState({ flagqtyModelOpen: false })
        this.setState({ modalVisible: false });
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


    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
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

                        console.log(`added successfully`);
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


    refresh() {
        this.setState({ productname: global.productname })
        console.log('search' + this.state.productname)
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

    navigateToImageScanner() {
        global.productname = 'something'
        this.props.navigation.navigate('ImageScanner', {
            onGoBack: () => this.refresh(),
        });
    }

    imageAction() {
        console.log('tapped')
        this.setState({ flagqtyModelOpen: true })
        this.setState({ modalVisible: true });
    }



    render() {
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
                </View>
                <KeyboardAwareScrollView KeyboardAwareScrollView
                enableOnAndroid={true}>
                    <View>
                        <View style={{
                            flex: 1, justifyContent: 'center', //Centered horizontally
                            alignItems: 'center', color: '#ffffff'
                        }}>
                            <View style={{ flexDirection: 'column', flex: 0, marginLeft: 0, marginTop: 20, marginRight: 0, backgroundColor: "#ffffff", borderRadius: 20, }}>

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
                                                        onPress={() => this.pickSingleWithCamera(true)} >
                                                        <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('Select Product Image With Camera')} </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        style={{ backgroundColor: '#ED1C24', borderRadius: 5, width: 200, marginTop: 20, height: 32, alignSelf: 'center' }}
                                                        onPress={() => this.pickSingle(true)} >
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
                                        top: 45,
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
                                        top: 45,
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
                                        top: 45,
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
        marginTop: 28,
        marginBottom: 10,
        borderColor: '#DCE3F2',
        borderRadius: 5,
        color: '#353C40',
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
