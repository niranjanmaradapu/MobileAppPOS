import React, { Component } from 'react'
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewSale from '../components/tabbar/NewSale';
import Settings from '../components/tabbar/Settings';


 
const Tab = createBottomTabNavigator();
class BottomTabBar extends Component {

 render() {
      return (
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName =  focused ? <Image source={require('../components/assets/images/home.png')} /> : <Image source={require('../components/assets/images/home.png')} />
              }
              else if (route.name === 'Retail') {
                iconName = focused ? <Image source={require('../components/assets/images/retail.png')} /> : <Image source={require('../components/assets/images/retail.png')} />
              }
              else if (route.name === 'Sales Bill') {
                iconName = focused ? <Image source={require('../components/assets/images/sales.png')} /> : <Image source={require('../components/assets/images/sales.png')} />
              } else if (route.name === 'Settings') {
                iconName = focused ? <Image source={require('../components/assets/images/settings.png')} /> : <Image source={require('../components/assets/images/settings.png')} />
              }
              return iconName;
            },
            tabBarActiveTintColor: '#0196FD',
            tabBarInactiveTintColor: '#48596B',
            tabBarLabel:() => {return null},
          })}
        >
          <Tab.Screen name="Home" options={{headerShown: false}} component={NewSale} />
          <Tab.Screen name="Retail" options={{headerShown: false}} component={NewSale} />
          <Tab.Screen name="Sales Bill" options={{headerShown: false}} component={NewSale} />
          <Tab.Screen name="Settings" options={{headerShown: false}} component={Settings} />
        </Tab.Navigator>
      );
  }
}
  
export default BottomTabBar