import React, { useEffect, useRef } from 'react';
import { View, Image, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect, useDispatch, useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import DispatchImage from '../DispatchImage';
import * as Action from '../../controllers/actionTypes';
import * as FriendAction from '../../../friend/controllers/actionType';
import DefaultAvatar from '../../static/default_ava.png';
import DefaultGroupAvatar from '../../static/default_group_avatar.png';


const ThreadElementAvatar = ({ ...props }) => {
    const dispatch = useDispatch();
    const { localAvatar, cloudAvatar, needToDownloadAvatar, isThreadGroup, Someone_id, Someone } = useSelector(state => {
        const imageAvatars = state.ChatStoredReducer.imageAvatars || {};
        const fullThreads = state.ChatStoredReducer.fullThreads || {};
        const myFriends = state.FriendStoredReducer.myFriends || {};
        const myContacts = state.FriendStoredReducer.myContacts || {};
        let Thread = fullThreads[props._id];
        if (!Thread) return {}
        let localAvatar = '', cloudAvatar = '', needToDownloadAvatar = false, Someone;
        if (Thread.is_group) {

            if (Thread.avatar_group_url) {
                localAvatar = imageAvatars[Thread.avatar_group_url];
                cloudAvatar = Thread.avatar_group_url;
                needToDownloadAvatar = localAvatar ? false : true
            }
        } else {
            //cá nhân
            Someone = myFriends[Thread.chat_with_user_id] || myContacts[Thread.chat_with_user_id];
            if (Someone && Someone.avatar_url) {
                localAvatar = imageAvatars[Someone.avatar_url];
                cloudAvatar = Someone.avatar_url;
                needToDownloadAvatar = localAvatar ? false : true
            }
        }
        return {
            localAvatar, cloudAvatar, needToDownloadAvatar, Someone,
            isThreadGroup: Thread.is_group, Someone_id: Thread.chat_with_user_id
        }
    }, (prev, next) => isEqual(prev, next));
    useEffect(() => {
        if (!Someone) {
            if (Someone_id) {
                dispatch({
                    type: FriendAction.API_DOWNLOAD_CONTACT,
                    data: { ids: [Someone_id] }
                })

            }
        }
    }, [Someone, Someone_id])
    useEffect(() => {
        if (needToDownloadAvatar) {
            dispatch({
                type: Action.API_DOWNLOAD_AVATAR,
                data: {
                    url: cloudAvatar
                },
                dispatch: dispatch
            })
        }
    }, [needToDownloadAvatar]);

    return <View style={{
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:"red"
    }}>
        {
            localAvatar
                ?
                <DispatchImage
                    style={{
                        width: 65,
                        height: 65,
                        borderRadius: 50,
                        borderWidth: 0.7,
                        borderColor: '#ccc',


                    }}
                    source={localAvatar}
                    type={'avatar'}
                    data={{
                        cloudLink: cloudAvatar
                    }}
                />
                :
                <Image
                    source={isThreadGroup ? DefaultGroupAvatar : DefaultAvatar}
                    style={{
                        width: 65, height: 65,
                        borderRadius: 50,
                    }} />
        }
    </View>
}

export default React.memo(ThreadElementAvatar, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})