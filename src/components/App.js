import React from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AppRoute from '../Navigation/AppRoute';
import { openDatabase } from 'react-native-sqlite-storage';
 

// Connction to access the pre-populated db
const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getListOfBarcodes: []
    }
  }


  async componentDidMount() {
    Font.loadAsync({
      bold: require("./assets/fonts/ProductSans-Bold.ttf"),
      regular: require("./assets/fonts/ProductSans-Regular.ttf"),
      medium: require("./assets/fonts/ProductSans-Medium.ttf"),
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




