import React, { Component } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import Modal from 'react-native-modal';

var deviceWidth = Dimensions.get("window").width;

export default class CreateTaxMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taxMasterDelete: false,
            modalVisible: true,
        };
    }

    modelCancel() {
        this.setState({ modalVisible: false });
    }

    handledeleteTax(item, index) {
        this.setState({ taxMasterDelete: true, modalVisible: true });
    };

    handleeditTax(item, index) {
        this.props.navigation.navigate('AddTaxMaster',
            {
                item: item, isEdit: true,

            });
    };

    deleteTax(item, index) {

    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.taxMaster}
                    style={{ marginTop: 20 }}
                    scrollEnabled={true}
                    renderItem={({ item, index }) => (
                        <View style={Device.isTablet ? flats.flatlistContainer_tablet : flats.flatlistContainer_mobile} >
                            <View style={Device.isTablet ? flats.flatlistSubContainer_tablet : flats.flatlistSubContainer_mobile}>
                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextAccent_tablet : flats.flatlistTextAccent_mobile}>TAX RATES: {index + 1}</Text>
                                    <Text style={Device.isTablet ? flats.flatlistText_tablet : flats.flatlistText_mobile}>CGST: { }</Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>SGST: { }</Text>
                                </View>
                                <View style={flats.text}>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>IGST: { }</Text>
                                    <Text style={Device.isTablet ? flats.flatlistTextCommon_tablet : flats.flatlistTextCommon_mobile}>CESS: { }</Text>
                                </View>
                                <View style={flats.buttons}>
                                    <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.handleeditTax(item, index)}>
                                        <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/edit.png')} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handledeleteTax(item, index)}>
                                        <Image style={{ alignSelf: 'center', top: 5, height: Device.isTablet ? 30 : 20, width: Device.isTablet ? 30 : 20 }} source={require('../assets/images/delete.png')} />

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
                {this.state.taxMasterDelete && (
                    <View>
                        <Modal isVisible={this.state.modalVisible}>
                            <View style={[Device.isTablet ? styles.filterMainContainer_tablet : styles.filterMainContainer_mobile, { height: Device.isTablet ? 350 : 250 }]}>

                                <Text style={Device.isTablet ? styles.filterByTitle_tablet : styles.filterByTitle_mobile}> Delete Tax </Text>

                                <TouchableOpacity style={Device.isTablet ? styles.filterCloseButton_tablet : styles.filterCloseButton_mobile} onPress={() => this.modelCancel()}>
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
                                }}> Are you sure want to delete Tax?  </Text>
                                <TouchableOpacity
                                    style={[Device.isTablet ? styles.filterApplyButton_tablet : styles.filterApplyButton_mobile, { marginTop: Device.isTablet ? 75 : 55 }]} onPress={() => this.deleteTax(item, index)}
                                >
                                    <Text style={Device.isTablet ? styles.filterButtonText_tablet : styles.filterButtonText_mobile}  > DELETE </Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={Device.isTablet ? styles.filterCancelButton_tablet : styles.filterCancelButton_mobile} onPress={() => this.modelCancel()}
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

const styles = StyleSheet.create({
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


});



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
