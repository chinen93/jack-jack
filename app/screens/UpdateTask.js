import React from 'react';
import Rating from '../components/Rating';
import MyStorage from '../libs/Storage';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  input:{
    borderWidth: 1,
    padding: 5
  }
});

export default class UpdateTask extends React.Component {

  async componentWillMount() {
    const task = this.props.navigation.getParam('task', {});

    this.setState({ 
      id: task.id,
      title: task.title,
      description: task.description,
      rating: task.rating,
    });
  }


  updateTask = async () => {
    const callback = this.props.navigation.getParam('updateTask', {});
    const taskToUpdate = this.state;

    const tasks = await new MyStorage().update(taskToUpdate.id,
                                               taskToUpdate);

    callback(taskToUpdate, tasks);

    this.props.navigation.goBack();
  };

  render() {
      return (
        <View>
          <Text>Update Task</Text>
          {/* Botao para voltar */}
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
          >
            <Text>Back</Text>
          </TouchableOpacity>

          {/* Input para a tarefa */}
          <View style={{ padding : 20 }}>
            <Text>Title: {this.state.title}</Text>
            <TextInput
              style={styles.input}
              value={this.state.title}
              onChangeText={(text) => this.setState({title: text})}
            />
            <Text>Description: {this.state.description}</Text>
            <TextInput
              style={styles.input}
              value={this.state.description}
              multiline = {true}
              numberOfLines ={4}
              onChangeText={(text) => this.setState({description: text})}
            />
            <Text>Rating: {this.state.rating}</Text>
            <Rating
              ratValue={this.state.rating}
              onPressRating={(index, value) =>
                             this.setState({rating: value})}
            />
          </View>

          {/* Botao para atualizar */}
          <TouchableOpacity
            onPress={this.updateTask}
          >
          <Text />
          <Text style={{fontSize:20}}>Update Task</Text>
          </TouchableOpacity>

        </View>
      );
  }
}
