import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { Component } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Device from 'react-native-device-detection';
import colors from '../../colors.json';
import URMGraphsService from '../services/Graphs/URMGraphsService';
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

export default class UrmDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clientId: "",
            usersData: [],
            activeUsersData: [],
            storesData: [],
            usersByRoleChart: [],
            activeInactiveUsersChart: [],
            storesVsEmployeesChart: [],
            activeCount: 0,
            inactiveCount: 0,
            storesCount: 0,
            employeesCount: 0,
            usersByRolesValues: [],
        };
    }


    async componentDidMount() {
        this.getActiveUsers();
        this.getStoresVsEmployees();
        this.getUsersByRole();
        // this.setState({ clientId: clientId });
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
                                // if (datas.name !== null) {
                                //     console.log('data is null');
                                // }
                            });
                        });
                        for (let i = 0; i < this.state.activeUsersData.length; i++) {
                            if (indexName[i] === 'ActiveUsers') {
                                this.setState({ activeCount: indexCount[i] });
                            } else if (indexName[i] === 'inactiveUsers') {
                                this.setState({ inactiveCount: indexCount[i] });
                            }
                            this.state.activeInactiveUsersChart.push({
                                name: indexName[i],
                                count: indexCount[i],
                                color: indexColor[i],
                                legendFontColor: "#7F7F7F",
                                legendFontSize: 0
                            });
                        }
                        this.setState({ activeInactiveUsersChart: this.state.activeInactiveUsersChart });
                    }
                );
            }
        });
    }

    async getStoresVsEmployees() {
        const clientId = await AsyncStorage.getItem("custom:clientId1");
        const param = '?clientId=' + clientId;
        axios.get(URMGraphsService.getStoresVsEmployees() + param).then(response => {
            if (response) {
                this.setState({ storesData: response.data.result },
                    () => {
                        console.log("StoresVsEmployees", this.state.storesData);
                        let indexName = [];
                        let indexCount = [];
                        let indexColor = [];
                        let indexHoverColor = [];

                        this.state.storesData.forEach(datas => {
                            indexName.push(datas.name);
                            indexCount.push(datas.count);
                            colors.forEach(datas => {
                                indexColor.push(datas.normalColorCode);
                            });
                        });
                        for (let i = 0; i < this.state.storesData.length; i++) {
                            if (indexName[i] === 'stores') {
                                this.setState({ storesCount: indexCount[i] });
                            } else if (indexName[i] === "users") {
                                this.setState({ employeesCount: indexCount[i] });
                            }
                            this.state.storesVsEmployeesChart.push({
                                name: indexName[i],
                                count: indexCount[i],
                                color: indexColor[i],
                                legendFontColor: "#7F7F7F",
                                legendFontSize: Device.isTablet ? 20 : 15
                            });
                        }
                        this.setState({ storesVsEmployeesChart: this.state.storesVsEmployeesChart });

                    }
                );
            }
        });
    }


    async getUsersByRole() {
        const clientId = await AsyncStorage.getItem("custom:clientId1");
        const param = '?clientId=' + clientId;
        axios.get(URMGraphsService.getUsersByRole() + param).then(res => {
            if (res) {
                this.setState({ usersData: res.data.result },
                    () => {
                        console.log("usersByRole", this.state.usersData);
                        let indexName = [];
                        let indexCount = [];
                        let indexColor = [];
                        let indexHoverColor = [];

                        this.state.usersData.forEach(data => {
                            indexName.push(data.name);
                            indexCount.push(data.count);
                            colors.forEach(data => {
                                indexColor.push(data.normalColorCode);
                            });
                        });

                        for (var i = 0; i < this.state.usersData.length; i++) {
                            if (indexCount[i] > 0) {
                                this.state.usersByRolesValues.push({
                                    name: indexName[i],
                                    count: indexCount[i],
                                    color: indexColor[i],
                                });
                                this.setState({ usersByRolesValues: this.state.usersByRolesValues });
                            }
                            this.state.usersByRoleChart.push({
                                name: indexName[i],
                                count: indexCount[i],
                                color: indexColor[i],
                                legendFontColor: "#7F7F7F",
                                legendFontSize: Device.isTablet ? 20 : 15
                            });
                        }

                        this.setState({ usersByRoleChart: this.state.usersByRoleChart });
                    }
                );
                console.log(this.state.activeInactiveUsersChart);
                console.log(this.state.usersByRolesValues);

            }
        });
    }


    render() {
        //  this.getActiveUsers()
        return (
            <View>
                {/* <Text>Dashboard</Text> */}
                {/* {console.log(this.state.activeInactiveUsersChart)} */}
                <View style={styles.chartMaincontainer}>
                    <Text style={Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Active vs InActive Users</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: Device.isTablet ? deviceWidth - 260 : deviceWidth - 180 }}>
                        <PieChart
                            style={{ paddingTop: 20, }}
                            data={this.state.activeInactiveUsersChart}
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
                                data={this.state.activeInactiveUsersChart}
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
                    <Text style={Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Stores vs POS Employees</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: Device.isTablet ? deviceWidth - 260 : deviceWidth - 160 }}>
                        <PieChart
                            style={{ paddingTop: 20, }}
                            data={this.state.storesVsEmployeesChart}
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
                                data={this.state.storesVsEmployeesChart}
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
                    <Text style={Device.isTablet ? styles.chartTitle_tablet : styles.chartTitle_mobile}>Users By Roles</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: Device.isTablet ? deviceWidth - 260 : deviceWidth - 160 }}>
                        <PieChart
                            style={{ paddingTop: 20, }}
                            data={this.state.usersByRoleChart}
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
                                data={this.state.usersByRolesValues}
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
                        {/* {console.log(this.state.usersByRolesValues)} */}
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