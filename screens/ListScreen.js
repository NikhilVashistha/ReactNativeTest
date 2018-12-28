/**
 * Project : React Native Test App
 * This component is used for showing the list of SubReddit movies title in list.
 * It contains FlatList a react component for rendering list.
 */
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ListItem from '../components/ListItem'

export default class List extends Component {

  /**
   * This is for setting the title in App Bar.
   */
  static navigationOptions = {
    title: 'Home',
  };


  /**
   * It is for declaring the initial state of objects.
   */
  state = {
      isLoading: true,
      subreddits: []
  }
  

  /**
   * It will be called after first rendering.
   */
  componentDidMount() {
    this.makeRemoteRequest();
  }


  /**
   * This function is used for getting data from the GraphQlHub server.
   * Posting query to get data.
   * axios is promise based http client used to get data from server.
   */
  makeRemoteRequest = () => {

    axios.post(`https://www.graphqlhub.com/graphql`, {
        "query": "{  graphQLHub  reddit {    user(username: \"kn0thing\") {      username      commentKarma      createdISO    }    subreddit(name: \"movies\") {      newListings(limit: 10) {        title   url    comments {          body          author {            username            commentKarma          }        }      }    }  }\n}\n",
        "variables": "null",
        "operationName": null
    }).then(res => {
      const subreddits = res.data.data.reddit.subreddit.newListings;
      
      // this is used to update the states
      this.setState({
        isLoading: false,
        subreddits: subreddits,
      });
    }).catch(error => {
      this.setState({loading: false });
    });

  }


  /**
   * This function is used to render the UI.
   */
  render() {
      if (this.state.isLoading) {
        return this.renderLoadingView();
      }
      
      return this.renderListView();
  }


  /**
   * This function is used to show the loader.
   */
  renderLoadingView = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large"/>
      </View>
    );
  };


  /**
   * This function is used to show the List.
   */
  renderListView = () => {
    return (
      <View style={styles.container}>
        <FlatList
          ItemSeparatorComponent={this.renderSeparator}
          data={this.state.subreddits}
          keyExtractor={(item, index) => JSON.stringify(index)}
          renderItem={({item}) => this.renderItem(item)}
        />
      </View>
    )
  };

  
  /**
   * This function is used to show the individual item of list.
   */
  renderItem = (item) => {
    return <ListItem data={item}/>;
  };


  /**
   * This function is used to show the seprator between items of list.
   */
  renderSeparator = () => {
    return (
      <View
        style={styles.separator}
      />
    );
  };
}


/**
 * This is used to style the components.
 */
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE",
  }
})
