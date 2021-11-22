import React, { Component, useState } from 'react'
import { View, Image, FlatList, Animated, ImageBackground, Text, TouchableOpacity,Switch, TextInput, StyleSheet, Dimensions, ActivityIndicator, scrollview, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';
import { openDatabase } from 'react-native-sqlite-storage';
// Connction to access the pre-populated db
const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });
const createdb = openDatabase({ name: 'create_items.db', createFromLocation: 1 });




class Promo extends Component {
    constructor(props) {
        super(props);
        this.camera = null;
        this.barcodeCodes = [];
        this.state = {
            barcodeId: "",
            flagone: false,
            flagtwo: false,
            flagthree: true,
            poolsData: [1,2],
        }
    }

    topbarAction1() {
        this.setState({ flagone: true })
        this.setState({ flagtwo: false })
        this.setState({ flagthree: false })
      }
    
    
      topbarAction2() {
        this.setState({ flagone: false })
        this.setState({ flagtwo: true })
        this.setState({ flagthree: false })
      
      }
    
    
      topbarAction3() {
        this.setState({ flagone: false })
        this.setState({ flagtwo: false })
        this.setState({ flagthree: true })
      }

      handleeditaction = (item, index) => {
      }

      handledeleteaction = (item, index) => {
      }

      navigateToAddPool(){
        this.props.navigation.navigate('AddPool', {
            onGoBack: () => this.refteshPools(),
          });
          
        }
        
        refteshPools(){
         
        }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.viewswidth}>
                    <Text style={{
                        position: 'absolute',
                        left: 10,
                        top: 55,
                        width: 300,
                        height: 20,
                        fontFamily: 'bold',
                        fontSize: 18,
                        color: '#353C40'
                    }}> Promotions & Loyalty </Text>

                </View>

                <View style={styles.Topcontainer}>
                    <TouchableOpacity style={{
                        borderColor: '#353C40',
                        height: 32,
                        width: "33.3%",
                        borderBottomLeftRadius: 5,
                        borderTopLeftRadius: 5,
                        borderLeftWidth: 1,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        backgroundColor: this.state.flagone ? "#353C40" : "#FFFFFF",
                        alignSelf: "flex-start",
                        // //marginHorizontal: "1%",
                        // marginBottom: 6,

                    }}
                        onPress={() => this.topbarAction1()} >
                        <View style={{
                            //   borderColor: '#ED1C24',
                            //   height: 50,
                            //   width: "33.3%",
                            //   borderBottomLeftRadius: 5,
                            //   borderTopLeftRadius: 5,
                            //   borderLeftWidth: 1,
                            //   borderTopWidth: 1,
                            //   borderBottomWidth: 1,
                            //  backgroundColor: this.state.flagone ?  "#ED1C24" : "#FFFFFF",
                            //  alignSelf: "flex-start",
                            //  // //marginHorizontal: "1%",
                            //  // marginBottom: 6,
                        }}>

                            <Text style={{
                                // borderColor: '#ED1C24',
                                height: 32,
                                width: 100,
                                //   borderBottomLeftRadius: 5,
                                //  borderTopLeftRadius: 5,
                                //   borderBottomWidth: 1,
                                //   borderTopWidth: 1,
                                //   borderRightWidth: 1,
                                color: this.state.flagone ? "#FFFFFF" : "#353C40",
                                marginTop: 5,
                                fontFamily: "medium",
                                fontSize: 12,
                                textAlign: 'center',
                                alignItems: 'center',
                            }}> Pools </Text>


                            {/* <Image source={this.state.flagone ? require('../assets/images/topSelect.png') : null} style={{
                                left: 30, marginTop: 5,
                            }} /> */}

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        borderColor: '#353C40',
                        height: 32,
                        width: "33.3%",
                        //  borderBottomLeftRadius: 5,
                        //  borderTopLeftRadius: 5,
                        borderLeftWidth: 1,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        backgroundColor: this.state.flagtwo ? "#353C40" : "#FFFFFF",
                        alignSelf: "flex-start",
                    }}
                        onPress={() => this.topbarAction2()} >
                        <View style={{
                            //   borderColor: '#ED1C24',
                            //   height: 50,
                            //   width: "33.3%",
                            //   borderBottomLeftRadius: 5,
                            //   borderTopLeftRadius: 5,
                            //   borderBottomWidth: 1,
                            //   borderTopWidth: 1,
                            //   borderLeftWidth: 1,
                            //  backgroundColor: this.state.flagone ?  "#ED1C24" : "#FFFFFF",
                            //  alignSelf: "flex-start",
                            //  // //marginHorizontal: "1%",
                            //  // marginBottom: 6,
                            //   width: "33.3%",
                            //  // height: 50,
                        }}>

                            <Text style={{
                                borderColor: '#353C40',
                                height: 32,
                                width: 100,
                                color: this.state.flagtwo ? "#FFFFFF" : "#353C40",
                                marginTop: 5,
                                fontFamily: "medium",
                                fontSize: 12, textAlign: 'center', width: 100,

                            }}> Manage Promo </Text>
                            {/* <Image source={this.state.flagtwo ? require('../assets/images/topSelect.png') : null} style={{
                                left: 30, marginTop: 5,
                            }} /> */}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        borderColor: '#353C40',
                        height: 32,
                        width: "33.3%",
                        borderBottomRightRadius: 5,
                        borderTopRightRadius: 5,
                        borderRightWidth: 1,
                        borderLeftWidth: 1,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        backgroundColor: this.state.flagthree ? "#353C40" : "#FFFFFF",
                        alignSelf: "flex-start",
                    }}
                        onPress={() => this.topbarAction3()} >
                        <View style={{
                            // backgroundColor: this.state.flagthree ? "#1CA2FF" : "#ED1C24",
                            // alignSelf: "flex-start",
                            // //marginHorizontal: "1%",
                            // marginBottom: 6,
                            // width: "33.3%",
                            // height: 50,
                            // textAlign: "center",
                        }}>

                            <Text style={{
                                borderColor: '#353C40',
                                height: 32,
                                width: 100,
                                color: this.state.flagthree ? "#FFFFFF" : "#353C40",
                                marginTop: 5,
                                fontFamily: "medium",
                                fontSize: 12, textAlign: 'center', width: 100,
                            }}> Loyalty Points  </Text>
                            {/* <Image source={this.state.flagthree ? require('../assets/images/topSelect.png') : null} style={{
                                left: 30, marginTop: 5,
                            }} /> */}
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.flagone && ( 
                <Switch trackColor={{ true: '#353C40', false: 'grey' }} style={{
                    position: 'absolute',
                          left: 107,
                            top: 150,
                         width: 32,
                          height: 18, color: '#353C40',
                    }}
                             value={true}>
                                 </Switch>
                )}
                               

                {this.state.flagone && ( 
                   
             
              
                    <TouchableOpacity
                style={{ position: 'absolute', left: 10, top: 150,borderRadius: 5, width: 90, height: 32, }}
                onPress={() => this.navigateToAddPool()} >
                <Text style={{ fontSize: 16, fontFamily: 'regular', color: '#707070', marginLeft: 10, marginTop: 8,textAlign:'center', alignSelf: 'center' }}> {('Only active')} </Text>
              </TouchableOpacity>
            
                    )}

                {this.state.flagone && (    
                    
                <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: 150, backgroundColor: '#ED1C24', borderRadius: 5, width: 90, height: 32, }}
            onPress={() => this.navigateToAddPool()} >
            <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8,textAlign:'center', alignSelf: 'center' }}> {('ADD POOL')} </Text>
          </TouchableOpacity>
        
                )}

                {this.state.flagone && (
                <FlatList
                data={this.state.poolsData}
                style={{marginTop:40,}}
                scrollEnabled={
                    false
                  }
                keyExtractor={item => item.email}
                renderItem={({ item, index }) => (
                  <View style={{
                    height: 140,
                    backgroundColor: '#FBFBFB',
                    borderBottomWidth: 5,
                    borderBottomColor: '#FFFFFF',
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <View style={{ flexDirection: 'column', width: '100%', height: 140, }}>
                    <Text style={{ fontSize: 16,marginLeft:16, marginTop: 20, fontFamily: 'medium', color: '#ED1C24' }}>
                       Pool id: #1011
                      </Text>
                      
                      <Text style={{ fontSize: 12,marginLeft:16, marginTop: 20,  fontFamily: 'regular', color: '#808080' }}>
                      POOL NAME
                      </Text>
                      <Text style={{ fontSize: 14,marginLeft:16, marginTop: 0, fontFamily: 'medium', color: '#353C40' }}>
                       Womens 3 @ 999
                      </Text>
                      <Text style={{ fontSize: 12,marginLeft:16, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
                      CREATED BY 
                      </Text>
                      <Text style={{ fontSize: 12, marginLeft:16,marginTop: 0, fontFamily: 'regular', color: '#353C40' }}>
                      Ramesh
                      </Text>
                      <Text style={{ fontSize: 12,marginLeft:150, marginTop: -30, fontFamily: 'regular', color: '#808080' }}>
                      CREATED ON
                      </Text>
                      <Text style={{ fontSize: 12,marginLeft:150, marginTop: 0, fontFamily: 'regular', color: '#353C40' }}>
                      30 Sep 2021
                      </Text>
                    </View>


                      {/* <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 20,
                      top: 20,
                      width: 50,
                      height: 24, backgroundColor: "#C1FCB0", borderRadius: 5,
                    }} 
                  >
                    <Text style={{
                      textAlign: 'center', marginTop: 5, color: "#353C40", fontSize: 12,
                      fontFamily: "regular"
                    }}  > Active </Text>

                  </TouchableOpacity> */}

                  <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 20,
                      top: 20,
                      width: 50,
                      height: 24, backgroundColor: "#FCB0BA", borderRadius: 5,
                    }} 
                  >
                    <Text style={{
                      textAlign: 'center', marginTop: 5, color: "#353C40", fontSize: 12,
                      fontFamily: "regular"
                    }}  > Inactive </Text>

                  </TouchableOpacity>


                    <TouchableOpacity style={{
                      position: 'absolute',
                      right: 50,
                      top: 65,
                      width: 30,
                      height: 30,
                      borderBottomLeftRadius: 5,
                      borderTopLeftRadius: 5,
                      borderWidth: 1,
                      borderColor: "lightgray",
                      // borderRadius:5,
                    }} onPress={() => this.handleeditaction(item, index)}>
                      <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/edit.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                      position: 'absolute',
                      right: 20,
                      top: 65,
                      width: 30,
                      height: 30,
                      borderBottomRightRadius: 5,
                      borderTopRightRadius: 5,
                      borderWidth: 1,
                      borderColor: "lightgray",
                    }} onPress={() => this.handledeleteaction(item, index)}>
                      <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/delete.png')} />
                    </TouchableOpacity>
                    <View style={{
                      backgroundColor: 'grey',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      height: 30,
                      width: 90
                    }}>

                    </View>

                  </View>
                )}
              />
                )}

{this.state.flagtwo && ( 
                <Switch trackColor={{ true: '#353C40', false: 'grey' }} style={{
                    position: 'absolute',
                          left: 107,
                            top: 150,
                         width: 32,
                          height: 18, color: '#353C40',
                    }}
                             value={true}>
                                 </Switch>
                )}
                               

                {this.state.flagtwo && ( 
                   
             
              
                    <TouchableOpacity
                style={{ position: 'absolute', left: 10, top: 150,borderRadius: 5, width: 90, height: 32, }}
                onPress={() => this.navigateToAddPool()} >
                <Text style={{ fontSize: 16, fontFamily: 'regular', color: '#707070', marginLeft: 10, marginTop: 8,textAlign:'center', alignSelf: 'center' }}> {('Only active')} </Text>
              </TouchableOpacity>
            
                    )}


{this.state.flagtwo && (    
                    
                    <TouchableOpacity
                style={{ position: 'absolute', right: 140, top: 150, backgroundColor: '#ED1C24', borderRadius: 5, width: 90, height: 32, }}
                onPress={() => this.navigateToAddPool()} >
                <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8,textAlign:'center', alignSelf: 'center' }}> {('ADD PROMO')} </Text>
              </TouchableOpacity>
            
                    )}

                {this.state.flagtwo && (    
                    
                <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: 150, backgroundColor: '#ED1C24', borderRadius: 5, width: 100, height: 32, }}
            onPress={() => this.navigateToAddPool()} >
            <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8,textAlign:'center', alignSelf: 'center' }}> {('ADD TO STORE')} </Text>
          </TouchableOpacity>
        
                )}

                {this.state.flagtwo && (
                <FlatList
                data={this.state.poolsData}
                style={{marginTop:40,}}
                keyExtractor={item => item.email}
                renderItem={({ item, index }) => (
                  <View style={{
                    height: 140,
                    backgroundColor: '#FBFBFB',
                    borderBottomWidth: 5,
                    borderBottomColor: '#FFFFFF',
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <View style={{ flexDirection: 'column', width: '100%', height: 140, }}>
                    <Text style={{ fontSize: 16,marginLeft:16, marginTop: 20, fontFamily: 'medium', color: '#ED1C24' }}>
                       Pool id: #1011
                      </Text>
                      
                      <Text style={{ fontSize: 12,marginLeft:16, marginTop: 20,  fontFamily: 'regular', color: '#808080' }}>
                      POOL NAME
                      </Text>
                      <Text style={{ fontSize: 14,marginLeft:16, marginTop: 0, fontFamily: 'medium', color: '#353C40' }}>
                       Womens 3 @ 999
                      </Text>

                     

                      <Text style={{ fontSize: 12,marginLeft:16, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
                      START DATE 
                      </Text>
                      <Text style={{ fontSize: 12, marginLeft:16,marginTop: 0, fontFamily: 'regular', color: '#353C40' }}>
                      30 Sep 2021
                      </Text>
                      <Text style={{ fontSize: 12,marginLeft:170, marginTop: -30, fontFamily: 'regular', color: '#808080' }}>
                      END DATE 
                      </Text>
                      <Text style={{ fontSize: 12,marginLeft:170, marginTop: 0, fontFamily: 'regular', color: '#353C40' }}>
                      31 Dec 2021
                      </Text>

                      <Text style={{ fontSize: 12,marginLeft:170, marginTop: -65, fontFamily: 'regular', color: '#808080' }}>
                      STORE
                      </Text>
                      <Text style={{ fontSize: 12,marginLeft:170, marginTop: 0, fontFamily: 'regular', color: '#353C40' }}>
                      Hyd-Patny
                      </Text>
                    </View>


                      {/* <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 20,
                      top: 20,
                      width: 50,
                      height: 24, backgroundColor: "#C1FCB0", borderRadius: 5,
                    }} 
                  >
                    <Text style={{
                      textAlign: 'center', marginTop: 5, color: "#353C40", fontSize: 12,
                      fontFamily: "regular"
                    }}  > Active </Text>

                  </TouchableOpacity> */}

                  <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 20,
                      top: 20,
                      width: 50,
                      height: 24, backgroundColor: "#FCB0BA", borderRadius: 5,
                    }} 
                  >
                    <Text style={{
                      textAlign: 'center', marginTop: 5, color: "#353C40", fontSize: 12,
                      fontFamily: "regular"
                    }}  > Inactive </Text>

                  </TouchableOpacity>


                    <TouchableOpacity style={{
                      position: 'absolute',
                      right: 50,
                      top: 65,
                      width: 30,
                      height: 30,
                      borderBottomLeftRadius: 5,
                      borderTopLeftRadius: 5,
                      borderWidth: 1,
                      borderColor: "lightgray",
                      // borderRadius:5,
                    }} onPress={() => this.handleeditaction(item, index)}>
                      <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/edit.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                      position: 'absolute',
                      right: 20,
                      top: 65,
                      width: 30,
                      height: 30,
                      borderBottomRightRadius: 5,
                      borderTopRightRadius: 5,
                      borderWidth: 1,
                      borderColor: "lightgray",
                    }} onPress={() => this.handledeleteaction(item, index)}>
                      <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/delete.png')} />
                    </TouchableOpacity>
                    <View style={{
                      backgroundColor: 'grey',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      height: 30,
                      width: 90
                    }}>

                    </View>

                  </View>
                )}
              />
                )}


{this.state.flagthree && (
                <FlatList
                data={this.state.poolsData}
                keyExtractor={item => item.email}
                renderItem={({ item, index }) => (
                  <View style={{
                    height: 140,
                    backgroundColor: '#FBFBFB',
                    borderBottomWidth: 5,
                    borderBottomColor: '#FFFFFF',
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    <View style={{ flexDirection: 'column', width: '100%', height: 140, }}>
                    <Text style={{ fontSize: 16,marginLeft:16, marginTop: 20, fontFamily: 'medium', color: '#ED1C24' }}>
                    Ramesh G
                      </Text>
                      
                      <Text style={{ fontSize: 12,marginLeft:16, marginTop: 20,  fontFamily: 'regular', color: '#808080' }}>
                      MOBILE NUMBER
                      </Text>
                      <Text style={{ fontSize: 14,marginLeft:16, marginTop: 0, fontFamily: 'medium', color: '#353C40' }}>
                      +91 XXX XXX 1233
                      </Text>

                     

                      <Text style={{ fontSize: 12,marginLeft:16, marginTop: 6, fontFamily: 'regular', color: '#808080' }}>
                      EXPIRY DATE 
                      </Text>
                      <Text style={{ fontSize: 12, marginLeft:16,marginTop: 0, fontFamily: 'regular', color: '#353C40' }}>
                      3 Dec 2021
                      </Text>
                      <Text style={{ fontSize: 12,marginLeft:170, marginTop: -30, fontFamily: 'regular', color: '#808080' }}>
                      POINTS VALUE 
                      </Text>
                      <Text style={{ fontSize: 12,marginLeft:170, marginTop: 0, fontFamily: 'regular', color: '#353C40' }}>
                      ₹ 500
                      </Text>

                      <Text style={{ fontSize: 12,marginLeft:170, marginTop: -65, fontFamily: 'regular', color: '#808080' }}>
                      LOYALTY POINTS
                      </Text>
                      <Text style={{ fontSize: 12,marginLeft:170, marginTop: 0, fontFamily: 'regular', color: '#353C40' }}>
                      5000
                      </Text>
                    </View>


                    <TouchableOpacity style={{
                      position: 'absolute',
                      right: 50,
                      top: 65,
                      width: 30,
                      height: 30,
                      borderBottomLeftRadius: 5,
                      borderTopLeftRadius: 5,
                      borderWidth: 1,
                      borderColor: "lightgray",
                      // borderRadius:5,
                    }} onPress={() => this.handleeditaction(item, index)}>
                      <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/edit.png')} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                      position: 'absolute',
                      right: 20,
                      top: 65,
                      width: 30,
                      height: 30,
                      borderBottomRightRadius: 5,
                      borderTopRightRadius: 5,
                      borderWidth: 1,
                      borderColor: "lightgray",
                    }} onPress={() => this.handledeleteaction(item, index)}>
                      <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/delete.png')} />
                    </TouchableOpacity>
                    <View style={{
                      backgroundColor: 'grey',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      height: 30,
                      width: 90
                    }}>

                    </View>

                  </View>
                )}
              />
                )}


            </View>
        )
    }
}
export default Promo



const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FAFAFF'
    },
    viewswidth: {
        backgroundColor: '#FFFFFF',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 84,
    },
    input: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 100,
        height: 44,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    phoneinput: {
        justifyContent: 'center',
        margin: 20,
        height: 44,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    createUserinput: {
        justifyContent: 'center',
        margin: 40,
        height: 44,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    signInButton: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        width: '46%',
        marginLeft: 10,
        marginTop: 10,
        height: 40,
        borderRadius: 10,
        fontWeight: 'bold',
        margin: 5,
        // alignSelf:'center',
        // marginBottom:100,
    },
    qty: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        width: '18%',
        marginTop: 10,
        height: 40,
        margin: 5,
        borderRadius: 5,
        fontWeight: 'bold',
    },
    imagealign: {
        marginTop: 16,
        marginRight: 20,
    },
    itemscount: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        width: '18%',
        marginLeft: 0,
        marginTop: 10,
        height: 40,
        borderRadius: 5,
        fontWeight: 'bold',
        margin: 5,
        // alignSelf:'center',
        // marginBottom:100,
    },
    itemDetail: {
        backgroundColor: '#ffffff',

        width: '60%',
        marginLeft: 0,
        marginTop: 10,
        height: 40,
        borderRadius: 5,
        fontWeight: 'bold',
        margin: 5,
        // alignSelf:'center',
        // marginBottom:100,
    },
    signInButtonRight: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        width: '46%',
        marginRight: 10,
        marginTop: 10,
        height: 40,
        borderRadius: 10,
        fontWeight: 'bold',
        margin: 5,
        // alignSelf:'center',
        // marginBottom:100,
    },
    signInButtonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: "regular",
    },
    signInFieldStyle: {
        color: 'black',
        marginLeft: 20,
        marginTop: 5,
        fontSize: 18,
        fontFamily: "regular",
        textAlign: 'left',
    },
    findIteminput: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 1000,
        height: 50,
        backgroundColor: "#DEF1FF",
        borderRadius: 10,
        color: '#001B4A',
        fontFamily: "regular",
        fontSize: 12,
    },
    qtyInput: {
        width: 50,
        height: 25,
        // marginTop: 20,
        // marginBottom: 1000,
        // height: 50,
        // backgroundColor: "#DEF1FF",
        // borderRadius: 10,
        // color: '#001B4A',
        // fontFamily: "regular",
        // fontSize: 12,
    },
    signUptext: {
        marginTop: 40,
        fontFamily: "regular",
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 28,
    },
    saleBillsText: {
        marginLeft: 0,
        marginTop: -20,
        marginBottom: 10,
        fontFamily: "bold",
        color: '#0F2851',
        fontSize: 14,
    },
    tablecontainer: {
        flex: 1,
        // width:deviceWidth,
        marginLeft: 20,
        marginRight: 20,
        padding: 20,
        paddingTop: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FAFAFF'
    },
    head: {
        height: 45,
        borderColor: '#FAFAFF',
        borderWidth: 1,
        borderRadius: 10,
    },
    text: {
        margin: 6,
        color: "#ED1C24",
        fontFamily: "semibold",
        fontSize: 11,
    },
    textData: {
        margin: 6,
        color: "#48596B",
        fontFamily: "regular",
        fontSize: 10,
    },

    Topcontainer: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        marginTop: 20,
        borderColor: '#ED1C24',
        width: '90%',
        //backgroundColor: '#ffffff',
        height: 50,
    },

    TopcontainerforModel: {
        flexDirection: 'row',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
        width: '100%',
        backgroundColor: 'grey',
        borderRadius: 20,
        height: 50,
    },
    TopcontainerforPay: {
        flexDirection: 'row',
        marginLeft: 0,
        marginRight: 0,
        // marginTop: 10,
        width: '100%',
        backgroundColor: '#ffffff',
        borderColor: 'lightgray',
        borderRadius: 0,
        height: 50,
        position: 'absolute',
        bottom: 10,
    },
    TopcontainerforItems: {
        flexDirection: 'row',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
        width: '100%',
        backgroundColor: '#ffffff',
        borderColor: 'lightgray',
        borderRadius: 0,
        height: 50,
    },
    redbox: {
        backgroundColor: "#1CA2FF",
        alignSelf: "flex-start",

        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
    },
    bluebox: {
        backgroundColor: "#ED1C24",
        alignSelf: "flex-start",
        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
    },
    blackbox: {
        backgroundColor: "#ED1C24",
        alignSelf: "flex-start",
        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
    },
    greenbox: {
        backgroundColor: "#ED1C24",
        alignSelf: "flex-start",
        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
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
        backgroundColor: "#ED1C24",
        alignSelf: "flex-start",
        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
    },
    selected: {
        backgroundColor: "#BBE3FF",
        borderWidth: 0,
        backgroundColor: "#ED1C24",
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
        alignSelf: "center",
        marginTop: 10,
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
    },
    btn: {
        width: 40, height: 18, borderWidth: 0.2, borderColor: '#48596B', fontFamily: "regular",
        fontSize: 10,
    },
    btnText: { textAlign: 'center', color: '#fff' }


    ,
    preview: {
        margin: 20,
        height: 300,
        marginTop: 5,
        marginBottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center'
    },
    topOverlay: {
        top: 0,
        flex: 1,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    enterBarcodeManualButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40
    },
    scanScreenMessage: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
