import React from 'react';
import {
    View, Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import DispatchImage from '../DispatchImage';
import DefaultAvatar from '../../static/default_ava.png';

const TypingItem = ({ contact_id, index }) => {
    const imageAvatar = useSelector(state => {
        const avatarLibrary = state.ChatStoredReducer.imageAvatars
        try {
            let imageAvatar = avatarLibrary[contact_id] ?
                avatarLibrary[contact_id].link : null;
            return imageAvatar;
        } catch (error) {
            return null;
        }
    }, (prev, next) => prev === next);

    try {
        return (<View style={{
            position: 'absolute',
            left: index * 20,
            padding: 3,
            borderRadius: 20,
            backgroundColor: '#fff',
        }}>
            {imageAvatar
                ?
                <DispatchImage
                    style={{
                        width: 29,
                        height: 29,
                        borderRadius: 20,
                        borderWidth: 0.7,
                        borderColor: '#eee'
                    }}
                    source={imageAvatar}
                    type={'avatar'}
                    data={{
                        _id: contact_id
                    }}
                    cacheDisabled={true}
                />
                :
                <Image
                    style={{
                        width: 29,
                        height: 29,
                        borderRadius: 20,
                        borderWidth: 0.7,
                        borderColor: '#ccc'
                    }}
                    source={DefaultAvatar} />
            }
        </View>)
    } catch (error) {
        return null;
    }
}

export default React.memo(TypingItem)