import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ListView, Switch, ActivityIndicator } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title } from 'native-base';
import {Font, AppLoading} from "expo";
import { DrawerActions } from 'react-navigation';
import {auth, db} from '../agent';

const styles = {
    container : {
        flex: 1,
        margin: 5
    },
    icon: {
        width: 24,
        height: 24,
    },
    menuButton: {
        marginTop: 5
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
}

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Subscriptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            subscriptions: [],
            catalog : [],
            catalogRows: ds.cloneWithRows([]),
            working : false,
            loading: true
        };
        this.sRef = null;
        this.cRef = null; 
        this.renderSubscriptions = this.renderSubscriptions.bind(this);
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 3000);
    }

    componentDidMount() {
        this.sRef = db.ref('subscriptions/' + auth.currentUser.uid).orderByKey();
        this.cRef = db.ref('catalog').orderByKey();
        this.sRef.on('child_added' , s => {
            let sub = s.key;
            let subs = this.state.subscriptions.slice();
            subs.push(sub);
            this.setState({subscriptions : subs});
        })
        this.sRef.on('child_removed' , snap => {
            this.setState(s => ({
                subscriptions : s.subscriptions.filter(v => v != snap.key)
            }));
        })
        this.cRef.on('child_added' , s => {
            let sub = s.key;
            let catalog = this.state.catalog.slice();
            catalog.push(sub);
            let catalogRows = ds.cloneWithRows(catalog);
            this.setState({catalog, catalogRows});
        })
        this.cRef.on('child_removed' , snap => {
            let catalog = this.state.catalog.filter(v => v != snap.key);
            let catalogRows = ds.cloneWithRows(catalog);
            this.setState(s => ({
                catalog : catalog,
                catalogRows: catalogRows
            }));
        })
    }
    
    componentWillUnmount() {
        this.sRef && this.sRef.off();
        this.cRef && this.cRef.off();
        this.sRef = null;
        this.cRef = null;
    }

    static navigationOptions = {
        drawerLabel: 'Subscriptions',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/icons/subscription.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
    };

    openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }

    renderSubscriptions = (rowData) => {
        return (
            <TouchableHighlight>
                <View style={{flexDirection: 'row'}}>
                    <Switch value={this.state.subscriptions.indexOf(rowData) !== -1} onValueChange={this.onPress.bind(this, rowData)} />
                    <Text style={{marginTop: 3, marginLeft: 5}}>{rowData.split(':')[1].replace(/\-/g,' ')}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    onPress = (key) => {
        if (this.state.working) return;
        this.setState({working : true});
        if (this.state.subscriptions.find(v => v == key)) {
            this.unsubscribe(key);
        }
        else {
            this.subscribe(key);
        }
        setTimeout(() => {
            console.log("sub", this.state.subscriptions);
        }, 1000);
    }

    subscribe = (key) => {
        db.ref('subscriptions/' + auth.currentUser.uid + '/' + key)
        .set(true)
        .then(res => {
            this.setState({working : false});
        }).catch(e => {
            alert('Unable to subscribe to the selected category. Please try again');
            this.setState({working : false});
        })
    }
    unsubscribe = (key) => {
        db.ref('subscriptions/' + auth.currentUser.uid + '/' + key)
        .set(null)
        .then(res => {
            this.setState({working : false});
        }).catch(e => {
            alert('Unable to Unsubscribe to the selected category. Please try again');
            this.setState({working : false});
        })
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={[styles.loader, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={this.openDrawer}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Subscriptions</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.container}>
                <ListView
                    dataSource={ this.state.catalogRows }
                    renderRow={ this.renderSubscriptions }
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                />
                </Content>
            </Container>
        )
    }
}

export default Subscriptions;