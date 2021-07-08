import * as React from 'react';
import {Image } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../screens/home';
import MyUpcomingEvents from '../screens/myEvents';
import NotificationScreen from '../screens/notifications';
import Settings from '../screens/update'

export const AppTabNavigator = createBottomTabNavigator({
    Home : { screen: HomeScreen,
    navigationOptions: {
        tabBarIcon: 
        <Image source= {require("../assets/home.png")}
        style = {{
          width: 30,
          height:30
        }}></Image>,
        tabBarLabel: "Home"
    }},
    Notifications: { screen: NotificationScreen,
        navigationOptions: {
            tabBarIcon: 
            <Image source= {require("../assets/notification.png")}
            style = {{
                width: 30,
                height:30
            }}></Image>,
            tabBarLabel: "Notifications"
        }},
    UpcomingEvents: { screen: MyUpcomingEvents,
        navigationOptions: {
            tabBarIcon: 
            <Image source= {require("../assets/upcoming.png")}
            style = {{
                width: 30,
                height:30
            }}></Image>,
            tabBarLabel: "My Events"
    }},
    Profile: { screen: Settings,
        navigationOptions: {
            tabBarIcon: 
            <Image source= {require("../assets/profile.png")}
            style = {{
              width: 30,
              height:30
            }}></Image>,
            tabBarLabel: "Settings"
    }}
  });
