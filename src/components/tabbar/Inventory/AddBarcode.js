import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { Chevron } from 'react-native-shapes';
import Loader from '../../loader';
import Device from 'react-native-device-detection';
import RNPickerSelect from 'react-native-picker-select';

var deviceWidth = Dimensions.get('window').width;

 class AddBarcode extends Component {

    constructor(props){
        super(props);
        this.state = {
            division: "",
            section: "",
            subSection: "",
            category: "",
            colour: "",
            batchNo: "",
            costPrice: 0,
            listPrice: 0,
            uom: "",
            hsnCode: "",
            store: "",
            empId: "",
            quantity: "",
        }
    }


    handleBackButtonClick() {
        this.props.navigation.navigate('Inventory')
    }

    handleDivision = (value) => {
        this.setState({ division: value })
    }

    handleSection = (value) => {
        this.setState({ section: value })
    }

    handleSubSection = (value) => {
        this.setState({ subSection: value })
    }
    handleCateory = (value) => {
        this.setState({ category: value })
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

    handleUOM = (value) => {
        this.setState({ uom: value })
    }

    handleHSNCode = (value) => {
        this.setState({ hsnCode: value })
    }

    handleStore = (value) => {
        this.setState({ store: value })
    }

    handleEMPId = (value) => {
        this.setState({ empId: value })
    }

    handleQuantity = (value) => {
        this.setState({ quantity: value })
    }

    saveBarcode() {
        if (String(this.state.division).length === 0) {
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
        else if(String(this.state.colour).lenght === 0) {
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
                        <Image source={require('../../assets/images/backButton.png')} />
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
                            items={[
                                {label: 'mens', value: 'mens'},
                                {label: 'ladies', value: 'ladies'},
                                {label: 'kids', value: 'kids'}
                            ]}
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
                            items={[

                            ]}
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
                            items={[

                            ]}
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
                            items={[

                            ]}
                            onValueChange={this.handleCateory}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.Category}
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
                            placeholder="Last Price"
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
                            items={[

                            ]}
                            onValueChange={this.handleUOM}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.uom}
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
                            items={[

                            ]}
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
                            items={[

                            ]}
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
