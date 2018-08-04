import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import MyStorage from '../libs/Storage';

export default class TaskDetails extends React.Component {
  deleteTask = async () => {
    const task = this.props.navigation.getParam('task', {});
    const updateTasks = this.props.navigation.getParam('updateTasks');

    const tasks = await new MyStorage().destroy(task.id);

    updateTasks(tasks);

    this.props.navigation.goBack();
  }

  render () {
    const task = this.props.navigation.getParam('task', {});

    return (
      <View>
        <Text>Task Details</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.deleteTask}
        >
          <Text style={{ color: 'red' }}>Delete</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 30 }}>{task.title}</Text>
      </View>
    )
  }
}
