import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Animated, { EasingNode } from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../../static/style";
import isEqual from "react-fast-compare";
import { without } from "lodash";
// import { convertContentForPinMessage } from '../../controllers/utils';
import { WIDTH, HEIGHT } from "../../controllers/utils";
import * as Action from "../../controllers/actionTypes";
import OwnImageContent from "../childOwnMessage/ImageContent";
import OwnStickerContent from "../childOwnMessage/StickerContent";
import OwnImageGroupContent from "../childOwnMessage/ImageGroupContent";
import OwnFileContent from "../childOwnMessage/FileContent";
import OwnContactContent from "../childOwnMessage/ContactContent";
import { _parseMentionContentIfExist } from "../../controllers/utils";
import Hyperlink from "react-native-hyperlink";

const ShortContent = ({ activeThreadId, message_id, animateOpacity }) => {
  const message = useSelector(
    (state) => {
      try {
        const full = state.ChatStoredReducer.fullMessages;
        return full[message_id];
      } catch (error) {
        return null;
      }
    },
    (prev, next) => isEqual(prev, next)
  );

  const is_removed = useSelector(
    (state) => {
      const fullMessages = state.ChatStoredReducer.fullMessages;
      return message ? fullMessages[message._id].is_removed : null;
    },
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  );

  const parsedContent = is_removed
    ? ""
    : _parseMentionContentIfExist(
        message && message.content && message.content.content,
        (id) => {},
        {
          color: "#000",
        }
      );
      const checkLink = () => {
        if (message.type === "text") {
          if (message.content.content.includes("https")) {
            return true;
          } else {
            return false;
          }
        }
        return false;
      };
  try {
    if (message.type === "text") {
      if (checkLink())
        return (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Hyperlink
              linkDefault={true}
              linkStyle={{ color: "#007bff", textDecorationLine: "underline" }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: is_removed ? "#ccc" : "#333",
                }}
              >
                {is_removed ? "Tin nhắn đã bị thu hồi" : parsedContent}
              </Text>
            </Hyperlink>
          </View>
        );
      return (
        <Animated.View
          style={{
            opacity: animateOpacity,
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 13,
              color: "#333",
            }}
          >
            {parsedContent}
          </Text>
        </Animated.View>
      );
    } else if (message.type === "sticker") {
      return (
        <OwnStickerContent
          _id={message._id}
          onLongPress={null}
          isPoppingup={true}
          isPin={true}
        ></OwnStickerContent>
      );
    } else if (message.type === "image") {
      return (
        <OwnImageContent
          _id={message._id}
          onLongPress={null}
          isPoppingup={true}
          isPin={true}
        ></OwnImageContent>
      );
    } else if (message.type === "image_group") {
      return (
        <OwnImageGroupContent
          _id={message._id}
          onLongPress={null}
          isPoppingup={true}
          isPin={true}
        ></OwnImageGroupContent>
      );
    } else if (message.type === "file") {
      return (
        <OwnFileContent
          _id={message._id}
          onLongPress={null}
          isPoppingup={true}
          isPin={true}
        ></OwnFileContent>
      );
    } else if (message.type === "contact") {
      return (
        <OwnContactContent
          _id={message._id}
          onLongPress={null}
          isPoppingup={true}
          isPin={true}
        ></OwnContactContent>
      );
    } else if (message.type === "poll") {
      return null;
    } else {
      return null;
    }
  } catch (error) {
    return (
      <Animated.View
        style={{
          opacity: animateOpacity,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            color: "#333",
          }}
        >
          &lt;Chưa hỗ trợ dạng tin ghim này&gt;
        </Text>
      </Animated.View>
    );
  }
};

const MemoizedShortContent = React.memo(
  ShortContent,
  (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
  }
);

function PinMessage({ activeThreadId }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [viewIndex, setViewIndex] = useState(0);
  const pinMessage = useSelector(
    (state) => {
      try {
        const pinMessages = state.ChatStoredReducer.pinMessages;
        const data = without(Object.values(pinMessages[activeThreadId]), null);
        return data[data.length - 1];
      } catch (error) {
        return null;
      }
    },
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  );

  const totalCount = useSelector(
    (state) => {
      try {
        const pinMessages = state.ChatStoredReducer.pinMessages;
        return without(Object.values(pinMessages[activeThreadId]), null).length;
      } catch (error) {
        return 0;
      }
    },
    (prev, next) => prev === next
  );
  const animateOpacity = useRef(new Animated.Value(1)).current;
  const activeThreadRef = useRef(activeThreadId);

  useEffect(() => {
    if (!isEqual(activeThreadId, activeThreadRef.current)) {
      setViewIndex(0);
      activeThreadRef.current = activeThreadId;
    }
  }, [activeThreadId]);

  const goNextPin = () => {
    if (totalCount >= 2) {
      Animated.timing(animateOpacity, {
        toValue: 0,
        duration: 200,
        easing: EasingNode.inOut(EasingNode.ease),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setViewIndex(viewIndex + 1 === totalCount ? 0 : viewIndex + 1);
          Animated.timing(animateOpacity, {
            toValue: 1,
            duration: 200,
            easing: EasingNode.inOut(EasingNode.ease),
            useNativeDriver: true,
          }).start();
        }
      });
    }
  };
  const unpinMessage = () => {
    dispatch({
      type: Action.API_UNPIN_MESSAGE,
      data: {
        thread_id: activeThreadId,
        message_id: pinMessage._id,
      },
    });
  };

  const expandPin = () => {
    navigation.navigate("PinMessageList", { activeThreadId: activeThreadId });
  };

  try {
    if (!pinMessage) {
      return null;
    }
    return (
      <React.Fragment>
        <View
          style={{
            width: WIDTH,
            position: "absolute",
            top: 50,
            zIndex: 2,
          }}
        >
          <View
            style={{
              minHeight: 50,
              backgroundColor: "#fff",
              borderBottomWidth: 0.3,
              borderBottomColor: "#ddd",
              paddingHorizontal: 5,
              paddingVertical: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={unpinMessage}>
              <View style={styles.aaq}>
                <MaterialCommunityIcons
                  name="pin-off-outline"
                  size={25}
                  color="#a3a3a3"
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.aar]}
              onPress={goNextPin}
              activeOpacity={1}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View>
                  <Text
                    style={{
                      paddingBottom: 2,
                      fontWeight: "400",
                      color: "#00A48D",
                      fontSize: 15,
                      fontWeight: "600",
                    }}
                  >
                    Tin nhắn ghim {totalCount >= 2 ? "#" : ""}
                  </Text>
                </View>
                {totalCount >= 2 ? (
                  <Animated.View
                    style={{
                      opacity: animateOpacity,
                    }}
                  >
                    <Text
                      style={{
                        paddingBottom: 2,
                        fontWeight: "400",
                        color: "#00A48D",
                        fontSize: 15,
                        fontWeight: "600",
                      }}
                    >
                      {totalCount}
                    </Text>
                  </Animated.View>
                ) : null}
              </View>

              <MemoizedShortContent
                activeThreadId={activeThreadId}
                message_id={pinMessage._id}
                animateOpacity={animateOpacity}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 2,
              }}
              onPress={expandPin}
            >
              <MaterialCommunityIcons
                name="expand-all-outline"
                size={25}
                color="#00A48D"
              />
            </TouchableOpacity>
          </View>
        </View>
      </React.Fragment>
    );
  } catch (error) {
    return null;
  }
}

export default React.memo(PinMessage, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});
