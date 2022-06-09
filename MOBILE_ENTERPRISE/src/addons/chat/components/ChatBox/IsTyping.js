import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import isEqual from "react-fast-compare";
import { WIDTH } from "../../controllers/utils";
const Anim = require("../../../../static/thread_dot_jumping.json");

function IsTyping({ activeThreadId }) {
  const whoTyping = useSelector(
    (state) => {
      try {
        const myThreadTypers = state.ChatUnstoredReducer.myThreadTypers || {};
        return Object.values(myThreadTypers[activeThreadId] || {})
          .map((t) => {
            return t.name;
          })
          .join(", ");
      } catch (error) {
        return "";
      }
    },
    (prev, next) => prev === next
  );

  if (!whoTyping) return null;
  return (
    <View
      style={[
        {
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          zIndex: 5,
          alignSelf: "flex-start",
          paddingHorizontal: 5,
          paddingVertical: 2,
          maxWidth: WIDTH / 1.5,
          backgroundColor: "#00A48D",
          borderTopRightRadius: 4,
        },
      ]}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          color: "#fff",
          fontSize: 13,
          paddingRight: 5,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {whoTyping}
        </Text>
        <Text style={{}}>{" đang soạn"}</Text>
      </Text>

      <LottieView
        source={Anim}
        style={{
          width: 15,
          height: 15,
          // backgroundColor: 'red'
        }}
        autoPlay
        loop
      />
    </View>
  );
}

export default React.memo(IsTyping, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});
