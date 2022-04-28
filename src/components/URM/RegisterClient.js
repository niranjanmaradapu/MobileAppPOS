import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../commonUtils/loader';
import UrmService from '../services/UrmService';
import I18n from 'react-native-i18n';
import { urmErrorMessages } from '../Errors/errors';
import Message from '../Errors/Message';

var deviceheight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

class RegisterClient extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            userName: '',
            organization: "",
            mobile: '',
            userEmail: "",
            address: "",
            nameError: "",
            organizationError: "",
            mobileError: "",
            emailError: "",
            addressError: "",
            errors: {},
            organizationValid: true,
            mobileValid: true,
            emailValid: true,
            nameValid: true,
        };
    }

    componentDidMount() {

    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    cancel() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleName = (text) => {
        this.setState({ userName: text });
    };

    handleNameValid = () => {
        if (this.state.name.length >= 6) {
            this.setState({nameValid: true})
        }
    }

    handleOrganization = (text) => {
        this.setState({ organization: text });
    };

    handleOrganizationValid = () => {
        if (this.state.organization.length >= 3) {
            this.setState({organizationValid: true})
        }
    }

    handleMobile = (text) => {
        this.setState({ mobile: text });
    };

    handleMobileValid = () => {
        if (this.state.mobile.length === 10) {
            this.setState({mobileValid: true})
        }
    }

    handleEmail = (text) => {
        this.setState({ userEmail: text });
    };

    handleEmailValid = () => {
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailReg.test(this.state.userEmail)) {
            this.setState({emailValid: true})
        }
    }

    handleAddress = (text) => {
        this.setState({ address: text });
    };


    handleValidation() {
        let formIsValid = true
        let errors = {}
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const mobReg = /^[0-9\b]+$/;

        if (this.state.userName.length < 6) { 
            formIsValid = false
            errors["userName"] = urmErrorMessages.userNanme
            this.setState({nameValid: false})
        }

        if (this.state.mobile.length !== 10 || mobReg.test(this.state.mobile) === false) {
            formIsValid = false
            errors["Mobile"] = urmErrorMessages.mobile
            this.setState({mobileValid: false})
        }

        if (emailReg.test(this.state.userEmail) === false) {
            formIsValid = false
            errors["Email"] = urmErrorMessages.email
            this.setState({emailValid: false})
        }

        if (this.state.organization.length < 3) {
            formIsValid = false
            errors["organization"] = urmErrorMessages.orginisation
            this.setState({organizationValid: false})
        }

        this.setState({ errors: errors })
        return formIsValid
}       


    create() {
        
        // if (this.state.userName.length === 0) {
        //     // alert('You must enter a name');
        //     this.setState({nameError: "you must enter a valid username"})
        // } else if (this.state.mobile.length !== 10 || mobReg.test(this.state.mobile) === false) {
        //     this.setState({mobileError: "You must enter a valid 10 digit mobile number"})
        //     // alert('You must enter a valid mobile number');
        // }
        // else if (emailReg.test(this.state.userEmail) === false) {
        //     this.setState({emailError: 'You must enter a valid email-id'})
        //     // alert('You must enter a valid email');
        // } else if (this.state.organization === "") {
        //     // alert('Organisation cannot be empty');
        //     this.setState({organizationError: 'Organisation cannot be empty'})
        // }
        const formIsValid = this.handleValidation()
        if(formIsValid) {
            this.setState({ loading: true, nameError: "", mobileError: "", emailError: "", organizationError: "" });
            const obj = {
                name: this.state.userName,
                organizationName: this.state.organization,
                address: this.state.address,
                mobile: "+91".concat(this.state.mobile),
                email: this.state.userEmail,
            };
            console.log('params are' + JSON.stringify(obj));
            this.setState({ loading: true });
            axios.post(UrmService.registerUser(), obj).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                    const clientId = res.data.result.split(":");
                    const clientObj = {
                        email: this.state.userEmail,
                        phoneNumber: "+91".concat(this.state.mobile),
                        birthDate: "",
                        gender: "",
                        name: this.state.userName,
                        username: this.state.userName.concat("_config_user"),
                        tempPassword: "Otsi@1234",
                        parentId: "",
                        domianId: "",
                        address: "",
                        role: {
                            roleName: "config_user",
                        },
                        roleName: "config_user",
                        stores: [],
                        clientId: clientId[1],
                        isConfigUser: "true",
                        clientDomain: [],
                        isSuperAdmin: "false",
                        createdBy: "NA",
                    };

                    axios.post(UrmService.saveUser(), clientObj).then((res) => {
                        console.log(res);
                        if (res.data.isSuccess === "true") {
                            alert("Username and Password are sent to  respective mailId");
                            this.setState({
                                userName: '',
                                organization: "",
                                mobile: '',
                                userEmail: "",
                                address: "",
                            });
                            this.setState({ loading: false });
                            this.props.navigation.goBack();
                        }
                        else {
                            this.setState({ loading: false });
                            alert(res.data.message);
                        }
                    });

                }
                else {
                    this.setState({ loading: false });
                    alert("duplicate record already exists");
                }
            }
            );
        }
    }

    render() {
        const nameValid = this.state.nameValid
        const mobileValid = this.state.mobileValid
        const organizationValid = this.state.organizationValid
        const emailValid = this.state.emailValid
        return (
            <KeyboardAwareScrollView KeyboardAwareScrollView
                enableOnAndroid={true}>
                {this.state.loading &&
                    <Loader
                        loading={this.state.loading} />
                }
                <SafeAreaView style={styles.mainContainer}>
                    <View style={Device.isTablet ? styles.viewsWidth_tablet : styles.viewsWidth_mobile} >
                        <TouchableOpacity style={Device.isTablet ? styles.backButton_tablet : styles.backButton_mobile} onPress={() => this.handleBackButtonClick()}>
                            <Image source={require('../assets/images/backButton.png')} />
                        </TouchableOpacity>
                        <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}>
                            {I18n.t("Register New Client")}
                        </Text>
                    </View>
                    <Text style={{ fontSize: Device.isTablet ? 20 : 15, marginLeft: 20, color: '#000000', marginTop: 10, marginBottom: 10, }}>{I18n.t("Name")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={nameValid ? Device.isTablet ? styles.input_tablet : styles.input_mobile : Device.isTablet ? styles.inputError_tablet : styles.inputError_mobile}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Name")}
                        placeholderTextColor={nameValid ? "#6F6F6F" : '#dd0000'}
                        textAlignVertical="center"
                        maxLength={25}
                        autoCapitalize="none"
                        value={this.state.userName}
                        onChangeText={this.handleName}
                        onBlur={this.handleNameValid}
                    />
                    {!nameValid && <Message message={this.state.errors["userName"]} />}
                    <Text style={{ fontSize: Device.isTablet ? 20 : 15, marginLeft: 20, color: '#000000', marginTop: 10, marginBottom: 10, }}>{I18n.t("Mobile")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={mobileValid ? Device.isTablet ? styles.input_tablet : styles.input_mobile : Device.isTablet ? styles.inputError_tablet : styles.inputError_mobile}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Mobile")}
                        maxLength={10}
                        keyboardType={'numeric'}
                        textContentType='telephoneNumber'
                        placeholderTextColor={mobileValid ? "#6F6F6F" : '#dd0000'}
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.mobile}
                        onBlur={this.handleMobileValid}
                        onChangeText={this.handleMobile}
                    />
                    {!mobileValid && <Message message={this.state.errors["Mobile"]} />}
                    <Text style={{ fontSize: Device.isTablet ? 20 : 15, marginLeft: 20, color: '#000000', marginTop: 10, marginBottom: 10, }}>{I18n.t("Email")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={emailValid ? Device.isTablet ? styles.input_tablet : styles.input_mobile : Device.isTablet ? styles.inputError_tablet : styles.inputError_mobile}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Email")}
                        placeholderTextColor={emailValid ? "#6F6F6F" : '#dd0000'}
                        textAlignVertical="center"
                        keyboardType={'email-address'}
                        autoCapitalize="none"
                        value={this.state.userEmail}
                        onBlur={this.handleEmailValid}
                        onChangeText={this.handleEmail}
                    />
                    {!emailValid && <Message message={this.state.errors["Email"]} />}
                    <Text style={{ fontSize: Device.isTablet ? 20 : 15, marginLeft: 20, color: '#000000', marginTop: 10, marginBottom: 10, }}>{I18n.t("Organisation")} <Text style={{ color: '#aa0000' }}>*</Text></Text>
                    <TextInput
                        style={organizationValid ? Device.isTablet ? styles.input_tablet : styles.input_mobile : Device.isTablet ? styles.inputError_tablet : styles.inputError_mobile}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Organisation")}
                        placeholderTextColor={organizationValid ? "#6F6F6F" : '#dd0000'}
                        textAlignVertical="center"
                        autoCapitalize="none"
                        maxLength={10}
                        value={this.state.organization}
                        onBlur={this.handleOrganizationValid}
                        onChangeText={this.handleOrganization}
                    />
                    {!organizationValid && <Message message={this.state.errors["organization"]} />}
                    <Text style={{ fontSize: Device.isTablet ? 20 : 15, marginLeft: 20, color: '#000000', marginTop: 10, marginBottom: 10, }}>{I18n.t("Address")}</Text>
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Address")}
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.address}
                        onChangeText={this.handleAddress}
                    />
                    <TouchableOpacity style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile}
                        onPress={() => this.create()}>
                        <Text style={Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile}>{I18n.t("SAVE")}</Text>
                    </TouchableOpacity>
                <TouchableOpacity style={[Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile, {backgroundColor: "#ffffff", borderColor: "#ED142C", borderWidth: 1}]}
                        onPress={() => this.cancel()}>
                        <Text style={[Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile, {color: '#ED142C'}]}>{I18n.t("CANCEL")}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
    }
}

export default RegisterClient;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    errorsRecords: {
        color: '#dd0000',
        fontSize: Device.isTablet ? 17 : 12,
        // fontFamily: 'medium',
        marginLeft: 30,
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
        // height: 20,
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
    inputError_mobile: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        height: 44,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#dd0000',
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
    inputError_tablet: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        height: 54,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#dd0000',
        borderRadius: 6,
        backgroundColor: '#FBFBFB',
        borderWidth: 2,
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

});