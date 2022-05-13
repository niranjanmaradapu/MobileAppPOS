import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { RH, RW, RF } from '../../Responsive'
import { Dimensions } from "react-native";
import Device from 'react-native-device-detection';

var deviceheight = Dimensions.get("window").height
export class EmptyList extends Component {
  render() {
    return (
      <View>
        <Text style={styles}>{this.props.message}</Text>
      </View>
    )
  }
}

const styles = {
  color: '#cc241d',
  textAlign: "center",
  fontFamily: "bold",
  fontSize: Device.isTablet ? RF(21) : RF(17),
  marginTop: deviceheight / 3 
}

export default EmptyList