import React, { useEffect, useState } from 'react';
import {
    Text, View, Image, TouchableOpacity, SafeAreaView, Switch, ScrollView,
    InteractionManager
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
import isEqual from 'react-fast-compare';
// import DispatchImage from '../DispatchImage';
import ThreadStatusInChatBox from '../ThreadStatusInChatBox';
import { WIDTH } from '../../controllers/utils';
import styles from '../../static/style';
import DefaultAvatar from '../../static/default_ava.png';
import DefaultGroupAvatar from '../../static/default_group_avatar.png';
import * as Action from '../../controllers/actionTypes';

import AntIcon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StatusBar from '../../../base/components/StatusBar';
import DispatchImage from '../DispatchImage';
import Modal from 'react-native-modal';
import SettingThreadChangePermission from './SettingThreadChangePermission'
import SettingThreadChangePollMessage from './SettingThreadChangePollMessage'
import SettingThreadChangeSendMessage from './SettingThreadChangeSendMessage'
import SettingThreadChangePinMessage from './SettingThreadChangePinMessage'
import SettingThreadChangeJoinCondition from './SettingThreadChangeJoinCondition'


const SettingThread = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 5 }}>
                    <TouchableOpacity delayPressIn={0} delayPressOut={0} style={{ padding: 10 }}
                        onPress={() => navigation.goBack()}
                    >
                        <AntIcon color='#000' size={22} name='arrowleft' style={{}} />
                    </TouchableOpacity>
                </View>

                <View style={{}}>
                    <View style={{ paddingVertical: 2 }}>
                        <Text style={{ fontSize: 17, color: '#000', fontWeight: '500' }}>
                            Cài đặt nhóm
                                                </Text>
                    </View>
                </View>

            </View>
            <React.Fragment>
                <View style={{
                    height: 36,
                    marginTop: 10,
                    // backgroundColor: '#f0f4f8', 
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: '#a9a9a9',
                        marginLeft: 8,
                        marginLeft: 16
                    }}>
                        Thành viên
                                </Text>
                </View>
                <TouchableOpacity
                    style={{
                        paddingHorizontal: 10,
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                    delayPressIn={0} delayPressOut={0}
                    onPress={() => {
                        setTimeout(() => {
                            // this.props.navigation.navigate('ThreadMemberList')
                        }, 0)
                    }}>
                    <MaterialCommunityIcons name='account-group' size={25} color='#00A48D' />

                    <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15 }}>
                        Quản lý thành viên
                                </Text>


                </TouchableOpacity>
                <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />
               
                <SettingThreadChangeJoinCondition/>
                {/* <TouchableOpacity
                    style={{
                        paddingHorizontal: 10,
                        height: 50,
                        alignItems: 'center',
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                    delayPressIn={0} delayPressOut={0}
                    onPress={() => {
                        setTimeout(() => {
                            // this.props.navigation.navigate('ThreadMemberList')
                        }, 0)
                    }}>
                    <MaterialIcons name='transform' size={25} color='#00A48D' />

                    <Text style={{ paddingLeft: 10, fontWeight: "300", color: '#333', fontSize: 15 }}>
                        Chuyển quyền trưởng nhóm
                                </Text>


                </TouchableOpacity> */}



            </React.Fragment>
            <React.Fragment>
                <View style={{
                    height: 36,
                    marginTop: 10,
                    // backgroundColor: '#f0f4f8', 
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '700',
                        color: '#a9a9a9',
                        marginLeft: 8,
                        marginLeft: 16
                    }}>
                        Quyền của thành viên
                                </Text>
                </View>
                <SettingThreadChangePermission/>
                <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />
                <SettingThreadChangePinMessage/>

                <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />
                <SettingThreadChangeSendMessage/>
                <View style={{ height: 2, backgroundColor: '#f0f4f8' }} />
                <SettingThreadChangePollMessage/>

                


                
            </React.Fragment>
        </SafeAreaView>
    )
}

export default SettingThread
