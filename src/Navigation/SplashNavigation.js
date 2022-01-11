import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AuthNavigation from '../Navigation/AuthNavigation'
import SplashScreen from '../components/Welcome/SplashScreen';

const Stack = createStackNavigator();

export default class SplashNavigation extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen} />
                <Stack.Screen name="AuthNavigation" options={{ headerShown: false }} component={AuthNavigation} />
            </Stack.Navigator>
        );
    }
}

