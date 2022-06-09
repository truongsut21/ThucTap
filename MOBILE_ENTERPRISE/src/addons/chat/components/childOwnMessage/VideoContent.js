import React, { useEffect, useRef, useState, useContext } from 'react';
import {
    Text, View, TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import isEqual from 'react-fast-compare';
import { WIDTH } from '../../controllers/utils';
import * as Action from '../../controllers/actionTypes';

const SendingVideo = ({ _id, goodHeight, goodWidth, source }) => {

    const uploadProgress = useSelector(state => {
        const fileUpDownloadProgress = state.ChatUnstoredReducer.fileUpDownloadProgress;
        return fileUpDownloadProgress[_id] ? fileUpDownloadProgress[_id] : 0
    }, (prev, next) => prev === next);

    try {
        return (<React.Fragment>
            <Video source={{ uri: source }}   // Can be a URL or a local file.
                paused={true}
                fullscreen={false}
                style={{
                    width: goodWidth,
                    height: goodHeight,
                    borderRadius: 15,
                }} />
            {/* Hiển thị tiến độ upload video */}
            {
                uploadProgress < 2
                    ?
                    <View style={{
                        position: 'absolute',
                        flexDirection: 'row',
                        alignItems: 'center',
                        right: 5,
                        top: 6,
                        backgroundColor: 'rgba(52, 52, 52, 0.41)',
                        borderRadius: 10,
                        paddingVertical: 3,
                        paddingHorizontal: 5,
                    }}>
                        <AntDesign name="clouduploado" size={15} color="#fff" />
                        <Text style={{ fontSize: 12, color: '#fff', marginLeft: 5 }}>
                            {parseInt(uploadProgress * 100)} %
                        </Text>

                    </View>
                    :
                    null
            }
        </React.Fragment>)
    } catch (error) {
        return null;
    }
}

const SentVideo = ({
    fileContent, goodHeight, goodWidth, isPaused, isFullscreen,
    actionSetFullscreen, actionUnsetFullScreen, create_date
}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.AuthStoredReducer.token, (prev, next) => prev === next);
    const video = useSelector(state => {
        const Files = state.ChatStoredReducer.listFiles
        if (Files && Files[fileContent._id]) {
            return Files[fileContent._id].link;
        }
        return null
    }, (prev, next) => prev === next);
    const needToDownLoadVideo = useRef(!video).current;

    useEffect(() => {
        if (needToDownLoadVideo) {
            dispatch({
                type: Action.API_DOWNLOAD_VIDEO,
                message: {
                    fileContent: fileContent
                },
                dispatch: dispatch,
            })
        }
    }, [])

    try {
        return (<React.Fragment>
            {/* {
                videoSource ?
                    null
                    : */}
            <Video source={{
                uri: video ? video : `${fileContent.link}?${token}`
            }}   // Can be a URL or a local file.
                paused={isPaused}
                fullscreen={isFullscreen}
                onFullscreenPlayerWillPresent={actionSetFullscreen}
                onFullscreenPlayerWillDismiss={actionUnsetFullScreen}
                // onBuffer={onBuffer}                // Callback when remote video is buffering
                // onError={onError}               // Callback when video cannot be loaded
                style={{
                    width: goodWidth,
                    height: goodHeight,
                    borderRadius: 15,
                }} />
            {/* } */}

            {/* Nút play */}
            {
                isPaused && !isFullscreen
                    ?
                    <View style={{
                        position: 'absolute',
                        right: (goodWidth - 40) / 2,
                        bottom: (goodHeight - 50) / 2,
                    }}>
                        <AntDesign name="playcircleo" size={50} color="#fff" />
                    </View>
                    :
                    null
            }

            {/* Thòi gian và đã sent */}
            < View style={{
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
                        {format(new Date(create_date), 'HH:mm', { locale: vi })}
                    </Text>
                </View>
                <View style={{ width: 14, height: 14 }}>
                    <MaterialCommunityIcons size={14} name='check' color='#fff' />
                </View>
            </View>
        </React.Fragment>)
    } catch (error) {
        return null;
    }
}

function VideoContent({ ...props }) {

    const [isPaused, setPause] = useState(true);
    const [isFullscreen, setFullscreen] = useState(false);

    const onPressVideo = (e) => {
        if (props.message && props.message.send_state) {
            setPause(false)
            setFullscreen(true);
        }
    }

    const actionSetFullscreen = (e) => {
        if (!isFullscreen) {
            setPause(false);
            setFullscreen(true);
        }
    }

    const actionUnsetFullScreen = (e) => {
        if (isFullscreen) {
            setPause(true);
            setFullscreen(false);
        }
    }

    const onBuffer = () => {

    }

    const onError = () => {

    }

    try {
        const fileContent = props.message.fileContent;
        const { metadata } = fileContent;
        const { width, height } = metadata;
        let goodHeight, goodWidth;
        if (height > width) {
            goodHeight = parseInt(WIDTH * 3 / 4);
            goodWidth = parseInt(goodHeight * width / height);
        } else if (height < width) {
            goodWidth = parseInt(WIDTH * 3 / 4);
            goodHeight = parseInt(goodWidth * height / width);
        } else {
            goodHeight = goodWidth = parseInt(WIDTH * 3 / 4);
        }
        return (<TouchableOpacity style={{
            height: goodHeight,
            width: goodWidth,
            borderRadius: 15,
            alignItems: 'flex-end',
            marginHorizontal: 5,
            backgroundColor: '#ddd'
        }} delayPressIn={0} delayPressOut={0}
            onPress={onPressVideo}
            onLongPress={props.onLongPress} activeOpacity={1}>
            {
                props.message.send_state
                    ?
                    <SentVideo
                        fileContent={fileContent}
                        goodHeight={goodHeight}
                        goodWidth={goodWidth}
                        isPaused={isPaused}
                        isFullscreen={isFullscreen}
                        actionSetFullscreen={actionSetFullscreen}
                        actionUnsetFullScreen={actionUnsetFullScreen}
                        create_date={props.message.create_date}
                    />
                    :
                    <SendingVideo
                        _id={props.message._id}
                        source={fileContent.uri}
                        goodHeight={goodHeight}
                        goodWidth={goodWidth} />
            }
        </TouchableOpacity >)
    } catch (error) {
        return null;
    }
}

export default React.memo(VideoContent, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})