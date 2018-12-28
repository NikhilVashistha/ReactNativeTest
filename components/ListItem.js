import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

const  ListeItem = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('ListDetailScreen', {itemDetail: props.data})}>
          <Text style={styles.item}>{props.data.title}</Text>
        </TouchableOpacity>
      );
}

export default withNavigation(ListeItem);

const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    }
  })
  