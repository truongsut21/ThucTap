import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  InteractionManager,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import isEqual from "react-fast-compare";
import DispatchImage from "../DispatchImage";
// import ThreadStatusInChatBox from "../ThreadStatusInChatBox";
import { WIDTH } from "../../controllers/utils";
import styles from "../../static/style";
import DefaultAvatar from "../../static/default_ava.png";
import DefaultGroupAvatar from "../../static/default_group_avatar.png";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../controllers/actionTypes";
import * as FriendAction from "../../../friend/controllers/actionType";
import useTheme from "../../../base/components/useTheme";

function ChatBoxTitle({ ...props }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    threadTitle,
    localAvatar,
    cloudAvatar,
    needToDownloadAvatar,
    isThreadGroup,
    someoneId,
  } = useSelector(
    (state) => {
      const imageAvatars = state.ChatStoredReducer.imageAvatars || {};
      const fullThreads = state.ChatStoredReducer.fullThreads || {};
      const myFriends = state.FriendStoredReducer.myFriends || {};
      const myContacts = state.FriendStoredReducer.myContacts || {};
      let Thread = fullThreads[props.activeThreadId];
      if (!Thread) return {};
      let localAvatar = "",
        cloudAvatar = "",
        needToDownloadAvatar = false,
        threadTitle = Thread.name || "",
        needToDownloadContact = false;
      if (Thread.is_group) {
        if (Thread.avatar_group_url) {
          localAvatar = imageAvatars[Thread.avatar_group_url];
          cloudAvatar = Thread.avatar_group_url;
          needToDownloadAvatar = localAvatar ? false : true;
        }
      } else {
        //cá nhân
        const Someone =
          myFriends[Thread.chat_with_user_id] ||
          myContacts[Thread.chat_with_user_id] ||
          {};
        if (!Someone) {
          return { someoneId: Thread.chat_with_user_id };
        }
        if (Someone && Someone !== Thread.name) threadTitle = Someone.name;
        if (Someone.avatar_url) {
          localAvatar = imageAvatars[Someone.avatar_url];
          cloudAvatar = Someone.avatar_url;
          needToDownloadAvatar = localAvatar ? false : true;
        } else {
          localAvatar = DefaultAvatar;
          cloudAvatar = DefaultAvatar;
          needToDownloadAvatar = false;
        }
      }
      return {
        threadTitle,
        localAvatar,
        cloudAvatar,
        needToDownloadAvatar,
        isThreadGroup: Thread.is_group,
      };
    },
    (prev, next) => isEqual(prev, next)
  );
  useEffect(() => {
    if (needToDownloadAvatar) {
      dispatch({
        type: Action.API_DOWNLOAD_AVATAR,
        data: {
          url: cloudAvatar,
        },
        dispatch: dispatch,
      });
    }
    if (someoneId) {
      dispatch({
        type: FriendAction.API_DOWNLOAD_CONTACT,
        data: {
          _ids: [someoneId],
        },
      });
    }
  }, []);

  useEffect(() => {
    if (needToDownloadAvatar) {
      dispatch({
        type: Action.API_DOWNLOAD_AVATAR,
        data: {
          url: cloudAvatar,
        },
        dispatch: dispatch,
      });
    }
  }, [needToDownloadAvatar]);

  const goThreadMoreInformation = () => {
    InteractionManager.runAfterInteractions(() => {
      navigation.navigate("ThreadInformation", {
        thread_id: props.activeThreadId,
      });
    });
  };

  return (
    <View style={[styles.aac, { backgroundColor: theme.backgroundColor }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          maxWidth: WIDTH * 1,
          // backgroundColor:"pink",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.aaf}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate("Home");
              }
            }}
          >
            <AntDesign color="#00A48D" size={22} name="arrowleft" style={{}} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 20,
          }}
          onPress={goThreadMoreInformation}
        >
          {/* <View
						style={{
							// height:"100%",
							// backgroundColor:"red",
							justifyContent: "center",
							alignItems: "center",
						}}
					> */}
          <Text
            style={[styles.aai, { color: theme.textColor }]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {threadTitle}
          </Text>
          {/*  */}
          {/* </View> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 40,
          }}
          onPress={goThreadMoreInformation}
        >
          {localAvatar ? (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 5,
              }}
            >
              <DispatchImage
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                  borderWidth: 0.7,
                  borderColor: "#ccc",
                }}
                source={localAvatar}
                type={"avatar"}
                data={{
                  cloudLink: cloudAvatar,
                }}
              />
            </View>
          ) : (
            <Image
              source={isThreadGroup ? DefaultGroupAvatar : DefaultAvatar}
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 30,
                height: 30,
                borderRadius: 50,
                borderColor: theme.borderColor,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(ChatBoxTitle, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});
