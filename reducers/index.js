import {LOAD_DECKS, NEW_DECK, ADD_CARD} from '../actions'

function decks(state = {}, action) {
  switch (action.type) {
    case LOAD_DECKS:
      {
        return {
          ...state,
          ...action.decks
        }
        break;
      }

    case NEW_DECK:
      {
        const res = {
          ...state,
          [action.deckTitle]: {
            title: action.deckTitle,
            questions: []
          }
        }
        return res
        break;
      }

    case ADD_CARD:
      {
        const res = {
          ...state
        }
        if (res[action.deckTitle]) {
          const {question, answer} = action.card
          res[action.deckTitle].questions.push({question, answer})
        }
        return res
        break;
      }

    default:
      return state
  }
}

export default decks
