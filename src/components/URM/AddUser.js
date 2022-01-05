import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { Chevron } from 'react-native-shapes';
import Loader from '../loader';
import axios from 'axios';
import Device from 'react-native-device-detection';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker'
import LoginService from '../services/LoginService';
import UrmService from '../services/UrmService';

var deviceWidth = Dimensions.get('window').width;

export default class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dob: "",
            gender: "",
            mobile: "",
            email: "",
            address: "",
            domain: "",
            role: "",
            store: "",
            isSuperAdmin: false,
            date: new Date(),
            doneButtonClicked: false,
            issuperAdmin: false,
            domains: [],
            stores: [],
            domainId: 0,
            domainsArray: [],
            storesArray: [],
            rolesArray: [],
            roleId: 0,
            roles: [],
            clientId: 0,
            storeId: 0,
            isEdit: false,
            adminRole:'',
            storeNames:[],
        }
    }

    async componentDidMount() {
        const clientId = await AsyncStorage.getItem("custom:clientId1");
        this.setState({ clientId: clientId });
        this.getDomainsList()
    }

    async getDomainsList() {
        this.setState({ domains: [],domainsArray: []  });
        var domains = [];
        axios.get(LoginService.getDomainsList() + this.state.clientId).then((res) => {
            if (res.data["result"]) {
                let len = res.data["result"].length;
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let number = res.data.result[i]

                        this.state.domainsArray.push({ name: number.domaiName, id: number.clientDomainaId })
                        domains.push({
                            value: this.state.domainsArray[i].name,
                            label: this.state.domainsArray[i].name
                        });
                        this.setState({
                            domains: domains,
                        })

                        this.setState({ domainsArray: this.state.domainsArray })
                        //  if (this.state.isEdit === false) {
                        this.setState({ domain: this.state.domainsArray[0].name })
                        this.setState({ domainId: this.state.domainsArray[0].id })
                        this.getStores()
                        this.getRoles()
                    }
                }
            }
        }).catch(() => {
            this.setState({ loading: false });
        });
    }

    getStores() {
        const params = {
            "clientDomianId": this.state.domainId
        };
       // console.log('sfsdfsdff' + this.state.domainId);

        this.setState({ stores: [],storesArray: [] });
        var stores = [];
        axios.get(LoginService.getUserStoresForSuperAdmin(), { params }).then((res) => {
            let len = res.data["result"].length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    let number = res.data.result[i]
                    this.state.storesArray.push({ name: number.name, id: number.id })
                    stores.push({
                        value: this.state.storesArray[i].name,
                        label: this.state.storesArray[i].name
                    });
                    this.setState({
                        stores: stores,
                    })
                }
                this.setState({ storesArray: this.state.storesArray })
            }
        }).catch(() => {
            this.setState({ loading: false });
        });

    }

    getRoles() {
        this.setState({ roles: [],rolesArray: [] });
        var roles = [];
        axios.get(UrmService.getRolesByDomainId() + this.state.domainId).then((res) => {
            let len = res.data["result"].length;
          //  console.log(res.data["result"])
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    let number = res.data.result[i]
                    this.state.rolesArray.push({ name: number.roleName, id: number.roleId })
                    roles.push({
                        value: this.state.rolesArray[i].name,
                        label: this.state.rolesArray[i].name
                    });
                    this.setState({
                        roles: roles,
                    })
                }
                this.setState({ rolesArray: this.state.rolesArray })
              //  console.log(this.state.rolesArray)
            }
        }).catch(() => {
            this.setState({ loading: false });
        });

    }

    datepickerClicked() {
        this.setState({ datepickerOpen: true })
    }

    datepickerDoneClicked() {
        if (parseInt(this.state.date.getDate()) < 10 && (parseInt(this.state.date.getMonth()) < 10)) {
            this.setState({ dob:"0" + this.state.date.getDate()  + "-0" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getFullYear(), doneButtonClicked: true, datepickerOpen: false })
        }
        else if (parseInt(this.state.date.getDate()) < 10) {
            this.setState({ dob:"0" + this.state.date.getDate()  + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getFullYear(), doneButtonClicked: true, datepickerOpen: false })
        }
        else if (parseInt(this.state.date.getMonth()) < 10) {
            this.setState({ dob:this.state.date.getDate()  + "-0" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getFullYear(), doneButtonClicked: true, datepickerOpen: false })
        }
        else {
            this.setState({ dob:this.state.date.getDate()  + "-" + (this.state.date.getMonth() + 1) + "-" +  this.state.date.getFullYear(), doneButtonClicked: true, datepickerOpen: false })
        }
    }

    datepickerCancelClicked() {
        this.setState({ date: new Date(), datepickerOpen: false })
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleDomain = (value) => {
        this.setState({ domain: value })
        this.setState({ domainId: 0 })
        for (let i = 0; i < this.state.domainsArray.length; i++) {
            if (this.state.domainsArray[i].name === value) {
                this.setState({ domainId: this.state.domainsArray[i].id,stores: [], storesArray: [] })
                this.getStores()
                this.getRoles()
            }
        }

    }

    handleStore = (value) => {
        this.setState({ store: value })
        for (let i = 0; i < this.state.storesArray.length; i++) {
            if (this.state.storesArray[i].name === value) {
                this.state.storeNames.push({name:this.state.storesArray[i].name})
                this.setState({ storeId: this.state.storesArray[i].id,storeNames:this.state.storeNames })
            }
        }
    }

    handleRole = (value) => {
        this.setState({ role: value })
        for (let i = 0; i < this.state.rolesArray.length; i++) {
            if (this.state.rolesArray[i].name === value) {
                this.setState({ roleId: this.state.rolesArray[i].id })
            }
        }
    }

    handleName = (value) => {
        this.setState({ name: value });
    }

    handleAddress = (value) => {
        this.setState({ address: value });
    }

    handleMobile = (value) => {
        this.setState({ mobile: value });
    }

    handleEmail = (value) => {
        this.setState({ email: value });
    }

    handleGender = (value) => {
        this.setState({ gender: value })
    }

    issuperAdmin() {
        if (this.state.isSuperAdmin === true) {
            this.setState({ isSuperAdmin: false });
        }
        else {
            this.getPrivilegesByDomainId()
            this.setState({ isSuperAdmin: true });
        }

    }

    getPrivilegesByDomainId(){
    axios.get(UrmService.getPrivillagesForDomain() + 0).then((res) => {
        if (res.data && res.data["isSuccess"] === "true") {
            let len = res.data["result"].length;
          this.setState({adminRole: res.data.result[0].name });
             console.log(this.state.adminRole)
        }
    });
}

    saveUser() {
        if (this.state.name === "") {
            alert("Please Enter Name");
        } else if (this.state.mobile.length !== 10) {
            alert("Please Enter correct mobile number");
        } else if (this.state.email === "") {
            alert("Please Enter email");
        }
        else {
            const clientDomain = this.state.domainId !== 0 ? this.state.domainId : this.state.clientId;
            const saveObj = {
                "email": this.state.email,
                "phoneNumber": "+91".concat(this.state.mobile),
                "birthDate": this.state.dob,
                "gender": this.state.gender,
                "name": this.state.name,
                "username": this.state.name,
                "assginedStores": "kphb",
                "parentId": "1",
                "domianId": this.state.domainId,
                "address": this.state.address,
                "role": {
                    "roleName": this.state.isSuperAdmin ? this.state.adminRole : this.state.role,
                },
                "roleName": this.state.isSuperAdmin ? this.state.adminRole : this.state.role,
                "stores": this.state.storeNames,
                "clientId": this.state.clientId,
                "isConfigUser": "false",
                "clientDomain": [clientDomain],
                "isSuperAdmin": JSON.stringify(this.state.isSuperAdmin),
                "createdBy": global.username,

            }
            console.log('params are' + JSON.stringify(saveObj))
            this.setState({ loading: true })
            axios.post(UrmService.saveUser(), saveObj).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                    global.privilages = []
                    this.props.route.params.onGoBack();
                    this.props.navigation.goBack();
                }
                else {
                    this.setState({ loading: false })
                    alert(res.data.message);
                }
            }
            ).catch(() => {
                this.setState({ loading: false });
            });

        }

    }




    render() {
        return (
            <View style={styles.mainContainer}>
                {this.state.loading &&
                    <Loader
                        loading={this.state.loading} />
                }
                <View style={Device.isTablet ? styles.viewsWidth_tablet : styles.viewsWidth_mobile} >
                    <TouchableOpacity style={Device.isTablet ? styles.backButton_tablet : styles.backButton_mobile} onPress={() => this.handleBackButtonClick()}>
                        <Image source={require('../assets/images/backButton.png')} />
                    </TouchableOpacity>
                    <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}>
                        Add User
                    </Text>
                </View>
                <ScrollView>
                    <Text style={[Device.isTablet ? styles.subheading_tablet : styles.subheading_mobile, { marginTop: 7 }]}>
                        User Details
                    </Text>

                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Name"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.userName}
                        onChangeText={this.handleName}
                    />
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                            placeholder={{
                                label: 'Gender'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={[
                                { label: 'Male', value: 'Male' },
                                { label: 'Female', value: 'Female' },
                            ]}
                            onValueChange={this.handleGender}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.gender}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            width: deviceWidth - 40,
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 10,
                            marginBottom: 10,
                            borderColor: '#8F9EB717',
                            borderRadius: 3,
                            height: 50, backgroundColor: "#F6F6F6", borderRadius: 5,
                        }} testID="openModal"

                        onPress={() => this.datepickerClicked()}
                    >
                        <Text style={{
                            marginLeft: 16, marginTop: 20, color: "#6F6F6F", fontSize: 15,
                            fontFamily: "regular"
                        }}  > {this.state.doneButtonClicked == false ? 'DoB' : this.state.dob} </Text>
                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/calender.png')} />
                    </TouchableOpacity>

                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Mobile"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.mobile}
                        onChangeText={this.handleMobile}
                    />
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Email"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.email}
                        onChangeText={this.handleEmail}
                    />
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Address"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.address}
                        onChangeText={this.handleAddress}
                    />

                    <Text style={[Device.isTablet ? styles.subheading_tablet : styles.subheading_mobile, { marginTop: 7 }]}>
                        User Permissions
                    </Text>
                    <TouchableOpacity
                        style={{
                            width: 200, marginTop: 0, marginBottom: 10,
                        }}

                        onPress={() => this.issuperAdmin()}
                    >
                        <Text style={{
                            marginLeft: 40, marginTop: 11, color: "#6F6F6F", fontSize: Device.isTablet ? 20 : 15,
                            fontFamily: "regular", width: 200,
                        }}  > {'Is Super Admin'} </Text>

                        <Image style={{ position: 'absolute', top: 10, left: 20, }} source={
                            //require('../assets/images/chargeunselect.png')}
                            this.state.isSuperAdmin ? require('../assets/images/selected.png') : require('../assets/images/langunselect.png')} />
                    </TouchableOpacity>

                    {this.state.isSuperAdmin === false && (
                        <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                            <RNPickerSelect
                                style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                                placeholder={{
                                    label: 'Domain'
                                }}
                                Icon={() => {
                                    return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                }}
                                items={this.state.domains}
                                onValueChange={this.handleDomain}
                                style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                                value={this.state.domain}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                    )}
                    {this.state.isSuperAdmin === false && (
                        <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                            <RNPickerSelect
                                style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                                placeholder={{
                                    label: 'Select Store'
                                }}
                                Icon={() => {
                                    return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                }}
                                items={this.state.stores}
                                onValueChange={this.handleStore}
                                style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                                value={this.state.store}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                    )}
                    {this.state.isSuperAdmin === false && (
                        <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                            <RNPickerSelect
                                style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                                placeholder={{
                                    label: 'Role'
                                }}
                                Icon={() => {
                                    return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                }}
                                items={this.state.roles}
                                onValueChange={this.handleRole}
                                style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                                value={this.state.role}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                    )}

                    <TouchableOpacity style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile}
                        onPress={() => this.saveUser()}>
                        <Text style={Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile}>SAVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Device.isTablet ? styles.cancelButton_tablet : styles.cancelButton_mobile}
                        onPress={() => this.cancel()}>
                        <Text style={Device.isTablet ? styles.cancelButtonText_tablet : styles.cancelButtonText_mobile}>CANCEL</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomContainer} ></View>
                </ScrollView>
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

const pickerSelectStyles_mobile = StyleSheet.create({
    placeholder: {
        color: "#6F6F6F",
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
        color: '#001B4A',

        // marginLeft: 20,
        // marginRight: 20,
        // marginTop: 10,
        // height: 40,
        // backgroundColor: '#ffffff',
        // borderBottomColor: '#456CAF55',
        // color: '#001B4A',
        // fontFamily: "bold",
        // fontSize: 16,
        // borderRadius: 3,
    },
})

const pickerSelectStyles_tablet = StyleSheet.create({
    placeholder: {
        color: "#6F6F6F",
        fontFamily: "regular",
        fontSize: 20,
    },
    inputIOS: {
        justifyContent: 'center',
        height: 52,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        //paddingLeft: -20,
        fontSize: 20,
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',
    },
    inputAndroid: {
        justifyContent: 'center',
        height: 52,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        //paddingLeft: -20,
        fontSize: 20,
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',
        color: '#001B4A',

        // marginLeft: 20,
        // marginRight: 20,
        // marginTop: 10,
        // height: 40,
        // backgroundColor: '#ffffff',
        // borderBottomColor: '#456CAF55',
        // color: '#001B4A',
        // fontFamily: "bold",
        // fontSize: 16,
        // borderRadius: 3,
    },
})



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    imagealign: {
        marginTop: 16,
        marginRight: 20,
    },
    bottomContainer: {
        margin: 50,
    },

    // Styles For Mobile
    viewsWidth_mobile: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 84,
    },
    backButton_mobile: {
        position: 'absolute',
        left: 10,
        top: 30,
        width: 40,
        height: 40,
    },
    headerTitle_mobile: {
        position: 'absolute',
        left: 70,
        top: 47,
        width: 300,
        height: 20,
        fontFamily: 'bold',
        fontSize: 18,
        color: '#353C40'
    },
    input_mobile: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
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
    rnSelect_mobile: {
        color: '#8F9EB7',
        fontSize: 15
    },
    rnSelectContainer_mobile: {
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
    saveButton_mobile: {
        margin: 8,
        height: 50,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    saveButtonText_mobile: {
        textAlign: 'center',
        marginTop: 15,
        color: "#ffffff",
        fontSize: 15,
        fontFamily: "regular"
    },
    subheading_mobile: {
        fontFamily: 'medium',
        fontSize: 16,
        color: "red",
        marginLeft: 20,
    },
    cancelButton_mobile: {
        margin: 8,
        height: 50,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#353C4050",
    },
    cancelButtonText_mobile: {
        textAlign: 'center',
        marginTop: 15,
        color: "#353C4050",
        fontSize: 15,
        fontFamily: "regular"
    },

    // Styles For Tablet
    viewsWidth_tablet: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 28,
        height: 90,
    },
    backButton_tablet: {
        position: 'absolute',
        left: 10,
        top: 25,
        width: 90,
        height: 90,
    },
    headerTitle_tablet: {
        position: 'absolute',
        left: 70,
        top: 40,
        width: 300,
        height: 40,
        fontFamily: 'bold',
        fontSize: 24,
        color: '#353C40'
    },
    input_tablet: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        height: 54,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 20,
    },
    rnSelect_tablet: {
        color: '#8F9EB7',
        fontSize: 20
    },
    rnSelectContainer_tablet: {
        justifyContent: 'center',
        margin: 20,
        height: 54,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 20,
    },
    saveButton_tablet: {
        margin: 8,
        height: 60,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    subheading_tablet: {
        fontFamily: 'medium',
        fontSize: 21,
        color: "red",
        marginLeft: 20,
    },
    saveButtonText_tablet: {
        textAlign: 'center',
        marginTop: 15,
        color: "#ffffff",
        fontSize: 20,
        fontFamily: "regular"
    },
    cancelButton_tablet: {
        margin: 8,
        height: 60,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#353C4050",
    },
    cancelButtonText_tablet: {
        textAlign: 'center',
        marginTop: 15,
        color: "#353C4050",
        fontSize: 20,
        fontFamily: "regular"
    },

})