import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const styles = StyleSheet.create({
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: 'green'
  }
});

export default class Rating extends React.Component {

  load_rating = (value) => {
    let result = [];

    for (let i = 0; i < 5; i++) {
      result.push(value > 0 ? 1 : 0);
      value--;
    }

    return result.map((val, i) => {
      return (
        <TouchableOpacity onPress={
          () => this.props.onPressRating(this.props.taskIndex, i + 1)
        }>
          <Icon name={val === 1 ? 'star' : 'star-o'} />
          {/*
            <View style={
              [styles.circle, val === 1 && { backgroundColor: 'black' }]
            } />
          */}
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text>{this.props.ratValue}</Text>
        {this.load_rating(this.props.ratValue)}
      </View>
    );
  }
}
