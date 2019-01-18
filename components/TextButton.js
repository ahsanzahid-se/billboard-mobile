import React, { Component } from 'react';
import {View} from 'react-native';
import { Button, Text } from 'native-base';
export default class TextButton extends Component {
  render() {
    return (
      <View>
            <Button hasText transparent>
                <Text>{this.props.children}</Text>
            </Button>
        </View>
    );
  }
}

const styles = {
    text: {
        color: 'blue'
    }
}