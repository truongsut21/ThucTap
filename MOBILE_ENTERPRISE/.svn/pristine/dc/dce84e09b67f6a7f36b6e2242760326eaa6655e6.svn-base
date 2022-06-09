import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    SafeAreaView, Text, View,
    InteractionManager
} from 'react-native';
import isEqual from 'react-fast-compare';
import { useNavigation, useRoute } from '@react-navigation/core';
import InputBar from '../InputBox/InputBar';
import useTheme from '../../../base/components/useTheme';

// set show inpubar khi status =1 va an inputbar khi stats=0
const ShowInputBar = ({ threadId }) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
    let { who_can_send_message } = useSelector(state => {
        const thread_id = state.ChatUnstoredReducer.activeThreadId;
        const fullThreads = state.ChatStoredReducer.fullThreads || {};
        let Thread = fullThreads[thread_id];
        if (!Thread) return {}
        return { who_can_send_message: Thread.who_can_send_message }
    }, (prev, next) => isEqual(prev, next));
    let { myStatus,
        myPosition
    } = useSelector(state => {
        const thread_id = state.ChatUnstoredReducer.activeThreadId;
        if (!thread_id) {
            return {
                myStatus: 0,
            }
        }
        const threadMembers = state.ChatStoredReducer.threadMembers || {};
        const myInfoId = state.AuthStoredReducer.myUserInfo._id;
        let threadMember = threadMembers[thread_id];
        let myPosition;
        let myStatus;
        if (!threadMember) {

            return {
                myPosition: 1,
                myStatus: 1,
            }
        }
        else {
            if (threadMember[myInfoId]) {
                myPosition = threadMember[myInfoId].thread_member_position || 5;
                myStatus = threadMember[myInfoId].status || 0;
            }
        }
        return {
            myStatus,
            myPosition,
        }
    }, (prev, next) => isEqual(prev, next));
    if (!myStatus) return (
        <View style={{
            backgroundColor: theme.backgroundInputBarColor,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 4,

        }}>
            <Text style={{
                fontSize: 14,
                fontWeight: "700",
                color: theme.textColor,
            }}
            >Bạn đã không còn là thành viên của nhóm này</Text>
        </View>
    )
    else {
        if (who_can_send_message === "only_leader" && myPosition === 5) {
            return (
                <View style={{
                    backgroundColor: theme.backgroundInputBarColor,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 4,

                }}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: "700",
                        textAlign: "center",
                        color: theme.textColor,
                    }}
                    >Chỉ có trưởng nhóm và phó nhóm được phép gửi tin nhắn</Text>
                </View>
            )
        }
        else {
            return (<InputBar
                activeThreadId={threadId}
                route={route}
                navigation={navigation} />
            )
        }
    }

}
export default React.memo(ShowInputBar, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
});