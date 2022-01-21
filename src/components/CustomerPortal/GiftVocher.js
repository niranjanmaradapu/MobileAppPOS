import React, { Component } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Device from 'react-native-device-detection';
var deviceheight = Dimensions.get('window').height;
var deviceheight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get("window").width;

class GiftVocher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gvNumber: '',
            description: '',
            giftValue: '',
            datepickerOpen: false,
            datepickerendOpen: false,
            date: new Date(),
            enddate: new Date(),
            fromDate: "",
            startDate: "",
            endDate: "",
            toDate: "",
            vochers: [1, 2],
        };
    }

    datepickerClicked() {
        this.setState({ datepickerOpen: true });
    }

    enddatepickerClicked() {
        this.setState({ datepickerendOpen: true });
    }

    handleMobile = (value) => {
        this.setState({ mobile: value });
    };

    datepickerClicked() {
        this.setState({ datepickerOpen: true });
    }

    enddatepickerClicked() {
        this.setState({ datepickerendOpen: true });
    }

    datepickerDoneClicked() {
        // if (parseInt(this.state.date.getDate()) < 10) {
        //     this.setState({ fromDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-0" + this.state.date.getDate() });
        // }
        // else {
        this.setState({ startDate: this.state.date.getFullYear() + "-" + (this.state.date.getMonth() + 1) + "-" + this.state.date.getDate() });
        // }

        this.setState({ doneButtonClicked: true, datepickerOpen: false, datepickerendOpen: false });
    }

    datepickerendDoneClicked() {
        // if (parseInt(this.state.enddate.getDate()) < 10) {
        //     this.setState({ toDate: this.state.enddate.getFullYear() + "-" + (this.state.enddate.getMonth() + 1) + "-0" + this.state.enddate.getDate() });
        // }
        // else {
        this.setState({ endDate: this.state.enddate.getFullYear() + "-" + (this.state.enddate.getMonth() + 1) + "-" + this.state.enddate.getDate() });
        // }
        this.setState({ enddoneButtonClicked: true, datepickerOpen: false, datepickerendOpen: false });
    }


    datepickerCancelClicked() {
        this.setState({ date: new Date(), enddate: new Date(), datepickerOpen: false, datepickerendOpen: false });
    }

    handleGvNumber(text) {
        this.setState({ gvNumber: text });
    }

    handleDescription(text) {
        this.setState({ description: text });
    }

    handleValue(text) {
        this.setState({ giftValue: text });
    }

    handleGiftVocher() {

    }

    render() {
        return (
            <View>
                <Text style={Device.isTablet ? styles.headerText_tablet : styles.hederText_mobile}>Generate Gift Vocher</Text>
                <TextInput
                    style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                    placeholder='GV NUMBER'
                    placeholderTextColor="#6f6f6f60"
                    textAlignVertical="center"
                    keyboardType={'default'}
                    autoCapitalize='none'
                    value={this.state.gvNumber}
                    onChangeText={(text) => this.handleGvNumber(text)}
                />
                <TextInput
                    style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                    placeholder='DESCRIPTION'
                    placeholderTextColor="#6f6f6f60"
                    textAlignVertical="center"
                    keyboardType={'default'}
                    autoCapitalize='none'
                    value={this.state.description}
                    onChangeText={(text) => this.handleDescription(text)}
                />
                <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
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

                </View>
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
                <View >
                    <TextInput
                        style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                        placeholder='ENTER VALUE'
                        placeholderTextColor="#6f6f6f60"
                        textAlignVertical="center"
                        keyboardType={'default'}
                        autoCapitalize='none'
                        value={this.state.giftValue}
                        onChangeText={(text) => this.handleValue(text)}
                    />
                    <TouchableOpacity
                        style={Device.isTablet ? styles.signInButton_tablet : styles.signInButton_mobile}
                        onPress={() => this.handleGiftVocher()}
                    >
                        <Text style={Device.isTablet ? styles.signInButtonText_tablet : styles.signInButtonText_mobile}>Add Gift Vocher</Text>
                    </TouchableOpacity>
                </View>
                <Text style={Device.isTablet ? styles.headerText_tablet : styles.hederText_mobile}>List of Gift Vochers</Text>
                <FlatList
                    style={{ marginTop: 20, marginBottom: 20 }}
                    data={this.state.vochers}
                    scrollEnabled={true}
                    renderItem={({ irem, index }) => (
                        <View style={Device.isTablet ? flats.flatlistContainer_tablet : flats.flatlistContainer_mobile} >
                            <View style={Device.isTablet ? flats.flatlistSubContainer_tablet : flats.flatlistSubContainer_mobile}>
                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextAccent_tablet : flats.flatlistTextAccent_mobile}>S.NO: {index + 1}</Text>
                                    <Text style={Device.isTablet ? flats.flatlistText_tablet : flats.flatlistText_mobile}>GV NUMBER: {"hyd12345"}</Text>
                                </View>
                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>FROM DATE: {"11/1/2022"}</Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>TO DATE: {"18/1/2022"}</Text>
                                    <Text style={Device.isTablet ? flats.flatlistText_tablet : flats.flatlistText_mobile}>VALUE: {"₹1000"}</Text>
                                </View>
                            </View>
                        </View>
                    )}

                />
            </View>

        );
    }
}

export default GiftVocher;

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




});

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
    logoImage: {
        alignSelf: 'center',
        width: 300,
        height: 230,

    },
    containerForActivity: {
        flex: 1,
        backgroundColor: '#623FA0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 20,
        margin: 20
    },
    imagealign: {
        marginTop: 40,
        marginRight: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        height: deviceheight + 40,
        backgroundColor: '#FFFFFF'
    },
    ytdImageValue: {
        alignSelf: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center'
        // alignItems: 'center',
    },

    // Mobile Styles
    hederText_mobile: {
        color: "#353C40",
        fontSize: 20,
        fontFamily: "bold",
        marginLeft: 10,
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        fontSize: 28,
    },
    headerText2_mobile: {
        color: "#353C40",
        fontSize: 20,
        fontFamily: "bold",
        marginLeft: 10,
        marginTop: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        height: 45,
        fontSize: 28,
    },
    bottomImage_mobile: {
        position: 'absolute',
        right: 0,
        bottom: 40,
        width: 162,
        height: 170
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
    signInButton_mobile: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        width: deviceWidth - 40,
        height: 50,
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    signInButtonText_mobile: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 15,
        fontFamily: "regular",
    },
    navigationText_mobile: {
        fontSize: 16,
        color: '#858585',
        fontFamily: "regular",
    },
    navigationButtonText_mobile: {
        color: '#353C40',
        fontSize: 16,
        fontFamily: "bold",
        textDecorationLine: 'underline'
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
        paddingLeft: 15,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        fontSize: 14,
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

    // Tablet Styles
    headerText_tablet: {
        color: "#353C40",
        fontSize: 40,
        fontFamily: "bold",
        marginLeft: 10,
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    headerText2_tablet: {
        color: "#353C40",
        fontSize: 40,
        fontFamily: "bold",
        marginLeft: 10,
        marginTop: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        height: 55,
    },
    bottomImage_tablet: {
        position: 'absolute',
        right: 0,
        bottom: 40,
        width: 202,
        height: 230
    },
    input_tablet: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        height: 60,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 22,
    },
    signInButton_tablet: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        width: deviceWidth - 40,
        height: 60,
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    signInButtonText_tablet: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: "regular",
    },
    navigationText_tablet: {
        fontSize: 22,
        color: '#858585',
        fontFamily: "regular",
    },
    navigationButtonText_tablet: {
        color: '#353C40',
        fontSize: 22,
        fontFamily: "bold",
        textDecorationLine: 'underline'
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
        paddingLeft: 15,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        fontSize: 20,
    },
    filterDateButton_tablet: {
        width: deviceWidth / 2.2,
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
});;
