import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import I18n, { getLanguages } from 'react-native-i18n';
import LoginService from '../services/LoginService';
import axios from 'axios';
I18n.fallbacks = true;
I18n.defaultLocale = 'en';
const data = [{ key: "Vijayawada" }, { key: "Kakinada" }, { key: "Anakapalli" }];
import AsyncStorage from '@react-native-async-storage/async-storage';
import Device from 'react-native-device-detection';

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
            isFromDomain:false
        }
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
      }

    async componentDidMount() {
      
        this.setState({ isFromDomain: this.props.route.params.isFromDomain })
      
        this.getstores()
    }

    async getstores() {
        console.log('it is super admin' + this.props.route.params.isFromDomain)
        if(this.props.route.params.isFromDomain === true){
        this.setState({ storeData: [] })
        console.log('it is super admin')
        const username = await AsyncStorage.getItem("domainDataId");
        const params = {
            "clientDomianId": username
        }
        axios.get(LoginService.getUserStoresForSuperAdmin(), { params }).then((res) => {
            let len = res.data["result"].length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    let number = res.data.result[i]
                    this.state.storeData.push(number)
                    console.log(this.state.storeData)
                    AsyncStorage.setItem("storeId", (res.data.result[0].id).toString()).then(() => {
                        // 
                       
                    }).catch(() => {
                      
                    })
                    // 
                }
                this.setState({ storeData: this.state.storeData })
            }
        });
    }
    else{
        const username = await AsyncStorage.getItem("username");
        axios.get(LoginService.getUserStores() + username).then((res) => {
            if (res.data["result"]) {
                for (var i = 0; i < res.data["result"].length; i++) {
                    let number = res.data.result[i]
                    const myArray = []
                     myArray = number.split(":");
                    this.state.storeData.push({name:myArray[0],id:myArray[1]})
                    this.setState({ storeData: this.state.storeData })
                    console.log('sfsfssfdsfsdfs' + this.state.storeData[0].id)
                    AsyncStorage.setItem("storeId", (this.state.storeData[0].id).toString()).then(() => {
                       
                    }).catch(() => {
                        console.log('there is error saving token')
                    })

                    AsyncStorage.setItem("storeName", (this.state.storeData[0].name)).then(() => {
                       
                    }).catch(() => {
                        console.log('there is error saving token')
                    })
                  
                    console.log('adsadas' +  this.state.storeData[0].id)
                    
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
        this.setState({ selectedItem: index })
        AsyncStorage.setItem("storeId", String(item.id)).then(() => {
        }).catch(() => {
            console.log('there is error saving storeId')
        })

        AsyncStorage.setItem("storeName",item.name).then(() => {            
        }).catch(() => {
            console.log('there is error saving token')
        })

        
    };




    render() {
        return (
            <View style={styles.container}>
                <View>
                {this.state.isFromDomain === true && (
                <View style={styles.viewswidth}>
           
          <TouchableOpacity style={{
            position: 'absolute',
            left: 10,
            top: 30,
            width: 40,
            height: 40,
          }} onPress={() => this.handleBackButtonClick()}>
            <Image source={require('../assets/images/backButton.png')} />
          </TouchableOpacity>
          <Text style={{
            position: 'absolute',
            left: 70,
            top: 47,
            width: 300,
            height: 20,
            fontFamily: 'bold',
            fontSize: 18,
            color: '#353C40'
          }}> {'Stores'} </Text>
          </View>
                 )}
                    <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}> {('Select the Store')} </Text>
                    <FlatList
                        style={{ width: deviceWidth, marginTop: 50, marginBottom: 100, }}
                        //scrollEnabled={false}
                        ListHeaderComponent={() => {
                            return (<Text></Text>)
                          }}
                        data={this.state.storeData}
                        keyExtractor={item => item}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => this.selectStoreName(item, index)}>
                                <View style={{
                                    borderBottomColor: 'lightgray', borderBottomWidth: 0.6, marginLeft: this.state.selectedItem === index ? 0 : 0, marginRight: this.state.selectedItem === index ? 0 : 0, backgroundColor: this.state.selectedItem === index ? '#ED1C24' : '#ffffff'
                                }}>
                                    <View style={Device.isTablet ? styles.domainButton_tablet : styles.domainButton_mobile}>
                                        <Text style={[Device.isTablet ? styles.domainButtonText_tablet : styles.domainButtonText_mobile ,{
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
                <TouchableOpacity
                    style={Device.isTablet ? styles.continueButton_tablet : styles.continueButton_mobiile}
                    onPress={() => this.letsGoButtonAction()} >
                    <Text style={Device.isTablet ? styles.continueButtonText_tablet : styles.continueButtonText_mobile}> {('CONTINUE')} </Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        flexDirection: 'row',
        marginLeft: 24,
        marginRight: 24,
        marginTop: 2,
        height: 34,
        borderColor: '#AAAAAA',
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center',
    },
    inputAndroid: {
        flexDirection: 'row',
        width: 100,
        // marginLeft: 24,
        // marginRight: 24,
        marginTop: 2,
        height: 34,
        borderColor: '#AAAAAA',
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center',
    },
})



const styles = StyleSheet.create({
    imagealign: {
        marginTop: 14,
        marginRight: 10,
    },
    logoImage: {
        width: 302,
        height: 275,
        position: 'absolute',
        top: 130
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
        // Styles For Mobile
        headerTitle_mobile: {
            color: "#353C40", 
            fontSize: 30, 
            fontFamily: "bold", 
            marginLeft: 20, 
            marginTop: 100, 
            flexDirection: 'column',
            justifyContent: 'center',
        },
        domainButton_mobile: {
            flexDirection: 'column', 
            width: '100%', 
            height: 80 
        },
        domainButtonText_mobile: {
            fontSize: 18, 
            marginTop: 30, 
            marginLeft: 20, 
            fontFamily: 'medium',
        },
        continueButton_mobiile: {
            backgroundColor: '#ED1C24',
            justifyContent: 'center',
            position: 'absolute',
            marginLeft: 20,
            width: deviceWidth - 40,
            bottom: 30,
            height: 44,
            borderRadius: 10,
            fontWeight: 'bold',
            // marginBottom:100,
        },
        continueButtonText_mobile: {
            color: 'white',
            justifyContent: 'center',
            alignSelf: 'center',
            fontSize: 14,
            fontFamily: "regular",
        },

     // Styles For Tablet
     headerTitle_tablet: {
        color: "#353C40", 
        fontSize: 40, 
        fontFamily: "bold", 
        marginLeft: 20, 
        marginTop: 100, 
        flexDirection: 'column',
        justifyContent: 'center',
    },
     domainButton_tablet: {
        flexDirection: 'column', 
        width: '100%', 
        height: 100 
    },
    domainButtonText_tablet: {
        fontSize: 28, 
        marginTop: 30, 
        marginLeft: 20, 
        fontFamily: 'medium',
    },
    continueButton_tablet: {
        backgroundColor: '#ED1C24',
        justifyContent: 'center',
        position: 'absolute',
        marginLeft: 20,
        width: deviceWidth - 40,
        bottom: 30,
        height: 60,
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

})
