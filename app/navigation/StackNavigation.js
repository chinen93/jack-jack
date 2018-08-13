import React from 'react';

import { createStackNavigator } from 'react-navigation';

import Main from '../screens/Main';
import NewTask from '../screens/NewTask';
import TaskDetails from '../screens/TaskDetails';
import UpdateTask from '../screens/UpdateTask';

export default class MainStackNavigation extends React.Component{

  createStackNavigator = () => createStackNavigator({
    Main: {
      screen: Main
    },
    NewTask: {
      screen: NewTask
    },
    TaskDetails: {
      screen: TaskDetails
    },
    UpdateTask: {
      screen: UpdateTask
    }
  }, {
    initialRouteName: 'Main',
    navigationOptions: {
      header: null
    }
  });

  render() {

    const MainStackNavigationConstructor = this.createStackNavigator();

    return (
        <MainStackNavigationConstructor />
    );
  }
}
