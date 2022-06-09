import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import isEqual from "react-fast-compare";
import {
	Animated, Image, Platform,
	ScrollView, Text, TouchableOpacity, View
} from "react-native";
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from "react-redux";
import * as ActionAuth from "../../auth/controllers/actionTypes";
// import DefaultAvatar from '../../static/default_ava.jpg'
import DispatchImage from "../../chat/components/DispatchImage";
import * as ActionChat from "../../chat/controllers/actionTypes";
import * as FriendAction from "../../friend/controllers/actionType";
import PopupElementIsGroup from "../components/PopupElementIsGroup";
// import * as Action from "../controllers/actionTypes";
import {
	HEIGHT, SCREEN_HEIGHT, WIDTH
} from "../controllers/utils";
import DefaultAvatar from "../static/default_ava.png";
import PopupElementIsPersonal from "./PopupElementIsPersonal";
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const PopupUserInfo = () => {
    const insets = useSafeAreaInsets();
	const route = useRoute();
	const _id = route.params._id;
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [formHeight, setFormHeight] = useState(0);
	const activeThreadId = useSelector(
		(state) => state.ChatUnstoredReducer.activeThreadId
	);
	const {
		Someone,
		localAvatar,
		cloudAvatar,
		needToDownloadAvatar,
	} = useSelector((state) => {
		const myFriends = state.FriendStoredReducer.myFriends || {};
		const myContacts = state.FriendStoredReducer.myContacts || {};
		const imageAvatars = state.ChatStoredReducer.imageAvatars || {};
		const myUserInfo = state.AuthStoredReducer.myUserInfo || {};

		let Someone;
		if (myUserInfo._id === _id) {
			Someone = myUserInfo;
		} else {
			Someone = myFriends[_id] || myContacts[_id];
		}
		if (!Someone) {
			return {};
		}
		let needToDownloadAvatar = false,
			localAvatar = "",
			cloudAvatar = "";

		if (Someone && Someone.avatar_url) {
			if (imageAvatars[Someone.avatar_url]) {
				localAvatar = imageAvatars[Someone.avatar_url];
				cloudAvatar = Someone.avatar_url;
				needToDownloadAvatar = localAvatar ? false : true;
			}
		}
		return {
			Someone: Someone,
			localAvatar: localAvatar,
			cloudAvatar: Someone && Someone.avatar_url ? Someone.avatar_url : "",
			needToDownloadAvatar: needToDownloadAvatar,
		};
	});

	let { myPosition, checkchinhtoi, checkIsGroup, statusMember } = useSelector(
		(state) => {
			try {
				let fullThreads = state.ChatStoredReducer.fullThreads || {};
				let Thread = fullThreads[activeThreadId] || {};
				const threadMembers = state.ChatStoredReducer.threadMembers || {}; // json la id cua member
				const myInfoId = state.AuthStoredReducer.myUserInfo._id;
				let checkchinhtoi, activePosition, threadMember, myPosition;
				let members = threadMembers[activeThreadId]; // json là nhiều id
				let activeThreadMember = members[_id]
				let statusMember = activeThreadMember.status
				if (!members) {
					return {};
				}
				threadMember = members[myInfoId] || {};
				myPosition = threadMember.thread_member_position || 5;
				checkchinhtoi = myInfoId === _id;

				let checkIsGroup;
				if (members[_id]) {
					checkIsGroup = true;
				} else {
					checkIsGroup = false;
				}

				return {
					statusMember,
					checkIsGroup,
					myPosition,
					checkchinhtoi,
				};
			} catch (error) {
				return {}
			}
		},
		(prev, next) => isEqual(prev, next)
	);
	const { isThreadGroup, isMyFriend, myUserInfoI } = useSelector(
		(state) => {
			try {
				const { thread_id, contact_id } = route.params;
				const activeThreadId = state.ChatUnstoredReducer.activeThreadId;
				const fullThreads = state.ChatStoredReducer.fullThreads || {};
				const myFriends = state.FriendStoredReducer.myFriends || {};
				const imageAvatars = state.ChatStoredReducer.imageAvatars || {};
				const myUserInfo = state.AuthStoredReducer.myUserInfo || {};
				let Thread = fullThreads[activeThreadId]; // data group
				return {
					isThreadGroup: Thread.is_group,
					isMyFriend: myFriends[contact_id],
					myUserInfoI: myUserInfo,
				};
			} catch (error) {
				return {}
			}
		},
		(prev, next) => isEqual(prev, next)
	);
	useEffect(() => {
		if (!Someone) {
			dispatch({
				type: FriendAction.API_DOWNLOAD_CONTACT,
				data: {
					ids: [_id],
				},
			});
		}
	}, []);
	console.log("---render");
	useEffect(() => {
		if (needToDownloadAvatar) {
			dispatch({
				type: ActionChat.API_DOWNLOAD_AVATAR,
				data: {
					url: cloudAvatar,
				},
				dispatch: dispatch,
			});
		}
	}, [needToDownloadAvatar]);

	const onLayout = (e) => {
		try {
			setFormHeight(e.nativeEvent.layout.height);
		} catch (error) {
		}
	};

	const close = () => {
		navigation.goBack()
	};


	return (
		<React.Fragment>
			<Modal
				animationIn={'slideInUp'}
				animationOut={'slideOutDown'}
				isVisible={true}
				avoidKeyboard={true}
				backdropOpacity={0.5}
				useNativeDriver={true}
				useNativeDriverForBackdrop={true}
				style={{ margin: 0 }}
			>
				<TouchableOpacity
					activeOpacity={1}
					style={{
						flex: 1,
						flexDirection: 'row',    //bắt buộc phải có cái này
						alignItems: 'flex-end',

					}}
					onPress={close}
				>
					<View
						onLayout={onLayout}
						style={[{
							flex: 1,
							borderTopRightRadius: 20,
							borderTopLeftRadius: 20,
							backgroundColor: '#fff',
							paddingBottom: insets.bottom,
						}, formHeight ? { height: formHeight } : {}]}>

						<View style={{ alignContent: "center", alignItems: "center" }}>
							{localAvatar ? (
								<DispatchImage
									style={{
										marginTop: 20,
										width: 70,
										height: 70,
										borderRadius: 50,
										borderWidth: 0.7,
										borderColor: "#ccc",
									}}
									source={localAvatar}
									type={"avatar"}
									data={{
										cloudLink: cloudAvatar,
									}}
								/>
							) : (
								<Image
									source={DefaultAvatar}
									style={{
										marginTop: 20,
										width: 70,
										height: 70,
										borderRadius: 50,
									}}
								/>
							)}
							<View style={{ marginVertical: 10, }}>
								<Text
									style={{
										fontSize: 20,
										fontWeight: "500",
										// marginBottom: 10,
									}}
								>
									{Someone.name}
								</Text>
							</View>
						</View>
						{/* <ScrollView> */}
						{/* component is personal */}
						<PopupElementIsPersonal _id={_id} />
						{/* component is group */}
						{
							(
								isThreadGroup && myPosition === 1 && !checkchinhtoi && checkIsGroup && statusMember === 1) ?
								<PopupElementIsGroup _id={_id} />
								: null
						}

						{/* <View style={{ height: 50, backgroundColor: "#fff" }} /> */}
						{/* </ScrollView> */}
					</View>
				</TouchableOpacity>
			</Modal>
		</React.Fragment>
		// 	<Animated.View
		// 		style={{
		// 			height: HEIGHT,
		// 			width: WIDTH,
		// 			backgroundColor: "#aaa",
		// 			opacity: 0.2,
		// 		}}
		// 	>
		// 		<TouchableOpacity
		// 			onPress={close}
		// 			style={{
		// 				// flex: 1,
		// 				height: SCREEN_HEIGHT,
		// 				width: WIDTH,
		// 			}}
		// 		></TouchableOpacity>
		// 	</Animated.View>
		// 	<Animated.View
		// 		onLayout={onLayout}
		// 		// ref={(view) => {
		// 		//   measureHeightRef.current = view;
		// 		// }}
		// 		style={[
		// 			{
		// 				position: "absolute",
		// 				zIndex: 1,

		// 				// height: 500,
		// 				width: WIDTH,
		// 				borderTopLeftRadius: 20,
		// 				borderTopRightRadius: 20,
		// 				backgroundColor: "#fff",
		// 				transform: [
		// 					{
		// 						translateY: translateYRef,
		// 					},
		// 				],
		// 			},
		// 			formHeight ? { height: formHeight } : {},
		// 		]}
		// 	>
		// 		<View style={{ alignContent: "center", alignItems: "center" }}>
		// 			{localAvatar ? (
		// 				<DispatchImage
		// 					style={{
		// 						marginTop: 30,
		// 						width: 70,
		// 						height: 70,
		// 						borderRadius: 50,
		// 						borderWidth: 0.7,
		// 						borderColor: "#ccc",
		// 					}}
		// 					source={localAvatar}
		// 					type={"avatar"}
		// 					data={{
		// 						cloudLink: cloudAvatar,
		// 					}}
		// 				/>
		// 			) : (
		// 				<Image
		// 					source={DefaultAvatar}
		// 					style={{
		// 						marginTop: 30,
		// 						width: 70,
		// 						height: 70,
		// 						borderRadius: 50,
		// 					}}
		// 				/>
		// 			)}
		// 			<Text
		// 				style={{
		// 					fontSize: 20,
		// 					fontWeight: "500",
		// 					marginBottom: 10,
		// 				}}
		// 			>
		// 				{Someone.name}
		// 			</Text>
		// 		</View>
		// 		<ScrollView>
		// 			{/* component is personal */}
		// 			<PopupElementIsPersonal _id={_id} />
		// 			{/* component is group */}
		// 			{
		// 				(
		// 					isThreadGroup && myPosition === 1 && !checkchinhtoi && checkIsGroup && statusMember === 1) ?
		// 					<PopupElementIsGroup _id={_id} />
		// 					: null
		// 			}

		// 			<View style={{ height: 50, backgroundColor: "#fff" }} />
		// 		</ScrollView>
		// 	</Animated.View>
		// </View >
	);
};

export default PopupUserInfo;