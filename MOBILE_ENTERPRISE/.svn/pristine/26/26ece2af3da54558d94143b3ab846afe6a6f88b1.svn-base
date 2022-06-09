import React from 'react';
import { View, Text, Dimensions } from 'react-native';
// import { RTCView, MediaStream } from 'react-native-webrtc';
import { connect } from 'react-redux';
var _ = require('lodash');

class ActivePeer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaStream: '',
        }
    }
    
    componentDidMount() {
        try {
            // if (this.props.activeSpeaker) {
            //     let mediaStream = new MediaStream();
            //     this.props.myConsumer.forEach(consumer => {
            //         if (consumer.peer_id === this.props.activeSpeaker.id) {
            //             mediaStream.addTrack(consumer.track)
            //         }
            //     })  
            //     this.setState({ mediaStream })
            // }
            // else if (this.props.myPeer.length > 0) {
            //     this.props.dispatch({
            //         type: 'UPDATE_ACTIVE_SPEAKER',
            //         data: this.props.myPeer[0]
            //     })
            // }
        }
        catch(error) {
            // 
        }
    }

    componentDidUpdate(prevProps, prevState) {
        try {
            // if (this.props.activeSpeaker && 
            //     !_.isEqual(prevProps.activeSpeaker, this.props.activeSpeaker)) {
            //         let mediaStream = new MediaStream();
            //         this.props.myConsumer.forEach(consumer => {
            //             if (consumer.peer_id === this.props.activeSpeaker.id) {
            //                 mediaStream.addTrack(consumer.track);
            //             }
            //         })  
            //         this.setState({ mediaStream })
            //     }
        }
        catch(error) {
            // 
        }
    }
    
    render() {
        try {
            return (
                <React.Fragment>
                    {/* 
                        this.state.mediaStream
                        ?
                            <RTCView 
                                objectFit='contain'
                                mirror={true}
                                style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width, }}
                                streamURL={this.state.mediaStream && this.state.mediaStream.toURL()}
                            />
                        :
                        <View style={{ width: 200, height: 200, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 19, color: '#fff' }}>
                                { this.props.activeSpeaker.displayName }
                            </Text>
                        </View>
                     */}
                </React.Fragment>
            )
        }
        catch(error) {
            // // 
            return <React.Fragment />
        }
    }
}

function mapStateToProps(state) {
    return {
        myPeer: state.CallUnstoredReducer.myPeer,
        myProducer: state.CallUnstoredReducer.myProducer,        
        myConsumer: state.CallUnstoredReducer.myConsumer,        
        activeSpeaker: state.CallUnstoredReducer.activeSpeaker,
    }
}

export default connect(mapStateToProps)(ActivePeer);