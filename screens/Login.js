import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { auth } from '../agent';

let API_KEY = 'AIzaSyB_uITgqwoMnmmzZd6PtOxCv4Oni5Qupas';
let APP_UID = 'ollie-369';

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    authenticating: false,
    user: null,
    error: '',
  }

  onPressSignIn() {
    this.setState({
      authenticating: true,
    });

    const { email, password } = this.state;
    auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
            this.setState({
                authenticating: false,
                user,
                error: '',
            })
            console.log('user', auth.currentUser.email);
            AsyncStorage.setItem('curr_email', user.email);
            this.props.navigateApp();
        })
      .catch((err) => {
        console.log("err", err.message, err.stack);
        this.setState({
            authenticating: false,
            user: null,
            error: 'Authentication Failure',
        })
      })
  }

  onPressLogOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          email: '',
          password: '',
          authenticating: false,
          user: null,
        })
      }, error => {
        console.error('Sign Out Error', error);
      });
  }

  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    if (this.state.user !== null) {
      return (
        <View style={styles.form}>
          <Text>Logged In</Text>
          <Button onPress={() => this.onPressLogOut()}>Log Out</Button>
        </View>
      )
    }

    return (
      <View style={styles.form}>
        <Input
          placeholder='Enter your email...'
          label='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          placeholder='Enter your password...'
          label='Password'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button onPress={() => this.onPressSignIn()}>Log In</Button>
        <Button onPress={() => this.props.changeStatus('register')} color="grey">Join Billboard</Button>
        <Text>{this.state.error}</Text>
      </View>
    )

  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentState()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  form: {
    flex: 1
  }
});