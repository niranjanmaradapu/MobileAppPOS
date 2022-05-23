import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ClipboardStatic } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import Modal from 'react-native-modal';
import ThemedDialog from 'react-native-elements/dist/dialog/Dialog';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from 'react-native-paper';
import Loader from "../../commonUtils/loader";
import InventoryService from '../services/InventoryService';
import UrmService from '../services/UrmService';
import { RH, RW, RF } from '../../Responsive';
import { listEmptyMessage, pageNavigationBtn, pageNavigationBtnText, filterBtn, menuButton, headerNavigationBtn, headerNavigationBtnText, headerTitle, headerTitleContainer, headerTitleSubContainer, headerTitleSubContainer2, buttonContainer, buttonStyle, buttonStyle1, flatListMainContainer, flatlistSubContainer, buttonImageStyle, textContainer, textStyleLight, textStyleMedium, highText } from '../Styles/Styles';
import { filterMainContainer, filterSubContainer, filterHeading, filterCloseImage, deleteText, deleteHeading, deleteHeader, deleteContainer, deleteCloseBtn } from '../Styles/PopupStyles';
import { inputField, rnPickerContainer, rnPicker, submitBtn, submitBtnText, cancelBtn, cancelBtnText, datePicker, datePickerBtnText, datePickerButton1, datePickerButton2, datePickerContainer, dateSelector, dateText, } from '../Styles/FormFields';
import Barcode from './Barcode';
import ProductCombo from './ProductCombo';


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
            flagBarcode: false,
            flagRebarCode: false,
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
            filterBarcodesData: [],
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
            error: '',
            pageNo: 0,
            filterPageNo: 0,
        };
        this.onEndReachedCalledDuringMomentum = true;
    }

    handleBackButtonClick() {
        this.props.navigation.openDrawer();
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
        });

        AsyncStorage.getItem("storeId").then((value) => {
            storeStringId = value;
            this.setState({ storeId: parseInt(storeStringId) });
            console.log(this.state.storeId);

        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting storeId');
        });

        AsyncStorage.getItem("storeName").then((value) => {
            storeName = value;
            this.setState({ storeName: storeName });
        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting storeId');
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
                                                this.state.headerNames.push({ name: subprivilage.name })
                                            }
                                        }
                                        this.setState({ headerNames: this.state.headerNames }, () => {
                                            for (let j = 0; j < this.state.headerNames.length; j++) {
                                                if (j === 0) {
                                                    this.state.privilages.push({ bool: true, name: this.state.headerNames[j].name });
                                                }
                                                else {
                                                    this.state.privilages.push({ bool: false, name: this.state.headerNames[j].name });
                                                }
                                            }
                                        })
                                    }
                                    this.setState({ privilages: this.state.privilages }, () => {
                                        if (this.state.privilages.length > 0) {
                                            if (this.state.privilages[0].name === "Barcode List") {
                                                this.setState({ flagBarcode: true, flagRebarCode: false });
                                                this.setState({ flagBarcode: true, flagRebarCode: false })
                                            } else if (this.state.privilages[0].name === "Re-Barcode List") {
                                                this.setState({ flagBarcode: false, flagRebarCode: true })
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
                                                    this.state.headerNames.push({ name: subprivilage.name })
                                                }
                                            }
                                            this.setState({ headerNames: this.state.headerNames }, () => {
                                                for (let j = 0; j < this.state.headerNames.length; j++) {
                                                    if (j === 0) {
                                                        this.state.privilages.push({ bool: true, name: this.state.headerNames[j].name });
                                                    }
                                                    else {
                                                        this.state.privilages.push({ bool: false, name: this.state.headerNames[j].name });
                                                    }
                                                }
                                            })
                                            this.setState({ privilages: this.state.privilages }, () => {
                                                if (this.state.privilages.length > 0) {
                                                    if (this.state.privilages[0].name === "Barcode List") {
                                                        this.setState({ flagBarcode: true, flagRebarCode: false });
                                                        this.setState({ flagBarcode: true, flagRebarCode: false })
                                                    } else if (this.state.privilages[0].name === "Re-Barcode List") {
                                                        this.setState({ flagBarcode: false, flagRebarCode: true })
                                                        this.setState({ reBarcodesData: [], startDate: "", endDate: "", barCodeId: "", });
                                                        this.getbarcodeTexttileAdjustments();
                                                    }
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
                });

            }
        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting sadasdsd');
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
        axios.post(InventoryService.getbarcodeTexttileAdjustments() + '?page=' + parseInt(this.state.pageNo) + '&size=10', params).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                if (res.data["result"]) {
                    this.setState({ loading: false, reBarcodesData: res.data.result.content });
                    console.log("rebarcodesData", this.state.reBarcodesData);
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
            this.setState({ flagBarcode: true, filterActive: false });
        } else {
            this.setState({ flagBarcode: false });
        }
        if (item.name === "Re-Barcode List") {
            this.setState({ flagRebarCode: true, filterActive: false });
            this.getbarcodeTexttileAdjustments()
        } else {
            this.setState({ flagRebarCode: false });
        }
        if (item.name === "Product Combo") {
            this.setState({ flagProductCombo: true, filterActive: false })
        } else {
            this.setState({ flagProductCombo: false })
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
            onGoBack: () => this.child.getAllBarcodes(),
        });
    }

    navigateToAddProductCombo() {
        this.props.navigation.navigate('AddProduct', {
            isEdit: false,
            onGoBack: () => null
        })
    }


    filterAction() {
        if (this.state.flagBarcode === true) {
            this.setState({ flagFilterBarcodeOpen: true });
        }
        else {
            this.setState({ flagFilterBarcodeOpen: false });
        }
        if (this.state.flagRebarCode === true) {
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

    filterBarcodes() {
        this.setState({ filterActive: true })
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
                this.setState({ reBarcodesData: [], filterActive: true })
                console.log("results not found");
            }
        }).catch((err) => {
            this.setState({ loading: false });
            console.log("no records found");
            console.log(err);
            this.setState({ reBarcodesData: [], filterActive: true })
        });


        this.setState({ modalVisible: false });
    }

    handlebarcodedeleteaction(item, index) {
        this.setState({ inventoryDelete: true, modalVisible: true, barcodeTextileId: item.barcodeTextileId });
    }

    print = (item, index) => {

    };

    clearFilterAction() {
        if (this.state.flagBarcode === true) {
            this.setState({ filterActive: false });
        } else {
            this.setState({ filterActive: false });
        }
    }



    seeDetails = (item, index) => {
        this.setState({ barcodesData: [] });
        const params = {
            "barcode": item.currentBarcodeId,
            "storeId": this.state.storeId
        };
        console.log("storeId" + this.state.storeId);
        console.error("params", params,);
        axios.get(InventoryService.getTextileBarcodesDetails(), { params }).then((res) => {
            if (res) {
                console.log("response edit", res);
                if (res.data && res.data["isSuccess"] === "true") {
                    if (res.data["result"]) {
                        this.state.barcodesData.push(res.data["result"]);
                        this.props.navigation.navigate('ViewReBarcode'
                            , {
                                item: res.data["result"], isEdit: true,
                                onGoBack: () => this.child.getAllBarcodes(),
                            });

                    }
                    // }

                    console.log(res.data)
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
                "barcodeTextileId": this.state.barcodeTextileId,
            }
        }).then((res) => {
            if (res.data && res.data.isSuccess === "true") {
                console.log(res.data.result);
                this.setState({ inventoryDelete: false, modalVisible: false, barcodeTextileId: '' });
                this.setState({ isAddBarcode: false });
            } else {
                this.setState({ inventoryDelete: false, modalVisible: false, barcodeTextileId: '' });
                console.log(res.data.message);
            }
        }
        );
    };



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
                <View style={headerTitleContainer} >
                    <View style={headerTitleSubContainer}>
                        <TouchableOpacity style={menuButton} onPress={() => this.handleBackButtonClick()}>
                            <Image source={require('../assets/images/menu.png')} />
                        </TouchableOpacity>
                        <Text style={headerTitle}>
                            {I18n.t("Inventory Portal")}
                        </Text>
                    </View>
                    <View style={headerTitleSubContainer2}>
                        {this.state.flagBarcode && (
                            <TouchableOpacity style={headerNavigationBtn} onPress={() => this.navigateToAddBarcode()}>
                                <Text style={headerNavigationBtnText}>{I18n.t("Add BarCode")}</Text>
                            </TouchableOpacity>
                        )}

                        {this.state.flagProductCombo && (
                            <TouchableOpacity style={headerNavigationBtn} onPress={() => this.navigateToAddProductCombo()}>
                                <Text style={headerNavigationBtnText}>Product Combo</Text>
                            </TouchableOpacity>
                        )}

                        <View>
                            {!this.state.filterActive &&
                                <TouchableOpacity
                                    style={filterBtn}
                                    onPress={() => this.filterAction()} >
                                    <Image style={{ alignSelf: 'center', top: RH(5) }} source={require('../assets/images/promofilter.png')} />
                                </TouchableOpacity>
                            }
                            {this.state.filterActive &&
                                <TouchableOpacity
                                    style={filterBtn}
                                    onPress={() => this.clearFilterAction()} >
                                    <Image style={{ alignSelf: 'center', top: RH(5) }} source={require('../assets/images/clearFilterSearch.png')} />
                                </TouchableOpacity>
                            }
                        </View>
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
                            keyExtractor={(item, i) => i.toString()}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={[pageNavigationBtn, {
                                    backgroundColor: item.bool ? '#ED1C24' : '#FFFFFF',
                                    borderColor: item.bool ? '#ED1C24' : '#858585',
                                }]} onPress={() => this.topbarAction1(item, index)} >

                                    <Text style={[pageNavigationBtnText, { color: item.bool ? "#FFFFFF" : '#858585', }]}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            ListFooterComponent={<View style={{ width: 15 }}></View>}
                        />

                        {this.state.flagBarcode && (
                            <Barcode
                                flagFilterOpen={this.state.flagFilterBarcodeOpen}
                                modalVisible={this.state.modalVisible}
                                modelCancelCallback={() => { this.modelCancel() }}
                                filterActive={this.state.filterActive}
                                childParams={() => { this.filterBarcodes() }}
                                ref={instance => { this.child = instance }}
                            />
                        )}

                        {this.state.flagRebarCode && (
                            <View>
                                <FlatList
                                    data={this.state.reBarcodesData}
                                    style={{ marginTop: 20 }}
                                    scrollEnabled={true}
                                    ListEmptyComponent={<Text style={{ color: '#cc241d', textAlign: "center", fontFamily: "bold", fontSize: Device.isTablet ? 21 : RF(17), marginTop: deviceheight / 3 }}>&#9888; Records Not Found</Text>}
                                    renderItem={({ item, index }) => (

                                        <View
                                            style={flatListMainContainer}
                                        >
                                            <View style={flatlistSubContainer}>
                                                <View style={textContainer}>
                                                    <Text style={highText} >{I18n.t("PARENT BARCODE")}: {item.toBeBarcodeId}</Text>
                                                </View>
                                                <View style={textContainer}>
                                                    <Text style={textStyleMedium} selectable={true}>{I18n.t("CHILD BARCODE")}: {"\n"}{item.currentBarcodeId}</Text>
                                                    <Text style={textStyleLight}>{I18n.t("EMPLOYEE ID")}: {"\n"}{item.createdBy}</Text>
                                                </View>
                                                <View style={textContainer}>
                                                    <Text style={textStyleLight}>{I18n.t("DATE")}: {"\n"}{item.fromDate}</Text>
                                                    <View style={buttonContainer}>
                                                        <TouchableOpacity style={buttonStyle1} onPress={() => this.print(item, index)}>
                                                            <Image style={buttonImageStyle} source={require('../assets/images/print.png')} />
                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={buttonStyle} onPress={() => this.seeDetails(item, index)}>
                                                            <Image style={buttonImageStyle} source={require('../assets/images/eye.png')} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>
                        )}
                        {this.state.flagProductCombo && (
                            <ProductCombo />
                        )}
                    </View>
                </ScrollView>



                {this.state.flagFilterReBarcodeOpen && (
                    <View>
                        <Modal style={{ margin: 0 }} isVisible={this.state.modalVisible}>
                            <View style={filterMainContainer} >
                                <View>
                                    <View style={filterSubContainer}>
                                        <View>
                                            <Text style={filterHeading} > {I18n.t("Filter By")} </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={filterCloseImage} onPress={() => this.modelCancel()}>
                                                <Image style={{ margin: 5 }} source={require('../assets/images/modelcancel.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text style={styles.spaceText}></Text>
                                </View>
                                <KeyboardAwareScrollView enableOnAndroid={true} >

                                    <TouchableOpacity
                                        style={dateSelector}
                                        testID="openModal"
                                        onPress={() => this.datepickerClicked()}
                                    >
                                        <Text
                                            style={dateText}
                                        >{this.state.doneButtonClicked == false ? 'Start Date' : this.state.startDate}</Text>
                                        <Image style={styles.calenderpng} source={require('../assets/images/calender.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={dateSelector}
                                        testID="openModal"
                                        onPress={() => this.enddatepickerClicked()}
                                    >
                                        <Text
                                            style={dateText}
                                        >{this.state.enddoneButtonClicked == false ? 'End Date' : this.state.endDate}</Text>
                                        <Image style={styles.calenderpng} source={require('../assets/images/calender.png')} />
                                    </TouchableOpacity>
                                    {this.state.datepickerOpen && this.state.flagRebarCode && (
                                        <View style={styles.dateTopView}>
                                            <View style={styles.dateTop2}>

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
                                            </View>
                                            <DatePicker style={styles.date}
                                                date={this.state.date}
                                                mode={'date'}
                                                onDateChange={(date) => this.setState({ date })}
                                            />
                                        </View>
                                    )}
                                    {this.state.datepickerendOpen && this.state.flagRebarCode && (
                                        <View style={styles.dateTopView}>
                                            <View style={styles.dateTop2}>
                                                <TouchableOpacity
                                                    style={datePickerButton1} onPress={() => this.datepickerCancelClicked()}
                                                >
                                                    <Text style={datePickerBtnText}  > Cancel </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={datePickerButton2} onPress={() => this.datepickerendDoneClicked()}
                                                >
                                                    <Text style={datePickerBtnText}  > Done </Text>

                                                </TouchableOpacity>
                                            </View>
                                            <DatePicker style={styles.date}
                                                date={this.state.enddate}
                                                mode={'date'}
                                                onDateChange={(enddate) => this.setState({ enddate })}
                                            />
                                        </View>
                                    )}
                                    <TextInput
                                        style={inputField}
                                        underlineColorAndroid="transparent"
                                        placeholder={I18n.t("RE-BARCODE ID")}
                                        placeholderTextColor="#6F6F6F"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.barCodeId}
                                        onChangeText={this.handlebarCodeId}
                                    />
                                    <View>
                                        <TouchableOpacity style={submitBtn}
                                            onPress={() => this.applyReBarcodeFilter()}>
                                            <Text style={submitBtnText} >{I18n.t("APPLY")}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={cancelBtn}
                                            onPress={() => this.modelCancel()}>
                                            <Text style={cancelBtnText}>{I18n.t("CANCEL")}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </KeyboardAwareScrollView>
                            </View>
                        </Modal>
                    </View>
                )}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    spaceText: {
        height: Device.isTablet ? 2 : 1,
        width: deviceWidth,
        backgroundColor: 'lightgray',
    },
    date: {
        width: deviceWidth,
        height: RH(200),
        marginTop: RH(50),
    },
    calenderpng: {
        position: 'absolute',
        top: RH(10),
        right: 0,
    },
    dateTopView: {
        height: RW(280),
        width: deviceWidth,
        backgroundColor: '#ffffff'
    },
    dateTop2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: Device.isTablet ? 15 : RH(10),
        marginLeft: Device.isTablet ? 20 : RW(10),
        marginRight: Device.isTablet ? 20 : RW(10)
    },
    mainContainer: {
        flex: 1,
    },

});
