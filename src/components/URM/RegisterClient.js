import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var deviceheight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
import Device from 'react-native-device-detection';

class RegisterClient extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            userName: '',
            organization:"",
            mobile:'',
            userEmail:"",
            address:"",
        }
    }

    componentDidMount() {
     

    }
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleName = (text) => {
        this.setState({ userName: text })
    }

    handleOrganization = (text) => {
        this.setState({ organization: text })
    }

    handleMobile = (text) => {
        this.setState({ mobile: text })
    }

    handleEmail = (text) => {
        this.setState({ userEmail: text })
    }
    handleAddress = (text) => {
        this.setState({ address: text })
    }

   

    create() {
        if (this.state.name.length === 0) {
            alert('You must enter a name');
        } else if (this.state.mobile.length !== 10) {
            alert('You must enter a valid mobile number');
        }
        else if (this.state.userEmail.length === 0) {
            alert('You must enter a email');
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
                    <View style={styles.viewswidth}>
                        <TouchableOpacity style={{
                            position: 'absolute',
                            // left: 10,
                            // top: 20,
                            // width: 20,
                            // height: 20,

                            left: 10,
                            top: 30,
                            width: 40,
                            height: 40,
                        }} onPress={() => this.handleBackButtonClick()}>
                            <Image source={require('../assets/images/backButton.png')} />
                        </TouchableOpacity>

                        {/* <Text style={styles.signUptext}> Sign Up </Text>
                        <Icons name={'arrow-back'} size={30} color='#ffffff' onPress={this.handleBackButtonClick} style={{
                            position: 'absolute',
                            left: 5,
                            top: 35
                        }} /> */}
                    </View>

                    <View style={styles.container}>
                        <View style={{ flex: 1, marginTop: '0%', backgroundColor: '#FFFFFF' }}>
                            {/* <Image source={require('../assets/images/logo.png')} style={styles.logoImage} /> */}
                            {/* <Text></Text> */}
                            <Text style={{
                                color: "#353C40", fontSize: 20, fontFamily: "bold", marginLeft: 10, marginTop: 20,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                fontSize: 28,
                            }}> Forgot Password </Text>
                        </View>



                        <View style={{ flex: 6 }}>
                            {/* <Text style={styles.signInFieldStyle}> User Name </Text> */}
                            <TextInput style={Device.isTablet ? styles.tabletinput : styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Name"
                                placeholderTextColor="#6F6F6F"
                                // textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleName}
                                value={this.state.userName} />

<TextInput style={Device.isTablet ? styles.tabletinput : styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Name"
                                placeholderTextColor="#6F6F6F"
                                // textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleName}
                                value={this.state.userName} />


                            {/* <Text style={styles.signInFieldStyle}> Password </Text> */}
                            <TextInput style={styles.passwordInput}
                                underlineColorAndroid="transparent"
                                placeholder="Confirmation Code"
                                secureTextEntry={true}
                                placeholderTextColor="#6F6F6F"
                                autoCapitalize="none"
                                onChangeText={this.handleCode}
                                //value={this.state.password}
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} />

                            <TextInput style={styles.passwordInput}
                                underlineColorAndroid="transparent"
                                placeholder="New Password"
                                secureTextEntry={true}
                                placeholderTextColor="#6F6F6F"
                                autoCapitalize="none"
                                onChangeText={this.handleNewPassword}
                                //value={this.state.password}
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} />

                            <TextInput style={styles.passwordInput}
                                underlineColorAndroid="transparent"
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                placeholderTextColor="#6F6F6F"
                                autoCapitalize="none"
                                onChangeText={this.handleConfirmPassword}
                                //value={this.state.password}
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} />


                            <TouchableOpacity
                                style={styles.signInButton}
                                onPress={() => this.create()} >
                                <Text style={styles.signInButtonText}> CREATE  </Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                </SafeAreaView>

            </KeyboardAwareScrollView>
        )
    }
}

export default RegisterClient


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
    input: {
        marginTop: 20,
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
        tabletinput: {
            marginTop: 20,
            marginLeft: 20,
            marginRight: 20,
            height: 60,
            backgroundColor: '#F6F6F6',
            borderColor: '#F6F6F6',
            color: '#6F6F6F',
            fontFamily: "regular",
            borderWidth: 5,
            fontSize: 18,
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
        marginTop: 30,
        height: 44,
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    signInText: {
        color: '#002C46',
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: "bold",
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
        marginTop: 5,
        fontSize: 13,
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
        fontFamily: "regular",
        fontSize: 14,
    },
    spinnerTextalign: {
        flex: 9.4,
        color: '#A2A2A2',
        justifyContent: 'center',
        textAlign: "center",
        color: 'black',
    },
})