import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import Loader from '../../commonUtils/loader';
import PromotionsService from '../services/PromotionsService';
var deviceWidth = Dimensions.get('window').width;

class AddLoyalty extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.camera = null;
        this.state = {
            name: '',
            mobileNumber: '',
            invoiceNumber: 'KLM/202110/328433703',
            invocieDate: '',
            payableAmount: '',
            userId: '',
            domainId: 1,
        };
    }

    async componentDidMount() {
        var domainStringId = "";
        AsyncStorage.getItem("domainDataId").then((value) => {
            domainStringId = value;
            this.setState({ domainId: parseInt(domainStringId) });
            console.log("domain data id" + this.state.domainId);

        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting domainDataId');
           // alert('There is error getting domainDataId');
        });
    }

    handleName = (value) => {
        this.setState({ name: value });
    };

    handleMobileNumber = (value) => {
        this.setState({ mobileNumber: value });
    };

    handleInvoiceNumber = (value) => {
        this.setState({ invoiceNumber: value });
    };

    handlePrice = (value) => {
        this.setState({ Price: value });
    };

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

    endEditing() {
        const params = {
            "orderNumber": this.state.invoiceNumber,
        };
        axios.get(PromotionsService.getInvoiceData(),
            { params }).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                    console.log("end edited-------" + String(res.data["result"].netPayableAmount));
                    this.setState({ payableAmount: String(res.data["result"].netPayableAmount), invocieDate: res.data["result"].createdDate, userId: String(res.data["result"].userId) });
                }
                return;
            }
            ).catch(() => {
                this.setState({ loading: false });
                this.setState({ loading: false });
                alert('No Records Found');
            });
    }


    saveLoyalty() {
        if (this.state.invoiceNumber.length === 0) {
            alert('please Enter A Valid Invoice Number');
        }
        else if (String(this.state.name).length === 0) {
            alert('Please Enter a Name');
        } else if (this.state.mobileNumber.length !== 10) {
            alert('Please Enter A Valid 10 Digit Mobile Number');
        } else {
            const params = {
                "userId": this.state.userId,
                "domainId": this.state.domainId,
                "mobileNumber": this.state.mobileNumber,
                "customerName": this.state.name,
                "invoiceCreatedDate": this.state.invocieDate,
                "invoiceNumber": this.state.invoiceNumber,
                "invoiceAmount": this.state.payableAmount,
                "numberOfMonths": 1
            };
            console.log('store--' + params);
            console.log('params are' + JSON.stringify(params));
            this.setState({ loading: true });
            axios.post(PromotionsService.saveLoyaltyPoints(), params).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                    this.setState({ loading: false });
                    this.props.route.params.onGoBack();
                    this.props.navigation.goBack();
                }
                else {
                    this.setState({ loading: false });
                    // this.setState({ loading: false })
                    alert("duplicate record already exists");
                }
            }
            );
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {this.state.loading &&
                    <Loader
                        loading={this.state.loading} />
                }
                <View style={Device.isTablet ? styles.viewsWidth_tablet : styles.viewsWidth_mobile}>
                    <TouchableOpacity style={Device.isTablet ? styles.backButton_tablet : styles.backButton_mobile} onPress={() => this.handleBackButtonClick()}>
                        <Image source={require('../assets/images/backButton.png')} />
                    </TouchableOpacity>
                    <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}> Add Loyalty Points </Text>
                </View>
                <View style={{ marginTop: 30, width: deviceWidth, }}>
                    <Text style={Device.isTablet ? styles.subheading_tablet : styles.subheading_mobile} >Loyalty points details</Text>
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="INVOICE NO"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.invoiceNumber}
                        onChangeText={this.handleInvoiceNumber}
                        onEndEditing={() => this.endEditing()}
                    />

                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="NAME"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.name}
                        onChangeText={this.handleName}
                    />
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="MOBILE NO"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.mobileNumber}
                        onChangeText={this.handleMobileNumber}
                    />

                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="AMMOUNT PAID"
                        editable={false} selectTextOnFocus={false}
                        placeholderTextColor="#353C4050"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.payableAmount}
                    />
                    <TouchableOpacity
                        style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile} onPress={() => this.saveLoyalty()}
                    >
                        <Text style={Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile}  > SAVE </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={Device.isTablet ? styles.cancelButton_tablet : styles.cancelButton_mobile} onPress={() => this.cancel()}
                    >
                        <Text style={Device.isTablet ? styles.cancelButtonText_tablet : styles.cancelButtonText_mobile}  > CANCEL </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default AddLoyalty;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loading: {
        flex: 1,
        justifyContent: 'center'
        // alignItems: 'center',
    },
    // Styles For Mobile
    viewsWidth_mobile: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 84,
    },
    backButton_mobile: {
        position: 'absolute',
        left: 10,
        top: 30,
        width: 40,
        height: 40,
    },
    headerTitle_mobile: {
        position: 'absolute',
        left: 70,
        top: 47,
        width: 300,
        height: 20,
        fontFamily: 'bold',
        fontSize: 18,
        color: '#353C40'
    },
    subheading_mobile: {
        fontFamily: 'medium',
        fontSize: 16,
        color: "red",
        marginLeft: 20,
    },
    input_mobile: {
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
    cancelButton_mobile: {
        margin: 8,
        height: 50,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#353C4050",
    },
    cancelButtonText_mobile: {
        textAlign: 'center',
        marginTop: 15,
        color: "#353C4050",
        fontSize: 15,
        fontFamily: "regular"
    },

    // Styles For Tablet
    viewsWidth_tablet: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 28,
        height: 90,
    },
    backButton_tablet: {
        position: 'absolute',
        left: 10,
        top: 25,
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
    subheading_tablet: {
        fontFamily: 'medium',
        fontSize: 21,
        color: "red",
        marginLeft: 20,
    },
    input_tablet: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
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
    cancelButton_tablet: {
        margin: 8,
        height: 60,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#353C4050",
    },
    cancelButtonText_tablet: {
        textAlign: 'center',
        marginTop: 15,
        color: "#353C4050",
        fontSize: 20,
        fontFamily: "regular"
    },


});