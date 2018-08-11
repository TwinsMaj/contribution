import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, AsyncStorage} from 'react-native';

import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { List, ListItem, SearchBar, Header } from 'react-native-elements';
import _ from 'lodash';

type Props = {};
export default class ContriList extends Component<Props> {

  static navigationOptions = {
    title: 'View Contribution',
  }

  constructor(props) {
    super(props)

    this.state = {
      details: this.props.navigation.state.params.listData,
      data: []
    }
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    fetch(`http://localhost/donation_app/public/api/contribution/id/${this.state.details.user_id}`, {
      headers: {
        'Accept' : 'Application/json',
        'Content-Type' : 'Application/json'
      }
    })

    .then((response) => response.json())
    .then((res) => {
      this.setState({data: res})
    })
  }

  renderHeader = () => {
    return <Header centerComponent={{ text: 'total'}}/>
  }


  render() {
    return (
      <List>
        <FlatList
          data={this.state.data}
          renderItem={( {item} ) => {
            return (<ListItem
              title={ `amount: ${item.amount_contributed}` }
              subtitle={ `transaction_id: ${item.transaction_id}` }
            />)
          }}
          keyExtractor={item => item.transaction_id}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
    );
  }
}



