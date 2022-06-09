import React, { useContext } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import isEqual from 'react-fast-compare';
import { sticker_server } from '../../../../config/config.json';
import MessageStateIcon from './MessageStateIcon';
const BrokenSticker = require('../../static/stickererror.jpeg');

const InfoContent = ({ _id }) => {
    const time = useSelector(state => {
        return state.ChatStoredReducer.fullMessages[_id].create_date;
    }, (prev, next) => prev === next)
    const draft_id = useSelector(state => {
        return state.ChatStoredReducer.fullMessages[_id].draft_id;
    }, (prev, next) => prev === next)

    try {
        return (
            <View style={{
                position: 'absolute',
                flexDirection: 'row',
                right: 7,
                bottom: 0,
                backgroundColor: 'rgba(52, 52, 52, 0.41)',
                borderRadius: 10 / 0.7,
                paddingVertical: 3 / 0.7,
                paddingHorizontal: 5 / 0.7,
            }}>
                <View style={{ paddingRight: 3 / 0.7 }}>
                    <Text style={{ fontSize: 11 / 0.7, color: '#fff', }}>
                        {format(new Date(time), 'HH:mm', { locale: vi })}
                    </Text>
                </View>


                <View style={{ width: 14 / 0.7, height: 14 / 0.7 }}>
                    <MessageStateIcon isDraft={_id === draft_id} scaleUp={1 / 0.7} />
                    {/* {
                        _id === draft_id
                            ?
                            <MaterialCommunityIcons size={14 / 0.7} name='checkbox-blank-circle-outline' color='#fff' />
                            :
                            <MaterialCommunityIcons size={14 / 0.7} name='check' color='#fff' />
                    } */}
                </View>
            </View>
        )
    } catch (error) {
        return (<React.Fragment></React.Fragment>)
    }
}

const StickerContent = ({ _id, onLongPress, isPoppingup, isPin }) => {
    const content = useSelector(state => {
        const fullMessages = state.ChatStoredReducer.fullMessages;
        return fullMessages[_id] ? fullMessages[_id].content : {};
    }, (prev, next) => isEqual(prev, next));

    try {
        return (
            <TouchableOpacity style={{
                width: isPin ? 50 : 160,
                height: isPin ? 50: 160,
                transform: [{ scale: 0.7 }],
                marginTop: isPin ? 0 :-19,
                marginRight: isPin ? 0 :-18,
                marginBottom: isPin ? 0 :-24,
            }}
                delayPressOut={0}
                delayPressIn={0}
                onLongPress={onLongPress}
                delayLongPress={100}
                activeOpacity={1}>
                <FastImage
                    style={{
                        width: isPin ? 50 :160,
                        height: isPin ? 50 :160,
                    }}
                    source={{
                        uri: `${sticker_server}/${content.stickerType}/${content.stickerPosition}.${content.shortMimetype}`
                    }}
                />
                {isPin ? null : <InfoContent _id={_id} />}
            </TouchableOpacity>
        )
    }
    catch (error) {
        return (<View style={{
            width: 160,
            height: 160,
            transform: [{ scale: 0.7 }],
            marginTop: isPin ? 0 :-19,
            marginRight: isPin ? 0 :-18,
            marginBottom: isPin ? 0 :-24,
        }}>
            <Image
                style={{
                    width: isPin ? 50 :160,
                    height: isPin ? 50 :160,
                }}
                source={BrokenSticker}
            />
        </View>)
    }
}

export default React.memo(StickerContent, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})