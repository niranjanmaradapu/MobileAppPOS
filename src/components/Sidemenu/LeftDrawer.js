// import React from "react";
// import { View, Text, Button,Dimensions } from "react-native";
// import { createDrawerNavigator, createAppContainer } from "react-navigation";

// import NewSale from "./NewSale";

// const WIDTH = Dimensions.get('window').width;
// const LeftDrawer = createDrawerNavigator(
//     {
//         NewSale : { screen: NewSale },
//     },
//     {
//         initialRouteName: "NewSale",
//         drawerWidth: WIDTH * 0.75,
//         drawerPosition: 'left',
//         overlayColor: 'rgba(0, 0, 19, 0.4);',
//         // opacity:0.8,
//         // openDrawerOffset:0.2,
//         // panCloseMask:0.2,

//         contentOptions: {

//         },
//         contentComponent: props => <LeftSideBar {...props} />,
//         drawerOpenRoute: 'LeftSideMenu',
//         drawerCloseRoute: 'LeftSideMenuClose',
//         drawerToggleRoute: 'LeftSideMenuToggle',
//     }
// );
// export default LeftDrawer;