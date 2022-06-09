import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

const ShowNotifiCation = () => {
  const [showThongbao, setShowThongbao] = useState(false);
  let thongbao = useSelector((state) => state.BaseUnstoredReducer.thongbao);
  useEffect(() => {
    if (thongbao && thongbao.length > 0) {
      setShowThongbao(true);
      setTimeout(() => {
        setShowThongbao(false);
      }, 2000);
    } else {
      setShowThongbao(false);
    }
  }, [thongbao]);
  if ((!thongbao && thongbao.length === 0) || !showThongbao) {
    return null;
  } else {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#a1a1a1",
            width: "auto",
            minHeight: 50,
            borderRadius: 10,
            paddingHorizontal: 5,
          }}
        >
          <AntDesign size={25} name="checkcircleo" color="#fff" />
          <Text
            style={{
              fontSize: 16,
              paddingLeft: 4,
              fontWeight: "500",
              // backgroundColor: "pink",
              // height:100
              textAlign: "center",
              color: "#fff",
            }}
          >
            {thongbao}
          </Text>
        </View>
      </View>
    );
  }
};
export default ShowNotifiCation;
