import * as React from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Image } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import firebase from 'firebase';
import db from '../config';

export default class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            address: '',
            firstName: '',
            lastName: '',
            contact: '',
            confirmPassword: '',
            isModalVisible: false
        }
    }
    login = (email, password)=>{
        /*firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
            this.props.navigation.navigate('Home')
        })
        .catch((error)=>{
            var errorcode = error.code;
            var errorM = error.message
            return alert(errorM)
        })*/
        this.props.navigation.navigate('Home')
    }
    
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.profileContainer}>
                    <View style = {{flex: 0.85, justifyContent: 'center', alignItems: 'center', padding: RFValue(10)}}>
                        <Image source = {require('../assets/playdate.png')} style = {{width: 200, height: 200, resizeMode: "stretch"}}></Image>
                    </View>
                    </View>
                <View style = {styles.profileContainer}>
                    <TextInput style = {styles.loginBox} 
                    placeholder = "example@gmail.com" 
                    placeholderTextColor = "grey"
                    keyboardType = 'email-address'
                    onChangeText = {(text)=>{
                        this.setState({
                            email: text
                        })
                    }}></TextInput>
                    <TextInput style = {styles.loginBox} 
                    placeholder = "password" 
                    placeholderTextColor = "grey"
                    secureTextEntry = {true}
                    onChangeText = {(text)=>{
                        this.setState({
                            password: text
                        })
                    }}></TextInput>
                    <TouchableOpacity style = {[styles.button, {marginBottom: 20, marginTop: 20}]}
                    onPress = {()=>{this.login(this.state.email, this.state.password)}}>
                        <Text style = {styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {[styles.button, {marginBottom: 20, marginTop: 20}]}
                    onPress = {()=>{this.props.navigation.navigate('SignUp')}}>
                        <Text style = {styles.buttonText}>Signup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 45,
        paddingBottom: 40,
        color: 'blue',

    },
    loginBox: {
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: 'grey',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16
    },
    buttonText:{
        color: 'white',   
        fontSize: 20
    },
    button2Text:{
        color: '#ff5722',   
        fontSize: 20
    },
    keyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modaltitle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        color:'#ff5722',
        margin: 50
    },
    modalcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'teal',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 80,
        marginBottom: 80
    },
    textinput: {
        width: '75%',
        height: 30,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a65',
        fontSize: 10,
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10
    },
    register: {
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
    },
    cancel: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 30,
        marginTop: 5
    }
})