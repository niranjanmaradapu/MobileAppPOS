import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { Chevron } from 'react-native-shapes';
import Loader from '../../commonUtils/loader';
import Device from 'react-native-device-detection';
import RNPickerSelect from 'react-native-picker-select';
import InventoryService from '../services/InventoryService';
import LoginService from '../services/LoginService';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

var deviceWidth = Dimensions.get('window').width;

 class AddBarcode extends Component {

    constructor(props){
        super(props);
        this.state = {
            division: '',
            section: "",
            subSection: "",
            category: "",
            colour: "",
            batchNo: "",
            costPrice: 0,
            listPrice: 0,
            uomName: "",
            hsnCode: "",
            store: "",
            empId: "",
            quantity: "",
            divisionArray:[],
            divisions:[],
            divisionId:0,
            secionArray:[],
            secions:[],
            sectionId:0,
            subsecionArray:[],
            subsecions:[],
            subsectionId:0,
            catogiriesArray:[],
            catogiries:[],
            catogirieId:0,
            uom:[],
            uomArray:[],
            uomId:0,
            hsncodes:[],
            hsncodesArray:[],
            hsnId:"",
            storeNamesArray: [],
            storeNames: [],
            storeId: 1,
            domainId: 1,
        }
    }

    componentDidMount(){
        var domainStringId = ""
        var storeStringId = ""
        AsyncStorage.getItem("domainDataId").then((value) => {
            domainStringId = value
            this.setState({ domainId: parseInt(domainStringId) })
            console.log("domain data id" + this.state.domainId)
            this.getAllpools()

        }).catch(() => {
            console.log('there is error getting domainDataId')
        })
        this.getAllDivisions()
        this.getAllCatogiries()
        this.getAllUOM()
        this.getAllHSNCodes()
        this.getAllstores()
    }
    
    getAllDivisions() {
        var divisions = [];
        axios.get(InventoryService.getAllDivisions(),).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {
                  
                    this.state.divisionArray.push({ name: res.data["result"][i].name, id:  res.data["result"][i].id })
                 
                    divisions.push({
                        value: this.state.divisionArray[i].name,
                        label: this.state.divisionArray[i].name
                    });
                    console.log(this.state.divisionArray)
                    this.setState({
                        divisions: divisions,
                    })
                  
                    this.setState({ divisionArray: this.state.divisionArray })
                }
            }
            
        });
      }
    
    
      getAllSections() {
        const params = {
            "id": this.state.divisionId
        }
        var secions = [];
        axios.get(InventoryService.getAllSections(),{params}).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {
                  
                    this.state.secionArray.push({ name: res.data["result"][i].name, id:  res.data["result"][i].id })
                 
                    secions.push({
                        value: this.state.secionArray[i].name,
                        label: this.state.secionArray[i].name
                    });
                 
                    this.setState({
                        secions: secions,
                    })
                  
                    this.setState({ secionArray: this.state.secionArray })
                }
            }
            
        });
      }
    
      getAllSubsections() {
        const params = {
            "id": this.state.sectionId
        }
        var subsecions = [];
        axios.get(InventoryService.getAllSections(),{params}).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {
                  
                    this.state.subsecionArray.push({ name: res.data["result"][i].name, id:  res.data["result"][i].id })
                 
                    subsecions.push({
                        value: this.state.subsecionArray[i].name,
                        label: this.state.subsecionArray[i].name
                    });
                    console.log(this.state.subsecionArray)
                    this.setState({
                        subsecions: subsecions,
                    })
                  
                    this.setState({ subsecionArray: this.state.subsecionArray })
                }
            }
            
        });
      }

      getAllCatogiries() {
        var catogiries = [];
        axios.get(InventoryService.getAllCategories()).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {
                  
                    this.state.catogiriesArray.push({ name: res.data["result"][i].name, id:  res.data["result"][i].id })
                 
                    catogiries.push({
                        value: this.state.catogiriesArray[i].name,
                        label: this.state.catogiriesArray[i].name
                    });
                 
                    this.setState({
                        catogiries: catogiries,
                    })
                  
                    this.setState({ catogiriesArray: this.state.catogiriesArray })
                }
            }
            
        });
      
      }

      getAllUOM(){
        var uom = [];
        axios.get(InventoryService.getUOM()).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {
                    this.state.uomArray.push({ name: res.data["result"][i].uomName, id:  res.data["result"][i].id })
                    console.log(this.state.uomArray)
                    uom.push({
                        value: this.state.uomArray[i].name,
                        label: this.state.uomArray[i].name
                    });
                 
                    this.setState({
                        uom: uom,
                    })
                  
                    this.setState({ uomArray: this.state.uomArray })
                }
            }
            
        });  
      }

      getAllHSNCodes(){
        var hsncodes = [];
        axios.get(InventoryService.getAllHsnList()).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {
                    this.state.hsncodesArray.push({ name: res.data["result"][i].hsnCode, id:  res.data["result"][i].id })
                    console.log(res.data["result"])
                    hsncodes.push({
                        value: this.state.hsncodesArray[i].name,
                        label: this.state.hsncodesArray[i].name
                    });
                 
                    this.setState({
                        hsncodes: hsncodes,
                    })
                  
                    this.setState({ hsncodesArray: this.state.hsncodesArray })
                }
            }
            
        });  
      }

      async getAllstores(){
        const username = await AsyncStorage.getItem("username");
        var storeNames = [];
        axios.get(LoginService.getUserStores() + username).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {
                    let number = res.data.result[i]
                    const myArray = []
                    myArray = number.split(":");
                    this.state.storeNamesArray.push({ name: myArray[0], id: myArray[1] })
                    console.log(this.state.storeNamesArray)
                    storeNames.push({
                        value: this.state.storeNamesArray[i].name,
                        label: this.state.storeNamesArray[i].name
                    });
                    this.setState({
                        storeNames: storeNames,
                    })

                    this.setState({ storeNamesArray: this.state.storeNamesArray })

                }

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
              this.setState({ divisionId: this.state.divisionArray[i].id })
            }   
        }
        this.getAllSections()
        this.setState({ division: value })
    }

    handleSection = (value) => {
        for (let i = 0; i < this.state.secionArray.length; i++) {
            if (this.state.secionArray[i].name === value) {
              this.setState({ sectionId: this.state.secionArray[i].id })
            }   
        }
        this.getAllSubsections()
        this.setState({ section: value })
    }

    handleSubSection = (value) => {
        for (let i = 0; i < this.state.subsecionArray.length; i++) {
            if (this.state.subsecionArray[i].name === value) {
              this.setState({ subsectionId: this.state.subsecionArray[i].id })
            }   
        }
        this.setState({ subSection: value })
    }
    handleCateory = (value) => {
        for (let i = 0; i < this.state.catogiriesArray.length; i++) {
            if (this.state.catogiriesArray[i].name === value) {
              this.setState({ catogirieId: this.state.catogiriesArray[i].id })
            }   
        }
        this.setState({ category: value })
    }

    handleUOM = (value) => {
        for (let i = 0; i < this.state.uomArray.length; i++) {
            if (this.state.uomArray[i].name === value) {
              this.setState({ uomId: this.state.uomArray[i].id })
            }   
        }
        this.setState({ uomName: value })
    }

    handleHSNCode = (value) => {
        for (let i = 0; i < this.state.hsncodesArray.length; i++) {
            if (this.state.hsncodesArray[i].name === value) {
              this.setState({ hsnId: this.state.hsncodesArray[i].id })
            }   
        }
        this.setState({ hsnCode: value })
    }

    handleColour = (value) => {
        this.setState({ colour: value })
    }

    handleBatchNo = (value) => {
        this.setState({ batchNo: value })
    }

    handleCostPrice = (value) => {
        this.setState({ costPrice: value })
    }

    handleListPrice = (value) => {
        this.setState({ listPrice: value })
    }

   

    handleStore = (value) => {
        for (let i = 0; i < this.state.storeNamesArray.length; i++) {
            if (this.state.storeNamesArray[i].name === value) {
                this.setState({ selectedstoreId: this.state.storeNamesArray[i].id })
            }   
        }

        this.setState({ store: value })
    }

    handleEMPId = (value) => {
        this.setState({ empId: value })
    }

    handleQuantity = (value) => {
        this.setState({ quantity: value })
    }

    saveBarcode() {
        if (this.state.divisionId.length === 0) {
            alert("please select the Division");
        }
        else if(String(this.state.section).length === 0) {
            alert("please select the Section");
        }
        else if(String(this.state.subSection).length === 0) {
            alert("please select the Sub Section");
        }
        else if(String(this.state.category).length === 0) {
            alert("please select the category");
        }
        else if(String(this.state.colour).length === 0) {
            alert("please enter the Colour");
        }
        else if(String(this.state.batchNo).length === 0) {
            alert("please enter the Batch No");
        }
        else if(String(this.state.costPrice).length === 0) {
            alert("please enter the Cost Price");
        }
        else if(String(this.state.listPrice).length === 0) {
            alert("please enter the List price")
        }
        else if(String(this.state.uom).length === 0) {
            alert("please select the UOM");
        }
        else if(String(this.state.hsnCode).length === 0) {
            alert("please enter the Hsn code");
        }
        else if(String(this.state.empId).length === 0) {
            alert("please enter the Emp ID");
        }
        else if(String(this.state.store).length === 0) {
            alert("please select the Store");
        }
        else if(String(this.state.quantity) === 0) {
            alert("please enter the Qty");
        }
        else {
            const params = {
                    "division":this.state.divisionId,
                    "section":this.state.sectionId,
                    "subSection":this.state.subsectionId,
                    "category":this.state.catogirieId,
                    "batchNo":this.state.batchNo,
                    "colour":this.state.colour,
                    "productTextile": {
                       "costPrice": this.state.costPrice,
                       "empId":this.state.empId,
                       "hsnMasterId": this.state.hsnId,
                       "itemMrp": this.state.listPrice,
                       "qty":this.state.quantity,
                       "storeId":this.state.storeId ,
                       "uom": this.state.uomName,
                     }
              }
              console.log('params are' + JSON.stringify(params))
              this.setState({ loading: true })
              axios.post(InventoryService.addTextileBarcodes(), params).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                  console.log(`inventory added successfully`);
                 // this.props.route.params.onGoBack();
                  this.props.navigation.goBack();
                }
                else {
                  this.setState({ loading: false })
                  alert("duplicate record already exists");
                }
              }
              );
            alert("success");
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
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect 
                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
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
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect 
                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
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
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect 
                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
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
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect 
                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
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
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                            underlineColorAndroid="transparent"
                            placeholder="Colour"
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.colour}
                            onChangeText={this.handleColour}
                        />
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                            underlineColorAndroid="transparent"
                            placeholder="Batch No"
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.batchNo}
                            onChangeText={this.handleBatchNo}
                        />
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                            underlineColorAndroid="transparent"
                            placeholder="Cost Price"
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.costPrice}
                            onChangeText={this.handleCostPrice}
                        />
                    <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                            underlineColorAndroid="transparent"
                            placeholder="List Price"
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.listPrice}
                            onChangeText={this.handleListPrice}
                        />
                        <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect 
                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
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
                        <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect 
                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
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
                        <TextInput style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                            underlineColorAndroid="transparent"
                            placeholder="EMP ID"
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.empId}
                            onChangeText={this.handleEMPId}
                        />
                        <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect 
                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
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
        )
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
})

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
})

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#ffffff'
    },
    imagealign: {
        marginTop: 16,
        marginRight: 20,
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
    saveButtonText_mobile:{
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
})
