import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';

var deviceWidth = Dimensions.get('window').width;

export default class AddTaxMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taxRate: "",
            cgst: "",
            sgst: "",
            igst: "",
            cess: "",
            proiorities: [],
            priority: "",
        };
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleTaxRate = (value) => {
        this.setState({ taxRate: value });
    };

    handleCgst = (value) => {
        this.setState({ cgst: value });
    };

    handleSgst = (value) => {
        this.setState({ sgst: value });
    };

    handleIgst = (value) => {
        this.setState({ igst: value });
    };

    handleCess = (value) => {
        this.setState({ cess: value });
    };

    handlePriority = (value) => {
        this.setState({ priority: value });
    };

    saveTax() {
        alert("you have Saved");
    }

    cancel() {
        this.props.navigation.goBack(null);
        return true;
    }


    render() {
        return (
            <View style={styles.mainContainer}>
                {/* {this.state.loading &&
                    <Loader
                        loading={this.state.loading} />
                } */}
                <View style={Device.isTablet ? styles.viewsWidth_tablet : styles.viewsWidth_mobile} >
                    <TouchableOpacity style={Device.isTablet ? styles.backButton_tablet : styles.backButton_mobile} onPress={() => this.handleBackButtonClick()}>
                        <Image source={require('../assets/images/backButton.png')} />
                    </TouchableOpacity>
                    <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}>
                        Add Tax Master
                    </Text>
                </View>
                <TextInput
                    style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                    underlineColorAndroid="transparent"
                    placeholder="HSN CODE"
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.taxRate}
                    onChangeText={this.handleTaxRate}
                />
                <TextInput
                    style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                    underlineColorAndroid="transparent"
                    placeholder="CGST %"
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.cgst}
                    onChangeText={this.handleCgst}
                />
                <TextInput
                    style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                    underlineColorAndroid="transparent"
                    placeholder="SGST %"
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.sgst}
                    onChangeText={this.handleSgst}
                />
                <TextInput
                    style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                    underlineColorAndroid="transparent"
                    placeholder="IGST %"
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.igst}
                    onChangeText={this.handleIgst}
                />
                <TextInput
                    style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                    underlineColorAndroid="transparent"
                    placeholder="CESS %"
                    placeholderTextColor="#6F6F6F"
                    textAlignVertical="center"
                    autoCapitalize="none"
                    value={this.state.cess}
                    onChangeText={this.handleCess}
                />
                <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                    <RNPickerSelect
                        style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                        placeholder={{
                            label: 'SELECT PRIORITY'
                        }}
                        Icon={() => {
                            return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                        }}
                        items={this.state.proiorities}
                        onValueChange={this.handlePriority}
                        style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                        value={this.state.priority}
                        useNativeAndroidPickerStyle={false}
                    />
                </View>
                <TouchableOpacity style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile}
                    onPress={() => this.saveTax()}>
                    <Text style={Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Device.isTablet ? styles.cancelButton_tablet : styles.cancelButton_mobile}
                    onPress={() => this.cancel()}>
                    <Text style={Device.isTablet ? styles.cancelButtonText_tablet : styles.cancelButtonText_mobile}>CANCEL</Text>
                </TouchableOpacity>
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
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imagealign: {
        marginTop: Device.isTablet ? 25 : 20,
        marginRight: Device.isTablet ? 30 : 20,
    },
    bottomContainer: {
        margin: 50,
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
    flatlistContainer_mobile: {
        height: 140,
        backgroundColor: '#FBFBFB',
        borderBottomWidth: 5,
        borderBottomColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flatlistSubContainer_mobile: {
        flexDirection: 'column',
        width: '100%',
        height: 140,
    },
    rnSelect_mobile: {
        color: '#8F9EB7',
        fontSize: 15
    },
    rnSelectContainer_mobile: {
        justifyContent: 'center',
        height: 44,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        fontSize: 14,
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
    flatlistContainer_tablet: {
        height: 160,
        backgroundColor: '#FBFBFB',
        borderBottomWidth: 5,
        borderBottomColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flatlistSubContainer_tablet: {
        flexDirection: 'column',
        width: '100%',
        height: 160,
    },
    rnSelect_tablet: {
        color: '#8F9EB7',
        fontSize: 20
    },
    rnSelectContainer_tablet: {
        justifyContent: 'center',
        height: 54,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        fontSize: 20,
    },

});
