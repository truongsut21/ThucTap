import React, { useEffect, useState } from 'react';
import {
    LayoutAnimation, UIManager, Platform, FlatList,
    View, Text
} from 'react-native';
import { useSelector } from 'react-redux';
import { orderBy, set, without } from 'lodash';
import SuggestElement from './SuggestElement';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

//Component này bắn thông tin API search chỉ viết trên component 
//vì component unmount thì ko cần thực hiện nữa
const Suggest = ({ searchContent }) => {
    const reducerThreads = useSelector(state => {
        try {
            const simpleThreads = state.ChatStoredReducer.simpleThreads;
            const fullThreads = state.ChatStoredReducer.fullThreads;
            return simpleThreads.map(t => {
                return {
                    _id: t._id,
                    name: fullThreads[t._id].name,
                    is_group: fullThreads[t._id].is_group,
                    avatar_group_url: fullThreads[t._id].is_group,
                    chat_with_user_id: fullThreads[t._id].chat_with_user_id,
                    write_date: fullThreads[t._id].write_date,
                    isThread: true,
                }
            })
        } catch (error) {
            return [];
        }
    }, (prev, next) => false);
    const reducerFriends = useSelector(state => {
        try {
            const people_ids = without(reducerThreads.map(t => t.chat_with_user_id), null);
            const Friends = state.FriendStoredReducer.myFriends;
            return orderBy(
                Object.values(Friends).filter(f => {
                    return f.friend_status === 'friend' && people_ids.indexOf(f._id) === -1
                }),
                "name", "asc");
        } catch (error) {
            return [];
        }
    }, (prev, next) => false);
    const [Threads, setThreads] = useState(reducerThreads);
    const [Friends, setFriends] = useState(reducerFriends);
    const [Suggests, setSuggests] = useState(reducerThreads.concat(reducerFriends));

    useEffect(() => {
        let Ts = without(reducerThreads.map(t => {
            if (t.name.toLowerCase().indexOf(searchContent.toLowerCase()) !== -1) {
                return t;
            }
            return null;
        }), null);
        let Fs = without(reducerFriends.map(t => {
            if (t.name.toLowerCase().indexOf(searchContent.toLowerCase()) !== -1) {
                return t;
            }
            return null;
        }), null);
        setThreads(Ts);
        setFriends(Fs);
    }, [searchContent]);

    useEffect(() => {
        if (Threads.length < 5) {

        }
    }, [Threads]);

    useEffect(() => {
        setSuggests(Threads.concat(Friends))
    }, [Threads, Friends]);

    useEffect(() => {
        LayoutAnimation.configureNext({
            duration: 300,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            delete: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
        })
    }, [Suggests]);

    const ListEmptyComponent = () => {
        return <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20
        }}>
            <Text style={{
                color: '#aaa',
                fontSize: 20,
            }}>
                Không tìm thấy kết quả
            </Text>
        </View>
    }

    const renderItem = ({ item, index }) => {
        return <SuggestElement
            item={item}
        />
    }

    const keyExtractor = (item, index) => {
        return item._id;
    }

    const getItemLayout = (data, index) => {
        return { length: 50, offset: 50 * index, index }
    }

    return <FlatList
        style={{
            flex: 1,
            paddingHorizontal: 10,
            marginTop: 10,
        }}
        data={Suggests}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        initialNumToRender={20}
        removeClippedSubviews={true}
    />;
}

export default Suggest;