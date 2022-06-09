/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

export default function IconPost(props) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
      <Ionicons
        color={"red"}
        style={{
          color: "#dc143c",
          marginLeft: 30,
          paddingBottom: 0,
          boder: 2,
        }}
        size={25}
        name={true ? "heart" : "heart-outline"}
      />

      <Text
        style={{
          marginBottom: 5,
        }}
      >
        320
      </Text>

      <Ionicons
        color={"red"}
        style={{
          color: "#00A48D",
          marginLeft: 30,
          paddingBottom: 0,
          boder: 2,
          // color: focused ? "#00A48D" : "#828282",
        }}
        size={25}
        name={"chatbox-ellipses-outline"}
      />

      <Text
        style={{
          marginBottom: 5,
        }}
      >
        100
      </Text>
    </View>
  );
}
