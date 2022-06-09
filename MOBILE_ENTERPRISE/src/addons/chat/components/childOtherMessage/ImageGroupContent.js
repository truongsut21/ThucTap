import React, { useRef, useEffect } from 'react';
import {
    TouchableOpacity, View, Text, FlatList, Image,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import isEqual from 'react-fast-compare';
import { hasNotch } from 'react-native-device-info';
import { getStatusBarHeight } from '../../../../config/utilities';
import { fromTemplateToPosition } from '../../static/MessageGroupTemplate';
import DispatchImage from '../DispatchImage';
import * as Action from '../../controllers/actionTypes';
import styles from './styles';
import { WIDTH, HEIGHT, calcImageDimension } from '../../controllers/utils';
import MessageReactionNew from '../Messages/MessageReactionNew';


const BrokenImage = require('../../static/imagerror.png');


const InfoContent = ({ _id }) => {
    const time = useSelector(state => {
        return state.ChatStoredReducer.fullMessages[_id].create_date;
    }, (prev, next) => prev === next)

    try {
        return (<View style={[styles.abd, {
            position: 'absolute',
            backgroundColor: 'rgba(52, 52, 52, 0.41)',
            left: 5,
            bottom: 0,
            borderRadius: 10,
            paddingHorizontal: 5,
        }]}>
            <Text style={[styles.abe, { fontSize: 11 }]}>
                {format(new Date(time), 'HH:mm', { locale: vi })}
            </Text>
        </View>)
    } catch (error) {
        return (<React.Fragment></React.Fragment>)
    }
}

const SingleImage = ({ isPin,...props }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const localImage = useSelector(state => {
        const listFiles = state.ChatStoredReducer.listFiles;
        try {
            return listFiles[`${props.content._id}_lowprofile`];
        } catch (error) {
            return ''
        }
    }, (prev, next) => isEqual(prev, next));
    const imageRef = useRef({});


    useEffect(() => {
        if (!localImage) {
            dispatch({
                type: Action.API_DOWNLOAD_IMAGE,
                data: {
                    content: props.content
                },
                dispatch: dispatch,
            })
        }
    }, [localImage]);

    const onPress = () => {
        let { content, message_id } = props
        try {
            if (!props.isPoppingup) {
                if (imageRef && imageRef.current) {
                    imageRef.current.measure((fx, fy, w, h, px, py) => {
                        let { width, height } = content.metadata;
                        const { imageWidth, imageHeight } = calcImageDimension({ width, height });
                        navigation.navigate('PopupImage', {
                            image_id: content._id,
                            message_id: message_id,
                            x: px,
                            y: py,
                            fromWidth: w,
                            fromHeight: h,
                            toWidth: imageWidth,
                            toHeight: imageHeight
                        })
                    })
                }
            }

        } catch (error) {
        }

    }
    try {
        const styleForImage = fromTemplateToPosition({
            messageCount: props.imageCount,
            position: props.position,
            isPin: isPin
        });
        return (<TouchableOpacity 
            style={{
                padding: 1,
                justifyContent: 'center',
                alignItems: 'center',
         
            }}
            onPress={onPress}
            delayPressIn={0}
            delayPressOut={0}
            onLongPress={props.onLongPress}
            delayLongPress={100}
            activeOpacity={1}
            ref={view => { imageRef.current = view; }}
        >
            <DispatchImage
                style={[{
                    height: (HEIGHT - (hasNotch() ? getStatusBarHeight() : 0)) / 6,
                }, styleForImage, { width: styleForImage.width - 2,  backgroundColor: '#ddd' }]}
                source={localImage}
                type={'image'}
                subType={'imagegroup'}
                data={{
                    fileContent: props.content,
                    send_state: true
                }}
            />
        </TouchableOpacity>);
    } catch (error) {
        return null;
    }
}

const MultiImage = ({ _id, onLongPress, isPoppingup, isPin }) => {
    const content = useSelector(state => {
        return state.ChatStoredReducer.fullMessages[_id].content;
    }, (prev, next) => isEqual(prev, next));

    const keyExtractor = (item) => item && item._id ? item._id.toString() : null;

    const renderItem = ({ item, index }) => {
        try {
            return (<SingleImage
                message_id={_id}
                content={{
                    ...item,
                }}
                isPoppingup={isPoppingup}
                position={index + 1}
                imageCount={content.length}
                onLongPress={onLongPress} 
                isPin = {isPin}
                />)
        } catch (error) {
            return null;
        }
    }
    try {
        return (<React.Fragment>
            <View style={{
                paddingTop: 20,
                width: WIDTH * 0.675,
                // backgroundColor: "red",
            }}>
                <FlatList
                    contentContainerStyle={isPoppingup ? {
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start",
                        //liem da rem lai fix sau 
                        flexWrap: 'wrap'
                    } : {}}     //avoid error for longpress popup
                    style={!isPoppingup ? {
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: "flex-start",
                        //liem da rem lai fix sau 
                        flexWrap: 'wrap'
                    } : {}}
                    keyboardShouldPersistTaps='always'
                    initialNumToRender={5}
                    data={content || []}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                />
                <InfoContent _id={_id} />
            </View>
            <MessageReactionNew
                isPoppingup={isPoppingup}
                mid={_id}
                check={false}
            />
        </React.Fragment>)
    } catch (error) {
        return (<View style={{
            height: parseInt((WIDTH * 3 / 5) * 345 / 820),
            width: parseInt(WIDTH * 3 / 5),
            borderRadius: 5,
            alignItems: 'flex-end',
        }}>
            <Image source={BrokenImage} style={{
                height: parseInt((WIDTH * 3 / 5) * 345 / 820),
                width: parseInt(WIDTH * 3 / 5),
                borderRadius: 7,
                backgroundColor: '#ddd'
            }} />
        </View>)
    }
}


export default React.memo(MultiImage, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})
