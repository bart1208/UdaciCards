import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { black, gray } from '../utils/colors';

class Deck extends Component {
  render() {
    const { title, questions } = this.props;
    return (
      <View style={styles.container}>
        <Text style={[styles.title]}>{title}</Text>
        <Text style={[styles.count]}>{questions.length}cards</Text>
      </View>
    )
  }
}

export default Deck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    color: black,
    fontSize: 30,
    textAlign: 'center'
  },
  count: {
    color: gray,
    fontSize: 20,
    textAlign: 'center'
  }
})
