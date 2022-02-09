import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import { ScrollView } from 'react-native-gesture-handler';
import Loader from "../../commonUtils/loader";
import LoginService from '../services/LoginService';
import UrmService from '../services/UrmService';
import AccountingDashboard from './AccountingDashboard';
import CreateHSNCode from './CreateHSNCode';
import CreateTaxMaster from './CreateTaxMaster';
import { CreditNotes, FilterCreditNotes } from './CreditNotes';
import { DebitNotes, FilterDebitNotes } from "./DebitNotes";
import Domain from './Domain.js';
import { FilterStores, Stores } from './Stores.js';


var deviceWidth = Dimensions.get("window").width;


export default class AccountManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flagShowFilterButton: false,
            flagDashboard: true,
            flagCreditNotes: false,
            flagDebitNotes: false,
            flagTaxMaster: false,
            flagHSNCode: false,
            flagStore: false,
            flagDomain: false,
            flagFilterCreditNotes: false,
            flagFilterDebitNotes: false,
            flagFilterStore: false,
            modalVisible: true,
            privilages: [],
            creditNotes: [1, 2],
            debitNotes: [1, 2],
            taxMaster: [1, 2],
            hsnCode: [1, 2],
            stores: [],
            domains: [],
            storesDelete: false,
            filterActive: false,
        };
    }


    async componentDidMount() {
        this.setState({ privilages: [] });
        AsyncStorage.getItem("custom:isConfigUser").then((value) => {
            if (value === "true") {
                this.setState({ flagStore: false, flagDomain: true, flagDashboard: false });
                for (let i = 0; i < 2; i++) {
                    if (i === 0) {
                        this.state.privilages.push({ bool: true, name: "Domain" });
                    }
                    else {
                        this.state.privilages.push({ bool: false, name: "Stores" });
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
                                            if (previlage.name === "Accounting Portal") {
                                                for (let i = 0; i < previlage.subPrivillages.length; i++) {
                                                    console.log(previlage.subPrivillages[i].parentPrivillageId);
                                                    if (previlage.id === previlage.subPrivillages[i].parentPrivillageId) {
                                                        let subprivilage = previlage.subPrivillages[i];
                                                        if (subprivilage.name === "Dashboard") {
                                                            this.setState({ flagStore: false, flagDomain: false });
                                                        }
                                                        if (i === 0) {
                                                            this.state.privilages.push({ bool: true, name: subprivilage.name });
                                                        }
                                                        else if (subprivilage.name === "Credit Notes") {

                                                        }
                                                        else if (subprivilage.name === "Debit Notes") {

                                                        }
                                                        else if (subprivilage.name === "Create Tax Master") {

                                                        }
                                                        else if (subprivilage.name === "Create HSN Code") {

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
                                            if (previlage.name === "Accounting Portal") {

                                                if (length > 0) {
                                                    for (let i = 0; i < length; i++) {
                                                        if (previlage.id === res.data["result"].subPrivilages[i].parentPrivillageId) {
                                                            let subprivilage = res.data["result"].subPrivilages[i];
                                                            if (subprivilage.name === "Dashboard") {
                                                                this.setState({ flagStore: false, flagDomain: false });
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
        this.getDomainsList();
    }



    async getDomainsList() {
        this.setState({ domains: [] });
        const clientId = await AsyncStorage.getItem("custom:clientId1");
        this.setState({ loading: true });
        axios.get(LoginService.getDomainsList() + clientId).then((res) => {
            let len = res.data["result"].length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    let number = res.data.result[i];
                    console.log('sfsdfdfsdfdsfsfsdfs' + number);
                    console.log(number);
                    this.setState({ loading: false });
                    this.state.domains.push(number);
                }
                this.setState({ domains: this.state.domains });
            }
        }).catch(() => {
            this.setState({ loading: false });
        });
    }

    async getStoresList() {
        this.setState({ stores: [] });
        const clientId = await AsyncStorage.getItem("custom:clientId1");
        this.setState({ loading: true });
        const params = {
            "clientId": clientId
        };
        axios.get(UrmService.getAllStores(), { params }).then((res) => {
            console.log('adsdsadsd' + res.data);
            let len = res.data["result"].length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    let number = res.data.result[i];
                    console.log('sfsdfdfsdfdsfsfsdfs' + number);
                    console.log(number);
                    this.setState({ loading: false });
                    this.state.stores.push(number);
                }
                this.setState({ stores: this.state.stores });
            }
        }).catch(() => {
            this.setState({ loading: false });
        });
    }


    filterAction() {

        if (this.state.flagStore === true) {
            this.setState({ flagFilterStore: true });
        }
    }

    topbarAction = (item, index) => {

        if (item.name === "Dashboard") {
            this.setState({ flagDashboard: true });
        } else {
            this.setState({ flagDashboard: false });
        }
        if (item.name === "Credit Notes") {
            this.setState({ flagCreditNotes: true });
        } else {
            this.setState({ flagCreditNotes: false });
        }
        if (item.name === "Debit Notes") {
            this.setState({ flagDebitNotes: true });
        } else {
            this.setState({ flagDebitNotes: false });
        }
        if (item.name === "Create Tax Master") {
            this.setState({ flagTaxMaster: true });
        } else {
            this.setState({ flagTaxMaster: false });
        }
        if (item.name === "Create HSN Code") {
            this.setState({ flagHSNCode: true });
        } else {
            this.setState({ flagHSNCode: false });
        }


        if (item.name === "Domain") {
            this.getDomainsList();
            this.setState({ flagDomain: true });
        } else {
            this.setState({ flagDomain: false });
        }

        if (item.name === "Stores") {
            this.getStoresList();
            this.setState({ flagStore: true });
        }
        else {
            this.setState({ flagStore: false });
        }




        if (this.state.privilages[index].bool === true) {
            this.state.privilages[index].bool = false;
        } else {
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
        if (this.state.flagCreditNotes === true) {
            this.setState({ flagFilterCreditNotes: true });
        } else {
            this.setState({ flagFilterCreditNotes: false });
        }
        if (this.state.flagDebitNotes === true) {
            this.setState({ flagFilterDebitNotes: true });
        } else {
            this.setState({ flagFilterDebitNotes: false });
        }
        if (this.state.flagStore === true) {
            this.setState({ flagFilterStore: true });
        } else {
            this.setState({ flagFilterStore: false });
        }
        this.setState({ modalVisible: true });
    }

    modelCancel() {
        this.setState({ modalVisible: false, flagFilterCreditNotes: false, flagFilterStore: false, flagFilterCreditNotes: false, flagFilterDebitNotes: false });
    }


    getDomains() {
        this.getDomainsList();
    }
    getStores() {
        this.getStoresList();
    }

    handlemenuButtonClick() {
        this.props.navigation.openDrawer();
    }

    navigateToAddCreditNotes() {
        this.props.navigation.navigate('AddCreditNotes');
    }

    navigateToAdDebitNotes() {
        this.props.navigation.navigate('AddDebitNotes');
    }

    navigateToAddHsnCode() {
        this.props.navigation.navigate('AddHsnCode');
    }

    navigateToAddTax() {
        this.props.navigation.navigate('AddTaxMaster');
    }

    navigateToAddStores() {
        this.props.navigation.navigate('AddStore', {
            isEdit: false,
            onGoBack: () => this.getStores(),
        });
    }

    navigateToAddDomain() {
        this.props.navigation.navigate('AddDomain', {
            onGoBack: () => this.getDomains(),
        });
    }

    modelClose = () => {
        this.modelCancel();
    };

    arrayDataAssign() {
        this.setState({ stores: false });
    }

    filterStores = (data) => {
        this.setState({ stores: [] });
        this.setState({ stores: data }, () => {
            this.setState({ filterActive: true });
        });
    };

    clearFilterAction() {
        this.getStoresList();
        this.setState({ filterActive: false });
    }

    handelGetStore = () => {
        this.getStoresList();
    };



    render() {
        return (
            <View style={styles.mainContainer}>
                {this.state.loading &&
                    <Loader
                        loading={this.state.loading} />
                }
                <SafeAreaView style={styles.mainContainer}>
                    <View style={Device.isTablet ? styles.viewsWidth_tablet : styles.viewsWidth_mobile} >
                        <TouchableOpacity style={Device.isTablet ? styles.menuButton_tablet : styles.menuButton_mobile} onPress={() => this.handlemenuButtonClick()}>
                            <Image source={require('../assets/images/menu.png')} />
                        </TouchableOpacity>
                        <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}>
                            Accounting
                        </Text>

                        {this.state.flagCreditNotes && (
                            <TouchableOpacity style={Device.isTablet ? styles.navigationToButton_tablet : styles.navigationToButton_mobile} onPress={() => this.navigateToAddCreditNotes()}>
                                <Text style={Device.isTablet ? styles.navigationToButtonText_tablet : styles.navigationToButtonText_mobile}>Add Credit</Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagCreditNotes && (
                            <TouchableOpacity
                                style={Device.isTablet ? styles.filterButton_tablet : styles.filterButton_mobile}
                                onPress={() => this.filterAction()} >
                                <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/promofilter.png')} />
                            </TouchableOpacity>
                        )}

                        {this.state.flagDebitNotes && (
                            <TouchableOpacity style={Device.isTablet ? styles.navigationToButton_tablet : styles.navigationToButton_mobile} onPress={() => this.navigateToAdDebitNotes()}>
                                <Text style={Device.isTablet ? styles.navigationToButtonText_tablet : styles.navigationToButtonText_mobile}>Add Debit</Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagDebitNotes && (
                            <TouchableOpacity
                                style={Device.isTablet ? styles.filterButton_tablet : styles.filterButton_mobile}
                                onPress={() => this.filterAction()} >
                                <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/promofilter.png')} />
                            </TouchableOpacity>
                        )}

                        {this.state.flagHSNCode && (
                            <TouchableOpacity style={Device.isTablet ? styles.onlyNavigationToButton_tablet : styles.onlyNavigationToButton_mobile} onPress={() => this.navigateToAddHsnCode()}>
                                <Text style={Device.isTablet ? styles.navigationToButtonText_tablet : styles.navigationToButtonText_mobile}>Add HSN</Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagTaxMaster && (
                            <TouchableOpacity style={Device.isTablet ? styles.onlyNavigationToButton_tablet : styles.onlyNavigationToButton_mobile} onPress={() => this.navigateToAddTax()}>
                                <Text style={Device.isTablet ? styles.navigationToButtonText_tablet : styles.navigationToButtonText_mobile}>Add Tax</Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagStore && (
                            <TouchableOpacity style={Device.isTablet ? styles.navigationToButton_tablet : styles.navigationToButton_mobile} onPress={() => this.navigateToAddStores()}>
                                <Text style={Device.isTablet ? styles.navigationToButtonText_tablet : styles.navigationToButtonText_mobile}>Add Store</Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagStore && (
                            <View>
                                {!this.state.filterActive &&
                                    <TouchableOpacity
                                        style={Device.isTablet ? styles.filterButton_tablet : styles.filterButton_mobile}
                                        onPress={() => this.filterAction()} >
                                        <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/promofilter.png')} />
                                    </TouchableOpacity>
                                }
                                {this.state.filterActive &&
                                    <TouchableOpacity
                                        style={Device.isTablet ? styles.filterButton_tablet : styles.filterButton_mobile}
                                        onPress={() => this.clearFilterAction()} >
                                        <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/clearFilterSearch.png')} />
                                    </TouchableOpacity>
                                }
                            </View>
                        )}

                        {this.state.flagDomain && (
                            <TouchableOpacity style={Device.isTablet ? styles.onlyNavigationToButton_tablet : styles.onlyNavigationToButton_mobile} onPress={() => this.navigateToAddDomain()}>
                                <Text style={Device.isTablet ? styles.navigationToButtonText_tablet : styles.navigationToButtonText_mobile}>Add Domain</Text>
                            </TouchableOpacity>
                        )}

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

                            {this.state.flagDashboard && (
                                <AccountingDashboard />
                            )}

                            {this.state.flagCreditNotes && (
                                <CreditNotes
                                    creditNotes={this.state.creditNotes}
                                    navigation={this.props.navigation}
                                />
                            )}

                            {this.state.flagDebitNotes && (
                                <DebitNotes
                                    debitNotes={this.state.debitNotes}
                                    navigation={this.props.navigation}
                                />
                            )}

                            {this.state.flagTaxMaster && (
                                <CreateTaxMaster
                                    taxMaster={this.state.taxMaster}
                                    navigation={this.props.navigation}
                                />
                            )}

                            {this.state.flagHSNCode && (
                                <CreateHSNCode
                                    hsnCode={this.state.hsnCode}
                                    navigation={this.props.navigation}
                                />
                            )}

                            {this.state.flagStore && (
                                <Stores
                                    stores={this.state.stores}
                                    getStoresList={this.handelGetStore}
                                    navigation={this.props.navigation}
                                />
                            )}

                            {this.state.flagDomain && (
                                <Domain
                                    domains={this.state.domains}
                                    navigation={this.props.navigation}
                                />
                            )}

                            {this.state.flagFilterCreditNotes && (
                                <FilterCreditNotes
                                    modalVisible={this.state.modalVisible}
                                    modelCancelCallback={this.modelClose}
                                />
                            )}

                            {this.state.flagFilterDebitNotes && (
                                <FilterDebitNotes
                                    modalVisible={this.state.modalVisible}
                                    modelCancelCallback={this.modelClose}
                                />
                            )}

                            {this.state.flagFilterStore && (
                                <View>
                                    <FilterStores
                                        modalVisible={this.state.modalVisible}
                                        // storesArrayCallBack={this.arrayDataAssign}
                                        childParams={this.filterStores}
                                        modelCancelCallback={this.modelClose}
                                    />
                                </View>
                            )}



                        </View>
                    </ScrollView>
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
    menuButton_mobile: {
        position: 'absolute',
        left: 10,
        bottom: 5,
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
        top: 25,
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
    navigationToButton_mobile: {
        position: 'absolute',
        right: 70,
        bottom: 10,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 110,
        height: 32,
        textAlign: 'center',
        alignItems: 'center',
    },
    onlyNavigationToButton_mobile: {
        position: 'absolute',
        right: 20,
        bottom: 10,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 110,
        height: 32,
        textAlign: 'center',
        alignItems: 'center',
    },
    navigationToButtonText_mobile: {
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
        height: Device.isTablet ? 2 : 1,
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
    menuButton_tablet: {
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
    navigationToButton_tablet: {
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
    onlyNavigationToButton_tablet: {
        position: 'absolute',
        right: 20,
        top: 40,
        backgroundColor: '#ED1C24',
        borderRadius: 5,
        width: 110,
        height: 32,
        textAlign: 'center',
        alignItems: 'center',
    },
    navigationToButtonText_tablet: {
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
        height: Device.isTablet ? 2 : 1,
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
});
