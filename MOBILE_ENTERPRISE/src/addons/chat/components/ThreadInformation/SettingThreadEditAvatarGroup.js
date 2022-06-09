import React, { useEffect, useState } from 'react';
import {
    Text, View, Image, TouchableOpacity, SafeAreaView, Switch, ScrollView,
    InteractionManager
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';
import config from '../../../../config/config.json';
// import CameraRoll from "@react-native-community/cameraroll";
import * as AuthAction from '../../../auth/controllers/actionTypes';
var RNFS = require('react-native-fs');

const SettingThreadEditAvatarGroup = () => {
    const dispatch = useDispatch();
    const activeThreadId = useSelector(state => state.ChatUnstoredReducer.activeThreadId);
    // const myUserInfoId = useSelector(state => state.AuthStoredReducer.myUserInfo._id);
    const token = useSelector(state => state.AuthStoredReducer.token);

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
                name: saveImage.filename || `${new Date().getTime()}`, // nếu không đổi avatar dc thì thêm -> || `${new Date().getTime()}`,
                type: saveImage.mime,
                uri: saveImage.path,
            }
            formData.append('thread_id', activeThreadId)
            formData.append('file', file)

            return axios({
                method: 'POST',
                url: config.file_server + '/tomchat/uploadThreadAvatar',
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
                dispatch({
                    type: AuthAction.UPDATE_NOTIFICATION,
                    data: "Đổi ảnh thành công!"

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
            <TouchableOpacity style={{
                paddingHorizontal: 10,
                height: 50,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
                marginLeft: 10


            }} delayPressIn={0} delayPressOut={0}
                onPress={uploadAvatar}
            >
                <MaterialCommunityIcons name='image-search' size={25} color='#00A48D'
                    style={{ fontWeight: 'bold' }} />
                <Text style={{
                    paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15
                }}>
                    Đổi ảnh nhóm
                </Text>
            </TouchableOpacity>


            {/* 
            <TouchableOpacity style={{
                paddingHorizontal: 10,
                height: 50,
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: '#fff',
                marginLeft: 10

            }} delayPressIn={0} delayPressOut={0}
                onPress={uploadAvatar11111}
            >
                <MaterialCommunityIcons name='image-search' size={25} color='#00A48D'
                    style={{ fontWeight: 'bold' }} />
                <Text style={{
                    paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15
                }}>
                    Đổi aaa
                </Text>
            </TouchableOpacity> */}
        </View>


    )
}

export default SettingThreadEditAvatarGroup
