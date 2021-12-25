import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import I18n, { getLanguages } from 'react-native-i18n';
I18n.fallbacks = true;
I18n.defaultLocale = 'en';
import Device from 'react-native-device-detection';


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
                <Image source={require('./assets/images/letsGo.png')} style={Device.isTablet ? styles.logoImage_tablet : styles.logoImage_mobile} />
                <View style={Device.isTablet ? styles.headerContainer_tablet : styles.headerContainer_mobile}>
                    <Text style={Device.isTablet ? styles.headerGreeting_tablet : styles.headerGreeting_mobile}> {I18n.t('Get Started')} </Text>
                    <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}> {I18n.t('Lets explore the world Best Retail & Textiles')} </Text>

                </View>

                <TouchableOpacity
                    style={Device.isTablet ? styles.letsGoButton_tablet : styles.letsGoButton_mobile}
                    onPress={() => this.letsGoButtonAction()} >
                    <Text style={Device.isTablet ? styles.letsGoButtonText_tablet : styles.letsGoButtonText_mobile}> {I18n.t('LET GO')} </Text>
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
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    


    // Styles For Mobile

    logoImage_mobile: {
        width: 302,
        height: 275,
        position: 'absolute',
        top: 130
    },
    
    // Styles For Mobile
    headerContainer_mobile: { 
        flex: 1, 
        marginTop: 450, 
        width: deviceWidth, 
        height: 200 
    },
    headerGreeting_mobile: { 
        color: "#353C4050", 
        fontSize: 16, 
        fontFamily: "bold", 
        marginLeft: 20, 
        marginTop: 20 
    },
    headerTitle_mobile: {
        color: "#353C40", 
        fontSize: 30, 
        fontFamily: "bold", 
        marginLeft: 20, 
        marginTop: 20, 
        flexDirection: 'column', 
        height: 135,
        justifyContent: 'center',
    },
    letsGoButton_mobile: {
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
    letsGoButtonText_mobile: {
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: "regular",
    },

    // Styles For Tablet
    logoImage_tablet: {
        width: 402,
        height: 375,
        position: 'absolute',
        top: 130
    },
    headerContainer_tablet: { 
        flex: 1, 
        marginTop: 550, 
        width: deviceWidth, 
        height: 200 
    },
    headerGreeting_tablet: { 
        color: "#353C4050", 
        fontSize: 26, 
        fontFamily: "bold", 
        marginLeft: 20, 
        marginTop: 20 
    },
    headerTitle_tablet: {
        color: "#353C40", 
        fontSize: 40, 
        fontFamily: "bold", 
        marginLeft: 20, 
        marginTop: 20, 
        flexDirection: 'column', 
        height: 135,
        justifyContent: 'center',
    },
    letsGoButton_tablet: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        position: 'absolute',
        marginLeft: 20,
        width: deviceWidth - 40,
        bottom: 30,
        height: 60,
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    letsGoButtonText_tablet: {
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: "regular",
    },

})
