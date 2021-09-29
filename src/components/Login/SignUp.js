import React, { Component } from 'react'
import { View, Image, ImageBackground, Text, ActivityIndicator, TouchableOpacity, TouchableHighlight, TextInput, StyleSheet, Dimensions, scrollview, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
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
                            {/* <Text style={styles.signInFieldStyle}> User Name </Text> */}
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

                            {/* <Text style={styles.signInFieldStyle}> Store </Text> */}
                            {/* <View style={{
                                    marginLeft: 20,
                                    marginRight: 20,
                                    height: 50,
                                    marginBottom: 5,
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#0196FD',
                                    color: '#6F6F6F',
                                    fontWeight: 'regular',
                                    fontSize: 14,
                                }} > */}
                            {/* <RNPickerSelect style={{
                                        color: '#6F6F6F',
                                        fontWeight: 'regular',
                                        fontSize: 14
                                    }}
                                        placeholder={{
                                            label: 'Select Store',
                                            value: " ",
                                        }}
                                        Icon={() => {
                                            return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                        }}
                                        //items={this.state.storeNames}
                                        onValueChange={this.handleStore}
                                        style={pickerSelectStyles}
                                       // value={this.state.store}
                                        useNativeAndroidPickerStyle={false}

                                    /> */}
                            {/* </View> */}

                            {/* <View>
                                    <View style={{ flexDirection: "column" }}>
                                       

                                        <View style={{
                                            position: 'absolute',
                                            right: 20,
                                            top: 30, flexDirection: 'row'
                                        }}>

                                            <Text style={{ fontSize: 16, color: '#858585', fontFamily: "regular", }}> Forgot password? </Text>
                                            <TouchableOpacity
                                                onPress={() => this.signUpButtonClicked()} >
                                                <Text style={{ color: '#353C40', fontSize: 16, fontFamily: "bold", textDecorationLine: 'underline' }}> Reset </Text>
                                            </TouchableOpacity>
                                        </View>
                                        {/* <Text style={{
                                            color: '#0196FD', fontSize: 13, fontFamily: "bold", position: 'absolute',
                                            right: 20,
                                            top: 10,
                                            width: 130,
                                        }}> Forgot Password? </Text> */}
                            {/* </View>
                                </View>  */}

                            {/* <View style={{ flex: 0.2, marginTop: 120 }}> */}
                            {/* <View style={{ marginTop: 10, flexDirection: 'row', }}> */}
                            {/* <Text style={{ fontSize: 13, color: '#8BB0EF',fontFamily: "bold", }}> Don't remember the Password? </Text> */}


                            {/* </View> */}
                            <TouchableOpacity
                                style={styles.signInButton}
                                onPress={() => this.login()} >
                                <Text style={styles.signInButtonText}> CREATE ACCOUNT </Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity
                                    style={styles.signInButton}
                                    onPress={() => this.login()} >
                                    <Text style={styles.signInButtonText}> SIGN IN </Text>
                                </TouchableOpacity> */}
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