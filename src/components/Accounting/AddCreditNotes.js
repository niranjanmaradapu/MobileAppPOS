import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import NewSaleService from '../services/NewSaleService';
import { cancelBtn, cancelBtnText, inputFieldDisabled, inputArea, inputField, inputHeading, rnPicker, rnPickerContainer, submitBtn, submitBtnText } from '../Styles/FormFields';
import { backButton, backButtonImage, headerTitle, headerTitleContainer, headerTitleSubContainer } from '../Styles/Styles';

var deviceWidth = Dimensions.get('window').width;

export default class AddCreditNotes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerName: "",
            mobileNumber: "",
            empId: "",
            creditAmmount: "",
            storeName: "",
            approves: [],
            approvedBy: "",
            datepickerOpen: false,
            date: new Date(),
            fromDate: "",
            createdDate: "",
            createdBy: "",
            comments: "",
            trasanctionTypes: [
                {label: 'Card', value: 'Card'},
                {label: 'Cash', value: 'Cash'}
            ],
            trasanctionMode: '',
        };
    }


    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleCustomerName = (value) => {
        this.setState({ customerName: value });
    };

    handleMobileNumber = (value) => {
        this.setState({ mobileNumber: value });
    };

    handleEmpId = (value) => {
        this.setState({ empId: value });
    };

    handleCreditAmmount = (value) => {
        this.setState({ creditAmmount: value });
    };

    handleStore = (value) => {
        this.setState({ storeName: value });
    };

    saveCredit() {
        alert("you have saved")
    }

    handleComments = (value) => {
        this.setState({comments: value})
    }

    handleCretedBy = (value) => {
        this.setState({createdBy: value})
    }

    handletransactionType = (value) => {
        this.setState({trasanctionMode: value})
    } 

    cancel() {
        this.props.navigation.goBack(null);
        return true;
    }

    getCustomerDetails = () => {
        NewSaleService.getMobileData("+91" + this.state.mobileNumber).then(res => {
            if (res && res.data.result) {
                this.setState({customerName: res.data.result.userName})
            }
        })
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {this.state.loading &&
                    <Loader
                        loading={this.state.loading} />
                }
                <View style={headerTitleContainer} >
                    <View style={headerTitleSubContainer}>
                    <TouchableOpacity style={backButton} onPress={() => this.handleBackButtonClick()}>
                        <Image style={backButtonImage} source={require('../assets/images/backButton.png')} />
                    </TouchableOpacity>
                    <Text style={headerTitle}>
                        Add Credit Notes
                    </Text>
                    </View>
                </View>
                <ScrollView>
                <Text
                    style={{
                        color: "#ED1C24",
                        fontSize: Device.isTablet ? 19 : 14,
                        fontFamily: 'medium',
                        margin: 15,
                    }}
                >Credit information</Text>
                <Text style={inputHeading}>Mobile Number</Text>
                <TextInput
                    style={inputField}
                    underlineColorAndroid="transparent"
                    placeholder="MOBILE NUMBER"
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.mobileNumber}
                    onChangeText={this.handleMobileNumber}
                    onBlur={this.getCustomerDetails}
                />
                <Text style={inputHeading}>Customer Name</Text>
                <TextInput
                    style={inputFieldDisabled}
                    underlineColorAndroid="transparent"
                    placeholder="CUSTOMER NAME"
                    editable={false}
                    placeholderTextColor="#000000"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.customerName}
                    onChangeText={this.handleCustomerName}
                />
                <Text style={inputHeading}>Credit Amount</Text>
                <TextInput
                    style={inputField}
                    underlineColorAndroid="transparent"
                    placeholder="CREDIT AMOUNT"
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.creditAmmount}
                    onChangeText={this.handleCreditAmmount}
                />
                <Text style={inputHeading}>Store</Text>
                <TextInput
                    style={inputField}
                    underlineColorAndroid="transparent"
                    placeholder="STORE"
                    editable={false}
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.storeName}
                    onChangeText={this.handleStore}
                />
                <Text style={inputHeading}>Created By</Text>
                <TextInput
                    style={inputField}
                    underlineColorAndroid="transparent"
                    placeholder="CREATED BY"
                    editable={false}
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.createdBy}
                    onChangeText={this.handleCretedBy}
                />
                <Text style={inputHeading}>Payment Type</Text>
                <View style={rnPickerContainer}>
                    <RNPickerSelect
                        placeholder={{
                            label: 'TAX Label',
                            value: "",
                        }}
                        Icon={() => {
                            return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                        }}
                        items={this.state.trasanctionTypes}
                        onValueChange={this.handletransactionType}
                        style={rnPicker}
                        value={this.state.trasanctionMode}
                        useNativeAndroidPickerStyle={false}
                    />
                </View>
                <Text style={inputHeading}>Comments</Text>
                <TextInput
                    style={inputArea}
                    underlineColorAndroid="transparent"
                    placeholder="COMMENTS"
                    editable={false}
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.comments}
                    onChangeText={this.handleComments}
                />
                <TouchableOpacity style={submitBtn}
                    onPress={() => this.saveCredit()}>
                    <Text style={submitBtnText}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={cancelBtn}
                    onPress={() => this.cancel()}>
                    <Text style={cancelBtnText}>CANCEL</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}


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
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imagealign: {
        marginTop: Device.isTablet ? 25 : 20,
        marginRight: Device.isTablet ? 30 : 20,
    },
    bottomContainer: {
        margin: 50,
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
    flatlistContainer_mobile: {
        height: 140,
        backgroundColor: '#FBFBFB',
        borderBottomWidth: 5,
        borderBottomColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flatlistSubContainer_mobile: {
        flexDirection: 'column',
        width: '100%',
        height: 140,
    },
    rnSelect_mobile: {
        color: '#8F9EB7',
        fontSize: 15
    },
    rnSelectContainer_mobile: {
        justifyContent: 'center',
        height: 44,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 15,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        fontSize: 14,
    },
    filterDateButton_mobile: {
        width: deviceWidth - 40,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 15,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        height: 50,
        backgroundColor: "#F6F6F6",
        borderRadius: 5,
    },
    filterDateButtonText_mobile: {
        marginLeft: 16,
        marginTop: 20,
        color: "#6F6F6F",
        fontSize: 15,
        fontFamily: "regular"
    },
    datePickerContainer_mobile: {
        height: 280,
        width: deviceWidth,
        backgroundColor: '#ffffff'
    },
    datePickerButton_mobile: {
        position: 'absolute',
        left: 20,
        top: 10,
        height: 30,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    datePickerEndButton_mobile: {
        position: 'absolute',
        right: 20,
        top: 10,
        height: 30,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    datePickerButtonText_mobile: {
        textAlign: 'center',
        marginTop: 5,
        color: "#ffffff",
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
    input_tablet: {
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 15,
        height: 54,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
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
    flatlistContainer_tablet: {
        height: 160,
        backgroundColor: '#FBFBFB',
        borderBottomWidth: 5,
        borderBottomColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flatlistSubContainer_tablet: {
        flexDirection: 'column',
        width: '100%',
        height: 160,
    },
    rnSelect_tablet: {
        color: '#8F9EB7',
        fontSize: 20
    },
    rnSelectContainer_tablet: {
        justifyContent: 'center',
        height: 54,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 15,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        fontSize: 20,
    },
    filterDateButton_tablet: {
        width: deviceWidth - 40,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 15,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        height: 60,
        backgroundColor: "#F6F6F6",
        borderRadius: 5,
    },
    filterDateButtonText_tablet: {
        marginLeft: 16,
        marginTop: 20,
        color: "#6F6F6F",
        fontSize: 20,
        fontFamily: "regular"
    },
    datePickerButton_tablet: {
        position: 'absolute',
        left: 20,
        top: 10,
        height: 40,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    datePickerButtonText_tablet: {
        textAlign: 'center',
        marginTop: 5,
        color: "#ffffff",
        fontSize: 20,
        fontFamily: "regular"
    },
    datePickerEndButton_tablet: {
        position: 'absolute',
        right: 20,
        top: 10,
        height: 40,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },

});