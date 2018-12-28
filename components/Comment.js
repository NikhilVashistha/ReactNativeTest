/**
 * Project : React Native Test App
 * This is a stateless component used for showing comment.
 */

import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const  CommentItem = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.contentHeader}>
                    <Text  style={styles.author}>Author : {`${props.data.item.author.username}`}
                    </Text>
                </View>
                <Text>
                    {props.data.item.body}
                </Text>
            </View>
        </View>
      );
}

export default CommentItem;


/**
 * This is used to style the components.
 */
const styles = StyleSheet.create({
    author: {
      fontWeight:'bold'
    },
    container: {
      paddingLeft: 19,
      paddingRight: 16,
      paddingVertical: 12,
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    content: {
      marginLeft: 16,
      flex: 1,
    },
    contentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    }
});