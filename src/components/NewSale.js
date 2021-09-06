import React, { Component } from 'react'
import {View, Image, ImageBackground, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ActivityIndicator, scrollview,SafeAreaView } from 'react-native';
//import Menu from './Menu';
//import Login from './Logsin';
const image = require('./assets/images/menu.png');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

class NewSale extends Component {
    constructor(props) {
        super(props);
       // this.toggle = this.toggle.bind(this);
       // this.navigate = this.props.navigation.navigate;
    this.state = {
     
    }
}

    // onMenuItemSelected = item =>
    // this.setState({
    //     isOpen: true,
    //     selectedItem: item,
    // });

    // toggle() {
    //     this.setState({
    //         isOpen: !this.state.isOpen,
    //     });

    //     this.setState({
    //         view: <Login />
    //     })
    // }



    render() {
         AsyncStorage.getItem("tokenkey").then ((value) => {
            console.log( value)
        }).catch(() => {
            console.log('there is error getting token')
        })
      AsyncStorage.getItem("user").then ((value) => {
            console.log( value)
        }).catch(() => {
            console.log('there is error getting token')
        })
       
        // if (value !== null) {
        //   // We have data!!
        //   console.log(value);
        //   console.log('Token is : ' + JSON.stringify(value));
        // }
       // const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
        return (
            <View style={styles.container}>
                 <SafeAreaView style={styles.safeArea}>
                        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF',marginTop:30, }}>
                            <Text style={styles.viewswidth}>New Sale</Text>
                            {/* <Left>
                                <Button transparent style={{ marginTop: -102, marginLeft: -162, width: 50, height: 50 }} onPress={() => this.props.navigation.openDrawer()}>
                                    <Image
                                        source={image}
                                        style={{ width: 32, height: 32 }}
                                    />
                                </Button>
                            </Left> */}
                        </View>
                    </SafeAreaView>
            {/* <Text style={{backgroundColor: 'white'}}>New Sale Screen</Text>   */}
            </View>
        )
    }
}
export default NewSale


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // top: '0%',
        // height: 30,
        // backgroundColor:'#0196FD'
    },
    viewswidth: {
        backgroundColor:'#0196FD',
        //alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: 24,
        color: '#FFFFFF',
        height:64,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
})


