import React from 'react';
import Login from './Login';
import Register from './Register';
import Verification from './Verification';

export default class AuthMain extends React.Component {
  state = {
    status: 'login',
    email: ''
  }

  changeStatus = (newStatus) => {
    this.setState({
        status: newStatus
    })
  }

  navigateApp = () => {
    this.props.navigation.navigate('App');
  }

  changeEmail = (email) => {
    this.setState({
      email
    })
  }

  render() {
      if(this.state.status == 'login') {
          return (
              <Login changeStatus={this.changeStatus} navigateApp={this.navigateApp}/>
          )
      } else if(this.state.status == 'register') {
          return (
            <Register changeEmail={this.changeEmail.bind(this)} changeStatus={this.changeStatus} />
          )
      } else if(this.state.status == 'verification') {
        return (
          <Verification changeStatus={this.changeStatus} email={this.state.email} />
        )
      }
  }
}