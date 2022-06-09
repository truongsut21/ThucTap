import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  Modal,
  Pressable,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import LottieView from "lottie-react-native";
import { SvgUri } from "react-native-svg";
// import ECardRecursiveBlock from './ECardRecursiveBlock';
import ECardRendererData from "./ECardRendererData";
import { WIDTH, HEIGHT } from "../../chat/controllers/utils";
import SVGWrapper from "./SVGWrapper";
import AntDesign from "react-native-vector-icons/AntDesign";
import config from "../../../config/config.json";
import { useNavigation } from "@react-navigation/native";

const Anim = require("../../../static/e-card-store.json");
const ScanECardQR = require("../../../static/scan-e-card-qr.json");
const Logo = require("../../auth/static/logo.png");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ECardRender = ({ defaultDimension, cardDimension, goToStore }) => {
  const myECards = useSelector(
    (state) => {
      return state.ECardStoredReducer.myECards;
    },
    (prev, next) => {
      prev !== next;
    }
  );
  const myDefaultEcard = myECards.find((item, index) => {
    if (item.is_default === true) {
      return item;
    }
  });
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [Card, setCard] = useState(myDefaultEcard ? myDefaultEcard : null);
  const [whichShowing, setWhichShowing] = useState("card");
  const ref = useRef(new Animated.Value(0)).current;
  const url = `${config.backend_url}/public/viewECardByLink/${
    Card && Card._id
  }`;
  useEffect(() => {
    setCard(myDefaultEcard ? myDefaultEcard : null);
  }, [myDefaultEcard]);
  const showQR = () => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    // setTimeout(() => {
    setWhichShowing("qr");
    // }, 250);
    // Animated.timing(ref, {
    //     duration: 500,
    //     toValue: 1,
    //     useNativeDriver: true
    // }).start();
  };

  const showCard = () => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    // setTimeout(() => {
    setWhichShowing("card");
    // }, 250);
    // Animated.timing(ref, {
    //     duration: 500,
    //     toValue: 0,
    //     useNativeDriver: true
    // }).start();
  };

  if (!Card || !cardDimension.sideLong) {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          source={Anim}
          style={{
            width: WIDTH / 1.5,
          }}
          autoPlay
          loop
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#00A48D",
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 15,
          }}
          onPress={goToStore}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Đi đến cửa hàng</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const Template = Card.ecard_id;
  const handleQrCode = () => {
    setModalVisible(true);
    // dispatch({
    //   type: Action.QRCode,
    // });
  };
  const goToMyStore = () => {
    navigation.navigate("MyEcard");
  };
  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={whichShowing === "card" ? showQR : showCard}
      >
        {/* {
            whichShowing === 'qr'
                ?
                <View style={{
                    // width: Math.floor(590 / 2),
                    // height: Math.floor(590 / 2),
                    width: Template.is_vertical ? Math.floor(cardDimension.width) : Math.floor(cardDimension.height),
                    height: Template.is_vertical ? Math.floor(cardDimension.height) : Math.floor(cardDimension.width),
                    // padding: 40,
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: WIDTH / 2,
                        height: WIDTH / 2,
                    }}>
                        <QRCode
                            enableLinearGradient={true}
                            linearGradient={['rgb(127,229,215)','rgb(0,131,112)']}
                            value="https://www.tomahosoft.com"
                            size={WIDTH / 2}
                            // logo={Logo}
                            logoSize={WIDTH / 5}
                            logoBackgroundColor='transparent'
                        />
                    </View>
                    <View style={{
                        paddingTop: 40,
                    }}>
                        <Text style={{
                            textAlign: 'center'
                        }}>
                            QUÉT ĐỂ LẤY THÔNG TIN

                        </Text>
                        <Text style={{
                            textAlign: 'center'
                        }}>
                            E-CARD
                        </Text>
                    </View>
                    <View style={{
                        width: WIDTH / 3,
                        height: WIDTH / 3,
                        justifyContent: 'center',
                    }}>
                        <LottieView source={ScanECardQR}
                            style={{
                                width: WIDTH / 3,
                                maxWidth: WIDTH / 3,
                            }}
                            autoPlay
                            loop
                        />
                    </View>
                </View>
                : */}
        <View
          style={
            Platform.OS === "android"
              ? {
                  padding: 0.5,
                  elevation: 30,
                  borderRadius: 5,
                  overflow: "hidden",
                }
              : {
                  shadowColor: "#171717",
                  shadowOffset: { width: -3, height: 3 },
                  shadowOpacity: 0.6,
                  shadowRadius: 3,
                }
          }
        >
          <View
            style={{
              width: Template.is_vertical
                ? Math.floor(cardDimension.sideShort)
                : Math.floor(cardDimension.sideLong),
              height: Template.is_vertical
                ? Math.floor(cardDimension.sideLong)
                : Math.floor(cardDimension.sideShort),
              // transform: [{
              //     rotate: Template.is_vertical ? '0deg' : '90deg',
              // }],
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SVGWrapper
              uri={Template.custom_template}
              style={{
                resizeMode: "contain",
                transform: [
                  { scale: cardDimension.sideLong / defaultDimension.sideLong },
                ],
                width: Template.is_vertical
                  ? defaultDimension.sideShort
                  : defaultDimension.sideLong,
                height: Template.is_vertical
                  ? defaultDimension.sideLong
                  : defaultDimension.sideShort,
              }}
            />
            {Template.input_fields.map((field) => {
              try {
                return (
                  <ECardRendererData
                    key={field.tech_name}
                    content={Card["data_" + field.tech_name]}
                    textStyle={field.textStyle ? field.textStyle : {}}
                    viewStyle={field.wrapperStyle ? field.wrapperStyle : {}}
                    viewPosition={{
                      x:
                        field.position && field.position.x
                          ? Template.is_vertical
                            ? (field.position.x * cardDimension.sideShort) /
                              defaultDimension.sideShort
                            : (field.position.x * cardDimension.sideLong) /
                              defaultDimension.sideLong
                          : 0,
                      y:
                        field.position && field.position.y
                          ? Template.is_vertical
                            ? (field.position.y * cardDimension.sideShort) /
                              defaultDimension.sideShort
                            : (field.position.y * cardDimension.sideLong) /
                              defaultDimension.sideLong
                          : 0,
                    }}
                  />
                );
              } catch (error) {
                return null;
              }
            })}
          </View>
        </View>
        {/* } */}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 40,
              left: 20,
              backgroundColor: "#fff",
              width: 20,
              height: 20,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setModalVisible(false)}
          >
            <AntDesign
              name="close"
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
              }}
              size={15}
            />
          </TouchableOpacity>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              <QRCode
                enableLinearGradient={true}
                linearGradient={["#444", "#111"]}
                value={url}
                size={WIDTH / 2}
                // logo={Logo}
                logoSize={WIDTH / 5}
                logoBackgroundColor="transparent"
              />
            </Text>

            {/* <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonComfirm]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Xác nhận</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Hủy bỏ</Text>
              </Pressable>
            </View> */}
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 15,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#00A48D",
            borderRadius: 60,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 30,
          }}
          onPress={handleQrCode}
        >
          <AntDesign name="qrcode" size={35} color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#00A48D",
            borderRadius: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={goToMyStore}
        >
          <AntDesign name="idcard" size={40} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    position: "relative",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  buttonClose: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    color: "#00A48D",
  },
});
export default ECardRender;
