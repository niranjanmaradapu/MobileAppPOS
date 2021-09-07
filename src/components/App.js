import { StatusBar } from 'expo-status-bar';
import React from 'react';
import SplashScreen from './SplashScreen';
import Login from './Login';
import NewSale from './NewSale';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


export default class App extends React.Component {
  async componentDidMount() {
     Font.loadAsync({
    bold: require("./assets/fonts/Metropolis-Bold.otf"),
    regular: require("./assets/fonts/Metropolis-Regular.otf"),
    });

    setTimeout(() => {
      this.setState({
          view: <NewSale />
      })      
}, 2500)
    };

  constructor(props) {
      super(props);
      console.log("vinod")
      this.state = ({
          view: <SplashScreen />
      })
    }

render() {
    return (
        this.state.view
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







