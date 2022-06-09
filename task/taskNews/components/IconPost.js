/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, Text} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function IconPost(props) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
      <Feather
        name="menu"
        size={30}
        style={{
          color: '#bb3',
          marginLeft: 30,
          paddingBottom: 0,
        }}
      />

      <Text
        style={{
          marginBottom: 5,
        }}>
        320
      </Text>

      <Feather
        name="menu"
        size={30}
        style={{
          color: '#bb3',
          marginLeft: 30,
        }}
      />

      <Text
        style={{
          marginBottom: 5,
        }}>
        100
      </Text>
    </View>
  );
}
