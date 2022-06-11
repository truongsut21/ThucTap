import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../posts/controller/actionTypes";
import {
  StatusBar,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Listheadercomponent,
} from "react-native";
import Post from "./Posts";
import HearderPost from "./HearderPost";
import { View } from "native-base";

const postss = [
  {
    _id: "a1",
    content:
      "Ngày 08/05, em D.T.Y.N. và các bạn của mình đi đến khu vực cầu Hai Trại, xã Ninh Phụng, thị xã Ninh Hòa thì phát hiện hai người bạn đi cùng bị trư.ợ.t chân vào hố nước và có dấu hiệu đ.u.ối n.ư.ớc. Ngày 08/05, em D.T.Y.N. và các bạn của mình đi đến khu vực cầu Hai Trại, xã Ninh Phụng, thị xã Ninh Hòa thì phát hiện hai người bạn đi cùng bị trư.ợ.t chân vào hố nước và có dấu hiệu đ.u.ối n.ư.ớc. ",
    like_count: 430,
    comment_count: 30,
    create_uid: "33",
    create_date: "22thg 1,2022",
    hot_comment:
      "We officially just sold out our All-Star LinkedIn Growth Package. Just removed the package from our site! We officially just sold out our All-Star LinkedIn Growth Package. Just removed the package from our site!",
    img_url:
      "https://addons.mozilla.org/user-media/previews/thumbs/263/263542.jpg?modified=1651241069",
  },

  {
    _id: "a2",
    content:
      "Ngày 08/05, em D.T.Y.N. và các bạn của mình đi đến khu vực cầu Hai Trại, xã Ninh Phụng, thị xã Ninh Hòa thì phát hiện hai người bạn đi cùng bị trư.ợ.t chân vào hố nước và có dấu hiệu đ.u.ối n.ư.ớc. ",
    like_count: 430,
    comment_count: 30,
    create_uid: "33",
    create_date: "22thg 1,2022",
    hot_comment:
      "Mới đây, cộng đồng  mạng xôn xao về 1 cô gái vô tình xuất hiện trong clip phỏng vấn, chơi trò chơi của 1 youtuber. Ngay lập tức nhan sắc của cô gái va vào sự chú ý của các anh hùng bàn phím. Nhiều người ví cô nàng như các tỉ tỉ của Trung Quốc vậy.",
    img_url: undefined
      // "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg"
      ,
  },
];

const PostScreen = () => {
  const dispatch = useDispatch();
  console.log("run dispatch fist");

  // khi có dữ liệu mới sẽ render lại
  useEffect(() => {
    dispatch({ type: Action.API_FETCH_POST_LIST });
  }, []);

  // gọi data post từ trong state
  const posts = useSelector((state) => state.PostStoredReducer.posts).map((item)=>{
    return item.content.text
  })

  console.log("day la post screeen:", posts)
  
  
  
  // setTimeout(() => {
  //   var x = posts.map((x) => {
  //     console.log("day la trong screen:", x.content.text);
  //     return x.content.text;
  //   });
  // }, 5000);

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* <ScrollView>
        <HearderPost />
      </ScrollView> */}

      {/* <HearderPost /> */}

      <FlatList
        ListHeaderComponent={<HearderPost />}
        data={postss}
        renderItem={({ item }) => <Post title={item} />}
        keyExtractor={(item) => item._id}
        onEndReached={() => {
          // dispatch({ type: Action.API_FETCH_OLD_POST_LIST });
          console.log("🚀 ~ posts", posts);
        }}
        ListFooterComponent={
          <View>
            <ActivityIndicator
              size="small"
              style={{
                marginTop: 10,
                alignItems: "center",
              }}
            />
          </View>
        }
      />

      <TouchableOpacity
        onPress={() => {
          dispatch({ type: Action.API_FETCH_POST_LIST });
        }}
      >
        <Text>API</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PostScreen;
