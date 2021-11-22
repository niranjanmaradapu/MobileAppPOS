import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';
import axios from 'axios';
import NewSaleService from '../services/NewSaleService';
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
import InventoryService from '../services/InventoryService';
import AsyncStorage from '@react-native-async-storage/async-storage';


class AddPool extends Component {
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
            arrayData: [1, 2],
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

            domainId: 1,
            storeId: 1,



            uom: [],

            productItemId: 0,
            flagCustomerOpen: false,
            barcodeId: 0,
            productname: "",
            produtctQty: 0,
            productuom: "",
            productmrp: "",
            productofferprice: "",
            tableHead: ['S.No', 'Barcode', 'Product', 'Price Per Qty', 'Qty', 'Sales Rate'],
            tableData: [
            ],
            camera: {
                type: RNCamera.Constants.Type.back,
                flashMode: RNCamera.Constants.FlashMode.auto,
            }
        }
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
                "productItemId": this.state.productItemId,
                "costPrice": this.state.productmrp,
                "name": this.state.productname,
                "listPrice": this.state.productofferprice,
                "stockValue": this.state.produtctQty,
                "uom": this.state.productuom,
                "domainDataId": this.state.domainId,
                "storeId": this.state.storeId,
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

    onEndReached() {
        this.listRef.scrollToOffset({ offset: 0, animated: true });
    }

    addPoolRool() {
        this.setState({ modalVisible: true });
        this.setState({ flagCustomerOpen: true });
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
                    }}> Add Pool </Text>
                </View>

            


                <KeyboardAwareScrollView KeyboardAwareScrollView
                    enableOnAndroid={true}>
                    <View>
                        <View style={{
                            flex: 1, justifyContent: 'center', //Centered horizontally
                            alignItems: 'center', color: '#ffffff'
                        }}>
                            <View style={{ flexDirection: 'column', flex: 0, marginLeft: 0, marginTop: 20, marginRight: 0, backgroundColor: "#ffffff", borderRadius: 20, }}>
                                <Text style={{ fontSize: 16, marginLeft: 16, marginTop: 20, fontFamily: 'medium', color: '#ED1C24' }}>
                                    Pool Details
                                </Text>
                                <View style={{ marginTop: 10, width: deviceWidth, }}>

                                    <TextInput style={styles.input}
                                        underlineColorAndroid="transparent"
                                        placeholder="POOL NAME"
                                        placeholderTextColor="#353C4050"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.productmrp}
                                        onChangeText={this.handleInventoryMRP}
                                        ref={inputemail => { this.emailValueInput = inputemail }} />


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
                                                label: 'POOL TYPE',

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
                                                label: 'POOL RULE',

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
                                        <Text></Text>
                                    </View>

                                </View>

                                <Text style={{ fontSize: 16, marginLeft: 16, marginTop: 20, fontFamily: 'medium', color: '#ED1C24' }}>
                                    Pool Rules
                                </Text>
                                <TouchableOpacity
                                    style={{ position: 'absolute', right: 20, top: 240, borderRadius: 5, borderColor: "#ED1C24", backgroundColor: '#ffffff', width: 90, height: 28, borderWidth: 1, }}
                                    onPress={() => this.addPoolRool()} >
                                    <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ED1C24', marginTop: 4, textAlign: 'center', alignSelf: 'center', borderRadius: 5, borderColor: "#ED1C24", }}> {('Add Pool Rule')} </Text>
                                </TouchableOpacity>


                                <ScrollView>
                                    <FlatList
                                        data={this.state.arrayData}
                                        style={{ marginTop: 40, }}
                                        onEndReached={this.onEndReached.bind(this)}

                                        ref={(ref) => { this.listRef = ref; }}
                                        keyExtractor={item => item.email}
                                        renderItem={({ item, index }) => (
                                            <View style={{
                                                height: 100,
                                                backgroundColor: '#FFFFFF',
                                                borderBottomWidth: 5,
                                                borderBottomColor: '#FFFFFF',
                                                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                                            }}>
                                                <View style={{ flexDirection: 'column', width: '100%', height: 100, borderTopWidth: 10, borderColor: '#F6F6F6' }}>
                                                    {/* <Text style={{ fontSize: 16,marginLeft:16, marginTop: 20, fontFamily: 'medium', color: '#ED1C24' }}>
                       Pool id: #1011
                      </Text>
                      
                      <Text style={{ fontSize: 12,marginLeft:16, marginTop: 20,  fontFamily: 'regular', color: '#808080' }}>
                      POOL NAME
                      </Text>
                      <Text style={{ fontSize: 14,marginLeft:16, marginTop: 0, fontFamily: 'medium', color: '#353C40' }}>
                       Womens 3 @ 999
                      </Text>
                      <Text style={{ fontSize: 12,marginLeft:16, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
                      CREATED BY 
                      </Text>
                      <Text style={{ fontSize: 12, marginLeft:16,marginTop: 0, fontFamily: 'regular', color: '#353C40' }}>
                      Ramesh
                      </Text>
                      <Text style={{ fontSize: 12,marginLeft:150, marginTop: -30, fontFamily: 'regular', color: '#808080' }}>
                      CREATED ON
                      </Text>
                      <Text style={{ fontSize: 12,marginLeft:150, marginTop: 0, fontFamily: 'regular', color: '#353C40' }}>
                      30 Sep 2021
                      </Text> */}
                                                    <Text style={{ fontSize: 12, marginLeft: 16, marginTop: 20, fontFamily: 'regular', color: '#808080' }}>
                                                        RULE NAME
                                                    </Text>
                                                    <Text style={{ fontSize: 14, marginLeft: 16, marginTop: 0, fontFamily: 'medium', color: '#353C40' }}>
                                                        Text here
                                                    </Text>

                                                    <Text style={{
                                                        fontSize: 12, marginTop: -30, marginLeft: deviceWidth / 2 - 40, fontFamily: 'regular', color: '#808080', justifyContent: 'center', //Centered horizontally
                                                        alignItems: 'center', //Centered vertically
                                                        flex: 1
                                                    }}>
                                                        OPERATOR
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: 14, marginTop: -40, marginLeft: deviceWidth / 2 - 40, fontFamily: 'medium', color: '#353C40', justifyContent: 'center', //Centered horizontally
                                                        alignItems: 'center', //Centered vertically
                                                        flex: 1
                                                    }}>
                                                        Text
                                                    </Text>

                                                    <Text style={{ fontSize: 12, position: 'absolute', right: 50, top: 23, fontFamily: 'regular', color: '#808080' }}>
                                                        VALUES
                                                    </Text>
                                                    <Text style={{ fontSize: 12, position: 'absolute', right: 50, top: 37, fontFamily: 'medium', color: '#353C40', }}>
                                                        RULE NAME
                                                    </Text>
                                                </View>



                                                <TouchableOpacity style={{
                                                    position: 'absolute',
                                                    right: 10,
                                                    top: 30,
                                                    width: 30,
                                                    height: 30,


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
                                    <View style={{ flexDirection: 'column', width: deviceWidth, backgroundColor: "#F6F6F6", marginTop: 20, }}>
                                        <Text style={{
                                            fontSize: 14, marginTop: 50, height: 100, fontFamily: 'regular', color: '#808080', textAlign: 'center', //Centered horizontally
                                            alignItems: 'center', //Centered vertically
                                            flex: 1
                                        }}>
                                            add more rules buy clicking on add pool rule button

                                        </Text>

                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            margin: 10,
                                            height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                                        }} onPress={() => this.inventoryUpdate()}
                                    >
                                        <Text style={{
                                            textAlign: 'center', marginTop: 20, color: "#ffffff", fontSize: 15,
                                            fontFamily: "regular"
                                        }}  > SAVE </Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            margin: 10,
                                            height: 50, backgroundColor: "#ffffff", borderRadius: 5, borderWidth: 1, borderColor: "#353C4050",
                                        }} onPress={() => this.inventoryUpdate()}
                                    >
                                        <Text style={{
                                            textAlign: 'center', marginTop: 20, color: "#353C4050", fontSize: 15,
                                            fontFamily: "regular"
                                        }}  > CANCEL </Text>

                                    </TouchableOpacity>

                                </ScrollView>






                                {/* <View style={{ flexDirection: 'column', width: deviceWidth, height: 140, borderTopWidth: 5,marginTop:20, borderColor: '#F6F6F6', }}>

                                    <Text style={{ fontSize: 12, marginLeft: 16, marginTop: 20, fontFamily: 'regular', color: '#808080' }}>
                                        RULE NAME
                                    </Text>
                                    <Text style={{ fontSize: 14, marginLeft: 16, marginTop: 0, fontFamily: 'medium', color: '#353C40' }}>
                                        Text here
                                    </Text>

                                    <Text style={{
                                        fontSize: 12, marginTop: -30,marginLeft:deviceWidth/2-40, fontFamily: 'regular', color: '#808080', justifyContent: 'center', //Centered horizontally
                                        alignItems: 'center', //Centered vertically
                                        flex: 1
                                    }}>
                                       OPERATOR
                                    </Text>
                                    <Text style={{ fontSize: 14, marginTop: -90,marginLeft:deviceWidth/2-40, fontFamily: 'medium', color: '#353C40',justifyContent: 'center', //Centered horizontally
                                        alignItems: 'center', //Centered vertically
                                        flex: 1 }}>
                                        Text 
                                    </Text>

                                    <Text style={{ fontSize: 12, position: 'absolute', right: 20,top:20, fontFamily: 'regular', color: '#808080' }}>
                                        VALUES
                                    </Text>
                                    <Text style={{ fontSize: 12, position: 'absolute', right: 20,top:34,fontFamily: 'medium', color: '#353C40', }}>
                                        RULE NAME
                                    </Text>
                                </View> */}









                            </View>

                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>

        )
    }
}
export default AddPool


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