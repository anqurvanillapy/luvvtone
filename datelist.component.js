import React, { Component } from 'react'
import { Text, ListView } from 'react-native'

class DateListItem extends Component {
  constructor (props) {
    super()
    this.state = props
  }

  render () {
    return (
      <Text
        onPress={_ => {
          this.setState(prevState => {
            return {id: prevState.id, data: 'clicked!'}
          })
        }}
      >
        {this.state.data}
      </Text>
    )
  }
}

export default class DateList extends Component {
  constructor () {
    super()
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSrc: ds.cloneWithRows([
        { id: 0, data: 'row 1' },
        { id: 1, data: 'row 2' }
      ])
    }
  }

  render () {
    return (
      <ListView
        dataSource={this.state.dataSrc}
        renderRow={row =>
          <DateListItem
            id={row.id}
            data={row.data}
          />
        }
      />
    )
  }
}
