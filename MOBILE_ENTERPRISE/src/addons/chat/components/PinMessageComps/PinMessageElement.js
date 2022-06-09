import React, { useRef } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  LayoutAnimation,
  UIManager,
} from "react-native";
import Hyperlink from "react-native-hyperlink";
import { connect, useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DispatchImage from "../DispatchImage";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import * as Action from "../../controllers/actionTypes";
import { convertToColor } from "../../controllers/utils";
import { WIDTH, HEIGHT } from "../../controllers/utils";
import OwnImageContent from "../childOwnMessage/ImageContent";
import OwnStickerContent from "../childOwnMessage/StickerContent";
import OwnImageGroupContent from "../childOwnMessage/ImageGroupContent";
import OwnFileContent from "../childOwnMessage/FileContent";
import Animated, { EasingNode } from "react-native-reanimated";
import isEqual from "react-fast-compare";
import OwnContactContent from "../childOwnMessage/ContactContent";
import { _parseMentionContentIfExist } from "../../controllers/utils";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ShortContent = ({ activeThreadId, message_id, animateOpacity }) => {
  const message = useSelector(
    (state) => {
      try {
        const pinMessages = state.ChatStoredReducer.pinMessages;
        return pinMessages[activeThreadId][message_id];
      } catch (error) {
        return null;
      }
    },
    (prev, next) => isEqual(prev, next)
  );

  const is_removed = useSelector(
    (state) => {
      const fullMessages = state.ChatStoredReducer.fullMessages;
      return message ? fullMessages[message._id].is_removed : null;
    },
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  );

  const parsedContent = is_removed
    ? ""
    : _parseMentionContentIfExist(
        message && message.content && message.content.content,
        (id) => {},
        {
          color: "#000",
        }
      );

  const checkLink = () => {
    if (message.type === "text") {
      if (message.content.content.includes("https")) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
  try {
    if (message.type === "text") {
      if (checkLink())
        return (
          <View
            style={{ flexDirection: "column", justifyContent: "flex-start", marginVertical: 10 }}
          >
            <Hyperlink
              linkDefault={true}
              linkStyle={{ color: "#007bff", textDecorationLine: "underline" }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: is_removed ? "#ccc" : "#333",
                }}
              >
                {is_removed ? "Tin nhắn đã bị thu hồi" : parsedContent}
              </Text>
            </Hyperlink>
          </View>
        );
      return (
        <Animated.View
          style={{
            opacity: animateOpacity,
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              lineHeight: 20,
              color: "#333",
            }}
          >
            {parsedContent}
          </Text>
        </Animated.View>
      );
    } else if (message.type === "sticker") {
      return (
        <OwnStickerContent
          _id={message._id}
          onLongPress={null}
          isPoppingup={true}
          isPin={true}
        ></OwnStickerContent>
      );
    } else if (message.type === "image") {
      return (
        <OwnImageContent
          _id={message._id}
          onLongPress={null}
          isPoppingup={true}
          isPin={true}
        ></OwnImageContent>
      );
    } else if (message.type === "image_group") {
      return (
        <View style={{ flexDirection: "row" }}>
          <OwnImageGroupContent
            _id={message._id}
            onLongPress={null}
            isPoppingup={true}
            isPin={true}
          ></OwnImageGroupContent>
        </View>
      );
    } else if (message.type === "file") {
      return (
        <View style={{ paddingVertical: 10 }}>
          <OwnFileContent
            _id={message._id}
            onLongPress={null}
            isPoppingup={true}
            isPin={true}
          ></OwnFileContent>
        </View>
      );
    } else if (message.type === "contact") {
      return (
        <OwnContactContent
          _id={message._id}
          onLongPress={null}
          isPoppingup={true}
          isPin={true}
        ></OwnContactContent>
      );
    } else if (message.type === "poll") {
      return null;
    } else {
      return null;
    }
  } catch (error) {
    return (
      <Animated.View
        style={{
          opacity: animateOpacity,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            color: "#333",
          }}
        >
          &lt;Chưa hỗ trợ dạng tin ghim này&gt;
        </Text>
      </Animated.View>
    );
  }
};

const MemoizedShortContent = React.memo(
  ShortContent,
  (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
  }
);

function PinMessageElement({ message, activeThreadId }) {
  const dispatch = useDispatch();
  const animateOpacity = useRef(new Animated.Value(1)).current;
  const unpinMessage = () => {
    dispatch({
      type: Action.API_UNPIN_MESSAGE,
      data: {
        thread_id: activeThreadId,
        message_id: message._id,
      },
    });
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1 }}>
        <MemoizedShortContent
          activeThreadId={activeThreadId}
          message_id={message._id}
          animateOpacity={animateOpacity}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={unpinMessage}>
          <MaterialCommunityIcons
            name="pin-off-outline"
            size={25}
            color="#a3a3a3"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default PinMessageElement;

// import React from 'react';
// import {
//     TouchableOpacity, View, Image, Text,
//     LayoutAnimation, UIManager
// } from 'react-native';
// import { connect } from 'react-redux';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import DispatchImage from '../DispatchImage';
// import Swipeable from 'react-native-gesture-handler/Swipeable';
// import { format } from 'date-fns';
// import { vi } from 'date-fns/locale';
// import * as Action from '../../controllers/actionTypes';
// import { convertToColor } from '../../controllers/utils'

// if (
//     Platform.OS === "android" &&
//     UIManager.setLayoutAnimationEnabledExperimental
// ) {
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// const LeftAction = ({ ...props }) => {
//     if (props.canPinMessageOfThread) {
//         return (<TouchableOpacity style={{
//             // flex: 1,
//             backgroundColor: 'red',
//             justifyContent: 'center',
//             alignItems: 'center',
//             flexDirection: 'row'
//         }} onPress={() => {
//             props.unpinMessage()
//         }}>
//             <View style={{
//                 padding: 10,
//                 paddingRight: 5
//             }}>
//                 <MaterialCommunityIcons name="pin-off" size={25} color="#fff" />
//             </View>
//             <Text style={{
//                 color: '#fff',
//                 padding: 20,
//                 paddingLeft: 0
//             }}>Bỏ ghim</Text>
//         </TouchableOpacity>)
//     } else {
//         return null;
//     }
// }

// class PinMessageElement extends React.Component {
//     state = {
//         isExpand: false
//     }

//     onPress = () => {
//         LayoutAnimation.configureNext({
//             duration: 150,
//             create: {
//                 type: LayoutAnimation.Types.linear,
//             },
//             update: {
//                 type: LayoutAnimation.Types.linear,
//             },
//             delete: {
//                 type: LayoutAnimation.Types.linear,
//             }
//         })
//         this.setState({
//             isExpand: !this.state.isExpand
//         })
//     }

//     unpinMessage = () => {
//         this.props.dispatch({
//             type: Action.API_UNPIN_MESSAGE_OF_THREAD,
//             message_id: this.props.message._id,
//             thread_id: this.props.message.thread_id && this.props.message.thread_id._id
//                 ?
//                 this.props.message.thread_id._id
//                 :
//                 this.props.message.thread_id
//         })
//     }

//     renderContent() {
//         try {
//             if (this.props.message.type === 'text') {
//                 return `${this.props.message.content}`;
//             } else if (['image', 'imagegroup', 'other'].indexOf(this.props.message.type) > -1) {
//                 if (this.props.message.fileContent) {
//                     return this.props.message.fileContent.originalfilename;
//                 } else {
//                     if (this.props.message.type === 'other') {
//                         return 'Tệp tin';
//                     } else {
//                         return 'Hình ảnh';
//                     }
//                 }
//             } else {
//                 return ''
//             }
//         } catch (error) {
//             return '';
//         }
//     }

//     render() {
//         try {
//             return (
//                 <View style={{ backgroundColor: '#fff' }}>
//                     <Swipeable renderLeftActions={(progress, dragX) => <LeftAction
//                         progress={progress}
//                         dragX={dragX}
//                         canPinMessageOfThread={this.props.canPinMessageOfThread}
//                         unpinMessage={this.unpinMessage}
//                     />}>
//                         <TouchableOpacity onPress={this.onPress} activeOpacity={1}>
//                             <View style={{
//                                 flex: 1,
//                                 flexDirection: 'row',
//                                 backgroundColor: '#fff',
//                                 paddingVertical: 0,
//                                 paddingVertical: 10
//                             }}>
//                                 <View style={{
//                                     marginHorizontal: 10,
//                                     width: 60,
//                                     height: 60,
//                                 }}>
//                                     {
//                                         this.props.avatar
//                                             ?
//                                             <DispatchImage
//                                                 style={{ width: 55, height: 55, borderRadius: 50 }}
//                                                 source={this.props.avatar}
//                                                 type={'avatar'}
//                                                 data={{
//                                                     _id: this.props.message.create_uid
//                                                 }}
//                                             />
//                                             :
//                                             <View style={{
//                                                 justifyContent: 'center', alignItems: 'center',
//                                                 width: 55, height: 55, borderRadius: 50,
//                                                 backgroundColor: this.props.message.create_uid
//                                                     ?
//                                                     convertToColor(this.props.message.create_uid[this.props.message.create_uid.length - 1])
//                                                     :
//                                                     '#e3e3e3'
//                                             }}>
//                                                 <Text style={{ color: '#fff', fontSize: 17, fontWeight: '500' }}>
//                                                     {
//                                                         this.props.contact
//                                                             ?
//                                                             (this.props.contact.name.split(' ').length > 1
//                                                                 ? this.props.contact.name.split(' ')[0][0] + this.props.contact.name.split(' ')[1][0]
//                                                                 : this.props.contact.name.substr(0, 1))
//                                                             :
//                                                             'PM'
//                                                     }
//                                                 </Text>
//                                             </View>
//                                     }
//                                 </View>
//                                 <View style={{
//                                     flex: 1,
//                                     marginLeft: 5,
//                                     paddingRight: 10,
//                                 }}>

//                                     <View style={{
//                                         flexDirection: 'row'
//                                     }}>
//                                         {
//                                             this.props.contact
//                                                 ?
//                                                 <Text style={{ fontWeight: '600', fontSize: 15, paddingRight: 7 }}>
//                                                     {this.props.contact.name}
//                                                 </Text>
//                                                 :
//                                                 null
//                                         }
//                                         <MaterialCommunityIcons name="pin" size={17} color="#a3a3a3" />
//                                         <Text>
//                                             {format(new Date(this.props.message.pin_date), 'HH:mm', { locale: vi })}
//                                         </Text>
//                                     </View>
//                                     <View>
//                                         <Text numberOfLines={this.state.isExpand ? 1000 : 2}
//                                             ellipsizeMode='tail'>
//                                             {this.renderContent()}
//                                         </Text>
//                                     </View>
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     </Swipeable>
//                 </View>
//             );
//         } catch (error) {
//             return null;
//         }
//     }
// }

// function mapStateToProps(state, props) {
//     let fastContacts = state.ChatStoredReducer.fastContacts
//     let avatar, contact;
//     let imageAvatars = state.ChatStoredReducer.imageAvatars
//     avatar = imageAvatars &&
//     imageAvatars[props.message.create_uid]
//         ?
//         imageAvatars[props.message.create_uid].link
//         :
//         false
//     if (fastContacts && fastContacts[props.message.create_uid]) {
//         contact = fastContacts[props.message.create_uid]
//     }
//     return {
//         avatar: avatar,
//         contact: contact
//     }
// }
// export default connect(mapStateToProps)(PinMessageElement);
