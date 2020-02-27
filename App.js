import React, { Component } from 'react'
import { Text, View, TextComponent } from 'react-native'
import NavBar from './Components/NavBar'
import AddItem from './Components/AddItem'


export default class App extends Component {
  render() {
    return (
      <View>
        <NavBar/>
        <AddItem/>
      </View>
    )
  }
}
