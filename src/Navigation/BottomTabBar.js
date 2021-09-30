import React, { Component } from 'react'
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewSale from '../components/tabbar/NewSale';
import Settings from '../components/tabbar/Settings';
import ScanBarCode from '../components/tabbar/ScanBarCode';
import NewSaleNavigation from './NewSaleNavigation';


 
const Tab = createBottomTabNavigator();
class BottomTabBar extends Component {

 render() {
      return (
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'HOME') {
                iconName =  focused ? <Image source={require('../components/assets/images/homeRed.png')} /> : <Image source={require('../components/assets/images/homeRed.png')} />
              }
              else if (route.name === 'MARKET') {
                iconName = focused ? <Image source={require('../components/assets/images/marketRed.png')} /> : <Image source={require('../components/assets/images/marketRed.png')} />
              }
              else if (route.name === 'NEW SALE') {
                iconName = focused ? <Image  style={{marginTop:-50}} source={require('../components/assets/images/newsaleRed1.png')} /> : <Image style={{marginTop:-50}} source={require('../components/assets/images/newsaleRed1.png')} />
              } else if (route.name === 'PROMO') {
                iconName = focused ? <Image source={require('../components/assets/images/promoRed.png')} /> : <Image source={require('../components/assets/images/promoRed.png')} />
              }
             else if (route.name === 'PROFILE') {
              iconName = focused ? <Image source={require('../components/assets/images/profileRed.png')} /> : <Image source={require('../components/assets/images/profileRed.png')} />
            }
              return iconName;
            },
            tabBarActiveTintColor: '#ED1C24',
            tabBarInactiveTintColor: '#353C40',
            // tabBarLabel:() => {return null},
          })}
        >
          <Tab.Screen name="HOME"  title='Home' options={{headerShown: false}} component={Settings}/>
          <Tab.Screen name="MARKET" options={{headerShown: false}} component={ScanBarCode} />
          <Tab.Screen name="NEW SALE" options={{headerShown: false}} component={NewSaleNavigation} />
          <Tab.Screen name="PROMO" options={{headerShown: false}} component={Settings} />
          <Tab.Screen name="PROFILE" options={{headerShown: false}} component={Settings} />
        </Tab.Navigator>
      );
  }
}
  
export default BottomTabBar