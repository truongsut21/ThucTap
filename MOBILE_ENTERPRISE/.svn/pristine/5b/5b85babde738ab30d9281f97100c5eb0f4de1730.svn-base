import React, { useEffect, useMemo } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect, useSelector } from 'react-redux';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import Entypo from 'react-native-vector-icons/Entypo'
import isEqual from 'react-fast-compare';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { vi } from 'date-fns/locale';
import useTheme from '../../../base/components/useTheme';

const Title = ({ _id }) => {
    const theme = useTheme();
    const ThreadName = useSelector(state => {
        const fullThreads = state.ChatStoredReducer.fullThreads;
        let Thread = fullThreads[_id];
        if (!Thread) return '';
        if (Thread.is_group) return Thread.name;
        const myFriends = state.FriendStoredReducer.myFriends || {};
        const myContacts = state.FriendStoredReducer.myContacts || {};
        const cuid = Thread.chat_with_user_id;
        if (myFriends[cuid]) return myFriends[cuid].name;
        if (myContacts[cuid]) return myContacts[cuid].name;
        return '';
    }, (prev, next) => isEqual(prev, next));
    return <Text style={{
        color: theme.textColor,
        fontWeight: Platform.OS === 'android' ? 'bold' : '600',
        fontSize: 17
    }} numberOfLines={1} ellipsizeMode='tail'>
        {ThreadName}
    </Text>;
}

const MemoiziedTitle = React.memo(Title, (prevProps, nextProps) => {
    return prevProps._id === nextProps._id;
})

const LastActivity = ({ _id }) => {
    const theme = useTheme();
    const lastActivity = useSelector(state => {
        const fullThreads = state.ChatStoredReducer.fullThreads;
        return fullThreads[_id] ? fullThreads[_id].write_date : 0;
    }, (prev, next) => isEqual(prev, next))

    const formatTime = useMemo(() => {
        try {
            if (!isNaN(lastActivity)) {
                if (formatDistanceToNowStrict(lastActivity).includes('days') &&
                    formatDistanceToNowStrict(lastActivity).split(' days')[0] > 7) {
                    return format(new Date(lastActivity), 'dd/MM/yyyy', { locale: vi });
                } else {
                    return formatDistanceToNowStrict(lastActivity, { locale: vi, addSuffix: true })
                }
            } else {
                return ''
            }
        } catch (error) {
            return '';
        }
    }, [lastActivity]);

    return <Text style={{
        fontSize: 12,
        fontStyle: 'normal',
        // color: '#666,
        color: theme.dimTextColor,
    }}>
        {formatTime}
    </Text>;
}

const MemoiziedLastActivity = React.memo(LastActivity, (prevProps, nextProps) => {
    return prevProps._id === nextProps._id;
})

const ThreadElementTitle = ({ _id }) => {
    return (
        <View style={{
            width: '100%',
            flexDirection: 'row',
            height: 32
        }}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'flex-end',
                paddingRight: 15,
            }}>
                {/* {
                    this.props.thread.thread_pin_sequence && this.props.thread.thread_pin_sequence !== 0
                        ?
                        <View style={{ paddingRight: 5 }}>
                            <AntDesign name="pushpin" color="#666" size={14} />
                        </View>
                        :
                        null
                }
                {
                    this.props.notificationStatus === "off"
                        ?
                        <View style={{ paddingRight: 5 }}>
                            <FontAwesome name="bell-slash-o" color="#666" size={14} />
                        </View>
                        :
                        null
                } */}

                <MemoiziedTitle _id={_id} />
            </View>
            <View style={{
                // flexDirection: 'column',
                // alignItems: 'center',
                justifyContent: 'flex-end',
                // marginTop: 20,
            }}>
                <MemoiziedLastActivity _id={_id} />
                {/* {unreadMark ?
                    <View style={{ position: 'absolute', bottom: -36, right: -18, }}>
                        <Entypo
                            name='dot-single'
                            style={{ fontSize: 50, color: 'red', }}
                        ></Entypo>
                    </View>
                    : null} */}
            </View>
        </View>
    )

}

export default React.memo(ThreadElementTitle, (prevProps, nextProps) => {
    return prevProps._id === nextProps._id;
})
