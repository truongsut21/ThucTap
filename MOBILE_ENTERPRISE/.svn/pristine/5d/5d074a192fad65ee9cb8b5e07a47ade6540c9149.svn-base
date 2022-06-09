import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { Animated, Platform, TouchableOpacity, View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import Entypo from "react-native-vector-icons/Entypo";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Clipboard from "@react-native-community/clipboard";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Action from "../../controllers/actionTypes";
import * as ActionBase from '../../../base/controllers/actionTypes';
import {
    HEIGHT, SCREEN_HEIGHT, WIDTH
} from "../../controllers/utils";

const LongPressMessage = ({ }) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
    const myUserId = useSelector(state => {
        return state.AuthStoredReducer.myUserInfo._id;
    }, (prev, next) => prev === next);
    const isMember = useSelector(state => {
        try {
            const activeThreadId = state.ChatUnstoredReducer.activeThreadId;
            return state.ChatStoredReducer.threadMembers[activeThreadId][myUserId].status === 1;
        } catch (error) {
            return false;
        }
    }, (prev, next) => prev === next);
    const {Message,is_removed} = useSelector(state => {
        try {
            const messsage = state.ChatStoredReducer.fullMessages[route.params.mid];
            let is_removed= false;
            if(messsage && messsage.is_removed)
            {
                is_removed =  messsage.is_removed ;
            }
            return {
                Message:messsage,
                is_removed,
            }
        } catch (error) {
            return null;
        }
    }, (prev, next) => isEqual(prev, next));

    const canPinMessage = useSelector(state => {
        if (!isMember || !Message || Message._id === Message.draft_id) return false;
        try {
            const pinMessages = state.ChatStoredReducer.pinMessages || {};
            let existInPin = pinMessages[Message.thread_id] && pinMessages[Message.thread_id][Message._id];
            if (existInPin) return false;

            const activeThreadId = state.ChatUnstoredReducer.activeThreadId;
            let thread = state.ChatStoredReducer.fullThreads[activeThreadId];
            if (!thread.is_group) return true;
            if (thread.who_can_pin_message !== 'only_leader') {
                return true;
            }
            const threadMembers = state.ChatUnstoredReducer.threadMembers;
            let step1 = threadMembers[activeThreadId][myUserId].thread_member_position === 1 ||
                threadMembers[activeThreadId][myUserId].thread_member_position === 3;
            if (!step1) false;
            return true;
        } catch (error) {
            return false;
        }
    }, (prev, next) => prev === next);
    const canUnpinMessage = useSelector(state => {
        if (!isMember || !Message || Message._id === Message.draft_id) return false;
        try {
            const pinMessages = state.ChatStoredReducer.pinMessages || {};
            let existInPin = pinMessages[Message.thread_id] && pinMessages[Message.thread_id][Message._id];
            if (!existInPin) return false; //message chưa được pin thì ko thể unpin

            const activeThreadId = state.ChatUnstoredReducer.activeThreadId;
            let thread = state.ChatStoredReducer.fullThreads[activeThreadId];
            if (!thread.is_group) return true;
            if (thread.who_can_pin_message !== 'only_leader') {
                return true;
            }
            const threadMembers = state.ChatUnstoredReducer.threadMembers;
            let step1 = threadMembers[activeThreadId][myUserId].thread_member_position === 1 ||
                threadMembers[activeThreadId][myUserId].thread_member_position === 3;
            return step1;
        } catch (error) {
            return false;
        }
    }, (prev, next) => prev === next);
    // const [show, setShow] = useState(true);
    const [formHeight, setFormHeight] = useState(0);

    let id;

    useEffect(() => {
        if (!isMember || !Message || Message.is_removed) {
            navigation.goBack();
        }
        return ()=>{
            if(id){
                clearTimeout(id);
            }
        }
    }, [Message, isMember]);

    useEffect(()=>{
        return ()=>{
            if(id){
                clearTimeout(id);
            }
        }
    })

    const onLayout = (e) => {
        try {
            setFormHeight(e.nativeEvent.layout.height);

        } catch (error) {

        }
    }

    const close = () => {
        // setShow(false);
        id = setTimeout(() => {
            navigation.goBack()
        }, 200);
    };

    const onPressReply = () => {
        dispatch({
            type: Action.UPDATE_REPLYING_MESSAGE,
            data: Message._id,
        });
        close();
    }

    const onPressCopy = () => {
        try {
            Clipboard.setString(Message.content.content);
            close();
        } catch (error) {

        }
    }

    const onPressDetail = () => {
        dispatch({
            type: ActionBase.NAVIGATE_NEXT_SCREEN_AFTER_AMOUNT_OF_TIME,
            navigation: navigation,
            data: {
                screen: 'MessageReader',
                params: {
                    _id: Message._id
                },
                waitTime: 400,
            }
        })
        close();
    }

    const onPressPinMessage = () => {
        dispatch({
            type: Action.API_PIN_MESSAGE,
            data: {
                thread_id: Message.thread_id,
                message_id: Message._id
            }
        });
        close();
    }

    const onPressUnpinMessage = () => {
        dispatch({
            type: Action.API_UNPIN_MESSAGE,
            data: {
                thread_id: Message.thread_id,
                message_id: Message._id
            }
        });
        close();
    }

    const onPressUnsend = () => {
        dispatch({
            type: Action.API_DELETE_MESSAGE,
            data: {
                _id: Message._id,
            },
        });
        close();
    }

    const onReactLike = () => {
        dispatch({
            type: Action.API_SEND_REACTION_TO_MESSAGE,
            data: {
                message_id: Message._id,
                reaction_type: 1,
            }
        });
        close();
    }

    const onReactHeart = () => {
        dispatch({
            type: Action.API_SEND_REACTION_TO_MESSAGE,
            data: {
                message_id: Message._id,
                reaction_type: 2,
            }
        });
        close();
    }

    const onReactSad = () => {
        dispatch({
            type: Action.API_SEND_REACTION_TO_MESSAGE,
            data: {
                message_id: Message._id,
                reaction_type: 3,
            }
        });
        close();
    }

    const onReactHaha = () => {
        dispatch({
            type: Action.API_SEND_REACTION_TO_MESSAGE,
            data: {
                message_id: Message._id,
                reaction_type: 4,
            }
        });
        close();
    }

    const onReactAngry = () => {
        dispatch({
            type: Action.API_SEND_REACTION_TO_MESSAGE,
            data: {
                message_id: Message._id,
                reaction_type: 5,
            }
        });
        close();
    }

    if (!isMember || !Message || is_removed) return null;

    return <React.Fragment>
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            isVisible={true}
            avoidKeyboard={true}
            backdropOpacity={0.5}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            style={{ margin: 0 }}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    flex: 1,
                    flexDirection: 'row',    //bắt buộc phải có cái này
                    alignItems: 'flex-end',

                }}
                onPress={close}
            >
                <View
                    onLayout={onLayout}
                    style={[{
                        flex: 1,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        backgroundColor: '#fff',
                        paddingBottom: insets.bottom,
                    }, formHeight ? { height: formHeight } : {}]}>
                    {
                        Message.create_uid !== myUserId && Message.type !== 'sticker'
                            ?
                            <View style={{
                                margin: 12,
                                paddingHorizontal: 12,
                                height: WIDTH / 8,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: 'space-between',
                            }}>
                                <TouchableOpacity
                                    onPress={onReactLike}
                                    style={{
                                        width: WIDTH / 8,
                                        height: WIDTH / 8,
                                        borderRadius: WIDTH / 16,
                                        backgroundColor: '#eee',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Image
                                        style={{ width: WIDTH / 16, height: WIDTH / 16 }}
                                        source={require("../../static/emo/like.png")}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onReactHeart}
                                    style={{
                                        width: WIDTH / 8,
                                        height: WIDTH / 8,
                                        borderRadius: WIDTH / 16,
                                        backgroundColor: '#eee',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Image
                                        style={{ width: WIDTH / 16, height: WIDTH / 16 }}
                                        source={require("../../static/emo/heart.png")}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onReactSad}
                                    style={{
                                        width: WIDTH / 8,
                                        height: WIDTH / 8,
                                        borderRadius: WIDTH / 16,
                                        backgroundColor: '#eee',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Image
                                        style={{ width: WIDTH / 16, height: WIDTH / 16 }}
                                        source={require("../../static/emo/sad.png")}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onReactHaha}
                                    style={{
                                        width: WIDTH / 8,
                                        height: WIDTH / 8,
                                        borderRadius: WIDTH / 16,
                                        backgroundColor: '#eee',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Image
                                        style={{ width: WIDTH / 16, height: WIDTH / 16 }}
                                        source={require("../../static/emo/haha.png")}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onReactAngry}
                                    style={{
                                        width: WIDTH / 8,
                                        height: WIDTH / 8,
                                        borderRadius: WIDTH / 16,
                                        backgroundColor: '#eee',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Image
                                        style={{ width: WIDTH / 16, height: WIDTH / 16 }}
                                        source={require("../../static/emo/angry.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                            :
                            null
                    }
                    {
                        Message._id !== Message.draft_id
                            ?

                            <TouchableOpacity
                                onPress={onPressReply}
                                style={{
                                    margin: 12,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    height: 30,
                                }}
                            >
                                <View style={{
                                    width: 40,
                                    alignItems: 'center'
                                }}>
                                    <Entypo name="reply" size={25}
                                        color="#333"
                                        style={{
                                            marginRight: 12,
                                        }} />
                                </View>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: "#333",
                                        fontSize: 15,
                                    }}
                                >
                                    Phản hồi
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                    {
                        Message.type === 'text' && Message._id !== Message.draft_id
                            ?
                            <TouchableOpacity
                                onPress={onPressCopy}
                                style={{
                                    margin: 12,
                                    // paddingHorizontal: 12,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    height: 30,
                                }}
                            >
                                <View style={{
                                    width: 40,
                                    alignItems: 'center'
                                }}>
                                    <FontAwesome name="copy"
                                        size={25}
                                        color="#333"
                                        style={{
                                            marginRight: 12,
                                        }} />
                                </View>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: "#333",
                                        fontSize: 15,
                                    }}
                                >
                                    Sao chép nội dung
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                    {
                        Message._id !== Message.draft_id && Message.create_uid === myUserId ?
                            <TouchableOpacity
                                onPress={onPressDetail}
                                style={{
                                    margin: 12,
                                    // paddingHorizontal: 12,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    height: 30,
                                }}
                            >
                                <View style={{
                                    width: 40,
                                    alignItems: 'center'
                                }}>
                                    <AntDesign name="infocirlceo"
                                        size={25}
                                        color="#333"
                                        style={{
                                            marginRight: 12,
                                        }} />
                                </View>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: "#333",
                                        fontSize: 15,
                                    }}
                                >
                                    Chi tiết tin nhắn
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                    {
                        Message._id !== Message.draft_id && canPinMessage ?
                            <TouchableOpacity
                                onPress={onPressPinMessage}
                                style={{
                                    margin: 12,
                                    // paddingHorizontal: 12,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    height: 30,
                                }}
                            >
                                <View style={{
                                    width: 40,
                                    alignItems: 'center'
                                }}>
                                    <MaterialCommunityIcons name="pin-outline"
                                        size={25}
                                        color="#333"
                                        style={{
                                            marginRight: 12,
                                        }} />
                                </View>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: "#333",
                                        fontSize: 15,
                                    }}
                                >
                                    Ghim tin nhắn
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                    {
                        Message._id !== Message.draft_id && canUnpinMessage ?
                            <TouchableOpacity
                                onPress={onPressUnpinMessage}
                                style={{
                                    margin: 12,
                                    // paddingHorizontal: 12,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    height: 30,
                                }}
                            >
                                <View style={{
                                    width: 40,
                                    alignItems: 'center'
                                }}>
                                    <MaterialCommunityIcons name="pin-off-outline"
                                        size={25}
                                        color="#333"
                                        style={{
                                            marginRight: 12,
                                        }} />
                                </View>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: "#333",
                                        fontSize: 15,
                                    }}
                                >
                                    Bỏ ghim tin nhắn
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                    {
                        Message.create_uid === myUserId ?
                            <TouchableOpacity
                                onPress={onPressUnsend}
                                style={{
                                    margin: 12,
                                    // paddingHorizontal: 12,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    height: 30,
                                }}
                            >
                                <View style={{
                                    width: 40,
                                    alignItems: 'center'
                                }}>
                                    <Feather name="trash-2"
                                        size={25}
                                        color="#333"
                                        style={{
                                            marginRight: 12,
                                        }} />
                                </View>
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        color: "red",
                                        fontSize: 15,
                                    }}
                                >
                                    Thu hồi tin nhắn
                                </Text>
                            </TouchableOpacity>
                            :
                            null
                    }
                    <TouchableOpacity
                        onPress={close}
                        style={{
                            margin: 12,
                            // paddingHorizontal: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            height: 30,
                        }}
                    >
                        <View style={{
                            width: 40,
                            alignItems: 'center'
                        }}>
                            <AntDesign name="closecircleo"
                                size={25}
                                color="#333"
                                style={{
                                    marginRight: 12,
                                }} />
                        </View>
                        <Text
                            style={{
                                fontWeight: "bold",
                                color: "#333",
                                fontSize: 15,
                            }}
                        >
                            Đóng
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
        {/* <Animated.View
            onLayout={onLayout}
            // ref={(view) => {
            //   measureHeightRef.current = view;
            // }}
            style={[
                {
                    position: "absolute",
                    zIndex: 1,
                    width: WIDTH,
                    // height:SCREEN_HEIGHT  ,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: "#fff",
                    transform: [
                        {
                            translateY: translateYRef,
                        },
                    ],
                },
                formHeight ? { height: formHeight } : {},
            ]}
        >
            {
                Message.create_uid !== myUserId && Message.type !== 'sticker'
                    ?
                    <View style={{
                        margin: 12,
                        paddingHorizontal: 12,
                        height: WIDTH / 8,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: 'space-between',
                    }}>
                        <TouchableOpacity
                            onPress={onReactLike}
                            style={{
                                width: WIDTH / 8,
                                height: WIDTH / 8,
                                borderRadius: WIDTH / 16,
                                backgroundColor: '#eee',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image
                                style={{ width: WIDTH / 16, height: WIDTH / 16 }}
                                source={require("../../static/emo/like.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onReactHeart}
                            style={{
                                width: WIDTH / 8,
                                height: WIDTH / 8,
                                borderRadius: WIDTH / 16,
                                backgroundColor: '#eee',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image
                                style={{ width: WIDTH / 16, height: WIDTH / 16 }}
                                source={require("../../static/emo/heart.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onReactSad}
                            style={{
                                width: WIDTH / 8,
                                height: WIDTH / 8,
                                borderRadius: WIDTH / 16,
                                backgroundColor: '#eee',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image
                                style={{ width: WIDTH / 16, height: WIDTH / 16 }}
                                source={require("../../static/emo/sad.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onReactHaha}
                            style={{
                                width: WIDTH / 8,
                                height: WIDTH / 8,
                                borderRadius: WIDTH / 16,
                                backgroundColor: '#eee',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image
                                style={{ width: WIDTH / 16, height: WIDTH / 16 }}
                                source={require("../../static/emo/haha.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onReactAngry}
                            style={{
                                width: WIDTH / 8,
                                height: WIDTH / 8,
                                borderRadius: WIDTH / 16,
                                backgroundColor: '#eee',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image
                                style={{ width: WIDTH / 16, height: WIDTH / 16 }}
                                source={require("../../static/emo/angry.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    :
                    null
            }
            {
                Message._id !== Message.draft_id
                    ?

                    <TouchableOpacity
                        onPress={onPressReply}
                        style={{
                            margin: 12,
                            paddingHorizontal: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            height: 30,
                        }}
                    >
                        <Entypo name="reply" size={25}
                            color="#00A48D"
                            style={{
                                marginRight: 12,
                            }} />
                        <Text
                            style={{
                                fontWeight: "300",
                                color: "#333",
                                fontSize: 15,
                            }}
                        >
                            Phản hồi
                        </Text>
                    </TouchableOpacity>
                    :
                    null
            }
            {
                Message.type === 'text' && Message._id !== Message.draft_id
                    ?
                    <TouchableOpacity
                        onPress={onPressCopy}
                        style={{
                            margin: 12,
                            paddingHorizontal: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            height: 30,
                        }}
                    >
                        <FontAwesome name="copy"
                            size={25}
                            color="#00A48D"
                            style={{
                                marginRight: 12,
                            }} />
                        <Text
                            style={{
                                fontWeight: "300",
                                color: "#333",
                                fontSize: 15,
                            }}
                        >
                            Sao chép nội dung
                        </Text>
                    </TouchableOpacity>
                    :
                    null
            }
            {
                Message._id !== Message.draft_id && Message.create_uid === myUserId ?
                    <TouchableOpacity
                        onPress={onPressDetail}
                        style={{
                            margin: 12,
                            paddingHorizontal: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            height: 30,
                        }}
                    >
                        <AntDesign name="infocirlceo"
                            size={25}
                            color="#00A48D"
                            style={{
                                marginRight: 12,
                            }} />
                        <Text
                            style={{
                                fontWeight: "300",
                                color: "#333",
                                fontSize: 15,
                            }}
                        >
                            Chi tiết tin nhắn
                        </Text>
                    </TouchableOpacity>
                    :
                    null
            }
            {
                Message._id !== Message.draft_id && canPinMessage ?
                    <TouchableOpacity
                        onPress={onPressPinMessage}
                        style={{
                            margin: 12,
                            paddingHorizontal: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            height: 30,
                        }}
                    >
                        <MaterialCommunityIcons name="pin-outline"
                            size={25}
                            color="#00A48D"
                            style={{
                                marginRight: 12,
                            }} />
                        <Text
                            style={{
                                fontWeight: "300",
                                color: "#333",
                                fontSize: 15,
                            }}
                        >
                            Ghim tin nhắn
                        </Text>
                    </TouchableOpacity>
                    :
                    null
            }
            {
                Message._id !== Message.draft_id && canUnpinMessage ?
                    <TouchableOpacity
                        onPress={onPressUnpinMessage}
                        style={{
                            margin: 12,
                            paddingHorizontal: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            height: 30,
                        }}
                    >
                        <MaterialCommunityIcons name="pin-off-outline"
                            size={25}
                            color="#00A48D"
                            style={{
                                marginRight: 12,
                            }} />
                        <Text
                            style={{
                                fontWeight: "300",
                                color: "#333",
                                fontSize: 15,
                            }}
                        >
                            Bỏ ghim tin nhắn
                        </Text>
                    </TouchableOpacity>
                    :
                    null
            }
            {
                Message.create_uid === myUserId ?
                    <TouchableOpacity
                        onPress={onPressUnsend}
                        style={{
                            margin: 12,
                            paddingHorizontal: 12,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            height: 30,
                        }}
                    >
                        <Feather name="trash-2"
                            size={25}
                            color="#00A48D"
                            style={{
                                marginRight: 12,
                            }} />
                        <Text
                            style={{
                                fontWeight: "300",
                                color: "red",
                                fontSize: 15,
                            }}
                        >
                            Thu hồi tin nhắn
                        </Text>
                    </TouchableOpacity>
                    :
                    null
            }
            <TouchableOpacity
                onPress={close}
                style={{
                    margin: 12,
                    paddingHorizontal: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: 30,
                }}
            >
                <AntDesign name="closecircleo"
                    size={25}
                    color="#00A48D"
                    style={{
                        marginRight: 12,
                    }} />
                <Text
                    style={{
                        fontWeight: "300",
                        color: "#333",
                        fontSize: 15,
                    }}
                >
                    Đóng
                </Text>
            </TouchableOpacity>
            <View style={{ height: Platform.OS === 'android' ? 35 : 15, backgroundColor: "#fff" }} />
        </Animated.View> */}
    </React.Fragment>;
}

export default LongPressMessage;