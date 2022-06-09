import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import styles from './styles';
import isEqual from 'react-fast-compare';
import { sticker_server } from '../../../../config/config.json';
import useTheme from '../../../base/components/useTheme';
const BrokenSticker = require('../../static/stickererror.jpeg');


const InfoContent = ({ _id }) => {
    const theme = useTheme();
    const time = useSelector(state => {
        return state.ChatStoredReducer.fullMessages[_id].create_date;
    }, (prev, next) => prev === next)

    try {
        return (<View style={[styles.abd, {
            backgroundColor: 'rgba(52, 52, 52, 0.41)',
            left: 8,
            top: 135,
            borderRadius: 10 / 0.7,
            paddingHorizontal: 5 / 0.7,
        }]}>
            <Text style={[styles.abe, { fontSize: 11 / 0.7 }]}>
                {format(new Date(time), 'HH:mm', { locale: vi })}
            </Text>
        </View>)
    } catch (error) {
        return (<React.Fragment></React.Fragment>)
    }
}

const StickerContent = ({ _id, onLongPress, isPoppingup }) => {

    const content = useSelector(state => {
        const fullMessages = state.ChatStoredReducer.fullMessages;
        return fullMessages[_id].content;
    }, (prev, next) => isEqual(prev, next));

    try {
        return (
            <TouchableOpacity style={[styles.abg, {
            }]}
                delayPressIn={0}
                onLongPress={onLongPress}
                delayLongPress={100}
                activeOpacity={1}>
                <FastImage
                    style={styles.abh}
                    source={{
                        uri: `${sticker_server}/${content.stickerType}/${content.stickerPosition}.${content.shortMimetype}`
                    }}
                />
                <InfoContent _id={_id} />
            </TouchableOpacity>
        )
    } catch (error) {
        return (<View style={styles.abg}>
            <Image
                style={styles.abh}
                source={BrokenSticker}
            />
        </View>)
    }
}

export default React.memo(StickerContent, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})