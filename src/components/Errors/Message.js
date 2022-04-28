import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Device from 'react-native-device-detection'

export default class Message extends Component {
  render() {
    return (
      <View>
        <Text style={styles.error}> {this.props.message} </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  error: {
        color: '#dd0000',
        fontSize: Device.isTablet ? 17 : 12,
        marginLeft: 30,
    },
})