import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { Appbar } from 'react-native-paper';


const NavBar = () => {
        return (
                <View>
                        <Appbar.Header>
                        
                                <Appbar.Content
                                        title="Todo App"
                                />
                        </Appbar.Header>
                </View>
        )
}

export default NavBar
