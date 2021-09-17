
import React from 'react';
import { StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import AppRoute from '../Navigation/AppRoute';
export default class App extends React.Component {
  async componentDidMount() {
     Font.loadAsync({
    bold: require("./assets/fonts/Metropolis-Bold.otf"),
    regular: require("./assets/fonts/Metropolis-Regular.otf"),
    semibold: require("./assets/fonts/Metropolis-SemiBold.otf"),
    });
  }



render() {
    return (
      <AppRoute />
    )
}
}

       
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});







