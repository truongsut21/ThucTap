import React, { useEffect, useRef, useState } from 'react';
import {
    Text, View, Platform,
    LayoutAnimation, UIManager,
    TouchableOpacity,
    Animated, FlatList, ScrollView, SafeAreaView, Dimensions

} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/core';
import isEqual from "react-fast-compare";

import LottieView from 'lottie-react-native';

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WIDTH, HEIGHT, } from "../../controllers/utils";
import ContactElement from '../../../friend/component/ContactElement';
import Message from '../Messages/Message';


import { WorkerChatToDo } from '../../controllers/utils'
// const Anim = require('../../../../static/empty-chat.json');
const Anim = require("../../../../static/empty-folder.json");

var _ = require("lodash");

const MessageReader = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute();
    const _id = route.params._id;
    const [show, setShow] = useState(false);
    const [formHeight, setFormHeight] = useState(0);

    const [dataWhoSeen, setDataWhoSeen] = useState([])

    const checkIsMine = useSelector(state => {
        const myUserId = state.AuthStoredReducer.myUserInfo._id;
        const fullMessages = state.ChatStoredReducer.fullMessages;
        const message = fullMessages[_id];
        if (!message) {
            return false
        }

        return myUserId === message.create_uid || false;

    }, (prev, next) => isEqual(prev, next));

    const token = useSelector(state => state.AuthStoredReducer.token);


    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, 0);
    }, []);

    useEffect(() => {
        if (checkIsMine) {
            let data = {
                method: 'POST',
                token: token,
                functionName: '/api/fetchMessageStateOfMyMessage',
                payload:
                {
                    data: {
                        message_id: _id
                    }
                }
            }
            WorkerChatToDo(data).then(res => {
                let { messageStates } = res;
                setDataWhoSeen(messageStates);
            });
        }
    }, [])

    const onLayout = (e) => {
        try {
            setFormHeight(e.nativeEvent.layout.height);

        } catch (error) {

        }
    }

    const close = () => {
        setShow(false);
        setTimeout(() => {
            navigation.goBack()
        }, 200);
    };

    //
    const keyExtractor = (item, index) => item;
    //hàm render element
    const renderItem = ({ item, index }) => {
        return <ContactElement what_doing="render-details-message" key={index} _id={item} />;
    };
    // show khi không có data
    const ListEmptyComponent = () => {
        return (
            <React.Fragment>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: '#ccc',
                    height: "100%",
                    width: "100%",
                }}>
                    <LottieView source={Anim} style={{
                        width: WIDTH * 2 / 3,
                        height: WIDTH * 2 / 3

                    }} autoPlay loop />
                    <Text style={{
                        textAlign: "center",
                        fontSize: 16,
                    }}>
                        Chưa có thông tin !
                    </Text>
                </View>
            </React.Fragment>
        )
    }


    return <React.Fragment>
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            isVisible={show}
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

                    {/* close */}
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        paddingHorizontal: 10,
                        paddingVertical: 10,

                    }}>
                        <Text style={{
                            fontWeight: "500",
                            fontSize: 16,
                            flex: 1,

                        }}>
                            Chi tiết tin nhắn
                        </Text>
                        <TouchableOpacity
                            style={{
                                paddingVertical: 4,
                                paddingHorizontal: 6,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#eee",
                                borderRadius: 25,
                            }}
                            onPress={close}
                        >
                            <FontAwesome name="remove" size={20} color="#737373" />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        height: 100,
                    }}>
                        <ScrollView style={{
                            flex: 1,
                            height: 100,
                            maxHeight: 100,
                            backgroundColor: '#f0f4f8',
                            paddingVertical: 10,
                        }}>
                            <Message mid={_id} isPoppingup={true} />
                        </ScrollView>
                    </View>

                    <View style={{
                        height: 200,
                    }}>

                        <FlatList
                            style={{
                                flex: 1,
                                height: 180,
                                maxHeight: 180,
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                            }}
                            data={dataWhoSeen}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            ListEmptyComponent={ListEmptyComponent}
                            removeClippedSubviews={true}
                        />
                    </View>
                </View>

            </TouchableOpacity>
        </Modal>
    </React.Fragment>
}
export default MessageReader