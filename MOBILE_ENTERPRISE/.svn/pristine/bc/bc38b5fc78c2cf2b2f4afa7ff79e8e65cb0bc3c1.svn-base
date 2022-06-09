import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Animated, View, TouchableOpacity, Text } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StatusBar from "../../../base/components/StatusBar";
import { ReactNativeZoomableViewWithGestures } from "./ZoomableImage";
import ImageEditor from "./ImageEditor";
import { WIDTH, HEIGHT } from "../../controllers/utils";
import * as Action from "../../controllers/actionTypes";
import * as ActionAuth from "../../../auth/controllers/actionTypes";
const PopupImage = ({ ...props }) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { x, y, fromWidth, fromHeight, toWidth, toHeight } = route.params;
  const [showEditor, setShowEditor] = useState(false);
  const {
    message,
    image,
    content,
    needToDownloadImageLowProfile,
    needToDownloadImageHighProfile,
  } = useSelector((state) => {
    const type = route.params.image_type;
    const image_id = route.params.image_id;
    const contact_id = route.params.contact_id;
    const message_id = route.params.message_id;
    const cloudURL = route.params.url;
    try {
      if (image_id) {
        const listFiles = state.ChatStoredReducer.listFiles;
        const fullMessages = state.ChatStoredReducer.fullMessages;
        let messageWithoutContent = { ...fullMessages[message_id] };
        let content =
          messageWithoutContent.type === "image"
            ? { ...messageWithoutContent.content }
            : messageWithoutContent.content.find((f) => f._id === image_id);
        delete messageWithoutContent["content"];
        return {
          message: messageWithoutContent,
          image:
            listFiles[`${image_id}_highprofile`] ||
            listFiles[`${image_id}_lowprofile`],
          content: content,
          needToDownloadImageLowProfile: !listFiles[`${image_id}_lowprofile`],
          needToDownloadImageHighProfile: !listFiles[`${image_id}_highprofile`],
        };
      }
      return {};
    } catch (error) {
      return {};
    }
  });
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(x)).current;
  const translateYAnim = useRef(new Animated.Value(y)).current;
  const translateYOutContainerAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(fromWidth / toWidth)).current;
  const scaleNumber = useRef(fromWidth / toWidth);
  const currentZoomTransform = useRef({});
  const [showFeaturesForImage, setShowFeaturesForImage] = useState(false);
  const opacityImageFeatureAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!message) {
      navigation.goBack();
    }
  }, []);

  useEffect(() => {
    // scaleNumber.current = 1;

    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (needToDownloadImageLowProfile) {
      dispatch({
        type: Action.API_DOWNLOAD_IMAGE,
        data: {
          content: content,
        },
        dispatch: dispatch,
      });
    }
    if (needToDownloadImageHighProfile) {
      dispatch({
        type: Action.API_DOWNLOAD_IMAGE_HIGH_QUALITY,
        data: {
          content: content,
        },
        dispatch: dispatch,
      });
    }
  }, [needToDownloadImageLowProfile, needToDownloadImageHighProfile]);

  // const onMove = (e, gestureState) => {
  //     if (touches.length === 1) {
  //         const a = translateYNumber.current + gestureState.dy / 5;
  //         translateYNumber.current = Number(a);
  //         Animated.timing(
  //             translateYAnim,
  //             {
  //                 toValue: a,
  //                 duration: 0,
  //                 useNativeDriver: true
  //             }
  //         ).start();

  //         Animated.timing(
  //             opacityAnim,
  //             {
  //                 toValue: (HEIGHT - Math.abs(gestureState.dy)) / HEIGHT,
  //                 duration: 0,
  //                 useNativeDriver: true
  //             }
  //         ).start();
  //     }
  // }

  // const onRelease = (e, gestureState) => {
  //     //     //Nếu move xa hơn 50 pixel thì cho trượt hình rồi goback
  //     if (Math.abs(gestureState.dy) > 50) {
  //         translateYNumber.current = Math.ceil(gestureState.dy > 50 ? HEIGHT : -HEIGHT);
  //         Animated.timing(
  //             translateYAnim,
  //             {
  //                 toValue: translateYNumber.current,
  //                 duration: 100,
  //                 useNativeDriver: true
  //             }
  //         ).start(finished => {
  //             if (finished) {
  //                 navigation.goBack();
  //             }
  //         });
  //     }
  //     //Nếu ko move đủ xa thì hình quay về vị trí cũ
  //     else {
  //         translateYNumber.current = 0;
  //         Animated.timing(
  //             translateYAnim,
  //             {
  //                 toValue: 0,
  //                 duration: 200,
  //                 useNativeDriver: true
  //             }
  //         ).start();
  //         Animated.timing(
  //             opacityAnim,
  //             {
  //                 toValue: 1,
  //                 duration: 200,
  //                 useNativeDriver: true
  //             }
  //         ).start();
  //     }
  // }

  // const panResponder = React.useMemo(() => PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderGrant: () => {

  //     },
  //     onMoveShouldSetPanResponder: (_, gestureState) => {
  //         const { dx, dy } = gestureState
  //         return (dx > 2 || dx < -2 || dy > 2 || dy < -2)
  //     },

  //     onMoveShouldSetPanResponderCapture: (_, gestureState) => {
  //         const { dx, dy } = gestureState
  //         return (dx > 2 || dx < -2 || dy > 2 || dy < -2)
  //     },
  //     onPanResponderMove: Animated.event([null, {
  //     }],
  //         {
  //             listener: onMove
  //         }
  //     ),
  //     onPanResponderRelease: Animated.event([null, {
  //     }],
  //         {
  //             listener: onRelease
  //         }
  //     )
  // }), []);

  // const onPressImage = (e) => {
  //     if (tapImage.current) {
  //         tapImage.current = false;
  //         if (scaleNumber.current > 1) {
  //             resetTransform();
  //         } else {
  //             doZoomByDoubleTap(e);
  //         }
  //     } else {
  //         tapImage.current = true;
  //         //Đợi 300ms nếu ko có tap thứ 2 thì show/đóng thanh điều hướng
  //         setTimeout(() => {
  //             if (tapImage.current) {
  //                 //set state show nút back, xóa image các kiểu ở đây
  //             }
  //             tapImage.current = false;
  //         }, 300)
  //     }
  // }

  // const doZoomByDoubleTap = (e) => {
  //     const { locationX, locationY } = e.nativeEvent;
  //     const left = locationX, top = locationY;
  //     scaleNumber.current = MAXZOOMSCALE;
  //     translateXNumber.current = -(toWidth - (toWidth - left) * 2) / 2;
  //     translateYNumber.current = -(toHeight - (toHeight - top) * 2) / 2;
  //     Animated.parallel([
  //         Animated.timing(scaleAnim, {
  //             toValue: MAXZOOMSCALE,
  //             duration: 100,
  //             useNativeDriver: true
  //         }),
  //         Animated.timing(translateXAnim, {
  //             toValue: translateXNumber.current,
  //             duration: 100,
  //             useNativeDriver: true
  //         }),
  //         Animated.timing(translateYAnim, {
  //             toValue: translateYNumber.current,
  //             duration: 100,
  //             useNativeDriver: true
  //         }),
  //     ]).start();

  // }

  // const resetTransform = () => {
  //     translateXNumber.current = 0;
  //     translateYNumber.current = 0;
  //     scaleNumber.current = 1;
  //     Animated.parallel([
  //         Animated.timing(translateXAnim, {
  //             toValue: translateXNumber.current,
  //             duration: 100,
  //             useNativeDriver: true
  //         }),
  //         Animated.timing(translateYAnim, {
  //             toValue: translateYNumber.current,
  //             duration: 100,
  //             useNativeDriver: true
  //         }),
  //         Animated.timing(scaleAnim, {
  //             toValue: scaleNumber.current,
  //             duration: 100,
  //             useNativeDriver: true
  //         })
  //     ]).start();
  // }

  const onShiftingAfter = (e1, e2, zoomEventObject) => {
    if (zoomEventObject.zoomLevel === 1) {
      opacityAnim.setValue(
        (HEIGHT - Math.abs(zoomEventObject.offsetY)) / HEIGHT
      );
    }
  };

  const onShiftingEnd = (e, gestureState, zoomEventObject) => {
    if (zoomEventObject.zoomLevel === 1) {
      if (Math.abs(gestureState.dy) > 50) {
        closeImage(gestureState);
      } else {
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const saveImageToGallery = () => {
    if (image) {
      var promise = CameraRoll.saveImageWithTag(image);
      promise
        .then(function (result) {
          dispatch({
            type: ActionAuth.UPDATE_ERROR,
            data: {
              error: "Tải ảnh thành công",
            },
          });
        })
        .catch(function (error) {
          dispatch({
            type: ActionAuth.UPDATE_ERROR,
            data: {
              error: "Tải ảnh thất bại",
            },
          });
        });
    } else {
    }
  };

  const openImageEditor = () => {
    setShowEditor(true);
  };

  //Trigger khi kéo, thả, chạm tấm hình, tụm chung là tất cả hành động
  const onTransform = (e) => {
    currentZoomTransform.current = e;
    //Khi tấm hình đang zoom mà bảng điều khiển image vẫn còn thì phải ẩn đi
    if (
      currentZoomTransform.current &&
      currentZoomTransform.current.zoomLevel > 1 &&
      showFeaturesForImage
    ) {
      doHideImageFeature();
    }
    setTimeout(() => {
      if (
        currentZoomTransform.current.zoomLevel === 1 &&
        currentZoomTransform.current.offsetX === 0 &&
        currentZoomTransform.current.offsetY === 0
      ) {
        if (showFeaturesForImage) {
          doHideImageFeature();
        } else {
          doShowImageFeature();
        }
      }
    }, 200);
  };

  const doShowImageFeature = () => {
    Animated.timing(opacityImageFeatureAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start((finished) => {
      if (finished) {
        setShowFeaturesForImage(true);
      }
    });
  };

  const doHideImageFeature = () => {
    Animated.timing(opacityImageFeatureAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start((finished) => {
      if (finished) {
        setShowFeaturesForImage(false);
      }
    });
  };

  const closeImage = (gestureState) => {
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateYOutContainerAnim, {
      toValue: gestureState && gestureState.dy > 0 ? HEIGHT : -HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start((finished) => {
      if (finished) {
        navigation.goBack();
      }
    });
  };

  const TopImageFeature = useMemo(() => {
    return (
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          width: WIDTH,
          backgroundColor: "#000",
          opacity: opacityImageFeatureAnim,
        }}
      >
        <View
          style={{
            height: insets.top,
          }}
        />
        <View
          style={{
            height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={closeImage}
            activeOpacity={1}
            style={{
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons color="#fff" size={25} name="arrow-back" style={{}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={saveImageToGallery}
            activeOpacity={1}
            style={{
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign color="#fff" size={25} name="download" style={{}} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }, []);

  const BottomImageFeature = useMemo(() => {
    return (
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          width: WIDTH,
          backgroundColor: "#000",
          opacity: opacityImageFeatureAnim,
        }}
      >
        <View
          style={{
            height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={openImageEditor}
            activeOpacity={1}
            style={{
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign color="#fff" size={25} name="edit" style={{}} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <AntDesign color="#fff" size={25} name="download" style={{}} /> */}
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: insets.bottom,
          }}
        />
      </Animated.View>
    );
  }, []);

  if (showEditor) {
    return (
      <ImageEditor
        image_id={route.params.image_id}
        close={(e) => setShowEditor(false)}
      />
    );
  }

  return (
    <Animated.View
      style={{
        opacity: opacityAnim,
        backgroundColor: "#000",
        width: WIDTH,
        height: HEIGHT,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar barStyle={"light-content"} />
      {showFeaturesForImage ? TopImageFeature : null}
      <ReactNativeZoomableViewWithGestures
        maxZoom={3}
        minZoom={1}
        zoomStep={3} //zoom step for double tap
        initialZoom={1}
        contentWidth={toWidth}
        contentHeight={toHeight}
        bindToBorders={true}
        onShiftingAfter={onShiftingAfter}
        onShiftingEnd={onShiftingEnd}
        onTransform={onTransform}
      >
        <Animated.View
          style={{
            transform: [
              {
                translateX: translateXAnim.interpolate({
                  inputRange: [
                    (-toWidth * scaleNumber.current) / 4,
                    toWidth / scaleNumber.current / 2,
                  ],
                  outputRange: [
                    (-toWidth * scaleNumber.current) / 4,
                    toWidth / scaleNumber.current / 2,
                  ],
                  extrapolate: "clamp",
                }),
              },
              {
                translateY: translateYAnim.interpolate({
                  inputRange: [
                    (-toHeight * scaleNumber.current) / 2,
                    toHeight / scaleNumber.current / 2,
                  ],
                  outputRange: [
                    (-toHeight * scaleNumber.current) / 2,
                    toHeight / scaleNumber.current / 2,
                  ],
                  extrapolate: "clamp",
                }),
              },
              {
                scale: scaleAnim,
              },
            ],
          }}
        >
          <Animated.Image
            source={{ uri: image }}
            style={{
              width: toWidth,
              height: toHeight,
            }}
          />
        </Animated.View>
      </ReactNativeZoomableViewWithGestures>
      {route.params.message_id && route.params.image_id && showFeaturesForImage
        ? BottomImageFeature
        : null}
    </Animated.View>
  );
};

export default PopupImage;
