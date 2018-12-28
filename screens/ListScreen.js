import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import ListeItem from '../components/ListItem'

export default class List extends Component {

  static navigationOptions = {
    title: 'Home',
  };

  state = {
      isLoading: true,
      subreddits: []
  }
  
  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {

    axios.post(`https://www.graphqlhub.com/graphql`, {
        "query": "{  graphQLHub  reddit {    user(username: \"kn0thing\") {      username      commentKarma      createdISO    }    subreddit(name: \"movies\") {      newListings(limit: 10) {        title        comments {          body          author {            username            commentKarma          }        }      }    }  }\n}\n",
        "variables": "null",
        "operationName": null
    }).then(res => {
      const subreddits = res.data.data.reddit.subreddit.newListings;
      this.setState({
        isLoading: false,
        subreddits: subreddits,
      });
    }).catch(error => {
      this.setState({loading: false });
    });

  }

  render() {
      if (this.state.isLoading) {
        return this.renderLoadingView();
      }
      
      return this.renderListView();
  }

  renderItem = (item) => {
    return <ListeItem data={item}/>;
  };

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

  renderLoadingView = () => {
    return (
      <View style={styles.loading}>
        <ActivityIndicator animating size="large"/>
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };
}

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
  }
})
