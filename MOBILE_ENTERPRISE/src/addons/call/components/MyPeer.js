import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
// import { RTCView } from 'react-native-webrtc';
import { TouchableOpacity } from 'react-native-gesture-handler';
var _ = require('lodash');

class MyPeer extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            mediaStream: '',
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return !_.isEqual(nextProps.myProducer, this.props.myProducer) || nextState.mediaStream
    // }
    

    componentDidMount() {
        this._isMounted = true;

        // if (this.props.myProducer.length > 0) {
        //     let mediaStream = new MediaStream();
        //     this.props.myProducer.forEach(consumer => {
        //         mediaStream.addTrack(consumer.track);
        //     })
        //     this.setState({ mediaStream })
        // }
    }
    
    componentDidUpdate(prevProps, prevState) {
        // if (this.props.myProducer.length > 0 && !_.isEqual(prevProps.myProducer, this.props.myProducer)) {
        //     let mediaStream = new MediaStream();
        //     this.props.myProducer.forEach(consumer => {
        //         mediaStream.addTrack(consumer.track);
        //     })
        //     this.setState({ mediaStream })
        // }
    }
    
    render() {
        try {
            return (
                <React.Fragment key={this.props.myUserInfo._id}>
                    {/* 
                        this.state.mediaStream
                        ?
                        <TouchableOpacity style={{ width: 150, height: 150, padding: 10 }}
                            delayPressIn={0} delayPressOut={0} onPress={() => {
                            }}>
                            <RTCView 
                                objectFit='contain'
                                mirror={true}
                                style={{ width: 130, height: 130, }}
                                zOrder={1}
                                streamURL={this.state.mediaStream && this.state.mediaStream.toURL()}
                            />
                        </TouchableOpacity>
                        :
                        <View style={{ width: 150, height: 150, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 19, color: '#fff' }}>
                                { this.props.myUserInfo.name }
                            </Text>
                        </View>
                     */}
                </React.Fragment>
            )
        }
        catch(error) {
            return <React.Fragment/>
        }
    }
}

function mapStateToProps(state) {
    return {
        myUserInfo: state.AuthStoredReducer.myUserInfo,
        myProducer: state.CallUnstoredReducer.myProducer,
    }
}

export default connect(mapStateToProps)(MyPeer);