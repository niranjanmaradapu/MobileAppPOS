import React, { Component } from 'react'
import { View, Image, Text, Button, FlatList,TouchableOpacity, Switch, TextInput, StyleSheet, Dimensions, ActivityIndicator, scrollview, SafeAreaView, ScrollView, TouchableHighlight } from 'react-native';
import  Modal from 'react-native-modal';
import { Chevron } from 'react-native-shapes';
import axios from 'axios';
import Loader from "../../loader";
import DatePicker from 'react-native-date-picker'
import Device from 'react-native-device-detection'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

var deviceWidth = Dimensions.get("window").width;

export default class Inventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            barCodeId: "",
            startDate: "",
            endDate: "",
            flagone: true,
            flagtwo: false,
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
        }
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Home')
    }

    filterAction() {
        
    }

    topbarAction1(){
        this.setState({ flagone: true })
        this.setState({ flagtwo: false })
    }

    topbarAction2(){
        this.setState({ flagone: false })
        this.setState({ flagtwo: true })
    }

    navigateToAddBarcode(){
        this.props.navigation.navigate('AddBarcode', {
            onGoback: () => this.refteshBarcodes(),
        });
    }

    refteshBarcodes() {
        this.getAllBarcodes()
    }

    getAllBarcodes() {
        console.log('refreshed')
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
        this.setState({ flagFilterBarcodeOpen: false });
        this.setState({ flagFilterReBarcodeOpen: false });
        this.setState({ modalVisible: false });
    }

    datepickerClicked() {
        this.setState({ datepickerOpen: true })
    }

    enddatepickerClicked() {
        this.setState({ datepickerOpen: false })
        this.setState({ datepickerendOpen: true })
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
        alert("barcode");
    }
    applyReBarcodeFilter() {
        alert("rebarcode");
    }

    handlebarcodedeleteaction() {
        alert("you have deleted")        
    }

    handleeditbarcode() {
        alert("you have edited")
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
                    <TouchableOpacity style={Device.isTablet ? styles.addBarcodeButton_tablet : styles.addBarcodeButton_mobile} onPress={() => this.navigateToAddBarcode()}>
                        <Text style={Device.isTablet ? styles.addBarcodeButtonText_tablet : styles.addBarcodeButtonText_mobile}>Add BarCode</Text>
                    </TouchableOpacity>
                )}
                {this.state.flagone && (
                    <FlatList
                        data={this.state.barcodesData}
                        style={{marginTop: 40,}}
                        scrollEnabled={true}
                        keyExtractor={item => item}
                        renderItem={({item, index}) => (
                            <View
                                style={Device.isTablet ? styles.barcodesFlatlistContainer_tablet : styles.barcodesFlatlistContainer_mobile}
                            >
                                <View style={Device.isTablet ? styles.barcodesFlatlistSubContainer_tablet : styles.barcodesFlatlistSubContainer_mobile}>
                                    <Text style={Device.isTablet ? flats.mainText_tablet : flats.mainText_mobile} >S.NO</Text>
                                    <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>BARCODE</Text>
                                    <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>{}</Text>
                                    <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>LIST PRICE</Text>
                                    <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>STORE</Text>
                                    <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>QTY</Text>
                                    <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>VALUE</Text>

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

                                    <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.handleeditbarcode(item, index)}>
                                    <Image style={{ alignSelf: 'center', top: 5 }} source={require('../../assets/images/edit.png')} />
                                </TouchableOpacity>

                                <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handlebarcodedeleteaction(item, index)}>
                                    <Image style={{ alignSelf: 'center', top: 5 }} source={require('../../assets/images/delete.png')} />
                                </TouchableOpacity>

                                </View>
                            </View>
                        )}
                    />
                )}
                {this.state.flagtwo && (
                    <FlatList
                    data={this.state.reBarcodesData}
                    style={{marginTop: 40,}}
                    scrollEnabled={true}
                    keyExtractor={item => item}
                    renderItem={({item, index}) => (
                        <View
                            style={Device.isTablet ? styles.barcodesFlatlistContainer_tablet : styles.barcodesFlatlistContainer_mobile}
                        >
                            <View style={Device.isTablet ? styles.barcodesFlatlistSubContainer_tablet : styles.barcodesFlatlistSubContainer_mobile}>
                                <Text style={Device.isTablet ? flats.mainText_tablet : flats.mainText_mobile} >PARENT BARCODE</Text>
                                <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>CHILD BARCODE</Text>
                                <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>{}</Text>
                                <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>EMPLOYEE ID</Text>
                                <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>APPROVED BY</Text>
                            </View>
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
                                        >{this.state.doneButtonClicked == false ? 'Start Date' : this.state.startDate}</Text>
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
                                    >{this.state.doneButtonClicked == false ? 'Start Date' : this.state.startDate}</Text>
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
        height: 70,
    },
    backButton_mobile: {
        position: 'absolute',
        left: 10,
        top: 10,
        width: 40,
        height: 40,
    },
    headerTitle_mobile: {
        position: 'absolute',
        left: 70,
        top: 27,
        width: 300,
        height: 20,
        fontFamily: 'bold',
        fontSize: 18,
        color: '#353C40'
    },
    filterButton_mobile: {
        position: 'absolute', 
        right: 20, 
        top: 27, 
        backgroundColor: '#ffffff', 
        borderRadius: 5, 
        width: 30, 
        height: 32,
    },
    modalContainer_mobile: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        marginTop: 20,
        borderColor: '#ED1C24',
        width: '90%',
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
        right: 20, 
        top: 150, 
        backgroundColor: '#ED1C24', 
        borderRadius: 5, 
        width: 100, 
        height: 32,
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
        top: 20,
        width: 90,
        height: 90,
    },
    headerTitle_tablet: {
        position: 'absolute',
        left: 70,
        top: 32,
        width: 300,
        height: 40,
        fontFamily: 'bold',
        fontSize: 24,
        color: '#353C40'
    },
    filterButton_tablet: {
        position: 'absolute', 
        right: 20, 
        top: 37, 
        backgroundColor: '#ffffff', 
        borderRadius: 5, 
        width: 35, 
        height: 37,
    },
    modalContainer_tablet: {
        flexDirection: 'row',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 5,
        marginTop: 20,
        borderColor: '#ED1C24',
        width: '90%',
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
        right: 20, 
        top: 150, 
        backgroundColor: '#ED1C24', 
        borderRadius: 5, 
        width: 110,
        height: 42,
    },
    addBarcodeButtonText_tablet: {
        fontSize: 17, 
        fontFamily: 'regular', 
        color: '#ffffff', 
        marginTop: 8, 
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
        marginTop: 20, 
        fontFamily: 'medium', 
        color: '#ED1C24'
    },
    subText_mobile: {
        fontSize: 12, 
        marginLeft: 16, 
        marginTop: 0, 
        fontFamily: 'medium', 
        color: '#353C40'
    },
    commonText_mobile: {
        fontSize: 12,
        marginLeft: 16, 
        marginTop: 6, 
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
        fontFamily: 'medium', 
        color: '#ED1C24'
    },
    subText_tablet: {
        fontSize: 17, 
        marginLeft: 16, 
        marginTop: 0, 
        fontFamily: 'medium', 
        color: '#353C40'
    },
    commonText_tablet: {
        fontSize: 17,
        marginLeft: 16, 
        marginTop: 6, 
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
