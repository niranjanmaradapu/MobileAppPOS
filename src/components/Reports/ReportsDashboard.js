import React, { Component } from 'react';
import { Text, View } from 'react-native';
// import ListOfReportsGraphsService from '../services/reports/ListOfReportsGraphsService';

export default class ReportsDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            invoicesGenerted: [],
            invoicesChart: {},
        };
    }

    // componentDidMount() {
    //     this.getInvoicesGenerated();
    //     this.getSalesSummary();
    // }

    // getInvoicesGenerated() {
    //     ListOfReportsGraphsService.getInvoicesGenerated().then(res => {
    //         if (res) {
    //             this.setState({ invoicesGenerted: res.data.result },
    //                 () => {
    //                     let indexName = [];
    //                     let indexCount = [];
    //                     let indexColor = [];

    //                     this.state.invoicesGenerted.forEach(data => {
    //                         indexName.push(data.month);
    //                         indexCount.push(data.amount);
    //                     });

    //                     colors.forEach(data => {
    //                         indexColor.push(data.normalColorCode);
    //                     });

    //                     this.setState({
    //                         invoicesChart: {
    //                             labels: indexName,
    //                             data: indexCount,
    //                             color: indexColor,
    //                         }
    //                     });
    //                 });

    //         }
    //     });
    // }

    render() {
        return (
            <View>
                <Text> Dashoard</Text>
                {/* <PieChart
                    data={this.state.invoicesChart}
                /> */}
            </View>
        );
    }
}
