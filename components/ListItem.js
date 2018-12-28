/**
 * Project : React Native Test App
 * This is a stateless component used for showing movie title and going to detail screen.
 * It contains TouchableOpacity a react component which is used for enabling click event on view.
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

const  ListItem = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('ListDetailScreen', {itemDetail: props.data})}>
          <Text style={styles.item}>{props.data.title}</Text>
        </TouchableOpacity>
      );
}

export default withNavigation(ListItem);


/**
 * This is used to style the components.
 */
const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  }
})