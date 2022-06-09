import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as AuthAction from "../controllers/actionTypes";
import Octicons from "react-native-vector-icons/Octicons";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/core";

const ShowCodeConfirm = ({
  userId,
  showNewStepSecurity,
  setShowNewStepSecurity,
}) => {
  const dispatch = useDispatch();

  //lưu mã code khi nhập vào
  const [securityCode, setSecurityCode] = useState("");
  const [error, setError] = useState("");

  // xác nhận mã code khi đã nhập vào
  const confirmSecurityCode = () => {
    dispatch({
      type: AuthAction.API_SEND_SECURITY_CODE_FOR_LOGIN,
      data: {
        userId,
        securityCode: securityCode,
      },
      setShowNewStepSecurity,
      setError,
    });
  };

  // tắt modal show code
  const handleCancelModel = () => {
    setShowNewStepSecurity(false);
    setSecurityCode("");
  };
  // nhập mã lưu vào sercurity code
  const handleEnterCode = (value) => {
    setSecurityCode(value);
  };

  return (
    <Modal
      isVisible={showNewStepSecurity}
      onBackButtonPress={handleCancelModel}
      onBackdropPress={handleCancelModel}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          width: "70%",
          height: "auto",
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            paddingVertical: 10,
          }}
        >
          {error.length > 0 ? (
            <Text
              style={{
                color: "red",
                textAlign: "center",
              }}
            >
              {error}
            </Text>
          ) : (
            <Text style={{ fontSize: 17, fontWeight: "600" }}>
              Nhập mã xác nhận từ email
            </Text>
          )}

          <TextInput
            style={{
              marginTop: 10,
              paddingHorizontal: 10,
              borderRadius: 5,
              backgroundColor: "#f3f3f3",
              height: 40,
              color: "#000",
              width: "100%",
            }}
            placeholder="Nhập mã..."
            onChangeText={handleEnterCode}
            value={securityCode}
          />
        </View>
        <View
          style={{
            // backgroundColor:"#ccc",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",

            // paddingVertical: 10,
            // backgroundColor:"#ccc",
            paddingVertical: 5,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#00A48D",
              paddingVertical: 4,
              paddingHorizontal: 6,

              borderRadius: 10,
            }}
            onPress={confirmSecurityCode}
          >
            <Text
              style={{
                color: "#fff",

                fontSize: 16,
              }}
            >
              Đồng ý
            </Text>
          </TouchableOpacity>
          {/* <View style={{ backgroundColor: "#ddd", height: 30, width: 1 }}></View> */}
          <TouchableOpacity
            style={{
              padding: 4,
            }}
            onPress={handleCancelModel}
          >
            <Text
              style={{
                color: "red",
                fontSize: 16,
                paddingVertical: 4,
                paddingHorizontal: 6,
                borderWidth: 0.5,
                borderRadius: 10,
                borderColor: "red",
              }}
            >
              Hủy bỏ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ShowCodeConfirm;
