import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { TabNavigator, StackNavigator } from 'react-navigation';
import {Platform } from 'react-native';

import Decks from './components/Decks';
import AddCard from './components/AddCard';
import NewDeck from './components/NewDeck';
import DeckInfo from './components/DeckInfo';
import Quiz from './components/Quiz';
import { Entypo } from '@expo/vector-icons';
import { Constants } from 'expo';
import { setNotification } from './utils/notifications';
import { red, white, black } from './utils/colors';

function UdaciCardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} barStyle='light-content' />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({tintColor}) => <Entypo name='list' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({tintColor}) => <Entypo name='add-to-list' size={30} color={tintColor} />
    }
  }
},{
  navigationOptions:{
    header: null
  },
  tabBarOptions:{
    activeTintColor: Platform.OS === 'ios'? black : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : black,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
   }
  }
})

export const MainNavigator = StackNavigator({
  Home:{
    screen: Tabs
  },
  DeckInfo:{
    screen: DeckInfo,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      },
      headerBackTitle: null,
    }
  },
  AddCard:{
    screen: AddCard,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      },
      headerBackTitle: null,
      title: "Add Card"
    }
  },
  Quiz:{
    screen: Quiz,
    navigationOptions:{
      headerTintColor: white,
      headerStyle:{
        backgroundColor: black
      },
      headerBackTitle: null,
      title: "Quiz"
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex:1}}>
          <UdaciCardsStatusBar backgroundColor={red} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
