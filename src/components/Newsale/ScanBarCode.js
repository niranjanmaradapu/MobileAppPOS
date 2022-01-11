import React, { Component } from 'react';
import { Button, Text, View, Dimensions, Alert, TouchableOpacity, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import RNBeep from 'react-native-a-beep';
var deviceWidth = Dimensions.get('window').width;


class ScanBarCode extends Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      isFromNewSale: false,
      isFromAddProduct: false,
      torchon: RNCamera.Constants.FlashMode.off,
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      }
    };
  }

  componentDidMount() {
    this.setState({
      isFromNewSale: this.props.route.params.isFromNewSale,
      isFromAddProduct: this.props.route.params.isFromAddProduct,
    });
  }
  handleBackButtonClick() {
    this.props.route.params.onGoBack();
    this.props.navigation.goBack();
    return true;
  }

  handleflashClick() {
    let tstate = this.state.torchon;
    if (tstate == RNCamera.Constants.FlashMode.off) {
      tstate = RNCamera.Constants.FlashMode.torch;
    } else {
      tstate = RNCamera.Constants.FlashMode.off;
    }
    this.setState({ torchon: tstate })
  }


  onBarCodeRead(e) {
    if (global.barcodeId == "something") {
      // { RNBeep.beep() }
      global.barcodeId = e.data
      this.props.route.params.onGoBack();
      this.props.navigation.goBack();
    }
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewswidth}>
          <TouchableOpacity style={{
            position: 'absolute',
            left: 10,
            top: 30,
            width: 40,
            height: 40,
          }} onPress={() => this.handleBackButtonClick()}>
            <Image source={require('../assets/images/backButton.png')} />
          </TouchableOpacity>
          <Text style={{
            position: 'absolute',
            left: 70,
            top: 47,
            width: 300,
            height: 20,
            fontFamily: 'bold',
            fontSize: 18,
            color: '#353C40'
          }}> {this.state.isFromNewSale === true ? 'New Sale' : 'Scan & Add Product'} </Text>
          {/* <Text style={styles.signUptext}> Sign Up </Text> */}

        </View>

        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          flashMode={this.state.torchon}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          onFocusChanged={() => { }}
          onZoomChanged={() => { }}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
          style={styles.preview}
          type={this.state.camera.type}>
          <BarcodeMask edgeColor={'#82FF71'} />
        </RNCamera>
        <TouchableOpacity style={{
          position: 'absolute',
          alignSelf: 'center',
          top: 100,
          width: 40,
          height: 40,
        }} onPress={() => this.handleflashClick()}>
          {this.state.torchon == RNCamera.Constants.FlashMode.off ? (
            <Image source={require('../assets/images/flash.png')} />
          ) : (
            <Image source={require('../assets/images/flash.png')} />
          )
          }

        </TouchableOpacity>
        <View style={[styles.overlay, styles.topOverlay]}>


        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  viewswidth: {
    backgroundColor: '#ffffff',
    width: deviceWidth,
    textAlign: 'center',
    fontSize: 24,
    height: 84,
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default ScanBarCode;