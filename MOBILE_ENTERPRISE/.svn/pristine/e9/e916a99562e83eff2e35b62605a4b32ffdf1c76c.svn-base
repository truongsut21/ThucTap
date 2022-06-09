import React, { useContext } from "react";
import { Text, View, TouchableOpacity, Image, Dimensions } from "react-native";
import { connect, useSelector } from "react-redux";
import Hyperlink from "react-native-hyperlink";
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import isEqual from "react-fast-compare";
import FastImage from "react-native-fast-image";
import { _parseMentionContentIfExist } from "../../controllers/utils";
import MessageReactionNew from "../Messages/MessageReactionNew";
import MessageStateIcon from "./MessageStateIcon";
import { useNavigation } from "@react-navigation/native";

// import { useTheme } from '@react-navigation/native';

const InfoContent = ({ _id }) => {
  const time = useSelector(
    (state) => {
      return state.ChatStoredReducer.fullMessages[_id].create_date;
    },
    (prev, next) => prev === next
  );
  const draft_id = useSelector(
    (state) => {
      return state.ChatStoredReducer.fullMessages[_id].draft_id;
    },
    (prev, next) => prev === next
  );

  try {
    return (
      <View
        style={{
          paddingTop: 2,
          justifyContent: "flex-end",
          flexDirection: "row",
        }}
      >
        <React.Fragment>
          <Text
            style={{
              paddingRight: 2,
              fontSize: 11,
              color: "#fff",
            }}
          >
            {format(new Date(time), "HH:mm", { locale: vi })}
          </Text>
          <MessageStateIcon isDraft={_id === draft_id} />
        </React.Fragment>
      </View>
    );
  } catch (error) {
    return <React.Fragment></React.Fragment>;
  }
};

const MetaEmbedContent = ({ _id }) => {
  const embed = useSelector(
    (state) => {
      const fullMessages = state.ChatStoredReducer.fullMessages;
      return fullMessages[_id].metaEmbedLink;
    },
    (prev, next) => isEqual(prev, next)
  );

  try {
    if (!embed) return null;
    return (
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
        }}
      >
        {embed.image ? (
          <FastImage
            style={{
              width: (Dimensions.get("window").width * 2) / 3 + 31,
              marginLeft: -10,
              marginRight: -15,
              height: 130,
              backgroundColor: "#ddd",
            }}
            source={{
              uri: `${embed.image}`,
            }}
          />
        ) : null}
        <View style={{ paddingVertical: 10 }}>
          <View style={{ paddingBottom: 2 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {embed.title}
            </Text>
          </View>

          <View style={{ paddingTop: 2 }}>
            <Text
              style={{
                fontSize: 13,
                // color: '#808080'
                color: "#fff",
              }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {embed.meta_description}
            </Text>
          </View>
        </View>
      </View>
    );
  } catch (error) {
    return null;
  }
};

const TextContent = ({ _id, onLongPress, isPoppingup }) => {
    const navigation = useNavigation()
  // const { colors } = useTheme();
  const { is_removed, content } = useSelector(
    (state) => {
      const fullMessages = state.ChatStoredReducer.fullMessages;
      return {
        is_removed: fullMessages[_id].is_removed,
        content: fullMessages[_id].content,
      };
    },
    (prev, next) => isEqual(prev, next)
  ); 

  const onClickTagPerson = (_id) => {
    navigation.navigate("PopupUserInfo", {
        _id,
      });
  };

  const parsedContent = is_removed
    ? ""
    : _parseMentionContentIfExist(
        content.content,
        onClickTagPerson,
        { color: "#fff", fontSize: 16 },
        {  fontWeight: "400", color: "#fff", fontSize: 16}
      );

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: "#00A48D",
          borderRadius: 15,
          marginRight: 5,
          alignItems: "flex-end",
          paddingVertical: 6,
          paddingHorizontal: 10,
        },
      ]}
      delayPressIn={0}
      delayPressOut={0}
      onLongPress={onLongPress}
      delayLongPress={100}
      activeOpacity={1}
    >
      <View style={{ flexDirection: "column" }}>
        <Hyperlink
          linkDefault={true}
          linkStyle={{
            color: "#fff",
            textDecorationLine: "underline",
          }}
        >
          {/* <Text style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: is_removed ? '#ccc' : '#fff',
                }}>>*/}
          {is_removed ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: is_removed ? "#ffff" : "#ccc",
              }}
            >
              Tin nhắn đã bị thu hồi
            </Text>
          ) : (
            parsedContent
          )}
          {/*  </Text>*/}
        </Hyperlink>
        {!is_removed ? <MetaEmbedContent _id={_id} /> : null}
        {!is_removed ? <InfoContent _id={_id} /> : null}
      </View>

      {/* {
            !this.props.isPoppingup && this.props.reactSummary && this.props.reactSummary.count > 0
                ?
                <View
                    style={{
                        position: 'absolute',
                        paddingHorizontal: 5,
                        marginRight: 7,
                        bottom: !this.props.message.hasOwnProperty('metaEmbedLink') || isEmpty(this.props.message.metaEmbedLink)
                            ? -12 : -16,
                        left: 0,
                    }}>
                    <ReactionSummary
                        navigation={this.props.navigation}
                        reactSummary={{ ...this.props.reactSummary, message_id: this.props.message._id }}
                    />
                </View>
                :
                null
        } */}

      <MessageReactionNew mid={_id} isPoppingup={isPoppingup} check={true} />
    </TouchableOpacity>
  );
};

export default React.memo(TextContent, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});

// class TextContent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             parsedContent: _parseMentionContentIfExist(this.props.message.content, (_id) => {
//
//             }, { color: '#fff' })
//         }
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
//     }

//     componentDidUpdate(prevProps, prevState) {
//         try {
//             if (!this.props.message.content !== nextProps.message.content) {
//                 let content = _parseMentionContentIfExist(this.props.message.content);
//                 this.setState({
//                     parsedContent: content
//                 })
//             }
//         }
//         catch (error) {

//         }
//     }

//     onPress = () => {
//         if (!this.props.isPoppingup) {
//             this.props.onPressSingle(this.props.message);
//         }
//     }

//     render() {
//         try {
//             return (
//                 <React.Fragment>
//                     <TouchableOpacity
//                         style={[{
//                             backgroundColor: '#00A48D',
//                             // backgroundColor: this.props.message.hasOwnProperty('errorMessage') && this.props.message.errorMessage ? '#ffe6e6' : '#e6fff9',
//                             // borderRadius: 5,
//                             // borderTopLeftRadius: 16,
//                             // borderBottomLeftRadius: 16,
//                             borderRadius: 15,
//                             marginRight: 5,
//                             alignItems: this.props.message.hasOwnProperty('metaEmbedLink') && !isEmpty(this.props.message.metaEmbedLink) ? 'flex-start' : 'flex-end',
//                             paddingVertical: 6,
//                             paddingHorizontal: 10,
//                         }]}
//                         delayPressIn={0} delayPressOut={0}
//                         onLongPress={this.props.messageinfo ? null : this.props.onLongPress}
//                         onPress={this.onPress}
//                         activeOpacity={1}>
//                         <View style={{ flexDirection: 'column' }} >
//                             <Hyperlink linkDefault={true} linkStyle={{
//                                 color: '#fff',
//                                 textDecorationLine: 'underline'
//                             }}>
//                                 <Text style={{
//                                     fontSize: 16,
//                                     fontWeight: '400',
//                                     color: this.props.message.is_removed ? '#ccc' : '#fff',
//                                 }}>
//                                     {
//                                         this.state.parsedContent
//                                     }
//                                 </Text>
//                             </Hyperlink>
//                             {
//                                 !this.props.message.is_removed
//                                     ?
//                                     <MemoizedInfoContent
//                                         _id={this.props.message._id}
//                                         send_state={this.props.message.send_state}
//                                         create_date={this.props.message.create_date} />
//                                     :
//                                     null
//                             }
//                             {
//                                 this.props.message.hasOwnProperty('metaEmbedLink') &&
//                                     !isEmpty(this.props.message.metaEmbedLink) && !this.props.message.is_removed
//                                     ?
//                                     <MetaEmbedContent
//                                         message_id={this.props.message._id}
//                                         metaEmbedLink={this.props.message.metaEmbedLink}
//                                     />
//                                     :
//                                     null
//                             }

//                         </View>
//                         {/* This is message tail */}

//                         {
//                             !this.props.isPoppingup && this.props.reactSummary && this.props.reactSummary.count > 0
//                                 ?
//                                 <View
//                                     style={{
//                                         position: 'absolute',
//                                         paddingHorizontal: 5,
//                                         marginRight: 7,
//                                         bottom: !this.props.message.hasOwnProperty('metaEmbedLink') || isEmpty(this.props.message.metaEmbedLink)
//                                             ? -12 : -16,
//                                         left: 0,
//                                     }}>
//                                     <ReactionSummary
//                                         navigation={this.props.navigation}
//                                         reactSummary={{ ...this.props.reactSummary, message_id: this.props.message._id }}
//                                     />
//                                 </View>
//                                 :
//                                 null
//                         }
//                     </TouchableOpacity>
//                     {
//                         !this.props.message.is_removed
//                             ?
//                             <MessageTail style={{
//                                 position: 'absolute',
//                                 right: 0,
//                                 bottom: -1,
//                                 transform: [{
//                                     rotate: '-10deg'
//                                 }],
//                                 width: 15,
//                                 height: 15
//                             }} />
//                             :
//                             null
//                     }
//                 </React.Fragment>
//             )
//         }
//         catch (error) {
//             return null
//         }
//     }
// }

// export default TextContent;
