import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView, FlatList } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import { DrawerActions } from '@react-navigation/native';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';
import Device from 'react-native-device-detection'


const data = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }];
import {
    BarChart,
    PieChart
} from "react-native-chart-kit";


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
                {Device.isTablet ? <Text>Tablet</Text> : <Text>Mobile</Text>}
                <View style={styles.container}>
                    <View style={styles.viewswidth}>
                        <TouchableOpacity style={styles.backButton} onPress={() => this.handleBackButtonClick()}>
                            <Image source={require('../../assets/images/backButton.png')} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}> Statistics </Text>

                    </View>
                    <View style={Device.isTablet ? styles.tabletContainer : styles.mobileContainer}>
                        <Text style={styles.chartTitle}>Sales % by category</Text>
                        <PieChart
                            data={datapie}
                            width={deviceWidth - 60}
                            height={220}
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            accessor="population"
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[0, 0]}
                            absolute
                        />

                    </View>

                    <View style={Device.isTablet ? styles.tabletContainer : styles.mobileContainer}>
                        <Text style={styles.chartTitle}>Top 5 sales by category</Text>

                        <BarChart
                            style={{ margin: 5 }}
                            data={dataBar}
                            width={deviceWidth - 70}
                            height={400}
                            yLabelsOffset={30}
                            yAxisLabel="₹"
                            yAxisSuffix="k"
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            verticalLabelRotation={90}
                        />
                    </View>

                    <View style={Device.isTablet ? styles.tabletContainer : styles.mobileContainer}>
                        <Text style={styles.chartTitle}>Debit Notes by stores</Text>

                        <BarChart
                            style={{ margin: 5 }}
                            data={debitBar}
                            width={deviceWidth - 80}
                            height={550}
                            yLabelsOffset={30}
                            yAxisLabel="₹"
                            yAxisSuffix="L"
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            verticalLabelRotation={90}
                        />
                    </View>

                    <View style={Device.isTablet ? styles.tabletContainer : styles.mobileContainer}>
                        <Text style={styles.chartTitle}>Top 5 Sales By Store</Text>
                        <BarChart
                            style={{ margin: 5 }}
                            data={topSales}
                            width={deviceWidth - 70}
                            height={490}
                            yLabelsOffset={20}
                            yAxisLabel="₹"
                            yAxisSuffix="L"
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            verticalLabelRotation={90}
                        />
                    </View>

                    <View style={Device.isTablet ? styles.tabletContainer : styles.mobileContainer}>
                        <Text style={styles.chartTitle}>Invoices generated</Text>
                        <PieChart
                            data={invoices}
                            width={deviceWidth - 30}
                            height={280}
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            accessor="sales"
                            backgroundColor={"transparent"}
                            paddingLeft={"35"}
                            center={[0, 0]}
                            hasLegend="true"
                            absolute
                        />

                    </View>

                    <View style={Device.isTablet ? styles.tabletContainer : styles.mobileContainer}>
                        <Text style={styles.chartTitle}>Sales summary</Text>
                        <PieChart
                            data={salesSummary}
                            width={deviceWidth - 60}
                            height={180}
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            accessor="sales"
                            backgroundColor={"transparent"}
                            paddingLeft={"15"}
                            center={[0, 0]}
                            absolute
                        />

                    </View>

                    <View style={Device.isTablet ? styles.tabletContainer : styles.mobileContainer}>
                        <Text style={styles.chartTitle}>Active & InActive Promos</Text>
                        <PieChart
                            data={activeInactive}
                            width={deviceWidth - 60}
                            height={180}
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
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
    // Tablet
    backButton: {
        position: 'absolute',
        left: 10,
        top: 10,
        width: 40,
        height: 40,
    },
    headerTitle: {
        position: 'absolute',
        left: 70,
        top: 27,
        width: 300,
        height: 20,
        fontFamily: 'bold',
        fontSize: 18,
        color: '#353C40'
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FAFAFF'
    },
    viewswidth: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 70,
    },
    mobileContainer: {
        margin: 20,
        backgroundColor: '#FFFFFF',
        height: 280,
        borderRadius: 10
    },
    chartTitle: {
        fontSize: 20,
        fontFamily: 'bold',
        marginTop: 20,
        marginLeft: 20
    },
    tabletContainer: {
        backgroundColor: '#ffffff',
        margin: 30,
        height: 600,
        borderRadius: 15
    }
});
