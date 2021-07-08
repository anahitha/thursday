import React from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image} from 'react-native';
import {ListItem} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default class NotificationScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            allNotifications: [],
            Notifications: [],
            userId: firebase.auth().currentUser.email,
            inviteList: '',
            docID: ''
        }
        this.requestref = null;
        this.inviteref = null; 
    }
    getNotifications=()=>{
        this.requestRef = db.collection("notifications")
        .where("notificationStatus", "==", "unread")
        .where("targetUserId",'==',this.state.userId)
        .onSnapshot((snapshot)=>{
          var allNotifications =  []
          snapshot.docs.map((doc) =>{
            var notification = doc.data()
            notification["doc_id"] = doc.id
            allNotifications.push(notification)
          });
          this.setState({
              allNotifications : allNotifications
          });
        })
      }

    getNotificationDetails = async(ID)=>{
        console.log(ID);
        await db.collection('invites').where("ID", "==", ID).get().then(snapshot=>{            
            snapshot.forEach(doc=>{                
                var data = doc.data();
                console.log(data);
                this.setState({
                    inviteList: doc.data()
                })      
            }        
        )})
        console.log(this.state.inviteList);
        console.log("printing inviteList");
        this.props.navigation.navigate("EventDetails",{"details": this.state.inviteList})
    }

    
    markAsRead=(id)=>{
        db.collection('notifications').where('notificationId', '==', id).get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection("notifications").doc(doc.id).update({
              notificationStatus: 'read',
            });
          });
    }
        )}
    
      componentDidMount(){
        this.getNotifications();
      }
    
      componentWillUnmount(){
        this.notificationRef = null;
        this.inviteref = null;
        console.log("I am not here");
      }
    
    keyExtractor = (item, index)=>index.toString();
    renderItem= ({item, I})=>{
        return(
            <ListItem >
                <ListItem.Content >
                    <ListItem.Title>{item.event}</ListItem.Title>
                    <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
                    <View>
                        <TouchableOpacity style = {styles.button} onPress = {()=>{
                    this.markAsRead(item.notificationId);
                    this.getNotificationDetails(item.eventId);
            }}>
                            <Text> View </Text>
                        </TouchableOpacity>
                    </View>
                </ListItem.Content>
            </ListItem>
            )}

        render(){
        return(
            <SafeAreaProvider style = {{flex: 1}}>
                <MyHeader title = "Notification" navigation = {this.props.navigation}></MyHeader>
                <View style = {{flex: 1}}>
                    {this.state.allNotifications.length == 0?(
                        <View style = {{flex: 1}}>
                            <Text style = {{fontSize: 20}}>Notifications</Text>
                        </View>
                    ):(
                        <FlatList keyExtractor = {this.keyExtractor} 
                        data = {this.state.allNotifications}
                        renderItem = {this.renderItem}></FlatList>
                    )}
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