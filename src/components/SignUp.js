import React, { Component } from 'react'
import {View, Image, ImageBackground, Text, ActivityIndicator,TouchableOpacity, TextInput, StyleSheet, Dimensions, scrollview, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var deviceheight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
import Icons from 'react-native-vector-icons/MaterialIcons';
// import Routes from "./routes";
// import LeftSideBar from "./leftsidebar";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
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
               
                <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                <TouchableOpacity onPress={this.handleBackButtonClick}>
                <Text style={styles.viewswidth}>SIGN UP</Text>
                <Icons name={'arrow-back'} size={30} color='#ffffff' style={{  position: 'absolute',
                left: 5,
                top:25}}/>
                </TouchableOpacity>
            </View>
   
                        <View style={styles.container}>
                        <View style={{ justifyContent: 'center', alignSelf: 'center',marginTop:50 }}>
                            {/* <Text></Text> */}
                            <Text style={styles.signInText}> Sign Up </Text>
                            <Text style={styles.signinContinueText}> Enter your personal Details </Text>
                        </View>

                        <View style={{ flex: 0.2 }}>
                        
                        </View>

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
      viewswidth: {
        backgroundColor: '#0196FD',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        color: '#FFFFFF',
        height:84,
        fontFamily: "bold",
        textAlignVertical: "center",
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
        marginLeft: 30,
        marginRight: 30,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#456CAF55',
        color:'#001B4A',
        fontFamily: "bold",
        fontSize: 16,
    },
    passwordInput: {
          marginLeft: 30,
          marginRight: 30,
          height: 40,
          marginBottom:5,
          borderBottomWidth: 1,
          borderBottomColor: '#0196FD',
          color:'#001B4A',
          fontFamily: "bold",
          fontSize: 16,
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
        fontSize: 20,
        fontFamily: "bold",
    },

    signInFieldStyle: {
        color: '#456CAF55',
        marginLeft: 30,
        marginTop:15,
        fontSize: 12,
        fontFamily: "regular",
    },
    signinContinueText: {
        color: '#456CAF55',
        alignSelf: 'center',
        marginTop:5,
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