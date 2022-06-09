import React from 'react';
import { Text, View } from 'react-native';
import isEqual from 'react-fast-compare';
import ThreadElementTitle from './ThreadElementTitle';
import ThreadElementContent from './ThreadElementContent';

const ThreadElementBody = ({ ...props }) => {

    return (
        <View style={{
            flex: 1,
            alignItem: 'center',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingRight: 10,
            marginLeft: 5,
        }}>
            <ThreadElementTitle
                _id={props._id}
            />
            <ThreadElementContent
                _id={props._id}
            />
        </View>
    )
}

export default React.memo(ThreadElementBody, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})