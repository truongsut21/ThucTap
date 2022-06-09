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
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import StatusBar from '../../../base/components/StatusBar';
import DispatchImage from '../DispatchImage';



const ChangeInformation = ({navigation}) => {
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
                                        Chỉnh sửa thông tin
                                                </Text>
                                </View>
                            </View>
                      
                </View>
            <Text>ChangeInformation</Text>
        </SafeAreaView>
    )
}

export default ChangeInformation
