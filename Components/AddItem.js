import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import makeObj from '../Components/makeObj'
import Listing from '../Components/Listing'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import axios from 'axios';


export default class AddItem extends Component {
        state = {
                text: '',
                data: [],
                id: 0,
                value: '',
                isDone: false,
                type: 'All',
                all:1,
                active:0,
                completed:0,
        }
        addTask = async () => {
                this.state.text = this.state.text.trim()
                if (this.state.text === "") {
                        alert("Can't Add Empty Task")
                }
                else {
                        const a = { id: Date.now(), value: this.state.text, isDone: false }
                        await this.setState({ data: [...this.state.data, a] })
                        await this.setState({ text: '' })

                        
                }
        }
        changeState = (a) => {
                this.state.data.map((key, index) => {
                        if (key.id === a.id) {
                                key.isDone = !key.isDone
                                this.setState({ isDone: !this.state.isDone })
                        }
                });
        }

        deleteState = (a) => {
                this.state.data.map((key, index) => {
                        if (key.id === a.id) {
                                this.state.data.splice(index, 1)
                                this.setState({ isDone: !this.state.isDone })
                        }
                });
        }

        deleteAll = () => {
                this.setState({ data: [] , all:0,active:0,completed:0})
        }
        showActive = () => {
                this.setState({ type: 'Active' ,all:0,active:1,completed:0})
        }
        showCompleted = () => {
                this.setState({ type: 'Completed',all:0,active:0,completed:1 })
        }
        showAll = () => {
                this.setState({ type: 'All' ,all:1,active:0,completed:0})
        }
        // var {vw, vh, vmin, vmax} = require('react-native-viewport-units');

        render() {


                return (
                        <View>
                                <TextInput
                                        label='Add Task'
                                        value={this.state.text}
                                        onChangeText={text => this.setState({ text })}
                                />
                                <View style={styles.view}>

                                        <Button style={styles.button} icon="" mode="contained" onPress={this.addTask}>
                                                Add Task
                                                </Button>
                                        <Button style={styles.button} color="red" icon="" mode="contained" onPress={this.deleteAll}>
                                                Clear All
                                                </Button>
                                </View>
                                <View style={styles.view}>
                                        <Button style={styles.button} color={this.state.all ? "green":""} icon="" mode="contained" onPress={this.showAll}>
                                                All
                                        </Button>
                                        <Button style={styles.button} color={this.state.active ? "green":""} icon="" mode="contained" onPress={this.showActive}>
                                                Active
                                        </Button>
                                        <Button style={styles.button} color={this.state.completed ? "green":""} icon="" mode="contained" onPress={this.showCompleted}>
                                                Completed
                                        </Button>
                                </View>

                                {/*<Listing data={[...this.state.data]}/>*/}
                                <ScrollView style={{
                                        height: vw(100),
                                        flexDirection: 'column',
                                        alignSelf: 'stretch',
                                }}>
                                        {this.state.data.map((post, index) => {
                                                if (this.state.type === 'Active' && !post.isDone)
                                                        return <Listing key={index} name={post.value} id={post.id} isDone={post.isDone} changeState={this.changeState} deleteState={this.deleteState} />
                                                else if (this.state.type === 'Completed' && post.isDone)
                                                        return <Listing key={index} name={post.value} id={post.id} isDone={post.isDone} changeState={this.changeState} deleteState={this.deleteState} />
                                                else if (this.state.type === 'All')
                                                        return <Listing key={index} name={post.value} id={post.id} isDone={post.isDone} changeState={this.changeState} deleteState={this.deleteState} />

                                        })}
                                </ScrollView>


                        </View>
                )
        }
}

const styles = StyleSheet.create({
        button: {
                // backgroundColor:'red',
                marginTop: 5,
                flex: 1,
                marginRight: 5,
                justifyContent: "center",
        },
        view: {
                // flex:1,
                flexDirection: "row",
        }
});