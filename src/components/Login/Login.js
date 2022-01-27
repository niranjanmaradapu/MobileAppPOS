import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import React, { Component } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../commonUtils/loader';
import LoginService from '../services/LoginService';
import ProfileService from '../services/ProfileService';
import UrmService from '../services/UrmService';
var deviceheight = Dimensions.get('window').height;
var deviceheight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get("window").width;


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

global.previlage1 = '';
global.previlage2 = '';
global.previlage3 = '';
global.previlage4 = '';
global.previlage5 = '';
global.previlage6 = '';
global.previlage7 = '';
global.previlage8 = '';
global.username = '';
global.userrole = '';
global.domainName = '';
global.userrole = '';



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rememberMe: false,
            redirect: false,
            isAuth: false,
            userName: 'mangosuper2',
            password: 'Otsi@123',
            dropValue: '',
            store: 0,
            user: {
                name: "prasannaaa"
            },
            storeNames: [],
            sessionData: '',
            roleName: '',


        };
        console.log(process.env.REACT_APP_BASE_URL);
    }

    toggleRememberMe = value => {
        this.setState({ rememberMe: value });
        if (value === true) {
            this.rememberUser();
        } else {
            this.forgetUser();
        }
    };

    forgetUser = async () => {
        try {
            await AsyncStorage.removeItem('Longtail-User');
        } catch (error) {
        }
    };

    handleEmail = (text) => {
        this.setState({ userName: text });
    };
    handlePassword = (text) => {
        this.setState({ password: text });
    };
    handleStore = (value) => {
        this.setState({ store: value });
    };

    registerClient() {
        console.log('adsadasdd');
        this.props.navigation.navigate('RegisterClient');
    }

    login() {
        AsyncStorage.removeItem('tokenkey');
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
            };
            AsyncStorage.setItem("username", this.state.userName);
            AsyncStorage.removeItem('tokenkey');
            AsyncStorage.removeItem('custom:clientId1');
            AsyncStorage.removeItem('phone_number');
            AsyncStorage.removeItem('domainDataId');
            AsyncStorage.removeItem('storeId');
            AsyncStorage.removeItem('custom:isSuperAdmin');
            AsyncStorage.removeItem('custom:isConfigUser');
            AsyncStorage.removeItem('domainName');

            console.log(LoginService.getAuth() + JSON.stringify(params));
            this.setState({ loading: true });
            axios.post(LoginService.getAuth(), params).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {

                    if (res.data.result.authenticationResult) {
                        const token = res.data.result.authenticationResult.idToken;
                        //==============================Token Key & phone number save ===================//
                        AsyncStorage.setItem("tokenkey", JSON.stringify(token)).then(() => {
                        }).catch(() => {
                            console.log('there is error saving token');
                        });

                        AsyncStorage.getItem("tokenkey").then((value) => {
                            var finalToken = value.replace('"', '');
                            console.log(finalToken);
                            axios.defaults.headers.common = { 'Authorization': 'Bearer' + ' ' + finalToken };
                            //console.log("Request to server:::::::::::::::::::" + 'Bearer' + ' ' + finalToken);
                        });

                        AsyncStorage.setItem("phone_number", jwt_decode(token)["phone_number"]).then(() => {
                            // console.log
                        }).catch(() => {
                            console.log('there is error saving domainDataId');
                        });

                        AsyncStorage.setItem("rolename", jwt_decode(token)["custom:roleName"]).then(() => {

                            // console.log
                        }).catch(() => {
                            console.log('there is error saving domainDataId');
                        });

                        AsyncStorage.setItem("custom:clientId1", jwt_decode(token)["custom:clientId1"]).then(() => {
                            // console.log
                        }).catch(() => {
                            console.log('there is error saving domainDataId');
                        });

                        //==============================Navigation===================//
                        if (jwt_decode(token)["custom:isSuperAdmin"] === "true") {
                            AsyncStorage.setItem("custom:isSuperAdmin", "true").then(() => {
                                // console.log
                            }).catch(() => {

                            });
                            AsyncStorage.setItem("custom:isConfigUser", "false").then(() => {
                                // console.log
                            }).catch(() => {

                            });


                            this.getDomainsList();
                        }
                        else if (jwt_decode(token)["custom:isConfigUser"] === "true") {

                            AsyncStorage.setItem("custom:isConfigUser", "true").then(() => {
                                // console.log
                            }).catch(() => {

                            });

                            axios.get(ProfileService.getUser() + this.state.userName).then((res) => {
                                if (res.data && res.data["isSuccess"] === "true") {
                                    global.username = res.data["result"].userName;
                                    global.domainName = '';
                                }
                            }).catch(() => {
                                this.setState({ loading: false });
                                alert('No user details get');
                            });

                            global.previlage1 = '';
                            global.previlage2 = '';
                            global.previlage3 = '';
                            global.previlage4 = '';
                            global.previlage6 = '';
                            global.previlage7 = 'URM Portal';
                            global.previlage5 = 'Accounting Portal';
                            AsyncStorage.getItem("rolename").then((value) => {
                                global.userrole = value;
                            }).catch(() => {
                                console.log('there is error getting storeId');
                            });



                            this.props.navigation.navigate('HomeNavigation');
                        }
                        else {
                            this.getDomainsForNormalUser();


                            AsyncStorage.setItem("domainDataId", jwt_decode(token)["custom:domianId1"]).then(() => {
                                this.getDomainsForNormalUser();
                                // console.log
                            }).catch(() => {
                                console.log('there is error saving domainDataId');
                            });

                            this.getstoresForNormalUser();
                        }

                        // const clientDomainId = user["custom:clientDomians"].split(",")[0];
                        // AsyncStorage.setItem("clientDomainId", JSON.stringify(clientDomainId)).then(() => {
                        // }).catch(() => {
                        //     console.log('there is error saving token')
                        // })


                        this.setState({ loading: false });
                    }
                    else {
                        if (res.data.result.challengeName === "NEW_PASSWORD_REQUIRED") {
                            this.setState({ loading: false });
                            const roleData = res.data.result
                                ? JSON.parse(res.data.result.challengeParameters.userAttributes)
                                : "";
                            this.props.navigation.navigate('ManagePassword', {
                                session: res.data.result.session,
                                roleName: roleData["custom:roleName"],
                                userName: this.state.userName,
                                password: this.state.password,
                            });
                            console.log(this.state.sessionData);
                            console.log(this.state.roleName);
                        }
                    }

                }
                else {
                    alert('Invalid Credentials');
                    this.emailValueInput.clear();
                    this.passwordValueInput.clear();
                    this.setState({ userName: '', password: '', selectedOption: null, loading: false });
                }


            }


            );
        }
    }


    async getDomainsList() {
        const clientId = await AsyncStorage.getItem("custom:clientId1");

        axios.get(LoginService.getDomainsList() + clientId).then((res) => {
            if (res.data["result"][0]) {
                console.log('sdasdasdsadasdsasfsfssaf' + res.data["result"]);
                if (res.data["result"].length > 1) {
                    this.props.navigation.navigate('SelectDomain');
                }
                else {
                    console.log('vinoddddgfgfgdgg');
                    AsyncStorage.setItem("domainDataId", String(res.data.result[0].clientDomainaId)).then(() => {
                        // console.log

                    }).catch(() => {
                        console.log('there is error saving token');
                    });
                    AsyncStorage.setItem("domainName", res.data.result[0].domaiName).then(() => {
                        // console.log

                    }).catch(() => {
                        console.log('there is error saving token');
                    });
                    this.getstoresForSuperAdmin();
                }
            }
        });
    }

    async getDomainsForNormalUser() {
        AsyncStorage.getItem("domainDataId").then((value) => {
            console.log('sdasfsafsafsfaasf' + value);
            var domainNames = [];
            axios.get(UrmService.getDomainName() + value).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                    console.log(res.data.result);
                    AsyncStorage.setItem("domainName", res.data.result.domaiName).then(() => {
                        // console.log

                    }).catch(() => {
                        console.log('there is error saving token');
                    });
                }

            });

        }).catch(() => {
            console.log('there is error saving token');
        });
    }


    async getstoresForSuperAdmin() {
        const username = await AsyncStorage.getItem("domainDataId");
        const params = {
            "clientDomianId": username
        };
        console.log('sfsdfsdff' + params);
        axios.get(LoginService.getUserStoresForSuperAdmin(), { params }).then((res) => {
            let len = res.data["result"].length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    if (res.data["result"].length > 1) {

                        this.props.navigation.navigate('SelectStore', { isFromDomain: false });

                    }
                    else {
                        AsyncStorage.setItem("storeId", String(res.data.result[0].id)).then(() => {
                        }).catch(() => {
                            console.log('there is error saving storeName');
                        });
                        this.props.navigation.navigate('HomeNavigation');
                    }
                }
            }
        });
    }


    async getstoresForNormalUser() {
        const username = await AsyncStorage.getItem("username");

        axios.get(LoginService.getUserStores() + username).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {
                    let number = res.data.result[i];
                    const myArray = [];
                    myArray = number.split(":");
                    this.state.storeNames.push({ name: myArray[0], id: myArray[1] });
                }
                this.setState({ storeNames: this.state.storeNames });
                AsyncStorage.setItem("storeId", (this.state.storeNames[0].id).toString()).then(() => {
                }).catch(() => {
                    console.log('there is error saving token');
                });


                if (this.state.storeNames.length === 1) {
                    this.props.navigation.navigate('HomeNavigation');
                }
                else {
                    this.props.navigation.navigate('SelectStore', { isFromDomain: false });
                }
            }
        });
    }



    forgotPassword() {

        this.props.navigation.navigate('ForgotPassword', { username: this.state.userName });

    }

    async componentDidMount() {
        AsyncStorage.removeItem('phone_number');
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
                            <Image source={require('../assets/images/Subtraction.png')} style={Device.isTablet ? styles.bottomImage_tablet : styles.bottomImage_mobile} />
                            <View style={{ flex: 1, marginTop: '5%', backgroundColor: '#FFFFFF' }}>
                                {/* <Image source={require('../assets/images/logo.png')} style={styles.logoImage} /> */}
                                {/* <Text></Text> */}
                                <Text style={Device.isTablet ? styles.headerText_tablet : styles.hederText_mobile}> {I18n.t('Hey')} </Text>
                                <Text style={Device.isTablet ? styles.headerText2_tablet : styles.headerText2_mobile}> {I18n.t('Login Now')} </Text>
                                {/* <View style={{ marginTop: 15, marginLeft: 18, flexDirection: 'row' }}>

                                    <Text style={{ fontSize: 16, color: '#858585', fontFamily: "regular", }}>If you are new / </Text>
                                    <TouchableOpacity
                                        onPress={() => this.signUpButtonClicked()} >
                                        <Text style={{ color: '#353C40', fontSize: 16, fontFamily: "bold", textDecorationLine: 'underline' }}> Create Account </Text>
                                    </TouchableOpacity>
                                </View> */}


                            </View>



                            <View style={{ flex: 2 }}>
                                <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                    underlineColorAndroid="transparent"
                                    placeholder={I18n.t('Username')}
                                    placeholderTextColor="#6F6F6F"
                                    // textAlignVertical="center"
                                    autoCapitalize="none"
                                    onChangeText={this.handleEmail}
                                    value={this.state.userName}
                                    ref={inputemail => { this.emailValueInput = inputemail; }} />


                                <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                    underlineColorAndroid="transparent"
                                    placeholder={I18n.t('Password')}
                                    secureTextEntry={true}
                                    placeholderTextColor="#6F6F6F"
                                    autoCapitalize="none"
                                    onChangeText={this.handlePassword}
                                    value={this.state.password}
                                    ref={inputpassword => { this.passwordValueInput = inputpassword; }} />

                                <View>
                                    <View style={{ flexDirection: "column" }}>

                                        <View style={{
                                            position: 'absolute',
                                            right: 20,
                                            top: 35, alignItems: 'center', flexDirection: 'row'
                                        }}>




                                            <Text style={Device.isTablet ? styles.navigationText_tablet : styles.navigationText_mobile}> {I18n.t('Forgot password')} </Text>
                                            <TouchableOpacity
                                                onPress={() => this.forgotPassword()} >
                                                <Text style={Device.isTablet ? styles.navigationButtonText_tablet : styles.navigationButtonText_mobile}> {I18n.t('Reset')} </Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{
                                            position: 'absolute',
                                            left: 20,
                                            top: 35, alignItems: 'center', flexDirection: 'row'
                                        }}>
                                            <Text style={Device.isTablet ? styles.navigationText_tablet : styles.navigationText_mobile}> {'Register?'} </Text>
                                            <TouchableOpacity
                                                onPress={() => this.registerClient()} >
                                                <Text style={Device.isTablet ? styles.navigationButtonText_tablet : styles.navigationButtonText_mobile}> {'Register'} </Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={Device.isTablet ? styles.signInButton_tablet : styles.signInButton_mobile}
                                    onPress={() => this.login()} >
                                    <Text style={Device.isTablet ? styles.signInButtonText_tablet : styles.signInButtonText_mobile}> {I18n.t('SIGN IN')} </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </SafeAreaView>

                </View>

            </KeyboardAwareScrollView>
        );
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
});

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

    // Mobile Styles
    hederText_mobile: {
        color: "#353C40",
        fontSize: 20,
        fontFamily: "bold",
        marginLeft: 10,
        marginTop: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize: 28,
    },
    headerText2_mobile: {
        color: "#353C40",
        fontSize: 20,
        fontFamily: "bold",
        marginLeft: 10,
        marginTop: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        height: 45,
        fontSize: 28,
    },
    bottomImage_mobile: {
        position: 'absolute',
        right: 0,
        bottom: 40,
        width: 162,
        height: 170
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
    signInButton_mobile: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 100,
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
    navigationText_mobile: {
        fontSize: 16,
        color: '#858585',
        fontFamily: "regular",
    },
    navigationButtonText_mobile: {
        color: '#353C40',
        fontSize: 16,
        fontFamily: "bold",
        textDecorationLine: 'underline'
    },

    // Tablet Styles
    headerText_tablet: {
        color: "#353C40",
        fontSize: 40,
        fontFamily: "bold",
        marginLeft: 10,
        marginTop: 100,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    headerText2_tablet: {
        color: "#353C40",
        fontSize: 40,
        fontFamily: "bold",
        marginLeft: 10,
        marginTop: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        height: 55,
    },
    bottomImage_tablet: {
        position: 'absolute',
        right: 0,
        bottom: 40,
        width: 202,
        height: 230
    },
    input_tablet: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        height: 60,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 22,
    },
    signInButton_tablet: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 100,
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
    navigationText_tablet: {
        fontSize: 22,
        color: '#858585',
        fontFamily: "regular",
    },
    navigationButtonText_tablet: {
        color: '#353C40',
        fontSize: 22,
        fontFamily: "bold",
        textDecorationLine: 'underline'
    },
});;

// Unused Styles
// {
//     signInFieldStyle: {
//         color: '#456CAF55',
//         marginLeft: 30,
//         marginTop: 15,
//         fontSize: 12,
//         fontFamily: "regular",
//     },
//     signinContinueText: {
//         color: '#456CAF55',
//         alignSelf: 'center',
//         fontSize: 13,
//         marginTop: 5,
//         fontFamily: "regular",
//     },
// getStartedText: {
//     color: 'black',
//     alignSelf: 'center',
//     fontStyle: 'normal',
//     fontWeight: 'bold',
//     fontSize: 14
// },
// signInText: {
//     color: '#002C46',
//     alignSelf: 'center',
//     fontSize: 28,
//     fontFamily: "bold",
//     marginTop: 25,
// },
// spinnerTextalign: {
//     flex: 9.4,
//     color: '#A2A2A2',
//     justifyContent: 'center',
//     textAlign: "center",
//     color: 'black',
// },
// }