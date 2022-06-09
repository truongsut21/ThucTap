import * as Action from '../controllers/actionTypes';
import * as BaseAction from '../../base/controllers/actionTypes';

const initialState = {
    myThreadTypers: {},
    myOnlineUser: {},
    activeSticker: 'cat',
    stickerTypes: [],
    activeThreadId: '',
    activeMessage: '',
    forwardMessage: '',
    maxThreadToShow: 20,
    maxContactToShow: 20,
    maxMessageToShow: 20,
    willAnimateMessage: {},
    willAnimateReaction: {},
    fileUpDownloadProgress: {},
    draftInputtingContent: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_ONLINE_USER_SUCCESS':
            return {
                ...state,
                myOnlineUser: action.data,
            }
        case Action.UPDATE_REPLYING_MESSAGE:
            return {
                ...state,
                activeMessage: action.data
            }
        case 'UPDATE_FORWARD_MESSAGE':
            return {
                ...state,
                forwardMessage: action.data
            }
        case Action.UPDATE_ACTIVE_STICKER:
            return {
                ...state,
                activeSticker: action.data,
            }
        case Action.UPDATE_LIST_STICKER_TYPE:
            return {
                ...state,
                stickerTypes: action.data
            }
        case Action.UPDATE_MAX_MESSAGE_TO_SHOW:
            const newMax = !isNaN(action.data) ? parseInt(action.data) : 20;
            return {
                ...state,
                maxMessageToShow: newMax
            }
        case Action.UPDATE_MAX_CONTACT_TO_SHOW:
            return {
                ...state,
                maxContactToShow: !isNaN(action.data) ? parseInt(action.data) : 20
            }
        case Action.UPDATE_MAX_THREAD_TO_SHOW:
            return {
                ...state,
                maxThreadToShow: !isNaN(action.data) ? parseInt(action.data) : 20,
            }
        case Action.DOING_ANIMATE_MESSAGE: {
            const wAM = state.willAnimateMessage;
            switch (action.ttype) {
                case 'add': {
                    const { _ids } = action.data;
                    if (!_ids) return state;
                    return {
                        ...state,
                        willAnimateMessage: { ...wAM, ..._ids }
                    }
                }
                default: {
                    return { ...state, willAnimateMessage: {} }
                }
            }
        }
        case Action.UPDATE_ANIMATE_MESSAGE_REACTION_SUCCESS:
            return {
                ...state,
                willAnimateReaction: action.data
            }
        case Action.UPDATE_ACTIVE_THREAD:
            return {
                ...state,
                activeThreadId: action.data,
            }
        case Action.UPDATE_FILE_UP_DOWNLOAD_PROGRESS: {
            const fUDP = state.fileUpDownloadProgress;
            if (action.data && action.data._id) {
                return {
                    ...state, fileUpDownloadProgress: {
                        ...fUDP,
                        [action.data._id]: Number.isNaN(action.data.percent) ? 0 : Number(action.data.percent)
                    }
                }
            }
            return { ...state }
        }
        case Action.UPDATE_INPUTTING_CONTENT: {
            let dIC = { ...state.draftInputtingContent };
            switch (action.ttype) {
                case 'save': {
                    let { data = {} } = action;
                    let { thread_id, content } = data;
                    if (!thread_id || !content) {
                        return { ...state };
                    }
                    return { ...state, draftInputtingContent: { ...dIC, [thread_id]: content } }
                }
                case 'remove': {
                    let { data = {} } = action;
                    let { thread_id } = data;
                    if (!thread_id) {
                        return { ...state };
                    }
                    delete dIC[thread_id];
                    return { ...state, draftInputtingContent: { ...dIC } }
                }
                default: {
                    return state;
                }
            }
        }
        case Action.UPDATE_THREAD_TYPER: {
            switch (action.ttype) {
                case 'add': {
                    const { myThreadTypers } = action.data;
                    if (!myThreadTypers) return state;
                    const thread_id = Object.keys(myThreadTypers)[0];
                    let Typers = { ...state.myThreadTypers };

                    if (Typers[thread_id] && Object.keys(Typers[thread_id]).length >= 2) {
                        return state;   //có 2 người đang gõ thì ko thêm vào nữa
                    }
                    if (Typers[thread_id]) {
                        Typers[thread_id] = {
                            ...Typers[thread_id],
                            ...myThreadTypers[thread_id]
                        }
                    } else {
                        Typers = {
                            ...Typers,
                            ...myThreadTypers,
                        }
                    }
                    return {
                        ...state,
                        myThreadTypers: Typers
                    }
                }
                case 'delete': {
                    const { myThreadTypers } = action.data;
                    if (!myThreadTypers) return state;
                    const thread_id = Object.keys(myThreadTypers)[0];
                    const user_id = Object.keys(myThreadTypers[thread_id])[0];
                    let Typers = { ...state.myThreadTypers }
                    if (Typers[thread_id] && Typers[thread_id][user_id]) {
                        //Ngắt vùng nhớ để có thể delete được object đa tầng
                        Typers[thread_id] = {
                            ...Typers[thread_id],
                            [user_id]: { ...Typers[thread_id][user_id] }
                        }
                        delete Typers[thread_id][user_id]
                    }
                    return {
                        ...state,
                        myThreadTypers: Typers,
                    }
                }
                default: {
                    return {
                        ...state,
                        myThreadTypers: {}
                    };
                }
            }
        }
        case BaseAction.CLEAR_ALL_DATA: {
            return {
                ...state,
                myThreadTypers: {},
                myOnlineUser: {},
                activeSticker: 'cat',
                stickerTypes: [],
                activeThreadId: '',
                activeMessage: '',
                forwardMessage: '',
                maxThreadToShow: 20,
                maxContactToShow: 20,
                maxMessageToShow: 20,
                willAnimateMessage: {},
                willAnimateReaction: {},
                fileUpDownloadProgress: {},
                draftInputtingContent: {},
            }
        }
        default:
            return state
    }
}