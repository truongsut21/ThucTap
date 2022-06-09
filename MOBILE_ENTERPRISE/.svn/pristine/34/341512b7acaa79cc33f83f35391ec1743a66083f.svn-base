import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import styles from './styles'
import * as Action from '../../controllers/actionTypes';
import DispatchImage from '../DispatchImage';
import { WIDTH, HEIGHT, _computeDimensionForImageMessage, calcImageDimension } from '../../controllers/utils';
// import { isEqual } from 'lodash';
import isEqual from 'react-fast-compare';
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
            bottom: 3,
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

const ImageContent = ({ _id, onLongPress, isPoppingup }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { localImage, content } = useSelector(state => {
        const fullMessage = state.ChatStoredReducer.fullMessages;
        const listFiles = state.ChatStoredReducer.listFiles;
        let Message = fullMessage[_id];
        try {
            return {
                localImage: listFiles[`${Message.content._id}_lowprofile`],
                content: Message.content
            }
        } catch (error) {
            return {}
        }
    }, (prev, next) => isEqual(prev, next));
    const imageRef = useRef({});


    useEffect(() => {
        if (!localImage) {
            dispatch({
                type: Action.API_DOWNLOAD_IMAGE,
                data: {
                    content: content
                },
                dispatch: dispatch,
            })
        }
    }, [localImage]);

    const onPress = () => {
        try {
            if (imageRef && imageRef.current) {
                imageRef.current.measure((fx, fy, w, h, px, py) => {
                    let { width, height } = content.metadata;
                    const { imageWidth, imageHeight } = calcImageDimension({ width, height });
                    navigation.navigate('PopupImage', {
                        image_id: content._id,
                        message_id: _id,
                        x: px,
                        y: py,
                        fromWidth: w,
                        fromHeight: h,
                        toWidth: imageWidth,
                        toHeight: imageHeight
                    })
                })

            }
        } catch (error) {

        }
    }

    try {
        let { height, width } = content.metadata || {};
        const { imageWidth, imageHeight } = _computeDimensionForImageMessage({ width, height });
        return (
            <TouchableOpacity
                style={[styles.aba, {
                    // height: imageHeight,
                    // width: imageWidth,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#ddd',
                }]}
                delayPressIn={0}
                onPress={onPress}
                delayPressOut={0}
                onLongPress={onLongPress}
                delayLongPress={100}
                activeOpacity={1}
                ref={view => { imageRef.current = view; }}>

                <DispatchImage
                    style={[styles.abb, {
                        height: imageHeight,
                        width: imageWidth,  
                        //backgroundColor: '#ddd'
                    }]}
                    source={localImage}
                    type={'image'}
                    data={{
                        fileContent: content,
                        send_state: true
                    }}
                />

                <InfoContent _id={_id} />
                <MessageReactionNew
                    isPoppingup={isPoppingup}
                    mid={_id}
                    check={false}
                />
            </TouchableOpacity>
        )
    } catch (error) {
        return (<TouchableOpacity style={{
            height: parseInt((WIDTH * 3 / 5) * 345 / 820),
            width: parseInt(WIDTH * 3 / 5),
            borderRadius: 5,
            alignItems: 'flex-end',
        }} delayPressIn={0} delayPressOut={0}
            onLongPress={onLongPress} activeOpacity={1}>
            <Image source={BrokenImage} style={{
                height: parseInt((WIDTH * 3 / 5) * 345 / 820),
                width: parseInt(WIDTH * 3 / 5),
                borderRadius: 7,
                backgroundColor: '#ddd'
            }} />
        </TouchableOpacity>)
    }
}

export default React.memo(ImageContent, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})

// class ImageContent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         }
//         this.doViewImage = [];
//     }

//     shouldComponentUpdate(nextProps, nextState) {
//         return !isEqual(nextProps, this.props)
//     }

//     componentDidMount() {
//         if (this.props.needToDownloadImageOfMessage) {
//             this.props.dispatch({
//                 type: Action.API_DOWNLOAD_IMAGE,
//                 message: this.props.message,
//                 dispatch: this.props.dispatch,
//             })
//         }

//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (this.props.needToDownloadImageOfMessage && !prevProps.needToDownloadImageOfMessage) {
//             this.props.dispatch({
//                 type: Action.API_DOWNLOAD_IMAGE,
//                 message: this.props.message,
//                 dispatch: this.props.dispatch,
//             })
//         }
//     }

//     onPress = () => {
//         if (!this.props.isPoppingup) {
//             this.props.navigation.navigate('PopupImage', {
//                 message_id: this.props.message._id,
//                 image_id: this.props.message.fileContent._id
//             })
//         }
//     }

//     render() {
//         try {
//             let fileContent = this.props.message.fileContent;
//             let { height, width } = fileContent.metadata ? fileContent.metadata : fileContent.meta;
//             let goodHeight, goodWidth;
//             if (height > width) {
//                 goodHeight = parseInt(WIDTH * 3 / 4);
//                 goodWidth = parseInt(goodHeight * width / height);
//             } else if (height < width) {
//                 goodWidth = parseInt(WIDTH * 3 / 4);
//                 goodHeight = parseInt(goodWidth * height / width);
//             } else {
//                 goodHeight = goodWidth = parseInt(WIDTH * 3 / 4);
//             }
//             return (
//                 <TouchableOpacity
//                     style={[styles.aba, {
//                         height: goodHeight,
//                         width: goodWidth,
//                     }]}
//                     delayPressIn={0} onPress={this.onPress}
//                     delayPressOut={0} onLongPress={this.props.onLongPress} activeOpacity={1}>

//                     <DispatchImage
//                         style={[styles.abb, {
//                             height: goodHeight,
//                             width: goodWidth,
//                             backgroundColor: '#ddd'
//                         }]}
//                         source={this.props.image}
//                         type={'image'}
//                         data={{
//                             fileContent: fileContent,
//                             send_state: true
//                         }}
//                     />

//                     <InfoContent create_date={this.props.message.create_date} />
//                     {
//                         !this.props.isPoppingup && this.props.reactSummary
//                             ?
//                             (
//                                 <View style={{
//                                     flexDirection: 'row-reverse',
//                                     bottom: 20,
//                                 }}>
//                                     <ReactionSummary
//                                         navigation={this.props.navigation}
//                                         reactSummary={{
//                                             ...this.props.reactSummary,
//                                             message_id: this.props.message._id
//                                         }}
//                                     />
//                                 </View>
//                             )
//                             :
//                             null
//                     }
//                 </TouchableOpacity>
//             )
//         } catch (error) {
//             return (<TouchableOpacity style={{
//                 height: parseInt((WIDTH * 3 / 5) * 345 / 820),
//                 width: parseInt(WIDTH * 3 / 5),
//                 borderRadius: 5,
//                 alignItems: 'flex-end',
//             }} delayPressIn={0} delayPressOut={0}
//                 onLongPress={this.props.onLongPress} activeOpacity={1}>
//                 <Image source={BrokenImage} style={{
//                     height: parseInt((WIDTH * 3 / 5) * 345 / 820),
//                     width: parseInt(WIDTH * 3 / 5),
//                     borderRadius: 7,
//                     backgroundColor: '#ddd'
//                 }} />
//             </TouchableOpacity>)
//         }
//     }
// }

// function mapStateToProps(state, props) {
//     let needToDownloadImageOfMessage;
//     let fileContent = props.message.fileContent;
//     let listFiles = state.ChatStoredReducer.listFiles;
//     if (fileContent && fileContent._id) {
//         if (!listFiles[`${fileContent._id}_lowprofile`] ||
//             !listFiles[`${fileContent._id}_lowprofile`].link) {
//             needToDownloadImageOfMessage = true;
//         }
//     }
//     return {
//         image: fileContent && fileContent._id && listFiles[`${fileContent._id}_lowprofile`] &&
//             listFiles[`${fileContent._id}_lowprofile`].link
//             ?
//             listFiles[`${fileContent._id}_lowprofile`].link
//             :
//             false
//         ,
//         needToDownloadImageOfMessage: needToDownloadImageOfMessage
//     }
// }
// export default connect(mapStateToProps)(ImageContent);