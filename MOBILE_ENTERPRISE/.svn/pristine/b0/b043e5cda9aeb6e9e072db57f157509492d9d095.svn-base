import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, View, Image, Text, Animated, Easing } from 'react-native';
import { connect, useSelector } from 'react-redux';
import FileViewer from 'react-native-file-viewer';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import isEqual from 'react-fast-compare';
import ReactionSummary from './ReactionSummary';
import * as Action from '../../controllers/actionTypes';
import { WIDTH } from '../../controllers/utils';
import Hyperlink from 'react-native-hyperlink';
import DispatchImage from '../DispatchImage';
import DefaultAvatar from "../../static/default_ava.png";
import { useDispatch } from 'react-redux';
import * as FriendAction from '../../../friend/controllers/actionType';
import * as ActionAuth from '../../../auth/controllers/actionTypes';
import { useNavigation } from '@react-navigation/native';





var RNFS = require('react-native-fs');



const InfoContent = ({ _id }) => {
    const time = useSelector(state => {
        return state.ChatStoredReducer.fullMessages[_id].create_date;
    }, (prev, next) => prev === next)

    try {
        return (<View
            style={{
                paddingTop: 2,
                justifyContent: 'flex-end',
                flexDirection: 'row',
            }}>
            <React.Fragment>
                <Text style={{
                    paddingRight: 2, fontSize: 11,
                    color: 'black'
                }}>
                    {format(new Date(time), 'HH:mm', { locale: vi })}
                </Text>
                <MaterialCommunityIcons size={14} name='check' color='black' />
            </React.Fragment>
        </View>)
    } catch (error) {
        return (<React.Fragment></React.Fragment>)
    }
}

function OtherContactContent({ _id, onLongPress, isPoppingup }) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { is_removed, content, myFri,checkMe } = useSelector(state => {
        const fullMessages = state.ChatStoredReducer.fullMessages;
        const myId = (state.AuthStoredReducer.myUserInfo||{})._id; 
        const myFriend = state.FriendStoredReducer.myFriends
        const myContacts = state.FriendStoredReducer.myContacts
        return {
            is_removed: fullMessages[_id].is_removed,
            content: fullMessages[_id].content.contact_id,
            checkMe: myId === fullMessages[_id].content.contact_id,
            myFri: myFriend[fullMessages[_id].content.contact_id] || myContacts[fullMessages[_id].content.contact_id]
        }
    }, (prev, next) => isEqual(prev, next));
    useEffect(() => {
        if (!myFri) {
            dispatch({
                type: FriendAction.API_DOWNLOAD_CONTACT,
                data: { ids: [content] }
            })
        }
    }, [myFri])
    let Name = ''
    let contact_id
    if (myFri) {
        Name = myFri.name
        contact_id = myFri._id
    }

    const { localAvatar, cloudAvatar } = useSelector(
        (state) => {
            const myFriends = state.FriendStoredReducer.myFriends;
            const myContacts = state.FriendStoredReducer.myContacts
            const avatarLibrary = state.ChatStoredReducer.imageAvatars;
            try {
                const Someone = myFriends[myFri._id] || myContacts[myFri._id];
                if (Someone) {
                    return {
                        localAvatar: avatarLibrary[Someone.avatar_url],
                        cloudAvatar: Someone.avatar_url,
                    };
                } else {
                    return true;
                }
            } catch (error) {
                return {};
            }
        },
        (prev, next) => isEqual(prev, next)
    );
    useEffect(() => {
        if (!localAvatar && cloudAvatar) {
            dispatch({
                type: Action.API_DOWNLOAD_AVATAR,
                data: {
                    url: cloudAvatar,
                },
                dispatch: dispatch,
            });
        }
    }, [localAvatar, cloudAvatar]);
    const showPopupUserInfo = () => {
        if(!checkMe){
            navigation.navigate('PopupUserInfo', { _id: content })
        }
        else
        {
            dispatch({
                type: ActionAuth.UPDATE_NOTIFICATION,
                data: "Không thể chọn chính bạn",
              });
        }
    }
    // const parsedContent = is_removed ? '' : _parseMentionContentIfExist(content.content, (_id) => { }, { color: '#fff' });
    return (
        <TouchableOpacity style={{
            // backgroundColor: '#fff',
            backgroundColor: '#eee',
            borderRadius: 15,
            paddingHorizontal: 20,
            minHeight: 90,
            marginRight: 5,
            minWidth: 200,
            justifyContent: 'center'
        }} delayPressIn={0}
            onPress={showPopupUserInfo}
            onLongPress={onLongPress}
            delayLongPress={100}
            activeOpacity={1}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {localAvatar ? (
                        <DispatchImage
                            style={{ width: 45, height: 45, borderRadius: 50 }}
                            source={localAvatar}
                            type={"avatar"}
                            data={{
                                cloudLink: cloudAvatar,
                            }}
                        />
                    ) : (
                        <Image
                            source={DefaultAvatar}
                            style={{
                                width: 45,
                                height: 45,
                                borderRadius: 60,
                            }}
                        />
                    )}
                </View>
                <View style={{ paddingLeft: 5, marginLeft: 10, }}>
                    <View style={{ maxWidth: WIDTH * 0.5 }}>

                        <Text numberOfLines={1} style={{
                            fontSize: 14,
                            paddingBottom: 3, fontWeight: '500',
                            color: 'black'
                        }} ellipsizeMode='tail'>
                            {Name}
                        </Text>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                            // marginBottom: 5,
                        }}>
                            <AntDesign
                                name='contacts'
                                style={{ fontSize: 22, color: 'black', fontWeight: '400' }}
                            />
                            <Text style={{ color: "black", paddingLeft: 5, fontWeight: '400' }}>Danh thiep</Text>

                        </View>
                    </View>
                </View>
            </View>
            <View style={{ alignItems: 'flex-start', marginTop: 8 }}>

                <InfoContent _id={_id} />
            </View>

        </TouchableOpacity>


    )
}

export default OtherContactContent