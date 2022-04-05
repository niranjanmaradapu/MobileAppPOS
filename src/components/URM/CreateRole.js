import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import Loader from '../../commonUtils/loader';
import LoginService from '../services/LoginService';
import UrmService from '../services/UrmService';

var deviceWidth = Dimensions.get('window').width;

export default class CreateRole extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: "",
            description: "",
            domain: "",
            previlage: [],
            domains: [],
            domainsArray: [],
            clientId: 0,
            arrayData: [],
            domainId: 0,
            roles: [],
            parentlist: [],
            childlist: [],
            isEdit: false,
            roleId: 0,
        };
    }

    async componentDidMount() {
        const clientId = await AsyncStorage.getItem("custom:clientId1");
        this.setState({ isEdit: this.props.route.params.isEdit });
        if (this.state.isEdit === true) {
            this.setState({
                description: this.props.route.params.item.discription,
                role: this.props.route.params.item.roleName,
                domain: this.props.route.params.item.clientDomainVo.domaiName,
                roles: this.props.route.params.item.subPrivilageVo,
                parentlist: this.props.route.params.item.parentPrivilageVo,
                roleId: this.props.route.params.item.roleId
            });
            console.log("sadadsdsad" + this.props.route.params.item.clientDomainVo.domaiName);
            this.setState({ navtext: 'Edit Role' });
        }
        else {
            this.setState({ navtext: 'Add Role' });
        }
        this.setState({ clientId: clientId });
        this.getDomainsList();
    }


    async getDomainsList() {
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
                        this.setState({
                            domains: domains,
                        });

                        this.setState({ domainsArray: this.state.domainsArray });
                        if (this.state.isEdit === false) {
                            this.setState({ domain: this.state.domainsArray[0].name });
                            this.setState({ domainId: this.state.domainsArray[0].id });
                        }
                        else {
                            if (number.domaiName === this.props.route.params.item.clientDomainVo.domaiName) {
                                this.setState({ domain: this.state.domainsArray[i].name });
                                this.setState({ domainId: this.state.domainsArray[i].id });
                            }
                        }

                    }
                    console.log(this.state.domains);
                }
            }
        }).catch(() => {
            this.setState({ loading: false });
            this.setState({ loading: false });
            alert("There is an Error Getting Domain Id");
        });
    }

    handleBackButtonClick() {
        global.privilages = [];
        this.props.navigation.goBack(null);
        return true;
    }

    onEndReached() {
        this.listRef.scrollToOffset({ offset: 0, animated: true });
    }

    cancel() {
        global.privilages = [];
        this.props.navigation.goBack(null);
    }

    saveRole() {
        console.log(this.state.parentlist);
        console.log(this.state.childlist);
        if (this.state.role === "") {
            alert("Please Enter Role");
        } else if (this.state.description === "") {
            alert("Please Enter description");
        } else if (this.state.domain === "") {
            alert("Please Select Domain");
        }
        else {
            if (this.state.isEdit === false) {
                if (this.state.role.length < 10) {
                    alert("Role Name Cannot Be Less Than 10 Characters")
                } else {
                    const saveObj = {
                        "roleName": this.state.role,
                        "description": this.state.description,
                        "clientDomianId": this.state.domainId,
                        "createdBy": global.username,
                        "parentPrivilages": this.state.parentlist,
                        "subPrivillages": this.state.childlist,
                    };

                    console.log('params are' + JSON.stringify(saveObj));
                    this.setState({ loading: true });
                    axios.post(UrmService.saveRole(), saveObj).then((res) => {
                        console.error(res.data);
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
                        alert("There is an Error Saving Role");
                    });
                }
            }
            else {
                
                    const saveObj = {
                        "roleName": this.state.role,
                        "description": this.state.description,
                        "clientDomianId": this.state.domainId,
                        "createdBy": global.username,
                        "parentPrivilages": this.state.parentlist,
                        "subPrivillages": this.state.roles,
                        "roleId": this.state.roleId,
                    };

                    console.log('params are' + JSON.stringify(saveObj));
                    this.setState({ loading: true });
                    axios.put(UrmService.editRole(), saveObj).then((res) => {
                        console.log(res.data);
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
                        alert("There is an Error Saving Role");
                    });
                
            }
        }
    }

    handleRole = (value) => {
        this.setState({ role: value });
    };

    privilageMapping() {
        global.privilages = [];
        this.props.navigation.navigate('Privilages', {
            domain: this.state.domain, child: this.state.roles, parentlist: this.state.parentlist,
            onGoBack: () => this.refresh(),
        });
    }

    refresh() {
        this.setState({ parentlist: [] });
        this.setState({ childlist: [] });
        this.state.roles = [];
        for (let i = 0; i < global.privilages.length; i++) {
            this.state.parentlist.push({ name: global.privilages[i].parent, id: global.privilages[i].id });
            this.state.childlist.push(global.privilages[i].subPrivillages);
            this.state.roles.push(global.privilages[i].subPrivillages);
        }
        const newArrayList = [];
        this.state.parentlist.forEach(obj => {
            if (!newArrayList.some(o => o.name === obj.name)) {
                newArrayList.push({ ...obj });
            }
        });

        const newArraychildList = [];
        this.state.childlist.forEach(obj => {
            if (!newArraychildList.some(o => o.name === obj.name)) {
                newArraychildList.push({ ...obj });
            }
        });
        const newArrayrolesList = [];
        this.state.roles.forEach(obj => {
            if (!newArrayrolesList.some(o => o.name === obj.name)) {
                newArrayrolesList.push({ ...obj });
            }
        });
        this.setState({ parentlist: newArrayList, childlist: newArraychildList, roles: newArrayrolesList });
    }


    handleDomain = (value) => {
        this.setState({ domain: value });
        for (let i = 0; i < this.state.domainsArray.length; i++) {
            if (this.state.domainsArray[i].name === value) {
                this.setState({ domainId: this.state.domainsArray[i].id });
            }
        }
    };

    handleDescription = (value) => {
        this.setState({ description: value });
    };

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
                    <Text style={{ fontSize: Device.isTablet ? 20 : 15, marginLeft: 20, color: '#000000', marginTop: 10, marginBottom: 10 }}>{I18n.t("Role")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Role")}
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.role}
                        onChangeText={this.handleRole}
                    />
                    <Text style={{ fontSize: Device.isTablet ? 20 : 15, marginLeft: 20, color: '#000000', marginTop: 10, marginBottom: 10 }}>{I18n.t("Description")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Description")}
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.description}
                        onChangeText={this.handleDescription}
                    />
                    <Text style={{ fontSize: Device.isTablet ? 20 : 15, marginLeft: 20, color: '#000000', marginTop: 10, marginBottom: 10 }}>{I18n.t("Domain")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Domain',
                                // value:this.state.domain,
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
                        <Text style={[Device.isTablet ? styles.subheading_tablet : styles.subheading_mobile, { marginTop: 7 }]}>
                            {I18n.t("Privileges")}
                        </Text>
                        <TouchableOpacity
                            style={{ borderRadius: 5, borderColor: "#ED1C24", backgroundColor: '#ffffff', width: Device.isTablet ? 140 : 110, height: Device.isTablet ? 38 : 28, borderWidth: 1, marginTop: 7, marginRight: 20 }}
                            onPress={() => this.privilageMapping()} >
                            <Text style={{ fontSize: Device.isTablet ? 17 : 12, fontFamily: 'regular', color: '#ED1C24', marginTop: 7, textAlign: 'center', alignSelf: 'center', borderRadius: 5, borderColor: "#ED1C24", }}> {I18n.t('Privilege Mapping')} </Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView>
                        <FlatList
                            data={this.state.roles}
                            style={{ marginTop: 20, }}
                            onEndReached={this.onEndReached.bind(this)}

                            ref={(ref) => { this.listRef = ref; }}
                            keyExtractor={item => item}
                            renderItem={({ item, index }) => (
                                <View style={{
                                    height: Device.isTablet ? 80 : 130,
                                    backgroundColor: '#FFFFFF',
                                    borderBottomWidth: 5,
                                    borderBottomColor: '#FFFFFF',
                                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <View style={{ flexDirection: 'column', width: '100%', height: 80, borderTopWidth: 10, borderColor: '#F6F6F6' }}>

                                        <Text style={{ fontSize: Device.isTablet ? 17 : 12, marginLeft: 16, marginTop: 20, fontFamily: 'regular', color: '#808080' }}>
                                            PRIVILEGE
                                        </Text>
                                        <Text style={{ fontSize: Device.isTablet ? 19 : 14, marginLeft: 16, marginTop: 0, fontFamily: 'medium', color: '#353C40' }}>
                                            {item.name}
                                        </Text>

                                        <Text style={Device.isTablet ? poolflats.operatorHeader_tablet : poolflats.operatorHeader_mobile}>
                                            DESCRIPTION
                                        </Text>
                                        <Text style={Device.isTablet ? poolflats.operatorValue_tablet : poolflats.operatorValue_mobile}>
                                            {item.description}
                                        </Text>

                                        {/* <Text style={Device.isTablet ? poolflats.valueHeader_tablet : poolflats.valueHeader_mobile}>
                                                VALUES
                                            </Text>
                                            <Text style={Device.isTablet ? poolflats.valueBody_tablet : poolflats.valueBody_mobile}>
                                               dsfsfsf
                                            </Text> */}
                                    </View>



                                    {/* <TouchableOpacity style={Device.isTablet ? poolflats.editButton_tablet : poolflats.editButton_mobile} onPress={() => this.handleeditaction(item, index)}>
                                            <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/edit.png')} />
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


                                        <TouchableOpacity style={Device.isTablet ? poolflats.deleteButton_tablet : poolflats.deleteButton_mobile} onPress={() => this.handledeleteaction(item, index)}>
                                            <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/delete.png')} />

                                        </TouchableOpacity>
                                        <View style={{
                                            backgroundColor: 'grey',
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                            height: 30,
                                            width: 90
                                        }}>

                                        </View> */}

                                </View>


                            )}


                        />
                        <View style={{ flexDirection: 'column', width: deviceWidth, backgroundColor: "#F6F6F6", marginTop: 20, }}>
                            <Text style={{
                                fontSize: Device.isTablet ? 19 : 14, marginTop: 50, height: 100, fontFamily: 'regular', color: '#808080', textAlign: 'center', //Centered horizontally
                                alignItems: 'center', //Centered vertically
                                flex: 1
                            }}>
                                {I18n.t("add more privileges by clicking on Privilege Mapping button")}

                            </Text>

                        </View>


                    </ScrollView>

                    <TouchableOpacity style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile}
                        onPress={() => this.saveRole()}>
                        <Text style={Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile}>{I18n.t("SAVE")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Device.isTablet ? styles.cancelButton_tablet : styles.cancelButton_mobile}
                        onPress={() => this.cancel()}>
                        <Text style={Device.isTablet ? styles.cancelButtonText_tablet : styles.cancelButtonText_mobile}>{I18n.t("CANCEL")}</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomContainer} ></View>
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
    subheading_mobile: {
        fontFamily: 'medium',
        fontSize: 16,
        color: "red",
        marginLeft: 20,
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
    subheading_tablet: {
        fontFamily: 'medium',
        fontSize: 21,
        color: "red",
        marginLeft: 20,
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

});

const poolflats = StyleSheet.create({
    // Styles For Mobile
    valueHeader_mobile: {
        fontSize: 12,
        position: 'absolute',
        right: 110,
        top: 43,
        fontFamily: 'regular',
        color: '#808080'
    },
    valueBody_mobile: {
        fontSize: 12,
        position: 'absolute',
        right: 110,
        top: 60,
        fontFamily: 'medium',
        color: '#353C40',
    },
    operatorHeader_mobile: {
        fontSize: 12,
        position: 'absolute',
        top: 60,
        left: 15,
        fontFamily: 'regular', color: '#808080',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        flex: 1
    },
    operatorValue_mobile: {
        fontSize: 14,
        position: 'absolute',
        top: 75,
        left: 15,
        fontFamily: 'medium', color: '#353C40',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        flex: 1
    },
    editButton_mobile: {
        position: 'absolute',
        right: 35,
        top: 70,
        width: 30,
        height: 30,
        borderColor: "lightgray",
    },
    deleteButton_mobile: {
        position: 'absolute',
        right: 10,
        top: 70,
        width: 30,
        height: 30,
        borderColor: "lightgray",
    },

    // Styles For Tablet
    operatorValue_tablet: {
        fontSize: 19,
        marginTop: -10,
        marginLeft: deviceWidth / 2 - 40,
        fontFamily: 'medium', color: '#353C40',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        flex: 1
    },
    operatorHeader_tablet: {
        fontSize: 17,
        marginTop: -45,
        marginLeft: deviceWidth / 2 - 40,
        fontFamily: 'regular', color: '#808080',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        flex: 1
    },
    valueHeader_tablet: {
        fontSize: 17,
        position: 'absolute',
        right: 90,
        top: 23,
        fontFamily: 'regular',
        color: '#808080'
    },
    valueBody_tablet: {
        fontSize: 17,
        position: 'absolute',
        right: 90,
        top: 40,
        fontFamily: 'medium',
        color: '#353C40',
    },
    editButton_tablet: {
        position: 'absolute',
        right: 40,
        top: 30,
        width: 40,
        height: 40,
        borderColor: "lightgray",
    },
    deleteButton_tablet: {
        position: 'absolute',
        right: 10,
        top: 30,
        width: 40,
        height: 40,
        borderColor: "lightgray",
    },
});
