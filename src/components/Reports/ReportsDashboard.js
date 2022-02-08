import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import Device from 'react-native-device-detection';
import colors from '../../colors.json';
import ReportsGraphsService from '../services/Graphs/ReportsGraphsService';
var deviceWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    barPercentage: Device.isTablet ? 1 : 0.5,
    height: 5000,
    fillShadowGradient: `#25f1d5`,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `#25f1d5`,
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
            topSalesChart: {
                labels: [],
                datasets: [
                    {
                        data: []
                    }
                ]
            },
            storeId: '',
            domainId: 1,
            storeNames: [],
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



        AsyncStorage.getItem("storeName").then((value) => {

            this.setState({ storeName: value });

        }).catch(() => {

            console.log('there is error getting storeId');

        });
    }

    getInvoicesGenerated() {
        const params = '?storeId=' + this.state.storeId + '&domainId=' + this.state.domainId;
        axios.get(ReportsGraphsService.getInvocesGenerated() + params).then(res => {
            if (res) {
                if (res.data.result !== "null" && res.data.result.length > 0) {
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
            }
        }).catch(error => console.log(error));
    }

    getSalesSummary() {
        const params = '?storeId=' + this.state.storeId + '&domainId=' + this.state.domainId;
        axios.get(ReportsGraphsService.getSaleSummary() + params).then(response => {
            console.warn("hello");
            if (response) {
                if (response.data.result !== "null" && response.data.result.length > 0) {
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
            }
            console.log("sales Summary" + this.state.salesSummaryChart);
        });
    }

    getActiveVsInactivePromos() {
        const params = '?storeId=' + this.state.storeId + '&domainId=' + this.state.domainId;
        axios.get(ReportsGraphsService.getActiveInactivePromos() + params).then(response => {
            if (response) {
                if (response.data.result !== "null" && response.data.result.length > 0) {
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
                            this.setState({ activeVsInactiveChart: this.state.activeVsInactiveChart });
                        });
                }
            }
        });
    }

    getTopFiveSales() {
        const param = '?domainId=' + this.state.domainId;
        axios.get(ReportsGraphsService.getTopFiveSales() + param).then(response => {
            console.log('Top Five Sales', response.data);
            if (response) {
                if (response.data.result !== "null" && response.data.result.length > 0) {
                    this.setState({ topSalesData: response.data.result },
                        () => {
                            let indexName = [];
                            let indexCount = [];
                            let indexColor = [];
                            let indexLabels = [];

                            this.state.topSalesData.forEach(datas => {
                                indexName.push(datas.name);
                                indexCount.push(datas.amount);
                            });

                            console.log("index", indexName, indexCount);
                            this.setState({
                                topSalesChart: {
                                    labels: indexName,
                                    datasets: [
                                        {
                                            data: indexCount
                                        }
                                    ]
                                }
                            });

                            console.log("store Name", indexLabels);
                            console.log("store Id", indexName);
                        });
                }
            }
            console.log("top sales Chart", this.state.topSalesChart);
        });
    }

    render() {
        return (
            <View>
                <View style={[styles.chartMaincontainer, { height: Device.isTablet ? 400 : 450 }]}>
                    <Text style={Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Top 5 Sales</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: Device.isTablet ? deviceWidth - 260 : deviceWidth - 160 }}>
                        <BarChart
                            style={{ paddingTop: 20 }}
                            data={this.state.topSalesChart}
                            width={Device.isTablet ? deviceWidth - 120 : deviceWidth - 60}
                            height={380}
                            yLabelsOffset={20}
                            yAxisLabel="₹"
                            fromZero
                            chartConfig={chartConfig}
                            verticalLabelRotation={Device.isTablet ? 0 : 45}
                        // paddingLeft={"15"}
                        // yAxisSuffix="L"
                        // center={[0, 0]}
                        // absolute
                        />
                    </View>
                </View>

                <View style={styles.chartMaincontainer}>
                    <Text style={Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Invoices Generated</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: Device.isTablet ? deviceWidth - 260 : deviceWidth - 160 }}>
                        <PieChart
                            data={this.state.invoicesChart}
                            style={{ paddingTop: 20, paddingLeft: 20 }}
                            width={Device.isTablet ? deviceWidth - 60 : deviceWidth - 20}
                            height={Device.isTablet ? 300 : 220}
                            chartConfig={chartConfig}
                            accessor="count"
                            backgroundColor={"transparent"}
                            hasLegend={false}
                        // paddingLeft={"15"}
                        // center={[0, 0]}
                        // absolute
                        />
                        <View style={{ marginTop: Device.isTablet ? 40 : 20 }}>
                            <FlatList
                                style={{ paddingRight: 20 }}
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
                            data={this.state.salesSummaryChart}
                            style={{ paddingTop: 20, paddingLeft: 20 }}
                            width={Device.isTablet ? deviceWidth - 60 : deviceWidth - 20} height={Device.isTablet ? 300 : 220}
                            chartConfig={chartConfig}
                            accessor="count"
                            backgroundColor={"transparent"}
                            hasLegend={false}
                        // paddingLeft={"15"}
                        // center={[0, 0]}
                        // absolute
                        />
                        <View style={{ marginTop: Device.isTablet ? 40 : 20 }}>
                            <FlatList
                                style={{ paddingRight: 20 }}
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
                            data={this.state.activeVsInactiveChart}
                            style={{ paddingTop: 20, paddingLeft: 20 }}
                            width={Device.isTablet ? deviceWidth - 60 : deviceWidth - 20} height={Device.isTablet ? 300 : 220}
                            chartConfig={chartConfig}
                            accessor="count"
                            backgroundColor={"transparent"}
                            hasLegend={false}
                        // paddingLeft={"15"}
                        // center={[0, 0]}
                        // absolute
                        />
                        <View style={{ marginTop: Device.isTablet ? 40 : 20 }}>
                            <FlatList
                                style={{ paddingRight: 20 }}
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