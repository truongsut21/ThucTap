import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Input,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import * as Action from "../controllers/actionTypes";
import * as ActionFriend from "../../friend/controllers/actionType";
import * as ChatAction from "../../chat/controllers/actionTypes";

import DefaultAvatar from "../../chat/static/default_ava.png";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import icon_tomchat from "../../chat/static/icon_tomchat_58x58.png";
import isEqual from "react-fast-compare";

const ECardScan = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const decodeData = route.params.decodeData;
  const [dataInfoECard, setDataInfoECard] = useState({});
  const [messageECard, setMessageECard] = useState("");
  ///
  let indexUrl = "/public/viewECardByLink/";
  let index = decodeData.indexOf("/public/viewECardByLink/");
  const ecardId = decodeData.slice(index + indexUrl.length);
  //
  useEffect(() => {
    dispatch({
      type: Action.API_INFO_OTHER_ECARDS,
      data: ecardId,
      setDataInfoECard,
    });
  }, [ecardId]);
  let _id = dataInfoECard.create_uid;
  const myUserId = useSelector(
    (state) => state.AuthStoredReducer.myUserInfo._id
  );
  const {
    localAvatar,
    cloudAvatar,
    needToDownloadAvatar,
    needToDownloadContact,
    Someone,
  } = useSelector(
    (state) => {
      const imageAvatars = state.ChatStoredReducer.imageAvatars || {};
      const myFriends = state.FriendStoredReducer.myFriends || {};
      const myContacts = state.FriendStoredReducer.myContacts || {};
      //n???u _id ???? c?? trong b???n b?? v?? contact th?? l???y th??ng tin trong reducer
      // l???y h??nh localAvater n???u ch??a c?? localAvatar th?? l???y
      // clouAvart ????? t???i h??nh v??? trong localAvatar ????? show h??nh

      //l???y th??ng tin c???a _id trong myfriend v?? contact reducer
      let Someone = myFriends[_id] || myContacts[_id],
        needToDownloadContact = false,
        localAvatar,
        cloudAvatar,
        needToDownloadAvatar;
      // ch??a c?? ai g??n needtodownloadContact ????? c???p nh???t l???i contact trong reducer
      if (!Someone) {
        return { needToDownloadContact: true };
      } else {
        //tr?????ng h???p c?? Someone
        //ki???m tra Someone c?? avatar_url kh??ng
        if (Someone.avatar_url) {
          //ki???m tra ???? c?? localAvart trong imageAvatar ch??a
          localAvatar = imageAvatars[Someone.avatar_url]; // c?? uri ho???c undefied

          //l???y avartar_url trong Some n???u localAvartar ch??a c?? d??ng n?? ????? call t???i h??nh
          cloudAvatar = Someone.avatar_url;

          // n???u ch??a c?? localAvart th?? needtodownloadAvartar true ????? downd h??nh v???
          needToDownloadAvatar = localAvatar ? false : true;
        } else {
          // kh??ng c?? avartar th?? cho s??i m???c ?????nh h???t kh???i down g?? c???
          // localAvatar = DefaultAvatar;
          // cloudAvatar = DefaultAvatar;
          // needToDownloadAvatar = false;
        }
      }
      return {
        localAvatar,
        cloudAvatar,
        needToDownloadContact,
        needToDownloadAvatar,
        Someone,
      };
    },
    (prev, next) => isEqual(prev, next)
  );
  //x??? l?? m???i k???t b???n
  const handleClickSendInvite = () => {
    dispatch({
      type: ActionFriend.API_SEND_REQUEST,
      data: _id,
    });
  };
  // x??? l?? thu h???i k???t b???n
  const cancelSend = () => {
    dispatch({
      type: ActionFriend.API_CANCEL_SEND,
      data: _id,
    });
  };
  // t??? ch???i l???i k???t b???n
  // const handleDeniInvition = () => {
  //   dispatch({
  //     type: ActionFriend.API_DENIED_REQUEST,
  //     data: _id,
  //   });
  // };
  // x??? l?? ?????ng ?? k???t b???n
  const handleAcceptFriend = () => {
    dispatch({
      type: ActionFriend.API_ACCEPT_FRIEND,
      data: _id,
    });
  };
  //chat v???i someone
  const handleChatWithStrange = () => {
    dispatch({
      type: ChatAction.CHAT_WITH_SOMEONE,
      data: { contact_id: _id },
      navigation,
    });
  };
  const handleCanel = () => {
    route.params.setDecodeData("");
    navigation.goBack();
  };
  const handleSaveOtherECard = () => {
    dispatch({
      type: Action.API_SAVE_OTHER_ECARD,
      data: dataInfoECard._id,
    });
  };
  let showButton = null;
  if (Someone) {
    if (Someone.friend_status === "strange" || !Someone.friend_status) {
      showButton = (
        <TouchableOpacity
          style={[styles.button, styles.buttonComfirm]}
          onPress={handleClickSendInvite}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>K???t b???n</Text>
        </TouchableOpacity>
      );
    }
    if (
      Someone &&
      Someone.friend_status === "invitation" &&
      Someone.user_id_invite !== _id
    ) {
      showButton = (
        <TouchableOpacity
          style={[styles.button, styles.buttonComfirm]}
          onPress={cancelSend}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>Thu h???i</Text>
        </TouchableOpacity>
      );
    }
    if (
      Someone &&
      Someone.friend_status === "invitation" &&
      Someone.user_id_invite === Someone._id
    ) {
      showButton = (
        <TouchableOpacity
          style={[styles.button, styles.buttonComfirm]}
          onPress={handleAcceptFriend}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>?????ng ??</Text>
        </TouchableOpacity>
      );
    }
    if (Someone && Someone.friend_status === "friend") {
      showButton = (
        <TouchableOpacity
          style={[styles.button, styles.buttonComfirm]}
          onPress={handleChatWithStrange}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>Nh???n tin</Text>
        </TouchableOpacity>
      );
    }
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#AFEEEE",
      }}
    >
      <View
        style={{
          backgroundColor: "#00A48D",
          justifyContent: "center",
          flex: 0.5,
          position: "relative",
          alignItems: "center",
        }}
      >
        {Platform.OS === "android" ? (
          <Text style={{ marginTop: 25 }}></Text>
        ) : null}
        {/* header */}
        <View
          style={{
            backgroundColor: "#00A48D",

            position: "absolute",
            top: 50,
            right: 0,
            left: 0,
          }}
        >
          <View
            style={{
              height: 50,

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  marginRight: 5,
                }}
              >
                <TouchableOpacity
                  delayPressIn={0}
                  delayPressOut={0}
                  style={{ padding: 10 }}
                  onPress={handleCanel}
                >
                  <AntIcon color="#fff" size={22} name="arrowleft" style={{}} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Image
          source={DefaultAvatar}
          style={{
            height: 110,
            width: 110,
            borderRadius: 55,
            marginBottom: 10,
          }}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: "#fff",
          }}
        >
          {dataInfoECard.data_name}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            color: "#fff",
          }}
        >
          {dataInfoECard.data_job_position}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          // wordWrap: "",

          marginHorizontal: 20,
          marginVertical: 15,
          borderRadius: 5,
          padding: 5,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#00A48D",

              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Image
              source={icon_tomchat}
              style={{
                color: "#fff",
                fontSize: 15,
                fontWeight: "600",
              }}
            />
          </View>
          <View
            style={{
              flexShrink: 1,
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              {dataInfoECard.data_name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#555",
              }}
            >
              {dataInfoECard.data_email}
            </Text>
          </View>
        </View>
      </View>
      <SafeAreaView
        style={{
          marginHorizontal: 20,
          flex: 0.5,
          backgroundColor: "#AFEEEE",
        }}
      >
        <ScrollView style={{}}>
          <View style={styles.viewtext}>
            <MaterialCommunityIcons style={styles.texticons} name="home-city" />
            <Text style={styles.text}>{dataInfoECard.data_company_name}</Text>
          </View>
          <View style={styles.viewtext}>
            <FontAwesome style={styles.texticons} name="phone-square" />
            <Text style={styles.text}>{dataInfoECard.data_phone}</Text>
          </View>
          <View style={styles.viewtext}>
            <MaterialIcons style={styles.texticons} name="email" />

            <Text style={styles.text}>{dataInfoECard.data_email}</Text>
          </View>
          <View style={styles.viewtext}>
            <MaterialCommunityIcons style={styles.texticons} name="web" />

            <Text style={styles.text}>{dataInfoECard.data_website}</Text>
          </View>
          <View style={styles.viewtext}>
            <FontAwesome5 style={styles.texticons} name="map-marker-alt" />
            <Text style={styles.text}>{dataInfoECard.data_address}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {myUserId === _id ? (
          <TouchableOpacity
            disabled
            style={{
              borderRadius: 10,
              padding: 10,
              elevation: 2,
              margin: 10,
              width: 200,
              backgroundColor: "#00A48D",
            }}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>
              ????y l?? E-Card c???a b???n !
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.buttonSave]}
              onPress={handleSaveOtherECard}
            >
              <Text style={[styles.buttonText, { color: "#00A48D" }]}>
                L??u E-Card
              </Text>
            </TouchableOpacity>
            {showButton}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewtext: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 7,
    borderRadius: 5,
    elevation: 20,
  },
  texticons: {
    color: "#00A48D",
    width: 35,
    fontSize: 20,
  },
  text: {
    fontSize: 16,
    wordWrap: "break-word",
    width: "90%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 10,
    width: 100,
  },
  buttonComfirm: {
    backgroundColor: "#00A48D",
  },
  buttonSave: {
    backgroundColor: "#fff",
  },
  buttonText: {
    textAlign: "center",
  },
});

export default ECardScan;
