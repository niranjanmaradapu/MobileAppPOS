import React, { Component } from 'react'
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewSale from '../components/tabbar/NewSale';
import Settings from '../components/tabbar/Settings';
import ScanBarCode from '../components/tabbar/ScanBarCode';
import NewSaleNavigation from './NewSaleNavigation';
import HomeNav from './HomeNav';
import ProductsNavigation from './ProductsNavigation';



 
const Tab = createBottomTabNavigator();
class BottomTabBar extends Component {

 render() {
      return (
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'HOME') {
                iconName =  focused ? <Image source={require('../components/assets/images/homeRed.png')} /> : <Image source={require('../components/assets/images/home.png')} />
              }
              else if (route.name === 'PRODUCTS') {
                iconName = focused ? <Image source={require('../components/assets/images/marketRed.png')} /> : <Image source={require('../components/assets/images/market.png')} />
              }
              else if (route.name === 'NEW SALE') {
                iconName = focused ? <Image  style={{marginTop:-30}} source={require('../components/assets/images/newsaleRed.png')} /> : <Image style={{marginTop:-30}} source={require('../components/assets/images/newsaleRed.png')} />
              } else if (route.name === 'PROMO') {
                iconName = focused ? <Image source={require('../components/assets/images/promoRed.png')} /> : <Image source={require('../components/assets/images/promo.png')} />
              }
             else if (route.name === 'PROFILE') {
              iconName = focused ? <Image source={require('../components/assets/images/profileRed.png')} /> : <Image source={require('../components/assets/images/profile.png')} />
            }
              return iconName;
            },
            tabBarActiveTintColor: '#ED1C24',
            tabBarInactiveTintColor: '#353C40',
            // tabBarLabel:() => {return null},
          })}
        >
          <Tab.Screen name="HOME"  title='Home' options={{headerShown: false}} component={HomeNav}/>
          <Tab.Screen name="PRODUCTS" options={{headerShown: false}} component={ProductsNavigation} />
          <Tab.Screen name="NEW SALE" options={{headerShown: false,unmountOnBlur: true}} component={NewSaleNavigation} />
          <Tab.Screen name="PROMO" options={{headerShown: false}} component={Settings} />
          <Tab.Screen name="PROFILE" options={{headerShown: false}} component={Settings} />
        </Tab.Navigator>
      );
  }
}
  
export default BottomTabBar