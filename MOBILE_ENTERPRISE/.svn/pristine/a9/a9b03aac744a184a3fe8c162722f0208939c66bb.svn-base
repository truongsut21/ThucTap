import React, { useEffect } from 'react';
import {
    View, Platform,
    TouchableHighlight,
    LayoutAnimation, UIManager,
} from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/core';
import { connect, useDispatch } from 'react-redux';
import isEqual from 'react-fast-compare';
import ThreadElementAvatar from './childThreadElement/ThreadElementAvatar';
import ThreadElementBody from './childThreadElement/ThreadElementBody';
import * as Action from '../controllers/actionTypes';
import useTheme from '../../base/components/useTheme';

var _ = require('lodash');

const ThreadElement = ({ ...props }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const theme = useTheme();
    // onPress() {
    //     if (!this.props.forwardState) {
    //         this.props.dispatch({
    //             type: Action.UPDATE_ACTIVE_THREAD,
    //             data: this.props.thread
    //         })
    //         this.props.navigation.navigate('ChatBox', {
    //             thread: this.props.thread
    //         })

    //     }
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
    // }

    useEffect(() => {
        // LayoutAnimation.configureNext({
        //     duration: 120,
        //     update: {
        //         type: LayoutAnimation.Types.linear,
        //         property: LayoutAnimation.Properties.opacity,
        //     },
        // });
    }, [])



    // componentDidUpdate(prevProps, prevState) {
    //     LayoutAnimation.configureNext({
    //         duration: 120,
    //         create: {
    //             type: LayoutAnimation.Types.linear,
    //             property: LayoutAnimation.Properties.opacity,
    //         },
    //         update: {
    //             type: LayoutAnimation.Types.linear,
    //             property: LayoutAnimation.Properties.opacity,
    //         },
    //     })
    // }

    const onPress = () => {
        dispatch({
            type: Action.UPDATE_ACTIVE_THREAD,
            data: props._id
        })
        navigation.navigate('ChatBox', { threadId: props._id })
    }
    try {
        return (
            <TouchableHighlight
                underlayColor={'#81fceb'}
                onPress={onPress}
                delayPressIn={0}
                delayPressOut={0}
                delayLongPress={600}
            // onLongPress={() => {
            //     if (!this.props.forwardState) {
            //         // if (this.props.thread.is_group) {
            //         this.props.showOptionPin({
            //             ...this.props.thread,
            //             notificationStatus: this.props.notificationStatus
            //         });
            //         // }
            // }
            // }} 
            // disabled={this.props.forwardState}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 0,
                    height: 80,

                    backgroundColor: theme.backgroundColor,
                }}>
                    <ThreadElementAvatar
                        _id={props._id}

                    />

                    <ThreadElementBody
                        _id={props._id}
                    />

                    {/* {
                            this.props.forwardState
                                ?
                                <React.Fragment>
                                    <View style={{ height: 60, width: 100, backgroundColor: '', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                                        <TouchableOpacity style={{
                                            paddingVertical: 10,
                                            paddingHorizontal: 20,
                                            borderRadius: 10,
                                            borderColor: '#333',
                                            backgroundColor: '#ddd'
                                        }} delayPressIn={0} delayPressOut={0} disabled={this.state.sent}
                                            onPress={() => {
                                                let forwardMessage = _.cloneDeep(this.props.forwardMessage);
                                                let currentTime = Date.parse(new Date());
                                                let data = {
                                                    create_date: currentTime,
                                                    write_date: currentTime,
                                                    create_uid: this.props.activeUserId,
                                                    thread_id: this.props.thread.thread_id,
                                                    content: forwardMessage.content,
                                                    type: forwardMessage.type,
                                                }

                                                this.props.dispatch({
                                                    type: Action.API_SEND_MESSAGE,
                                                    data
                                                })
                                                this.setState({
                                                    sent: true
                                                })
                                            }}>
                                            <Text style={{
                                                color: this.state.sent ? '#a3a3a3' : '#000'
                                            }}>
                                                {this.state.sent ? 'Đã gửi' : 'Gửi'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </React.Fragment>
                                :
                                null
                        } */}
                </View>
            </TouchableHighlight>
        )

    }
    catch (error) {

        return <React.Fragment />
    }
}

export default React.memo(ThreadElement, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})