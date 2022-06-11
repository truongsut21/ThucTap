/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function IconPost(props) {
  return (
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}
    >
      <Ionicons
        color={"red"}
        style={{
          color: "#dc143c",
          marginLeft: 10,
          paddingBottom: 0,
      
        }}
        size={25}
        name={true ? "heart" : "heart-outline"}
      />

      <Text
        style={{
          marginBottom: 5,
        }}
      >
        {props.like_count}
      </Text>

      <Ionicons
        color={"red"}
        style={{
          color: "#00A48D",
          marginLeft: 10,
          paddingBottom: 0,
       
        }}
        size={25}
        name={"chatbox-ellipses-outline"}
      />

      <Text
        style={{
          marginBottom: 5,
        }}
      >
        {props.comment_count}
      </Text>
    </View>
  );
}
