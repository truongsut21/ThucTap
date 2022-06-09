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
  LayoutAnimation,
  UIManager,
  ScrollView,
  ImageBackground,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Action from "../controllers/actionTypes";
import styles from "../static/styles";
import { useNavigation } from "@react-navigation/core";

var _ = require("lodash");
var image = require("../static/logo2.png");
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

  const [isSignUp, setIsSignUp] = useState(false);

  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [userId, setUserID] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [repassword, setRePassword] = useState("");
  const [name, setName] = useState("");

  // show bang nhap code
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showShowLogo, setShowShowLogo] = useState(true);

  //signUp

  useEffect(() => {
    setIsSignUp(false);
    emptyInputTextSignUp();
  }, []);


  const onChangeUsername = (text) => {
    setUsername(text);
  };

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

  const handleKeyPress = (e) => {};

  // xử lí submit
  const forwardAction = () => {
    if(!isSignUp){
      setLoadingSignIn(true);
    if (!username) {
      dispatch({
        type: Action.UPDATE_ERROR,
        data: {
          error: "Vui lòng điền đầy đủ thông tin",
        },
      });
    } else {
      dispatch({
        type: Action.API_SIGN_IN_NEW,
        data: {
          username: username,
          // password: password,
        },
        setUserID,
        setIsSignUp,
        navigation,
         setLoadingSignIn,
        // setShowNewStepSecurity,
      });
    }
    }
    
    // Keyboard.dismiss();
  };

  const emptyInputTextSignUp = () => {
    setMobile("");
    setPassword("");
    setRePassword("");
    setUsername("");
    setName("");
  };

  const handleSignUp = () => {
    if (password.length < 4 || repassword.length < 4) {
      dispatch({
        type: Action.UPDATE_ERROR,
        data: {
          error: "Mật khẩu có ít nhất 4 kí tự",
        },
      });
      // setTimeout(()=>{
      //   dispatch({
      //     type: Action.CLEAR_ERROR_SUCCESS,
      //   });
      // }, 3000)
    } else if (password !== repassword) {
      dispatch({
        type: Action.UPDATE_ERROR,
        data: {
          error: "Mật khẩu nhập lại không đúng",
        },
      });
      // setTimeout(()=>{
      //   dispatch({
      //     type: Action.CLEAR_ERROR_SUCCESS,
      //   });
      // }, 3000)
    } else {
      setLoadingSignIn(true);
      dispatch({
        type: Action.API_SIGN_UP_NEW,
        data: {
          name: name,
          username: username,
          mobile: mobile,
          password: password,
          email: username,
        },
        // setIsLoading,
        setLoadingSignIn,
        navigation,
        setUserID,
      });
    }
  };

  // render footer
  const renderFooter = () => {
    if (!showKeyboard) {
      return (
        <View
          style={{
            width: "100%",
            height: 80,
            position: "relative",
            bottom: 10,
          }}
        >
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

  const handleSignIn = (isSignUps) => {
    if (isSignUps === false){
      forwardAction();
    }else{
      handleSignUp();
    }
    
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
                }}
              >
                {renderLogo()}
                <ScrollView style={{ marginTop: 30, paddingHorizontal: 15 }}>
                  <View
                    style={{
                      height: 45,
                      flexDirection: "row",
                      marginBottom: 5,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#00A48D",
                    }}
                  >
                    <View
                      style={{
                        height: 45,
                        width: 45,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <MaterialCommunityIcons
                        color="#00A48D"
                        name="email"
                        size={20}
                      />
                    </View>
                    <TextInput
                      // ref={login => this.login = login}
                      autoCapitalize={"none"}
                      style={{
                        flex: 1,
                        color: "#333",
                        paddingVertical: Platform.OS === "android" ? 7 : 12,
                        paddingRight: 10,
                      }}
                      onFocus={handleOffLogo}
                      onBlur={handleOnLogo}
                      placeholder="Nhập email"
                      placeholderTextColor="#737373"
                      onChangeText={onChangeUsername}
                      value={username}
                      editable={true}
                      onSubmitEditing={() => {}}
                      keyboardType="email-address"
                      autoCompleteType="off"
                      autoCorrect={false}
                    />
                  </View>
                  {isSignUp ? (
                    <View>
                      <View
                        style={{
                          height: 45,
                          flexDirection: "row",
                          marginBottom: 5,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: "#00A48D",
                          marginTop: 15,
                        }}
                      >
                        <View
                          style={{
                            height: 45,
                            width: 45,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <MaterialCommunityIcons
                            color="#00A48D"
                            name="account"
                            size={20}
                          />
                        </View>
                        <TextInput
                          // ref={login => this.login = login}
                          autoCapitalize={"none"}
                          onFocus={handleOffLogo}
                          onBlur={handleOnLogo}
                          style={{
                            flex: 1,
                            color: "#333",
                            paddingVertical: Platform.OS === "android" ? 7 : 12,
                            paddingRight: 10,
                          }}
                          placeholder="Nhập họ tên"
                          placeholderTextColor="#737373"
                          onChangeText={(name) => setName(name)}
                          value={name}
                          editable={true}
                          onSubmitEditing={() => {}}
                          keyboardType="email-address"
                          autoCompleteType="off"
                          autoCorrect={false}
                        />
                      </View>
                      <View
                        style={{
                          height: 45,
                          flexDirection: "row",
                          marginBottom: 5,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: "#00A48D",
                          marginTop: 15,
                        }}
                      >
                        <View
                          style={{
                            height: 45,
                            width: 45,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <MaterialCommunityIcons
                            color="#00A48D"
                            name="phone"
                            size={20}
                          />
                        </View>
                        <TextInput
                          onFocus={handleOffLogo}
                          onBlur={handleOnLogo}
                          autoCapitalize={"none"}
                          style={{
                            flex: 1,
                            color: "#333",
                            paddingVertical: Platform.OS === "android" ? 7 : 12,
                            paddingRight: 10,
                          }}
                          placeholder="Số điện thoại"
                          placeholderTextColor="#737373"
                          onChangeText={(mobile) => setMobile(mobile)}
                          value={mobile}
                          editable={true}
                          onSubmitEditing={() => {}}
                          keyboardType="email-address"
                          autoCompleteType="off"
                          autoCorrect={false}
                        />
                      </View>

                      <View
                        style={{
                          height: 45,
                          flexDirection: "row",
                          marginBottom: 5,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: "#00A48D",
                          marginTop: 15,
                        }}
                      >
                        <View
                          style={{
                            height: 45,
                            width: 45,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <MaterialCommunityIcons
                            color="#00A48D"
                            name="lock"
                            size={20}
                          />
                        </View>
                        <TextInput
                          onFocus={handleOffLogo}
                          onBlur={handleOnLogo}
                          // ref={login => this.login = login}
                          autoCapitalize={"none"}
                          style={{
                            flex: 1,
                            color: "#333",
                            paddingVertical: Platform.OS === "android" ? 7 : 12,
                            paddingRight: 10,
                          }}
                          placeholder="nhập mật khẩu"
                          placeholderTextColor="#737373"
                          onChangeText={(password) => setPassword(password)}
                          value={password}
                          editable={true}
                          onSubmitEditing={() => {}}
                          keyboardType="email-address"
                          autoCompleteType="off"
                          autoCorrect={false}
                        />
                      </View>
                      <View
                        style={{
                          height: 45,
                          flexDirection: "row",
                          marginBottom: 5,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: "#00A48D",
                          marginTop: 15,
                        }}
                      >
                        <View
                          style={{
                            height: 45,
                            width: 45,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <MaterialCommunityIcons
                            color="#00A48D"
                            name="lock"
                            size={20}
                          />
                        </View>
                        <TextInput
                          onFocus={handleOffLogo}
                          onBlur={handleOnLogo}
                          // ref={login => this.login = login}
                          autoCapitalize={"none"}
                          style={{
                            flex: 1,
                            color: "#333",
                            paddingVertical: Platform.OS === "android" ? 7 : 12,
                            paddingRight: 10,
                          }}
                          placeholder="nhập lại mật khẩu"
                          placeholderTextColor="#737373"
                          onChangeText={(repassword) =>
                            setRePassword(repassword)
                          }
                          value={repassword}
                          editable={true}
                          onSubmitEditing={() => {}}
                          keyboardType="email-address"
                          autoCompleteType="off"
                          autoCorrect={false}
                        />
                      </View>
                    </View>
                  ) : null}
                  {isSignUp ? (
                    <TouchableOpacity
                      onPress={() => {
                        setIsSignUp(!isSignUp), emptyInputTextSignUp();
                      }}
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#00A48D",
                          fontWeight: "700",
                        }}
                      >
                        {"Đã có tài khoản"}
                      </Text>
                    </TouchableOpacity>
                  ) : null}

                  <TouchableOpacity
                    onPress={()=> handleSignIn(isSignUp)}
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
                      {isSignUp ? "Đăng ký" : "Đăng nhập"}
                    </Text>
                  </TouchableOpacity>
                </ScrollView>

                {showShowLogo ? renderFooter() : null}
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
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
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
