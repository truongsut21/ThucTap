import React from "react";
import { View, Text } from "react-native";

const ECardRendererData = ({ content, textStyle, viewStyle, viewPosition }) => {
  return (
    <View
      style={{
        ...viewStyle,
        position: "absolute",
        bottom: viewPosition.y,
        left: viewPosition.x,
      }}
    >
      <Text
        style={{
          ...textStyle,
        }}
      >
        {content}
      </Text>
    </View>
  );
};

export default ECardRendererData;
