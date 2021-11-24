import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';
import axios from 'axios';
import NewSaleService from '../../services/NewSaleService';
import { openDatabase } from 'react-native-sqlite-storage';
// Connction to access the pre-populated db
const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });
import { RNCamera } from 'react-native-camera';
import { Alert } from 'react-native';
import Modal from "react-native-modal";
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import NetInfo from "@react-native-community/netinfo";
import InventoryService from '../../services/InventoryService';
import AsyncStorage from '@react-native-async-storage/async-storage';


class ProductEdit extends Component {
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
            domainId:1,
           storeId:1,
            
          
            
            uom: [],
          
            productItemId:0,
            barcodeId:0,
            productname:"",
            produtctQty:0,
            productuom:"",
            productmrp:"",
            productofferprice:"",
            tableHead: ['S.No', 'Barcode', 'Product', 'Price Per Qty', 'Qty', 'Sales Rate'],
            tableData: [
            ],
            camera: {
                type: RNCamera.Constants.Type.back,
                flashMode: RNCamera.Constants.FlashMode.auto,
            }
        }
    }

    async componentDidMount() {
        var domainStringId = ""
        var storeStringId = ""
        AsyncStorage.getItem("domainDataId").then((value) => {
          domainStringId = value
          this.setState({ domainId: parseInt(domainStringId)})
          console.log("domain data id" + this.state.domainId)
         
        }).catch(() => {
          console.log('there is error getting domainDataId')
        })
    
        AsyncStorage.getItem("storeId").then((value) => {
          storeStringId = value
          this.setState({ storeId: parseInt(storeStringId)})
          console.log(this.state.storeId)
        }).catch(() => {
          console.log('there is error getting storeId')
        })

        this.setState({
            productItemId:this.props.route.params.productItemId,
            barcodeId:this.props.route.params.barcodeId,
            productname:this.props.route.params.productname,
            produtctQty:this.props.route.params.produtctQty,
            productuom:this.props.route.params.productuom,
            productmrp:this.props.route.params.productmrp,
            productofferprice:this.props.route.params.productofferprice,
        });
        console.log('sadsadf' + this.state.productuom)
        this.getUOM()
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
                    this.setState({ productname: response.data.result[0].name })
                    this.forceUpdate()
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    async getUOM() {
        NetInfo.addEventListener(state => {
            if (state.isConnected) {
                var uom = [];

                axios.get(InventoryService.getUOM()).then((res) => {
                    if (res.data["result"]) {
                        for (var i = 0; i < res.data["result"].length; i++) {
                            console.log('getuom' + res.data["result"][i].uomName)
                            uom.push({
                                value: res.data["result"][i].uomName,//id
                                label: res.data["result"][i].uomName,
                            });

                        }
                    }
                    this.setState({
                        uom: uom,
                    })
                    AsyncStorage.setItem("uomData", JSON.stringify(uom)).then(() => {
                        console.log('table data saved')
                    }).catch(() => {
                        console.log('there is error saving token')
                    })
                    console.log(this.state.uom)
                    // if(this.state.uom.length === 1){
                    //     //this.props.navigation.navigate('HomeNavigation')
                    // }
                    // else{
                    //     //this.props.navigation.navigate('SelectStore')
                    // }
                });
            }
            else {
                const value = AsyncStorage.getItem("uomData");
                console.log('value is---->' + JSON.stringify(value))
                this.setState({
                    uom: value,
                })
            }
        })
    }


    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

   
    handleUOM = (value) => {
        this.setState({ productuom: value });
    }



    handleInventoryBarcode = (text) => {
        this.setState({ barcodeId: text })
    }
    handleInventoryProductName = (text) => {
        this.setState({ productname: text })
    }
    handleInventoryQuantity = (value) => {
        this.setState({ produtctQty: value });
    }

    handleInventoryMRP = (text) => {
        this.setState({ productmrp: text })
    }
    handleInventoryDiscount = (text) => {
        this.setState({ productofferprice: text })
        // console.log(this.state.inventoryMRP)
        // console.log(text)
        // this.setState({ inventoryNetAmount: (parseInt(this.state.inventoryMRP) - parseInt(text)).toString() })
    }
    handleInventoryNetAmount = (text) => {
        this.setState({ inventoryNetAmount: text });
    }


    async inventoryUpdate() {
        if (String(this.state.barcodeId).length === 0) {
            alert('Please Enter Barcode by using scan/Mannually');
        } else if (this.state.productname.length === 0) {
            alert('Please Enter Product name');
        }
        else if (String(this.state.produtctQty).length === 0) {
            alert('Please Enter Quantity');
        }
        else if (this.state.productmrp.length === 0) {
            alert('Please Enter MRP');
        }
        else if (this.state.productofferprice.length === 0) {
            alert('Please Enter Discount %');
        }
        else {
            this.setState({ loading: true })
            const params = {
                //required 
                "productItemId":this.state.productItemId,
                "costPrice": this.state.productmrp,
                "name": this.state.productname,
                "listPrice":this.state.productofferprice,
                "stockValue":this.state.produtctQty,
                "uom": this.state.productuom, 
                "domainDataId": this.state.domainId,
                "storeId":this.state.storeId,
                "barcodeId": this.state.barcodeId,
                //optional
                "tyecode": this.state.productofferprice,//"10",
                "defaultImage": "",
                "status": "1",
                "title": "",
                "stock": "1",
                "color": "",
                "length": 35,
                "productValidity": "",
                "empId": 1
              }
              console.log('params are' + JSON.stringify(params))
              this.setState({ loading: true })
              axios.put(InventoryService.updateBarcode(), params).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                  this.setState({ loading: false })
                  this.props.route.params.onGoBack();
                  this.props.navigation.goBack();
                }
                else {
                    this.setState({ loading: false })
                 // this.setState({ loading: false })
                  alert("duplicate record already exists");
                }
              }
              );
        }
    }


    refresh() {
        this.setState({ productname: global.productname })
        console.log('search' + this.state.productname)
    }

    // refreshGetBarCode() {
    //     if (global.barcodeId != 'something') {
    //         this.setState({ inventoryBarcodeId: global.barcodeId })
    //     }
    // }


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
        // console.log('tapped')
        // this.setState({ flagqtyModelOpen: true })
        // this.setState({ modalVisible: true });
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
                        <Image source={require('../../assets/images/backButton.png')} />
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
                    }}> Edit details </Text>
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
                                        source={require('../../assets/images/cameraclick.png')} />

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
                                    <TextInput style={styles.barcodeinput}
                                        underlineColorAndroid="transparent"
                                        placeholder="BARCODE"
                                        placeholderTextColor="#353C4050"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        editable={false} selectTextOnFocus={false}
                                        value={String(this.state.barcodeId)}
                                        onChangeText={this.handleInventoryBarcode}
                                    />
                                </View>

                                <View>
                                    <TextInput style={styles.barcodeinput}
                                        underlineColorAndroid="transparent"
                                        placeholder="PRODUCT NAME"
                                        placeholderTextColor="#353C4050"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        editable={false} selectTextOnFocus={false}
                                        value={this.state.productname}
                                        onChangeText={this.handleInventoryProductName}
                                    />
                                </View>

                                <View>
                                    <TextInput style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="QTY"
                                        placeholderTextColor="#353C4050"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={String(this.state.produtctQty)}
                                        onChangeText={this.handleInventoryQuantity}
                                        ref={inputemail => { this.emailValueInput = inputemail }} />

                                    {/* <TouchableOpacity style={{
                        position: 'absolute',
                        right: 28,
                        top: 20,
                      }} >

                        <Text style={{ color: '#353C4050', fontFamily: 'regular', fontSize: 14, position: 'absolute', right: 0, }}> {'Select Unit >'} </Text>
                      </TouchableOpacity> */}
                                </View>

                                <View style={{
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
                                }} >
                                    <RNPickerSelect style={{
                                        color: '#8F9EB717',
                                        fontWeight: 'regular',
                                        fontSize: 15
                                    }}
                                        placeholder={{
                                            label: 'SELECT UOM',
                                         
                                        }}
                                        Icon={() => {
                                            return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                        }}
                                        items={this.state.uom}
                                        onValueChange={this.handleUOM}
                                        style={pickerSelectStyles}
                                        value={this.state.productuom}
                                        useNativeAndroidPickerStyle={false}

                                    />
                                </View>


                                <TextInput style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder="₹ MRP"
                                    placeholderTextColor="#353C4050"
                                    textAlignVertical="center"
                                    autoCapitalize="none"
                                    value={this.state.productmrp}
                                    onChangeText={this.handleInventoryMRP}
                                    ref={inputemail => { this.emailValueInput = inputemail }} />

                                <View>
                                    <TextInput style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="₹ OFFER PRICE"
                                        placeholderTextColor="#353C4050"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.productofferprice}
                                        onChangeText={this.handleInventoryDiscount}
                                        ref={inputemail => { this.emailValueInput = inputemail }} />

                                </View>




                                <TouchableOpacity
                                    style={{
                                        margin: 20,
                                        height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                                    }} onPress={() => this.inventoryUpdate()}
                                >
                                    <Text style={{
                                        textAlign: 'center', marginTop: 20, color: "#ffffff", fontSize: 15,
                                        fontFamily: "regular"
                                    }}  > SAVE </Text>

                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>

        )
    }
}
export default ProductEdit


const pickerSelectStyles = StyleSheet.create({
    placeholder: {
        color: "#353C4050",
        fontFamily: "regular",
        fontSize: 15,
    },
    inputIOS: {
        justifyContent: 'center',
        height: 42,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        //paddingLeft: -20,
        fontSize: 15,
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',
    },
    inputAndroid: {
        justifyContent: 'center',
        height: 42,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        //paddingLeft: -20,
        fontSize: 15,
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',
        color: '#001B4A',

        // marginLeft: 20,
        // marginRight: 20,
        // marginTop: 10,
        // height: 40,
        // backgroundColor: '#ffffff',
        // borderBottomColor: '#456CAF55',
        // color: '#001B4A',
        // fontFamily: "bold",
        // fontSize: 16,
        // borderRadius: 3,
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
    barcodeinput: {
        justifyContent: 'center',
        margin: 20,
        height: 50,
        marginTop: 28,
        marginBottom: 10,
        borderColor: '#DCE3F2',
        borderRadius: 5,
        color: '#353C40',
        backgroundColor: '#DCE3F2',
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
        marginTop: 16,
        marginRight: 20,
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
