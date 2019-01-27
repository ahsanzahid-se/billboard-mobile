import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Button from '../components/Button';
import { auth } from '../agent';

const styles = {
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
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    blueText: {
        color: 'blue'
    }
}

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clock: 60,
            disabled: true
        }
        this.openDrawer = this.openDrawer.bind(this);
    }

    static navigationOptions = {
        drawerLabel: 'Profile Settings',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/icons/profile.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
    };

    componentWillMount() {
        this.handle = setInterval( () => {
            if (this.state.clock === 0) return;
            this.setState(s => ({
                clock : s.clock - 1 
            }));
        }, 1000);
    }

    resend = () => {
        if(!this.state.disable) {
            const {clock} = this.state;
            if (clock > 0) return;
            let user = auth.currentUser;
            user && user.sendEmailVerification().then(res => {
                this.setState({clock : 60});
            }).catch(e => {
                this.setState({clock : 0});
            });
        }
    }

    openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }

    backToLogin = () => {
        this.props.changeStatus('login');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text>Verify your email</Text>
                    <Text>An email with a verification link was sent to {this.props.email}. You will be required to reauthenticate afterwards.</Text>
                    <Button disabled={this.state.disabled} onPress={this.resend.bind(this)}>Resend Email in {this.state.clock}</Button>
                    <Text style={styles.blueText} onPress={this.backToLogin.bind(this)}>Reauthenticate Now</Text>
                </View>
            </View>
        )
    }
}

export default ProfileSettings;