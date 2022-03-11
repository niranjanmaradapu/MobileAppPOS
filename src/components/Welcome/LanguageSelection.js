import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import I18n, { getLanguages } from 'react-native-i18n';
// Enable fallbacks if you want `en-US`
// and `en-GB` to fallback to `en`
I18n.fallbacks = true;
I18n.defaultLocale = 'english';
const data = [{ key: "English" }, { key: "हिंदी" }, { key: "తెలుగు" }];
import Device from 'react-native-device-detection';


// Available languages
I18n.translations = {
    'english': require('../assets/translations/en'),
    'telugu': require('../assets/translations/te'),
    'hindi': require('../assets/translations/hi'),
};

export default class LanguageSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'English',
            languages: [],
            selectedItem: 0,
        }
    }

    componentWillMount() {
        getLanguages().then(languages => {
            this.setState({ languages });
        });
        console.log('vinod selected language isssss---->', I18n.locale)
        if ( I18n.locale == "english" || I18n.locale == "en" || I18n.locale == "en-US") {
            I18n.locale = "english"
            this.setState({ selectedItem: 0 })
        }
        else if (I18n.locale == "hindi") {
            this.setState({ selectedItem: 1 })
        }
        else {
            this.setState({ selectedItem: 2 })
        }
    }

    letsGoButtonAction() {
        //this.props.navigation.push('LoginAndSignUp', { screen: 'SignUp' });
        this.props.navigation.navigate('Welcome');
    }


    setLanguage() {

    }

    setLanguage = (value) => {
        if (value == "English") {
            I18n.locale = 'english';
        }
        else if (value == "Hindi") {
            I18n.locale = 'hindi';
        }
        else {
            I18n.locale = 'telugu';
        }
        this.setState({ language: value });
    }

    selectedLanguage = (item, index) => {
        console.log('-------ITEM TAPPED')
        this.setState({ selectedItem: index })
        if (index == 0) {
            I18n.locale = 'english';
            this.setState({ language: "English" });
        }
        else if (index == 1) {
            I18n.locale = 'hindi';
            this.setState({ language: "Hindi" });
        }
        else {
            I18n.locale = 'telugu';
            this.setState({ language: "Telugu" });
        }

    };




    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{
                        color: "#353C40", fontSize: 30, fontFamily: "bold", marginLeft: 20, marginTop: 100, flexDirection: 'column',
                        justifyContent: 'center',
                    }}> {('Choose the language')} </Text>
                    <FlatList
                        style={{ width: deviceWidth, marginTop: 50, }}
                        scrollEnabled={false}
                        ListHeaderComponent={this.renderHeader}
                        data={data}
                        keyExtractor={item => item.email}
                        renderItem={({ item, index }) => (

                            <TouchableOpacity onPress={() => this.selectedLanguage(item, index)}>
                                <View style={{
                                    borderBottomColor: 'lightgray', borderBottomWidth: 0.6, marginLeft: this.state.selectedItem === index ? 0 : 0, marginRight: this.state.selectedItem === index ? 0 : 0, backgroundColor: this.state.selectedItem === index ? '#ED1C24' : '#ffffff'
                                }}>


                                    <View style={Device.isTablet ? styles.langaugeButton_tablet : styles.langaugeButton_mobile}>
                                        <Text style={[Device.isTablet ? styles.languageButtonText_tablet : styles.languageButtonText_mobile ,{
                                             color: this.state.selectedItem === index ? '#ffffff' : '#353C40'
                                        }]}>
                                            {item.key}
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
    langaugeButton_mobile: {
        flexDirection: 'column', 
        width: '100%', 
        height: 80 
    },
    languageButtonText_mobile: {
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
    langaugeButton_tablet: {
        flexDirection: 'column', 
        width: '100%', 
        height: 100 
    },
    languageButtonText_tablet: {
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
