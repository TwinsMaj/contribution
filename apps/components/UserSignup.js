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
export default class UserSignup extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      username: '',
      password: '',
    }

  }

  componentsDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if(value !== null) {
      this.props
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

        <View style={styles.container}>

          <Text style={styles.header}>- USER SIGNUP -</Text>

          <TextInput
              style={styles.textInput} placeholder='Fullname'
              onChangeText={ (fullname) => this.setState({fullname})}
          />

          <TextInput
              style={styles.textInput} placeholder='Email'
              onChangeText={ (username) => this.setState({username})}
          />

          <TextInput
              secureTextEntry={true}
              style={styles.textInput} placeholder='Password'
              onChangeText={ (password) => this.setState({password})}
          />

          <TouchableOpacity 
            style={styles.btn}
            onPress={this.signup}>
            <Text>Signup</Text>
          </TouchableOpacity>

          <Text 
            onPress={this.goToUserSignin}
            style={styles.user}>Have an account? Signin</Text>

        </View>

      </KeyboardAvoidingView>
    );
  }

  signup = () => {
    
    fetch('http://localhost/donation_app/public/api/admin/add', {
      method: 'POST',
      headers: {
        'Accept' : 'Application/json',
        'Content-Type' : 'Application/json'
      },
      body: JSON.stringify({
        fullname: this.state.fullname,
        email: this.state.username,
        password: this.state.password
      })
    })

    .then((response) => response.json())
    .then((res) => {
      this.props.navigation.navigate('User')
    }).catch(err => alert(err))
  }

  goToUserSignin = () => {
    this.props.navigation.navigate('User')
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


