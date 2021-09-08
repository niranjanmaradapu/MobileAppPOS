import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import NewSale from './NewSale';

//   const Stack = createStackNavigator();
//   function MyTabBar({ state, descriptors, navigation }) {
//     return (
//       <View style={{ flexDirection: 'row',backgroundColor:"#FFFFFF",height:100,borderRadius:50,marginBottom:-30,justifyContent:"center",alignItems:"center" }}>
//         {state.routes.map((route, index) => {
//           const { options } = descriptors[route.key];
//           const label =
//             options.tabBarLabel !== undefined
//               ? options.tabBarLabel
//               : options.title !== undefined
//               ? options.title
//               : route.name;
  
//           const isFocused = state.index === index;
  
//           const onPress = () => {
//             const event = navigation.emit({
//               type: 'tabPress',
//               target: route.key,
//             });
  
//             if (!isFocused && !event.defaultPrevented) {
//               navigation.navigate(route.name);
//             }
//           };
  
//           const onLongPress = () => {
//             navigation.emit({
//               type: 'tabLongPress',
//               target: route.key,
//             });
//           };
  
//           return (
//             <TouchableOpacity
//               accessibilityRole="button"
//               accessibilityStates={isFocused ? ['selected'] : []}
//               accessibilityLabel={options.tabBarAccessibilityLabel}
//               testID={options.tabBarTestID}
//               onPress={onPress}
//               onLongPress={onLongPress}
//               style={{ flex: 1, alignItems:"center" }}
//             >
//               <Text style={{ color: isFocused ? '#0196FD' : '#48596B' }}>
//                 {label}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
//   }
  
 const Tab = createBottomTabNavigator();
//   function MyTabs() {
//     return (
    
//     );
//}

class BottomTabBar extends Component {

 render() {
// const Tab = createBottomTabNavigator();
// return (
//   <NavigationContainer>
//   <Tab.Navigator
//     screenOptions={({ route }) => ({
//       tabBarIcon: ({ focused, color, size }) => {
//         let iconName;

//         if (route.name === 'Home') {
//           iconName = focused
//             ? 'ios-information-circle'
//             : 'ios-information-circle-outline';
//         } else if (route.name === 'Settings') {
//           iconName = focused ? 'ios-list-box' : 'ios-list';
//         }

//         // You can return any component that you like here!
//         return <Ionicons name={iconName} size={size} color={color} />;
//       },
//       tabBarActiveTintColor: '#0196FD',
//       tabBarInactiveTintColor: '#48596B',
//     })}
//   >
//     <Tab.Screen name="Home" component={NewSale} />
//     <Tab.Screen name="Settings" component={SettingsScreen} />
//   </Tab.Navigator>
// </NavigationContainer>
   
// )
// }
// }


      return (
        <NavigationContainer>
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName =  focused ? <Image source={require('./assets/images/home.png')} /> : <Image source={require('./assets/images/home.png')} />
              }
              else if (route.name === 'Retail') {
                iconName = focused ? <Image source={require('./assets/images/retail.png')} /> : <Image source={require('./assets/images/retail.png')} />
              }
              else if (route.name === 'Sales Bill') {
                iconName = focused ? <Image source={require('./assets/images/sales.png')} /> : <Image source={require('./assets/images/sales.png')} />
              } else if (route.name === 'Settings') {
                iconName = focused ? <Image source={require('./assets/images/settings.png')} /> : <Image source={require('./assets/images/settings.png')} />
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
          <Tab.Screen name="Settings" options={{headerShown: false}} component={NewSale} />
        </Tab.Navigator>
        </NavigationContainer>
      );
  }
}
  
export default BottomTabBar