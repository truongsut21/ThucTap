import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import * as FriendAction from "../controllers/actionType";
import * as ChatAction from "../../chat/controllers/actionTypes";
import FindFriendElement from "./FindFriendElement";

const FindFriend = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // kết quả nhập input tìm kiếm
  const [input, setInput] = useState("");
  //gán kết quả tìm kiếm bạn bè để render flatlist
  const [dataBack, setDataBack] = useState({});
  // tim ban be bang username


  const ClickFindFriend = () => {
    let result = input.toLowerCase();
    dispatch({
      type: FriendAction.API_FIND_FRIEND_BY_USER_NAME,
      data: result,
      setDataBack,
    });
  };


  // lây _id từ kết quả tìm kiếm để kết bạn
  let { _id } = dataBack;
  // xóa data tìm kiếm
  const deleteDataBack = () => {
    setDataBack({});
  };
  //chọn vào kết quả bạn tìm kiếm nhảy qua thread tin nhắn cá nhân 
  const handleChatWithStrange = () => {
    dispatch({
      type: ChatAction.CHAT_WITH_SOMEONE,
      data: { contact_id: _id },
      navigation,
    });
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      {Platform.OS === "android" ? (
        <Text style={{ marginTop: 40 }}></Text>
      ) : null}
      {/* header */}
      <View
        style={{
          height: 50,
          backgroundColor: "#fff",
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: "#ddd",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginRight: 5 }}>
            <TouchableOpacity
              delayPressIn={0}
              delayPressOut={0}
              style={{ padding: 10 }}
              onPress={() => navigation.goBack()}
            >
              <AntIcon color="#00A48D" size={22} name="arrowleft" style={{}} />
            </TouchableOpacity>
          </View>

          <View style={{}}>
            <View style={{ paddingVertical: 2 }}>
              <Text style={{ fontSize: 17, color: "#000", fontWeight: "500" }}>
                Tìm kiếm bạn bè
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/*end header  */}

      {/* new input search */}
      <View
        style={{
          // paddingHorizontal: 10,
          flexDirection: "row",
          paddingTop: 10,
          paddingBottom: 10,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            height: 40,
            // width: "100%",
            flex: 1,
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#eee",
            backgroundColor:"#eee",
            
          }}
        >
          <TextInput
            placeholder="Nhập số điện thoại hoặc email"
            placeholderTextColor="#ccc"
            onChangeText={(e) => setInput(e)}
            value={input}
            style={{
              height: 40,
              fontSize: 16,
              flex: 1,
              color: "#000",
              paddingHorizontal: 10
            }}
          />
          {input.length > 0 ? (
            <TouchableOpacity
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setInput("")}
            >
              <FontAwesome name="remove" size={20} color="#ccc" style={{}} />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={{}} onPress={ClickFindFriend}>
            <View
              style={{
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}
            >
              <Fontisto name="search" size={20} color="#ccc" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/*end new input search */}

      <View style={{ height: "100%" }}>

        {/* render flatlist từ kết quả tìm kiếm, hiện tại data là 1 nên render cứng */}
        {
          Object.values(dataBack).length > 0
            ?
            (<TouchableOpacity onPress={handleChatWithStrange}>
              <FindFriendElement
                deleteDataBack={deleteDataBack}
                dataBack={dataBack}
              />
            </TouchableOpacity>)
            :
            null
        }
      </View>
      {/* kết thúc renderFlatlist */}
    </SafeAreaView>
  );
};

export default FindFriend;
