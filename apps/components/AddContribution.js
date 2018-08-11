import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  TextInput, 
  KeyboardAvoidingView, 
  View,
  TouchableOpacity,
  AsyncStorage} from 'react-native';

import { StackNavigator } from 'react-navigation';

type Props = {};
export default class AddContribution extends Component<Props> {

  static navigationOptions = {
    title: 'Add Contribution'
  }

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.navigation.state.params.listData,
      amount: ''
    }

  }

  add = () => {
    
    fetch('http://localhost/donation_app/public/api/contribution/new', {
      method: 'POST',
      headers: {
        'Accept' : 'Application/json',
        'Content-Type' : 'Application/json'
      },
      body: JSON.stringify({
        amount: this.state.amount,
        user_id: this.state.data.user_id
      })
    })

    .then((response) => response.json())
    .then((res) => {
      alert(res.msg)
    })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

        <View style={styles.container}>

          <Text style={styles.header}>- Add Contribution -</Text>

          <TextInput
              style={styles.textInput}
              defaultValue={this.state.data.fullname}
          />

          <TextInput
              style={styles.textInput} placeholder='Amount'
              onChangeText={ (amount) => this.setState({amount})}
          />

          <TouchableOpacity 
            style={styles.btn}
            onPress={this.add}>
            <Text>add</Text>
          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2896d3',
    paddingLeft: 40,
    paddingRight: 40,
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  user: {
    color: '#fff',
    fontSize: 14,
    paddingTop: 20,
    textDecorationLine: 'underline'
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#01c853',
    padding: 20,
    alignItems: 'center'
  }
})


