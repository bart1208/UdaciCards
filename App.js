import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { MainNavigator } from './routes'

import { Constants } from 'expo';
import { setNotification } from './utils/notifications';
import { red } from './utils/colors';

function UdaciCardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} barStyle='light-content' />
    </View>
  )
}

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
