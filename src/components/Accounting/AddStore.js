import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import Loader from '../../commonUtils/loader';
import LoginService from '../services/LoginService';
import UrmService from '../services/UrmService';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default class AddStore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storeState: "",
            storeDistrict: "",
            storeName: "",
            gstNumber: "",
            mobile: "",
            city: "",
            area: "",
            address: "",
            domain: "",
            clientId: 0,
            statesArray: [],
            states: [],
            stateId: 0,
            statecode: '',
            dictrictArray: [],
            dictricts: [],
            districtId: 0,
            domainsArray: [],
            domains: [],
            domainId: 0,
            storeId: 0,
            navtext: '',
            isEdit: false,
        };
    }

    async componentDidMount() {
        const clientId = await AsyncStorage.getItem("custom:clientId1");
        this.setState({ clientId: clientId });
        this.setState({ isEdit: this.props.route.params.isEdit });
        if (this.state.isEdit === true) {
            this.setState({
                stateId: this.props.route.params.item.stateId,
                statecode: this.props.route.params.item.stateCode,
                districtId: this.props.route.params.item.districtId,
                city: this.props.route.params.item.cityId,
                area: this.props.route.params.item.area,
                mobile: this.props.route.params.item.phoneNumber,
                address: this.props.route.params.item.address,
                domainId: this.props.route.params.item.clientDomianlId.clientDomainaId,
                storeName: this.props.route.params.item.name,
                storeId: this.props.route.params.item.id,
            });
            console.log(this.props.route.params.item);
            this.setState({ navtext: 'Edit Store' });
        }
        else {
            this.setState({ navtext: 'Add Store' });
        }



        this.getDomainsList();
        this.getMasterStatesList();
    }

    getDomainsList() {
        this.setState({ domains: [] });
        var domains = [];
        axios.get(LoginService.getDomainsList() + this.state.clientId).then((res) => {
            if (res.data["result"]) {
                let len = res.data["result"].length;
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let number = res.data.result[i];
                        this.state.domainsArray.push({ name: number.domaiName, id: number.clientDomainaId });
                        domains.push({
                            value: this.state.domainsArray[i].name,
                            label: this.state.domainsArray[i].name
                        });

                        if (number.clientDomainaId === this.state.domainId) {
                            this.setState({ domain: this.state.domainsArray[i].name });

                        }

                    }
                    this.setState({
                        domains: domains,
                    });

                    this.setState({ domainsArray: this.state.domainsArray });
                    console.log(this.state.domains);
                }
            }
        }).catch(() => {
            this.setState({ loading: false });
            alert('There Is An Error Getting Domains List');
        });
    }

    handleDomain = (value) => {
        for (let i = 0; i < this.state.domainsArray.length; i++) {
            if (this.state.domainsArray[i].name === value) {
                this.setState({ domainId: this.state.domainsArray[i].id });
            }
        }
        this.setState({ domain: value });
    };



    getMasterStatesList() {
        this.setState({ states: [] });
        this.setState({ loading: false });
        var states = [];
        axios.get(UrmService.getStates()).then((res) => {
            if (res.data["result"]) {

                for (var i = 0; i < res.data["result"].length; i++) {


                    this.state.statesArray.push({ name: res.data["result"][i].stateName, id: res.data["result"][i].stateId, code: res.data["result"][i].stateCode });
                    states.push({
                        value: this.state.statesArray[i].name,
                        label: this.state.statesArray[i].name
                    });

                    if (res.data["result"][i].stateId === this.state.stateId) {
                        console.log('stateId is' + this.state.statesArray[i].name);
                        this.setState({ storeState: this.state.statesArray[i].name });
                        this.getMasterDistrictsList();
                        this.getGSTNumber();
                    }
                }
                this.setState({
                    states: states,
                });
                this.setState({ statesArray: this.state.statesArray });
            }

        });
    }

    handleStoreState = (value) => {
        // this.setState({ stateCode: '' }, () => {
        for (let i = 0; i < this.state.statesArray.length; i++) {
            if (this.state.statesArray[i].name === value) {
                this.setState({ stateId: this.state.statesArray[i].id, statecode: this.state.statesArray[i].code });
            }
        }
        this.getGSTNumber();
        this.setState({ storeState: value }, () => {
            this.getMasterDistrictsList();
        });
        // });
    };

    getMasterDistrictsList() {

        this.setState({ loading: false, dictricts: [], dictrictArray: [] });
        const params = {
            "stateCode": this.state.statecode
        };
        console.log(params);
        axios.get(UrmService.getDistricts(), { params }).then((res) => {
            if (res.data["result"]) {
                this.setState({ loading: false });
                let dictricts = [];
                // this.setState({  });
                // this.setState({ dictrictArray: [] });
                for (var i = 0; i < res.data["result"].length; i++) {
                    this.state.dictrictArray.push({ name: res.data["result"][i].districtName, id: res.data["result"][i].districtId });
                    dictricts.push({
                        value: this.state.dictrictArray[i].name,
                        label: this.state.dictrictArray[i].name
                    });
                    this.setState({
                        dictricts: dictricts,
                    });
                    this.setState({ dictrictArray: this.state.dictrictArray });
                    if (this.state.dictrictArray[i].id === this.state.districtId) {
                        console.log('district name vinod is' + this.state.dictrictArray[i].name);
                        this.setState({ storeDistrict: this.state.dictrictArray[i].name });
                    }
                }
            }

        });
    }

    handleDistrict = (value) => {
        for (let i = 0; i < this.state.dictrictArray.length; i++) {
            if (this.state.dictrictArray[i].name === value) {
                console.log('district name vinod is' + this.state.dictrictArray[i].id);
                this.setState({ districtId: this.state.dictrictArray[i].id });
            }
        }
        this.setState({ storeDistrict: value });
    };


    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    cancel() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleAddress = (value) => {
        this.setState({ address: value });
    };

    handleArea = (value) => {
        this.setState({ area: value });
    };

    handleCity = (value) => {
        this.setState({ city: value });
    };


    handleGstNumber = (value) => {
        this.setState({ gstNumber: value });
    };



    handleMobile = (value) => {
        this.setState({ mobile: value });
    };


    handleStoreName = (value) => {
        this.setState({ storeName: value });
    };

    getGSTNumber() {
        const params = {
            "clientId": this.state.clientId,
            "stateCode": this.state.statecode,
        };
        axios.get(UrmService.getGSTNumber(), { params }).then((res) => {
            console.log(res);
            if (res) {
                this.setState({ gstNumber: res.data.result.gstNumber });
            }
        });
    }

    saveStore() {
        if (this.state.storeState === "") {
            alert("Please Enter All Mandatory Fields");
        } else if (this.state.storeDistrict === "") {
            alert("Please Enter All Mandatory Fields");
        } else if (this.state.domain === "") {
            alert("Please Enter All Mandatory Fields");
        } else if (this.state.storeName === "") {
            alert("Please Enter All Mandatory Fields");
        } else if (this.state.mobile.length === 0 || this.state.mobile.length < 10) {
            alert("Please Enter a valid 10 digit mobile number");
        } else if (this.state.gstNumber.length === 0) {
            alert("Please Enter GST Number");
        }
        else {
            if (this.state.isEdit === false) {
                const saveObj = {
                    "name": this.state.storeName,
                    "stateId": this.state.stateId,
                    "districtId": this.state.districtId,
                    "cityId": this.state.city,
                    "area": this.state.area,
                    "address": this.state.address,
                    "phoneNumber": this.state.mobile,
                    "domainId": this.state.domainId,
                    "createdBy": global.username,
                    "stateCode": this.state.statecode,
                    "gstNumber": this.state.gstNumber,
                    "clientId": this.state.clientId
                };
                console.log('params are' + JSON.stringify(saveObj));
                this.setState({ loading: true });
                axios.post(UrmService.saveStore(), saveObj).then((res) => {
                    console.log(res.data);
                    if (res.data && res.data["isSuccess"] === "true") {
                        this.props.route.params.onGoBack();
                        this.props.navigation.goBack();
                    }
                    else {
                        this.setState({ loading: false });
                        alert(res.data.message);
                    }
                }
                ).catch(() => {
                    this.setState({ loading: false });
                    alert("There is an Error while Saving The Store");
                });
            }
            else {
                const saveObj = {
                    "id": this.state.storeId,
                    "name": this.state.storeName,
                    "stateId": this.state.stateId,
                    "districtId": this.state.districtId,
                    "cityId": this.state.city,
                    "area": this.state.area,
                    "address": this.state.address,
                    "phoneNumber": this.state.mobile,
                    "domainId": this.state.domainId,
                    "createdBy": global.username,
                    "stateCode": this.state.statecode,
                    "gstNumber": this.state.gstNumber,
                    "clientId": this.state.clientId
                };
                console.log("save", saveObj);
                this.setState({ loading: true });
                axios.put(UrmService.editStore(), saveObj).then((res) => {
                    if (res.data && res.data["isSuccess"] === "true") {
                        this.setState({ loading: false });
                        this.props.route.params.onGoBack();
                        this.props.navigation.goBack();
                    }
                    else {
                        this.setState({ loading: false });
                        alert("duplicate record already exists");
                    }
                }
                ).catch(() => {
                    this.setState({ loading: false });
                    alert("There is an Error while Saving the Store");
                });
            }
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
                        {this.state.navtext}
                    </Text>
                </View>
                <ScrollView>
                    <Text
                        style={{
                            color: "#ED1C24",
                            fontSize: Device.isTablet ? 19 : 14,
                            fontFamily: 'medium',
                            margin: 15,
                        }}
                    >Store Details</Text>
                    <Text style={{ fontSize: Device.isTablet ? 20 : 15, marginLeft: 20, marginBottom: 10, marginTop: 10 }}>Store <Text style={{ color: '#aa0000' }}>*</Text></Text>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            // style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                            placeholder={{
                                label: 'STATE'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.states}
                            onValueChange={this.handleStoreState}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.storeState}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <Text style={{ fontSize: Device.isTablet ? 20 : 15, marginLeft: 20, marginBottom: 10, marginTop: 10 }}>District <Text style={{ color: '#aa0000' }}>*</Text></Text>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            // style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                            placeholder={{
                                label: 'DISTRICT'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.dictricts}
                            onValueChange={this.handleDistrict}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.storeDistrict}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: Device.isTablet ? 20 : 15 }}>City</Text>
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="CITY"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.city}
                        onChangeText={this.handleCity}
                    />
                    <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: Device.isTablet ? 20 : 15 }}>Area</Text>
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="AREA"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.area}
                        onChangeText={this.handleArea}
                    />
                    <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: Device.isTablet ? 20 : 15 }}>Store Phone Number <Text style={{ color: '#aa0000' }}>*</Text></Text>
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="MOBILE"
                        maxLength={10}
                        keyboardType={'numeric'}
                        textContentType='telephoneNumber'
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.mobile}
                        onChangeText={this.handleMobile}
                    />
                    <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: Device.isTablet ? 20 : 15 }}>Address</Text>
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="ADDRESS"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.address}
                        onChangeText={this.handleAddress}
                    />
                    <Text
                        style={{
                            color: "#ED1C24",
                            fontSize: Device.isTablet ? 19 : 14,
                            fontFamily: 'medium',
                            margin: 15,
                        }}
                    >Store Info</Text>
                    <Text style={{ fontSize: Device.isTablet ? 20 : 15, marginLeft: 20, marginBottom: 10, marginTop: 10 }}>Domain <Text style={{ color: '#aa0000' }}>*</Text></Text>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            // style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                            placeholder={{
                                label: 'DOMAIN'
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
                    <Text style={{ fontSize: Device.isTablet ? 20 : 15, marginLeft: 20, marginBottom: 10, marginTop: 10 }}>Store Name <Text style={{ color: '#aa0000' }}>*</Text></Text>
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="STORE NAME"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.storeName}
                        onChangeText={this.handleStoreName}
                    />
                    {this.state.isEdit === true && (
                        <TextInput
                            style={Device.isTablet ? styles.input_tablet_edit : styles.input_mobile_edit}
                            underlineColorAndroid="transparent"
                            placeholder="GST NUMBER"
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.gstNumber}
                            editable={false} selectTextOnFocus={false}
                            onChangeText={this.handleGstNumber}
                        />
                    )}
                    {this.state.isEdit === false && (
                        <View>
                            <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: Device.isTablet ? 20 : 15 }}>GST Number</Text>
                            <TextInput
                                style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                underlineColorAndroid="transparent"
                                placeholder="GST NUMBER"
                                placeholderTextColor="#6F6F6F"
                                textAlignVertical="center"
                                autoCapitalize="none"
                                value={this.state.gstNumber}
                                onChangeText={this.handleGstNumber}
                            />
                            <Text style={{ color: '#aa0000', fontSize: Device.isTablet ? 20 : 15, marginTop: 10, marginBottom: 20, marginLeft: 20 }}>Please Provide GST Number</Text>
                        </View>
                    )}


                    <TouchableOpacity style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile}
                        onPress={() => this.saveStore()}>
                        <Text style={Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile}>SAVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Device.isTablet ? styles.cancelButton_tablet : styles.cancelButton_mobile}
                        onPress={() => this.cancel()}>
                        <Text style={Device.isTablet ? styles.cancelButtonText_tablet : styles.cancelButtonText_mobile}>CANCEL</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
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
});

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
});

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imagealign: {
        marginTop: Device.isTablet ? 25 : 20,
        marginRight: Device.isTablet ? 30 : 20,
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
    input_mobile_edit: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        height: 44,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#DCE3F2',
        borderRadius: 3,
        backgroundColor: '#DCE3F2',
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
    flatlistContainer_mobile: {
        height: 140,
        backgroundColor: '#FBFBFB',
        borderBottomWidth: 5,
        borderBottomColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flatlistSubContainer_mobile: {
        flexDirection: 'column',
        width: '100%',
        height: 140,
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
    input_tablet_edit: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        height: 54,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#DCE3F2',
        borderRadius: 3,
        backgroundColor: '#DCE3F2',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    saveButton_tablet: {
        margin: 8,
        height: 60,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
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
    flatlistContainer_tablet: {
        height: 160,
        backgroundColor: '#FBFBFB',
        borderBottomWidth: 5,
        borderBottomColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flatlistSubContainer_tablet: {
        flexDirection: 'column',
        width: '100%',
        height: 160,
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

});
