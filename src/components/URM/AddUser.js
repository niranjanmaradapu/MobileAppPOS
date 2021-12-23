import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { Chevron } from 'react-native-shapes';
import Loader from '../loader';
import axios from 'axios';
import Device from 'react-native-device-detection';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker'

var deviceWidth = Dimensions.get('window').width;

export default class AddUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            dob: "",
            gender: "",
            mobile: "",
            email: "",
            address: "",
            domain: "",
            role: "",
            store: "",
            isSuperAdmin: false,
            date: new Date(),
            doneButtonClicked: false,
        }
    }

    datepickerClicked() {
        this.setState({ datepickerOpen: true })
    }

    datepickerDoneClicked() {
        // if (parseInt(this.state.date.getDate()) < 10) {
            this.setState({ dob: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-0" + this.state.date.getDate() })
        // }
        this.setState({  doneButtonClicked: true, datepickerOpen: false })
    }

    datepickerCancelClicked() {
        this.setState({ date: new Date() })
        this.setState({ datepickerOpen: false })
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    handleName = (value) => {
        this.setState({ name: value });
    } 

    handleAddress = (value) => {
        this.setState({ address: value });
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
                        <Image source={require('../assets/images/backButton.png')} />
                    </TouchableOpacity>
                    <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}>
                        Add User
                    </Text>
                </View>
                <ScrollView>
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Name"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.userName}
                        onChangeText={this.handleName}
                    />
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                            placeholder={{
                                label: 'Gender'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.gender}
                            onValueChange={this.handleGender}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.gender}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <TouchableOpacity
                        style={{
                            width: deviceWidth - 40,
                            marginLeft: 20,
                            marginRight: 20,
                            marginTop: 10,
                            borderColor: '#8F9EB717',
                            borderRadius: 3,
                            height: 50, backgroundColor: "#F6F6F6", borderRadius: 5,
                        }} testID="openModal"

                        onPress={() => this.datepickerClicked()}
                    >
                        <Text style={{
                            marginLeft: 16, marginTop: 20, color: "#6F6F6F", fontSize: 15,
                            fontFamily: "regular"
                        }}  > {this.state.doneButtonClicked == false ? 'DoB' : this.state.dob} </Text>
                        <Image style={{ position: 'absolute', top: 10, right: 0, }} source={require('../assets/images/calender.png')} />
                    </TouchableOpacity>
                    {this.state.datepickerOpen && (
                        <View style={{ height: 280, width: deviceWidth, backgroundColor: 'ffffff' }}>
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    left: 20,
                                    top: 10,
                                    height: 30, backgroundColor: "#ED1C24", borderRadius: 5,
                                }} onPress={() => this.datepickerCancelClicked()}
                            >
                                <Text style={{
                                    textAlign: 'center', marginTop: 5, color: "#ffffff", fontSize: 15,
                                    fontFamily: "regular"
                                }}  > Cancel </Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    right: 20,
                                    top: 10,
                                    height: 30, backgroundColor: "#ED1C24", borderRadius: 5,
                                }} onPress={() => this.datepickerDoneClicked()}
                            >
                                <Text style={{
                                    textAlign: 'center', marginTop: 5, color: "#ffffff", fontSize: 15,
                                    fontFamily: "regular"
                                }}  > Done </Text>

                            </TouchableOpacity>
                            <DatePicker style={{ width: deviceWidth, height: 200, marginTop: 50, }}
                                date={this.state.date}
                                mode={'date'}
                                onDateChange={(date) => this.setState({ date })}
                            />
                        </View>
                    )}
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Mobile"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.mobile}
                        onChangeText={this.handleMobile}
                    />
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Email"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.email}
                        onChangeText={this.handleEmail}
                    />
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        underlineColorAndroid="transparent"
                        placeholder="Name"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.address}
                        onChangeText={this.handleAddress}
                    />
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                            placeholder={{
                                label: 'Domain'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.domain}
                            onValueChange={this.handleDomain}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.domain}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                            placeholder={{
                                label: 'Select Store'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.store}
                            onValueChange={this.handleStore}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.store}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                        <RNPickerSelect
                            style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                            placeholder={{
                                label: 'Role'
                            }}
                            Icon={() => {
                                return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                            }}
                            items={this.state.role}
                            onValueChange={this.handleRole}
                            style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                            value={this.state.role}
                            useNativeAndroidPickerStyle={false}
                        />
                    </View>
                    <TouchableOpacity style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile}
                        onPress={() => this.saveRole()}>
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
        flex: 1,
    },
    imagealign: {
        marginTop: 16,
        marginRight: 20,
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