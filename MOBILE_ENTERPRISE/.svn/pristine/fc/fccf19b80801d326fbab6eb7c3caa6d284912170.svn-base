import React, { useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Animated, { EasingNode } from "react-native-reanimated";
import isEqual from "react-fast-compare";
import { WIDTH, HEIGHT } from "../../controllers/utils";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import PinMessageElement from "./PinMessageElement";
import { convertContentForPinMessage } from "../../controllers/utils";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";
import { without } from 'lodash';


function PinMessageList() {
  const navigation = useNavigation();
  const route =  useRoute();
  const activeThreadId = route.params.activeThreadId;
  const unpinMessage = route.params.unpinMessage;
  const pinMessage = useSelector(state => {
    try {
        const pinMessages = state.ChatStoredReducer.pinMessages;
        const data = without(Object.values(pinMessages[activeThreadId]), null);
        return data;
    } catch (error) {
        return null;
    }
}, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));

  animateOpacity = new Animated.Value(0);
  useEffect(() => {
    Animated.timing(this.animateOpacity, {
      toValue: 1,
      duration: 300,
      easing: EasingNode.inOut(EasingNode.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  closePopUp = () => {
    navigation.goBack();
  };

  const ItemSeparatorComponent = () => {
    return <View style={{ height: 0.3, backgroundColor: "#ddd" }}></View>;
  };

  const keyExtractor = (item, index) => {
    if (item) {
      return item._id;
    } else {
      return null;
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <PinMessageElement
        message={item}
        activeThreadId={activeThreadId}
    //   canPinMessageOfThread={this.props.canPinMessageOfThread}
      />
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <View
        style={{
          height: 50,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 0.5,
          borderBottomColor: "#ddd",
        }}
      >
        <TouchableOpacity
          delayPressIn={0}
          delayPressOut={0}
          style={{
            padding: 10,
            width: 50,
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign color="#00A48D" size={22} name="arrowleft" style={{}} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 10,
          }}
        >
          <Text style={{ fontSize: 17, color: "#000", fontWeight: "500" }}>
            Danh sách ghim
          </Text>
        </View>
        <View style={{ width: 50 }}></View>
      </View>
          <FlatList
              style={{
                  // marginTop: 100,
                  // marginBottom: 30,
                  // minHeight: 0,
                  maxHeight: '90%',
                  // backgroundColor: 'red'
              }}
              ItemSeparatorComponent={ItemSeparatorComponent}
              initialNumToRender={20}
              data={pinMessage}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              numColumns={1}
             
          // ListFooterComponent={this.ListFooterComponent}
          // ListHeaderComponent={this.ListHeaderComponent}
          />
    </SafeAreaView>
  );
  }

export default PinMessageList;



// import React from 'react';
// import {
//     FlatList,
//     View, Text, TouchableOpacity
// } from 'react-native';
// import { connect } from 'react-redux';
// import Animated, { EasingNode } from 'react-native-reanimated';
// import isEqual from 'react-fast-compare';
// import { WIDTH, HEIGHT } from '../../controllers/utils';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import PinMessageElement from './PinMessageElement';
// import { convertContentForPinMessage } from '../../controllers/utils';

// class PinMessageList extends React.Component {

//     animateOpacity = new Animated.Value(0);

//     componentDidMount() {
//         Animated.timing(this.animateOpacity, {
//             toValue: 1,
//             duration: 300,
//             easing: EasingNode.inOut(EasingNode.ease),
//             useNativeDriver: true
//         }).start()
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         return !isEqual(nextProps, this.props)
//     }

//     closePopUp = () => {
//         this.props.navigation.goBack();
//     }

//     ListHeaderComponent = () => {
//         return (<View style={{
//             height: 55,
//             justifyContent: 'center',
//             alignItems: 'center',
//             flexDirection: 'row',
//         }}>
//             <View>

//             </View>
//             <Text style={{
//                 color: '#fff',
//                 fontSize: 16
//             }}>
//                 {`Tất cả tin nhắn ghim (${this.props.pinMessages.length})`}
//             </Text>
//         </View>)
//     }

//     ListFooterComponent = () => {
//         return (<View style={{
//             height: 70,
//             justifyContent: 'center',
//             alignItems: 'center'
//         }}>
//             <TouchableOpacity onPress={this.closePopUp}>
//                 <EvilIcons name="close-o" size={40} color="#fff" />
//             </TouchableOpacity>
//         </View>)
//     }

//     ItemSeparatorComponent = () => {
//         return (<View style={{ height: 0.3, backgroundColor: '#ddd' }}></View>)
//     }

//     keyExtractor = (item, index) => {
//         if (item) {
//             return item._id;
//         } else {
//             return null;
//         }
//     }

//     renderItem = ({ item, index }) => {
//         return (<PinMessageElement
//             message={convertContentForPinMessage({ data: item })}
//             canPinMessageOfThread={this.props.canPinMessageOfThread}
//         />);
//     }

//     render() {
//         try {
//             return (<Animated.View style={{
//                 position: 'absolute',
//                 zIndex: 2,
//                 top: 0,
//                 left: 0,
//                 width: WIDTH,
//                 height: HEIGHT,
//                 opacity: this.animateOpacity,
//                 backgroundColor: 'rgba(0,0,0,0.8)',
//             }}>
//                 {this.ListHeaderComponent()}
//                 <FlatList
//                     style={{
//                         // marginTop: 100,
//                         // marginBottom: 30,
//                         // minHeight: 0,
//                         maxHeight: HEIGHT * 2 / 3 < 80 * 5 ? HEIGHT * 2 / 3 : 80 * 5,
//                         // backgroundColor: 'red'
//                     }}
//                     ItemSeparatorComponent={this.ItemSeparatorComponent}
//                     initialNumToRender={20}
//                     data={this.props.pinMessages}
//                     keyExtractor={this.keyExtractor}
//                     renderItem={this.renderItem}
//                 // ListFooterComponent={this.ListFooterComponent}
//                 // ListHeaderComponent={this.ListHeaderComponent}
//                 />
//                 {this.ListFooterComponent()}
//             </Animated.View>)
//         } catch (error) {
//             return null;
//         }
//     }
// }

// function mapStateToProps(state, props) {
//     let canPinMessageOfThread;
//     let thread = state.ChatUnstoredReducer.activeThread;
//     let activeUserId = state.AuthStoredReducer.myUserInfo._id;
//     if (!thread || !thread.thread_id) {
//         return {}
//     }
//     let listThreadUsers = state.ChatStoredReducer.listThreadUsers
//     let ThreadMembers = listThreadUsers[thread.thread_id];
//     for (let i = 0; i < ThreadMembers.length; i++) {
//         if (ThreadMembers[i].user_id && ThreadMembers[i].user_id === activeUserId &&
//             (ThreadMembers[i].thread_member_position === 1 || ThreadMembers[i].thread_member_position === 3)) {
//             canPinMessageOfThread = true;
//             break;
//         }
//     }

//     const reduxPinMessages = state.ChatStoredReducer.pinMessages
//     let pinMessages = reduxPinMessages && reduxPinMessages[thread.thread_id] ?
//         reduxPinMessages[thread.thread_id] : []

//     return {
//         canPinMessageOfThread: canPinMessageOfThread,
//         pinMessages: pinMessages
//     }
// }
// export default connect(mapStateToProps)(PinMessageList);
