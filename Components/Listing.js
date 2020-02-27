import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { List,Checkbox, Button } from 'react-native-paper';

export default class Listing extends Component {
        constructor(props){
                super(props);
                this.state={
                        val:''
                }
        }

        render() {
                return (
                        <View>
                                        <List.Item titleStyle={this.props.isDone ? {textDecorationLine:'line-through' } : {}} titleNumberOfLines={5}
                                                
                                                title={this.props.name}
                                                left={props => <Checkbox style={{color:"blue"}}
                                                        status={this.props.isDone ? "checked" : "unchecked"}
                                                        onPress={() => this.props.changeState(this.props)}
                                                />
                                                }
                                                right={props => 
                                                        <Button style={{backgroundColor:"red" ,width:5,height:30, justifyContent:"center"}} icon="delete" mode="contained" onPress={() => this.props.deleteState(this.props)}>
                                                        </Button>        
                                                
                                                }
                                                
                                        />
                                
                        </View>
                )
        }
}
