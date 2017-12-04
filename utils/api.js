import React from 'react';
import { AsyncStorage } from 'react-native'

const DECKS_KEY = 'bart1208'

function exampleDecks() {
  return {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        }, {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
}

function parseDecks(results) {
  return (results) ? JSON.parse(results) : exampleDecks()
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_KEY).then(parseDecks)
}

export function getDeck(id) {
  return getDecks().then((decks) => (decks[id]))
}

export function saveDeckTitle(deckTitle) {
  getDecks().then((decks) => {
    if (!decks[deckTitle]) {
      decks[deckTitle] = {
        title: deckTitle,
        questions: []
      }
      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
    }
  })
}

export function addCardToDeck(deckTitle, {question, answer}) {
  getDecks().then((decks) => {
    if (decks[deckTitle] && decks[deckTitle]['questions']) {
      decks[deckTitle]['questions'].push({question, answer})
    }
    AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
  })
}
