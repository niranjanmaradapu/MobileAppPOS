import React, { Component } from 'react'
import { View, Image, Text, Button, FlatList, TouchableOpacity, Switch, TextInput, StyleSheet, Dimensions, ActivityIndicator, scrollview, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import Loader from "../../loader";
import DatePicker from 'react-native-date-picker'
import InventoryService from '../../services/InventoryService';
import Device from 'react-native-device-detection'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var deviceWidth = Dimensions.get("window").width;

export default class Inventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doneButtonClicked: false,
            enddoneButtonClicked: false,
            barCodeId: "",
            startDate: "",
            endDate: "",
            flagone: true,
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
            barcodesData: [1, 2],
            reBarcodesData: [1, 2],
            deleteBarcodeId: "",
            deleteBarcoeIndex: "",
            barcodeDelete: false,
            storeId: 1,
            storeName: "",
        }
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Home')
    }

    filterAction() {

    }


    componentDidMount() {
        var domainStringId = ""
        var storeStringId = ""
        var storeName = ""
        AsyncStorage.getItem("domainDataId").then((value) => {
            domainStringId = value
            this.setState({ domainId: parseInt(domainStringId) })
            console.log("domain data id" + this.state.domainId)


        }).catch(() => {
            console.log('there is error getting domainDataId')
        })

        AsyncStorage.getItem("storeId").then((value) => {
            storeStringId = value
            this.setState({ storeId: parseInt(storeStringId) })
            console.log(this.state.storeId)
            this.getAllBarcodes()

        }).catch(() => {
            console.log('there is error getting storeId')
        })

        AsyncStorage.getItem("storeName").then((value) => {
            storeName = value
            this.setState({ storeName: storeName })
        }).catch(() => {
            console.log('there is error getting storeId')
        })
    }

    getAllBarcodes() {
        this.setState({ barcodesData: [] })
        const params = {
            "fromDate": this.state.startDate,
            "toDate": this.state.endDate,
            "barcode": this.state.barCodeId,
            "storeId": this.state.storeId
        }
        console.log("sdsad" + this.state.endDate)
        this.setState({ loading: true })
        axios.post(InventoryService.getTextileBarcodes(), params).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                if (res.data["result"]) {
                    this.setState({ loading: false })
                    for (var i = 0; i < res.data["result"].length; i++) {
                        this.state.barcodesData.push(res.data["result"][i])
                        // console.log(res.data["result"][i].productTextile.empId)

                    }
                }

                this.setState({ barcodesData: this.state.barcodesData })

            }
        })
    }


    getbarcodeTexttileAdjustments() {
        this.setState({ reBarcodesData: [] })
        const params = {
            "fromDate": this.state.startDate,
            "toDate": this.state.endDate,
            "currentBarcodeId": this.state.barCodeId,
            "storeId": this.state.storeId
        }
        console.log("cssafsfssdsfdsfsdsadasd" + this.state.storeId)
        this.setState({ loading: true })
        axios.post(InventoryService.getbarcodeTexttileAdjustments(), params).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                console.log(res.data["result"])
                if (res.data["result"]) {
                    this.setState({ loading: false })
                    for (var i = 0; i < res.data["result"].length; i++) {
                        this.state.reBarcodesData.push(res.data["result"][i])


                    }
                }

                this.setState({ reBarcodesData: this.state.reBarcodesData })

            }
        })

    }




    topbarAction1() {
        this.setState({ startDate: "" });
        this.setState({ endDate: "" });
        this.setState({ barCodeId: "" });
        this.setState({ doneButtonClicked: false });
        this.setState({ enddoneButtonClicked: false });
        this.setState({ flagone: true })
        this.setState({ flagtwo: false })
        this.getAllBarcodes()
    }

    topbarAction2() {
        this.setState({ startDate: "" });
        this.setState({ endDate: "" });
        this.setState({ barCodeId: "" });
        this.setState({ doneButtonClicked: false });
        this.setState({ enddoneButtonClicked: false });
        this.setState({ flagone: false })
        this.setState({ flagtwo: true })
        this.getbarcodeTexttileAdjustments()
    }

    navigateToAddBarcode() {
        this.props.navigation.navigate('AddBarcode', {
            onGoback: () => this.refteshBarcodes(),
        });
    }

    refteshBarcodes() {

    }



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
        this.setState({ inventoryDelete: false });
        this.setState({ flagFilterBarcodeOpen: false });
        this.setState({ flagFilterReBarcodeOpen: false });
        this.setState({ modalVisible: false });
    }

    datepickerClicked() {
        this.setState({ datepickerOpen: true })
    }

    enddatepickerClicked() {
        this.setState({ datepickerendOpen: true })
    }

    datepickerDoneClicked() {
        if (parseInt(this.state.date.getDate()) < 10) {
            this.setState({ startDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-0" + this.state.date.getDate() })
        }
        else {
            this.setState({ startDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate() })
        }

        this.setState({ doneButtonClicked: true })
        //this.setState({date:this.state.})
        this.setState({ datepickerOpen: false })
        this.setState({ datepickerendOpen: false })
    }

    datepickerendDoneClicked() {
        if (parseInt(this.state.enddate.getDate()) < 10) {
            this.setState({ endDate: this.state.enddate.getFullYear() + "-" + (this.state.enddate.getMonth() + 1) + "-0" + this.state.enddate.getDate() })
        }
        else {
            this.setState({ endDate: this.state.enddate.getFullYear() + "-" + (this.state.enddate.getMonth() + 1) + "-" + this.state.enddate.getDate() })
        }
        this.setState({ enddoneButtonClicked: true })
        this.setState({ datepickerOpen: false })
        this.setState({ datepickerendOpen: false })
    }


    datepickerCancelClicked() {
        this.setState({ date: new Date() })
        this.setState({ enddate: new Date() })
        this.setState({ datepickerOpen: false })
        this.setState({ datepickerendOpen: false })
    }

    handlebarCodeId() {
        this.setState({ barCodeId: value })
    }

    applyBarcodeFilter() {
        this.getAllBarcodes()
        this.setState({ modalVisible: false });
    }
    applyReBarcodeFilter() {
        this.getbarcodeTexttileAdjustments()
        this.setState({ modalVisible: false });
    }

    handlebarcodedeleteaction(item, index) {
        this.setState({ inventoryDelete: true });
        this.setState({ modalVisible: true });

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

    }


    seeDetails = (item, index) => {
        this.setState({ barcodesData: [] })
        const params = {
            "fromDate": "",
            "toDate": "",
            "barcode": item.currentBarcodeId,
            "storeId": this.state.storeId
        }
        console.log("cssafsfssdsfdsfsdsadasd" + this.state.storeId)
        // this.setState({ loading: true })
        axios.post(InventoryService.getTextileBarcodes(), params).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                if (res.data["result"]) {
                    //  this.setState({ loading: false })
                    for (var i = 0; i < res.data["result"].length; i++) {
                        this.state.barcodesData.push(res.data["result"][i])
                        // console.log(res.data["result"][i].productTextile.empId)
                        this.props.navigation.navigate('ViewReBarcode'
                            , {
                                item: res.data["result"][i], isEdit: true,
                                onGoBack: () => this.updateBarcodes(),
                            });

                    }
                }

                this.setState({ barcodesData: this.state.barcodesData })

            }
        })


    }

    deleteInventory = (item, index) => {
        axios.delete(InventoryService.deleteTextileBarcode(), {
            params: {
                //barcodeId=1811759398
                "barcodeTextileId": item.barcodeTextileId,
            }
        }).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                const list = this.state.barcodesData;
                list.splice(index, 1);
                this.setState({ barcodesData: list });
                this.setState({ inventoryDelete: false });
                this.setState({ modalVisible: false });
            }
            else {
                alert('Issue in delete barcode and having' + res.data["error"]);
            }
        }
        );
    }

    updateBarcodes() {
        this.getAllBarcodes()
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
                        <Image source={require('../../assets/images/backButton.png')} />
                    </TouchableOpacity>
                    <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}>
                        Inventory Portal
                    </Text>
                    {this.state.flagone && (
                        <TouchableOpacity style={Device.isTablet ? styles.addBarcodeButton_tablet : styles.addBarcodeButton_mobile} onPress={() => this.navigateToAddBarcode()}>
                            <Text style={Device.isTablet ? styles.addBarcodeButtonText_tablet : styles.addBarcodeButtonText_mobile}>Add BarCode</Text>
                        </TouchableOpacity>
                    )}
                    {/* <TouchableOpacity
            style={{ position: 'absolute', right: 20, top: 47, backgroundColor: '#ED1C24', borderRadius: 5, width: 105, height: 32, }}
            onPress={() => this.navigateToScanCode()} >
            <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ffffff', marginLeft: 10, marginTop: 8, alignSelf: 'center' }}> {('NEW SALE SCAN')} </Text>
          </TouchableOpacity> */}
                    <TouchableOpacity
                        style={Device.isTablet ? styles.filterButton_tablet : styles.filterButton_mobile}
                        onPress={() => this.filterAction()} >
                        <Image style={{ alignSelf: 'center', top: 5 }} source={require('../../assets/images/promofilter.png')} />
                    </TouchableOpacity>
                </View>
                <View style={Device.isTablet ? styles.modalContainer_tablet : styles.modalContainer_mobile}>
                    <TouchableOpacity style={[this.state.flagone ? styles.modalActive : styles.modalInActive, Device.isTablet ? styles.modalButton_tablet : styles.modalButton_mobile, styles.modalButton1]}
                        onPress={() => this.topbarAction1()} >
                        <View>
                            <Text style={[Device.isTablet ? styles.modalButtonText_tablet : styles.modalButtonText_mobile, this.state.flagone ? styles.modalActiveText : styles.modalInActiveText]}>
                                Barcode List
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[this.state.flagtwo ? styles.modalActive : styles.modalInActive, Device.isTablet ? styles.modalButton_tablet : styles.modalButton_mobile, styles.modalButton2]}
                        onPress={() => this.topbarAction2()} >
                        <View>
                            <Text style={[Device.isTablet ? styles.modalButtonText_tablet : styles.modalButtonText_mobile, this.state.flagtwo ? styles.modalActiveText : styles.modalInActiveText]} >
                                Re-Barcode List
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>


                {this.state.flagone && (
                    <FlatList
                        data={this.state.barcodesData}
                        style={{ marginTop: 20, }}
                        scrollEnabled={true}
                        renderItem={({ item, index }) => (
                            <View
                                style={Device.isTablet ? styles.barcodesFlatlistContainer_tablet : styles.barcodesFlatlistContainer_mobile}
                            >
                                <View style={Device.isTablet ? styles.barcodesFlatlistSubContainer_tablet : styles.barcodesFlatlistSubContainer_mobile}>
                                    <Text style={Device.isTablet ? flats.mainText_tablet : flats.mainText_mobile} >S.NO: {index + 1} </Text>
                                    <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>BARCODE: {"\n"}{item.barcode}</Text>
                                    <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}> {"LIST PRICE:" + item.barcode} </Text>
                                    <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>STORE: {this.state.storeName}</Text>
                                    <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>QTY:  {11}</Text>
                                    <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>VALUE: {1000}</Text>

                                    {this.state.inventoryDelete && (
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
                                                    }}> Delete Inventory </Text>

                                                    <TouchableOpacity style={{
                                                        position: 'absolute',
                                                        right: 20,
                                                        top: 7,
                                                        width: 50, height: 50,
                                                    }} onPress={() => this.modelCancel()}>
                                                        <Image style={{ color: '#ED1C24', fontFamily: 'regular', fontSize: 12, position: 'absolute', top: 10, right: 0, }} source={require('../../assets/images/modelcancel.png')} />
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
                                                    }}> Are you sure want to delete Barcode?  </Text>
                                                    <TouchableOpacity
                                                        style={{
                                                            width: deviceWidth - 40,
                                                            marginLeft: 20,
                                                            marginRight: 20,
                                                            marginTop: 60,
                                                            height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                                                        }} onPress={() => this.deleteInventory(item, index)}
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
                                        </View>)}
                                    <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.handleeditbarcode(item, index)}>
                                        <Image style={{ alignSelf: 'center', top: 5 }} source={require('../../assets/images/edit.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handlebarcodedeleteaction(item, index)}>
                                        <Image style={{ alignSelf: 'center', top: 5 }} source={require('../../assets/images/delete.png')} />
                                    </TouchableOpacity>

                                    {/* <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>{ }</Text> */}



                                    {this.state.barcodeDelete && (
                                        <View>
                                            <Modal isVisible={this.state.modalVisible}>

                                                <View style={Device.isTablet ? flats.deleteBarcodeContainer_tablet : flats.deleteBarcodeContainer_mobile}>

                                                    <Text style={Device.isTablet ? flats.deleteBarcodeHeading_tablet : flats.deleteBarcodeHeading_mobile}> Delete Barcode Id </Text>
                                                    <TouchableOpacity style={Device.isTablet ? styles.filterCloseButton_tablet : styles.filterCloseButton_mobile} onPress={() => this.modelCancel()}>
                                                        <Image style={Device.isTablet ? styles.filterCloseImage_tablet : styles.filterCloseImage_mobile} source={require('../../assets/images/modelcancel.png')} />
                                                    </TouchableOpacity>

                                                    <Text style={{ height: 1, width: deviceWidth, backgroundColor: 'lightgray', marginTop: 50, }}>
                                                    </Text>
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
                            </View>
                        )}
                    />
                )}
                {this.state.flagtwo && (
                    <FlatList
                        data={this.state.reBarcodesData}
                        style={{ marginTop: 20, }}
                        scrollEnabled={true}
                        keyExtractor={item => item}
                        renderItem={({ item, index }) => (
                            <View
                                style={Device.isTablet ? styles.barcodesFlatlistContainer_tablet : styles.barcodesFlatlistContainer_mobile}
                            >
                                <View style={Device.isTablet ? styles.barcodesFlatlistSubContainer_tablet : styles.barcodesFlatlistSubContainer_mobile}>
                                    <Text style={Device.isTablet ? flats.mainText_tablet : flats.mainText_mobile} >PARENT BARCODE: {"\n"}{item.toBeBarcodeId}</Text>
                                    <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>CHILD BARCODE: {"\n"}{item.currentBarcodeId}</Text>
                                    {/* <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonTextsubrebar_mobile}>{ }</Text> */}
                                    <Text style={Device.isTablet ? flats.commonTextRebar_tablet : flats.commonTextRebar_mobile}>EMPLOYEE ID: {"\n"}{item.createdBy}</Text>
                                    <Text style={Device.isTablet ? flats.commonTextRebar2_tablet : flats.commonTextRebar2_mobile}>DATE: {"\n"}{item.fromDate}</Text>
                                </View>
                                <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.print(item, index)}>
                                    <Image style={{ alignSelf: 'center', top: 5 }} source={require('../../assets/images/print.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.seeDetails(item, index)}>
                                    <Image style={{ alignSelf: 'center', top: 5 }} source={require('../../assets/images/eye.png')} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                )}
                {this.state.flagFilterBarcodeOpen && (
                    <View>
                        <Modal isVisible={this.state.modalVisible}>
                            <View style={Device.isTablet ? styles.filterBarcodeContainer_tablet : styles.filterBarcodeContainer_mobile} >
                                <KeyboardAwareScrollView enableOnAndroid={true} >
                                    <Text style={Device.isTablet ? styles.filterByTitle_tablet : styles.filterByTitle_mobile} > Filter by </Text>
                                    <TouchableOpacity style={Device.isTablet ? styles.filterCloseButton_tablet : styles.filterCloseButton_mobile} onPress={() => this.modelCancel()}>
                                        <Image style={Device.isTablet ? styles.filterCloseImage_tablet : styles.modalCancelImage_mobile} source={require('../../assets/images/modelcancel.png')} />
                                    </TouchableOpacity>
                                    <Text style={Device.isTablet ? styles.filterByTitleDecoration_tablet : styles.filterByTitleDecoration_mobile}>
                                    </Text>
                                    <TouchableOpacity
                                        style={Device.isTablet ? styles.filterDateButton_tablet : styles.filterDateButton_mobile}
                                        testID="openModal"
                                        onPress={() => this.datepickerClicked()}
                                    >
                                        <Text
                                            style={Device.isTablet ? styles.filterDateButtonText_tablet : styles.filterDateButtonText_mobile}
                                        >{this.state.doneButtonClicked == false ? 'Start Date' : this.state.startDate}</Text>
                                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../../assets/images/calender.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={Device.isTablet ? styles.filterDateButton_tablet : styles.filterDateButton_mobile}
                                        testID="openModal"
                                        onPress={() => this.enddatepickerClicked()}
                                    >
                                        <Text
                                            style={Device.isTablet ? styles.filterDateButtonText_tablet : styles.filterDateButtonText_mobile}
                                        >{this.state.enddoneButtonClicked == false ? 'End Date' : this.state.endDate}</Text>
                                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../../assets/images/calender.png')} />
                                    </TouchableOpacity>
                                    {this.state.datepickerOpen && this.state.flagone && (
                                        <View style={{ height: 280, width: deviceWidth, backgroundColor: 'ffffff' }}>
                                            <TouchableOpacity
                                                style={Device.isTablet ? styles.datePickerButton_tablet : styles.datePickerButton_mobile} onPress={() => this.datepickerCancelClicked()}
                                            >
                                                <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Cancel </Text>

                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={Device.isTablet ? styles.datePickerEndButton_tablet : styles.datePickerEndButton_mobile} onPress={() => this.datepickerDoneClicked()}
                                            >
                                                <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Done </Text>

                                            </TouchableOpacity>
                                            <DatePicker style={{ width: deviceWidth, height: 200, marginTop: 50, }}
                                                date={this.state.date}
                                                mode={'date'}
                                                onDateChange={(date) => this.setState({ date })}
                                            />
                                        </View>
                                    )}
                                    {this.state.datepickerendOpen && this.state.flagone && (
                                        <View style={{ height: 280, width: deviceWidth, backgroundColor: 'ffffff' }}>
                                            <TouchableOpacity
                                                style={Device.isTablet ? styles.datePickerButton_tablet : styles.datePickerButton_mobile} onPress={() => this.datepickerCancelClicked()}
                                            >
                                                <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Cancel </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={Device.isTablet ? styles.datePickerEndButton_tablet : styles.datePickerEndButton_mobile} onPress={() => this.datepickerendDoneClicked()}
                                            >
                                                <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Done </Text>

                                            </TouchableOpacity>
                                            <DatePicker style={{ width: deviceWidth, height: 200, marginTop: 50, }}
                                                date={this.state.enddate}
                                                mode={'date'}
                                                onDateChange={(enddate) => this.setState({ enddate })}
                                            />
                                        </View>
                                    )}
                                    <TextInput
                                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                        underlineColorAndroid="transparent"
                                        placeholder="BARCODE ID"
                                        placeholderTextColor="#6F6F6F"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.barCodeId}
                                        onChangeText={this.handlebarCodeId}
                                    />
                                    <TouchableOpacity style={Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile}
                                        onPress={() => this.applyBarcodeFilter()}>
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
                {this.state.flagFilterReBarcodeOpen && (
                    <View>
                        <Modal isVisible={this.state.modalVisible}>
                            <View style={Device.isTablet ? styles.filterBarcodeContainer_tablet : styles.filterBarcodeContainer_mobile} >
                                <KeyboardAwareScrollView enableOnAndroid={true} >
                                    <Text style={Device.isTablet ? styles.filterByTitle_tablet : styles.filterByTitle_mobile} > Filter by </Text>
                                    <TouchableOpacity style={Device.isTablet ? styles.filterCloseButton_tablet : styles.filterCloseButton_mobile} onPress={() => this.modelCancel()}>
                                        <Image style={Device.isTablet ? styles.filterCloseImage_tablet : styles.modalCancelImage_mobile} source={require('../../assets/images/modelcancel.png')} />
                                    </TouchableOpacity>
                                    <Text style={Device.isTablet ? styles.filterByTitleDecoration_tablet : styles.filterByTitleDecoration_mobile}>
                                    </Text>
                                    <TouchableOpacity
                                        style={Device.isTablet ? styles.filterDateButton_tablet : styles.filterDateButton_mobile}
                                        testID="openModal"
                                        onPress={() => this.datepickerClicked()}
                                    >
                                        <Text
                                            style={Device.isTablet ? styles.filterDateButtonText_tablet : styles.filterDateButtonText_mobile}
                                        >{this.state.doneButtonClicked == false ? 'Start Date' : this.state.startDate}</Text>
                                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../../assets/images/calender.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={Device.isTablet ? styles.filterDateButton_tablet : styles.filterDateButton_mobile}
                                        testID="openModal"
                                        onPress={() => this.enddatepickerClicked()}
                                    >
                                        <Text
                                            style={Device.isTablet ? styles.filterDateButtonText_tablet : styles.filterDateButtonText_mobile}
                                        >{this.state.enddoneButtonClicked == false ? 'End Date' : this.state.endDate}</Text>
                                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../../assets/images/calender.png')} />
                                    </TouchableOpacity>
                                    {this.state.datepickerOpen && this.state.flagtwo && (
                                        <View style={{ height: 280, width: deviceWidth, backgroundColor: 'ffffff' }}>
                                            <TouchableOpacity
                                                style={Device.isTablet ? styles.datePickerButton_tablet : styles.datePickerButton_mobile} onPress={() => this.datepickerCancelClicked()}
                                            >
                                                <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Cancel </Text>

                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={Device.isTablet ? styles.datePickerEndButton_tablet : styles.datePickerEndButton_mobile} onPress={() => this.datepickerDoneClicked()}
                                            >
                                                <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Done </Text>

                                            </TouchableOpacity>
                                            <DatePicker style={{ width: deviceWidth, height: 200, marginTop: 50, }}
                                                date={this.state.date}
                                                mode={'date'}
                                                onDateChange={(date) => this.setState({ date })}
                                            />
                                        </View>
                                    )}
                                    {this.state.datepickerendOpen && this.state.flagtwo && (
                                        <View style={{ height: 280, width: deviceWidth, backgroundColor: 'ffffff' }}>
                                            <TouchableOpacity
                                                style={Device.isTablet ? styles.datePickerButton_tablet : styles.datePickerButton_mobile} onPress={() => this.datepickerCancelClicked()}
                                            >
                                                <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Cancel </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={Device.isTablet ? styles.datePickerEndButton_tablet : styles.datePickerEndButton_mobile} onPress={() => this.datepickerendDoneClicked()}
                                            >
                                                <Text style={Device.isTablet ? styles.datePickerButtonText_tablet : styles.datePickerButtonText_mobile}  > Done </Text>

                                            </TouchableOpacity>
                                            <DatePicker style={{ width: deviceWidth, height: 200, marginTop: 50, }}
                                                date={this.state.enddate}
                                                mode={'date'}
                                                onDateChange={(enddate) => this.setState({ enddate })}
                                            />
                                        </View>
                                    )}
                                    <TextInput
                                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                        underlineColorAndroid="transparent"
                                        placeholder="RE-BARCODE ID"
                                        placeholderTextColor="#6F6F6F"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.barCodeId}
                                        onChangeText={this.handlebarCodeId}
                                    />
                                    <TouchableOpacity style={Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile}
                                        onPress={() => this.applyReBarcodeFilter()}>
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
            </View>
        )
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
        right: -20,
        top: 15,
        width: 50, height: 50,
    },
    filterCloseImage_mobile: {
        color: '#ED1C24',
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
