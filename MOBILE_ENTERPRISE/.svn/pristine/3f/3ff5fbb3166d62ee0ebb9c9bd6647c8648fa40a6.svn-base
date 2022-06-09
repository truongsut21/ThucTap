import { takeLeading, call, put, select, takeEvery, take, all } from 'redux-saga/effects';
import axios from 'axios';
import { config } from '../../../config';
import { Dimensions, Platform } from 'react-native';
// import { MediaStream, RTCPeerConnection } from 'react-native-webrtc';
import 'react-native-get-random-values';
var _ = require('lodash');

export function* watcherCall() {
    yield takeEvery('UPDATE_PRODUCER', workerUpdateProducer);
    yield takeEvery('UPDATE_CONSUMER', workerUpdateConsumer);
    yield takeEvery('UPDATE_PEER', workerUpdatePeer);
    yield takeEvery('UPDATE_ACTIVE_SPEAKER', workerUpdateActiveSpeaker);
}

const configurationRTC = {
    mandatory: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
    },
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        }, {
            urls: 'stun:stun1.l.google.com:19302',
        }, {
            urls: 'stun:stun2.l.google.com:19302',
        }
    ],
}

function* workerUpdateProducer(action) {
    try {
        let { myProducer } = yield select((state) => state.CallUnstoredReducer);
        switch (action.ttype) {
            case 'newProducer': {
                if (action.data) {
                    myProducer = _.cloneDeep(myProducer);
                    yield put({
                        type: 'UPDATE_PRODUCER_SUCCESS',
                        data: _.unionBy(myProducer, action.data, 'transport_id'),
                    })
                }
                break;
            }
            case 'muteMic': {
                myProducer = _.cloneDeep(myProducer);
                myProducer = myProducer.map(producer => {
                    if (producer.track.kind === 'audio') {
                        producer.muted = true
                    }
                    return producer;
                })
                yield put({
                    type: 'UPDATE_PRODUCER_SUCCESS',
                    data: myProducer
                })
                break;
            }
            case 'unmuteMic': {
                myProducer = _.cloneDeep(myProducer);
                myProducer = myProducer.map(producer => {
                    if (producer.track.kind === 'audio') {
                        producer.muted = false
                    }
                    return producer;
                })
                yield put({
                    type: 'UPDATE_PRODUCER_SUCCESS',
                    data: myProducer
                })
                break;
            }
            case 'disableWebcam': {
                myProducer = _.cloneDeep(myProducer);
                myProducer = myProducer.filter(producer => {
                    return producer.track.kind !== 'video'
                })
                // if (action.setStateCallMain) {
                //     // 
                // }
                yield put({
                    type: 'UPDATE_PRODUCER_SUCCESS',
                    data: myProducer
                })
                break;
            }
            default:
                yield put({
                    type: 'UPDATE_PRODUCER_SUCCESS',
                    data: []
                })
                break;
        }
    }
    catch(error) {
        // 
        yield put({
            type: 'UPDATE_PRODUCER_SUCCESS',
            data: []
        })
    }
}

function* workerUpdateConsumer(action) {
    try {
        let { myConsumer } = yield select((state) => state.CallUnstoredReducer);
        switch (action.ttype) {
            case 'consumerClosed': {
                if (action.data) {
                    myConsumer = _.cloneDeep(myConsumer);
                    let myNewConsumer = myConsumer.filter(consumer => {
                        return consumer.peer_id !== action.data
                    })
                    yield put({
                        type: 'UPDATE_CONSUMER_SUCCESS',
                        data: myNewConsumer,
                    })
                }
                break;
            }
            case 'newConsumer': {
                if (action.data) {
                    myConsumer = _.cloneDeep(myConsumer);
                    let myNewConsumer = _.unionBy(myConsumer, action.data, 'transport_id')
                    yield put({
                        type: 'UPDATE_CONSUMER_SUCCESS',
                        data: _.unionBy(myNewConsumer, action.data, 'transport_id'),
                    })
                }
                break;
            }
            default:
                yield put({
                    type: 'UPDATE_CONSUMER_SUCCESS',
                    data: [],
                })
                break;
        }
    }
    catch(error) {
        // 
        yield put({
            type: 'UPDATE_CONSUMER_SUCCESS',
            data: [],
        })
    }
}

function* workerUpdatePeer(action) {
    try {
        let { myPeer } = yield select((state) => state.CallUnstoredReducer);
        switch (action.ttype) {
            case 'peerClosed': {
                myPeer = _.cloneDeep(myPeer);
                let newPeerList = myPeer.filter(peer => {
                    return peer.id !== action.data
                })
                yield put({
                    type: 'UPDATE_PEER_SUCCESS',
                    data: newPeerList
                })
                break;
            }
            case 'newPeer': {
                myPeer = _.cloneDeep(myPeer);
                yield put({
                    type: 'UPDATE_PEER_SUCCESS',
                    data: _.unionBy(myPeer, action.data, 'id')
                })
                break;
            }
            case 'listPeer': 
                yield put({
                    type: 'UPDATE_PEER_SUCCESS',
                    data: action.data,
                })
                break;
            default:
                yield put({
                    type: 'UPDATE_PEER_SUCCESS',
                    data: [],
                })
                break;
        }
    }
    catch(error) {
        // 
        yield put({
            type: 'UPDATE_PEER_SUCCESS',
            data: [],
        })
        // // 
    }
}

function* workerUpdateActiveSpeaker(action) {
    try {
        let { activeSpeaker } = yield select((state) => state.CallUnstoredReducer);
        activeSpeaker = _.cloneDeep(activeSpeaker)
        switch (action.ttype) {
            case 'newActiveSpeaker': {
                let myPeer = _.cloneDeep(yield select((state) => state.CallUnstoredReducer.myPeer));
                if (myPeer.findIndex(peer => peer.id === action.data) > -1) {
                    activeSpeaker = myPeer.filter(peer => peer.id === action.data)[0];
                }
                yield put({
                    type: 'UPDATE_ACTIVE_SPEAKER_SUCCESS',
                    data: activeSpeaker,
                })
                break;
            }
            default: 
                yield put({
                    type: 'UPDATE_ACTIVE_SPEAKER_SUCCESS',
                    data: action.data,
                })
                break;
        }
    }
    catch(error) {
        // 
        yield put({
            type: 'UPDATE_ACTIVE_SPEAKER_SUCCESS',
            data: ''
        })
    }
}