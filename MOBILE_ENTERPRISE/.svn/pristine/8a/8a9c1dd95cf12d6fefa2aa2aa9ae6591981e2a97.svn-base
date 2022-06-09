import React, { useEffect } from 'react';
import {
    Image, TouchableOpacity,
} from 'react-native';
import isEqual from 'react-fast-compare';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DispatchImage from '../DispatchImage';
import DefaultAvatar from '../../static/default_ava.png';
import * as Action from '../../controllers/actionTypes';
import * as FriendAction from '../../../friend/controllers/actionType';
import styles from './styles';

function PersonalAvatar({ isPoppingup, contact_id, activeThreadId }) {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { localAvatar, cloudAvatar, notFoundContact } = useSelector(state => {
        const myFriends = state.FriendStoredReducer.myFriends;
        const myContacts = state.FriendStoredReducer.myContacts;
        const avatarLibrary = state.ChatStoredReducer.imageAvatars;

        try {
            const Someone = myFriends[contact_id] || myContacts[contact_id];
        
            if (Someone) {
                return {
                    localAvatar: avatarLibrary[Someone.avatar_url],
                    cloudAvatar: Someone.avatar_url,
                    notFoundContact: false
                }
            } else {
                return {
                    notFoundContact: true
                }
            }
        } catch (error) {
            return { notFoundContact: true };
        }
    }, (prev, next) => isEqual(prev, next));

    useEffect(() => {
        if (!localAvatar && cloudAvatar) {
            dispatch({
                type: Action.API_DOWNLOAD_AVATAR,
                data: {
                    url: cloudAvatar,
                },
                dispatch: dispatch
            })
        }
    }, [localAvatar, cloudAvatar]);
    useEffect(() => {
        if (notFoundContact) {

            dispatch({
                type: FriendAction.API_DOWNLOAD_CONTACT,
                data: {
                    ids: [contact_id],
                },
            })
        }
    }, [notFoundContact]);

    const showUserInfo = (ev) => {
        try {
            if (!isPoppingup) {

                navigation.navigate('PopupUserInfo', {
                    _id: contact_id,
                    activeThreadId
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

export default React.memo(PersonalAvatar, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})