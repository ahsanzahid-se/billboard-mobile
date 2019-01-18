import React from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title } from 'native-base';
import { auth } from '../agent';

const styles = {
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 24,
        height: 24,
    },
    menuButton: {
        marginTop: 5
    }
}

class SignOut extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Sign Out',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/icons/signout.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
    };

    componentWillMount() {
        auth.signOut();
        AsyncStorage.clear();
        this.props.navigation.navigate('AuthLoading');
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.container}>
                    <Text>Signing out...</Text>
                </Content>
            </Container>
        )
    }
}

export default SignOut;