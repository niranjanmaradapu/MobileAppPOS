import { StatusBar } from 'expo-status-bar';
import React from 'react';
import SplashScreen from './SplashScreen';
import Logsin from './Logsin';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
      super(props);
      console.log("vinod")
      this.state = ({
          view: <SplashScreen />
      })
    }

 
componentDidMount() {
  setTimeout(() => {
              this.setState({
                  view: <Logsin />
              })
         
  }, 2500)
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







