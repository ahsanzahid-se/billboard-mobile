import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import {Item, DatePicker, Label, Picker} from 'native-base';
import Input from '../components/Input';
import Button from '../components/Button';
import TextButton from '../components/TextButton';
import { auth, db, TIMESTAMP } from '../agent';

let API_KEY = 'AIzaSyB_uITgqwoMnmmzZd6PtOxCv4Oni5Qupas';
let APP_UID = 'ollie-369';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            address: '',
            gender: 'male',
            dob: new Date(2000, 1, 1),
            authenticating: false,
            user: null,
            error: '',
        }
    }
  

    register = () => {
        console.log("register");
        const {working, name, email, password, address, dob, gender} = this.state;
        if (working) return;
        this.setState({working: true, error : null});
        auth.createUserWithEmailAndPassword(email,password).then(res => {
            let user = auth.currentUser;
            return user.sendEmailVerification();
        }).then(res => {
            console.log('[verification]',res);
            return db.ref('users/' + auth.currentUser.uid).set({
                displayName : name,
                address,
                dob,
                gender,
                role : 'client',
                email : auth.currentUser.email
            })
        }).then(res => {
            console.log("status");
            this.props.changeStatus('login');
        }).catch(e => {
            console.log(e.message);
            this.setState({
                working : false,
                error : e.message.split('.')[0]
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

  onGenderChange(value) {
    this.setState({
      gender: value
    });
  }

  setDate(newDate) {
    this.setState({ dob: newDate });
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
            placeholder='Enter your name...'
            label='Name'
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
        />
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
        <Input
          placeholder='Enter your address...'
          label='Address'
          onChangeText={address => this.setState({ address })}
          value={this.state.address}
        />
        <Item stackedLabel>
            <Label>Username</Label>
            <Picker
              note
              mode="dropdown"
              style={{ width: '100%' }}
              selectedValue={this.state.gender}
              onValueChange={this.onGenderChange.bind(this)}
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
        </Item>

        <Item stackedLabel>
            <Label>Date of Birth</Label>
            <DatePicker
                defaultDate={new Date(2000, 1, 1)}
                minimumDate={new Date(1960, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate.bind(this)}
                disabled={false}
            />
        </Item>
        
        <Button onPress={() => this.register.bind(this)}>Register</Button>
        <Text style={styles.blueText} onPress={() => this.props.changeStatus('login')}>Already a member? Sign in</Text>
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
  },
  blueText: {
      color: 'blue'
  }
});