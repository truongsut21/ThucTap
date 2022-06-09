import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Input,
  StyleSheet,
  ImageBackground,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    img: "https://sticker.tomahosoft.com/ecards/vip_2/vip_2_full.png",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    img: "https://sticker.tomahosoft.com/ecards/vip_3/vip_3_full.png",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    img: "https://sticker.tomahosoft.com/ecards/vip_4/vip_4_full.png",
  },
  {
    id: "c1b1-46c2-aed5-3ad53abb28ba",
    img: "https://sticker.tomahosoft.com/ecards/vip_5/vip_5_full.png",
  },
];
//

const ECardOther = ({ ...props }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <ImageBackground
      source={{
        uri: item.img,
      }}
      style={styles.item}
    ></ImageBackground>
  );

  return (
    <SafeAreaView style={{ backgroundColor: "#00A48D", flex: 1 }}>
      {Platform.OS === "android" ? (
        <Text style={{ marginTop: 40 }}></Text>
      ) : null}
      {/* header */}
      <View style={{ flex: 0.5 }}>
        <View
          style={{
            height: 50,
            backgroundColor: "#fff",
            position: "relative",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#00A48D",
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
                  Kho E-Card
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#fff",
          flex: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <SafeAreaView style={{ flex: 1, marginTop: "-20%" }}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 30,
    borderRadius: 15,
    overflow: "hidden",
    height: Platform.OS === "android" ? 180 : 220,
    width: "auto",
    justifyContent: "flex-end",
    borderColor: "#00A48D",
    borderWidth: 1,
    elevation: 2,
  },
  title: {
    fontSize: 32,
    height: 100,
  },
});

export default ECardOther;
