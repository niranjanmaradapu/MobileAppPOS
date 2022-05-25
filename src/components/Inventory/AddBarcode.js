import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import Loader from '../../commonUtils/loader';
import { accountingErrorMessages, errorLength, inventoryErrorMessages } from '../Errors/errors';
import InventoryService from '../services/InventoryService';
import LoginService from '../services/LoginService';
import Message from '../Errors/Message';
import {RH,RW,RF} from '../../Responsive';
import { cancelBtn, cancelBtnText, inputField, inputHeading, rnPicker, rnPickerContainer, rnPickerError, submitBtn, submitBtnText } from '../Styles/FormFields';
import { backButton, backButtonImage, headerTitle, headerTitleContainer, headerTitleSubContainer, headerTitleSubContainer2, menuButton } from '../Styles/Styles';

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
            name: "",
            storeId: "",
            domainId: 1,
            isEdit: false,
            errors: {},
            divisionValid: true,
            sectionValid: true,
            subSectionValid: true,
            categoryValid: true,
            colorValid: true,
            nameValid: true,
            batchNoValid: true,
            costPriceValid: true,
            listPriceValid: true,
            uomValid: true,
            hsnValid: true,
            empValid: true,
            storeValid: true,
            qtyValid: true,
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

        }).catch((err) => {
            this.setState({ loading: false });
            console.log(err);
            // alert('There is error getting domainDataId');
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
            // alert('There is error getting storeId');
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
                for (var i = 0; i < res.data.result.content.length; i++) {
                    this.state.hsncodesArray.push({ name: res.data.result.content[i].hsnCode, id: res.data.result.content[i].id });
                    console.log(res.data["result"].content);
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
                            this.state.storeNamesArray.push({ name: number.name, id: number.id });
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
        if (this.state.divisionId !== null) {
            this.setState({divisionValid: true})
        }
    };

    handleSection = (value) => {
        for (let i = 0; i < this.state.secionArray.length; i++) {
            if (this.state.secionArray[i].name === value) {
                this.setState({ sectionId: this.state.secionArray[i].id });
            }
        }
        this.getAllSubsections();
        this.setState({ section: value });
        if (this.state.sectionId !== null) {
            this.setState({sectionValid: true})
        }
    };

    handleSubSection = (value) => {
        for (let i = 0; i < this.state.subsecionArray.length; i++) {
            if (this.state.subsecionArray[i].name === value) {
                this.setState({ subsectionId: this.state.subsecionArray[i].id });
            }
        }
        this.setState({ subSection: value });
        if (this.state.subsectionId !== null) {
            this.setState({subSectionValid: true})
        }
    };
    handleCateory = (value) => {
        for (let i = 0; i < this.state.catogiriesArray.length; i++) {
            if (this.state.catogiriesArray[i].name === value) {
                this.setState({ catogirieId: this.state.catogiriesArray[i].id });
            }
        }
        this.setState({ category: value });
        if (this.state.catogirieId !== null) {
            this.setState({categoryValid: true})
        }
    };

    handleUOM = (value) => {
        for (let i = 0; i < this.state.uomArray.length; i++) {
            if (this.state.uomArray[i].name === value) {
                this.setState({ uomId: this.state.uomArray[i].id });
            }
        }
        this.setState({ uomName: value });
        if (this.state.uomId !== null) {
            this.setState({uomValid: true})
        }
    };

    handleHSNCode = (value) => {
        for (let i = 0; i < this.state.hsncodesArray.length; i++) {
            if (this.state.hsncodesArray[i].name === value) {
                this.setState({ hsnId: this.state.hsncodesArray[i].id });
            }
        }
        this.setState({ hsnCode: value });
        if (this.state.hsnId !== null) {
            this.setState({hsnValid: true})
        }
    };

    handleColour = (value) => {
        this.setState({ colour: value });
    };

    handleColourValid = () => {
        if (this.state.colour.length >= errorLength.colour) {
            this.setState({colorValid: true})
        }
    }

    handleName = (value) => {
        this.setState({ name: value });
    };

    handleNameValid = () => {
        if (this.state.name.length >= errorLength.name) {
            this.setState({nameValid: true})
        }
    }

    handleBatchNo = (value) => {
        this.setState({ batchNo: value });
    };

    handleBatchNoValid = () => {
        if (this.state.batchNo.length > 0) {
            this.setState({batchNoValid: true})
        }
    }

    handleCostPrice = (value) => {
        this.setState({ costPrice: value });
    };

    handleCostPriceValid = () => {
        if (this.state.costPrice.length > 0) {
            this.setState({costPriceValid: true})
        }
    }

    handleListPrice = (value) => {
        this.setState({ listPrice: value });
    };

    handleListPriceValid = () => {
        if (this.state.listPrice.length > 0) {
            this.setState({listPriceValid: true})
        }
    }


    handleStore = (value) => {
        console.log("value", this.state.storeNamesArray);
        for (let i = 0; i < this.state.storeNamesArray.length; i++) {
            if (this.state.storeNamesArray[i].name === value) {
                this.setState({ selectedstoreId: this.state.storeNamesArray[i].id });
            }
        }
        console.log(this.state.selectedstoreId);

        this.setState({ store: value });
    };

    handleEMPId = (value) => {
        this.setState({ empId: value });
    };

    handleEMPIdValid = () => {
        if (this.state.empId >= 3) {
            this.setState({empValid: true})
        }
    }

    handleQuantity = (value) => {
        this.setState({ quantity: value });
    };

    handleQuantityValid = () => {
        if (this.state.quantity.length > 0) {
            this.setState({qtyValid: true})
        }
    }

    validationForm() {

        let isFormValid = true
        let errors = {}

        
        if (this.state.name.length < errorLength.name) {
            isFormValid = false
            errors["name"] = inventoryErrorMessages.name
            this.setState({nameValid: false})
        }

        if (this.state.divisionId === null) {
            isFormValid = false
            errors["divison"] = inventoryErrorMessages.divisionId
            this.setState({divisionValid: false})
        }
        if (this.state.sectionId === null) {
            isFormValid = false
            errors["section"] = inventoryErrorMessages.sectionId
            this.setState({sectionValid: false})
        }
        if (this.state.subsectionId === null) {
            isFormValid = false
            errors["subSection"] = inventoryErrorMessages.subSectionId
            this.setState({subSectionValid: false})
        }
        if (this.state.catogirieId === null) {
            isFormValid = false
            errors["category"] = inventoryErrorMessages.category
            this.setState({categoryValid: false})
        }
        if (String(this.state.colour).length < errorLength.colour) {
            isFormValid = false
            errors["color"] = inventoryErrorMessages.colour
            this.setState({colorValid: false})
        }
        if (String(this.state.batchNo).length === 0) {
            isFormValid = false
            errors["batchNo"] = inventoryErrorMessages.batchNo
            this.setState({batchNoValid: false})
        }
        if (this.state.costPrice === null) {
            isFormValid = false
            errors["costPrice"] = inventoryErrorMessages.costPrice
            this.setState({costPriceValid: false})
        }
        if (this.state.listPrice === null) {
            isFormValid = false
            errors["listPrice"] = inventoryErrorMessages.listPrice
            this.setState({listPriceValid: false})
        }
        if (this.state.uomId === null) {
            isFormValid = false
            errors["uom"] = inventoryErrorMessages.uom
            this.setState({uomValid: false})
        }
        if (this.state.hsnId === null) {
            isFormValid = false
            errors["hsn"] = inventoryErrorMessages.hsnCode
            this.setState({hsnValid: false})
        }
        if (String(this.state.empId).length < errorLength.empId) {
            isFormValid = false
            errors["emp"] = inventoryErrorMessages.empId
            this.setState({empValid: false})
        }
        if (this.state.store === undefined) {
            isFormValid = false
            errors["store"] = accountingErrorMessages.store
            this.setState({storeValid: false})
        }
        if (String(this.state.quantity).length === 0) {
            isFormValid = false
            errors["qty"] = inventoryErrorMessages.qty
            this.setState({qtyValid: false})
        }

        this.setState({errors: errors})
        return isFormValid
    }

    saveBarcode() {
        console.log(this.state.store);
        const isFormValid = this.validationForm()
        if(isFormValid) {
            const params = {
                "division": parseInt(this.state.divisionId),
                "section": parseInt(this.state.sectionId),
                "subSection": parseInt(this.state.subsectionId),
                "category": parseInt(this.state.catogirieId),
                "batchNo": this.state.batchNo,
                "name": this.state.name,
                "colour": this.state.colour,
                "costPrice": this.state.costPrice,
                "empId": this.state.empId,
                "hsnCode": parseInt(this.state.hsnId),
                "itemMrp": this.state.listPrice,
                "domainId": 1,
                "qty": this.state.quantity,
                "storeId": this.state.selectedstoreId,
                "uom": this.state.uomName,
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
        // const [divisionValid, sectionValid, subSectionValid, categoryValid, colorValid, nameValid, batchNoValid, costPriceValid, listPriceValid, uomValid, hsnValid,empValid, storeValid, qtyValid] = this.state
        const divisionValid = this.state.divisionValid
        const sectionValid = this.state.sectionValid
        const subSectionValid = this.state.subSectionValid
        const categoryValid = this.state.categoryValid
        const colorValid = this.state.colorValid
        const nameValid = this.state.nameValid
        const batchNoValid = this.state.batchNoValid
        const costPriceValid = this.state.costPriceValid
        const listPriceValid = this.state.listPriceValid
        const uomValid = this.state.uomValid
        const hsnValid = this.state.hsnValid
        const empValid = this.state.empValid
        const storeValid = this.state.storeValid
        const qtyValid = this.state.qtyValid
        return (
            <View style={styles.mainContainer}>
                {this.state.loading &&
                    <Loader
                        loading={this.state.loading} />
                }
                <View style={headerTitleContainer}>
                    <View style={headerTitleSubContainer}>
                    <TouchableOpacity style={[backButton]} onPress={() => this.handleBackButtonClick()}>
                        <Image style={backButtonImage} source={require('../assets/images/backButton.png')} />
                    </TouchableOpacity>
                    <Text style={headerTitle}> {I18n.t("Add Barcode")} </Text>
                    </View>
                </View>
                <ScrollView>
                    <Text style={inputHeading}>{I18n.t("Division")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={[rnPickerContainer, {borderColor: divisionValid ? '#8F9EB718' : '#dd0000'}]}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Division'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color={divisionValid ? "gray" : "#dd0000"} />;
                            }}
                            items={this.state.divisions}
                            onValueChange={this.handleDivision}
                            style={divisionValid ? rnPicker : rnPickerError}
                            value={this.state.division}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                            {!divisionValid && <Message imp={true} message={this.state.errors["divison"]} />}
                    <Text style={inputHeading}>{I18n.t("Section")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={[rnPickerContainer, {borderColor: sectionValid ? '#8F9EB718' : '#dd0000'}]}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Section'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color={sectionValid ? "gray" : "#dd0000"} />;
                            }}
                            items={this.state.secions}
                            onValueChange={this.handleSection}
                            style={sectionValid ? rnPicker : rnPickerError}
                            value={this.state.section}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                        {!sectionValid && <Message imp={true} message={this.state.errors["section"]} />}
                    <Text style={inputHeading}>{I18n.t("Sub Section")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={[rnPickerContainer, {borderColor: subSectionValid ? '#8F9EB718' : '#dd0000'}]}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Sub Section'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color={subSectionValid ? "gray" : "#dd0000"} />;
                            }}
                            items={this.state.subsecions}
                            onValueChange={this.handleSubSection}
                            style={subSectionValid ? rnPicker : rnPickerError}
                            value={this.state.subSection}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                        {!subSectionValid && <Message imp={true} message={this.state.errors["subSection"]} />}
                    <Text style={inputHeading}>{I18n.t("Category")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={[rnPickerContainer, {borderColor: categoryValid ? '#8F9EB718' : '#dd0000'}]}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Category'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color={categoryValid ? "gray" : "#dd0000"} />;
                            }}
                            items={this.state.catogiries}
                            onValueChange={this.handleCateory}
                            style={categoryValid ? rnPicker : rnPickerError}
                            value={this.state.category}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                        {!categoryValid && <Message imp={true} message={this.state.errors["category"]} />}
                    <Text style={inputHeading}> {I18n.t("Colour")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={[inputField, {borderColor: colorValid ? '#8F9EB718' : '#dd0000'}]}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Colour")}
                        placeholderTextColor={colorValid ? "#6F6F6F17" : "#dd0000"}
                        textAlignVertical="center"
                        maxLength={12}
                        autoCapitalize="none"
                        onBlur={this.handleColourValid}
                        value={this.state.colour}
                        onChangeText={this.handleColour}
                    />
                    {!colorValid && <Message imp={true} message={this.state.errors["color"]} />}
                    <Text style={inputHeading}> {I18n.t("Name")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={[inputField, {borderColor: nameValid ? '#8F9EB718' : '#dd0000'}]}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Name")}
                        placeholderTextColor={nameValid ? "#6F6F6F17" : "#dd0000"}
                        maxLength={25}
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.name}
                        onBlur={this.handleNameValid}
                        onChangeText={this.handleName}
                    />
                    {!nameValid && <Message imp={true} message={this.state.errors["name"]} />}
                    <Text style={inputHeading}>{I18n.t("Batch No")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={[inputField, {borderColor: batchNoValid ? '#8F9EB718' : '#dd0000'}]}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Batch No")}
                        placeholderTextColor={batchNoValid ? "#6F6F6F17" : "#dd0000"}
                        textAlignVertical="center"
                        maxLength={12}
                        autoCapitalize="none"
                        value={this.state.batchNo}
                        onBlur={this.handleBatchNoValid}
                        onChangeText={this.handleBatchNo}
                    />
                    {!batchNoValid && <Message imp={true} message={this.state.errors["batchNo"]} />}
                    <Text style={inputHeading}>{I18n.t("Cost Price")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={[inputField, {borderColor: costPriceValid ? '#8F9EB718' : '#dd0000'}]}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("Cost Price")}
                        keyboardType={'numeric'}
                        textContentType='telephoneNumber'
                        placeholderTextColor={costPriceValid ? "#6F6F6F17" : "#dd0000"}
                        textAlignVertical="center"
                        autoCapitalize="none"
                        maxLength={10}
                        value={this.state.costPrice}
                        onBlur={this.handleCostPriceValid}
                        onChangeText={this.handleCostPrice}
                    />
                    {!costPriceValid && <Message imp={true} message={this.state.errors["costPrice"]} />}
                    <Text style={inputHeading}>{I18n.t("List Price")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={[inputField, {borderColor: listPriceValid ? '#8F9EB718' : '#dd0000'}]}
                        underlineColorAndroid="transparent"
                        placeholder={I18n.t("List Price")}
                        keyboardType={'numeric'}
                        textContentType='telephoneNumber'
                        placeholderTextColor={listPriceValid ? "#6F6F6F17" : "#dd0000"}
                        textAlignVertical="center"
                        autoCapitalize="none"
                        maxLength={10}
                        value={this.state.listPrice}
                        onChangeText={this.handleListPrice}
                        onBlur={this.handleListPriceValid}
                    />
                    {!listPriceValid && <Message imp={true} message={this.state.errors["listPrice"]} />}
                    <Text style={inputHeading}>{I18n.t("UOM")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={[rnPickerContainer, {borderColor: uomValid ? '#8F9EB718' : '#dd0000'}]}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'UOM'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color={uomValid ? "gray" : "#dd0000"} />;
                            }}
                            items={this.state.uom}
                            onValueChange={this.handleUOM}
                            style={uomValid ? rnPicker : rnPickerError}
                            value={this.state.uomName}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    {!uomValid && <Message imp={true} message={this.state.errors["uom"]} />}
                    <Text style={inputHeading}>{I18n.t("HSN Code")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={[rnPickerContainer, {borderColor: hsnValid ? '#8F9EB718' : '#dd0000'}]}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'HSN Code'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color={hsnValid ? "gray" : "#dd0000"} />;
                            }}
                            items={this.state.hsncodes}
                            onValueChange={this.handleHSNCode}
                            style={hsnValid ? rnPicker : rnPickerError}
                            value={this.state.hsnCode}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    {!hsnValid && <Message imp={true} message={this.state.errors["hsn"]} />}
                    <Text style={inputHeading}>{I18n.t("EMP ID")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={[inputField, {borderColor: empValid ? '#8F9EB718' : '#dd0000'}]}
                        underlineColorAndroid="transparent"
                        placeholder="EMP ID"
                        placeholderTextColor={empValid ? "#6F6F6F17" : "#dd0000"}
                        textAlignVertical="center"
                        maxLength={10}
                        autoCapitalize="none"
                        value={this.state.empId}
                        onBlur={this.handleEMPIdValid}
                        onChangeText={this.handleEMPId}
                    />
                    {!empValid && <Message imp={true} message={this.state.errors["emp"]} />}
                    <Text style={inputHeading}>{I18n.t("Store")} <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <View style={[rnPickerContainer, {borderColor: storeValid ? '#8F9EB718' : '#dd0000'}]}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Store'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color={storeValid ? "gray" : "#dd0000"} />;
                            }}
                            items={this.state.storeNames}
                            onValueChange={this.handleStore}
                            style={storeValid ? rnPicker : rnPickerError}
                            value={this.state.store}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    {!storeValid && <Message imp={true} message={this.state.errors["store"]} />}
                    <Text style={inputHeading}>QTY <Text style={{ color: '#aa0000' }}>*</Text> </Text>
                    <TextInput
                        style={[inputField, {borderColor: storeValid ? '#8F9EB718' : '#dd0000'}]}
                        underlineColorAndroid="transparent"
                        placeholder="QTY"
                        placeholderTextColor={storeValid ?"#6F6F6F17" : '#dd0000'}
                        textAlignVertical="center"
                        maxLength={12}
                        autoCapitalize="none"
                        value={this.state.quantity}
                        onBlur={this.handleQuantityValid}
                        onChangeText={this.handleQuantity}
                    />
                    {!qtyValid && <Message imp={true} message={this.state.errors["qty"]} />}
                    <TouchableOpacity style={submitBtn}
                        onPress={() => this.saveBarcode()}>
                        <Text style={submitBtnText}>{I18n.t("SAVE")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={cancelBtn}
                        onPress={() => this.cancel()}>
                        <Text style={cancelBtnText}>{I18n.t("CANCEL")}</Text>
                    </TouchableOpacity>
                    <View style={styles.bottomContainer} ></View>
                </ScrollView>
            </View>
        );
    }
}

export default AddBarcode;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#ffffff'
    },
    imagealign: {
        marginTop: Device.isTablet ? 25 : RW(20),
        marginRight: Device.isTablet ? 30 :RW(20),
    },
    bottomContainer: {
        margin: 50,
    },
    errorRecords: {
        color: '#dd0000',
        fontSize: Device.isTablet ? 17 : RW(12),
        marginLeft: RW(30),
    },

    // Styles For Mobiles
    viewsWidth_mobile: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: RF(24),
        height: RH(70),
    },
    backButton_mobile: {
        position: 'absolute',
        left: 10,
        top: 10,
        width: RW(40),
        height: RH(40),
    },
    headerTitle_mobile: {
        position: 'absolute',
        left: RW(70),
        top: RW(27),
        width: RW(300),
        height: RH(20),
        fontFamily: 'bold',
        fontSize: RF(18),
        color: '#353C40'
    },
    input_mobile: {
        justifyContent: 'center',
        marginLeft: RW(20),
        marginRight: RW(20),
        height: RH(44),
        marginTop: RH(5),
        marginBottom: RH(10),
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: RW(15),
        fontSize: RF(14),
    },
    inputError_mobile: {
        justifyContent: 'center',
        marginLeft: RW(20),
        marginRight: RW(20),
        height: RH(44),
        marginTop: RH(5),
        marginBottom: RH(10),
        borderColor: '#dd0000',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: RW(15),
        fontSize: RF(14),
    },
    rnSelect_mobile: {
        color: '#8F9EB718',
        fontSize: RF(15)
    },
    rnSelectContainer_mobile: {
        justifyContent: 'center',
        margin: RW(20),
        height: RH(44),
        marginTop: RH(5),
        marginBottom: RH(10),
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: RW(15),
        fontSize: RF(14),
    },
    rnSelectContainerError_mobile: {
        justifyContent: 'center',
        margin: RW(20),
        height: RH(44),
        marginTop: RH(5),
        marginBottom: RH(10),
        borderColor: '#dd0000',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: RW(15),
        fontSize: RF(14),
    },
    saveButton_mobile: {
        margin: RH(8),
        height: RH(50),
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    saveButtonText_mobile: {
        textAlign: 'center',
        marginTop: RH(15),
        color: "#ffffff",
        fontSize: RF(15),
        fontFamily: "regular"
    },
    cancelButton_mobile: {
        margin: RH(8),
        height: RW(50),
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#353C4050",
    },
    cancelButtonText_mobile: {
        textAlign: 'center',
        marginTop: RH(15),
        color: "#353C4050",
        fontSize: RF(15),
        fontFamily: "regular"
    },

    // Styles For Tablet
    viewsWidth_tablet: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: RF(28),
        height: RH(90),
    },
    backButton_tablet: {
        position: 'absolute',
        left: RW(10),
        top: RW(20),
        width: RW(90),
        height: RH(90),
    },
    headerTitle_tablet: {
        position: 'absolute',
        left: RW(70),
        top: RH(32),
        width: RW(300),
        height: RH(40),
        fontFamily: 'bold',
        fontSize: RF(24),
        color: '#353C40'
    },
    input_tablet: {
        justifyContent: 'center',
        marginLeft: RW(20),
        marginRight: RW(20),
        height: RH(54),
        marginTop: 5,
        marginBottom: RH(10),
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: RW(15),
        fontSize: RF(20),
    },
    inputError_tablet: {
        justifyContent: 'center',
        marginLeft: RW(20),
        marginRight: RW(20),
        height: RH(54),
        marginTop: 5,
        marginBottom: RH(10),
        borderColor: '#dd0000',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 2,
        fontFamily: 'regular',
        paddingLeft: RW(15),
        fontSize: RF(20),
    },
    rnSelect_tablet: {
        color: '#8F9EB718',
        fontSize: 20
    },
    rnSelectContainer_tablet: {
        justifyContent: 'center',
        margin: RH(20),
        height: RH(54),
        marginTop: 5,
        marginBottom: RH(10),
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: RH(15),
        fontSize: RF(20),
    },
    rnSelectContainerError_tablet: {
        justifyContent: 'center',
        margin: RW(20),
        height: RH(54),
        marginTop: 5,
        marginBottom: RH(10),
        borderColor: '#dd0000',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 2,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: RF(20),
    },
    saveButton_tablet: {
        margin: RH(8),
        height: RH(60),
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    saveButtonText_tablet: {
        textAlign: 'center',
        marginTop: 15,
        color: "#ffffff",
        fontSize: RF(20),
        fontFamily: "regular"
    },
    cancelButton_tablet: {
        margin: RW(8),
        height: RH(60),
        backgroundColor: "#ffffff",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#353C4050",
    },
    cancelButtonText_tablet: {
        textAlign: 'center',
        marginTop: RH(15),
        color: "#353C4050",
        fontSize: RF(20),
        fontFamily: "regular"
    },
});
