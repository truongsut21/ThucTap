import React, { useContext, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "react-fast-compare";
import { without } from "lodash";
import { ActiveThreadContext } from "../ChatBox/context";
import { WIDTH } from "../../controllers/utils";
import ContactElement from "../../../friend/component/ContactElement";
import * as Action from "../../../friend/controllers/actionType";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Suggestions = ({ keyword = null, onSuggestionPress }) => {
  const dispatch = useDispatch();
  const ThreadContext = useContext(ActiveThreadContext);
  const activeThreadId = ThreadContext.activeThreadId;
  const myUserId = useSelector(
    (state) => {
      return state.AuthStoredReducer.myUserInfo._id;
    },
    (prev, next) => isEqual(prev, next)
  );
  const Members = useSelector(
    (state) => {
      try {
        if (keyword === null || keyword === undefined || keyword === false)
          return [];
        const threadMembers = state.ChatStoredReducer.threadMembers;
        const myFriends = state.FriendStoredReducer.myFriends;
        const myContacts = state.FriendStoredReducer.myContacts;
        return without(
          Object.values(threadMembers[activeThreadId])
            .filter(
              (m) =>
                m.status === 1 &&
                m._id !== myUserId &&
                (myFriends || myContacts)[m._id]
            )
            .map((m) => {
              if (
                (myFriends || myContacts)[m._id].name
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
              ) {
                return {
                  _id: m._id,
                  name: (myFriends || myContacts)[m._id].name,
                };
              }
              return null;
            }),
          null
        ).slice(0, 5);
      } catch (error) {
        return [];
      }
    },
    (prev, next) => isEqual(prev, next)
  );
  const prevMembers = useRef([]); //bắt buộc để thế này để trigger animation load danh sách
  const unknownContactIds = useSelector(
    (state) => {
      try {
        if (keyword === null || keyword === undefined || keyword === false)
          return [];
        const threadMembers = state.ChatStoredReducer.threadMembers;
        const myFriends = state.FriendStoredReducer.myFriends;
        const myContacts = state.FriendStoredReducer.myContacts;
        return Object.values(threadMembers[activeThreadId])
          .filter((m) => {
            return (
              m.status === 1 &&
              m._id !== myUserId &&
              !myFriends[m._id] &&
              !myContacts[m._id]
            );
          })
          .map((m) => m._id)
          .slice(0, 200);
      } catch (error) {
        return [];
      }
    },
    (prev, next) => isEqual(prev, next)
  );
  const prevUnknownContactIds = useRef([]); //Bắt buộc phải để thế này để trigger useEffect unknownContactIds bên dưới

  useEffect(() => {
    if (!isEqual(Members, prevMembers.current)) {
      LayoutAnimation.configureNext({
        duration: 100,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        delete: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
      });
      prevMembers.current = [...Members];
    }
  }, [Members]);

  useEffect(() => {
    //Dùng để giảm số lần bắn API khi người dùng đang gõ chữ, vì unknownContactIds ko đổi thì ko cần bắn
    //Vì đã có request bắn đi rồi
    if (!isEqual(unknownContactIds, prevUnknownContactIds.current)) {
      if (unknownContactIds.length > 0) {
        dispatch({
          type: Action.DOWNLOAD_MASS_CONTACT,
          data: { ids: unknownContactIds },
        });
      }
      prevUnknownContactIds.current = [...unknownContactIds];
    }
  }, [unknownContactIds]);

  const onPress = (_id) => {
    let member = Members.find((m) => m._id === _id);
    if (!member) return null;
    onSuggestionPress({ id: member._id, name: member.name });
  };

  keyExtractor = (item) => {
    return item._id;
  };

  renderItem = ({ item, index }) => {
    return (
      <ContactElement
        _id={item._id}
        what_doing={"mention_input"}
        onChooseInMention={onPress}
      />
    );
  };

  if (keyword === null || keyword === undefined || keyword === false) {
    return null;
  }
  return (
    <FlatList
      style={{
        position: "absolute",
        bottom: 38,
        left: -70,
        maxHeight: 250,
        width: WIDTH,
        backgroundColor: "#fff",
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: "#ddd",
      }}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      data={Members}
      initialNumToRender={5}
      removeClippedSubviews={true}
    />
  );
};

// export default React.memo(Suggestions, (prevProps, nextProps) => {
//     return prevProps.keyword !== nextProps.keyword
// });

export default Suggestions;
