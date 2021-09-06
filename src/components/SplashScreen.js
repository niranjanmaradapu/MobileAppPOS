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
            <View style={styles.container}>
                <Image source={require('./assets/images/welcomeLogo.png')} style={styles.logoImage} />
                </View>
        )
}
}



const styles = StyleSheet.create({
    logoImage: {
        alignSelf: 'center',
        width: 106,
        height: 114,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0196FD",
    }

})