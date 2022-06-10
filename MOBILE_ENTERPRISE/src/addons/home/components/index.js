import React, { useEffect, useRef } from "react";
import {
	Platform,
	Text,
	View,
	AppState,
	Linking,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import NetInfo from "@react-native-community/netinfo";
import messaging from "@react-native-firebase/messaging";
import instance from "@react-native-firebase/iid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import isEqual from "react-fast-compare";
import ThreadList from "../../chat/components/ThreadList";
import ECard from "../../ecard/components/ECard";
import TodoNoteListScreen from "../../note/components/TodoNoteListScreen";
import { QRScreen } from "../../navigator/components/QRScannerScreen";
import { connect, useDispatch, useSelector } from "react-redux";
import { socket } from "../../../config/socket";
import Friend from "../../friend/component/Friend";
import useTheme from "../../base/components/useTheme";
import ScanIcon from './ScanIcon';
import ChatIcon from "./ChatIcon";
import * as ActionChat from "../../chat/controllers/actionTypes";
import * as AuthAction from "../../auth/controllers/actionTypes";
import * as ActionFriend from "../../friend/controllers/actionType";
import * as BaseAction from '../../base/controllers/actionTypes';
import { useNavigation } from "@react-navigation/native";
import PostScreen from "../../social/component/PostScreen"

var _ = require("lodash");
const Tab = createBottomTabNavigator();

PushNotification.configure({
	// (optional) Called when Token is generated (iOS and Android)
	onRegister: function (token) {
		if (Platform.OS === "ios") {
			AsyncStorage.setItem("@notificationToken", token.token);
		}
	},

	// (required) Called when a remote is received or opened, or local notification is opened
	onNotification: function (notification) {
		if (Platform.OS === "android") {
			try {
				let { route } = notification.data;
				if (typeof route === 'string') {
					route = JSON.parse(route);
				}
				if (route.name === 'ChatBox') {
					Linking.openURL(
						`tomaho.enterprise://chatbox/${route._id}`
					);
				}
				notification.finish();
			} catch (error) {

			}
		} else {
			try {
				if (notification.data.userInteraction) {
					let { route } = notification.data;
					if (typeof route === 'string') {
						route = JSON.parse(route);
					}
					if (route.name === 'ChatBox') {
						Linking.openURL(
							`tomaho.enterprise://chatbox/${route._id}`
						);
					}
					notification.finish();
				}
			} catch (error) {

			}
		}
	},

	// (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
	onAction: function (notification) {
		// //
		// //
		// process the action
	},

	// (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
	onRegistrationError: function (err) {
		//
	},

	// IOS ONLY (optional): default: all - Permissions to register.
	permissions: {
		alert: true,
		badge: true,
		sound: true,
	},

	// Should the initial notification be popped automatically
	// default: true
	popInitialNotification: true,

	/**
	 * (optional) default: true
	 * - Specified if permissions (ios) and token (android and ios) will requested or not,
	 * - if not, you must call PushNotificationsHandler.requestPermissions() later
	 * - if you are not using remote notification or do not have Firebase installed, use this:
	 *     requestPermissions: Platform.OS === 'ios'
	 */
	requestPermissions: true,
});

PushNotification.createChannel({
	channelId: "fcm_tomaho_enterprise", // (required)
	channelName: "FCM_TOMAHO_ENTERPRISE", // (required)
});

const Home = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const theme = useTheme();
	const token = useSelector(state => {
		return state.AuthStoredReducer.token;
	}, (prev, next) => prev === next);
	const myUserId = useSelector(state => {
		try {
			return state.AuthStoredReducer.myUserInfo._id
		} catch (error) {
			return null;
		}
	}, (prev, next) => prev === next);
	const networkListener = useRef(false);
	const intervalAnnounceOnline = useRef(false);
	const handleAppState = useRef(false);
	const onAndroidDeviceTokenRefresh = useRef(false);

	//Các didmount 
	useEffect(() => {
		//Trigger fetch data mới
		fetchNewestData();

		//Đổi trạng thái khi mount thành foreground
		dispatch({
			type: BaseAction.CHANGE_APP_STATE,
			data: {
				appState: "foreground",
			},
		});

		//Didmount thì xem file xóa gần nhất có xa chưa, nếu xa rồi thì xóa file để nhẹ máy
		dispatch({
			type: ActionChat.CLEAR_ANY_DOWNLOADED_FILE_EVERY_WEEK,
			dispatch: dispatch,
		});

		//Gắn event bắt sự kiện app background foreground
		handleAppState.current = AppState.addEventListener("change", _handleAppStateChange);

		networkListener.current = NetInfo.addEventListener((state) => {
			if (state.isInternetReachable !== null) {
				let netinfo = state.isConnected && state.isInternetReachable;
				if (netinfo === null) {
					netinfo = true;
				}
				dispatch({
					type: "UPDATE_NETWORK_STATUS",
					data: netinfo,
				});
			} else if (
				state.isConnected !== true &&
				state.isInternetReachable !== true
			) {
				dispatch({
					type: "UPDATE_NETWORK_STATUS",
					data: false,
				});
			}
		});

		registerDeviceToken();
		onAndroidDeviceTokenRefresh.current = messaging().onTokenRefresh(() => {
			instance()
				.getToken()
				.then(async (newToken) => {
					if (Platform.OS === "android") {
						await AsyncStorage.setItem("@notificationToken", newToken);
						socket.emit("register_device_token", {
							token: token,
							deviceToken: newToken,
							platform: "android",
						});
					}
				})
				.catch((error) => {
					// if (Platform.OS === 'android') {
					//     AsyncStorage.removeItem('@notificationToken');
					// }
				});
		});

		return () => {
			networkListener.current();
			onAndroidDeviceTokenRefresh.current();
			if (handleAppState.current) {
				handleAppState.current.remove();
				handleAppState.current = false;
			}
			if (intervalAnnounceOnline.current && Platform.OS !== "android") {
				clearInterval(intervalAnnounceOnline.current);
			}
		}
	}, []);

	//Các event của socket
	useEffect(() => {
		socket.on("connect", async () => {
			socket.sendBuffer = [];
			socket.emit("join_my_own_room", {
				token: token,
			});
			registerDeviceToken();
			fetchNewestData();
		});

		socket.on("someone_online", (data) => {
			dispatch({
				type: "UPDATE_ONLINE_USER",
				user_id: data.user_id,
			});
		});
		socket.on("add_new_group_chat", (data) => {
			const { simpleThreads, fullThreads, threadMembers } = data;
			//Join vào room được mời
			//Fetch thread mới
			dispatch({
				type: ActionChat.UPDATE_THREAD_MEMBER,
				data: { threadMembers },
			});
			dispatch({
				type: ActionChat.UPDATE_THREAD_LIST,
				ttype: "new_thread",
				data: { simpleThreads, fullThreads },
			});
			dispatch({
				type: ActionChat.UPDATE_MESSAGE,
				ttype: "fetchmessage",
				data: {
					simpleMessages: { [simpleThreads[0]._id]: [] },
					fullMessages: {},
				},
			});
		});
		socket.on("change_pin_message", (data) => {
			const { pinMessages } = data;
			dispatch({
				type: ActionChat.UPDATE_PIN_MESSAGE,
				ttype: "change_pin_message",
				data: { pinMessages },
			});
		});

		socket.on("someone_pin_message_of_thread", (data) => {
			dispatch({
				type: ActionChat.UPDATE_PIN_MESSAGE,
				ttype: "pin",
				data,
			});

		});

		socket.on("someone_unpin_message_of_thread", (data) => {
			dispatch({
				type: ActionChat.UPDATE_PIN_MESSAGE,
				ttype: "unpin",
				data,
			});

		});

		socket.on("read_message", (data) => {
			dispatch({
				type: ActionChat.UPDATE_MESSAGE_STATE,
				data: { messageStates: data.messageStates },
			});
		});

		socket.on("receive_new_message", (data) => {
			const { newMessage } = data;
			if (newMessage.create_uid !== myUserId) {
				dispatch({
					type: ActionChat.SOCKET_RECEIVE_NEW_MESSAGE,
					data: { newMessage },
					dispatch: dispatch,
				});
			}
		});

		socket.on("i_have_sent_message", (data) => {
			const { newMessage } = data;
			dispatch({
				type: ActionChat.SOCKET_I_HAVE_SENT_MESSAGE,
				data: { newMessage },
				dispatch: dispatch,
				navigation: navigation,
			});
		});

		socket.on("invite_join_new_thread", (data) => {
			const { announceData = {} } = data;
			const { thread_id } = announceData;
			dispatch({
				type: ActionChat.API_FETCH_FULL_THREAD_BY_THREAD_ID,
				data: { thread_id },
				dispatch: dispatch,
			});
		});

		socket.on("is_typing", (data) => {
			const { myThreadTypers } = data;
			if (myThreadTypers) {
				dispatch({
					type: ActionChat.UPDATE_THREAD_TYPER,
					ttype: "add",
					data: { myThreadTypers },
				});
			}
		});

		socket.on("stop_typing", (data) => {
			const { myThreadTypers } = data;
			if (myThreadTypers) {
				dispatch({
					type: ActionChat.UPDATE_THREAD_TYPER,
					ttype: "delete",
					data: { myThreadTypers },
				});
			}
		});

		// change_thread_name
		socket.on("change_thread_name", (data) => {
			dispatch({
				type: ActionChat.SOMEONE_CHANGE_THREAD_STUFF,
				ttype: "change_thread_name",
				data: data,
			});
		});

		socket.on("change_thread_setting", (data) => {
			dispatch({
				type: ActionChat.SOMEONE_CHANGE_THREAD_STUFF,
				ttype: "change_thread_field",
				data: data,
			});
		});
		socket.on("change_thread_avatar", (data) => {
			const { simpleThreads, fullThreads } = data;
			dispatch({
				type: ActionChat.SOMEONE_CHANGE_THREAD_STUFF,
				ttype: "change_avatar",
				data: {
					simpleThreads,
					fullThreads,
				},
			});
		});

		socket.on("react_to_message", (data) => {
			dispatch({
				type: ActionChat.UPDATE_MESSAGE_REACTION,
				ttype: "change_reaction_type",
				data: data,
			});
		});

		socket.on("delete_message", (data) => {
			const { deletedData } = data;
			dispatch({
				type: ActionChat.UPDATE_MESSAGE,
				ttype: "deletemessage",
				data: {
					message_id: deletedData.message_id,
					thread_id: deletedData.thread_id,
				},
			});
		});

		socket.on("change_thread_notification", (data) => {
			const { simpleThreads, fullThreads } = data;
			dispatch({
				type: ActionChat.UPDATE_THREAD_LIST,
				ttype: 'change_thread_notification',
				data: {
					simpleThreads, fullThreads
				}
			})
		});

		socket.on("broadcast_meta_embed_link_of_message", (data) => {
			// dispatch({
			// 	type: ActionChat.UPDATE_FAST_ACCESS_THREAD_MESSAGE,
			// 	ttype: "embedlink",
			// 	data,
			// });
		});

		socket.on("answer_poll", (data) => {
			const { user_id, updatedMessage, answer_ids } = data;
			dispatch({
				type: ActionChat.SOCKET_SOMEONE_ANSWER_POLL,
				data: {
					updatedMessage,
				},
			});

			dispatch({
				type: ActionChat.UPDATE_POLL_ANSWER_RESULT,
				ttype: "answer",
				data: {
					user_id,
					message_id: updatedMessage._id,
					answer_ids,
				},
			});
		});

		socket.on("change_friend_status", (data) => {
			dispatch({
				type: ActionFriend.UPDATE_FRIEND_LIST,
				data: data,
			});
		});

		socket.on("change_thread_member_position", (data) => {
			const { threadMembers } = data;
			if (threadMembers) {
				dispatch({
					type: ActionChat.UPDATE_THREAD_MEMBER,
					data: { threadMembers },
				});
			}
		});

		socket.on("change_badge_count", (data) => {
			const { badge_count } = data;
			if (Platform.OS === "android") {
				PushNotification.setApplicationIconBadgeNumber(
					Number.isNaN(badge_count) ? 0 : Number(badge_count)
				);
			} else {
				PushNotificationIOS.setApplicationIconBadgeNumber(
					Number.isNaN(badge_count) ? 0 : Number(badge_count)
				);
			}
			dispatch({
				type: ActionChat.UPDATE_TAB_CHAT_BADGE_COUNT,
				data: badge_count
			})
		});

		socket.on("remove_message_due_to_duplicate_draft_id", data => {
			const { responseData } = data; //trong đây có thread_id và draft_id
			if (responseData) {
				dispatch({
					type: ActionChat.UPDATE_MESSAGE,
					ttype: 'remove_message_due_to_duplicate_draft_id',
					data: { ...responseData }
				})
				dispatch({
					type: ActionChat.UPDATE_UNFINISHED_SEND_MESSAGE,
					ttype: 'remove',
					data: { _id: responseData.draft_id }
				})
			}
		})

		return () => {
			socket.off("connect");
			socket.off("disconnect");
			socket.off("add_new_group_chat");
			socket.off("someone_online");
			socket.off("change_pin_message");
			socket.off("someone_pin_message_of_thread");
			socket.off("someone_unpin_message_of_thread");
			socket.off("read_message");
			socket.off("receive_new_message");
			socket.off("i_have_sent_message");
			socket.off("invite_join_new_thread");
			socket.off("is_typing");
			socket.off("stop_typing");
			socket.off("react_to_message");
			socket.off("change_thread_setting");
			socket.off("change_thread_name");
			socket.off("change_thread_avatar");
			socket.off("delete_message");
			socket.off("change_thread_notification");
			socket.off("broadcast_meta_embed_link_of_message");
			socket.off("answer_poll");
			socket.off("change_friend_status");
			socket.off("change_thread_member_position");
			socket.off("change_badge_count");
			socket.off("remove_message_due_to_duplicate_draft_id");
		}
	}, []);

	const fetchNewestData = () => {
		//xóa thông tin người đang gõ trong app
		dispatch({
			type: ActionChat.UPDATE_THREAD_TYPER,
		});
		dispatch({
			type: ActionChat.API_FETCH_NEW_MESSAGE,
			dispatch: dispatch,
		});
		dispatch({
			type: ActionChat.API_FETCH_THREAD_LIST,
			dispatch: dispatch,
		});
		setTimeout(() => {
			dispatch({
				type: AuthAction.API_GET_MY_USER_INFO,
				dispatch: dispatch,
			});
			dispatch({
				type: ActionChat.API_FETCH_NEW_MESSAGE_STATE,
				dispatch: dispatch,
			});
			dispatch({
				type: ActionChat.API_FETCH_NEW_MESSAGE_REACTION,
				dispatch: dispatch,
			});
			dispatch({
				type: ActionFriend.API_FETCH_FRIEND_AND_INVITATION_BY_LAST_TIME_FETCH,
				dispatch: dispatch,
			});
			dispatch({
				type: ActionFriend.GET_NEW_PHONE_CONTACT,
				dispatch: dispatch
			})
		}, 1000);
	};

	const _handleAppStateChange = (nextAppState) => {
		if (nextAppState === "active") {
			fetchNewestData();

			dispatch({
				type: BaseAction.CHANGE_APP_STATE,
				data: {
					appState: "foreground",
				},
			});

			if (Platform.OS === "android") {
				dispatch({ type: "ANNOUNCE_ONLINE" });
				setTimeout(() => {
					PushNotification.removeAllDeliveredNotifications();
				}, 500);
			} else {
				intervalAnnounceOnline.current = setInterval(() => {
					dispatch({ type: "ANNOUNCE_ONLINE" });
				}, 120000);
				setTimeout(() => {
					// PushNotificationIOS.removeAllDeliveredNotifications();
				}, 500);
			}
		} else {
			if (intervalAnnounceOnline.current && Platform.OS !== "android") {
				clearInterval(intervalAnnounceOnline.current);
			}
			dispatch({
				type: BaseAction.CHANGE_APP_STATE,
				data: {
					appState: "background",
				},
			});
		}
	};

	const registerDeviceToken = () => {
		if (Platform.OS === "android") {
			instance()
				.getToken()
				.then(async (newToken) => {
					await AsyncStorage.setItem("@notificationToken", newToken);
					socket.emit("register_device_token", {
						token: token,
						deviceToken: newToken,
						platform: "android",
					});
				});
		} else {
			AsyncStorage.getItem("@notificationToken").then((deviceToken) => {
				socket.emit("register_device_token", {
					token: token,
					deviceToken: deviceToken,
					platform: "ios",
				});
			});
		}
	};

	return (<Tab.Navigator
		keyboardHidesNavigationBar={!Platform.OS === "ios"}
		backBehavior="history"
		screenOptions={{
			headerShown: false,
		}}
	>
		<Tab.Screen
			name="Chat"
			component={ThreadList}
			options={{
				tabBarHideOnKeyboard: true,
				tabBarStyle: {
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: theme.backgroundColor
				},
				tabBarBadge: undefined,
				tabBarIcon: ({ focused, color }) => {
					return <ChatIcon focused={focused} />
				},
				tabBarBadgeStyle:
					Platform.OS === "android"
						? {
							justifyContent: "flex-start",
							paddingHorizontal: 5,
							fontSize: 12,
						}
						: {},
				tabBarOptions: {
					showLabel: true,
				},
				tabBarLabel: ({ focused, color }) => {
					return (
						<Text
							color={color}
							style={{
								fontSize: 11,
								color: focused ? "#00A48D" : "#828282",
							}}
						>
							Thảo luận
						</Text>
					);
				},
			}}
		/>

		<Tab.Screen
			name="Ghi chú"
			component={TodoNoteListScreen}
			options={{
				unmountOnBlur: true,
				tabBarHideOnKeyboard: true,
				tabBarIcon: ({ focused, color }) => {
					return (<MaterialCommunityIcons
						color={color}
						style={{
							top: 7,
							left: 1,
							width: 30,
							height: 30,
							textAlign: "center",
							textAlignVertical: "center",
							color: focused ? "#00A48D" : "#828282",
						}}
						size={25}
						name={focused ? "notebook" : "notebook-outline"}
					/>
					);
				},
				tabBarBadgeStyle:
					Platform.OS === "android"
						? {
							justifyContent: "flex-start",
							paddingHorizontal: 5,
							fontSize: 12,
						}
						: {},
				tabBarLabel: ({ focused, color }) => {
					return (
						<Text
							color={color}
							style={{
								fontSize: 11,
								color: focused ? "#00A48D" : "#828282",
							}}
						>
							Ghi chú
						</Text>
					);
				},
			}}
		/>

		<Tab.Screen
			name="Newfeed"
			component={PostScreen}
			options={{
				unmountOnBlur: true,
				tabBarHideOnKeyboard: true,
				tabBarIcon: ({ focused, color }) => {
					return (<Ionicons
						color={color}
						style={{
							top: 7,
							left: 1,
							width: 30,
							height: 30,
							textAlign: "center",
							textAlignVertical: "center",
							color: focused ? "#00A48D" : "#828282",
						}}
						size={25}
						name={focused ? "globe" : "globe-outline"}
					/>
					);
				},
				tabBarBadgeStyle:
					Platform.OS === "android"
						? {
							justifyContent: "flex-start",
							paddingHorizontal: 5,
							fontSize: 12,
						}
						: {},
				tabBarLabel: ({ focused, color }) => {
					return (
						<Text
							color={color}
							style={{
								fontSize: 11,
								color: focused ? "#00A48D" : "#828282",
							}}
						>
							Cộng đồng
						</Text>
					);
				},
			}}
		/>

		<Tab.Screen
			name="E-Card"
			component={ECard}
			options={{
				unmountOnBlur: true,
				tabBarHideOnKeyboard: true,
				tabBarIcon: ({ focused, color }) => {
					return (<Ionicons
						color={color}
						style={{
							top: 7,
							left: 1,
							width: 30,
							height: 30,
							textAlign: "center",
							textAlignVertical: "center",
							color: focused ? "#00A48D" : "#828282",
						}}
						size={25}
						name={focused ? "md-card" : "md-card-outline"}
					/>
					);
				},
				tabBarBadgeStyle:
					Platform.OS === "android"
						? {
							justifyContent: "flex-start",
							paddingHorizontal: 5,
							fontSize: 12,
						}
						: {},
				tabBarLabel: ({ focused, color }) => {
					return (
						<Text
							color={color}
							style={{
								fontSize: 11,
								color: focused ? "#00A48D" : "#828282",
							}}
						>
							E-Card
						</Text>
					);
				},
			}}
		/>

		<Tab.Screen
			name="Danh bạ"
			component={Friend}
			options={{
				unmountOnBlur: true,
				tabBarHideOnKeyboard: true,
				tabBarIcon: ({ focused, color }) => {
					return (<Ionicons
						color={color}
						style={{
							top: 7,
							left: 1,
							width: 30,
							height: 30,
							textAlign: "center",
							textAlignVertical: "center",
							color: focused ? "#00A48D" : "#828282",
						}}
						size={25}
						name={focused ? "ios-people-sharp" : "ios-people-outline"}
					/>
					);
				},
				tabBarBadgeStyle:
					Platform.OS === "android"
						? {
							justifyContent: "flex-start",
							paddingHorizontal: 5,
							fontSize: 12,
						}
						: {},
				tabBarLabel: ({ focused, color }) => {
					return (
						<Text
							color={color}
							style={{
								fontSize: 11,
								color: focused ? "#00A48D" : "#828282",
							}}
						>
							Danh bạ
						</Text>
					);
				},
			}}
		/>
	</Tab.Navigator>);

}

export default React.memo(Home, (prevProps, nextProps) => {
	return isEqual(prevProps, nextProps);
})

// class Home extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 		};
// 		this._isMounted = false;
// 		this.unsubscribe = null;
// 		this.interval = null;
// 		this.handleAppState = null;
// 	}

// 	_handleAppStateChange = (nextAppState) => {
// 		if (nextAppState === "active") {
// 			this.fetchNewestData();

// 			this.props.dispatch({
// 				type: BaseAction.CHANGE_APP_STATE,
// 				data: {
// 					appState: "foreground",
// 				},
// 			});

// 			if (Platform.OS === "android") {
// 				this.props.dispatch({ type: "ANNOUNCE_ONLINE" });
// 				setTimeout(() => {
// 					PushNotification.removeAllDeliveredNotifications();
// 				}, 500);
// 			} else {
// 				this.interval = setInterval(() => {
// 					this.props.dispatch({ type: "ANNOUNCE_ONLINE" });
// 				}, 120000);
// 				setTimeout(() => {
// 					// PushNotificationIOS.removeAllDeliveredNotifications();
// 				}, 500);
// 			}
// 		} else {
// 			if (this.interval && Platform.OS !== "android") {
// 				clearInterval(this.interval);
// 			}
// 			this.props.dispatch({
// 				type: BaseAction.CHANGE_APP_STATE,
// 				data: {
// 					appState: "background",
// 				},
// 			});
// 		}
// 	};

// 	shouldComponentUpdate(nextProps, nextState) {
// 		return (
// 			!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)
// 		);
// 	}

// 	componentDidMount() {
// 		this._isMounted = true;
// 		//Trigger fetch data mới
// 		this.fetchNewestData();

// 		//Đổi trạng thái khi mount thành foreground
// 		this.props.dispatch({
// 			type: BaseAction.CHANGE_APP_STATE,
// 			data: {
// 				appState: "foreground",
// 			},
// 		});

// 		//Didmount thì xem file xóa gần nhất có xa chưa, nếu xa rồi thì xóa file để nhẹ máy
// 		this.props.dispatch({
// 			type: ActionChat.CLEAR_ANY_DOWNLOADED_FILE_EVERY_WEEK,
// 			dispatch: this.props.dispatch,
// 		});
// 		//


// 		//
// 		this.unsubscribe = NetInfo.addEventListener((state) => {
// 			if (state.isInternetReachable !== null) {
// 				let netinfo = state.isConnected && state.isInternetReachable;
// 				if (netinfo === null) {
// 					netinfo = true;
// 				}
// 				this.props.dispatch({
// 					type: "UPDATE_NETWORK_STATUS",
// 					data: netinfo,
// 				});
// 			} else if (
// 				state.isConnected !== true &&
// 				state.isInternetReachable !== true
// 			) {
// 				this.props.dispatch({
// 					type: "UPDATE_NETWORK_STATUS",
// 					data: false,
// 				});
// 			}
// 		});

// 		this.registerDeviceToken();
// 		this.onTokenRefresh = messaging().onTokenRefresh(() => {
// 			instance()
// 				.getToken()
// 				.then(async (newToken) => {
// 					if (Platform.OS === "android") {
// 						await AsyncStorage.setItem("@notificationToken", newToken);
// 						socket.emit("register_device_token", {
// 							token: this.props.token,
// 							deviceToken: newToken,
// 							platform: "android",
// 						});
// 					}
// 				})
// 				.catch((error) => {
// 					// if (Platform.OS === 'android') {
// 					//     AsyncStorage.removeItem('@notificationToken');
// 					// }
// 				});
// 		});

// 		socket.on("connect", async () => {
// 			socket.sendBuffer = [];
// 			if (this._isMounted) {
// 				socket.emit("join_my_own_room", {
// 					token: this.props.token,
// 				});
// 				this.registerDeviceToken();
// 				this.fetchNewestData();
// 			}
// 		});

// 		socket.on("disconnect", (data) => {
// 			if (this._isMounted) {
// 				this.props.dispatch({
// 					type: "UPDATE_MY_THREAD_TYPER",
// 					data: {},
// 				});
// 			}
// 		});
// 		socket.on("someone_online", (data) => {
// 			if (this._isMounted) {
// 				this.props.dispatch({
// 					type: "UPDATE_ONLINE_USER",
// 					user_id: data.user_id,
// 				});
// 			}
// 		});
// 		socket.on("add_new_group_chat", (data) => {
// 			if (this._isMounted) {
// 				const { simpleThreads, fullThreads, threadMembers } = data;
// 				//Join vào room được mời
// 				//Fetch thread mới
// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_THREAD_MEMBER,
// 					data: { threadMembers },
// 				});
// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_THREAD_LIST,
// 					ttype: "new_thread",
// 					data: { simpleThreads, fullThreads },
// 				});
// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_MESSAGE,
// 					ttype: "fetchmessage",
// 					data: {
// 						simpleMessages: { [simpleThreads[0]._id]: [] },
// 						fullMessages: {},
// 					},
// 				});
// 			}
// 		});
// 		socket.on("change_pin_message", (data) => {
// 			if (this._isMounted) {
// 				const { pinMessages } = data;
// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_PIN_MESSAGE,
// 					ttype: "change_pin_message",
// 					data: { pinMessages },
// 				});
// 			}
// 		});

// 		socket.on("someone_pin_message_of_thread", (data) => {
// 			dispatch({
// 				type: ActionChat.UPDATE_PIN_MESSAGE,
// 				ttype: "pin",
// 				data,
// 			});

// 		});

// 		socket.on("someone_unpin_message_of_thread", (data) => {
// 			dispatch({
// 				type: ActionChat.UPDATE_PIN_MESSAGE,
// 				ttype: "unpin",
// 				data,
// 			});

// 		});

// 		socket.on("read_message", (data) => {
// 			if (this._isMounted) {
// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_MESSAGE_STATE,
// 					data: { messageStates: data.messageStates },
// 				});
// 			}
// 		});

// 		socket.on("receive_new_message", (data) => {
// 			if (this._isMounted) {
// 				const { newMessage } = data;

// 				if (newMessage.create_uid !== this.props.myUserId) {
// 					this.props.dispatch({
// 						type: ActionChat.SOCKET_RECEIVE_NEW_MESSAGE,
// 						data: { newMessage },
// 						dispatch: this.props.dispatch,
// 					});
// 				}
// 			}
// 		});

// 		socket.on("i_have_sent_message", (data) => {
// 			if (this._isMounted) {
// 				const { newMessage } = data;
// 				this.props.dispatch({
// 					type: ActionChat.SOCKET_I_HAVE_SENT_MESSAGE,
// 					data: { newMessage },
// 					dispatch: this.props.dispatch,
// 					navigation: this.props.navigation,
// 				});
// 			}
// 		});

// 		socket.on("invite_join_new_thread", (data) => {
// 			if (this._isMounted) {
// 				const { announceData = {} } = data;
// 				const { thread_id } = announceData;
// 				this.props.dispatch({
// 					type: ActionChat.API_FETCH_FULL_THREAD_BY_THREAD_ID,
// 					data: { thread_id },
// 					dispatch: this.props.dispatch,
// 				});
// 			}
// 		});

// 		socket.on("is_typing", (data) => {
// 			if (this._isMounted) {
// 				const { myThreadTypers } = data;
// 				if (myThreadTypers) {
// 					this.props.dispatch({
// 						type: ActionChat.UPDATE_THREAD_TYPER,
// 						ttype: "add",
// 						data: { myThreadTypers },
// 					});
// 				}
// 			}
// 		});
// 		socket.on("stop_typing", (data) => {
// 			if (this._isMounted) {
// 				const { myThreadTypers } = data;
// 				if (myThreadTypers) {
// 					this.props.dispatch({
// 						type: ActionChat.UPDATE_THREAD_TYPER,
// 						ttype: "delete",
// 						data: { myThreadTypers },
// 					});
// 				}
// 			}
// 		});

// 		// change_thread_name
// 		socket.on("change_thread_name", (data) => {
// 			if (this._isMounted) {
// 				this.props.dispatch({
// 					type: ActionChat.SOMEONE_CHANGE_THREAD_STUFF,
// 					ttype: "change_thread_name",
// 					data: data,
// 				});
// 			}
// 		});
// 		socket.on("change_thread_setting", (data) => {
// 			if (this._isMounted) {
// 				this.props.dispatch({
// 					type: ActionChat.SOMEONE_CHANGE_THREAD_STUFF,
// 					ttype: "change_thread_field",
// 					data: data,
// 				});
// 			}
// 		});
// 		socket.on("change_thread_avatar", (data) => {
// 			if (this._isMounted) {
// 				const { simpleThreads, fullThreads } = data;
// 				this.props.dispatch({
// 					type: ActionChat.SOMEONE_CHANGE_THREAD_STUFF,
// 					ttype: "change_avatar",
// 					data: {
// 						simpleThreads,
// 						fullThreads,
// 					},
// 				});
// 			}
// 		});
// 		////liem reaction
// 		socket.on("react_to_message", (data) => {
// 			if (this._isMounted) {
// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_MESSAGE_REACTION,
// 					ttype: "change_reaction_type",
// 					data: data,
// 				});
// 			}
// 		});
// 		////liem reaction
// 		socket.on("delete_message", (data) => {
// 			if (this._isMounted) {
// 				const { deletedData } = data;
// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_MESSAGE,
// 					ttype: "deletemessage",
// 					data: {
// 						message_id: deletedData.message_id,
// 						thread_id: deletedData.thread_id,
// 					},
// 				});
// 			}
// 		});

// 		socket.on("change_thread_notification", (data) => {
// 			if (this._isMounted) {
// 				const { simpleThreads, fullThreads } = data;
// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_THREAD_LIST,
// 					ttype: 'change_thread_notification',
// 					data: {
// 						simpleThreads, fullThreads
// 					}
// 				})
// 			}
// 		});

// 		socket.on("broadcast_meta_embed_link_of_message", (data) => {
// 			if (this._isMounted) {
// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_FAST_ACCESS_THREAD_MESSAGE,
// 					ttype: "embedlink",
// 					data,
// 				});
// 			}
// 		});

// 		socket.on("answer_poll", (data) => {
// 			if (this._isMounted) {
// 				const { user_id, updatedMessage, answer_ids } = data;

// 				this.props.dispatch({
// 					type: ActionChat.SOCKET_SOMEONE_ANSWER_POLL,
// 					data: {
// 						updatedMessage,
// 					},
// 				});

// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_POLL_ANSWER_RESULT,
// 					ttype: "answer",
// 					data: {
// 						user_id,
// 						message_id: updatedMessage._id,
// 						answer_ids,
// 					},
// 				});
// 			}
// 		});

// 		socket.on("change_friend_status", (data) => {
// 			this.props.dispatch({
// 				type: ActionFriend.UPDATE_FRIEND_LIST,
// 				data: data,
// 			});
// 		});

// 		socket.on("change_thread_member_position", (data) => {
// 			const { threadMembers } = data;
// 			if (threadMembers) {
// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_THREAD_MEMBER,
// 					data: { threadMembers },
// 				});
// 				// liêm thêm để viết vào saga cập nhật lai positon
// 			}
// 		});

// 		socket.on("change_badge_count", (data) => {
// 			const { badge_count } = data;
// 			if (Platform.OS === "android") {
// 				PushNotification.setApplicationIconBadgeNumber(
// 					Number.isNaN(badge_count) ? 0 : Number(badge_count)
// 				);
// 			} else {
// 				PushNotificationIOS.setApplicationIconBadgeNumber(
// 					Number.isNaN(badge_count) ? 0 : Number(badge_count)
// 				);
// 			}
// 			this.props.dispatch({
// 				type: ActionChat.UPDATE_TAB_CHAT_BADGE_COUNT,
// 				data: badge_count
// 			})
// 		});

// 		socket.on("remove_message_due_to_duplicate_draft_id", data => {
// 			const { responseData } = data; //trong đây có thread_id và draft_id
// 			if (responseData) {
// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_MESSAGE,
// 					ttype: 'remove_message_due_to_duplicate_draft_id',
// 					data: { ...responseData }
// 				})
// 				this.props.dispatch({
// 					type: ActionChat.UPDATE_UNFINISHED_SEND_MESSAGE,
// 					ttype: 'remove',
// 					data: { _id: responseData.draft_id }
// 				})
// 			}
// 		})

// 		this.handleAppState = AppState.addEventListener("change", this._handleAppStateChange);

// 		if (Platform.OS === "android") {
// 			this.props.dispatch({ type: "ANNOUNCE_ONLINE" });
// 			PushNotification.cancelAllLocalNotifications();
// 		} else {
// 			this.interval = setInterval(() => {
// 				this.props.dispatch({ type: "ANNOUNCE_ONLINE" });
// 			}, 120000);
// 			// PushNotificationIOS.removeAllPendingNotificationRequests();
// 		}

// 		//Xóa thông báo khi mở app từ terminated sau 500ms mở app
// 		if (Platform.OS === "android") {
// 			setTimeout(() => {
// 				PushNotification.removeAllDeliveredNotifications();
// 			}, 1000);
// 		} else {
// 			setTimeout(() => {
// 				// PushNotificationIOS.removeAllDeliveredNotifications();
// 			}, 1000);
// 		}
// 	}

// 	componentDidUpdate(prevProps, prevState) {
// 		try {
// 		} catch (error) { }
// 	}

// 	componentWillUnmount() {
// 		try {
// 			this._isMounted = false;

// 			socket.off("connect");
// 			socket.off("disconnect");
// 			socket.off("add_new_group_chat");
// 			socket.off("someone_online");
// 			socket.off("change_pin_message");
// 			socket.off("someone_pin_message_of_thread");
// 			socket.off("someone_unpin_message_of_thread");
// 			socket.off("read_message");
// 			socket.off("receive_new_message");
// 			socket.off("i_have_sent_message");
// 			socket.off("invite_join_new_thread");
// 			socket.off("is_typing");
// 			socket.off("stop_typing");
// 			socket.off("react_to_message");
// 			socket.off("change_thread_setting");
// 			socket.off("change_thread_name");
// 			socket.off("change_thread_avatar");
// 			socket.off("delete_message");
// 			socket.off("change_thread_notification");
// 			socket.off("broadcast_meta_embed_link_of_message");
// 			socket.off("answer_poll");
// 			socket.off("change_friend_status");
// 			socket.off("change_thread_member_position");
// 			socket.off("change_badge_count");
// 			socket.off("remove_message_due_to_duplicate_draft_id");

// 			this.onTokenRefresh();
// 			this.unsubscribe();
// 			if (this.handleAppState) {
// 				this.handleAppState.remove()
// 			}
// 			if (this.interval && Platform.OS !== "android") {
// 				clearInterval(this.interval);
// 			}
// 		} catch (error) { }
// 	}

// 	registerDeviceToken = () => {
// 		if (Platform.OS === "android") {
// 			instance()
// 				.getToken()
// 				.then(async (newToken) => {
// 					await AsyncStorage.setItem("@notificationToken", newToken);
// 					socket.emit("register_device_token", {
// 						token: this.props.token,
// 						deviceToken: newToken,
// 						platform: "android",
// 					});
// 				});
// 		} else {
// 			AsyncStorage.getItem("@notificationToken").then((token) => {
// 				socket.emit("register_device_token", {
// 					token: this.props.token,
// 					deviceToken: token,
// 					platform: "ios",
// 				});
// 			});
// 		}
// 	};

// 	fetchNewestData = () => {
// 		//xóa thông tin người đang gõ trong app
// 		this.props.dispatch({
// 			type: ActionChat.UPDATE_THREAD_TYPER,
// 		});
// 		this.props.dispatch({
// 			type: ActionChat.API_FETCH_NEW_MESSAGE,
// 			dispatch: this.props.dispatch,
// 		});
// 		this.props.dispatch({
// 			type: ActionChat.API_FETCH_THREAD_LIST,
// 			dispatch: this.props.dispatch,
// 		});
// 		var self = this;
// 		setTimeout(() => {
// 			self.props.dispatch({
// 				type: AuthAction.API_GET_MY_USER_INFO,
// 				dispatch: self.props.dispatch,
// 			});
// 			self.props.dispatch({
// 				type: ActionChat.API_FETCH_NEW_MESSAGE_STATE,
// 				dispatch: self.props.dispatch,
// 			});
// 			self.props.dispatch({
// 				type: ActionChat.API_FETCH_NEW_MESSAGE_REACTION,
// 				dispatch: self.props.dispatch,
// 			});
// 			self.props.dispatch({
// 				type: ActionFriend.API_FETCH_FRIEND_AND_INVITATION_BY_LAST_TIME_FETCH,
// 				dispatch: self.props.dispatch,
// 			});
// 			self.props.dispatch({
// 				type: ActionFriend.GET_NEW_PHONE_CONTACT,
// 				dispatch: self.props.dispatch
// 			})
// 		}, 1000);
// 	};

// 	render() {
// 		return (<Tab.Navigator
// 			keyboardHidesNavigationBar={!Platform.OS === "ios"}
// 			backBehavior="history"
// 			screenOptions={{
// 				headerShown: false,
// 			}}
// 		>
// 			<Tab.Screen
// 				name="Chat"
// 				component={ThreadList}
// 				options={{
// 					tabBarHideOnKeyboard: true,
// 					tabBarStyle: {
// 						justifyContent: "center",
// 						alignItems: "center",

// 					},
// 					tabBarBadge: undefined,
// 					tabBarIcon: ({ focused, color }) => {
// 						return <ChatIcon focused={focused} />
// 					},
// 					tabBarBadgeStyle:
// 						Platform.OS === "android"
// 							? {
// 								justifyContent: "flex-start",
// 								paddingHorizontal: 5,
// 								fontSize: 12,
// 							}
// 							: {},
// 					tabBarOptions: {
// 						showLabel: true,
// 					},
// 					tabBarLabel: ({ focused, color }) => {
// 						return (
// 							<Text
// 								color={color}
// 								style={{
// 									fontSize: 11,
// 									color: focused ? "#00A48D" : "#828282",
// 								}}
// 							>
// 								Thảo luận
// 							</Text>
// 						);
// 					},
// 				}}
// 			/>

// 			<Tab.Screen
// 				name="Ghi chú"
// 				component={TodoNoteListScreen}
// 				options={{
// 					unmountOnBlur: true,
// 					tabBarHideOnKeyboard: true,
// 					tabBarIcon: ({ focused, color }) => {
// 						return (<MaterialCommunityIcons
// 							color={color}
// 							style={{
// 								top: 7,
// 								left: 1,
// 								width: 30,
// 								height: 30,
// 								textAlign: "center",
// 								textAlignVertical: "center",
// 								color: focused ? "#00A48D" : "#828282",
// 							}}
// 							size={25}
// 							name={focused ? "notebook" : "notebook-outline"}
// 						/>
// 						);
// 					},
// 					tabBarBadgeStyle:
// 						Platform.OS === "android"
// 							? {
// 								justifyContent: "flex-start",
// 								paddingHorizontal: 5,
// 								fontSize: 12,
// 							}
// 							: {},
// 					tabBarLabel: ({ focused, color }) => {
// 						return (
// 							<Text
// 								color={color}
// 								style={{
// 									fontSize: 11,
// 									color: focused ? "#00A48D" : "#828282",
// 								}}
// 							>
// 								Ghi chú
// 							</Text>
// 						);
// 					},
// 				}}
// 			/>

// 			<Tab.Screen
// 				name="QRScanner"
// 				component={QRScreen}
// 				options={{
// 					unmountOnBlur: true,
// 					tabBarHideOnKeyboard: true,
// 					tabBarIcon: ({ focused, color }) => {
// 						return <ScanIcon />
// 					},
// 					tabBarLabel: ({ focused, color }) => {
// 						return null;
// 					},
// 				}}
// 			/>

// 			<Tab.Screen
// 				name="E-Card"
// 				component={ECard}
// 				options={{
// 					unmountOnBlur: true,
// 					tabBarHideOnKeyboard: true,
// 					tabBarIcon: ({ focused, color }) => {
// 						return (<Ionicons
// 							color={color}
// 							style={{
// 								top: 7,
// 								left: 1,
// 								width: 30,
// 								height: 30,
// 								textAlign: "center",
// 								textAlignVertical: "center",
// 								color: focused ? "#00A48D" : "#828282",
// 							}}
// 							size={25}
// 							name={focused ? "md-card" : "md-card-outline"}
// 						/>
// 						);
// 					},
// 					tabBarBadgeStyle:
// 						Platform.OS === "android"
// 							? {
// 								justifyContent: "flex-start",
// 								paddingHorizontal: 5,
// 								fontSize: 12,
// 							}
// 							: {},
// 					tabBarLabel: ({ focused, color }) => {
// 						return (
// 							<Text
// 								color={color}
// 								style={{
// 									fontSize: 11,
// 									color: focused ? "#00A48D" : "#828282",
// 								}}
// 							>
// 								E-Card
// 							</Text>
// 						);
// 					},
// 				}}
// 			/>

// 			<Tab.Screen
// 				name="Danh bạ"
// 				component={Friend}
// 				options={{
// 					unmountOnBlur: true,
// 					tabBarHideOnKeyboard: true,
// 					tabBarIcon: ({ focused, color }) => {
// 						return (<Ionicons
// 							color={color}
// 							style={{
// 								top: 7,
// 								left: 1,
// 								width: 30,
// 								height: 30,
// 								textAlign: "center",
// 								textAlignVertical: "center",
// 								color: focused ? "#00A48D" : "#828282",
// 							}}
// 							size={25}
// 							name={focused ? "ios-people-sharp" : "ios-people-outline"}
// 						/>
// 						);
// 					},
// 					tabBarBadgeStyle:
// 						Platform.OS === "android"
// 							? {
// 								justifyContent: "flex-start",
// 								paddingHorizontal: 5,
// 								fontSize: 12,
// 							}
// 							: {},
// 					tabBarLabel: ({ focused, color }) => {
// 						return (
// 							<Text
// 								color={color}
// 								style={{
// 									fontSize: 11,
// 									color: focused ? "#00A48D" : "#828282",
// 								}}
// 							>
// 								Danh bạ
// 							</Text>
// 						);
// 					},
// 				}}
// 			/>
// 		</Tab.Navigator>);
// 	}
// }

// function mapStateToProps(state) {
// 	return {
// 		token: state.AuthStoredReducer.token,
// 		myUserId: state.AuthStoredReducer.myUserInfo._id,
// 	};
// }
// export default connect(mapStateToProps)(Home);
