import React, { Component } from 'react'
import { View, Modal, Text, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Header extends Component {
  constructor () {
    super()

    this.style = {
      toolbar: {
        backgroundColor: '#2196f3',
        height: 56,
        elevation: 5
      },
      modal: {
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        },
        button: {
          margin: 20
        },
        buttonGroups: {
          flexDirection: 'row'
        }
      }
    }

    this.state = {
      modalVisible: false
    }
  }

  render () {
    return (
      <View>
        <Icon.ToolbarAndroid
          style={this.style.toolbar}
          title='大小姐的倒计时'
          titleColor='#fff'
          navIconName='md-menu'
          actions={[
            { title: '增加日期', iconName: 'md-add', show: 'always' }
          ]}
          onActionSelected={_ => {
            this.setState(_ => { return { modalVisible: true } })
          }}
        />
        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={_ => { /* nop */ }}
        >
          <View style={this.style.modal.container}>
            <Text>Pick a date</Text>
            <View style={this.style.modal.buttonGroups}>
              <View style={this.style.modal.button}>
                <Button
                  onPress={_ => {
                    this.setState(_ => { return { modalVisible: false } })
                  }}
                  title='取消'
                  color='#f44336'
                />
              </View>
              <View style={this.style.modal.button}>
                <Button
                  onPress={_ => { alert('ok') }}
                  title='确认'
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
