import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import React from "react";
import isEqual from "react-fast-compare";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import * as ActionChat from "../controllers/actionTypes";

const PopupElementIsGroup = () => {
  const route = useRoute();
  const _id = route.params._id;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const activeThreadId = useSelector(
    (state) => state.ChatUnstoredReducer.activeThreadId
  );
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

  const canBoNhiemTruongNhom = useSelector((state) => {
    const { thread_id, contact_id } = route.params;
    if (!thread_id || !contact_id) return null;
    const threadMembers = state.ChatStoredReducer.threadMembers;
    const fullThreads = state.ChatStoredReducer.fullThreads;
    if (!fullThreads[thread_id].is_group) {
      return null;
    }
    const myId = state.AuthStoredReducer.myUserInfo._id;
    if (
      threadMembers &&
      threadMembers[thread_id] &&
      threadMembers[thread_id][contact_id] &&
      threadMembers[thread_id][contact_id].status === 1 &&
      threadMembers[thread_id][myId] &&
      threadMembers[thread_id][myId].status === 1 &&
      threadMembers[thread_id][myId].thread_member_position === 1
    ) {
      return true;
    }

    return false;
  });
  const canBoNhiemPhoNhom = useSelector(
    (state) => {
      const threadMembers = state.ChatStoredReducer.threadMembers || {};
      let members = threadMembers[activeThreadId]; // json là nhiều id
      let threadMember = members[_id] || {}; // json la id cua member
      let yPosition = threadMember.thread_member_position;

      if (yPosition === 3) {
        return true;
      } else {
        return false;
      }
    },
    (prev, next) => isEqual(prev, next)
  );

  const canTruatQuyenPhoNhom = useSelector(
    (state) => {
      const threadMembers = state.ChatStoredReducer.threadMembers || {};
      let members = threadMembers[activeThreadId]; // json là nhiều id
      let threadMember = members[_id] || {}; // json la id cua member
      let yPosition = threadMember.thread_member_position;

      if (yPosition === 3) {
        return true;
      } else {
        return false;
      }
    },
    (prev, next) => isEqual(prev, next)
  );

  const canYeuCauRoiNhom = useSelector(
    (state) => {
      const threadMembers = state.ChatStoredReducer.threadMembers || {};
      let members = threadMembers[activeThreadId]; // json là nhiều id
      let threadMember = members[_id] || {}; // json la id cua member
      let yPosition = threadMember.thread_member_position;

      if (yPosition === 5 || yPosition === 3) {
        return true;
      } else {
        return false;
      }
    },
    (prev, next) => isEqual(prev, next)
  );

  const onPressAppointLeader = () => {
    dispatch({
      type: ActionChat.API_APPOINT_LEADER,
      data: {
        member_id: Someone._id,
      },
    });
  };

  const onPressAppointDeputy = () => {
    dispatch({
      type: ActionChat.API_APPOINT_DEPUTY,
      data: {
        member_id: Someone._id,
      },
    });
  };

  const onPressRemoveMember = () => {
    dispatch({
      type: ActionChat.API_REMOVE_MEMBER,
      data: {
        member_id: Someone._id,
      },
      navigation,
    });
  };
  const onPressDepositionDeputy = () => {
    dispatch({
      type: ActionChat.API_DEPOSITION_DEPUTY,
      data: {
        member_id: Someone._id,
      },
    });
  };

  return (
    <React.Fragment>
      {canBoNhiemTruongNhom ? null : (
        <TouchableOpacity
          onPress={onPressAppointLeader}
          style={{
            margin: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            height: 30,
          }}
        >
          <Ionicons
            name="add-circle-outline"
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
            Bổ nhiệm trưởng nhóm
          </Text>
        </TouchableOpacity>
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
      {canBoNhiemPhoNhom ? null : (
        <TouchableOpacity
          onPress={onPressAppointDeputy}
          style={{
            margin: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            height: 30,
          }}
        >
          <Ionicons
            name="add-circle-outline"
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
            Bổ nhiệm phó nhóm
          </Text>
        </TouchableOpacity>
      )}
      {canTruatQuyenPhoNhom ? (
        <TouchableOpacity
          onPress={onPressDepositionDeputy}
          style={{
            margin: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            height: 30,
          }}
        >
          <Ionicons
            name="remove-circle-outline"
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
            Truất quyền phó nhóm
          </Text>
        </TouchableOpacity>
      ) : null}

      <View
        style={{
          height: 1,
          // flexDirection:'row',
          backgroundColor: "#fff",
          width: "100%",
          //  flex: 1,
        }}
      ></View>
      {canYeuCauRoiNhom ? (
        <TouchableOpacity
          onPress={onPressRemoveMember}
          style={{
            margin: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            height: 30,
          }}
        >
          <Ionicons
            name="log-out-outline"
            size={25}
            color="red"
            style={{
              marginRight: 12,
            }}
          />
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Mời ra khỏi nhóm
          </Text>
        </TouchableOpacity>
      ) : null}
    </React.Fragment>
  );
};

export default PopupElementIsGroup;
