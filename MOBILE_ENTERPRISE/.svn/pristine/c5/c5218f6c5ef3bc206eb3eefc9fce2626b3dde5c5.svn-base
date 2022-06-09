import React, { useEffect, useRef, useState } from 'react';
import {
    View, FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import { cloneDeep } from 'lodash';
import isEqual from 'react-fast-compare';
import TypingItem from './TypingItem';

function TypingList({ activeThreadId }) {
    const typers = useSelector(state => {
        let threadTypers = state.ChatUnstoredReducer.myThreadTypers;
        if (activeThreadId && threadTypers[activeThreadId]) {
            let rawTypes = [...threadTypers[activeThreadId]];
            rawTypes = cloneDeep(rawTypes)
            if (rawTypes.length > 5) {
                return rawTypes.slice(0, 5);
            }
            return rawTypes;
        }
        return [];
    }, (prev, next) => isEqual(prev, next));

    const keyExtractor = (item, index) => {
        try {
            return item._id;
        } catch (error) {
            return index;
        }
    }

    const renderItem = ({ item, index }) => {
        if (item._id) {
            return (<TypingItem contact_id={item._id} index={index} />);
        } else {
            return null;
        }
    }

    try {
        return (<View style={{
            flex: 1,
            marginLeft: 5,
        }}>
            <FlatList
                horizontal
                data={typers}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
            />
        </View>)
    } catch (error) {
        return null;
    }
}

export default React.memo(TypingList);