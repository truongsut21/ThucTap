/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Content(props) {
  let content = `${props.content}`;
  const [isLengthContent, setIsLengthContent] = useState(content.length > 170);

  return (
    <View>
      <Text>
        {isLengthContent ? content.substring(0, 170 - 3) + "..." : content}{" "}
        <TouchableOpacity
          onPress={() => {
            setIsLengthContent(false);
          }}
        >
          <Text style={{ color: "#696969" }}>
            {isLengthContent ? "xem thêm..." : ""}
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}
