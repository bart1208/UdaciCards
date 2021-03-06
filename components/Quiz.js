import React, {PureComponent} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated
} from 'react-native';
import {connect} from 'react-redux';
import {setNotification, clearLocalNotification} from '../utils/notifications';
import {white, black, green, red, charcoal} from '../utils/colors';
import Deck from './Deck';
import Card from './Card';

class Quiz extends PureComponent {

  state = {
    questionIndex: 0,
    correctAnswers: 0
  }

  componentDidMount() {
    clearLocalNotification().then(setNotification)
  }

  correctQuestion() {
    this.setState((state) => {
      return {
        questionIndex: state['questionIndex'] + 1,
        correctAnswers: state['correctAnswers'] + 1
      }
    })
  }

  inCorrectQuestion() {
    this.setState((state) => {
      return {
        ...state,
        questionIndex: state['questionIndex'] + 1
      }
    })
  }

  restartQuiz() {
    this.setState({questionIndex: 0, correctAnswers: 0})
  }

  render() {
    const {questionIndex, correctAnswers} = this.state
    const {deck, goBack} = this.props
    const {questions} = deck

    if (questionIndex > 0 && questionIndex === questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLbl}>Your Score</Text>
            <Text style={styles.score}>{(correctAnswers / questions.length) * 100}
              %</Text>
          </View>

          <View style={styles.btnContainer}>
            <TouchableOpacity style={[styles.btn, styles.goBackToDeckBtn]} onPress={() => goBack()}>
              <Text style={[styles.btnText, styles.goBackToDeckBtnText]}>Back to Deck</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.restartQuizBtn]} onPress={() => this.restartQuiz()}>
              <Text style={[styles.btnText, styles.restartQuizBtnText]}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const card = questions[questionIndex];
    const {opacityFront, opacityBack, transformFrontY, transformBackY} = this.state;
    const frontAnimatedStyle = {
      transform: [
        {
          rotateY: this.frontInterpolate
        }
      ]
    };
    const backAnimatedStyle = {
      transform: [
        {
          rotateY: this.backInterpolate
        }
      ]
    };
    return (
      <View style={styles.container}>
        <Text style={styles.pagination}>{questionIndex + 1}/{questions.length}</Text>
        <View style={styles.card}><Card card={card}/></View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={[styles.btn, styles.greenBtn]} onPress={() => this.correctQuestion()}>
            <Text style={[styles.btnText]}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.redBtn]} onPress={() => this.inCorrectQuestion()}>
            <Text style={[styles.btnText]}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  pagination: {
    flex: 1,
    alignItems: 'flex-start'
  },
  card: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  btn: {
    padding: 10,
    height: 45,
    margin: 10,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        borderRadius: 7
      },
      android: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2
      }
    })
  },
  greenBtn: {
    backgroundColor: green
  },
  redBtn: {
    backgroundColor: red
  },
  goBackToDeckBtn: {
    backgroundColor: white,
    borderWidth: 1,
    borderColor: black
  },
  goBackToDeckBtnText: {
    color: black
  },
  restartQuizBtn: {
    backgroundColor: black
  },
  restartQuizBtnText: {
    color: white
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  },
  scoreContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreLbl: {
    fontSize: 36,
    color: charcoal
  },
  score: {
    fontSize: 48,
    color: green
  }
})

function mapStateToProps(decks, {navigation}) {
  const {deckTitle} = navigation.state.params
  return {
    deck: decks[deckTitle] || {}
  }
}

function mapDispatchToProps(dispatch, {navigation}) {
  const {deckTitle} = navigation.state.params

  return {
    goBack: () => navigation.goBack()
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
