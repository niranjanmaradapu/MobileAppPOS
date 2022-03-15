import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import ReportsService from '../services/ReportsService';

var deviceWidth = Dimensions.get("window").width;
var deviceheight = Dimensions.get("window").height;

export class ListOfEstimationSlip extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteEstimationSlip: false,
            viewEstimationsSlip: false,
            modalVisible: true,
            date: new Date(),
            enddate: new Date(),
            fromDate: "",
            toDate: "",
            startDate: "",
            endDate: "",
            datepickerOpen: false,
            datepickerendOpen: false,
            dsnumber: "",
            qty: "",
            mrp: '',
            promodisc: '',
            statuses: [],
            dsStatus: "",
            dsNumber: "",
            barcode: "",
            flagViewDetail: false,
            storeId: 0,
            filterActive: false,
            estimationSlips: [1,2,3]
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("storeId").then((value) => {
            storeStringId = value;
            this.setState({ storeId: parseInt(storeStringId) });
            console.log(this.state.storeId);
        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting storeId');
            //  alert('There is error getting storeId');
        });

    }



    handledeleteEstimationSlip(item, index) {
        this.setState({ deleteEstimationSlip: true, modalVisible: true, flagViewDetail: false });
    }

    handleviewEstimationSlip(item, index) {
        console.log(item);
        this.setState({ dsnumber: item.dsNumber, qty: item.lineItems[0].quantity, mrp: item.netAmount, promoDisc: item.promoDisc });
        this.setState({ flagViewDetail: true, modalVisible: true, deleteEstimationSlip: false });
    }



    deleteEstimationSlip = (item, index) => {
        alert("you have deleted", index);
    };

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

    handleDsStatus = (value) => {
        this.setState({ dsStatus: value });
    };

    handleDsNumber = (value) => {
        this.setState({ dsNumber: value });
    };

    handleBarCode = (value) => {
        this.setState({ barcode: value });
    };

    datepickerCancelClicked() {
        this.setState({ date: new Date(), enddate: new Date(), datepickerOpen: false, datepickerendOpen: false });
    }

    applyEstimationSlipFilter() {
        if (this.state.startDate === "") {
            this.state.startDate = null;
        }
        if (this.state.endDate === "") {
            this.state.endDate = null;
        }
        if (this.state.dsStatus === "") {
            this.state.dsStatus = null;
        }
        if (this.state.barcode === "") {
            this.state.barcode = null;
        }
        if (this.state.dsNumber === "") {
            this.state.dsNumber = null;
        }

        const obj = {
            "dateFrom": this.state.startDate,
            "dateTo": this.state.endDate,
            status: this.state.dsStatus,
            barcode: this.state.barcode,
            dsNumber: this.state.dsNumber,
            storeId: this.state.storeId,
        };


        console.log('params are' + JSON.stringify(obj));
        this.setState({ loading: true });
        console.log(ReportsService.estimationSlips());
        axios.post(ReportsService.estimationSlips(), obj).then((res) => {
            console.log(res.data);
            if (res.data && res.data["isSuccess"] === "true") {
                if (res.data.result.length !== 0) {
                    this.setState({ filterActive: true });
                    this.props.childParams(res.data.result.deliverySlipVo);
                    this.props.modelCancelCallback();
                    this.props.filterActiveCallback();
                } else {
                    alert("records not found");
                }
                console.log(this.props.estimationSlip);
            }
            else {
                alert(res.data.message);
                this.props.modelCancelCallback();
            }
        }
        ).catch(() => {
            this.setState({ loading: false });
            alert('No Results Found');
            this.props.modelCancelCallback();
        });

    }

    modelCancel() {
        this.props.modelCancelCallback();
    }




    render() {
        return (
            <View>
                <FlatList
                    data={this.props.estimationSlip}
                    style={{ marginTop: 20 }}
                    scrollEnabled={true}
                    renderItem={({ item, index }) => (
                        <View style={Device.isTablet ? flats.flatlistContainer_tablet : flats.flatlistContainer_mobile} >
                            <View style={Device.isTablet ? flats.flatlistSubContainer_tablet : flats.flatlistSubContainer_mobile}>
                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextAccent_tablet : flats.flatlistTextAccent_mobile} >S.NO: {index + 1} </Text>
                                    <Text style={Device.isTablet ? flats.flatlistText_tablet : flats.flatlistText_mobile}> {I18n.t("DS NUMBER")}: {"\n"} {item.dsNumber}</Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>{I18n.t("DS DATE")}: {"\n"} {item.lastModified} </Text>
                                </View>
                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile} >{I18n.t("DS STATUS")}: {"\n"}{item.status} </Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>{I18n.t("GROSS AMOUNT")}: {"\n"} ₹{item.netAmount}</Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>{I18n.t("PROMO DISC")}: {"\n"} {item.promoDisc} </Text>
                                </View>
                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile} >{I18n.t("NET AMOUNT")}:{"\n"} ₹{item.netAmount} </Text>
                                    <View style={flats.buttons}>

                                        <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.handledeleteEstimationSlip(item, index)}>
                                            <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/delete.png')} />

                                        </TouchableOpacity>

                                        <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handleviewEstimationSlip(item, index)}>
                                            <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/eye.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
                {this.props.estimationSlip.length === 0 &&
                    <Text style={{ fontSize: Device.isTablet ? 21 : 17, fontFamily: 'bold', color: '#000000', textAlign: 'center', marginTop: deviceheight/3 }}>&#9888; {I18n.t("Results not loaded")}</Text>
                }
                {this.state.deleteEstimationSlip && (
                    <View>
                        <Modal isVisible={this.state.modalVisible} style={{ margin: 0 }}>
                            <View style={[styles.deleteMainContainer, { backgroundColor: "#ED1C24" }]}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, height: Device.isTablet ? 60 : 50 }}>
                                        <View>
                                            <Text style={{ marginTop: 15, fontSize: Device.isTablet ? 22 : 17, marginLeft: Device.isTablet ? 10 : 5, color: '#ffffff' }} > {I18n.t("Delete Estimation Slip")} </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={{ width: Device.isTablet ? 60 : 50, height: Device.isTablet ? 60 : 50, marginTop: Device.isTablet ? 20 : 15, }} onPress={() => this.estimationModelCancel()}>
                                                <Image style={{ margin: 5, height: Device.isTablet ? 20 : 15, width: Device.isTablet ? 20 : 15, }} source={require('../assets/images/modalCloseWhite.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text style={{
                                        height: Device.isTablet ? 2 : 1,
                                        width: deviceWidth,
                                        backgroundColor: 'lightgray',
                                    }}></Text>
                                </View>
                                <View style={{ backgroundColor: "#ffffff", height: Device.isTablet ? 300 : 250 }}>
                                    <Text style={{
                                        // height: Device.isTablet ? 40 : 20,
                                        textAlign: 'center',
                                        fontFamily: 'regular',
                                        marginTop: 15,
                                        fontSize: Device.isTablet ? 23 : 18,
                                        color: '#353C40'
                                    }}> {I18n.t("Are you sure want to delete Estimation Slip")} ?  </Text>
                                    <TouchableOpacity
                                        style={[Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile, { marginTop: Device.isTablet ? 40 : 30 }]} onPress={() => this.deleteEstimationSlip(item, index)}
                                    >
                                        <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile}  > {I18n.t("DELETE")} </Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile, { borderColor: '#ED1C24', }]} onPress={() => this.estimationModelCancel()}
                                    >
                                        <Text style={[Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile, { color: '#ED1C24' }]}  > {I18n.t("CANCEL")} </Text>

                                    </TouchableOpacity>
                                </View>

                            </View>
                        </Modal>
                    </View>
                )}

                {this.props.flagFilterEstimationSlip && (
                    <View>
                        <Modal isVisible={this.props.modalVisible} style={{ margin: 0 }}>
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
                                    <View style={[Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile, { width: deviceWidth - 40 }]}>
                                        <RNPickerSelect
                                            // style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                                            placeholder={{
                                                label: 'DS STATUS'
                                            }}
                                            Icon={() => {
                                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                            }}
                                            items={[
                                                { label: 'Completed', value: 'Completed' },
                                                { label: 'Pending', value: 'Pending' },
                                                { label: 'Cancelled', value: 'Cancelled' },
                                            ]}
                                            onValueChange={this.handleDsStatus}
                                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                                            value={this.state.dsStatus}
                                            useNativeAndroidPickerStyle={false}
                                        />


                                    </View>
                                    <TextInput
                                        style={[Device.isTablet ? styles.input_tablet : styles.input_mobile, { width: deviceWidth - 40 }]}
                                        underlineColorAndroid="transparent"
                                        placeholder={I18n.t("DS NUMBER")}
                                        placeholderTextColor="#6F6F6F"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.dsNumber}
                                        onChangeText={this.handleDsNumber}
                                    />
                                    <TextInput
                                        style={[Device.isTablet ? styles.input_tablet : styles.input_mobile, { width: deviceWidth - 40 }]}
                                        underlineColorAndroid="transparent"
                                        placeholder={I18n.t("BARCODE")}
                                        placeholderTextColor="#6F6F6F"
                                        textAlignVertical="center"
                                        autoCapitalize="none"
                                        value={this.state.barcode}
                                        onChangeText={this.handleBarCode}
                                    />

                                    <TouchableOpacity style={Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile}
                                        onPress={() => this.applyEstimationSlipFilter()}>
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

                {this.state.flagViewDetail && (
                    <View>
                        <Modal isVisible={this.state.modalVisible} style={{ margin: 0 }}>

                            <View style={[styles.filterMainContainer, { height: Device.isTablet ? 400 : 350, marginTop: Device.isTablet ? deviceheight - 400 : deviceheight - 350, backgroundColor: '#00a9a9' }]}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, height: Device.isTablet ? 60 : 50, }}>
                                        <View>
                                            <Text style={{ marginTop: 15, fontSize: Device.isTablet ? 22 : 17, marginLeft: Device.isTablet ? 10 : 5, color: '#ffffff', }} > {I18n.t("Estimation Slip Details")} </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={{ width: Device.isTablet ? 60 : 50, height: Device.isTablet ? 60 : 50, marginTop: Device.isTablet ? 20 : 15, }} onPress={() => this.estimationModelCancel()}>
                                                <Image style={{ margin: 5, height: Device.isTablet ? 20 : 15, width: Device.isTablet ? 20 : 15, }} source={require('../assets/images/modalCloseWhite.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text style={{
                                        height: Device.isTablet ? 2 : 1,
                                        width: deviceWidth,
                                        backgroundColor: 'lightgray',
                                    }}></Text>
                                </View>
                                <View style={{ backgroundColor: '#ffffff', height: Device.isTablet ? 350 : 300, width: deviceWidth, margin: 0 }}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', height: Device.isTablet ? 300 : 250 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: Device.isTablet ? 20 : 10, paddingLeft: Device.isTablet ? 20 : 10 }}>
                                            <Text style={styles.viewText} >
                                                {I18n.t("Delivery Slip")}:  </Text>
                                            <Text style={[styles.viewSubText, { color: '#00a9a9', fontFamily: 'medium' }]} selectable={true}>
                                                {this.state.dsnumber} </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: Device.isTablet ? 20 : 10, paddingLeft: Device.isTablet ? 20 : 10 }}>
                                            <Text style={styles.viewText} >
                                                SM:  </Text>
                                            <Text style={styles.viewSubText} >
                                                - </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: Device.isTablet ? 20 : 10, paddingLeft: Device.isTablet ? 20 : 10 }}>
                                            <Text style={styles.viewText} >
                                                QTY:  </Text>
                                            <Text style={styles.viewSubText} >
                                                {this.state.qty} </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: Device.isTablet ? 20 : 10, paddingLeft: Device.isTablet ? 20 : 10 }}>
                                            <Text style={styles.viewText} >
                                                {I18n.t("GROSS AMOUNT")}:  </Text>
                                            <Text style={styles.viewSubText} >
                                                ₹ {this.state.mrp} </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: Device.isTablet ? 20 : 10, paddingLeft: Device.isTablet ? 20 : 10 }}>
                                            <Text style={styles.viewText} >
                                                {I18n.t("PROMO DISCOUNT")}:  </Text>
                                            <Text style={styles.viewSubText} >
                                                {this.state.promodisc} </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: Device.isTablet ? 20 : 10, paddingLeft: Device.isTablet ? 20 : 10 }}>
                                            <Text style={styles.viewText} >
                                                {I18n.t("NET AMOUNT")}:  </Text>
                                            <Text style={styles.viewSubText} >
                                                ₹ {this.state.mrp} </Text>
                                        </View>
                                        <View style={{ paddingRight: Device.isTablet ? 20 : 10, paddingLeft: Device.isTablet ? 20 : 10 }}>
                                            <TouchableOpacity
                                                style={[Device.isTablet ? styles.filterCancel_tablet : styles.filterCancel_mobile, { borderColor: '#00a9a9' }]} onPress={() => this.estimationModelCancel()}
                                            >
                                                <Text style={[Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile, { color: '#00a9a9' }]}  > {I18n.t("CANCEL")} </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
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
        borderWidth: Device.isTablet ? 2 : 1,
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
        borderWidth: Device.isTablet ? 2 : 1,
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
        borderWidth: Device.isTablet ? 2 : 1,
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
        borderWidth: Device.isTablet ? 2 : 1,
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
        right: Device.isTablet ? 20 : 30,
    },
    deleteMainContainer: {
        // marginLeft: -40,
        // marginRight: -40,
        // paddingLeft: Device.isTablet ? 0 : 20,
        backgroundColor: '#ffffff',
        marginTop: Device.isTablet ? deviceheight - 350 : deviceheight - 240,
        height: Device.isTablet ? 350 : 300,
    },
    filterMainContainer: {
        // marginLeft: -40,
        // marginRight: -40,
        // paddingLeft: Device.isTablet ? 0 : 20,
        backgroundColor: '#ffffff',
        marginTop: Device.isTablet ? deviceheight - 630 : deviceheight - 530,
        height: Device.isTablet ? 630 : 530,
    },
    viewText: {
        fontSize: Device.isTablet ? 22 : 17,
        fontFamily: 'bold',
        color: "#353C40"
    },
    viewSubText: {
        fontSize: Device.isTablet ? 22 : 17,
        fontFamily: 'regular',
        color: "#353C40"
    },

    // Styles For Mobile

    filterMainContainer_mobile: {
        width: deviceWidth,
        alignItems: 'center',
        marginLeft: -20,
        backgroundColor: "#ffffff",
        height: 530,
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
        borderWidth: Device.isTablet ? 2 : 1,
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
        borderWidth: Device.isTablet ? 2 : 1,
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
    //////////////
    filterCancel_mobile: {
        width: deviceWidth - 20,
        height: 50,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: Device.isTablet ? 2 : 1,
        borderColor: "#353C4050",
    },
    viewtext_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        fontSize: 22,
        justifyContent: 'center',
    },
    viewtext_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        fontSize: 14,
    },
    viewsubtext_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 22,
    },
    viewsubtext_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        alignItems: 'center',
        marginLeft: 16,
        fontSize: 14,
    },

    viewtext1_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        fontSize: 22,

    },
    viewsubtext1_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        fontSize: 22,
    },

    viewtext1_mobile: {
        color: "#353C40",
        fontSize: 14,
    },

    viewsubtext1_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        fontSize: 14,
    },
    viewtext2_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        fontSize: 22,
    },
    viewsubtext2_tablet: {
        color: "#353C40",
        fontFamily: "bold",
        fontSize: 22,
    },

    viewtext2_mobile: {
        color: "#353C40",
        fontFamily: "regular",
        fontSize: 14,
    },

    viewsubtext2_mobile: {
        color: "#353C40",
        fontFamily: "bold",
        fontSize: 14,
    },
    viewtext3_tablet: {
        color: "#353C40",
        fontFamily: "regular",
        fontSize: 22,
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
    filterCancel_tablet: {
        width: deviceWidth - 40,
        height: 60,
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#353C4050",
    },
    ////////
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
        borderWidth: Device.isTablet ? 2 : 1,
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
        borderWidth: Device.isTablet ? 2 : 1,
        borderColor: "lightgray",
        // borderRadius:5,
    },
    deleteButton_mobile: {
        width: 30,
        height: 30,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: Device.isTablet ? 2 : 1,
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
        borderWidth: Device.isTablet ? 2 : 1,
        borderColor: "lightgray",
        // borderRadius:5,
    },
    deleteButton_tablet: {
        width: 50,
        height: 50,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: Device.isTablet ? 2 : 1,
        borderColor: "lightgray",
    },




});
