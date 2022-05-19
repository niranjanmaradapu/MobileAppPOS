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
const data = [{ key: "Vijayawada" }, { key: "Kakinada" }, { key: "Anakapalli" }];
import { backButton, backButtonImage, headerTitle, headerTitleContainer, headerTitleSubContainer, headerTitleSubContainer2, menuButton } from '../Styles/Styles';

export default class SelectStore extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            language: 'English',

            languages: [],
            selectedItem: 0,
            storeNames: [],
            storeData: [],
            isFromDomain: false
        };
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }

    async componentDidMount() {

        this.setState({ isFromDomain: this.props.route.params.isFromDomain });

        this.getstores();
    }

    async getstores() {
        console.log('it is super admin' + this.props.route.params.isFromDomain);
        if (this.props.route.params.isFromDomain === true) {
            this.setState({ storeData: [] });
            console.log('it is super admin');
            const username = await AsyncStorage.getItem("domainDataId");
            const params = {
                "clientDomianId": username
            };
            axios.get(LoginService.getUserStoresForSuperAdmin(), { params }).then((res) => {
                let len = res.data["result"].length;
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let number = res.data.result[i];
                        this.state.storeData.push(number);
                        console.log(this.state.storeData);
                        AsyncStorage.setItem("storeId", (res.data.result[0].id).toString()).then(() => {
                            // 

                        }).catch((err) => {
                            this.setState({ loading: false });
                            alert(err);
                        });

                        AsyncStorage.setItem("storeName", (res.data.result[0].name)).then(() => {

                        }).catch(() => {
                            this.setState({ loading: false });
                            console.log('There is error saving token');
                          //  alert('There is error saving token');
                        });
                        // 
                    }
                    this.setState({ storeData: this.state.storeData });
                }
            });
        }
        else {
            const username = await AsyncStorage.getItem("username");
            axios.get(LoginService.getUserStores() + username).then((res) => {
                if (res.data["result"]) {
                    for (var i = 0; i < res.data["result"].length; i++) {
                        let number = res.data.result[i];
                        const myArray = [];
                        myArray = number.split(":");
                        this.state.storeData.push({ name: myArray[0], id: myArray[1] });
                        this.setState({ storeData: this.state.storeData });
                        console.log('sfsfssfdsfsdfs' + this.state.storeData[0].id);
                        AsyncStorage.setItem("storeId", (this.state.storeData[0].id).toString()).then(() => {

                        }).catch(() => {
                            this.setState({ loading: false });
                            console.log('There is error saving token');
                           // alert('There is error saving token');
                        });

                        AsyncStorage.setItem("storeName", (this.state.storeData[0].name)).then(() => {

                        }).catch(() => {
                            this.setState({ loading: false });
                            console.log('There is error saving token');
                           // alert('There is error saving token');
                        });

                        console.log('adsadas' + this.state.storeData[0].id);

                    }

                }
            });
        }
    }


    letsGoButtonAction() {
        this.props.navigation.navigate('HomeNavigation');
    }


    setLanguage() {

    }


    selectStoreName = (item, index) => {
        this.setState({ selectedItem: index });
        AsyncStorage.setItem("storeId", String(item.id)).then(() => {
        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error saving storeId');
          //  alert('There is error saving storeId');
        });

        AsyncStorage.setItem("storeName", item.name).then(() => {
        }).catch(() => {
            this.setState({ loading: false });
            console.log('There is error saving token');
            // alert('There is error saving token');
        });


    };




    render() {
        return (
            <View style={styles.container}>
                <View>
                    {this.state.isFromDomain === true && (
                        <View style={headerTitleContainer}>
                            <View style={headerTitleSubContainer}>
                            <TouchableOpacity style={backButton} onPress={() => this.handleBackButtonClick()}>
                                <Image style={backButtonImage} source={require('../assets/images/backButton.png')} />
                            </TouchableOpacity>
                            <Text style={headerTitle}> {I18n.t('Stores')} </Text>
                            </View>
                        </View>
                    )}
                    <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}> {I18n.t('Select the Store')} </Text>
                    <FlatList
                        style={{ width: deviceWidth, marginTop: RH(10)}}
                        ListHeaderComponent={() => {
                            return (<Text></Text>);
                        }}
                        data={this.state.storeData}
                        keyExtractor={item => item}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => this.selectStoreName(item, index)}>
                                <View style={{
                                    borderBottomColor: 'lightgray', borderBottomWidth: 0.6, marginLeft: this.state.selectedItem === index ? 0 : 0, marginRight: this.state.selectedItem === index ? 0 : 0, backgroundColor: this.state.selectedItem === index ? '#ED1C24' : '#ffffff'
                                }}>
                                    <View style={Device.isTablet ? styles.domainButton_tablet : styles.domainButton_mobile}>
                                        <Text style={[Device.isTablet ? styles.domainButtonText_tablet : styles.domainButtonText_mobile, {
                                            color: this.state.selectedItem === index ? '#ffffff' : '#353C40'
                                        }]}>
                                            {item.name}
                                        </Text>
                                        <Image source={this.state.selectedItem === index ? require('../assets/images/langselect.png') : require('../assets/images/langunselect.png')} style={{ position: 'absolute', right: 20, top: 30 }} />
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
    imagealign: {
        marginTop: RH(14),
        marginRight: RH(10),
    },
    logoImage: {
        width: RW(302),
        height: RH(275),
        position: 'absolute',
        top: RH(130)
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

    // Styles For Mobile
    headerTitle_mobile: {
        color: "#353C40",
        fontSize: RF(30),
        fontFamily: "bold",
        marginLeft: RW(20),
        // marginTop: RH(100),
        flexDirection: 'column',
        justifyContent: 'center',
    },
    domainButton_mobile: {
        flexDirection: 'column',
        width: '100%',
        height: RH(80)
    },
    domainButtonText_mobile: {
        fontSize: RF(15),
        marginTop: RH(30),
        marginLeft: RW(20),
        fontFamily: 'medium',
    },


    // Styles For Tablet
    headerTitle_tablet: {
        color: "#353C40",
        fontSize: RF(30),
        fontFamily: "bold",
        marginLeft: RW(20),
        // marginTop: RH(100),
        flexDirection: 'column',
        justifyContent: 'center',
    },
    domainButton_tablet: {
        flexDirection: 'column',
        width: '100%',
        height: RH(100)
    },
    domainButtonText_tablet: {
        fontSize: RF(20),
        marginTop: RH(30),
        marginLeft: RW(20),
        fontFamily: 'medium',
    },
    continueButton_tablet: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        marginLeft: RW(20),
        width: deviceWidth - RW(40),
        height: RH(60),
        borderRadius: 10,
        fontWeight: 'bold',
        // marginBottom:100,
    },
    continueButtonText_tablet: {
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: "regular",
    },

});
