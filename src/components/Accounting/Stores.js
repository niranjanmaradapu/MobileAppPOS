import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import UrmService from '../services/UrmService';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

export class Stores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storesDelete: false,
            modalVisible: true,
        };
    }

    deleteStore() {
        alert("you have deleted store");
        this.setState({ storesDelete: false, modalVisible: false });
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
        // alert("done");
        this.props.getStoresList();
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
                                    <Text style={Device.isTablet ? flats.flatlistTextAccent_tablet : flats.flatlistTextAccent_mobile} >{I18n.t("STORE ID")}: {item.id} </Text>
                                    <Text style={Device.isTablet ? flats.flatlistText_tablet : flats.flatlistText_mobile}>{I18n.t("STORE NAME")}: {"\n"} {item.name}</Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>{I18n.t("DOMAIN")}: {"\n"} {item.clientDomianlId.domaiName} </Text>
                                </View>
                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>{I18n.t("LOCATION")}:  {"\n"} {item.cityId} </Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>{I18n.t("CREATED BY")}: {"\n"} {item.createdBy}</Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>{I18n.t("CREATED DATE")}: {"\n"} {item.createdDate} </Text>
                                </View>
                                <View style={flats.buttons}>
                                    <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.handleeditStore(item, index)}>
                                        <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/edit.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handledeleteStore(item, index)}>
                                        <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/delete.png')} />

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
                {this.props.storeError.length !== 0 && 
                    <Text style={{ color: '#cc241d', textAlign: "center", fontFamily: "bold", fontSize: Device.isTablet ? 21 : 17, marginTop: deviceHeight/3 }}>&#9888; {this.props.storeError}</Text>
                }
                {this.state.storesDelete && (
                    <View>
                        <Modal isVisible={this.state.modalVisible} style={{ margin: 0 }}>

                            <View style={[Device.isTablet ? styles.filterMainContainer_tablet : styles.filterMainContainer_mobile, { height: Device.isTablet ? 350 : 250, marginTop: Device.isTablet ? deviceHeight - 350 : deviceHeight - 250, backgroundColor: "#ED1C24" }]}>
                                <View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, height: Device.isTablet ? 60 : 50 }}>
                                        <View>
                                            <Text style={{ marginTop: 15, fontSize: Device.isTablet ? 22 : 17, marginLeft: 20, color: '#ffffff' }} > {I18n.t("Delete Store")} </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={{ width: Device.isTablet ? 60 : 50, height: Device.isTablet ? 60 : 50, marginTop: Device.isTablet ? 20 : 15, marginRight: Device.isTablet ? 0 : 0 }} onPress={() => this.storeModelCancel()}>
                                                <Image style={{ margin: 5, height: Device.isTablet ? 20 : 15, width: Device.isTablet ? 20 : 15 }} source={require('../assets/images/modalCloseWhite.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text style={{
                                        height: Device.isTablet ? 2 : 1,
                                        width: deviceWidth,
                                        backgroundColor: 'lightgray',
                                    }}></Text>
                                </View>
                                <View style={{ backgroundColor: '#ffffff', height: Device.isTablet ? 300 : 200, }}>
                                    <Text style={{
                                        // position: 'absolute',
                                        // top: 70,
                                        height: Device.isTablet ? 40 : 20,
                                        textAlign: 'center',
                                        fontFamily: 'regular',
                                        fontSize: Device.isTablet ? 23 : 18,
                                        color: '#353C40',
                                        marginTop: 15,
                                    }}> {I18n.t("Are you sure want to delete Store")} ?  </Text>
                                    <TouchableOpacity
                                        style={[Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile, { marginTop: Device.isTablet ? 35 : 25 }]} onPress={() => this.deleteStore()}
                                    >
                                        <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile}  > {I18n.t("DELETE")} </Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile, { borderColor: "#ED1C24", }]} onPress={() => this.storeModelCancel()}
                                    >
                                        <Text style={[Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile, { color: "#ED1C24" }]}  > {I18n.t("CANCEL")} </Text>

                                    </TouchableOpacity>
                                </View>
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
            storeName: "",
            storeDistrict: "",
            storeState: "",
            modalFalse: false,
            statesArray: [],
            states: [],
            stateId: 0,
            statecode: '',
            dictrictArray: [],
            dictricts: [],
            districtId: "",
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
                }
                this.setState({
                    states: states,
                });
                this.setState({ statesArray: this.state.statesArray });
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
        this.setState({ storeState: value }, () => {
            this.getMasterDistrictsList();
        });
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
                }
                this.setState({
                    dictricts: dictricts,
                });
                this.setState({ dictrictArray: this.state.dictrictArray });
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


    handleStoreName = (value) => {
        this.setState({ storeName: value });
    };

    handleStore = (value) => {
        this.setState({ storeState: value });
    };


    applyStoreFilter() {

        const searchStore = {
            "stateId": this.state.statecode ? this.state.statecode : null,
            "cityId": null,
            "districtId": this.state.districtId ? this.state.districtId : null,
            "storeName": this.state.storeName ? this.state.storeName : null,
        };

        console.log('store search', searchStore);

        axios.post(UrmService.getStoresBySearch(), searchStore).then((res) => {
            if (res) {
                if (res.data.isSuccess === "true") {
                    this.setState({ filterStores: res.data.result });
                    this.props.childParams(this.state.filterStores);
                } else {
                    alert(res.data.message);
                }
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

            <Modal isVisible={this.props.modalVisible} style={{ margin: 0 }}>
                <View style={Device.isTablet ? styles.filterMainContainer_tablet : styles.filterMainContainer_mobile} >
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, height: Device.isTablet ? 60 : 50 }}>
                            <View>
                                <Text style={{ marginTop: 15, fontSize: Device.isTablet ? 22 : 17, marginLeft: 20 }} > {I18n.t("Filter By")} </Text>
                            </View>
                            <View>
                                <TouchableOpacity style={{ width: Device.isTablet ? 60 : 50, height: Device.isTablet ? 60 : 50, marginTop: Device.isTablet ? 20 : 15, marginRight: Device.isTablet ? 0 : 0 }} onPress={() => this.modelCancel()}>
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


                        <View style={Device.isTablet ? styles.rnSelectContainer_tablet : styles.rnSelectContainer_mobile}>
                            <RNPickerSelect
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
                            placeholder={I18n.t("STORE NAME")}
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.storeName}
                            onChangeText={this.handleStoreName}
                        />
                        <TouchableOpacity style={Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile}
                            onPress={() => this.applyStoreFilter()}>
                            <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile} >{I18n.t("APPLY")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile}
                            onPress={() => this.modelCancel()}>
                            <Text style={Device.isTablet ? styles.filterButtonCancelText_tablet : styles.filterButtonCancelText_mobile}>{I18n.t("CANCEL")}</Text>
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
        marginTop: Device.isTablet ? 25 : 20,
        marginRight: Device.isTablet ? 30 : 20,
    },

    // Styles For Mobile

    filterMainContainer_mobile: {
        width: deviceWidth,
        alignItems: 'center',
        backgroundColor: "#ffffff",
        height: 400,
        marginTop: deviceHeight - 400,
        // marginLeft: -20,
        // position: 'absolute',
        // bottom: -20,
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
    modelCancelImage_mobile: {
        color: '#ED1C24',
        fontFamily: 'regular',
        fontSize: 12,
        position: 'absolute',
        top: 8,
        right: 5,
    },

    // Styles For Tablet
    filterMainContainer_tablet: {
        width: deviceWidth,
        alignItems: 'center',
        backgroundColor: "#ffffff",
        height: 500,
        marginTop: deviceHeight - 500,
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
        borderWidth: 2,
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