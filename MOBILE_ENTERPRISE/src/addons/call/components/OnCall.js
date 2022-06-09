import React from 'react';
import { Dimensions, SafeAreaView, TouchableOpacity, View, Text, Vibration } from 'react-native';
import { connect } from 'react-redux';
import StatusBar from '../../base/components/StatusBar';
import roomClient from '../class/RoomClient';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { config } from '../../../config';
import axios from 'axios';

class OnCall extends React.Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            user: '',
            roomId: '',
            name: '',
        }
    }

    catchCall = async() => {
        clearTimeout(this.props.setTimeout);
        if (this.props.vibration) {
            this.props.vibration.cancel();
        }
        else {
            Vibration.cancel();
        }
        let response = await axios({
            method: 'POST',
            url: config.backend_url + '/core/stream/getCallConferenceInfo',
            headers: {
                Authorization: `Tomaho ${this.props.token}`
            },
            data: {
                payload: {
                    roomId: this.state.roomId
                }
            }
        })
        if (response.data) {
            response = response.data;
            if (response.statusCode === 0 && response.data.User) {
                const peerId = this.props.myUserInfo._id;
                const roomId = this.state.roomId;
                const displayName = '';
                const handler = '';
                const useSimulcast = false;
                const useSharingSimulcast = false;
                const forceTcp = true;
                const produce = true;
                const consume = true;
                const forceH264 = false;
                const forceVP9 = false;
                const svc = '';
                const datachannel = false;
                const externalVideo = false;
                const token = this.props.token;
                const dispatch = this.props.dispatch;
                
                let RoomClient = new roomClient({
                    roomId,
                    peerId,
                    displayName,
                    device: '',
                    handlerName: handler,
                    useSimulcast,
                    useSharingSimulcast,
                    forceTcp,
                    produce,
                    consume,
                    forceH264,
                    forceVP9,
                    svc,
                    datachannel,
                    externalVideo,
                    dispatch,
                    token
                });
                this.props.setStateCall('RoomClient', RoomClient);
            }
        }
    }

    componentDidMount() {
        const { user, roomId, name } = this.props.route.params;
        this.setState({ user, roomId, name });
        this._isMounted = true;
    }
    
    render() {
        return (
            <React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#000' }}/>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
                    <StatusBar barStyle='light-content' backgroundColor='#000'/> 
                    <View style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <Text style={{color: '#fff', fontSize: 25}}>
                            {
                                this.state.name || ''
                            }
                            {' '}
                            đang gọi
                        </Text>
                    </View>

                    <View style={{
                        position: 'absolute',
                        bottom: 100,
                        flexDirection: 'row',
                        width: Dimensions.get('window').width,
                        justifyContent: 'space-around',
                    }}>
                        <TouchableOpacity style={{
                            width: 65, height: 65,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#c00',
                        }} delayPressIn={0} delayPressOut={0} onPress={() => {
                            if (this.props.vibration) {
                                this.props.vibration.cancel();
                            }
                            else {
                                Vibration.cancel();
                            }
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }]
                            })
                        }}>
                            <MaterialIcons name='call-end' style={{ fontSize: 25 }} color='#fff'/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            width: 65, height: 65,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#0c0',
                        }} delayPressIn={0} delayPressOut={0} onPress={this.catchCall}>
                            <MaterialIcons name='call' style={{ fontSize: 25 }} color='#fff'/>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: state.AuthStoredReducer.token,
        myUserInfo: state.AuthStoredReducer.myUserInfo,
    }
}

export default connect(mapStateToProps)(OnCall);