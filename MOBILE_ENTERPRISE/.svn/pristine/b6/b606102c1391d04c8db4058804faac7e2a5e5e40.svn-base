import React, { useEffect } from 'react';
import {
    Text, View, TouchableOpacity, TextInput, Image,
    Platform
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImageCropPicker from 'react-native-image-crop-picker';
import { config } from '../../../config';
import axios from 'axios';
import isEqual from 'react-fast-compare';
import DispatchImage from '../../chat/components/DispatchImage';
import DefaultAvatar from '../../chat/static/default_ava.png';
import * as ActionChat from '../../chat/controllers/actionTypes';
import * as ActionAuth from '../../auth/controllers/actionTypes';

var RNFS = require('react-native-fs');

const EditAvatar = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.AuthStoredReducer.token);

    let { localAvatar, cloudAvatar, myUserInfo
    } = useSelector(state => {
        const myUserInfo = state.AuthStoredReducer.myUserInfo
        const imageAvatars = state.ChatStoredReducer.imageAvatars
        if (!myUserInfo) return {}
        let localAvatar = imageAvatars[myUserInfo.avatar_url];
        let cloudAvatar = myUserInfo.avatar_url;
        return {
            localAvatar,
            cloudAvatar,
            myUserInfo

        }
    }, (prev, next) => isEqual(prev, next));
    useEffect(() => {
        if (!localAvatar && cloudAvatar) {
            dispatch({
                type: ActionChat.API_DOWNLOAD_AVATAR,
                data: {
                    url: cloudAvatar,
                },
                dispatch: dispatch
            })
        }
    }, [, cloudAvatar]);

    const _uploadAvatar = () => {
        let saveImage = '';
        ImageCropPicker.openPicker({
            cropping: true,
        }).then(image => {
            saveImage = image;
            return RNFS.exists(`${RNFS.DocumentDirectoryPath}/avatars`)
        }).then(exist => {
            if (!exist) {
                return RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/avatars`);
            }
        }).then(res => {
            let formData = new FormData();
            let file = {
                name: saveImage.filename || `${new Date().getTime()}`,
                type: saveImage.mime,
                // uri: saveImage.path,
                uri: Platform.OS !== 'android' ? saveImage.path.replace('file://', '') : saveImage.path,
            }
            // formData.append('thread_id', activeThreadId)

            formData.append('file', file)
            return axios({
                method: 'POST',
                url: config.file_server + '/tomuser/uploadUserAvatar',
                headers: {
                    Authorization: 'Tomaho ' + token,
                },
                data: formData,
            })
        }).then(res => {

            const data = res.data;
            if (!data) {
            } else if (data.statusCode) {
            } else if (data.statusCode === 0) {
                let myUser = { ...myUserInfo }
                let url = data.data.link_url
                dispatch({
                    type: ActionAuth.UPDATE_USER_INFO_SUCCSESS,
                    data: {
                        ...myUser,
                        avatar_url: url
                    }
                })
                dispatch({
                    type: ActionAuth.UPDATE_NOTIFICATION,
                    data: "Cập nhật ảnh thành công"
                })
            } else {

            }
        }).catch(error => {
            // if (error.statusText) {
            // }
        })
    }

    const uploadAvatar = () => {
        _uploadAvatar()
    }

    return (
        <View>
            <TouchableOpacity activeOpacity={1} delayPressIn={0} delayPressOut={0}
                onPress={uploadAvatar}
                style={{
                }}
                disabled={false}>
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
                            source={DefaultAvatar}
                            style={{
                                width: 110, height: 110, borderRadius: 60
                            }
                            } />
                }
                {/* } */}
            </TouchableOpacity>
        </View>
    )
}

export default EditAvatar
