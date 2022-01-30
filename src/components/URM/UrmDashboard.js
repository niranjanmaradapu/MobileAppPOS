import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Device from 'react-native-device-detection';
import colors from '../../colors.json';
import URMGraphsService from '../services/Graphs/URMGraphsService';

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

export default class UrmDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersData: [],
            activeUsersData: [],
            storesData: [],
            usersByRoleChart: {},
            activeInactiveUsersChart: {},
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

                        this.state.activeUsersData.forEach(data => {
                            indexName.push(data.name);
                            indexCount.push(data.count);

                        });

                        colors.forEach(data => {
                            indexColor.push(data.normalColorCode);
                            // indexHoverColor.push(data.hoverColorCode);
                        });

                        this.setState({
                            activeInactiveUsersChart: {
                                labels: indexName,
                                promos: indexCount,
                                color: indexColor,
                                legendFontSize: 15
                            }
                        });
                    }
                );
            }
        });

    }


    render() {
        return (
            <View>
                <Text>Dashboard</Text>
                {console.log(this.state.activeInactiveUsersChart)}
                {/* <PieChart
                    data={this.state.activeInactiveUsersChart}
                    chartConfig={Device.isTablet ? chartConfigTablet : chartConfigMobile}
                /> */}
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