import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, Image, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var deviceheight = Dimensions.get('window').height;
import LoginService from '../services/LoginService';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../loader';
var deviceheight = Dimensions.get('window').height;
import I18n from 'react-native-i18n';


const data = [
    {
        value: 1,
        label: "KALAMANDIR RAJAMUNDRY11111"
    },
    {
        value: 2,
        label: "KALAMANDIR AMALAPURAM"
    },
    {
        value: 3,
        label: "KALAMANDIR HYDERABAD"
    }
];


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rememberMe: false,
            redirect: false,
            isAuth: false,
            userName: 'vinodtest',
            password: 'Otsi@123',
            dropValue: '',
            store: 0,
            user: {
                name: "prasannaaa"
            },
            storeNames: []

        }
        console.log(process.env.REACT_APP_BASE_URL);
    }

    toggleRememberMe = value => {
        this.setState({ rememberMe: value })
        if (value === true) {
            this.rememberUser();
        } else {
            this.forgetUser();
        }
    }

    forgetUser = async () => {
        try {
            await AsyncStorage.removeItem('Longtail-User');
        } catch (error) {
        }
    };

    handleEmail = (text) => {
        this.setState({ userName: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }
    handleStore = (value) => {
        this.setState({ store: value });
    }



    login() {
        if (this.state.userName.length === 0) {
            alert('You must enter a Usename');
        } else if (this.state.password.length === 0) {
            alert('You must enter a Password');
        }
        else {
            const params = {
                "email": this.state.userName, //"+919493926067",
                "password": this.state.password, //"Mani@1123",
                //"storeName": this.state.store,//"kphb",
            }
            AsyncStorage.setItem("username", this.state.userName);
            console.log(LoginService.getAuth() + JSON.stringify(params))
            this.setState({ loading: true })
            axios.post(LoginService.getAuth(), params).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                    //console.log(res.data)
                    const token = res.data.result.authenticationResult.idToken
                    AsyncStorage.setItem("user", JSON.stringify(jwt_decode(token))).then(() => {
                        // console.log
                    }).catch(() => {
                        console.log('there is error saving token')
                    })
                    AsyncStorage.setItem("tokenkey", JSON.stringify(token)).then(() => {
                    }).catch(() => {
                        console.log('there is error saving token')
                    })
                    console.log("stores data----" + JSON.stringify(jwt_decode(token)["custom:clientDomians"]))
                    console.log("phone number is----" + JSON.stringify(jwt_decode(token)["phone_number"]))
                    AsyncStorage.setItem("phone_number", jwt_decode(token)["phone_number"]).then(() => {
                        // console.log
                    }).catch(() => {
                        console.log('there is error saving domainDataId')
                    })
                    // if (jwt_decode(token)["custom:clientDomians"] === "1,2,3" || jwt_decode(token)["custom:clientDomians"] === "1,2") {
                    //     // this.getModel();
                    //     this.props.navigation.navigate('SelectDomain')
                    // }
                    // else if (jwt_decode(token)["custom:clientDomians"] === "3,") {
                    // this.getModel();
                    var domainArray = jwt_decode(token)["custom:clientDomians"].split(',');
                    AsyncStorage.setItem("domainDataId", domainArray[0]).then(() => {
                        // console.log
                    }).catch(() => {
                        console.log('there is error saving domainDataId')
                    })
                    this.getstores()
                    this.setState({ loading: false })
                }
                else {
                    this.setState({ loading: false })
                    alert('Invalid Credentials');
                    this.emailValueInput.clear()
                    this.passwordValueInput.clear()
                    this.setState({ userName: '', password: '', selectedOption: null })
                }
            }
            );
        }
    }

    async getstores() {
        const username = await AsyncStorage.getItem("username");
        // console.log(LoginService.getUserStores() + "/" + username)
        var storeNames = [];
        axios.get(LoginService.getUserStores() + username).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {
                    storeNames.push(
                        res.data["result"][i]//id
                        // label: res.data["result"][i]['storeName']
                    );
                }
            }
            this.setState({
                storeNames: storeNames,
            })
            console.log('stores are--' + this.state.storeNames)
            if (this.state.storeNames.length === 1) {
                AsyncStorage.setItem("storeName", this.state.storeNames[0]).then(() => {
                }).catch(() => {
                    console.log('there is error saving storeName')
                })
                this.props.navigation.navigate('HomeNavigation')
            }
            else {
                this.props.navigation.navigate('SelectStore')
            }
        });
    }


    forgotPassword() {
        const params = {
            "username": this.state.userName, //"+919493926067",
            //"storeName": this.state.store,//"kphb",
        }
        AsyncStorage.setItem("username", this.state.userName);
        console.log(LoginService.forgotPasswordCodeSent() + JSON.stringify(params))
        // this.setState({ loading: true })
        axios.post(LoginService.forgotPasswordCodeSent(), null, {
            params: {
                "username": this.state.userName
            }
        }).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                //  this.setState({ loading: false })
                this.props.navigation.navigate('ForgotPassword', { username: this.state.userName });
            }
            else {
                this.setState({ loading: false })
                alert('Invalid Credentials');
                // this.props.navigation.goBack(null);
                // this.state.store = ""
                // this.state.store.clear()
            }
        }
        );
    }

    async componentDidMount() {
    }


    render() {
        return (
            <KeyboardAwareScrollView KeyboardAwareScrollView
                enableOnAndroid={true}>
                <View style={styles.container}>
                    {this.state.loading &&
                        <Loader
                            loading={this.state.loading} />
                    }
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <Image source={require('../assets/images/Subtraction.png')} style={{ position: 'absolute', right: 0, bottom: 40, width: 162, height: 170 }} />
                            <View style={{ flex: 1, marginTop: '5%', backgroundColor: '#FFFFFF' }}>
                                {/* <Image source={require('../assets/images/logo.png')} style={styles.logoImage} /> */}
                                {/* <Text></Text> */}
                                <Text style={{
                                    color: "#353C40", fontSize: 20, fontFamily: "bold", marginLeft: 10, marginTop: 100,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    fontSize: 28,
                                }}> {I18n.t('Hey')} </Text>
                                <Text style={{
                                    color: "#353C40", fontSize: 20, fontFamily: "bold", marginLeft: 10, marginTop: 0,
                                    flexDirection: 'column',
                                    justifyContent: 'center', height: 45,
                                    fontSize: 28,
                                }}> {I18n.t('Login Now')} </Text>
                                {/* <View style={{ marginTop: 15, marginLeft: 18, flexDirection: 'row' }}>

                                    <Text style={{ fontSize: 16, color: '#858585', fontFamily: "regular", }}>If you are new / </Text>
                                    <TouchableOpacity
                                        onPress={() => this.signUpButtonClicked()} >
                                        <Text style={{ color: '#353C40', fontSize: 16, fontFamily: "bold", textDecorationLine: 'underline' }}> Create Account </Text>
                                    </TouchableOpacity>
                                </View> */}


                            </View>



                            <View style={{ flex: 2 }}>
                                {/* <Text style={styles.signInFieldStyle}> User Name </Text> */}
                                <TextInput style={styles.input}
                                    underlineColorAndroid="transparent"
                                    placeholder={I18n.t('Username')}
                                    placeholderTextColor="#6F6F6F"
                                    // textAlignVertical="center"
                                    autoCapitalize="none"
                                    onChangeText={this.handleEmail}
                                    value={this.state.userName}
                                    ref={inputemail => { this.emailValueInput = inputemail }} />


                                {/* <Text style={styles.signInFieldStyle}> Password </Text> */}
                                <TextInput style={styles.passwordInput}
                                    underlineColorAndroid="transparent"
                                    placeholder={I18n.t('Password')}
                                    secureTextEntry={true}
                                    placeholderTextColor="#6F6F6F"
                                    autoCapitalize="none"
                                    onChangeText={this.handlePassword}
                                    value={this.state.password}
                                    ref={inputpassword => { this.passwordValueInput = inputpassword }} />

                                <View>
                                    <View style={{ flexDirection: "column" }}>

                                        <View style={{
                                            position: 'absolute',
                                            right: 20,
                                            top: 35, alignItems: 'center', flexDirection: 'row'
                                        }}>

                                            <Text style={{ fontSize: 16, color: '#858585', fontFamily: "regular", }}> {I18n.t('Forgot password')} </Text>
                                            <TouchableOpacity
                                                onPress={() => this.forgotPassword()} >
                                                <Text style={{ color: '#353C40', fontSize: 16, fontFamily: "bold", textDecorationLine: 'underline' }}> {I18n.t('Reset')} </Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.signInButton}
                                    onPress={() => this.login()} >
                                    <Text style={styles.signInButtonText}> {I18n.t('SIGN IN')} </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </SafeAreaView>

                </View>

            </KeyboardAwareScrollView>
        )
    }
}


const pickerSelectStyles = StyleSheet.create({
    placeholder: {
        color: "#6F6F6F",
        fontFamily: "regular",
        fontSize: 14,
    },
    inputIOS: {
        marginLeft: 0,
        marginRight: 0,
        height: 50,
        marginTop: 20,
        backgroundColor: '#F6F6F6',
        borderColor: '#F6F6F6',
        color: '#6F6F6F',
        fontFamily: "regular",
        borderWidth: 5,
        fontSize: 14,
    },
    inputAndroid: {
        marginLeft: 0,
        marginRight: 0,
        height: 50,
        marginTop: 20,
        backgroundColor: '#F6F6F6',
        borderColor: '#F6F6F6',
        color: '#6F6F6F',
        fontFamily: "regular",
        borderWidth: 5,
        fontSize: 14,
    },
})

const styles = StyleSheet.create({
    logoImage: {
        alignSelf: 'center',
        width: 300,
        height: 230,

    },
    containerForActivity: {
        flex: 1,
        backgroundColor: '#623FA0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        margin: 20
    },
    imagealign: {
        marginTop: 40,
        marginRight: 10,
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
    input: {
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        backgroundColor: '#F6F6F6',
        borderColor: '#F6F6F6',
        color: '#6F6F6F',
        fontFamily: "regular",
        borderWidth: 5,
        fontSize: 14,
    },
    passwordInput: {
        marginLeft: 20,
        marginRight: 20,
        height: 50,
        marginBottom: 5,
        marginTop: 20,
        backgroundColor: '#F6F6F6',
        borderColor: '#F6F6F6',
        color: '#6F6F6F',
        fontFamily: "regular",
        borderWidth: 5,
        fontSize: 14,
    },
    signInButton: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 100,
        height: 44,
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    signInText: {
        color: '#002C46',
        alignSelf: 'center',
        fontSize: 28,
        fontFamily: "bold",
        marginTop: 25,
    },

    signInFieldStyle: {
        color: '#456CAF55',
        marginLeft: 30,
        marginTop: 15,
        fontSize: 12,
        fontFamily: "regular",
    },
    signinContinueText: {
        color: '#456CAF55',
        alignSelf: 'center',
        fontSize: 13,
        marginTop: 5,
        fontFamily: "regular",
    },
    getStartedText: {
        color: 'black',
        alignSelf: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 14
    },
    signInButtonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: "regular",
    },
    spinnerTextalign: {
        flex: 9.4,
        color: '#A2A2A2',
        justifyContent: 'center',
        textAlign: "center",
        color: 'black',
    },
})