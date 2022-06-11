import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Comments(props) {
  let comment = `${props.hot_comment}`;
  const [isLengthComment, setIsLengthComment] = useState(comment.length > 80);
  return (
    <View
      style={{
        displayL: "flex",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 5,
        margin: 20,
        // backgroundColor:"red"
      }}
    >
      <Image
        source={{
          uri: `${props.img}`,
        }}
        style={{ width: 20, height: 20, borderRadius: 50 }}
      />

      <View style={{ marginLeft: 5 }}>
        <Text style={{ fontSize: 12 }}>{props.name}</Text>
        <Text
          style={{
            fontSize: 10,
            color: "#E5E5E7",
            position: "relative",
            bottom: 5,
          }}
        >
          {props.time}
        </Text>
        <Text
          style={{
            marginRight: 20,
            display: "flex",
            // backgroundColor: "red",
            position: "relative",
            bottom: 7,
          }}
        >
          {isLengthComment ? comment.substring(0, 80 - 3) : comment}{" "}
          <TouchableOpacity
            onPress={() => {
              setIsLengthComment(false);
            }}
          >
            <Text style={{ color: "#696969", position: "relative", top: 5 }}>
              {isLengthComment ? "xem thêm..." : ""}
            </Text>
          </TouchableOpacity>
        </Text>
        <View style={{ flexDirection: "row" }}>
          {/* <Ionicons
            name="happy-outline"
            size={17}
            style={{
              color: "#696969",
            }}
          /> */}

          <TouchableOpacity
          //onPress={onPress}
          >
            <Text style={{ color: "#696969", fontSize: 12, marginLeft: 10 }}>
              Thích
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          //onPress={onPress}
          >
            <Text style={{ color: "#696969", fontSize: 12, marginLeft: 10 }}>
              trả lời
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
