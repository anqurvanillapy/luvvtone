import React, { Component } from 'react'
import { AppRegistry, View } from 'react-native'

import Header from './header.component'
import DateList from './datelist.component'

export default class App extends Component {
  render () {
    return (
      <View>
        <Header />
        <DateList />
      </View>
    )
  }
}

AppRegistry.registerComponent('luvvtone', _ => App)
