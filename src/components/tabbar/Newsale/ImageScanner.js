// import React from 'react';
// import { Dimensions, Alert, StyleSheet, ActivityIndicator,TouchableOpacity,Image,Images } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import CaptureButton from './CaptureButton.js'
// import Amplify, { API } from 'aws-amplify';


// // Amplify configuration for API-Gateway
// Amplify.configure({
//     API: {
//         endpoints: [
//             {
//                 name: 'LabellingAPI',   //your api name
//                 endpoint: '', //Your Endpoint URL
//             },
//         ],
//     },
// });

// export default class ImageScanner extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             identifedAs: '',
//             loading: false
//         }
//     }

//     takePicture = async () => {
//         if (this.camera) {
//             const options = { quality: 0.5, base64: true };
//             const data = await this.camera.takePictureAsync(options);
//             console.log(data.uri);
//         }
//     };


//     takePicture = async function () {
//         if (this.camera) {
//             // Pause the camera's preview
//             this.camera.pausePreview();
//             // Set the activity indicator
//             this.setState((previousState, props) => ({
//                 loading: true
//             }));
//             // Set options
//             const options = {
//                 base64: true
//             };
//             // this.setState({
//             //     capturedImage: response.uri,
//             //   });
//             // Get the base64 version of the image
//             const data = await this.camera.takePictureAsync(options)
//             // Get the identified image
//            // this.identifyImage(data.uri);
//             Alert.alert(
//                 'object name is' + data.base64
//             )
//             console.log(data.base64)
//             // Alert.alert(
//             //     'object is' + data.uri
//             // )
//             if(data.base64.length !== 0){
//                 this.setState({ loading: false });
//             }
//             const apiName = 'LabellingAPI';
//             const path = '/storeimage';
//             const init = {
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/x-amz-json-1.1',
//                 },
//                 body: JSON.stringify({
//                     Image: data.base64,
//                     name: 'storeImage.png',
//                 }),
//             };

//             API.post(apiName, path, init).then(response => {
//                 if (JSON.stringify(response.Labels.length) > 0) {
//                     this.setState({
//                         objectName: response.Labels[0].Name,
//                     });
//                     // Dismiss the acitivty indicator
//                     this.setState({ loading: false });
//                     // Show an alert wit loading:falseh the answer on
//                     Alert.alert(
//                         'object name is' + objectName
//                     )
//                     // Resume the preview
//                     this.camera.resumePreview();
//                 } else {
//                     alert('Please Try Again.');
//                 }
//             });
//         }
//     }
//     // identifyImage(imageData) {

//     // }
//     // displayAnswer(identifiedImage) {

//     // }


//     render() {
//         return (
//             <RNCamera ref={ref => { this.camera = ref; }} style={styles.preview}>
//                 <ActivityIndicator size="large" style={styles.loadingIndicator} color="#fff" animating={this.state.loading} />
//                 <CaptureButton buttonDisabled={this.state.loading} onClick={this.takePicture.bind(this)} />
//             </RNCamera>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     preview: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//         height: Dimensions.get('window').height,
//         width: Dimensions.get('window').width,
//     },
//     loadingIndicator: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     }
// });


import React, { Component } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, Dimensions, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import NewSaleService from '../../services/NewSaleService';
import RNBeep from 'react-native-a-beep';
var deviceWidth = Dimensions.get('window').width;


export default class ImageScanner extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            image:null,
            images: null,
        };
    }
    handleBackButtonClick() {
       // this.props.navigation.goBack(null);
       this.props.route.params.onGoBack()
       this.props.navigation.goBack()
        return true;
    }

    pickSingle(cropit, circular = false, mediaType) {
        if (this.state.image === null) {
            ImagePicker.openPicker({
                width: 500,
                height: 500,
                cropping: cropit,
                cropperCircleOverlay: circular,
                sortOrder: 'none',
                compressImageMaxWidth: 1000,
                compressImageMaxHeight: 1000,
                compressImageQuality: 1,
                compressVideoPreset: 'MediumQuality',
                includeExif: true,
                cropperStatusBarColor: 'white',
                cropperToolbarColor: 'white',
                cropperActiveWidgetColor: 'white',
                cropperToolbarWidgetColor: '#3498DB',
            })
                .then((image) => {
                    console.log('received image', image);
                    this.setState({
                        image: {
                            uri: image.path,
                            width: image.width,
                            height: image.height,
                            mime: image.mime,
                        },
                        images: null,
                    });
                    this.getImageNameByScan()
                })
                .catch((e) => {
                    console.log(e);
                    Alert.alert(e.message ? e.message : e);
                });

        }
    }


    pickSingleWithCamera(cropping, mediaType = 'photo') {
        if (this.state.image === null) {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
        })
            .then((image) => {
                console.log('received image', image);
                this.setState({
                    image: {
                        uri: image.path,
                        width: image.width,
                        height: image.height,
                        mime: image.mime,
                    },
                    images: null,
                });
                this.getImageNameByScan()
            })
            .catch((e) => alert(e));
    }
}


    getImageNameByScan() {
        const formData = new FormData();
        formData.append('image', {
            uri: this.state.image.uri, name: this.state.image.mime, type: this.state.image.mime
        });
        axios({
            url: NewSaleService.getImageScanning(),
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                if (response.data) {
                    console.log("response :", response.data.result[0].name);
                    console.log("response :", global.productname);
                    // this.setState({ inventoryProductName: response.data.result[0].name})
                     if (global.productname == "something") {
                    { RNBeep.beep() }
                    global.productname = response.data.result[0].name
                    console.log(global.productname)
                    this.props.route.params.onGoBack();
                    this.props.navigation.goBack();

                      }
                }

            })
            .catch(function (error) {
                console.log(error);

            })
           
    }






    render() {
     
        return (
            <View style={styles.container}>
                  {this.pickSingleWithCamera(true)}
                <View style={styles.viewswidth}>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        left: 10,
                        top: 30,
                        width: 40,
                        height: 40,
                    }} onPress={() => this.handleBackButtonClick()}>
                        <Image source={require('../../assets/images/backButton.png')} />
                        

                    </TouchableOpacity>
                    <Text style={{
                        position: 'absolute',
                        left: 70,
                        top: 47,
                        width: 300,
                        height: 30,
                        fontFamily: 'bold',
                        fontSize: 18,
                        color: '#353C40'
                    }}> Image scanning </Text>
                    {/* <Text style={styles.signUptext}> Sign Up </Text> */}

                </View>
                <View>
                    <Image
                        style={{ width: 200, height: 200, resizeMode: 'contain', top: 100, borderRadius: 100, borderColor: 'black', alignSelf: 'center', borderWidth: 1 }}
                        source={this.state.image}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        alignItems: 'center',
    },
    enterBarcodeManualButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
    },
    scanScreenMessage: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
