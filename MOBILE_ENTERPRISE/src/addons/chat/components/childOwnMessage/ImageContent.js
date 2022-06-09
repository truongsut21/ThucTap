import React, { useContext, useRef, useEffect, useMemo } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { connect, useSelector, useDispatch } from "react-redux";
import ProgressBar from "react-native-progress/Bar";
import { useNavigation } from "@react-navigation/core";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import AntDesign from "react-native-vector-icons/AntDesign";
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import isEqual from "react-fast-compare";
import ReactionSummary from "./ReactionSummary";
import DispatchImage from "../DispatchImage";
import MessageReactionNew from "../Messages/MessageReactionNew";
import MessageStateIcon from "./MessageStateIcon";
import {
  WIDTH,
  HEIGHT,
  _computeDimensionForImageMessage,
  calcImageDimension,
} from "../../controllers/utils";
import * as Action from "../../controllers/actionTypes";

const BrokenImage = require("../../static/imagerror.png");

const InfoContent = ({ _id }) => {
  const { draft_id, time, error } = useSelector(
    (state) => {
      return {
        draft_id: state.ChatStoredReducer.fullMessages[_id].draft_id,
        time: state.ChatStoredReducer.fullMessages[_id].create_date,
        error: state.ChatStoredReducer.fullMessages[_id].errorMessage,
      };
    },
    (prev, next) => isEqual(prev, next)
  );

  try {
    if (_id === draft_id) {
      return null; //đang trọng trạng thái upload image
    }
    return (
      <View
        style={{
          position: "absolute",
          alignItems: "flex-end",
          flexDirection: "row",
          right: 5,
          bottom: 0,
          backgroundColor: "rgba(52, 52, 52, 0.41)",
          borderRadius: 10,
          paddingVertical: 3,
          paddingHorizontal: 5,
        }}
      >
        <React.Fragment>
          <View style={{ paddingRight: 3 }}>
            <Text style={{ fontSize: 11, color: "#fff" }}>
              {format(new Date(time), "HH:mm", { locale: vi })}
            </Text>
          </View>
          <MessageStateIcon isDraft={_id === draft_id} />
        </React.Fragment>
      </View>
    );
  } catch (error) {
    return <React.Fragment></React.Fragment>;
  }
};

const ImageContent = ({ _id, onLongPress, isPoppingup, isPin }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { draft_id, localImage, content, error } = useSelector(
    (state) => {
      const fullMessage = state.ChatStoredReducer.fullMessages;
      const listFiles = state.ChatStoredReducer.listFiles;
      let Message = fullMessage[_id] || {};
      try {
        return {
          draft_id: Message.draft_id,
          localImage: listFiles[`${Message.content._id}_lowprofile`],
          content: Message.content,
          error: Message.errorMessage,
        };
      } catch (error) {
        return {
          draft_id: Message.draft_id,
          content: Message.content,
          error: Message.errorMessage,
        };
      }
    },
    (prev, next) => isEqual(prev, next)
  );

  // const prevlocalImage = useRef(localImage);
  const uploadProgress = useSelector((state) => {
    const fileUpDownloadProgress =
      state.ChatUnstoredReducer.fileUpDownloadProgress;
    return fileUpDownloadProgress[_id] || 0;
  });
  const imageRef = useRef({});

  // useEffect(() => {
  //     if (!localImage && _id !== draft_id) {
  //         dispatch({
  //             type: Action.API_DOWNLOAD_IMAGE,
  //             data: {
  //                 content: content
  //             },
  //             dispatch: dispatch,
  //         })
  //     }
  // }, []);
  useEffect(() => {
    if (!localImage && _id !== draft_id) {
      dispatch({
        type: Action.API_DOWNLOAD_IMAGE,
        data: {
          content: content,
        },
        dispatch: dispatch,
      });
    }
    // prevlocalImage.current = localImage;
  }, [localImage, _id]);

  const onPress = () => {

    try {
      if (_id !== draft_id && imageRef && imageRef.current) {
        imageRef.current.measure((fx, fy, w, h, px, py) => {
          let { width, height } = content.metadata;
          const { imageWidth, imageHeight } = calcImageDimension({
            width,
            height,
          });
          navigation.navigate("PopupImage", {
            image_id: content._id,
            message_id: _id,
            x: px,
            y: py,
            fromWidth: w,
            fromHeight: h,
            toWidth: imageWidth,
            toHeight: imageHeight,
          });
        });
      }
    } catch (error) {}
  };

  const { imageWidth, imageHeight } = useMemo(() => {
    let { height, width } = content.metadata || {};
    const { imageWidth, imageHeight } = _computeDimensionForImageMessage({
      width,
      height,
    });
    return {
      imageWidth,
      imageHeight,
    };
  }, [content.metadata]);

  try {
    // let { height, width } = content.metadata || {};
    // const { imageWidth, imageHeight } = _computeDimensionForImageMessage({ width, height });
    return (
      <TouchableOpacity
        style={[
          {
            height: isPin ? 50 : imageHeight,
            width: isPin ? 50 : imageWidth,
            borderRadius: 7,
            alignItems: "flex-end",
            marginRight: 5,
            marginVertical: isPin ?5: 0,
            backgroundColor: "#ddd",
            // padding:10,
          },
          error
            ? {
                backgroundColor: "#ffc14d",
              }
            : {},
        ]}
        onPress={onPress}
        activeOpacity={1}
        delayPressIn={0}
        delayPressOut={0}
        onLongPress={onLongPress}
        delayLongPress={100}
        ref={(view) => {
          imageRef.current = view;
        }}
      >
        <DispatchImage
          style={{
            height: isPin ? 50 : imageHeight,
            width: isPin ? 50 : imageWidth,
            borderRadius: 7,
            // borderWidth: 1,
            // borderColor: '#ddd',
            //backgroundColor: "#ddd",
          }}
          source={localImage}
          type={"image"}
          data={{
            fileContent: content,
          }}
          // cacheDisabled={true}
        />

       {isPin ? null :  <InfoContent _id={_id} />}
        {error && _id === draft_id ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: imageWidth / 2 - 30,
              bottom: imageHeight / 2 - 30,
              width: 60,
              height: 60,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign
              name="sync"
              size={25}
              color="white"
              style={{
                paddingBottom: 5,
              }}
            />
            <Text style={{ color: "#fff" }}>Lỗi</Text>
          </TouchableOpacity>
        ) : null}
        {_id === draft_id && !error ? (
          <View
            style={{
              marginTop: -8,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <ProgressBar
              useNativeDriver={true}
              progress={uploadProgress}
              width={imageWidth - 2}
              height={5}
              color={"#00A48D"}
              unfilledColor={"#fff"}
              borderColor={"#fff"}
            />
          </View>
        ) : null}

        {/* {
                        !this.props.isPoppingup && this.props.reactSummary && this.props.reactSummary.count > 0
                            ?
                            <View
                                style={{
                                    position: 'absolute',
                                    paddingHorizontal: 5,
                                    marginRight: 7,
                                    bottom: -12,
                                    left: 0
                                }}
                            >

                                <ReactionSummary
                                    navigation={this.props.navigation}
                                    reactSummary={{ ...this.props.reactSummary, message_id: this.props.message._id }}
                                />
                            </View>
                            :
                            null
                    } */}
                    {isPin ? null : <MessageReactionNew
                      isPoppingup={isPoppingup}
                      mid={_id}
                      check={true}
                  />}
      </TouchableOpacity>
    );
  } catch (error) {
    return (
      <TouchableOpacity
        style={{
          height: parseInt((((WIDTH * 3) / 5) * 345) / 820),
          width: parseInt((WIDTH * 3) / 5),
          borderRadius: 5,
          alignItems: "flex-end",
          paddingHorizontal: 5,
        }}
        delayPressIn={0}
        delayPressOut={0}
        onLongPress={onLongPress}
        activeOpacity={1}
      >
        <Image
          source={BrokenImage}
          style={{
            height: parseInt((((WIDTH * 3) / 5) * 345) / 820),
            width: parseInt((WIDTH * 3) / 5),
            borderRadius: 7,
            backgroundColor: "#ddd",
          }}
        />
      </TouchableOpacity>
    );
  }
};

export default React.memo(ImageContent, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});

// function mapStateToProps(state, props) {
//     const fileUpDownloadProgress = state.ChatUnstoredReducer.fileUpDownloadProgress;
//     let needToDownloadImageOfMessage;
//     let fileContent = props.message.fileContent;
//     let listFiles = state.ChatStoredReducer.listFiles
//     if (props.message.send_state && fileContent && fileContent._id) {
//         if (!listFiles[`${fileContent._id}_lowprofile`] ||
//             !listFiles[`${fileContent._id}_lowprofile`].link) {
//             needToDownloadImageOfMessage = true;
//         }
//     }
//     return {
//         image: fileContent && fileContent._id && listFiles[`${fileContent._id}_lowprofile`] &&
//             listFiles[`${fileContent._id}_lowprofile`].link
//             ?
//             listFiles[`${fileContent._id}_lowprofile`].link
//             :
//             false
//         ,
//         needToDownloadImageOfMessage: needToDownloadImageOfMessage,
//         upDownloadProgress: fileUpDownloadProgress[props.message._id] ? fileUpDownloadProgress[props.message._id] : 0
//     }
// }
// export default connect(mapStateToProps)(ImageContent);
