import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  // ScrollView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  // InteractionManager,
  // Platform, UIManager
} from "react-native";
// import { FlatList } from 'react-native-gesture-handler';
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import LottieView from "lottie-react-native";
import eventEmitter from "../../controllers/utils";
import styles from "../../static/style";
import {
  inputChatRef,
  removeInputByThread,
  keepInputByThread,
  cameraRef,
  stickerRef,
  closeCameraAndSticker,
  chatBoxFlatListRef,
} from "../../static/ChatRef";
import * as Action from "../../controllers/actionTypes";
import { without } from "lodash";
import isEqual from "react-fast-compare";
import IsTyping from "./IsTyping";
import { ActiveThreadContext } from "./context";
import Message from "../Messages/Message";
import HandAddFriend from "./HandAddFriend";
import useTheme from "../../../base/components/useTheme";
const EmptyChat = require("../../../../static/empty-chat.json");

const NewMessageIndicator = ({ indicatorNewMessage }) => {
  const onPressIndicator = () => {
    if (chatBoxFlatListRef.current) {
      chatBoxFlatListRef.current.scrollToIndex({
        animated: true,
        index: 0,
        viewPosition: 0,
      });
    }
  };

  if (!indicatorNewMessage) {
    return null;
  }
  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        right: 20,
        bottom: 70,
        height: 45,
        width: 45,
        borderRadius: 50,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "gray",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 5,
        shadowOpacity: 0.6,
        zIndex: 1000,
      }}
      onPress={onPressIndicator}
    >
      <AntDesign name="arrowdown" size={25} color={"#00A48D"} />
    </TouchableOpacity>
  );
};

const MemoizedNewMessageIndicator = React.memo(NewMessageIndicator);

const ChatBoxMessageZone = ({ ...props }) => {
  const Theme = useTheme();
  const ThreadContext = useContext(ActiveThreadContext);
  const dispatch = useDispatch();
  const { Messages, maxMessageToShow } = useSelector(
    (state) => {
      try {
        const activeThreadId = ThreadContext.activeThreadId;
        const simpleMessages = state.ChatStoredReducer.simpleMessages;
        const max = state.ChatUnstoredReducer.maxMessageToShow;
        let maxShow = !isNaN(max) ? parseInt(max) : 20;
        return {
          Messages:
            simpleMessages && simpleMessages[activeThreadId]
              ? simpleMessages[activeThreadId].slice(0, maxShow)
              : [],
          maxMessageToShow: maxShow,
        };
      } catch (error) {
        return {};
      }
    },
    (prev, next) => isEqual(prev, next)
  );
  const [loading, setLoading] = useState(false);
  const [indicatorNewMessage, setIndicatorNewMessage] = useState(false);
  const [thatAllMessage, setThatAllMessage] = useState(false);
  const maxMessageToShowRef = useRef(maxMessageToShow);
  const newMessageIndicatorRef = useRef(false);
  const thatsAllMessageRef = useRef(false);
  const onEndReachedCalledDuringMomentumRef = useRef(false);
  const indexOfMessageAtBottomWhenScrollingRef = useRef(0);
  const viewabilityConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 100,
  });
  const onViewableItemsChangedRef = useRef(({ viewableItems, changed }) => {
    try {
      // InteractionManager.runAfterInteractions(() => {
      if (viewableItems.length > 0) {
        dispatch({
          type: Action.DO_STUFF_VIEWABLES_IN_MESSAGE_ZONE,
          data: {
            thread_id: ThreadContext.activeThreadId,
            message_ids: without(
              viewableItems.map((i) => {
                //draft message thì ko quan tâm
                if (!i.item._id || i.item._id.length !== 24) {
                  return false;
                }
                return i.item._id;
              }),
              false
            ),
          },
          dispatch: dispatch,
        });
        let currentIndex = viewableItems[0].index;
        indexOfMessageAtBottomWhenScrollingRef.current = currentIndex;
        //Thể hiện mũi tên còn message ở dưới
        if (currentIndex >= 7) {
          if (newMessageIndicatorRef.current !== true) {
            setIndicatorNewMessage(true);
            newMessageIndicatorRef.current = true;
          }
        } else {
          if (newMessageIndicatorRef.current !== false) {
            setIndicatorNewMessage(false);
            newMessageIndicatorRef.current = false;
          }
        }

        //cắt tin nhắn khi kéo xuống những đoạn mới
        //ko cần show những đoạn cũ nữa
        let countSectionOnIndexShow, countAllowSectionShow;
        countSectionOnIndexShow = Math.ceil(currentIndex / 20);
        countAllowSectionShow = Math.ceil(maxMessageToShowRef.current / 20);
        if (
          countAllowSectionShow - countSectionOnIndexShow >= 2 &&
          maxMessageToShowRef.current !== (countSectionOnIndexShow + 1) * 20
        ) {
          dispatch({
            type: Action.UPDATE_MAX_MESSAGE_TO_SHOW,
            data: (countSectionOnIndexShow + 1) * 20,
            // maxMessageToShowRef: maxMessageToShowRef
          });
          if (thatsAllMessageRef.current === true) {
            setThatAllMessage(false);
          }
        } else if (currentIndex === 0 && maxMessageToShow.current > 20) {
          dispatch({
            type: Action.UPDATE_MAX_MESSAGE_TO_SHOW,
            data: 20,
            // maxMessageToShowRef: maxMessageToShowRef
          });
          if (thatsAllMessageRef.current === true) {
            setThatAllMessage(false);
          }
        }
      }
      // })
    } catch (error) {}
  });

  useEffect(() => {
    eventEmitter.addListener("i_have_sent_message", () => {
      if (indexOfMessageAtBottomWhenScrollingRef.current > 0) {
        scrollToMessage({ _id: Messages[0]._id });
      }
    });
    return () => eventEmitter.removeAllListeners();
  }, []);

  useEffect(() => {
    maxMessageToShowRef.current = maxMessageToShow;
  }, [maxMessageToShow]);

  useEffect(() => {
    thatsAllMessageRef.current = thatAllMessage;
  }, [thatAllMessage]);

  useEffect(() => {
    if (thatAllMessage) {
      setThatAllMessage(false);
    }
  }, [ThreadContext.activeThreadId]);

  // const scrollToMessage = useCallback((data) => {
  //     try {
  //         //
  //         //Cần rework lại để gửi về watcher tìm kiếm, sau đó set max message to render lại để render được nhiều hơn
  //         //Sau đó mới có thể scrolltoIndex được
  //         //
  //         dispatch({
  //             type: Action.SCROLL_TO_MESSAGE,
  //             data: {
  //                 message_id: data._id,
  //                 chatBoxFlatListRef
  //             }
  //         })
  //         // let index = Messages.findIndex(message => {
  //         //     return message._id === data._id
  //         // })

  //         // if (index > -1 && chatBoxFlatListRef) {
  //         //     if (chatBoxFlatListRef.current) {
  //         //         chatBoxFlatListRef.current.scrollToIndex({
  //         //             animated: true,
  //         //             index,
  //         //             viewPosition: 0
  //         //         });
  //         //     }
  //         // }
  //     } catch (error) {

  //     }
  // }, []);

  const scrollToMessage = (data) => {
    dispatch({
      type: Action.SCROLL_TO_MESSAGE,
      data: {
        scrollToNewest: true,
        message_id: data._id,
        chatBoxFlatListRef,
      },
    });
  };

  const unsetLoadingOldMessage = (data) => {
    try {
      onEndReachedCalledDuringMomentumRef.current = false;
      setLoading(false);
      setThatAllMessage(data.thatsAllMessage);
    } catch (error) {}
  };

  const ListHeaderComponent = () => {
    return null;
  };

  const ListFooterComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator animating={true} size="small" color="#00A48D" />
        ) : null}
      </View>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            transform: [
              {
                scaleY: -1,
              },
            ],
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 15,
            alignItems: "center",
            justifyContent: "center",
            maxWidth: 300,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Chưa có tin nhắn nào
          </Text>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 13,
            }}
          >
            Hãy bắt đầu cuộc trò chuyện để có nhiều bạn mới
          </Text>
        </View>
        <View
          style={{
            transform: [
              {
                rotate: "180deg",
              },
            ],
          }}
        >
          <LottieView
            source={EmptyChat}
            style={{
              width: 300,
              height: 300,
            }}
            autoPlay
            loop
          />
        </View>
      </View>
    );
  };

  const keyExtractor = (item) => {
    if (item && (item.draft_id || item._id)) {
      return item.draft_id ? item.draft_id.toString() : item._id.toString();
    } else {
      return null;
    }
  };

  const renderItem = ({ item, index }) => {
    // const renderItem = (item, index ) => {
    if (!item) {
      return null;
    }

    return (
      <Message
        // key={item._id}
        mid={item._id}
        newer_mid={Messages[index - 1] ? Messages[index - 1]._id : null}
        older_mid={Messages[index + 1] ? Messages[index + 1]._id : null}
        is_newest_mid={index === 0}
        activeThreadId={ThreadContext.activeThreadId}
      />
    );
  };

  const onMomentumScrollBegin = () => {
    onEndReachedCalledDuringMomentumRef.current = false;
  };

  const onEndReached = () => {
    try {
      let thread_id = ThreadContext.activeThreadId;
      // if (Messages.length >= 20) {

      if (
        !onEndReachedCalledDuringMomentumRef.current &&
        !loading &&
        !thatAllMessage
      ) {
        // if (!onEndReachedCalledDuringMomentumRef.current && !loading && data && !thatAllMessage) {
        onEndReachedCalledDuringMomentumRef.current = true;
        setLoading(true);
        setTimeout(() => {
          dispatch({
            type: Action.API_FETCH_MESSAGE_OLDER,
            dispatch: dispatch,
            data: {
              thread_id: thread_id,
            },
            unsetLoadingOldMessage: unsetLoadingOldMessage,
          });
        }, 50);
      }
      // }
    } catch (error) {}
  };

  const onTouchEnd = () => {
    try {
      if (inputChatRef.current) {
        inputChatRef.current.blur();
        let thread = ThreadContext.activeThreadId;
        if (thread) {
          removeInputByThread(thread);
        }
      }

      if (cameraRef.current || stickerRef.current) {
        closeCameraAndSticker();
      }
    } catch (error) {}
  };

  //xử lý thêm bạn

  try {
    return (
      <React.Fragment>
        {/* liem viet */}
        <HandAddFriend />
        {/* liem viet */}
        <View style={[styles.aav]}>
          <FlatList
            style={{
              zIndex: 0,
              backgroundColor: Theme.backgroundColor
            }}
            contentContainerStyle={{ flexGrow: 1 }}
            ref={chatBoxFlatListRef}
            keyboardShouldPersistTaps="always"
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            ListEmptyComponent={ListEmptyComponent}
            inverted={true}
            showsVerticalScrollIndicator={true}
            initialNumToRender={20}
            data={Messages}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onMomentumScrollBegin={onMomentumScrollBegin}
            onEndReachedThreshold={0.2}
            onEndReached={onEndReached}
            onTouchEnd={onTouchEnd}
            onViewableItemsChanged={onViewableItemsChangedRef.current}
            viewabilityConfig={viewabilityConfigRef.current}
          />
          <IsTyping activeThreadId={ThreadContext.activeThreadId || null} />
        </View>

        <MemoizedNewMessageIndicator
          indicatorNewMessage={indicatorNewMessage}
        />
      </React.Fragment>
    );
  } catch (error) {
    return (
      <React.Fragment>
        <Text style={{ color: "#000", fontSize: 17 }}>
          CBMZ: {error.toString()}
        </Text>
      </React.Fragment>
    );
  }
};

export default React.memo(ChatBoxMessageZone, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});
