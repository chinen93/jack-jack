import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Rating from './Rating';

export default class Task extends React.Component {

  render() {
    const { index, title, desc, ratValue } = this.props;

    return (
      <View>
        <Text>{title}</Text>

        <Rating 
          taskIndex={index}
          ratValue={ratValue}
          onPressRating={
            (index, value) => this.props.onPressRating(index, value)
          } 
        />
      </View>
    );
  }
}
