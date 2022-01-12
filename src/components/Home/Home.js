import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView, FlatList } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import { DrawerActions } from '@react-navigation/native';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';
const data = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }];
import Device from 'react-native-device-detection';
import axios from 'axios';
import UrmService from '../services/UrmService';
import ProfileService from '../services/ProfileService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    BarChart,
    PieChart
} from "react-native-chart-kit";

var deviceWidth = Dimensions.get('window').width;
const chartConfigMobile = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    barPercentage: 0.5,
    height: 5000,
    fillShadowGradient: `rgba(1, 122, 205, 1)`,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

    style: {
        borderRadius: 16,
        fontFamily: "regular",
    },
    propsForBackgroundLines: {
        strokeWidth: 1,
        stroke: "#e3e3e3",
        // strokeDasharray: "0",
    },
    propsForLabels: {
        fontFamily: "regular",
    },
};

const chartConfigTablet = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    barPercentage: 1,
    height: 5000,
    fillShadowGradient: `rgba(1, 122, 205, 1)`,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(1, 122, 205, 1)`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, 1)`,

    style: {
        borderRadius: 16,
        fontFamily: "regular",
    },
    propsForBackgroundLines: {
        strokeWidth: 1,
        stroke: "#e3e3e3",
        // strokeDasharray: "0",
    },
    propsForLabels: {
        fontFamily: "regular",
    },
};

const salesByCategoryPie = [

    {
        name: "SHIRTS",
        population: 19.5,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15

    },
    {
        name: "SAREES",
        population: 17.1,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "KIDS",
        population: 15.5,
        color: "#0063C6",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "JEANS",
        population: 15.2,
        color: "#e26a00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "T-SHIRTS",
        population: 12.3,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "WOMEN",
        population: 10.01,
        color: "#ff0",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "OTHERS",
        population: 10.01,
        color: "#7F7F7F",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];

const invoicesPie = [
    {
        name: "jan",
        sales: 10,
        color: "#f00",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    },
    {
        name: "feb",
        sales: 10,
        color: "#0f0",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    },
    {
        name: "mar",
        sales: 10,
        color: "#00f",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    },
    {
        name: "apr",
        sales: 10,
        color: "#f0f",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    },
    {
        name: "may",
        sales: 10,
        color: "#ff0",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    },
    {
        name: "jun",
        sales: 10,
        color: "#070795",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    },
    {
        name: "jul",
        sales: 10,
        color: "#00ffff",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    },
    {
        name: "aug",
        sales: 10,
        color: "#9ffff0",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    },
    {
        name: "sep",
        sales: 10,
        color: "#086",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    },
    {
        name: "nov",
        sales: 10,
        color: "#289",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    },
    {
        name: "dec",
        sales: 10,
        color: "#2f4",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    }
];

const salesSummaryPie = [
    {
        name: "Sales",
        sales: 8000,
        color: "#ff0",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    },
    {
        name: "Returns",
        sales: 2000,
        color: "#00f",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    }
];

const activeInactivePie = [
    {
        name: "Active",
        promo: 57,
        color: "#0f0",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    },
    {
        name: "InActive",
        promo: 17,
        color: "#7f7f7f",
        legendFontColor: "#7f7f7f",
        legendFontSize: 15
    }
];

const topSalesManBar = {
    labels: ["John", "Raju", "Gayathri", "Vignesh", "Ramya"],
    datasets: [
        {
            data: [45, 35, 28, 18.5, 12]
        }
    ]
};


const debitNotesBar = {
    labels: ["Panjagutta-Hyd", "Patney-Hyd", "Chandanagar-Hyd", "Ecil-Hyd", "Vijayawada", "Vizag", "Waranal"],
    datasets: [
        {
            data: [3.0, 1.8, 3.8, 5, 4.0, 2.3, 3.9]
        }
    ]
};

const topSalesByStoresBar = {
    labels: ["Kukatpally-Hyd", "Patny-Hyd", "Vijaywada", "Panjagutta-Hyd", "Warangal"],
    datasets: [
        {
            data: [45, 38.25, 35, 29.5, 20.55]
        }
    ]
}

global.previlage1 = '';
global.previlage2 = '';
global.previlage3 = '';
global.previlage4 = '';
global.previlage5 = '';
global.previlage6 = '';
global.previlage7 = '';
global.previlage8 = '';
global.isSuperAdmin = '';
global.isConfigUser = '';
global.username = ''
global.userrole = ''
global.domainName = ''

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            privilages: [],
        }
    }


    async componentDidMount() {
        AsyncStorage.getItem("domainName").then((value) => {
            global.domainName = value
        }).catch(() => {
            console.log('there is error getting storeId')
        })

        AsyncStorage.getItem("rolename").then((value) => {
            global.userrole = value;
        }).catch(() => {
            console.log('there is error getting storeId')
        })

        global.previlage1 = '';
        global.previlage2 = '';
        global.previlage3 = '';
        global.previlage4 = '';
        global.previlage5 = '';
        global.previlage6 = '';
        global.previlage7 = '';
        global.previlage8 = '';
        global.isSuperAdmin = '';
        global.isConfigUser = '';
        global.username = ''
   


        AsyncStorage.getItem("custom:isConfigUser").then((value) => {
            if (value === "true") {
                global.previlage7 = 'URM Portal';
                global.previlage5 = 'Accounting Portal';
            }
            else {
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
                                console.log(res.data)
                                let len = res.data["result"].length;
                                console.log(len)
                                if (len > 0) {
                                    for (let i = 0; i < len; i++) {
                                        let previlage = res.data["result"][i]
                                        if (previlage.name === "Dashboard") {
                                            global.previlage1 = 'Dashboard';
                                        }
                                        if (previlage.name === "Billing Portal") {
                                            global.previlage2 = 'Billing Portal';
                                        }
                                        if (previlage.name === "Inventory Portal") {
                                            global.previlage3 = 'Inventory Portal';
                                        }
                                        if (previlage.name === "Promotions & Loyalty") {
                                            global.previlage4 = 'Promotions & Loyalty';
                                        }
                                        if (previlage.name === "Accounting Portal") {
                                            global.previlage5 = 'Accounting Portal';
                                        }
                                        if (previlage.name === "Reports") {
                                            global.previlage6 = 'Reports';
                                        }
                                        if (previlage.name === "URM Portal") {
                                            global.previlage7 = 'URM Portal';
                                        }
                                    }
                                }
                            }
                        });
                    }
                    else {
                        console.log('vinod-------> privlage by name1111')
                        AsyncStorage.getItem("rolename").then((value) => {
                            global.userrole = value;
                            axios.get(UrmService.getPrivillagesByRoleName() + value).then((res) => {
                                if (res.data && res.data["isSuccess"] === "true") {
                                    console.log(res.data)
                                    let len = res.data["result"].parentPrivilages.length;
                                    // console.log(.name)
                                    if (len > 0) {
                                        for (let i = 0; i < len; i++) {
                                            let previlage = res.data["result"].parentPrivilages[i]
                                            if (previlage.name === "Dashboard") {
                                                global.previlage1 = 'Dashboard';
                                            }
                                            if (previlage.name === "Billing Portal") {
                                                global.previlage2 = 'Billing Portal';
                                            }
                                            if (previlage.name === "Inventory Portal") {
                                                global.previlage3 = 'Inventory Portal';
                                            }
                                            if (previlage.name === "Promotions & Loyalty") {
                                                global.previlage4 = 'Promotions & Loyalty';
                                            }
                                            if (previlage.name === "Accounting Portal") {
                                                global.previlage5 = 'Accounting Portal';
                                            }
                                            if (previlage.name === "Reports") {
                                                global.previlage6 = 'Reports';
                                            }
                                            if (previlage.name === "URM Portal") {
                                                global.previlage7 = 'URM Portal';
                                            }
                                        }
                                    }
                                }
                            });
                        }).catch(() => {
                            console.log('there is error saving domainDataId')
                        })

                    }
                }).catch(() => {
                    console.log('there is error getting storeId')
                })
            }
        }).catch(() => {
            console.log('there is error getting storeId')
        })



        const username = await AsyncStorage.getItem("username");
        axios.get(ProfileService.getUser() + username).then((res) => {
            if (res.data && res.data["isSuccess"] === "true") {
                global.username = res.data["result"].userName;
            }
        }).catch(() => {
            this.setState({ loading: false });
            alert('No user details get');
        });


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
                    <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}> Home </Text>
                </View>

                <ScrollView>
                    <View style={styles.container}>
                        {/* <Image
                            style={styles.image}
                            source={require('../assets/images/profilepic.png')}
                            resizeMode={"cover"} // <- needs to be "cover" for borderRadius to take effect on Android
                        />
                        <Text style={{ fontSize: 26, fontFamily: 'regular', color: '#353C40', marginLeft: 10, marginTop: 20 }}> {('Welcome,')} </Text>
                        <Text style={{ fontSize: 26, fontFamily: 'bold', color: '#353C40', marginLeft: 10, marginTop: 0 }}> {('Vinod Magham')} </Text> */}
                        <FlatList
                            style={styles.flatList}
                            horizontal
                            data={data}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                                if (item.key === 1) {
                                    return <View style={{
                                        height: 120,
                                        width: 250,
                                        borderWidth: 1,
                                        backgroundColor: "#33D087",
                                        borderColor: '#ffffff',
                                        borderRadius: 10,
                                        marginLeft: 10,
                                    }}>
                                        <Image source={require('../assets/images/todaysales.png')} style={{
                                            marginLeft: 20, marginTop: 40,
                                        }} />
                                        <Text style={{ fontSize: 15, alignItems: 'center', alignSelf: 'center', marginTop: -50, fontSize: 16, color: "#ffffff", fontFamily: 'regular' }}>
                                            Today's Sales
                                        </Text>
                                        <Text style={{ fontSize: 15, marginTop: 0, marginLeft: 80, fontSize: 30, color: "#ffffff", fontFamily: 'bold' }}>
                                            ₹ 14,221.50
                                        </Text>
                                    </View>
                                }
                                if (item.key === 2) {
                                    return <View style={{
                                        height: 120,
                                        width: 250,
                                        borderWidth: 1,
                                        backgroundColor: "#37CBE4",
                                        borderColor: '#ffffff',
                                        borderRadius: 10,
                                        marginLeft: 10,
                                    }}>
                                        <Image source={require('../assets/images/monthlysales.png')} style={{
                                            marginLeft: 20, marginTop: 40,
                                        }} />
                                        <Text style={{ fontSize: 15, alignItems: 'center', alignSelf: 'center', marginTop: -50, fontSize: 16, color: "#ffffff", fontFamily: 'regular' }}>
                                            Monthly's Sales
                                        </Text>
                                        <Text style={{ fontSize: 15, marginTop: 0, marginLeft: 80, fontSize: 30, color: "#ffffff", fontFamily: 'bold' }}>
                                            ₹ 14,221.50
                                        </Text>
                                    </View>
                                }
                                if (item.key === 3) {
                                    return <View style={{
                                        height: 120,
                                        width: 250,
                                        borderWidth: 1,
                                        backgroundColor: "#fc9834",
                                        borderColor: '#ffffff',
                                        borderRadius: 10,
                                        marginLeft: 10,
                                    }}>
                                        <Image source={require('../assets/images/monthlysales.png')} style={{
                                            marginLeft: 20, marginTop: 40,
                                        }} />
                                        <Text style={{ fontSize: 15, alignItems: 'center', alignSelf: 'center', marginTop: -50, marginLeft: 60, fontSize: 16, color: "#ffffff", fontFamily: 'regular' }}>
                                            This month sales v/s Last month
                                        </Text>
                                        <Text style={{ fontSize: 15, marginTop: 0, marginLeft: 60, fontSize: 30, color: "#ffffff", fontFamily: 'bold' }}>
                                            + 18.75%
                                        </Text>
                                    </View>

                                }
                                if (item.key === 4) {
                                    return <View style={{
                                        height: 120,
                                        width: 250,
                                        borderWidth: 1,
                                        backgroundColor: "#00C656",
                                        borderColor: '#ffffff',
                                        borderRadius: 10,
                                        marginLeft: 10,
                                    }}>
                                        <Image source={require('../assets/images/monthlysales.png')} style={{
                                            marginLeft: 20, marginTop: 40,
                                        }} />
                                        <Text style={{ fontSize: 15, alignItems: 'center', alignSelf: 'center', marginTop: -50, marginLeft: 20, fontSize: 16, color: "#ffffff", fontFamily: 'regular' }}>
                                            Today total Orders
                                        </Text>
                                        <Text style={{ fontSize: 15, marginTop: 0, alignItems: 'center', alignSelf: 'center', fontSize: 30, color: "#ffffff", fontFamily: 'bold' }}>
                                            55
                                        </Text>
                                    </View>
                                }
                            }}
                            ListFooterComponent={<View style={{ width: 15 }}></View>}
                        />

<View style={Device.isTablet ? styles.salesByCategoryChart_tablet : styles.salesByCategoryChart_mobile}>
                        <Text style={Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Sales % by category</Text>
                        <PieChart
                            data={salesByCategoryPie}
                            width={deviceWidth - 60}
                            height={Device.isTablet ? 300 : 220}
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            accessor="population"
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[0, 0]}
                            absolute
                        />
                    </View>
                    <View style={Device.isTablet ? styles.topSalesManChartContainer_tablet : styles.topSalesManChartContainer_mobile}>
                        <Text style={ Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Top 5 sales by category</Text>
                        <BarChart
                            style={Device.isTablet ? styles.topSalesManChart_tablet : styles.topSalesManChart_mobile}
                            data={topSalesManBar}
                            width={deviceWidth - 70}
                            height={Device.isTablet ? 400 : 350}
                            yLabelsOffset={30}
                            yAxisLabel="₹"
                            yAxisSuffix="k"
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            verticalLabelRotation={Device.isTablet ? 0 : 90}
                        />
                    </View>
                    <View style={Device.isTablet ? styles.debitNotesChartContainer_tablet : styles.debitNotesChartContainer_mobile}>
                        <Text style={ Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Debit Notes by stores</Text>
                        <BarChart
                            style={{ margin: 5 }}
                            data={debitNotesBar}
                            width={deviceWidth - 80}
                            height={Device.isTablet ? 380 : 550}
                            yLabelsOffset={30}
                            yAxisLabel="₹"
                            yAxisSuffix="L"
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            verticalLabelRotation={Device.isTablet ? 0 : 90}
                        />
                    </View>
                    <View style={Device.isTablet ? styles.topSalesByStoresChartContainer_tablet : styles.topSalesByStoresChartContainer_mobile}>
                        <Text style={ Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Top 5 Sales By Store</Text>
                        <BarChart
                            style={{ margin: 5 }}
                            data={topSalesByStoresBar}
                            width={deviceWidth - 70}
                            height={Device.isTablet ? 380 : 490}
                            yLabelsOffset={20}
                            yAxisLabel="₹"
                            yAxisSuffix="L"
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            verticalLabelRotation={Device.isTablet ? 0 : 90}
                        />
                    </View>
                    <View style={Device.isTablet ? styles.invoicesGeneratedChartContainer_tablet : styles.invoicesGeneratedChartContainer_mobile}>
                        <Text style={ Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Invoices generated</Text>
                        <PieChart
                            data={invoicesPie}
                            width={deviceWidth - 30}
                            height={Device.isTablet ? 330 : 280}
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            accessor="sales"
                            backgroundColor={"transparent"}
                            paddingLeft={"35"}
                            center={[0, 0]}
                            hasLegend="true"
                            absolute
                        />
                    </View>
                    <View style={Device.isTablet ? styles.salesSummaryChartContainer_tablet : styles.salesSummaryChartContainer_mobile}>
                        <Text style={ Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Sales summary</Text>
                        <PieChart
                            data={salesSummaryPie}
                            width={deviceWidth - 60}
                            height={Device.isTablet ? 230 : 180}
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            accessor="sales"
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[0, 0]}
                            absolute
                        />
                    </View>
                    <View style={Device.isTablet ? styles.activeInactiveChartContainer_tablet : styles.activeInactiveChartContainer_mobile}>
                        <Text style={ Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Active & InActive Promos</Text>
                        <PieChart
                            data={activeInactivePie}
                            width={deviceWidth - 60}
                            height={Device.isTablet ? 230 : 180}
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            accessor="promo"
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[0, 0]}
                            absolute
                        />
                    </View>
                </View>
                        {/* <View style={{ height: 40, backgroundColor: '#ffffff', width: deviceWidth, marginTop: 0, }}>

                            <Text onPress={() => this.statatics()} style={{ fontSize: 12, fontFamily: 'regular', color: '#ED1C24', position: 'absolute', right: 20, top: 20, }}> {('STATISTICS >')} </Text>

                        </View> */}

                        {/* <View style={{ height: 50, backgroundColor: '#e6e6e6', width: deviceWidth, marginTop: 0, }}>
                            <Text style={{ fontSize: 14, fontFamily: 'bold', color: '#353C40', marginLeft: 10, marginTop: 20 }}> {('Recent orders')} </Text>
                            <Text style={{ fontSize: 12, fontFamily: 'regular', color: '#ED1C24', position: 'absolute', right: 20, top: 20, }}> {('SEE ALL >')} </Text>
                        </View> */}
                        {/* <FlatList
                            ListHeaderComponent={this.renderHeader}
                            data={dummmydata}
                            keyExtractor={item => item.email}
                            renderItem={({ item, index }) => (
                                <View style={{
                                    height: 60,
                                    backgroundColor: 'white',
                                    borderBottomWidth: 5,
                                    borderBottomColor: '#e6e6e6',
                                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <View style={{ flexDirection: 'column', width: '100%', height: 60, }}>
                                        <Image source={require('../assets/images/iconmonstr-credit-card-thin.png')} style={{
                                            position: 'absolute', left: 20, top: 25,
                                        }} />
                                        <Text style={{ fontSize: 12, marginTop: 16, marginLeft: 60, fontFamily: 'medium', color: "#222222" }}>
                                            Order Id #6123{item.itemdesc}
                                        </Text>
                                        <Text style={{ fontSize: 10, marginLeft: 60, fontFamily: 'regular', color: '#828282', }}>
                                            Today, 10:45AM
                                        </Text>
                                        <Text style={{ fontSize: 16, fontFamily: 'medium', color: '#FE7C19', position: 'absolute', right: 20, top: 20, }}> {('₹ 14,221.50')} </Text>
                                    </View>
                                </View>
                            )}
                        /> */}

              
</ScrollView >
            </View>
              
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
        top: 30,
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

    // Styles For Mobiles
backButton_mobile: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 40,
    height: 40,
},
salesByCategoryChart_mobile: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 280,
    borderRadius: 10
},
chartTitle_mobile: {
    fontSize: 20,
    fontFamily: 'bold',
    marginTop: 20,
    marginLeft: 20
},
topSalesManChart_mobile: {
    margin: 5,
},
topSalesManChartContainer_mobile: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 420,
    borderRadius: 10
},
debitNotesChartContainer_mobile: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 620,
    borderRadius: 10
},
topSalesByStoresChartContainer_mobile: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 570,
    borderRadius: 10
},
invoicesGeneratedChartContainer_mobile: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 330,
    borderRadius: 10
},
salesSummaryChartContainer_mobile: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 230,
    borderRadius: 10
},
activeInactiveChartContainer_mobile: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 230,
    borderRadius: 10
},

// Styles For Tablet
viewsWidth_tablet: {
    backgroundColor: '#ffffff',
    width: deviceWidth,
    textAlign: 'center',
    fontSize: 28,
    height: 90,
},
backButton_tablet: {
    position: 'absolute',
    left: 10,
    top: 20,
    width: 90,
    height: 90,
},
headerTitle_tablet: {
    position: 'absolute',
    left: 70,
    top: 32,
    width: 300,
    height: 40,
    fontFamily: 'bold',
    fontSize: 24,
    color: '#353C40'
},
salesByCategoryChart_tablet: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 340,
    borderRadius: 10
},
chartTitle_tablet: {
    fontSize: 25,
    fontFamily: 'bold',
    marginTop: 20,
    marginLeft: 20
},
topSalesManChart_tablet: {
    margin: 10,
},
topSalesManChartContainer_tablet: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 460,
    borderRadius: 10
},
debitNotesChartContainer_tablet: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 450,
    borderRadius: 10
},
topSalesByStoresChartContainer_tablet: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 450,
    borderRadius: 10
},
invoicesGeneratedChartContainer_tablet: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 380,
    borderRadius: 10
},
salesSummaryChartContainer_tablet: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 280,
    borderRadius: 10
},
activeInactiveChartContainer_tablet: {
    margin: 20,
    backgroundColor: '#FFFFFF',
    height: 280,
    borderRadius: 10
},
})

