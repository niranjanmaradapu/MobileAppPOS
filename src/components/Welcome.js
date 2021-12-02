import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import I18n, { getLanguages } from 'react-native-i18n';
I18n.fallbacks = true;
I18n.defaultLocale = 'en';


// Available languages
I18n.translations = {
    'en': require('./assets/translations/en'),
    'te': require('./assets/translations/te'),
    'hi': require('./assets/translations/hi'),
};

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'English',
            languages: [],
        }
    }

    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages });
        });
    }

    letsGoButtonAction() {
        //this.props.navigation.push('LoginAndSignUp', { screen: 'SignUp' });
        this.props.navigation.navigate('Login');
    }

    setLanguage() {

    }

    setLanguage = (value) => {

    }



    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./assets/images/letsGo.png')} style={styles.logoImage} />
                <View style={{ flex: 1, marginTop: 450, width: deviceWidth, height: 200 }}>
                    <Text style={{ color: "#353C4050", fontSize: 16, fontFamily: "bold", marginLeft: 20, marginTop: 20 }}> {I18n.t('Get Started')} </Text>
                    <Text style={{
                        color: "#353C40", fontSize: 30, fontFamily: "bold", marginLeft: 20, marginTop: 20, flexDirection: 'column', height: 135,
                        justifyContent: 'center',
                    }}> {I18n.t('Lets explore the world Best Retail & Textiles')} </Text>

                </View>

                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => this.letsGoButtonAction()} >
                    <Text style={styles.signInButtonText}> {I18n.t('LET GO')} </Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        flexDirection: 'row',
        marginLeft: 24,
        marginRight: 24,
        marginTop: 2,
        height: 34,
        borderColor: '#AAAAAA',
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center',
    },
    inputAndroid: {
        flexDirection: 'row',
        width: 100,
        marginTop: 2,
        height: 34,
        borderColor: '#AAAAAA',
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center',

    },
})



const styles = StyleSheet.create({
    imagealign: {
        marginTop: 14,
        marginRight: 10,
    },
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
        position: 'absolute',
        marginLeft: 20,
        width: deviceWidth - 40,
        bottom: 30,
        height: 44,
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    signInButtonText: {
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: "regular",
    },

})
