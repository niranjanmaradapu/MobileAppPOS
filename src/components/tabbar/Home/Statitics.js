import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import Device from 'react-native-device-detection'
import {
    BarChart,
    PieChart
} from "react-native-chart-kit";

var deviceWidth = Dimensions.get('window').width;

const data = [{ key: 1 }, { key: 2 }, { key: 3 }, { key: 4 }];
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
                <View style={styles.mainContainer}>
                    <View style={Device.isTablet ? styles.viewsWidth_tablet : styles.viewsWidth_mobile}>
                        <TouchableOpacity style={Device.isTablet ? styles.backButton_tablet : styles.backButton_mobile} onPress={() => this.handleBackButtonClick()}>
                            <Image source={require('../../assets/images/backButton.png')} />
                        </TouchableOpacity>
                        <Text style={Device.isTablet ? styles.headerTitle_tablet : styles.headerTitle_mobile}> Statistics </Text>
                    </View>
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
            </ScrollView>
        )
    }
}

export default Statitics

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    },

// Styles For Mobiles
    viewsWidth_mobile: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 70,
    },
    backButton_mobile: {
        position: 'absolute',
        left: 10,
        top: 10,
        width: 40,
        height: 40,
    },
    headerTitle_mobile: {
        position: 'absolute',
        left: 70,
        top: 27,
        width: 300,
        height: 20,
        fontFamily: 'bold',
        fontSize: 18,
        color: '#353C40'
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