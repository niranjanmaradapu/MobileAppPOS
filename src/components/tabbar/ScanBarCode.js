// import React, { Component } from "react";
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   Alert,
//   TouchableOpacity
// } from "react-native";
// import { QRscanner } from "react-native-qr-decode-image-camera";

// export default class ScanBarCode extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//      // ScanResult: false,
//       zoom: 0.2
//     };
//   }
//   render() {
//     console.log('re-rendereddddddd')
//     return (
//       <View style={styles.container}>
//         <QRscanner
//           onRead={this.onRead}
//           renderBottomView={this.bottomView}
//           flashMode={this.state.flashMode}
//           zoom={this.state.zoom}
//           finderY={50}
//         />
//       </View>
//     );
//   }
//   scanAgain = () => {
//     this.forceUpdate();
//   }
//   bottomView = () => {
//     return (
//       <View
//         style={{ flex: 1, backgroundColor: "#ffffff" }}
//       >
//         <TouchableOpacity
//           style={styles.signInButton}
//           onPress={() => this.scanAgain()} >
//           <Text style={styles.signInButtonText}> Scan Again </Text>
//         </TouchableOpacity>

//         {/* <TouchableOpacity onPress={this.scanAgain} style={ { backgroundColor:'#0196FD',
//         marginLeft:100,
//         marginRight:100,
//         height: 55,
//         borderRadius: 30,
//         fontWeight: 'bold',}}>
//                <Text style={{color: "#fff",  textAlign: 'center', alignSelf: 'center', }}>Click to Scan again!</Text>
//                                 </TouchableOpacity> */}
//         {/* <Text style={{ color: "#fff" }}>Scan Barcode</Text>
//         </TouchableOpacity> */}
//       </View>
//     );
//   };

//   onRead = (e) => {
//     console.log(e);
//     Alert.alert(JSON.stringify(e.data));
//     // this.setState({
//     //   ScanResult: true
//     // })

//     // if (check === 'http') {
//     //   Linking
//     //     .openURL(e.data)
//     //     .catch(err => console.error('An error occured', err));
//     // } else {
//     //   this.setState({
//     //     ScanResult: true
//     //   })
//     // }
//   }
// }


//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#000"
//     },
//     signInButton: {
//       backgroundColor: '#0196FD',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginLeft: 100,
//       marginRight: 100,
//       marginTop: 20,
//       height: 40,
//       borderRadius: 30,
//       fontWeight: 'bold',
//       // marginBottom:100,
//     },
//     signInText: {
//       color: '#ffffff',
//       alignSelf: 'center',
//       fontSize: 28,
//       fontFamily: "bold",
//       marginTop: 25,
//     },

//   });

// import React, { Component } from "react";
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   Alert,
//   TouchableOpacity
// } from "react-native";
// import { RNCamera } from 'react-native-camera';
// import BarcodeMask from 'react-native-barcode-mask';

// const defaultBarcodeTypes = [];

// export default class ScanBarCode extends Component {
//   state = {
//       // your other states
//       barcodeType: '',
//       barcodeValue: '',
//       isBarcodeRead: false // default to false
//    }


//    onBarcodeRead(event) {
//       this.setState({isBarcodeRead: true, barcodeType: event.type, barcodeValue: event.data});
//    }

//    // run CDU life-cycle hook and check isBarcodeRead state
//    // Alert is a side-effect and should be handled as such.
//    componentDidUpdate() {
//       const {isBarcodeRead, barcodeType, barcodeValue} = this.state;
//       if (isBarcodeRead) {
//          Alert.alert(barcodeType, barcodeValue, [
//            { 
//                text: 'OK', 
//                onPress: () => {
//                    // Reset everything 
//                    this.setState({isBarcodeRead: false, barcodeType: '', barcodeValue: ''})
//                }
//            }
//          ]);
//       }

//    }

//    render() {
//       const {isBarcodeRead} = this.state;
//       return (
//          <RNCamera barcodeTypes={isBarcodeRead ? [] : defaultBarcodeTypes}>
//             <BarcodeMask />
//          </RNCamera>
//       )

//    }
//   }

// import React, { Component } from 'react';
// import { Button, Text, View,Alert } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// class ScanBarCode extends Component {

//   constructor(props) {
//     super(props);
//     this.camera = null;
//     this.barcodeCodes = [];
//     this.alertPresent = false;
//     this.state = {
//       camera: {
//         type: RNCamera.Constants.Type.back,
// 	     flashMode: RNCamera.Constants.FlashMode.auto,
//       }
//     };
//   }

//   onBarCodeRead(e) {
//     if(!this.alertPresent){
//       this.alertPresent = true;
//           Alert.alert(
//             "Barcode type is " + e.type,
//             "Barcode value is " + e.data,
//             [
//                  {text: 'OK', onPress: () => this.alertPresent = false},
//             ],
//               {cancelable: false},
//           );
//       }
//   }

//   async takePicture() {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options);
//       console.log(data.uri);
//     }
//   }

//   pendingView() {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: 'lightgreen',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text>Waiting</Text>
//       </View>
//     );
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <RNCamera
//             ref={ref => {
//               this.camera = ref;
//             }}
//             defaultTouchToFocus
//             flashMode={this.state.camera.flashMode}
//             mirrorImage={false}
//             onBarCodeRead={this.onBarCodeRead.bind(this)}
//             onFocusChanged={() => {}}
//             onZoomChanged={() => {}}
//             barCodeTypes={[RNCamera.Constants.BarCodeType.qr, 'qr']}
//             permissionDialogTitle={'Permission to use camera'}
//             permissionDialogMessage={'We need your permission to use your camera phone'}
//             style={styles.preview}
//             type={this.state.camera.type}
//         />
//         <View style={[styles.overlay, styles.topOverlay]}>
// 	  <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
// 	</View>
// 	<View style={[styles.overlay, styles.bottomOverlay]}>
//           <Button
//             onPress={() => { console.log('scan clicked'); }}
//             style={styles.enterBarcodeManualButton}
//             title="Enter Barcode"
//            />
// 	</View>
//       </View>
//     );
//   }
// }

// const styles = {
//   container: {
//     flex: 1
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   overlay: {
//     position: 'absolute',
//     padding: 16,
//     right: 0,
//     left: 0,
//     alignItems: 'center'
//   },
//   topOverlay: {
//     top: 0,
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center'
//   },
//   bottomOverlay: {
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   enterBarcodeManualButton: {
//     padding: 15,
//     backgroundColor: 'white',
//     borderRadius: 40
//   },
//   scanScreenMessage: {
//     fontSize: 14,
//     color: 'white',
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// };

// export default ScanBarCode;


import React, { Component } from 'react';
import { Button, Text, View,Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
 

class ScanBarCode extends Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
	flashMode: RNCamera.Constants.FlashMode.auto,
      }
    };
  }

  onBarCodeRead(e) {
    Alert.alert(
      "Barcode type is " + e.type,
      "Barcode value is " + e.data,
      [
           {text: 'OK', onPress: () => this.alertPresent = false},
      ],
        {cancelable: false},
    );
    if(global.barcodeId == "something"){
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
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            defaultTouchToFocus
            flashMode={this.state.camera.flashMode}
            mirrorImage={false}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            style={styles.preview}
            type={this.state.camera.type}>
            <BarcodeMask />
            </RNCamera>
        <View style={[styles.overlay, styles.topOverlay]}>
	  <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
	</View>
	<View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={() => { console.log('scan clicked'); }}
            style={styles.enterBarcodeManualButton}
            title="Enter Barcode"
           />
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