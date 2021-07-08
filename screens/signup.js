import * as React from 'react';
import {View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Image } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import firebase from 'firebase';
import db from '../config';
import { useState, useEffect } from 'react';


export default class SignUp extends React.Component{
    constructor(){
    super();
    this.state = {
        email: '',
        password: '',
        address: '',
        firstName: '',
        lastName: '',
        contact: '',
        pcontact: '',
        pemail: '',
        confirmPassword: '',
        width: 0,
        height: 0
    }
    }
    signUp = (email, password, confirmPassword)=>{
        if(password != confirmPassword){
            return Alert.alert("Passwords don't match")
        }else{
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{
                db.collection('users').add({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    contact: this.state.contact,
                    email: this.state.email,
                    address: this.state.address,
                    pEmail: this.state.pemail,
                    pContact: this.state.pcontact
                })
                return Alert.alert('User addded successfully', '', [{text: 'Okay', onPress: ()=>
                    this.props.navigation.navigate('Welcome')}])
            }) 
            .catch((error)=>{
                var errorcode = error.code;
                var errorM = error.message
                return alert(errorM)
            })
        }
    }
    render(){
    return (
        <View style = {{flex: 0.85, justifyContent: 'center', alignItems: 'center', padding: RFValue(10)}}>
            <ScrollView style = {{width: '100%'}}>
            <KeyboardAvoidingView >
                <Text style = {styles.modaltitle}>Registration</Text>
                <TextInput style = {styles.textinput} placeholder = {"first name"}
                maxLength = {11} onChangeText = {(text)=>{
                    this.setState({
                        firstName: text
                    })
                }}>
                </TextInput>
                <TextInput style = {styles.textinput} placeholder = {"last name"}
                maxLength = {15} onChangeText = {(text)=>{
                    this.setState({
                        lastName: text
                    })
                }}>
                </TextInput>
                <TextInput style = {styles.textinput} placeholder = {"address"}
                multiline = {true} onChangeText = {(text)=>{
                    this.setState({
                        address: text
                    })
                }}>
                </TextInput>
                <TextInput style = {styles.textinput} placeholder = {"contact"}
                maxLength = {10} keyboardType= {'numeric'} onChangeText = {(text)=>{
                    this.setState({
                        contact: text
                    })
                }}>
                </TextInput>
                <TextInput style = {styles.textinput} placeholder = {'email'}
                keyboardType = {'email-address'} onChangeText = {(text)=>{
                    this.setState({
                        email: text
                    })
                }}>
                </TextInput>
                <TextInput style = {styles.textinput} placeholder = {"parent's contact"}
                maxLength = {10} keyboardType= {'numeric'} onChangeText = {(text)=>{
                    this.setState({
                        pcontact: text
                    })
                }}>
                </TextInput>
                <TextInput style = {styles.textinput} placeholder = {"parent's email"}
                keyboardType = {'email-address'} onChangeText = {(text)=>{
                    this.setState({
                        pemail: text
                    })
                }}>
                </TextInput>
                
                <TextInput style = {styles.textinput} placeholder = {"password"}
                secureTextEntry = {true} onChangeText = {(text)=>{
                    this.setState({
                        password: text
                    })
                }}>
                </TextInput>
                <TextInput style = {styles.textinput} placeholder = {"confirm password"}
                secureTextEntry = {true} onChangeText = {(text)=>{
                    this.setState({
                        confirmPassword: text
                    })
                }}>
                </TextInput>
                <View>
                    <TouchableOpacity style = {styles.button} onPress = {()=>{
                        this.signUp(this.state.email, this.state.password, this.state.confirmPassword)
                        this.props.navigation.navigate('Welcome')
                    }}>
                        <Text style = {styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style = {styles.button} onPress = {()=>this.props.navigation.navigate('Welcome')}>
                        <Text style = {styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            </ScrollView>
            </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    modaltitle: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 30,
        color:'orange',
        margin: 25
    },
    button: {
        width: '15%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        marginBottom: 10, 
        marginTop: 10
    },
    buttonText:{
        color: 'white',   
        fontSize: 18
    },
    modalcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'orange',
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
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10
    },
    cancel: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 30,
        marginTop: 5
    }
})