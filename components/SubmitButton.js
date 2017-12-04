import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { black, white } from '../utils/colors';

class SubmitButton extends PureComponent {
  render() {
    const {onSubmit, submitBtnText} = this.props;
    return (
      <View style={styles.row}>
        <TouchableOpacity style={[styles.btn]} onPress={onSubmit}>
          <Text style={styles.btnText}>{submitBtnText || 'Submit'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default SubmitButton

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btn: {
    flex: 1,
    backgroundColor: black,
    padding: 10,
    height: 50,
    margin: 10,
    maxWidth: 200,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        borderRadius: 7
      },
      android: {
        borderRadius: 2
      }
    })
  },
  btnText: {
    color: white,
    fontSize: 22
  }
})
