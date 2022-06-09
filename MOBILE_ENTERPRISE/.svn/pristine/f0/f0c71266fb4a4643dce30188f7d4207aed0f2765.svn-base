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
import { useSelector } from "react-redux";
import isEqual from "react-fast-compare";

const MyEcard = ({ ...props }) => {
  const navigation = useNavigation();
  const myECards = useSelector(
    (state) => {
      return state.ECardStoredReducer.myECards;
    },
    (prev, next) => {
      prev !== next;
    }
  );

  const renderItem = ({ item }) => {
    return (
      <ImageBackground
        resizeMode="cover"
        source={{
          uri: item && item.ecard_id["full_screenshot_template"],
        }}
        style={styles.item}
      >
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: item && item.is_default ? "#00A48D" : "red",

              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => handleGoToEdit(item)}
          >
            <FontAwesome5
              name="pen"
              size={15}
              style={{
                color: "#fff",
              }}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };
  const handleGoToEdit = (item) => {
    navigation.navigate("EditECard", { myECard: item });
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#00A48D", flex: 1 }}>
      {Platform.OS === "android" ? (
        <Text style={{ marginTop: 25 }}></Text>
      ) : null}
      {/* header */}
      <View style={{ flex: 0.4 }}>
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
                  E-Card của tôi
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
        <SafeAreaView style={{ flex: 1, marginTop: "-12%" }}>
          <FlatList
            data={myECards}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20,
    overflow: "hidden",
    height: Platform.OS === "android" ? 190 : 220,
    width: "auto",
    justifyContent: "flex-end",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    elevation: 2,
    position: "relative",
  },
  title: {
    fontSize: 32,
    height: 100,
  },
});

export default MyEcard;
