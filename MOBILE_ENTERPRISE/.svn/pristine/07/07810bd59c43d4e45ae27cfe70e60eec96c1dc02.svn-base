import React, { useEffect } from 'react';
import {
    Text, View, TouchableOpacity, TextInput, Image, SafeAreaView,
    Platform
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';
import isEqual from 'react-fast-compare';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { config } from '../../../config';

import DispatchImage from '../../chat/components/DispatchImage';
import DefaultAvatar from '../../chat/static/default_ava.png';
import * as ActionChat from '../../chat/controllers/actionTypes';
import * as ActionAuth from '../../auth/controllers/actionTypes';
import { useNavigation } from '@react-navigation/core';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
var RNFS = require('react-native-fs');

const SendError = () => {
    const navigation = useNavigation();
    const [desc, setDesc] = useState("");
    const [preview, SetPreView] = useState("");
    const [file, setFile] = useState();


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
            // let formData = new FormData();
            let file = {
                name: saveImage.filename || `${new Date().getTime()}`,
                type: saveImage.mime,
                // uri: saveImage.path,
                uri: Platform.OS !== 'android' ? saveImage.path.replace('file://', '') : saveImage.path,
            }

            if (file) {
                if (file.uri) {
                    SetPreView(file.uri)
                }
                setFile(file);
            }

            // formData.append('thread_id', activeThreadId)

            // formData.append('file', file)
            // return axios({
            //     method: 'POST',
            //     url: config.file_server + '/tomuser/uploadUserAvatar',
            //     headers: {
            //         Authorization: 'Tomaho ' + token,
            //     },
            //     data: formData,
            // })
            // }).then(res => {

            //     const data = res.data;
            //     if (!data) {
            //     } else if (data.statusCode) {
            //     } else if (data.statusCode === 0) {   
            // let myUser = {...myUserInfo}
            // let url = data.data.link_url
            // dispatch({
            //     type:ActionAuth.UPDATE_USER_INFO_SUCCSESS,
            //     data:{
            //         ...myUser,
            //         avatar_url: url
            //     }
            // })
            // } else {

            // }
        }).catch(error => {
            // if (error.statusText) {
            console.log("error", error);
            // }
        })
    }

    const uploadAvatar = () => {
        _uploadAvatar();
    }
    const handleSubmitSentError = () => {

        setTimeout(() => {
            SetPreView("");
            setDesc("");
        }, 2000);

        let formData = new FormData();
        formData.append('file', file)
        // return axios({
        //     method: 'POST',
        //     url: config.file_server + '/tomuser/uploadUserAvatar',
        //     headers: {
        //         Authorization: 'Tomaho ' + token,
        //     },
        //     data: formData,
        // }).then..........
    }
    return (
        <SafeAreaView>
            <View style={{
                height: 50,
                backgroundColor: '#fff',
                position: 'relative',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottomWidth: 0.5,
                borderBottomColor: '#ddd',
                borderRadius: 8
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginRight: 5 }}>
                        <TouchableOpacity
                            delayPressIn={0}
                            delayPressOut={0}
                            style={{ padding: 10 }}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <AntDesign color='#00A48D' size={22} name='arrowleft' style={{}} />
                        </TouchableOpacity>
                    </View>


                    <View style={{}}>
                        <View style={{ paddingVertical: 2 }}>
                            <Text style={{ fontSize: 17, color: '#000', fontWeight: '500' }}>
                                Báo lỗi
                            </Text>
                        </View>
                    </View>

                </View>
            </View>
            <View style={{
                height: "100%",
                backgroundColor: "#fff",
                // marginTop:10,
            }}>
                <View style={{
                    marginTop: 10,
                    height: 120
                }}>
                    <View style={{
                        // backgroundColor:"#ccc",
                        // justifyContent:"center",
                        // alignItems:"center",
                        height: 80,
                        // flexDirection:"row"
                        paddingHorizontal: 10,
                    }} >
                        <Text style={{
                            fontSize: 16,
                            paddingBottom: 10,
                            fontWeight: "500",
                        }}>Mô tả lỗi</Text>
                        <View style={{
                            borderWidth: 1,
                            borderColor: "#00A48D",
                            height: 80,
                            borderRadius: 20,
                            paddingHorizontal: 12,

                        }}>
                            <TextInput
                                style={{
                                    flex: 1,
                                    height: 80,
                                    width: "100%",
                                    // backgroundColor:"red",

                                }}
                                multiline={true}
                                numberOfLines={4}
                                value={desc}
                                onChangeText={(e) => {
                                    setDesc(e);
                                }}
                            />
                            {
                                desc.length > 0
                                    ?
                                    <TouchableOpacity
                                        style={{
                                            padding: 10,
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                        onPress={() => setDesc("")}
                                    >

                                        <FontAwesome
                                            name='remove' size={20} color='#ccc'
                                            style={{

                                            }}
                                        />

                                    </TouchableOpacity>
                                    : null
                            }
                        </View>
                    </View>

                </View>


                {/* gửi hình */}
                <View style={{
                    // marginTop: 10,
                    // height: 120
                    paddingVertical: 10,
                }}>
                    <View style={{
                        // backgroundColor:"#ccc",
                        // justifyContent:"center",
                        // alignItems:"center",
                        height: 80,
                        // flexDirection:"row"
                        paddingHorizontal: 10,
                    }} >
                        <Text style={{
                            fontSize: 16,
                            paddingBottom: 10,
                            fontWeight: "500",
                        }}>Gửi hình chụp lỗi</Text>
                        <View style={{

                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: "#00A48D",
                                // width:40,
                                // height:40
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 10,
                                // paddingVertical:20,
                                paddingVertical: 10
                            }}
                                onPress={uploadAvatar}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    color: "#fff",
                                }}>Chọn hình</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </View>
                {/* show preview */}
                {
                    preview && preview.length > 0
                        ?
                        <View style={{
                            // backgroundColor:"#ccc",
                            height: 200,
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",

                        }}>
                            <View style={{
                                height: 200,
                                width: 200,
                                // backgroundColor:"red",
                                borderWidth: 1,
                                borderColor: "#00A48D",
                                position: "relative",
                            }}>

                                <Image style={{
                                    width: 200,
                                    height: 200,
                                }}
                                    source={{ uri: preview }} />
                                <TouchableOpacity
                                    onPress={() => {
                                        SetPreView("");
                                    }}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        backgroundColor: "#ccc",
                                        padding: 10,
                                        // borderRadius:10,
                                    }}>
                                    <Text style={{
                                        color: "red",
                                    }}>X</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        null
                }

                {/* show preview */}
                {/* submit form */}
                {
                    preview && preview.length > 0
                        ?
                        <View style={{
                            // backgroundColor: "#ccc",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 20,
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: "#00A48D",
                                paddingVertical: 8,
                                paddingHorizontal: 20,
                                borderRadius: 10,
                            }}
                                onPress={handleSubmitSentError}
                            >
                                <Text style={{ color: "#fff", fontSize: 16 }}>Gửi lỗi</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }
                {/* submit form */}
            </View>
        </SafeAreaView>
    )
}

export default SendError
