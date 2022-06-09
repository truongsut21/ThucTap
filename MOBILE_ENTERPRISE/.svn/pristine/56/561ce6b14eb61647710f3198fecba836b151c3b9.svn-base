import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    TextInput,
    FlatList,
    Image,
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import isEqual from 'react-fast-compare';
import DispatchImage from '../../chat/components/DispatchImage';
import * as ActionChat from '../../chat/controllers/actionTypes';
import * as ActionFriend from '../../friend/controllers/actionType';
import DefaultAvatar from '../../chat/static/default_ava.png';



const InvitationSentElement = ({ _id }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { localAvatar, cloudAvatar,
        needToDownloadAvatar, needToDownloadContact, Someone
    } = useSelector(state => {
        const imageAvatars = state.ChatStoredReducer.imageAvatars
        const myFriends = state.FriendStoredReducer.myFriends;
        const myContacts = state.FriendStoredReducer.myContacts;

        //cá nhân
        let Someone = myFriends[_id] || myContacts[_id],
            needToDownloadContact = false,
            localAvatar,
            cloudAvatar,
            needToDownloadAvatar;

        if (!Someone) {
            return { needToDownloadContact: true }
        }
        if (Someone.avatar_url) {
            localAvatar = imageAvatars[Someone.avatar_url];
            cloudAvatar = Someone.avatar_url;
            needToDownloadAvatar = localAvatar ? false : true
        }

        return { localAvatar, cloudAvatar, needToDownloadContact, needToDownloadAvatar, Someone }
    }, (prev, next) => isEqual(prev, next));




    useEffect(() => {
        if (needToDownloadContact) {
            dispatch({
                type: ActionFriend.API_DOWNLOAD_CONTACT,
                data: {
                    ids: [_id],
                },
            })
        }
    }, [needToDownloadContact])

    useEffect(() => {
        if (needToDownloadAvatar) {
            dispatch({
                type: ActionChat.API_DOWNLOAD_AVATAR,
                data: {
                    url: cloudAvatar,
                },
                dispatch: dispatch
            })
        }
    }, [needToDownloadAvatar])



    //thu hồi lời mời
    const handleRevokeInvitation = () => {
        dispatch({
            type: ActionFriend.API_CANCEL_SEND,
            data: _id,
        })
    }
    // xem thông tin user
    const handleShowInfor = ()=>{
        dispatch({
            type:ActionChat.CHAT_WITH_SOMEONE,
            data:{contact_id:_id},
            navigation
        })
    }
    return (
        <View style={{
            height: 80,
            backgroundColor: "#ebf4f7",
            paddingHorizontal: 10,
            marginTop: 4,
            // backgroundColor: "#ff1",
        }}>

            <View
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 10,

                }}
            >
             <TouchableOpacity 
                activeOpacity={1}
                style={{
                    flexDirection:"row",
                    justifyContent:"center",
                    alignItems:"center"
                }}
                onPress={handleShowInfor}
                >
                {
                    localAvatar
                        ?
                        <DispatchImage
                            style={{
                                width: 55,
                                height: 55,
                                borderRadius: 50,
                                borderWidth: 0.7,
                                borderColor: '#ccc',


                            }}
                            source={localAvatar}
                            type={'avatar'}
                            data={{
                                cloudLink: cloudAvatar
                            }}
                        />
                        :
                        <Image
                            source={DefaultAvatar}
                            style={{
                                width: 55, height: 55,
                                borderRadius: 50,
                            }} />
                }
                <View style={{
                    paddingLeft: 10,
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "500",
                    }}>
                        {Someone && Someone.name}
                    </Text>
                    <Text style={{ color: '#151516bf' }}>Đã gửi kết bạn</Text>
                </View>
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    flexDirection: 'row',
                    alignItems: "flex-end",
                }}>
                    <TouchableOpacity

                        style={{
                            backgroundColor: '#00A48D',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 20,
                            // backgroundColor:"#ccc",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View style={{ fontSize: 16, color: '#fff' }}>
                            {/* {showButton} */}
                            <View>
                                <TouchableOpacity onPress={handleRevokeInvitation}>
                                    <Text style={{ color: "#fff", fontSize: 16 }}>Thu hồi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        style={{
                            paddingVertical: 10,
                            marginHorizontal: 10,
                        }}
                    >
                        <AntDesign color="#000" size={22} name="close" style={{}} />
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    )
}

export default InvitationSentElement
