import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import I18n, { getLanguages } from 'react-native-i18n';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
// Enable fallbacks if you want `en-US`
// and `en-GB` to fallback to `en`
I18n.fallbacks = true;
I18n.defaultLocale = 'en';
const data = [{ key: "English" }, { key: "हिंदी" }, { key: "తెలుగు" }];


// Available languages
I18n.translations = {
    'en': require('./assets/translations/en'),
    'te': require('./assets/translations/te'),
    'hi': require('./assets/translations/hi'),
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
    }

    letsGoButtonAction() {
        //this.props.navigation.push('LoginAndSignUp', { screen: 'SignUp' });
        this.props.navigation.navigate('Welcome');
    }


    setLanguage() {

    }

    setLanguage = (value) => {
        if (value == "English") {
            I18n.locale = 'en';
        }
        else if (value == "Telugu") {
            I18n.locale = 'te';
        }
        else {
            I18n.locale = 'hi';
        }
        this.setState({ language: value });
    }

    selectedLanguage = (item, index) => {
        console.log('-------ITEM TAPPED')
        this.setState({ selectedItem: index })
        if (index == 0) {
            I18n.locale = 'en';
            this.setState({ language: "English" });
        }
        else if (index == 1) {
            I18n.locale = 'hi';
            this.setState({ language: "Hindi" });
        }
        else {
            I18n.locale = 'te';
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


                                        <View style={{ flexDirection: 'column', width: '100%', height: 80 }}>
                                            <Text style={{
                                                fontSize: 18, marginTop: 30, marginLeft: 20, fontFamily: 'medium', color:this.state.selectedItem === index ? '#ffffff' : '#353C40'
                                            }}>
                                                {item.key}
                                            </Text>
                                            <Image source={this.state.selectedItem === index ? require('./assets/images/langselect.png') : require('./assets/images/langunselect.png')} style={{position:'absolute',right:20,top:30}} />
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
    // flexDirection: 'row',
    // marginLeft: 24,
    // marginRight: 24,
    // color:'black',
    // marginTop: 2,
    // height: 34,
    // borderColor: '#AAAAAA',
    // borderRadius: 8,
    // backgroundColor: 'white',
    // borderWidth: 1,
    // padding: 10,
    // textAlign: 'center',

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
