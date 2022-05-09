import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RF, RH, RW } from '../../Responsive';
var deviceheight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

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
                <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                    <View style={styles.viewswidth}>
                        <TouchableOpacity style={{
                            position: 'absolute',
                            left: 10,
                            top: 20,
                            width: 20,
                            height: 20,
                        }} onPress={() => this.handleBackButtonClick()}>
                            <Image source={require('../assets/images/backButton.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        <View style={{ flex: 1, marginTop: '0%', backgroundColor: '#FFFFFF' }}>
                            <Text style={{
                                color: "#353C40", fontSize: 20, fontFamily: "bold", marginLeft: 10, marginTop: 20,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                fontSize: 28,
                            }}> Create Account </Text>

                            <View style={{ marginTop: 15, marginLeft: 18, flexDirection: 'row' }}>

                                <Text style={{ fontSize: 16, color: '#858585', fontFamily: "regular", }}> Already have a account /  </Text>
                                <TouchableOpacity
                                    onPress={() => this.signUpButtonClicked()} >
                                    <Text style={{ color: '#353C40', fontSize: 16, fontFamily: "bold", textDecorationLine: 'underline' }}> Sign In </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 6 }}>
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="NAME"
                                placeholderTextColor="#6F6F6F"
                                // textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleEmail}
                                // value={this.state.userName}
                                ref={inputemail => { this.emailValueInput = inputemail }} />


                            {/* <Text style={styles.signInFieldStyle}> Password </Text> */}
                            <TextInput style={styles.passwordInput}
                                underlineColorAndroid="transparent"
                                placeholder="EMAIL"
                                secureTextEntry={true}
                                placeholderTextColor="#6F6F6F"
                                autoCapitalize="none"
                                onChangeText={this.handlePassword}
                                //value={this.state.password}
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} />

                            <TextInput style={styles.passwordInput}
                                underlineColorAndroid="transparent"
                                placeholder="MOBILE NUMBER"
                                secureTextEntry={true}
                                placeholderTextColor="#6F6F6F"
                                autoCapitalize="none"
                                onChangeText={this.handlePassword}
                                //value={this.state.password}
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} />

                            <TextInput style={styles.passwordInput}
                                underlineColorAndroid="transparent"
                                placeholder="SELECT STORE"
                                secureTextEntry={true}
                                placeholderTextColor="#6F6F6F"
                                autoCapitalize="none"
                                onChangeText={this.handlePassword}
                                //value={this.state.password}
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} />

                            <TextInput style={styles.passwordInput}
                                underlineColorAndroid="transparent"
                                placeholder="CREATE PASSWORD"
                                secureTextEntry={true}
                                placeholderTextColor="#6F6F6F"
                                autoCapitalize="none"
                                onChangeText={this.handlePassword}
                                //value={this.state.password}
                                ref={inputpassword => { this.passwordValueInput = inputpassword }} />


                            <TextInput style={styles.passwordInput}
                                underlineColorAndroid="transparent"
                                placeholder="CONFIRM PASSWORD"
                                secureTextEntry={true}
                                placeholderTextColor="#6F6F6F"
                                autoCapitalize="none"
                                onChangeText={this.handlePassword}
                                //value={this.state.password}
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
        width: RW(300),
        height: RH(230),

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
        fontSize: RF(24),
        height: RH(84),
    },
    signUptext: {
        marginTop: 40,
        fontFamily: "bold",
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: RF(20),
    },
    title: {
        color: 'white',
        fontSize: RF(20),
        margin: RH(20)
    },
    imagealign: {
        marginTop: RH(18),
        marginLeft: 0,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        height: deviceheight + RH(40),
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
        marginLeft: RW(20),
        marginRight: RW(20),
        height: RH(50),
        backgroundColor: '#F6F6F6',
        borderColor: '#F6F6F6',
        color: '#6F6F6F',
        fontFamily: "regular",
        borderWidth: 5,
       fontSize: RF(14),
    },
    passwordInput: {
        marginLeft: RW(20),
        marginRight: RW(20),
        height: RH(50),
        marginBottom: 5,
        marginTop: RH(20),
        backgroundColor: '#F6F6F6',
        borderColor: '#F6F6F6',
        color: '#6F6F6F',
        fontFamily: "regular",
        borderWidth: 5,
       fontSize: RF(14),
    },
    signInButton: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: RW(20),
        marginRight: RW(20),
        marginTop: RH(30),
        height: RH(44),
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    signInText: {
        color: '#002C46',
        alignSelf: 'center',
        fontSize: RF(20),
        fontFamily: "bold",
    },

    signInFieldStyle: {
        color: '#456CAF55',
        marginLeft: RW(30),
        marginTop: RH(15),
        fontSize: RF(12),
        fontFamily: "regular",
    },
    signinContinueText: {
        color: '#456CAF55',
        alignSelf: 'center',
        marginTop: 5,
        fontSize: RF(13),
        fontFamily: "regular",
    },
    getStartedText: {
        color: 'black',
        alignSelf: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
       fontSize: RF(14)
    },
    signInButtonText: {
        color: 'white',
        alignSelf: 'center',
        fontFamily: "regular",
       fontSize: RF(14),
    },
    spinnerTextalign: {
        flex: 9.4,
        color: '#A2A2A2',
        justifyContent: 'center',
        textAlign: "center",
        color: 'black',
    },
})