import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import Loader from "../../commonUtils/loader";
import InventoryService from '../services/InventoryService';
import UrmService from '../services/UrmService';

var deviceWidth = Dimensions.get("window").width;
var deviceheight = Dimensions.get("window").height;

export default class Inventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doneButtonClicked: false,
            enddoneButtonClicked: false,
            barCodeId: "",
            rebarcodeId: "",
            startDate: "",
            endDate: "",
            flagone: false,
            flagtwo: false,
            inventoryDelete: false,
            flagFilterBarcodeOpen: false,
            flagFilterReBarcodeOpen: false,
            datepickerOpen: false,
            datepickerendOpen: false,
            modalVisible: true,
            startDate: "",
            endDate: "",
            date: new Date(),
            enddate: new Date(),
            barcodesData: [],
            reBarcodesData: [],
            deleteBarcodeId: "",
            deleteBarcoeIndex: "",
            barcodeDelete: false,
            storeId: 1,
            storeName: "",
            privilages: [],
            subPrivilages: "",
            barcodeTextileId: "",
            filterActive: false,
            headerNames: [],
            error: ''
        };
    }

    handleBackButtonClick() {
        this.props.navigation.openDrawer();
        // this.props.navigation.navigate('Home')
    }


    componentDidMount() {
        var domainStringId = "";
        var storeStringId = "";
        var storeName = "";
        AsyncStorage.getItem("domainDataId").then((value) => {
            domainStringId = value;
            this.setState({ domainId: parseInt(domainStringId) });
            console.log("domain data id" + this.state.domainId);


        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting domainDataId');
            //  console.log('There is error getting domainDataId');
        });

        AsyncStorage.getItem("storeId").then((value) => {
            storeStringId = value;
            this.setState({ storeId: parseInt(storeStringId) });
            console.log(this.state.storeId);
            // this.getAllBarcodes();
            // this.getbarcodeTexttileAdjustments()

        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting storeId');
            // console.log('There is error getting storeId');
        });

        AsyncStorage.getItem("storeName").then((value) => {
            storeName = value;
            this.setState({ storeName: storeName });
        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting storeId');
            // console.log('There is error getting storeId');
        });

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
                                    if (previlage.name === "Inventory Portal") {
                                        for (let i = 0; i < previlage.subPrivillages.length; i++) {
                                            console.log(previlage.subPrivillages[i].parentPrivillageId);
                                            if (previlage.id === previlage.subPrivillages[i].parentPrivillageId) {
                                                let subprivilage = previlage.subPrivillages[i];
                                                this.state.headerNames.push({name: subprivilage.name})
                                            }
                                        }
                                        this.setState({headerNames: this.state.headerNames}, () => {
                                            for (let j = 0; j < this.state.headerNames.length; j++){
                                                if(this.state.headerNames[j].name === "Product Combo") {}
                                                else if (j === 0) {
                                                    this.state.privilages.push({ bool: true, name: this.state.headerNames[j].name });
                                                }
                                                else {
                                                    this.state.privilages.push({ bool: false, name: this.state.headerNames[j].name });
                                                }
                                            }
                                        })
                                    }
                                    this.setState({ privilages: this.state.privilages }, () =>{
                                        if (this.state.privilages.length > 0) {
                                            if(this.state.privilages[0].name === "Barcode List"){
                                                this.setState({ startDate: "", endDate: "", barCodeId: "", doneButtonClicked: false, enddoneButtonClicked: false, flagone: true, flagtwo: false, error: "" });
                                                this.getAllBarcodes();
                                                this.setState({flagOne:true,flagTwo:false})
                                            }else  if(this.state.privilages[0].name === "Re-Barcode List"){
                                                this.setState({flagOne:false,flagTwo:true})
                                                this.setState({ reBarcodesData: [], startDate: "", endDate: "", barCodeId: "", });
                                                this.getbarcodeTexttileAdjustments();
                                            }
                                            }
                                            });
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
                                    if (previlage.name === "Inventory Portal") {

                                        if (length > 0) {
                                            for (let i = 0; i < length; i++) {
                                                if (previlage.id === res.data["result"].subPrivilages[i].parentPrivillageId) {
                                                    let subprivilage = res.data["result"].subPrivilages[i];
                                                this.state.headerNames.push({name: subprivilage.name})
                                                }
                                            }
                                            this.setState({headerNames: this.state.headerNames}, () => {
                                                for (let j = 0; j < this.state.headerNames.length; j++){
                                            if(this.state.headerNames[j].name === "Product Combo") {}
                                            else if (j === 0) {
                                                this.state.privilages.push({ bool: true, name: this.state.headerNames[j].name });
                                            }
                                            else {
                                                this.state.privilages.push({ bool: false, name: this.state.headerNames[j].name });
                                            }
                                        }
                                    })
                                            this.setState({ privilages: this.state.privilages }, () =>{
                                                if(this.state.privilages[0].name === "Barcode List"){
                                                    this.setState({ startDate: "", endDate: "", barCodeId: "", doneButtonClicked: false, enddoneButtonClicked: false, flagone: true, flagtwo: false, error: "" });
                                                    this.getAllBarcodes();
                                                    this.setState({flagOne:true,flagTwo:false})
                                                }else  if(this.state.privilages[0].name === "Re-Barcode List"){
                                                    this.setState({flagOne:false,flagTwo:true})
                                                    this.setState({ reBarcodesData: [], startDate: "", endDate: "", barCodeId: "", });
                                                    this.getbarcodeTexttileAdjustments();
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                      
                        }
                    });
                }).catch(() => {
                    this.setState({ loading: false });
                    console.log('There is error saving domainDataId');
                    // console.log('There is error saving domainDataId');
                });

            }
        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting sadasdsd');
            // console.log('There is error getting details');
        });

    }

    getAllBarcodes() {
        console.warn("UUUUU")
        this.setState({ barcodesData: [] });
        const params = {
            "fromDate": this.state.startDate,
            "toDate": this.state.endDate,
            "barcode": this.state.barCodeId,
            "storeId": this.state.storeId
        };
        console.log(params);
        this.setState({ loading: true });
        axios.post(InventoryService.getTextileBarcodes(), params).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                if (res.data["result"]) {
                    this.setState({ loading: false, barcodesData: res.data.result, error: "" });
                    console.log(res.data.result);
                }
                if (res.data.result.length === 0) {
                    this.setState({ error: "Records Not Found" });
                }
            }
        }).catch((err) => {
            this.setState({ loading: false, error: 'Records not found' });
        });
    }


    getbarcodeTexttileAdjustments() {
        this.setState({ reBarcodesData: [] });
        const params = {
            "fromDate": this.state.startDate,
            "toDate": this.state.endDate,
            "currentBarcodeId": this.state.barCodeId,
            "storeId": this.state.storeId
        };
        console.log(params);
        this.setState({ loading: true });
        axios.post(InventoryService.getbarcodeTexttileAdjustments(), params).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                console.log(res.data["result"]);
                if (res.data["result"]) {
                    this.setState({ loading: false, reBarcodesData: res.data.result });
                    console.log(res.data);
                }
                if (res.data.result.length === 0) {
                    this.setState({ error: "Records Not Found" });
                }
            }
        }).catch(() => {
            this.setState({ loading: false, error: "Records Not Found" });
        });

    }




    topbarAction1 = (item, index) => {
        if (item.name === "Barcode List") {
            this.setState({ startDate: "", endDate: "", barCodeId: "", doneButtonClicked: false, enddoneButtonClicked: false, flagone: true, flagtwo: false, error: "" });
            this.getAllBarcodes();
            this.setState({ flagOne: true }, () => {
                this.setState({ barcodesData: [], startDate: "", endDate: "", barCodeId: "", });
                this.getAllBarcodes();
            });
        } else {
            this.setState({ flagOne: false });
        }
        if (item.name === "Re-Barcode List") {
            this.setState({ startDate: "", endDate: "", barCodeId: "", doneButtonClicked: false, enddoneButtonClicked: false, flagone: false, flagtwo: true, error: "" });
            this.getbarcodeTexttileAdjustments();
            this.setState({ flagTwo: true }, () => {
                this.setState({ reBarcodesData: [], startDate: "", endDate: "", barCodeId: "", });
                this.getbarcodeTexttileAdjustments();
            });
        } else {
            this.setState({ flagTwo: false });
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

    topbarAction2() {

    }

    navigateToAddBarcode() {
        this.props.navigation.navigate('AddBarcode', {
            isEdit: false,
            onGoBack: () => this.getAllBarcodes(),
        });
    }

    // refteshBarcodes() {

    // }



    filterAction() {
        if (this.state.flagone === true) {
            this.setState({ flagFilterBarcodeOpen: true });
        }
        else {
            this.setState({ flagFilterBarcodeOpen: false });
        }
        if (this.state.flagtwo === true) {
            this.setState({ flagFilterReBarcodeOpen: true });
        }
        else {
            this.setState({ flagFilterReBarcodeOpen: false });
        }
        this.setState({ modalVisible: true });
    }

    modelCancel() {
        this.setState({ inventoryDelete: false, flagFilterBarcodeOpen: false, flagFilterReBarcodeOpen: false, modalVisible: false });
    }

    datepickerClicked() {
        this.setState({ datepickerOpen: true });
    }

    enddatepickerClicked() {
        this.setState({ datepickerendOpen: true });
    }

    datepickerDoneClicked() {
        if (parseInt(this.state.date.getDate()) < 10 && (parseInt(this.state.date.getMonth()) < 10)) {
            this.setState({ startDate: this.state.date.getFullYear() + "-0" + (this.state.date.getMonth() + 1) + "-" + "0" + this.state.date.getDate() });
        }
        else if (parseInt(this.state.date.getDate()) < 10) {
            this.setState({ startDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + "0" + this.state.date.getDate() });
        }
        else if (parseInt(this.state.date.getMonth()) < 10) {
            this.setState({ startDate: this.state.date.getFullYear() + "-0" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate() });
        }
        else {
            this.setState({ startDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate() });
        }


        this.setState({ doneButtonClicked: true, datepickerOpen: false, datepickerendOpen: false });
    }

    datepickerendDoneClicked() {
        if (parseInt(this.state.enddate.getDate()) < 10 && (parseInt(this.state.enddate.getMonth()) < 10)) {
            this.setState({ endDate: this.state.enddate.getFullYear() + "-0" + (this.state.enddate.getMonth() + 1) + "-" + "0" + this.state.enddate.getDate() });
        }
        else if (parseInt(this.state.enddate.getDate()) < 10) {
            this.setState({ endDate: this.state.enddate.getFullYear() + "-" + (this.state.enddate.getMonth() + 1) + "-" + "0" + this.state.enddate.getDate() });
        }
        else if (parseInt(this.state.enddate.getMonth()) < 10) {
            this.setState({ endDate: this.state.enddate.getFullYear() + "-0" + (this.state.enddate.getMonth() + 1) + "-" + this.state.enddate.getDate() });
        }
        else {
            this.setState({ endDate: this.state.enddate.getFullYear() + "-" + (this.state.enddate.getMonth() + 1) + "-" + this.state.enddate.getDate() });
        }
        this.setState({ enddoneButtonClicked: true, datepickerOpen: false, datepickerendOpen: false });
    }





    datepickerCancelClicked() {
        this.setState({ date: new Date(), endDate: new Date(), datepickerOpen: false, datepickerendOpen: false });
    }

    handlebarCodeId = (value) => {
        this.setState({ barCodeId: value.trim() });
    };

    applyBarcodeFilter() {

        let list = {};

        list = {
            fromDate: this.state.startDate,
            toDate: this.state.endDate,
            barcode: this.state.barCodeId,
            storeId: this.state.storeId
        };

        console.log(list);

        // this.setState({ barcodesData: [] });

        axios.post(InventoryService.getTextileBarcodes(), list).then(res => {
            console.log(res.data.result);
            let barcodes = [];
            if (res.data && res.data.isSuccess === "true" && res.data.result.length > 0) {
                this.setState({ barcodesData: [] });
                for (var i = 0; i < res.data["result"].length; i++) {
                    this.state.barcodesData.push(res.data["result"][i]);
                }
                this.setState({ barcodesData: this.state.barcodesData, filterActive: true});
            } else {
                console.log("records not found");
                this.setState({barcodesData: [], filterActive: true });
            }
        }).catch((err) => {
            this.setState({ loading: false });
            console.log("no records found");
            console.log(err);
            this.setState({ barcodesData: [] , filterActive: true});

        });
        this.setState({ modalVisible: false });
    }
    applyReBarcodeFilter() {
        let list = {};

        list = {
            fromDate: this.state.startDate,
            toDate: this.state.endDate,
            currentBarcodeId: this.state.barCodeId,
            storeId: this.state.storeId
        };

        axios.post(InventoryService.getbarcodeTexttileAdjustments(), list).then(res => {
            console.log(res.data);
            console.log(res.data.result.length);

            if (res.data && res.data.isSuccess === "true" && res.data.result.length > 0) {
                this.setState({ reBarcodesData: [] });
                for (var i = 0; i < res.data["result"].length; i++) {
                    this.state.reBarcodesData.push(res.data["result"][i]);
                }
                this.setState({ reBarcodesData: this.state.reBarcodesData, filterActive: true });
            } else {
                this.setState({reBarcodesData: [], filterActive: true})
                console.log("results not found");
            }
        }).catch((err) => {
            this.setState({ loading: false });
            console.log("no records found");
            console.log(err);
            this.setState({reBarcodesData: [], filterActive: true})
        });


        this.setState({ modalVisible: false });
    }

    handlebarcodedeleteaction(item, index) {
        this.setState({ inventoryDelete: true, modalVisible: true, barcodeTextileId: item.barcodeTextileId });

        // axios.delete(InventoryService.deleteTextileBarcode(), {
        //     params: {
        //         "barcodeId": item.barcodeTextileId,
        //     }
        // }).then((res) => {
        //     if (res.data && res.data["isSuccess"] === "true") {
        //         this.getAllBarcodes()
        //         // this.setState({ promoDelete: false });
        //         // this.setState({ modalVisible: false });
        //     }
        //     else {

        //     }
        // }
        // );
    }

    print = (item, index) => {

    };

    clearFilterAction() {
        if (this.state.flagone === true) {
            this.setState({ filterActive: false, startDate: "", endDate: "", barCodeId: "", }, () => {
                this.setState({ barcodesData: [] }, () => {
                    this.getAllBarcodes();
                });
            });
        } else {
            this.setState({ filterActive: false, startDate: "", endDate: "", barCodeId: "", }, () => {
                this.setState({ reBarcodesData: [] }, () => {
                    this.getbarcodeTexttileAdjustments();
                });
            });
        }
    }



    seeDetails = (item, index) => {
        this.setState({ barcodesData: [] });
        const params = {
            // "fromDate": "",
            // "toDate": "",
            "barcode": item.currentBarcodeId,
            "storeId": this.state.storeId
        };
        console.log("cssafsfssdsfdsfsdsadasd" + this.state.storeId);
        console.log("params", params,);
        axios.post(InventoryService.getTextileBarcodesDetails(), params).then((res) => {
            if (res) {
                console.log("response edit", res);
                if (res.data && res.data["isSuccess"] === "true") {
                    if (res.data["result"]) {
                        //  this.setState({ loading: false })
                        for (var i = 0; i < res.data["result"].length; i++) {
                            this.state.barcodesData.push(res.data["result"][i]);
                            // console.log(res.data["result"][i].productTextile.empId)
                            this.props.navigation.navigate('ViewReBarcode'
                                , {
                                    item: res.data["result"][i], isEdit: true,
                                    onGoBack: () => this.updateBarcodes(),
                                });

                        }
                    }

                    this.setState({ barcodesData: this.state.barcodesData });

                }
            }
        }).catch(err => {
            console.log(err);
        });


    };

    deleteInventory() {
        axios.delete(InventoryService.deleteTextileBarcode(), {
            params: {
                //barcodeId=1811759398
                "barcodeTextileId": this.state.barcodeTextileId,
            }
        }).then((res) => {
            if (res.data && res.data.isSuccess === "true") {
                console.log(res.data.result);
                this.setState({ inventoryDelete: false, modalVisible: false, barcodeTextileId: '' });
                this.setState({ isAddBarcode: false });
                this.getAllBarcodes();
            } else {
                this.setState({ inventoryDelete: false, modalVisible: false, barcodeTextileId: '' });
                console.log(res.data.message);
            }
        }
        );
    };

    updateBarcodes() {
        this.getAllBarcodes();
    }

    handleeditbarcode(item, index) {
        this.props.navigation.navigate('EditBarcode'
            , {
                item: item, isEdit: true,
                onGoBack: () => this.updateBarcodes(),
            });
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
                        <Image source={require('../assets/images/menu.png')} />
                    </TouchableOpacity>
                    <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}>
                        {I18n.t("Inventory Portal")}
                    </Text>
                    {this.state.flagone && (
                        <TouchableOpacity style={Device.isTablet ? styles.addBarcodeButton_tablet : styles.addBarcodeButton_mobile} onPress={() => this.navigateToAddBarcode()}>
                            <Text style={Device.isTablet ? styles.addBarcodeButtonText_tablet : styles.addBarcodeButtonText_mobile}>{I18n.t("Add BarCode")}</Text>
                        </TouchableOpacity>
                    )}
                    {/* <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: 47, backgroundColor: '#ED1C24', borderRadius: 5, width: 105, height: 32, }}
            onPress={() => this.navigateToScanCode()} >
            <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('NEW SALE SCAN')} </Text>
          </TouchableOpacity> */}
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
                </View>

                <ScrollView>
                    <View style={styles.container}>
                        <FlatList
                            style={styles.flatList}
                            horizontal
                            data={this.state.privilages}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item,i) => i.toString()}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={{
                                    height: Device.isTablet ? 46 : 36,
                                    width: Device.isTablet ? 250 : 200,
                                    borderWidth: Device.isTablet ? 2 : 1,
                                    backgroundColor: item.bool ? '#ED1C24' : '#FFFFFF',
                                    borderColor: item.bool ? '#ED1C24' : '#858585',
                                    borderRadius: Device.isTablet ? 10 : 5,
                                    marginLeft: 10,
                                }} onPress={() => this.topbarAction1(item, index)} >

                                    <Text style={{ fontSize: Device.isTablet ? 21 : 16, alignItems: 'center', alignSelf: 'center', marginTop: 5, color: item.bool ? "#FFFFFF" : '#858585', fontFamily: 'regular' }}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            ListFooterComponent={<View style={{ width: 15 }}></View>}
                        />


                        {this.state.flagone && (
                            <View>
                                <FlatList
                                    data={this.state.barcodesData}                              
                                    style={{ marginTop: 20 }}
                                    scrollEnabled={true}
                                    removeClippedSubviews={false}
                                    ListEmptyComponent={<Text style={{ color: '#cc241d', textAlign: "center", fontFamily: "bold", fontSize: Device.isTablet ? 21 : 17, marginTop: deviceheight/3 }}>&#9888; Records Not Found</Text>}
                                    keyExtractor={(item,i) => i.toString()}
                                    renderItem={({ item, index }) => (
                                        <View
                                            style={Device.isTablet ? styles.barcodesFlatlistContainer_tablet : styles.barcodesFlatlistContainer_mobile}
                                        >
                                            <View style={Device.isTablet ? styles.barcodesFlatlistSubContainer_tablet : styles.barcodesFlatlistSubContainer_mobile}>
                                                <Text style={Device.isTablet ? flats.mainText_tablet : flats.mainText_mobile} >S.NO: {index + 1} </Text>
                                                <Text selectable={true} style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile} >{I18n.t("BARCODE")}: {"\n"}{item.barcode}</Text>
                                                <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>{I18n.t("LIST PRICE")}:  {"\n"} ₹{item.itemMrp} </Text>
                                                <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>{I18n.t("STORE")}: {this.state.storeName}</Text>
                                                <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>QTY:  {item.qty}</Text>
                                                <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>{I18n.t("VALUE")}: ₹{item.value}</Text>
                                                <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.handleeditbarcode(item, index)}>
                                                    <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/edit.png')} />
                                                </TouchableOpacity>

                                                <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handlebarcodedeleteaction(item, index)}>
                                                    <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/delete.png')} />

                                                </TouchableOpacity>

                                                {/* <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>{ }</Text> */}

                                            </View>
                                        </View>
                                    )}
                                />
                                {/* {this.state.barcodesData.length === 0 && this.state.error.length > 0 &&
                                } */}
                            </View>
                        )}

                        {this.state.flagtwo && (
                            <View>
                                <FlatList
                                    data={this.state.reBarcodesData}
                                    style={{ marginTop: 20 }}
                                    scrollEnabled={true}
                                    keyExtractor={item => item}
                                    ListEmptyComponent={<Text style={{ color: '#cc241d', textAlign: "center", fontFamily: "bold", fontSize: Device.isTablet ? 21 : 17, marginTop: deviceheight/3 }}>&#9888; Records Not Found</Text>}
                                    renderItem={({ item, index }) => (
                                        <View
                                            style={Device.isTablet ? styles.barcodesFlatlistContainer_tablet : styles.barcodesFlatlistContainer_mobile}
                                        >
                                            <View style={Device.isTablet ? styles.barcodesFlatlistSubContainer_tablet : styles.barcodesFlatlistSubContainer_mobile}>
                                                <Text style={Device.isTablet ? flats.mainText_tablet : flats.mainText_mobile} >{I18n.t("PARENT BARCODE")}: {"\n"}{item.toBeBarcodeId}</Text>
                                                <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile} selectable={true}>{I18n.t("CHILD BARCODE")}: {"\n"}{item.currentBarcodeId}</Text>
                                                {/* <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonTextsubrebar_mobile}>{ }</Text> */}
                                                <Text style={Device.isTablet ? flats.commonTextRebar_tablet : flats.commonTextRebar_mobile}>{I18n.t("EMPLOYEE ID")}: {"\n"}{item.createdBy}</Text>
                                                <Text style={Device.isTablet ? flats.commonTextRebar2_tablet : flats.commonTextRebar2_mobile}>{I18n.t("DATE")}: {"\n"}{item.fromDate}</Text>
                                            </View>
                                            <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.print(item, index)}>
                                                <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/print.png')} />
                                            </TouchableOpacity>

                                            <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.seeDetails(item, index)}>
                                                <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/eye.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                                {/* {this.state.reBarcodesData.length === 0 && this.state.error.length > 0 &&
                                } */}
                            </View>
                        )}
                    </View>
                </ScrollView>

                {this.state.inventoryDelete && (
                    <View>
                        <Modal style={{ margin: 0 }} isVisible={this.state.modalVisible}>
                            <View style={styles.deleteMainContainer}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, height: Device.isTablet ? 60 : 50 }}>
                                        <View>
                                            <Text style={{ marginTop: 15, fontSize: Device.isTablet ? 22 : 17, marginLeft: 20 }} > {I18n.t("Delete Barcode")} </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={{ width: Device.isTablet ? 60 : 50, height: Device.isTablet ? 60 : 50, marginTop: Device.isTablet ? 20 : 15, }} onPress={() => this.modelCancel()}>
                                                <Image style={{ margin: 5 }} source={require('../assets/images/modelcancel.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text style={{
                                        height: Device.isTablet ? 2 : 1,
                                        width: deviceWidth,
                                        backgroundColor: 'lightgray',
                                    }}></Text>
                                </View>

                                <Text style={{
                                    // position: 'absolute',
                                    // top: 70,
                                    height: Device.isTablet ? 40 : 20,
                                    textAlign: 'center',
                                    fontFamily: 'regular',
                                    fontSize: Device.isTablet ? 23 : 18,
                                    // marginBottom: Device.isTablet ? 25 : 0,
                                    color: '#353C40'
                                }}> {I18n.t("Are you sure want to delete Barcode")} ?  </Text>

                                <TouchableOpacity
                                    style={[Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile, { marginTop: Device.isTablet ? 65 : 40 }]}
                                    onPress={() => this.deleteInventory()}
                                >
                                    <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile}  > {I18n.t("DELETE")} </Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile} onPress={() => this.modelCancel()}
                                >
                                    <Text style={Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile}  > {I18n.t("CANCEL")} </Text>

                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                )}
                {this.state.flagFilterBarcodeOpen && (
                    <View>
                        <Modal style={{ margin: 0 }} isVisible={this.state.modalVisible}>
                            <View style={styles.filterMainContainer} >
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, height: Device.isTablet ? 60 : 50 }}>
                                        <View>
                                            <Text style={{ marginTop: 15, fontSize: Device.isTablet ? 22 : 17, marginLeft: 20 }} > {I18n.t("Filter By")} </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={{ width: Device.isTablet ? 60 : 50, height: Device.isTablet ? 60 : 50, marginTop: Device.isTablet ? 20 : 15, }} onPress={() => this.modelCancel()}>
                                                <Image style={{ margin: 5 }} source={require('../assets/images/modelcancel.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text style={{
                                        height: Device.isTablet ? 2 : 1,
                                        width: deviceWidth,
                                        backgroundColor: 'lightgray',
                                    }}></Text>
                                </View>
                                <KeyboardAwareScrollView enableOnAndroid={true} >
                                    <TouchableOpacity
                                        style={Device.isTablet ? styles.filterDateButton_tablet : styles.filterDateButton_mobile}
                                        testID="openModal"
                                        onPress={() => this.datepickerClicked()}
                                    >
                                        <Text
                                            style={Device.isTablet ? styles.filterDateButtonText_tablet : styles.filterDateButtonText_mobile}
                                        >{this.state.doneButtonClicked == false ? 'Start Date' : this.state.startDate}</Text>
                                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/calender.png')} />
                                    </TouchableOpacity>
                                    {this.state.datepickerOpen && this.state.flagone && (
                                        <View style={{ height: 280, width: deviceWidth, backgroundColor: 'ffffff' }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Device.isTablet ? 15 : 10, marginLeft: Device.isTablet ? 20 : 10, marginRight: Device.isTablet ? 20 : 10 }}>
                                                <TouchableOpacity
                                                    style={Device.isTablet ? styles.datePickerButton_tablet : styles.datePickerButton_mobile} onPress={() => this.datepickerCancelClicked()}
                                                >
                                                    <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Cancel </Text>

                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[Device.isTablet ? styles.datePickerButton_tablet : styles.datePickerButton_mobile, { paddingLeft: 10, paddingRight: 10, backgroundColor: '#000000' }]} onPress={() => this.setState({ startDate: "" })}
                                                >
                                                    <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Clear </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={Device.isTablet ? styles.datePickerEndButton_tablet : styles.datePickerEndButton_mobile} onPress={() => this.datepickerDoneClicked()}
                                                >
                                                    <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Done </Text>

                                                </TouchableOpacity>
                                            </View>
                                            <DatePicker style={{ width: deviceWidth, height: 200, marginTop: 50, }}
                                                date={this.state.date}
                                                mode={'date'}
                                                onDateChange={(date) => this.setState({ date })}
                                            />
                                        </View>
                                    )}
                                    <TouchableOpacity
                                        style={Device.isTablet ? styles.filterDateButton_tablet : styles.filterDateButton_mobile}
                                        testID="openModal"
                                        onPress={() => this.enddatepickerClicked()}
                                    >
                                        <Text
                                            style={Device.isTablet ? styles.filterDateButtonText_tablet : styles.filterDateButtonText_mobile}
                                        >{this.state.enddoneButtonClicked == false ? 'End Date' : this.state.endDate}</Text>
                                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/calender.png')} />
                                    </TouchableOpacity>

                                    {this.state.datepickerendOpen && this.state.flagone && (
                                        <View style={{ height: 280, width: deviceWidth, backgroundColor: '#ffffff' }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Device.isTablet ? 15 : 10, marginLeft: Device.isTablet ? 20 : 10, marginRight: Device.isTablet ? 20 : 10 }}>
                                                <View>
                                                    <TouchableOpacity
                                                        style={Device.isTablet ? styles.datePickerButton_tablet : styles.datePickerButton_mobile} onPress={() => this.datepickerCancelClicked()}
                                                    >
                                                        <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Cancel </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <TouchableOpacity
                                                        style={[Device.isTablet ? styles.datePickerButton_tablet : styles.datePickerButton_mobile, { paddingLeft: 10, paddingRight: 10, backgroundColor: '#000000' }]} onPress={() => this.setState({ endDate: "" })}
                                                    >
                                                        <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Clear </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    <TouchableOpacity
                                                        style={Device.isTablet ? styles.datePickerEndButton_tablet : styles.datePickerEndButton_mobile} onPress={() => this.datepickerendDoneClicked()}
                                                    >
                                                        <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Done </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <DatePicker style={{ width: deviceWidth, height: 200, marginTop: 50, }}
                                                date={this.state.enddate}
                                                mode={'date'}
                                                onDateChange={(enddate) => this.setState({ enddate })}
                                            />
                                        </View>
                                    )}
                                    <TextInput
                                        style={[Device.isTablet ? styles.input_tablet : styles.input_mobile, { width: deviceWidth - 40 }]}
                                        underlineColorAndroid="transparent"
                                        placeholder={I18n.t("BARCODE ID")}
                                        placeholderTextColor="#6F6F6F"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.barCodeId}
                                        onChangeText={this.handlebarCodeId}
                                    />
                                    <TouchableOpacity style={Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile}
                                        onPress={() => this.applyBarcodeFilter()}>
                                        <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile} >{I18n.t("APPLY")}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile}
                                        onPress={() => this.modelCancel()}>
                                        <Text style={Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile}>{I18n.t("CANCEL")}</Text>
                                    </TouchableOpacity>
                                </KeyboardAwareScrollView>
                            </View>
                        </Modal>
                    </View>
                )}
                {this.state.flagFilterReBarcodeOpen && (
                    <View>
                        <Modal style={{ margin: 0 }} isVisible={this.state.modalVisible}>
                            <View style={styles.filterMainContainer} >
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, height: Device.isTablet ? 60 : 50 }}>
                                        <View>
                                            <Text style={{ marginTop: 15, fontSize: Device.isTablet ? 22 : 17, marginLeft: 20 }} > {I18n.t("Filter By")} </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={{ width: Device.isTablet ? 60 : 50, height: Device.isTablet ? 60 : 50, marginTop: Device.isTablet ? 20 : 15, }} onPress={() => this.modelCancel()}>
                                                <Image style={{ margin: 5 }} source={require('../assets/images/modelcancel.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text style={{
                                        height: Device.isTablet ? 2 : 1,
                                        width: deviceWidth,
                                        backgroundColor: 'lightgray',
                                    }}></Text>
                                </View>
                                <KeyboardAwareScrollView enableOnAndroid={true} >

                                    <TouchableOpacity
                                        style={Device.isTablet ? styles.filterDateButton_tablet : styles.filterDateButton_mobile}
                                        testID="openModal"
                                        onPress={() => this.datepickerClicked()}
                                    >
                                        <Text
                                            style={Device.isTablet ? styles.filterDateButtonText_tablet : styles.filterDateButtonText_mobile}
                                        >{this.state.doneButtonClicked == false ? 'Start Date' : this.state.startDate}</Text>
                                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/calender.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={Device.isTablet ? styles.filterDateButton_tablet : styles.filterDateButton_mobile}
                                        testID="openModal"
                                        onPress={() => this.enddatepickerClicked()}
                                    >
                                        <Text
                                            style={Device.isTablet ? styles.filterDateButtonText_tablet : styles.filterDateButtonText_mobile}
                                        >{this.state.enddoneButtonClicked == false ? 'End Date' : this.state.endDate}</Text>
                                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/calender.png')} />
                                    </TouchableOpacity>
                                    {this.state.datepickerOpen && this.state.flagtwo && (
                                        <View style={{ height: 280, width: deviceWidth, backgroundColor: 'ffffff' }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Device.isTablet ? 15 : 10, marginLeft: Device.isTablet ? 20 : 10, marginRight: Device.isTablet ? 20 : 10 }}>

                                                <TouchableOpacity
                                                    style={Device.isTablet ? styles.datePickerButton_tablet : styles.datePickerButton_mobile} onPress={() => this.datepickerCancelClicked()}
                                                >
                                                    <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Cancel </Text>

                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[Device.isTablet ? styles.datePickerButton_tablet : styles.datePickerButton_mobile, { paddingLeft: 10, paddingRight: 10, backgroundColor: '#000000' }]} onPress={() => this.setState({ startDate: "" })}
                                                >
                                                    <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Clear </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={Device.isTablet ? styles.datePickerEndButton_tablet : styles.datePickerEndButton_mobile} onPress={() => this.datepickerDoneClicked()}
                                                >
                                                    <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Done </Text>

                                                </TouchableOpacity>
                                            </View>
                                            <DatePicker style={{ width: deviceWidth, height: 200, marginTop: 50, }}
                                                date={this.state.date}
                                                mode={'date'}
                                                onDateChange={(date) => this.setState({ date })}
                                            />
                                        </View>
                                    )}
                                    {this.state.datepickerendOpen && this.state.flagtwo && (
                                        <View style={{ height: 280, width: deviceWidth, backgroundColor: 'ffffff' }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Device.isTablet ? 15 : 10, marginLeft: Device.isTablet ? 20 : 10, marginRight: Device.isTablet ? 20 : 10 }}>
                                                <TouchableOpacity
                                                    style={Device.isTablet ? styles.datePickerButton_tablet : styles.datePickerButton_mobile} onPress={() => this.datepickerCancelClicked()}
                                                >
                                                    <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Cancel </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[Device.isTablet ? styles.datePickerButton_tablet : styles.datePickerButton_mobile, { paddingLeft: 10, paddingRight: 10, backgroundColor: '#000000' }]} onPress={() => this.setState({ endDate: "" })}
                                                >
                                                    <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Clear </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={Device.isTablet ? styles.datePickerEndButton_tablet : styles.datePickerEndButton_mobile} onPress={() => this.datepickerendDoneClicked()}
                                                >
                                                    <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Done </Text>

                                                </TouchableOpacity>
                                            </View>
                                            <DatePicker style={{ width: deviceWidth, height: 200, marginTop: 50, }}
                                                date={this.state.enddate}
                                                mode={'date'}
                                                onDateChange={(enddate) => this.setState({ enddate })}
                                            />
                                        </View>
                                    )}
                                    <TextInput
                                        style={[Device.isTablet ? styles.input_tablet : styles.input_mobile, { width: deviceWidth - 40 }]}
                                        underlineColorAndroid="transparent"
                                        placeholder={I18n.t("RE-BARCODE ID")}
                                        placeholderTextColor="#6F6F6F"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.barCodeId}
                                        onChangeText={this.handlebarCodeId}
                                    />
                                    <View>
                                        <TouchableOpacity style={Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile}
                                            onPress={() => this.applyReBarcodeFilter()}>
                                            <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile} >{I18n.t("APPLY")}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile}
                                            onPress={() => this.modelCancel()}>
                                            <Text style={Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile}>{I18n.t("CANCEL")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAwareScrollView>
                            </View>
                        </Modal>
                    </View>
                )}
                {this.state.barcodeDelete && (
                    <View>
                        <Modal style={{ margin: 0 }} isVisible={this.state.modalVisible}>

                            <View style={styles.deleteMainContainer}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, height: Device.isTablet ? 60 : 50 }}>
                                        <View>
                                            <Text style={{ marginTop: 15, fontSize: Device.isTablet ? 22 : 17, marginLeft: 20 }} > Delete Barcode Id </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={{ width: Device.isTablet ? 60 : 50, height: Device.isTablet ? 60 : 50, marginTop: Device.isTablet ? 20 : 15, }} onPress={() => this.modelCancel()}>
                                                <Image style={{ margin: 5 }} source={require('../assets/images/modelcancel.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text style={{
                                        height: Device.isTablet ? 2 : 1,
                                        width: deviceWidth,
                                        backgroundColor: 'lightgray',
                                    }}></Text>
                                </View>

                                <Text style={Device.isTablet ? flats.deleteSubHeading_tablet : flats.deleteSubHeading_mobile}> Are you sure want to delete Barcode?  </Text>
                                <TouchableOpacity
                                    style={Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile} onPress={() => this.deleteBarcodeId(item, index)}
                                >
                                    <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile}  > DELETE </Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile} onPress={() => this.modelCancel()}
                                >
                                    <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile}  > CANCEL </Text>

                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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
    deleteMainContainer: {
        backgroundColor: '#ffffff',
        marginTop: Device.isTablet ? deviceheight - 350 : deviceheight - 240,
        height: Device.isTablet ? 350 : 240,
    },
    modelCloseImage: {
        fontFamily: 'regular',
        fontSize: 12,
        position: 'absolute',
        top: 10,
        right: Device.isTablet ? 15 : 30,
    },
    filterMainContainer: {
        backgroundColor: '#ffffff',
        marginTop: Device.isTablet ? deviceheight - 500 : deviceheight - 400,
        height: Device.isTablet ? 500 : 400,
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
    flatList: {
        marginTop: 20,
        marginBottom: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#FAFAFF'
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
        top: 30,
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
        borderWidth: Device.isTablet ? 2 : 1,
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
        height: Device.isTablet ? 2 : 1,
        width: deviceWidth,
        backgroundColor: 'lightgray',
        marginTop: 50,
    },
    filterCloseButton_mobile: {
        position: 'absolute',
        right: 8,
        top: 15,
        width: 50,
        height: 50,
    },
    filterCloseImage_mobile: {
        fontFamily: 'regular',
        fontSize: 12,
        position: 'absolute',
        top: 15,
        right: 0,
    },
    filterDateButton_mobile: {
        width: deviceWidth - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 5,
        marginBottom: 10,
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
        height: 30,
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    datePickerEndButton_mobile: {
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
        borderWidth: Device.isTablet ? 2 : 1,
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
        borderWidth: Device.isTablet ? 2 : 1,
        borderColor: "#353C4050",
    },
    filterButtonCancelText_mobile: {
        textAlign: 'center',
        marginTop: 20,
        color: "#000000",
        fontSize: 15,
        fontFamily: "regular"
    },
    barcodesFlatlistContainer_mobile: {
        height: 140,
        backgroundColor: '#FBFBFB',
        borderBottomWidth: 5,
        borderBottomColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    barcodesFlatlistSubContainer_mobile: {
        flexDirection: 'column',
        width: '100%',
        height: 140,
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
        borderWidth: Device.isTablet ? 2 : 1,
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
        borderRadius: 10,
        width: 120,
        height: 35,
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
        right: 0,
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
        borderWidth: Device.isTablet ? 2 : 1,
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
        borderWidth: Device.isTablet ? 2 : 1,
        borderColor: "#353C4050",
    },
    filterButtonCancelText_tablet: {
        textAlign: 'center',
        marginTop: 20,
        color: "#000000",
        fontSize: 20,
        fontFamily: "regular"
    },
    barcodesFlatlistContainer_tablet: {
        height: 160,
        backgroundColor: '#FBFBFB',
        borderBottomWidth: 5,
        borderBottomColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    barcodesFlatlistSubContainer_tablet: {
        flexDirection: 'column',
        width: '100%',
        height: 160,
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
        marginTop: -95,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'regular',
        color: '#808080'
    },
    commonTextRebar_mobile: {
        fontSize: 12,
        marginBottom: 10,
        marginTop: -95,
        marginLeft: 110,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'regular',
        color: '#808080'
    },
    commonTextRebar2_mobile: {
        fontSize: 12,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 110,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'regular',
        color: '#808080'
    },
    commonTextsubrebar_mobile: {
        fontSize: 12,
        marginBottom: 10,
        marginTop: 10,
        position: 'absolute',
        right: 20,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'regular',
        color: '#808080'
    },
    commonTextsubreba2_mobile: {
        fontSize: 12,
        marginBottom: 10,
        marginTop: 100,
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
        borderWidth: Device.isTablet ? 2 : 1,
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
        borderWidth: Device.isTablet ? 2 : 1,
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
    commonTextRebar_tablet: {
        fontSize: 17,
        marginBottom: 10,
        marginTop: -120,
        marginLeft: 100,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'regular',
        color: '#808080'
    },
    commonTextRebar2_tablet: {
        fontSize: 17,
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 100,
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
        right: 70,
        top: 90,
        width: 50,
        height: 50,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        borderWidth: Device.isTablet ? 2 : 1,
        borderColor: "lightgray",
        // borderRadius:5,
    },
    deleteButton_tablet: {
        position: 'absolute',
        right: 20,
        top: 90,
        width: 50,
        height: 50,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: Device.isTablet ? 2 : 1,
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
