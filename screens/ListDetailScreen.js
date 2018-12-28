/**
 * Project : React Native Test App
 * This component is used for showing the detail of indiviual SubReddit movie.
 * It contains FlatList a react component for rendering list of comments.
 */
import React, {Component} from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import CommentItem from '../components/Comment'

export default class ListDetail extends Component {

/**
 * This is for setting the title in App Bar.
 */
  static navigationOptions = ({ navigation }) => {
      return {
          title: navigation.getParam('itemDetail', 'Details').title,
      };
  };


  /**
   * This function is used to render the UI.
   */
  render() {
    // This is used to get the detail of individual item when clicked on it.
    const itemDetail = this.props.navigation.getParam('itemDetail', null);
    return (
      <View 
        style={styles.root}>
        <Text style={styles.title}>
          {itemDetail.title}
        </Text>
        <FlatList
          data={itemDetail.comments}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => `${index}`}
          renderItem={this.renderComment}
        />
      </View>
    );
  }


  /**
   * This function is used to show the individual comment.
   */
  renderComment = (item) => {
    return <CommentItem data={item}/>;
  };


  /**
   * This function is used to show the seprator between items of list.
   */
  renderSeparator = () => (
    <View style={styles.separator} />
  );

}


/**
 * This is used to style the components.
 */
const styles = StyleSheet.create({
  root: {
    marginBottom:20
  },
  title: {
    margin:10, 
    fontSize:16, 
    fontWeight:'bold'
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
  }
});