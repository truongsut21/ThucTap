import React from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import LottieView from "lottie-react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { WIDTH } from "../../chat/controllers/utils";
import { useNavigation } from "@react-navigation/native";

const Anim = require("../../../static/coming-soon.json");

const TodoNoteListScreen = () => {
  const navigation = useNavigation();

  const openCreate = () => {
    navigation.navigate("TodoNoteDetailScreen");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar backgroundColor="#fff" barStyle={"dark-content"} />
      {Platform.OS === "android" ? (
        <Text style={{ marginTop: 30 }}></Text>
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
          <MaterialCommunityIcons
            name="notebook-outline"
            size={18}
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
             công việc
          </Text>
        </View>
        <TouchableOpacity
          onPress={openCreate}
          style={{
            paddingHorizontal: 10,
          }}
        >
          <MaterialCommunityIcons
            name="pencil-plus"
            size={20}
            color={"#00A48D"}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
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
      </View>
    </SafeAreaView>
  );
};

export default TodoNoteListScreen;
