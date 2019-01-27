import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, color, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} style={(color == 'grey') ? styles.buttonGrey : styles.button}>
      <Text style={styles.text} disabled={disabled}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 20,
    width: '100%',
    backgroundColor: '#00aeef',
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonGrey: {
    marginTop: 10,
    padding: 20,
    width: '100%',
    backgroundColor: 'grey',
    borderRadius: 4,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  }
});

export default Button;