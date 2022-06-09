import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

let comment =
  " Mình thấy chuẩn ,quan trọng là nội dung thế nào thôi : ví dụ shop cho mình góp 10 năm với giá vàng hiện tại thì ok nhé .";

export default function Comments(props) {
  const [isLengthComment, setIsLengthComment] = useState(comment.length > 90);
  return (
    <View style={{ flexDirection: "row", marginTop: 5, margin: 20 }}>
      <Image
        source={{
          uri: `${props.img}`,
        }}
        style={{ width: 20, height: 20, borderRadius: 50 }}
      />

      <View style={{ marginLeft: 5 }}>
        <Text style={{ fontSize: 13 }}>{props.name}</Text>
        <Text style={{ fontSize: 10 }}>{props.time}</Text>
        <Text>
          {isLengthComment ? comment.substring(0, 90 - 3) + "..." : comment}{" "}
          <TouchableOpacity
            onPress={() => {
              setIsLengthComment(false);
            }}
          >
            <Text style={{ color: "#696969" }}>
              {isLengthComment ? "xem them" : ""}
            </Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity
        //</View>onPress={onPress}
        >
          <Text>trả lời</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
