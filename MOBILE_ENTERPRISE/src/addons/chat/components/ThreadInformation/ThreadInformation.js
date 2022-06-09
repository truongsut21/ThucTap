import React, { useEffect, useState } from 'react';
import {
    Text, View, Image, TouchableOpacity, SafeAreaView, Switch, ScrollView,
    TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import isEqual from 'react-fast-compare';
// import DispatchImage from '../DispatchImage';
import DefaultAvatar from '../../static/default_ava.png';
import DefaultGroupAvatar from '../../static/default_group_avatar.png';
import * as Action from '../../controllers/actionTypes';
import * as ActionFriend from '../../../friend/controllers/actionType';
import * as ActionAuth from '../../../auth/controllers/actionTypes'
import AntIcon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import StatusBar from '../../../base/components/StatusBar';
import DispatchImage from '../DispatchImage';
import SettingThreadEditAvatarGroup from './SettingThreadEditAvatarGroup'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const ThreadInformation = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const [changeThreadName, setChangeThreadName] = useState(false);
    const [showSearchMessage, setShowSearchMessage] = useState(false);
    const [newThreadName, setNewThreadName] = useState("");
    const thread_id = useSelector(state => state.ChatUnstoredReducer.activeThreadId);

    // get info thread_id
    let { threadTitle, localAvatar, cloudAvatar,
        needToDownloadAvatar, isThreadGroup,
        checkFriend, chat_with_user_id,
        isSentInvitation, isRecievedInviton,
    } = useSelector(state => {
        const imageAvatars = state.ChatStoredReducer.imageAvatars || {}
        const fullThreads = state.ChatStoredReducer.fullThreads || {};
        const myFriends = state.FriendStoredReducer.myFriends || {};
        const myContacts = state.FriendStoredReducer.myContacts || {};
        const myUserId = state.AuthStoredReducer.myUserInfo._id;
        let Thread = fullThreads[thread_id];
        if (!Thread) return {}
        let localAvatar = '', cloudAvatar = '',
            needToDownloadAvatar = false,
            threadTitle = Thread.name || '';

        //check friend or strange to sent invition
        let checkFriend = myFriends[Thread.chat_with_user_id] !== undefined && myFriends[Thread.chat_with_user_id].friend_status === "friend";
        let isSentInvitation = myFriends[Thread.chat_with_user_id] !== undefined && myFriends[Thread.chat_with_user_id].friend_status === "invitation" && myFriends[Thread.chat_with_user_id].friend_status === "invitation" && myFriends[Thread.chat_with_user_id].user_id_accept !== myUserId;
        let isRecievedInviton = myFriends[Thread.chat_with_user_id] !== undefined && myFriends[Thread.chat_with_user_id].friend_status === "invitation" && myFriends[Thread.chat_with_user_id].friend_status === "invitation" && myFriends[Thread.chat_with_user_id].user_id_accept === myUserId;

        if (Thread.is_group) {
            if (Thread.avatar_group_url) {
                localAvatar = imageAvatars[Thread.avatar_group_url];
                cloudAvatar = Thread.avatar_group_url;
                needToDownloadAvatar = localAvatar ? false : true
            }
        } else {
            //cá nhân
            const Someone = myFriends[Thread.chat_with_user_id] || myContacts[Thread.chat_with_user_id];
            if (!Someone) {
                return { someoneId: Thread.chat_with_user_id }
            }
            if (Someone && Someone !== Thread.name) threadTitle = Someone.name;
            if (Someone.avatar_url) {
                localAvatar = imageAvatars[Someone.avatar_url];
                cloudAvatar = Someone.avatar_url;
                needToDownloadAvatar = localAvatar ? false : true
            }
        }
        return {
            checkFriend,
            isSentInvitation,
            isRecievedInviton,
            threadTitle,
            localAvatar,
            cloudAvatar,
            needToDownloadAvatar,
            isThreadGroup: Thread.is_group,
            chat_with_user_id: Thread.chat_with_user_id,
        }
    }, (prev, next) => isEqual(prev, next));
    // lấy coi ai có thể sửa thông tin nhóm all hoặc only_leader
    let who_can_edit_thread = useSelector(state => {
        const fullThreads = state.ChatStoredReducer.fullThreads || {};
        let Thread = fullThreads[thread_id];
        if (!Thread) return {};
        return Thread.who_can_edit_thread

    }, (prev, next) => isEqual(prev, next));
    let { myStatus,
        myPosition,
    } = useSelector(state => {
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
            myPosition = threadMember[myInfoId].thread_member_position || 5;
            myStatus = threadMember[myInfoId].status || 0;
        }
        return {
            myStatus,
            myPosition,
        }
    }, (prev, next) => isEqual(prev, next));
    const notificationStatus = useSelector(state => {
        try {
            return state.ChatStoredReducer.fullThreads[thread_id].notification_status;
        } catch (error) {
            return null;
        }
    })

    useEffect(() => {
        if (!myStatus || myStatus === 0) {
            dispatch({
                type: ActionAuth.UPDATE_NOTIFICATION,
                data: "Bạn không còn là thành viên của nhóm"
            })
            navigation.goBack()
        }
    }, [myStatus]);

    useEffect(() => {

        if (needToDownloadAvatar) {

            dispatch({
                type: Action.API_DOWNLOAD_AVATAR,
                data: {
                    url: cloudAvatar,
                },
                dispatch: dispatch
            })
        }

    }, [needToDownloadAvatar]);

    const toggleNoti = () => {
        dispatch({
            type: Action.API_UPDATE_THREAD_NOTIFICATION,
            data: {
                thread_id: thread_id,
                new_status: notificationStatus === null ||
                    notificationStatus === undefined ||
                    notificationStatus ?
                    false
                    :
                    true
            }
        })
    }

    const onPressRoiNhom = () => {
        // let id = Object.keys(threadMember)[0]
        dispatch({
            type: Action.API_LEAVE_THREAD,
            data: {
                member_id: thread_id
            },
            navigation
        });

    };

    const handleChangeThreadName = () => {
        if (!newThreadName) {

            setChangeThreadName(false)
        }
        dispatch({
            type: Action.API_UPDATE_THREAD_NAME,
            data: {
                newThreadName,
                thread_id,
            },
            setChangeThreadName
        })

    }

    const renderModalChangeThreadName = () => {
        try {
            return (
                <Modal
                    isVisible={changeThreadName}
                    onBackButtonPress={() => {

                        setChangeThreadName(false)
                        setNewThreadName("")
                    }}
                    onBackdropPress={() => {

                        setChangeThreadName(false)
                        setNewThreadName("")

                    }}
                    style={{ justifyContent: "center", alignItems: "center", }}
                >
                    <View style={{
                        borderRadius: 6,
                        backgroundColor: "#fff",
                        width: "70%",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                    }}>
                        {/* <Text>aaaa</Text> */}
                        <TextInput
                            placeholderTextColor={'#000'}
                            style={{

                                marginHorizontal: 10,
                                marginVertical: 10,
                                paddingHorizontal: 10,
                                borderRadius: 5,
                                height: 50,
                                color: '#000',
                                width: "100%",
                                borderBottomColor: "#ccc",
                                borderBottomWidth: 2
                            }}
                            placeholder="Đặt tên mới cho nhóm"
                            onChangeText={(e) => {
                                setNewThreadName(e);
                            }}
                        />
                        <TouchableOpacity onPress={handleChangeThreadName}

                        >
                            <Text style={{ fontSize: 16, color: '#00A48D' }}>
                                Cập nhật
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>)
        } catch (error) {
            return null;
        }
    }
    const renderModalSearchMessage = () => {
        try {
            return (
                <Modal isVisible={showSearchMessage}
                    onBackButtonPress={() => {
                        // this.setState({
                        //     changeThreadName: false,
                        //     newThreadName: ''
                        // })
                        setShowSearchMessage(false)
                        // setWordSearch("")
                    }}
                    onBackdropPress={() => {
                        // this.setState({
                        //     changeThreadName: false,
                        //     newThreadName: ''
                        // })
                        setShowSearchMessage(false)
                        // setWordSearch("")

                    }}
                    style={{ justifyContent: "center", alignItems: "center", }}
                >
                    <View style={{
                        borderRadius: 6,
                        backgroundColor: "#fff",
                        width: "60%",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 10,
                    }}>
                        {/* <Text>aaaa</Text> */}
                        <TextInput
                            placeholderTextColor={'#000'}
                            style={{
                                marginHorizontal: 10,
                                marginVertical: 10,
                                paddingHorizontal: 10,
                                borderRadius: 5,
                                backgroundColor: '#f3f3f3',
                                padding: 0,
                                height: 50,
                                color: '#000',
                                width: "100%",
                            }}
                            placeholder="Nhập từ khóa tìm kiếm..." />
                        <TouchableOpacity onPress={() => {
                            setShowSearchMessage(false);
                        }}>
                            <Text style={{ fontSize: 16, color: '#00A48D' }}>
                                Tìm kiếm
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>)
        } catch (error) {
            return null;
        }
    }
    // xu li hủy ket ban 
    const handleCancelInvitation = () => {
        dispatch({
            type: ActionFriend.API_CANCEL_FRIEND,
            data: chat_with_user_id,
        })
    }
    //xử lý thêm bạn
    const handleAddFriend = () => {
        dispatch({
            type: ActionFriend.API_SEND_REQUEST,
            data: chat_with_user_id,
        })
    }
    const handleRevokeInvitation = () => {
        dispatch({
            type: ActionFriend.API_CANCEL_SEND,
            data: chat_with_user_id,
        })
    }

    const goToImageLibrary = () => {
        navigation.navigate('ThreadImageLibrary');
    }

    const goToFileLibrary = () => {
        navigation.navigate('ThreadFileLibrary');
    }


    const goToSearchLibrary = () => {
        navigation.navigate('ThreadSearchLibrary');
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle='light-content' backgroundColor='#00A48D' />
            <StatusBar backgroundColor='#00A48D' barStyle={'dark-content'} />
            <View style={{
                height: 50,
                backgroundColor: '#fff',
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderBottomColor: '#ddd'
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginRight: 5 }}>
                        <TouchableOpacity delayPressIn={0} delayPressOut={0} style={{ padding: 10 }}
                            onPress={() => navigation.goBack()}
                        >
                            <AntIcon color='#00A48D' size={22} name='arrowleft' style={{}} />
                        </TouchableOpacity>
                    </View>
                    {
                        isThreadGroup
                            ?
                            <View style={{}}>
                                <View style={{ paddingVertical: 2 }}>
                                    <Text style={{ paddingHorizontal: 5, fontSize: 17, color: '#000', fontWeight: '500' }}>
                                        Thông tin nhóm
                                    </Text>
                                </View>
                            </View>
                            :
                            <View style={{}}>
                                <View style={{ paddingVertical: 2 }}>
                                    <Text style={{ fontSize: 17, color: '#000', fontWeight: '500' }}>
                                        Thông tin cá nhân
                                    </Text>
                                </View>
                            </View>
                    }
                </View>
            </View>
            <View style={{ width: 50, height: 50 }}>

                {/* <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={deleteFriend}>
                        <Text>
                            xoa ban
                        </Text>
                    </TouchableOpacity>
                </View> */}
            </View>

            <ScrollView>
                <View style={{
                    minHeight: 180, alignItems: 'center',
                    flexDirection: 'column', justifyContent: 'center',
                }}>

                    {/* <ThreadAvatar PERMISSION_IN_GROUP={this.state.PERMISSION_IN_GROUP} /> */}

                    <View style={{
                        justifyContent: 'center',
                        flexDirection: 'row', flex: 1
                    }}>
                        <View style={{
                            justifyContent: 'center', backgroundColor: '',
                            flex: 1,
                        }}>
                            <View style={{
                                paddingLeft: 0, flexDirection: 'column',
                                justifyContent: 'center',
                                flex: 1,
                            }}>
                                <View style={{

                                    alignItems: 'center',
                                    paddingHorizontal: 20,
                                }}>


                                    {
                                        localAvatar
                                            ?
                                            <DispatchImage
                                                style={{ width: 110, height: 110, borderRadius: 60 }}
                                                source={localAvatar}
                                                type={'avatar'}
                                                data={{
                                                    cloudLink: cloudAvatar
                                                }}
                                            />
                                            :
                                            <Image
                                                source={isThreadGroup ? DefaultGroupAvatar : DefaultAvatar}
                                                style={{
                                                    width: 110, height: 110, borderRadius: 60
                                                }
                                                } />
                                    }



                                    <Text style={{
                                        flex: 1,
                                        fontSize: 25,
                                        color: '#000',
                                        fontWeight: Platform.OS === 'android' ? '700' : '500',
                                        padding: 0, textAlign: 'center',
                                    }} numberOfLines={1} ellipsizeMode='tail'>
                                        {/* {contact ? contact.name : thread.name} */}
                                        {threadTitle}
                                    </Text>
                                </View>


                                <Text style={{
                                    marginBottom: 1, fontSize: 13,
                                    //  color: '#888',
                                    color: "green"
                                    ,
                                    textAlign: 'center',
                                }} numberOfLines={1} ellipsizeMode='tail'>
                                    Đang hoạt động
                                </Text>

                            </View>
                        </View>
                    </View>

                </View>
                <View style={{
                    height: 5,
                }} />

                {
                    isThreadGroup
                        ?
                        <React.Fragment>
                            <View style={{
                                height: 36,
                                marginTop: 10,
                                // backgroundColor: '#f0f4f8', 
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: '700',
                                    color: '#a9a9a9',
                                    marginLeft: 8,
                                    marginLeft: 16
                                }}>
                                    Thông tin nhóm
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 10,
                                    height: 50,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    marginLeft: 10
                                }}
                                delayPressIn={0} delayPressOut={0}
                                onPress={() => {
                                    navigation.navigate('ThreadMembers', { _id: thread_id })
                                }}>
                                <MaterialCommunityIcons name='account-group' size={25} color='#00A48D' />

                                <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15 }}>
                                    Thành viên
                                </Text>


                            </TouchableOpacity>

                            <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />
                            <View
                                style={{
                                    paddingHorizontal: 10,
                                    height: 50,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    marginLeft: 10

                                }}
                            >
                                <Ionicons name='notifications' size={25} color='#00A48D' />
                                <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15, flex: 1 }}>
                                    Thông báo
                                </Text>
                                <View style={{
                                    width: 80,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#42e360" }}
                                        thumbColor="#fff"
                                        ios_backgroundColor="#fff"
                                        onValueChange={toggleNoti}
                                        value={
                                            notificationStatus === undefined ||
                                                notificationStatus === null ||
                                                notificationStatus ?
                                                true
                                                :
                                                false
                                        }
                                    />
                                </View>
                            </View>
                            <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />
                            {/* <TouchableOpacity style={{
                                            paddingHorizontal: 10,
                                            height: 50,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            backgroundColor: '#fff',
                                            marginLeft: 10

                                        }} delayPressIn={0} delayPressOut={0} onPress={() => {
                                            
                                                // navigation.navigate('ChangeInformation', {
                                                //     thread_id: thread_id,
                                                // })
                                                setChangeThreadName(true);
                                            
                                        }}>
                                            <AntIcon name='edit' size={25} color='#00A48D'
                                                style={{ fontWeight: 'bold' }} />
                                            <Text style={{
                                                paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15
                                            }}>
                                                Đổi tên nhóm test
                                        </Text>
                                        </TouchableOpacity> */}
                            {
                                (who_can_edit_thread === "all" || myPosition === 1 || myPosition === 3)
                                    ?
                                    <React.Fragment>
                                        <TouchableOpacity style={{
                                            paddingHorizontal: 10,
                                            height: 50,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            backgroundColor: '#fff',
                                            marginLeft: 10

                                        }} delayPressIn={0} delayPressOut={0} onPress={() => {
                                            if (who_can_edit_thread === "all" || myPosition === 1 || myPosition === 2) {
                                                // navigation.navigate('ChangeInformation', {
                                                //     thread_id: thread_id,
                                                // })
                                                setChangeThreadName(true);
                                            }
                                        }}>
                                            <AntIcon name='edit' size={25} color='#00A48D'
                                                style={{ fontWeight: 'bold' }} />
                                            <Text style={{
                                                paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15
                                            }}>
                                                Đổi tên nhóm
                                            </Text>
                                        </TouchableOpacity>
                                        <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />
                                        <SettingThreadEditAvatarGroup />
                                        <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />
                                    </React.Fragment>
                                    : null
                            }
                            {
                                (myPosition === 1 && myStatus === 1)
                                    ?
                                    <TouchableOpacity
                                        style={{
                                            paddingHorizontal: 10,
                                            height: 50,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            backgroundColor: '#fff',
                                            marginLeft: 10
                                        }}
                                        delayPressIn={0} delayPressOut={0}
                                        onPress={() => {
                                            navigation.navigate('SettingThread')
                                        }}>
                                        <AntIcon name='setting' size={25} color='#00A48D' />

                                        <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15 }}>
                                            Cài đặt nhóm
                                        </Text>
                                    </TouchableOpacity>
                                    : null
                            }
                            {/* <TouchableOpacity style={{
                                            paddingHorizontal: 10,
                                            height: 50,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            backgroundColor: '#fff',
                                            marginLeft: 10

                                        }} delayPressIn={0} delayPressOut={0} onPress={() => {
                                            thread = _.cloneDeep(thread);
                                            this.props.dispatch({
                                                type: thread.thread_pin_sequence !== 0 ? Action.API_UNPIN_THREAD : Action.API_PIN_THREAD,
                                                thread,
                                            })
                                        }}>
                                            <MaterialCommunityIcons name='pin' size={25} color='#000'
                                                style={{ fontWeight: 'bold' }} />
                                            <Text style={{
                                                paddingLeft: 10, color: '#333', fontSize: 15
                                            }}>
                                                {
                                                    thread.thread_pin_sequence !== 0
                                                        ?
                                                        'Bỏ ghim nhóm'
                                                        :
                                                        'Ghim nhóm'
                                                }
                                            </Text>
                                        </TouchableOpacity> */}
                            <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />

                        </React.Fragment>
                        :
                        <React.Fragment>
                            <View style={{
                                height: 36,
                                marginTop: 10,
                                // backgroundColor: '#f0f4f8', 
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: '700',
                                    color: '#a9a9a9',
                                    marginLeft: 8,
                                    marginLeft: 16
                                }}>
                                    Thông tin người dùng
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 10,
                                    height: 50,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    marginLeft: 10
                                }}
                                delayPressIn={0} delayPressOut={0}
                                onPress={() => {

                                }}>
                                <MaterialCommunityIcons name='email-outline' size={25} color='#00A48D' />

                                <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15 }}>
                                    Email
                                </Text>
                            </TouchableOpacity>
                            <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />
                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 10,
                                    height: 50,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    marginLeft: 10
                                }}
                                delayPressIn={0} delayPressOut={0}
                                onPress={() => {

                                }}>
                                <MaterialCommunityIcons name='phone' size={25} color='#00A48D' />

                                <Text style={{ paddingLeft: 10, color: '#333', fontWeight: "300", fontSize: 15 }}>
                                    Điện thoại
                                </Text>
                            </TouchableOpacity>
                            <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />
                            <View
                                style={{
                                    paddingHorizontal: 10,
                                    height: 50,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    justifyContent: 'space-between',
                                    marginLeft: 10
                                }}
                            >
                                <Ionicons name='notifications' size={25} color='#00A48D' />
                                <Text style={{ paddingLeft: 10, color: '#333', fontWeight: "300", fontSize: 15, flex: 1 }}>
                                    Thông báo
                                </Text>
                                <View style={{
                                    width: 80,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <Switch
                                        trackColor={{ false: "#767577", true: "#42e360" }}
                                        thumbColor="#fff"
                                        ios_backgroundColor="#fff"
                                        onValueChange={toggleNoti}
                                        value={
                                            notificationStatus === undefined ||
                                                notificationStatus === null ||
                                                notificationStatus ?
                                                true
                                                :
                                                false
                                        }
                                    />
                                </View>
                            </View>
                        </React.Fragment>
                }

                <View style={{
                    height: 36,
                    marginTop: 10,
                    // backgroundColor: '#f0f4f8', 
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: '#a9a9a9',
                        marginLeft: 8,
                        marginLeft: 16,
                    }}>
                        Hành động nâng cao
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 10,
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        marginLeft: 10
                    }}
                    delayPressIn={0} delayPressOut={0}
                    onPress={() => {
                        // setTimeout(() => {
                        //     this.setState({
                        //         showSearchMessage: true
                        //     })
                        // }, 0)
                        goToSearchLibrary()

                    }}>
                    <AntIcon name='search1' size={25} color='#00A48D' />

                    <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15 }}>
                        Tìm kiếm tin nhắn
                    </Text>
                </TouchableOpacity>
                {/* <View style={{ height: 2, backgroundColor: '#f0f4f8' }} /> */}

                <View style={{
                    height: 36,
                    marginTop: 10,
                    // backgroundColor: '#f0f4f8', 
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: '#a9a9a9',
                        marginLeft: 8,
                        marginLeft: 16
                    }}>
                        Tệp tin &amp; phương tiện
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 10,
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        marginLeft: 10
                    }}
                    delayPressIn={0} delayPressOut={0}
                    onPress={goToImageLibrary}>
                    <AntIcon name='picture' size={25} color='#00A48D' />

                    <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15 }}>
                        Hình ảnh
                    </Text>
                </TouchableOpacity>
                <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 10,
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        marginLeft: 10
                    }}
                    delayPressIn={0} delayPressOut={0}
                    onPress={() => {
                        goToFileLibrary()
                    }}>
                    <AntIcon name='file1' size={25} color='#00A48D' />

                    <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15 }}>
                        Tập tin
                    </Text>
                </TouchableOpacity>
                <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />

                {
                    (isThreadGroup)
                        ?
                        <View>
                            <View style={{
                                height: 36,
                                marginTop: 10,
                                // backgroundColor: '#f0f4f8', 
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: '700',
                                    color: '#a9a9a9',
                                    marginLeft: 8,
                                    marginLeft: 16
                                }}>
                                    Lựa chọn khác
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 10,
                                    height: 50,
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    backgroundColor: '#fff',
                                    marginLeft: 10,
                                    marginTop: 2,
                                }}
                                delayPressIn={0} delayPressOut={0}
                                onPress={onPressRoiNhom}
                            >
                                <Ionicons name='md-exit-outline' size={25} color='#c00' />

                                <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#c00', fontSize: 15 }}>
                                    Rời nhóm
                                </Text>
                            </TouchableOpacity>
                            <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />
                        </View>
                        :
                        null

                }
                {/* kiểm tra đã là bạn hay chưa  */}
                {
                    checkFriend && !isThreadGroup
                        ?
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 10,
                                height: 50,
                                alignItems: 'center',
                                flexDirection: 'row',
                                backgroundColor: '#fff',
                                marginLeft: 10,
                                marginTop: 2,
                            }}
                            delayPressIn={0} delayPressOut={0}
                            onPress={handleCancelInvitation}
                        >
                            <MaterialCommunityIcons name='account-cancel-outline' size={25} color='#ff471a' />

                            <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#ff471a', fontSize: 15 }}>
                                Hủy kết bạn
                            </Text>
                        </TouchableOpacity>
                        :
                        null

                }
                {
                    !checkFriend && !isThreadGroup && !isSentInvitation && !isRecievedInviton
                        ?
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 10,
                                height: 50,
                                alignItems: 'center',
                                flexDirection: 'row',
                                backgroundColor: '#fff',
                                marginLeft: 10,
                                marginTop: 2,
                            }}
                            delayPressIn={0} delayPressOut={0}
                            onPress={handleAddFriend}
                        >
                            <Ionicons
                                name="person-add-outline"
                                size={25}
                                color="#00A48D"
                            />

                            <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#00A48D', fontSize: 15 }}>
                                Kết bạn
                            </Text>
                        </TouchableOpacity>
                        : null
                }
                {
                    isSentInvitation && !isThreadGroup && !isRecievedInviton
                        ?
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 10,
                                height: 50,
                                alignItems: 'center',
                                flexDirection: 'row',
                                backgroundColor: '#fff',
                                marginLeft: 10,
                                marginTop: 2,
                            }}
                            delayPressIn={0} delayPressOut={0}
                            onPress={handleRevokeInvitation}
                        >
                            <Ionicons
                                name="person-remove-outline"
                                size={25}
                                color="#ff471a"
                            />

                            <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#ff471a', fontSize: 15 }}>
                                Thu hồi lời mời kết bạn
                            </Text>
                        </TouchableOpacity>
                        : null

                }
                {
                    isRecievedInviton && !isThreadGroup
                        ?
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: 10,
                                height: 50,
                                alignItems: 'center',
                                flexDirection: 'row',
                                backgroundColor: '#fff',
                                marginLeft: 10,
                                marginTop: 2,
                            }}
                            delayPressIn={0} delayPressOut={0}
                            onPress={handleAddFriend}
                        >
                            <Feather
                                name="user-check"
                                size={25}
                                color="#00A48D"
                            />

                            <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#00A48D', fontSize: 15 }}>
                                Chấp nhận kết bạn
                            </Text>
                        </TouchableOpacity>
                        : null

                }

            </ScrollView>
            {renderModalChangeThreadName()}
            {renderModalSearchMessage()}
        </SafeAreaView>
    )
}
export default React.memo(ThreadInformation, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
});