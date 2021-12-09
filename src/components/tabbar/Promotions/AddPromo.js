import React, { Component } from 'react'
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
var deviceWidth = Dimensions.get('window').width;
import Constants from 'expo-constants';
import axios from 'axios';
import { openDatabase } from 'react-native-sqlite-storage';
// Connction to access the pre-populated db
const db = openDatabase({ name: 'tbl_items.db', createFromLocation: 1 });
import { RNCamera } from 'react-native-camera';
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PromotionsService from '../../services/PromotionsService';
import Loader from '../../loader';


class AddPromo extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.camera = null;
        this.barcodeCodes = [];
        this.state = {
            uom: [],
            open: false,
            chargeExtra: false,
            addPools: false,
            addBenifits: false,
            flagAddPool: false,
            modalVisible: true,
            promotionName: '',
            selectedPromoApplyName: '',
            description: '',
            printonbill: '',
            selectedApplicability: '',
            selectedTax: "",
            buyany: "",
            domainId: 1,
            selctedPoolnames: [],
            selectedPoolName: '',
            selectedPoolId: 0,
            createdByArray: [],
            isEdit: false,
            createdByTempArray: [],
            selectedItem: -1,
            loading: false,
            item: [],
        }
    }

    async componentDidMount() {
        var domainStringId = ""
        AsyncStorage.getItem("domainDataId").then((value) => {
            domainStringId = value
            this.setState({ domainId: parseInt(domainStringId) })
            console.log("domain data id" + this.state.domainId)
            this.getAllpools()

        }).catch(() => {
            console.log('there is error getting domainDataId')
        })
        this.setState({ promotionName: this.props.route.params.item.promotionName })
        this.setState({ selectedPromoApplyName: this.props.route.params.item.promoApplyType })
        this.setState({ description: this.props.route.params.item.description })
        this.setState({ printonbill: this.props.route.params.item.printNameOnBill })
        this.setState({ selectedApplicability: this.props.route.params.item.applicability })
        this.setState({ buyany: String(this.props.route.params.item.buyItemsFromPool) })
        this.setState({ isEdit:this.props.route.params.isEdit})
        this.setState({ selctedPoolnames: this.props.route.params.item.poolVo })
        // this.setState({ arrayData: this.props.route.params.item.ruleVo })
        // this.setState({ arrayData: this.props.route.params.item.ruleVo })
     
    }


    getAllpools = () => {
        this.setState({ createdByArray: [] })
        this.setState({ loading: true })
        const params = {
            "domainId": this.state.domainId,
            "isActive": true
        }
        axios.get(PromotionsService.getAllPools(),
            { params }).then((res) => {
                if (res.data && res.data["isSuccess"] === "true") {
                    this.setState({ loading: false })

                    let len = res.data["result"]["poolvo"].length;
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let number = res.data["result"]["poolvo"][i]
                            if (number.poolName != null) {
                                this.state.createdByArray.push({ poolName: number.poolName, poolId: number.poolId })
                            }

                            this.setState({ createdByArray: this.state.createdByArray })
                            console.log('pool names' + number.poolName)
                        }
                    }
                    // this.state.createdByTempArray.forEach(obj => {
                    //     if (!this.state.createdByArray.some(o => o.poolName === obj.poolName)) {
                    //         this.state.createdByArray.push({ ...obj })
                    //     }
                    //     this.setState({ createdByArray: this.state.createdByArray })
                    // });

                    return
                }
            }).catch(() => {
                this.setState({ loading: false })
                // alert('No Records Found')
            })

    };

    selectPools = (item, index) => {
        console.log('-------ITEM TAPPED' + item.poolName)
        this.setState({ selectedItem: index })

        this.setState({ selectedPoolName: item.poolName })
        this.setState({ selectedPoolId: item.poolId })
    };



    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }
    cancel() {
        this.props.navigation.goBack(null);
    }

    modelCancel() {
        this.setState({ modalVisible: false });
        this.setState({ flagAddPool: false });
    }

    handlePromotionName = (value) => {
        this.setState({ promotionName: value });
    }

    handleDescription = (value) => {
        this.setState({ description: value });
    }

    handlePrintOnSallBill = (value) => {
        this.setState({ printonbill: value });
    }

    handleApplicability = (value) => {
        this.setState({ selectedApplicability: value });
    }

    handleTax = (value) => {
        this.setState({ selectedTax: value });
    }

    chargeExtra() {
        if (this.state.chargeExtra === true) {
            this.setState({ chargeExtra: false })
        }
        else {
            this.setState({ chargeExtra: true })
        }

    }
    handlePromoApplyname = (value) => {
        this.setState({ selectedPromoApplyName: value });
    }

    async savePromo() {
        if (String(this.state.promotionName).length === 0) {
            alert('Please Enter promotion name');
        } else if (this.state.description.length === 0) {
            alert('Please Enter Description');
        }
        else if (this.state.printonbill.length === 0) {
            alert('Please Enter printname on the salebill');
        } else if (this.state.selectedApplicability.length === 0) {
            alert('Please Select Applicability');
        }
        else if (this.state.buyany.length === 0) {
            alert('Please Enter BuyAny Value');
        }
        else if (this.state.createdByArray.length < 1) {
            alert('You need to select atleast one pool for create promo');
        }
        else {
            this.setState({ loading: true })
            const username = await AsyncStorage.getItem("username");
            this.setState({ loading: true })
            if (this.state.isEdit === true) {
                const params = {
                    "applicability": this.state.selectedApplicability,
                    "buyItemsFromPool": this.state.buyany,
                    "description": this.state.description,
                    "createdBy": username,
                    "isActive": true,
                    "isForEdit": true,
                    "isTaxExtra": false,
                    "poolVo":
                        this.state.selctedPoolnames
                    ,
                    "promoId":this.props.route.params.item.promoId,
                    "printNameOnBill": this.state.printonbill,
                    "domainId": this.state.domainId,
                    "promoApplyType": this.state.selectedPromoApplyName,
                    "promotionName": this.state.promotionName,
                    "promoType": null,
                }
               console.log('--start updating')
                axios.post(PromotionsService.editPromo(), params).then((res) => {
                    if (res.data && res.data["isSuccess"] === "true") {
                        this.setState({ loading: false })
                        this.props.route.params.onGoBack();
                        this.props.navigation.goBack();
                    }
                    else {
                        this.setState({ loading: false })
                        alert("duplicate record already exists");
                    }
                }
                );
            }
            else {
                const params = {
                    "applicability": this.state.selectedApplicability,
                    "buyItemsFromPool": this.state.buyany,
                    "description": this.state.description,
                    "createdBy": username,
                    "isActive": true,
                    "isForEdit": false,
                    "isTaxExtra": false,
                    "poolVo":
                        this.state.selctedPoolnames
                    ,
                    "printNameOnBill": this.state.printonbill,
                    "domainId": this.state.domainId,
                    "promoApplyType": this.state.selectedPromoApplyName,
                    "promotionName": this.state.promotionName,
                    "promoType": null,
                }
                axios.post(PromotionsService.addPromotion(), params).then((res) => {
                    if (res.data && res.data["isSuccess"] === "true") {
                        this.setState({ loading: false })
                        this.props.route.params.onGoBack();
                        this.props.navigation.goBack();
                    }
                    else {
                        this.setState({ loading: false })
                        alert("duplicate record already exists");
                    }
                }
                );
            }
        }
    }

    refresh() {
        this.setState({ productname: global.productname })
        console.log('search' + this.state.productname)
    }

    onEndReached() {
        this.listRef.scrollToOffset({ offset: 0, animated: true });
    }

    addBenfits() {

    }

    addPools() {
        this.setState({ flagAddPool: true });
        this.setState({ modalVisible: true });
    }

    addPoolName() {
        this.state.selctedPoolnames.push({ poolName: this.state.selectedPoolName, poolId: this.state.selectedPoolId })
        this.setState({ modalVisible: false });
        this.setState({ flagAddPool: false });
    }

    handleValue = (value) => {
        this.setState({ buyany: value });
    }

    render() {
        return (
            <View style={{ backgroundColor: '#ffffff' }} >
                {this.state.loading &&
                    <Loader
                        loading={this.state.loading} />
                }

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
                    }}> {this.state.isEdit == true ? 'Edit Promo' : 'Add Promo'} </Text>
                </View>
                <ScrollView>
                    <View style={{ marginTop: 30, width: deviceWidth, }}>
                        <Text style={styles.promoname}>Promo code details</Text>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="PROMOTION NAME"
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.promotionName}
                            onChangeText={this.handlePromotionName}
                        />

                        <View style={{
                            justifyContent: 'center',
                            margin: 20,
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
                        }} >
                            <RNPickerSelect style={{
                                color: '#8F9EB717',
                                fontWeight: 'regular',
                                fontSize: 15
                            }}
                                placeholder={{
                                    label: 'PROMOTION APPLY TYPE',

                                }}
                                Icon={() => {
                                    return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                }}
                                items={[
                                    { label: 'FixedQuantity', value: 'FixedQuantity' },
                                    { label: 'AnyQuantity', value: 'AnyQuantity' },
                                    { label: 'QuantitySlab', value: 'QuantitySlab' },
                                    { label: 'ValueSlab', value: 'ValueSlab' },
                                    { label: 'PoolQuantityRatio', value: 'PoolQuantityRatio' },
                                    { label: 'PoolValueRatio', value: 'PoolValueRatio' },
                                ]}
                                onValueChange={this.handlePromoApplyname}
                                style={pickerSelectStyles}
                                value={this.state.selectedPromoApplyName}
                                useNativeAndroidPickerStyle={false}

                            />
                        </View>


                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="DESCRIPTION"
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.description}
                            onChangeText={this.handleDescription}
                        />

                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="PRINT NAME ON SALE BILL"
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.printonbill}
                            onChangeText={this.handlePrintOnSallBill}
                        />



                        <View style={{
                            justifyContent: 'center',
                            margin: 20,
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
                        }} >
                            <RNPickerSelect style={{
                                color: '#8F9EB717',
                                fontWeight: 'regular',
                                fontSize: 15
                            }}
                                placeholder={{
                                    label: 'APPLICABILITY',

                                }}
                                Icon={() => {
                                    return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                }}
                                items={[
                                    { label: 'promotionForEachBarcode', value: 'promotionForEachBarcode' },
                                    { label: 'promotionForWholeBill', value: 'promotionForWholeBill' },
                                ]}
                                onValueChange={this.handleApplicability}
                                style={pickerSelectStyles}
                                value={this.state.selectedApplicability}
                                useNativeAndroidPickerStyle={false}

                            />
                        </View>

                        <TouchableOpacity
                            style={{
                                width: 200, marginTop: 20,
                            }}

                            onPress={() => this.chargeExtra()}
                        >
                            <Text style={{
                                marginLeft: 40, marginTop: 11, color: "#6F6F6F", fontSize: 15,
                                fontFamily: "regular", width: 200,
                            }}  > {'Charge Tax Entra'} </Text>

                            <Image style={{ position: 'absolute', top: 10, left: 20, }} source={
                                //require('../assets/images/chargeunselect.png')}
                                this.state.chargeExtra ? require('../../assets/images/chargeselect.png') : require('../../assets/images/chargeunselect.png')} />
                        </TouchableOpacity>

                        {this.state.chargeExtra && (
                            <View style={{
                                justifyContent: 'center',
                                margin: 20,
                                width: deviceWidth / 2 - 20,
                                height: 44,
                                marginTop: -30,
                                marginLeft: deviceWidth / 2,
                                marginBottom: 10,
                                borderColor: '#8F9EB717',
                                borderRadius: 3,
                                backgroundColor: '#FBFBFB',
                                borderWidth: 1,
                                fontFamily: 'regular',
                                paddingLeft: 15,
                                fontSize: 14,
                            }} >
                                <RNPickerSelect style={{
                                    color: '#8F9EB717',
                                    fontWeight: 'regular',
                                    fontSize: 15
                                }}
                                    placeholder={{
                                        label: 'SELECT TAX %',

                                    }}
                                    Icon={() => {
                                        return <Chevron style={styles.imagealign} size={1.5} color="gray" />;
                                    }}
                                    items={this.state.uom}
                                    onValueChange={this.handleUOM}
                                    style={pickerSelectStyles}
                                    value={this.state.productuom}
                                    useNativeAndroidPickerStyle={false}

                                />
                            </View>
                        )}

                        <Text style={styles.buypooltitle}>Buy Pool Defination</Text>
                        <TextInput style={styles.input}
                            underlineColorAndroid="transparent"
                            placeholder="BUY ANY"
                            keyboardType='name-phone-pad'
                            placeholderTextColor="#6F6F6F"
                            textAlignVertical="center"
                            autoCapitalize="none"
                            value={this.state.buyany}
                            onChangeText={this.handleValue}
                            ref={inputemail => { this.emailValueInput = inputemail }}
                        />


                        <FlatList
                            data={this.state.selctedPoolnames}
                            style={{ marginTop: 40, }}
                            onEndReached={this.onEndReached.bind(this)}
                            ref={(ref) => { this.listRef = ref; }}
                            keyExtractor={item => item}
                            renderItem={({ item, index }) => (
                                // if (index === 0) {
                                //     <View style={{
                                //         height: 80,
                                //         backgroundColor: '#FFFFFF',
                                //         borderBottomWidth: 5,
                                //         borderBottomColor: '#FFFFFF',
                                //         flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                                //     }}>
                                //         <View style={{ flexDirection: 'column', width: '100%', height: 80, borderTopWidth: 10, borderColor: '#F6F6F6' }}>
                                //             <Text style={{ fontSize: 12, marginLeft: 16, marginTop: 20, fontFamily: 'regular', color: '#808080' }}>
                                //                 COLUMN NAME
                                //             </Text>
                                //             <Text style={{
                                //                 fontSize: 12, marginTop: -30, marginLeft: deviceWidth / 2 - 40, fontFamily: 'regular', color: '#808080', justifyContent: 'center', //Centered horizontally
                                //                 alignItems: 'center', //Centered vertically
                                //                 flex: 1
                                //             }}>
                                //                 OPERATOR
                                //             </Text>
                                //             <Text style={{ fontSize: 12, position: 'absolute', right: 70, top: 23, fontFamily: 'regular', color: '#808080' }}>
                                //                 VALUES
                                //             </Text>
                                //         </View>
                                //     </View>
                                // }
                                // else {
                                <View style={{
                                    height: 80,
                                    backgroundColor: '#FFFFFF',
                                    borderBottomWidth: 5,
                                    borderBottomColor: '#FFFFFF',
                                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
                                }}>

                                    <View style={{ flexDirection: 'column', width: '100%', height: 80, borderTopWidth: 10, borderColor: '#F6F6F6' }}>

                                        <Text style={{ fontSize: 12, marginLeft: 16, marginTop: 20, fontFamily: 'regular', color: '#808080' }}>
                                            POOL NAME
                                        </Text>
                                        <Text style={{ fontSize: 14, marginLeft: 16, marginTop: 0, fontFamily: 'medium', color: '#353C40' }}>
                                            {item.poolName}
                                        </Text>

                                        <Text style={{
                                            fontSize: 12, marginTop: -30, marginLeft: deviceWidth / 2 - 100, fontFamily: 'regular', color: '#808080', justifyContent: 'center', //Centered horizontally
                                            alignItems: 'center', //Centered vertically
                                            flex: 1
                                        }}>
                                            Pool Ration
                                        </Text>
                                        <Text style={{
                                            fontSize: 14, marginTop: -20, marginLeft: deviceWidth / 2 - 100, fontFamily: 'medium', color: '#353C40', justifyContent: 'center', //Centered horizontally
                                            alignItems: 'center', //Centered vertically
                                            flex: 1
                                        }}>
                                            {'0'}
                                        </Text>

                                        <Text style={{
                                            fontSize: 12, marginTop: -50, marginLeft: deviceWidth / 2, fontFamily: 'regular', color: '#808080', justifyContent: 'center', //Centered horizontally
                                            alignItems: 'center', //Centered vertically
                                            flex: 1
                                        }}>
                                            Benefit Type
                                        </Text>
                                        <Text style={{
                                            fontSize: 14, marginTop: -20, marginLeft: deviceWidth / 2, fontFamily: 'medium', color: '#353C40', justifyContent: 'center', //Centered horizontally
                                            alignItems: 'center', //Centered vertically
                                            flex: 1
                                        }}>
                                            {"-"}
                                        </Text>

                                        <Text style={{ fontSize: 12, position: 'absolute', right: 30, top: 20, fontFamily: 'regular', color: '#808080' }}>
                                            Discount Type
                                        </Text>
                                        <Text style={{ fontSize: 12, position: 'absolute', right: 30, top: 37, fontFamily: 'medium', color: '#353C40', alignItems: 'center' }}>
                                            {'-'}
                                        </Text>
                                    </View>
                                </View>
                                // }
                            )}
                        />

                        <TouchableOpacity onPress={() => this.addPools()}>

                            <Text style={styles.navigationalbuttonstext}>+ Add Pools</Text>

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.addBenfits()}>
                            <Text style={styles.navigationalbuttonstext}>+ Add Benifits</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                margin: 8,
                                height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                            }} onPress={() => this.savePromo()}
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
                </ScrollView>
                {this.state.flagAddPool && (
                    <View>
                        <Modal isVisible={this.state.modalVisible}>
                            <View
                                style={{
                                    width: deviceWidth,
                                    alignItems: 'center',
                                    marginLeft: -20,
                                    backgroundColor: "#ffffff",
                                    height: 400,
                                    position: 'absolute',
                                    bottom: -20,
                                }}
                            >

                                <Text style={{
                                    position: 'absolute',
                                    left: 20,
                                    top: 15,
                                    width: 300,
                                    height: 20,
                                    fontFamily: 'medium',
                                    fontSize: 16,
                                    color: '#353C40'
                                }}> {'Add Buy Pools'} </Text>



                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    right: 20,
                                    top: 8,
                                    width: 50, height: 50,
                                }} onPress={() => this.modelCancel()}>
                                    <Image style={{ color: '#ED1C24', fontFamily: 'regular', fontSize: 12, position: 'absolute', top: 10, right: 0, }} source={require('../../assets/images/modelcancel.png')} />
                                </TouchableOpacity>

                                <ScrollView style={{ marginTop: 50 }}>
                                    <FlatList
                                        style={{ width: deviceWidth, marginTop: 0, }}
                                        ListHeaderComponent={this.renderHeader}
                                        data={this.state.createdByArray}
                                        keyExtractor={item => item}
                                        renderItem={({ item, index }) => (

                                            <TouchableOpacity onPress={() => this.selectPools(item, index)}>
                                                <View style={{
                                                    borderBottomColor: 'lightgray', borderBottomWidth: 0, marginLeft: this.state.selectedItem === index ? 0 : 0, marginRight: this.state.selectedItem === index ? 0 : 0
                                                }}>


                                                    <View style={{ flexDirection: 'column', width: '100%', height: 40 }}>
                                                        <Text style={{
                                                            fontSize: 14, marginTop: 5, marginLeft: 50, fontFamily: 'regular', color: '#353C40'
                                                        }}>
                                                            {item.poolName}
                                                        </Text>
                                                        <Image source={this.state.selectedItem === index ? require('../../assets/images/poolselect.png') : require('../../assets/images/poolsunselect.png')} style={{ position: 'absolute', left: 20, top: 0 }} />
                                                    </View>

                                                </View>
                                            </TouchableOpacity>


                                        )}
                                    />

                                    <TouchableOpacity
                                        style={{
                                            width: deviceWidth - 40,
                                            marginLeft: 20,
                                            marginRight: 20,
                                            marginTop: 20,
                                            height: 50, backgroundColor: "#ED1C24", borderRadius: 5,
                                        }} onPress={() => this.addPoolName()}
                                    >
                                        <Text style={{
                                            textAlign: 'center', marginTop: 20, color: "#ffffff", fontSize: 15,
                                            fontFamily: "regular"
                                        }}  > {this.state.updateRool == true ? 'UPDATE' : 'ADD'} </Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            width: deviceWidth - 40,
                                            marginLeft: 20,
                                            marginRight: 20,
                                            marginTop: 20,
                                            height: 50, backgroundColor: "#ffffff", borderRadius: 5, borderWidth: 1, borderColor: "#353C4050",
                                        }} onPress={() => this.modelCancel()}
                                    >
                                        <Text style={{
                                            textAlign: 'center', marginTop: 20, color: "#353C4050", fontSize: 15,
                                            fontFamily: "regular"
                                        }}  > CANCEL </Text>

                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </Modal>
                    </View>

                )}
            </View>

        )

    }
}
export default AddPromo

const pickerSelectStyles = StyleSheet.create({
    placeholder: {
        color: "#6F6F6F",
        fontFamily: "regular",
        fontSize: 15,
    },
    inputIOS: {
        justifyContent: 'center',
        height: 42,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        //paddingLeft: -20,
        fontSize: 15,
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',
    },
    inputAndroid: {
        justifyContent: 'center',
        height: 42,
        borderRadius: 3,
        borderWidth: 1,
        fontFamily: 'regular',
        //paddingLeft: -20,
        fontSize: 15,
        borderColor: '#FBFBFB',
        backgroundColor: '#FBFBFB',
        color: '#001B4A',

        // marginLeft: 20,
        // marginRight: 20,
        // marginTop: 10,
        // height: 40,
        // backgroundColor: '#ffffff',
        // borderBottomColor: '#456CAF55',
        // color: '#001B4A',
        // fontFamily: "bold",
        // fontSize: 16,
        // borderRadius: 3,
    },
})

const styles = StyleSheet.create({
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
    imagealign: {
        marginTop: 16,
        marginRight: 20,
    },
    viewswidth: {
        backgroundColor: '#ffffff',
        width: deviceWidth,
        textAlign: 'center',
        fontSize: 24,
        height: 84,
    },
    promoname: {
        fontFamily: 'medium',
        fontSize: 16,
        color: "red",
        marginLeft: 20,
    },
    buypooltitle: {
        fontFamily: 'medium',
        fontSize: 16,
        color: 'red',
        marginTop: 25,
        marginBottom: 16,
        marginLeft: 20,
    },
    navigationalbuttons: {
    },
    navigationalbuttonstext: {
        color: 'red',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontFamily: 'regular',
        textDecorationLine: 'underline',
        textDecorationColor: 'red',
    },
});

