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

export default class NewTask extends React.Component {

  state  = {
    title: '',
    description: '',
    rating: 1
  }

  saveTask = async () => {
    const appendToTasks = this.props.navigation.getParam('appendToTasks');
    const task = this.state;

    const savedTask = await new MyStorage().add(task);

    appendToTasks(savedTask);

    this.props.navigation.goBack();
  }

  render() {
      return (
        <View>
          <Text>New Task</Text>
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
              placeholder="Title"
              onChangeText={(text) => this.setState({title: text})}
            />
            <Text>
              Description: 
              {this.state.description}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Description"
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => this.setState({description: text})}
            />
            <Text>Rating: {this.state.rating}</Text>
            <Rating
              ratValue={this.state.rating}
              onPressRating={(index, value) =>
                             this.setState({rating: value})}
            />
          </View>

          {/* Botao para salvar */}
          <TouchableOpacity
            onPress={this.saveTask}
          >
          <Text />
          <Text style={{fontSize:20}}>Save Task</Text>
          </TouchableOpacity>

        </View>
      );
  }
}
