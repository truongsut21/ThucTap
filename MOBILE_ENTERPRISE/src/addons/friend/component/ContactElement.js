import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import isEqual from "react-fast-compare";
import DispatchImage from "../../chat/components/DispatchImage";
import DefaultAvatar from "../../chat/static/default_ava.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Action from "../../chat/controllers/actionTypes";
import * as ActionAuth from '../../auth/controllers/actionTypes';
import * as ActionFriend from "../../friend/controllers/actionType";

const listReactionType = {
  ["1"]: (
    <Image
      style={{ width: 15, height: 15 }}
      source={require("../../chat/static/emo/like.png")}
    />
  ),
  ["2"]: (
    <Image
      style={{ width: 15, height: 15 }}
      source={require("../../chat/static/emo/heart.png")}
    />
  ),
  ["3"]: (
    <Image
      style={{ width: 15, height: 15 }}
      source={require("../../chat/static/emo/sad.png")}
    />
  ),
  ["4"]: (
    <Image
      style={{ width: 15, height: 15 }}
      source={require("../../chat/static/emo/haha.png")}
    />
  ),
  ["5"]: (
    <Image
      style={{ width: 15, height: 15 }}
      source={require("../../chat/static/emo/angry.png")}
    />
  ),
};

const ContactElement = ({
  _id,
  thread_id,
  what_doing,
  position,
  isSelected,
  chooseFriend,
  unChooseFriend,
  onChooseInMention,
  triggerEventAfterClickElement,
  _idMess,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { localAvatar, cloudAvatar, needToDownloadAvatar, someoneId, Someone, checkMe } =
    useSelector(
      (state) => {
        const myUserInfo = state.AuthStoredReducer.myUserInfo || {};
        const imageAvatars = state.ChatStoredReducer.imageAvatars || {};
        const myFriends = state.FriendStoredReducer.myFriends || {};
        const myContacts = state.FriendStoredReducer.myContacts || {};
        //cá nhân
        let Someone = myFriends[_id] || myContacts[_id];
        if (myUserInfo._id === _id) {
          Someone = myUserInfo;
        }
        let localAvatar, cloudAvatar, needToDownloadAvatar, someoneId;
        if (!Someone) {
          return { someoneId: _id };
        }
        if (Someone.avatar_url) {
          localAvatar = imageAvatars[Someone.avatar_url];
          cloudAvatar = Someone.avatar_url;
          needToDownloadAvatar = localAvatar ? false : true;
        }

        return {
          localAvatar,
          cloudAvatar,
          needToDownloadAvatar,
          someoneId,
          Someone,
          checkMe: myUserInfo._id === _id,
        };
      },
      (prev, next) => isEqual(prev, next)
    );

  //lấy data friend để làm add user vào nhóm

  // lấy type người thả reaction
  let type = useSelector(
    (state) => {
      let listMessageReactions = state.ChatStoredReducer.listMessageReactions;
      let messageReactions = listMessageReactions[_idMess];
      if (!messageReactions) {
        return null;
      }

      return messageReactions[_id] || null;
      // _id
    },
    (prev, next) => isEqual(prev, next)
  );

  //set để tắt khi share contact
  const [disableBtn, setDisableBtn] = useState(false);
  //dowload contact
  useEffect(() => {
    if (someoneId) {
      dispatch({
        type: ActionFriend.API_DOWNLOAD_CONTACT,
        data: {
          ids: [someoneId],
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

  const onPress = () => {
    if (what_doing === "render-friend" && !thread_id) {
      dispatch({
        type: Action.CHAT_WITH_SOMEONE,
        data: { contact_id: _id },
        navigation,
      });
    } else if (thread_id) {
      setDisableBtn(true);
      if (!disableBtn) {
        dispatch({
          type: Action.API_SHARE_CONTACT,
          data: {
            someone_id: _id,
            thread_id,
            navigation,
          },
        });
        navigation.goBack();
      }
    } else if (what_doing === "render-member" && !checkMe) {
      navigation.navigate("PopupUserInfo", {
        _id,
      });
    }
    else if (what_doing === "render-member" && checkMe) {
      dispatch({
        type: ActionAuth.UPDATE_NOTIFICATION,
        data: "Không thể chọn chính bạn",
      });
    } else if (what_doing === "add-user-member") {
      if (isSelected) {
        unChooseFriend(_id);
      } else {
        chooseFriend(_id);
      }
    } else if (what_doing === "mention_input") {
      onChooseInMention(_id);
    } else {
    }
  };
  let setPosition = "Chưa xác định";
  if (what_doing === "render-member" && position) {
    if (position === 5) {
      setPosition = "Thành viên";
    } else if (position === 3) {
      setPosition = "Phó nhóm";
    } else {
      setPosition = "Trưởng nhóm";
    }
  }
  return (
    <SafeAreaView>
      <TouchableOpacity
        // underlayColor={'#81fceb'}
        activeOpacity={0.5}
        disabled={
          what_doing === "render-details-message" ||
          what_doing === "render-details-reaction"
        }
        onPress={onPress}
        style={{
          flexDirection: "row",
          height: 50,
          flex: 1,
          alignItems: "center",
          paddingVertical: 10,
          borderRadius: 10,
        }}
      >
        {localAvatar ? (
          <DispatchImage
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              borderWidth: 0.7,
              borderColor: "#ccc",
            }}
            source={localAvatar}
            type={"avatar"}
            data={{
              cloudLink: cloudAvatar,
            }}
          />
        ) : (
          <Image
            source={DefaultAvatar}
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
            }}
          />
        )}
        <View
          style={{
            paddingLeft: 10,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {Someone && Someone.name}
          </Text>
        </View>
        {/* render at component friends */}
        {what_doing === "render-friend" && !thread_id ? (
          <View
            style={{
              flex: 1,
              //   backgroundColor:"red",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Ionicons
              color="#828282"
              size={20}
              name="chatbubble-ellipses-outline"
              style={{}}
            />
            {/* 828282 */}
          </View>
        ) : null}
        {/* render at component threadmenber */}

        {what_doing === "render-member" && position ? (
          <View
            style={{
              flex: 1,
              //   backgroundColor:"red",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Text>{setPosition}</Text>
          </View>
        ) : null}
        {/* render at component adduser member is gruop */}

        {isSelected && what_doing === "add-user-member" ? (
          <View
            style={{
              flex: 1,
              //   backgroundColor:"red",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Ionicons
              style={{ fontSize: 22, color: "green", fontWeight: "600" }}
              name="checkmark-circle-outline"
            />
          </View>
        ) : null}
        {!isSelected && what_doing === "add-user-member" ? (
          <View
            style={{
              flex: 1,
              //   backgroundColor:"red",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <Ionicons
              style={{ fontSize: 22, color: "black" }}
              name="ios-ellipse-outline"
            />
          </View>
        ) : null}
        {what_doing === "render-details-message" ? (
          <View
            style={{
              height: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                backgroundColor: "#e6e6e6",
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  // backgroundColor:"#ddd",
                  // borderRadius:50,
                  textAlign: "center",
                  fontStyle: "italic",
                  color: "#737373",
                  // padding:10,
                }}
              >
                Đã xem
              </Text>
            </View>
          </View>
        ) : null}
        {what_doing === "render-details-reaction" && type ? (
          <View
            style={{
              height: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                padding: 5,
                borderRadius: 105,
                backgroundColor: "#ddd",
              }}
            >
              {listReactionType[type]}
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default React.memo(ContactElement, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});
