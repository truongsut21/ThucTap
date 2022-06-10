import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import * as Action from "../controllers/actionTypes";

const dataFilter = [
  {
    category: "Tuyển dụng",
    isSelected: false,
    disable: false,
    subCategories: [
      {
        subCategoriesName: "Cơ khí",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Giáo viên",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Lễ tân",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Kế toán",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Tài chính ngân hàng",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "IT",
        active: false,
        disableSub: false,
      },
    ],
  },
  {
    category: "Khoa học & giáo dục",
    isSelected: false,
    disable: false,
    subCategories: [
      {
        subCategoriesName: "Cơ khí",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Giáo viên",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Lễ tân",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Kế toán",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Tài chính ngân hàng",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "IT",
        active: false,
        disableSub: false,
      },
    ],
  },
  {
    category: "Tin tức về công nghệ số",
    isSelected: false,
    disable: false,
    subCategories: [
      {
        subCategoriesName: "Cơ khí",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Giáo viên",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Lễ tân",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Kế toán",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Tài chính ngân hàng",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "IT",
        active: false,
        disableSub: false,
      },
    ],
  },
  {
    category: "Đời sống",
    isSelected: false,
    disable: false,
    subCategories: [
      {
        subCategoriesName: "Cơ khí",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Giáo viên",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Lễ tân",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Kế toán",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Tài chính ngân hàng",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "IT",
        active: false,
        disableSub: false,
      },
    ],
  },
  {
    category: "Ẩm thực",
    isSelected: false,
    disable: false,
    subCategories: [
      {
        subCategoriesName: "Cơ khí",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Giáo viên",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Lễ tân",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Kế toán",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Tài chính ngân hàng",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "IT",
        active: false,
        disableSub: false,
      },
    ],
  },
  {
    category: "Thể thao",
    isSelected: false,
    disable: false,
    subCategories: [
      {
        subCategoriesName: "Cơ khí",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Giáo viên",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Lễ tân",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Kế toán",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Tài chính ngân hàng",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "IT",
        active: false,
        disableSub: false,
      },
    ],
  },
  {
    category: "Động vật",
    isSelected: false,
    disable: false,
    subCategories: [
      {
        subCategoriesName: "Cơ khí",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Giáo viên",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Lễ tân",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Kế toán",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "Tài chính ngân hàng",
        active: false,
        disableSub: false,
      },
      {
        subCategoriesName: "IT",
        active: false,
        disableSub: false,
      },
    ],
  },
];

const windowWidth = Dimensions.get("window").width;

const FilterFooter = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View
      style={{
        width: 1 * windowWidth,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#C8C8C8",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        paddingLeft: 15,
        paddingTop: 15,
        paddingRight: 15,
        paddingBottom: 15,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          width: 0.4*windowWidth,
          height: 40,
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          borderColor: "#ACACAC",
          alignSelf: "flex-start",
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "600",
            lineHeight: 17,
            paddingTop: 12,
          }}
        >
          Hủy
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Newsfeed");
          dispatch({ type: Action.API_FETCH_POST });
        }}
        style={{
          width: 0.4*windowWidth,
          height: 40,
          backgroundColor: "#00A48D",
          borderWidth: 1,
          borderColor: "#ACACAC",
          alignSelf: "flex-start",
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "600",
            lineHeight: 17,
            paddingTop: 12,
          }}
        >
          Đăng
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const FilterOption = (props) => {
  const [data, setData] = useState(dataFilter);
  const [isExpand, setIsExpand] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [active, setActive] = useState(false);
  const handleActive = (i) => {
    let arr = dataFilter.map((item, index) => {
      item.subCategories.map((subItem, subIndex) => {
        if (i === subIndex) {
          subItem.active = !subItem.active;
        } else if (i !== subIndex) {
          subItem.disableSub = !subItem.disableSub;
        }
      });

      return { ...item };
    });
    setData(arr);
  };
  const handleSelect = (i) => {
    let arr = dataFilter.map((item, index) => {
      if (i === index) {
        item.isSelected = !item.isSelected;
      } else if (i !== index) {
        item.disable = !item.disable;
      }
      return { ...item };
    });
    setData(arr);
    setIsExpand((isExpand) => !isExpand);
    setCurrentIndex(i);
  };
  console.log(dataFilter);
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        flexDirection: "column",
        marginTop: 30,
        marginLeft: 30,
      }}
    >
      {dataFilter.map((item, index) => (
        <View
          style={{
            width: 382,
          }}
        >
          <TouchableOpacity
            key={index}
            onPress={() => handleSelect(index)}
            disabled={item.disable}
            style={item.isSelected ? styles.isSelected : styles.isNotSelected}
          >
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  lineHeight: 17,
                  color: "#000000",
                }}
              >
                {item.category}
              </Text>
              <Ionicons
                color={"#8C8C8C"}
                style={{
                  width: 20,
                  height: 20,
                  textAlign: "center",
                  textAlignVertical: "center",
                  // color: focused ? "#00A48D" : "#828282",
                }}
                size={16}
                name={"caret-down"}
              />
            </View>
          </TouchableOpacity>
          {isExpand && currentIndex === index && (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                flexDirection: "row",
                marginBottom: 10,
                marginRight: 10,
              }}
            >
              {item.subCategories.map((subCategoriesItem, index) => (
                <View
                  style={{
                    marginBottom: 10,
                  }}
                  key={index}
                >
                  <TouchableOpacity
                    disabled={subCategoriesItem.disableSub}
                    onPress={() => handleActive(index)}
                    style={
                      !subCategoriesItem.active
                        ? styles.categoryChildNotSelect
                        : styles.categoryChildSelect
                    }
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        lineHeight: 17,
                        color: "#000000",
                      }}
                    >
                      {subCategoriesItem.subCategoriesName}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const PostOption = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#fff" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View
          style={{
            paddingLeft: 16,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../static/Vector.png")} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "600",
              lineHeight: 44,
              color: "black",
            }}
          >
            Hãy chọn danh mục
          </Text>
        </View>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 19,
            color: "#838383",
            marginLeft: 16,
            marginTop: 50,
          }}
        >
          Chọn danh mục để đăng bài
        </Text>
        <FilterOption></FilterOption>
      </ScrollView>
      <FilterFooter></FilterFooter>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginTop: 16,
    paddingBottom: 5,
    paddingTop: 0,
  },
  isSelected: {
    width: 0.9 * windowWidth,
    backgroundColor: "#00A48D",
    borderWidth: 1,
    borderColor: "#ACACAC",
    padding: 11,
    alignSelf: "flex-start",
    borderRadius: 20,
    marginBottom: 10,
  },
  isNotSelected: {
    width: 0.9 * windowWidth,
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    borderColor: "#ACACAC",
    padding: 11,
    alignSelf: "flex-start",
    borderRadius: 20,
    marginBottom: 10,
  },
  categoryChildSelect: {
    backgroundColor: "#00A48D",
    borderWidth: 1,
    borderColor: "#ACACAC",
    padding: 10,
    alignSelf: "center",
    borderRadius: 20,
    marginRight: 10,
  },
  categoryChildNotSelect: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ACACAC",
    padding: 10,
    alignSelf: "center",
    borderRadius: 20,
    marginRight: 10,
  },
});

export default PostOption;
