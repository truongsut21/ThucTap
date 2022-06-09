import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  UIManager,
  ImageBackground
} from "react-native";
import * as Action from "../controllers/actionTypes";
import styles from "../static/styles";
import { useNavigation } from "@react-navigation/core";
import Swiper from "react-native-swiper";

var _ = require("lodash");
var image = require("../static/logo2.png");
var image1 = require('../static/fast.png')
var image2 = require('../static/Deversity.png')
var image3 = require('../static/friendly.png')
var image4 = require('../static/security.png')
var background_image = require("../static/background_image.png");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showShowLogo, setShowShowLogo] = useState(true);

  const renderLogo = (index) => {
    return (
      <React.Fragment>
        {showShowLogo ? (
          <View
            style={{
              marginTop: 102,
              alignItems: "center",
              justifyContent: "center",
              // backgroundColor:"red",
            }}
          >
            <Image style={styles.ae} source={index} />
          </View>
        ) : (
          <View style={{ paddingTop: 40 }}></View>
        )}
      </React.Fragment>
    );
  };


    const handleAuth = () =>{
      dispatch({
        type: Action.START_SCREEN,
        data: true
      });
      
      // navigation.navigate("Auth");
    }

  const startOne = (index, title, description) => {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <View>{renderLogo(index)}</View>
        <View style={{ marginTop: 10 }}>
          <Text
            style={{ fontWeight: "600", fontSize: 18, textAlign: "center" }}
          >
            {title}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ textAlign: "center", lineHeight: 20 }}>
            {description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{backgroundColor: '#FFFFFF'}}>
    <ImageBackground source={background_image} resizeMode="cover">
    <View
        horizontal={false}
        style={{ height: "100%", position: "relative" }}
      >
        <Swiper
        autoplay
          showsButtons={false}
          style={{ height: "50%" }}
          activeDot={
            <View
              style={{
                backgroundColor: "#00A48D",
                width: 8,
                height: 8,
                borderRadius: 4,
                marginBottom: 100,
                marginHorizontal: 5,
              }}
            />
          }
          dot={
            <View
              style={{
                backgroundColor: "rgba(0,0,0,.2)",
                width: 5,
                height: 5,
                borderRadius: 4,
                marginBottom: 100,
                marginHorizontal: 5,
              }}
            />
          }
        >
          <View>{startOne(image ,"TomChat", "Ứng dụng chat phổ biến, kết nối cộng đồng. Nhắn tin và gọi điện miễn phí")}</View>
          <View>{startOne(image1 ,"Nhanh chóng", "Tương tác nhanh chóng Dễ dàng truy cập, thao tác đơn giản.")}</View>
          <View>{startOne(image2 ,"Đa dạng", "Nhiều tính năng thú vị đi kèm Cửa hàng E-Card miễn phí, phong phú.")}</View>
          <View>{startOne(image3 ,"Thân thiện", "Giao diện tối giản, dễ sử dụng. Kho sticker phong phú, hoàn toàn miễn phí.")}</View>
          <View>{startOne(image4 ,"Bảo mật", "Bảo mật dữ liệu cao, nền tảng an toàn cho người dùng")}</View>
        </Swiper>
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            borderColor: "#00A48D",
          }}
        >
          <View style={{ width: "100%" }}>
            <View style={{ width: "100%", paddingHorizontal: 20, marginBottom: 20 }}>
              <TouchableOpacity
                style={{
                  height: 45,
                  flexDirection: "row",

                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "#00A48D",
                  marginTop: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#00A48D",
                }}
                onPress={() => {
                  handleAuth()
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "700",
                  }}
                >
                  Bắt đầu ngay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
  </ImageBackground>
    </View>
  );
};

// function mapStateToProps(state) {
//     return {
//         // activeUser: state.AuthStoredReducer.activeUser,
//         // loggedUsers: state.AuthStoredReducer.loggedUsers,
//         errorMessage: state.AuthUnstoredReducer.errorMessage,
//         loadingSignIn: state.AuthUnstoredReducer.loadingSignIn,
//     }
// }
// export default connect(mapStateToProps)(SignIn);

export default SignIn;
