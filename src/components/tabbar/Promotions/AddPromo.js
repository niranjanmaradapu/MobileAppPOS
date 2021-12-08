import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';
import axios from 'axios';
import { openDatabase } from 'react-native-sqlite-storage';
// Connction to access the pre-populated db
const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });
import { RNCamera } from 'react-native-camera';
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PromotionsService from '../../services/PromotionsService';
import Loader from '../../loader';



class AddPromo extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.camera = null;
        this.barcodeCodes = [];
        this.state = {
            uom: [],
            open: false,
            chargeExtra: false,
            addPools: false,
            addBenifits: false,
            flagAddPool: false,
            modalVisible: true,
        }
    }


    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }
    cancel() {
        this.props.navigation.goBack(null);
    }

    modelCancel() {
        this.setState({ modalVisible: false });
    }

    chargeExtra() {
        if (this.state.chargeExtra === true) {
            this.setState({ chargeExtra: false })
        }
        else {
            this.setState({ chargeExtra: true })
        }

    }
    savePromo(){
        alert('you have saved the promo');
    }
    refresh() {
        this.setState({ productname: global.productname })
        console.log('search' + this.state.productname)
    }

    handleValue = (value) => {
        if(isNaN(value)){
            alert("please enter the value");
        }
        else{
            
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#ffffff' }} >
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
                    }}> Add Promo </Text>
                </View>
                
            <View style={{ marginTop: 30, width: deviceWidth, }}>
            <Text style={ styles.promoname }>Promo code details</Text>
            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="PROMOTION NAME"
                placeholderTextColor="#6F6F6F"
                textAlignVertical="center"
                autoCapitalize="none"
                value={this.state.productmrp}
                onChangeText={this.handleInventoryMRP}
            />
            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="DESCRIPTION"
                placeholderTextColor="#6F6F6F"
                textAlignVertical="center"
                autoCapitalize="none"
                value={this.state.productmrp}
                onChangeText={this.handleInventoryMRP}
            />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="PRINT NAME ON SALE BILL"
                placeholderTextColor="#6F6F6F"
                textAlignVertical="center"
                autoCapitalize="none"
                value={this.state.productmrp}
                onChangeText={this.handleInventoryMRP}
            />



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
                        label: 'APPLICABILITY',

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

            <TouchableOpacity
                style={{
                    width: 200, marginTop: 20,
                }}

                onPress={() => this.chargeExtra()}
            >
                <Text style={{
                    marginLeft: 40, marginTop: 11, color: "#6F6F6F", fontSize: 15,
                    fontFamily: "regular", width: 200,
                }}  > {'Charge Tax Entra'} </Text>

                <Image style={{ position: 'absolute', top: 10, left: 20, }} source={
                    //require('../assets/images/chargeunselect.png')}
                    this.state.chargeExtra ? require('../../assets/images/chargeselect.png') : require('../../assets/images/chargeunselect.png')} />
            </TouchableOpacity>

            {this.state.chargeExtra && (
                <View style={{
                    justifyContent: 'center',
                    margin: 20,
                    width: deviceWidth / 2 - 20,
                    height: 44,
                    marginTop: -30,
                    marginLeft: deviceWidth / 2,
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
                            label: 'SELECT TAX %',

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
            )}

            <Text style={styles.buypooltitle}>Buy Pool Defination</Text>
            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="BUY ANY"
                keyboardType='name-phone-pad'
                placeholderTextColor="#6F6F6F"
                textAlignVertical="center"
                autoCapitalize="none"
                value={this.state.productmrp}
                onChangeText={this.handleValue}
                ref={inputemail => { this.emailValueInput = inputemail }}
            />

            <TouchableOpacity>
                    <Text style={styles.navigationalbuttonstext}>+ Add Pools</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                    <Text style={styles.navigationalbuttonstext}>+ Add Benifits</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    margin: 8,
                    height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                }} onPress={() => this.savePromo()}
            >
                <Text style={{
                    textAlign: 'center', marginTop: 20, color: "#ffffff", fontSize: 15,
                    fontFamily: "regular"
                }}  > SAVE </Text>

            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    margin: 8,
                    height: 50, backgroundColor: "#ffffff", borderRadius: 5, borderWidth: 1, borderColor: "#353C4050",
                }} onPress={() => this.cancel()}
            >
                <Text style={{
                    textAlign: 'center', marginTop: 20, color: "#353C4050", fontSize: 15,
                    fontFamily: "regular"
                }}  > CANCEL </Text>

            </TouchableOpacity>

        </View>
        {this.state.flagAddPool && (
            <View>
                <Modal isVisible={this.state.modalVisible}>
                    <View
                        style={{
                            width: deviceWidth,
                            alignItems: 'center',
                            marginLeft: -20,
                            backgroundColor: "#ffffff",
                            height: 400,
                            position: 'absolute',
                            bottom: -20,
                        }}
                    >
                    </View>
                </Modal>
            </View>
        )}
    </View>
        )
    }
}
export default AddPromo

const pickerSelectStyles = StyleSheet.create({
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
})

const styles = StyleSheet.create({
    input: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
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
    imagealign: {
        marginTop: 16,
        marginRight: 20,
    },
    viewswidth: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 84,
    },
    promoname: {
        fontFamily: 'medium',
        fontSize: 16, 
        color: "red",
        marginLeft: 20,
    },
    buypooltitle: {
        fontFamily: 'medium',
        fontSize: 16,
        color: 'red',
        marginTop: 25,
        marginBottom: 16,
        marginLeft: 20,
    },
    navigationalbuttons: {
    },
    navigationalbuttonstext: {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'regular',
        textDecorationLine: 'underline',
        textDecorationColor: 'red',
    },
});

