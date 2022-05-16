import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import Loader from '../../commonUtils/loader';
import LoginService from '../services/LoginService';
import UrmService from '../services/UrmService';
import { errorLength, urmErrorMessages } from '../Errors/errors';
import Message from '../Errors/Message';
import { cancelBtn, cancelBtnText, datePicker, datePickerBtnText, datePickerButton1, datePickerButton2, datePickerContainer, dateSelector, dateText, inputField, inputHeading, rnPicker, rnPickerContainer, submitBtn, submitBtnText } from '../Styles/FormFields';
import { RW, RF, RH } from '../../Responsive';
import { headerTitle, headerTitleContainer, headerTitleSubContainer, menuButton } from '../Styles/Styles';

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
            storesTempArray: [],
            selectededitStoresArray: [],
            selectedTempStoresArray: [],
            selectedStoresArray: [],
            selectedStoresFinalArray: [],
            rolesArray: [],
            roleId: 0,
            roles: [],
            clientId: 0,
            storeId: 0,
            isEdit: false,
            adminRole: '',
            storeNames: [],
            navtext: '',
            userId: 0,
            errors: {},
            mobileValid: true,
            emailValid: true,
            nameValid: true,
        };
    }

    async componentDidMount() {
        const clientId = await AsyncStorage.getItem("custom:clientId1");

        this.setState({ isEdit: this.props.route.params.isEdit });
        if (this.state.isEdit === true) {
            this.setState({
                userId: this.props.route.params.item.userId,
                name: this.props.route.params.item.userName,
                gender: this.props.route.params.item.gender,
                dob: this.props.route.params.item.dob,
                email: this.props.route.params.item.email,
                address: this.props.route.params.item.address,
                issuperAdmin: this.props.route.params.item.superAdmin,
                domainId: this.props.route.params.item.domian,
                role: this.props.route.params.item.roleName,
                selectededitStoresArray: this.props.route.params.item.stores,
            });

            // if (this.props.route.params.item.phoneNumber !== null) {
            //     this.setState({ mobile: this.props.route.params.item.phoneNumber })
            // }
            this.setState({ navtext: 'Edit User' });
        }
        else {
            this.setState({ navtext: 'Add User' });
        }
        this.setState({ clientId: clientId });
        this.getDomainsList();
    }

    async getDomainsList() {
        this.setState({ domains: [], domainsArray: [] });
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
                        this.getRoles();
                    }
                    this.setState({
                        domains: domains,
                    });
                    this.setState({ domainsArray: this.state.domainsArray });

                    if (this.state.isEdit === true) {
                        for (let i = 0; i < this.state.domainsArray.length; i++) {
                            if (this.state.domainsArray[i].id === this.state.domainId) {
                                this.setState({ domain: this.state.domainsArray[i].name });
                            }
                        }
                    }

                    if (this.state.isEdit === false) {
                        this.setState({ domain: this.state.domainsArray[0].name });
                        this.setState({ domainId: this.state.domainsArray[0].id });
                        this.getStores();
                    }
                }
            }
        }).catch(() => {
            this.setState({ loading: false });
            this.setState({ loading: false });
            // alert("There is an Error getting DomainId");
        });
    }

    getStores() {
        const params = {
            "clientDomianId": this.state.domainId
        };
        // console.log('sfsdfsdff' + this.state.domainId);

        this.setState({ stores: [], storesArray: [] });
        var stores = [];
        this.state.storesArray = [];
        axios.get(LoginService.getUserStoresForSuperAdmin(), { params }).then((res) => {
            let len = res.data["result"].length;
            var namesArray = [];
            if (len > 0) {

                this.setState({ stores: [], storesArray: [], storesTempArray: [] });
                for (let i = 0; i < len; i++) {
                    let number = res.data.result[i];


                    if (this.state.selectededitStoresArray.length > 0) {
                        for (let i = 0; i < this.state.selectededitStoresArray.length; i++) {
                            namesArray.push(this.state.selectededitStoresArray[i].name);
                        }
                        if (namesArray.includes(number.name)) {
                            this.state.selectedTempStoresArray.push({ name: number.name, id: number.id });
                            this.state.storesTempArray.push({ name: number.name, id: number.id, selectedindex: 1 });
                        }
                        else {
                            this.state.storesTempArray.push({ name: number.name, id: number.id, selectedindex: 0 });
                        }
                    } else {
                        this.state.storesTempArray.push({ name: number.name, id: number.id, selectedindex: 0 });
                    }




                }
            }
            this.state.selectedTempStoresArray.forEach(obj => {
                if (!this.state.selectedStoresArray.some(o => o.name === obj.name)) {
                    this.state.selectedStoresArray.push({ ...obj });

                }
                this.setState({ selectedStoresArray: this.state.selectedStoresArray });
            });


            this.state.storesTempArray.forEach(obj => {
                if (!this.state.storesArray.some(o => o.name === obj.name)) {
                    this.state.storesArray.push({ ...obj });

                }
                this.setState({ storesArray: this.state.storesArray });
            });

            // for (let i = 0; i < this.state.storesArray.length; i++) {
            //         if (namesArray.includes(this.state.storesArray[i].name)) {
            //             this.state.storesArray.push({ name: number.name, id: number.id,selectedindex: 1 })
            //         }
            //         else{
            //             this.state.storesArray.push({ name: number.name, id: number.id,selectedindex: 0 })
            //         }
            //     }


        }).catch(() => {
            this.setState({ loading: false });
            this.setState({ loading: false });
            // alert("There is an Error Getting Stores");
        });
    }

    getRoles() {
        this.setState({ roles: [], rolesArray: [] });
        var roles = [];
        axios.get(UrmService.getRolesByDomainId() + this.state.domainId).then((res) => {
            let len = res.data["result"].length;
            //  console.log(res.data["result"])
            if (len > 0) {
                this.setState({ roles: [], rolesArray: [] });
                for (let i = 0; i < len; i++) {
                    let number = res.data.result[i];
                    this.state.rolesArray.push({ name: number.roleName, id: number.roleId });
                    roles.push({
                        value: this.state.rolesArray[i].name,
                        label: this.state.rolesArray[i].name
                    });
                    this.setState({
                        roles: roles,
                    });
                }
                this.setState({ rolesArray: this.state.rolesArray });
                //  console.log(this.state.rolesArray)
            }
        }).catch(() => {
            this.setState({ loading: false });
            this.setState({ loading: false });
            // alert("There is an error Getting Roles");
        });

    }

    datepickerClicked() {
        this.setState({ datepickerOpen: true });
    }

    datepickerDoneClicked() {
        if (parseInt(this.state.date.getDate()) < 10 && (parseInt(this.state.date.getMonth()) < 10)) {
            this.setState({ dob: this.state.date.getFullYear() + "-0" + (this.state.date.getMonth() + 1) + "-0" + this.state.date.getDate() , doneButtonClicked: true, datepickerOpen: false });
        }
        else if (parseInt(this.state.date.getDate()) < 10) {
            this.setState({ dob: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-0" + this.state.date.getDate(), doneButtonClicked: true, datepickerOpen: false });
        }
        else if (parseInt(this.state.date.getMonth()) < 10) {
            this.setState({ dob: this.state.date.getFullYear() + "-0" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate(), doneButtonClicked: true, datepickerOpen: false });
        }
        else {
            this.setState({ dob: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate(), doneButtonClicked: true, datepickerOpen: false });
        }
    }

    datepickerCancelClicked() {
        this.setState({ date: new Date(), datepickerOpen: false });
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleDomain = (value) => {
        for (let i = 0; i < this.state.domainsArray.length; i++) {
            if (this.state.domainsArray[i].name === value) {
                this.setState({ domainId: this.state.domainsArray[i].id, stores: [], storesArray: [] });
            }
        }
        this.setState({ domain: value });
        this.getStores();
        this.getRoles();

    };

    handleStore = (value) => {
        this.setState({ store: value });
        for (let i = 0; i < this.state.storesArray.length; i++) {
            if (this.state.storesArray[i].name === value) {
                this.state.storeNames.push({ name: this.state.storesArray[i].name });
                this.setState({ storeId: this.state.storesArray[i].id, storeNames: this.state.storeNames });
            }
        }
    };

    handleRole = (value) => {
        this.setState({ role: value });
        for (let i = 0; i < this.state.rolesArray.length; i++) {
            if (this.state.rolesArray[i].name === value) {
                this.setState({ roleId: this.state.rolesArray[i].id });
            }
        }
    };

    selectedPrivilage = (item, index) => {
        if (item.selectedindex === 0) {
            item.selectedindex = 1;
            this.state.selectedStoresArray.push({ name: item.name, id: item.id, selectedindex: 1 });
        }
        else {
            console.log('vinodffsfdsfsdfd');
            item.selectedindex = 0;
            //  const list = this.state.selectedStoresArray;
            this.state.selectedStoresArray.splice(index, 1);
            this.setState({ selectedStoresArray: this.state.selectedStoresArray });
        }

        const newArrayList = [];
        this.state.storesArray.forEach(obj => {
            if (!newArrayList.some(o => o.name === obj.name)) {
                newArrayList.push({ ...obj });
            }
        });
        this.setState({ storesArray: newArrayList });
    };

    cancel() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleName = (value) => {
        this.setState({ name: value });
    };

    handleAddress = (value) => {
        this.setState({ address: value });
    };

    handleMobile = (value) => {
        this.setState({ mobile: value });
    };

    handleEmail = (value) => {
        this.setState({ email: value });

    };

    handleGender = (value) => {
        this.setState({ gender: value });
    };

    issuperAdmin() {
        if (this.state.isSuperAdmin === true) {
            this.setState({ isSuperAdmin: false });
        }
        else {
            this.getPrivilegesByDomainId();
            this.setState({ isSuperAdmin: true });
        }

    }

    getPrivilegesByDomainId() {
        axios.get(UrmService.getPrivillagesForDomain() + 0).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                let len = res.data["result"].length;
                this.setState({ adminRole: res.data.result[0].name });
                console.log(this.state.adminRole);
            }
        });
    }

    handleEmailValid = () => {
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailReg.test(this.state.email) === true) {
            this.setState({emailValid: true})
        }
    }

    handleMobileValid = () => {
        if (this.state.mobile.length >= errorLength.mobile) {
            this.setState({mobileValid: true})
        }
    }

    handleNameValid = () => {
        if (this.state.name.length >= errorLength.name) {
            this.setState({nameValid: true})
        }
    }

    validationForm() {
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const mobReg = /^[0-9\b]+$/;
        let isFormValid = true
        let errors = {}
        if (this.state.name.length < errorLength.name) {
            isFormValid = false
            errors["name"] = urmErrorMessages.userName
            this.setState({ nameValid: false })
        }

        if (this.state.mobile.length !== errorLength.mobile || mobReg.test(this.state.mobile) === false) {
            isFormValid = false
            errors["mobile"] = urmErrorMessages.mobile
            this.setState({mobileValid: false})
        }

        if (emailReg.test(this.state.email) === false) {
            isFormValid = false
            errors["email"] = urmErrorMessages.email
            this.setState({emailValid: false})
        }

        this.setState({errors: errors})
        return isFormValid
     }

    saveUser() {
        for (let i = 0; i < this.state.selectedStoresArray.length; i++) {
            if (this.state.selectedStoresArray[i].selectedindex === 1) {
                this.state.selectedStoresFinalArray.push({ name: this.state.selectedStoresArray[i].name, id: this.state.selectedStoresArray[i].id });
            }
        }
        console.log(this.state.selectedStoresFinalArray);
        const isFormValid = this.validationForm()

        if(isFormValid) {
            if (this.state.isEdit === false) {
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
                    "stores": this.state.selectedStoresFinalArray,
                    "clientId": this.state.clientId,
                    "isConfigUser": "false",
                    "clientDomain": [clientDomain],
                    "isSuperAdmin": JSON.stringify(this.state.isSuperAdmin),
                    "createdBy": global.username,

                };
                console.log('params are' + JSON.stringify(saveObj));
                this.setState({ loading: true });
                axios.post(UrmService.saveUser(), saveObj).then((res) => {
                    if (res.data && res.data["isSuccess"] === "true") {
                        global.privilages = [];
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
                    this.setState({ loading: false });
                    alert("There is an Error Saving User");
                });

            }
            else {
                const clientDomain = this.state.domainId !== 0 ? this.state.domainId : this.state.clientId;
                const saveObj = {
                    "email": this.state.email,
                    "userId": this.state.userId,
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
                    "stores": this.state.selectedStoresArray,
                    "clientId": this.state.clientId,
                    "isConfigUser": "false",
                    "clientDomain": [clientDomain],
                    "isSuperAdmin": JSON.stringify(this.state.isSuperAdmin),
                    "createdBy": global.username,

                };
                console.log('params are' + JSON.stringify(saveObj));
                this.setState({ loading: true });
                axios.put(UrmService.editUser(), saveObj).then((res) => {
                    if (res.data && res.data["isSuccess"] === "true") {
                        global.privilages = [];
                        this.props.route.params.onGoBack();
                        this.props.navigation.goBack();
                    }
                    else {
                        this.setState({ loading: false });
                        alert(res.data.message);
                    }
                }
                ).catch((err) => {
                    this.setState({ loading: false });
                    this.setState({ loading: false });
                    alert(err);
                });
            }
        }
    }




    render() {
        const nameValid = this.state.nameValid
        const mobileValid = this.state.mobileValid
        const emailValid = this.state.emailValid
        return (
            <View style={styles.mainContainer}>
                {this.state.loading &&
                    <Loader
                        loading={this.state.loading} />
                }
                <View style={headerTitleContainer} >
                    <View style={headerTitleSubContainer}>
                    <TouchableOpacity style={menuButton} onPress={() => this.handleBackButtonClick()}>
                        <Image style={{marginTop: -5}} source={require('../assets/images/backButton.png')} />
                    </TouchableOpacity>
                    <Text style={headerTitle}>
                        {this.state.navtext}
                    </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={inputHeading}>
                        {I18n.t("User Details")}
                    </Text>
                    <Text style={inputHeading}>{I18n.t("Name")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={[inputField, {borderColor: nameValid ? "#6F6F6F" : "#dd0000"}]}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Name")}
                        placeholderTextColor={nameValid ? "#6F6F6F" : "#dd0000"}
                        textAlignVertical="center"
                        autoCapitalize="none"
                        onBlur={this.handleNameValid}
                        maxLength={25}
                        value={this.state.name}
                        onChangeText={this.handleName}
                    />
                        {!nameValid && <Message imp={true} message={this.state.errors["name"]} />}
                    <Text style={inputHeading}>{I18n.t("Gender")}</Text>
                    <View style={rnPickerContainer}>
                        <RNPickerSelect
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
                            style={rnPicker}
                            value={this.state.gender}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <Text style={inputHeading}>{I18n.t("DOB")}</Text>
                    <TouchableOpacity
                        style={dateSelector} testID="openModal"

                        onPress={() => this.datepickerClicked()}
                    >
                        <Text style={dateText}  > {this.state.dob === '' ? 'DoB' : this.state.dob} </Text>
                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/calender.png')} />
                    </TouchableOpacity>
                    <Text style={inputHeading}>{I18n.t("Mobile")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={[inputField, {borderColor: mobileValid ? "#6F6F6F" : "#dd0000"}]}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Mobile")}
                        placeholderTextColor={mobileValid ? "#6F6F6F" : "#dd0000"}
                        textAlignVertical="center"
                        onBlur={this.handleMobileValid}
                        maxLength={10}
                        keyboardType={'numeric'}
                        textContentType='telephoneNumber'
                        autoCapitalize="none"
                        value={this.state.mobile}
                        onChangeText={this.handleMobile}
                    />
                    {!mobileValid && <Message imp={true} message={this.state.errors["mobile"]} />}
                    <Text style={inputHeading}>{I18n.t("Email")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={[inputField, {borderColor: emailValid ? "#6F6F6F" : "#dd0000"}]}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Email")}
                        onBlur={this.handleEmailValid}
                        placeholderTextColor={emailValid ? "#6F6F6F" : "#dd0000"}
                        keyboardType='email-address'
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.email}
                        onChangeText={this.handleEmail}
                    />
                    {!emailValid && <Message imp={true} message={this.state.errors["email"]} />}
                    <Text style={inputHeading}>{I18n.t("Address")}</Text>
                    <TextInput
                        style={inputField}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Address")}
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.address}
                        onChangeText={this.handleAddress}
                    />

                    <Text style={[inputHeading, { marginTop: 7, color: '#dd0000' }]}>
                        {I18n.t("User Permissions")}
                    </Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <TouchableOpacity
                        style={adminBtn}
                        onPress={() => this.issuperAdmin()}
                    >
                        <Image style={adminBtnImage} source={
                            this.state.isSuperAdmin ? require('../assets/images/selectedMedium.png') : require('../assets/images/langunselectMedium.png')} />
                    </TouchableOpacity>
                        <Text style={adminBtnText}> {I18n.t('Is Super Admin')} </Text>
                    </View>

                    {this.state.isSuperAdmin === false && (
                        <View>
                            <Text style={inputHeading}>{I18n.t("Domain")}</Text>
                            <View style={rnPickerContainer}>
                                <RNPickerSelect
                                    placeholder={{
                                        label: 'Domain'
                                    }}
                                    Icon={() => {
                                        return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                    }}
                                    items={this.state.domains}
                                    onValueChange={this.handleDomain}
                                    style={rnPicker}
                                    value={this.state.domain}
                                    useNativeAndroidPickerStyle={false}
                                />
                            </View>
                        </View>
                    )}
                    {this.state.isSuperAdmin === false && (
                        <View>
                            <Text style={inputHeading}>{I18n.t("Stores")}</Text>
                            <FlatList
                                data={this.state.storesArray}
                                style={{ marginTop: 10, }}
                                scrollEnabled={true}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity onPress={() => this.selectedPrivilage(item, index)}>

                                        <View style={storesSelector}>
                                            <Text>
                                                {item.name}
                                            </Text>

                                            {item.selectedindex === 1 && (
                                                <Image source={require('../assets/images/selectedMedium.png')} style={adminBtnImage} />
                                            )}
                                            {item.selectedindex === 0 && (
                                                <Image source={require('../assets/images/langunselectMedium.png')} style={adminBtnImage} />
                                            )}
                                        </View>

                                        {/* </View> */}
                                    </TouchableOpacity>

                                )}
                            />
                        </View>
                    )}
                    {this.state.isSuperAdmin === false && (
                        <View>
                            <Text style={inputHeading}>{I18n.t("Role")}</Text>
                            <View style={rnPickerContainer}>
                                <RNPickerSelect
                                    placeholder={{
                                        label: 'Role'
                                    }}
                                    Icon={() => {
                                        return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                    }}
                                    items={this.state.roles}
                                    onValueChange={this.handleRole}
                                    style={rnPicker}
                                    value={this.state.role}
                                    useNativeAndroidPickerStyle={false}
                                />
                            </View>
                        </View>
                    )}

                    <TouchableOpacity style={submitBtn}
                        onPress={() => this.saveUser()}>
                        <Text style={submitBtnText}>{I18n.t("SAVE")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={cancelBtn}
                        onPress={() => this.cancel()}>
                        <Text style={cancelBtnText}>{I18n.t("CANCEL")}</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomContainer} ></View>
                </ScrollView>
                {this.state.datepickerOpen && (
                    <View style={datePickerContainer}>
                        <TouchableOpacity
                            style={datePickerButton1} onPress={() => this.datepickerCancelClicked()}
                        >
                            <Text style={datePickerBtnText}  > Cancel </Text>

                        </TouchableOpacity>
                        <TouchableOpacity
                            style={datePickerButton2} onPress={() => this.datepickerDoneClicked()}
                        >
                            <Text style={datePickerBtnText}  > Done </Text>

                        </TouchableOpacity>
                        <DatePicker style={datePicker}
                            date={this.state.date}
                            mode={'date'}
                            onDateChange={(date) => this.setState({ date })}
                        />
                    </View>
                )}
            </View>
        );
    }
}

const adminBtn = {
    width: RW(40),
    // marginTop: RH(5),
    marginBottom: RH(10),
    marginLeft: RW(40),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const adminBtnImage = {
    height: Device.isTablet ? RH(30) : RH(25),
    width: Device.isTablet ? RW(30) : RW(25)
}

const adminBtnText = {
    fontSize: RF(13),
    color: '#000000',
}

const storesSelector = {
    padding: RW(15),
    fontSize: RF(13),
    height: RH(44),
    backgroundColor: '#ffffff',
    fontFamily: 'medium',
    color: '#353C40',
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    imagealign: {
        marginTop: Device.isTablet ? 25 : 20,
        marginRight: Device.isTablet ? 30 : 20,
    },
    bottomContainer: {
        margin: 50,
    },

});