import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import SplashScreen from '../components/SplashScreen';
import AuthNavigation from './AuthNavigation';

const Stack = createStackNavigator();
function AppRoute() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen} />
                <Stack.Screen name="AuthNavigation" options={{ headerShown: false }} component={AuthNavigation} />
                {/* <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignUp} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppRoute