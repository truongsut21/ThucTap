import React from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  View,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
  UIManager,
  // InteractionManager
} from "react-native";

import { connect, useSelector } from "react-redux";
import { hasNotch } from "react-native-device-info";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import isEqual from "react-fast-compare";
import Sticker from "./Sticker";
import ReplyingMessage from "./ReplyingMessage";
// import InputArea from './InputArea';
import { MentionInput } from "./MentionInput";
import MentionSuggestion from "./MentionSuggestion";
import { getStatusBarHeight } from "../../../../config/utilities";
import SimpleGallery from "./Gallery/SimpleGallery";
import PreviewImages from "./Gallery/PreviewImage";
import {
  inputChatRef,
  activeThreadInputRef,
  keepInputByThread,
  removeInputByThread,
  initCloseCameraAndSticker,
} from "../../static/ChatRef";
import * as Action from "../../controllers/actionTypes";
import * as ActionBase from "../../../auth/controllers/actionTypes";
import { WIDTH, HEIGHT } from "../../controllers/utils";
import { socket } from "../../../../config/socket";
var _ = require("lodash");
var ObjectID = require("bson-objectid");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class InputBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.draftContent ? this.props.draftContent : "",
      showSticker: false,
      showGallery: false,
      previewImages: [],
      fileAll: [],
      // showImageDevice: false,
      // dataImageDevice: [],
      // behavior: Platform.OS === 'android' ? '' : 'padding',
      // keyboardVerticalOffset: Platform.OS === 'android' ? 0 : getStatusBarHeight(true),
      heightOfViewBelowKeyboard: 0,
      keyboardUpWhenCloseCameraAndSticker: false,
    };
    this._isMounted = false;
    this.maxWidthInput = 0;
    // this.animateViewBelowKeyboard = new Animated.Value(0);
  }

  closeCameraAndSticker = () => {
    let that = this;
    if (Platform.OS !== "android") {
      LayoutAnimation.configureNext({
        duration: 200,
        update: {
          type: LayoutAnimation.Types.keyboard,
          property: LayoutAnimation.Properties.scaleXY,
        },
      });
    }
    that.setState(
      {
        showImageDevice: false,
        // dataImageDevice: [],
        showSticker: false,
        keyboardUpWhenCloseCameraAndSticker: false,
        heightOfViewBelowKeyboard: 0,
      },
      () => {
        // that.setState({
        // })
        // that.setState({
        //     heightOfViewBelowKeyboard: 0
        // }, () => {
        //     Animated.timing(that.animateViewBelowKeyboard, {
        //         toValue: 0,
        //         duration: 150,
        //         easing: Animated.EasingNode.linear,
        //         useNativeDriver: true
        //     }).start(res => { })
        // })
      }
    );
  };

  // hasAndroidPermission = async () => {
  //     const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  //     const hasPermission = await PermissionsAndroid.check(permission);
  //     if (hasPermission) {
  //         // return true;
  //     }

  //     const status = await PermissionsAndroid.request(permission);
  //     return status === 'granted';
  // }

  // askPhotoAccessPermissions = async () => {
  //     try {
  //         // this.props.dispatch({
  //         //     type: 'UPDATE_IMAGE_TO_UPLOAD',
  //         //     data: []
  //         // })
  //         this.props.dispatch({
  //             type: 'UPDATE_ACTIVE_MESSAGE',
  //             data: '',
  //         })
  //         if (Platform.OS === "android") {
  //             await this.hasAndroidPermission()
  //             PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
  //                 'title': 'Access to device\'s storage',
  //                 'message': ''
  //             }).then(granted => {
  //                 return granted;
  //             })
  //         }
  //     }
  //     catch (error) {

  //     }
  // }

  // getImageSize = async (uri) => {
  //     return new Promise((resolve, reject) => {
  //         Image.getSize(uri, async (width, height) => {
  //             resolve({ width, height })
  //         }, (error) => {
  //             reject(error)
  //         })
  //     })
  // }

  // doUploadSingleImage = async (currentThread, myImageToUpload) => {
  //     try {
  //         if (myImageToUpload.length !== 1) {
  //             return true;
  //         }
  //         let { width, height } = await this.getImageSize(myImageToUpload[0].sourceURL);
  //         let uriToFetch = Platform.OS === 'android' ? myImageToUpload[0].sourceURL : myImageToUpload[0].sourceURL.replace('file://', '')
  //         let resFetch = await fetch(uriToFetch);
  //         let mWidth = 0, mHeight = 0;
  //         let ratio = ((width) * 1.0) / ((height) * 1.0)
  //         if (ratio > 1) {
  //             mWidth = Dimensions.get('window').width / 10.0 * 7.0;
  //             mHeight = (Dimensions.get('window').width / 10.0 * 7.0) / ratio;
  //         }
  //         else if (ratio < 1) {
  //             mWidth = (Dimensions.get('window').height / 10.0 * 4.0) * ratio;
  //             mHeight = Dimensions.get('window').height / 10.0 * 4.0;
  //         }
  //         else if (ratio === 1) {
  //             mHeight = Dimensions.get('window').width / 10.0 * 7.0;
  //             mWidth = Dimensions.get('window').width / 10.0 * 7.0;
  //         }

  //         let draft_id = ObjectID().toString();
  //         let data = {
  //             _id: draft_id,
  //             draft_id,
  //             thread_id: currentThread.thread_id,
  //             create_uid: {
  //             },
  //             send_state: false,
  //             type: 'image',
  //             create_date: new Date().getTime(),
  //         }

  //         Object.assign(data, {
  //             fileContent: {
  //                 singleImageToUpload: myImageToUpload[0],
  //                 uri: Platform.OS === 'android' ? myImageToUpload[0].sourceURL : myImageToUpload[0].sourceURL.replace('file://', ''),
  //                 mWidth: parseInt(mWidth),
  //                 mHeight: parseInt(mHeight),
  //                 mimetype: resFetch['_bodyBlob']['_data'].type,
  //                 metadata: {
  //                     width: width,
  //                     height: height
  //                 }
  //             },
  //         })
  //         this.props.dispatch({
  //             type: Action.CREATE_DRAFT_MESSAGE,
  //             data: data,
  //             dispatch: this.props.dispatch
  //         });
  //     } catch (error) {
  //         //
  //     }
  // }

  // doUploadMultiImage = async (currentThread, myImageToUpload) => {
  //     try {
  //         let fileContents = [];
  //         let draft_id = ObjectID().toString();
  //         let data = {
  //             _id: draft_id,
  //             draft_id,
  //             thread_id: currentThread.thread_id,
  //             create_uid: {
  //             },
  //             send_state: false,
  //             type: 'image_group',
  //             create_date: new Date().getTime(),
  //         }
  //         for (let i = 0; i < myImageToUpload.length; i++) {
  //             let { width, height } = await this.getImageSize(myImageToUpload[i].sourceURL);
  //             let uriToFetch = Platform.OS === 'android' ? myImageToUpload[i].sourceURL : myImageToUpload[i].sourceURL.replace('file://', '')
  //             let resFetch = await fetch(uriToFetch);
  //             let mWidth = 0, mHeight = 0;
  //             let ratio = ((width) * 1.0) / ((height) * 1.0)
  //             if (ratio > 1) {
  //                 mWidth = Dimensions.get('window').width / 10.0 * 7.0;
  //                 mHeight = (Dimensions.get('window').width / 10.0 * 7.0) / ratio;
  //             }
  //             else if (ratio < 1) {
  //                 mWidth = (Dimensions.get('window').height / 10.0 * 4.0) * ratio;
  //                 mHeight = Dimensions.get('window').height / 10.0 * 4.0;
  //             }
  //             else if (ratio === 1) {
  //                 mHeight = Dimensions.get('window').width / 10.0 * 7.0;
  //                 mWidth = Dimensions.get('window').width / 10.0 * 7.0;
  //             }

  //             fileContents.push({
  //                 _id: ObjectID().toString(),
  //                 singleImageToUpload: myImageToUpload[i],
  //                 uri: Platform.OS === 'android' ? myImageToUpload[i].sourceURL : myImageToUpload[i].sourceURL.replace('file://', ''),
  //                 mWidth: parseInt(mWidth),
  //                 mHeight: parseInt(mHeight),
  //                 mimetype: resFetch['_bodyBlob']['_data'].type,
  //                 metadata: {
  //                     width: width,
  //                     height: height
  //                 },
  //             })
  //         }

  //         Object.assign(data, {
  //             fileContent: fileContents
  //         })

  //         this.setState({
  //             showSticker: false,
  //             showImageDevice: false,
  //             dataImageDevice: [],
  //             heightOfViewBelowKeyboard: 0
  //         }, () => {
  //             this.props.dispatch({
  //                 type: Action.CREATE_DRAFT_GROUP_MESSAGE,
  //                 data: data,
  //                 dispatch: this.props.dispatch
  //             });
  //         })
  //     } catch (error) {
  //     }
  // }

  // doUpload = async () => {
  //     try {
  //         if (this.props.myImageToUpload.length > 0 && this.props.myImageToUpload.length <= 9) {
  //             let { myImageToUpload } = this.props;
  //             myImageToUpload = _.cloneDeep(myImageToUpload)
  //             let currentThread = _.cloneDeep(this.props.activeThread || this.props.route.params.thread)

  //             this.props.dispatch({
  //                 type: 'UPDATE_IMAGE_TO_UPLOAD',
  //                 data: [],
  //             });

  //             if (myImageToUpload.length > 1) {
  //                 // multiImageGroupCode = Date.parse(new Date()).toString() + _.random(0, 9999).toString() + currentThread.thread_id;
  //                 this.doUploadMultiImage(currentThread, myImageToUpload);
  //             } else {
  //                 this.doUploadSingleImage(currentThread, myImageToUpload);
  //             }
  //         }
  //     }
  //     catch (error) {
  //     }
  // }
  // onChange = (event) => {
  //     this.setState({
  //         content: event.nativeEvent.text
  //     })
  // }
  onChangeText = (text) => {
    if ((text && !this.state.content) || (!text && this.state.content)) {
      LayoutAnimation.configureNext({
        duration: 200,
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleXY,
        },
      });
    }
    const checkText = text.trim();
    if (checkText) {
      this.setState({
        content: text,
      });
    }
    else
    {
      this.setState({
        content: "",
      });
    }
  };

  actualSend = (content) => {
    // const timer = setTimeout(() => {
    let currentTime = Date.parse(new Date());
    let draft_id = ObjectID().toString();
    let data = {
      _id: draft_id,
      draft_id,
      parent_id: "",
      thread_id: this.props.activeThreadId,
      content: {
        content: content,
      },
      type: "text",
      create_uid: this.props.myUserId,
      create_date: currentTime,
    };
    if (content) {
      this.props.dispatch({
        type: Action.CREATE_DRAFT_MESSAGE,
        data,
        dispatch: this.props.dispatch,
      });
    }
  };

  onSend = (ev) => {
    try {
      if (this.state.content) {
        let contents = `${this.state.content}`;
        this.setState(
          {
            content: "",
          },
          () => {
            //split message nếu quá dài
            //Bước 1: split message theo space
            //Bước 2: join message lại theo space và đảm bảo message dưới 1500 từ
            //Nếu message ko có khoảng trắng thì tự split mà ko cần quan tâm space
            //đọc code
            let splittedContent = [];
            if (contents.length > 1500) {
              splittedContent = contents.split(" ");
              let toSendContent = "";
              for (let i = 0; i < splittedContent.length; i++) {
                //mỗi một splittedContent[i] là 1 mẩu tin nhắn bị cắt bởi space
                //đây là mẩu tin nhắn ko có space và dài hơn 1500 ký tự
                //cắt thành mẩu tin nhắn nhỏ hơn với mỗi mẫu là 1500 ký tự để gửi
                if (splittedContent[i].length > 1500) {
                  //Gửi tin nhắn dư trước đó
                  if (toSendContent.length > 0) {
                    this.actualSend(`${toSendContent}`);
                    toSendContent = "";
                  }

                  //cắt chuổi tin nhắn 1500 ký tự để gửi đi
                  let numberToSplitDeeper = Math.ceil(
                    (splittedContent[i].length * 1.0) / (1500 * 1.0)
                  );
                  for (let j = 0; j <= numberToSplitDeeper; j++) {
                    this.actualSend(
                      splittedContent[i].slice(j * 1500, (j + 1) * 1500)
                    );
                  }
                } else {
                  //nếu toSendContent thêm mẩu message mà vượt 1500 thì gửi message trước sau đó mới thay thế
                  //mẩu message vào toSendContent
                  if (
                    (toSendContent + " " + splittedContent[i]).length > 1500
                  ) {
                    //Gửi mẩu message cũ trước đã, vì quá dài
                    this.actualSend(`${toSendContent}`);
                    //Nếu đây là message cuối cùng gửi luôn
                    if (i === splittedContent.length - 1) {
                      this.actualSend(splittedContent[i]);
                    } else {
                      toSendContent = splittedContent[i];
                    }
                  } else {
                    if (i === splittedContent.length - 1) {
                      //message cuối cùng rồi, gửi đi thôi
                      this.actualSend(toSendContent + " " + splittedContent[i]);
                    } else {
                      toSendContent = toSendContent + " " + splittedContent[i];
                    }
                  }
                }
              }
            } else {
              this.actualSend(contents);
            }
          }
        );
      } else if (this.state.previewImages.length > 0) {
        this._sendImage();
      }
    } catch (error) {}
  };

  onFastSendSticker = () => {
    if (this.tempPauseFastSendSticker) {
      return;
    }
    let draft_id = ObjectID().toString();
    let data = {
      _id: draft_id,
      draft_id,
      thread_id: this.props.activeThreadId,
      create_date: (new Date() / 1000) * 1000,
      send_state: false,
      create_uid: this.props.myUserId,
      content: {
        stickerType: "cat",
        stickerPosition: 14,
        shortMimetype: "png",
      },
      fileContent: {
        stickerType: "cat",
        stickerPosition: 14,
        shortMimetype: "png",
      },
      type: "sticker",
    };
    this.props.dispatch({
      type: Action.CREATE_DRAFT_MESSAGE,
      data,
      dispatch: this.props.dispatch,
    });
    this.tempPauseFastSendSticker = true;
    setTimeout(() => {
      this.tempPauseFastSendSticker = false;
    }, 200);
  };
  // addImageToUpload = async data => {
  //     if (data) {
  //         // `assets-library://asset/asset.JPG?id=${data.node.image.uri.substring(5, 41)}&ext=JPG`
  //         //
  //         //
  //         let myImageToUpload = this.props.myImageToUpload;
  //         myImageToUpload = _.cloneDeep(myImageToUpload);

  //         if (myImageToUpload.length === 0) {
  //             this.props.dispatch({
  //                 type: 'UPDATE_IMAGE_TO_UPLOAD',
  //                 data: [data]
  //             })
  //             return
  //         }
  //         let index = -1;
  //         index = _.findIndex(myImageToUpload, function (o) {
  //             return _.isEqual(o, data);
  //         });

  //         if (index > -1) {
  //             myImageToUpload = myImageToUpload.filter(image => {
  //                 return !_.isEqual(image, data)
  //             })
  //             this.props.dispatch({
  //                 type: 'UPDATE_IMAGE_TO_UPLOAD',
  //                 data: myImageToUpload
  //             })
  //         }
  //         else {
  //             this.props.dispatch({
  //                 type: 'UPDATE_IMAGE_TO_UPLOAD',
  //                 data: myImageToUpload.concat([data])
  //             })
  //         }
  //     }
  // }
  // renderItemImageInDevice = ({ item, index }) => {
  //     return (
  //         <ImageItem data={item} index={index}
  //             addImageToUpload={this.addImageToUpload}
  //         />
  //     )
  // }
  // ItemSeparatorComponentImageInDevice = () => {
  //     return (
  //         <View style={{ height: 2, backgroundColor: '#fff' }} />
  //     )
  // }
  // ListFooterComponent = () => {
  //     return (
  //         this.state.loading
  //             ?
  //             <View style={{ flex: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
  //                 <ActivityIndicator animating={true} size='small' color='#00A48D' />
  //             </View> : null
  //     )
  // }
  // onEndReached = () => {
  //     if (!this.onEndReachedCalledDuringMomentum && !this.state.loading && this.state.dataImageDevice.length >= 30) {
  //         this.setState({
  //             loading: true,
  //         }, () => {
  //             CameraRoll.getPhotos({
  //                 first: 20,
  //                 after: this.state.end_cursor,
  //                 groupTypes: 'All',
  //                 assetType: 'Photos',
  //             }).then(photos => {
  //                 let dataImageDevice = _.cloneDeep(this.state.dataImageDevice);
  //                 dataImageDevice = dataImageDevice.concat(photos.edges);
  //                 this.setState({
  //                     end_cursor: photos.page_info.end_cursor,
  //                     dataImageDevice: dataImageDevice,
  //                     loading: false,
  //                 })
  //             }).catch(error => {

  //             })

  //             this.onEndReachedCalledDuringMomentum = true
  //         })

  //     }
  // }

  // keyExtractorCameraImage = (item, index) => {
  //     if (item.node && item.node.image && item.node.image.uri) {
  //         return item.node.image.uri.toString();
  //     }
  //     return index.toString()
  // }

  // renderCamera = () => {
  //     return (
  //         <React.Fragment>
  //             <SafeAreaView style={{
  //                 height: Dimensions.get('window').height / 10 * 4,
  //                 backgroundColor: '#fff',
  //             }}>
  //                 <FlatList
  //                     ref={cameraRef}
  //                     numColumns={3}
  //                     data={this.state.dataImageDevice || []}
  //                     renderItem={this.renderItemImageInDevice}
  //                     keyExtractor={this.keyExtractorCameraImage}
  //                     ItemSeparatorComponent={this.ItemSeparatorComponentImageInDevice}
  //                     onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
  //                     onEndReachedThreshold={1}
  //                     onEndReached={this.onEndReached}
  //                     ListFooterComponent={this.ListFooterComponent}
  //                 />

  //                 {
  //                     this.props.myImageToUpload.length > 0
  //                         ?
  //                         <TouchableOpacity style={{
  //                             bottom: 20, left: 0, right: 0,
  //                             alignItems: 'flex-end',
  //                             paddingHorizontal: 40,
  //                             position: 'absolute',
  //                         }} delayPressIn={0} onPress={this.doUpload} disabled={this.props.myImageToUpload.length > 9}>
  //                             <View style={{
  //                                 width: Dimensions.get('window').width / 10 * 8,
  //                                 backgroundColor: this.props.myImageToUpload.length > 9 ? '#aaa' : '#2680d9',
  //                                 alignSelf: 'center',
  //                                 alignItems: 'center',
  //                                 paddingVertical: 15,
  //                                 borderRadius: 12,
  //                             }}>
  //                                 <Text style={{
  //                                     color: '#fff',
  //                                     fontSize: 17,
  //                                 }}>
  //                                     Gửi ảnh {'(' + this.props.myImageToUpload.length + ')'}
  //                                 </Text>
  //                             </View>
  //                         </TouchableOpacity>
  //                         :
  //                         null
  //                 }
  //             </SafeAreaView>
  //         </React.Fragment>
  //     )
  // }

  goToMoreInput = (e) => {
    this.props.navigation.navigate("MoreInput");
  };

  // openGallery = (e) => {
  //     let thread = this.props.activeThread;
  //     removeInputByThread(thread.thread_id);
  //     this.askPhotoAccessPermissions().then(res => {
  //         if ((Platform.OS === 'android' && res === 'granted') || Platform.OS === 'ios') {
  //             ImagePicker.openPicker({
  //                 width: 200,
  //                 height: 200,
  //                 compressImageMaxHeight: 400,
  //                 compressImageMaxWidth: 400,
  //                 cropping: false,
  //                 multiple: true,
  //                 mediaType: 'photo',
  //                 sortOrder: 'desc'
  //             }).then(images => {
  //                 if (images.length === 1) {
  //                     this.doUploadSingleImage(this.props.activeThread, images);
  //                 } else if (images.length > 1) {
  //                     this.doUploadMultiImage(this.props.activeThread, images);
  //                 }
  //             }).catch(error => {

  //             })
  //         }
  //     })
  // }

  // doUploadVideo = async (video) => {
  //     const { width, height } = video;
  //     let currentThread = this.props.activeThread;
  //     let draft_id = ObjectID().toString();
  //     let data = {
  //         _id: draft_id,
  //         draft_id,
  //         thread_id: currentThread.thread_id,
  //         create_uid: {
  //         },
  //         send_state: false,
  //         type: 'video',
  //         create_date: new Date().getTime(),
  //     }

  //     Object.assign(data, {
  //         fileContent: {
  //             videoToUpload: video,
  //             uri: Platform.OS === 'android' ? video.sourceURL : video.sourceURL.replace('file://', ''),
  //             mimetype: video.mime,
  //             metadata: {
  //                 width: width,
  //                 height: height
  //             }
  //         },
  //     })
  //     this.props.dispatch({
  //         type: Action.CREATE_DRAFT_MESSAGE,
  //         data: data,
  //         dispatch: this.props.dispatch
  //     });
  // }

  // openVideoGallery = (e) => {
  //     let thread = this.props.activeThread;
  //     removeInputByThread(thread.thread_id);
  //     this.askPhotoAccessPermissions().then(res => {
  //         if ((Platform.OS === 'android' && res === 'granted') || Platform.OS === 'ios') {
  //             ImagePicker.openPicker({
  //                 width: 200,
  //                 height: 200,
  //                 compressImageMaxHeight: 400,
  //                 compressImageMaxWidth: 400,
  //                 cropping: false,
  //                 mediaType: 'video',
  //             }).then(video => {
  //                 this.doUploadVideo(video);
  //             }).catch(error => {

  //             })
  //         }
  //     })
  // }

  openSticker = () => {
    try {
      LayoutAnimation.configureNext({
        duration: 200,
        update: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.scaleXY,
        },
      });
      removeInputByThread(this.props.activeThreadId);
      let height = (HEIGHT / 10) * 3.5;
      if (Platform.OS === "android") {
        if (inputChatRef.current.isFocused()) {
          Keyboard.dismiss();
        }
        this.setState(
          {
            showSticker: true,
            showGallery: false,
            previewImages: [],
            fileAll: [],
            heightOfViewBelowKeyboard: height,
          },
          () => {}
        );
      } else {
        this.setState(
          {
            showSticker: true,
            showGallery: false,
            previewImages: [],
            fileAll: [],
            heightOfViewBelowKeyboard: height,
          },
          () => {
            inputChatRef.current.blur();
          }
        );
      }
    } catch (error) {}
  };

  closeSticker = () => {
    try {
      if (this.state.showSticker) {
        if (this.state.keyboardUpWhenCloseCameraAndSticker) {
          keepInputByThread(this.props.activeThreadId);
          inputChatRef.current.focus();
          setTimeout(() => {
            this.setState({
              showSticker: false,
              showGallery: false,
            });
          }, 150);
        } else {
          LayoutAnimation.configureNext({
            duration: 200,
            update: {
              type: LayoutAnimation.Types.linear,
              property: LayoutAnimation.Properties.scaleXY,
            },
          });
          this.setState({
            showSticker: false,
            showGallery: false,
            previewImages: [],
            fileAll: [],
            heightOfViewBelowKeyboard: 0,
          });
        }
      }
    } catch (error) {}
  };

  onFocusInput = (ev) => {
    ev.preventDefault();
    try {
      //Tại đây không set showSticker thành false, mà để cho event keyboardidshow sẽ set sticker về không render
      keepInputByThread(this.props.activeThreadId);
      if (Platform.OS === "android") {
        if (this.state.showSticker || this.state.showGallery) {
          this.setState(
            {
              showSticker: false,
              showGallery: false,
              previewImages: [],
              fileAll: [],
              heightOfViewBelowKeyboard: 0,
              keyboardUpWhenCloseCameraAndSticker: false,
            },
            () => {}
          );
        } else {
        }
      } else {
        this.setState({
          keyboardUpWhenCloseCameraAndSticker: true,
        });
      }
    } catch (error) {}
  };

  _keyboardDidShow = (e) => {
    this.setState({
      showSticker: false,
      showGallery: false,
      previewImages: [],
      fileAll: [],
    });
    //
    // if (this.state.heightOfViewBelowKeyboard === 0) {
    //     //
    //     this.setState({
    //         heightOfViewBelowKeyboard: e.endCoordinates.height - (Platform.OS === 'android' ? 0 : getStatusBarHeight(true) - 10),
    //     })
    // } else {
    //     // this.setState({
    //     //     heightOfViewBelowKeyboard: e.endCoordinates.height - (Platform.OS === 'android' ? 0 : getStatusBarHeight(true) - 10),
    //     // }, () => {
    //     this.setState({
    //         showImageDevice: false,
    //         dataImageDevice: [],
    //         showSticker: false,
    //     })
    //     // })
    // }
  };

  _keyboardWillShow = (e) => {
    LayoutAnimation.configureNext({
      duration: _.cloneDeep(e.duration),
      update: {
        type: LayoutAnimation.Types.keyboard,
        property: LayoutAnimation.Properties.scaleXY,
      },
    });
    if (Platform.OS !== "android") {
      let height =
        e.endCoordinates.height -
        (Platform.OS === "android"
          ? 0
          : getStatusBarHeight(true) - (hasNotch() ? 10 : 20));
      this.setState({
        heightOfViewBelowKeyboard: height,
      });
    }

    // if (this.state.heightOfViewBelowKeyboard === 0 || this.state.heightOfViewBelowKeyboard === Dimensions.get('window').height / 10 * 4) {
    //     if (e.endCoordinates && e.endCoordinates.height) {
    //         let height = e.endCoordinates.height - (Platform.OS === 'android' ? 0 : getStatusBarHeight(true) - (hasNotch() ? 10 : 20));
    //         this.setState({
    //             heightOfViewBelowKeyboard: height
    //         }, () => {
    //             Animated.timing(this.animateViewBelowKeyboard, {
    //                 toValue: height,
    //                 duration: 150,
    //                 easing: Animated.EasingNode.linear,
    //                 useNativeDriver: true
    //             }).start(res => {
    //             })
    //         })
    //     }
  };

  _keyboardDidHide = (e) => {};

  _keyboardWillHide = (e) => {
    if (
      !this.state.showSticker &&
      !this.state.showGallery &&
      Platform.OS !== "android"
    ) {
      LayoutAnimation.configureNext({
        duration: _.cloneDeep(e.duration),
        update: {
          type: LayoutAnimation.Types.keyboard,
          property: LayoutAnimation.Properties.scaleX,
        },
      });
      this.setState({
        heightOfViewBelowKeyboard: 0,
      });
    }
  };

  _keyboardWillChangeFrame = (e) => {};

  componentDidMount() {
    try {
      initCloseCameraAndSticker(this.closeCameraAndSticker);
      if (activeThreadInputRef.indexOf(this.props.activeThreadId) > -1) {
        setTimeout(() => {
          this.setState({
            // behavior: Platform.OS === 'android' ? '' : 'padding',
            // keyboardVerticalOffset: Platform.OS === 'android' ? 0 : getStatusBarHeight(true),
          });
          inputChatRef.current.focus();
        }, 150);
      }

      if (Platform.OS !== "android") {
        this.keyboardDidShowListener = Keyboard.addListener(
          "keyboardDidShow",
          this._keyboardDidShow
        );
        this.keyboardWillShowListener = Keyboard.addListener(
          "keyboardWillShow",
          this._keyboardWillShow
        );
        this.keyboardDidHideListener = Keyboard.addListener(
          "keyboardDidHide",
          this._keyboardDidHide
        );
        this.keyboardWillHideListener = Keyboard.addListener(
          "keyboardWillHide",
          this._keyboardWillHide
        );
        this.keyboardWillChangeFrameListener = Keyboard.addListener(
          "keyboardWillChangeFrame",
          this._keyboardWillChangeFrame
        );
      }

      if (this.props.draftContent) {
        this.props.dispatch({
          type: Action.UPDATE_INPUTTING_CONTENT,
          ttype: "remove",
          data: {
            thread_id: this.props.activeThreadId,
          },
        });
      }
    } catch (error) {}
  }
  componentWillUnmount() {
    if (Platform.OS !== "android") {
      this.keyboardDidShowListener.remove();
      this.keyboardWillShowListener.remove();
      this.keyboardDidHideListener.remove();
      this.keyboardWillHideListener.remove();
      this.keyboardWillChangeFrameListener.remove();
    }
    if (this.state.content) {
      this.props.dispatch({
        type: Action.UPDATE_INPUTTING_CONTENT,
        ttype: "save",
        data: {
          thread_id: `${this.props.activeThreadId}`,
          content: `${this.state.content}`,
        },
      });
    }
    socket.emit("stop_typing", {
      token: this.props.token,
      thread_id: this.props.activeThreadId,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    try {
      if (
        !this.props.activeThreadId &&
        !isEqual(prevProps.activeThreadId, this.props.activeThreadId)
      ) {
        // this.props.dispatch({
        //     type: Action.EMIT_IS_TYPING_IN_THREAD,
        //     ttype: 'client_cancel_typing',
        //     data: {
        //         thread_id: prevProps.activeThreadId
        //     }
        // })
      }

      if (!this.state.content) {
        this.props.dispatch({
          type: Action.UPDATE_INPUTTING_CONTENT,
          ttype: "remove",
          data: {
            thread_id: `${this.props.activeThreadId}`,
          },
        });
      }

      if (
        prevState.content.length === 0 &&
        this.state.content.length > 0 &&
        !isEqual(prevState.content, this.state.content)
      ) {
        socket.emit("is_typing", {
          token: this.props.token,
          thread_id: this.props.activeThreadId,
        });

        // this.props.dispatch({
        //     type: Action.EMIT_IS_TYPING_IN_THREAD,
        //     ttype: 'client_typing',
        //     data: {
        //         thread_id: prevProps.activeThreadId
        //     }
        // })
      }

      if (
        (prevState.content.length > 0 && this.state.content.length === 0) ||
        (!this.state.content && !isEqual(prevState.content, this.state.content))
      ) {
        socket.emit("stop_typing", {
          token: this.props.token,
          thread_id: this.props.activeThreadId,
        });
        // this.props.dispatch({
        //     type: Action.EMIT_IS_TYPING_IN_THREAD,
        //     ttype: 'client_cancel_typing',
        //     data: {
        //         thread_id: prevProps.activeThreadId
        //     }
        // })
      }
    } catch (error) {}
  }

  openGallery = () => {
    try {
      LayoutAnimation.configureNext({
        duration: 200,
        update: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.scaleXY,
        },
      });
      removeInputByThread(this.props.activeThreadId);
      let height = (HEIGHT / 10) * 3.5;
      if (Platform.OS === "android") {
        if (inputChatRef.current.isFocused()) {
          Keyboard.dismiss();
        }
        this.setState(
          {
            showSticker: false,
            showGallery: true,
            heightOfViewBelowKeyboard: height,
          },
          () => {}
        );
      } else {
        this.setState(
          {
            showSticker: false,
            showGallery: true,
            heightOfViewBelowKeyboard: height,
          },
          () => {
            inputChatRef.current.blur();
          }
        );
      }
    } catch (error) {}
  };

  closeGallery = () => {
    try {
      if (this.state.showGallery) {
        if (this.state.keyboardUpWhenCloseCameraAndSticker) {
          keepInputByThread(this.props.activeThreadId);
          inputChatRef.current.focus();
          setTimeout(() => {
            this.setState({
              showSticker: false,
              showGallery: false,
              previewImages: [],
              fileAll: [],
            });
          }, 150);
        } else {
          LayoutAnimation.configureNext({
            duration: 200,
            update: {
              type: LayoutAnimation.Types.linear,
              property: LayoutAnimation.Properties.scaleXY,
            },
          });
          this.setState({
            showSticker: false,
            showGallery: false,
            previewImages: [],
            fileAll: [],
            heightOfViewBelowKeyboard: 0,
          });
        }
      }
    } catch (error) {}
  };

  onPressImage = (image) => {
    try {
      let whichAction = "";
      let i = this.state.previewImages.findIndex((i) => i.path === image.path);
      if (i !== -1) {
        whichAction = "remove";
      } else {
        whichAction = "add";
      }
      if (whichAction === "add") {
        if (this.state.previewImages.length >= 5) {
          this.props.dispatch({
            type: ActionBase.UPDATE_ERROR,
            data: {
              error: "Chỉ có thể tải lên tối đa 5 hình",
            },
          });
          return true;
        }
        this.setState({
          previewImages: [...this.state.previewImages, { ...image }],
        });
      } else {
        let cloneImages = [...this.state.previewImages];
        cloneImages.splice(i, 1);
        this.setState({
          previewImages: cloneImages,
        });
      }
    } catch (error) {}
  };


  _sendImage = () => {
    const chosenImages = [...this.state.previewImages];
    const currentTime = Date.parse(new Date());
    const draft_id = ObjectID().toString();
    const data = {
      _id: draft_id,
      draft_id,
      parent_id: "",
      thread_id: this.props.activeThreadId,
      create_uid: this.props.myUserId,
      create_date: currentTime,
    };
    if (chosenImages.length === 1) {
      let content = {
        _id: ObjectID().toString(),
        link: chosenImages[0].path,
        filename: chosenImages[0].filename,
        metadata: chosenImages[0].metadata,
      };
      this.props.dispatch({
        type: Action.CREATE_DRAFT_MESSAGE,
        data: { ...data, content: { ...content }, type: "image" },
        dispatch: this.props.dispatch,
      });
    } else {
      if (chosenImages.length > 5) {
        this.props.dispatch({
          type: ActionBase.UPDATE_ERROR,
          data: {
            error: "Chỉ có thể tải lên tối đa 5 hình",
          },
        });
        return true;
      }
      let contents = [];
      chosenImages.forEach((img) => {
        contents.push({
          _id: ObjectID().toString(),
          link: img.path,
          filename: img.filename,
          metadata: img.metadata,
        });
      });
      this.props.dispatch({
        type: Action.CREATE_DRAFT_GROUP_MESSAGE,
        data: { ...data, content: contents, type: "image_group" },
        dispatch: this.props.dispatch,
      });
    }
    this.setState({
      previewImages: [],
    });
  };

  render() {
    try {
      return (
        <View>
          <ReplyingMessage />
          <PreviewImages
            previewImages={this.state.previewImages}
            onPressImage={this.onPressImage}
          />
          <View
            style={{
              maxHeight: 120,
              backgroundColor: "#fff",
              // paddingHorizontal: 10,
              borderTopWidth: 0.4,
              // borderColor: 'rgba(0,0,0,0.04)',
              borderColor: "#ddd",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // paddingBottom: 6
                paddingVertical: 3,
                // width:80
              }}
            >
              <TouchableOpacity
                onPress={this.goToMoreInput}
                delayPressIn={0}
                delayPressOut={0}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 35,
                  height: 35,
                }}
              >
                <Foundation size={25} color="#8c8c8c" name="indent-more" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  !this.state.showGallery ? this.openGallery : this.closeGallery
                }
                delayPressIn={0}
                delayPressOut={0}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 35,
                  height: 35,
                  marginRight: 5,
                }}
              >
                <Ionicons
                  size={25}
                  color={this.state.showGallery ? "#00A48D" : "#8c8c8c"}
                  name="image"
                />
              </TouchableOpacity>
              

              {/* <TouchableOpacity
                                onPress={this.state.showImageDevice ? this.closeGallery : this.openGallery}
                                delayPressIn={0}
                                delayPressOut={0}
                                style={{ padding: 3, marginRight: 6, paddingLeft: 0 }}>
                                <Entypo
                                    style={{
                                        width: 26, height: 25,
                                        color: this.state.showImageDevice ? '#00A48D' : '#8c8c8c'
                                    }}
                                    size={25} name='images' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.state.showImageDevice ? this.closeGallery : this.openVideoGallery}
                                delayPressIn={0}
                                delayPressOut={0}
                                style={{ padding: 3, marginRight: 6, paddingLeft: 0 }}>
                                <Entypo
                                    style={{
                                        width: 26, height: 25,
                                        color: this.state.showImageDevice ? '#00A48D' : '#8c8c8c'
                                    }}
                                    size={25} name='video' />
                            </TouchableOpacity> */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  // backgroundColor: '#f0f4f8',
                  // borderRadius: 15
                }}
              >
                {/* <View style={{
                                    flex: 1,
                                }}>
                                    <TextInput
                                        ref={inputChatRef}
                                        style={{
                                            paddingRight: 10,
                                            paddingLeft: 10,
                                            paddingVertical: 7,
                                            textAlignVertical: 'center',
                                            color: '#333',
                                            fontSize: 16,
                                        }}
                                        placeholder={'Nhập...'}
                                        placeholderTextColor='#737373'
                                        multiline={true}
                                        onFocus={this.onFocusInput}
                                        onChangeText={this.onChangeText}
                                        autoCorrect={false}
                                        value={this.state.content}
                                    />
                                </View> */}
                <MentionInput
                  inputRef={inputChatRef}
                  containerStyle={{ flex: 1 }}
                  value={this.state.content}
                  onChange={this.onChangeText}
                  partTypes={[
                    {
                      trigger: "@", // Should be a single character like '@' or '#'
                      renderSuggestions: MentionSuggestion,
                      textStyle: { fontWeight: "bold", color: "#00A48D" }, // The mention style in the input
                    },
                  ]}
                />
              </View>

              <TouchableOpacity
                onPress={
                  this.state.content || this.state.previewImages.length > 0
                    ? this.onSend
                    : this.state.showSticker
                    ? this.closeSticker
                    : this.openSticker
                }
                delayPressIn={0}
                delayPressOut={0}
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={1}
              >
                {this.state.content || this.state.previewImages.length > 0 ? (
                  <FontAwesome
                    style={{ color: "#00A48D" }}
                    size={25}
                    name="send"
                  />
                ) : (
                  <FontAwesome5
                    style={{ color: "#00A48D" }}
                    size={25}
                    name="smile"
                  />
                )}
              </TouchableOpacity>

              {/* {
                                !this.state.content
                                    ?
                                    <TouchableOpacity onPress={this.onFastSendSticker} delayPressOut={0} delayPressIn={0}
                                        style={[{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingHorizontal: 10,
                                            paddingVertical: 2,
                                            marginRight: -15,
                                        }]}>
                                        <FastImage
                                            style={{ width: 30, height: 30 }}
                                            source={{ uri: cat[13].url }}
                                        />
                                    </TouchableOpacity>
                                    :
                                    null
                            } */}
            </View>
          </View>
          <View
            // renderToHardwareTextureAndroid={true}
            style={{
              // height: this.state.showSticker ? (this.state.heightOfViewBelowKeyboard + 25) : this.state.heightOfViewBelowKeyboard,
              height: this.state.heightOfViewBelowKeyboard,
              backgroundColor: "#fff",
            }}
          >
            {this.state.showSticker && <Sticker route={this.props.route} />}
            {this.state.showGallery && (
              <SimpleGallery
                previewImages={this.state.previewImages}
                onPressImage={this.onPressImage}
              />
            )}
          </View>
        </View>
      );
    } catch (error) {
      return <React.Fragment />;
    }
  }
}

function mapStateToProps(state, props) {
  const draftContent = state.ChatUnstoredReducer.draftInputtingContent;
  return {
    token: state.AuthStoredReducer.token,
    myUserId: state.AuthStoredReducer.myUserInfo._id,
    draftContent:
      draftContent && props.activeThreadId && draftContent[props.activeThreadId]
        ? draftContent[props.activeThreadId]
        : null,
  };
}

export default connect(mapStateToProps)(InputBar);
