import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, View, Image, Text, Animated, Easing } from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import isEqual from 'react-fast-compare';
import ReactionSummary from './ReactionSummary';
import * as Action from '../../controllers/actionTypes';
import { WIDTH } from '../../controllers/utils';
import DispatchImage from '../DispatchImage';
import DefaultAvatar from "../../static/default_ava.png";
import { useNavigation } from '@react-navigation/native';
import * as FriendAction from '../../../friend/controllers/actionType'


const InfoContent = ({ _id, isPin }) => {
    const time = useSelector(state => {
        return state.ChatStoredReducer.fullMessages[_id].create_date;
    }, (prev, next) => prev === next);

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
                    color: '#fff'
                }}>
                    {format(new Date(time), 'HH:mm', { locale: vi })}
                </Text>


                <MaterialCommunityIcons size={14} name='check-circle-outline' color='#fff' />
            </React.Fragment>
        </View>)
    } catch (error) {
        return (<React.Fragment></React.Fragment>)
    }
}

function OwnContactContent({ _id, onLongPress, isPoppingup, isPin }) {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { is_removed, content, myFri } = useSelector(state => {
        const fullMessages = state.ChatStoredReducer.fullMessages;
        const myFriend = state.FriendStoredReducer.myFriends;
        const myContacts = state.FriendStoredReducer.myContacts
        return {
            is_removed: fullMessages[_id].is_removed,
            content: fullMessages[_id].content.contact_id,
            myFri: myFriend[fullMessages[_id].content.contact_id] || myContacts[fullMessages[_id].content.contact_id]
        }
    }, (prev, next) => isEqual(prev, next));
    const { localAvatar, cloudAvatar } = useSelector(
        (state) => {
            const myFriends = state.FriendStoredReducer.myFriends;
            const avatarLibrary = state.ChatStoredReducer.imageAvatars;
            try {
                const Someone = myFriends[myFri._id];
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
    useEffect(() => {
        if (!myFri) {
            dispatch({
                type: FriendAction.API_DOWNLOAD_CONTACT,
                data: { ids: [content] }
            })
        }
    }, [myFri]);

    
    const showPopupUserInfo = () => {
        navigation.navigate('PopupUserInfo', { _id: content })
    }

    // const parsedContent = is_removed ? '' : _parseMentionContentIfExist(content.content, (_id) => { }, { color: '#fff' });
    return (
        <TouchableOpacity style={{
            backgroundColor: '#00A48D',
            borderRadius: 15,
            // paddingTop: 12,
            // paddingBottom: 3,
            marginVertical: isPin ? 10 :0,
            paddingHorizontal: 20,
            minHeight: 90,
            marginRight: 5,
            minWidth: 200,
            justifyContent: 'center'
            // backgroundColor: 'red'
        }} delayPressIn={0}
            onPress={showPopupUserInfo}
            onLongPress={onLongPress}
            delayLongPress={100}
            activeOpacity={1}>
            <View style={{ flexDirection: 'row', justifyContent: isPin ? 'flex-start' :'flex-end' }}>
                <View style={{
                    width: 45,
                    height: 45,
                    borderRadius: 50,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginRight: 2
                }}>
                    {localAvatar ? (
                        <DispatchImage
                            style={{ width: 45, height: 45, borderRadius: 50, }}
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
                                borderRadius: 50,
                            }}
                        />
                    )}
                </View>
                <View style={{ paddingLeft: 5, marginLeft: 10, }}>
                    <View style={{ maxWidth: WIDTH * 0.5, }}>

                        <Text numberOfLines={1} style={{
                            fontSize: 14,
                            paddingBottom: 3, fontWeight: '500',
                            color: '#fff',
                            // marginLeft: 12
                        }} ellipsizeMode='tail'>
                            {myFri.name }
                        </Text>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                            // marginBottom: 5,
                        }}>
                            <AntDesign
                                name='contacts'
                                style={{ fontSize: 22, color: 'white' }}
                            />
                            <Text style={{ color: "white", paddingLeft: 5, fontWeight: '400' }}>Danh thiếp</Text>
                        </View>
                    </View>
                </View>
            </View>
            {isPin?null:<InfoContent _id={_id} />}
            {/* {
                !this.props.isPoppingup && this.props.reactSummary && this.props.reactSummary.count > 0
                    ?
                    <View
                        style={{
                            position: 'absolute',
                            paddingHorizontal: 5,
                            marginRight: 7,
                            bottom: -12,
                            left: 0
                        }}>
                        <ReactionSummary
                            navigation={this.props.navigation}
                            reactSummary={{ ...this.props.reactSummary, message_id: this.props.message._id }}
                        />
                    </View>
                    :
                    null
            } */}
        </TouchableOpacity>


    )
}

export default OwnContactContent