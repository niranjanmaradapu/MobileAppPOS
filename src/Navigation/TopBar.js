import { View, Text } from 'react-native';
import Modal from 'react-native-modal';
import { filterMainContainer, filterSubContainer, filterHeading, filterCloseImage, deleteText, deleteHeading, deleteHeader, deleteContainer, deleteCloseBtn } from '../components/Styles/PopupStyles';
import React, { Component } from 'react';
import style from '../../src/assets/styles/topBar.scss';

export class TopBar extends Component {
  render() {
    const active = this.props.active;
    return (
      <View>
        <Modal isVisible={active}>
          <View style={style.container}>
            <Text>Hey</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

export default TopBar;
