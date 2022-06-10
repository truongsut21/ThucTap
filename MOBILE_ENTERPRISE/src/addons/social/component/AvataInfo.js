/* eslint-disable prettier/prettier */
import React from "react";
import { View, Image, Text } from "react-native";

export default function AvataInfo(props) {
  return (
    <View style={{display:'flex', flexDirection: "row" }}>
      <Image
        source={{
          uri: `${props.img}`,
        }}
        style={{ width: 30, height: 30, borderRadius: 50 }}
      />

      <View style={{ marginLeft: 5 }}>
        <Text>{props.name}</Text>
        <Text style={{ color:"#E5E5E7", fontSize:12 }}>{props.time}</Text>
      </View>
    </View>
  );
}
