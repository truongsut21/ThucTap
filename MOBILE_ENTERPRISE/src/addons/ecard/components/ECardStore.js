import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";

import Fontisto from "react-native-vector-icons/Fontisto";
import { useDispatch } from "react-redux";
import ECardStoreTemplate from "./ECardStoreTemplate";
import * as Action from "../controllers/actionTypes";

const TITLE = [
  {
    id: "1",
    title: "Tất cả",
  },
  {
    id: "2",
    title: "Thời trang",
  },
  {
    id: "3",
    title: "F&B",
  },
  {
    id: "4",
    title: "Thiết kế",
  },
  {
    id: "5",
    title: "Xây dựng",
  },
];
const ECardStore = ({ ...props }) => {
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [idTitle, setIdTitle] = useState("1");

  useEffect(() => {
    dispatch({
      type: Action.API_FETCH_ECARDS_STORE,
      setTemplates: setTemplates,
    });
  }, []);

  const goBack = () => {
    props.navigation.goBack();
  };

  const keyExtractor = (item) => {
    return item._id;
  };

  const renderItem = ({ item, index }) => {
    return <ECardStoreTemplate data={item} />;
  };

  const ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 0.5,
            width: "90%",
            backgroundColor: "#ddd",
          }}
        />
      </View>
    );
  };

  // const handleTitle = (item) => {
  //   setIdTitle(item.id);
  // };
  // const renderItemTitle = ({ item }) => (
  //   <View style={{}}>
  //     {idTitle && idTitle === item.id ? (
  //       <TouchableOpacity>
  //         <Text
  //           style={{
  //             fontSize: 16,
  //             fontWeight: "600",
  //             color: "#fff",
  //             backgroundColor: "#555",
  //             paddingHorizontal: 12,
  //             paddingVertical: 8,
  //             borderRadius: 20,
  //             opacity: 0.6,
  //           }}
  //         >
  //           {item.title}
  //         </Text>
  //       </TouchableOpacity>
  //     ) : (
  //       <TouchableOpacity onPress={() => handleTitle(item)}>
  //         <Text
  //           style={{
  //             fontSize: 16,
  //             fontWeight: "600",
  //             paddingHorizontal: 12,
  //             paddingVertical: 8,
  //           }}
  //         >
  //           {item.title}
  //         </Text>
  //       </TouchableOpacity>
  //     )}
  //   </View>
  // );
  const handleSearch = (e) => {
    setInputSearch(e.value);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#00A48D", flex: 1 }}>
      {Platform.OS === "android" ? (
        <Text style={{ marginTop: 40 }}></Text>
      ) : null}
      <View style={{ flex: 0.5 }}>
        <View
          style={{
            height: 50,
            backgroundColor: "#fff",
            position: "relative",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomColor: "#ddd",
            wight: "100%",
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
                onPress={goBack}
              >
                <AntIcon color="#fff" size={22} name="arrowleft" style={{}} />
              </TouchableOpacity>
            </View>

            <View style={{}}>
              <View style={{ paddingVertical: 2 }}>
                {/* <FontAwesome5 style={{ color: "#fff" }} /> */}
                <Text
                  style={{ fontSize: 17, color: "#fff", fontWeight: "500" }}
                >
                  Cửa hàng E-Card
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/*end header  */}

        {/* new input search */}
        <View
          style={{
            // paddingHorizontal: 10,
            flexDirection: "row",
            paddingTop: 10,
            paddingBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              // width: "100%",
              flex: 1,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#eee",
              backgroundColor: "#eee",
              zIndex: 99,
            }}
          >
            <TextInput
              placeholder="Bạn cần tìm?"
              placeholderTextColor="#666"
              style={{
                height: "100%",
                fontSize: 16,
                flex: 1,
                color: "#000",
                paddingHorizontal: 25,
              }}
              value={inputSearch}
              onChangeText={(text) => handleSearch(text)}
            />
            {/* {inputSearch.length > 0 ? (
            <TouchableOpacity
              style={{
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome name="remove" size={20} color="#ccc" style={{}} />
            </TouchableOpacity>
          ) : null} */}
            <TouchableOpacity>
              <View
                style={{
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}
              >
                <Fontisto name="search" size={20} color="#666" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView
          style={{
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          {/* <FlatList
            data={TITLE}
            horizontal
            renderItem={renderItemTitle}
            keyExtractor={(item) => item.id}
          /> */}
        </SafeAreaView>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          flex: 0.9,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <SafeAreaView style={{ flex: 1, marginTop: "-20%" }}>
          <FlatList
            ItemSeparatorComponent={ItemSeparatorComponent}
            data={templates}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

export default ECardStore;
