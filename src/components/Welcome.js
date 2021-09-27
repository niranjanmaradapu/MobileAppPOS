import React from 'react';
import { StatusBar, StyleSheet, ImageBackground, View, Text, Image, Dimensions, TouchableOpacity, ActivityIndicator, reactN } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import AuthNavigation from '../Navigation/AuthNavigation';
var deviceWidth = Dimensions.get('window').width;
export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    letsGoButtonAction() {
        //this.props.navigation.push('LoginAndSignUp', { screen: 'SignUp' });
        this.props.navigation.navigate('Login');
    }


    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./assets/images/letsGo.png')} style={styles.logoImage} />
                <View style={{ flex: 1, marginTop: 400, width: deviceWidth, height: 200 }}>
                    <Text style={{ color: "#353C4050", fontSize: 16, fontFamily: "bold", marginLeft: 20, marginTop: 20 }}> Get Started </Text>
                    <Text style={{
                        color: "#353C40", fontSize: 30, fontFamily: "bold", marginLeft: 20, marginTop: 20, flexDirection: 'column',
                        justifyContent: 'center'
                    }}> Lets explore the world Best Retail & Textiles </Text>
                    <TouchableOpacity
                        style={styles.signInButton}
                        onPress={() => this.letsGoButtonAction()} >
                        <Text style={styles.signInButtonText}> LET'S GO </Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}



const styles = StyleSheet.create({
    logoImage: {
        width: 302,
        height: 275,
        position: 'absolute',
        top: 130
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    signInButton: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 150,
        height: 44,
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    signInButtonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: "regular",
    },

})
