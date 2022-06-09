import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";

import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch } from "react-redux";
import ECardRender from "./ECardRender";
import * as Action from "../controllers/actionTypes";
import { useNavigation } from "@react-navigation/native";

const DEFAULT_MAX_LONG_SIZE = 1004;
const DEFAULT_MAX_SHORT_SIZE = 590;

const ECard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [cardDimension, setCardDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    dispatch({
      type: Action.API_FETCH_MY_ECARDS,
      dispatch,
    });
  }, []);

  const measureBestDimensionForCard = (e) => {
    try {
      const { width, height } = e.nativeEvent.layout;
      //Chỉ cho phép thể hiện card visit trong hinh vuông theo cạnh lớn nhất của card và cạnh nhỏ nhất của layout
      let minSide = Math.min(width, height) * 0.95;
      setCardDimension({
        sideLong: minSide,
        sideShort: (minSide * DEFAULT_MAX_SHORT_SIZE) / DEFAULT_MAX_LONG_SIZE,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const goToStore = () => {
    navigation.navigate("ECardStore");
  };

  const goToECardOther = () => {
    navigation.navigate("ECardOther");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        position: "relative",
      }}
    >
      <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
      {Platform.OS === "android" ? (
        <Text style={{ marginTop: 25 }}></Text>
      ) : null}
      <View
        style={{
          height: 50,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 0.5,
          borderBottomColor: "#ccc",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 2,
            paddingLeft: 10,
          }}
        >
          <Ionicons
            name="md-card-outline"
            size={20}
            style={{
              paddingRight: 5,
            }}
          />
          <Text
            style={{
              fontSize: 18,
              color: "#000",
              fontWeight: "500",
            }}
          >
            Danh thiếp điện tử
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
            }}
            onPress={goToECardOther}
          >
            <AntDesign name="creditcard" size={18} color={"#00A48D"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
            }}
            onPress={goToStore}
          >
            <Fontisto name="shopping-store" size={16} color={"#00A48D"} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        onLayout={measureBestDimensionForCard}
      >
        <ECardRender
          cardDimension={cardDimension}
          defaultDimension={{
            sideLong: DEFAULT_MAX_LONG_SIZE,
            sideShort: DEFAULT_MAX_SHORT_SIZE,
          }}
          goToStore={goToStore}
        />
      </View>
    </SafeAreaView>
  );
};

export default ECard;
