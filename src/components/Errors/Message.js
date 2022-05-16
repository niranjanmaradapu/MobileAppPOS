import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Device from 'react-native-device-detection'
export default class Message extends Component {
  render() {
    const imp = this.props.imp
    return (
      <View>
        <Text style={[styles.text, {color: imp ? '#dd0000' : '#000000'}]}> {this.props.message} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: Device.isTablet ? 17 : 12,
    marginLeft: 30,
  }
})