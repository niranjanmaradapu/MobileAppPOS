import React, { Component } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import Device from 'react-native-device-detection';
import I18n from 'react-native-i18n';
import { flatListMainContainer, flatlistSubContainer, highText, textContainer, textStyleLight, textStyleMedium } from '../Styles/Styles';
import { RH, RF, RW } from '../../Responsive';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

export default class Domain extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.domains}
                    style={{ marginTop: 20, }}
                    scrollEnabled={true}
                    keyExtractor={(item,i) => i.toString()}
                    ListEmptyComponent={<Text style={domainEmpty}>&#9888; Records Not Found</Text>}
                    renderItem={({ item, index }) => (
                        <View style={flatListMainContainer}>
                            <View style={flatlistSubContainer}>
                                <View style={textContainer}>
                                    <Text style={highText} >S NO: {index + 1} </Text>
                                </View>
                                <View style={textContainer}>
                                    <Text style={textStyleMedium}>{I18n.t("DOMAIN")}: {item.domaiName}</Text>
                                </View>
                                <View style={textContainer}>
                                    <Text style={textStyleMedium}>{I18n.t("CREATED BY")}: {item.createdBy}</Text>
                                    <Text style={textStyleLight}>{I18n.t("CREATED DATE")}: {item.createdDate}  </Text>
                                </View>
                                <View style={textContainer}>
                                    <Text style={textStyleLight}>{I18n.t("DESCRIPTION")}: {item.discription}  </Text>
                                </View>
                            </View>
                        </View>
                    )}
                />
                {this.props.domains.length > 0 && this.props.channelFull && 
                    <Text style={domainFull}>user have all the domains</Text>
                }
                {/* {this.props.domainError.length !== 0 && 
                    <Text style={{ color: '#cc241d', textAlign: "center", fontFamily: "bold", fontSize: Device.isTablet ? 21 : 17, marginTop: deviceheight/3 }}>&#9888; {this.props.domainError}</Text>
                } */}
            </View>
        );
    }
}

const domainFull = {
  color: '#cc241d',
  textAlign: "center",
  fontFamily: "bold",
  fontSize: RF(17),
  marginTop: Device.isTablet ? RH(20) : RH(10)
}

const domainEmpty = {
    color: '#cc241d',
    textAlign: "center",
    fontFamily: "bold",
    fontSize: RF(17),
    marginTop: deviceHeight / 3
}