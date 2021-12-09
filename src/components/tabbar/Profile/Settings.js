import React, { Component, useState } from 'react'
import { View, Image, FlatList, Animated, ImageBackground, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ActivityIndicator, scrollview, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';
import { openDatabase } from 'react-native-sqlite-storage';
// Connction to access the pre-populated db
const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });
const createdb = openDatabase({ name: 'create_items.db', createFromLocation: 1 });
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileService from '../../services/ProfileService';
import axios from 'axios';
import Loader from '../../loader';




class Settings extends Component {
    constructor(props) {
        super(props);
        this.camera = null;
        this.barcodeCodes = [];
        this.state = {
            barcodeId: "",
            selectedGender: '',
            date: new Date(),
            datepickerOpen: false,
            userName:"",
            role:"",
            email:"",
            mobileNumber:"",
            dateOfBirth:"",
            address:"",
            userId:0,
        }
    }

    handleGender = (value) => {
        this.setState({ selectedGender: value });
    }

    handleUserName = (value) => {
        this.setState({ userName: value });
    }

    handleRole = (value) => {
        this.setState({ role: value });
    }

    handleMobileNumber = (value) => {
        this.setState({ mobileNumber: value });
    }

    handleEmail = (value) => {
        this.setState({ email: value });
    } 

    handleAddress = (value) => {
        this.setState({ address: value });
    } 

    datepickerCancelClicked() {
        this.setState({ date: new Date() })
        this.setState({ datepickerOpen: false })
    }

    datepickerDoneClicked() {
        if(parseInt(this.state.date.getDate()) < 10){
            this.setState({ dateOfBirth: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-0" + this.state.date.getDate() })
        }
        else{
            this.setState({ dateOfBirth: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate() })   
        }
        this.setState({ datepickerOpen: false })
    }

    datepickerClicked() {
        this.setState({ datepickerOpen: true })
    }

    profileUpdate() {
        if(this.state.dateOfBirth === "Date Of Birth"){
            this.state.dateOfBirth = null
         }

        const params = {
                "userId":this.state.userId,
                "email": this.state.email,
                "phoneNumber": this.state.mobileNumber,
                "birthDate":this.state.dateOfBirth,
                "gender": this.state.selectedGender,
                "name": this.state.userName,
                "username": this.state.userName,
                // "parentId": "1",
                // "domianId": "1",
                "address":this.state.address,
                "clientId":"123"
                // "role": {
                //     "roleName": "config_user"
                // }
                // "stores": [
                //     {
                //         "name":"Vizag"
                //     },
                //     {
                //         "name":"kakinada"
                //     }
                // ],
                // "clientId": "801",
                // "isConfigUser": "true",
                // "clientDomain": [1,2]
        }

        console.log('params are' + JSON.stringify(params))
        this.setState({ loading: true })  
    axios.put(ProfileService.updateUser(), params).then((res) => {
        if (res.data && res.data["isSuccess"] === "true") {
            this.setState({ loading: false })
        }
        else {
            this.setState({ loading: false })
            // this.setState({ loading: false })
            alert("user Update issue");
        }
    }
    ).catch(() => {
        this.setState({ loading: false })
        alert('Update Api error')
    })
    }

    async componentDidMount() {
        var phonenumber = ""
        AsyncStorage.getItem("phone_number").then((value) => {
            phonenumber = value
        }).catch(() => {
            console.log('there is error getting phone numner')
        })
        const username = await AsyncStorage.getItem("username");
        //console.log(ProfileService.getUser() + "+919895695626")
        this.setState({ loading: true })
        axios.get(ProfileService.getUser() + username).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                    this.setState({ loading: false })
                    this.setState({ userId: res.data["result"].userId })
                    this.setState({ userName: res.data["result"].userName })
                    this.setState({ role: res.data["result"].roleName })
                    this.setState({ email: res.data["result"].email })
                    this.setState({ selectedGender: res.data["result"].gender })
                     if(res.data["result"].dob === null){
                        this.setState({ dateOfBirth: 'Date Of Birth' }) 
                     }
                     else{
                    this.setState({ dateOfBirth: res.data["result"].dob })
                     }
                    this.setState({ address: res.data["result"].address })
                    this.setState({ mobileNumber: phonenumber})
                }
            }).catch(() => {
                this.setState({ loading: false })
                alert('No user details get')
            })
    }

    
    
    signOut(){
        AsyncStorage.removeItem('phone_number');
        this.props.navigation.push('Login'); 
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
                    }}> Profile </Text>

<TouchableOpacity
                        style={{ position: 'absolute', right: 20, top: 47, backgroundColor: '#ffffff', borderRadius: 5, width: 30, height: 32, }}
                        onPress={() => this.signOut()} >
                        <Image style={{ alignSelf: 'center', top: 5 }} source={require('../../assets/images/applogout.png')} />
                    </TouchableOpacity>

                </View>

                <KeyboardAwareScrollView KeyboardAwareScrollView
                    enableOnAndroid={true}>
                    <View>
                        {this.state.loading &&
                            <Loader
                                loading={this.state.loading} />
                        }
                        <View style={{
                            flex: 1, justifyContent: 'center', //Centered horizontally
                            alignItems: 'center', color: '#ffffff'
                        }}>
                            <View style={{ flexDirection: 'column', flex: 0, marginLeft: 0, marginTop: 10, marginRight: 0, backgroundColor: "#ffffff", borderRadius: 20, }}>

                                <Image
                                    style={{ width: 80, height: 80, resizeMode: "cover", marginTop: 20, borderRadius: 40, borderColor: '#F2F2F2', alignSelf: 'center', borderWidth: 2, }}
                                    source={this.state.image}
                                />
                                <TouchableOpacity style={{ width: 30, height: 30, borderRadius: 10, alignSelf: 'center', top: -20, left: 15 }}>
                                    <Image
                                        style={{ width: 30, height: 30, borderRadius: 10, }}
                                        source={require('../../assets/images/cameraclick.png')} />

                                </TouchableOpacity>




                                {this.state.flagqtyModelOpen && (
                                    <View>
                                        <Modal isVisible={this.state.modalVisible}>
                                            <View style={{
                                                flex: 1, justifyContent: 'center', //Centered horizontally
                                                alignItems: 'center',
                                            }}>
                                                <View style={{
                                                    position: 'absolute',
                                                    right: 20,
                                                    left: 20,
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-start',
                                                    backgroundColor: "#ffffff", borderRadius: 20,
                                                }}>
                                                    <TouchableOpacity
                                                        style={{ backgroundColor: '#ED1C24', borderRadius: 5, width: 200, marginTop: 20, height: 32, alignSelf: 'center' }}
                                                        onPress={() => this.pickSingleWithCameraForProductsAdd(true)} >
                                                        <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('Select Product Image With Camera')} </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        style={{ backgroundColor: '#ED1C24', borderRadius: 5, width: 200, marginTop: 20, height: 32, alignSelf: 'center' }}
                                                        onPress={() => this.pickSingleForProductsAdd(true)} >
                                                        <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('Select Product Image With Gallery')} </Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        style={{ backgroundColor: '#ED1C24', borderRadius: 5, width: 200, marginTop: 20, height: 32, alignSelf: 'center', marginBottom: 20, }}
                                                        onPress={() => this.cancel()} >
                                                        <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('Cancel')} </Text>
                                                    </TouchableOpacity>

                                                </View>
                                            </View>
                                        </Modal>
                                    </View>)}


                                <Text></Text>

                                <View style={{ marginTop: 0, width: deviceWidth }}>

                                    <Text style={{
                                        position: 'absolute',
                                        left: 20,
                                        top: 0,
                                        width: 300,
                                        height: 20,
                                        fontFamily: 'regular',
                                        fontSize: 12,
                                        color: '#353C40'
                                    }}> NAME: </Text>

                                    <TextInput style={styles.barcodeinput}
                                        underlineColorAndroid="transparent"
                                        placeholder="NAME"
                                        editable={false} selectTextOnFocus={false}
                                        placeholderTextColor="#353C4050"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.userName}
                                        onChangeText={this.handleUserName}
                                    />

                                   
                                </View>

                                <Text style={{
                                    position: 'absolute',
                                    left: 20,
                                    top: 220,
                                    width: 300,
                                    height: 20,
                                    fontFamily: 'regular',
                                    fontSize: 12,
                                    color: '#353C40'
                                }}> DIGIGNATION: </Text>

                                <TextInput style={styles.barcodeinput}
                                    editable={false} selectTextOnFocus={false}
                                    underlineColorAndroid="transparent"
                                    placeholder="DIGIGNATION"
                                    placeholderTextColor="#353C4050"
                                    textAlignVertical="center"
                                    autoCapitalize="none"
                                    value={this.state.role}
                                    onChangeText={this.handleRole}
                                />

                                <View>
                                    <Text style={{
                                        position: 'absolute',
                                        left: 20,
                                        top: 0,
                                        width: 300,
                                        height: 20,
                                        fontFamily: 'regular',
                                        fontSize: 12,
                                        color: '#353C40'
                                    }}> EMAIL: </Text>

                                    <TextInput style={styles.phoneinput}
                                        underlineColorAndroid="transparent"
                                        placeholder="EMAIL"
                                        placeholderTextColor="#353C4050"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.email}
                                        onChangeText={this.handleEmail}
                                    />

                                    {/* <TouchableOpacity style={{
                        position: 'absolute',
                        right: 28,
                        top: 20,
                      }} >

                        <Text style={{ color: '#353C4050', fontFamily: 'regular', fontSize: 14, position: 'absolute', right: 0, }}> {'Select Unit >'} </Text>
                      </TouchableOpacity> */}
                                </View>

                                <View>
                                    <Text style={{
                                        position: 'absolute',
                                        left: 20,
                                        top: 0,
                                        width: 300,
                                        height: 20,
                                        fontFamily: 'regular',
                                        fontSize: 12,
                                        color: '#353C40'
                                    }}> MOBILE NUMBER: </Text>

                                    <TextInput style={styles.phoneinput}
                                        underlineColorAndroid="transparent"
                                        placeholder="MOBILE NUMBER"
                                        placeholderTextColor="#353C4050"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.mobileNumber}
                                        onChangeText={this.handleMobileNumber}
                                    />
                                </View>

                                <Text style={{
                                    position: 'absolute',
                                    left: 20,
                                    top: 445,
                                    width: 300,
                                    height: 20,
                                    fontFamily: 'regular',
                                    fontSize: 12,
                                    color: '#353C40'
                                }}> GENDER: </Text>

                                <View style={{
                                    justifyContent: 'center',
                                    margin: 20,
                                    height: 44,
                                    marginTop: 25,
                                    marginBottom: 10,
                                    borderColor: '#8F9EB717',
                                    borderRadius: 3,
                                    backgroundColor: '#FBFBFB',
                                    borderWidth: 1,
                                    fontFamily: 'regular',
                                    paddingLeft: 15,
                                    fontSize: 14,
                                }} >
                                    <RNPickerSelect style={{
                                        color: '#8F9EB717',
                                        fontWeight: 'regular',
                                        fontSize: 15
                                    }}
                                        placeholder={{
                                            label: 'SELECT GENDER',
                                            value: " ",
                                        }}
                                        Icon={() => {
                                            return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                        }}
                                        items={[
                                            { label: 'MALE', value: 'MALE' },
                                            { label: 'FEMALE', value: 'FEMALE' },
                                            { label: 'PREFER NOT TO SAY', value: 'PREFER NOT TO SAY' },
                                        ]}
                                        onValueChange={this.handleGender}
                                        style={pickerSelectStyles}
                                        value={this.state.selectedGender}
                                        useNativeAndroidPickerStyle={false}

                                    /> 
                                 </View>


                               

                                <Text style={{
                                    position: 'absolute',
                                    left: 20,
                                    top: 525,
                                    width: 300,
                                    height: 20,
                                    fontFamily: 'regular',
                                    fontSize: 12,
                                    color: '#353C40'
                                }}> DATE OF BIRTH: </Text>

                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center',
                                    margin: 20,
                                    height: 44,
                                    marginTop: 25,
                                    marginBottom: 10,
                                    borderColor: '#8F9EB717',
                                    borderRadius: 3,
                                    backgroundColor: '#FBFBFB',
                                    borderWidth: 1,
                                    fontFamily: 'regular',
                                    paddingLeft: 15,
                                    fontSize: 14,
                                    }} testID="openModal"

                                    onPress={() => this.datepickerClicked()}
                                >
                                    <Text style={{
                                        marginLeft: 0, marginTop: 0, color: "#6F6F6F", fontSize: 15,
                                        fontFamily: "regular"
                                    }}  > {this.state.dateOfBirth} </Text>
                                    <Image style={{ position: 'absolute', top: 5, right: 0, }} source={require('../../assets/images/calender.png')} />
                                </TouchableOpacity>


                                <View>
                                    <Text style={{
                                        position: 'absolute',
                                        left: 20,
                                        top: 0,
                                        width: 300,
                                        height: 20,
                                        fontFamily: 'regular',
                                        fontSize: 12,
                                        color: '#353C40'
                                    }}> ADDRESS: </Text>


                                <TextInput style={styles.phoneinput}
                                    underlineColorAndroid="transparent"
                                    placeholder="ADDRESS"
                                    placeholderTextColor="#353C4050"
                                    textAlignVertical="center"
                                    autoCapitalize="none"
                                    value={this.state.address}
                                    onChangeText={this.handleAddress}
                                     />
                                     </View>

                                <View>
                                  

                                    {/* <TouchableOpacity style={{
                        position: 'absolute',
                        right: 28,
                        top: 20,
                      }}

                      >
                        <Text style={{ color: '#353C4050', fontFamily: 'regular', fontSize: 14, position: 'absolute', right: 0, }}> {'%'} </Text>
                      </TouchableOpacity> */}

                                </View>



                                <TouchableOpacity
                                    style={{
                                        margin: 20,
                                        height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                                    }} onPress={() => this.profileUpdate()}
                                >
                                    <Text style={{
                                        textAlign: 'center', marginTop: 20, color: "#ffffff", fontSize: 15,
                                        fontFamily: "regular"
                                    }}  > SAVE </Text>

                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </KeyboardAwareScrollView>

                {this.state.datepickerOpen && (
                                    <View style={{ height: 280, width: deviceWidth, backgroundColor: 'ffffff' }}>
                                        <TouchableOpacity
                                            style={{
                                                position: 'absolute',
                                                left: 20,
                                                top: 10,
                                                height: 30, backgroundColor: "#ED1C24", borderRadius: 5,
                                            }} onPress={() => this.datepickerCancelClicked()}
                                        >
                                            <Text style={{
                                                textAlign: 'center', marginTop: 5, color: "#ffffff", fontSize: 15,
                                                fontFamily: "regular"
                                            }}  > Cancel </Text>

                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={{
                                                position: 'absolute',
                                                right: 20,
                                                top: 10,
                                                height: 30, backgroundColor: "#ED1C24", borderRadius: 5,
                                            }} onPress={() => this.datepickerDoneClicked()}
                                        >
                                            <Text style={{
                                                textAlign: 'center', marginTop: 5, color: "#ffffff", fontSize: 15,
                                                fontFamily: "regular"
                                            }}  > Done </Text>

                                        </TouchableOpacity>
                                        <DatePicker style={{ width: deviceWidth, height: 200, marginTop: 50, }}
                                            date={this.state.date}
                                            mode={'date'}
                                            onDateChange={(date) => this.setState({ date })}
                                        />
                                    </View>
                                )}
            </View>
        )
    }
}
export default Settings

const pickerSelectStyles = StyleSheet.create({
    placeholder: {
        color: "#353C4050",
        fontFamily: "regular",
        fontSize: 15,
    },
    inputIOS: {
        justifyContent: 'center',
        height: 42,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        //paddingLeft: -20,
        fontSize: 15,
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',
    },
    inputAndroid: {
        justifyContent: 'center',
        height: 42,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        //paddingLeft: -20,
        fontSize: 15,
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',

        // marginLeft: 20,
        // marginRight: 20,
        // marginTop: 10,
        // height: 40,
        // backgroundColor: '#ffffff',
        // borderBottomColor: '#456CAF55',
        color: '#001B4A',
        // fontFamily: "bold",
        // fontSize: 16,
        // borderRadius: 3,
    },
})


const styles = StyleSheet.create({
    barcodeinput: {
        justifyContent: 'center',
        margin: 20,
        height: 44,
        marginTop: 20,
        marginBottom: 10,
        borderColor: '#DCE3F2',
        borderRadius: 3,
        backgroundColor: '#DCE3F2',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
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
        marginTop: 20,
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
