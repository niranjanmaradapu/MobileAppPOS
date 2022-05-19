import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import LoginService from '../services/LoginService';
import { RH, RW,RF } from '../../Responsive';
var deviceWidth = Dimensions.get('window').width;
I18n.fallbacks = true;
I18n.defaultLocale = 'english';
const data = [{ key: "Textile", image: require("../assets/images/texttile.png") }, { key: "Retail", image: require("../assets/images/retaildomain.png") }, { key: "Admin", image: require("../assets/images/admin.png") }];

export default class SelectDomain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            domainData: [],
            selectedItem: 0,
        };
    }

    componentDidMount() {
        this.getDomainsList();
    }

    async getDomainsList() {
        const clientId = await AsyncStorage.getItem("custom:clientId1");
        console.log('dsdasdsdadsadas is' + clientId);
        axios.get(LoginService.getDomainsList() + clientId).then((res) => {
            let len = res.data["result"].length;
            console.log('sdasdasdsd', );
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    let number = res.data.result[i];
                    console.log(number);
                    this.state.domainData.push(number);
                    AsyncStorage.setItem("domainDataId", (res.data.result[0].id).toString()).then(() => {
                        // console.log

                    }).catch(() => {
                        this.setState({ loading: false });
                        console.log('There is error saving token');
                      //  alert('There is error saving token');
                    });
                    AsyncStorage.setItem("domainName", res.data.result[0].domaiName).then(() => {
                        // console.log

                    }).catch(() => {
                        this.setState({ loading: false });
                        console.log('There is error saving token');
                       // alert('There is error saving token');
                    });
                }
                this.setState({ domainData: this.state.domainData });
            }
        });
    }


    letsGoButtonAction() {
        this.props.navigation.navigate('SelectStore', { isFromDomain: true });
    }


    selectedDomain = (item, index) => {
        this.setState({ selectedItem: index });
        console.log('asdsadsd is' + item.clientDomainaId);
        // if (index == 0) {
        AsyncStorage.setItem("domainDataId", (item.id).toString()).then(() => {
            // console.log

        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error saving token');
            alert('There is error saving token');
        });
        AsyncStorage.setItem("domainName", item.domaiName).then(() => {
            // console.log

        }).catch(() => {
            this.setState({ loading: false });
            alert('There is error saving token');
        });
    };




    render() {
        return (
            <View style={styles.container}>
                <View>
                    {/* <Image source={require('../assets/images/welcomeLogo.png')} style={styles.logoImage} /> */}
                    <Text style={{
                        color: "#353C40", fontSize: 30, fontFamily: "bold", marginLeft: 20, marginTop: Device.isTablet ? 50 : 30, flexDirection: 'column',
                        justifyContent: 'center',
                    }}> {I18n.t('Select Domain Type')} </Text>
                    <FlatList
                        style={{ width: deviceWidth, marginTop: 10, }}
                        //scrollEnabled={false}
                        ListHeaderComponent={this.renderHeader}
                        data={this.state.domainData}
                        keyExtractor={item => item}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => this.selectedDomain(item, index)}>
                                <View style={{
                                    borderBottomColor: 'lightgray', borderBottomWidth: 0.6, marginLeft: this.state.selectedItem === index ? 0 : 0, marginRight: this.state.selectedItem === index ? 0 : 0, backgroundColor: this.state.selectedItem === index ? '#ED1C24' : '#ffffff'
                                }}>

                                    <View style={{ flexDirection: 'column', width: '100%', height: RH(100), }}>
                                        {item.domaiName === "Textile" &&
                                            <Image
                                                style={Device.isTablet ? styles.image_tablet : styles.image_mobile}
                                                source={require("../assets/images/textile.png")} />
                                        }
                                        {item.domaiName === "Retail" &&
                                            <Image
                                                style={Device.isTablet ? styles.image_tablet : styles.image_mobile}
                                                source={require("../assets/images/retail.png")} />
                                        }
                                        {item.domaiName === "Electrical & Electronics" &&
                                            <Image
                                                style={Device.isTablet ? styles.image_tablet : styles.image_mobile}
                                                source={require("../assets/images/electronics.png")} />
                                        }
                                        <Text style={[Device.isTablet ? styles.text_tablet : styles.text_mobile, { color: this.state.selectedItem === index ? '#ffffff' : '#353C40' }]}>
                                            {item.domaiName}
                                        </Text>
                                        <Image source={this.state.selectedItem === index ? require('../assets/images/langselect.png') : require('../assets/images/langunselect.png')} style={{ position: 'absolute', right: 20, top: 40 }} />
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={styles.continueButtonContainer}>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => this.letsGoButtonAction()} >
                    <Text style={styles.continueButtonText}> {I18n.t('continue').toUpperCase()} </Text>
                </TouchableOpacity>
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    logoImage: {
        alignSelf: 'center',
        width: RW(177),
        height: RH(219),
        marginTop: RH(40),
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
        continueButtonContainer: {
        width: deviceWidth,
        backgroundColor: '#8F9EB7',
        position: 'absolute',
        bottom: RH(0),
        height: Device.isTablet ? RH(100) : RH(70),
    },
        continueButton: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: RW(20),
        width: deviceWidth - RW(40),
        height: Device.isTablet ? RH(60) : RH(44),
        borderRadius: 10,
        fontWeight: 'bold',
        marginTop: 10,
    },
    continueButtonText: {
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: RF(14),
        fontFamily: "regular",
    },

    // Mobile
    image_mobile: {
        width: RW(60),
        height: RH(60),
        borderRadius: 30,
        marginLeft: RW(30),
        marginTop: RH(20),
    },
    text_mobile: {
        fontSize: RF(17),
        marginTop: -RH(40),
        fontFamily: 'medium',
        alignSelf: 'center',
    },
    saveButton_mobile: {
        margin: RH(8),
        height: RH(50),
        backgroundColor: "#ED1C24",
        borderRadius: 5,
    },
    saveButtonText_mobile: {
        textAlign: 'center',
        marginTop: RH(15),
        color: "#ffffff",
        fontSize: RF(15),
        fontFamily: "regular"
    },
    continueButton_mobiile: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        position: 'absolute',
        marginLeft: RW(20),
        width: deviceWidth - RW(40),
        bottom: RH(30),
        height: RH(44),
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    continueButtonText_mobile: {
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: RF(14),
        fontFamily: "regular",
    },


    // Tablet
    image_tablet: {
        width: RW(90),
        height: RH(90),
        borderRadius: 45,
        marginLeft: RW(30),
        marginTop: RH(5),
    },
    text_tablet: {
        fontSize: RF(20),
        fontFamily: 'medium',
        marginTop: -RH(65),
        alignSelf: 'center',
    },
    continueButton_tablet: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        position: 'absolute',
        marginLeft: RW(20),
        width: deviceWidth - RW(40),
        bottom: RH(30),
        height: RH(60),
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    continueButtonText_tablet: {
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: RF(20),
        fontFamily: "regular",
    },



});
