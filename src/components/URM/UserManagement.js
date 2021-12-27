import React, { Component } from 'react'
import { View, Image, Text, Button, FlatList, TouchableOpacity, Switch, TextInput, StyleSheet, Dimensions, ActivityIndicator, scrollview, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import Loader from "../loader";
import DatePicker from 'react-native-date-picker'
import Device from 'react-native-device-detection'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';


var deviceWidth = Dimensions.get("window").width;


export default class UserManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flagOne: true,
            flagTwo: false,
            flagFilterRoles: false,
            flagFiterUsers: false,
            modalVisible: true,
            createdDate: "",
            date: new Date(),
            role: "",
            createdBy: "",
            userType: "",
            branch: "",
            rolesData: [1, 2],
            usersData: [1,2],
            roleDelete: false,
            userDelete: false,
        }
    }

    filterAction() {
        if (this.state.flagOne === true) {
            this.setState({ flagFilterRoles: true })
        } else {
            this.setState({ flagFilterRoles: false })
        }
        if (this.state.flagTwo === true) {
            this.setState({ flagFiterUsers: true })
        } else {
            this.setState({ flagFiterUsers: false })
        }
        this.setState({ modalVisible: true })
    }

    modelCancel() {
        this.setState({ modalVisible: false });
        this.setState({ flagFilterRoles: false });
        this.setState({ flagFiterUsers: false });
    }

    navigateToCreateRoles() {
        this.props.navigation.navigate('CreateRole');
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Home');
    }

    navigateToAddUsers() {
        this.props.navigation.navigate('AddUser');
    }

    topbarAction1() {
        this.setState({ flagOne: true, flagTwo: false });
        // this.setState({ flagTwo: false })
    }

    topbarAction2() {
        this.setState({ flagTwo: true, flagOne: false });
    }

    filterDatepickerClicked() {
        this.setState({ datepickerOpen: true })
    }

    filterDatepickerDoneClicked() {
        // if (parseInt(this.state.date.getDate()) < 10) {
        this.setState({ createdDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-0" + this.state.date.getDate() })
        // }
        this.setState({ doneButtonClicked: true, datepickerOpen: false })
    }

    filterDatepickerCancelClicked() {
        this.setState({ date: new Date() })
        this.setState({ datepickerOpen: false })
    }

    handleCreatedBy = (value) => {
        this.setState({ createdBy: value })
    }

    handleRole = (value) => {
        this.setState({ role: value })
    }

    handleUSerType = (value) => {
        this.setState({ userType: value })
    }

    handleBranch = (value) => {
        this.setState({ branch: value })
    }

    applyRoleFilter() {
        alert("Applied Roles")
    }

    applyUserFilter() {
        alert("Applied User")
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
        this.setState({ modalVisible: true })
        this.setState({ userDelete: true })
    }
    handleRoledeleteaction(item, index) {
        this.setState({ modalVisible: true })
        this.setState({ roleDelete: true })
    }

    getAllRoles() {

    }

    getAllUsers() {

    }

    updateRoles() {
        this.getAllRoles()
    }

    updateUsers() {
        this.getAllUsers()
    }

    handleedituser(item, index) {
        this.props.navigation.navigate('EditUser', 
        {
            item: item, isEdit: true,
            onGoBack: () => this.updateUsers(),
        });
    }

    handleeditRole(item, index) {
        this.props.navigation.navigate('EditRole', 
        {
            item: item, isEdit: true,
            onGoBack: () => this.updateRoles(),
        });
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
                            Register Client
                        </Text>
                        {this.state.flagOne && (
                            <TouchableOpacity style={Device.isTablet ? styles.addBarcodeButton_tablet : styles.addBarcodeButton_mobile} onPress={() => this.navigateToCreateRoles()}>
                                <Text style={Device.isTablet ? styles.addBarcodeButtonText_tablet : styles.addBarcodeButtonText_mobile}>Create Role</Text>
                            </TouchableOpacity>
                        )}
                        {this.state.flagTwo && (
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
                    <View style={Device.isTablet ? styles.modalContainer_tablet : styles.modalContainer_mobile}>
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
                    </View>
                    {this.state.flagOne && (
                        <FlatList
                            data={this.state.rolesData}
                            style={{ marginTop: 20, }}
                            scrollEnabled={true}
                            renderItem={({ item, index }) => (
                                <View style={Device.isTablet ? styles.flatlistContainer_tablet : styles.flatlistContainer_mobile}>
                                    <View style={Device.isTablet ? styles.flatlistSubContainer_tablet : styles.flatlistSubContainer_mobile}>
                                    <Text style={Device.isTablet ? flats.mainText_tablet : flats.mainText_mobile} >S.NO: {index + 1} </Text>
                                        <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>ROLE: {"\n"}{item.roleName}</Text>
                                        <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>DOMAIN: {item.domain} </Text>
                                        <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>CREATED BY: {item.createdBy}</Text>
                                        <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>USER COUNT:  {item.userCount}</Text>
                                        <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>DESCRIPTION: {item.description}</Text>
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
                                            <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/edit.png')} />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handleRoledeleteaction(item, index)}>
                                            <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/delete.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                    {this.state.flagTwo && (
                        <FlatList
                            data={this.state.usersData}
                            style={{ marginTop: 20, }}
                            scrollEnabled={true}
                            renderItem={({ item, index }) => (
                                <View style={Device.isTablet ? styles.flatlistContainer_tablet : styles.flatlistContainer_mobile}>
                                    <View style={Device.isTablet ? styles.flatlistSubContainer_tablet : styles.flatlistSubContainer_mobile}>
                                        <Text style={Device.isTablet ? flats.mainText_tablet : flats.mainText_mobile} >USER.ID: {item.userId} </Text>
                                        <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>USER NAME: {"\n"}{item.userName}</Text>
                                        <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>ROLE: {item.role} </Text>
                                        <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>STORE NAME: {item.storeName}</Text>
                                        <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>CREATED DATE:  {"11-12-2021"}</Text>
                                        <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>STATUS: {"Active"}</Text>
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
                                            <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/edit.png')} />
                                        </TouchableOpacity>

                                        <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handleuserdeleteaction(item, index)}>
                                            <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/delete.png')} />
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

                    {this.state.flagFiterUsers && (
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
                                                items={this.state.userType}
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

                </SafeAreaView>
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
        height: 25,
        fontFamily: 'bold',
        fontSize: 18,
        color: '#353C40'
    },
    filterButton_mobile: {
        position: 'absolute',
        right: 20,
        top: 40,
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
        top: 40,
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
        height: 500,
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
        height: 600,
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

})

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
        marginTop: -90,
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
        marginTop: 10,
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
        marginTop: -120,
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
})
