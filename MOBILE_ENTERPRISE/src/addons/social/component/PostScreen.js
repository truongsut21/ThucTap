import React from "react";
import { useDispatch } from "react-redux";
import * as Action from "../posts/controller/actionTypes";
import {
  StatusBar,
  SafeAreaView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import Post from "./Posts";
import HearderPost from "./HearderPost";

const posts = [
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
    hot_comment: "Mới đây, cộng đồng  mạng xôn xao về 1 cô gái vô tình xuất hiện trong clip phỏng vấn, chơi trò chơi của 1 youtuber. Ngay lập tức nhan sắc của cô gái va vào sự chú ý của các anh hùng bàn phím. Nhiều người ví cô nàng như các tỉ tỉ của Trung Quốc vậy.",
    img_url:
      "https://ict-imgs.vgcloud.vn/2020/09/01/19/huong-dan-tao-facebook-avatar.jpg",
  },
];

const PostScreen = () => {
  const dispatch = useDispatch();
  console.log("run dispatch fist");
  dispatch({ type: Action.API_FETCH_POST_LIST });

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <ScrollView>
        <HearderPost />

        <FlatList
          data={posts}
          renderItem={({ item }) => <Post title={item} />}
          keyExtractor={(item) => item._id}
          onEndReached={() => {
            dispatch({ type: Action.API_FETCH_OLD_POST_LIST });
          }}
          ListFooterComponent={
            <Text style={{ alignItems: "center" }}>Đang tải</Text>
          }
        />
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: Action.API_FETCH_POST_LIST });
          }}
        >
          <Text>API</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostScreen;
