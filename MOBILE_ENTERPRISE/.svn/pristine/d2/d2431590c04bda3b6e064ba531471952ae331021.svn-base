import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
// import { RTCView } from 'react-native-webrtc';
var _ = require('lodash');

class Peer extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            mediaStream: '',
        }
    }
    
    // shouldComponentUpdate(nextProps, nextState) {
    //     return this.props.data && !_.isEqual(nextProps.myConsumer, this.props.myConsumer) || nextState.mediaStream
    // }
    
    componentDidMount() {
        this._isMounted = true;

        // if (this.props.data && this.props.myConsumer.length > 0) {
        //     let mediaStream = new MediaStream();
        //     this.props.myConsumer.forEach(consumer => {
        //         if (consumer.peer_id === this.props.data.id) {
        //             mediaStream.addTrack(consumer.track);
        //         }
        //     })
        //     this.setState({ mediaStream })
        // }
    }
    
    componentDidUpdate(prevProps, prevState) {
        // if (this.props.data && this.props.myConsumer.length > 0 && !_.isEqual(prevProps.myConsumer, this.props.myConsumer)) {
        //     let mediaStream = new MediaStream();
        //     this.props.myConsumer.forEach(consumer => {
        //         if (consumer.peer_id === this.props.data.id) {
        //             mediaStream.addTrack(consumer.track);
        //         }
        //     })
        //     this.setState({ mediaStream })
        // }
    }
    
    render() {
        try {
            return (
                <React.Fragment>
                    
                        {/* this.state.mediaStream
                        ?
                        <TouchableOpacity style={{ width: 150, height: 150, padding: 10 }}
                            delayPressIn={0} delayPressOut={0} onPress={() => {
                                // this.props.dispatch({
                                //     type: 'UPDATE_ACTIVE_SPEAKER',
                                //     data: this.props.data,
                                // })
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
                                { this.props.data.displayName }
                            </Text>
                        </View> */}
                    
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
        myConsumer: state.CallUnstoredReducer.myConsumer,
    }
}

export default connect(mapStateToProps)(Peer);