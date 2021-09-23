import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from "react-native";
import { QRscanner } from "react-native-qr-decode-image-camera";

export default class ScanBarCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
     // ScanResult: false,
      zoom: 0.2
    };
  }
  render() {
    console.log('re-rendereddddddd')
    return (
      <View style={styles.container}>
        <QRscanner
          onRead={this.onRead}
          renderBottomView={this.bottomView}
          flashMode={this.state.flashMode}
          zoom={this.state.zoom}
          finderY={50}
        />
      </View>
    );
  }
  scanAgain = () => {
    this.forceUpdate();
  }
  bottomView = () => {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#ffffff" }}
      >
        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => this.scanAgain()} >
          <Text style={styles.signInButtonText}> Scan Again </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={this.scanAgain} style={ { backgroundColor:'#0196FD',
        marginLeft:100,
        marginRight:100,
        height: 55,
        borderRadius: 30,
        fontWeight: 'bold',}}>
               <Text style={{color: "#fff",  textAlign: 'center', alignSelf: 'center', }}>Click to Scan again!</Text>
                                </TouchableOpacity> */}
        {/* <Text style={{ color: "#fff" }}>Scan Barcode</Text>
        </TouchableOpacity> */}
      </View>
    );
  };

  onRead = (e) => {
    console.log(e);
    Alert.alert(JSON.stringify(e.data));
    // this.setState({
    //   ScanResult: true
    // })

    // if (check === 'http') {
    //   Linking
    //     .openURL(e.data)
    //     .catch(err => console.error('An error occured', err));
    // } else {
    //   this.setState({
    //     ScanResult: true
    //   })
    // }
  }
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#000"
    },
    signInButton: {
      backgroundColor: '#0196FD',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 100,
      marginRight: 100,
      marginTop: 20,
      height: 40,
      borderRadius: 30,
      fontWeight: 'bold',
      // marginBottom:100,
    },
    signInText: {
      color: '#ffffff',
      alignSelf: 'center',
      fontSize: 28,
      fontFamily: "bold",
      marginTop: 25,
    },

  });

