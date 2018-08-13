import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import MyStorage from '../libs/Storage';
import Rating from '../components/Rating';

export default class TaskDetails extends React.Component {
  deleteTask = async () => {
    const task = this.props.navigation.getParam('task', {});
    const updateTasks = this.props.navigation.getParam('updateTasks');

    const tasks = await new MyStorage().destroy(task.id);

    updateTasks(tasks);

    this.props.navigation.goBack();
  }

  onPressRating = () => {
      
  }

  render () {
    const task = this.props.navigation.getParam('task', {});

    return (
      <View>
        <Text>Task Details</Text>
        
        {/* Acoes para o sistema */}
        <View style={{flexDirection: 'row'}}>

          {/* Botao voltar para tela anterior */}
          <View style={{flex: 0.5}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
            >
              <Text>Back</Text>
            </TouchableOpacity>
          </View>

          {/* Botao deletar tarefa  */}
          <View style={{flex: 0.5}}>
            <TouchableOpacity
              onPress={this.deleteTask}
            >
              <Text style={{ color: 'red' }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Informacoes da tarefa  */}
        <Text style={{ fontSize: 30 }}>{task.title}</Text>
        <Text style={{ fontSize: 20 }}>{task.description}</Text>
        <Rating 
          taskIndex={task.id}
          ratValue={task.rating}
          onPressRating={this.onPressRating} 
        />

        {/* Botao salvar alteracoes da tarefa */}
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('UpdateTask')}
          >
            <Text style={{ color: 'blue' }}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
