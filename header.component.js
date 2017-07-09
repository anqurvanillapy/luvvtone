import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Header extends Component {
  constructor () {
    super()
    this.style = {
      backgroundColor: '#2196f3',
      height: 56,
      elevation: 5
    }
  }

  render () {
    return (
      <Icon.ToolbarAndroid
        style={this.style}
        title='大小姐的倒计时'
        titleColor='#fff'
        navIconName='md-menu'
        actions={[
          { title: '增加日期', iconName: 'md-add', show: 'always' }
        ]}
      />
    )
  }
}
