import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView, FlatList } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import { DrawerActions } from '@react-navigation/native';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';
const data = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }];
import {
    BarChart,
    PieChart
} from "react-native-chart-kit";

const datapie = [
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

const invoices = [
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

const salesSummary = [
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

const activeInactive = [
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

const chartConfig = {
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

const dataBar = {
    labels: ["John", "Raju", "Gayathri", "Vignesh", "Ramya"],
    datasets: [
        {
            data: [45, 35, 28, 18.5, 12]
        }
    ]
};



const debitBar = {
    labels: ["Panjagutta-Hyd", "Patney-Hyd", "Chandanagar-Hyd", "Ecil-Hyd", "Vijayawada", "Vizag", "Waranal"],
    datasets: [
        {
            data: [3.0, 1.8, 3.8, 5, 4.0, 2.3, 3.9]
        }
    ]
};

const topSales = {
    labels: ["Kukatpally-Hyd", "Patny-Hyd", "Vijaywada", "Panjagutta-Hyd", "Warangal"],
    datasets: [
        {
            data: [45, 38.25, 35, 29.5, 20.55]
        }
    ]
}

class Statitics extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
        }
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }


    statatics() {

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
                    <View style={styles.viewswidth}>
                        <TouchableOpacity style={{
                            position: 'absolute',
                            left: 10,
                            top: 10,
                            width: 40,
                            height: 40,
                        }} onPress={() => this.handleBackButtonClick()}>
                            <Image source={require('../../assets/images/backButton.png')} />
                        </TouchableOpacity>
                        <Text style={{
                            position: 'absolute',
                            left: 70,
                            top: 27,
                            width: 300,
                            height: 20,
                            fontFamily: 'bold',
                            fontSize: 18,
                            color: '#353C40'
                        }}> Statistics </Text>

                    </View>

                    <View style={{
                        margin: 20,
                        backgroundColor: '#FFFFFF',
                        height: 280,
                        borderRadius: 10
                    }}>
                        <Text style={{ fontSize: 20, fontFamily: 'bold', marginTop: 20, marginLeft: 20 }}>Sales % by category</Text>
                        <PieChart
                            data={datapie}
                            width={deviceWidth - 60}
                            height={220}
                            chartConfig={chartConfig}
                            accessor="population"
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[0, 0]}
                            absolute
                        />
                       
                    </View>

                    <View style={{
                        margin: 20,
                        backgroundColor: '#FFFFFF',
                        height: 450,
                        borderRadius: 10
                    }}>
                        <Text style={{ fontSize: 20, fontFamily: 'bold', marginTop: 20, marginLeft: 20 }}>Top 5 sales by category</Text>

                        <BarChart
                            style={{ margin: 5 }}
                            data={dataBar}
                            width={deviceWidth - 60}
                            height={400}
                            yLabelsOffset={30}
                            yAxisLabel="₹"
                            yAxisSuffix="k"
                            chartConfig={chartConfig}
                            verticalLabelRotation={90}
                        />
                    </View>

                    <View style={{
                        margin: 20,
                        backgroundColor: '#FFFFFF',
                        height: 600,
                        borderRadius: 10
                    }}>
                        <Text style={{ fontSize: 20, fontFamily: 'bold', marginTop: 20, marginLeft: 20 }}>Debit Notes by stores</Text>

                        <BarChart
                            
                            data={debitBar}
                            width={deviceWidth - 60}
                            height={550}
                            yLabelsOffset={30}
                            yAxisLabel="₹"
                            yAxisSuffix="L"
                            chartConfig={chartConfig}
                            verticalLabelRotation={90}
                        />
                    </View>

                    <View style={{
                        margin: 20,
                        backgroundColor: '#FFFFFF',
                        height: 550,
                        borderRadius: 10
                    }}>
                        <Text style={{ fontSize: 20, fontFamily: 'bold', marginTop: 20, marginLeft: 20 }}>Top 5 Sales By Store</Text>

                        <BarChart
                            style={{ margin: 5 }}
                            data={topSales}
                            width={deviceWidth - 60}
                            height={490}
                            yLabelsOffset={20}
                            yAxisLabel="₹"
                            yAxisSuffix="L"
                            chartConfig={chartConfig}
                            verticalLabelRotation={90}
                        />
                    </View>         

                    <View style={{
                        margin: 20,
                        backgroundColor: '#FFFFFF',
                        height: 330,
                        borderRadius: 10
                    }}>
                        <Text style={{ fontSize: 20, fontFamily: 'bold', marginTop: 20, marginLeft: 20 }}>Invoices generated</Text>
                        <PieChart
                            data={invoices}
                            width={deviceWidth - 30}
                            height={280}
                            chartConfig={chartConfig}
                            accessor="sales"
                            backgroundColor={"transparent"}
                            paddingLeft={"35"}
                            center={[0, 0]}
                            hasLegend="true"
                            absolute
                        />
                       
                    </View>

                    <View style={{
                        margin: 20,
                        backgroundColor: '#FFFFFF',
                        height: 230,
                        borderRadius: 10
                    }}>
                        <Text style={{ fontSize: 20, fontFamily: 'bold', marginTop: 20, marginLeft: 20 }}>Sales summary</Text>
                        <PieChart
                            data={salesSummary}
                            width={deviceWidth - 60}
                            height={180}
                            chartConfig={chartConfig}
                            accessor="sales"
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[0, 0]}
                            absolute
                        />
                       
                    </View>

                    <View style={{
                        margin: 20,
                        backgroundColor: '#FFFFFF',
                        height: 230,
                        borderRadius: 10
                    }}>
                        <Text style={{ fontSize: 20, fontFamily: 'bold', marginTop: 20, marginLeft: 20 }}>Active & InActive Promos</Text>
                        <PieChart
                            data={activeInactive}
                            width={deviceWidth - 60}
                            height={180}
                            chartConfig={chartConfig}
                            accessor="promo"
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[0, 0]}
                            absolute
                        />
                       
                    </View>

                </View>
            </ScrollView>
        )
    }
}
export default Statitics


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
        height: 70,
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
