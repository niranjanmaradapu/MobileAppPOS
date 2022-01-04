import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, Dimensions, View, TouchableOpacity, Image } from 'react-native';
import Device from 'react-native-device-detection';
import Loader from '../loader';
var deviceWidth = Dimensions.get('window').width;
import axios from 'axios';
import UrmService from '../services/UrmService';

export default class Privilages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domain: "",
            previlages: [],
            domain: "",
            parentsList: [],
            childlist: [],
        }
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    async componentDidMount() {
        this.setState({ domain: this.props.route.params.domain })
        this.getPrivilages()
    }


    getPrivilages() {
        var domainId = "1"
        if (this.state.domain === "Textile") {
            domainId = "1"
        }
        else if (this.state.domain === "Retail") {
            domainId = "2"
        }
        else if (this.state.domain === "Electrical & Electronics") {
            domainId = "3"
        }
        axios.get(UrmService.getPrivillagesForDomain() + domainId).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                let len = res.data["result"].length;
                if (len > 0) {
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let previlage = res.data["result"][i];
                            console.log(previlage)
                            if (previlage.subPrivillages !== null) {
                                let len = previlage.subPrivillages.length
                                var subprivilagesArray = [];
                                if (len > 0) {
                                    for (let i = 0; i < len; i++) {
                                        if (previlage.id === previlage.subPrivillages[i].parentPrivillageId) {
                                            let subprivilage = previlage.subPrivillages[i];
                                            subprivilagesArray.push({ name: subprivilage.name, selectedindex: 0, description:subprivilage.description,subPrivillage:subprivilage })
                                            console.log(subprivilagesArray)
                                        }
                                    }

                                }
                            }
                            this.state.previlages.push({ title: previlage.name, data: subprivilagesArray,id:previlage.id});
                            this.setState({ previlages: this.state.previlages })
                           // console.log(this.state.previlages[0].id)
                        }
                    }
                }
            }
        });
    }

    saveRole() {
        global.privilages = this.state.childlist
        this.props.route.params.onGoBack();
        this.props.navigation.goBack();
    }

    selectedPrivilage = (item, index, section) => {
        if (item.selectedindex === 0) {
            item.selectedindex = 1
            this.state.childlist.push({ title: item.name, description: item.description,parent:section.title,id:section.id,subPrivillages:item.subPrivillage });
        }
        else {
            item.selectedindex = 0
            const list = this.state.childlist;
            list.splice(index, 1);
            this.setState({ childlist: list });
        }
      
        this.setState({ previlages: this.state.previlages })
        console.log(this.state.childlist)
    };



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
                        Create Role
                    </Text>
                </View>

                <SectionList
                    sections={this.state.previlages}
                    renderSectionHeader={({ section }) => <Text style={Device.isTablet ? styles.sectionHeaderTablet : styles.sectionHeaderMobile}>{section.title}</Text>}
                    renderItem={({ item, index, section }) => (

                        <TouchableOpacity onPress={() => this.selectedPrivilage(item, index, section)}>
                            <View style={Device.isTablet ? styles.item : styles.item}>
                                <Text>
                                    {item.name}
                                </Text>
                                {item.selectedindex === 1 && (
                                    <Image source={require('../assets/images/selected.png')} style={{ position: 'absolute', right: 20, top: 15 }} />
                                )}
                                {item.selectedindex === 0 && (
                                    <Image source={require('../assets/images/langunselect.png')} style={{ position: 'absolute', right: 20, top: 15 }} />
                                )}
                                {/* {this.state.selectedItem === item && (
                                 <Image source={require('../assets/images/selected.png')} style={{ position: 'absolute', right: 20, top: 15 }} />
                                    )} */}

                                {/* <Image source={require('../assets/images/selected.png')} style={{ position: 'absolute', right: 20, top: 15 }} /> */}

                                {/* <Image source={this.state.selectedItem === item ? require('../assets/images/selected.png') : require('../assets/images/langunselect.png')} style={{ position: 'absolute', right: 20, top: 15 }} /> */}
                            </View>

                            {/* </View> */}
                        </TouchableOpacity>


                    )}
                />


                <TouchableOpacity style={Device.isTablet ? styles.saveButton_tablet : styles.saveButton_mobile}
                    onPress={() => this.saveRole()}>
                    <Text style={Device.isTablet ? styles.saveButtonText_tablet : styles.saveButtonText_mobile}>SAVE</Text>
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
    languageButtonText_tablet: {
        fontSize: 28,
        marginTop: 30,
        marginLeft: 20,
        fontFamily: 'medium',
    },
    sectionHeaderTablet: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 20,
        fontFamily: 'medium',
        color: "#828282",
        backgroundColor: '#F4F6FA',
    },
    sectionHeaderMobile: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 16,
        fontFamily: 'medium',
        color: "#828282",
        backgroundColor: '#F4F6FA',
    },
    item: {
        padding: 15,
        fontSize: 18,
        height: 44,
        backgroundColor: '#ffffff',
        fontSize: 18,
        fontFamily: 'medium',
        color: '#353C40',
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
    subheading_mobile: {
        fontFamily: 'medium',
        fontSize: 16,
        color: "red",
        marginLeft: 20,
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
    subheading_tablet: {
        fontFamily: 'medium',
        fontSize: 21,
        color: "red",
        marginLeft: 20,
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
