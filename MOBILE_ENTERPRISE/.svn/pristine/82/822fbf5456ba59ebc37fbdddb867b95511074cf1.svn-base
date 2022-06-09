import {
    takeLeading, call, put, select, takeEvery,
    take, all, fork, delay, spawn, takeLatest
} from 'redux-saga/effects';
import { InteractionManager, Platform } from 'react-native';
import _, {
    cloneDeep, forEach, isEmpty, orderBy, maxBy,
    union, unionBy, unionWith, uniqBy, without, omit
} from 'lodash';
import * as Action from './actionTypes';
import eventEmitter, { WorkerChatToDo } from './utils';

export function* watcherMessages() {
    // yield takeEvery(Action.UPDATE_MESSAGE, workerUpdateMessage);
}


// export function* workerUpdateMessage(action) {

//     try {
//         const sM = yield select(state => state.ChatStoredReducer.simpleMessages);
//         const fM = yield select(state => state.ChatStoredReducer.fullMessages);
//         switch (action.ttype) {
//             case 'fetch_init': {
//                 const { simpleMessages, fullMessages } = action.data
//                 if (!simpleMessages || !fullMessages) break;
//                 yield put({
//                     type: Action.UPDATE_MESSAGE_SUCCESS,
//                     data: {
//                         simpleMessages,
//                         fullMessages
//                     }
//                 })
//             }
//             case 'fetchmessage': {
//                 const { simpleMessages, fullMessages } = action.data;
//                 if (!simpleMessages || !fullMessages) break;
//                 let sMessages = { ...sM };
//                 let fMessages = { ...fM, ...fullMessages };
//                 forEach(simpleMessages, (msgs, thread_id) => {
//                     if (sMessages[thread_id]) {
//                         sMessages[thread_id] = unionBy(msgs, sMessages[thread_id], '_id');
//                         sMessages[thread_id] = orderBy(sMessages[thread_id], ['create_date'], ['desc']);
//                     } else {
//                         sMessages[thread_id] = orderBy(msgs, ['create_date'], ['desc']);
//                     }
//                 })
//                 yield put({
//                     type: Action.UPDATE_MESSAGE_SUCCESS,
//                     data: {
//                         simpleMessages: sMessages,
//                         fullMessages: fMessages
//                     },
//                 })
//                 break;
//             }
//             case 'draft': {
//                 if (!action.data) break;
//                 const data = { ...action.data };
//                 let sMessages = { ...sM };
//                 let fMessages = { ...fM, [data._id]: data };
//                 if (sMessages[data.thread_id]) {
//                     sMessages[data.thread_id].unshift({
//                         _id: data._id,
//                         draft_id: data._id,
//                         create_date: data.create_date,
//                     });
//                 } else {
//                     sMessages[data.thread_id] = [{
//                         _id: data._id,
//                         draft_id: data._id,
//                         create_date: data.create_date
//                     }];
//                 }
//                 yield put({
//                     type: Action.UPDATE_MESSAGE_SUCCESS,
//                     data: {
//                         simpleMessages: sMessages,
//                         fullMessages: fMessages
//                     },
//                 })
//                 eventEmitter.emit('i_have_sent_message');
//                 break;
//             }
//             case 'delete_on_local':
//             case 'leavethread': {
//                 const { thread_id } = action.data;
//                 if (!thread_id) break;
//                 let sMessages = { ...sM };
//                 let fMessages = { ...fM };
//                 fMessages[thread_id].forEach(m => {
//                     delete fMessages[m._id];
//                 })
//                 delete sMessages[thread_id]
//                 yield put({
//                     type: Action.UPDATE_MESSAGE_SUCCESS,
//                     data: {
//                         simpleMessages: sMessages,
//                         fullMessages: fMessages
//                     },
//                 })
//                 break;
//             }
//             case 'ihavesentmessage': {
//                 if (isEmpty(action.data)) break;
//                 const data = action.data;
//                 const newMessage = { ...data }
//                 const { thread_id } = newMessage;
//                 let sMessages = { ...sM };
//                 let fMessages = { ...fM, [newMessage._id]: { ...newMessage } }

//                 delete fMessages[newMessage.draft_id]; // xoa sms nhap
//                 let cloneSMsByThreadId = [...sMessages[thread_id]]
//                 let i = cloneSMsByThreadId.findIndex(m => m.draft_id === newMessage.draft_id)
//                 if (i > -1) {
//                     cloneSMsByThreadId[i] = {
//                         ...cloneSMsByThreadId[i],
//                         _id: newMessage._id,
//                         draft_id: newMessage.draft_id,
//                         create_date: newMessage.create_date
//                     }
//                 } else {
//                     cloneSMsByThreadId.unshift({
//                         _id: newMessage._id,
//                         draft_id: newMessage.draft_id,
//                         create_date: newMessage.create_date
//                     })
//                 }
//                 sMessages[thread_id] = [...cloneSMsByThreadId];
//                 yield put({
//                     type: Action.UPDATE_MESSAGE_SUCCESS,
//                     data: {
//                         simpleMessages: sMessages,
//                         fullMessages: fMessages
//                     },
//                 })
//                 break;
//             }
//             case 'receivenewmessage': {
//                 if (isEmpty(action.data)) break;
//                 const data = action.data;
//                 const { thread_id } = data;
//                 let sMessages = { ...sM };
//                 let fMessages = { ...fM, [data._id]: { ...data } };

//                 if (!sMessages[thread_id]) break;

//                 sMessages[thread_id] = unionBy([{
//                     _id: data._id,
//                     draft_id: data.draft_id,
//                     create_date: data.create_date
//                 }], sMessages[thread_id], '_id');

//                 yield put({
//                     type: Action.UPDATE_MESSAGE_SUCCESS,
//                     data: {
//                         simpleMessages: sMessages,
//                         fullMessages: fMessages
//                     },
//                 })
//                 break;
//             }
//             case 'deletemessage': {
//                 const { thread_id, message_id } = action.data;
//                 if (!thread_id || !message_id) break;
//                 let sMessages = { ...sM };
//                 let fMessages = { ...fM };

//                 if (!sMessages[thread_id]) break;

//                 fMessages[message_id] = {
//                     ...fMessages[message_id],
//                     is_removed: true
//                 };
//                 Object.values(fMessages).forEach(m => {
//                     if (m.parent_message_id && m.parent_message_id._id === message_id) {
//                         fMessages[message_id] = {
//                             ...fMessages[message_id],
//                             parent_message_id: {
//                                 ...fMessages[message_id].parent_message_id,
//                                 is_removed: true
//                             }
//                         }
//                     }
//                 })

//                 yield put({
//                     type: Action.UPDATE_MESSAGE_SUCCESS,
//                     data: {
//                         simpleMessages: sMessages,
//                         fullMessages: fMessages
//                     },
//                 })
//                 break;
//             }
//             // case 'fakedoneupload_singlefile_of_imagegroup': {
//             //     if (isEmpty(action.data)) break;
//             //     const { message_id, thread_id, file_id, fileContent } = action.data;
//             //     let sMessages = { ...sM };
//             //     let fMessages = { ...fM };

//             //     let i = fMessages[message_id].content.findIndex(f => f._id === file_id);
//             //     if (i === -1) break;
//             //     let content = [...fMessages[message_id].content];
//             //     content[i] = {
//             //         ...content[i],
//             //         singleImageToUpload: fileContent.singleImageToUpload,
//             //         uri: fileContent.uri,
//             //     }
//             //     fMessages[message_id] = {
//             //         ...fMessages[message_id],
//             //         content: [...content]
//             //     }

//             //     yield put({
//             //         type: Action.UPDATE_MESSAGE_SUCCESS,
//             //         data: {
//             //             simpleMessages: sMessages,
//             //             fullMessages: fMessages
//             //         },
//             //     })
//             //     break;
//             // }
//             case 'sent_failed': {
//                 if (isEmpty(action.data)) break;
//                 const { _id, thread_id, errorMessage } = action.data;
//                 let sMessages = { ...sM };
//                 let fMessages = { ...fM };
//                 fMessages[_id] = {
//                     ...fMessages[_id],
//                     errorMessage: errorMessage ? errorMessage : 'Lỗi'
//                 }
//                 yield put({
//                     type: Action.UPDATE_MESSAGE_SUCCESS,
//                     data: {
//                         simpleMessages: sMessages,
//                         fullMessages: fMessages
//                     },
//                 })
//                 break;
//             }
//             case 'cancel_upload_singlefile_of_imagegroup': {
//                 if (isEmpty(action.data)) break;
//                 if (action.data.fileContent.cancelTokenSource) {
//                     action.data.fileContent.cancelTokenSource.cancel();
//                 }
//                 yield put({
//                     type: Action.UPDATE_MESSAGE,
//                     ttype: 'upload_failed_singlefile_of_imagegroup',
//                     data: {
//                         _id: action.data._id,
//                         thread_id: action.data.thread_id,
//                         image_id: action.data.fileContent._id
//                     },
//                 })
//                 break;
//             }
//             case 'upload_failed_singlefile_of_imagegroup': {
//                 if (isEmpty(action.data)) break;

//                 const { _id, thread_id, image_id } = action.data;
//                 let sMessages = { ...sM };
//                 let fMessages = { ...fM };

//                 let i = fMessages[_id].content.findIndex(f => f._id === image_id);
//                 if (i === -1) break;
//                 let content = [...fMessages[_id].content];
//                 content.splice(i, 1);
//                 fMessages[_id] = {
//                     ...fMessages[_id],
//                     content: [...content]
//                 }

//                 yield put({
//                     type: Action.UPDATE_MESSAGE_SUCCESS,
//                     data: {
//                         simpleMessages: sMessages,
//                         fullMessages: fMessages
//                     },
//                 })
//                 break;
//             }
//             case 'doneupload_singlefile_of_imagegroup': {
//                 if (isEmpty(action.data)) break;
//                 const { _id, thread_id, image_id, newContent } = action.data;
//                 let sMessages = { ...sM };
//                 let fMessages = { ...fM };

//                 let i = fMessages[_id].content.findIndex(f => f._id === image_id);
//                 if (i === -1) break;
//                 let content = [...fMessages[_id].content];
//                 content[i] = {
//                     ...content[i],
//                     ...newContent,
//                     successUpload: true
//                 }
//                 fMessages[_id] = {
//                     ...fMessages[_id],
//                     content: [...content]
//                 }
//                 //Có thể nếu dùng yield put ở đây sẽ ko nhảy xuống dưới được
//                 //Chỉ là cẩn thận dùng dispatch
//                 yield put({
//                     type: Action.UPDATE_MESSAGE_SUCCESS,
//                     data: {
//                         simpleMessages: sMessages,
//                         fullMessages: fMessages,
//                     },
//                 })
//                 const toUploads = fMessages[_id].content.length;
//                 const doneUploads = fMessages[_id].content.filter(f => f.successUpload).length;
//                 if (toUploads === doneUploads && doneUploads > 0) {
//                     yield put({
//                         type: Action.API_SEND_MESSAGE,
//                         data: fMessages[_id],
//                         dispatch: action.dispatch
//                     })
//                 }
//             }
//             case 'someone_answer_poll': {
//                 const { message_id, thread_id } = action.data;
//                 let sMessages = { ...sM };
//                 let fMessages = { ...fM };

//                 let i = sMessages[thread_id].findIndex(m => m._id === message_id);
//                 if (i < 0) break;
//                 let tempMessage = { ...sMessages[thread_id][i] }
//                 tempMessage = {
//                     ...tempMessage,
//                     create_date: Date.parse(new Date()),
//                 }
//                 sMessages[thread_id][i] = { ...tempMessage }
//                 sMessages[thread_id] = orderBy(sMessages[thread_id], 'create_date', 'desc');

//                 fMessages[message_id] = {
//                     ...fMessages[message_id],
//                     create_date: Date.parse(new Date())
//                 }
//                 yield put({
//                     type: Action.UPDATE_MESSAGE_SUCCESS,
//                     data: {
//                         simpleMessages: sMessages,
//                         fullMessages: fMessages
//                     },
//                 })
//                 break;
//             }
//             default: {
//                 break;
//             }
//         }
//     } catch (error) {
//         console.error('workerUpdateMessage ---- ', error)
//     }
// }