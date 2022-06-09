import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import isEqual from "react-fast-compare";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import * as ActionAuth from "../../auth/controllers/actionTypes";
import * as FriendAction from "../../friend/controllers/actionType";
import * as ActionChat from "../controllers/actionTypes";




const PopupElementIsPersonal = () => {
  const route = useRoute();
  const _id = route.params._id;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const activeThreadId = useSelector((state) => state.ChatUnstoredReducer.activeThreadId)
  const {
    Someone,
  } = useSelector((state) => {
    const myFriends = state.FriendStoredReducer.myFriends || {};
    const myContacts = state.FriendStoredReducer.myContacts || {};
    const imageAvatars = state.ChatStoredReducer.imageAvatars || {};
    const myUserInfo = state.AuthStoredReducer.myUserInfo || {};

    let Someone;
    if (myUserInfo._id === _id) {
      Someone = myUserInfo;
    } else {
      Someone = myFriends[_id] || myContacts[_id];
    }
    if (!Someone) {
      return {};
    }
    let needToDownloadAvatar = false,
      localAvatar = "",
      cloudAvatar = "";

    if (Someone && Someone.avatar_url) {
      if (imageAvatars[Someone.avatar_url]) {
        localAvatar = imageAvatars[Someone.avatar_url];
        cloudAvatar = Someone.avatar_url;
        needToDownloadAvatar = localAvatar ? false : true;
      }
    }
    return {
      // myPosition,
      Someone: Someone,
      localAvatar: localAvatar,
      cloudAvatar: Someone && Someone.avatar_url ? Someone.avatar_url : "",
      needToDownloadAvatar: needToDownloadAvatar,
    };
  });

  let { myPosition, checkchinhtoi, checkIsGroup } = useSelector(
    (state) => {
      let fullThreads = state.ChatStoredReducer.fullThreads || {};
      let Thread = fullThreads[activeThreadId] || {};
      const threadMembers = state.ChatStoredReducer.threadMembers || {}; // json la id cua member

      const myInfoId = state.AuthStoredReducer.myUserInfo._id;
      let checkchinhtoi, activePosition, threadMember, myPosition;
      let members = threadMembers[activeThreadId]; // json là nhiều id

      if (!members) {
        return {};
      }
      threadMember = members[myInfoId] || {};
      myPosition = threadMember.thread_member_position || 5;
      checkchinhtoi = myInfoId === _id;

      let checkIsGroup;
      if (members[_id]) {
        checkIsGroup = true;
      } else {
        checkIsGroup = false;
      }

      return {
        checkIsGroup,
        myPosition,
        checkchinhtoi,
        chat_with_user_id: Thread.chat_with_user_id,
      };
    },
    (prev, next) => isEqual(prev, next)
  );
  useEffect(() => {
    if (checkchinhtoi) {
      dispatch({
        type: ActionAuth.UPDATE_NOTIFICATION,
        data: "Không thể chọn chính bạn",
      });
      navigation.goBack();
    }

  })
  const { checkFriend, isSentInvitation, isRecievedInviton, myInfoId } =
    useSelector(
      (state) => {
        const myInfoId = state.AuthStoredReducer.myUserInfo._id;

        let checkFriend = Someone.friend_status === "friend";

        let isRecievedInviton =
          Someone.friend_status === "invitation" &&
          Someone.user_id_accept === myInfoId;

        let isSentInvitation =
          Someone.friend_status === "invitation" &&
          Someone.user_id_accept !== myInfoId;

        return {
          checkFriend,
          isSentInvitation,
          isRecievedInviton,
          myInfoId,
        };
      },
      (prev, next) => isEqual(prev, next)
    );

  const onPressMakeFriend = () => {
    dispatch({
      type: FriendAction.API_SEND_REQUEST,
      data: Someone._id,
    });
  };
  const onPressChatSomeOne = () => {
    dispatch({
      type: ActionChat.CHAT_WITH_SOMEONE,
      data: { contact_id: Someone._id },
      navigation,
    });
  };

  const handleRevokeInvitation = () => {
    dispatch({
      type: FriendAction.API_CANCEL_SEND,
      data: Someone._id,
    });
  };

  const handleAcceptFriend = () => {
    dispatch({
        type: FriendAction.API_ACCEPT_FRIEND,
        data: Someone._id,
    })
}

  return (
    <View>
      <TouchableOpacity
        onPress={onPressChatSomeOne}
        style={{
          margin: 12,
          // paddingHorizontal: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          height: 30,
        }}
      >
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={25}
          color="#333"
          style={{
            marginRight: 12,
          }}
        />
        <Text
          style={{
            fontWeight: "bold",
            color: "#333",
            fontSize: 15,
          }}
        >
          Nhắn Tin
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          // flexDirection:'row',
          backgroundColor: "#eee",
          width: "100%",
          //  flex: 1,
        }}
      ></View>


      {checkchinhtoi ? null : (
        <View>
          {!checkFriend && !isSentInvitation && !isRecievedInviton ? (
            <TouchableOpacity
              onPress={onPressMakeFriend}
              style={{
                margin: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                height: 30,
                // paddingHorizontal: 12
              }}
            >
              <Ionicons
                name="person-add-outline"
                size={25}
                color="#333"
                style={{
                  marginRight: 12,
                }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: 15,
                }}
              >
                Kết bạn
              </Text>
            </TouchableOpacity>
          ) : null}

          {isSentInvitation ? (
            <TouchableOpacity
              onPress={handleRevokeInvitation}
              style={{
                margin: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                height: 30,
                // paddingHorizontal: 12

              }}
            >
              <Ionicons
                name="person-remove-outline"
                size={25}
                color="#333"
                style={{
                  marginRight: 12,
                }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: 15,
                }}
              >
                Thu hồi lời mời kết bạn
              </Text>
            </TouchableOpacity>
          ) : null}

          {isRecievedInviton ? (
            <TouchableOpacity
              onPress={handleAcceptFriend}
              style={{
                margin: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                height: 30,
                // paddingHorizontal: 12

              }}
            >
              <MaterialCommunityIcons
                name="account-check-outline"
                size={25}
                color="#333"
                style={{
                  marginRight: 12,
                }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#333",
                  fontSize: 15,
                }}
              >
                Chấp nhận lời mời kết bạn
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      )}

      <View
        style={{
          height: 1,
          // flexDirection:'row',
          backgroundColor: "#eee",
          width: "100%",
          //  flex: 1,
        }}
      ></View>
    </View>
  );
};

export default PopupElementIsPersonal;


