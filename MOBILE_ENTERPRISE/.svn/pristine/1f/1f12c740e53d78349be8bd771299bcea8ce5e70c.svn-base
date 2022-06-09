import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Text, View,
    TouchableOpacity,
    Image,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import isEqual from 'react-fast-compare';

import DispatchImage from '../../chat/components/DispatchImage';
import DefaultAvatar from '../../chat/static/default_ava.png';


import * as ActionFriend from '../controllers/actionType';
import * as ActionChat from '../../chat/controllers/actionTypes';

const FindFriendElement = ({ dataBack, deleteDataBack }) => {

    const dispatch = useDispatch();
    // lấy id từ dataBack trong findfriend để truyền qua props
    let _id = dataBack._id;

    // lấy thông tin để cập nhật thông tin từ _id và tải hình 
    const { localAvatar, cloudAvatar,
        needToDownloadAvatar, needToDownloadContact, Someone
    } = useSelector(state => {
        const imageAvatars = state.ChatStoredReducer.imageAvatars || {};
        const myFriends = state.FriendStoredReducer.myFriends || {};
        const myContacts = state.FriendStoredReducer.myContacts || {};

        //nếu _id đó có trong bạn bè và contact thì lấy thông tin trong reducer
        // lấy hình localAvater nếu chưa có localAvatar thì lấy 
        // clouAvart để tải hình về trong localAvatar đẻ show hình

        //lấy thông tin của _id trong myfriend và contact reducer
        let Someone = myFriends[_id] || myContacts[_id],
            needToDownloadContact = false,
            localAvatar,
            cloudAvatar,
            needToDownloadAvatar;
        // chưa có ai gán needtodownloadContact để cập nhật lại contact trong reducer
        if (!Someone) {
            return { needToDownloadContact: true }
        }
        else {
            //trường hợp có Someone
            //kiểm tra Someone có avatar_url không
            if (Someone.avatar_url) {
                //kiểm tra đã có localAvart trong imageAvatar chưa 
                localAvatar = imageAvatars[Someone.avatar_url]; // có uri hoặc undefied

                //lấy avartar_url trong Some nếu localAvartar chưa có dùng nó đế call tải hình
                cloudAvatar = Someone.avatar_url;

                // nếu chưa có localAvart thì needtodownloadAvartar true để downd hình về
                needToDownloadAvatar = localAvatar ? false : true
            }
            else {
                // không có avartar thì cho sài mặc định hết khỏi down gì cả
                // localAvatar = DefaultAvatar;
                // cloudAvatar = DefaultAvatar;
                // needToDownloadAvatar = false;

            }
        }
        return {
            localAvatar,
            cloudAvatar,
            needToDownloadContact,
            needToDownloadAvatar,
            Someone
        }
    }, (prev, next) => isEqual(prev, next));

    // nếu chưa có someone thì call api để tải contact về lưu reducer
    // bắt trường hợp Someone cập nhật thông tin ví dụ avatar bắt Someone thay đổi để tải lại avatar
    useEffect(() => {
        if (!Someone) {
            dispatch({
                type: ActionFriend.API_DOWNLOAD_CONTACT,
                data: {
                    ids: [_id],
                },
            })
        }
    }, [Someone])
    //tải avatar khi có thay đổi 
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

    //xử lí mời kết bạn
    const handleClickSendInvite = () => {
        dispatch({
            type: ActionFriend.API_SEND_REQUEST,
            data: _id,
        })
    }
    // xử lí thu hồi kết bạn
    const cancelSend = () => {
        dispatch({
            type: ActionFriend.API_CANCEL_SEND,
            data: _id,
        })
    }
    // từ chối lời kết bạn
    const handleDeniInvition = () => {
        dispatch({
            type: ActionFriend.API_DENIED_REQUEST,
            data: _id,
        })
    }
    // xử lí đồng ý kết bạn
    const handleAcceptFriend = () => {
        dispatch({
            type: ActionFriend.API_ACCEPT_FRIEND,
            data: _id,
        })
    }

    let showButton = null;
    let title = null;
    // logic show các button trong các trường hợp chưa kết bạn, đã là bạn
    // đã gửi lời mời, đã nhận lời mời
    if (Someone && Object.values(Someone).length > 0) {
        if (Someone.friend_status === 'strange' || !Someone.friend_status) {
            title = "Kết bạn nào!"
            showButton = <TouchableOpacity
                activeOpacity={1}
                style={{
                    backgroundColor: '#00A48D',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 20
                }}
                onPress={handleClickSendInvite}
            >
                <Text style={{ fontSize: 16, fontWeight: "500", color: '#fff' }}>
                    Kết bạn
                </Text>
            </TouchableOpacity>
        }
        if (Someone && Someone.friend_status === 'invitation' && Someone.user_id_invite !== _id) {
            title = "Kết bạn nào!"
            showButton = <TouchableOpacity
                activeOpacity={1}
                style={{
                    backgroundColor: '#00A48D',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 20
                }}
                onPress={cancelSend}
            >
                <Text style={{ fontSize: 16, fontWeight: "500", color: '#fff' }}>
                    Thu hồi
                </Text>
            </TouchableOpacity>
        }
        if (Someone && Someone.friend_status === 'invitation' && Someone.user_id_invite === Someone._id) {
            title = "Chào bạn, kết bạn nhé!"
            showButton = <TouchableOpacity
                activeOpacity={1}
                style={{
                    backgroundColor: '#00A48D',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 20
                }}
                onPress={handleAcceptFriend}
            >
                <Text style={{ fontSize: 16, fontWeight: "500", color: '#fff' }}>
                    Đồng ý
                </Text>
            </TouchableOpacity>
        }
        if (Someone && Someone.friend_status === 'friend') {
            title = "Đã là bạn bè!"
            showButton = <View
                style={{
                    backgroundColor: '#00A48D',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 20,

                }}

            >
                <Text style={{ fontSize: 16, fontWeight: "500", color: '#fff' }}>
                    Bạn bè
                </Text>
            </View>
        }
    }
    return (
        <View style={{
            height: 80,
            backgroundColor: "#ebf4f7",
            paddingHorizontal: 10,
            marginHorizontal: 10,
            marginVertical: 10,
            borderRadius: 20,
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
                        {dataBack && dataBack.name}
                    </Text>
                    <Text style={{ color: '#151516bf' }}>{title}</Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    flexDirection: 'row',
                    alignItems: "flex-end",
                }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <View style={{ fontSize: 16, color: '#fff', marginRight: 10, }}>
                            {showButton}
                        </View>
                        <TouchableOpacity
                            onPress={() => deleteDataBack()}
                            style={{
                                // backgroundColor:"red",
                            }}
                        >
                            <View style={{
                                height: "100%",
                                paddingVertical: 10,
                                // paddingHorizontal: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                // backgroundColor:"#ccc"
                            }}>
                                <AntIcon color="#000" size={22} name="close" style={{}} />
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        </View>
    )
}

export default FindFriendElement
