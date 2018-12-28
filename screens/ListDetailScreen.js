import React, {Component} from 'react';
import { View } from 'react-native';

export default class ListDetail extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('itemDetail', 'Details').title,
        };
    };

  render() {
    const itemDetail = this.props.navigation.getParam('itemDetail', null);
    console.log(itemDetail);
    return (
      <View></View>
    );
  }
}