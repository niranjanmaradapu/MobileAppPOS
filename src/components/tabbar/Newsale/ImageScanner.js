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
            image: null,
            images: null,
        };
    }
    handleBackButtonClick() {
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
