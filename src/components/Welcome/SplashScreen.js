import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Device from 'react-native-device-detection';



export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        var phonenumber = ""
        AsyncStorage.getItem("phone_number").then((value) => {
            phonenumber = value
        }).catch(() => {
            console.log('there is error getting phone numner')
        })
        console.log('phone number is' + phonenumber)
        setTimeout(() => {
            // if (phonenumber === null) {
                this.props.navigation.navigate('AuthNavigation')
            // }
            // else {
            //     this.props.navigation.navigate('HomeNavigation')
            // }
        }, 2500);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/welcomeLogo.png')} style={Device.isTablet ? styles.logoImage_tablet : styles.logoImage_mobile} />
                <Text style={Device.isTablet ? styles.splashText_tablet : styles.splashText_mobile}> POWERED BY OTSI </Text>
            </View>
        )
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

})
