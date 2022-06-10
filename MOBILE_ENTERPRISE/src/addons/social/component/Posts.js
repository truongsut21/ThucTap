import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { SafeAreaView, View, Image } from "react-native";

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
  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#FFFFFF",
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
            margin: 10,
          }}
        >
          <AvataInfo
            name={user.name}
            time={props.title.create_date}
            img={user.avata}
          />

          <Ionicons
            style={{
              color: "#B7B7B7",
              marginLeft: 10,
              paddingRight: 20,
              paddingBottom: 0,
              boder: 2,
            }}
            size={25}
            name={"ellipsis-horizontal-outline"}
          />
        </View>
        <View style={{ margin: 10, marginTop: 0, marginBottom: 0 }}>
          <Content content={props.title.content} />
        </View>
        <View>
          <Image
            source={{
              uri: `${props.title.img_url}`,
            }}
            style={{
              width: windowWidth - 20,
              height: windowWidth - 20,
              margin: 10,
              marginTop: 5,
              marginBottom: 5,
              resizeMode: "cover",
              borderRadius: 10,
              backgroundColor: "red",
            }}
          />
        </View>
        <IconPost
          comment_count={props.title.comment_count}
          like_count={props.title.like_count}
        />
        <View style={{ backgroundColor: "#C5C5C5", height: 1 }}></View>
        <Comments
          name={user.name}
          time={props.title.create_date}
          img={user.avata}
          hot_comment={props.title.hot_comment}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 2,
              marginLeft: 20,
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://symbols.vn/wp-content/uploads/2021/12/Chia-se-ban-doc-bo-suu-tap-Hinh-dai-dien-avt-hoat-hinh-Anime.jpg",
              }}
              style={{ width: 30, height: 30, borderRadius: 50, marginBottom:10 }}
            />
            <TextInput
              style={{
                height: 17,
                backgroundColor: "#FFFFFF",
                color: "#696969",
                padding: 5,
                paddingLeft: 0,
                fontSize: 15,
                paddingBottom: 10,
                flex: 2,
              }}
              placeholder="Thêm bình luận..."
              placeholderTextColor="#737373"
              size={10}
            />
          </View>

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
