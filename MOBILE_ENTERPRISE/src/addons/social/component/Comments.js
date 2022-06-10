import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";


export default function Comments(props) {
  let comment = `${props.hot_comment}`;
  const [isLengthComment, setIsLengthComment] = useState(comment.length > 90);
  return (
    <View
      style={{
        displayL: "flex",
        flexDirection: "row",
        marginTop: 10,
        marginBottom:5,
        margin: 20,
      }}
    >
      <Image
        source={{
          uri: `${props.img}`,
        }}
        style={{ width: 20, height: 20, borderRadius: 50 }}
      />

      <View style={{ marginLeft: 5 }}>
        <Text style={{ fontSize: 13 }}>{props.name}</Text>
        <Text style={{ fontSize: 10 ,color:"#E5E5E7"}}>{props.time}</Text>
        <Text>
          {isLengthComment ? comment.substring(0, 90 - 3) + "..." : comment}{" "}
          <TouchableOpacity
            onPress={() => {
              setIsLengthComment(false);
            }}
          >
            <Text style={{ color: "#696969" }}>
              {isLengthComment ? "xem thêm..." : ""}
            </Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity
        //</View>onPress={onPress}
        >
          <Text style={{ color: "#696969", fontSize:12 }}>trả lời</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
