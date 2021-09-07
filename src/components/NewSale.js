import React, { Component } from 'react'
import {View, Image, ImageBackground, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ActivityIndicator, scrollview,SafeAreaView } from 'react-native';
//import Menu from './Menu';
//import Login from './Logsin';
const image = require('./assets/images/menu.png');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
var deviceWidth = Dimensions.get('window').width;
import { Table, Row, Rows } from 'react-native-table-component';


class NewSale extends Component {
    constructor(props) {
        super(props);
       // this.toggle = this.toggle.bind(this);
       // this.navigate = this.props.navigation.navigate;
       this.state = {
        tableHead: ['S.No', 'Product', 'Qty', 'Amount'],
        tableData: [
          ['1', 'Perfume', '1', '$200'],
          ['2', 'Ahsan Attar', '1', '$200'],
          ['3', 'Hair Gel', '1', '$200'],
          ['4', 'Towel', '1', '$200']
        ]
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
        const state = this.state;
        return (
            <View style={styles.container}>
                 <SafeAreaView style={styles.safeArea}>
                 <View style={styles.viewswidth}>
               <Text style={styles.signUptext}> New Sale </Text>
                </View>
                <View style={styles.tablecontainer}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.textData}/>
        </Table>
        </View>
                            {/* <Left>
                                <Button transparent style={{ marginTop: -102, marginLeft: -162, width: 50, height: 50 }} onPress={() => this.props.navigation.openDrawer()}>
                                    <Image
                                        source={image}
                                        style={{ width: 32, height: 32 }}
                                    />
                                </Button>
                            </Left> */}
                       
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
        backgroundColor: '#0196FD',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height:84,
      },
      signUptext:{
        marginTop:40,
        fontFamily: "bold",
        alignSelf:'center',
        color: '#FFFFFF',
        fontSize: 20,
      },
      tablecontainer: { 
          flex: 1,
        // width:deviceWidth,
        //  marginLeft:20,
        //  marginRight:20,
         padding: 16, 
         paddingTop: 30, 
         backgroundColor: '#fff'
         },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    head: { 
        height: 40,
         backgroundColor: '#f1f8ff',
       
     },
    text: { 
        margin: 6,
        color:"#0196FD",
        fontFamily: "bold",
        fontSize:15,
    },
    textData: { 
        margin: 6,
        color:"#456CAF55",
        fontFamily: "bold",
        fontSize:15,
    }
})


