import React, { } from 'react';
import { useEffect } from 'react';
import {
    Text, View, TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image'
import DispatchImage from '../DispatchImage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { convertToColor, WIDTH } from '../../controllers/utils';
import * as Action from '../../controllers/actionTypes';
import { sticker_server } from '../../../../config/config.json';
import styles from '../childOtherMessage/styles';
import isEqual from 'react-fast-compare';

const MessageSwitcher = ({ message, parent_image }) => {
    try {
        if (message.type === 'text') {
            return (<Text style={styles.acl} numberOfLines={2} ellipsizeMode='tail'>
                {message.content.content}
            </Text>)
        } else if (message.type === 'sticker') {
            return (<View style={styles.acm}>
                <FastImage
                    style={styles.acn}
                    source={{
                        uri: `${sticker_server}/${message.content.stickerType}/${message.content.stickerPosition}.${message.content.shortMimetype}`
                    }}
                />
            </View>)
        } else if (message.type === 'image') {
            let content = message.content;
            let { height, width } = content.metadata ? content.metadata : content.meta;
            let goodHeight, goodWidth;
            if (height > width) {
                goodHeight = parseInt(WIDTH * 3 / 9);
                goodWidth = parseInt(goodHeight * width / height);
            } else if (height < width) {
                goodWidth = parseInt(WIDTH * 3 / 9);
                goodHeight = parseInt(goodWidth * height / width);
            } else {
                goodHeight = goodWidth = parseInt(WIDTH * 3 / 9);
            }
            return (<View style={[styles.aco, {
                height: goodHeight,
                width: goodWidth,
            }]}>
                <DispatchImage
                    style={{
                        height: goodHeight,
                        width: goodWidth,
                        borderRadius: 5,
                    }}
                    source={parent_image}
                    type={'image'}
                    data={{
                        fileContent: message.content,
                        send_state: true
                    }}
                />
            </View>)
        } else if (message.type === 'file') {
            return (<Text style={styles.acl} numberOfLines={1} ellipsizeMode='tail'>
                {message.content.originalfilename}
            </Text>)
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

function ParentMessage({ ...props }) {
    const dispatch = useDispatch();
    const { myUserId, myUserInfo } = useSelector(state => {
        const myUserInfo = state.AuthStoredReducer.myUserInfo;
        return {
            myUserId: myUserInfo._id,
            myUserInfo
        }
    }, (prev, next) => prev === next);
    const message = useSelector(state => {
        const fullMessages = state.ChatStoredReducer.fullMessages;
        if (fullMessages[props.pid]) {
            return fullMessages[props.pid]
        }
        if (fullMessages[props._id]) {
            return fullMessages[props._id].parent_id;
        }
        return null;
    }, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));
    const { localImage, needToDownloadImage } = useSelector(state => {
        const listFiles = state.ChatStoredReducer.listFiles
        if (message && message.type === 'image' && listFiles[`${message.content._id}_lowprofile`]) {
            return {
                localImage: listFiles[`${message.content._id}_lowprofile`],
                needToDownloadImage: listFiles[`${message.content._id}_lowprofile`] ? false : true
            };
        }
        return {}
    }, (prev, next) => isEqual(prev, next));
    const contactName = useSelector(state => {
        const myFriends = state.FriendStoredReducer.myFriends;
        const myContacts = state.FriendStoredReducer.myContacts;
        const Someone = myFriends[message.create_uid] || myContacts[message.create_uid];
        return Someone ? Someone.name : '';
    }, (prev, next) => isEqual(prev, next));

    useEffect(() => {
        if (needToDownloadImage) {
            dispatch({
                type: Action.API_DOWNLOAD_IMAGE,
                data: {
                    content: message.content,
                },
                dispatch: dispatch,
            })
        }
    }, [])


    try {
        if (message.is_removed) return null;
        return (<TouchableOpacity
            style={{
                // marginBottom: message.type === 'text' ? -15 : -20,
                width: "100%",
                justifyContent: message.create_uid !== myUserId ? "flex-end" : "flex-start",
                // marginBottom:14,
                // borderRadius: 5
                // backgroundColor:"pink"
            }}
            delayPressIn={0} delayPressOut={0}
            onPress={props.scrollToMessage} activeOpacity={1}>
            <View style={{
                marginBottom: message.type === 'text' ? -15 : -20,
                backgroundColor: "red",
                paddingVertical: 8,
                paddingBottom: 20,
                paddingHorizontal: 12,
                paddingRight: 20,
                marginRight: 5,
                backgroundColor: '#f6f6f6',
                flexDirection: 'row',
                borderRadius: 16,
                // borderTopRightRadius: message.create_uid === myUserId?null:16,
                // borderBottomRightRadius:message.create_uid === myUserId ?null:16,
                // borderTopLeftRadius: message.create_uid === myUserId ?16:null,
                // borderBottomLeftRadius:(message.create_uid === myUserId)?16:null,
                borderWidth: 0.4,
                borderColor: '#ccc',
                alignSelf: 'flex-start',
            }}>
                <View style={styles.acf}>
                    <MaterialIcons size={20} name="subdirectory-arrow-right" color="#00A48D" />
                </View>
                <View style={styles.ach}>
                    <View style={styles.aci}>
                        <Text style={{
                            color: convertToColor(message.create_uid[message.create_uid.length - 1]),
                            fontSize: 11
                        }} numberOfLines={1} ellipsizeMode='tail'>
                            {
                                contactName
                            }
                            <Text>
                                {
                                    message.create_uid === myUserId ? ' (là bạn)' : ''
                                }
                            </Text>
                        </Text>
                    </View>

                    <View style={styles.ack}>
                        <MessageSwitcher message={message} parent_image={localImage} />
                    </View>
                </View>

            </View>
        </TouchableOpacity>)
    } catch (error) {
        return null;
    }
}

export default React.memo(ParentMessage, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})
