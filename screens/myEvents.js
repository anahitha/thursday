import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/header';
import {SafeAreaView,SafeAreaProvider} from 'react-native-safe-area-context';

export default class MyUpcomingEvents extends React.Component {
    constructor(){
        super();
        this.state = {
            eventList: [],
            userId: firebase.auth().currentUser.email,
            eventId: []
        }
        this.eventref = null;
        this.eventref2 = null;
    }
    getMyEvents = async()=>{
        var eventId = null;
        this.eventref = await db.collection("participants").where('participant', '==', this.state.userId).onSnapshot((snapshot)=>{
            var list = snapshot.docs.map((doc)=>doc.data());
            //var myList = list.json();
            console.log(list);
            if (list.length>0){
            for (var i = 0; i>= list.length; i++) {
                eventId = list[i].eventId;
                console.log(list[0].eventId, eventId);
                this.setState({
                    eventId: [...this.state.eventId, eventId]
                })
            };
            for (var i = 0; i>= this.state.eventId.length; i++){
            this.getMyEvents2(this.state.eventId[i]);
            }
        }
        console.log(eventId);})    
        console.log("I'm here");
    }
    getMyEvents2 = async(eventId)=>{
        this.eventref2 = await db.collection("invites").where('ID', '==', eventId).onSnapshot((snapshot)=>{
            var requestList = snapshot.docs.map((doc)=>doc.data())    
            this.setState({
                eventList: requestList
            })
            console.log(requestList)
        })
    }
    
    async componentDidMount(){
        await this.getMyEvents();
    }
    componentWillUnmount(){
        this.eventref = null;
        this.eventref2 = null;
    }
    keyExtractor = (item, index)=>index.toString();
    renderItem= ({item, I})=>{
        return(
            <ListItem >
                <ListItem.Content onPress = {()=>{
                this.props.navigation.navigate("EventDetails",{"details": item})
            }}>
                    <ListItem.Title>{item.invite}</ListItem.Title>
                    <ListItem.Subtitle>{item.time}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            )}
        render(){
        return(
            <SafeAreaProvider style={{ flex: 1 }}>
            <View style = {{flex: 1}}>
                <MyHeader title = "My Upcoming Events" navigation = {this.props.navigation}></MyHeader>
                <View style = {{flex: 1}}>
                    {this.state.eventList.length == 0?(
                        <View style = {{flex: 1}}>
                            <Text style = {{fontSize: 20}}>Events</Text>
                        </View>
                    ):(
                        <FlatList keyExtractor = {this.keyExtractor} 
                        data = {this.state.eventList}
                        renderItem = {this.renderItem}></FlatList>
                    )}
                </View>
            </View>
            </SafeAreaProvider>
        )
    }
}



const styles = StyleSheet.create({
    keyView: {
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    }, 
    button: {
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    },
    input: {
        width: '75%',
        height: 30,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a65',
        fontSize: 12,
        marginTop: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center'
    },
    buttonText:{
        color: 'black',
        fontSize: 20
    }
})