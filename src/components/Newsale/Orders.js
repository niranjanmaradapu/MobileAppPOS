import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, SafeAreaView, ScrollView } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayData: [],
            total: '',
            payment: ''
        }
    }

    componentDidMount() {
        this.setState({
            total: this.props.route.params.total,
            payment: this.props.route.params.payment,
        });

    }


    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }



    render() {
        if (this.state.total.length !== 0) {
            this.state.arrayData.push({ totalAmount: this.state.total, paymentType: this.state.payment })
        }
        const state = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <SafeAreaView style={styles.safeArea}>
                        <View style={styles.viewswidth}>
                            <Text style={styles.signUptext}> Order History </Text>
                            <TouchableOpacity style={{
                                position: 'absolute',
                                left: 10,
                                top: 30,
                                width: 20,
                                height: 20,
                            }} onPress={() => this.handleBackButtonClick()}>
                                <Image source={require('../assets/images/backButton.png')} />
                            </TouchableOpacity>
                        </View>

                    </SafeAreaView>
                    <FlatList
                        ListHeaderComponent={this.renderHeader}
                        data={this.state.arrayData}
                        keyExtractor={item => item.email}
                        renderItem={({ item, index }) => (
                            <View style={{
                                height: 80,
                                backgroundColor: 'lightgray',
                                margin: 5, borderRadius: 10,
                                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                            }}>
                                <View style={{ flexDirection: 'column', width: '55%' }}>
                                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 20, fontFamily: 'bold' }}>
                                        Order Id: Order# {(JSON.stringify(index + 1))}
                                    </Text>
                                    <Text style={{ fontSize: 15, marginBottom: 0, marginLeft: 20, fontFamily: 'bold' }}>
                                        Amount: Rs {item.totalAmount}
                                    </Text>
                                    <Text style={{ fontSize: 15, marginBottom: 20, marginLeft: 20, fontFamily: 'regular' }}>
                                        PaymentType: {item.paymentType}
                                    </Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </ScrollView>
        )
    }
}
export default Orders


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FAFAFF'
    },
    viewswidth: {
        backgroundColor: '#ED1C24',
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
        backgroundColor: '#FAFAFF'
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
    }
});
