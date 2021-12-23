import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var deviceheight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
import Device from 'react-native-device-detection';
import Loader from '../loader';
import axios from 'axios';

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
        if (this.state.userName.length === 0) {
            alert('You must enter a name');
        } else if (this.state.mobile.length !== 10) {
            alert('You must enter a valid mobile number');
        }
        else if (this.state.userEmail.length === 0) {
            alert('You must enter a email');
        }
        else {
            alert('Please enter correct code recieved in mail');
            this.props.navigation.navigate('ManagePassword')
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
                        Register New Client
                    </Text>
                </View>
                <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Name"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.userName}
                        onChangeText={this.handleName}
                    />
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Mobile"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.mobile}
                        onChangeText={this.handleMobile}
                    />
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Email"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.userEmail}
                        onChangeText={this.handleEmail}
                    />
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Organisation"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.organization}
                        onChangeText={this.handleOrganization}
                    />
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Address"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.address}
                        onChangeText={this.handleAddress}
                    />
                    <TouchableOpacity style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile}
                        onPress={() => this.create()}>
                        <Text style={Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile}>SAVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile}
                        onPress={() => this.cancel()}>
                        <Text style={Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile}>CANCEL</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        )
    }
}

export default RegisterClient

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

})