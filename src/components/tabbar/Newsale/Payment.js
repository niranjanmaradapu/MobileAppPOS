import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, SafeAreaView, ScrollView, FlatList } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import { DrawerActions } from '@react-navigation/native';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';
import Loader from '../../loader';
import PromotionsService from '../../services/PromotionsService';
import axios from 'axios';
const data = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }, { key: 5 }];


class Payment extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            flagOne: true,
            flagTwo: false,
            flagThree: false,
            flagFour: false,
            flagFive: false,
            promocode: "",
            mobileNumber: "",
            loyaltyPoints: "",
            value: "",
            giftvoucher: "",
            totalAmount: "",
            totalDiscount: "",
            recievedAmount: "",
            verifiedCash: "",
        }
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    statatics() {
        this.props.navigation.navigate('Statitics')
    }


    menuAction() {
        this.props.navigation.dispatch(DrawerActions.openDrawer())
    }

    cashAction() {
        this.setState({ flagOne: true })
        this.setState({ flagTwo: false })
        this.setState({ flagThree: false })
        this.setState({ flagFour: false })
        this.setState({ flagFive: false })
    }

    cardAction() {
        this.setState({ flagOne: false })
        this.setState({ flagTwo: true })
        this.setState({ flagThree: false })
        this.setState({ flagFour: false })
        this.setState({ flagFive: false })
    }

    qrAction() {
        this.setState({ flagOne: false })
        this.setState({ flagTwo: false })
        this.setState({ flagThree: true })
        this.setState({ flagFour: false })
        this.setState({ flagFive: false })
    }

    upiAction() {
        this.setState({ flagOne: false })
        this.setState({ flagTwo: false })
        this.setState({ flagThree: false })
        this.setState({ flagFour: true })
        this.setState({ flagFive: false })
    }

    khathaAction() {
        this.setState({ flagOne: false })
        this.setState({ flagTwo: false })
        this.setState({ flagThree: false })
        this.setState({ flagFour: false })
        this.setState({ flagFive: true })
    }

    handlePromocode = (text) => {
        this.setState({ promocode: text })
    }

    handleMobileNumber = (text) => {
        this.setState({ mobileNumber: text })
    }

    handlerecievedAmount = (text) => {
        this.setState({ recievedAmount: text })
    }

    verifycash() {
        this.setState({ verifiedCash: this.state.recievedAmount })
    }

    applyPromocode() {
        // alert('promo code applied') 
        this.setState({ giftvoucher: this.state.promocode })
    }

    payCash = () => {
        var lineItems = []
        var lineItemIds = []


        for (let i = 0; i < this.state.tableData.length; i++) {
            lineItems.push({
                itemPrice: this.state.tableData[i].netamount,
                quantity: this.state.tableData[i].qty,
                discount: this.state.tableData[i].promoDisc,
                netValue: this.state.tableData[i].netamount - this.state.tableData[i].promoDisc,
                barCode: this.state.tableData[i].barcode,
                domainId: this.state.domainId,
            })
        }
        this.setState({ loading: true })
        // const params = lineItems
        console.log(lineItems);
        console.log('params are' + JSON.stringify(lineItems))
        this.setState({ loading: true })
        axios.post(NewSaleService.saveLineItems(), lineItems).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                lineItemIds.push(JSON.parse(res.data["result"]))
                // 
                console.log(lineItemIds + `line items saved successfully`);
                var lineItemIdAdd = []
                for (let i = 0; i < lineItemIds[0].length; i++) {
                    lineItemIdAdd.push({ lineItemId: lineItemIds[0][i] })
                }

                const params = {
                    "natureOfSale": "InStore",
                    "domainId": this.state.domainId,
                    "storeId": this.state.storeId,
                    "grossAmount": this.state.totalAmount,
                    "totalPromoDisc": this.state.totalDiscount,
                    "taxAmount": 0,
                    "totalManualDisc": 0,
                    "discApprovedBy": null,
                    "discType": null,
                    "approvedBy": 5218,
                    "netPayableAmount": this.state.totalAmount - this.state.totalDiscount,
                    "offlineNumber": null,
                    "paymentAmountType": [
                        {
                            "paymentAmount": this.state.totalAmount - this.state.totalDiscount,
                            "paymentType": "Cash"
                        }],
                    "customerDetails": {
                        "name": this.state.customerName,
                        "mobileNumber": this.state.customerPhoneNumber,
                        "gstNumber": this.state.customerGSTNumber,
                        "address": this.state.customerAddress,
                        "gender": this.state.customerAddress,
                        "altMobileNo": "",
                        "dob": ""
                    },
                    "dlSlip": [],
                    "lineItemsReVo": lineItemIdAdd
                }

                console.log(params)

                axios.post(NewSaleService.createOrder(), params).then((res) => {
                    if (res.data && res.data["isSuccess"] === "true") {
                        this.setState({ tableData: [] })
                        alert("Order created " + res.data["result"]);
                        this.setState({ loading: false })
                    }
                    else {
                        this.setState({ loading: false })
                        alert("duplicate record already exists");
                    }
                }
                )
            }

            else {
                this.setState({ loading: false })
                alert("duplicate record already exists");
            }
        }
        );
    }

    pay = () => {
        var lineItems = []
        var lineItemIds = []


        for (let i = 0; i < this.state.tableData.length; i++) {
            lineItems.push({
                itemPrice: this.state.tableData[i].netamount,
                quantity: this.state.tableData[i].qty,
                discount: this.state.tableData[i].promoDisc,
                netValue: this.state.tableData[i].netamount - this.state.tableData[i].promoDisc,
                barCode: this.state.tableData[i].barcode,
                domainId: this.state.domainId,
            })
        }
        this.setState({ loading: true })
        // const params = lineItems
        console.log(lineItems);
        console.log('params are' + JSON.stringify(lineItems))
        this.setState({ loading: true })
        axios.post(NewSaleService.saveLineItems(), lineItems).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                lineItemIds.push(JSON.parse(res.data["result"]))
                // 
                console.log(lineItemIds + `line items saved successfully`);
                var lineItemIdAdd = []
                for (let i = 0; i < lineItemIds[0].length; i++) {
                    lineItemIdAdd.push({ lineItemId: lineItemIds[0][i] })
                }
                const params = {
                    "natureOfSale": "InStore",
                    "domainId": this.state.domainId,
                    "storeId": this.state.storeId,
                    "grossAmount": this.state.totalAmount,
                    "totalPromoDisc": this.state.totalDiscount,
                    "taxAmount": 0,
                    "totalManualDisc": 0,
                    "discApprovedBy": null,
                    "discType": null,
                    "approvedBy": 5218,
                    "netPayableAmount": this.state.totalAmount - this.state.totalDiscount,
                    "offlineNumber": null,
                    "customerDetails": {
                        "name": this.state.customerName,
                        "mobileNumber": this.state.customerPhoneNumber,
                        "gstNumber": this.state.customerGSTNumber,
                        "address": this.state.customerAddress,
                        "gender": this.state.customerAddress,
                        "altMobileNo": "",
                        "dob": ""
                    },
                    "dlSlip": [],
                    "lineItemsReVo": lineItemIdAdd
                }
                console.log(params)
                axios.post(NewSaleService.createOrder(), params).then((res) => {
                    if (res.data && res.data["isSuccess"] === "true") {
                        this.setState({ tableData: [] })
                        // alert("Order created " + res.data["result"]);
                        const params = {
                            "amount": JSON.stringify(this.state.totalAmount - this.state.totalDiscount),
                            "info": "order creations",
                            "newsaleId": res.data["result"],
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
                        })
                        this.setState({ loading: false })
                    }
                    else {
                        this.setState({ loading: false })
                        alert("duplicate record already exists");
                    }
                }
                )
            }

            else {
                this.setState({ loading: false })
                alert("duplicate record already exists");
            }
        }
        );
    }

    verifyCustomer() {
        this.setState({ loyaltyPoints: '' })
        if (this.state.mobileNumber.length !== 10) {
            alert('please Enter a customer valid mobile number');
        }
        const params = {
            "invoiceNumber": null,
            "mobileNumber": this.state.mobileNumber,
        }
        console.log(params)
        this.setState({ loading: true })
        axios.post(PromotionsService.searchLoyaltyPoints(),
            params).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                    this.setState({ loading: false })
                    let len = res.data["result"].length;
                    console.log(res.data["result"])
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let number = res.data["result"][i]
                            this.setState({ loyaltyPoints: number.loyaltyPoints })

                            console.log(this.state.loyaltyPoints)
                        }
                    }
                }
            }).catch(() => {
                this.setState({ loading: false })
                // alert('No Records Found')
            })
    }


    render() {
        return (
            <View style={styles.container}>
                {this.state.loading &&
                    <Loader
                        loading={this.state.loading} />
                }

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
                    }}> Payment method </Text>
                </View>

                <ScrollView>
                    <View style={styles.container}>

                        <Text style={{ fontSize: 12, fontFamily: 'medium', color: '#828282', marginLeft: 10, marginTop: 15 }}> {('SELECT A MODE TO PAY ₹ 1,450.00')} </Text>
                        <FlatList
                            style={styles.flatList}
                            horizontal
                            data={data}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                if (item.key === 1) {
                                    return <View style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: "#ffffff",
                                        borderRadius: 25,
                                        marginLeft: 10,
                                        marginTop: 10,

                                    }}>
                                        <TouchableOpacity style={{
                                            marginLeft: 0, marginTop: 0,
                                        }} onPress={() => this.cashAction()}>
                                            <Image source={this.state.flagOne ? require('../../assets/images/cashselect.png') : require('../../assets/images/cashunselect.png')} style={{
                                                marginLeft: 0, marginTop: 0,
                                            }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 15, alignItems: 'center', alignSelf: 'center', marginTop: 0, fontSize: 14, color: this.state.flagOne ? "#ED1C24" : "#22222240", fontFamily: 'regular' }}>
                                            CASH
                                        </Text>

                                    </View>
                                }
                                if (item.key === 2) {
                                    return <View style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: "#ffffff",
                                        borderRadius: 25,
                                        marginLeft: 20,
                                        marginTop: 10,

                                    }}>
                                        <TouchableOpacity style={{
                                            marginLeft: 0, marginTop: 0,
                                        }} onPress={() => this.cardAction()}>
                                            <Image source={this.state.flagTwo ? require('../../assets/images/cardselect.png') : require('../../assets/images/cashunselect.png')} style={{
                                                marginLeft: 0, marginTop: 0,
                                            }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 15, alignItems: 'center', alignSelf: 'center', marginTop: 0, fontSize: 14, color: this.state.flagTwo ? "#ED1C24" : "#22222240", fontFamily: 'regular' }}>
                                            CARD
                                        </Text>

                                    </View>
                                }
                                if (item.key === 3) {
                                    return <View style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: "#ffffff",
                                        borderRadius: 25,
                                        marginLeft: 20,
                                        marginTop: 10,

                                    }}>
                                        <TouchableOpacity style={{
                                            marginLeft: 0, marginTop: 0,
                                        }} onPress={() => this.qrAction()}>
                                            <Image source={this.state.flagThree ? require('../../assets/images/qrselect.png') : require('../../assets/images/qrunselect.png')} style={{
                                                marginLeft: 0, marginTop: 0,
                                            }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 15, alignItems: 'center', alignSelf: 'center', marginTop: 0, width: 50, fontSize: 14, color: this.state.flagThree ? "#ED1C24" : "#22222240", fontFamily: 'regular' }}>
                                            GET QR
                                        </Text>

                                    </View>

                                }
                                if (item.key === 4) {
                                    return <View style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: "#ffffff",
                                        borderRadius: 25,
                                        marginLeft: 20,
                                        marginTop: 10,

                                    }}>
                                        <TouchableOpacity style={{
                                            marginLeft: 0, marginTop: 0,
                                        }} onPress={() => this.upiAction()}>
                                            <Image source={this.state.flagFour ? require('../../assets/images/upiselect.png') : require('../../assets/images/upiunselect.png')} style={{
                                                marginLeft: 0, marginTop: 0,
                                            }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 15, alignItems: 'center', alignSelf: 'center', marginTop: 0, fontSize: 14, color: this.state.flagFour ? "#ED1C24" : "#22222240", fontFamily: 'regular' }}>
                                            UPI
                                        </Text>

                                    </View>
                                }
                                if (item.key === 5) {
                                    return <View style={{
                                        height: 50,
                                        width: 50,

                                        backgroundColor: "#ffffff",

                                        borderRadius: 25,
                                        marginLeft: 20,
                                        marginTop: 10,

                                    }}>
                                        <TouchableOpacity style={{
                                            marginLeft: 0, marginTop: 0,
                                        }} onPress={() => this.khathaAction()}>
                                            <Image source={this.state.flagFive ? require('../../assets/images/kathaselect.png') : require('../../assets/images/kathaunselect.png')} style={{
                                                marginLeft: 0, marginTop: 0,
                                            }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 15, alignItems: 'center', alignSelf: 'center', marginTop: 0, fontSize: 14, color: this.state.flagFive ? "#ED1C24" : "#22222240", fontFamily: 'regular' }}>
                                            KHATA
                                        </Text>

                                    </View>
                                }
                            }}
                            ListFooterComponent={<View style={{ width: 15 }}></View>}
                        />
                        <Text style={{ fontSize: 12, fontFamily: 'medium', color: '#828282', marginLeft: 10, marginTop: 10 }}> {('HAVE A PROMO CODE ?')} </Text>
                        {/* {this.state.loyaltyPoints !== "" && (
                              <TouchableOpacity 
                              onPress={() => this.applyPromocode()} >
                              <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ED1C24', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('CLEAR')} </Text>
                          </TouchableOpacity>
                    )} */}

                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="Enter promo code"
                            placeholderTextColor="#6F6F6F60"
                            textAlignVertical="center"
                            keyboardType={'default'}
                            autoCapitalize="none"
                            value={this.state.promocode}
                            //  onEndEditing
                            onChangeText={(text) => this.handlePromocode(text)}
                        // onEndEditing={() => this.endEditing()}
                        />
                        {this.state.giftvoucher === "" && (
                            <TouchableOpacity
                                style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 185, borderColor: "#ED1C24", borderWidth: 1, position: 'absolute', right: 10 }}
                                onPress={() => this.applyPromocode()} >
                                <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ED1C24', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('APPLY')} </Text>
                            </TouchableOpacity>
                        )}

                        {this.state.giftvoucher !== "" && (
                            <TouchableOpacity
                                style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 185, position: 'absolute', right: 10 }}
                            >
                                <Image style={{ position: 'absolute', right: 68, top: 9 }} source={require('../../assets/images/applied.png')} />

                                <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#28D266', marginLeft: 10, marginTop: 10, alignSelf: 'center' }}> {('VERIFIED')} </Text>

                            </TouchableOpacity>
                        )}

                        {this.state.giftvoucher !== "" && (
                            <View style={{ backgroundColor: '#ffffff', marginTop: 0 }}>
                                <Text style={{ fontSize: 12, fontFamily: 'medium', color: '#ED1C24', marginLeft: 10, marginTop: 10 }}> YOU GOT 100 RUPPES CASHBACK </Text>

                            </View>
                        )}


                        <Text style={{ fontSize: 12, fontFamily: 'medium', color: '#828282', marginLeft: 10, marginTop: 10 }}> {('ARE YOU A TAGGED CUSTOMER ?')} </Text>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="+91 Enter mobile number"
                            placeholderTextColor="#6F6F6F60"
                            textAlignVertical="center"
                            keyboardType={'default'}
                            autoCapitalize="none"
                            value={this.state.mobileNumber}
                            //  onEndEditing
                            onChangeText={(text) => this.handleMobileNumber(text)}
                        // onEndEditing={() => this.endEditing()}
                        />
                        {this.state.giftvoucher === "" && (
                            <TouchableOpacity
                                style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 260, borderColor: "#ED1C24", borderWidth: 1, position: 'absolute', right: 10 }}
                                onPress={() => this.verifyCustomer()} >
                                <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ED1C24', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('VERIFY')} </Text>
                            </TouchableOpacity>
                        )}
                        {this.state.loyaltyPoints === "" && this.state.giftvoucher !== "" && (
                            <TouchableOpacity
                                style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 285, borderColor: "#ED1C24", borderWidth: 1, position: 'absolute', right: 10 }}
                                onPress={() => this.verifyCustomer()} >
                                <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ED1C24', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('VERIFY')} </Text>
                            </TouchableOpacity>
                        )}
                        {this.state.loyaltyPoints !== "" && this.state.giftvoucher === "" && (
                            <TouchableOpacity
                                style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 260, position: 'absolute', right: 10 }}
                            >
                                <Image style={{ position: 'absolute', right: 68, top: 9 }} source={require('../../assets/images/applied.png')} />

                                <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#28D266', marginLeft: 10, marginTop: 10, alignSelf: 'center' }}> {('VERIFIED')} </Text>

                            </TouchableOpacity>
                        )}

                        {this.state.loyaltyPoints !== "" && this.state.giftvoucher !== "" && (
                            <TouchableOpacity
                                style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 285, position: 'absolute', right: 10 }}
                            >
                                <Image style={{ position: 'absolute', right: 68, top: 9 }} source={require('../../assets/images/applied.png')} />

                                <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#28D266', marginLeft: 10, marginTop: 10, alignSelf: 'center' }}> {('VERIFIED')} </Text>

                            </TouchableOpacity>
                        )}

                        {this.state.loyaltyPoints !== "" && (
                            <View style={{ backgroundColor: '#ffffff', marginTop: 0 }}>
                                <Text style={{ fontSize: 12, fontFamily: 'medium', color: '#ED1C24', marginLeft: 10, marginTop: 10 }}> LOYALTY POINTS  {this.state.loyaltyPoints} </Text>
                                <Text style={{ fontSize: 12, fontFamily: 'medium', color: '#ED1C24', marginLeft: 10, marginTop: 10, marginBottom: 10 }}> VALUE  {(parseInt(this.state.loyaltyPoints) / 100).toString()} </Text>
                            </View>
                        )}
                        {this.state.flagOne === true && (
                            <Text style={{ fontSize: 12, fontFamily: 'medium', color: '#828282', marginLeft: 10, marginTop: 10 }}> {('CASH SUMMARY')} </Text>
                        )}
                        {this.state.flagOne === true && (
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Recieved Amount"
                                placeholderTextColor="#6F6F6F60"
                                textAlignVertical="center"
                                keyboardType={'default'}
                                autoCapitalize="none"
                                value={this.state.recievedAmount}
                                //  onEndEditing
                                onChangeText={(text) => this.handlerecievedAmount(text)} />
                            // onEndEditing={() => this.endEditing()}
                        )}


                        {this.state.flagOne === true && this.state.giftvoucher === "" && this.state.loyaltyPoints === "" && this.state.verifiedCash === "" && (
                            <TouchableOpacity
                                style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 335, borderColor: "#ED1C24", borderWidth: 1, position: 'absolute', right: 10 }}
                                onPress={() => this.verifycash()} >
                                <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ED1C24', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('VERIFY')} </Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagOne === true && this.state.giftvoucher !== "" && this.state.loyaltyPoints !== "" && this.state.verifiedCash === "" && (
                            <TouchableOpacity
                                style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 420, borderColor: "#ED1C24", borderWidth: 1, position: 'absolute', right: 10 }}
                                onPress={() => this.verifycash()} >
                                <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ED1C24', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('VERIFY')} </Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagOne === true && this.state.giftvoucher !== "" && this.state.loyaltyPoints === "" && this.state.verifiedCash === "" && (
                            <TouchableOpacity
                                style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 360, borderColor: "#ED1C24", borderWidth: 1, position: 'absolute', right: 10 }}
                                onPress={() => this.verifycash()} >
                                <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ED1C24', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('VERIFY')} </Text>
                            </TouchableOpacity>
                        )}

                {this.state.flagOne === true && this.state.giftvoucher === "" && this.state.loyaltyPoints !== "" && this.state.verifiedCash === "" && (
                            <TouchableOpacity
                                style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 395, borderColor: "#ED1C24", borderWidth: 1, position: 'absolute', right: 10 }}
                                onPress={() => this.verifycash()} >
                                <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ED1C24', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('VERIFY')} </Text>
                            </TouchableOpacity>
                        )}


{this.state.flagOne === true && this.state.giftvoucher === "" && this.state.loyaltyPoints === "" && this.state.verifiedCash !== "" && (
                             <TouchableOpacity
                             style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 335, position: 'absolute', right: 10 }}
                         >
                             <Image style={{ position: 'absolute', right: 68, top: 9 }} source={require('../../assets/images/applied.png')} />

                             <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#28D266', marginLeft: 10, marginTop: 10, alignSelf: 'center' }}> {('VERIFIED')} </Text>

                         </TouchableOpacity>
                        )}

                        {this.state.flagOne === true && this.state.giftvoucher !== "" && this.state.loyaltyPoints !== "" && this.state.verifiedCash !== "" && (
                           <TouchableOpacity
                           style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 420, position: 'absolute', right: 10 }}
                       >
                           <Image style={{ position: 'absolute', right: 68, top: 9 }} source={require('../../assets/images/applied.png')} />

                           <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#28D266', marginLeft: 10, marginTop: 10, alignSelf: 'center' }}> {('VERIFIED')} </Text>

                       </TouchableOpacity>
                        )}

                        {this.state.flagOne === true && this.state.giftvoucher !== "" && this.state.loyaltyPoints === "" && this.state.verifiedCash !== "" && (
                           <TouchableOpacity
                           style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 360, position: 'absolute', right: 10 }}
                       >
                           <Image style={{ position: 'absolute', right: 68, top: 9 }} source={require('../../assets/images/applied.png')} />

                           <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#28D266', marginLeft: 10, marginTop: 10, alignSelf: 'center' }}> {('VERIFIED')} </Text>

                       </TouchableOpacity>
                        )}

                {this.state.flagOne === true && this.state.giftvoucher === "" && this.state.loyaltyPoints !== "" && this.state.verifiedCash !== "" && (
                            <TouchableOpacity
                            style={{ backgroundColor: '#FFffff', borderRadius: 5, width: 90, height: 32, top: 395, position: 'absolute', right: 10 }}
                        >
                            <Image style={{ position: 'absolute', right: 68, top: 9 }} source={require('../../assets/images/applied.png')} />

                            <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#28D266', marginLeft: 10, marginTop: 10, alignSelf: 'center' }}> {('VERIFIED')} </Text>

                        </TouchableOpacity>
                        )}

                       

                        {this.state.flagOne === true && this.state.verifiedCash !== "" && (
                            <View style={{ backgroundColor: '#ffffff', marginTop: 0 }}>
                                <Text style={{ fontSize: 12, fontFamily: 'medium', color: '#ED1C24', marginLeft: 10, marginTop: 10 }}> RETURN AMOUNT  ₹100 </Text>

                            </View>
                        )}




                        <Text style={{ fontSize: 12, fontFamily: 'medium', color: '#828282', marginLeft: 10, marginTop: 10 }}> {('PRICE SUMMARY')} </Text>


                        <View style={{ width: deviceWidth, height: 220, backgroundColor: '#FFFFFF', marginTop: 10, }}>
                            <Text style={{
                                color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 30, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                fontSize: 14, position: 'absolute',
                            }}>
                                Total Qty </Text>
                            <Text style={{
                                color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 30, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                fontSize: 14, position: 'absolute',
                            }}>
                                {this.state.totalQty} </Text>
                            <Text style={{
                                color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 60, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                fontSize: 14, position: 'absolute',
                            }}>
                                Total MRP </Text>
                            <Text style={{
                                color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 60, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                fontSize: 14, position: 'absolute',
                            }}>
                                ₹ {this.state.totalAmount} </Text>
                            <Text style={{
                                color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 90, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                fontSize: 14, position: 'absolute',
                            }}>
                                Promo Discount </Text>
                            <Text style={{
                                color: "#353C40", fontFamily: "medium", alignItems: 'center', marginLeft: 16, top: 90, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                fontSize: 14, position: 'absolute',
                            }}>
                                ₹  {this.state.totalDiscount} </Text>
                            <Text style={{
                                color: "#353C40", fontFamily: "bold", alignItems: 'center', marginLeft: 16, top: 120, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                fontSize: 20, position: 'absolute',
                            }}>
                                Payable Amount </Text>
                            <Text style={{
                                color: "#353C40", fontFamily: "bold", alignItems: 'center', marginLeft: 16, top: 120, fontSize: 20, position: 'absolute', right: 10, justifyContent: 'center', textAlign: 'center', marginTop: 10,
                                fontSize: 20, position: 'absolute',
                            }}>
                                ₹ {(parseInt(this.state.totalAmount) - parseInt(this.state.totalDiscount)).toString()} </Text>

                            <View style={styles.TopcontainerforPay}>
                                <TouchableOpacity
                                    style={styles.signInButton}
                                    onPress={() => this.props.navigation.navigate('Payment')} >

                                    <Text style={styles.signInButtonText}> Pay </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView >
            </View>
        )
    }
}
export default Payment


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FAFAFF'
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
    image: {
        marginTop: 40,
        marginLeft: 10,
        width: 80,
        height: 80,
        borderWidth: 0,
        borderRadius: 40,
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
        marginLeft: 0,
        marginRight: 0,
        height: 44,
        marginTop: 5,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#ffffff',
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
        // backgroundColor: '#FAFAFF'
    },
    flatList: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        height: 100
    },
    flatlistbox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 220,
        borderWidth: 1,
        backgroundColor: "#00C656",
        borderColor: '#ffffff',
        borderRadius: 10,
        marginLeft: 10,
        //  paddingHorizontal: 15,
        // padding:15,
        // marginRight: 15,
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
    }
});
