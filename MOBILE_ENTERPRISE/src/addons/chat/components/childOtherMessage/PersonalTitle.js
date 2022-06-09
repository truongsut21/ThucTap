import React, { useEffect } from 'react';
import {
    View, Text
} from 'react-native';
import isEqual from 'react-fast-compare';
import { useSelector } from 'react-redux';
import { convertToColor } from '../../controllers/utils';
import styles from './styles';

function PersonalTitle({ contact_id }) {
    const title = useSelector(state => {
        const myFriends = state.FriendStoredReducer.myFriends || {};
        const myContacts = state.FriendStoredReducer.myContacts || {};
        const Someone = myFriends[contact_id] || myContacts[contact_id];
        return Someone ? Someone.name : '';
    }, (prev, next) => prev === next);

    try {
        return (<View style={styles.ads}>
            <Text style={{
                fontSize: 13,
                fontWeight: '500',
                color: convertToColor(contact_id[contact_id.length - 1]),
            }}
            >
                {title}
            </Text>
        </View>)
    } catch (error) {
        return null;
    }
}


export default React.memo(PersonalTitle, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})