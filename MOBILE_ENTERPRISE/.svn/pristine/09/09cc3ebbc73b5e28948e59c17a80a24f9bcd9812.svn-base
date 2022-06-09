import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";

import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../controllers/actionTypes";
import * as AuthAction from "../../auth/controllers/actionTypes";

const EditECard = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [checkEdit, setCheckEdit] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const EditECard = route.params.myECard;
  const [textInput, setTextInput] = useState({
    data_name: "",
    data_website: "",
    data_company_name: "",
    data_job_position: "",
    data_phone: "",
    data_email: "",
    data_address: "",
  });

  useEffect(() => {
    setTextInput(EditECard);
    setCheckBox(EditECard.is_default);
  }, [EditECard]);
  const handleUpdateInFoEcard = () => {
    setCheckEdit(!checkEdit);
    if (!checkEdit) {
      dispatch({
        type: Action.API_UPDATE_INFO_MY_ECARDS,
        data: {
          _id: textInput._id,
          updateData: textInput,
          navigation: navigation,
        },
      });
    }
  };

  const handleCheckBox = () => {
    setToggleCheckBox(true);
  };
  const handleDefaultECard = () => {
    dispatch({
      type: Action.API_UPDATE_DEFAULT_ECARDS,
      data: {
        _id: textInput._id,
      },
      dispatch,
    });
    setToggleCheckBox(false);
    setCheckBox(true);
  };

  const handleTextInput = (text, nameText) => {
    const value = text;
    const name = nameText;
    setTextInput((textInput) => ({ ...textInput, [name]: value }));
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        flex: 1,
        marginBottom: 10,
      }}
    >
      {Platform.OS === "android" ? (
        <Text style={{ marginTop: 25 }}></Text>
      ) : null}
      <View>
        <View
          style={{
            height: 50,
            justifyContent: "center",
            backgroundColor: "#00A48D",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ marginRight: 5 }}>
                <TouchableOpacity
                  delayPressIn={0}
                  delayPressOut={0}
                  style={{ padding: 10 }}
                  onPress={() => navigation.goBack()}
                >
                  <AntIcon color="#fff" size={22} name="arrowleft" style={{}} />
                </TouchableOpacity>
              </View>

              <View style={{}}>
                <View style={{ paddingVertical: 2 }}>
                  <Text
                    style={{ fontSize: 17, color: "#fff", fontWeight: "500" }}
                  >
                    Chỉnh sửa
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={handleUpdateInFoEcard}>
                <Text
                  style={{
                    fontSize: 17,
                    color: "#fff",
                    fontWeight: "500",
                    marginRight: 15,
                  }}
                >
                  {checkEdit ? "Sửa" : "Lưu"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          marginBottom: 5,
          elevation: 3,
          paddingHorizontal: 20,
        }}
      >
        <Image
          source={{
            uri: EditECard && EditECard.ecard_id["full_screenshot_template"],
          }}
          style={{
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
            borderRadius: 5,
            overflow: "hidden",
            height: Platform.OS === "android" ? 190 : 220,

            borderColor: "#ccc",
            borderWidth: 0.5,

            width: "100%",
          }}
        />
      </View>
      <SafeAreaView style={{ paddingHorizontal: 20, flex: 1 }}>
        <ScrollView>
          <View style={styles.viewinfo}>
            <View style={styles.titleview}>
              <MaterialCommunityIcons
                style={styles.titleicon}
                name="home-city"
              />
              <Text style={styles.titletext}>Công Ty</Text>
            </View>
            {!checkEdit ? (
              <View style={styles.inputview}>
                <TextInput
                  style={styles.inputtext}
                  value={textInput.data_company_name}
                  onChangeText={(text) =>
                    handleTextInput(text, "data_company_name")
                  }
                />
              </View>
            ) : (
              <View style={styles.textview}>
                <Text style={styles.text}>{EditECard.data_company_name}</Text>
              </View>
            )}
          </View>
          <View style={styles.viewinfo}>
            <View style={styles.titleview}>
              <FontAwesome style={[styles.titleicon, {}]} name="user" />
              <Text style={styles.titletext}>Tên bạn</Text>
            </View>
            {!checkEdit ? (
              <View style={styles.inputview}>
                <TextInput
                  style={styles.inputtext}
                  value={textInput.data_name}
                  onChangeText={(text) => handleTextInput(text, "data_name")}
                />
              </View>
            ) : (
              <View style={styles.textview}>
                <Text style={styles.text}>{EditECard.data_name}</Text>
              </View>
            )}
          </View>
          <View style={styles.viewinfo}>
            <View style={styles.titleview}>
              <AntDesign style={styles.titleicon} name="creditcard" />
              <Text style={styles.titletext}>Chức vụ</Text>
            </View>
            {!checkEdit ? (
              <View style={styles.inputview}>
                <TextInput
                  style={styles.inputtext}
                  value={textInput.data_job_position}
                  onChangeText={(text) =>
                    handleTextInput(text, "data_job_position")
                  }
                />
              </View>
            ) : (
              <View style={styles.textview}>
                <Text style={styles.text}>{EditECard.data_job_position}</Text>
              </View>
            )}
          </View>
          <View style={styles.viewinfo}>
            <View style={styles.titleview}>
              <FontAwesome style={styles.titleicon} name="phone-square" />
              <Text style={styles.titletext}>Điện thoại</Text>
            </View>
            {!checkEdit ? (
              <View style={styles.inputview}>
                <TextInput
                  style={styles.inputtext}
                  value={textInput.data_phone}
                  onChangeText={(text) => handleTextInput(text, "data_phone")}
                />
              </View>
            ) : (
              <View style={styles.textview}>
                <Text style={styles.text}>{EditECard.data_phone}</Text>
              </View>
            )}
          </View>
          <View style={styles.viewinfo}>
            <View style={styles.titleview}>
              <MaterialIcons style={styles.titleicon} name="email" />
              <Text style={styles.titletext}>Email</Text>
            </View>
            {!checkEdit ? (
              <View style={styles.inputview}>
                <TextInput
                  style={styles.inputtext}
                  value={textInput.data_email}
                  onChangeText={(text) => handleTextInput(text, "data_email")}
                />
              </View>
            ) : (
              <View style={styles.textview}>
                <Text style={styles.text}>{EditECard.data_email}</Text>
              </View>
            )}
          </View>
          <View style={styles.viewinfo}>
            <View style={styles.titleview}>
              <MaterialCommunityIcons style={styles.titleicon} name="web" />
              <Text style={styles.titletext}>Web</Text>
            </View>
            {!checkEdit ? (
              <View style={styles.inputview}>
                <TextInput
                  style={styles.inputtext}
                  value={textInput.data_website}
                  onChangeText={(text) => handleTextInput(text, "data_website")}
                />
              </View>
            ) : (
              <View style={styles.textview}>
                <Text style={styles.text}>{EditECard.data_website}</Text>
              </View>
            )}
          </View>
          <View style={styles.viewinfo}>
            <View style={styles.titleview}>
              <FontAwesome5 style={styles.titleicon} name="map-marker-alt" />
              <Text style={styles.titletext}>Địa chỉ</Text>
            </View>
            {!checkEdit ? (
              <View style={styles.inputview}>
                <TextInput
                  style={styles.inputtext}
                  value={textInput.data_address}
                  onChangeText={(text) => handleTextInput(text, "data_address")}
                />
              </View>
            ) : (
              <View style={styles.textview}>
                <Text style={styles.text}> {EditECard.data_address}</Text>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                width: 20,
                height: 20,
                borderColor: "#00A48D",
                borderRadius: 2,
                borderWidth: 1,
                marginRight: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleCheckBox}
              disabled={checkBox ? true : false}
            >
              {checkBox ? (
                <FontAwesome5 name="check" size={15} color={"#00A48D"} />
              ) : null}
            </TouchableOpacity>

            <Text>Chọn làm e-card mặc định</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal animationType="slide" transparent={true} visible={toggleCheckBox}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Chọn E-Card này làm mặc định</Text>

            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonComfirm]}
                onPress={handleDefaultECard}
              >
                <Text style={styles.textStyle}>Xác nhận</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setToggleCheckBox(false)}
              >
                <Text style={styles.textStyle}>Hủy bỏ</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewinfo: {
    marginBottom: 15,
  },
  titleview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  titletext: {
    fontSize: 14,
    fontWeight: "700",
  },
  titleicon: {
    marginRight: 10,
    fontSize: 20,
    color: "#00A48D",
    marginTop: -3,
    width: 23,
  },
  text: {
    fontSize: 14,
    color: "#000",
    paddingHorizontal: 20,
  },
  textview: {
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
    height: 40,
  },
  inputtext: {
    fontSize: 14,
    color: "#000",
    paddingHorizontal: 20,
    width: "100%",
  },
  inputview: {
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#888",
    backgroundColor: "#fff",
    height: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
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

export default EditECard;
