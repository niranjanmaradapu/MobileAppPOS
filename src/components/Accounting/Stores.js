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
import { buttonContainer, buttonStyle, buttonStyle1, filterBtn, flatListMainContainer, flatlistSubContainer, headerNavigationBtn, headerNavigationBtnText, headerTitle, headerTitleContainer, headerTitleSubContainer, headerTitleSubContainer2, highText, buttonImageStyle, menuButton, textContainer, textStyleLight, textStyleMedium } from '../Styles/Styles';
import { filterMainContainer, filterSubContainer, filterHeading, filterCloseImage, deleteText, deleteHeading, deleteHeader, deleteContainer, deleteCloseBtn } from '../Styles/PopupStyles';
import { inputField, rnPickerContainer, rnPicker, submitBtn, submitBtnText, cancelBtn, cancelBtnText, datePicker, datePickerBtnText, datePickerButton1, datePickerButton2, datePickerContainer, dateSelector, dateText, } from '../Styles/FormFields';
import AsyncStorage from '@react-native-async-storage/async-storage';
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

export default class Stores extends Component {

    constructor(props) {
        super(props);
        this.state = {
            storesDelete: false,
            modalVisible: true,
            storesList: [],
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
            filterStoresData: [],
        };
    }

    componentDidMount() {
        this.getStoresList()
        this.getMasterStatesList()
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

        async getStoresList() {
        const clientId = await AsyncStorage.getItem("custom:clientId1");
        this.setState({ loading: true });
        const params = {
            "clientId": clientId
        };
        axios.get(UrmService.getAllStores(), { params }).then((res) => {
            if (res) {
                this.setState({storesList: res.data.result})
            } else {
                this.setState({storeError: "Records Not Found"})
            }
        }).catch(() => {
            this.setState({ loading: false });
            if (this.state.flagStore === true) {
                this.setState({storeError: "Records Not Found"})
                // alert("There is an Error while Getting Stores");
            }
        });
    }

        getMasterStatesList() {
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
            "stateId": this.state.statecode ? this.state.statecode : 0,
            "cityId": null,
            "districtId": this.state.districtId ? this.state.districtId : 0,
            "storeName": this.state.storeName ? this.state.storeName : null,
        };
        console.log('store search', searchStore);
        axios.post(UrmService.getStoresBySearch(), searchStore).then((res) => {
            if (res) {
                if (res.data.isSuccess === "true") {
                    this.setState({ filterStoresData: res.data.result });
                    this.props.childParams(this.state.filterStores);
                } else {
                    // alert(res.data.message);
                    this.setState({ filterStoresData: [] })
                    this.props.childParams(this.state.filterStores)
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
            <View>
                <FlatList
                    data={this.props.filterActive ? this.state.filterStoresData : this.state.storesList}
                    style={{ marginTop: 20, }}
                    scrollEnabled={true}
                    keyExtractor={(item,i) => i.toString()}
                    ListEmptyComponent={<Text style={{ color: '#cc241d', textAlign: "center", fontFamily: "bold", fontSize: Device.isTablet ? 21 : 17, marginTop: deviceHeight/3 }}>&#9888; Records Not Found</Text>}
                    renderItem={({ item, index }) => (
                        <View style={flatListMainContainer} >
                            <View style={flatlistSubContainer}>
                                <View style={textContainer}>
                                    <Text style={highText} >{I18n.t("STORE ID")}: {item.id} </Text>
                                </View>
                                <View style={textContainer}>
                                    <Text style={textStyleMedium}>{I18n.t("STORE NAME")}: {"\n"} {item.name}</Text>
                                    <Text style={textStyleLight}>{I18n.t("DOMAIN")}: {"\n"} {item.id.domaiName} </Text>
                                </View>
                                <View style={textContainer}>
                                    <Text style={textStyleLight}>{I18n.t("LOCATION")}: {item.cityId} </Text>
                                    <Text style={textStyleLight}>{I18n.t("CREATED BY")}: {item.createdBy}</Text>
                                </View>
                                <View style={textContainer}>
                                    <Text style={textStyleLight}>{I18n.t("CREATED DATE")}: {"\n"} {item.createdDate} </Text>
                                <View style={buttonContainer}>
                                    <TouchableOpacity style={buttonStyle1} onPress={() => this.handleeditStore(item, index)}>
                                        <Image style={buttonImageStyle} source={require('../assets/images/edit.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={buttonStyle} onPress={() => this.handledeleteStore(item, index)}>
                                        <Image style={buttonImageStyle} source={require('../assets/images/delete.png')} />

                                    </TouchableOpacity>
                                </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
                {this.state.storesDelete && (
                    <View>
                        <Modal isVisible={this.state.modalVisible} style={{ margin: 0 }}>

                            <View style={deleteContainer}>
                                <View>
                                    <View style={deleteHeader}>
                                        <View>
                                            <Text style={deleteHeading} > {I18n.t("Delete Store")} </Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={filterCloseImage} onPress={() => this.storeModelCancel()}>
                                                <Image style={deleteCloseBtn} source={require('../assets/images/modalCloseWhite.png')} />
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
                                    <Text style={deleteText}> {I18n.t("Are you sure want to delete Store")} ?  </Text>
                                    <TouchableOpacity
                                        style={filterSubmitBtn} onPress={() => this.deleteStore()}
                                    >
                                        <Text style={filterApplyBtnText}  > {I18n.t("DELETE")} </Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={filterCancelBtn} onPress={() => this.storeModelCancel()}
                                    >
                                        <Text style={filterCancelBtnText}  > {I18n.t("CANCEL")} </Text>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )}
                {this.props.filterStores && 
                <View>
                        <Modal isVisible={this.props.modalVisible} style={{ margin: 0 }}>
                <View style={filterMainContainer} >
                    <View>
                        <View style={filterSubContainer}>
                            <View>
                                <Text style={filterHeading} > {I18n.t("Filter By")} </Text>
                            </View>
                            <View>
                                <TouchableOpacity style={filterCloseImage} onPress={() => this.modelCancel()}>
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


                        <View style={rnPickerContainer}>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'STATE'
                                }}
                                Icon={() => {
                                    return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                }}
                                items={this.state.states}
                                onValueChange={this.handleStoreState}
                                style={rnPicker}
                                value={this.state.storeState}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                        <View style={rnPickerContainer}>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'DISTRICT'
                                }}
                                Icon={() => {
                                    return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                }}
                                items={this.state.dictricts}
                                onValueChange={this.handleDistrict}
                                style={rnPicker}
                                value={this.state.storeDistrict}
                                useNativeAndroidPickerStyle={false}
                            />
                        </View>
                        <TextInput
                            style={inputField}
                            underlineColorAndroid="transparent"
                            placeholder={I18n.t("STORE NAME")}
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.storeName}
                            onChangeText={this.handleStoreName}
                        />
                        <TouchableOpacity style={submitBtn}
                            onPress={() => this.applyStoreFilter()}>
                            <Text style={submitBtnText} >{I18n.t("APPLY")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={cancelBtn}
                            onPress={() => this.modelCancel()}>
                            <Text style={cancelBtnText}>{I18n.t("CANCEL")}</Text>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>
                </View>
            </Modal>
                </View>
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    imagealign: {
        marginTop: Device.isTablet ? 25 : 20,
        marginRight: Device.isTablet ? 30 : 20,
    },
});