import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Device from 'react-native-device-detection';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from "react-native-modal";
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import { openDatabase } from 'react-native-sqlite-storage';
var deviceWidth = Dimensions.get('window').width;
// Connction to access the pre-populated db
const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });
const createdb = openDatabase({ name: 'create_items.db', createFromLocation: 1 });

class GenerateInvoiceSlip extends Component {
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
            totalDiscount: 0,
            gender: "Male",
            gstNumber: "",
            dob: "2021-06-21T18:30:00.000Z",
            address: "",
            modalVisible: true,
            flagone: true,
            flagqtyModelOpen: false,
            flagCustomerOpen: false,
            flagtwo: false,
            productItemId: 0,
            productuom: "",
            flagthree: false,
            flagfour: false,
            inventoryBarcodeId: '',
            inventoryProductName: '',
            inventoryQuantity: '',
            inventoryMRP: '',
            inventoryDiscount: '',
            inventoryNetAmount: '',
            customerPhoneNumber: '',
            customerName: '',
            customerEmail: '',
            customerGender: '',
            customerAddress: '',
            customerGSTNumber: '',
            domainId: 1,
            storeId: 1,
            tableHead: ['S.No', 'Barcode', 'Product', 'Price Per Qty', 'Qty', 'Sales Rate'],
            tableData: [1, 2],
            privilages: [{ bool: true, name: "Tag Customer" }, { bool: false, name: "Bill Level Discount" }],
            inventoryDelete: false,
            lineItemDelete: false,
            uom: [],
            store: '',
            camera: {
                type: RNCamera.Constants.Type.back,
                flashMode: RNCamera.Constants.FlashMode.auto,
            }
        };
    }

    handleMenuButtonClick() {
        this.props.navigation.openDrawer();
    }

    cancel() {
        this.props.navigation.goBack(null);
        return true;
    }

    modelCancel() {
        this.setState({ modalVisible: false });
    }

    handlenewsaledeleteaction() {
        this.setState({ modalVisible: true, lineItemDelete: true });
    }

    deleteLineItem() {
        alert("you have deleted");
    }

    onEndReached() {
        this.listRef.scrollToOffset({ offset: 0, animated: true });
    }

    incrementForTable() {

    }

    updateQty() {

    }

    decreamentForTable() {

    }

    topbarAction1 = (item, index) => {
        if (this.state.privilages[index].bool === true) {
            this.state.privilages[index].bool = false;
        }
        else {
            this.state.privilages[index].bool = true;
        }
        for (let i = 0; i < this.state.privilages.length; i++) {
            if (index != i) {
                this.state.privilages[i].bool = false;
            }
            this.setState({ privilages: this.state.privilages });
        }
    };

    pay() {
        this.props.navigation.navigate('Payment', {
            totalAmount: this.state.totalAmount, totalDiscount: this.state.totalDiscount,
            customerName: this.state.customerName, customerPhoneNumber: this.state.customerPhoneNumber,
            customerGSTNumber: this.state.customerGSTNumber, customerAddress: this.state.customerAddress,
            customerGender: this.state.customerGender, lineItemIdAdd: lineItemIdAdd,
            totalQty: this.state.totalQty.toString(),
            onGoBack: () => this.invoiceUpdate(),
        });
    }

    handleDsNumber() {
        
    }


    render() {
        console.log(global.barcodeId);
        AsyncStorage.getItem("tokenkey").then((value) => {
            console.log(value);
        }).catch(() => {
            console.log('there is error getting token');
        });

        return (
            <View style={{ flex: 1 }}>


                {this.state.flagone && (
                    <ScrollView>
                        < View
                            style={{
                                flex: 1,
                                paddingHorizontal: 0,
                                paddingVertical: 0,
                                marginTop: 10,
                            }}>
                            <View>


                                <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                    underlineColorAndroid="transparent"
                                    placeholder="Enter DsNumber"
                                    placeholderTextColor="#6F6F6F60"
                                    textAlignVertical="center"
                                    keyboardType={'default'}
                                    autoCapitalize="none"
                                    onEndEditing
                                    onChangeText={(text) => this.handleDsNumber(text)}
                                    onEndEditing={() => this.endEditing()}
                                />





                            </View>
                            {this.state.tableData.length !== 0 && (
                                <FlatList
                                    style={styles.flatList}
                                    horizontal
                                    data={this.state.privilages}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity style={{
                                            height: 36,
                                            width: 200,
                                            borderWidth: 1,
                                            backgroundColor: item.bool ? '#ED1C24' : '#FFFFFF',
                                            borderColor: item.bool ? '#ED1C24' : '#858585',
                                            borderRadius: 5,
                                            marginLeft: 10,
                                        }} onPress={() => this.topbarAction1(item, index)} >

                                            <Text style={{ fontSize: 16, alignItems: 'center', alignSelf: 'center', marginTop: 5, color: item.bool ? "#FFFFFF" : '#858585', fontFamily: 'regular' }}>
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    ListFooterComponent={<View style={{ width: 15 }}></View>}
                                />
                            )}

                            <FlatList style={{ marginTop: 20, marginBottom: 20 }}
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
                                        height: Device.isTablet ? 240 : 140,
                                        backgroundColor: '#FFFFFF',
                                        borderBottomWidth: 5,
                                        borderBottomColor: '#FBFBFB',
                                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'

                                    }}>

                                        <View style={{ flexDirection: 'column', height: Device.isTablet ? 220 : 120, }}>
                                            <Image source={require('../assets/images/default.jpeg')}
                                                //source={{ uri: item.image }}
                                                style={{
                                                    position: 'absolute', left: 20, top: 15, width: Device.isTablet ? 140 : 90, height: Device.isTablet ? 140 : 90,
                                                }} />
                                            <Text style={{ fontSize: Device.isTablet ? 21 : 16, marginTop: 10, marginLeft: Device.isTablet ? 180 : 130, fontFamily: 'medium', color: '#353C40' }}>
                                                {item.itemdesc}
                                            </Text>
                                            <Text style={{ fontSize: Device.isTablet ? 17 : 12, marginLeft: Device.isTablet ? 180 : 130, marginTop: 0, fontFamily: 'regular', color: '#808080' }}>
                                                ITEM:
                                            </Text>
                                            <Text style={{ fontSize: Device.isTablet ? 17 : 12, marginLeft: Device.isTablet ? 245 : 195, marginTop: -16, fontFamily: 'medium', color: '#353C40' }}>
                                                {item.qty} {item.productuom}
                                            </Text>
                                            <Text style={{ fontSize: Device.isTablet ? 17 : 12, marginLeft: Device.isTablet ? 180 : 130, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
                                                QUANTITY:
                                            </Text>
                                            <Text style={{ fontSize: Device.isTablet ? 17 : 12, marginLeft: Device.isTablet ? 245 : 195, marginTop: -16, fontFamily: 'medium', color: '#353C40' }}>
                                                {item.qty} {item.productuom}
                                            </Text>

                                            {/* <Text style={{ fontSize: 12, marginLeft: 195, marginTop: -16, fontFamily: 'medium', color: '#353C40' }}>
                                                {item.qty} {item.productuom}
                                            </Text> */}
                                            <Text style={{ fontSize: Device.isTablet ? 17 : 12, marginLeft: Device.isTablet ? 180 : 130, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
                                                MRP:
                                            </Text>
                                            <Text style={{ fontSize: Device.isTablet ? 17 : 12, marginLeft: Device.isTablet ? 230 : 160, marginTop: Device.isTablet ? -20 : -15, fontFamily: 'medium', color: '#ED1C24' }}>
                                                {/* ₹ {(parseInt(item.netamount)).toString()} */}
                                                Rs. 1000
                                            </Text>
                                            <Text style={{ fontSize: Device.isTablet ? 17 : 12, marginLeft: Device.isTablet ? 310 : 220, marginTop: Device.isTablet ? -20 : -15, fontFamily: 'regular', color: '#808080' }}>
                                                DISCOUNT: Rs. 0
                                            </Text>
                                            <Text style={{ fontSize: Device.isTablet ? 17 : 12, marginLeft: Device.isTablet ? 180 : 130, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
                                                GROSS AMOUNT:
                                            </Text>

                                        </View>

                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                            height: Device.isTablet ? 60 : 30,
                                            marginLeft: -40,
                                            marginTop: Device.isTablet ? 60 : 80,
                                            marginRight: Device.isTablet ? 40 : 20,
                                            width: Device.isTablet ? 150 : 90,
                                            //borderWidth:1,
                                            //borderColor:'#ED1C24',
                                            // borderRadius:3,
                                        }}>
                                            <TouchableOpacity style={{
                                                borderColor: '#ED1C24',
                                                height: Device.isTablet ? 48 : 28,
                                                width: Device.isTablet ? 50 : 30,
                                                borderBottomLeftRadius: 3,
                                                borderTopLeftRadius: 3,
                                                borderBottomWidth: 1,
                                                borderTopWidth: 1,
                                                borderLeftWidth: 1, paddingLeft: 10, marginLeft: 20,
                                            }}>
                                                <Text style={{
                                                    alignSelf: 'center',
                                                    marginTop: 2,
                                                    marginLeft: -10,
                                                    fontSize: Device.isTablet ? 22 : 12,
                                                    color: '#ED1C24'
                                                }}
                                                    onPress={() => this.decreamentForTable(item, index)}>-</Text>
                                            </TouchableOpacity>
                                            {/* <Text> {item.qty}</Text> */}
                                            <TextInput
                                                style={{
                                                    justifyContent: 'center',
                                                    margin: 20,
                                                    height: Device.isTablet ? 48 : 28,
                                                    width: Device.isTablet ? 50 : 30,
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                    borderColor: '#ED1C24',
                                                    backgroundColor: 'white',
                                                    color: '#353C40',
                                                    borderWidth: 1,
                                                    fontFamily: 'regular',
                                                    fontSize: Device.isTablet ? 22 : 12,
                                                    paddingLeft: Device.isTablet ? 15 : 9,
                                                }}
                                                underlineColorAndroid="transparent"
                                                placeholder="0"
                                                placeholderTextColor="#8F9EB7"

                                                value={item.qty}
                                                onChangeText={(text) => this.updateQty(text, index)}
                                            />
                                            <TouchableOpacity style={{
                                                borderColor: '#ED1C24',
                                                height: Device.isTablet ? 48 : 28,
                                                width: Device.isTablet ? 50 : 30, borderBottomRightRadius: 3,
                                                borderTopRightRadius: 3,
                                                borderBottomWidth: 1,
                                                borderTopWidth: 1,
                                                borderRightWidth: 1
                                            }}>
                                                <Text style={{
                                                    alignSelf: 'center',
                                                    marginTop: 2,
                                                    fontSize: Device.isTablet ? 22 : 12,
                                                    color: '#ED1C24'
                                                }}
                                                    onPress={() => this.incrementForTable(item, index)}>+</Text>

                                            </TouchableOpacity>

                                            <TouchableOpacity style={{
                                                position: 'absolute',
                                                right: Device.isTablet ? 40 : 20,
                                                top: Device.isTablet ? -55 : -35,
                                                width: Device.isTablet ? 50 : 30,
                                                height: Device.isTablet ? 50 : 30,
                                                borderRadius: 5,
                                                // borderTopRightRadius: 5,
                                                borderWidth: 1,
                                                borderColor: "lightgray",
                                            }} onPress={() => this.handlenewsaledeleteaction(item, index)}>
                                                <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/delete.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                            {this.state.lineItemDelete && (
                                <View>
                                    <Modal isVisible={this.state.modalVisible}>

                                        <View style={[Device.isTablet ? styles.filterMainContainer_tablet : styles.filterMainContainer_mobile, { height: Device.isTablet ? 350 : 250 }]}>

                                            <Text style={Device.isTablet ? styles.filterByTitle_tablet : styles.filterByTitle_mobile}> Delete Item </Text>

                                            <TouchableOpacity style={Device.isTablet ? styles.filterCloseButton_tablet : styles.filterCloseButton_mobile} onPress={() => this.modelCancel()}>
                                                <Image style={Device.isTablet ? styles.filterCloseImage_tablet : styles.filterCloseImage_mobile} source={require('../assets/images/modelcancel.png')} />
                                            </TouchableOpacity>

                                            <Text style={{ height: 1, width: deviceWidth, backgroundColor: 'lightgray', marginTop: 50, }}>
                                            </Text>
                                            <Text style={{
                                                position: 'absolute',
                                                top: 70,
                                                height: Device.isTablet ? 40 : 20,
                                                textAlign: 'center',
                                                fontFamily: 'regular',
                                                fontSize: Device.isTablet ? 23 : 18,
                                                marginBottom: Device.isTablet ? 25 : 0,
                                                color: '#353C40'
                                            }}> Are you sure want to delete NewSale Item? </Text>
                                            <TouchableOpacity
                                                style={[Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile, { marginTop: Device.isTablet ? 75 : 55 }]}
                                                onPress={() => this.deleteLineItem(item, index)}
                                            >
                                                <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile}  > DELETE </Text>

                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile} onPress={() => this.modelCancel()}
                                            >
                                                <Text style={Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile}  > CANCEL </Text>

                                            </TouchableOpacity>
                                        </View>
                                    </Modal>
                                </View>)}
                            {this.state.tableData.length != 0 && (
                                <View style={{ width: deviceWidth, height: 220, position: 'absolute', bottom: 0, backgroundColor: '#FFFFFF' }}>
                                    <Text style={{
                                        color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 30, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                        fontSize: Device.isTablet ? 19 : 14, position: 'absolute',
                                    }}>
                                        Items </Text>
                                    <Text style={{
                                        color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 30, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                        fontSize: Device.isTablet ? 19 : 14, position: 'absolute',
                                    }}>
                                        {this.state.totalQty} </Text>
                                    <Text style={{
                                        color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 60, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                        fontSize: Device.isTablet ? 19 : 14, position: 'absolute',
                                    }}>
                                        Discount </Text>
                                    <Text style={{
                                        color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 60, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                        fontSize: Device.isTablet ? 19 : 14, position: 'absolute',
                                    }}>
                                        ₹ {this.state.totalAmount} </Text>

                                    <Text style={{
                                        color: "#353C40", fontFamily: "bold", alignItems: 'center', marginLeft: 16, top: 90, fontSize: 20, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                        fontSize: Device.isTablet ? 19 : 14, position: 'absolute',
                                    }}>
                                        Total </Text>
                                    <Text style={{
                                        color: "#353C40", fontFamily: "bold", alignItems: 'center', marginLeft: 16, top: 90, fontSize: 20, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                        fontSize: Device.isTablet ? 19 : 14, position: 'absolute',
                                    }}>
                                        ₹ {(parseInt(this.state.totalAmount) - parseInt(this.state.totalDiscount)).toString()} </Text>

                                    {/* <Text style={{
                    color: "#353C40", fontFamily: "bold", alignItems: 'center', marginLeft: 16, top: 150, fontSize: 20, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                    fontSize: 14, position: 'absolute',
                  }}>
                    Customer Name </Text>
                  <Text style={{
                    color: "#353C40", fontFamily: "bold", alignItems: 'center', marginLeft: 16, top: 150, fontSize: 20, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                    fontSize: 14, position: 'absolute',
                  }}>
                    - </Text>
                    <Text style={{
                    color: "#353C40", fontFamily: "bold", alignItems: 'center', marginLeft: 16, top: 150, fontSize: 20, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                    fontSize: 14, position: 'absolute',
                  }}>
                    Customer Mobile Number </Text>
                  <Text style={{
                    color: "#353C40", fontFamily: "bold", alignItems: 'center', marginLeft: 16, top: 150, fontSize: 20, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                    fontSize: 14, position: 'absolute',
                  }}>
                    - </Text> */}



                                    <View style={styles.TopcontainerforPay}>

                                        <TouchableOpacity
                                            style={Device.isTablet ? styles.signInButton_tablet : styles.signInButton_mobile}
                                            onPress={() => this.pay()} >

                                            <Text style={Device.isTablet ? styles.signInButtonText_tablet : styles.signInButtonText_mobile}> Checkout </Text>
                                        </TouchableOpacity>


                                    </View>

                                </View>
                            )}
                        </View>
                    </ScrollView>


                )}

                {this.state.flagCustomerOpen && (
                    <View>
                        <Modal isVisible={this.state.modalVisible}>
                            <KeyboardAwareScrollView KeyboardAwareScrollView
                                enableOnAndroid={true}>


                                <View style={{
                                    flex: 1, justifyContent: 'center', //Centered horizontally
                                    alignItems: 'center', color: '#ffffff',
                                    borderRadius: 20, borderwidth: 10
                                }}>
                                    <View style={{ flex: 1, marginLeft: 20, marginRight: 20, backgroundColor: "#ffffff", marginTop: deviceWidth / 2 - 80 }}>
                                        <Text style={{
                                            color: "#353C40", fontSize: 18, fontFamily: "semibold", marginLeft: 20, marginTop: 20, height: 20,
                                            justifyContent: 'center',
                                        }}> {'Personal Information'} </Text>

                                        <View style={{ marginTop: 0, width: deviceWidth }}>
                                            <TextInput style={styles.createUserinput}
                                                underlineColorAndroid="transparent"
                                                placeholder="MOBILE NUMBER *"
                                                placeholderTextColor="#353C4050"
                                                keyboardType="name-phone-pad"
                                                textAlignVertical="center"
                                                autoCapitalize="none"
                                                value={this.state.customerPhoneNumber}
                                                onChangeText={(text) => this.handleCustomerPhoneNumber(text)}
                                                onEndEditing={() => this.endEditing()}
                                            />
                                        </View>


                                        <TextInput style={styles.createUserinput}
                                            underlineColorAndroid="transparent"
                                            placeholder="CUSTOMER NAME *"
                                            placeholderTextColor="#353C4050"
                                            textAlignVertical="center"
                                            autoCapitalize="none"
                                            value={this.state.customerName}
                                            onChangeText={this.handleCustomerName}
                                        />

                                        <View>
                                            <TextInput style={styles.createUserinput}
                                                underlineColorAndroid="transparent"
                                                placeholder="EMAIL"
                                                placeholderTextColor="#353C4050"
                                                textAlignVertical="center"
                                                autoCapitalize="none"
                                                value={this.state.customerEmail}
                                                onChangeText={this.handleCustomerEmail}
                                            />
                                        </View>

                                        <View style={{
                                            justifyContent: 'center',
                                            margin: 40,
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
                                                    label: 'GENDER',
                                                    value: '',
                                                }}
                                                Icon={() => {
                                                    return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                                }}
                                                items={[
                                                    { label: 'Male', value: 'male' },
                                                    { label: 'Female', value: 'female' },
                                                ]}
                                                onValueChange={this.handlecustomerGender}
                                                style={pickerSelectStyles}
                                                value={this.state.customerGender}
                                                useNativeAndroidPickerStyle={false}

                                            />
                                        </View>


                                        <TextInput style={styles.createUserinput}
                                            underlineColorAndroid="transparent"
                                            placeholder="ADDRESS"
                                            placeholderTextColor="#353C4050"
                                            textAlignVertical="center"
                                            autoCapitalize="none"
                                            value={this.state.customerAddress}
                                            onChangeText={this.handleCustomerAddress}
                                        />

                                        <Text style={{
                                            color: "#353C40", fontSize: 18, fontFamily: "semibold", marginLeft: 20, marginTop: 20, height: 20,
                                            justifyContent: 'center',
                                        }}> {'Business Information(optional)'} </Text>

                                        <View>
                                            <TextInput style={styles.createUserinput}
                                                underlineColorAndroid="transparent"
                                                placeholder="GST NUMBER"
                                                placeholderTextColor="#353C4050"
                                                textAlignVertical="center"
                                                autoCapitalize="none"
                                                value={this.state.customerGSTNumber}
                                                onChangeText={this.handleCustomerGSTNumber}
                                            />
                                        </View>



                                        <TouchableOpacity
                                            style={{
                                                margin: 20,
                                                height: 50, backgroundColor: "#ED1C24", borderRadius: 5, marginLeft: 40, marginRight: 40,
                                            }} onPress={() => this.addCustomer()}
                                        >
                                            <Text style={{
                                                textAlign: 'center', margin: 20, color: "#ffffff", fontSize: 15,
                                                fontFamily: "regular", height: 50,
                                            }}  > TAG/ADD CUSTOMER </Text>

                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{
                                                margin: 20,
                                                height: 50, backgroundColor: "#ED1C24", borderRadius: 5, marginLeft: 40, marginRight: 40,
                                            }}
                                            onPress={() => this.cancel()} >
                                            <Text style={{
                                                textAlign: 'center', margin: 20, color: "#ffffff", fontSize: 15,
                                                fontFamily: "regular", height: 50,
                                            }}> {('Cancel')} </Text>
                                        </TouchableOpacity>

                                    </View>

                                </View>

                            </KeyboardAwareScrollView>
                        </Modal>
                    </View>)}








            </View>
        );
    }
}
export default GenerateInvoiceSlip;


const pickerSelectStyles_mobile = StyleSheet.create({
    placeholder: {
        color: "#6F6F6F",
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
});

const pickerSelectStyles_tablet = StyleSheet.create({
    placeholder: {
        color: "#6F6F6F",
        fontFamily: "regular",
        fontSize: 20,
    },
    inputIOS: {
        justifyContent: 'center',
        height: 52,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        //paddingLeft: -20,
        fontSize: 20,
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',
    },
    inputAndroid: {
        justifyContent: 'center',
        height: 52,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        //paddingLeft: -20,
        fontSize: 20,
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
});

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
        marginLeft: 20,
        marginRight: 100,
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
    phoneinput: {
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
    createUserinput: {
        justifyContent: 'center',
        margin: 40,
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
        width: '95%',
        marginLeft: 10,
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
        borderRadius: 5,
        marginTop: 20,
        borderColor: '#ED1C24',
        width: '90%',
        //backgroundColor: '#ffffff',
        height: 50,
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
    },


    // Styles For Mobile
    viewsWidth_mobile: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: Device.isAndroid ? 70 : 84,
    },
    menuButton_mobile: {
        position: 'absolute',
        left: 10,
        bottom: 0,
        width: 40,
        height: 40,
    },
    headerTitle_mobile: {
        position: 'absolute',
        left: 70,
        bottom: 10,
        width: 300,
        height: 25,
        fontFamily: 'bold',
        fontSize: 18,
        color: '#353C40'
    },
    input_mobile: {
        justifyContent: 'center',
        marginLeft: deviceWidth / 2 + 30,
        width: deviceWidth / 2 - 40,
        height: 44,
        marginTop: -55,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    input_mobile_normal: {
        justifyContent: 'center',
        marginLeft: deviceWidth / 2 + 30,
        width: deviceWidth / 2 - 40,
        height: 44,
        marginTop: -55,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    input_mobile_normal_start: {
        justifyContent: 'center',
        marginLeft: 20,
        width: deviceWidth / 2,
        height: 44,
        marginTop: 0,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    rnSelect_mobile: {
        color: '#8F9EB7',
        fontSize: 15
    },
    rnSelectContainer_mobile: {
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
    rnSelectContainer_mobile_newsale: {
        justifyContent: 'center',
        marginLeft: 20,
        height: 44,
        marginTop: 5,
        marginBottom: 10,
        width: deviceWidth / 2,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    saveButton_mobile: {
        margin: 8,
        height: 50,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    saveButtonText_mobile: {
        textAlign: 'center',
        marginTop: 15,
        color: "#ffffff",
        fontSize: 15,
        fontFamily: "regular"
    },
    scanButton_mobile: {
        position: 'absolute',
        right: 28,
        top: 20,
        width: 50, height: 50,
    },
    scanButtonImage_mobile: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 12,
        position: 'absolute',
        right: 30,
    },
    scanButtonText_mobile: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 12,
        position: 'absolute',
        right: 0,
    },
    tagCustomerButton_mobile: {
        position: 'absolute',
        right: 5, top: 10,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 90,
        height: 32,
    },
    tagCustomerButtonText_mobile: {
        fontSize: 12,
        fontFamily: 'regular',
        color: '#ffffff',
        marginLeft: 10,
        marginTop: 8,
        alignSelf: 'center'
    },
    navButtonText_mobile: {
        fontSize: 12,
        fontFamily: 'regular',
        color: '#ffffff',
        marginLeft: 10,
        marginTop: 8,
        alignSelf: 'center'
    },
    signInButton_mobile: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        width: deviceWidth - 40,
        height: 50,
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    signInButtonText_mobile: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: "regular",
    },

    // Styles For Tablet
    viewsWidth_tablet: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 28,
        height: 90,
    },
    menuButton_tablet: {
        position: 'absolute',
        left: 10,
        top: 38,
        width: 90,
        height: 90,
    },
    headerTitle_tablet: {
        position: 'absolute',
        left: 70,
        top: 40,
        width: 300,
        height: 40,
        fontFamily: 'bold',
        fontSize: 24,
        color: '#353C40'
    },
    input_tablet: {
        justifyContent: 'center',
        marginLeft: deviceWidth / 2 + 30,
        width: deviceWidth / 2 - 50,
        height: 55,
        marginTop: -65,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 22,
    },
    input_tablet_normal: {
        justifyContent: 'center',
        marginLeft: deviceWidth / 2 + 30,
        width: deviceWidth / 2 - 50,
        height: 55,
        marginTop: -65,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 22,
    },
    navButton_tablet: {
        position: 'absolute',
        right: 20, top: 27,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 155,
        height: 42,
    },
    input_tablet_normal_start: {
        justifyContent: 'center',
        marginLeft: 20,
        width: deviceWidth / 2,
        height: 55,
        marginTop: 0,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 22,
    },
    rnSelect_tablet: {
        color: '#8F9EB7',
        fontSize: 20
    },
    rnSelectContainer_tablet: {
        justifyContent: 'center',
        margin: 20,
        height: 54,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 20,
    },
    rnSelectContainer_tablet_newsale: {
        justifyContent: 'center',
        marginLeft: 20,
        height: 54,
        marginTop: 5,
        width: deviceWidth / 2,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 20,
    },
    saveButton_tablet: {
        margin: 8,
        height: 60,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    saveButtonText_tablet: {
        textAlign: 'center',
        marginTop: 15,
        color: "#ffffff",
        fontSize: 20,
        fontFamily: "regular"
    },
    scanButton_tablet: {
        position: 'absolute',
        right: 28,
        top: 20,
        width: 70,
        height: 70,
    },
    scanButtonImage_tablet: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 18,
        position: 'absolute',
        right: 43,
        top: 5,
    },
    scanButtonText_tablet: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 18,
        position: 'absolute',
        right: 0,
    },
    tagCustomerButton_tablet: {
        position: 'absolute',
        right: 30, top: 15,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 120,
        height: 42,
    },
    tagCustomerButtonText_tablet: {
        fontSize: 16,
        fontFamily: 'regular',
        color: '#ffffff',
        marginLeft: 10,
        marginTop: 8,
        alignSelf: 'center'
    },
    navButton_tablet: {
        position: 'absolute',
        right: 20, top: 27,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 155,
        height: 42,
    },
    navButtonText_tablet: {
        fontSize: 17,
        fontFamily: 'regular',
        color: '#ffffff',
        marginLeft: 10,
        marginTop: 8,
        alignSelf: 'center'
    },


    // Styles For Mobile
    viewsWidth_mobile: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: Device.isAndroid ? 70 : 84,
    },
    menuButton_mobile: {
        position: 'absolute',
        left: 10,
        bottom: 0,
        width: 40,
        height: 40,
    },
    headerTitle_mobile: {
        position: 'absolute',
        left: 70,
        bottom: 10,
        width: 300,
        height: 25,
        fontFamily: 'bold',
        fontSize: 18,
        color: '#353C40'
    },
    input_mobile: {
        justifyContent: 'center',
        marginLeft: 10,
        width: deviceWidth - 20,
        height: 44,
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    input_mobile_normal: {
        justifyContent: 'center',
        marginLeft: deviceWidth / 2 + 30,
        width: deviceWidth / 2 - 40,
        height: 44,
        marginTop: -55,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    input_mobile_normal_start: {
        justifyContent: 'center',
        marginLeft: 20,
        width: deviceWidth / 2,
        height: 44,
        marginTop: 0,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    rnSelect_mobile: {
        color: '#8F9EB7',
        fontSize: 15
    },
    rnSelectContainer_mobile: {
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
    rnSelectContainer_mobile_newsale: {
        justifyContent: 'center',
        marginLeft: 20,
        height: 44,
        marginTop: 5,
        marginBottom: 10,
        width: deviceWidth / 2,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    saveButton_mobile: {
        margin: 8,
        height: 50,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    saveButtonText_mobile: {
        textAlign: 'center',
        marginTop: 15,
        color: "#ffffff",
        fontSize: 15,
        fontFamily: "regular"
    },
    scanButton_mobile: {
        position: 'absolute',
        right: 28,
        top: 20,
        width: 50, height: 50,
    },
    scanButtonImage_mobile: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 12,
        position: 'absolute',
        right: 30,
    },
    scanButtonText_mobile: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 12,
        position: 'absolute',
        right: 0,
    },
    tagCustomerButton_mobile: {
        position: 'absolute',
        right: 5, top: 10,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 90,
        height: 32,
    },
    tagCustomerButtonText_mobile: {
        fontSize: 12,
        fontFamily: 'regular',
        color: '#ffffff',
        marginLeft: 10,
        marginTop: 8,
        alignSelf: 'center'
    },
    navButtonText_mobile: {
        fontSize: 12,
        fontFamily: 'regular',
        color: '#ffffff',
        marginLeft: 10,
        marginTop: 8,
        alignSelf: 'center'
    },

    // Styles For Tablet
    viewsWidth_tablet: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 28,
        height: 90,
    },
    menuButton_tablet: {
        position: 'absolute',
        left: 10,
        top: 38,
        width: 90,
        height: 90,
    },
    headerTitle_tablet: {
        position: 'absolute',
        left: 70,
        top: 40,
        width: 300,
        height: 40,
        fontFamily: 'bold',
        fontSize: 24,
        color: '#353C40'
    },
    input_tablet: {
        justifyContent: 'center',
        marginLeft: 10,
        width: deviceWidth - 20,
        height: 55,
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 22,
    },
    input_tablet_normal: {
        justifyContent: 'center',
        marginLeft: deviceWidth / 2 + 30,
        width: deviceWidth / 2 - 50,
        height: 55,
        marginTop: -65,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 22,
    },
    navButton_tablet: {
        position: 'absolute',
        right: 20, top: 27,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 155,
        height: 42,
    },
    input_tablet_normal_start: {
        justifyContent: 'center',
        marginLeft: 20,
        width: deviceWidth / 2,
        height: 55,
        marginTop: 0,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 22,
    },
    rnSelect_tablet: {
        color: '#8F9EB7',
        fontSize: 20
    },
    rnSelectContainer_tablet: {
        justifyContent: 'center',
        margin: 20,
        height: 54,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 20,
    },
    rnSelectContainer_tablet_newsale: {
        justifyContent: 'center',
        marginLeft: 20,
        height: 54,
        marginTop: 5,
        width: deviceWidth / 2,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 20,
    },
    saveButton_tablet: {
        margin: 8,
        height: 60,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    saveButtonText_tablet: {
        textAlign: 'center',
        marginTop: 15,
        color: "#ffffff",
        fontSize: 20,
        fontFamily: "regular"
    },
    scanButton_tablet: {
        position: 'absolute',
        right: 28,
        top: 20,
        width: 70,
        height: 70,
    },
    scanButtonImage_tablet: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 18,
        position: 'absolute',
        right: 43,
        top: 5,
    },
    scanButtonText_tablet: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 18,
        position: 'absolute',
        right: 0,
    },
    tagCustomerButton_tablet: {
        position: 'absolute',
        right: 30, top: 15,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 120,
        height: 42,
    },
    tagCustomerButtonText_tablet: {
        fontSize: 16,
        fontFamily: 'regular',
        color: '#ffffff',
        marginLeft: 10,
        marginTop: 8,
        alignSelf: 'center'
    },
    navButton_tablet: {
        position: 'absolute',
        right: 20, top: 27,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 155,
        height: 42,
    },
    navButtonText_tablet: {
        fontSize: 17,
        fontFamily: 'regular',
        color: '#ffffff',
        marginLeft: 10,
        marginTop: 8,
        alignSelf: 'center'
    },

    // Styles for mobile
    filterMainContainer_mobile: {
        width: deviceWidth,
        alignItems: 'center',
        marginLeft: -20,
        backgroundColor: "#ffffff",
        position: 'absolute',
        bottom: -20,
    },
    filterByTitle_mobile: {
        position: 'absolute',
        left: 20,
        top: 15,
        width: 300,
        height: 20,
        fontFamily: 'medium',
        fontSize: 16,
        color: '#353C40'
    },
    filterByTitleDecoration_mobile: {
        height: 1,
        width: deviceWidth,
        backgroundColor: 'lightgray',
        marginTop: 50,
    },
    filterCloseButton_mobile: {
        position: 'absolute',
        right: 8,
        top: 15,
        width: 50, height: 50,
    },
    filterCloseImage_mobile: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 12,
        position: 'absolute',
        top: 10,
        right: 0,
    },
    filterApplyButton_mobile: {
        width: deviceWidth - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        height: 50,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    filterButtonText_mobile: {
        textAlign: 'center',
        marginTop: 20,
        color: "#ffffff",
        fontSize: 15,
        fontFamily: "regular"
    },
    filterCancelButton_mobile: {
        width: deviceWidth - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        height: 50,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#353C4050",
    },
    filterButtonCancelText_mobile: {
        textAlign: 'center',
        marginTop: 20,
        color: "#000000",
        fontSize: 15,
        fontFamily: "regular"
    },


    // Styles for Tablet
    filterMainContainer_tablet: {
        width: deviceWidth,
        alignItems: 'center',
        marginLeft: -40,
        backgroundColor: "#ffffff",
        height: 600,
        position: 'absolute',
        bottom: -40,
    },
    filterByTitle_tablet: {
        position: 'absolute',
        left: 20,
        top: 15,
        width: 300,
        height: 30,
        fontFamily: 'medium',
        fontSize: 21,
        color: '#353C40'
    },
    filterByTitleDecoration_tablet: {
        height: 1,
        width: deviceWidth,
        backgroundColor: 'lightgray',
        marginTop: 60,
    },
    filterCloseButton_tablet: {
        position: 'absolute',
        right: 24,
        top: 10,
        width: 60, height: 60,
    },
    filterCloseImage_tablet: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 17,
        position: 'absolute',
        top: 10,
        right: 24,
    },
    filterApplyButton_tablet: {
        width: deviceWidth - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        height: 60,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    filterButtonText_tablet: {
        textAlign: 'center',
        marginTop: 20,
        color: "#ffffff",
        fontSize: 20,
        fontFamily: "regular"
    },
    filterCancelButton_tablet: {
        width: deviceWidth - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        height: 60,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#353C4050",
    },
    filterButtonCancelText_tablet: {
        textAlign: 'center',
        marginTop: 20,
        color: "#000000",
        fontSize: 20,
        fontFamily: "regular"
    },
    signInButton_tablet: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        width: deviceWidth - 40,
        height: 60,
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    signInButtonText_tablet: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: "regular",
    },

});

