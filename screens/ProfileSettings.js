import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon, Container, Header, Content, Left, Body, Title, Button } from 'native-base';
import { DrawerActions } from 'react-navigation';

const styles = {
    container : {
        flex: 1
    },
    button: {
        marginTop: 10,
        padding: 20,
        width: '100%',
        backgroundColor: '#00aeef',
        borderRadius: 4,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
    },
    buttonContainer: {
        margin: 10
    },
    icon: {
        width: 24,
        height: 24,
    },
    menuButton: {
        marginTop: 5
    }
}

class ProfileSettings extends React.Component {
    constructor(props) {
        super(props);
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
    openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.openDrawer}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.buttonContainer}>
                <Text>Profile Settings</Text>
                <Button style={styles.button}>
                    <Text style={styles.text}>Change Password</Text>
                </Button>
                <Button style={styles.button}>
                    <Text style={styles.text}>Delete Account</Text>
                </Button>
                </Content>
            </Container>
        )
    }
}

export default ProfileSettings;