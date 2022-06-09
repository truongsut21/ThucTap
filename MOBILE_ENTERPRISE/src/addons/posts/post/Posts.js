import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { Dimensions } from "react-native";

import { SafeAreaView, View, Image } from "react-native";

import AvataInfo from "./AvataInfo";
import IconPost from "./IconPost";
import Content from "./Content";
import Comments from "./Comments";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Post(props) {
  return (
    <SafeAreaView>
      <View
        style={{ backgroundColor: "#f0f8ff", margin: 20, borderRadius: 10 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 20,
            marginBottom: 0,
          }}
        >
          <AvataInfo
            name="Nhat linh"
            time="22thg 1,2022"
            img="https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"
          />

          <Feather
            name="align-justify"
            size={30}
            style={{
              color: "#696969",
            }}
          />
        </View>
        <View style={{ margin: 20, marginTop: 0, marginBottom: 0 }}>
          <Content />
        </View>
        <View>
          <Image
            source={{
              uri: "https://res.cloudinary.com/kimwy/image/upload/v1624063424/easyfrontend/lo-trinh-fe_zzhxml.png",
            }}
            style={{
              maxWidth: "100%",
              height: windowHeight - windowHeight * 0.7,
              margin: 20,
              marginTop: 0,
              marginBottom: 0,
              resizeMode: "contain",
            }}
          />
        </View>
        <IconPost />
        <View style={{ backgroundColor: "#000", height: 1 }}></View>
        <Comments
          name="Nhat linh"
          time="22thg 1,2022"
          img="https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"
        />

        <Comments
          name="Nhat linh"
          time="22thg 1,2022"
          img="https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"
        />

        <Comments
          name="Nhat linh"
          time="22thg 1,2022"
          img="https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"
        />
      </View>
    </SafeAreaView>
  );
}
