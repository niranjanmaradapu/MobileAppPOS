import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var deviceheight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
import Device from 'react-native-device-detection';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            userName: '',
            code: '',
            newPassword: '',
            confirmPassword: '',
        }
    }

    componentDidMount() {
        this.setState({
            userName: this.props.route.params.username,
        });

    }
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleEmail = (text) => {
        this.setState({ userName: text })
    }
    handleCode = (text) => {
        this.setState({ code: text })
    }

    handleNewPassword = (text) => {
        this.setState({ newPassword: text })
    }

    handleConfirmPassword = (text) => {
        this.setState({ confirmPassword: text })
    }

    create() {
        if (this.state.userName.length === 0) {
            alert('You must enter a Usename');
        } else if (this.state.code.length === 0) {
            alert('You must enter a code recieved in mail');
        }
        else if (this.state.newPassword.length === 0) {
            alert('You must enter a new password');
        }
        else if (this.state.confirmPassword.length === 0) {
            alert('You must enter a confirm password');
        }
        else if (this.state.newPassword !== this.state.confirmPassword) {
            alert('new and confirm passwords are not matched');
        }

        else {
            alert('Please enter correct code recieved in mail');
            // this.props.navigation.goBack(null);
            //         const params = {
            //             "username": this.state.userName, //"+919493926067",
            //             "confirmarionCode": this.state.code, //"Mani@1123",
            //             "newPassword": this.state.newPassword,
            //             //"storeName": this.state.store,//"kphb",
            //         }
            //         AsyncStorage.setItem("username", this.state.userName);
            //         console.log(LoginService.getAuth() + JSON.stringify(params))
            //         this.setState({ loading: true })
            //         axios.post(LoginService.forgotPassword(),null, { params: {
            //             "username": this.state.userName, //"+919493926067",
            //             "confirmarionCode": this.state.code, //"Mani@1123",
            //             "newPassword": this.state.newPassword,
            //            }}).then((res) => {
            //             if (res.data && res.data["isSuccess"] === "true") {
            //             this.setState({ loading: false })
            //             this.props.navigation.goBack(null);
            //         }
            //             else {
            //                 this.setState({ loading: false })
            //                 alert('Invalid Credentials');
            //                // this.props.navigation.goBack(null);
            //                // this.state.store = ""
            //                 // this.state.store.clear()
            //             }
            //         }
            //         );
        }
    }


    render() {
        return (
            <KeyboardAwareScrollView KeyboardAwareScrollView
                enableOnAndroid={true}>
                {/* <View style={styles.container}>
                    {this.state.loading &&
                    <Loader
                    loading={this.state.loading} />
                }  */}
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
                            Forgot Password
                        </Text>
                    </View>
                        </View>



                        <View style={{ flex: 6 }}>
                            {/* <Text style={styles.signInFieldStyle}> User Name </Text> */}
                            <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                underlineColorAndroid="transparent"
                                placeholder="User Name"
                                placeholderTextColor="#6F6F6F"
                                // textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleEmail}
                                value={this.state.userName}
                                ref={inputemail => { this.emailValueInput = inputemail }} />


                            {/* <Text style={styles.signInFieldStyle}> Password </Text> */}
                            <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                underlineColorAndroid="transparent"
                                placeholder="Confirmation Code"
                                secureTextEntry={true}
                                placeholderTextColor="#6F6F6F"
                                autoCapitalize="none"
                                onChangeText={this.handleCode}
                                //value={this.state.password}
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} />

                            <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
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
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} />


                            <TouchableOpacity
                                style={Device.isTablet ? styles.createButton_tablet : styles.createButton_mobile}
                                onPress={() => this.create()} >
                                <Text style={Device.isTablet ? styles.createButtonText_tablet : styles.createButtonText_mobile}> CREATE  </Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </SafeAreaView>

            </KeyboardAwareScrollView>
        )
    }
}

export default ForgotPassword


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

    createButton_mobile: {
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
        fontSize: 20,
    },
    createButton_tablet: {
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
    createButtonText_tablet: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: "regular",
    },
})