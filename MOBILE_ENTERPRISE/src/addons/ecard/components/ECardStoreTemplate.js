import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import SVGWrapper from "./SVGWrapper";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../chat/controllers/utils";
import * as Action from "../controllers/actionTypes";
import * as AuthAction from "../../auth/controllers/actionTypes";

import { useDispatch, useSelector } from "react-redux";
const ECardStoreTemplate = ({ data, ...props }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const userId = useSelector((state) => state.AuthStoredReducer.myUserInfo._id);

  const dispatch = useDispatch();
  const handleCheckModel = () => {
    setModalVisible(true);
  };
  const handleSaveMyEcard = () => {
    dispatch({
      type: Action.API_SAVE_MY_ECARD,
      data: {
        eCardId: data._id,
        userId: userId,
      },
      dispatch,
    });
    setModalVisible(false);
  };
  return (
    <View style={{}}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          // width: WINDOW_WIDTH / 2,
          // height: WINDOW_WIDTH / 2,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 30,
          marginVertical: 7,
          height: 180,
        }}
        onPress={handleCheckModel}
      >
        <Image
          source={{
            uri: data && data.full_screenshot_template,
          }}
          style={{
            width: "100%",
            height: "100%",
            padding: 20,
            borderRadius: 5,
            borderColor: "#ccc",
            borderWidth: 0.5,
          }}
        />
        {/* <Text style={{ fontSize: 16, fontWeight: "bold" }}>{data.name}</Text> */}
        {/* <SVGWrapper
            uri={data.full_screenshot_template}
            width={1004}
            height={590}
            style={{
                resizeMode: 'contain',
                transform: [{ scale: (WINDOW_WIDTH / 3) / 1009 }]
            }}
        /> */}
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
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Lưu vào E-Card của tôi</Text>

            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button, styles.buttonComfirm]}
                onPress={handleSaveMyEcard}
              >
                <Text style={styles.textStyle}>Xác nhận</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Hủy bỏ</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
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
export default ECardStoreTemplate;
