import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView, FlatList } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import { DrawerActions } from '@react-navigation/native';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';
const data = [true, false, false, false, false, false, false, false, false];
import Device from 'react-native-device-detection';
import axios from 'axios';
import UrmService from '../services/UrmService';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            privilages: [],
            flagone: true,
            flagtwo: false,
            flagthree: false,
            flagfour: false,
            selectedcolor: '',
            subPrivilages: "",

        }
    }


    async componentDidMount() {
        AsyncStorage.getItem("custom:isSuperAdmin").then((value) => {
            if (value === "true") {
                var domainId = "1"
                if (global.domainName === "Textile") {
                    domainId = "1"
                }
                else if (global.domainName === "Retail") {
                    domainId = "2"
                }
                else if (global.domainName === "Electrical & Electronics") {
                    domainId = "3"
                }

                axios.get(UrmService.getPrivillagesForDomain() + domainId).then((res) => {
                    if (res.data && res.data["isSuccess"] === "true") {
                        let len = res.data["result"].length;
                        if (len > 0) {
                            if (len > 0) {
                                for (let i = 0; i < len; i++) {
                                    let previlage = res.data["result"][i]
                                    if (previlage.name === "Reports") {
                                        for (let i = 0; i < previlage.subPrivillages.length; i++) {
                                            console.log(previlage.subPrivillages[i].parentPrivillageId)
                                            if (previlage.id === previlage.subPrivillages[i].parentPrivillageId) {
                                                let subprivilage = previlage.subPrivillages[i]
                                                if(subprivilage.name === "Dashboard"){
                                                    this.setState({ flagOne: false, flagTwo: false });
                                                }
                                                if (i === 0) {
                                                    this.state.privilages.push({ bool: true, name: subprivilage.name });
                                                }
                                                else {
                                                    this.state.privilages.push({ bool: false, name: subprivilage.name });
                                                }
                                            }
                                        }
                                    }
                                    this.setState({ privilages: this.state.privilages });
                                }
                            }
                        }
                    }
                });
            }
            else {
        AsyncStorage.getItem("rolename").then((value) => {
            axios.get(UrmService.getPrivillagesByRoleName() + value).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                    let len = res.data["result"].parentPrivilages.length;
                    let length = res.data["result"].subPrivilages.length;
                    // console.log(.name)
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let previlage = res.data["result"].parentPrivilages[i]
                            if (previlage.name === "Reports") {
                              
                                    if (length > 0) {
                                        for (let i = 0; i < length; i++) {
                                            if (previlage.id === res.data["result"].subPrivilages[i].parentPrivillageId) {
                                            let subprivilage = res.data["result"].subPrivilages[i]
                                            if (i === 0) {
                                                this.state.privilages.push({ bool: true, name: subprivilage.name });
                                            }
                                            else {
                                                this.state.privilages.push({ bool: false, name: subprivilage.name });
                                            }
                                        }
                                        this.setState({ privilages: this.state.privilages });
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }).catch(() => {
            console.log('there is error saving domainDataId')
        })

    }
}).catch(() => {
    console.log('there is error getting storeId')
})        

    }

    topbarAction1 = (item, index) => {
        if (this.state.privilages[index].bool === true) {
            this.state.privilages[index].bool = false
        }
        else {
            this.state.privilages[index].bool = true
        }
        for (let i = 0; i < this.state.privilages.length; i++) {
            if (index != i) {
                this.state.privilages[i].bool = false
            }
            this.setState({ privilages: this.state.privilages });
        }
    }



    statatics() {
        this.props.navigation.navigate('Statitics')
    }


    menuAction() {
        this.props.navigation.dispatch(DrawerActions.openDrawer())
    }

    handleMenuButtonClick() {
        this.props.navigation.openDrawer();
        // this.props.navigation.navigate('Home')
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={Device.isTablet ? styles.viewsWidth_tablet : styles.viewsWidth_mobile}>
                    <TouchableOpacity style={Device.isTablet ? styles.menuButton_tablet : styles.menuButton_mobile} onPress={() => this.handleMenuButtonClick()}>
                        <Image source={require('../assets/images/menu.png')} />
                    </TouchableOpacity>
                    <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}> Reports </Text>
                </View>

                <ScrollView>
                    <View style={styles.container}>

                        <FlatList
                            style={styles.flatList}
                            horizontal
                            data={this.state.privilages}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity style={{
                                    height: 36,
                                    width: 200,
                                    borderWidth: 1,
                                    backgroundColor: item.bool ? '#ED1C24' : '#FFFFFF',
                                    borderColor: item.bool ? '#ED1C24' : '#858585',
                                    borderRadius: 5,
                                    marginLeft: 10,
                                }} onPress={() => this.topbarAction1(item, index)} >

                                    <Text style={{ fontSize: 16, alignItems: 'center', alignSelf: 'center', marginTop: 5, color: item.bool ? "#FFFFFF" : '#858585', fontFamily: 'regular' }}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            ListFooterComponent={<View style={{ width: 15 }}></View>}
                        />


                    </View>
                </ScrollView >
            </View>
        )
    }
}
export default Reports


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FAFAFF'
    },
    image: {
        marginTop: 40,
        marginLeft: 10,
        width: 80,
        height: 80,
        borderWidth: 0,
        borderRadius: 40,
    },
    viewswidth: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 84,
    },
    input: {
        justifyContent: 'center',
        margin: 20,
        height: 40,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: 'white',
        borderWidth: 1,
        fontFamily: 'semibold',
        fontSize: 10,
    },
    signInButton: {
        backgroundColor: '#0196FD',
        justifyContent: 'center',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 50,
        height: 55,
        borderRadius: 30,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    signInButtonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: "regular",
    },
    signInFieldStyle: {
        color: '#456CAF55',
        marginLeft: 20,
        marginTop: 5,
        fontSize: 12,
        fontFamily: "regular",
    },
    findIteminput: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 1000,
        height: 50,
        backgroundColor: "#DEF1FF",
        borderRadius: 10,
        color: '#001B4A',
        fontFamily: "regular",
        fontSize: 12,
    },
    signUptext: {
        marginTop: 40,
        fontFamily: "regular",
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 28,
    },
    saleBillsText: {
        marginLeft: 0,
        marginTop: -20,
        marginBottom: 10,
        fontFamily: "bold",
        color: '#0F2851',
        fontSize: 14,
    },
    tablecontainer: {
        flex: 1,
        // width:deviceWidth,
        marginLeft: 20,
        marginRight: 20,
        padding: 20,
        paddingTop: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: '#FAFAFF'
    },
    flatList: {
        marginTop: 20
    },
    flatlistbox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 220,
        borderWidth: 1,
        backgroundColor: "#00C656",
        borderColor: '#ffffff',
        borderRadius: 10,
        marginLeft: 10,
        //  paddingHorizontal: 15,
        // padding:15,
        // marginRight: 15,
    },

    head: {
        height: 45,
        borderColor: '#FAFAFF',
        borderWidth: 1,
        borderRadius: 10,
    },
    text: {
        margin: 6,
        color: "#0196FD",
        fontFamily: "semibold",
        fontSize: 11,
    },
    textData: {
        margin: 6,
        color: "#48596B",
        fontFamily: "regular",
        fontSize: 10,
    },

    Topcontainer: {
        flexDirection: 'row',
        marginLeft: 0,
        marginRight: 0,
        width: '100%',
        backgroundColor: 'grey',
        height: 50
    },

    TopcontainerforModel: {
        flexDirection: 'row',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
        width: '100%',
        backgroundColor: 'grey',
        borderRadius: 20,
        height: 50,
    },
    redbox: {
        backgroundColor: "#1CA2FF",
        alignSelf: "flex-start",

        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
    },
    bluebox: {
        backgroundColor: "#0196FD",
        alignSelf: "flex-start",
        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
    },
    blackbox: {
        backgroundColor: "#0196FD",
        alignSelf: "flex-start",
        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
    },
    greenbox: {
        backgroundColor: "#0196FD",
        alignSelf: "flex-start",
        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
    },
    tabBar: {
        flexDirection: 'row',
        paddingTop: Constants.statusBarHeight,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    box: {
        width: 50,
        height: 50,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    button: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        //borderRadius: 4,
        backgroundColor: "#0196FD",
        alignSelf: "flex-start",
        //marginHorizontal: "1%",
        marginBottom: 6,
        width: "25%",
        height: 45,
        textAlign: "center",
    },
    selected: {
        backgroundColor: "#BBE3FF",
        borderWidth: 0,
        backgroundColor: "#0196FD",
    },
    buttonLabel: {
        textAlign: "center",
        color: "#BBE3FF",
        fontFamily: "regular",
        fontSize: 14,
    },
    selectedLabel: {
        color: "white",
        textAlign: "center",
        alignSelf: "center",
        marginTop: 10,
        fontFamily: "regular",
        fontSize: 14,
    },
    label: {
        textAlign: "center",
        marginBottom: 10,
        fontSize: 24,
    },

    //model
    modelcontainer: {
        alignItems: 'center',
        backgroundColor: '#ede3f2',
        padding: 100
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7021a',
        padding: 100
    },
    modeltext: {
        color: '#3f2949',
        marginTop: 10
    },

    // Styles For Mobile
    viewsWidth_mobile: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height:Device.isAndroid ? 70 : 84,
    },
    menuButton_mobile: {
        position: 'absolute',
        left: 10,
        bottom: 0,
        width: 40,
        height: 40,
    },
    headerTitle_mobile: {
        position: 'absolute',
        left: 70,
        bottom: 10,
        width: 300,
        height: 25,
        fontFamily: 'bold',
        fontSize: 18,
        color: '#353C40'
    },
    // Styles For Tablet
    viewsWidth_tablet: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 28,
        height: 90,
    },
    menuButton_tablet: {
        position: 'absolute',
        left: 10,
        top: 38,
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
});
