import React, { useEffect, useMemo, useRef } from 'react';
import {
    Text, View, Platform,
    LayoutAnimation, UIManager,
    InteractionManager
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import isEqual from 'react-fast-compare';
import DateDifferentMessage from './DateDifferentMessage';
import SystemMessage from './SystemMessage';
import ParentMessage from './ParentMessage';
import styles from '../childOtherMessage/styles';
import PersonalAvatar from '../childOtherMessage/PersonalAvatar';
import PersonalTitle from '../childOtherMessage/PersonalTitle';
import * as Action from '../../controllers/actionTypes';
import MessageSwitcher from './MessageSwitcher';
import PollMessage from '../pollMessage/PollMessage';

import { WIDTH, HEIGHT, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../controllers/utils'
if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Message = ({ mid, newer_mid, older_mid, is_newest_mid, isPoppingup, activeThreadId, scrollToMessage, ...props }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const myUserId = useSelector(state => state.AuthStoredReducer.myUserInfo._id);
    const newerMessage = useSelector(state => {
        try {
            const fullMessages = state.ChatStoredReducer.fullMessages;
            return newer_mid !== null && fullMessages[newer_mid] ? {
                // _id: fullMessages[newer_mid]._id,
                create_uid: fullMessages[newer_mid].create_uid,
                type: fullMessages[newer_mid].type
            } : {}
        } catch (error) {
            return {};
        }
    }, (prev, next) => isEqual(prev, next));
    const Message = useSelector(state => {
        try {
            const fullMessages = state.ChatStoredReducer.fullMessages;
            return fullMessages[mid] ? {
                // _id: fullMessages[mid]._id,
                create_uid: fullMessages[mid].create_uid,
                parent_id: fullMessages[mid].parent_id ? fullMessages[mid].parent_id : '',
                type: fullMessages[mid].type
            } : {}
        } catch (error) {
            return {};
        }
    }, (prev, next) => isEqual(prev, next));
    
    const olderMessage = useSelector(state => {
        try {
            const fullMessages = state.ChatStoredReducer.fullMessages;
            return older_mid !== null && fullMessages[older_mid] ? {
                // _id: fullMessages[older_mid]._id,
                create_uid: fullMessages[older_mid].create_uid,
                type: fullMessages[older_mid].type
            } : {}
        } catch (error) {
            return {};
        }
    }, (prev, next) => true); //ko cần render lại khi message cũ hơn có thay đổi bất cứ điều gì
    const messageRef = useRef({});
    const isThreadGroup = useSelector(state => {
        const T = state.ChatStoredReducer.fullThreads[activeThreadId];
        return T && T.is_group ? true : false;
    });
    const doAnimate = useSelector(state => {
        return state.ChatUnstoredReducer.willAnimateMessage[mid]
        // }, (prev, next) => prev === next);
    }, (prev, next) => true);   //Không cần nhận data mới vì kiểu gì nó cũng very good rồi

    useEffect(() => {
        if (doAnimate) {
            LayoutAnimation.configureNext({
                duration: 100,
                update: {
                    type: LayoutAnimation.Types.easeInEaseOut,
                    property: LayoutAnimation.Properties.opacity,
                },
            });
            // InteractionManager.runAfterInteractions(() => {
            //     dispatch({
            //         type: Action.DOING_ANIMATE_MESSAGE,
            //         ttype: 'remove',
            //         data: {
            //             _id: mid
            //         },
            //     })
            // })
        }
    }, [doAnimate]);
    // }, []);

    const onLongPress = () => {
        //thực hiên show reaction
        // && checkStatus === 1
        if (!isPoppingup) {
            messageRef.current.measure((fx, fy, width, height, px, py) => {
                dispatch({
                    type: Action.LONG_PRESS_MESSAGE,
                    data: {
                        _id: mid,
                        pageX: px,
                        pageY: py,
                        componentHeight: height,
                        componentWidth: width,
                    },
                    navigation
                })
            })
        }

    }

    const computeMargin = useMemo(() => {
        if (isPoppingup) return 0;
        if (is_newest_mid) return 25;
        if (newerMessage && newerMessage.create_uid !== Message.create_uid) return 15;
        else return 3;
    }, [isPoppingup, is_newest_mid, Message, newerMessage]);

    //Trả về render sớm khi system message ko cho phép xóa, sửa, long press, chạy animation...
    if (Message.type === 'system') {
        return <React.Fragment>
            {!isPoppingup && newerMessage ?
                <DateDifferentMessage
                    mid={mid}
                    newer_mid={newer_mid}
                /> : null
            }
            <SystemMessage mid={mid} />
        </React.Fragment>
    } else if (Message.type === 'poll') {
        return <React.Fragment>
            {!isPoppingup && newerMessage ?
                <DateDifferentMessage
                    mid={mid}
                    newer_mid={newer_mid}
                /> : null
            }
            <PollMessage message_id={mid} />
        </React.Fragment>
    }


    let showName, showAvatar;
    if (
        Message.create_uid !== myUserId &&
        isThreadGroup &&
        (!olderMessage || olderMessage.type === 'system' || Message.create_uid !== olderMessage.create_uid)
    ) {
        showName = true;
    }
    if (
        Message.create_uid !== myUserId &&
        (!newerMessage || newerMessage === 'system' || Message.create_uid !== newerMessage.create_uid)
    ) {

        showAvatar = true;
    }
    try {

        if (Message.create_uid !== myUserId) {
            //nguoi khac
            return (<React.Fragment>
                {!isPoppingup && newerMessage ?
                    <DateDifferentMessage
                        mid={mid}
                        newer_mid={newer_mid}
                    /> : null
                }
                <View
                    ref={view => { messageRef.current = view; }}
                    style={[styles.adh, {
                        paddingHorizontal: 8,
                        marginBottom: computeMargin,

                    }]}>
                    <View style={styles.adk}>
                        {
                            showAvatar
                                ?
                                <PersonalAvatar
                                    isPoppingup={isPoppingup}
                                    contact_id={Message.create_uid} />
                                :
                                null
                        }
                    </View>
                    <View style={styles.adu}>
                        {
                            showName ?
                                <PersonalTitle contact_id={Message.create_uid} />
                                :
                                null
                        }
                        {
                            !isPoppingup && Message.parent_id ?
                                <ParentMessage
                                    _id={mid}
                                    pid={Message.parent_id}
                                    scrollToMessage={scrollToMessage}

                                />
                                :
                                null
                        }
                        <MessageSwitcher
                            _id={mid}
                            isPoppingup={isPoppingup}
                            onLongPress={onLongPress}
                        />

                    </View>
                    {/* reaction */}
                    {/* <MessageReactionNew
                        mid={mid}
                        check={Message.create_uid === myUserId}
                    /> */}
                    {/* <View style={{
                        position: "relative",
                        // backgroundColor:"red",
                        flexDirection: "row",
                        right: Message.parent_id ? 20 : 0,
                        bottom: 0,
                        zIndex: 99999,

                        // bottom:0,
                    }}>


                        <MessageReactionNew
                            mid={mid}
                            check={Message.create_uid === myUserId}
                        />
                    
                    
                    
                    </View> */}
                    {/* reaction */}
                </View>
            </React.Fragment>)
        } else {
            // la chinh minh
            return (<React.Fragment>
                {
                    !isPoppingup && newerMessage ?
                        <DateDifferentMessage
                            mid={mid}
                            newer_mid={newer_mid}
                        /> : null
                }
                <View
                    ref={view => { messageRef.current = view; }}
                    style={[{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        paddingHorizontal: 8,

                    }, {
                        marginBottom: computeMargin,
                    }]}
                    collapsable={false}
                >
                    {/* reaction */}


                    {/* <View style={{
                        position: "relative",
                        // backgroundColor:"red",
                        flexDirection: "row",
                        zIndex: 99999,
                        bottom: 0,
                        left: 0,
                    }}>
                        <MessageReactionNew
                            mid={mid}
                            check={Message.create_uid === myUserId}
                        />
                    </View> */}

                    {/* reaction */}
                    <View style={{
                        alignItems: 'flex-end',
                        maxWidth: WIDTH * 0.8,

                    }}>
                        {
                            !isPoppingup && Message.parent_id
                                ?
                                <ParentMessage
                                    _id={mid}
                                    pid={Message.parent_id}
                                    scrollToMessage={scrollToMessage} />
                                :
                                null
                        }
                        <MessageSwitcher
                            _id={mid}
                            isPoppingup={isPoppingup}
                            onLongPress={onLongPress}
                        />

                    </View>

                </View>
            </React.Fragment>)
        }
    } catch (error) {
        return (<React.Fragment >

            <View style={{ height: 50 }}>

            </View>
        </React.Fragment>)
    }
}

export default React.memo(Message, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})

