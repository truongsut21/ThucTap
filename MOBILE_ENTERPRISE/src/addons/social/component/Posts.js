import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

import AvataInfo from "./AvataInfo";
import IconPost from "./IconPost";
import Content from "./Content";
import Comments from "./Comments";
import { TextInput } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const user = {
  id: "33",
  name: "Nhat linh",
  avata:
    "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
};

export default function Post(props) {
  console.log(props.title.content)
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#FFFFFF",
          margin: 20,
          marginTop: 10,
          marginBottom: 0,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",

            marginBottom: 0,
            margin: 20,
          }}
        >
          <AvataInfo
            name={user.name}
            time={props.title.create_date}
            img={user.avata}
          />

<Ionicons
        cname="ellipsis-horizontal-outline"
        size={15}
        style={{
          color: "#696969",
        }}
      />
        </View>
        <View style={{ margin: 20, marginTop: 0, marginBottom: 0 }}>
          <Content content={props.title.content}/>
        </View>
        <View>
          <Image
            source={{
              uri: `${props.title.img_url}`,
            }}
            style={{
              maxWidth: "100%",
              height: windowHeight - windowHeight * 0.7,
              margin: 20,
              marginTop: 5,
              marginBottom: 5,
              resizeMode: "contain",
              borderRadius:10,
            }}
          />
        </View>
        <IconPost comment_count= {props.title.comment_count}  like_count= {props.title.like_count}/>
        <View style={{ backgroundColor: "#C5C5C5", height: 1 }}></View>
        <Comments name={user.name} time={props.title.create_date} img={user.avata} hot_comment={props.title.hot_comment}  />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              height: 17,
              backgroundColor: "#FFFFFF",
             
              color: "#696969",
              marginLeft: 30,
              flex: 2,
              padding: 5,
              fontSize: 15,
              paddingBottom:10
            }}
            placeholder="Thêm bình luận..."
            placeholderTextColor="#737373"
            size={10}
          />

          <Ionicons
            color={"red"}
            style={{
              color: "#00A48D",
              paddingBottom: 0,
              border: 0.5,
              marginRight: 20,
            }}
            size={25}
            name={"send-outline"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
