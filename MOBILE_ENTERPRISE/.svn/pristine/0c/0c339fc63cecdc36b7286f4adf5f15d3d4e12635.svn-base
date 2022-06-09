import React from 'react';
import { View, SafeAreaView, Dimensions, ScrollView, Animated, TouchableOpacity, Easing } from 'react-native';
import { connect } from 'react-redux';
import StatusBar from '../../base/components/StatusBar';

import MyPeer from './MyPeer';
import Peer from './Peer';
import ActivePeer from './ActivePeer';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
var _ = require('lodash');

class CallMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            audio: false,
            video: false,
        };
        this._isMounted = false;
        this.linear = new Animated.Value(150);
    }

    setStateCallMain = (key, value) => {
        var self = this;
        self.setState({
            [key]: value,
        })
    }

    componentDidMount() {
        this._isMounted = true;

        const { RoomClient } = this.props;
        if (RoomClient) {
            RoomClient.join();
        }
    }
    
    render() {
        const { RoomClient } = this.props;
        let audio = false, video = false;
        if (this.props.myProducer.length > 0) {
            this.props.myProducer.forEach(producer => {
                if (producer.track && producer.track.kind === 'audio') audio = producer.muted;
                if (producer.track && producer.track.kind === 'video') video = true;
            })
        }
        return (
            <React.Fragment>
                <SafeAreaView style={{ flex: 0, backgroundColor: '#000' }}/>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
                    <StatusBar barStyle='light-content' backgroundColor='#000'/> 

                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivePeer />
                    </View>

                    {
                        !this.state.collapsed
                        ?
                        <ScrollView horizontal={true} style={{
                            position: 'absolute',
                            backgroundColor: '#222',
                            minWidth: Dimensions.get('window').width,
                            height: 150,
                            bottom: 0,
                            flexDirection: 'row',
                        }}>
                            <MyPeer />
                            {
                                this.props.myPeer && this.props.myPeer.length > 0
                                ?
                                this.props.myPeer.map(peer => {
                                    return (
                                        <React.Fragment key={peer.id}>
                                            <Peer data={peer}/>
                                        </React.Fragment>
                                    )
                                })
                                :
                                null
                            }
                        </ScrollView>
                        :
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            bottom: 0,
                            height: 150,
                            width: Dimensions.get('window').width,
                        }}>
                            <TouchableOpacity style={{
                                width: 50, height: 50,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: !audio ? '#fff' : '#c00',
                            }} delayPressIn={0} delayPressOut={0} onPress={() => {
                                if (!audio) {
                                    RoomClient.muteMic()
                                }
                                else {
                                    RoomClient.unmuteMic()
                                }
                            }}>
                                <FontAwesome5 style={{ fontSize: 20 }} name='microphone-slash'  color={!audio ? '#000' : '#fff'}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                marginLeft: 20,
                                marginRight: 20,
                                width: 50, height: 50,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#c00'
                            }} delayPressIn={0} delayPressOut={0} onPress={() => {
                                RoomClient.endCall();
                                this.props.navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }]
                                });
                            }}>
                                <MaterialIcons style={{ fontSize: 20 }} name='call-end'  color='#fff'/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                width: 50, height: 50,
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: video ? '#fff' : '#c00',
                            }} delayPressIn={0} delayPressOut={0} onPress={() => {
                                if (video) {
                                    RoomClient.disableWebcam();
                                }
                                else {
                                    RoomClient.enableWebcam();
                                }
                            }}>
                                <FontAwesome5 style={{ fontSize: 20 }} name='video-slash'  color={video ? '#000' : '#fff'}/>
                            </TouchableOpacity>
                        </View>
                    }
                </SafeAreaView>

                <TouchableOpacity style={{
                    position: 'absolute',
                    bottom: !this.state.collapsed ? 150 : 0, left: 0,
                    width: 50, height: 50,
                    justifyContent: 'center', alignItems: 'center',
                    backgroundColor: '#222'
                }} onPress={() => {
                    this.setState({
                        collapsed: !this.state.collapsed,
                    })
                }}>
                    {
                        !this.state.collapsed
                        ?
                        <SimpleLineIcons color='#fff' name='arrow-down' size={20}/>
                        :
                        <SimpleLineIcons color='#fff' name='arrow-up' size={20}/>
                    }
                    
                </TouchableOpacity>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    

    return {
        myProducer: state.CallUnstoredReducer.myProducer,
        myPeer: state.CallUnstoredReducer.myPeer,
        activeSpeaker: state.CallUnstoredReducer.activeSpeaker,
    }
}

export default connect(mapStateToProps)(CallMain);