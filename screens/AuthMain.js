import React from 'react';
import Login from './Login';
import Register from './Register';

export default class AuthMain extends React.Component {
  state = {
    status: 'login'
  }

  changeStatus = (newStatus) => {
    this.setState({
        status: newStatus
    })
  }

  navigateApp = () => {
    this.props.navigation.navigate('App');
  }

  render() {
      if(this.state.status == 'login') {
          return (
              <Login changeStatus={this.changeStatus} navigateApp={this.navigateApp}/>
          )
      } else if(this.state.status == 'register') {
          return (
            <Register changeStatus={this.changeStatus} />
          )
      }
  }
}