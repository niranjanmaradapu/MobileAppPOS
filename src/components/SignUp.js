import React, { Component } from 'react'
import {View, Image, ImageBackground, Text, ActivityIndicator,TouchableOpacity, TextInput, StyleSheet, Dimensions, scrollview, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var deviceheight = Dimensions.get('window').height;
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import NewSale from './NewSale';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import LoginService from './services/LoginService';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import Loader from './loader';
import * as Font from 'expo-font';
var deviceheight = Dimensions.get('window').height;
// import Routes from "./routes";
// import LeftSideBar from "./leftsidebar";

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


class SignUp extends Component {
    constructor(props){
        super(props);
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
                <SafeAreaView style={{ flex: 1,backgroundColor:'#FFFFFF'}}>
                        <View style={styles.container}>
                        <View style={{ justifyContent: 'center', alignSelf: 'center',marginTop:50 }}>
                            {/* <Text></Text> */}
                            <Text style={styles.signInText}> Sign Up </Text>
                            <Text style={styles.signinContinueText}> Enter your personal Details </Text>
                        </View>

                        {/* <View style={{ flex: 0.2 }}>
                            <Text style={styles.getStartedText}> MEMBER LOGIN</Text>
                        </View> */}

                        <View style={{ flex: 2}}>
                        <Text style={styles.signInFieldStyle}> User Name </Text>
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Username"
                                placeholderTextColor="#001B4A55"
                               // textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleEmail}
                                ref={inputemail => { this.emailValueInput = inputemail }} />

<Text style={styles.signInFieldStyle}> Email </Text>
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Email"
                                placeholderTextColor="#001B4A55"
                               // textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleEmail}
                                ref={inputemail => { this.emailValueInput = inputemail }} />
                                 
                                 
                          <Text style={styles.signInFieldStyle}> Password </Text>
                            <TextInput style={styles.passwordInput}
                                underlineColorAndroid="transparent"
                                placeholder="Password"
                                secureTextEntry={true}
                                placeholderTextColor="#001B4A55"
                                autoCapitalize="none"
                                onChangeText={this.handlePassword}
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} />

<Text style={styles.signInFieldStyle}> Confirm Password </Text>
                            <TextInput style={styles.passwordInput}
                                underlineColorAndroid="transparent"
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                placeholderTextColor="#001B4A55"
                                autoCapitalize="none"
                                onChangeText={this.handlePassword}
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} />
                                
                             
                          
                            <TouchableOpacity
                                style={styles.signInButton}
                                onPress={() => this.login()} >
                                <Text style={styles.signInButtonText}> CREATE ACCOUNT </Text>
                            </TouchableOpacity>

                        </View>
                        </View>
                        </SafeAreaView>
                 
            </KeyboardAwareScrollView>
        )
    }
}

export default SignUp

const pickerSelectStyles = StyleSheet.create({
    placeholder :{
        color:'#456CAF55',
        fontWeight: "800",
        fontSize: 16,   
    },
    inputIOS: {
        // flexDirection: 'row',
        // marginLeft: 0,
        // marginRight: 0,
        // marginTop: 2,
        // height: 34,
        // borderColor: '#AAAAAA',
        // backgroundColor: 'white',
        // color: 'black',
        // textAlign: 'center',
        marginLeft: 0,
        marginRight: 0,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#456CAF55',
        color:'#001B4A',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputAndroid: {
        // flexDirection: 'row',
        // marginLeft: 84,
        // marginRight: 24,
        // marginTop: 2,
        // height: 34,
        // width: 400,
        // justifyContent: 'center',
        // borderColor: '#AAAAAA',
        // borderRadius: 8,
        // backgroundColor: 'white',
        // color: 'black',
        // borderWidth: 1,
        // padding: 10,
        // textAlign: 'center',
        marginLeft: 0,
        marginRight: 0,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#456CAF55',
        color:'#001B4A',
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
      title: {
        color: 'white',
        fontSize: 20,
        margin: 20
      },
      imagealign: {
        marginTop: 18,
        marginLeft:0,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        height: deviceheight+40,
        backgroundColor:'#FFFFFF'
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
      //  justifyContent: 'center',
      //  textAlign: 'center',
      //  margin: 13,
        marginLeft: 30,
        marginRight: 30,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#456CAF55',
        color:'#001B4A',
        fontWeight: 'bold',
        fontSize: 16,
       // borderColor: '#AAAAAA',
      //  borderRadius: 5,
       // backgroundColor: 'white',
      //  borderWidth: 1
    },
    passwordInput: {
        //  justifyContent: 'center',
        //  textAlign: 'center',
        //  margin: 13,
          marginLeft: 30,
          marginRight: 30,
          height: 40,
          marginBottom:5,
          borderBottomWidth: 1,
          borderBottomColor: '#0196FD',
          color:'#001B4A',
          fontWeight: 'bold',
          fontSize: 16,
         // borderColor: '#AAAAAA',
        //  borderRadius: 5,
         // backgroundColor: 'white',
        //  borderWidth: 1
      },
    signInButton: {
        backgroundColor:'#0196FD',
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30,
        marginTop:50,
        height: 55,
        borderRadius: 30,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    signInText: {
        color: '#002C46',
        alignSelf: 'center',
        fontSize: 28,
        //fontFamily: 'Metropolis-bold',
        fontWeight: 'bold',
    },

    signInFieldStyle: {
        color: '#456CAF55',
        marginLeft: 30,
        marginTop:15,
       // marginBottom:15,
       // alignSelf: 'center',
        fontSize: 13,
       // fontFamily: 'Metropolis-bold',
        fontWeight: 'normal',
    },
    signinContinueText: {
        color: '#456CAF55',
        alignSelf: 'center',
        fontSize: 13,
       // fontFamily: 'Metropolis-bold',
        fontWeight: 'normal',
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
        fontWeight: 'bold',
        fontSize: 16,
    },
    spinnerTextalign: {
        flex: 9.4,
        color: '#A2A2A2',
        justifyContent: 'center',
        textAlign: "center",
        color: 'black',
    },
})