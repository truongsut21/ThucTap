import * as Action from '../controllers/actionTypes';
import * as BaseAction from '../../base/controllers/actionTypes';
import {
    forEach,
    orderBy, unionBy,
} from 'lodash';

const initialState = {
    listLastTimeFetch: {}, // new
    listFiles: {}, // new
    listMessageReactions: {}, // new
    listMessageStates: {}, // new
    pinMessages: {}, // new
    imageAvatars: {}, // new
    unfinishedMessages: {}, // new
    thumbnailContent: {}, // new
    pollAnswers: {},
    simpleMessages: {},
    fullMessages: {},
    simpleThreads: [],
    fullThreads: {},
    threadMembers: {},
    cacheGalleryImage: {},
    badgeCountTabChat: 0,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case Action.UPDATE_THREAD_LIST: {
            switch (action.ttype) {
                case 'fetch_init': {
                    let { simpleThreads, fullThreads } = action.data
                    simpleThreads = orderBy(simpleThreads, 'write_date', 'desc');
                    if (!simpleThreads || !fullThreads) return { ...state };
                    return {
                        ...state,
                        simpleThreads,
                        fullThreads
                    }
                }
                case 'create_draft_message': {
                    const { thread_id, write_date } = action.data;
                    let simpleThreads = [...state.simpleThreads];
                    let fullThreads = { ...state.fullThreads };

                    let i = simpleThreads.findIndex(t => t._id === thread_id);
                    if (i < 0) return { ...state };
                    simpleThreads[i] = {
                        ...simpleThreads[i],
                        write_date: write_date,
                    }
                    fullThreads[thread_id] = {
                        ...fullThreads[thread_id],
                        write_date: write_date
                    }
                    simpleThreads = orderBy(simpleThreads, 'write_date', 'desc');
                    return {
                        ...state,
                        simpleThreads,
                        fullThreads,
                    }
                }
                case 'receivenewmessage': {
                    const { thread_id, write_date } = action.data;
                    let simpleThreads = [...state.simpleThreads];
                    let fullThreads = { ...state.fullThreads };
                    i = simpleThreads.findIndex(e => e._id === thread_id)
                    if (i === -1) return { ...state };
                    simpleThreads[i] = { ...simpleThreads[i], write_date }
                    simpleThreads = orderBy(simpleThreads, 'write_date', 'desc');
                    fullThreads = {
                        ...fullThreads,
                        [thread_id]: {
                            ...fullThreads[thread_id],
                            write_date,
                        }
                    }
                    return {
                        ...state,
                        simpleThreads,
                        fullThreads,
                    }
                }
                case 'new_thread':
                case 'fetch_by_ids':
                case 'fetch_latest_thread_list':
                case 'change_thread_field':
                case 'change_thread_name':
                case 'change_avatar':
                case 'fetch_old': {
                    const { simpleThreads, fullThreads } = action.data;
                    if (!simpleThreads) return state;
                    let sThreads = [...state.simpleThreads];
                    let fThreads = { ...state.fullThreads };
                    sThreads = unionBy(simpleThreads, sThreads, '_id');
                    sThreads = orderBy(sThreads, 'write_date', 'desc');
                    fThreads = {
                        ...fThreads,
                        ...fullThreads
                    }
                    return {
                        ...state,
                        simpleThreads: sThreads,
                        fullThreads: fThreads
                    }
                }
                case 'delete_on_local': {
                    const { _id } = action.data;
                    if (!_id) return { ...state };
                    let simpleThreads = [...state.simpleThreads];
                    let fullThreads = { ...state.fullThreads };
                    let i = simpleThreads.findIndex(t => t._id === _id);
                    if (i < 0) return { ...state };
                    simpleThreads.splice(i, 1);
                    delete fullThreads[_id];
                    return {
                        ...state,
                        simpleThreads,
                        fullThreads,
                    }
                }
                case 'change_thread_notification': {
                    //case này khác với 1 bunch case phía trên là nếu thread chưa có trong máy thì
                    //ko nạp thông tin mới vào
                    const { simpleThreads, fullThreads } = action.data;
                    if (!simpleThreads || simpleThreads.length !== 1) return state;
                    const thread_id = simpleThreads[0]._id;
                    if (!state.fullThreads[thread_id]) return state;
                    let sThreads = [...state.simpleThreads];
                    let fThreads = { ...state.fullThreads };
                    sThreads = unionBy(simpleThreads, sThreads, '_id');
                    sThreads = orderBy(sThreads, 'write_date', 'desc');
                    fThreads = {
                        ...fThreads,
                        ...fullThreads
                    }
                    return {
                        ...state,
                        simpleThreads: sThreads,
                        fullThreads: fThreads
                    }
                }
                default: {
                    return { ...state }
                }
            }
        }
        case Action.UPDATE_THREAD_MEMBER: {
            const tM = state.threadMembers;
            const { threadMembers } = action.data;
            if (!threadMembers) return { ...state };
            let tMembers = { ...tM };
            forEach(threadMembers, (members, thread_id) => {
                if (tMembers[thread_id]) {
                    tMembers[thread_id] = {
                        ...tMembers[thread_id],
                        ...members
                    }
                } else {
                    tMembers = {
                        ...tMembers,
                        [thread_id]: members
                    }
                }
            })
            return {
                ...state,
                threadMembers: tMembers
            }
        }
        case Action.UPDATE_MESSAGE_STATE: {
            const lF = state.listMessageStates || {}
            switch (action.ttype) {
                case 'fetch_init': {
                    const { messageStates } = action.data
                    if (!messageStates) {
                        return {
                            ...state
                        }
                    };
                    return {
                        ...state,
                        listMessageStates: messageStates
                    }
                }
                default: {
                    const { messageStates } = action.data
                    if (!messageStates) break;
                    return {
                        ...state,
                        listMessageStates: { ...lF, ...messageStates }
                    }
                }
            }
        }
        case Action.UPDATE_MY_FILE: {
            const lF = state.listFiles || {};
            switch (action.ttype) {
                case 'add_file': {
                    let file = { ...action.data };
                    if (!file || Object.keys(file).length < 1) {
                        return {
                            ...state,
                        }
                    };
                    let lFiles = { ...lF };
                    if (lFiles) {
                        lFiles = { ...lFiles, ...file }
                    } else {
                        lFiles = { ...file };
                    }
                    return {
                        ...state,
                        listFiles: lFiles
                    }
                }
                case 'delete_file': {
                    let lFiles = { ...lF };
                    const { _id } = action.data;
                    delete lFiles[`${_id}`];
                    delete lFiles[`${_id}_lowprofile`];
                    delete lFiles[`${_id}_highprofile`];
                    delete lFiles[`${_id}_file`];
                    return {
                        ...state,
                        listFiles: lFiles
                    }
                }
                case 'clear': {
                    return {
                        ...state,
                        listFiles: {}
                    }
                }
                default:
                    return {
                        ...state,
                    }
            }
        }
        case Action.UPDATE_MESSAGE_REACTION: {
            const lMR = state.listMessageReactions || {}
            switch (action.ttype) {
                case 'fetchInit': {
                    const { messageReactions } = action.data
                    if (messageReactions) return true;
                    return {
                        ...state,
                        listMessageReactions: messageReactions
                    }
                }
                default: {
                    const { messageReactions } = action.data;
                    if (!messageReactions) return { ...state }
                    let lMReactions = { ...lMR };
                    forEach(messageReactions, (data, message_id) => {
                        if (lMReactions[message_id]) {
                            lMReactions[message_id] = {
                                ...lMReactions[message_id],
                                ...data
                            }
                        } else {
                            lMReactions = {
                                ...lMReactions,
                                [message_id]: { ...data }
                            }
                        }
                    })
                    return {
                        ...state,
                        listMessageReactions: lMReactions
                    }
                }
            }
        }
        case Action.UPDATE_DOWNLOAD_AVATAR: {
            const iA = state.imageAvatars;
            switch (action.ttype) {
                case 'add': {
                    let data = { ...action.data };
                    return {
                        ...state,
                        imageAvatars: { ...iA, ...data }
                    }
                }
                case 'delete': {
                    let iAvatar = { ...iA };
                    let { cloudLink } = action.data;
                    delete iAvatar[cloudLink];
                    return {
                        ...state,
                        imageAvatars: { ...iAvatar }
                    }
                }
                case 'clear': {
                    return {
                        ...state,
                        imageAvatars: {}
                    }
                }
                default: {
                    return { ...state }
                }
            }
        }
        // case 'UPDATE_IMAGE_LIST':
        //     {
        //         return {
        //             ...state,
        //             myImageList: action.data,
        //         }
        //     }
        case Action.UPDATE_LAST_TIME_FETCH: {
            const lTF = state.listLastTimeFetch
            switch (action.ttype) {
                case 'clear': {
                    return {
                        ...state,
                        listLastTimeFetch: {}
                    }
                }
                default: {
                    return {
                        ...state,
                        listLastTimeFetch: {
                            ...lTF, ...action.data
                        }
                    }
                }
            }
        }
        case Action.UPDATE_PIN_MESSAGE_SUCCESS:
            {
                return {
                    ...state,
                    pinMessages: action.data
                    // {
                    //     ...state.pinMessages,
                    //     [action.belong_to_user_id]: action.data,
                    // }
                }
            }
            case Action.UPDATE_UNFINISHED_SEND_MESSAGE_SUCCESS:
                {
                    return {
                        ...state,
                        unfinishedMessages: action.data
                        //  {
                        //     ...state.unfinishedMessages,
                        //     [action.belong_to_user_id]: action.data,
                        // }
                    }
                }
        // case Action.UPDATE_LAST_TIME_FETCH_SUCCESS:
        //     {
        //         return {
        //             ...state,
        //             listLastTimeFetch: action.data
        //         }
        //     }
        case Action.UPDATE_PIN_MESSAGE: {
            let pM = { ...state.pinMessages };
            switch (action.ttype) {
                case 'fetch':
                    case 'change_pin_message': {
                        const { pinMessages } = action.data;
                        if (!pinMessages) return state;
                        let thread_ids = Object.keys(pinMessages);
                        thread_ids.forEach((tid, index) => {
                            if (pM[tid]) {
                               if(pinMessages[tid]){
                                let thread_idss = Object.keys(pinMessages[tid]);
                                thread_idss.forEach((tids, indexs) => {
                                    if(!pinMessages[tid][tids]){
                                         delete pM[tid][tids]
                                    }
                                }) 
                               }
                                pM[tid] = {
                                    ...pM[tid],
                                    ...pinMessages[tid]
                                }
                            } else {
                                            pM[tid] = pinMessages[tid];
                                        }
                        })
                        return {
                            ...state,
                            pinMessages: pM
                        }
                    }
                default: {
                    return state;
                }
            }
        }
        case Action.UPDATE_THUMNAIL_CONTENT_SUCCESS: {
            return {
                ...state,
                thumbnailContent: action.data
            }
        }
        case Action.UPDATE_MESSAGE: {
            switch (action.ttype) {
                case 'fetch_init': {
                    const { simpleMessages, fullMessages } = action.data
                    if (!simpleMessages || !fullMessages) return { ...state };
                    return {
                        ...state,
                        simpleMessages,
                        fullMessages
                    }
                }
                case 'fetchmessage': {
                    const { simpleMessages, fullMessages } = action.data;
                    if (!simpleMessages || !fullMessages) return { ...state };
                    let sMessages = { ...state.simpleMessages };
                    let fMessages = { ...state.fullMessages, ...fullMessages }
                    forEach(simpleMessages, (msgs, thread_id) => {
                        if (sMessages[thread_id]) {
                            sMessages[thread_id] = unionBy(msgs, sMessages[thread_id], '_id');
                            sMessages[thread_id] = orderBy(sMessages[thread_id], ['create_date'], ['desc']);
                        }
                        else {
                            sMessages[thread_id] = orderBy(msgs, ['create_date'], ['desc']);
                        }
                    });
                    return {
                        ...state,
                        simpleMessages: sMessages,
                        fullMessages: fMessages
                    }
                }
                case 'draft': {
                    const newMessage = { ...action.data };
                    let sMessages = { ...state.simpleMessages };
                    let fMessages = { ...state.fullMessages, [newMessage._id]: newMessage }
                    if (sMessages[newMessage.thread_id]) {
                        sMessages[newMessage.thread_id].unshift({
                            _id: newMessage._id,
                            draft_id: newMessage._id,
                            create_date: newMessage.create_date,
                        });
                    } else {
                        sMessages[newMessage.thread_id] = [{
                            _id: newMessage._id,
                            draft_id: newMessage._id,
                            create_date: newMessage.create_date
                        }];
                    }

                    return {
                        ...state,
                        simpleMessages: sMessages,
                        fullMessages: fMessages
                    }
                }
                case 'ihavesentmessage': {
                    const newMessage = { ...action.data }
                    let sMessages = { ...state.simpleMessages };
                    let fMessages = { ...state.fullMessages, [newMessage._id]: newMessage }
                    delete fMessages[newMessage.draft_id]; // xoa message cũ ở dạng draft
                    let cloneMessageOfThread = [...sMessages[newMessage.thread_id]];
                    let i = cloneMessageOfThread.findIndex(m => m.draft_id === newMessage.draft_id);
                    if (i > -1 && newMessage.draft_id) {   //vi contact, poll thi khong co draft_id
                        cloneMessageOfThread[i] = {
                            ...cloneMessageOfThread[i],
                            _id: newMessage._id,
                            draft_id: newMessage.draft_id,
                            create_date: newMessage.create_date
                        }
                    } else {
                        cloneMessageOfThread.unshift({
                            _id: newMessage._id,
                            draft_id: newMessage.draft_id,
                            create_date: newMessage.create_date
                        })
                    }
                    sMessages[newMessage.thread_id] = [...cloneMessageOfThread];
                    return {
                        ...state,
                        simpleMessages: sMessages,
                        fullMessages: fMessages
                    }
                }
                case 'receivenewmessage': {
                    const newMessage = { ...action.data }
                    let sMessages = { ...state.simpleMessages };
                    let fMessages = { ...state.fullMessages }
                    if (fMessages[newMessage._id]) return state; //message bị bắn socket lần thứ n
                    fMessages = { ...fMessages, [newMessage._id]: newMessage }
                    if (sMessages[newMessage.thread_id]) {
                        sMessages[newMessage.thread_id].unshift({
                            _id: newMessage._id,
                            draft_id: newMessage.draft_id,
                            create_date: newMessage.create_date
                        })
                    } else {
                        sMessages[newMessage.thread_id] = [{
                            _id: newMessage._id,
                            draft_id: newMessage.draft_id,
                            create_date: newMessage.create_date
                        }]
                    }
                    return {
                        ...state,
                        simpleMessages: sMessages,
                        fullMessages: fMessages
                    }
                }
                case 'deletemessage': {
                    const { thread_id, message_id } = action.data;
                    if (!thread_id || !message_id) return { ...state };
                    let sMessages = { ...state.simpleMessages };
                    let fMessages = { ...state.fullMessages };
                    if (!sMessages[thread_id]) return { ...state };

                    if (fMessages[message_id]) {
                        fMessages[message_id] = {
                            ...fMessages[message_id],
                            is_removed: true
                        }
                    }
                    Object.values(fMessages).forEach(m => {
                        if (m.parent_id && m.parent_id._id === message_id) {
                            fMessages[message_id] = {
                                ...fMessages[message_id],
                                parent_id: {
                                    ...fMessages[message_id].parent_id,
                                    is_removed: true
                                }
                            }
                        }
                    })
                    return {
                        ...state,
                        simpleMessages: sMessages,
                        fullMessages: fMessages
                    }
                }
                case 'delete_thread': {
                    const { thread_id } = action.data;
                    if (!thread_id) break;
                    let sMessages = { ...state.simpleMessages };
                    let fMessages = { ...state.fullMessages };
                    Object.values(fMessages).forEach(m => {
                        if (m.thread_id === thread_id) {
                            delete fMessages[m._id];
                        }
                    })
                    delete sMessages[thread_id];
                    return {
                        ...state,
                        simpleMessages: sMessages,
                        fullMessages: fMessages
                    }
                }
                case 'sent_failed': {
                    const { _id, thread_id, errorMessage } = action.data;
                    let sMessages = { ...state.simpleMessages };
                    let fMessages = { ...state.fullMessages };
                    fMessages[_id] = {
                        ...fMessages[_id],
                        errorMessage: true
                    }
                    return {
                        ...state,
                        simpleMessages: sMessages,
                        fullMessages: fMessages
                    }
                }
                case 'sent_failed_image_in_image_group': {
                    const { _id, thread_id, image_id } = action.data;
                    let sMessages = { ...state.simpleMessages };
                    let fMessages = { ...state.fullMessages };
                    let i = fMessages[_id].content.findIndex(f => f._id === image_id);
                    if (i < 0) return { ...state }
                    let content = [...fMessages[_id].content];
                    content[i] = {
                        ...content[i],
                        error: true
                    }
                    fMessages[_id] = {
                        ...fMessages[_id],
                        content: [...content]
                    }
                    return {
                        ...state,
                        simpleMessages: sMessages,
                        fullMessages: fMessages
                    }
                }
                case 'upload_done_image_in_image_group': {
                    const { _id, thread_id, image_id, newContent } = action.data;
                    let sMessages = { ...state.simpleMessages };
                    let fMessages = { ...state.fullMessages };
                    let i = fMessages[_id].content.findIndex(f => f._id === image_id);
                    if (i === -1) return { ...state };
                    let content = [...fMessages[_id].content];
                    content[i] = {
                        ...content[i],
                        ...newContent,
                        successUpload: true
                    }
                    fMessages[_id] = {
                        ...fMessages[_id],
                        content: [...content]
                    }
                    return {
                        ...state,
                        simpleMessages: sMessages,
                        fullMessages: fMessages
                    }
                }
                case 'change_poll': {
                    const { updatedMessage } = action.data;
                    if (!updatedMessage) return { ...state }
                    let sMessages = { ...state.simpleMessages };
                    let fMessages = { ...state.fullMessages, [updatedMessage._id]: updatedMessage };
                    sMessages[updatedMessage.thread_id] = unionBy(
                        [{ _id: updatedMessage._id, create_date: updatedMessage.create_date }],
                        sMessages[updatedMessage.thread_id], '_id'
                    );
                    sMessages[updatedMessage.thread_id] = orderBy(sMessages[updatedMessage.thread_id], 'create_date', 'desc');
                    return {
                        ...state,
                        simpleMessages: sMessages,
                        fullMessages: fMessages
                    }
                }
                case 'remove_message_due_to_duplicate_draft_id': {
                    const { thread_id, draft_id } = action.data;
                    if (!thread_id || !draft_id) return { ...state };
                    let sMessages = { ...state.simpleMessages };
                    let fMessages = { ...state.fullMessages };
                    if (!sMessages[thread_id]) return { ...state };

                    if (fMessages[draft_id]) {
                        delete fMessages[draft_id];
                    }
                    let i = sMessages[thread_id].findIndex(m => m._id === draft_id);
                    if (i > -1) {
                        sMessages[thread_id].splice(i, 1);
                    }
                    return {
                        ...state,
                        simpleMessages: sMessages,
                        fullMessages: fMessages
                    }
                }
                default: {
                    return state;
                }
            }

        }
        case Action.UPDATE_CACHE_IMAGE_GALLERY: {
            let cGI = { ...state.cacheGalleryImage }
            switch (action.ttype) {
                case 'add': {
                    const data = { ...action.data };
                    if (!data) break;
                    cGI = { ...cGI, ...data }
                    return {
                        ...state,
                        cacheGalleryImage: cGI
                    }
                }
                case 'add_multi': {
                    const { datas } = action.data;
                    if (!datas) return state;
                    return {
                        ...state,
                        cacheGalleryImage: {
                            ...cGI,
                            ...datas
                        }
                    }
                }
                case 'remove': {
                    const { url } = action.data;
                    if (!url) break;
                    delete cGI[url];
                    return {
                        ...state,
                        cacheGalleryImage: cGI
                    }
                }
                default: {
                    return { ...state }
                }
            }
        }
        case Action.UPDATE_POLL_ANSWER_RESULT: {
            switch (action.ttype) {
                case 'fetch': {
                    let pA = { ...state.pollAnswers };
                    const { pollAnswers } = action.data;
                    if (!pollAnswers) return { ...state }
                    return {
                        ...state,
                        pollAnswers: {
                            ...pA,
                            ...pollAnswers
                        }
                    }
                }
                case 'answer': {
                    let pA = { ...state.pollAnswers };
                    const { user_id, message_id, answer_ids } = action.data;
                    //xóa hết những answer mà user_id đã lựa chọn từ trước
                    if (pA[message_id]) {
                        forEach(pA[message_id], (users, choice_id) => {
                            if (users[user_id]) {
                                delete pA[message_id][choice_id][user_id];
                            }
                        })
                    }
                    //Cập nhật answer mới
                    answer_ids.forEach(cid => {
                        if (pA[message_id]) {
                            pA[message_id][cid] = {
                                ...pA[message_id][cid], //pA[message_id][cid] nếu là null thì vẫn sẽ extract empty nên ko bug
                                [user_id]: true
                            }
                        } else {
                            pA[message_id] = {
                                [cid]: { [user_id]: true }
                            }
                        }
                    })
                    return {
                        ...state,
                        pollAnswers: pA
                    }
                }
                default: {
                    return { ...state }
                }
            }
        }
        case Action.UPDATE_UNFINISHED_SEND_MESSAGE: {
            switch (action.ttype) {
                case 'add': {
                    const { _id } = action.data;
                    if (!_id) return { ...state }
                    return {
                        ...state,
                        unfinishedMessages: { ...state.unfinishedMessages, [_id]: true }
                    }
                }
                case 'remove': {
                    const { _id, _ids } = action.data;
                    if (!_id && !_ids) return { ...state }
                    let uFM = { ...state.unfinishedMessages };
                    if (_id) {
                        delete uFM[_id]
                    } else if (_ids) {
                        _ids.forEach(id => {
                            delete uFM[id];
                        })
                    }
                    return {
                        ...state,
                        unfinishedMessages: uFM
                    }
                }
                default: {
                    return { ...state }
                }
            }
        }
        case Action.UPDATE_TAB_CHAT_BADGE_COUNT: {
            return {
                ...state,
                badgeCountTabChat: Number.isNaN(action.data) ? 0 : action.data
            }
        }
        case BaseAction.CLEAR_ALL_DATA: {
            return {
                ...state,
                listLastTimeFetch: {},
                listFiles: {},
                listMessageReactions: {},
                listMessageStates: {},
                pinMessages: {},
                imageAvatars: {},
                unfinishedMessages: {},
                thumbnailContent: {},
                pollAnswers: {},
                simpleMessages: {},
                fullMessages: {},
                simpleThreads: [],
                fullThreads: {},
                threadMembers: {},
                cacheGalleryImage: {},
                badgeCountTabChat: 0,
            }
        }
        default:
            return state
    }
}