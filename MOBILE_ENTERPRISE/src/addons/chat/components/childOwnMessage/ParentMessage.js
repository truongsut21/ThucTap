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
import isEqual from 'react-fast-compare';

const MessageSwitcher = ({ message, parent_image }) => {
    try {
        if (message.type === 'text') {
            return (<Text style={{
                color: 'rgba(0, 0, 0, 0.4)',
                fontStyle: 'italic',
                fontSize: 13
            }} numberOfLines={2} ellipsizeMode='tail'>
                {message.content}
            </Text>)
        } else if (message.type === 'sticker') {
            return (<View style={{
                width: 150,
                height: 150,
                overflow: "hidden",
                transform: [{ scale: 0.4 }],
                marginLeft: -40,
                marginRight: -40,
                marginTop: -40,
                marginBottom: -50,
                zIndex: 1,
            }}>
                <FastImage
                    style={{
                        width: 150,
                        height: 150
                    }}
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
            return (<View style={{
                height: goodHeight,
                width: goodWidth,
                borderRadius: 5,
                alignItems: 'flex-end',
                paddingVertical: 3,
            }}>
                <DispatchImage
                    style={{
                        height: goodHeight,
                        width: goodWidth,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                    }}
                    source={parent_image}
                    type={'image'}
                    data={{
                        fileContent: message.content,
                        send_state: true
                    }}
                />
            </View>)
        } else if (message.type === 'other') {
            return (<Text style={{
                color: 'rgba(0, 0, 0, 0.4)',
                fontStyle: 'italic',
                fontSize: 13
            }} numberOfLines={1} ellipsizeMode='tail'>
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
    const myUserId = useSelector(state => {
        if (state.AuthStoredReducer.myUserInfo._id) {
            return state.AuthStoredReducer.myUserInfo._id;
        }
        return null
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
                    content: message.content
                },
                dispatch: dispatch,
            })
        }
    }, [])
    try {
        if (message.is_removed) return null;
        return (
            <React.Fragment>
                <TouchableOpacity style={{
                    paddingVertical: 8,
                    paddingBottom: 20,
                    paddingHorizontal: 12,
                    marginRight: 5,
                    backgroundColor: '#f6f6f6',
                    flexDirection: 'row',
                    marginBottom: -20,
                    borderRadius: 5,
                    borderTopLeftRadius: 16,
                    borderBottomLeftRadius: 16,
                    borderWidth: 0.4,
                    borderColor: '#ccc',
                }} delayPressIn={0} delayPressOut={0} onPress={props.scrollToMessage} activeOpacity={1}>
                    <View style={{
                        paddingTop: 10,
                        marginRight: 5,
                    }}>
                        <MaterialIcons size={20} name="subdirectory-arrow-right" color="#00A48D" />
                    </View>
                    <View style={{ paddingVertical: 5, }}>
                        <View style={{ marginBottom: 2, }}>
                            <Text style={{
                                color: convertToColor(message.create_uid[message.create_uid.length - 1]),
                                fontSize: 11,
                            }} numberOfLines={1} ellipsizeMode='tail'>
                                {contactName}
                                <Text>
                                    {
                                        message.create_uid === myUserId
                                            ?
                                            ' (là tôi)'
                                            :
                                            ''
                                    }
                                </Text>
                            </Text>
                        </View>

                        <View style={{ marginTop: 2, }}>
                            <MessageSwitcher message={message} parent_image={localImage} />
                        </View>
                    </View>

                </TouchableOpacity>
            </React.Fragment>
        );
    } catch (error) {
        return null;
    }
}

export default React.memo(ParentMessage, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})