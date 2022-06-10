import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";

const Avatar = () => {
  return (
    <Image
      source={require("../static/avatar.jpg")}
      style={{
        width: 40,
        height: 40,
        borderRadius: 40,
        marginRight: 20,
      }}
    />
  );
};
const SectionMain = ({ textValue, textPlaceholder, navigation }) => {
  // const [disappear, setDisAppear] = useState(false);
  const [text, onChangeText] = useState("Tuyển dụng Frontend");
  const ref = useRef();

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
        // position: "relative"
      }}
    >
      <View
        style={{
          // display: "flex",
          alignItems: "center",
          flexDirection: "row",
          paddingTop: 8,
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: 8,
          backgroundColor: "#fff",
        }}
      >
        <Avatar />
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "900",
              lineHeight: 17,
            }}
          >
            Đức Tuấn
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          // backgroundColor: "red",
          // height: 700,
          // maxHeight: "100%",
        }}
      >
        <TextInput
          ref={(view) => (ref.current = view)}
          placeholder={textPlaceholder}
          placeholderTextColor="#6A6A6A"
          value={textValue ? text : null}
          // autoFocus={true}
          // onBlur={handleBlur}
          // onFocus={handleFocus}
          onChangeText={onChangeText}
          style={{
            flex: 1,
            paddingLeft: 17,
            paddingBottom: 200,
            maxHeight: "100%",
            fontSize: 14,
            lineHeight: 17,
            fontWeight: "500",
            opacity: 0.6,
            // backgroundColor:'red'
          }}
        />
      </View>
    </View>
  );
};

const NewPost = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={[sectionHeaderStyles.sectionHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../static/Vector.png")}
            style={{
              marginRight: 50,
            }}
          />
        </TouchableOpacity>
        <Text style={sectionHeaderStyles.sectionHeaderTitle}>Đăng bài</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PostOption");
          }}
          style={sectionHeaderStyles.sectionHeaderButton}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              lineHeight: 16.94,
            }}
          >
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          flex: 1,
          // height: '100%',
          backgroundColor: "pink",
        }}
      >
        <SectionMain textPlaceholder="Đăng bài viết" />
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: 30,
          // height: 62,
          // borderWidth: 2,
          // borderColor: "#EAEAEA",
          // borderRadius: 30,
          // borderBottomWidth: 0,
          // borderBottomColor: "transparent",
          // borderBottomRightRadius: 0,
          // borderBottomLeftRadius: 0,
          // // position: "absolute",
          // bottom: 0,
          // left: 0,
          // display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          // paddingBottom: 10,
          // marginBottom: insets.bottom,
        }}
      >
        <Ionicons
          color={"#00A48D"}
          style={{
            top: 7,
            left: 1,
            width: 30,
            height: 30,
            textAlign: "center",
            textAlignVertical: "center",
            // color: focused ? "#00A48D" : "#828282",
          }}
          size={25}
          name={"image"}
        />
        <Ionicons
          color={"#00A48D"}
          style={{
            top: 7,
            left: 1,
            width: 30,
            height: 30,
            textAlign: "center",
            textAlignVertical: "center",
            // color: focused ? "#00A48D" : "#828282",
          }}
          size={25}
          name={"location"}
        />
      </View>
    </SafeAreaView>
  );
};
const sectionHeaderStyles = StyleSheet.create({
  sectionHeader: {
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
    opacity: 0.9,
    // display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#DFDFDF",
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 19.36,
  },
  sectionHeaderButton: {
    color: "black",
    backgroundColor: "#37EFA2",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 8,
  },
});
export default NewPost;
