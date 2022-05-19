import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import { ScrollView } from 'react-native-gesture-handler';
import I18n from 'react-native-i18n';
import Loader from "../../commonUtils/loader";
import LoginService from '../services/LoginService';
import UrmService from '../services/UrmService';
import AccountingDashboard from './AccountingDashboard';
import { pageNavigationBtn, pageNavigationBtnText, filterBtn, menuButton,  headerNavigationBtn, headerNavigationBtnText, headerTitle, headerTitleContainer, headerTitleSubContainer, headerTitleSubContainer2} from '../Styles/Styles';
import CreateHSNCode from './CreateHSNCode';
import CreateTaxMaster from './CreateTaxMaster';
import { CreditNotes, FilterCreditNotes } from './CreditNotes';
import { DebitNotes, FilterDebitNotes } from "./DebitNotes";
import Domain from './Domain.js';
import { FilterStores, Stores } from './Stores.js';


var deviceWidth = Dimensions.get("window").width;
var deviceheight = Dimensions.get("window").height;


export default class AccountManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flagShowFilterButton: false,
            flagDashboard: false,
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
            creditNotes: [],
            debitNotes: [],
            taxMaster: [],
            hsnCode: [],
            stores: [],
            domains: [],
            storesDelete: false,
            filterActive: false,
            headerName: [],
            storeError: "",
            domainError: "",
            channelsList: [],
            channelFull: false
        };
    }


    async componentDidMount() {
        this.setState({ privilages: [] });
        AsyncStorage.getItem("custom:isConfigUser").then((value) => {
            if (value === "true") {
                this.getDomainsList()
                this.setState({ flagStore: false, flagDomain: true, flagDashboard: false });
                for (let i = 0; i < 2; i++) {
                    if (i === 0) {
                        this.state.privilages.push({ bool: true, name: "Domain" });
                    }
                    else {
                        this.state.privilages.push({ bool: false, name: "Stores" });
                    }
                }
                this.setState({ privilages: this.state.privilages }, () => {
                    this.setState({flagDomain: true})
                });
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
                                        for (let i = 0; i < len; i++) {
                                            let previlage = res.data["result"][i];
                                            if (previlage.name === "Accounting Portal") {
                                                for (let i = 0; i < previlage.subPrivillages.length; i++) {
                                                    console.log(previlage.subPrivillages[i].parentPrivillageId);
                                                    if (previlage.id === previlage.subPrivillages[i].parentPrivillageId) {
                                                        let subprivilage = previlage.subPrivillages[i];
                                                            this.state.headerName.push({name: subprivilage.name})
                                                    }
                                                }
                                                this.setState({ headerName: this.state.headerName }, () => {
                                                        console.log(this.state.headerName)
                                                        for (let j = 0; j < this.state.headerName.length; j++){
                                                            if (j === 0) {
                                                                this.state.privilages.push({ bool: true, name: this.state.headerName[j].name });
                                                            }else if (this.state.headerName[0].name !== "Dashboard") {
                                                                if (this.state.headerName[j].name === "Stores") {
                                                                    this.state.privilages.push({ bool: true, name: this.state.headerName[j].name });
                                                                } else {
                                                                    this.state.privilages.push({ bool: false, name: this.state.headerName[j].name });
                                                                }
                                                            }
                                                            else {
                                                                this.state.privilages.push({ bool: false, name: this.state.headerName[j].name });
                                                            }
                                                        }
                                                })
                                                // if (this.state.privilages.length > 0) {
                                                    this.setState({ privilages: this.state.privilages }, () => {
                                                        if (this.state.privilages.length > 0){
                                                        if (this.state.privilages[0].name === "Dashboard") {
                                                            this.setState({ flagDashboard: true })
                                                        } else if (this.state.privilages[0].name === "Stores") {
                                                            this.getStoresList()
                                                            this.setState({ flagStore: true })
                                                        } else if (this.state.privilages[0].name === "Doamin") {
                                                            this.getDomainsList()
                                                            this.setState({ flagDomain: true })
                                                        }
                                                        else {
                                                            this.setState({ flagStore: false, flagDashboard: false, flagDomain: false })
                                                        }
                                                    }
                                                    });
                                                // }
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
                                                            this.state.headerName.push({name: subprivilage.name})
                                                        }
                                                    }
                                                    this.setState({ headerName: this.state.headerName }, () => {
                                                        console.log(this.state.headerName)
                                                        for (let j = 0; j < this.state.headerName.length; j++){
                                                            if (j === 0) {
                                                                this.state.privilages.push({ bool: true, name: this.state.headerName[j].name });
                                                            } else if (this.state.headerName[0].name !== "Dashboard") {
                                                                if (this.state.headerName[j].name === "Stores") {
                                                                    this.state.privilages.push({ bool: true, name: this.state.headerName[j].name });
                                                                } else {
                                                                    this.state.privilages.push({ bool: false, name: this.state.headerName[j].name });
                                                                }
                                                            }
                                                            else {
                                                                this.state.privilages.push({ bool: false, name: this.state.headerName[j].name });
                                                            }
                                                        }
                                                        
                                                    })
                                                    if (this.state.privilages.length > 0) {
                                                        this.setState({ privilages: this.state.privilages }, () => {
                                                            console.error(this.state.privilages)
                                                            if (this.state.privilages[0].name === "Dashboard") {
                                                                this.setState({ flagDashboard: true })
                                                            } else if (this.state.privilages[0].name === "Stores") {
                                                                this.getStoresList()
                                                                this.setState({ flagStore: true })
                                                            } else if (this.state.privilages[0].name === "Doamin") {
                                                                this.getDomainsList()
                                                                this.setState({ flagDomain: true })
                                                            } else if (this.state.privilages[0].name === "Credit Notes"
                                                                || this.state.privilages[0].name === "Debit Notes"
                                                                || this.state.privilages[0].name === "Create Tax Master"
                                                                || this.state.privilages[0].name === "Create HSN Code") {
                                                                this.getStoresList()
                                                                this.setState({ flagStore: true })
                                                            }
                                                            else {
                                                                this.setState({ flagStore: false, flagDashboard: false, flagDomain: false })
                                                            }
                                                        });
                                                    } else {
                                                        
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                            });
                        }).catch(() => {
                            this.setState({ loading: false });
                            console.log('There is error saving domainDataId');
                            //  alert('There is error saving domainDataId');
                        });

                    }
                }).catch(() => {
                    this.setState({ loading: false });
                    console.log('There is error getting storeId');
                    //  alert('There is error getting storeId');
                });
            }
        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting storeId');
            // alert('There is error getting storeId');
        });
        // this.getDomainsList();
        // this.getStoresList();
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
                this.setState({ domains: this.state.domains, domainError: "" });
                this.getChannelsList()
            } else {
                this.setState({domainError: "Records Not Found"})
            }
        }).catch(() => {
            this.setState({ loading: false });
            if (this.state.flagDomain === true) {
                this.setState({domainError: "Records Not Found"})
            //    alert("There is an Error while getting Domains");
            }
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
                this.setState({ stores: this.state.stores, storeError: "" });
            } else {
                this.setState({storeError: "Records Not Found"})
            }
        }).catch(() => {
            this.setState({ loading: false });
            if (this.state.flagStore === true) {
                this.setState({storeError: "Records Not Found"})
                // alert("There is an Error while Getting Stores");
            }
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


    getChannelsList() {
        axios.get(LoginService.channelsList()).then(res => {
            if (res) {
                this.setState({ channelsList: res.data.result })
                if (this.state.domains.length === this.state.channelsList.length) {
                    this.setState({channelFull: true})
                }
            }
        })
    }




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
                    <View style={headerTitleContainer} >
                        <View style={headerTitleSubContainer}>
                        <TouchableOpacity style={menuButton} onPress={() => this.handlemenuButtonClick()}>
                            <Image source={require('../assets/images/menu.png')} />
                        </TouchableOpacity>
                        <Text style={headerTitle}>
                            {I18n.t("Accounting")}
                        </Text>
                        </View>

                        <View style={headerTitleSubContainer2}>

                        {this.state.flagCreditNotes && (
                            <TouchableOpacity style={headerNavigationBtn} onPress={() => this.navigateToAddCreditNotes()}>
                                <Text style={headerNavigationBtnText}>Add Credit</Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagCreditNotes && (
                            <TouchableOpacity
                                style={filterBtn}
                                onPress={() => this.filterAction()} >
                                <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/promofilter.png')} />
                            </TouchableOpacity>
                        )}

                        {this.state.flagDebitNotes && (
                            <TouchableOpacity style={headerNavigationBtn} onPress={() => this.navigateToAdDebitNotes()}>
                                <Text style={headerNavigationBtnText}>Add Debit</Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagDebitNotes && (
                            <TouchableOpacity
                                style={filterBtn}
                                onPress={() => this.filterAction()} >
                                <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/promofilter.png')} />
                            </TouchableOpacity>
                        )}

                        {this.state.flagHSNCode && (
                            <TouchableOpacity style={headerNavigationBtn} onPress={() => this.navigateToAddHsnCode()}>
                                <Text style={headerNavigationBtnText}>Add HSN</Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagTaxMaster && (
                            <TouchableOpacity style={headerNavigationBtn} onPress={() => this.navigateToAddTax()}>
                                <Text style={headerNavigationBtnText}>Add Tax</Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagStore && (
                            <TouchableOpacity style={headerNavigationBtn} onPress={() => this.navigateToAddStores()}>
                                <Text style={headerNavigationBtnText}>{I18n.t("Add Store")}</Text>
                            </TouchableOpacity>
                            )}

                            {this.state.flagDomain && (
                            <TouchableOpacity style={headerNavigationBtn} onPress={() => this.navigateToAddDomain()}>
                                <Text style={headerNavigationBtnText}>{I18n.t("Add Domain")}</Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagStore && (
                            <View>
                                {!this.state.filterActive &&
                                    <TouchableOpacity
                                        style={filterBtn}
                                        onPress={() => this.filterAction()} >
                                        <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/promofilter.png')} />
                                    </TouchableOpacity>
                                }
                                {this.state.filterActive &&
                                    <TouchableOpacity
                                        style={filterBtn}
                                        onPress={() => this.clearFilterAction()} >
                                        <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/clearFilterSearch.png')} />
                                    </TouchableOpacity>
                                }
                            </View>
                        )}
                        </View>
                    </View>
                    <ScrollView>
                        <View style={styles.container}>

                            <FlatList
                                style={styles.flatList}
                                horizontal
                                data={this.state.privilages}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                ListEmptyComponent={<Text style={{ color: '#cc241d', textAlign: "center", fontFamily: "bold", fontSize: Device.isTablet ? 21 : 17, marginTop: deviceheight/3, marginLeft: deviceWidth/3.5 }}>&#9888; Privileges  Not Found</Text>}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity style={[pageNavigationBtn, {backgroundColor: item.bool ? '#ED1C24' : '#FFFFFF', borderColor: item.bool ? '#ED1C24' : '#858585',}]} onPress={() => this.topbarAction(item, index)} >

                                        <Text style={[pageNavigationBtnText, {color: item.bool ? "#FFFFFF" : '#858585',}]}>
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
                                    storeError={this.state.storeError}
                                />
                            )}

                            {this.state.flagDomain && (
                                <Domain
                                    domains={this.state.domains}
                                    navigation={this.props.navigation}
                                    domainError={this.state.domainError}
                                    channelFull={this.state.channelFull}
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
});
