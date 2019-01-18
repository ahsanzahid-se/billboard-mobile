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
                <Thumbnail source={{uri: 'https://cdn2.iconfinder.com/data/icons/social-productivity-line-art-2/128/photo-512.png'}} />
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
                  <Icon active name="views" />
                  <Text>{this.props.image.view} Views</Text>
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