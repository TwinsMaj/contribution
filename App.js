import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { 
  StackNavigator, 
  DrawerNavigator, 
  SwitchNavigator } from 'react-navigation';

import Login from './apps/components/Login';
import UserLogin from './apps/components/UserLogin';
import UserSignup from './apps/components/UserSignup';
import UserList from './apps/components/UserList';
import AddContribution from './apps/components/AddContribution';
import ContriList from './apps/components/ContriList';
import UserContributions from './apps/components/UserContributions';

const AdminMenu = DrawerNavigator( 
  {
    First:{
      path: '/',
      screen: UserList
    },
    Second: {
      path: '/second',
      screen: ContriList
    }
  },
  {
    initialRouteName: 'First',
    drawerPosition: 'left'
  }
)

const AdminApp = StackNavigator({
  Menu: AdminMenu,
  AddContrib: {
    screen: AddContribution
  },
  UserContrib: {
    screen: UserContributions
  }
})

const UserAuthNavigation = StackNavigator({
  User: {
    screen: UserLogin
  },
  Signup: {
    screen: UserSignup
  },
})

const AppNavigator = SwitchNavigator({
  Home: { 
    screen: Login, 
    navigationOptions: {
      header: false
    }
  },
  UserAuthScreens: UserAuthNavigation,
  AdminHome: AdminApp
})

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppNavigator />
    );
  }
}


