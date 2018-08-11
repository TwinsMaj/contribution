import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, AsyncStorage} from 'react-native';

import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { List, ListItem, SearchBar } from 'react-native-elements';
import _ from 'lodash';

type Props = {};
export default class UserList extends Component<Props> {

  static navigationOptions = {
    title: 'Add Contribution',
  }

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      fulldata: []
    }

    this.getListItemData = this.getListItemData.bind(this);
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    fetch('http://localhost/donation_app/public/api/user', {
      headers: {
        'Accept' : 'Application/json',
        'Content-Type' : 'Application/json'
      }
    })

    .then((response) => response.json())
    .then((res) => {
      this.setState({data: res, fulldata: res})
    })
  }

  handleSearch = (text) => {
    console.log(text)
    const formatQuery = text.toLowerCase();

    const data = _.filter(this.state.fulldata, user => {
      console.log(user.fullname)
      if(user.fullname.includes(text)) return true
    })


    this.setState({data}, ()=> this.makeRemoteRequest);

  }
  renderHeader = () => {
    return <SearchBar placeholder="find by user id" lightTheme round onChangeText={this.handleSearch}/>
  }

  getListItemData = (val) => {
    console.log('he...')
    this.props.navigation.navigate('AddContrib', {listData: val})
  }

  render() {
    return (
      <List>
        <FlatList
          data={this.state.data}
          renderItem={( {item} ) => {
            return (<ListItem
              title={item.fullname}
              onPress={() => { console.log('...'); this.getListItemData(item) }}
            />)
          }}
          keyExtractor={item => item.email}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
    );
  }
}



