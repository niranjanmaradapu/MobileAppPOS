import React from 'react';
import { StatusBar, StyleSheet, ImageBackground, View, Text, Image, ActivityIndicator,reactN } from 'react-native';
export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

      render() {
        return (
                <Image source={require('./assets/images/welcomeLogo.png')} style={styles.logoImage} />
        )
}
}



const styles = StyleSheet.create({
    logoImage: {
        top: '35%',
        alignSelf: 'center',
        width: 250,
        height: 250,
    }

})