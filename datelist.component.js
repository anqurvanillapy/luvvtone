import React, { Component } from 'react'
import { View, Text, ListView, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

class DateListItem extends Component {
  constructor (props) {
    super()
    this.state = props

    // Styles.
    this.style = {
      container: {
        padding: 20,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eee'
      },
      text: {
        fontSize: 20
      }
    }
  }

  render () {
    return (
      <View style={this.style.container}>
        <Icon name='md-home' size={20} style={{margin: 5}} />
        <Text
          style={this.style.text}
          onPress={_ => {
            this.setState(prevState => {
              return {id: prevState.id, data: 'clicked!'}
            })
          }}
        >
          {this.state.data}
        </Text>
      </View>
    )
  }
}

export default class DateList extends Component {
  constructor () {
    super()

    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = { datelist: [] }

    AsyncStorage.getItem('list').then(val => {
      this.setState(prevState => {
        return { datelist: JSON.parse(val) }
      })
    }).catch(_ => { /* nop */ })
  }

  render () {
    const ls = this.state.datelist

    if (ls.length) {
      return (
        <ListView
          dataSource={this.ds.cloneWithRows(ls)}
          renderRow={row =>
            <DateListItem
              id={row.id}
              data={row.data}
            />
          }
        />
      )
    } else {
      return (
        <View style={{margin: 10}}>
          <Text>还没有记录喔~</Text>
        </View>
      )
    }
  }
}
