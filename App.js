/**
 * Project : React Native Test App
 * This is the top level component in the app which will contain AppNavigator for navigation.
 */

import React, {Component} from 'react';
import AppNavigator from './appNavigator/index';
import {createAppContainer} from 'react-navigation';

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {

  render() {
    return (
      <AppContainer/>
    );
  }
}