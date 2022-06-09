/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

let content =
  " Tuyển dụng frontend Đến học công nghệ mới và kiếm thêm thu nhập thêm một nguồn nhập kiếm thêm thu nhập. Tuyển dụng nhân viên kế hoạch sản xuất, vận Tuyển dụng frontend Đến học công nghệ mới và kiếm thêm thu nhập thêm một nguồn nhập kiếm thêm thu nhập. Tuyển dụng nhân viên kế hoạ ch sản xuất, vận";

export default function Content(props) {
  const [isLengthContent, setIsLengthContent] = useState(content.length > 170);

  return (
    <View style={{ direction: "row" }}>
      <Text>
        {isLengthContent ? content.substring(0, 170 - 3) + "..." : content}{" "}
        <TouchableOpacity
          onPress={() => {
            setIsLengthContent(false);
          }}
        >
          <Text style={{ color: "#696969" }}>
            {isLengthContent ? "xem them" : ""}
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
}
