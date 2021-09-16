import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import SplashScreen from '../components/SplashScreen';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
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

function LoginAndSignUp() {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
                <Stack.Screen name="Signup" options={{ headerShown: false }} component={SignUp} />
            </Stack.Navigator>

    );
}


export default AppRoute