import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Device from 'react-native-device-detection';
import colors from '../../colors.json';
import URMGraphsService from '../services/Graphs/URMGraphsService';
import { PieChart, BarChart } from 'react-native-chart-kit';
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
];

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

export default class UrmDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersData: [],
            activeUsersData: [],
            storesData: [],
            usersByRoleChart: {},
            activeInactiveUsersChart: [],
            storesVsEmployeesChart: {},
        };
    }


    componentDidMount() {
        this.getActiveUsers();
    }

    async getActiveUsers() {
        const clientId = await AsyncStorage.getItem("custom:clientId1");
        const param = '?clientId=' + clientId;
        axios.get(URMGraphsService.getActiveUsers() + param).then(response => {
            if (response) {
                this.setState({ activeUsersData: response.data.result },
                    () => {
                        console.log("ActiveUsersVSInactiveUser", this.state.activeUsersData);
                        let indexName = [];
                        let indexCount = [];
                        let indexColor = [];
                        let indexHoverColor = [];

                        this.state.activeUsersData.forEach(datas => {
                            indexName.push(datas.name);
                            indexCount.push(datas.count);
                            colors.forEach(data => {
                                indexColor.push(data.normalColorCode);
                                if (datas.name !== null) {
                                    console.log('sadsdsd')
                                }
                            });
                        });
                        for (let i = 0; i <this.state.activeUsersData.length; i++) {
                            this.state.activeInactiveUsersChart.push({
                                name:indexName[i], population: indexCount[i], color: indexColor[i], legendFontColor: "#7F7F7F",
                                legendFontSize: 15
                            })
                        }
                        this.setState({ activeInactiveUsersChart: this.state.activeInactiveUsersChart })
                    }
                );
            }
        });

    }


    render() {
        //  this.getActiveUsers()
        return (
            <View>
                {/* <Text>Dashboard</Text> */}
                {console.log(this.state.activeInactiveUsersChart)}
                <PieChart
                    data={this.state.activeInactiveUsersChart}
                    width={deviceWidth - 60}
                    height={Device.isTablet ? 300 : 220}
                    chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                    accessor="population"
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[0, 0]}
                    absolute
                />
                {/* <BarChart
                    chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        height: Device.isTablet ? 40 : 30,

    }
});