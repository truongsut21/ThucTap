import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  FlatList,
  TextInput
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import isEqual from "react-fast-compare";
import AntDesign from "react-native-vector-icons/AntDesign";
import LottieView from "lottie-react-native";
import DispatchImage from "../DispatchImage";
import StatusBar from "../../../base/components/StatusBar";
import { WIDTH, HEIGHT, calcImageDimension } from "../../controllers/utils";
import * as Action from "../../controllers/actionTypes";
const Anim = require("../../../../static/empty-folder.json");
import { without } from "lodash";
import OwnFileContent from "../childOwnMessage/FileContent";
import Message from '../Messages/Message';



const ThreadSearchLibrary = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState("")
  const activeThreadId = useSelector(
    (state) => state.ChatUnstoredReducer.activeThreadId
  );
  const reducerImages = useSelector(
    (state) => {
      if (!activeThreadId) return [];
      const simpleMessages = state.ChatStoredReducer.simpleMessages;
      const fullMessages = state.ChatStoredReducer.fullMessages;
      const fM = state.ChatStoredReducer.fullMessages;
      let MessagesInThread = simpleMessages[activeThreadId] || [];
      let mediaMessages = MessagesInThread.filter((m) => {
        return (
          fM[m._id] &&
          fM[m._id]._id !== fM[m._id].draft_id &&
          !fM[m._id].is_removed &&
          fM[m._id].type === "file"
        );
      });

      let medias = without(
        mediaMessages.map((m) => {
          let message = fullMessages[m._id];
          if (message.type === "file") {
            return {
              ...message.content,
              message_id: message._id,
            };
          }
          // else {
          //     if (Array.isArray(message.content)) {
          //         return message.content.map(f => ({
          //             ...f,
          //             message_id: message._id,
          //         }))
          //     }
          //     return null;

          // }
        }),
        null
      ).flat();
      return medias;
    },
    (prev, next) => isEqual(prev, next)
  );


  const allIdMessageSearch = useSelector(state => {
    try {
        const activeThreadId = state.ChatUnstoredReducer.activeThreadId;
        const simpleMessages = state.ChatStoredReducer.simpleMessages;
        const fullMessages = state.ChatStoredReducer.fullMessages || {};
        let getAllIdMessages = simpleMessages[activeThreadId] || [];
        // console.log("getAllIdMessages", getAllIdMessages);
        let AllMessages = {}
        getAllIdMessages.forEach(element => {
            for (let key in fullMessages) {
                if (key == element._id) {
                    AllMessages[key] = fullMessages[key]
                }
            }
        });
        let allIdMessageSearch = {}
        if(searchValue){
          for (let key in AllMessages) {
            if (AllMessages[key].type === "text" && !AllMessages[key].is_removed) {
                let a = AllMessages[key].content.content;
        
                if (a.indexOf(searchValue) !== -1) {
                    allIdMessageSearch[key] = fullMessages[key]
                }
            }
        }
        }
        return Object.values(allIdMessageSearch)
    } catch (error) {
        return [];
    }
}, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));

  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (!activeThreadId) {
      navigation.goBack();
    }
  }, [activeThreadId]);

  useEffect(() => {
    setImages(reducerImages);
  }, [reducerImages]);

  const keyExtractor = (item, index) => {
    if (!item) return index;
    return item._id;
  };

  const renderItem = ({ item, index }) => {
    if (!item) {
        return null;
    }
    return <View style={{ paddingBottom: 10 }}>
        <Message
            mid={item._id}
            isPoppingup={true}
            isFind={true}
        />
    </View>
}
  return (
    <React.Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#fff" }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar barStyle="light-content" backgroundColor="#00A48D" />
        {/* <StatusBar backgroundColor='#00A48D' barStyle={'dark-content'} /> */}
        <View
          style={{
            height: 50,
            backgroundColor: "#fff",
            position: "relative",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 0.5,
            borderBottomColor: "#ddd",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 5 }}>
              <TouchableOpacity
                delayPressIn={0}
                delayPressOut={0}
                style={{ padding: 10 }}
                onPress={() => navigation.goBack()}
              >
                <AntDesign color="#000" size={22} name="arrowleft" style={{}} />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 17, color: "#000", fontWeight: "500" }}>
              Tìm kiếm tin nhắn
            </Text>
          </View>
        </View>

        <View style={{ flex: 1, paddingVertical: 1 }}>
        <View style={{
          borderRadius: 6,
          backgroundColor: "#fff",
          flexDirection: 'row',
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
      }}>
          {/* <Text>aaaa</Text> */}
          <TextInput
              placeholderTextColor={'#000'}
              onChangeText={(name) => setSearchValue(name)}
              style={{
                
                  marginVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  backgroundColor: '#f3f3f3',
                  padding: 0,
                  height: 50,
                  color: '#000',
                  borderRadius: 10,
                 flex:1
              }}
              placeholder="Nhập từ khóa tìm kiếm..." />
      </View>
        <FlatList
            data={allIdMessageSearch}
            ListEmptyComponent={() => {
                return <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <LottieView source={Anim} style={{
                        width: WIDTH * 2 / 3,
                        height: WIDTH * 2 / 3
                    }} autoPlay loop />
                </View>
            }}
            numColumns={1}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            // initialNumToRender={21}
            // ItemSeparatorComponent={(a) => {
            //     return (
            //         <View style={{ height: 1, backgroundColor: '#fff' }} />
            //     )
            // }}
          />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default ThreadSearchLibrary;
