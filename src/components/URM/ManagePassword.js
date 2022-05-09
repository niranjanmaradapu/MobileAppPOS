import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../commonUtils/loader';
import UrmService from '../services/UrmService';
import I18n from 'react-native-i18n';
import { errorLength, urmErrorMessages } from '../Errors/errors';
import Message from '../Errors/Message';

var deviceheight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default class ManagePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            newPassword: "",
            session: "",
            roleName: "",
            userName: "",
            confirmPassword: "",
            errors: {},
            newPasswordValid: true,
            confirmPasswordValid: true,
        };
    }

    async componentDidMount() {
        //  this.setState({ loading: false })
        this.setState({ userName: this.props.route.params.userName });
        this.setState({ roleName: this.props.route.params.roleName });
        this.setState({ session: this.props.route.params.session });
        this.setState({ password: this.props.route.params.password });
    }


    handlePassword = (value) => {
        this.setState({ password: value });
    };

    handleNewPassword = (value) => {
        this.setState({ newPassword: value });
    };

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleConfirmPassword = (text) => {
        this.setState({ confirmPassword: text });
    };

    cancel() {
        this.props.navigation.goBack(null);
        return true;
    }

        validationPasswords() {
        let isFormValid = true
        let errors = {}
        let passReg = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])$/;

        if (this.state.newPassword.length < errorLength.password || passReg.test(this.state.newPassword) === false) {
            isFormValid = false
            errors["password1"] = urmErrorMessages.createPassword
            this.setState({newPasswordValid: false})
        }

        if (this.state.newPassword.length === 0 || this.state.newPassword !== this.state.confirmPassword) {
            isFormValid = false
            errors["password2"] = urmErrorMessages.confirmPassword
            this.setState({confirmPasswordValid: false})
        }

        this.setState({errors: errors})
        return isFormValid
    }


    changePassword() {
        const isFormValid = this.validationPasswords()
        if (isFormValid) {
            this.setState({ loading: true });
            const obj = {
                userName: this.state.userName,
                password: this.state.password,
                newPassword: this.state.newPassword,
                session: this.state.session,
                roleName: this.state.roleName,
            };
            console.log('params are' + JSON.stringify(obj));
            this.setState({ loading: true });
            axios.post(UrmService.changePassword(), obj).then((res) => {
                if (res) {
                    alert("Password Changed Successfully");
                    this.setState({ loading: false });
                    this.props.navigation.goBack();
                    //    window.location.reload();
                }
                else {
                    this.setState({ loading: false });
                }
            });
        }
    }

    render() {
        let passValid = this.state.newPasswordValid
        let confirmValid = this.state.confirmPasswordValid
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
                            {I18n.t("Update New Password")}
                        </Text>
                    </View>
                    {/* <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Current Password"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.password}
                        onChangeText={this.handlePassword}
                    /> */}
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("New Password")}
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        value={this.state.newPassword}
                        onChangeText={this.handleNewPassword}
                    />
                    {!passValid && <Message message={this.state.errors["password1"]} />}
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Confirm Password")}
                        secureTextEntry={true}
                        placeholderTextColor="#6F6F6F"
                        autoCapitalize="none"
                        onChangeText={this.handleConfirmPassword}
                        value={this.state.confirmPassword}
                        ref={inputpassword => { this.passwordValueInput = inputpassword; }} />
                    {!confirmValid && <Message message={this.state.errors["password2"]} />}

                    <TouchableOpacity style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile}
                        onPress={() => this.changePassword()}>
                        <Text style={Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile}>{I18n.t("SAVE")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile}
                        onPress={() => this.cancel()}>
                        <Text style={Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile}>{I18n.t("CANCEL")}</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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
