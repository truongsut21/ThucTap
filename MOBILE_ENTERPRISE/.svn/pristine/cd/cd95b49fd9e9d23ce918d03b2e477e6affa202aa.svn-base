import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  UIManager,
  ImageBackground,
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../static/styles";
import { useNavigation, useRoute } from "@react-navigation/core";
import * as AuthAction from "../controllers/actionTypes";
var _ = require("lodash");
var image = require("../static/logo2.png");
import AntDesign from "react-native-vector-icons/AntDesign";
var background_image = require("../static/background_image.png");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SignInStep2 = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const userId = route.params.user_id;
  const username = route.params.username;

  const [loadingSignIn, setLoadingSignIn] = useState(false);
  // show bang nhap code
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showShowLogo, setShowShowLogo] = useState(true);

  const [securityCode, setSecurityCode] = useState("");
  const [error, setError] = useState("");

  const [code1, setCode1] = useState(securityCode ? securityCode[0] : "");
  const [code2, setCode2] = useState(securityCode ? securityCode[1] : "");
  const [code3, setCode3] = useState(securityCode ? securityCode[2] : "");
  const [code4, setCode4] = useState(securityCode ? securityCode[3] : "");
  const [code5, setCode5] = useState(securityCode ? securityCode[4] : "");
  const [code6, setCode6] = useState(securityCode ? securityCode[5] : "");
  const code1Ref = useRef();
  const code2Ref = useRef();
  const code3Ref = useRef();
  const code4Ref = useRef();
  const code5Ref = useRef();
  const code6Ref = useRef();

  const onChangeUsername = (text) => {
    setSecurityCode(text);
  };

  // //////////////////////////////////

  // //////////////////////////
  //RENDER LOGO
  const renderLogo = () => {
    return (
      <View
        style={{
          marginTop: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image style={styles.ae} source={image} />
        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              fontWeight: "700",
              fontSize: 25,
              color: "#00A48D",
            }}
          >
            Tomchat
          </Text>
        </View>
      </View>
    );
  };
  const forwardAction = () => {
    setSecurityCode(`${code1}${code2}${code3}${code4}${code5}${code6}`);
    dispatch({
      type: AuthAction.API_SEND_SECURITY_CODE_FOR_SIGNUP_NEW,
      data: {
        userId,
        securityCode: `${code1}${code2}${code3}${code4}${code5}${code6}`,
      },
      setError,
      setLoadingSignIn,
      navigation
    });
    // Keyboard.dismiss();
  };

  const handleResendCode = () => {
    dispatch({
      type: AuthAction.API_RESEND_CODE,
      data: {
        username: username,
      },
    });
    // Keyboard.dismiss();
  };

  const handleKeyPress = (e) => { };

  // render footer
  const renderFooter = () => {
    if (!showKeyboard) {
      return (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            //  paddingTop: 20,
            //  paddingBottom: 20,
            position: "absolute",
            bottom: 10,
          }}
        >
          <View
            style={{
              // backgroundColor: "#fff",
              padding: 7,
              alignItems: "center",

              // borderRadius: 20,
              // borderWidth: 2,
              // borderColor: '#00A48D'
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#aaa",
                fontWeight: "500",
              }}
            >
              Bởi
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#00A48D",
                fontWeight: "600",
              }}
            >
              TOMAHO JSC.
            </Text>
          </View>
        </View>
      );
    }
    return null;
  };

  const handleOffLogo = () => {
    setShowShowLogo(false);
  };
  const handleOnLogo = () => {
    setShowShowLogo(true);
  };


  return (
    <View>
      <ImageBackground
        source={background_image}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <SafeAreaView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "padding"}
            keyboardVerticalOffset={Platform.OS === "android" ? -500 : 20}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  height: "100%",
                  paddingHorizontal: 15,
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
                  <TouchableOpacity
                    delayPressIn={0}
                    delayPressOut={0}
                    style={{
                      width: 50,
                    }}
                    onPress={() => navigation.goBack()}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <AntDesign
                        color="#000000"
                        size={22}
                        name="left"
                      />
                      <Text style={{ color: "#00A48D", fontSize: 15 }}>
                        Back
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ width: 50 }}></View>
                </View>
                {renderLogo()}
                <View style={{
                  marginTop: 20,
                }}>
                  <Text> Vui lòng nhập mã xác thực của bạn được gửi đến email</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    marginTop: 20,
                  }}
                >
                  <React.Fragment>
                    <View
                      style={{
                        height: 45,
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          width: "100%",

                        }}
                      >
                        <TextInput
                          keyboardType='numeric'
                          onFocus={handleOffLogo}
                          onBlur={handleOnLogo}
                          ref={code1Ref}
                          value={code1}
                          data={1}
                          onKeyPress={handleKeyPress}
                          onChangeText={(e) => {
                            if (e.length > 1) {
                              code2Ref.current.focus();
                            } else {
                              setCode1(e);
                              if (e.length === 1) {
                                code2Ref.current.focus();
                              }
                            }
                          }}
                          style={{
                            width: 38,
                            height: 40,
                            textAlign: "center",
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: "#00A48D",
                            fontSize: 22,
                            padding: 0,
                            color: "#00A48D",
                          }}
                        />
                        <TextInput
                          keyboardType='numeric'
                          onFocus={handleOffLogo}
                          onBlur={handleOnLogo}
                          ref={code2Ref}
                          value={code2}
                          onKeyPress={handleKeyPress}
                          onChangeText={(e) => {
                            if (e.length > 1) {
                              code3Ref.current.focus();
                            } else {
                              setCode2(e);
                              if (e.length === 1) {
                                code3Ref.current.focus();
                              }
                            }
                          }}
                          style={{
                            width: 38,
                            height: 40,
                            textAlign: "center",
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: "#00A48D",
                            fontSize: 22,
                            padding: 0,
                            color: "#00A48D",
                          }}
                        />
                        <TextInput
                          keyboardType='numeric'
                          onFocus={handleOffLogo}
                          onBlur={handleOnLogo}
                          ref={code3Ref}
                          value={code3}
                          onKeyPress={handleKeyPress}
                          onChangeText={(e) => {
                            if (e.length > 1) {
                              code4Ref.current.focus();
                            } else {
                              setCode3(e);
                              if (e.length === 1) {
                                code4Ref.current.focus();
                              }
                            }
                          }}
                          style={{
                            width: 38,
                            height: 40,
                            textAlign: "center",
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: "#00A48D",
                            fontSize: 22,
                            padding: 0,
                            color: "#00A48D",
                          }}
                        />
                        <TextInput
                          keyboardType='numeric'
                          onFocus={handleOffLogo}
                          onBlur={handleOnLogo}
                          ref={code4Ref}
                          value={code4}
                          onKeyPress={handleKeyPress}
                          onChangeText={(e) => {
                            if (e.length > 1) {
                              code5Ref.current.focus();
                            } else {
                              setCode4(e);
                              if (e.length === 1) {
                                code5Ref.current.focus();
                              }
                            }
                          }}
                          style={{
                            width: 38,
                            height: 40,
                            textAlign: "center",
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: "#00A48D",
                            fontSize: 22,
                            padding: 0,
                            color: "#00A48D",
                          }}
                        />
                        <TextInput
                          keyboardType='numeric'

                          onFocus={handleOffLogo}
                          onBlur={handleOnLogo}
                          ref={code5Ref}
                          value={code5}
                          onKeyPress={handleKeyPress}
                          onChangeText={(e) => {
                            if (e.length > 1) {
                              code6Ref.current.focus();
                            } else {
                              setCode5(e);
                              if (e.length === 1) {
                                code6Ref.current.focus();
                              }
                            }
                          }}
                          style={{
                            width: 38,
                            height: 40,
                            textAlign: "center",
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: "#00A48D",
                            fontSize: 22,
                            padding: 0,
                            color: "#00A48D",
                          }}
                        />
                        <TextInput
                          keyboardType='numeric'
                          onFocus={handleOffLogo}
                          onBlur={handleOnLogo}
                          ref={code6Ref}
                          value={code6}
                          onKeyPress={handleKeyPress}
                          onChangeText={(e) => {
                            if (e.length <= 1) {
                              setCode6(e);
                            }
                          }}
                          style={{
                            width: 38,
                            height: 40,
                            textAlign: "center",
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: "#00A48D",
                            fontSize: 22,
                            padding: 0,
                            color: "#00A48D",
                          }}
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={forwardAction}
                      style={{
                        height: 45,
                        flexDirection: "row",
                        marginBottom: 5,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#00A48D",
                        marginTop: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#00A48D",
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "700",
                        }}
                      >
                        Tiếp tục
                      </Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity
                      onPress={handleResendCode}
                      style={{
                        flexDirection: "row",
                        marginBottom: 5,
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "700",
                          color: "#00A48D",
                        }}
                      >
                        Gửi lại mã
                      </Text>
                    </TouchableOpacity>*/}
                    {error.length > 0 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          marginBottom: 5,
                          marginTop: 20,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#ddd",
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: '#00A48D',
                        }}
                      >
                        <Text
                          style={{
                            color: "red",
                            padding: 10,
                          }}
                        >
                          Mã xác thực không tồn tại
                        </Text>
                      </View>
                    ) : null}
                  </React.Fragment>
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 80,
                    position: "relative",
                    bottom: 10,
                  }}
                >
                  {showShowLogo ? renderFooter() : null}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
        {loadingSignIn ? (
          <View
            style={{
              padding: 10,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#00A48D",
                width: 40,
                height: 40,
                borderRadius: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator size="small" color={"#fff"} />
            </View>
          </View>
        ) : null}
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

export default SignInStep2;
