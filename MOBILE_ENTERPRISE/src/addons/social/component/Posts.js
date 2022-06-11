import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { Dimensions, Text, TouchableOpacity } from "react-native";
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
            }}
            size={25}
            name={"ellipsis-horizontal-outline"}
          />
        </View>
        <View style={{ margin: 10, marginTop: 0, marginBottom: 0 }}>
          <Content content={props.title.content} />
        </View>
        <View>
          {/* nếu có hình ảnh thì mới render */}
          {props.title.img_url && (
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
          )}
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

        {/* rely comment  */}
        <View style={{ marginLeft: 25 }}>
          <Comments
            name="Đỗ Trường"
            time="1 giờ trước"
            img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG5s-pnpsa-iT5R9xesoXWpOfFwNhRFIzQxQ&usqp=CAU"
            hot_comment="T nghĩ cần thêm cái logo trc ô tìm kím á. 3 Dấu gạch trên tin để thành ... giữa 2 bài viết nên có 1 đoạn trống màu xám hoặc màu gì đó phân ra"
          />
        </View>
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
              flexDirection: "row",
              flex: 2,
              marginLeft: 20,
              marginBottom: 14,
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://symbols.vn/wp-content/uploads/2021/12/Chia-se-ban-doc-bo-suu-tap-Hinh-dai-dien-avt-hoat-hinh-Anime.jpg",
              }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                marginRight: 10,
                // paddingTop:5,
                // marginBottom: 10,
              }}
            />
            <View
              style={{
                borderRadius: 20,
                borderTopEndRadius: 20,
                borderTopLeftRadius: 20,
                height: 40,

                padding: 5,
                paddingLeft: 0,
                fontSize: 15,
                paddingBottom: 8,
                flex: 2,
                borderWidth: 1,
                borderColor: "#00A48D",
                flexDirection: "row",
              }}
            >
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={{
                  // height: 20,
                  backgroundColor: "#FFFFFF",
                  fontSize: 15,
                  flex: 2,
                  // margin: 5,

                  paddingVertical: 7,
                  textAlignVertical: "center",
                  borderWidth: 3,

                  backgroundColor: "pink",
                }}
                placeholder="Thêm bình luận..."
                placeholderTextColor="#737373"
                size={10}
              />

              <Ionicons
                style={{
                  color: "#00A48D",
                  paddingBottom: 0,

                  marginRight: 10,
                }}
                size={25}
                name={"image-outline"}
              />

              <Ionicons
                style={{
                  color: "#00A48D",
                  paddingBottom: 0,

                  marginRight: 10,
                }}
                size={25}
                name={"happy-outline"}
              />
            </View>
          </View>

          <TouchableOpacity style={{ margin: 16 }}>
            <Text
              style={{
                color: "#00A48D",
                fontWeight: "bold",
                textDecorationLine: "underline",
              }}
            >
              Đăng
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
