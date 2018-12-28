/**
 * Project : React Native Test App
 * This component is used for navigation.
 * It contains all the screens to navigate.
 * By default it will show ListScreen. 
 * Using react-navigation.
 */

import {createStackNavigator} from 'react-navigation';
import ListScreen from '../screens/ListScreen';
import ListDetailScreen from '../screens/ListDetailScreen';

const AppNavigator = createStackNavigator({
    ListScreen: {screen: ListScreen},
    ListDetailScreen: {screen: ListDetailScreen},
  },
  {
    initialRouteName: "ListScreen"
  }
);
  
export default AppNavigator;