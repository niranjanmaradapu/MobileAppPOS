// import React, { Component } from "react"
// import { Content, List, Header, Body, Title, ListItem, Container, Left, Right, Icon, Text, Badge } from 'react-native';
// import { ScrollView } from "react-native-gesture-handler";
// import { NavigationActions } from 'react-navigation';
// import { Dimensions, StyleSheet, View, Image } from 'react-native';


// export default class LeftSideBar extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
   
//     }
//   }
//   navigateToScreen = (route) => () => {
//     const navigate = NavigationActions.navigate({
//       routeName: route
//     });
//     this.props.navigation.dispatch(navigate);
//   }




//   render() {
//     return (
//       <ScrollView scrollsToTop={false} style={styles.menu}>
//         <View style={styles.avatarContainer}>
//           <Image
//             source={require('./assets/images/welcomeLogo.png')} style={styles.avatar} />
//           <Text></Text>
//         </View>
//         <Text></Text>
//         <Text
//           style={styles.newsale}>
//           New Sale
//       </Text>
//         <Text></Text>
//         <Text></Text>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   menu: {
//     flex: 1,
//     width: window.width,
//     height: window.height,
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   avatarContainer: {
//     marginTop: 40,
//     borderBottomColor: 'lightgray',
//     borderBottomWidth: 1,
//   },
//   avatar: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     borderColor: 'black',
//     borderWidth: 1,
//     flex: 1,
//   },
//   item: {
//     fontSize: 14,
//     fontWeight: '300',
//     paddingTop: 5,
//     bottom: 0,
//   },
//   newsale: {
//     top: 0,
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
// });
