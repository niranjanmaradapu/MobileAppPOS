import React, { Component ,useState} from 'react'
import {View, Image, Animated, ImageBackground, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ActivityIndicator, scrollview,SafeAreaView, ScrollView,TouchableHighlight} from 'react-native';
//import Menu from './Menu';
//import Login from './Logsin';
const image = require('./assets/images/menu.png');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
var deviceWidth = Dimensions.get('window').width;
import { Table, Row, Rows } from 'react-native-table-component';
import { TabView, SceneMap } from 'react-native-tab-view';
import Constants from 'expo-constants';
import Modal from "react-native-modal";
import CreateCustomerService from './services/CreateCustomerService';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import NewSaleService from './services/NewSaleService';


class NewSale extends Component {
    constructor(props) {
        super(props);
       // this.toggle = this.toggle.bind(this);
       // this.navigate = this.props.navigation.navigate;
       this.state = {
        mobileNumber: "",
        altMobileNo: "",
        name: "",
        gender: "Male",
        gstNumber: "",
        dob: "2021-06-21T18:30:00.000Z",
        address: "", 
        modalVisible: true,
        flagone:true,
        flagtwo:false,
        flagthree:false,
        flagfour:false,
        tableHead: ['S.No','Barcode', 'Product','Price Per Qty','Qty', 'Sales Rate'],
        tableData: [
          ['01', 'COA238106','Perfume', '₹ 100:00', '1','₹ 100:00'],
          ['02', 'COA238013','Chocolate', '₹ 20:00', '10', '₹ 200:00'],
          ['03', 'COA238013','Chocolate', '₹ 20:00', '10', '₹ 200:00'],
          ['04', 'COA238013','Chocolate', '₹ 20:00','10', '₹ 200:00'],
          ['05', 'COA238013','Chocolate', '₹ 20:00', '10', '₹ 200:00'],
          ['06', 'COA238013','Chocolate', '₹ 20:00', '10', '₹ 200:00'],
          ['07', 'COA238013','Chocolate', '₹ 20:00','10', '₹ 200:00'],
          ['08', 'COA238013','Chocolate', '₹ 20:00','10', '₹ 200:00'],
          ['09', 'COA238013','Chocolate', '₹ 20:00','10', '₹ 200:00'],
          ['10', 'COA238013','Chocolate', '₹ 20:00','10', '₹ 200:00'],
          ['11', 'COA238013','Chocolate', '₹ 20:00','10', '₹ 200:00'],
          ['12', 'COA238013','Chocolate', '₹ 20:00','10', '₹ 200:00'],
          ['13', 'COA238013','Chocolate', '₹ 20:00','10', '₹ 200:00'],
          ['14', 'COA238013','Chocolate', '₹ 20:00','10', '₹ 200:00'],
          ['15', 'COA238013','Chocolate', '₹ 20:00','10', '₹ 200:00'],
          ['16', 'COA238013','Chocolate', '₹ 20:00','10', '₹ 200:00'],
        
        ]
}
    }

  //   toggleModal(visible) {
  //     this.setState({ modalVisible: visible });
  //  }

   modelCancel() {
    this.setState({ modalVisible: false });
 }

 handleMobileNumber = (text) => {
  this.setState({ mobileNumber: text })
}
handleAltNumber = (text) => {
  this.setState({ altMobileNo: text })
}
handlename = (value) => {
  this.setState({ name: value });
}

handleGender = (text) => {
  this.setState({ gender: text })
}
handleGstnumber = (text) => {
  this.setState({ gstNumber: text })
}
handledob = (value) => {
  this.setState({ dob: value });
}

handleaddress = (value) => {
  this.setState({ address: value });
}


 modelCreate() {
  const params =  {
    "mobileNumber":this.state.mobileNumber, 
    "altMobileNo":this.state.altMobileNo, 
    "name":this.state.name,
    "gender":'Male', 
    "gstNumber":this.state.gstNumber, 
    "dob":"2021-06-21T18:30:00.000Z", 
    "anniversary":"1",
    "address":this.state.address,
  }
  console.log('obj' + JSON.stringify(params))
  console.log(CreateCustomerService.createCustomer())
axios.post(CreateCustomerService.createCustomer(),params).then((res) => {
  console.log(res)
  if (res.data.statusCode === "OK") {
  this.setState({ modalVisible: false }); 
   // toast.success(res.data.body);
    this.setState({
        mobileNumber: "",
        altMobileNo: "",
        name: "",
        gender: "Male",
        gstNumber: "",
        dob: "",
        anniversary: "",
        address: ""
    })
       
    }
     else{
       
    }
});
}

pay=()=>{
  console.log(URL);
  const params =  {
    "amount":"50",
    "info": "order_request"
  }
   axios.post(NewSaleService.payment(),params).then((res) => {
     // this.setState({isPayment: false});
      const data = res.data
      var options = {
        description: 'Transaction',
        image: 'https://i.imgur.com/3g7nmJC.png',
        currency: data.currency,
        order_id:data.id,
        key: 'rzp_test_z8jVsg0bBgLQer', // Your api key
        amount: data.amount,
        name: 'OTSI',
        prefill: {
          name: "Kadali",
          email: "kadali@gmail.com",
          contact: "9999999999",
        },
        theme: {color: '#F37254'}
      }
      console.log(options)
      RazorpayCheckout.open(options).then((data) => {
         // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
       }).catch((error) => {
         console.log(error)
         // handle failure
         alert(`Error: ${JSON.stringify(error.code)} | ${JSON.stringify(error.description)}`);
       });
   }
   )
  
  
}


    topbarAction1() {
      this.setState({ flagone: true })
        this.setState({ flagtwo: false })
        this.setState({ flagthree: false })
        this.setState({ flagfour: false })
  }

  
  topbarAction2() {
    this.setState({ modalVisible: true });
    this.setState({ flagone: false })
        this.setState({ flagtwo: true })
        this.setState({ flagthree: false })
        this.setState({ flagfour: false })
}


topbarAction3() {
  this.setState({ flagone: false })
  this.setState({ flagtwo: false })
  this.setState({ flagthree: true })
  this.setState({ flagfour: false })
}


topbarAction4() {
  this.setState({ flagone: false })
  this.setState({ flagtwo: false })
  this.setState({ flagthree: false })
  this.setState({ flagfour: true })
}

    render() {
      console.log(this.state.flagone)
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
          <TouchableOpacity  style={{backgroundColor:this.state.flagone ?  "#1CA2FF":"#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:50,
    textAlign: "center",}}
    onPress={() => this.topbarAction1()} >
          <View style={{backgroundColor:this.state.flagone ?  "#1CA2FF":"#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:50,
    textAlign: "center"}}>


 
<Text  style={{color:this.state.flagone ?  "#FFFFFF":"#BBE3FF",
      marginTop:10,
      fontFamily: "regular",textAlign:'center',width:100,
      fontSize: 14,}}> NEW SALE </Text> 


<Image source={this.state.flagone ? require('./assets/images/topSelect.png') : null}  style={{
                left: 30,marginTop:5,
                }}/>
               
</View>
</TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:this.state.flagtwo ?  "#1CA2FF":"#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:50,
    textAlign: "center",}}
    onPress={() => this.topbarAction2()} >
      <View style = {{backgroundColor:this.state.flagtwo ?  "#1CA2FF":"#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:50,
    textAlign: "center",}}>

<Text  style={{color:this.state.flagtwo ?  "#FFFFFF":"#BBE3FF",
      marginTop:10,
      fontFamily: "regular",
      fontSize: 14,textAlign:'center',width:100,}}> ADD CUSTOMER </Text> 
      <Image source={this.state.flagtwo ? require('./assets/images/topSelect.png') : null}  style={{
                left: 30,marginTop:5,
                }}/>
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor:this.state.flagthree ?  "#1CA2FF":"#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:50,
    textAlign: "center",}}
    onPress={() => this.topbarAction3()} >
      <View style = {{backgroundColor:this.state.flagthree ?  "#1CA2FF":"#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:50,
    textAlign: "center",}}>

<Text  style={{color:this.state.flagthree ?  "#FFFFFF":"#BBE3FF",
      marginTop:10,
      fontFamily: "regular",
      fontSize: 14,textAlign:'center',width:100,}}> FIND ITEM  </Text> 
      <Image source={this.state.flagthree ? require('./assets/images/topSelect.png') : null}  style={{
                left: 30,marginTop:5,
                }}/>
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor:this.state.flagfour ?  "#1CA2FF":"#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:50,
    textAlign: "center",}}
    onPress={() => this.topbarAction4()} >
      <View style = {{backgroundColor:this.state.flagfour ?  "#1CA2FF":"#0196FD",
    alignSelf: "flex-start",
    //marginHorizontal: "1%",
    marginBottom: 6,
    width: "25%",
    height:50,
    textAlign: "center",}}>

<Text  style={{color:this.state.flagfour ?  "#FFFFFF":"#BBE3FF",
      marginTop:10,
      fontFamily: "regular",
      fontSize: 14,textAlign:'center',width:100,}}> PAYMENT DETAILS  </Text> 
      <Image source={this.state.flagfour ? require('./assets/images/topSelect.png') : null}  style={{
                left: 30,marginTop:5,
                }}/>
      </View>
      </TouchableOpacity>
      </View>
      {this.state.flagthree && (
      <View style={{ flex:1}}>
                            <TextInput style={styles.findIteminput}
                                underlineColorAndroid="transparent"
                                placeholder="       Find Item"
                                placeholderTextColor="#0196FD"
                               // textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleEmail}
                                value={this.state.userName} 
                                ref={inputemail => { this.emailValueInput = inputemail }} />
                               <Image source={require('./assets/images/search.png')} style={{  position: 'absolute',
                left: 35,
                top:35}}/>      
                                  <Image source={require('./assets/images/filter.png')} style={{  position: 'absolute',
                right: 10,
                top:20,
                width:50,
                height:50,
                borderBottomRightRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor:"#0196FD",}} resizeMode={'center'}/>
                      </View> 
      )}  
      {this.state.flagone && (
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
                                   )} 
                                                                  
               
                {this.state.flagone && ( 
                <View style={styles.tablecontainer}>
                   <Text style={styles.saleBillsText}> List Of Sale Items </Text>
                <Table borderStyle={{borderWidth: 2, borderColor: '#FFFFFF',backgroundColor:"#FAFAFF"}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} style={styles.head} textStyle={styles.textData}/>
        </Table>
      
        </View>
               )}

{this.state.flagfour && ( 
                 <TouchableOpacity
                 style={styles.signInButton}
                 onPress={() => this.pay()} >
                 <Text style={styles.signInButtonText}> PAY </Text>
             </TouchableOpacity>
               )}

                {this.state.flagtwo && ( 
                 <View>
                 <Modal isVisible={this.state.modalVisible}>
                   <View style={{ flex: 1, justifyContent: 'center', //Centered horizontally
       alignItems: 'center',  }}>
                   <View style={{ flexDirection: 'column', flex: 0,marginLeft:20,marginRight:20, backgroundColor:"#ffffff",borderRadius:20,}}>
                     <Text style={{color:"#0196FD", fontFamily: "semibold",alignItems:'center',justifyContent:'center',textAlign:'center',marginTop:10,
        fontSize: 12, }}>Customer Details</Text>
        <Text style={styles.signInFieldStyle}> Mobile Number* </Text>
        <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder=""
                                placeholderTextColor="#0F2851"
                                textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleMobileNumber}
                                ref={inputemail => { this.emailValueInput = inputemail }} />

<Text style={styles.signInFieldStyle}> Alternative Mobile Number </Text>
        <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder=""
                                placeholderTextColor="#0F2851"
                                textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleAltNumber}
                                ref={inputemail => { this.emailValueInput = inputemail }} />

<Text style={styles.signInFieldStyle}> Name </Text>
        <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder=""
                                placeholderTextColor="#0F2851"
                                textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handlename}
                                ref={inputemail => { this.emailValueInput = inputemail }} />

<Text style={styles.signInFieldStyle}> Gender </Text>
        <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder=""
                                placeholderTextColor="#0F2851"
                                textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleGender}
                                ref={inputemail => { this.emailValueInput = inputemail }} />

<Text style={styles.signInFieldStyle}> gst Number </Text>
        <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder=""
                                placeholderTextColor="#0F2851"
                                textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleGstnumber}
                                ref={inputemail => { this.emailValueInput = inputemail }} />

<Text style={styles.signInFieldStyle}> DOB </Text>
        <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder=""
                                placeholderTextColor="#0F2851"
                                textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handledob}
                                ref={inputemail => { this.emailValueInput = inputemail }} />

<Text style={styles.signInFieldStyle}> Anniverary </Text>
        <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder=""
                                placeholderTextColor="#0F2851"
                                textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleEmail}
                                ref={inputemail => { this.emailValueInput = inputemail }} />

<Text style={styles.signInFieldStyle}> Address </Text>
        <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder=""
                                placeholderTextColor="#0F2851"
                                textAlignVertical="center"
                                autoCapitalize="none"
                                onChangeText={this.handleaddress}
                                ref={inputemail => { this.emailValueInput = inputemail }} />
      <View style = {styles.TopcontainerforModel}>
<TouchableOpacity
                                style={{ width: "50%",
                                height:50,backgroundColor:"#ECF7FF",borderBottomLeftRadius:20,}}
                                onPress={() => this.modelCancel()} >
                                <Text style={{textAlign:'center',marginTop:15,color:"#0196FD",  fontSize: 15,
      fontFamily: "regular",}}> CANCEL </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ width: "50%",
                                height:50,backgroundColor:"#0196FD",borderBottomRightRadius:20,}}
                                onPress={() => this.modelCreate()} >
                                <Text style={{textAlign:'center',marginTop:15,color:"#ffffff",  fontSize: 15,
      fontFamily: "regular",}}> CREATE </Text>
                            </TouchableOpacity>
                            </View>
                     </View>
                   </View>
                 </Modal>
               </View>
                 )}
  
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
        margin: 20,
        height: 40,
        marginTop:5,
        marginBottom:10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: 'white',
        borderWidth: 1,
        fontFamily:'semibold',
        fontSize:10,
    },
    signInButton: {
      backgroundColor:'#0196FD',
      justifyContent: 'center',
      marginLeft: 30,
      marginRight: 30,
      marginTop:50,
      height: 55,
      borderRadius: 30,
      fontWeight: 'bold',
      // marginBottom:100,
  },
  signInButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: "regular",
},
    signInFieldStyle: {
      color: '#456CAF55',
      marginLeft: 20,
      marginTop:5,
      fontSize: 12,
      fontFamily: "regular",
  },
    findIteminput: {
      marginLeft: 30,
      marginRight: 30,
      marginTop:20,
      marginBottom:1000,
      height: 50,
      backgroundColor:"#DEF1FF",
      borderRadius:10,
      color:'#001B4A',
      fontFamily: "regular",
      fontSize: 12,
  },
      signUptext:{
        marginTop:40,
        fontFamily: "regular",
        alignSelf:'center',
        color: '#FFFFFF',
        fontSize: 28,
      },
      saleBillsText:{
        marginLeft:0,
        marginTop:-20,
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
      height: 50
   },
   
   TopcontainerforModel: {
    flexDirection: 'row',
    marginLeft:0,
    marginRight:0,
    marginTop:10,
    width:'100%',
    backgroundColor: 'grey',
    borderRadius:20,
    height: 50,
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

    //model
    modelcontainer: {
      alignItems: 'center',
      backgroundColor: '#ede3f2',
      padding: 100
   },
   modal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f7021a',
      padding: 100
   },
   modeltext: {
      color: '#3f2949',
      marginTop: 10
   }
  });
