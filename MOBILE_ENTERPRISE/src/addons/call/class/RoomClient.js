import * as mediasoupClient from 'mediasoup-client';
const protooClient = require('protoo-client');
const WEBCAM_KSVC_ENCODINGS =
    [
        { scalabilityMode: 'S3T3_KEY' }
    ];
const WEBCAM_SIMULCAST_ENCODINGS =
    [
        { scaleResolutionDownBy: 4, maxBitrate: 500000 },
        { scaleResolutionDownBy: 2, maxBitrate: 1000000 },
        { scaleResolutionDownBy: 1, maxBitrate: 5000000 }
    ];
function getProtooUrl({ roomId, peerId, token }) {
    try {
        return `wss://streamsfu001.tomahosoft.com/?roomId=${roomId}&peerId=${peerId}&token=${token}`;
    }
    catch(error) {
        return '';
    }
}

class RoomClient {
    constructor({ 
        roomId, peerId, displayName, device,
        handlerName, useSimulcast, useSharingSimulcast,
        forceTcp, produce, consume, forceH264, forceVP9,
        svc, datachannel, externalVideo, dispatch, token 
    }) {
        this._closed = false;
        this._displayName = displayName;
        this._device = new mediasoupClient.Device();
        this._forceTcp = forceTcp;
        this._produce = produce;
        this._consume = consume;
        this._useDataChannel = datachannel;
        this._forceH264 = Boolean(forceH264);
        this._forceVP9 = Boolean(forceVP9);
        this._externalVideo = null;
        this._externalVideoStream = null;
        this._nextDataChannelTestNumber = 0;
        if (externalVideo) {
            this._externalVideo.controls = true;
            this._externalVideo.muted = true;
            this._externalVideo.loop = true;
            this._externalVideo.setAttribute('playsinline', '');
            this._externalVideo.src = EXTERNAL_VIDEO_SRC;
            this._externalVideo.play()
        }
        this._handlerName = handlerName;
        this._useSimulcast = useSimulcast;
        this._useSharingSimulcast = useSharingSimulcast;
        this._protooUrl = getProtooUrl({ roomId, peerId, token });
        this._protoo = null;
        this._mediasoupDevice = null;
        this._sendTransport = null;
        this._recvTransport = null;
        this._micProducer = null;
        this._webcamProducer = null;
        this._shareProducer = null;
        this._chatDataProducer = null;
        this._botDataProducer = null;
        this._consumers = new Map();
        this._dataConsumers = new Map();
        this._webcams = new Map();
        this._webcam = {
            device: null,
            resolution: 'hd'
        };
        if (svc) {
            WEBCAM_KSVC_ENCODINGS[0].scalabilityMode = `${svc}_KEY`;
            SCREEN_SHARING_SVC_ENCODINGS[0].scalabilityMode = svc;
        }
        this.dispatch = dispatch;
        this.token = token;
    }

    close() {
        if (this._closed)
            return;
        this._closed = true;
        this._protoo.close();

        if (this._sendTransport) this._sendTransport.close();
        if (this._recvTransport) this._recvTransport.close();
    }

    async _joinRoom() {
        try {
            // this._mediasoupDevice = new mediasoupClient.Device({
            //     handlerName: this._handlerName
            // });
            const routerRtpCapabilities = await this._protoo.request('getRouterRtpCapabilities');
            // await this._mediasoupDevice.load({ routerRtpCapabilities });
            {
                await this._device.load({ routerRtpCapabilities });
                await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                // const audioTrack = stream.getAudioTracks()[0];
                // audioTrack.enabled = false;
                // setTimeout(() => {audioTrack.stop()}, 120000);
            }
    
            if (this._produce) {
                const transportInfo = await this._protoo.request('createWebRtcTransport', {
                    // forceTcp: this._forceTcp,
                    producing: true,
                    consuming: false,
                    sctpCapabilities: this._device.sctpCapabilities
                });
                const {
                    id,
                    iceParameters, iceCandidates,
                    dtlsParameters, sctpParameters
                } = transportInfo;
                this._sendTransport = this._device.createSendTransport({
                    id,
                    iceParameters,
                    iceCandidates,
                    dtlsParameters,
                    sctpParameters,
                    // iceServers: [],
                    // proprietaryConstraints: PC_PROPRIETARY_CONSTRAINTS
                });
                this._sendTransport.on(
                    'connect', ({ dtlsParameters }, callback, errback) => {
                        this._protoo.request(
                            'connectWebRtcTransport', {
                            transportId: this._sendTransport.id,
                            dtlsParameters
                        }).then(callback).catch(errback);
                    });
                this._sendTransport.on(
                    'produce', async ({ kind, rtpParameters, appData }, callback, errback) => {
                        try {
                            const { id } = await this._protoo.request(
                                'produce', {
                                transportId: this._sendTransport.id,
                                kind,
                                rtpParameters,
                                appData
                            });
                            callback({ id });
                        }
                        catch (error) {
                            errback(error);
                        }
                    });
                this._sendTransport.on('producedata', async ({
                    sctpStreamParameters, label,
                    protocol, appData }, callback, errback) => {
                    try {
                        // eslint-disable-next-line no-shadow
                        const { id } = await this._protoo.request(
                            'produceData', {
                            transportId: this._sendTransport.id,
                            sctpStreamParameters,
                            label,
                            protocol,
                            appData
                        });
    
                        callback({ id });
                    }
                    catch (error) {
                        errback(error);
                    }
                });
            }
            if (this._consume) {
                const transportInfo = await this._protoo.request(
                    'createWebRtcTransport',
                    {
                        forceTcp: this._forceTcp,
                        producing: false,
                        consuming: true,
                        sctpCapabilities: this._useDataChannel
                        ? this._device.sctpCapabilities
                        : undefined
                    });
    
                const {
                    id,
                    iceParameters,
                    iceCandidates,
                    dtlsParameters,
                    sctpParameters
                } = transportInfo;
    
                this._recvTransport = this._device.createRecvTransport(
                    {
                        id,
                        iceParameters,
                        iceCandidates,
                        dtlsParameters,
                        sctpParameters,
                        // iceServers: []
                    });
                this._recvTransport.on(
                    'connect', ({ dtlsParameters }, callback, errback) => {
                        this._protoo.request(
                            'connectWebRtcTransport',
                            {
                                transportId: this._recvTransport.id,
                                dtlsParameters
                            })
                            .then(callback)
                            .catch(errback);
                    });
            }
    
            const { peers } = await this._protoo.request(
                'join', {
                displayName: this._displayName,
                device: this._device,
                rtpCapabilities: this._consume
                    ? this._device.rtpCapabilities
                    : undefined,
                sctpCapabilities: this._useDataChannel && this._consume
                    ? this._device.sctpCapabilities
                    : undefined
            });

            this.dispatch({
                type: 'UPDATE_PEER',
                ttype: 'listPeer',
                data: peers
            })

            if (this._produce) {
                this.enableMic();
                this.enableWebcam();
            }
        }
        catch(error) {
            this.close();
        }
    }

    async join() {
        const protooTransport = new protooClient.WebSocketTransport(this._protooUrl);
        this._protoo = new protooClient.Peer(protooTransport)
        this._protoo.on('open', () => {
            this._joinRoom()
        });
        this._protoo.on('failed', () => {
        });
        this._protoo.on('disconnected', () => {
            if (this._sendTransport) {
                this._sendTransport.close();
                this._sendTransport = null;
            }

            if (this._recvTransport) {
                this._recvTransport.close();
                this._recvTransport = null;
            }
        });
        this._protoo.on('close', () => {
            if (this._closed) return;
            this.close();
        });
        this._protoo.on('request', async (request, accept, reject) => {
            switch (request.method) {
                case 'newConsumer': {
                    if (!this._consume) {
                        reject(403, 'I do not want to consume');
                        break;
                    }
                    const {
                        peerId, producerId, id, kind,
                        rtpParameters, type, appData, producerPaused
                    } = request.data;

                    try {
                        const consumer = await this._recvTransport.consume({
                            id,
                            producerId,
                            kind,
                            rtpParameters,
                            appData: { 
                                ...appData, 
                                peerId 
                            }
                        });
                        this._consumers.set(consumer.id, consumer);
                        consumer.on('transportclose', () => {
                            this._consumers.delete(consumer.id);
                        }); 
                        
                        // let mediastream = new MediaStream();
                        // mediastream.addTrack(consumer.track);

                        const { spatialLayers, temporalLayers } = mediasoupClient.parseScalabilityMode(consumer.rtpParameters.encodings[0].scalabilityMode);
                        this.dispatch({
                            type: 'UPDATE_CONSUMER',
                            ttype: 'newConsumer',
                            data: [{
                                transport_id: consumer.id,
                                peer_id: peerId,
                                type: type,
                                locallyPaused: false,
                                remotelyPaused: producerPaused,
                                rtpParameters: consumer.rtpParameters,
                                spatialLayers: spatialLayers,
                                temporalLayers: temporalLayers,
                                preferredSpatialLayer: spatialLayers - 1,
                                preferredTemporalLayer: temporalLayers - 1,
                                priority: 1,
                                codec: consumer.rtpParameters.codecs[0].mimeType.split('/')[1],
                                track: consumer.track
                            }]
                        });
                        accept();
                    }
                    catch(error) {
                        // 
                    }
                    break;
                }
                default:
                    break;
            }
        });
        this._protoo.on('notification', (notification) => {
            switch (notification.method) {
                case 'newPeer': {
                    const peer = notification.data;
                    this.dispatch({
                        type: 'UPDATE_PEER',
                        ttype: 'newPeer',
                        data: [peer]
                    })
                    break;
                }
                case 'peerClosed': {
                    const { peerId } = notification.data;
                    this.dispatch({
                        type: 'UPDATE_PEER',
                        ttype: 'peerClosed',
                        data: peerId,
                    })
                    break;
                }
                case 'consumerClosed': {
                    const { consumerId } = notification.data;
                    const consumer = this._consumers.get(consumerId);
                    if (!consumer)
                        break;
                    consumer.close();
                    this._consumers.delete(consumerId);
                    const { peerId } = consumer.appData;
                    this.dispatch({
                        type: 'UPDATE_CONSUMER',
                        ttype: 'consumerClosed',
                        data: peerId
                    })
                    break;
                }
                case 'activeSpeaker': {
                    const { peerId } = notification.data;
                    this.dispatch({
                        type: 'UPDATE_ACTIVE_SPEAKER',
                        ttype: 'newActiveSpeaker',
                        data: peerId,
                    })
                    break;
                }
                default:
                    break;
            }
        });
    }

    async enableMic() {
        if (this._micProducer)
            return;

        if (!this._device.canProduce('audio')) {
            return;
        }

        let track;
        
        try {
            if (!this._externalVideo) {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                // const stream = await mediaDevices.getUserMedia({ audio: true });
                track = stream.getAudioTracks()[0];
            }
            else {
                const stream = await this._getExternalVideoStream();
                track = stream.getAudioTracks()[0].clone();
            }
            this._micProducer = await this._sendTransport.produce(
                {
                    track,
                    codecOptions:
                    {
                        opusStereo: 1,
                        opusDtx: 1
                    }
                });

            this.dispatch({
                type: 'UPDATE_PRODUCER',
                ttype: 'newProducer',
                data: [{
                    transport_id: this._micProducer.id,
                    paused: this._micProducer.paused,
                    track: this._micProducer.track,
                    rtpParameters: this._micProducer.rtpParameters,
                    codec: this._micProducer.rtpParameters.codecs[0].mimeType.split('/')[1]
                }]
            })

            this._micProducer.on('transportclose', () => {
                // 
                this._micProducer = null;
            });

            this._micProducer.on('trackended', () => {
                // 
                this.disableMic()
            });
        }
        catch (error) {
            if (track)
                track.stop();
        }
    }

    async disableMic() {
        // logger.debug('disableMic()');

        if (!this._micProducer)
            return;
        this._micProducer.close();

        // store.dispatch(
        // 	stateActions.removeProducer(this._micProducer.id));

        try {
            await this._protoo.request(
                'closeProducer', { producerId: this._micProducer.id });
        }
        catch (error) {
            // store.dispatch(requestActions.notify(
            // 	{
            // 		type : 'error',
            // 		text : `Error closing server-side mic Producer: ${error}`
            // 	}));
        }

        this._micProducer = null;
    }

    async muteMic() {
        // logger.debug('muteMic()');

        this._micProducer.pause();

        try {
            let muted = await this._protoo.request(
                'pauseProducer', { producerId: this._micProducer.id });
            if (muted === true) {
                this.dispatch({
                    type: 'UPDATE_PRODUCER',
                    ttype: 'muteMic',
                })
            }

            // store.dispatch(
            // 	stateActions.setProducerPaused(this._micProducer.id));
        }
        catch (error) {
            // logger.error('muteMic() | failed: %o', error);

            // store.dispatch(requestActions.notify(
            // 	{
            // 		type : 'error',
            // 		text : `Error pausing server-side mic Producer: ${error}`
            // 	}));
        }
    }

    async unmuteMic() {
        // logger.debug('unmuteMic()');

        this._micProducer.resume();

        try {
            let unmuted = await this._protoo.request(
                'resumeProducer', { producerId: this._micProducer.id });
            if (unmuted === true) {
                this.dispatch({
                    type: 'UPDATE_PRODUCER',
                    ttype: 'unmuteMic',
                })
            }
            // store.dispatch(
            // 	stateActions.setProducerResumed(this._micProducer.id));
        }
        catch (error) {
            // logger.error('unmuteMic() | failed: %o', error);

            // store.dispatch(requestActions.notify(
            // 	{
            // 		type : 'error',
            // 		text : `Error resuming server-side mic Producer: ${error}`
            // 	}));
        }
    }

    async enableWebcam() {
        if (this._webcamProducer)
            return;
        else if (this._shareProducer)
            await this.disableShare();
        if (!this._device.canProduce('video')) {
            // logger.error('enableWebcam() | cannot produce video');
            return;
        }
        // // 
        let track, device;
        try {
            if (!this._externalVideo) {
                await this._updateWebcams();
                device = this._webcam.device;
                const { resolution } = this._webcam;
                if (!device)
                    throw new Error('no webcam devices');
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                // const stream = await mediaDevices.getUserMedia({
                //     video: {
                //         mandatory: {
                //             minWidth: 500, // Provide your own width, height and frame rate here
                //             minHeight: 300,
                //             minFrameRate: 30
                //         },
                //         facingMode: 'user',
                //     },
                // });
                track = stream.getVideoTracks()[0];
            }
            else {
                device = { label: 'external video' };
                const stream = await this._getExternalVideoStream();
                track = stream.getVideoTracks()[0].clone();
            }

            let encodings;
            let codec;
            const codecOptions = {
                videoGoogleStartBitrate: 1000
            };

            if (this._forceH264) {
                codec = this._device.rtpCapabilities.codecs
                    .find((c) => c.mimeType.toLowerCase() === 'video/h264');
                if (!codec) {
                    throw new Error('desired H264 codec+configuration is not supported');
                }
            }
            else if (this._forceVP9) {
                codec = this._device.rtpCapabilities.codecs
                    .find((c) => c.mimeType.toLowerCase() === 'video/vp9');
                if (!codec) {
                    throw new Error('desired VP9 codec+configuration is not supported');
                }
            }

            if (this._useSimulcast) {
                const firstVideoCodec = this._device
                    .rtpCapabilities
                    .codecs
                    .find((c) => c.kind === 'video');
                if (
                    (this._forceVP9 && codec) ||
                    firstVideoCodec.mimeType.toLowerCase() === 'video/vp9'
                ) {
                    encodings = WEBCAM_KSVC_ENCODINGS;
                }
                else {
                    encodings = WEBCAM_SIMULCAST_ENCODINGS;
                }
            }
            this._webcamProducer = await this._sendTransport.produce({
                track, encodings,
                codecOptions, codec
            });
            this.dispatch({
                type: 'UPDATE_PRODUCER',
                ttype: 'newProducer',
                data: [{
                    transport_id: this._webcamProducer.id,
                    deviceLabel: device.label,
                    type: 'front',
                    paused: this._webcamProducer.paused,
                    track: this._webcamProducer.track,
                    rtpParameters: this._webcamProducer.rtpParameters,
                    codec: this._webcamProducer.rtpParameters.codecs[0].mimeType.split('/')[1]
                }]
            })

            this._webcamProducer.on('transportclose', () => {
                // 
                this._webcamProducer = null;
            });

            this._webcamProducer.on('trackended', () => {
                // 
                this.disableWebcam()
                    .catch(() => { });
            });
        }
        catch (error) {
            if (track)
                track.stop();
        }
    }

    async disableWebcam() {
        if (!this._webcamProducer)
            return;

        this._webcamProducer.close();

        // store.dispatch(
        // 	stateActions.removeProducer(this._webcamProducer.id));

        try {
            let closed = await this._protoo.request(
                'closeProducer', { producerId: this._webcamProducer.id });
            // // 
            if (closed) {
                this.dispatch({
                    type: 'UPDATE_PRODUCER',
                    ttype: 'disableWebcam',
                })
                // if (setStateCallMain) {
                //     await setStateCallMain('video', false)
                // }
            }
        }
        catch (error) {
            // store.dispatch(requestActions.notify(
            // 	{
            // 		type : 'error',
            // 		text : `Error closing server-side webcam Producer: ${error}`
            // 	}));
        }

        this._webcamProducer = null;
    }

    async _updateWebcams() {
        // logger.debug('_updateWebcams()');

        // Reset the list.
        this._webcams = new Map();

        // logger.debug('_updateWebcams() | calling enumerateDevices()');

        const devices = await navigator.mediaDevices.enumerateDevices();
        for (const device of devices) {
            if (device.kind !== 'videoinput')
                continue;

            this._webcams.set(device.deviceId, device);
        }

        const array = Array.from(this._webcams.values());
        const len = array.length;
        const currentWebcamId =
            this._webcam.device ? this._webcam.device.deviceId : undefined;

        // logger.debug('_updateWebcams() [webcams:%o]', array);

        if (len === 0)
            this._webcam.device = null;
        else if (!this._webcams.has(currentWebcamId))
            this._webcam.device = array[0];

        // store.dispatch(
        // 	stateActions.setCanChangeWebcam(this._webcams.size > 1));
    }

    async endCall() {
        this._protoo.close();
        // store.dispatch({
        //     type: 'UPDATE_VIDEO_CONFERENCE_STATE',
        //     data: {
        //         statusCode: 99,
        //         statusMessage: 'Cuộc gọi kết thúc',
        //     }
        // })
    }
}

export default RoomClient;