import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, View, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import { CommonActions } from '@react-navigation/native';
import * as FriendAction from '../../../friend/controllers/actionType';
import * as Action from '../../controllers/actionTypes';
import DispatchImage from '../DispatchImage';
import DefaultAvatar from '../../static/default_ava.png';
import DefaultGroupAvatar from '../../static/default_group_avatar.png';

const SuggestThreadElement = ({ item }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { localAvatar, cloudAvatar, Someone, Someone_id } = useSelector(state => {
        if (item.isThread) {
            const imageAvatars = state.ChatStoredReducer.imageAvatars || {};
            const fullThreads = state.ChatStoredReducer.fullThreads || {};
            const myFriends = state.FriendStoredReducer.myFriends || {};
            const myContacts = state.FriendStoredReducer.myContacts || {};
            let Thread = fullThreads[item._id];
            if (!Thread) return {}
            let localAvatar = '', cloudAvatar = '';
            if (Thread.is_group) {
                if (Thread.avatar_group_url) {
                    localAvatar = imageAvatars[Thread.avatar_group_url];
                    cloudAvatar = Thread.avatar_group_url;
                }
            } else {
                //cá nhân
                const Someone = myFriends[Thread.chat_with_user_id] || myContacts[Thread.chat_with_user_id] || {};
                if (Someone && Someone.avatar_url) {
                    localAvatar = imageAvatars[Someone.avatar_url];
                    cloudAvatar = Someone.avatar_url;
                }
            }
            return {
                localAvatar, cloudAvatar,
                Someone,
                Someone_id: Thread.chat_with_user_id
            }
        } else {
            const myFriends = state.FriendStoredReducer.myFriends || {};
            const myContacts = state.FriendStoredReducer.myContacts || {};
            const imageAvatars = state.ChatStoredReducer.imageAvatars || {};
            let Someone = myFriends[item._id] || myContacts[item._id];
            return {
                localAvatar: Someone.avatar_url ? imageAvatars[Someone.avatar_url] : '',
                cloudAvatar: Someone.avatar_url,
                Someone: Someone,
                Someone_id: item._id
            }
        }
    }, (prev, next) => isEqual(prev, next));

    useEffect(() => {
        if (!Someone && Someone_id) {
            dispatch({
                type: FriendAction.API_DOWNLOAD_CONTACT,
                data: { ids: [Someone_id] }
            })
        }
    }, [Someone, Someone_id])

    useEffect(() => {
        if (!localAvatar && cloudAvatar) {
            dispatch({
                type: Action.API_DOWNLOAD_AVATAR,
                data: {
                    url: cloudAvatar
                },
                dispatch: dispatch
            })
        }
    }, [localAvatar, cloudAvatar]);

    const onPress = () => {
        if (item.isThread) {
            dispatch({
                type: Action.UPDATE_ACTIVE_THREAD,
                data: item._id
            })
            navigation.dispatch(state => {
                // Remove the Search route from the stack
                const routes = state.routes.filter(r => r.name !== 'SearchThreadList');
                routes.push({
                    name: 'ChatBox',
                    params: { threadId: item._id },
                })
                return CommonActions.reset({
                    ...state,
                    routes,
                    index: routes.length - 1,
                });
            });
        } else {
            dispatch({
                type: Action.CHAT_WITH_SOMEONE,
                data: {
                    contact_id: item._id
                }
            })
        }
    }

    return <TouchableOpacity
        onPress={onPress}
        delayPressIn={0}
        delayPressOut={0}
        activeOpacity={0.5}
        style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
        }}>
        {
            localAvatar
                ?
                <DispatchImage
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 0.7,
                        borderColor: '#ccc',
                        backgroundColor: '#ccc',
                    }}
                    source={localAvatar}
                    type={'avatar'}
                    data={{
                        cloudLink: cloudAvatar
                    }}
                />
                :
                <Image
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 0.7,
                        borderColor: '#ccc',
                        backgroundColor: '#ccc',
                    }}
                    source={item.isThread && item.is_group ? DefaultGroupAvatar : DefaultAvatar}
                />
        }
        <View style={{
            paddingLeft: 20,
            alignItems: 'center'
        }}>
            <Text>
                {
                    item.isThread
                        ?
                        item.name
                        :
                        (Someone ? Someone._id : '')
                }
            </Text>
        </View>
    </TouchableOpacity>
}


export default SuggestThreadElement;