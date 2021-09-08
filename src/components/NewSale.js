import React, { Component ,useState} from 'react'

import {View, Image, Animated, ImageBackground, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ActivityIndicator, scrollview,SafeAreaView, ScrollView} from 'react-native';
//import Menu from './Menu';
//import Login from './Logsin';
const image = require('./assets/images/menu.png');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
var deviceWidth = Dimensions.get('window').width;
import { Table, Row, Rows } from 'react-native-table-component';
import { TabView, SceneMap } from 'react-native-tab-view';
import Constants from 'expo-constants';


class NewSale extends Component {
    constructor(props) {
        super(props);
       // this.toggle = this.toggle.bind(this);
       // this.navigate = this.props.navigation.navigate;
       this.state = {
        flagone:true,
        flagtwo:false,
        flagthree:false,
        flagfour:false,
        tableHead: ['S.No','Barcode', 'Product', 'Qty','Price Per Qty', 'Sales Rate'],
        tableData: [
          ['01', 'COA238106','Perfume', '1', '₹ 100:00','₹ 100:00'],
          ['02', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['03', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['04', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['05', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['06', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['07', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['08', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['09', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['10', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['05', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['06', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['07', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['08', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['09', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
          ['10', 'COA238013','Chocolate', '10', '₹ 20:00', '₹ 200:00'],
        
        ]
}
    }

    topbarAction1() {
      this.state.flagone = true
      this.state.flagtwo = false
      this.state.flagthree = false
      this.state.flagfour = false
  }

  
  topbarAction2() {
    console.log('2')
    this.state.flagone = false
    this.state.flagtwo = true
    this.state.flagthree = false
    this.state.flagfour = false
}


topbarAction3() {
  this.state.flagone = false
  this.state.flagtwo = false
  this.state.flagthree = true
  this.state.flagfour = false
}


topbarAction4() {
  this.state.flagone = false
  this.state.flagtwo = false
  this.state.flagthree = false
  this.state.flagfour = true
}

    render() {
         AsyncStorage.getItem("tokenkey").then ((value) => {
            console.log( value)
        }).catch(() => {
            console.log('there is error getting token')
        })
        const state = this.state;
        return (
          <ScrollView>
            <View style={styles.container}>
                 <SafeAreaView style={styles.safeArea}>
                 <View style={styles.viewswidth}>
               <Text style={styles.signUptext}> Home </Text>
               <Image source={require('./assets/images/menu.png')} style={{position: 'absolute',
                left: 20,
                top:50,
                width:20,
                height:20,}}/>
                 <Image source={require('./assets/images/filter.png')} style={{position: 'absolute',
                right: 20,
                top:50,
                width:20,
                height:20,}}/>
                </View>

          <View style = {styles.Topcontainer}>
         
         <View style={{backgroundColor:this.state.flagone ?  "#1CA2FF":"#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:45,
    textAlign: "center"}}>

<TouchableOpacity  style={{backgroundColor:this.state.flagone ?  "#1CA2FF":"#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:45,
    textAlign: "center",}}
    onPress={() => this.topbarAction1()} >
 
<Text  style={{color:this.state.flagone ?  "#FFFFFF":"#BBE3FF",
      marginTop:10,
      fontFamily: "regular",
      fontSize: 14, width: 100,}}> NEW SALE </Text> 


<Image source={require('./assets/images/topSelect.png')}  style={{
                left: 30,marginTop:5,
                }}/>
                </TouchableOpacity>
</View>





      <TouchableOpacity style={{backgroundColor:this.state.flagtwo ?  "#1CA2FF":"#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:45,
    textAlign: "center",}}
    onPress={() => this.topbarAction2()} >
      <View style = {{backgroundColor:this.state.flagtwo ?  "#1CA2FF":"#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:45,
    textAlign: "center",}}>

<Text  style={{color:this.state.flagtwo ?  "#FFFFFF":"#BBE3FF",
      marginTop:10,
      fontFamily: "regular",
      fontSize: 14, width: 100,}}> ADD CUSTOMER </Text> 
      </View>
      </TouchableOpacity>

<View style = {styles.blackbox}>

<TouchableOpacity  
    onPress={() => this.topbarAction3()} >
<Text style={styles.buttonLabel}> FIND ITEM </Text>
</TouchableOpacity>
</View>
<View style = {styles.greenbox}>
<TouchableOpacity  
    onPress={() => this.topbarAction4()} >
<Text style={styles.buttonLabel}> PAYMENT DETAILS </Text>
</TouchableOpacity>
</View>
         {/* <View style = {styles.blackbox} />
         <View style = {styles.greenbox} /> */}
      </View>
      <View style={{ flex: 1 }}>
      <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="  SCan Barcode"
                                placeholderTextColor="#8F9EB7"
                                textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleEmail}
                                ref={inputemail => { this.emailValueInput = inputemail }} />
                                 <Image source={require('./assets/images/barcode.png')} style={{  position: 'absolute',
                right: 20,
                top:25}}/>
                                  </View>                                    
                <Text style={styles.saleBillsText}> List Of Sale Items </Text>
                <View style={styles.tablecontainer}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#FFFFFF',backgroundColor:"#FAFAFF"}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} style={styles.head} textStyle={styles.textData}/>
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
              </ScrollView>
        )
    }
}
export default NewSale


const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor:'#FAFAFF'
    },
    viewswidth: {
        backgroundColor: '#0196FD',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height:84,
      },
      input: {
        justifyContent: 'center',
        margin: 13,
        height: 40,
        borderColor: '#8F9EB7',
        borderRadius: 3,
        backgroundColor: 'white',
        borderWidth: 1,
        fontFamily:'regular',
        fontSize:15,
    },
      signUptext:{
        marginTop:40,
        fontFamily: "regular",
        alignSelf:'center',
        color: '#FFFFFF',
        fontSize: 28,
      },
      saleBillsText:{
        marginLeft:20,
        marginBottom:10,
        fontFamily: "bold",
        color: '#0F2851',
        fontSize: 14, 
      },
      tablecontainer: { 
          flex: 1,
        // width:deviceWidth,
          marginLeft:20,
          marginRight:20,
         padding: 20, 
         paddingTop: 30, 
         backgroundColor: '#FFFFFF',
         borderRadius: 10,
         },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#FAFAFF'
    },
    head: { 
         height: 45,
         borderColor: '#FAFAFF',
         borderWidth:1,
         borderRadius: 10, 
     },
    text: { 
        margin: 6,
        color:"#0196FD",
        fontFamily: "semibold",
        fontSize:11,
    },
    textData: { 
        margin: 6,
        color:"#48596B",
        fontFamily: "regular",
        fontSize:10,
    },

    Topcontainer: {
      flexDirection: 'row',
      marginLeft:0,
      marginRight:0,
      width:'100%',
      backgroundColor: 'grey',
      height: 45
   },
   redbox: {
    backgroundColor: "#1CA2FF",
    alignSelf: "flex-start",
 
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:45,
    textAlign: "center",
   },
   bluebox: {
    backgroundColor: "#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:45,
    textAlign: "center",
   },
   blackbox: {
    backgroundColor: "#0196FD",
      alignSelf: "flex-start",
      //marginHorizontal: "1%",
      marginBottom: 6,
      width: "25%",
      height:45,
      textAlign: "center",
   },
   greenbox: {
    backgroundColor: "#0196FD",
      alignSelf: "flex-start",
      //marginHorizontal: "1%",
      marginBottom: 6,
      width: "25%",
      height:45,
      textAlign: "center",
   },





    tabBar: {
      flexDirection: 'row',
      paddingTop: Constants.statusBarHeight,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      padding: 16,
    },
    box: {
      width: 50,
      height: 50,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    button: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      //borderRadius: 4,
      backgroundColor: "#0196FD",
      alignSelf: "flex-start",
      //marginHorizontal: "1%",
      marginBottom: 6,
      width: "25%",
      height:45,
      textAlign: "center",
    },
    selected: {
      backgroundColor: "#BBE3FF",
      borderWidth: 0,
      backgroundColor: "#0196FD",
    },
    buttonLabel: {
       textAlign: "center",
      color: "#BBE3FF",
      fontFamily: "regular",
      fontSize: 14, 
    },
    selectedLabel: {
      color: "white",
      textAlign: "center",
      alignSelf:"center",
      marginTop:10,
      fontFamily: "regular",
      fontSize: 14, 
    },
    label: {
      textAlign: "center",
      marginBottom: 10,
      fontSize: 24,
    },
  });
