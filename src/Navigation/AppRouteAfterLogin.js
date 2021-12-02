import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeNavigation from './HomeNavigation';
import SplashScreen from '../components/SplashScreen';

const Stack = createStackNavigator();
function AppRouteAfterLogin() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen} />
                <Stack.Screen name="HomeNavigation" options={{ headerShown: false }} component={HomeNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppRouteAfterLogin