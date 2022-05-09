import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../commonUtils/loader';
import LoginService from '../services/LoginService';
import I18n from 'react-native-i18n';
import { errorLength, urmErrorMessages } from '../Errors/errors';
import Message from '../Errors/Message';
import { RF, RH, RW } from '../../Responsive';

var deviceheight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

class UpdateNewpassword extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            userName: '',
            code: '',
            newPassword: '',
            confirmPassword: '',
            errors: {},
            newPasswordValid: true,
            confirmPasswordValid: true,
        };
    }

    componentDidMount() {
        this.setState({
            userName: this.props.route.params.userName,
        });

    }
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleEmail = (text) => {
        this.setState({ code: text });
    };

    handleNewPasswordValid = () => {
        if (this.state.code.length >= 8) {
            this.setState({newPasswordValid: true})
        }
    }

    handleNewPassword = (text) => {
        this.setState({ newPassword: text });
    };

    handleConfirmValid = () => {
        if (this.state.code === this.state.newPassword) {
            this.setState({confirmPasswordValid: true})
        }
    }

    validationPasswords() {
        let isFormValid = true
        let errors = {}
        let passReg = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])$/;

        if (this.state.code.length < errorLength.password || passReg.test(this.state.code) === false) {
            isFormValid = false
            errors["password1"] = urmErrorMessages.password
            this.setState({newPasswordValid: false})
        }

        if (this.state.newPassword.length === 0 || this.state.code !== this.state.newPassword) {
            isFormValid = false
            errors["password2"] = urmErrorMessages.confirmPassword
            this.setState({confirmPasswordValid: false})
        }

        this.setState({errors: errors})
        return isFormValid
    }


    create() {
        const isFormValid = this.validationPasswords()
        if (isFormValid) {
            // const params = {
            //     "username": this.state.userName, //"+919493926067",
            //     "confirmarionCode": this.state.code, //"Mani@1123",
            //     "newPassword": this.state.newPassword,
            //     //"storeName": this.state.store,//"kphb",
            // };
            const params = '?username=' + this.state.userName + '&confirmarionCode=' + this.state.code + '&newPassword=' + this.state.newPassword;
            console.log(params);
            this.setState({ loading: true });
            axios.post(LoginService.forgotPassword() + params
            ).then((res) => {
                if (res) {
                    // alert("Password Changed Successfully");
                    console.log(res.data);
                    if (res.data.isSuccess === "true") {
                        alert("Password Changed Successfully");
                    } else {
                        alert(res.data.message);
                    }
                    // window.location.reload();
                    this.setState({ loading: false });
                    this.props.navigation.navigate('Login');
                }
                else {
                    this.setState({ loading: false });
                }
            }
            ).catch((err) => {
                this.setState({ loading: false });
                alert(err);
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
                <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>

                    <View style={styles.container}>
                        <View style={{ flex: 1, marginTop: '0%', backgroundColor: '#FFFFFF' }}>
                            {/* <Image source={require('../assets/images/logo.png')} style={styles.logoImage} /> */}
                            {/* <Text></Text> */}
                            <View style={Device.isTablet ? styles.viewsWidth_tablet : styles.viewsWidth_mobile} >
                                <TouchableOpacity style={Device.isTablet ? styles.backButton_tablet : styles.backButton_mobile} onPress={() => this.handleBackButtonClick()}>
                                    <Image source={require('../assets/images/backButton.png')} />
                                </TouchableOpacity>
                                <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}>
                                    {I18n.t("Update New Password")}
                                </Text>
                            </View>
                        </View>



                        <View style={{ flex: 6 }}>
                            {/* <Text style={styles.signInFieldStyle}> User Name </Text> */}
                            <TextInput
                                style={passValid ? Device.isTablet ? styles.input_tablet : styles.input_mobile : Device.isTablet ? styles.inputError_tablet : styles.inputError_mobile}
                                underlineColorAndroid="transparent"
                                placeholder={I18n.t("Confirmation Code")}
                                placeholderTextColor={passValid ? "#6F6F6F": "#dd0000"}
                                // textAlignVertical="center"
                                autoCapitalize="none"
                                maxLength={25}
                                onChangeText={this.handleEmail}
                                value={this.state.code}
                                onBlur={this.handleNewPasswordValid}
                                ref={inputemail => { this.emailValueInput = inputemail; }} />
                            {!passValid && <Message message={this.state.errors["password1"]} />}

                            {/* <Text style={styles.signInFieldStyle}> Password </Text> */}
                            <TextInput
                                style={confirmValid ? Device.isTablet ? styles.input_tablet : styles.input_mobile : Device.isTablet ? styles.inputError_tablet : styles.inputError_mobile}
                                underlineColorAndroid="transparent"
                                placeholder={I18n.t("New Password")}
                                maxLength={25}
                                secureTextEntry={true}
                                placeholderTextColor={confirmValid ? "#6F6F6F" : "#dd0000"}
                                autoCapitalize="none"
                                onChangeText={this.handleNewPassword}
                                onBlur={this.handleConfirmValid}
                                value={this.state.newPassword}
                                ref={inputpassword => { this.passwordValueInput = inputpassword; }} />
                            {!confirmValid && <Message message={this.state.errors["password2"]} />}

                            {/* <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                underlineColorAndroid="transparent"
                                placeholder="New Password"
                                secureTextEntry={true}
                                placeholderTextColor="#6F6F6F"
                                autoCapitalize="none"
                                onChangeText={this.handleNewPassword}
                                //value={this.state.password}
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} />

                            <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                underlineColorAndroid="transparent"
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                placeholderTextColor="#6F6F6F"
                                autoCapitalize="none"
                                onChangeText={this.handleConfirmPassword}
                                //value={this.state.password}
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} /> */}


                            <TouchableOpacity
                                style={Device.isTablet ? styles.createButton_tablet : styles.createButton_mobile}
                                onPress={() => this.create()} >
                                <Text style={Device.isTablet ? styles.createButtonText_tablet : styles.createButtonText_mobile}> {I18n.t("SEND")}  </Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </SafeAreaView>

            </KeyboardAwareScrollView>
        );
    }
}

export default UpdateNewpassword;


const pickerSelectStyles = StyleSheet.create({
    placeholder: {
        color: '#456CAF55',
        fontWeight: "800",
        fontSize: 16,
    },
    inputIOS: {
        marginLeft: 0,
        marginRight: 0,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#456CAF55',
        color: '#001B4A',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputAndroid: {
        marginLeft: 0,
        marginRight: 0,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#456CAF55',
        color: '#001B4A',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

const styles = StyleSheet.create({
    logoImage: {
        alignSelf: 'center',
        width: 300,
        height: 230,
    },
    errorRecords: {
        color: '#dd0000',
        fontSize: Device.isTablet ? 17 : 12,
        marginLeft: 30,
    },
    containerForActivity: {
        flex: 1,
        backgroundColor: '#623FA0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewswidth: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 84,
    },
    signUptext: {
        marginTop: 40,
        fontFamily: "bold",
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 20,
    },
    title: {
        color: 'white',
        fontSize: 20,
        margin: 20
    },
    imagealign: {
        marginTop: 18,
        marginLeft: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        height: deviceheight + 40,
        backgroundColor: '#FFFFFF'
    },
    ytdImageValue: {
        alignSelf: 'center',
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
        height: 25,
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

    createButton_mobile: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        width: deviceWidth - 40,
        height: 50,
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    createButtonText_mobile: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: "regular",
    },
    // signInFieldStyle: {
    //     color: '#456CAF55',
    //     marginLeft: 30,
    //     marginTop: 15,
    //     fontSize: 12,
    //     fontFamily: "regular",
    // },

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
        fontSize: RF(20),
    },
    inputError_tablet: {
        justifyContent: 'center',
        marginLeft: RW(20),
        marginRight: RW(20),
        height: RH(54),
        marginTop: RH(5),
        marginBottom: RH(10),
        borderColor: '#dd0000',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 2,
        fontFamily: 'regular',
        paddingLeft: RW(15),
        fontSize: RF(20),
    },
    createButton_tablet: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: RW(20),
        marginRight: RW(20),
        marginTop: RH(20),
        width: deviceWidth - RW(40),
        height: RH(60),
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    createButtonText_tablet: {
        color: 'white',
        alignSelf: 'center',
        fontSize: RF(20),
        fontFamily: "regular",
    },
});