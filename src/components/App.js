import { StatusBar } from 'expo-status-bar';
import React from 'react';
import SplashScreen from './SplashScreen';
import Login from './Login';
import NewSale from './NewSale';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';



export default class App extends React.Component {


  constructor(props) {
      super(props);
      console.log("vinod")
      this.state = ({
          view: <SplashScreen />
      })
    }

    
 
componentDidMount() {
    // useFonts.loadAsync({
    //   "Metropolis-Bold": require("./assets/fonts/Metropolis-Bold.otf"),
    // });
  setTimeout(() => {
              this.setState({
                  view: <Login />
              })      
  }, 2500)
}

  
render() {
  // if (!isLoaded) {
  //   return <AppLoading />;
  // } else {
    return (
        this.state.view
    )
 // }
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







