import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Device from 'react-native-device-detection';
import colors from '../../colors.json';
import ReportsGraphsService from '../services/Graphs/ReportsGraphsService';
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


export default class ReportsDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invoicesGenerted: [],
            invoicesChart: [],
            salesSummaryData: [],
            salesSummaryChart: [],
            activeVsInactiveData: [],
            activeVsInactiveChart: [],
            topSalesData: [],
            topSalesChart: {},
            storeId: '',
        };
    }

    componentDidMount() {
        AsyncStorage.getItem("storeId").then((value) => {
            storeStringId = value;
            this.setState({ storeId: parseInt(storeStringId) },
                () => {
                    this.getInvoicesGenerated();
                    this.getActiveVsInactivePromos();
                    this.getSalesSummary();
                    this.getTopFiveSales();
                });
            console.log(this.state.storeId);
        }).catch(() => {
            console.log('there is error getting storeId');
        });

    }

    getInvoicesGenerated() {
        const param = '?storeId=' + this.state.storeId;
        axios.get(ReportsGraphsService.getInvocesGenerated() + param).then(res => {
            if (res) {
                this.setState({ invoicesGenerted: res.data.result },
                    () => {
                        let indexName = [];
                        let indexCount = [];
                        let indexColor = [];

                        this.state.invoicesGenerted.forEach(data => {
                            indexName.push(data.month);
                            indexCount.push(data.amount);
                            colors.forEach(data => {
                                indexColor.push(data.normalColorCode);
                            });
                        });

                        for (var i = 0; i < this.state.invoicesGenerted.length; i++) {
                            this.state.invoicesChart.push({
                                name: indexName[i],
                                count: indexCount[i],
                                color: indexColor[i]
                            });
                        }
                        this.setState({ invoicesChart: this.state.invoicesChart });
                    });

            }
        }).catch(error => console.log(error));
    }

    getSalesSummary() {
        axios.get(ReportsGraphsService.getSaleSummary()).then(response => {
            console.warn("hello");
            if (response) {
                this.setState({ salesSummaryData: response.data.result },
                    () => {
                        let indexName = [];
                        let indexCount = [];
                        let indexColor = [];

                        this.state.salesSummaryData.forEach(data => {
                            indexName.push(data.name);
                            indexCount.push(data.amount);
                            colors.forEach(data => {
                                indexColor.push(data.normalColorCode);
                            });
                        });

                        for (var i = 0; i < this.state.salesSummaryData.length; i++) {
                            this.state.salesSummaryChart.push({
                                name: indexName[i],
                                count: indexCount[i],
                                color: indexColor[i]
                            });
                        }

                        this.setState({ salesSummaryChart: this.state.salesSummaryChart });
                    });
            }
            console.log("sales Summary" + this.state.salesSummaryChart);
        });
    }

    getActiveVsInactivePromos() {
        axios.get(ReportsGraphsService.getActiveInactivePromos()).then(response => {
            if (response) {
                console.log('Active Inactive Promos', response.data.result);
                this.setState({ activeVsInactiveData: response.data.result },
                    () => {
                        let indexName = [];
                        let indexCount = [];
                        let indexColor = [];

                        this.state.activeVsInactiveData.forEach(data => {
                            indexName.push(data.name);
                            indexCount.push(data.count);
                            colors.forEach(data => {
                                indexColor.push(data.normalColorCode);
                            });
                        });

                        for (var i = 0; i < this.state.activeVsInactiveData.length; i++) {
                            this.state.activeVsInactiveChart.push({
                                name: indexName[i],
                                count: indexCount[i],
                                color: indexColor[i]
                            });
                        }
                    });
            }
        });

    }
    getTopFiveSales() {
        axios.get(ReportsGraphsService.getTopFiveSales()).then(response => {
            console.log('Top Five Sales', response.data);
            if (response) {
                this.setState({ topSales: response.data.result },
                    () => {
                        let indexName = [];
                        let indexCount = [];
                        let indexColor = [];

                        if (this.state.topSalesData && this.state.topSales.length > 0) {
                            this.state.topSales.forEach(data => {
                                indexName.push(data.storeId);
                                indexCount.push(data.amount);
                                colors.forEach(data => {
                                    indexColor.push(data.normalColorCode);
                                });
                            });

                            for (var i = 0; i < this.state.topSalesData.length; i++) {
                                this.state.topSalesChart.push({
                                    labels: indexName,
                                    datasets: [
                                        {
                                            data: indexCount
                                        }
                                    ]
                                });
                            }

                            this.setState({ topSalesChart: this.state.topSalesChart });
                        }

                        console.log(this.state.topSalesChart);
                    });
            }
            console.log(this.state.topSalesChart);
        });
    }

    render() {
        return (
            <View>
                <View>
                    {/* <BarChart
                        data={this.state.topSalesChart}
                        width={deviceWidth - 60}
                        height={Device.isTablet ? 300 : 220}
                        chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                        accessor="population"
                        backgroundColor={"transparent"}
                    // paddingLeft={"15"}
                    // center={[0, 0]}
                    // absolute
                    /> */}
                </View>

                <View style={styles.chartMaincontainer}>
                    <Text style={Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Invoices Generated</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: Device.isTablet ? deviceWidth - 260 : deviceWidth - 160 }}>
                        <PieChart
                            style={{ paddingTop: 20, }}
                            data={this.state.invoicesChart}
                            width={deviceWidth - 60}
                            height={Device.isTablet ? 300 : 220}
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            accessor="count"
                            backgroundColor={"transparent"}
                            hasLegend={false}
                        // paddingLeft={"15"}
                        // center={[0, 0]}
                        // absolute
                        />
                        <View style={{ marginTop: Device.isTablet ? 40 : 20 }}>
                            <FlatList
                                data={this.state.invoicesChart}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ fontSize: Device.isTablet ? 20 : 15, fontFamily: 'medium', marginRight: 10, color: item.color }}>{item.name} : {item.count}</Text>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.chartMaincontainer}>
                    <Text style={Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Sales Summary</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: Device.isTablet ? deviceWidth - 260 : deviceWidth - 160 }}>
                        <PieChart
                            style={{ paddingTop: 20, }}
                            data={this.state.salesSummaryChart}
                            width={deviceWidth - 60}
                            height={Device.isTablet ? 300 : 220}
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            accessor="count"
                            backgroundColor={"transparent"}
                            hasLegend={false}
                        // paddingLeft={"15"}
                        // center={[0, 0]}
                        // absolute
                        />
                        <View style={{ marginTop: Device.isTablet ? 40 : 20 }}>
                            <FlatList
                                data={this.state.salesSummaryChart}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ fontSize: Device.isTablet ? 20 : 15, fontFamily: 'medium', marginRight: 10, color: item.color }}>{item.name} : {item.count}</Text>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.chartMaincontainer}>
                    <Text style={Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Active vs Inactive Promos</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: Device.isTablet ? deviceWidth - 260 : deviceWidth - 160 }}>
                        <PieChart
                            style={{ paddingTop: 20, }}
                            data={this.state.activeVsInactiveChart}
                            width={deviceWidth - 60}
                            height={Device.isTablet ? 300 : 220}
                            chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                            accessor="count"
                            backgroundColor={"transparent"}
                            hasLegend={false}
                        // paddingLeft={"15"}
                        // center={[0, 0]}
                        // absolute
                        />
                        <View style={{ marginTop: Device.isTablet ? 40 : 20 }}>
                            <FlatList
                                data={this.state.activeVsInactiveChart}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (
                                    <View style={{ flexDirection: 'column' }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={{ fontSize: Device.isTablet ? 20 : 15, fontFamily: 'medium', marginRight: 10, color: item.color }}>{item.name} : {item.count}</Text>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    chartMaincontainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: Device.isTablet ? 350 : 300,
        width: deviceWidth - 40,
        margin: 20,
        borderRadius: 20,
    },
    chartTitle_tablet: {
        fontSize: 25,
        fontFamily: 'bold',
        marginTop: 20,
        marginLeft: 20,
        position: 'absolute',
        top: 0,
        left: 20
    },
    chartTitle_mobile: {
        fontSize: 20,
        fontFamily: 'bold',
        marginTop: 20,
        marginLeft: 20,
        position: 'absolute',
        top: 0,
        left: 20
    },
});