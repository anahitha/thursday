import * as React from 'react';
import { render } from 'react-dom';
import {Alert, View, Text} from 'react-native';
import {Header, Icon, Badge} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import { TouchableOpacity, StyleSheet } from 'react-native';

export default class MyHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            user: firebase.auth().currentUser.email
        }
    }
  render(){ 
    return(
        <Header 
        leftComponent = {<Icon name = 'arrow-left' type= 'feather' color = '#696969' onPress= {()=>this.props.navigation.goBack()}></Icon>}
        centerComponent = {{text: this.props.title}} style= {{
            color: '#ffffff',
            fontSize: 45,
            fontWeight: "bold"}}
        backgroundColor = 'orange'></Header>
    )
}
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'orange',
      }
})