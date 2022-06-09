import App from './App';
import { name as appName } from './app.json';

import {
    // Platform, Linking,
    AppRegistry
} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import notifee, { EventType } from '@notifee/react-native';
// import store from './src/addons/redux';
// import * as Action from './src/addons/chat/controllers/actionTypes';
// import { extractDataByUserId } from './src/config/utilities';
var _ = require('lodash');

// notifee.onBackgroundEvent(async ({ type, detail }) => {
//     if (Platform.OS === 'android') {
//         if (EventType.PRESS === type) {
//             Linking.openURL(`tomaho.enterprise://chatbox/${detail.notification.data.thread_id}`)
//             notifee.cancelAllNotifications();
//         }
//     }
// })


// const prepareSimpleContent = ({ type, content }) => {
//     if (type === 'sticker') {
//         return 'gửi 1 nhãn dán';
//     }
//     else if (type === 'text') {
//         return content.toString();
//     }
//     else if (type === 'image') {
//         return 'gửi 1 hình ảnh';
//     }
//     else if (type === 'other') {
//         return 'gửi 1 tệp tin';
//     }
//     else if (type === 'emoji') {
//         return 'gửi biểu tượng cảm xúc';
//     }
//     else if (type === 'image_group') {
//         return 'gửi 1 nhóm hình ảnh';
//     }
//     else {
//         return 'gửi một tin nhắn'
//     }
// }

// const createNotification = async ({ data, message, token, myUserInfo }) => {
//     if (Platform.OS === 'android') {
//         let thread_id = data.thread_id._id ? data.thread_id._id : data.thread_id;
//         let activeUserId = store.getState().AuthStoredReducer.activeUserId;
//         let threads = extractDataByUserId(store.getState().ChatStoredReducer.listThreads, activeUserId, []);
//         let index = threads.findIndex(t => t.thread_id === thread_id)

//         await notifee.displayNotification({
//             title: data.thread_id.is_group ? `${data.owner_id.name} - ${data.thread_id.name}` : data.owner_id.name,
//             body: message,
//             android: {
//                 channelId: index > -1 ? thread_id : 'fcm_tomaho_enterprise',
//                 sound: 'piece_of_cake.mp3',
//             },
//             data: {
//                 _id: data.thread_id.is_group ? data.thread_id._id : (data.owner_id._id ? data.owner_id._id : data.owner_id),
//                 name: data.thread_id.is_group ? data.thread_id.name : data.owner_id.name,
//                 is_group: `${data.thread_id.is_group}`,
//                 thread_id: data.thread_id._id,
//                 activity: 'active',
//             }
//         });

//         // PushNotification.localNotification({
//         //     channelId: index > -1 ? thread_id : 'fcm_tomaho_enterprise',
//         //     title: data.is_group ? `${data.owner_id.name} - ${data.thread_id.name}` : data.owner_id.name,
//         //     largeIconUrl: data.owner_id.avatar_url ? `${data.owner_id.avatar_url}?token=${token}` : '',
//         //     bigPictureUrl: data.type === 'image' ? JSON.parse(data.content).link + '?token=' + token : '',
//         //     message,
//         //     hi: {
//         //         _id: data.thread_id.name ? data.thread_id._id : data.owner_id._id,
//         //         name: data.thread_id.name ? data.thread_id.name : data.owner_id.name,
//         //         is_group: data.thread_id.name ? true : false,
//         //         thread_id: data.thread_id._id,
//         //         activity: 'active',
//         //     },
//         //     priority: 'high',
//         //     playSound: true,
//         //     soundName: 'piece_of_cake.mp3',
//         // });
//     }
//     else {
//         // PushNotificationIOS.addNotificationRequest({
//         //     id: data._id,
//         //     title: data.thread_id.name ? data.owner_id.name + ' trong nhóm ' + data.thread_id.name : data.owner_id.name,
//         //     body: message,
//         //     userInfo: {
//         //         _id: data.thread_id.name ? data.thread_id._id : data.owner_id._id,
//         //         name: data.thread_id.name ? data.thread_id.name : data.owner_id.name,
//         //         is_group: data.thread_id.name ? true : false,
//         //         thread_id: data.thread_id._id,
//         //         activity: 'active',
//         //     },
//         //     playSound: true,
//         //     sound: 'piece_of_cake.caf',
//         // });
//     }
// }

// messaging().setBackgroundMessageHandler(async remoteMessage => {

//     try {
//         let firebaseToken = await AsyncStorage.getItem('@firebaseToken');
//         if (firebaseToken) {
//             let activeUserId = store.getState().AuthStoredReducer.activeUserId;
//             let loggedUsers = store.getState().AuthStoredReducer.loggedUsers;
//             if (remoteMessage.data.hello) {
//                 let data = remoteMessage.data.hello;
//                 // if (Platform.OS === 'android') {
//                 // store.dispatch({
//                 //     type: Action.SOCKET_RECEIVE_NEW_MESSAGE,
//                 //     data,
//                 // })
//                 // }
//                 data = JSON.parse(data);

//                 if (data.owner_id._id !== activeUserId && activeUserId) {
//                     store.dispatch({
//                         type: Action.SOCKET_RECEIVE_NEW_MESSAGE,
//                         data,
//                     })
//                     // let appStateKeeper = store.getState().AuthUnstoredReducer.appStateKeeper;
//                     // if (appStateKeeper.appState === 'background') {
//                     if (Platform.OS === 'android') {
//                         let threadNotification = extractDataByUserId(store.getState().ChatStoredReducer.threadNotification, activeUserId, {});
//                         if (threadNotification[data.thread_id._id] && !_.isEmpty(threadNotification[data.thread_id._id]) && threadNotification[data.thread_id._id] === 'off') {

//                         }
//                         else {
//                             let message = prepareSimpleContent({
//                                 type: data.type,
//                                 content: data.mobile_content || data.content
//                             })
//                             createNotification({
//                                 data, message, token: loggedUsers[activeUserId].token , myUserInfo: loggedUsers[activeUserId]
//                             })
//                         }
//                     }
//                     // }

//                     let myUnreadMessage = extractDataByUserId(store.getState().ChatStoredReducer.myUnreadMessage, activeUserId, {});
//                     if (!myUnreadMessage || !myUnreadMessage[data.thread_id._id]) {
//                         await store.dispatch({
//                             type: Action.UPDATE_UNREAD_MESSAGE_COUNT,
//                             myUnreadMessage: {
//                                 [data.thread_id._id]: 1
//                             },
//                         })
//                         myUnreadMessage = extractDataByUserId(store.getState().ChatStoredReducer.myUnreadMessage, activeUserId, {});
//                         let count = Object.values(myUnreadMessage).filter(m => {
//                             if (m) {
//                                 return m;
//                             }
//                         }).length;
//                         if (Platform.OS === 'android') {
//                             PushNotification.setApplicationIconBadgeNumber(count);
//                         }
//                         else {
//                             PushNotificationIOS.setApplicationIconBadgeNumber(count);
//                         }
//                     }
//                 }
//             }

//             // else if (remoteMessage.data.welcome) {
//             //     let data = remoteMessage.data.welcome;
//             //     data = JSON.parse(data);
//             //     if (data.inviter_id !== myUserInfo._id) {
//             //         if (Platform.OS === 'android') {
//             //             PushNotification.localNotification({
//             //                 channelId: 'fcm_tomaho_enterprise',
//             //                 message: `${data.inviter_name} đã thêm bạn vào ${data.thread_name}`,
//             //                 hi: {
//             //                     activeThread: true
//             //                 },
//             //                 priority: 'high',
//             //                 playSound: true,
//             //                 soundName: 'piece_of_cake.mp3',
//             //             });
//             //         }
//             //         else {
//             //             PushNotificationIOS.addNotificationRequest({
//             //                 id: data._id,
//             //                 body: `${data.inviter_name} đã thêm bạn vào ${data.thread_name}`,
//             //                 userInfo: {
//             //                     activeThread: true
//             //                 },
//             //                 isSilent: false,
//             //                 sound: 'piece_of_cake.caf'
//             //             })
//             //         }
//             //     }
//             // }
//         }
//     }
//     catch (error) {

//     }
// })

// messaging().onMessage(async (remoteMessage) => {
//     try {
//         // let firebaseToken = await AsyncStorage.getItem('@firebaseToken');
//         // if (firebaseToken) {
//         //     let myUserInfo = store.getState().AuthStoredReducer.myUserInfo;
//         //     let appStateKeeper = store.getState().AuthStoredReducer.appStateKeeper;
//         //     if (appStateKeeper.appState === 'background') {
//         //     }
//         // }
//     } catch (error) {

//     }
// });

AppRegistry.registerComponent(appName, () => App);
