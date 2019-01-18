import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Title } from 'native-base';
import {Font, AppLoading} from "expo";
import { DrawerActions } from 'react-navigation';
import {db, auth} from '../agent';
import _ from 'lodash';
import moment from 'moment-mini';
import WallpaperManager from 'react-native-wallpaper-manager';
import CardImage from '../components/CardImage';
import Toast from 'react-native-easy-toast';

const styles = {
    container : {
        flex: 1,
        margin: 10
    },
    icon: {
        width: 24,
        height: 24,
    },
    menuButton: {
        marginTop: 5
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    error: {
        justifyContent: 'center',
        color: 'red'
    }
}

class ActiveWallpaper extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
        this.triggerWallpaperChange = this.triggerWallpaperChange.bind(this);
    }

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.triggerWallpaperChange()
    }

    changeWallpaper(image) {
        let url = '';
        if(image.images.uhd) {
            url = image.images.uhd;
        } else if(image.images.qhd) {
            url = image.images.qhd;
        } else {
            url = image.images.hd;
        }
        WallpaperManager.setWallpaper({uri: url}, (res)=> this.refs.toast.show('Wallpaper changed successfully.'));
    }

    triggerWallpaperChange() {
        db.ref('subscriptions/' + auth.currentUser.uid).once('value').then(s => {
            let subs = Object.keys(s.val());
            if (!subs.length) return;
            if (subs.length === 1) return subs[0]
            return subs[Math.floor(Math.random() * subs.length)]
        }).then(key => {
            if (!key) return;
            return db.ref('billboard/' + key).once('value')
        }).then(snap => {
            let data = snap.val();
            if(data && data.length) {
                let idArr = data.map((val, index) => index);
                if (!data) return;
                let randomImage = idArr[Math.floor(Math.random() * data.length)];
                let flag = false;
                while(flag == false) {
                    if(data[randomImage].views < data[randomImage].max_views) {
                        flag = true;
                    } else {
                        randomImage = idArr[Math.floor(Math.random() * data.length)];
                    }
                }
                // this.changeWallpaper(data[randomImage]);
                this.setState({
                    wallpaper: data[randomImage],
                    loading: false
                });
            } else {
                let image = null;
                db.ref('billboard').once('value').then((s) => {
                    let val = s.val();
                    _.map(val, (images, cat) => {
                        let keys = Object.keys(images);
                        if(keys.length) {
                            image = images[keys[0]];
                        }
                    })
                    console.log('image', image);
                    // this.changeWallpaper(image);
                    this.setState({
                        wallpaper: image,
                        loading: false
                    });
                })
            }
        }).catch(e => {
            console.log('Unable to change walpaper.', e.message, e.stack);
        })
    }

    static navigationOptions = {
        drawerLabel: 'Active Wallpaper',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('../assets/icons/wallpaper.png')}
            style={[styles.icon, {tintColor: tintColor}]}
          />
        ),
    };

    openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }

    render() {
        if (this.state.loading) {
            return (
                <View style={[styles.loader, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
            )
        } else if(!this.state.wallpaper) {
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
                    <Content contentContainerStyle={styles.container}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.error}>Billboard is empty!</Text>
                        </View>
                    </Content>
                </Container>
            )
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Active Wallpaper</Title>
                    </Body>
                </Header>
                <Content contentContainerStyle={styles.container}>
                    <CardImage image={this.state.wallpaper} />
                </Content>
                <Toast ref="toast"/>
            </Container>
        )
    }
}

export default ActiveWallpaper;