import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import I18n, { getLanguages } from 'react-native-i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
I18n.fallbacks = true;
I18n.defaultLocale = 'en';
import axios from 'axios';
import LoginService from '../services/LoginService';
const data = [{ key: "Textile", image: require("../assets/images/texttile.png") }, { key: "Retail", image: require("../assets/images/retaildomain.png") }, { key: "Admin", image: require("../assets/images/admin.png") }];

export default class SelectDomain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            domainData: [],
            selectedItem: 0,
        }
    }

    componentDidMount() {
        this.getDomainsList()
    }

    async getDomainsList() {
        const clientId = await AsyncStorage.getItem("custom:clientId1");
        console.log('dsdasdsdadsadas is' + clientId)
        axios.get(LoginService.getDomainsList() + clientId).then((res) => {
            let len = res.data["result"].length;
            console.log('sdasdasdsd' + len)
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    let number = res.data.result[i]
                    console.log(number)
                    
                    this.state.domainData.push(number)
                    AsyncStorage.setItem("domainDataId", (res.data.result[0].clientDomainaId).toString()).then(() => {
                        // console.log
                       
                    }).catch(() => {
                        console.log('there is error saving token')
                    })
                    AsyncStorage.setItem("domainName", res.data.result[0].domaiName).then(() => {
                        // console.log
                       
                    }).catch(() => {
                        console.log('there is error saving token')
                    })
                    this.setState({ domainData: this.state.domainData })
                }
            } 
        });
    }


    letsGoButtonAction() {
        this.props.navigation.navigate('SelectStore',{isFromDomain:true});
    }


    selectedDomain = (item, index) => {
        this.setState({ selectedItem: index })
        console.log('asdsadsd is' + item.clientDomainaId)
        // if (index == 0) {
            AsyncStorage.setItem("domainDataId", (item.clientDomainaId).toString()).then(() => {
                // console.log
               
            }).catch(() => {
                console.log('there is error saving token')
            })
            AsyncStorage.setItem("domainName", item.domaiName).then(() => {
                // console.log
               
            }).catch(() => {
                console.log('there is error saving token')
            })
    };




    render() {
        return (
            <View style={styles.container}>
                <View>
                    {/* <Image source={require('../assets/images/welcomeLogo.png')} style={styles.logoImage} /> */}
                    <Text style={{
                        color: "#353C40", fontSize: 30, fontFamily: "bold", marginLeft: 20, marginTop: 100, flexDirection: 'column',
                        justifyContent: 'center',
                    }}> {('Select Domain Type')} </Text>
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


                                    <View style={{ flexDirection: 'column', width: '100%', height: 100 }}>
                                        

                                        <Image
                                            style={{ width: 60, height: 60, borderRadius: 30, marginLeft: 30, marginTop: 20, }}
                                            source={require("../assets/images/texttile.png") }/>
                                        <Text style={{
                                            fontSize: 20, fontFamily: 'medium', marginTop: -40, alignSelf: 'center', color: this.state.selectedItem === index ? '#ffffff' : '#353C40'
                                        }}>
                                            {item.domaiName}
                                        </Text>
                                        <Image source={this.state.selectedItem === index ? require('../assets/images/langselect.png') : require('../assets/images/langunselect.png')} style={{ position: 'absolute', right: 20, top: 40 }} />
                                    </View>

                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={() => this.letsGoButtonAction()} >
                    <Text style={styles.signInButtonText}> {('CONTINUE')} </Text>
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
        alignSelf: 'center',
        width: 177,
        height: 219,
        marginTop: 40,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    signInButton: {
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
    signInButtonText: {
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 14,
        fontFamily: "regular",
    },

})
