// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   Dimensions,
//   StyleSheet,
//   ScrollView,
//   View,
//   Image,
//   Text,
// } from 'react-native';


// const window = Dimensions.get('window');
// // const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

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
//     borderRadius: 24,
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
//   lineView: {
//     height: 1,
//     color: 'gray',
//   },
// });

// export default function Menu({ onItemSelected }) {

//   this.state = {
//   }

//   return (
//     <ScrollView scrollsToTop={false} style={styles.menu}>
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

// Menu.propTypes = {
//   onItemSelected: PropTypes.func.isRequired,
// };
