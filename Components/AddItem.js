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
                all: 1,
                active: 0,
                completed: 0,
        }
        componentDidMount() {
                this.getData()
        }

        getData() {
                return fetch('http://10.0.2.2:3000/task')
                        .then((response) => response.json())
                        .then((response) => {
                                this.setState({ data: [...response] })

                        })
                        .catch((err) => {
                                console.log("Error Occured" + err)
                        })
        }
        addTask = async () => {
                this.state.text = this.state.text.trim()
                if (this.state.text === "") {
                        alert("Can't Add Empty Task")
                }
                else {
                        const a = { id: Date.now(), value: this.state.text, isDone: false }

                        await fetch('http://10.0.2.2:3000/task',
                                {
                                        method: 'POST',
                                        headers: {
                                                Accept: 'application/json',
                                                'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({

                                                _id: a.id,
                                                value: a.value,
                                                isDone: a.isDone
                                        })
                                }
                        ).then((response) => console.log(response))
                                .catch((err) => {
                                        console.log(err)
                                })
                        this.getData()
                        await this.setState({ text: '' })
                }
        }
        changeState = async (a) => {
                var b = 'http://10.0.2.2:3000/task/' + a.id
                // console.log(b)
                await fetch(b, {
                        method: 'PUT',
                        headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                })
                        .then((response) => console.log(response))
                        .catch((err) => console.log("Error Occured" + err))
                this.getData()

                // FOllowing is the code for changing the statte variables.


                // this.state.data.map((key, index) => {
                //         if (key.id === a.id) {
                //                 key.isDone = !key.isDone
                //                 this.setState({ isDone: !this.state.isDone })
                //         }
                // });
        }

        deleteState = async (a) => {
                var b = 'http://10.0.2.2:3000/task/' + a.id
                await fetch(b, {
                        method: 'DELETE',
                        header: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                        }
                })
                this.getData()

                //Following is the code for deleting the data without the need of mongoose.

                // this.state.data.map((key, index) => {
                //         if (key.id === a.id) {
                //                 this.state.data.splice(index, 1)
                //                 this.setState({ isDone: !this.state.isDone })
                //         }
                // });
        }

        deleteAll = async () => {

                await fetch('http://10.0.2.2:3000/task', {
                        method: 'DELETE',
                       
                }).then((response)=>console.log(response))
                .catch((err)=>console.log(err))
                this.getData()
                this.setState({ data: [], all: 0, active: 0, completed: 0 })
        }
        showActive = () => {
                this.getData()
                this.setState({ type: 'Active', all: 0, active: 1, completed: 0 })
        }
        showCompleted = () => {
                this.getData()
                this.setState({ type: 'Completed', all: 0, active: 0, completed: 1 })
        }
        showAll = () => {
                this.getData()
                this.setState({ type: 'All', all: 1, active: 0, completed: 0 })
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
                                        <Button style={styles.button} color={this.state.all ? "green" : ""} icon="" mode="contained" onPress={this.showAll}>
                                                All
                                        </Button>
                                        <Button style={styles.button} color={this.state.active ? "green" : ""} icon="" mode="contained" onPress={this.showActive}>
                                                Active
                                        </Button>
                                        <Button style={styles.button} color={this.state.completed ? "green" : ""} icon="" mode="contained" onPress={this.showCompleted}>
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
                                                        return <Listing key={index} name={post.value} id={post._id} isDone={post.isDone} changeState={this.changeState} deleteState={this.deleteState} />
                                                else if (this.state.type === 'Completed' && post.isDone)
                                                        return <Listing key={index} name={post.value} id={post._id} isDone={post.isDone} changeState={this.changeState} deleteState={this.deleteState} />
                                                else if (this.state.type === 'All')
                                                        return <Listing key={index} name={post.value} id={post._id} isDone={post.isDone} changeState={this.changeState} deleteState={this.deleteState} />

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