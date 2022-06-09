import React from "react";
import { useDispatch } from "react-redux";
import * as Action from "./controller/actionTypes";
import { ScrollView, TouchableOpacity, StatusBar, Text } from "react-native";

import Post from "./post/Posts";

const posts = [
  {
    name: "Đỗ Trường",
    time: "22thg 1,2022",
    img: "https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg",
    content:
      "Đã từng bên nhau mỗi ngày, ngọt ngào như lớp Machiato béo ngậy của tiệm. Đã từng ngồi trước cửa tiệm mỗi sáng cũng như mỗi tối. Đã từng bên nhau bất kể nắng mưa. Tui có ngại khó ngại khổ gì đâu. Tui cũng có chê trách gì tiệm đâu. Lúc tiệm sửa chữa tui buồn muốn chết mà tui không hề thay lòng đổi dạ với tiệm cà phê nào khác 🥲🥲 Vậy mà giờ tiệm comeback khang trang đẹp đẽ như vậy mà không nói với tui một lời 😭😭",
    comments: [
      {
        name: "Nhật Nam",
        time: "1 giờ trước",
        comment: "quá hay bạn ơi, bạn là nhất",
      },
      {
        name: "Diễn Quỳnh",
        time: "1 giờ trước",
        comment: "okee bạn",
      },
    ],
  },

  {
    name: "Hoài Nam",
    time: "29thg 1,2022",
    img: "https://codelearn.io/Upload/Blog/low-code-tuong-lai-cua-lap-trinh-63716917426.7091.jpg",
    content:
      "Mấy đứa bạn tui ở Sài Gòn nói Kon Tum có quán Tiệm Chú Mười nào mới nhìn đẹp lắm, tui bảo là quán fake hở? Chứ Tiệm Chú Mười tui biết đang sửa mà. Nhìn mấy bức ảnh trên Instagram, tui còn tưởng quán nào trùng tên 😫😫 Ban nãy tình cờ đi ngang qua tui mới thấy tận mắt. Ôi tui thật là hồ đồ và vô tâm mà. Quán yêu thích mở lại mà mình không hay không biết 😣😣",

    comments: [
      {
        name: "Nhật Nam",
        time: "1 giờ trước",
        comment: "quá hay bạn ơi, bạn là nhất",
      },
      {
        name: "Diễn Quỳnh",
        time: "1 giờ trước",
        comment: "okee bạn",
      },
    ],
  },

  {
    name: "Cao Thắng",
    time: "29thg 1,2022",
    img: "https://i.ytimg.com/vi/femIhiwriHA/maxresdefault.jpg",
    content:
      "Trên Fanpage thấy tiệm đã có thêm nhiều món mới, nhìn ngon lắm. Cửa tiệm nhỏ nhắn ngày nào nay đã sáng sủa hơn, nhiều góc sống ảo được decor xinh xắn. Đặc biệt nhất là mặt tiền của tiệm được sơn màu gỗ rất độc đáo, làm nổi bật hẳn một góc đường ❤️",

    comments: [
      {
        name: "Nhật Nam",
        time: "1 giờ trước",
        comment: "quá hay bạn ơi, bạn là nhất",
      },
      {
        name: "Diễn Quỳnh",
        time: "1 giờ trước",
        comment: "okee bạn",
      },
    ],
  },
];
const PostScreen = () => {
  const dispatch = useDispatch();
  return (
    <ScrollView style={{ backgroundColor: "#E5E5E5" }}>
      <StatusBar style="light" />
      <Post name="post1" />
      <Post name="post2" />
      <TouchableOpacity
        // onPress={() => {
        //   // dispatch({ type: Action.API_FETCH_POST_LIST });
        // }}

        onPress={() => {
          console.log("chay dispatch")
          dispatch({ type: Action.API_FETCH_POST_LIST });
        }}
      >
        <Text>Test API</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PostScreen;
