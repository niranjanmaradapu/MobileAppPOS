import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView, FlatList } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import { DrawerActions } from '@react-navigation/native';
import Constants from 'expo-constants';
const data = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }];
import PieChart from 'react-native-pie-chart'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    menuAction() {
        this.props.navigation.dispatch(DrawerActions.openDrawer())
    }



    render() {
        const state = this.state;
        const widthAndHeight = 200
        const series = [123, 321, 123, 789, 537]
        const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']
        return (
            <ScrollView>
                <View style={styles.container}>
                    <SafeAreaView style={styles.safeArea}>
                        <View style={styles.viewswidth}>
                            <Text style={styles.signUptext}> Home </Text>
                            <TouchableOpacity style={{
                                position: 'absolute',
                                left: 20,
                                top: 50,
                                width: 20,
                                height: 20,
                            }} onPress={() => this.menuAction()}>
                                <Image source={require('../assets/images/menu.png')} />
                            </TouchableOpacity>
                            {/* total commented this.state.aum*(this.state.sector[0]['energy']/(this.state.aum*2)*100)/100) */}


                        </View>



                    </SafeAreaView>
                    <FlatList
                        style={styles.flatList}
                        horizontal
                        data={data}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            if (item.key === 1) {
                                return <View style={{
                                    height: 150,
                                    width: 220,
                                    borderWidth: 1,
                                    backgroundColor: "#00C656",
                                    borderColor: '#ffffff',
                                    borderRadius: 10,
                                    marginLeft: 10,
                                }}>
                                    <Image source={require('../assets/images/dailysales.png')} style={{
                                        marginLeft: 20, marginTop: 20,
                                    }} />
                                    <Text style={{ fontSize: 15, marginTop: 10, fontSize: 16, color: "#ffffff", marginLeft: 20, fontFamily: 'regular' }}>
                                        Today's Sales
                                    </Text>
                                    <Text style={{ fontSize: 15, marginTop: 10, fontSize: 30, color: "#ffffff", marginLeft: 20, fontFamily: 'bold' }}>
                                        ₹ 14,221.50
                                    </Text>
                                </View>
                            }
                            if (item.key === 2) {
                                return <View style={{
                                    height: 150,
                                    width: 220,
                                    borderWidth: 1,
                                    backgroundColor: "#0063C6",
                                    borderColor: '#ffffff',
                                    borderRadius: 10,
                                    marginLeft: 10,
                                }}>
                                    <Image source={require('../assets/images/dailysales.png')} style={{
                                        marginLeft: 20, marginTop: 20,
                                    }} />
                                    <Text style={{ fontSize: 15, marginTop: 10, fontSize: 16, color: "#ffffff", marginLeft: 20, fontFamily: 'regular' }}>
                                        Monthly Sales
                                    </Text>
                                    <Text style={{ fontSize: 15, marginTop: 10, fontSize: 30, color: "#ffffff", marginLeft: 20, fontFamily: 'bold' }}>
                                        ₹ 50,000.00
                                    </Text>
                                </View>
                            }
                            if (item.key === 3) {
                                return <View style={{
                                    height: 150,
                                    width: 220,
                                    borderWidth: 1,
                                    backgroundColor: "#fc9834",
                                    borderColor: '#ffffff',
                                    borderRadius: 10,
                                    marginLeft: 10,
                                }}>
                                    <Image source={require('../assets/images/dailysales.png')} style={{
                                        marginLeft: 20, marginTop: 20,
                                    }} />
                                    <Text style={{ fontSize: 15, marginTop: 10, fontSize: 16, color: "#ffffff", marginLeft: 20, fontFamily: 'regular' }}>
                                        This month sales v/s Last month
                                    </Text>
                                    <Text style={{ fontSize: 15, marginTop: 0, fontSize: 30, color: "#ffffff", marginLeft: 20, fontFamily: 'bold' }}>
                                        + 18.75%
                                    </Text>
                                </View>
                            }
                            if (item.key === 4) {
                                return <View style={{
                                    height: 150,
                                    width: 220,
                                    borderWidth: 1,
                                    backgroundColor: "#00C656",
                                    borderColor: '#ffffff',
                                    borderRadius: 10,
                                    marginLeft: 10,
                                }}>
                                    <Image source={require('../assets/images/dailysales.png')} style={{
                                        marginLeft: 20, marginTop: 20,
                                    }} />
                                    <Text style={{ fontSize: 15, marginTop: 10, fontSize: 16, color: "#ffffff", marginLeft: 20, fontFamily: 'regular' }}>
                                        Today total Orders
                                    </Text>
                                    <Text style={{ fontSize: 15, marginTop: 0, fontSize: 30, color: "#ffffff", marginLeft: 20, fontFamily: 'bold' }}>
                                        55
                                    </Text>
                                </View>
                            }
                        }}
                        ListFooterComponent={<View style={{ width: 15 }}></View>}
                    />
                    <View style={{
                        margin: 20,
                        backgroundColor: '#FFFFFF',
                        height: 420,
                        borderRadius: 10
                    }}>
                        <Text style={{ fontSize: 20, fontFamily: 'bold', marginTop: 20, marginLeft: 20 }}>Sales by category</Text>
                        <PieChart style={{
                            marginTop: 20,
                            //   marginLeft: 10,
                            alignSelf: 'center'
                        }}
                            widthAndHeight={widthAndHeight}
                            series={series}
                            sliceColor={sliceColor}
                            doughnut={true}
                            coverRadius={0.65}
                            coverFill={'#FFF'}
                        />
                        <Text style={{ color: '#F44336', fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginTop: 10, }}>{"Vegetables and fruits: 10%"}</Text>
                        <Text style={{ color: '#2196F3', fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginTop: 5, }}>{"Dairy: 30%"}</Text>
                        <Text style={{ color: '#FFEB3B', fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginTop: 5, }}>{"Snacks: 10%"}</Text>
                        <Text style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginTop: 5, }}>{"Loose Items: 40%"}</Text>
                        <Text style={{ color: '#FF9800', fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginTop: 5, }}>{"Meat & Fish: 20%"}</Text>
                    </View>
                </View>
            </ScrollView >
        )
    }
}
export default Home


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FAFAFF'
    },
    viewswidth: {
        backgroundColor: '#0196FD',
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
        // THIS DOESN'T SEEM TO BE WORKING
        // marginRight: 15   I can't use marginRight because it cuts off the box with whitespace
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
    }
});
