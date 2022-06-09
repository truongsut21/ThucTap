import React, { useEffect, useState, useRef } from "react";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import LottieView from 'lottie-react-native';
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WIDTH, HEIGHT } from "../../controllers/utils";
import Friend from "../../../friend/component/Friend";
import { Platform } from "react-native";
import * as ActionBase from "../../../base/controllers/actionTypes";
import * as Action from "../../controllers/actionTypes";
import * as ActionAUTH from "../../../auth/controllers/actionTypes";
var ObjectID = require("bson-objectid");
import DocumentPicker, { types } from "react-native-document-picker";

// const PollAnim = require("../../../../static/graph-animation.json");

// const Poll = ({ onClickPoll }) => {
//     return <View style={{
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//     }}>
//         <LottieView source={PollAnim} style={{
//             height: HEIGHT * 3 / 5 - 200,
//         }} autoPlay loop />
//         <TouchableOpacity style={{
//             width: WIDTH - 30,
//             marginHorizontal: 15,
//             marginVertical: 10,
//             paddingVertical: 15,
//             backgroundColor: '#00A48D',
//             borderRadius: 10,
//             alignItems: 'center'
//         }}
//             onPress={onClickPoll}>
//             <Text style={{
//                 fontSize: 17,
//                 fontWeight: '600',
//                 color: '#fff',

//             }}>
//                 Tạo bình chọn
//             </Text>
//         </TouchableOpacity>
//     </View>;
// }

const ShareContact = ({ thread_id, height, triggerEventAfterClickElement }) => {
  return (
    <Friend
      thread_id={thread_id}
      Height={height}
      triggerEventAfterClickElement={triggerEventAfterClickElement}
    />
  );
};

const MoreInput = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeThreadId = useSelector(
    (state) => state.ChatUnstoredReducer.activeThreadId
  );

  const myUserId = useSelector(
    (state) => state.AuthStoredReducer.myUserInfo._id,
  );

  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 0);
  }, []);

  useEffect(() => {
    if (!activeThreadId) {
      navigation.goBack();
    }
  }, [activeThreadId]);

  const close = () => {
    setShow(false);
    // setTimeout(() => {
    //   navigation.goBack();
    // }, 50);
    navigation.goBack();
  };

  const onClickPoll = () => {
    dispatch({
      type: ActionBase.NAVIGATE_NEXT_SCREEN_AFTER_AMOUNT_OF_TIME,
      navigation: navigation,
      data: {
        screen: "Poll",
        params: {},
        waitTime: 400,
      },
    });
    close();
  };

  const onClickFriend = () => {
    dispatch({
      type: ActionBase.NAVIGATE_NEXT_SCREEN_AFTER_AMOUNT_OF_TIME,
      navigation: navigation,
      data: {
        screen: "FriendList",
        params: { thread_id: activeThreadId },
        waitTime: 400,
      },
    });
    close();
  };

  // const triggerEventAfterClickElement = () => {
  //     navigation.goBack();
  // }


  const selectFile = async () => {
    try {
      const arg = await DocumentPicker.pick({
        presentationStyle: "fullScreen",
        type: [types.allFiles],
        allowMultiSelection: true,
      });
      if (arg && arg.length > 0 && arg.length < 2) {
        let changekb = 1024 * 1024;
        let size = Math.floor(arg[0].size / changekb)
        if(size>100){
        dispatch({
          type: ActionAUTH.UPDATE_NOTIFICATION,
          data: `Dung lượng file quá lớn ${size}MB > 100MB`
        })
        }else{
          _sendFile(arg);
        }
        close();
        
      }
      // else if (arg && arg.length > 0 && arg.length < 2 && arg[0].size) {
      //   let changekb = 1024 * 1024;
      //   let size = Math.floor(arg[0].size / changekb)
      //   console.log(size)
      //   this.props.dispatch({
      //     type: ActionBase.UPDATE_NOTIFICATION,
      //     data: `Dung lượng file quá lớn ${size}MB > 100MB`
      //   })
      // }∂
    } catch (err) {
    }
  };

  const _sendFile = (chosenFiles) => {
    const currentTime = Date.parse(new Date());
    const draft_id = ObjectID().toString();
    const data = {
      _id: draft_id,
      draft_id,
      parent_id: "",
      thread_id: activeThreadId,
      create_uid: myUserId,
      create_date: currentTime,
    };
    // const splitLinkByDot = chosenFiles[0].uri.split('//');
    const file = new File(
      [],
      `${chosenFiles[0].name}`,
      { type: chosenFiles[0].type }
    );
    if (chosenFiles.length === 1) {
      let content = {
        _id: ObjectID().toString(),
        link: chosenFiles[0].uri,
        filename: chosenFiles[0].name,
        originalfilename: chosenFiles[0].name,
        localFileBuffer: file,
        metadata: "",
        type: chosenFiles[0].type,
        fileSize: chosenFiles[0].size,
        type: chosenFiles[0].type
      };
      dispatch({
        type: Action.CREATE_DRAFT_MESSAGE,
        data: { ...data, content: { ...content }, type: "file" },
        dispatch: dispatch,
      });
    }
    
  };


  return (
   
      <Modal
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        isVisible={show}
        avoidKeyboard={true}
        backdropOpacity={0.5}
        useNativeDriver={true}
        useNativeDriverForBackdrop={true}
        style={{ margin: 0 }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            flexDirection: "row", //bắt buộc phải có cái này
            alignItems: "flex-end",
          }}
          onPress={close}
        >
          <View
            style={[
              {
                flex: 1,
                height: 220,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                backgroundColor: "#fff",
                paddingBottom: insets.bottom,
              },
            ]}
          >
            <View style={{ height: 10 }} />
            <TouchableOpacity
              onPress={onClickPoll}
              style={{
                flexDirection: "row",
                height: 60,
                marginHorizontal: 10,
              }}
            >
              <View
                style={{
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesome5 color="#333" size={25} name="poll-h" />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#333",
                    fontSize: 15,
                  }}
                >
                  Tạo bình chọn
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClickFriend}
              style={{
                flexDirection: "row",
                height: 60,
                marginHorizontal: 10,
              }}
            >
              <View
                style={{
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons color="#333" size={25} name="ios-people-sharp" />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#333",
                    fontSize: 15,
                  }}
                >
                  Chia sẻ danh thiếp
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={selectFile}
              style={{
                flexDirection: "row",
                height: 60,
                marginHorizontal: 10,
              }}
            >
              <View
                style={{
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons color="#333" size={25} name="link" />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#333",
                    fontSize: 15,
                  }}
                >
                  Gửi file
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ height: 10 }} />
          </View>
        </TouchableOpacity>
      </Modal>
   
  );
//   return (
//     <View>
//       <Animated.View
//         style={{
//           height: HEIGHT,
//           width: WIDTH,
//           backgroundColor: "#aaa",
//           opacity: opacityRef,
//         }}
//       >
//         <TouchableOpacity
//           onPress={close}
//           style={{
//             // flex: 1,
//             height: HEIGHT,
//             width: WIDTH,
//           }}
//         ></TouchableOpacity>
//       </Animated.View>
//       {/* <View style={{
             
//         }}> */}

//       <Animated.View
//         style={{
//           position: "absolute",
//           zIndex: 1,
//           height:
//             Platform.OS === "android" ? (HEIGHT * 4) / 6 : (HEIGHT * 3) / 5,
//           width: WIDTH,
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//           backgroundColor: "#fff",
//           transform: [
//             {
//               translateY: translateYRef,
//             },
//           ],
//         }}
//       >
//         <View
//           style={{
//             height: (HEIGHT * 3) / 5 - 50,
//           }}
//         >
//           {action === "poll" ? (
//             <Poll onClickPoll={onClickPoll} />
//           ) : (
//             <ShareContact
//               thread_id={activeThreadId}
//               height={(HEIGHT * 3) / 5 - 50}
//               triggerEventAfterClickElement={triggerEventAfterClickElement}
//             />
//           )}
//         </View>
//         <View
//           style={{
//             position: "absolute",
//             bottom: 50, // //////
//             width: WIDTH,
//             height: 50,
//             borderTopWidth: 0.5,
//             borderTopColor: "#d3d3d3",
//             flexDirection: "row",
//             justifyContent: "space-around",
//             alignItems: "center",
//           }}
//         >
//           <TouchableOpacity
//             style={{
//               flex: 1,
//             }}
//             activeOpacity={1}
//             onPress={() => setAction("poll")}
//           >
//             <FontAwesome5
//               style={{
//                 textAlign: "center",
//                 textAlignVertical: "center",
//                 color: action === "poll" ? "#00A48D" : "#828282",
//               }}
//               size={25}
//               name="poll-h"
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               flex: 1,
//             }}
//             activeOpacity={1}
//             onPress={() => setAction("contact")}
//           >
//             <Ionicons
//               style={{
//                 textAlign: "center",
//                 textAlignVertical: "center",
//                 color: action === "contact" ? "#00A48D" : "#828282",
//               }}
//               size={25}
//               name={
//                 action === "contact" ? "ios-people-sharp" : "ios-people-outline"
//               }
//             />
//           </TouchableOpacity>
//         </View>
//       </Animated.View>
//       {/* </View> */}
//     </View>
//   );
 };

export default MoreInput;
