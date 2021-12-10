import React, { Component, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, Image } from 'react-native'
var deviceWidth = Dimensions.get('window').width;

class AddLoyalty extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.camera = null;
        this.state = {
            Name: '',
            MobileNumber: '',
            InvoiceNumber: '',
            Price: '',
        }
    }

    handleName = (value) => {
        this.setState({ Name: value })
    }

    handleMobileNumber = (value) => {
        this.setState({ MobileNumber: value })
    }

    handleInvoiceNumber = (value) => {
        this.setState({ InvoiceNumber: value })
    }

    handlePrice = (value) => {
        this.setState({ Price: value })
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }
    cancel() {
        this.props.navigation.goBack(null);
    }

    modelCancel() {
        this.setState({ modalVisible: false });
    }

    saveLoyalty() {
        if(String(this.state.Name).length === 0 ){
            alert('Please Enter A Valid Name');
        }else if (this.state.MobileNumber.length < 10){
            alert('Please Enter A Valid 10 Digit Mobile Number');
        }else if (this.state.InvoiceNumber.length === 0){
            alert('please Enter A Valid Invoice Number');
        }else {
            alert('Loyalty Points Added to ' + this.state.Name);
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff' }}>
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
                        height: 20,
                        fontFamily: 'bold',
                        fontSize: 18,
                        color: '#353C40'
                    }}> Add Loyalty Points </Text>
                </View>
                <View style={{ marginTop: 30, width: deviceWidth, }}>
                    <Text style={styles.subheading} >Loyalty points details</Text>
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="NAME"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.Name}
                        onChangeText={this.handleName}
                    />
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="MOBILE NO"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.MobileNumber}
                        onChangeText={this.handleMobileNumber}
                    />
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="INVOICE NO"
                        placeholderTextColor="#6F6F6F"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.InvoiceNumber}
                        onChangeText={this.handleInvoiceNumber}
                    />
                    <TextInput style={styles.input}
                        underlineColorAndroid="transparent"
                        placeholder="AMMOUNT PAID"
                        editable={false} selectTextOnFocus={false}
                        placeholderTextColor="#353C4050"
                        textAlignVertical="center"
                        autoCapitalize="none"
                        value={this.state.Price}
                        onChangeText={this.handlePrice}
                    />
                    <TouchableOpacity
                        style={{
                            margin: 8,
                            height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                        }} onPress={() => this.saveLoyalty()}
                    >
                        <Text style={{
                            textAlign: 'center', marginTop: 20, color: "#ffffff", fontSize: 15,
                            fontFamily: "regular"
                        }}  > SAVE </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            margin: 8,
                            height: 50, backgroundColor: "#ffffff", borderRadius: 5, borderWidth: 1, borderColor: "#353C4050",
                        }} onPress={() => this.cancel()}
                    >
                        <Text style={{
                            textAlign: 'center', marginTop: 20, color: "#353C4050", fontSize: 15,
                            fontFamily: "regular"
                        }}  > CANCEL </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default AddLoyalty

const styles = StyleSheet.create({
    viewswidth: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 84,
    },
    input: {
        justifyContent: 'center',
        marginLeft: 20,
        marginRight: 20,
        height: 44,
        marginTop: 5,
        marginBottom: 10,
        borderColor: '#8F9EB717',
        borderRadius: 3,
        backgroundColor: '#FBFBFB',
        borderWidth: 1,
        fontFamily: 'regular',
        paddingLeft: 15,
        fontSize: 14,
    },
    subheading: {
        fontFamily: 'medium',
        fontSize: 16, 
        color: "red",
        marginLeft: 20,
    }
});