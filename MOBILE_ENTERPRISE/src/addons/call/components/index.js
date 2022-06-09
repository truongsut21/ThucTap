import React from 'react';
import { Dimensions, SafeAreaView, View, ScrollView, Vibration } from 'react-native';
import StatusBar from '../../base/components/StatusBar';
// import { MediaStream, RTCPeerConnection, registerGlobals, RTCView } from 'react-native-webrtc';
import roomClient from '../class/RoomClient';

import CallMain from './CallMain';
import OnCall from './OnCall';

import { connect } from 'react-redux';

import { config } from '../../../config';
import axios from 'axios';
var _ = require('lodash')

class Call extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            RoomClient: '',
        }
        this.handler = null;
        this._vibration = Vibration;
        this.setTimeout = null;
    }

    setStateCall = (key, value) => {
        // var self = this;
        // self.setState({
        //     [key]: value,
        // })
    }

    async componentDidMount() {
        // registerGlobals()
        // try {
        //     const { user, roomId, name } = this.props.route.params;
        //     if (user === this.props.myUserInfo._id) {
        //         let response = await axios({
        //             method: 'POST',
        //             url: config.backend_url + '/core/stream/getCallConferenceInfo',
        //             headers: {
        //                 Authorization: `Tomaho ${this.props.token}`
        //             },
        //             data: {
        //                 payload: {
        //                     roomId,
        //                 }
        //             }
        //         })
        //         if (response.data) {
        //             response = response.data;
        //             if (response.statusCode === 0 && response.data.User) {
        //                 const peerId = this.props.myUserInfo._id;
        //                 const displayName = '';
        //                 let device = {
        //                     flag: 'unknown',
        //                     name: '',
        //                     version: '',
        //                 };
        //                 const handler = '';
        //                 const useSimulcast = false;
        //                 const useSharingSimulcast = false;
        //                 const forceTcp = true;
        //                 const produce = true;
        //                 const consume = true;
        //                 const forceH264 = false;
        //                 const forceVP9 = false;
        //                 const svc = '';
        //                 const datachannel = false;
        //                 const externalVideo = false;
        //                 const token = this.props.token;
        //                 const dispatch = this.props.dispatch;
        //                 let RoomClient = new roomClient({
        //                     roomId,
        //                     peerId,
        //                     displayName,
        //                     device,
        //                     handlerName: handler,
        //                     useSimulcast,
        //                     useSharingSimulcast,
        //                     forceTcp,
        //                     produce,
        //                     consume,
        //                     forceH264,
        //                     forceVP9,
        //                     svc,
        //                     datachannel,
        //                     externalVideo,
        //                     dispatch,
        //                     token
        //                 });
        //                 this.setState({ RoomClient })
        //             }
        //         }
        //     }
        //     else {
        //         this._vibration.vibrate([1200, 1200], true);
        //         this.setTimeout = setTimeout(() => {
        //             if (!this.props.myProducer) {
        //                 this._vibration.cancel();
        //                 this.props.navigation.reset({
        //                     index: 0,
        //                     routes: [{ name: 'Home' }]
        //                 })
        //             }
        //         }, 15000)
        //     }
        // }
        // catch(error) {
        //     this._vibration.cancel();
        // }
    }

    componentWillUnmount() {
        // this._vibration.cancel();
        // this.props.dispatch({
        //     type: 'UPDATE_PRODUCER'
        // })
        // this.props.dispatch({
        //     type: 'UPDATE_CONSUMER'
        // })
        // this.props.dispatch({
        //     type: 'UPDATE_PEER'
        // })
    }
    // heheh = () => {
        // {
        //     this.state.RoomClient
        //     ?
        //     <CallMain RoomClient={this.state.RoomClient} navigation={this.props.navigation}/>
        //     :
        //     null
        // }
        // {
        //     !this.state.RoomClient
        //     ?
        //     <OnCall navigation={this.props.navigation} route={this.props.route} setStateCall={this.setStateCall}/>
        //     :
        //     null
        // }
    // }

    render() {
        return (
            <React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#000' }}/>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
                    <StatusBar barStyle='light-content' backgroundColor='#000'/> 

                </SafeAreaView>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {

        myProducer: state.CallUnstoredReducer.myProducer,
    }
}

export default connect(mapStateToProps)(Call);