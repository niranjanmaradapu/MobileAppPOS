import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Device from 'react-native-device-detection';
import I18n, { getLanguages } from 'react-native-i18n';
// Enable fallbacks if you want `en-US`
// and `en-GB` to fallback to `en`
I18n.fallbacks = true;
I18n.defaultLocale = 'english';

// Available languages
I18n.translations = {
    'english': require('../assets/translations/en'),
    'telugu': require('../assets/translations/te'),
    'hindi': require('../assets/translations/hi'),
};


export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        if ( I18n.locale == "english" || I18n.locale == "en") {
            I18n.locale = "english"
            this.setState({ selectedItem: 0 })
        }
        var phonenumber = "";
        AsyncStorage.getItem("phone_number").then((value) => {
            phonenumber = value;
        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting phone numner');
           // alert('There is error getting phone numner');
        });
        console.log('phone number is' + phonenumber);
        setTimeout(() => {
            if (phonenumber === null) {
                this.props.navigation.navigate('AuthNavigation');
            }
            else {
                this.props.navigation.navigate('HomeNavigation');
            }
        }, 2500);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/welcomeLogo.png')} style={Device.isTablet ? styles.logoImage_tablet : styles.logoImage_mobile} />
                <Text style={Device.isTablet ? styles.splashText_tablet : styles.splashText_mobile}> POWERED BY OTSI </Text>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    logoImage_mobile: {
        alignSelf: 'center',
        width: 177,
        height: 219,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    splashText_mobile: {
        textAlign: 'center',
        color: "#353C40",
        position: 'absolute',
        bottom: 70,
        fontSize: 14
    },

    logoImage_tablet: {
        alignSelf: 'center',
        width: 207,
        height: 259,
    },
    splashText_tablet: {
        textAlign: 'center',
        color: "#353C40",
        position: 'absolute',
        bottom: 70,
        fontSize: 24
    }

});
