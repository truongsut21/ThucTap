/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Image, Text} from 'react-native';

export default function AvataInfo(props) {
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={{
          uri: `${props.img}`,
        }}
        style={{width: 30, height: 30}}
      />

      <View style={{marginLeft: 5}}>
        <Text>{props.name}</Text>
        <Text>{props.time}</Text>
      </View>
    </View>
  );
}
