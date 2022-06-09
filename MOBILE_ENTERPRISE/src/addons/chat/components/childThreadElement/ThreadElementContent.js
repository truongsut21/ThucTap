import React, { useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "react-fast-compare";
import Feather from "react-native-vector-icons/Feather";
import LottieView from "lottie-react-native";
import { _parseMentionContentIfExist } from "../../controllers/utils";
import * as FriendAction from "../../../friend/controllers/actionType";
import useTheme from "../../../base/components/useTheme";

const Anim = require("../../../../static/thread_dot_jumping_00ccaf.json");

const DEFAULT_IS_REMOVED_TEXT = "tin nhắn đã bị thu hồi";
const DEFAULT_STICKER_TEXT = "đã gửi một sticker";
const DEFAULT_IMAGE_TEXT = "đã gửi một hình ảnh";
const DEFAULT_IMAGE_GROUP_TEXT = "đã gửi nhiều hình ảnh";
const DEFAULT_FILE_TEXT = "đã gửi một têp tin";
const DEFAULT_POLL_TEXT = "đã cập nhật một bình chọn";
const DEFAULT_TEXT = "đã gửi một tin nhắn";

const Typing = ({ thread_id }) => {
  const theme = useTheme();
  const text = useSelector(
    (state) => {
      const myThreadTypers = state.ChatUnstoredReducer.myThreadTypers || {};
      let typers = myThreadTypers[thread_id] || {};
      if (typers) {
        return Object.values(typers)
          .map((t, i) => {
            return t.name;
          })
          .join(", ");
      } else {
        return "";
      }
    },
    (prev, next) => isEqual(prev, next)
  );

  if (!text) return null;
  return (
    <View
      style={{
        position: "absolute",
        flex: 1,
        width: "100%",
        height: 48,
        backgroundColor: theme.backgroundColor,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={{
            color: "#00A48D",
            paddingRight: 5,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{text}</Text>
          <Text style={{}}>{" đang soạn"}</Text>
        </Text>
        <LottieView
          source={Anim}
          style={{
            width: 15,
            height: 15,
            backgroundColor: theme.backgroundColor,
          }}
          autoPlay
          loop
        />
      </View>
    </View>
  );
};

const MemoizedTyping = React.memo(Typing, (prevProps, nextProps) => {
  return prevProps.thread_id === nextProps.thread_id;
});

const LastMessage = ({ thread_id }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const draftContent = useSelector((state) => {
    const draftContent = state.ChatUnstoredReducer.draftInputtingContent;
    return draftContent[thread_id] || "";
  });
  //không có draftcontent thì mới quan tâm lastMessage
  const { lastMessage, Someone, SomeoneId } = useSelector(
    (state) => {
      if (draftContent) return {};
      const myUserId = state.AuthStoredReducer.myUserInfo._id;
      const simpleMessages = state.ChatStoredReducer.simpleMessages;
      const fullMessages = state.ChatStoredReducer.fullMessages;
      const myFriends = state.FriendStoredReducer.myFriends || {};
      const myContacts = state.FriendStoredReducer.myContacts || {};

      try {
        let lastMessageId =
          simpleMessages[thread_id] && simpleMessages[thread_id][0]
            ? simpleMessages[thread_id][0]._id
            : null;
        if (!lastMessageId) {
          return {};
        }
        let lastMessage = fullMessages[lastMessageId];
        if (!lastMessage) {
          return {};
        }
        let title =
          lastMessage.create_uid === myUserId
            ? "(Bạn đã trả lời)"
            : (
              myFriends[lastMessage.create_uid] ||
              myContacts[lastMessage.create_uid] || { name: "" }
            ).name;
        return {
          lastMessage: {
            title: lastMessage.type === "system" ? "(Hệ thống)" : title,
            content:
              lastMessage.type === "text" || lastMessage.type === "system"
                ? (lastMessage.content || {}).content
                : "",
            type: lastMessage.is_removed ? "is_removed" : lastMessage.type,
          },
          Someone:
            myFriends[lastMessage.create_uid] ||
              myContacts[lastMessage.create_uid]
              ? true
              : false,
          SomeoneId: lastMessage.create_uid,
        };
      } catch (error) {
        return {};
      }
    },
    (prev, next) => isEqual(prev, next)
  );

  useEffect(() => {
    if (!Someone && SomeoneId) {
      dispatch({
        type: FriendAction.API_DOWNLOAD_CONTACT,
        data: { ids: [SomeoneId] },
      });
    }
  }, [Someone, SomeoneId]);

  const convertTitle = useMemo(() => {
    try {
      return lastMessage.title;
    } catch (error) {
      return "(Một ai đó)";
    }
  }, [lastMessage]);

  const convertContent = useMemo(() => {
    try {
      switch (lastMessage.type) {
        case "is_removed":
          return DEFAULT_IS_REMOVED_TEXT;
        case "text":
          return _parseMentionContentIfExist(lastMessage.content);
        case "system":
          return lastMessage.content;
        case "sticker":
          return DEFAULT_STICKER_TEXT;
        case "image":
          return DEFAULT_IMAGE_TEXT;
        case "image_group":
          return DEFAULT_IMAGE_GROUP_TEXT;
        case "poll":
          return DEFAULT_POLL_TEXT;
        case "file":
          return DEFAULT_FILE_TEXT;
        default:
          return "";
        // return DEFAULT_TEXT;
      }
    } catch (error) {
      return DEFAULT_TEXT;
    }
  }, [lastMessage]);

  try {
    if (draftContent) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode={"tail"}
            style={{
              color: "orange",
            }}
          >
            {`(Nháp) ${draftContent}`}
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            color: theme.textColor,
            fontWeight: Platform.OS === "android" ? "bold" : "500",
            fontSize: 14,
            paddingBottom: 2,
          }}
        >
          {convertTitle}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={{
            color: theme.dimTextColor,
            fontSize: 14,
          }}
        >
          {convertContent}
        </Text>
      </View>
    );
  } catch (error) {
    return null;
  }
};

const MemoizedLastMessage = React.memo(LastMessage, (prevProps, nextProps) => {
  return prevProps.thread_id === nextProps.thread_id;
});

const UnreadMark = ({ thread_id }) => {
  const show = useSelector(
    (state) => {
      try {
        const myUserId = state.AuthStoredReducer.myUserInfo._id;
        const simpleMessages = state.ChatStoredReducer.simpleMessages;
        let lastMessage = simpleMessages[thread_id][0];
        const fullMessages = state.ChatStoredReducer.fullMessages;
        if (fullMessages[lastMessage._id].create_uid !== myUserId) {
          const listMessageStates = state.ChatStoredReducer.listMessageStates;
          if (!listMessageStates[lastMessage._id]) return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    },
    (prev, next) => prev === next
  );

  if (!show) return null;
  return (
    <View
      style={{
        width: 12,
        height: 12,
        marginLeft: 5,
        backgroundColor: "red",
        borderRadius: 10,
      }}
    />
  );
};

const NotificationStatus = ({ thread_id }) => {
  const showBellOff = useSelector((state) => {
    try {
      let thread = state.ChatStoredReducer.fullThreads[thread_id];
      if (thread && (!thread.hasOwnProperty('notification_status') || thread.notification_status)) {
        return false;
      }
      return true;
      // if (
      //   !thread ||
      //   thread.notification_status ||
      //   thread.notification_status === null ||
      //   thread.notification_status === undefined
      // ) {
      //   return false;
      // }
      // return true;
    } catch (error) {
      return false;
    }
  });
  if (!showBellOff) {
    return null;
  }
  return (
    <Feather
      name="bell-off"
      size={16}
      style={{
        color: "#bbb",
      }}
    />
  );
};

const ThreadElementContent = ({ _id }) => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: 48,
        flexDirection: "row",
      }}
    >
      <MemoizedLastMessage thread_id={_id} />
      <MemoizedTyping thread_id={_id} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <NotificationStatus thread_id={_id} />
        <UnreadMark thread_id={_id} />
      </View>
    </View>
  );
};

export default React.memo(ThreadElementContent, (prevProps, nextProps) => {
  return prevProps._id === nextProps._id;
});
