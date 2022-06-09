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
import AntDesign from 'react-native-vector-icons/AntDesign';
import DispatchImage from '../../chat/components/DispatchImage';
import * as ActionChat from '../../chat/controllers/actionTypes';
import * as ActionFriend from '../../friend/controllers/actionType';
import DefaultAvatar from '../../chat/static/default_ava.png';


const InvitationReceivedElement = ({ _id }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const myFriends = useSelector(state => state.FriendStoredReducer.myFriends)
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
    // xu ly dong y ket ban
    const handleAcceptFriend = () => {
        dispatch({
            type: ActionFriend.API_ACCEPT_FRIEND,
            data: _id,
        })
    }
    // xu ly tu choi ket ban
    const handleDeniedAcceptFriend = () => dispatch({
        type: ActionFriend.API_DENIED_REQUEST,
        data: _id,
    })
    const handleShowInfor = ()=>{
        navigation.navigate("PopupUserInfo",{
            _id,
        })
    }
    return (
        <View style={{
            height: 150,
            backgroundColor: "#ebf4f7",
            marginTop: 10,
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
                        {Someone.name}
                    </Text>
                    <Text style={{ color: '#151516bf' }}>Muốn kết bạn</Text>
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
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            borderRadius: 20,
                            marginRight: 4,
                        }}
                        onPress={handleDeniedAcceptFriend}
                    >
                        <Text style={{ fontSize: 16, color: '#fff' }}>
                            Từ chối
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#00A48D',
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            borderRadius: 20
                        }}
                        onPress={handleAcceptFriend}
                    >
                        <Text style={{ fontSize: 16, color: '#fff' }}>
                            Đồng ý
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* asdasddsss */}
            <View style={{
                borderRadius: 10,
                borderWidth: 3,
                marginHorizontal: 10,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderColor: '#fff',
                backgroundColor: '#fff',
                marginVertical: 10
            }}>
                <Text style={{ paddingHorizontal: 10, fontSize: 16 }}>Xin chào,mình là <Text>{Someone.name}</Text>. Kết bạn nhé!</Text>
            </View>

        </View>
    )
}
export default React.memo(InvitationReceivedElement, (prevProps, nextProps) => {
	return isEqual(prevProps, nextProps);
});