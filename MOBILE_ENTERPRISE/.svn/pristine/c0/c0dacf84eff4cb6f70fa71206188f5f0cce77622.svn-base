import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, View, Image, FlatList, Text, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import StatusBar from '../../base/components/StatusBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DefaultAvatar from '../../chat/static/default_ava.png';
import { convertToColor } from '../../chat/controllers/utils';
import { useNavigation } from '@react-navigation/native';
import * as Action from '../controllers/actionTypes';
import Modal from 'react-native-modal';
import styles from '../static/styles';
import { without, isEqual } from 'lodash';
import { } from '@react-native-community/hooks';
var image = require('../static/logo.png')

const SwitchAccount = ({ ...props }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const activeUserId = useSelector(state => state.AuthStoredReducer.myUserInfo._id);
    const isFetchingData = useSelector(state => {
        let fetchingChatDataState = state.ChatUnstoredReducer.fetchingChatDataState;
        return Object.values(fetchingChatDataState).indexOf(true) > -1 ? true : false;
    })
    const reduxLoggedUsers = useSelector(state => {
        const template = (data) => {
            if (!data || !data.token) {
                return null;
            }
            return {
                _id: data._id,
                username: data.username,
                name: data.name,
                company_id: data.company_id,
                isLoggedOut: !data.token,
                identical_domain_name: data.identical_domain_name
            }
        }
        return without(Object.values(state.AuthStoredReducer.loggedUsers).map(t => template(t)), null);
    });

    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const switchAccount = (data) => {
        // if (activeUserId && data.isLoggedOut) {
        //     setLoading(true);
        //     setShowError(true);
        // }
        // else {
        // if (!data.isLoggedOut) {
        if (!isFetchingData) {
            setLoading(true);
            dispatch({
                type: Action.SWITCH_TO_ACCOUNT,
                data,
                navigation,
                setLoading,
                dispatch,
            })
        }
        // }
        // else {
        //     let reduxUser = Object.values(reduxLoggedUsers).filter(t => t._id && t._id === data._id);
        //     navigation.navigate('Auth', reduxUser)
        // }
        // }
    }
    return (
        <React.Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar backgroundColor='#00A48D' barStyle={'dark-content'} />
                <View style={{
                    height: 50,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomColor: '#ddd',
                    borderBottomWidth: 0.4
                }}>
                    <View style={{
                        width: 40,
                        justifyContent: "center",
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity style={styles.aaf} onPress={() => {
                            if (!activeUserId) {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Auth' }]
                                });
                            }
                            else {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }]
                                });
                            }
                        }}>
                            <AntDesign color='#00A48D' size={22} name='arrowleft' style={{}} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                    }}>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: '500', color: '#00A48D' }} numberOfLines={1} ellipsizeMode='middle'>
                                Chuyển đổi tài khoản
                            </Text>
                        </View>

                    </View>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    padding: 15,
                    justifyContent: 'space-around',
                }}>
                    <View style={{
                        flex: 1
                    }}>
                        {/* {
                            reduxLoggedUsers.length > 0
                                ? */}
                        <FlatList
                            data={reduxLoggedUsers}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={{
                                        height: 80,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 10,
                                    }} delayPressIn={0} delayPressOut={0} onPress={() => switchAccount(item)}>
                                        <View style={{
                                            marginRight: 15,
                                        }}>
                                            <Image
                                                source={DefaultAvatar}
                                                style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: 25,
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}
                                            />
                                        </View>
                                        <View style={{
                                            flex: 1
                                        }}>
                                            <Text style={{
                                                fontSize: 15,
                                                paddingBottom: 1,
                                                fontWeight: Platform.OS === 'android' ? 'bold' : '600',
                                                color: convertToColor(item._id[item._id.length - 1])
                                            }} ellipsizeMode='tail'>
                                                {`${item.name} - ${item.company_id.name}`}
                                            </Text>
                                            {
                                                item.isLoggedOut
                                                    ?
                                                    <Text style={{
                                                        fontSize: 13,
                                                        fontStyle: 'italic',
                                                        color: '#f00',
                                                        paddingTop: 1
                                                    }}>
                                                        Đã đăng xuất
                                                    </Text>
                                                    :
                                                    <Text style={{
                                                        fontSize: 13,
                                                        paddingTop: 1
                                                    }}>
                                                        {item.username}
                                                    </Text>
                                            }

                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                        {/* :
                                null
                        } */}
                    </View>
                </View>
            </SafeAreaView>

            <Modal isVisible={loading}>
                {
                    showError
                        ?
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                backgroundColor: '#fff',
                                width: '70%',
                                alignItems: 'center',
                                borderRadius: 10
                            }}>
                                <View style={{
                                    paddingVertical: 30,
                                    width: '80%'
                                }}>
                                    <Text style={{
                                        fontSize: 17,
                                        fontWeight: '400',
                                        textAlign: 'center'
                                    }}>
                                        Tài khoản đã đăng xuất
                                    </Text>
                                </View>

                                <View style={{
                                    borderTopWidth: 0.2,
                                    borderTopColor: '#ddd',
                                    flexDirection: 'row',
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            width: '100%',
                                            height: 40,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        onPress={() => { setShowError(false); setLoading(false) }}
                                    >
                                        <Text style={{
                                            color: 'red'
                                        }}>
                                            Đóng
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator animating={true} size="small" color="#fff" />
                        </View>
                }


            </Modal>
        </React.Fragment>
    )
}

export default SwitchAccount