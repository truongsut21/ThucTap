import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
    FlatList, Text, View,
    TouchableOpacity, ActivityIndicator,
    InteractionManager, Platform, UIManager
} from 'react-native';
import isEqual from 'react-fast-compare';
import { useDispatch, useSelector } from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';

import * as ActionFriend from '../../../friend/controllers/actionType';


const HandAddFriend = () => {
    const dispatch = useDispatch();
    const {CheckFriend,_chatID,isSentInvitation,isRecievedInviton} = useSelector(state=>{
        const myFriends = state.FriendStoredReducer.myFriends || {};
        const activeThreadId = state.ChatUnstoredReducer.activeThreadId;
        const myUserId =  state.AuthStoredReducer.myUserInfo._id;
        const fullThreads = state.ChatStoredReducer.fullThreads || {};
        let Thread = fullThreads[activeThreadId];
        let CheckFriend,_chatID,isSentInvitation,isRecievedInviton;
        
    
        if(!Thread)
        {
            return {}
        }
        else
        {

            if(Thread.chat_with_user_id)
            {
          
               
                _chatID = Thread.chat_with_user_id;
                let Friend = myFriends[_chatID];
            
                if(Friend)
                {
              

                    if(Friend.friend_status==="strange")
                    {
                      
                        CheckFriend = true;
                    }
                    else if(Friend.friend_status==="invitation"&&Friend.user_id_accept !== myUserId)
                    {
                        isSentInvitation = true;
                    }
                    else if(Friend.friend_status==="invitation"&&Friend.user_id_accept === myUserId)
                    {
                        isRecievedInviton = true;
                    }
                    else
                    {
                        CheckFriend = false;
                    }
                    
                }
                else
                {
                  
                    CheckFriend = true;
                    

                }
            }
            else
            {
                return false;
            }

        }
        return {
            CheckFriend,
            _chatID,
            isSentInvitation,
            isRecievedInviton,
        }
    },(prev, next) => isEqual(prev, next))
    const handleAddFriend = () => {
      
        dispatch({
            type: ActionFriend.API_SEND_REQUEST,
            data: _chatID,
        })
    }
    const handleRevokeInvitation = () => {
        dispatch({
            type: ActionFriend.API_CANCEL_SEND,
            data: _chatID,
        })
    }
    return (
        <View>
            {
                CheckFriend ?
                    <TouchableOpacity
                        onPress={handleAddFriend}
                        style={{
                            height: 40,
                            backgroundColor: "#fff",
                            position: "relative",
                            justifyContent: "center",
                            alignItems: "center",
                            borderBottomWidth: 0.5,
                            borderColor: "#ddd",
                            borderTopWidth: 0.5,

                        }}>
                        <Text style={{
                            fontSize: 16,
                            color: "#00A48D",
                            fontWeight: "500",
                        }}>+ Kết bạn</Text>
                    </TouchableOpacity>
                    : null
            }
            {
                isSentInvitation ?
                    <TouchableOpacity
                        onPress={handleRevokeInvitation}
                        style={{
                            height: 40,
                            backgroundColor: "#fff",
                            position: "relative",
                            justifyContent: "center",
                            alignItems: "center",
                            borderBottomWidth: 0.5,
                            borderColor: "#ddd",
                            borderTopWidth: 0.5,

                        }}>
                        <Text style={{
                            fontSize: 16,
                            color: "#ff471a",
                            fontWeight: "500",
                        }}>- Thu hồi lời mời kết bạn</Text>
                    </TouchableOpacity>
                    : null
            }
            {
                isRecievedInviton ?
                    <TouchableOpacity
                        onPress={handleAddFriend}
                        style={{
                            height: 40,
                            backgroundColor: "#fff",
                            position: "relative",
                            justifyContent: "center",
                            alignItems: "center",
                            borderBottomWidth: 0.5,
                            borderColor: "#ddd",
                            borderTopWidth: 0.5,

                        }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: "500",
                            color: "#00A48D",
                        }}>+ Chấp nhận kết bạn</Text>
                    </TouchableOpacity>
                    : null
            }
        </View>
    )
}
export default React.memo(HandAddFriend, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})
