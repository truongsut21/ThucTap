import React, { useEffect, useState, useRef } from 'react';
import {
    Text, View, TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import { useSelector, useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import isEqual from 'react-fast-compare';
import { WIDTH } from '../../controllers/utils';
import * as Action from '../../controllers/actionTypes';
import styles from './styles'

const ReceivedVideo = ({
    fileContent, goodHeight, goodWidth, isPaused, isFullscreen,
    actionSetFullscreen, actionUnsetFullScreen, create_date
}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => {
        return state.AuthStoredReducer.token;
    }, (prev, next) => prev === next);
    const video = useSelector(state => {
        const Files = state.ChatStoredReducer.listFiles
        if (Files && Files[fileContent._id]) {
            return Files[fileContent._id].link;
        }
        return null
    }, (prev, next) => prev === next);
    const needToDownLoadVideo = useRef(!video).current;
    const downloadProgress = useSelector(state => {
        const fileUpDownloadProgress = state.ChatUnstoredReducer.fileUpDownloadProgress;
        return fileUpDownloadProgress[fileContent._id] ? fileUpDownloadProgress[fileContent._id] : 0
    }, (prev, next) => prev === next);

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
        // if (!video) return null;
        return (<React.Fragment>
            <Video source={{ uri: video ? video : `${fileContent.link}?token=${token}` }}   // Can be a URL or a local file.
                paused={isPaused}
                fullscreen={isFullscreen}
                onFullscreenPlayerWillPresent={actionSetFullscreen}
                onFullscreenPlayerWillDismiss={actionUnsetFullScreen}
                style={{
                    width: goodWidth,
                    height: goodHeight,
                    borderRadius: 15,
                }} />

            {/* Hiển thị tiến độ tải video */}
            {
                !video && downloadProgress < 2
                    ?
                    <View style={[styles.abd, {
                        position: 'absolute',
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: 'rgba(52, 52, 52, 0.41)',
                        left: 7,
                        top: 7,
                        borderRadius: 10,
                        paddingHorizontal: 5,
                    }]}>
                        <AntDesign name="clouddownloado" size={15} color="#fff" />
                        <Text style={[styles.abe, { fontSize: 12, marginLeft: 5 }]}>
                            {parseInt(downloadProgress * 100)} %
                        </Text>
                    </View>
                    :
                    null
            }

            {/* Nút play */}
            {
                isPaused && !isFullscreen && video
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


        </React.Fragment>)
    } catch (error) {
        return null;
    }
}

function VideoContent({ ...props }) {

    const [isPaused, setPause] = useState(true);
    const [isFullscreen, setFullscreen] = useState(false);

    const onPressVideo = (e) => {
        setPause(false)
        setFullscreen(true);
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

        return (<TouchableOpacity
            style={[styles.aba, {
                height: goodHeight,
                width: goodWidth,
                backgroundColor: '#ddd',
                borderRadius: 15
            }]}
            delayPressIn={0} onPress={onPressVideo}
            delayPressOut={0} onLongPress={props.onLongPress} activeOpacity={1}>

            <ReceivedVideo
                fileContent={fileContent}
                goodHeight={goodHeight}
                goodWidth={goodWidth}
                isPaused={isPaused}
                isFullscreen={isFullscreen}
                actionSetFullscreen={actionSetFullscreen}
                actionUnsetFullScreen={actionUnsetFullScreen}
                create_date={props.message.create_date}
            />
            {/* Thời gian */}
            <View style={[styles.abd, {
                position: 'absolute',
                backgroundColor: 'rgba(52, 52, 52, 0.41)',
                left: 5,
                bottom: 0,
                borderRadius: 10,
                paddingHorizontal: 5,
            }]}>
                <Text style={[styles.abe, { fontSize: 11 }]}>
                    {format(new Date(props.message.create_date), 'HH:mm', { locale: vi })}
                </Text>
            </View>

            {
                !props.isPoppingup && props.reactSummary
                    ?
                    (
                        <View style={{
                            position: 'absolute',
                            paddingHorizontal: 5,
                            flexDirection: 'row-reverse',
                            bottom: -10,
                        }}>
                            <ReactionSummary
                                navigation={props.navigation}
                                reactSummary={{
                                    ...props.reactSummary,
                                    message_id: props.message._id
                                }}
                            />
                        </View>
                    )
                    :
                    null
            }
        </TouchableOpacity>)
    } catch (error) {
        return null;
    }
}

export default React.memo(VideoContent, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})