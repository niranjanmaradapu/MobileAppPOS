import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import Loader from '../../commonUtils/loader';
import InventoryService from '../services/InventoryService';
import LoginService from '../services/LoginService';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class AddBarcode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            division: "",
            section: "",
            subSection: "",
            category: "",
            colour: "",
            batchNo: "",
            costPrice: null,
            listPrice: null,
            uomName: "",
            hsnCode: "",
            store: "",
            empId: "",
            quantity: "",
            divisionArray: [],
            divisions: [],
            secionArray: [],
            secions: [],
            divisionId: null,
            sectionId: null,
            subsectionId: null,
            catogirieId: null,
            subsecionArray: [],
            subsecions: [],
            catogiriesArray: [],
            catogiries: [],
            uom: [],
            uomArray: [],
            hsncodes: [],
            hsncodesArray: [],
            uomId: null,
            hsnId: null,
            storeNamesArray: [],
            storeNames: [],
            storeId: "",
            domainId: 1,
            isEdit: false,
        };
    }

    componentDidMount() {
        var domainStringId = "";
        var storeStringId = "";
        this.setState({ isEdit: this.props.route.params.isEdit });
        AsyncStorage.getItem("domainDataId").then((value) => {
            domainStringId = value;
            this.setState({ domainId: parseInt(domainStringId) });
            console.log("domain data id" + this.state.domainId);
            this.getAllpools();

        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting domainDataId');
            alert('There is error getting domainDataId');
        });

        AsyncStorage.getItem("storeId").then((value) => {
            storeStringId = value;
            this.setState({ storeId: parseInt(storeStringId) },
                () => {
                });
            console.log(this.state.storeId);
        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error getting storeId');
            alert('There is error getting storeId');
        });
        this.getAllDivisions();
        this.getAllCatogiries();
        this.getAllUOM();
        this.getAllHSNCodes();
        this.getAllstores();
    }


    getAllDivisions() {
        var divisions = [];
        axios.get(InventoryService.getAllDivisions(),).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {

                    this.state.divisionArray.push({ name: res.data["result"][i].name, id: res.data["result"][i].id });

                    divisions.push({
                        value: this.state.divisionArray[i].name,
                        label: this.state.divisionArray[i].name
                    });
                    console.log(this.state.divisionArray);

                }
                this.setState({
                    divisions: divisions,
                });

                this.setState({ divisionArray: this.state.divisionArray });
            }

        });
    }


    getAllSections() {
        const params = {
            "id": this.state.divisionId
        };
        var secions = [];
        axios.get(InventoryService.getAllSections(), { params }).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {

                    this.state.secionArray.push({ name: res.data["result"][i].name, id: res.data["result"][i].id });

                    secions.push({
                        value: this.state.secionArray[i].name,
                        label: this.state.secionArray[i].name
                    });
                }
                this.setState({
                    secions: secions,
                });

                this.setState({ secionArray: this.state.secionArray });
            }

        });
    }

    getAllSubsections() {
        const params = {
            "id": this.state.sectionId
        };
        var subsecions = [];
        axios.get(InventoryService.getAllSections(), { params }).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {

                    this.state.subsecionArray.push({ name: res.data["result"][i].name, id: res.data["result"][i].id });

                    subsecions.push({
                        value: this.state.subsecionArray[i].name,
                        label: this.state.subsecionArray[i].name
                    });
                    console.log(this.state.subsecionArray);

                }
                this.setState({
                    subsecions: subsecions,
                });

                this.setState({ subsecionArray: this.state.subsecionArray });
            }

        });
    }

    getAllCatogiries() {
        var catogiries = [];
        axios.get(InventoryService.getAllCategories()).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {

                    this.state.catogiriesArray.push({ name: res.data["result"][i].name, id: res.data["result"][i].id });

                    catogiries.push({
                        value: this.state.catogiriesArray[i].name,
                        label: this.state.catogiriesArray[i].name
                    });


                }
                this.setState({
                    catogiries: catogiries,
                });

                this.setState({ catogiriesArray: this.state.catogiriesArray });
            }

        });

    }

    getAllUOM() {
        var uom = [];
        axios.get(InventoryService.getUOM()).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {
                    this.state.uomArray.push({ name: res.data["result"][i].uomName, id: res.data["result"][i].id });
                    console.log(this.state.uomArray);
                    uom.push({
                        value: this.state.uomArray[i].name,
                        label: this.state.uomArray[i].name
                    });
                }
                this.setState({
                    uom: uom,
                });

                this.setState({ uomArray: this.state.uomArray });
            }

        });
    }

    getAllHSNCodes() {
        var hsncodes = [];
        axios.get(InventoryService.getAllHsnList()).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {
                    this.state.hsncodesArray.push({ name: res.data["result"][i].hsnCode, id: res.data["result"][i].id });
                    console.log(res.data["result"]);
                    hsncodes.push({
                        value: this.state.hsncodesArray[i].name,
                        label: this.state.hsncodesArray[i].name
                    });
                }
                this.setState({
                    hsncodes: hsncodes,
                });

                this.setState({ hsncodesArray: this.state.hsncodesArray });
            }

        });
    }

    async getAllstores() {
        const username = await AsyncStorage.getItem("username");
        AsyncStorage.getItem("custom:isSuperAdmin").then((value) => {

            if (value === "true") {
                const params = {
                    "clientDomianId": this.state.domainId
                };
                var storeNames = [];
                axios.get(LoginService.getUserStoresForSuperAdmin(), { params }).then((res) => {
                    let len = res.data["result"].length;
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let number = res.data.result[i];
                            // this.state.storeData.push(number)
                            console.log(this.state.storeData);
                            storeNames.push({
                                value: number.name,
                                label: number.name
                            });
                        }
                        this.setState({
                            storeNames: storeNames,
                        });

                        this.setState({ storeNamesArray: this.state.storeNamesArray });

                        this.setState({ storeData: this.state.storeData });
                    }
                });

            }
            else {
                var storeNames = [];
                axios.get(LoginService.getUserStores() + username).then((res) => {
                    if (res.data["result"]) {
                        for (var i = 0; i < res.data["result"].length; i++) {
                            let number = res.data.result[i];
                            const myArray = [];
                            myArray = number.split(":");
                            this.state.storeNamesArray.push({ name: myArray[0], id: myArray[1] });
                            console.log(this.state.storeNamesArray);
                            storeNames.push({
                                value: this.state.storeNamesArray[i].name,
                                label: this.state.storeNamesArray[i].name
                            });
                        }
                        this.setState({
                            storeNames: storeNames,
                        });

                        this.setState({ storeNamesArray: this.state.storeNamesArray });

                    }
                });
            }
        });
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleDivision = (value) => {
        for (let i = 0; i < this.state.divisionArray.length; i++) {
            if (this.state.divisionArray[i].name === value) {
                this.setState({ divisionId: this.state.divisionArray[i].id });
            }
        }
        this.getAllSections();
        this.setState({ division: value });
    };

    handleSection = (value) => {
        for (let i = 0; i < this.state.secionArray.length; i++) {
            if (this.state.secionArray[i].name === value) {
                this.setState({ sectionId: this.state.secionArray[i].id });
            }
        }
        this.getAllSubsections();
        this.setState({ section: value });
    };

    handleSubSection = (value) => {
        for (let i = 0; i < this.state.subsecionArray.length; i++) {
            if (this.state.subsecionArray[i].name === value) {
                this.setState({ subsectionId: this.state.subsecionArray[i].id });
            }
        }
        this.setState({ subSection: value });
    };
    handleCateory = (value) => {
        for (let i = 0; i < this.state.catogiriesArray.length; i++) {
            if (this.state.catogiriesArray[i].name === value) {
                this.setState({ catogirieId: this.state.catogiriesArray[i].id });
            }
        }
        this.setState({ category: value });
    };

    handleUOM = (value) => {
        for (let i = 0; i < this.state.uomArray.length; i++) {
            if (this.state.uomArray[i].name === value) {
                this.setState({ uomId: this.state.uomArray[i].id });
            }
        }
        this.setState({ uomName: value });
    };

    handleHSNCode = (value) => {
        for (let i = 0; i < this.state.hsncodesArray.length; i++) {
            if (this.state.hsncodesArray[i].name === value) {
                this.setState({ hsnId: this.state.hsncodesArray[i].id });
            }
        }
        this.setState({ hsnCode: value });
    };

    handleColour = (value) => {
        this.setState({ colour: value });
    };

    handleBatchNo = (value) => {
        this.setState({ batchNo: value });
    };

    handleCostPrice = (value) => {
        this.setState({ costPrice: value });
    };

    handleListPrice = (value) => {
        this.setState({ listPrice: value });
    };



    handleStore = (value) => {
        for (let i = 0; i < this.state.storeNamesArray.length; i++) {
            if (this.state.storeNamesArray[i].name === value) {
                this.setState({ selectedstoreId: this.state.storeNamesArray[i].id });
            }
        }

        this.setState({ store: value });
    };

    handleEMPId = (value) => {
        this.setState({ empId: value });
    };

    handleQuantity = (value) => {
        this.setState({ quantity: value });
    };

    saveBarcode() {
        console.log(this.state.store);
        if (this.state.divisionId === null) {
            alert("please select the Division");
        }
        else if (this.state.sectionId === null) {
            alert("please select the Section");
        }
        else if (this.state.subsectionId === null) {
            alert("please select the Sub Section");
        }
        else if (this.state.catogirieId === null) {
            alert("please select the category");
        }
        else if (String(this.state.colour).length === 0) {
            alert("please enter the Colour");
        }
        else if (String(this.state.batchNo).length === 0) {
            alert("please enter the Batch No");
        }
        else if (this.state.costPrice === null) {
            alert("please enter the Cost Price");
        }
        else if (this.state.listPrice === null) {
            alert("please enter the List price");
        }
        else if (this.state.uomId === null) {
            alert("please select the UOM");
        }
        else if (this.state.hsnId === null) {
            alert("please enter the Hsn code");
        }
        else if (String(this.state.empId).length === 0) {
            alert("please enter the Emp ID");
        }
        else if (this.state.store === undefined) {
            alert("please select the Store");
        }
        else if (String(this.state.quantity).length === 0) {
            alert("please enter the Qty");
        }
        else {
            const params = {
                "division": parseInt(this.state.divisionId),
                "section": parseInt(this.state.sectionId),
                "subSection": parseInt(this.state.subsectionId),
                "category": parseInt(this.state.catogirieId),
                "batchNo": this.state.batchNo,
                "colour": this.state.colour,
                "productTextile": {
                    "qty": this.state.quantity,
                    "costPrice": this.state.costPrice,
                    "itemMrp": this.state.listPrice,
                    "storeId": this.state.storeId,
                    "empId": this.state.empId,
                    "uom": this.state.uomName,
                    "hsnMasterId": parseInt(this.state.hsnId),
                }
            };
            this.setState({ loading: true });
            console.log('params are' + JSON.stringify(params));
            axios.post(InventoryService.addTextileBarcodes(), params).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                    console.log("Adding Barcode", res.data);
                    this.props.route.params.onGoBack();
                    this.props.navigation.goBack();
                }
                else {
                    this.setState({ loading: false });
                    alert("duplicate record already exists");
                }
            }
            ).catch((err) => {
                this.setState({ loading: false });
                this.setState({ loading: false });
                alert(err);
            });
        }
    }

    cancel() {
        this.props.navigation.goBack(null);
    }


    render() {
        return (
            <View style={styles.mainContainer}>
                {this.state.loading &&
                    <Loader
                        loading={this.state.loading} />
                }
                <View style={Device.isTablet ? styles.viewsWidth_tablet : styles.viewsWidth_mobile}>
                    <TouchableOpacity style={Device.isTablet ? styles.backButton_tablet : styles.backButton_mobile} onPress={() => this.handleBackButtonClick()}>
                        <Image source={require('../assets/images/backButton.png')} />
                    </TouchableOpacity>
                    <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}> Add Barcode </Text>
                </View>
                <ScrollView>
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>Division <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Division'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.divisions}
                            onValueChange={this.handleDivision}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.division}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>Section <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Section'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.secions}
                            onValueChange={this.handleSection}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.section}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>Sub Section <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Sub Section'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.subsecions}
                            onValueChange={this.handleSubSection}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.subSection}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>Category <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Category'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.catogiries}
                            onValueChange={this.handleCateory}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.category}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>Colour <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Colour"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.colour}
                        onChangeText={this.handleColour}
                    />
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>Batch No <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Batch No"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.batchNo}
                        onChangeText={this.handleBatchNo}
                    />
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>Cost Price <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Cost Price"
                        keyboardType={'numeric'}
                        textContentType='telephoneNumber'
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.costPrice}
                        onChangeText={this.handleCostPrice}
                    />
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>List Price <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="List Price"
                        keyboardType={'numeric'}
                        textContentType='telephoneNumber'
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.listPrice}
                        onChangeText={this.handleListPrice}
                    />
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>UOM <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'UOM'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.uom}
                            onValueChange={this.handleUOM}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.uomName}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>HSN Code <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'HSN Code'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.hsncodes}
                            onValueChange={this.handleHSNCode}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.hsnCode}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>EMP ID <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="EMP ID"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.empId}
                        onChangeText={this.handleEMPId}
                    />
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>Store <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Store'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.storeNames}
                            onValueChange={this.handleStore}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.store}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: Device.isTablet ? 20 : 15 }}>QTY <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="QTY"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.quantity}
                        onChangeText={this.handleQuantity}
                    />
                    <TouchableOpacity style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile}
                        onPress={() => this.saveBarcode()}>
                        <Text style={Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile}>SAVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={Device.isTablet ? styles.cancelButton_tablet : styles.cancelButton_mobile}
                        onPress={() => this.cancel()}>
                        <Text style={Device.isTablet ? styles.cancelButtonText_tablet : styles.cancelButtonText_mobile}>CANCEL</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomContainer} ></View>
                </ScrollView>
            </View>
        );
    }
}

export default AddBarcode;

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
        backgroundColor: '#ffffff'
    },
    imagealign: {
        marginTop: Device.isTablet ? 25 : 20,
        marginRight: Device.isTablet ? 30 : 20,
    },
    bottomContainer: {
        margin: 50,
    },

    // Styles For Mobiles
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
