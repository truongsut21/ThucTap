import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
// import ThreadMemberList from "./ThreadMemberList";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import isEqual from "react-fast-compare";
import * as FriendAction from "../../../friend/controllers/actionType";
import * as ActionChat from "../../../chat/controllers/actionTypes";
import StatusBar from "../../../base/components/StatusBar";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import DefaultAvatar from "../../static/default_ava.png";
import DispatchImage from "../../../chat/components/DispatchImage";
import ContactElement from "../../../friend/component/ContactElement";

// const ThreadMemberElement = ({ _id, position, status }) => {
//   const route = useRoute();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const contact_id = _id;

//   const {
//     Someone,
//     needToDownloadContact,
//     localAvatar,
//     cloudAvatar,
//     needToDownloadAvatar,
//     myPosition,
//   } = useSelector((state) => {
//     const myFriends = state.FriendStoredReducer.myFriends || {};
//     const myContacts = state.FriendStoredReducer.myContacts || {};
//     const imageAvatars = state.ChatStoredReducer.imageAvatars || {};
//     const myUserInfo = state.AuthStoredReducer.myUserInfo || {};

//     let Someone;
//     if (myUserInfo._id === contact_id) {
//       Someone = myUserInfo;
//     } else {
//       Someone = myFriends[contact_id] || myContacts[contact_id];
//     }
//     if (!Someone) {
//       return {};
//     }
//     let needToDownloadAvatar = false,
//       localAvatar,
//       cloudAvatar;

//     if (Someone && Someone.avatar_url) {
//       if (imageAvatars[Someone.avatar_url]) {
//         localAvatar = imageAvatars[Someone.avatar_url];
//         cloudAvatar = Someone.avatar_url;
//         needToDownloadAvatar = localAvatar ? false : true;
//       }
//     }
//     return {
//       myPosition,
//       Someone: Someone,
//       localAvatar: localAvatar,
//       cloudAvatar: Someone && Someone.avatar_url ? Someone.avatar_url : "",
//       needToDownloadAvatar: needToDownloadAvatar,
//     };
//   }, (prev, next) => isEqual(prev, next));
//   // useEffect(() => {
//   //   if (!Someone) {
//   //     dispatch({
//   //       type: FriendAction.API_DOWNLOAD_CONTACT,
//   //       data: {
//   //         ids: [contact_id],
//   //       },
//   //     });
//   //   }
//   // }, []);

//   // useEffect(() => {
//   //   if (needToDownloadAvatar) {
//   //     dispatch({
//   //       type: ActionChat.API_DOWNLOAD_AVATAR,
//   //       data: {
//   //         url: cloudAvatar,
//   //       },
//   //       dispatch: dispatch,
//   //     });
//   //   }
//   // }, [needToDownloadAvatar]);

//   // const onLongPress = () => {
//   //   if (data.canKickMember) {
//   //     navigation.navigate("PopupUserInfo", {
//   //       contact_id: _id,
//   //       thread_id: data.threadId,
//   //     });
//   //   } else {
//   //     navigation.navigate("PopupUserInfo",{
//   //       _id : _id,
//   //       thread_id: data.threadId,
//   //     });

//   //   }
//   // };

//   const onPress = () => {
//     navigation.navigate("PopupUserInfo", {
//       _id: contact_id,
//     });
//   };

//   if (!Someone) return <Text></Text>;

//   let setPosition;
//   if (position === 5) {
//     setPosition = "Thành viên";
//   } else if (position === 3) {
//     setPosition = "Phó nhóm";
//   } else {
//     setPosition = "Trưởng nhóm";
//   }
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       // onLongPress={onLongPress}
//       style={{
//         justifyContent: "flex-start",
//         marginHorizontal: 12,
//         marginBottom: 10,
//         flexDirection: "row",
//         justifyContent: "space-between",

//       }}
//     >
//       <View style={{ margin: 10, flexDirection: "row",flex:2}}>
//         {localAvatar ? (
//           <DispatchImage
//             style={{
//               width: 55,
//               height: 55,
//               borderRadius: 50,
//               borderWidth: 0.7,
//               borderColor: "#ccc",
//             }}
//             source={localAvatar}
//             type={"avatar"}
//             data={{
//               cloudLink: cloudAvatar,
//             }}
//           />
//         ) : (
//           <Image
//             source={DefaultAvatar}
//             style={{
//               width: 55,
//               height: 55,
//               borderRadius: 50,
//             }}
//           />
//         )}

//         <View style={{paddingVertical: 10 }}>
//           <Text
//             style={{
//               // marginTop: 5,
//               color: "#000",
//               fontSize: 17,
//               fontWeight: "500",
//               marginHorizontal: 15,

//             }}
//           >
//             {Someone.name}
//           </Text>
//         </View>

//       </View>

//       <View style={{ paddingVertical: 10,marginLeft:50 }}>
//         <Text
//           style={{
//             color: "#000",
//             // color: "#00A48D91",
//             fontSize: 15,
//             // fontWeight: "500",
//             paddingVertical: 10
//           }}
//         >
//           {setPosition}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

function ThreadMembers() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { Members, myPosition } = useSelector(
    (state) => {
      try {
        const threadMenbers = state.ChatStoredReducer.threadMembers || {};
        const activeThreadId = state.ChatUnstoredReducer.activeThreadId;
        let myInfoIds = state.AuthStoredReducer.myUserInfo._id;
        let Members = threadMenbers[activeThreadId] || {};
        let myPosition = Members[myInfoIds].thread_member_position;

        return {
          Members: Object.values(Members).filter((m) => m.status === 1),
          myPosition,
        };
      } catch (error) {
        return {}
      }
    },
    (prev, next) => isEqual(prev, next)
  );


  let join_condition = useSelector(state => {
    const fullThreads = state.ChatStoredReducer.fullThreads || {};
    const activeThreadId = state.ChatUnstoredReducer.activeThreadId;

    let Thread = fullThreads[activeThreadId];
    if (!Thread) return {}
    return Thread.join_condition
  }, (prev, next) => isEqual(prev, next));


  // let fetchContact = useSelector(
  //   (state) => {

  //     const myFriends = state.FriendStoredReducer.myFriends || {};
  //     const myContacts = state.FriendStoredReducer.myContacts || {};
  //     const myId = state.AuthStoredReducer.myUserInfo._id;
  //     const data = Members.filter((e) => e._id !== myId).map((e) => e._id);

  //     if (!myFriends[data] && !myContacts[data]) {
  //       return data;
  //     }
  //   },
  //   (prev, next) => isEqual(prev, next)
  // );
  // const ActiveThread = useSelector(
  //   (state) => state.ChatUnstoredReducer.activeThreadId
  // );
  // const threadMembers = useSelector(
  //   (state) => state.ChatStoredReducer.threadMembers
  // );
  // const threadNeed = threadMembers[ActiveThread];

  // lỗi làm render hoài

  // useEffect(() => {
  //   dispatch({
  //     type: FriendAction.API_DOWNLOAD_CONTACT,
  //     data: {
  //       ids: fetchContact,
  //     },
  //   });
  // }, [fetchContact]);

  useEffect(() => { }, [Members]);
  const renderItem = ({ item }) => {
    return (
      <ContactElement
        _id={item._id}
        position={item.thread_member_position}
        status={item.status}
        what_doing="render-member"

      />
    );
  };
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#00A48D" />
      <StatusBar backgroundColor="#00A48D" barStyle={"dark-content"} />

      <View
        style={{
          height: 50,
          backgroundColor: "#fff",
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 0.5,
          borderBottomColor: "#ddd",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginRight: 5 }}>
            <TouchableOpacity
              delayPressIn={0}
              delayPressOut={0}
              style={{ padding: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <AntIcon color="#00A48D" size={22} name="arrowleft" style={{}} />
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <View style={{ paddingVertical: 2 }}>
              <Text style={{ fontSize: 17, color: "#000", fontWeight: "500" }}>
                Trang thành viên
              </Text>
            </View>
          </View>
        </View>

        {
          join_condition === "all" ?
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TotalCreateThreadGruop", {
                    ignoreMember: Members,
                  });
                }}
                style={{ marginHorizontal: 20 }}
              >
                <AntDesign name="adduser" size={25} color="#00A48D" style={{}} />
              </TouchableOpacity>
            </View>
            : null
        }
        {
          join_condition === "only_leader" && (myPosition === 1 || myPosition === 3) ?
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TotalCreateThreadGruop", {
                    ignoreMember: Members,
                  });
                }}
                style={{ marginHorizontal: 20 }}
              >
                <AntDesign name="adduser" size={25} color="#00A48D" style={{}} />
              </TouchableOpacity>
            </View>
            : null
        }
      </View>
      <View style={{ backgroundColor: "#ffff" }}>
        {/* <View style={{ marginRight: 5, flexDirection: "row" }}>
          <TouchableOpacity
            delayPressIn={0}
            delayPressOut={0}
            style={{ padding: 10 }}
            onPress={() => navigation.goBack()}
          >
            <AntIcon color="#00A48D" size={22} name="arrowleft" style={{}} />
          </TouchableOpacity>

          <View style={{ paddingVertical: 10 }}>
            <Text style={{ fontSize: 17, color: "#000", fontWeight: "500" }}>
              Thành viên
            </Text>
          </View>
        </View> */}

        {/* <View style={{ backgroundColor: "#fff", borderRadius: 10, margin: 10 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TotalCreateThreadGruop", {
                ignoreMember: Members,
              });
            }}
            style={{
              flexDirection: "row",
              paddingHorizontal: 35,

              // backgroundColor: 'red',
              paddingTop: 10,
              paddingBottom: 10,
            }}
          >
            <AntDesign
              name="adduser"
              size={25}
              color="#00A48D"
              style={{

              }}
            />
            <Text style={{ paddingHorizontal: 27, paddingVertical: 3, fontSize: 17, color: "#00A48D", fontWeight: "400" }}>
              Thêm thành viên
            </Text>
          </TouchableOpacity>
        </View> */}
        <FlatList
          style={{ height: "100%", paddingHorizontal: 10, }}
          data={Members}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

export default React.memo(ThreadMembers, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});
