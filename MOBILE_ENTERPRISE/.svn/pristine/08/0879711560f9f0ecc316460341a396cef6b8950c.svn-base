const initialState = {
    myProducer: [],
    myConsumer: [],
    myPeer: [],
    activeSpeaker: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PRODUCER_SUCCESS':
            return {
                ...state,
                myProducer: action.data,
            }
        case 'UPDATE_CONSUMER_SUCCESS':
            return {
                ...state,
                myConsumer: action.data,
            }
        case 'UPDATE_PEER_SUCCESS':
            return {
                ...state,
                myPeer: action.data,
            }
        case 'UPDATE_ACTIVE_SPEAKER_SUCCESS':
            return {
                ...state,
                activeSpeaker: action.data
            }
        default: 
            return state;
    }
}