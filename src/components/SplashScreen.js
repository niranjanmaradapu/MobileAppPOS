import React from 'react';
import { StatusBar, StyleSheet, ImageBackground, View, Text, Image, ActivityIndicator,reactN } from 'react-native';
import AuthNavigation from '../Navigation/AuthNavigation';
export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('AuthNavigation')
        }, 2500);
    }

      render() {
        return (
            <View style={styles.container}>
                <Image source={require('./assets/images/welcomeLogo.png')} style={styles.logoImage} />
                <Text style={{ textAlign:'center',color:"#353C40",position: 'absolute',  bottom:70,fontSize:14, fontFamily:"regular",}}> POWERED BY OTSI </Text>
                </View>
        )
}
}



const styles = StyleSheet.create({
    logoImage: {
        alignSelf: 'center',
        width: 177,
        height: 219,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    }

})
