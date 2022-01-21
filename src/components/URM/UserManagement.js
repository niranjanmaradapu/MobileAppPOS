import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import Loader from "../../commonUtils/loader";
import UrmService from '../services/UrmService';


var deviceWidth = Dimensions.get("window").width;


export default class UserManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flagOne: true,
            flagTwo: false,
            flagFilterRoles: false,
            flagFilterUsers: false,
            modalVisible: true,
            createdDate: "",
            date: new Date(),
            role: "",
            createdBy: "",
            branch: "",
            rolesData: [],
            usersData: [],
            roleDelete: false,
            userDelete: false,
            privilages: [],
            clientId: 0,
            doneButtonClicked: false,
            navtext: ''
        };
    }


    async componentDidMount() {
        const clientId = await AsyncStorage.getItem("custom:clientId1");
        this.setState({ clientId: clientId });
        this.setState({ privilages: [] });
        AsyncStorage.getItem("custom:isConfigUser").then((value) => {
            if (value === "true") {
                for (let i = 0; i < 2; i++) {
                    if (i === 0) {
                        this.state.privilages.push({ bool: true, name: "Users" });
                    }
                    else {
                        this.state.privilages.push({ bool: false, name: "Roles" });
                    }
                }
                this.setState({ privilages: this.state.privilages });
            }
            else {
                AsyncStorage.getItem("custom:isSuperAdmin").then((value) => {
                    if (value === "true") {
                        var domainId = "1";
                        if (global.domainName === "Textile") {
                            domainId = "1";
                        }
                        else if (global.domainName === "Retail") {
                            domainId = "2";
                        }
                        else if (global.domainName === "Electrical & Electronics") {
                            domainId = "3";
                        }

                        axios.get(UrmService.getPrivillagesForDomain() + domainId).then((res) => {
                            if (res.data && res.data["isSuccess"] === "true") {
                                let len = res.data["result"].length;
                                if (len > 0) {
                                    if (len > 0) {
                                        for (let i = 0; i < len; i++) {
                                            let previlage = res.data["result"][i];
                                            if (previlage.name === "URM Portal") {
                                                for (let i = 0; i < previlage.subPrivillages.length; i++) {
                                                    console.log(previlage.subPrivillages[i].parentPrivillageId);
                                                    if (previlage.id === previlage.subPrivillages[i].parentPrivillageId) {
                                                        let subprivilage = previlage.subPrivillages[i];
                                                        if (subprivilage.name === "Dashboard") {
                                                            this.setState({ flagOne: false, flagTwo: false });
                                                        }
                                                        if (i === 0) {
                                                            this.state.privilages.push({ bool: true, name: subprivilage.name });
                                                        }
                                                        else {
                                                            this.state.privilages.push({ bool: false, name: subprivilage.name });
                                                        }
                                                    }
                                                }
                                            }
                                            this.setState({ privilages: this.state.privilages });
                                        }
                                    }
                                }
                            }
                        });
                    }
                    else {
                        AsyncStorage.getItem("rolename").then((value) => {
                            axios.get(UrmService.getPrivillagesByRoleName() + value).then((res) => {
                                if (res.data && res.data["isSuccess"] === "true") {
                                    let len = res.data["result"].parentPrivilages.length;
                                    let length = res.data["result"].subPrivilages.length;
                                    // console.log(.name)
                                    if (len > 0) {
                                        for (let i = 0; i < len; i++) {
                                            let previlage = res.data["result"].parentPrivilages[i];
                                            if (previlage.name === "Billing Portal") {

                                                if (length > 0) {
                                                    for (let i = 0; i < length; i++) {
                                                        if (previlage.id === res.data["result"].subPrivilages[i].parentPrivillageId) {
                                                            let subprivilage = res.data["result"].subPrivilages[i];
                                                            if (subprivilage.name === "Dashboard") {
                                                                this.setState({ flagOne: false, flagTwo: false });
                                                            }
                                                            if (i === 0) {
                                                                this.state.privilages.push({ bool: true, name: subprivilage.name });
                                                            }
                                                            else {
                                                                this.state.privilages.push({ bool: false, name: subprivilage.name });
                                                            }
                                                        }
                                                        this.setState({ privilages: this.state.privilages });
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                            });
                        }).catch(() => {
                            console.log('there is error saving domainDataId');
                        });

                    }
                }).catch(() => {
                    console.log('there is error getting storeId');
                });
            }
        }).catch(() => {
            console.log('there is error getting storeId');
        });
        this.getAllUsers();
        this.getRolesList();
    }

    getRolesList() {
        this.setState({ rolesData: [] });
        this.setState({ loading: true });

        axios.get(UrmService.getAllRoles() + this.state.clientId).then((res) => {
            let len = res.data["result"].length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    let number = res.data.result[i];
                    // console.log('sfsdfdfsdfdsfsfsdfs' + number);
                    console.log(number);
                    this.setState({ loading: false });
                    this.state.rolesData.push(number);

                    this.setState({ rolesData: this.state.rolesData });
                }
            }
        }).catch(() => {
            this.setState({ loading: false });
        });
    }

    getAllUsers() {
        this.setState({ usersData: [] });
        this.setState({ loading: true });

        axios.get(UrmService.getAllUsers() + this.state.clientId).then((res) => {
            //console.log('sfsdfdfsdfdsfsfsdfs' + res.data);
            let len = res.data["result"].length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    let number = res.data.result[i];
                    console.log(number);
                    this.setState({ loading: false });

                    // console.log('sadsddsad' + number.stores);
                    let len = number.stores.length;
                    number.storeName = "";
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            if (number.storeName === "") {
                                number.storeName = number.storeName + number.stores[i].name;
                            }
                            else {
                                number.storeName = number.storeName + "," + number.stores[i].name;
                            }
                        }
                    }
                    this.state.usersData.push(number);


                    this.setState({ usersData: this.state.usersData });
                }
            }
        }).catch(() => {
            this.setState({ loading: false });
        });
    }

    topbarAction = (item, index) => {
        if (item.name === "Users") {
            this.setState({ flagOne: true, flagTwo: false });

        }
        else if (item.name === "Roles") {
            this.setState({ flagTwo: true, flagOne: false });
        }
        else if (item.name === "Dashboard") {
            this.setState({ flagTwo: false, flagOne: false });
        }

        if (this.state.privilages[index].bool === true) {
            this.state.privilages[index].bool = false;
        }
        else {
            this.state.privilages[index].bool = true;
        }
        for (let i = 0; i < this.state.privilages.length; i++) {
            if (index != i) {
                this.state.privilages[i].bool = false;
            }
            this.setState({ privilages: this.state.privilages });
        }

    };

    filterAction() {
        if (this.state.flagTwo === true) {
            this.setState({ flagFilterRoles: true });
        } else {
            this.setState({ flagFilterRoles: false });
        }
        if (this.state.flagOne === true) {
            this.setState({ flagFilterUsers: true });
        } else {
            this.setState({ flagFilterUsers: false });
        }
        this.setState({ modalVisible: true });
    }

    modelCancel() {
        this.setState({ modalVisible: false, flagFilterRoles: false, flagFilterUsers: false });
    }

    navigateToCreateRoles() {
        this.props.navigation.navigate('CreateRole', {
            isEdit: false,
            onGoBack: () => this.refresh(),
        });
    }

    refresh() {
        this.getRolesList();
    }



    handleBackButtonClick() {
        this.props.navigation.openDrawer();
    }

    navigateToAddUsers() {
        this.props.navigation.navigate('AddUser', {
            isEdit: false,
            onGoBack: () => this.refreshUsers(),
        });
    }

    refreshUsers() {
        this.getAllUsers();
    }



    topbarAction1() {
        this.getAllUsers();
        this.setState({ flagOne: true, flagTwo: false });
        // this.setState({ flagTwo: false })
    }

    topbarAction2() {
        this.getRolesList();
        this.setState({ flagTwo: true, flagOne: false });
    }

    filterDatepickerClicked() {
        this.setState({ datepickerOpen: true });
    }

    filterDatepickerDoneClicked() {
        if (parseInt(this.state.date.getDate()) < 10) {
            this.setState({ createdDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-0" + this.state.date.getDate(), doneButtonClicked: true, datepickerOpen: false });
        }
        else {
            this.setState({ createdDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate(), doneButtonClicked: true, datepickerOpen: false });
        }
    }

    filterDatepickerCancelClicked() {
        this.setState({ date: new Date(), datepickerOpen: false });
    }

    handleCreatedBy = (value) => {
        this.setState({ createdBy: value });
    };

    handleRole = (value) => {
        this.setState({ role: value });
    };

    handleUSerType = (value) => {
        this.setState({ userType: value });
    };

    handleBranch = (value) => {
        this.setState({ branch: value });
    };

    applyRoleFilter() {
        this.setState({ rolesData: [] });
        const searchRole = {
            "roleName": this.state.role ? this.state.role : null,
            "createdBy": this.state.createdBy ? this.state.createdBy : null,
            "createdDate": this.state.createdDate ? this.state.createdDate : null
        };
        console.log(searchRole);
        axios.post(UrmService.getRolesBySearch(), searchRole).then((res) => {
            if (res) {
                this.setState({ rolesData: res.data.result, modalVisible: false, createdDate: "", role: "", createdBy: "" });

            } else {
                this.setState({ rolesData: res.data.result, modalVisible: false, createdDate: "", role: "", createdBy: "" });
            }

        });
    }

    applyUserFilter() {
        const obj = {
            "id": null,
            "phoneNo": null,
            "name": null,
            "active": this.state.userType === "Active" ? "True" : "False",
            "inActive": this.state.userType === "InActive" ? "True" : "False",
            "roleName": this.state.role ? this.state.role : null,
            "storeName": this.state.createdBy ? this.state.createdBy : null
        };
        this.setState({ usersData: [] });
        console.log(obj);
        axios.post(UrmService.getUserBySearch(), obj).then((res) => {
            if (res) {
                this.setState({ usersData: res.data.result, modalVisible: false, userType: "", role: "", createdBy: "" });

            } else {
                this.setState({ usersData: res.data.result, modalVisible: false, userType: "", role: "", createdBy: "" });
            }

        });
    }

    deleteUser(item, index) {
        alert("you have deleted the user");
        this.setState({ modalVisible: false });
    }

    deleteRole(item, index) {
        alert("you have deleted the role");
        this.setState({ modalVisible: false });
    }

    handleuserdeleteaction(item, index) {
        this.setState({ modalVisible: true, userDelete: true });
    }
    handleRoledeleteaction(item, index) {
        this.setState({ modalVisible: true, roleDelete: true });
    }



    updateRoles() {
        this.getAllRoles();
    }

    updateUsers() {
        this.getAllUsers();
    }

    handleedituser(item, index) {
        this.props.navigation.navigate('AddUser',
            {
                item: item, isEdit: true,
                onGoBack: () => this.updateUsers(),
            });
    }

    handleeditRole(item, index) {
        this.props.navigation.navigate('CreateRole',
            {
                item: item, isEdit: true,
                onGoBack: () => this.updateRoles(),
            });
    }

    updateRoles() {
        this.getRolesList();
    }

    handleRole(item, index) {
        this.props.navigation.navigate('EditRole');
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {this.state.loading &&
                    <Loader
                        loading={this.state.loading} />
                }
                <SafeAreaView style={styles.mainContainer}>
                    <View style={Device.isTablet ? styles.viewsWidth_tablet : styles.viewsWidth_mobile} >
                        <TouchableOpacity style={Device.isTablet ? styles.backButton_tablet : styles.backButton_mobile} onPress={() => this.handleBackButtonClick()}>
                            <Image source={require('../assets/images/menu.png')} />
                        </TouchableOpacity>
                        <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}>
                            URM Portal
                        </Text>
                        {this.state.flagTwo && (
                            <TouchableOpacity style={Device.isTablet ? styles.addBarcodeButton_tablet : styles.addBarcodeButton_mobile} onPress={() => this.navigateToCreateRoles()}>
                                <Text style={Device.isTablet ? styles.addBarcodeButtonText_tablet : styles.addBarcodeButtonText_mobile}>Create Role</Text>
                            </TouchableOpacity>
                        )}
                        {this.state.flagOne && (
                            <TouchableOpacity style={Device.isTablet ? styles.addBarcodeButton_tablet : styles.addBarcodeButton_mobile} onPress={() => this.navigateToAddUsers()}>
                                <Text style={Device.isTablet ? styles.addBarcodeButtonText_tablet : styles.addBarcodeButtonText_mobile}>Add User</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={Device.isTablet ? styles.filterButton_tablet : styles.filterButton_mobile}
                            onPress={() => this.filterAction()} >
                            <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/promofilter.png')} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <View style={styles.container}>

                            <FlatList
                                style={styles.flatList}
                                horizontal
                                data={this.state.privilages}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity style={{
                                        height: 36,
                                        width: 200,
                                        borderWidth: 1,
                                        backgroundColor: item.bool ? '#ED1C24' : '#FFFFFF',
                                        borderColor: item.bool ? '#ED1C24' : '#858585',
                                        borderRadius: 5,
                                        marginLeft: 10,
                                    }} onPress={() => this.topbarAction(item, index)} >

                                        <Text style={{ fontSize: 16, alignItems: 'center', alignSelf: 'center', marginTop: 5, color: item.bool ? "#FFFFFF" : '#858585', fontFamily: 'regular' }}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                ListFooterComponent={<View style={{ width: 15 }}></View>}
                            />


                        </View>

                        {/* <View style={Device.isTablet ? styles.modalContainer_tablet : styles.modalContainer_mobile}>
                        <TouchableOpacity style={[this.state.flagOne ? styles.modalActive : styles.modalInActive, Device.isTablet ? styles.modalButton_tablet : styles.modalButton_mobile, styles.modalButton1]}
                            onPress={() => this.topbarAction1()} >
                            <View>
                                <Text style={[Device.isTablet ? styles.modalButtonText_tablet : styles.modalButtonText_mobile, this.state.flagOne ? styles.modalActiveText : styles.modalInActiveText]}>
                                    Roles
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[this.state.flagTwo ? styles.modalActive : styles.modalInActive, Device.isTablet ? styles.modalButton_tablet : styles.modalButton_mobile, styles.modalButton2]}
                            onPress={() => this.topbarAction2()} >
                            <View>
                                <Text style={[Device.isTablet ? styles.modalButtonText_tablet : styles.modalButtonText_mobile, this.state.flagTwo ? styles.modalActiveText : styles.modalInActiveText]} >
                                    Users
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View> */}
                        {this.state.flagTwo && (
                            <FlatList
                                data={this.state.rolesData}
                                style={{ marginTop: 20, }}
                                scrollEnabled={true}
                                renderItem={({ item, index }) => (
                                    <View style={Device.isTablet ? styles.flatlistContainer_tablet : styles.flatlistContainer_mobile}>
                                        <View style={Device.isTablet ? styles.flatlistSubContainer_tablet : styles.flatlistSubContainer_mobile}>
                                            <Text style={Device.isTablet ? flats.mainText_tablet : flats.mainText_mobile} >S.NO: {index + 1} </Text>
                                            <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>ROLE: {"\n"}{item.roleName}</Text>
                                            <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>DOMAIN: {"\n"}{item.clientDomainVo.domaiName} </Text>
                                            <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>CREATED BY: {"\n"}{item.createdBy}</Text>
                                            <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>USER COUNT:  {item.usersCount}</Text>
                                            <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>DESCRIPTION: {"\n"}{item.discription}</Text>
                                            {this.state.roleDelete && (
                                                <View>
                                                    <Modal isVisible={this.state.modalVisible}>
                                                        <View style={{
                                                            width: deviceWidth,
                                                            alignItems: 'center',
                                                            marginLeft: -20,
                                                            backgroundColor: "#ffffff",
                                                            height: 260,
                                                            position: 'absolute',
                                                            bottom: -20,
                                                        }}>
                                                            <Text style={{
                                                                position: 'absolute',
                                                                left: 20,
                                                                top: 15,
                                                                width: 300,
                                                                height: 20,
                                                                fontFamily: 'medium',
                                                                fontSize: 16,
                                                                color: '#353C40'
                                                            }}> Delete Role </Text>
                                                            <TouchableOpacity style={{
                                                                position: 'absolute',
                                                                right: 20,
                                                                top: 7,
                                                                width: 50, height: 50,
                                                            }} onPress={() => this.modelCancel()}>
                                                                <Image style={{ color: '#ED1C24', fontFamily: 'regular', fontSize: 12, position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/modelcancel.png')} />
                                                            </TouchableOpacity>

                                                            <Text style={{ height: 1, width: deviceWidth, backgroundColor: 'lightgray', marginTop: 50, }}>
                                                            </Text>
                                                            <Text style={{
                                                                position: 'absolute',
                                                                top: 70,
                                                                height: 20,
                                                                textAlign: 'center',
                                                                fontFamily: 'regular',
                                                                fontSize: 18,
                                                                color: '#353C40'
                                                            }}> Are you sure want to delete Role?  </Text>
                                                            <TouchableOpacity
                                                                style={{
                                                                    width: deviceWidth - 40,
                                                                    marginLeft: 20,
                                                                    marginRight: 20,
                                                                    marginTop: 60,
                                                                    height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                                                                }} onPress={() => this.deleteRole(item, index)}
                                                            >
                                                                <Text style={{
                                                                    textAlign: 'center', marginTop: 20, color: "#ffffff", fontSize: 15,
                                                                    fontFamily: "regular"
                                                                }}  > DELETE </Text>

                                                            </TouchableOpacity>

                                                            <TouchableOpacity
                                                                style={{
                                                                    width: deviceWidth - 40,
                                                                    marginLeft: 20,
                                                                    marginRight: 20,
                                                                    marginTop: 20,
                                                                    height: 50, backgroundColor: "#ffffff", borderRadius: 5, borderWidth: 1, borderColor: "#353C4050",
                                                                }} onPress={() => this.modelCancel()}
                                                            >
                                                                <Text style={{
                                                                    textAlign: 'center', marginTop: 20, color: "#353C4050", fontSize: 15,
                                                                    fontFamily: "regular"
                                                                }}  > CANCEL </Text>

                                                            </TouchableOpacity>
                                                        </View>
                                                    </Modal>
                                                </View>
                                            )}
                                            <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.handleeditRole(item, index)}>
                                                <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/edit.png')} />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handleRoledeleteaction(item, index)}>
                                                <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/delete.png')} />

                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                        )}
                        {this.state.flagOne && (
                            <FlatList
                                data={this.state.usersData}
                                style={{ marginTop: 20, }}
                                scrollEnabled={true}
                                renderItem={({ item, index }) => (
                                    <View style={Device.isTablet ? styles.flatlistContainer2_tablet : styles.flatlistContainer2_mobile}>
                                        <View style={Device.isTablet ? styles.flatlistSubContainer_tablet : styles.flatlistSubContainer_mobile}>
                                            <Text style={Device.isTablet ? flats.mainText_tablet : flats.mainText_mobile} >USER ID: {"\n"}{item.userId} </Text>
                                            <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>USER NAME: {"\n"}{item.userName}</Text>
                                            <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>ROLE: {"\n"}{item.roleName} </Text>
                                            <Text style={Device.isTablet ? flats.commonText_tablet2 : flats.commonText_mobile2}>STORE NAME: {"\n"}{item.storeName}</Text>
                                            <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>CREATED DATE: {"\n"}{item.createdDate}</Text>
                                            <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>STATUS: {"\n"}{item.active ? "active" : "Inactive"}</Text>
                                            {this.state.userDelete && (
                                                <View>
                                                    <Modal isVisible={this.state.modalVisible}>
                                                        <View style={{
                                                            width: deviceWidth,
                                                            alignItems: 'center',
                                                            marginLeft: -20,
                                                            backgroundColor: "#ffffff",
                                                            height: 260,
                                                            position: 'absolute',
                                                            bottom: -20,
                                                        }}>
                                                            <Text style={{
                                                                position: 'absolute',
                                                                left: 20,
                                                                top: 15,
                                                                width: 300,
                                                                height: 20,
                                                                fontFamily: 'medium',
                                                                fontSize: 16,
                                                                color: '#353C40'
                                                            }}> Delete User </Text>
                                                            <TouchableOpacity style={{
                                                                position: 'absolute',
                                                                right: 20,
                                                                top: 7,
                                                                width: 50, height: 50,
                                                            }} onPress={() => this.modelCancel()}>
                                                                <Image style={{ color: '#ED1C24', fontFamily: 'regular', fontSize: 12, position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/modelcancel.png')} />
                                                            </TouchableOpacity>

                                                            <Text style={{ height: 1, width: deviceWidth, backgroundColor: 'lightgray', marginTop: 50, }}>
                                                            </Text>
                                                            <Text style={{
                                                                position: 'absolute',
                                                                top: 70,
                                                                height: 20,
                                                                textAlign: 'center',
                                                                fontFamily: 'regular',
                                                                fontSize: 18,
                                                                color: '#353C40'
                                                            }}> Are you sure want to delete User?  </Text>
                                                            <TouchableOpacity
                                                                style={{
                                                                    width: deviceWidth - 40,
                                                                    marginLeft: 20,
                                                                    marginRight: 20,
                                                                    marginTop: 60,
                                                                    height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                                                                }} onPress={() => this.deleteUser(item, index)}
                                                            >
                                                                <Text style={{
                                                                    textAlign: 'center', marginTop: 20, color: "#ffffff", fontSize: 15,
                                                                    fontFamily: "regular"
                                                                }}  > DELETE </Text>

                                                            </TouchableOpacity>

                                                            <TouchableOpacity
                                                                style={{
                                                                    width: deviceWidth - 40,
                                                                    marginLeft: 20,
                                                                    marginRight: 20,
                                                                    marginTop: 20,
                                                                    height: 50, backgroundColor: "#ffffff", borderRadius: 5, borderWidth: 1, borderColor: "#353C4050",
                                                                }} onPress={() => this.modelCancel()}
                                                            >
                                                                <Text style={{
                                                                    textAlign: 'center', marginTop: 20, color: "#353C4050", fontSize: 15,
                                                                    fontFamily: "regular"
                                                                }}  > CANCEL </Text>

                                                            </TouchableOpacity>
                                                        </View>
                                                    </Modal>
                                                </View>
                                            )}
                                            <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.handleedituser(item, index)}>
                                                <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/edit.png')} />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handleuserdeleteaction(item, index)}>
                                                <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/delete.png')} />

                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                        )}
                        {this.state.flagFilterRoles && (
                            <View>
                                <Modal isVisible={this.state.modalVisible}>
                                    <View style={Device.isTablet ? styles.filterBarcodeContainer_tablet : styles.filterBarcodeContainer_mobile} >
                                        <KeyboardAwareScrollView enableOnAndroid={true} >
                                            <Text style={Device.isTablet ? styles.filterByTitle_tablet : styles.filterByTitle_mobile} > Filter by </Text>
                                            <TouchableOpacity style={Device.isTablet ? styles.filterCloseButton_tablet : styles.filterCloseButton_mobile} onPress={() => this.modelCancel()}>
                                                <Image style={Device.isTablet ? styles.filterCloseImage_tablet : styles.modelCancelImage_mobile} source={require('../assets/images/modelcancel.png')} />
                                            </TouchableOpacity>
                                            <Text style={Device.isTablet ? styles.filterByTitleDecoration_tablet : styles.filterByTitleDecoration_mobile}>
                                            </Text>

                                            <TextInput
                                                style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                                underlineColorAndroid="transparent"
                                                placeholder="ROLE"
                                                placeholderTextColor="#6F6F6F"
                                                textAlignVertical="center"
                                                autoCapitalize="none"
                                                value={this.state.role}
                                                onChangeText={this.handleRole}
                                            />
                                            <TextInput
                                                style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                                underlineColorAndroid="transparent"
                                                placeholder="CREATED BY"
                                                placeholderTextColor="#6F6F6F"
                                                textAlignVertical="center"
                                                autoCapitalize="none"
                                                value={this.state.createdBy}
                                                onChangeText={this.handleCreatedBy}
                                            />
                                            <TouchableOpacity
                                                style={{
                                                    width: deviceWidth - 40,
                                                    marginLeft: 20,
                                                    marginRight: 20,
                                                    marginTop: 10,
                                                    borderColor: '#8F9EB717',
                                                    borderRadius: 3,
                                                    height: 50, backgroundColor: "#F6F6F6", borderRadius: 5,
                                                }} testID="openModal"

                                                onPress={() => this.filterDatepickerClicked()}
                                            >
                                                <Text style={{
                                                    marginLeft: 16, marginTop: 20, color: "#6F6F6F", fontSize: 15,
                                                    fontFamily: "regular"
                                                }}  > {this.state.doneButtonClicked == false ? 'CREATED DATE' : this.state.createdDate} </Text>
                                                <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/calender.png')} />
                                            </TouchableOpacity>
                                            {this.state.datepickerOpen && (
                                                <View style={{ height: 280, width: deviceWidth, backgroundColor: 'ffffff' }}>
                                                    <TouchableOpacity
                                                        style={{
                                                            position: 'absolute',
                                                            left: 20,
                                                            top: 10,
                                                            height: 30, backgroundColor: "#ED1C24", borderRadius: 5,
                                                        }} onPress={() => this.filterDatepickerCancelClicked()}
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
                                                        }} onPress={() => this.filterDatepickerDoneClicked()}
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

                                            <TouchableOpacity style={Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile}
                                                onPress={() => this.applyRoleFilter()}>
                                                <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile} >APPLY</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile}
                                                onPress={() => this.modelCancel()}>
                                                <Text style={Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile}>CANCEL</Text>
                                            </TouchableOpacity>
                                        </KeyboardAwareScrollView>
                                    </View>
                                </Modal>
                            </View>
                        )}

                        {this.state.flagFilterUsers && (
                            <View>
                                <Modal isVisible={this.state.modalVisible}>
                                    <View style={Device.isTablet ? styles.filterBarcodeContainer_tablet : styles.filterBarcodeContainer_mobile} >
                                        <KeyboardAwareScrollView enableOnAndroid={true} >
                                            <Text style={Device.isTablet ? styles.filterByTitle_tablet : styles.filterByTitle_mobile} > Filter by </Text>
                                            <TouchableOpacity style={Device.isTablet ? styles.filterCloseButton_tablet : styles.filterCloseButton_mobile} onPress={() => this.modelCancel()}>
                                                <Image style={Device.isTablet ? styles.filterCloseImage_tablet : styles.filterCloseImage_mobile} source={require('../assets/images/modelcancel.png')} />
                                            </TouchableOpacity>
                                            <Text style={Device.isTablet ? styles.filterByTitleDecoration_tablet : styles.filterByTitleDecoration_mobile}>
                                            </Text>
                                            <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                                                <RNPickerSelect
                                                    style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                                                    placeholder={{
                                                        label: 'USER TYPE'
                                                    }}
                                                    Icon={() => {
                                                        return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                                    }}
                                                    items={[
                                                        { label: 'Active', value: 'Active' },
                                                        { label: 'InActive', value: 'InActive' },
                                                    ]}
                                                    onValueChange={this.handleUSerType}
                                                    style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                                                    value={this.state.userType}
                                                    useNativeAndroidPickerStyle={false}
                                                />
                                            </View>
                                            <TextInput
                                                style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                                underlineColorAndroid="transparent"
                                                placeholder="ROLE"
                                                placeholderTextColor="#6F6F6F"
                                                textAlignVertical="center"
                                                autoCapitalize="none"
                                                value={this.state.role}
                                                onChangeText={this.handleRole}
                                            />
                                            <TextInput
                                                style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                                underlineColorAndroid="transparent"
                                                placeholder="STORE/BRANCH"
                                                placeholderTextColor="#6F6F6F"
                                                textAlignVertical="center"
                                                autoCapitalize="none"
                                                value={this.state.branch}
                                                onChangeText={this.handleBranch}
                                            />
                                            <TouchableOpacity style={Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile}
                                                onPress={() => this.applyUserFilter()}>
                                                <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile} >APPLY</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile}
                                                onPress={() => this.modelCancel()}>
                                                <Text style={Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile}>CANCEL</Text>
                                            </TouchableOpacity>
                                        </KeyboardAwareScrollView>
                                    </View>
                                </Modal>
                            </View>
                        )}
                    </ScrollView >
                </SafeAreaView>
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
    },
    imagealign: {
        marginTop: Device.isTablet ? 25 : 20,
        marginRight: Device.isTablet ? 30 : 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#FAFAFF'
    },
    flatList: {
        marginTop: 20
    },
    modalActive: {
        backgroundColor: '#000000',
    },
    modalInActive: {
        backgroundColor: '#ffffff',
    },
    modalActiveText: {
        color: '#ffffff',
    },
    modalInActiveText: {
        color: '#000000',
    },
    modalButton1: {
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
    },
    modalButton2: {
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
    },

    // Styles For Mobile
    viewsWidth_mobile: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: Device.isAndroid ? 70 : 84,
    },
    backButton_mobile: {
        position: 'absolute',
        left: 10,
        bottom: 0,
        width: 40,
        height: 40,
    },
    headerTitle_mobile: {
        position: 'absolute',
        left: 70,
        bottom: 10,
        width: 300,
        height: 25,
        fontFamily: 'bold',
        fontSize: 18,
        color: '#353C40'
    },
    filterButton_mobile: {
        position: 'absolute',
        right: 20,
        bottom: 5,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        width: 30,
        height: 32,
    },
    modalContainer_mobile: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        marginRight: 20,
        borderRadius: 5,
        marginTop: 20,
        borderColor: '#ED1C24',
        width: '100%',
        height: 50,
    },
    modalButton_mobile: {
        borderColor: '#353C40',
        height: 32,
        width: "33.3%",
        borderWidth: 1,
        alignSelf: "flex-start",
    },
    modalButtonText_mobile: {
        height: 32,
        width: 100,
        marginTop: 5,
        fontFamily: "medium",
        fontSize: 12,
        textAlign: 'center',
        alignItems: 'center',
    },
    addBarcodeButton_mobile: {
        position: 'absolute',
        right: 70,
        bottom: 5,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 110,
        height: 32,
        textAlign: 'center',
        alignItems: 'center',
    },
    addBarcodeButtonText_mobile: {
        fontSize: 12,
        fontFamily: 'regular',
        color: '#ffffff',
        marginTop: 8,
        textAlign: 'center',
        alignSelf: 'center'
    },
    filterBarcodeContainer_mobile: {
        width: deviceWidth,
        alignItems: 'center',
        marginLeft: -20,
        backgroundColor: "#ffffff",
        height: 400,
        position: 'absolute',
        bottom: -20,
    },
    filterByTitle_mobile: {
        position: 'absolute',
        left: 20,
        top: 15,
        width: 300,
        height: 20,
        fontFamily: 'medium',
        fontSize: 16,
        color: '#353C40'
    },
    filterByTitleDecoration_mobile: {
        height: 1,
        width: deviceWidth,
        backgroundColor: 'lightgray',
        marginTop: 50,
    },
    filterCloseButton_mobile: {
        position: 'absolute',
        right: 8,
        top: 15,
        width: 50, height: 50,
    },
    filterCloseImage_mobile: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 12,
        position: 'absolute',
        top: 10,
        right: 0,
    },
    filterDateButton_mobile: {
        width: deviceWidth - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        height: 50,
        backgroundColor: "#F6F6F6",
        borderRadius: 5,
    },
    filterDateButtonText_mobile: {
        marginLeft: 16,
        marginTop: 20,
        color: "#6F6F6F",
        fontSize: 15,
        fontFamily: "regular"
    },
    datePickerContainer_mobile: {
        height: 280,
        width: deviceWidth,
        backgroundColor: '#ffffff'
    },
    datePickerButton_mobile: {
        position: 'absolute',
        left: 20,
        top: 10,
        height: 30,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    datePickerEndButton_mobile: {
        position: 'absolute',
        right: 20,
        top: 10,
        height: 30,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    datePickerButtonText_mobile: {
        textAlign: 'center',
        marginTop: 5,
        color: "#ffffff",
        fontSize: 15,
        fontFamily: "regular"
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
    filterApplyButton_mobile: {
        width: deviceWidth - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        height: 50,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    filterButtonText_mobile: {
        textAlign: 'center',
        marginTop: 20,
        color: "#ffffff",
        fontSize: 15,
        fontFamily: "regular"
    },
    filterCancelButton_mobile: {
        width: deviceWidth - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        height: 50,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#353C4050",
    },
    filterButtonCancelText_mobile: {
        textAlign: 'center',
        marginTop: 20,
        color: "#000000",
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
    flatlistContainer2_mobile: {
        height: 180,
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
        top: 38,
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
    filterButton_tablet: {
        position: 'absolute',
        right: 20,
        top: 40,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        width: 35,
        height: 37,
    },
    modalContainer_tablet: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        marginRight: 20,
        borderRadius: 5,
        marginTop: 20,
        borderColor: '#ED1C24',
        width: '100%',
        height: 50,
    },
    modalButton_tablet: {
        borderColor: '#353C40',
        height: 42,
        width: "33.3%",
        borderWidth: 1,
        alignSelf: "flex-start",
    },
    modalButtonText_tablet: {
        height: 42,
        width: 210,
        marginTop: 5,
        fontFamily: "medium",
        fontSize: 17,
        textAlign: 'center',
        alignItems: 'center',
    },
    addBarcodeButton_tablet: {
        position: 'absolute',
        right: 70,
        top: 40,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 110,
        height: 32,
        textAlign: 'center',
        alignItems: 'center',
    },
    addBarcodeButtonText_tablet: {
        fontSize: 17,
        fontFamily: 'regular',
        color: '#ffffff',
        marginTop: 6,
        textAlign: 'center',
        alignSelf: 'center'
    },
    filterBarcodeContainer_tablet: {
        width: deviceWidth,
        alignItems: 'center',
        marginLeft: -40,
        backgroundColor: "#ffffff",
        height: 500,
        position: 'absolute',
        bottom: -40,
    },
    filterByTitle_tablet: {
        position: 'absolute',
        left: 20,
        top: 15,
        width: 300,
        height: 30,
        fontFamily: 'medium',
        fontSize: 21,
        color: '#353C40'
    },
    filterByTitleDecoration_tablet: {
        height: 1,
        width: deviceWidth,
        backgroundColor: 'lightgray',
        marginTop: 60,
    },
    filterCloseButton_tablet: {
        position: 'absolute',
        right: 24,
        top: 10,
        width: 60, height: 60,
    },
    filterCloseImage_tablet: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 17,
        position: 'absolute',
        top: 10,
        right: 24,
    },
    filterDateButton_tablet: {
        width: deviceWidth - 30,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        height: 60,
        backgroundColor: "#F6F6F6",
        borderRadius: 5,
    },
    filterDateButtonText_tablet: {
        marginLeft: 16,
        marginTop: 20,
        color: "#6F6F6F",
        fontSize: 20,
        fontFamily: "regular"
    },
    datePickerButton_tablet: {
        position: 'absolute',
        left: 20,
        top: 10,
        height: 40,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    datePickerButtonText_tablet: {
        textAlign: 'center',
        marginTop: 5,
        color: "#ffffff",
        fontSize: 20,
        fontFamily: "regular"
    },
    datePickerEndButton_tablet: {
        position: 'absolute',
        right: 20,
        top: 10,
        height: 40,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
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
    filterApplyButton_tablet: {
        width: deviceWidth - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        height: 60,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    filterButtonText_tablet: {
        textAlign: 'center',
        marginTop: 20,
        color: "#ffffff",
        fontSize: 20,
        fontFamily: "regular"
    },
    filterCancelButton_tablet: {
        width: deviceWidth - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        height: 60,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#353C4050",
    },
    filterButtonCancelText_tablet: {
        textAlign: 'center',
        marginTop: 20,
        color: "#000000",
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
    flatlistContainer2_tablet: {
        height: 220,
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
        height: 185,
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

// Styles For Flat-Lists

const flats = StyleSheet.create({
    mainText_mobile: {
        fontSize: 16,
        marginLeft: 16,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'medium',
        color: '#ED1C24',
    },
    subText_mobile: {
        fontSize: 12,
        marginLeft: 16,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'medium',
        color: '#353C40'
    },
    commonText_mobile: {
        fontSize: 12,
        marginBottom: 10,
        marginTop: -125,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'regular',
        color: '#808080'
    },
    commonText_mobile2: {
        fontSize: 12,
        marginBottom: 10,
        marginTop: -145,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'regular',
        color: '#808080'
    },
    commonTextsub_mobile: {
        fontSize: 12,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'regular',
        color: '#808080'
    },
    editButton_mobile: {
        position: 'absolute',
        right: 50,
        top: 90,
        width: 30,
        height: 30,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
        // borderRadius:5,
    },
    deleteButton_mobile: {
        position: 'absolute',
        right: 20,
        top: 90,
        width: 30,
        height: 30,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
    },
    deleteBarcodeContainer_mobile: {
        width: deviceWidth,
        alignItems: 'center',
        marginLeft: -20,
        backgroundColor: "#ffffff",
        height: 260,
        position: 'absolute',
        bottom: -20,
    },
    deleteBarcodeHeading_mobile: {
        position: 'absolute',
        left: 20,
        top: 15,
        width: 300,
        height: 20,
        fontFamily: 'medium',
        fontSize: 16,
        color: '#353C40'
    },

    // Tablet styles

    mainText_tablet: {
        fontSize: 21,
        marginLeft: 16,
        marginTop: 20,
        marginBottom: 10,
        fontFamily: 'medium',
        color: '#ED1C24',
    },
    subText_tablet: {
        fontSize: 17,
        marginLeft: 16,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'medium',
        color: '#353C40'
    },
    commonText_tablet: {
        fontSize: 17,
        marginBottom: 10,
        marginTop: -155,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'regular',
        color: '#808080'
    },
    commonText_tablet2: {
        fontSize: 17,
        marginBottom: 10,
        marginTop: -190,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'regular',
        color: '#808080'
    },
    commonTextsub_tablet: {
        fontSize: 17,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'regular',
        color: '#808080'
    },
    editButton_tablet: {
        position: 'absolute',
        right: 50,
        top: 90,
        width: 30,
        height: 40,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
        // borderRadius:5,
    },
    deleteButton_tablet: {
        position: 'absolute',
        right: 20,
        top: 90,
        width: 30,
        height: 40,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
    },
    deleteBarcodeContainer_tablet: {
        width: deviceWidth,
        alignItems: 'center',
        marginLeft: -20,
        backgroundColor: "#ffffff",
        height: 280,
        position: 'absolute',
        bottom: -20,
    },
    deleteBarcodeHeading_tablet: {
        position: 'absolute',
        left: 20,
        top: 15,
        width: 300,
        height: 30,
        fontFamily: 'medium',
        fontSize: 21,
        color: '#353C40'
    },
});
