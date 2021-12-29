import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AccountManagement from '../components/Accounting/AccountManagement';

const Stack = createStackNavigator();
export default class AccountingNaviagtion extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName='AccountManagement' >
                <Stack.Screen name='AccountManagement' options={{ headerShown: false }} component={AccountManagement} />
            </Stack.Navigator>
        )
    }
}
2