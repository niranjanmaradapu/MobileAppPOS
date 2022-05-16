import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { listEmptyMessage } from '../Styles/Styles'
import { buttonContainer, buttonStyle, flatListMainContainer, flatlistSubContainer, highText, imaheStyle, textContainer } from './inventoryStyles'
import I18n from 'react-native-i18n'
export class Barcode extends Component {
  render() {
    return (
      <View>
                                <FlatList
                                    data={this.state.barcodesData}
                                    style={{ marginTop: 20 }}
                                    scrollEnabled={true}
                                    // removeClippedSubviews={false}
                                    ListEmptyComponent={<Text style={{ color: '#cc241d', textAlign: "center", fontFamily: "bold", fontSize: Device.isTablet ? 21 : RF(17), marginTop: deviceheight / 3 }}>&#9888; Records Not Found</Text>}
                                    keyExtractor={(item, i) => i.toString()}
                                    renderItem={({ item, index }) => (
                                        <View style={{ flex: 1 }}>
                                            <View
                                                style={Device.isTablet ? styles.barcodesFlatlistContainer_tablet : styles.barcodesFlatlistContainer_mobile}
                                            >
                                                <View style={Device.isTablet ? styles.barcodesFlatlistSubContainer_tablet : styles.barcodesFlatlistSubContainer_mobile}>
                                                    <Text style={Device.isTablet ? flats.mainText_tablet : flats.mainText_mobile} >S.NO: {index + 1} </Text>
                                                    <Text selectable={true} style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile} numberOfLines={2} >{I18n.t("BARCODE")}: {item.barcode}</Text>
                                                    <Text style={Device.isTablet ? flats.subText_tablet : flats.subText_mobile}>{I18n.t("LIST PRICE")}:  {"\n"} ₹{item.itemMrp} </Text>
                                                    <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>{I18n.t("STORE")}: {this.state.storeName}</Text>
                                                    <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>QTY:  {item.qty}</Text>
                                                    <Text style={Device.isTablet ? flats.commonTextsub_tablet : flats.commonTextsub_mobile}>{I18n.t("VALUE")}: ₹{item.value}</Text>
                                                    <TouchableOpacity style={Device.isTablet ? flats.editButton_tablet : flats.editButton_mobile} onPress={() => this.handleeditbarcode(item, index)}>
                                                        <Image style={styles.image} source={require('../assets/images/edit.png')} />
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={Device.isTablet ? flats.deleteButton_tablet : flats.deleteButton_mobile} onPress={() => this.handlebarcodedeleteaction(item, index)}>
                                                        <Image style={styles.image} source={require('../assets/images/delete.png')} />

                                                    </TouchableOpacity>

                                                    {/* <Text style={Device.isTablet ? flats.commonText_tablet : flats.commonText_mobile}>{ }</Text> */}
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    onEndReached={() => { this.loadMoreList() }}
                                    onEndReachedThreshold={10}
                                    ListFooterComponent={() => { return <ActivityIndicator size={"small"} /> }}
                                />
                                {/* {this.state.barcodesData.length === 0 && this.state.error.length > 0 &&
                                } */}
                            </View>
    )
  }
}

export default Barcode