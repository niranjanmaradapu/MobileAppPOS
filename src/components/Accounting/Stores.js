import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import UrmService from '../services/UrmService';
var deviceWidth = Dimensions.get("window").width;

export class Stores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storesDelete: false,
            modalVisible: true,
        };
    }

    deleteStore = (item, index) => {
        alert("you have deleted store" + index);
    };

    storeModelCancel() {
        this.setState({ modalVisible: false });
    }

    handledeleteStore(item, index) {
        this.setState({ storesDelete: true, modalVisible: true });
    }

    handleeditStore(item, index) {
        console.log(item);
        this.props.navigation.navigate('AddStore'
            , {
                item: item, isEdit: true,
                onGoBack: () => this.updateStore(),
            });
    }

    updateStore() {
        // this.props.getStoresList()
    }

    modelCancel() {
        this.props.modelCancelCallback();
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.stores}
                    style={{ marginTop: 20, }}
                    scrollEnabled={true}
                    renderItem={({ item, index }) => (
                        <View style={Device.isTablet ? flats.flatlistContainer_tablet : flats.flatlistContainer_mobile} >
                            <View style={Device.isTablet ? flats.flatlistSubContainer_tablet : flats.flatlistSubContainer_mobile}>
                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextAccent_tablet : flats.flatlistTextAccent_mobile} >STORE ID: {index + 1} </Text>
                                    <Text style={Device.isTablet ? flats.flatlistText_tablet : flats.flatlistText_mobile}>STORE NAME: {"\n"} {item.name}</Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>DOMAIN: {"\n"} {item.clientDomianlId.domaiName} </Text>
                                </View>
                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>LOCATION:  {"\n"} {item.cityId} </Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>CREATED BY: {"\n"} {item.createdBy}</Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>CREATED DATE: {"\n"} {item.createdDate} </Text>
                                </View>
                                <View style={flats.buttons}>
                                    <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.handleeditStore(item, index)}>
                                        <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/edit.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handledeleteStore(item, index)}>
                                        <Image style={{ alignSelf: 'center', top: 5 }} source={require('../assets/images/delete.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
                {this.state.storesDelete && (
                    <View>
                        <Modal isVisible={this.state.modalVisible}>

                            <View style={[Device.isTablet ? styles.filterMainContainer_tablet : styles.filterMainContainer_mobile, { height: Device.isTablet ? 350 : 250 }]}>

                                <Text style={Device.isTablet ? styles.filterByTitle_tablet : styles.filterByTitle_mobile}> Delete Store </Text>

                                <TouchableOpacity style={Device.isTablet ? styles.filterCloseButton_tablet : styles.filterCloseButton_mobile} onPress={() => this.storeModelCancel()}>
                                    <Image style={Device.isTablet ? styles.filterCloseImage_tablet : styles.filterCloseImage_mobile} source={require('../assets/images/modelcancel.png')} />
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
                                }}> Are you sure want to delete Store?  </Text>
                                <TouchableOpacity
                                    style={[Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile, { marginTop: Device.isTablet ? 75 : 55 }]} onPress={() => this.deleteStore(item, index)}
                                >
                                    <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile}  > DELETE </Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile} onPress={() => this.storeModelCancel()}
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


export class FilterStores extends Component {


    constructor(props) {
        super(props);
        this.state = {
            city: "",
            storeDistrict: "",
            storeState: "",
            modalFalse: false,
            statesArray: [],
            states: [],
            stateId: 0,
            statecode: '',
            dictrictArray: [],
            dictricts: [],
            dictrictId: 0,
            filterStores: [],
        };
    }

    async componentDidMount() {
        this.getMasterStatesList();
    }


    getMasterStatesList() {
        this.setState({ states: [] });
        this.setState({ loading: false });
        var states = [];
        axios.get(UrmService.getStates()).then((res) => {
            if (res.data["result"]) {

                for (var i = 0; i < res.data["result"].length; i++) {
                    this.state.statesArray.push({ name: res.data["result"][i].stateName, id: res.data["result"][i].stateId, code: res.data["result"][i].stateCode });
                    states.push({
                        value: this.state.statesArray[i].name,
                        label: this.state.statesArray[i].name
                    });
                    this.setState({
                        states: states,
                    });
                    this.setState({ statesArray: this.state.statesArray });
                }
            }

        });
    }

    handleStoreState = (value) => {
        for (let i = 0; i < this.state.statesArray.length; i++) {
            if (this.state.statesArray[i].name === value) {
                this.setState({ stateId: this.state.statesArray[i].id });
                this.setState({ statecode: this.state.statesArray[i].code });

            }
        }
        this.getMasterDistrictsList();
        this.setState({ storeState: value });
    };


    getMasterDistrictsList() {
        this.setState({ dictricts: [] });
        this.setState({ dictrictArray: [] });
        this.setState({ loading: false });
        var dictricts = [];
        const params = {
            "stateCode": this.state.statecode
        };
        axios.get(UrmService.getDistricts(), { params }).then((res) => {
            if (res.data["result"]) {
                console.log(res.data);
                for (var i = 0; i < res.data["result"].length; i++) {
                    this.state.dictrictArray.push({ name: res.data["result"][i].districtName, id: res.data["result"][i].districtId });
                    dictricts.push({
                        value: this.state.dictrictArray[i].name,
                        label: this.state.dictrictArray[i].name
                    });
                    this.setState({
                        dictricts: dictricts,
                    });
                    this.setState({ dictrictArray: this.state.dictrictArray });
                }
            }

        });
    }

    handleDistrict = (value) => {
        for (let i = 0; i < this.state.dictrictArray.length; i++) {
            if (this.state.dictrictArray[i].name === value) {
                this.setState({ districtId: this.state.dictrictArray[i].id });
            }
        }
        this.setState({ storeDistrict: value });
    };


    handleCity = (value) => {
        this.setState({ city: value });
    };

    handleStore = (value) => {
        this.setState({ storeState: value });
    };

    handleDistrict = (value) => {
        this.setState({ storeDistrict: value });
    };

    applyStoreFilter() {
        //  alert("Applied");
        const searchStore = {
            "stateId": this.state.storeState,
            "cityId": this.state.city,
            "districtId": this.state.storeDistrict,
            "storeName": null
        };

        axios.post(UrmService.getStoresBySearch(), searchStore).then((res) => {
            if (res) {
                this.setState({ filterStores: res.data.result });
                this.props.childParams(this.state.filterStores);
                console.log(res.data);
                this.props.modelCancelCallback();
            } else {
                this.props.modelCancelCallback();
            }

        });
    }

    modelCancel() {
        this.props.modelCancelCallback();
    }

    render() {
        return (

            <Modal isVisible={this.props.modalVisible}>
                <View style={Device.isTablet ? styles.filterMainContainer_tablet : styles.filterMainContainer_mobile} >
                    <KeyboardAwareScrollView enableOnAndroid={true} >
                        <Text style={Device.isTablet ? styles.filterByTitle_tablet : styles.filterByTitle_mobile} > Filter by </Text>
                        <TouchableOpacity style={Device.isTablet ? styles.filterCloseButton_tablet : styles.filterCloseButton_mobile} onPress={() => this.modelCancel()}>
                            <Image style={Device.isTablet ? styles.filterCloseImage_tablet : styles.modelCancelImage_mobile} source={require('../assets/images/modelcancel.png')} />
                        </TouchableOpacity>
                        <Text style={Device.isTablet ? styles.filterByTitleDecoration_tablet : styles.filterByTitleDecoration_mobile}>
                        </Text>

                        <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                            <RNPickerSelect
                                style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                                placeholder={{
                                    label: 'STATE'
                                }}
                                Icon={() => {
                                    return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                }}
                                items={this.state.states}
                                onValueChange={this.handleStoreState}
                                style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                                value={this.state.storeState}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                        <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                            <RNPickerSelect
                                style={Device.isTablet ? styles.rnSelect_tablet : styles.rnSelect_mobile}
                                placeholder={{
                                    label: 'DISTRICT'
                                }}
                                Icon={() => {
                                    return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                }}
                                items={this.state.dictricts}
                                onValueChange={this.handleDistrict}
                                style={Device.isTablet ? pickerSelectStyles_tablet : pickerSelectStyles_mobile}
                                value={this.state.storeDistrict}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                        <TextInput
                            style={Device.isTablet ? styles.input_tablet : styles.input_mobile}
                            underlineColorAndroid="transparent"
                            placeholder="CITY"
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.city}
                            onChangeText={this.handleCity}
                        />
                        <TouchableOpacity style={Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile}
                            onPress={() => this.applyStoreFilter()}>
                            <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile} >APPLY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile}
                            onPress={() => this.modelCancel()}>
                            <Text style={Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile}>CANCEL</Text>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>
                </View>
            </Modal>

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
        marginTop: 16,
        marginRight: 20,
    },

    // Styles For Mobile

    filterMainContainer_mobile: {
        width: deviceWidth,
        alignItems: 'center',
        marginLeft: -20,
        backgroundColor: "#ffffff",
        height: 400,
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
        top: 10,
        right: 0,
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
    flatlistContainer_mobile: {
        height: 150,
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
        height: 500,
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
    flatlistContainer_tablet: {
        height: 200,
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
        width: 40,
        height: 40,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
        // borderRadius:5,
    },
    deleteButton_tablet: {
        width: 40,
        height: 40,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        borderWidth: 1,
        borderColor: "lightgray",
    },




});