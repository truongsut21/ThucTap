import React, { useMemo, useContext } from 'react';
import {
    View, TouchableOpacity, Image,
    Text,
    // InteractionManager
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import isEqual from 'react-fast-compare';
import DispatchImage from '../DispatchImage';
import { ActiveThreadContext } from '../ChatBox/context';
import { WIDTH, HEIGHT, _parseMentionContentIfExist } from '../../controllers/utils';
import { sticker_server } from '../../../../config/config.json';
import { fromTemplateToPosition } from '../../static/MessageGroupTemplate';
import * as ActionChat from '../../controllers/actionTypes';
import _ from 'lodash';
const ReplyingContent = ({ data }) => {

    const imageLink = useSelector(state => {
        try {
            if (data.type === 'image') {
                let listFiles = state.ChatStoredReducer.listFiles
                if (listFiles && listFiles[`${data.content._id}_lowprofile`]) {
                    return listFiles[`${data.content._id}_lowprofile`];
                }
                return null;
            }
            return null;
        } catch (error) {
            return null;
        }
    }, (prev, next) => prev === next);
    const imageLinks = useSelector(state => {
        try {
            if (data.type === 'image_group') {
                const listFiles = state.ChatStoredReducer.listFiles
                let res = [];
                data.content.forEach(d => {
                    if (listFiles && listFiles[`${d._id}_lowprofile`]) {
                        res.push(listFiles[`${d._id}_lowprofile`]);
                    }
                })
                if (res.length > 0) {
                    return res;
                }
                return null;
            }
            return null;
        } catch (error) {
            return null;
        }
    }, (prev, next) => isEqual(prev, next));

    const styleForImages = useMemo(() => {
        let styles = [];
        if (!imageLinks) return null;
        imageLinks.forEach((l, i) => {
            const styleForImage = fromTemplateToPosition({
                messageCount: imageLinks.length,
                position: i + 1,
            });
            styles.push(styleForImage);
        })
        return styles;
    }, [imageLinks]);

    try {
        let fileContent = data.content;
        if (data.type === 'text') {
            return (<Text
                style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 12 }}
                numberOfLines={1} ellipsizeMode='tail'>
                    {_parseMentionContentIfExist(data.content.content)}
            </Text>)
        } else if (data.type === 'sticker') {
            try {
                return (<FastImage
                    style={{ width: 20, height: 20 }}
                    source={{
                        uri: `${sticker_server}/${fileContent.stickerType}/${fileContent.stickerPosition}.${fileContent.shortMimetype}`
                    }}
                />)
            } catch (error) {
                return (<Text
                    style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 12 }}
                    numberOfLines={1} ellipsizeMode='tail'>
                    [sticker]
                </Text>)
            }
        } else if (data.type === 'image') {
            try {
                const fileContent = data.content;
                let { height, width } = fileContent.metadata ? fileContent.metadata : fileContent.meta;
                let goodHeight, goodWidth;
                if (height > width) {
                    goodHeight = parseInt(WIDTH * 1 / 10);
                    goodWidth = parseInt(goodHeight * width / height);
                } else if (height < width) {
                    goodWidth = parseInt(WIDTH * 1 / 10);
                    goodHeight = parseInt(goodWidth * height / width);
                } else {
                    goodHeight = goodWidth = parseInt(WIDTH * 1 / 10);
                }
                return (<View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        marginRight: 5
                    }}>
                        <DispatchImage
                            style={{
                                height: goodHeight,
                                width: goodWidth,
                                borderRadius: 3,
                                backgroundColor: '#ddd'
                            }}
                            source={imageLink}
                            type={'image'}
                            data={{
                                fileContent: data.content,
                                send_state: true
                            }}
                        />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, color: '#a3a3a3' }} numberOfLines={1} ellipsizeMode='tail'>
                            [Hình ảnh]
                        </Text>
                    </View>
                </View>)
            } catch (error) {
                return (<Text
                    style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 12 }}
                    numberOfLines={1} ellipsizeMode='tail'>
                    [Hình ảnh]
                </Text>)
            }
        } else if (data.type === 'image_group') {
            try {
                return (<View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        marginRight: 5,
                        width: 40,
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: "flex-end",
                        flexWrap: 'wrap'
                    }}>
                        {
                            imageLinks.map((img, i) => {
                                return (<DispatchImage
                                    style={[{
                                        height: HEIGHT / 42,
                                    }, styleForImages[i],
                                    {
                                        borderRadius: 3,
                                        width: (styleForImages[i].width / 7) - 1,
                                        backgroundColor: '#ddd'
                                    }]}
                                    source={img}
                                    type={'image'}
                                    subType={'imagegroup'}
                                    data={{
                                        fileContent: data.content[i],
                                        send_state: true
                                    }}
                                />)
                            })
                        }
                    </View>
                    <View>
                        <Text style={{ fontSize: 12, color: '#a3a3a3' }} numberOfLines={1} ellipsizeMode='tail'>
                            [Nhóm hình ảnh]
                        </Text>
                    </View>
                </View>)
            } catch (error) {
                return (<Text
                    style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 12 }}
                    numberOfLines={1} ellipsizeMode='tail'>
                    [Nhóm hình ảnh]
                </Text>)
            }
        } else if (data.type === 'other') {
            try {
                return (<View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        marginRight: 5
                    }}>
                        <Image style={{ width: 20, height: 20 }}
                            source={require('../../static/f-zip-min.png')} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 12 }} numberOfLines={1} ellipsizeMode='tail'>
                            {data.content.originalfilename}
                        </Text>
                    </View>
                </View>)
            } catch (error) {
                return (<Text
                    style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 12 }}
                    numberOfLines={1} ellipsizeMode='tail'>
                    [Tệp tin] {data.content.originalfilename}
                </Text>)
            }
        } else if (data.type === 'video') {
            try {
                return (<Text
                    style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 12 }}
                    numberOfLines={1} ellipsizeMode='tail'>
                    [Video]
                </Text>)
            } catch (error) {
                return (<Text
                    style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 12 }}
                    numberOfLines={1} ellipsizeMode='tail'>
                    [Video] {data.content.originalfilename}
                </Text>)
            }
        } else if (data.type === 'task') {
            return (<Text
                style={{ color: 'rgba(0, 0, 0, 0.4)', fontSize: 12 }}
                numberOfLines={1} ellipsizeMode='tail'>
                [Nhiệm vụ]
            </Text>)
        }
    } catch (error) {
        return null;
    }
}

const ReplyingMessage = ({ }) => {
    const dispatch = useDispatch();
    const ThreadContext = useContext(ActiveThreadContext);
    const myUserId = useSelector(state => {
        return state.AuthStoredReducer.myUserInfo._id ? state.AuthStoredReducer.myUserInfo._id : ''
    }, (prev, next) => prev === next);
    const { replyingMessage, create_uid } = useSelector(state => {
        let activeMessage = state.ChatUnstoredReducer.activeMessage;
        if (!activeMessage) {
            return {};
        }
        const fullMessages = state.ChatStoredReducer.fullMessages || {};
        let replyingMessage = fullMessages[activeMessage];
        if (!replyingMessage) return {};
        if (ThreadContext.activeThreadId !== replyingMessage.thread_id) return {};
        return {
            replyingMessage: replyingMessage,
            create_uid: replyingMessage.create_uid
        }
    }, (prev, next) => isEqual(prev, next));
    const contactName = useSelector(state => {
        let myUserInfo = state.AuthStoredReducer.myUserInfo;
        if (!create_uid) return '';
        if (create_uid === myUserInfo._id) {
            return myUserInfo.name
        }
        let myContacts = state.FriendStoredReducer.myContacts;
        let myFriends = state.FriendStoredReducer.myFriends;
        let fullContact = myContacts[create_uid] || myFriends[create_uid];
        if (!fullContact) {
            return false;
        }
        return fullContact.name || "Chưa có tên"
    }, (prev, next) => isEqual(prev, next));

    try {
        if (!replyingMessage) return null;
        return (
            <React.Fragment>
                <View style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    paddingVertical: 7,
                    alignItems: 'center',
                    borderTopWidth: 0.4,
                    borderColor: '#ddd'
                }}>
                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 1 }}>
                            <Text style={{ color: '#333', fontSize: 13 }} numberOfLines={1} ellipsizeMode='tail'>

                                {
                                    replyingMessage.create_uid === myUserId ?
                                        "Đang trả lời chính mình" : `Đang trả lời ${contactName}`

                                }
                            </Text>
                            {/* <Text>
                                {
                                    replyingMessage.create_uid === myUserId
                                        ?
                                        ' (là tôi)'
                                        :
                                        ''
                                }
                            </Text> */}
                        </View>

                        <View style={{ marginTop: 1 }}>
                            <ReplyingContent
                                data={replyingMessage}

                            />
                        </View>
                    </View>
                    <TouchableOpacity style={{
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }} delayPressIn={0} onPress={() => {
                        dispatch({
                            type: ActionChat.UPDATE_REPLYING_MESSAGE,
                            data: '',
                        })
                    }}>
                        <AntDesign size={20} color={"#a3a3a3"} name='closecircleo' />
                    </TouchableOpacity>
                </View>
            </React.Fragment>
        )
    } catch (error) {
        return (<React.Fragment></React.Fragment>)
    }
}

export default React.memo(ReplyingMessage, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
});