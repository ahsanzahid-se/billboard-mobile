import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import moment from 'moment-mini';
export default class CardImage extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://cdn2.iconfinder.com/data/icons/rafif-rounded-flat-vol-2/512/picture-512.png'}} />
                <Body>
                  <Text>Active Wallpaper</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: this.props.image.images.hd}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="md-watch" />
                  <Text>{this.props.image.views} Views</Text>
                </Button>
              </Left>
              <Right>
                <Text>{moment(this.props.image.datetime).format('lll')}</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}