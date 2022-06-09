import React, { useEffect } from 'react';
import {
    Image, TouchableOpacity,
} from 'react-native';
import isEqual from 'react-fast-compare';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DispatchImage from '../DispatchImage';
import DefaultAvatar from '../../static/default_ava.jpg';
import * as Action from '../../controllers/actionTypes';
import styles from './styles';

function CreateThread({ member_id }) {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { localAvatar, cloudAvatar, notFoundContact } = useSelector(state => {
        const myFriends = state.FriendStoredReducer.myFriends;
        // const myContacts = state.FriendStoredReducer.myContacts;
        const avatarLibrary = state.ChatStoredReducer.imageAvatars;
        try {
            const Someone = myFriends[member_id];
            // || myContacts[member_id];
            if (Someone) {
                return {
                    localAvatar: avatarLibrary[Someone.avatar_url],
                    cloudAvatar: Someone.avatar_url,
                    notFoundContact: true
                }
            } else {
                return {
                    notFoundContact: true
                }
            }
        } catch (error) {
            return {};
        }
    }, (prev, next) => isEqual(prev, next));

    useEffect(() => {
        if (!localAvatar && cloudAvatar) {
            dispatch({
                type: Action.API_DOWNLOAD_AVATAR,
                data: {
                    avatar_url: cloudAvatar,
                },
                dispatch: dispatch
            })
        }
    }, []);

    useEffect(() => {
        if (!localAvatar && cloudAvatar) {
            dispatch({
                type: Action.API_DOWNLOAD_AVATAR,
                data: {
                    avatar_url: cloudAvatar,
                },
                dispatch: dispatch
            })
        }
    }, [localAvatar, cloudAvatar]);

    const showUserInfo = (ev) => {
        try {
            if (!isPoppingup) {
                navigation.navigate('PopupUserInfo', {
                    contact_id: contact_id
                });
            }
        }
        catch (error) {
        }
    }

    try {
        return (<TouchableOpacity
            delayPressIn={0} delayPressOut={0}
            onPress={showUserInfo}
            activeOpacity={1}>
            {localAvatar
                ?
                <DispatchImage
                    style={[styles.adp, {
                        borderWidth: 0.7,
                        borderColor: '#ccc'
                    }]}
                    source={localAvatar}
                    type={'avatar'}
                    data={{
                        cloudLink: cloudAvatar
                    }}
                />
                :
                <Image
                    source={DefaultAvatar}
                    style={styles.adp} />
            }
        </TouchableOpacity>)
    } catch (error) {
        return null;
    }

}

export default React.memo(PersonalAvatar)