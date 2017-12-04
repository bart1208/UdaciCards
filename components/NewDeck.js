import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';

import { connect } from 'react-redux';
import { black, white, lightGray } from '../utils/colors';

import { newDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';

import SubmitButton from './SubmitButton';
import { NavigationActions } from 'react-navigation';

class NewDeck extends Component {
  state = {
    title: ""
  }

  submit = () => {
    const { title } = this.state;
    const { newDeck } = this.props;

    if (title) {
      newDeck(title);
      saveDeckTitle(title);
      this.goToDeck(title);
    }
  }

  reset = () => {
    this.setState({title: ""});
    this.toHotoDeckTabme();
  }

  goToDeck = (title) => {
    this.props.navigation.navigate('DeckInfo', {deckTitle: title})
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
        <TextInput
          underlineColorAndroid={'transparent'}
          style={styles.deckInput}
          editable={true}
          maxLength={50}
          placeholder="Deck Title"
          onChangeText={(title) => this.setState({title})}/>
        <SubmitButton onSubmit={this.submit} onCancel={this.reset} submitBtnText={'Create Deck'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20
  },
  deckTitle: {
    margin: 10,
    color: black,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
  },
  deckInput: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: lightGray
  }
})

function mapStateToProps(decks) {
  return {decks}
}
export default connect(mapStateToProps, {newDeck})(NewDeck)
