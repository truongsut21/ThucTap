import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    TouchableOpacity, View, Text, FlatList, Dimensions, Image,
    InteractionManager
} from 'react-native';
// import Animated from 'react-native-reanimated';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBar from 'react-native-progress/Bar';
import isEqual from 'react-fast-compare';
import { hasNotch } from 'react-native-device-info';
import { getStatusBarHeight } from '../../../../config/utilities';
import { fromTemplateToPosition } from '../../static/MessageGroupTemplate';
import DispatchImage from '../DispatchImage';
import * as Action from '../../controllers/actionTypes';
import MessageReactionNew from '../Messages/MessageReactionNew';
import MessageStateIcon from './MessageStateIcon';
import { WIDTH, HEIGHT, calcImageDimension } from '../../controllers/utils';
const BrokenImage = require('../../static/imagerror.png');


const InfoContent = ({ _id, }) => {
    const { draft_id, time } = useSelector(state => {
        return {
            draft_id: state.ChatStoredReducer.fullMessages[_id].draft_id,
            time: state.ChatStoredReducer.fullMessages[_id].create_date,
        };
    }, (prev, next) => isEqual(prev, next));


    try {
        if (_id === draft_id) return null;
        return (<View style={{
            position: 'absolute',
            alignItems: 'flex-end',
            flexDirection: 'row',
            right: 6,
            bottom: 0,
            backgroundColor: 'rgba(52, 52, 52, 0.41)',
            borderRadius: 10,
            paddingVertical: 3,
            paddingHorizontal: 5,
        }}>
            <View style={{ paddingRight: 3 }}>
                <Text style={{ fontSize: 11, color: '#fff' }}>
                    {format(new Date(time), 'HH:mm', { locale: vi })}
                </Text>
            </View>

            {/* <View style={{ width: 14, height: 14 }}>
                <MaterialCommunityIcons size={14} name='check' color='#fff' />
            </View> */}
            <MessageStateIcon isDraft={_id === draft_id}/>
        </View>)
    } catch (error) {
        return (<React.Fragment></React.Fragment>)
    }
}

const SingleImage = ({ message_id, draft_message_id, content_index, isPoppingup, position, imageCount, onLongPress, isPin }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const content = useSelector(state => {
        const fullMessages = state.ChatStoredReducer.fullMessages;
        try {
            return fullMessages[message_id].content[content_index];
        } catch (error) {
            return {}
        }
    }, (prev, next) => isEqual(prev, next));
    const localImage = useSelector(state => {
        try {
            const listFiles = state.ChatStoredReducer.listFiles;
            return listFiles[`${content._id}_lowprofile`];
        } catch (error) {
            return ''
        }
    }, (prev, next) => isEqual(prev, next));
    const uploadProgress = useSelector(state => {
        const fileUpDownloadProgress = state.ChatUnstoredReducer.fileUpDownloadProgress;
        return fileUpDownloadProgress[content._id] || 0;
    }, (prev, next) => next > prev); // phải dùng next > prev vì khi up thành công 1 image _id sẽ thay đổi
    const [styleImage, setStyleImage] = useState({ width: 0 });
    const [goodHeight, setGoodHeight] = useState(0);
    const imageRef = useRef({});

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            let res = computeWidthHeight(imageCount, position);
            setStyleImage(res.styleForImage);
            setGoodHeight(res.goodHeight)
        })
    }, []);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            if (!localImage && draft_message_id !== message_id) {
                dispatch({
                    type: Action.API_DOWNLOAD_IMAGE,
                    data: {
                        content: content,
                    },
                    dispatch: dispatch,
                })
            }
        })

    }, [localImage]);

    useEffect(() => {
        let res = computeWidthHeight(imageCount, position);
        setStyleImage(res.styleForImage);
        setGoodHeight(res.goodHeight)
    }, [imageCount, position]);


    const computeWidthHeight = (count, position) => {
        let styleForImage = fromTemplateToPosition({
            messageCount: count,
            position: position,
            isPin: isPin
        });
        let goodHeight = parseInt((HEIGHT - (hasNotch() ? getStatusBarHeight() : 0)) / 6);
        return { styleForImage, goodHeight };
    }

    const onPress = () => {
        try {
            if (!isPoppingup) {
                if (message_id !== draft_message_id && imageRef && imageRef.current) {
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
            if(isPin && isPoppingup){
                if (message_id !== draft_message_id && imageRef && imageRef.current) {
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

    return (
        <TouchableOpacity style={[{
           padding: 1,
        }]}
            onPress={onPress}
            delayPressIn={0}
            delayPressOut={0}
            onLongPress={onLongPress}
            delayLongPress={100}
            activeOpacity={1}
            ref={view => { imageRef.current = view; }}
        >

            <DispatchImage
                style={[{
                    height: isPin ? 50:goodHeight,
                }, styleImage,
                { width: isPin ? 50:styleImage.width - 4, backgroundColor: '#ddd' },
                ]}
                source={localImage}
                type={'image'}
                subType={'imagegroup'}
                data={{
                    fileContent: content,
                }}
            />
            {
                message_id === draft_message_id
                    ?
                    <View style={{ position: 'absolute', bottom: 0 }}>
                        <ProgressBar
                            useNativeDriver={true}
                            progress={uploadProgress}
                            width={styleImage.width - 2}
                            height={5}
                            color={'#00A48D'}
                            unfilledColor={'#fff'}
                            borderColor={"#fff"}
                        />
                    </View>
                    :
                    null
            }
        </TouchableOpacity>
    );

}


const MultiImage = ({ _id, onLongPress, isPoppingup, isPin }) => {

    const { draft_message_id, content } = useSelector(state => {
        try {
            return {
                draft_message_id: state.ChatStoredReducer.fullMessages[_id].draft_id,
                content: state.ChatStoredReducer.fullMessages[_id].content.map((f, i) => i)
            }
        } catch (error) {
            return {};
        }
    }, (prev, next) => isEqual(prev, next));

    const keyExtractor = (item) => item;

    const renderItem = ({ item, index }) => {
        try {
            return (<SingleImage
                message_id={_id}
                draft_message_id={draft_message_id}
                content_index={item}
                position={index + 1}
                isPoppingup={isPoppingup}
                imageCount={content.length}
                onLongPress={onLongPress}
                isPin={isPin}
            />)
        } catch (error) {

            return null;
        }
    }

    try {
        return (<React.Fragment>
            <View style={{
                marginRight: 5,
                paddingTop: isPin ?0: 20,
                marginVertical: isPin ?10: 0,
                width: isPin ?null :WIDTH * 0.675,
                // backgroundColor:"red",
            }}>
                <FlatList
                    contentContainerStyle={isPoppingup ? {
                        flexDirection: 'row',
                        justifyContent: isPin?'flex-start': 'flex-end',
                        alignItems: "flex-end",
                        flexWrap: isPin ?null :'wrap',
                    } : {}} //avoid error for longpress popup
                    style={!isPoppingup ? {
                        flexDirection: 'row',
                        justifyContent: isPin?'flex-start': 'flex-end',
                        alignItems: "flex-end",
                        flexWrap: isPin ?null :'wrap',
                    } : {}}
                    keyboardShouldPersistTaps='always'
                    initialNumToRender={5}
                    numColumns={isPin ?5 :null}
                    data={content || []}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                />
                {isPin ? null: <InfoContent _id={_id} />}
            </View>
            {isPin ? null : <MessageReactionNew
                isPoppingup={isPoppingup}
                mid={_id}
                check={true}
            />}
        </React.Fragment>)
    } catch (error) {
        return (<View style={{
            height:isPin ?50: parseInt((WIDTH * 3 / 5) * 345 / 820),
            width: isPin ?50:parseInt(WIDTH * 3 / 5),
            borderRadius: 5,
            alignItems: 'flex-end',
            paddingHorizontal: 5,
        }} >
            <Image source={BrokenImage} style={{
                height:isPin ?50: parseInt((WIDTH * 3 / 5) * 345 / 820),
                width: isPin ?50:parseInt(WIDTH * 3 / 5),
                borderRadius: 7,
                backgroundColor: '#ddd'
            }} />
        </View>)
    }
}

export default React.memo(MultiImage, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})
