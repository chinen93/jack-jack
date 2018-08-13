import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';

import Task from '../components/Task.js';
import MyStorage from '../libs/Storage';

const styles = StyleSheet.create({

});

export default class Main extends React.Component {
  state = {
    tasks: []
  }

  async componentWillMount() {
    const tasks = await new MyStorage().load();
    this.setState({ tasks: tasks });
  }

  appendToTasks = (task) => {
      const tasks = this.state.tasks;
      tasks.push(task);
      this.setState({tasks: tasks});
  }

  updateTasks = (tasks) => {
      this.setState({ tasks });
  }

  onPressRating = (index, value) => {
    const tasks = this.state.tasks;

    tasks[index].value = value;

    this.setState({ tasks: tasks });
  }

  render() {
    return (
      <View>
        <Text style={{ fontSize: 30 }} >Minhas Tarefas</Text>

        {/* Botao para criar nova tarefa */}
        <View style={{ flexDirection:'row' }} >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('NewTask', {
               appendToTasks: this.appendToTasks
            })}
            style={{ padding:10, backgroundColor:'grey' }}
          >
            <Text style={{ color:'blue' }}>Nova Task</Text>

          </TouchableOpacity>
        </View>

        {/* Lista de tarefas criadas  */}
        <FlatList
          extraData={this.state}
          data={this.state.tasks}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('TaskDetails', {
                  task: item,
                  updateTasks: this.updateTasks
              })}
            >
              <Task
                index={index}
                title={item.title}
                ratValue={item.rating}
                onPressRating={this.onPressRating} 
              />
            </TouchableOpacity>
          )}

          keyExtractor={item => `${item.id}`}
        />
      </View>
    );
  }
}
