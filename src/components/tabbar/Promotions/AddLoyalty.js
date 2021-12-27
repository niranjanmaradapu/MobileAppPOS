import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Loader from '../../loader';
import PromotionsService from '../../services/PromotionsService';
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
            console.log('there is error getting domainDataId');
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
            <View style={{ backgroundColor: '#fff' }}>
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
                    }}> Add Loyalty Points </Text>
                </View>
                <View style={{ marginTop: 30, width: deviceWidth, }}>
                    <Text style={styles.subheading} >Loyalty points details</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="INVOICE NO"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.invoiceNumber}
                        onChangeText={this.handleInvoiceNumber}
                        onEndEditing
                        onEndEditing={() => this.endEditing()}
                    />

                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="NAME"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.name}
                        onChangeText={this.handleName}
                    />
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="MOBILE NO"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.mobileNumber}
                        onChangeText={this.handleMobileNumber}
                    />

                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="AMMOUNT PAID"
                        editable={false} selectTextOnFocus={false}
                        placeholderTextColor="#353C4050"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.payableAmount}
                    />
                    <TouchableOpacity
                        style={{
                            margin: 8,
                            height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                        }} onPress={() => this.saveLoyalty()}
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
            </View>
        );
    }
}

export default AddLoyalty;

const styles = StyleSheet.create({
    viewswidth: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 84,
    },
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
    subheading: {
        fontFamily: 'medium',
        fontSize: 16,
        color: "red",
        marginLeft: 20,
    },
    loading: {
        flex: 1,
        justifyContent: 'center'
        // alignItems: 'center',
    },
});