/* eslint-disable prettier/prettier */
import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import AvataInfo from "./AvataInfo";
import { useNavigation } from "@react-navigation/core";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HearderPost(props) {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderBottomLeftRadius: 50,
      }}
    >
      <View
        style={{
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {}}
          style={{
            borderRadius: 20,
            backgroundColor: "#F2F2F2",

            justifyContent: "center",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginLeft: 14,
            flex: 3,
            Width: windowWidth,
          }}
        >
          <Ionicons
        
            style={{
              color: "#B7B7B7",
              marginLeft: 10,
              paddingBottom: 0,
             
            }}
            size={25}
            name={"search-outline"}
          />
          <Text style={{ padding: 10, color: "#AAA" }}>Tìm kiếm...</Text>
        </TouchableOpacity>

        <Ionicons
          color={"red"}
          style={{
            color: "#B7B7B7",
            marginLeft: 10,
            paddingBottom: 0,
           
          }}
          size={25}
          name={"filter-outline"}
        />
        <Ionicons
          color={"red"}
          style={{
            color: "#B7B7B7",
            marginLeft: 10,
            paddingRight: 20,
            paddingBottom: 0,
         
          }}
          size={25}
          name={"grid-outline"}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 10,
          padding: 14,
          paddingBottom: 5,
        }}
      >
        <Image
          source={{
            uri: "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
          }}
          style={{ width: 34, height: 34, borderRadius: 50 }}
        />
        <TextInput
          placeholder="Đăng bài viết"
          placeholderTextColor="#6A6A6A"
          autoFocus={false}
          onPressIn={() => navigation.navigate("NewPost")}
          style={{
            paddingLeft: 17,
            paddingBottom: 10,
            maxHeight: "100%",
            fontSize: 14,
            fontWeight: "500",
            opacity: 0.6,
            flex: 2,
        
          }}
        />
      </View>
    </View>
  );
}
