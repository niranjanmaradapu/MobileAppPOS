import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import ReportsService from '../services/ReportsService';
var deviceWidth = Dimensions.get("window").width;
var deviceheight = Dimensions.get("window").height;

export default class NewSaleReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: true,
            flagDeleteNewSale: false,
            date: new Date(),
            enddate: new Date(),
            startDate: "",
            endDate: "",
            fromDate: "",
            toDate: "",

            positions: [],
            billPosition: null,
            invoiceNumber: null,
            mobile: null,
            empId: null,
            sbList: [1, 2],
            sbDetailsList: [1, 2],
            isView: false,
            domainId: 0,
            storeId: 0,
            flagViewDetail: false,
            memono: "",
            barocde: "",
            section: "",
            empId: "",
            hsncode: "",
            qty: "",
            mrp: "",
            disc: "",
            taxableaount: "",
            cgst: "",
            sgst: "",
            igst: "",
            gst: "",
            netamount: "",
            customername: "",
            mobile: "",
            createdate: "",
        };
    }

    componentDidMount() {
        if (global.domainName === "Textile") {
            this.setState({ domainId: 1 });
        }
        else if (global.domainName === "Retail") {
            this.setState({ domainId: 2 });
        }
        else if (global.domainName === "Electrical & Electronics") {
            this.setState({ domainId: 3 });
        }

        AsyncStorage.getItem("storeId").then((value) => {
            storeStringId = value;
            this.setState({ storeId: parseInt(storeStringId) });
            console.log(this.state.storeId);


        }).catch(() => {
            console.log('there is error getting storeId');
        });


    }


    getSaleBills() {
        if (this.state.startDate === "") {
            this.state.startDate = null;
        }
        if (this.state.endDate === "") {
            this.state.endDate = null;
        }
        if (this.state.invoiceNumber === "") {
            this.state.invoiceNumber = null;
        }
        if (this.state.mobile === "") {
            this.state.mobile = null;
        }
        if (this.state.billPosition === "") {
            this.state.billPosition = null;
        }

        const obj = {
            "dateFrom": this.state.startDate,
            "dateTo": this.state.endDate,
            invoiceNumber: this.state.invoiceNumber,
            custMobileNumber: this.state.mobile,
            billStatus: this.state.billPosition,
            storeId: this.state.storeId,
            domainId: this.state.domainId
        };
        console.log('params are' + JSON.stringify(obj));
        axios.post(ReportsService.newSaleReports(), obj).then((res) => {
            console.log(res.data);
            if (res.data && res.data["isSuccess"] === "true") {
                this.props.childParamNewsales(res.data.result.newSaleVo);
                this.props.modelCancelCallback();
            }
            else {
                alert(res.data.message);
            }
        }
        ).catch(() => {
            alert('No Results Found');
            this.props.modelCancelCallback();
        });
    }

    handledeleteNewSale() {
        this.setState({ flagDeleteNewSale: true, modalVisible: true, flagViewDetail: false });
    }

    handleviewNewSale(item, index) {
        console.log(item);
        this.setState({ memono: item.invoiceNumber, barocde: item.lineItemsReVo[0].barCode, hsncode: item.lineItemsReVo[0].hsnCode, empId: item.lineItemsReVo[0].empId, qty: item.totalqQty, mrp: item.totalNetAmount, taxableaount: item.totaltaxableAmount, cgst: item.totalCgst, sgst: item.totalSgst, igst: item.totalIgst, customername: item.customerName, mobile: item.mobileNumber, createdate: item.createdDate });
        this.setState({ flagViewDetail: true, modalVisible: true, flagDeleteNewSale: false });
    }

    estimationModelCancel() {
        this.setState({ modalVisible: false });
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
        this.setState({ date: new Date(), enddate: new Date(), datepickerOpen: false, datepickerendOpen: false });
    }

    handleBillPositions = (value) => {
        this.setState({ billPosition: value });
    };

    handleInvoiceNumber = (value) => {
        this.setState({ invoiceNumber: value });
    };

    handleMobile = (value) => {
        this.setState({ mobile: value });
    };

    handleEmpId = (value) => {
        this.setState({ empId: value });
    };

    modelCancel() {
        this.props.modelCancelCallback();
    }



    render() {
        return (
            <View>
                <FlatList
                    data={this.props.newSale}
                    style={{ marginTop: 20 }}
                    scrollEnabled={true}
                    renderItem={({ item, index }) => (
                        <View style={Device.isTablet ? flats.flatlistContainer_tablet : flats.flatlistContainer_mobile} >
                            <View style={Device.isTablet ? flats.flatlistSubContainer_tablet : flats.flatlistSubContainer_mobile}>
                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextAccent_tablet : flats.flatlistTextAccent_mobile} >S.NO: {index + 1} </Text>
                                    <Text style={Device.isTablet ? flats.flatlistText_tablet : flats.flatlistText_mobile}>INVOICE NUMBER: {"\n"} {item.invoiceNumber}</Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>EMP ID: {item.empId} </Text>
                                </View>
                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile} >INVOICE DATE: {"\n"} {item.createdDate} </Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>BILL POSITION: {item.status}</Text>
                                </View>
                                {/* <View style={flats.text}>
                                    <View style={flats.buttons}>
                                        <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handledeleteNewSale(item, index)}>
                                            <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/delete.png')} />

                                        </TouchableOpacity>
                                    </View>
                                </View> */}

                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile} >NET AMMOUNT:{"\n"} ₹ {item.totalNetAmount} </Text>
                                    <View style={flats.buttons}>

                                        <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.handledeleteNewSale(item, index)}>
                                            <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/delete.png')} />

                                        </TouchableOpacity>

                                        <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handleviewNewSale(item, index)}>
                                            <Image style={{ alignSelf: 'center', top: 0 }} source={require('../assets/images/eye.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
                {this.state.flagDeleteNewSale && (
                    <View>
                        <Modal isVisible={this.state.modalVisible}>

                            <View style={styles.deleteMainContainer}>

                                <Text style={Device.isTablet ? styles.filterByTitle_tablet : styles.filterByTitle_mobile}> Delete New Sale Report </Text>

                                <TouchableOpacity style={Device.isTablet ? styles.filterCloseButton_tablet : styles.filterCloseButton_mobile} onPress={() => this.estimationModelCancel()}>
                                    <Image style={styles.modelCloseImage} source={require('../assets/images/modelcancel.png')} />
                                </TouchableOpacity>
                                <Text style={Device.isTablet ? styles.filterByTitleDecoration_tablet : styles.filterByTitleDecoration_mobile}>
                                </Text>
                                <Text style={{
                                    position: 'absolute',
                                    top: 70,
                                    height: Device.isTablet ? 40 : 20,
                                    textAlign: 'center',
                                    fontFamily: 'regular',
                                    fontSize: Device.isTablet ? 23 : 18,
                                    marginBottom: Device.isTablet ? 25 : 0,
                                    color: '#353C40'
                                }}> Are you sure want to delete New Sale Report ?  </Text>
                                <TouchableOpacity
                                    style={[Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile, { marginTop: Device.isTablet ? 75 : 55 }]} onPress={() => this.deleteEstimationSlip(item, index)}
                                >
                                    <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile}  > DELETE </Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile} onPress={() => this.estimationModelCancel()}
                                >
                                    <Text style={Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile}  > CANCEL </Text>

                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                )}
                {this.props.flagFilterNewSale && (
                    <View>
                        <Modal isVisible={this.props.modalVisible}>
                            <View style={styles.filterMainContainer} >
                                <KeyboardAwareScrollView enableOnAndroid={true} >
                                    <Text style={Device.isTablet ? styles.filterByTitle_tablet : styles.filterByTitle_mobile} > Filter by </Text>
                                    <TouchableOpacity style={Device.isTablet ? styles.filterCloseButton_tablet : styles.filterCloseButton_mobile} onPress={() => this.modelCancel()}>
                                        <Image style={styles.modelCloseImage} source={require('../assets/images/modelcancel.png')} />
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
                                        >{this.state.startDate == "" ? 'START DATE' : this.state.startDate}</Text>
                                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/calender.png')} />
                                    </TouchableOpacity>
                                    {this.state.datepickerOpen && (
                                        <View style={{ height: 280, width: deviceWidth, backgroundColor: '#ffffff' }}>
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
                                    <TouchableOpacity
                                        style={Device.isTablet ? styles.filterDateButton_tablet : styles.filterDateButton_mobile}
                                        testID="openModal"
                                        onPress={() => this.enddatepickerClicked()}
                                    >
                                        <Text
                                            style={Device.isTablet ? styles.filterDateButtonText_tablet : styles.filterDateButtonText_mobile}
                                        >{this.state.endDate == "" ? 'END DATE' : this.state.endDate}</Text>
                                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/calender.png')} />
                                    </TouchableOpacity>
                                    {this.state.datepickerendOpen && (
                                        <View style={{ height: 280, width: deviceWidth, backgroundColor: '#ffffff' }}>
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
                                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                                        <RNPickerSelect
                                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                                            placeholder={{
                                                label: 'BILL POSITION'
                                            }}
                                            Icon={() => {
                                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                            }}
                                            items={[
                                                { label: 'New', value: 'New' },
                                                { label: 'Pending', value: 'Pending' },
                                                { label: 'Cancelled', value: 'Cancelled' },
                                                { label: 'success', value: 'success' },
                                            ]}
                                            onValueChange={this.handleBillPositions}
                                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                                            value={this.state.billPosition}
                                            useNativeAndroidPickerStyle={false}
                                        />
                                    </View>
                                    <TextInput
                                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                        underlineColorAndroid="transparent"
                                        placeholder="INVOICE NUMBER"
                                        placeholderTextColor="#6F6F6F"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.invoiceNumber}
                                        onChangeText={this.handleInvoiceNumber}
                                    />
                                    <TextInput
                                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                        underlineColorAndroid="transparent"
                                        placeholder="MOBILE NUMBER"
                                        placeholderTextColor="#6F6F6F"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.mobile}
                                        onChangeText={this.handleMobile}
                                    />
                                    <TextInput
                                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                                        underlineColorAndroid="transparent"
                                        placeholder="EMP ID"
                                        placeholderTextColor="#6F6F6F"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.empId}
                                        onChangeText={this.handleEmpId}
                                    />
                                    <TouchableOpacity style={Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile}
                                        onPress={() => this.getSaleBills()}>
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

                {this.state.flagViewDetail && (
                    <View>
                        <Modal isVisible={this.state.modalVisible}>

                            <View style={[Device.isTablet ? styles.filterMainContainer_tablet : styles.filterMainContainer_mobile, { height: Device.isTablet ? 670 : 640 }]}>

                                <Text style={Device.isTablet ? styles.filterByTitle_tablet : styles.filterByTitle_mobile}> Sale bill Details </Text>

                                <TouchableOpacity style={Device.isTablet ? styles.filterCloseButton_tablet : styles.filterCloseButton_mobile} onPress={() => this.estimationModelCancel()}>
                                    <Image style={Device.isTablet ? styles.filterCloseImage_tablet : styles.filterCloseImage_mobile} source={require('../assets/images/modelcancel.png')} />
                                </TouchableOpacity>
                                <Text style={Device.isTablet ? styles.filterByTitleDecoration_tablet : styles.filterByTitleDecoration_mobile}>
                                </Text>
                                <Text style={Device.isTablet ? styles.viewtext_tablet : styles.viewtext_mobile} >
                                    Memo No:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext_tablet : styles.viewsubtext_mobile} >
                                    {this.state.memono} </Text>
                                <Text style={Device.isTablet ? styles.viewtext1_tablet : styles.viewtext1_mobile} >
                                    BARCODE:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext1_tablet : styles.viewsubtext1_mobile} >
                                    {this.state.barocde} </Text>
                                <Text style={Device.isTablet ? styles.viewtext2_tablet : styles.viewtext2_mobile} >
                                    SECTION:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext2_tablet : styles.viewsubtext2_mobile} >
                                    - </Text>
                                <Text style={Device.isTablet ? styles.viewtext3_tablet : styles.viewtext3_mobile} >
                                    EMP ID:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext3_tablet : styles.viewsubtext3_mobile} >
                                    {this.state.empId} </Text>
                                <Text style={Device.isTablet ? styles.viewtext4_tablet : styles.viewtext4_mobile} >
                                    HSN CODE:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext4_tablet : styles.viewsubtext4_mobile} >
                                    {'HSN1234'} </Text>
                                <Text style={Device.isTablet ? styles.viewtext5_tablet : styles.viewtext5_mobile} >
                                    QTY:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext5_tablet : styles.viewsubtext5_mobile} >
                                    {this.state.qty} </Text>
                                <Text style={Device.isTablet ? styles.viewtext6_tablet : styles.viewtext6_mobile} >
                                    MRP:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext6_tablet : styles.viewsubtext6_mobile} >
                                    ₹ {this.state.mrp} </Text>
                                <Text style={Device.isTablet ? styles.viewtext7_tablet : styles.viewtext7_mobile} >
                                    DISC:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext7_tablet : styles.viewsubtext7_mobile} >
                                    - </Text>

                                <Text style={Device.isTablet ? styles.viewtext9_tablet : styles.viewtext9_mobile} >
                                    TAXABLE AMOUNT:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext9_tablet : styles.viewsubtext9_mobile} >
                                    ₹ {this.state.taxableaount} </Text>
                                <Text style={Device.isTablet ? styles.viewtext10_tablet : styles.viewtext10_mobile} >
                                    CGST:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext10_tablet : styles.viewsubtext10_mobile} >
                                    ₹ {this.state.cgst} </Text>
                                <Text style={Device.isTablet ? styles.viewtext11_tablet : styles.viewtext11_mobile} >
                                    SGST:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext11_tablet : styles.viewsubtext11_mobile} >
                                    ₹ {this.state.sgst} </Text>
                                <Text style={Device.isTablet ? styles.viewtext12_tablet : styles.viewtext12_mobile} >
                                    IGST:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext12_tablet : styles.viewsubtext12_mobile} >
                                    ₹ {this.state.igst} </Text>
                                <Text style={Device.isTablet ? styles.viewtext13_tablet : styles.viewtext13_mobile} >
                                    NET AMOUNT:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext13_tablet : styles.viewsubtext13_mobile} >
                                    ₹ {this.state.mrp} </Text>
                                <Text style={Device.isTablet ? styles.viewtext8_tablet : styles.viewtext8_mobile} >
                                    GST%:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext8_tablet : styles.viewsubtext8_mobile} >
                                    {'gst10%'} </Text>

                                <Text style={Device.isTablet ? styles.viewtext14_tablet : styles.viewtext14_mobile} >
                                    CUSTOMER:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext14_tablet : styles.viewsubtext14_mobile} >
                                    {this.state.customername} </Text>

                                <Text style={Device.isTablet ? styles.viewtext15_tablet : styles.viewtext15_mobile} >
                                    Mobile:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext15_tablet : styles.viewsubtext15_mobile} >
                                    {this.state.mobile} </Text>

                                <Text style={Device.isTablet ? styles.viewtext16_tablet : styles.viewtext16_mobile} >
                                    Date:  </Text>
                                <Text style={Device.isTablet ? styles.viewsubtext16_tablet : styles.viewsubtext16_mobile} >
                                    {this.state.createdate} </Text>


                                <TouchableOpacity
                                    style={Device.isTablet ? styles.filterCancel_tablet : styles.filterCancel_mobile} onPress={() => this.estimationModelCancel()}
                                >
                                    <Text style={Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile}  > CANCEL </Text>

                                </TouchableOpacity>



                            </View>


                        </Modal>
                    </View>
                )}

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

    imagealign: {
        marginTop: Device.isTablet ? 25 : 20,
        marginRight: Device.isTablet ? 30 : 20,
    },
    modelCloseImage: {
        fontFamily: 'regular',
        fontSize: 12,
        position: 'absolute',
        top: 10,
        right: Device.isTablet ? 15 : 30,
    },
    filterMainContainer: {
        marginLeft: -40,
        marginRight: -40,
        backgroundColor: '#ffffff',
        paddingLeft: Device.isTablet ? 0 : 20,
        marginTop: Device.isTablet ? deviceheight - 680 : deviceheight - 580,
        height: Device.isTablet ? 680 : 580,
    },
    deleteMainContainer: {
        marginLeft: -40,
        marginRight: -40,
        backgroundColor: '#ffffff',
        paddingLeft: Device.isTablet ? 0 : 20,
        marginTop: Device.isTablet ? deviceheight - 350 : deviceheight - 240,
        height: Device.isTablet ? 350 : 240,
    },
    //////////////
    filterCancel_mobile: {
        width: deviceWidth - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 520,
        height: 50,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#353C4050",
    },
    viewtext_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 80,
    },
    viewtext_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 60,
    },
    viewsubtext_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 80,
    },
    viewsubtext_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 60,
    },

    viewtext1_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 110,

    },
    viewsubtext1_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 110,
    },

    viewtext1_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 90,
    },

    viewsubtext1_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 90,
    },
    viewtext2_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 140,

    },
    viewsubtext2_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 140,
    },

    viewtext2_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 120,
    },

    viewsubtext2_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 120,
    },
    viewtext3_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 170,

    },
    viewsubtext3_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 170,
    },

    viewtext3_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 150,
    },

    viewsubtext3_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 150,
    },
    viewtext4_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 200,

    },
    viewsubtext4_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 200,
    },

    viewtext4_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 180,
    },

    viewsubtext4_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 180,
    },
    viewtext5_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 230,

    },
    viewsubtext5_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 230,
    },

    viewtext5_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 210,
    },

    viewsubtext5_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 210,
    },
    viewtext6_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 260,

    },
    viewsubtext6_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 260,
    },

    viewtext6_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 240,
    },

    viewsubtext6_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 240,
    },
    viewtext7_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 290,

    },
    viewsubtext7_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 290,
    },

    viewtext7_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 270,
    },

    viewsubtext7_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 270,
    },

    viewtext9_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 320,

    },
    viewsubtext9_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 320,
    },

    viewtext9_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 300,
    },

    viewsubtext9_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 300,
    },
    viewtext10_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 350,

    },
    viewsubtext10_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 350,
    },

    viewtext10_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 330,
    },

    viewsubtext10_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 330,
    },
    viewtext11_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 380,

    },
    viewsubtext11_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 380,
    },

    viewtext11_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 360,
    },

    viewsubtext11_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 360,
    },
    viewtext12_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 410,

    },
    viewsubtext12_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 410,
    },

    viewtext12_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 390,
    },

    viewsubtext12_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 390,
    },
    viewtext13_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 440,

    },
    viewsubtext13_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 440,
    },

    viewtext13_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 420,
    },

    viewsubtext13_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 420,
    },
    viewsubtext8_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 470,
    },
    viewtext8_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 470,

    },


    viewtext8_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 450,
    },

    viewsubtext8_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 450,
    },
    viewsubtext14_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 500,
    },
    viewtext14_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 500,

    },


    viewtext14_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 480,
    },

    viewsubtext14_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 480,
    },
    viewsubtext15_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 530,
    },
    viewtext15_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 530,

    },


    viewtext15_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 510,
    },

    viewsubtext15_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 510,
    },
    viewsubtext16_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 560,
    },
    viewtext16_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 22,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 560,

    },


    viewtext16_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        alignItems: 'center',
        left: 10,
        fontSize: 14,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute', top: 540,
    },

    viewsubtext16_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        top: 540,
    },



    filterCancel_tablet: {
        width: deviceWidth - 40,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 530,
        height: 60,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#353C4050",
    },
    ////////

    // Styles For Mobile

    filterMainContainer_mobile: {
        width: deviceWidth,
        alignItems: 'center',
        marginLeft: -20,
        backgroundColor: "#ffffff",
        height: 580,
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
    filterDateButton_mobile: {
        width: deviceWidth - 40,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 15,
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
    filterCloseImage_mobile: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 12,
        position: 'absolute',
        top: 10,
        right: 0,
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
    filterMainContainer_tablet: {
        width: deviceWidth,
        alignItems: 'center',
        marginLeft: -40,
        backgroundColor: "#ffffff",
        height: 670,
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
    filterDateButton_tablet: {
        width: deviceWidth - 40,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 15,
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },


    // flats for Mobile
    flatlistContainer_mobile: {
        height: 150,
        backgroundColor: '#fbfbfb',
        borderBottomWidth: 5,
        borderBottomColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flatlistSubContainer_mobile: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'center',
        height: 140
    },
    flatlistTextAccent_mobile: {
        fontFamily: 'medium',
        fontSize: 16,
        color: '#ED1C24'
    },
    flatlistText_mobile: {
        fontFamily: 'regular',
        fontSize: 12,
        color: '#353c40'
    },
    flatlistTextCommon_mobile: {
        fontFamily: 'regular',
        fontSize: 12,
        color: '#808080'
    },
    editButton_mobile: {
        width: 30,
        height: 30,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
        // borderRadius:5,
    },
    deleteButton_mobile: {
        width: 30,
        height: 30,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
    },


    // flats for Tablet
    flatlistContainer_tablet: {
        height: 200,
        backgroundColor: '#fbfbfb',
        borderBottomWidth: 5,
        borderBottomColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flatlistSubContainer_tablet: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        height: 160
    },
    flatlistTextAccent_tablet: {
        fontFamily: 'medium',
        fontSize: 21,
        color: '#ED1C24'
    },
    flatlistText_tablet: {
        fontFamily: 'regular',
        fontSize: 21,
        color: '#353c40'
    },
    flatlistTextCommon_tablet: {
        fontFamily: 'regular',
        fontSize: 17,
        color: '#808080'
    },
    flatlstTextCommon_tablet: {
        fontFamily: 'regular',
        fontSize: 17,
        color: '#808080'
    },
    editButton_tablet: {
        width: 50,
        height: 50,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
        // borderRadius:5,
    },
    deleteButton_tablet: {
        width: 50,
        height: 50,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
    },

    // Styles For Tablet
    filterMainContainer_tablet: {
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





});
