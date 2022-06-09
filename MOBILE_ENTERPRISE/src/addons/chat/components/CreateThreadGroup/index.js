import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
	Image,
	View,
	SafeAreaView,
	Text,
	TouchableOpacity,
	StatusBar,
	TextInput,
	FlatList,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
var _ = require("lodash");
// import FriendAction from '../../../friend/controllers/actionType'
import * as ActionChat from "../../controllers/actionTypes";
import Ionicons from "react-native-vector-icons/Ionicons";
import ContactElement from '../../../friend/component/ContactElement';


function TotalCreateThreadGruop() {
	const route = useRoute();
	const navigation = useNavigation();
	const [search, setSearch] = useState("");

	const dispatch = useDispatch();
	const ignoreMember = route.params.ignoreMember || [];
	const filterMember = useSelector((state) => {
		const friend = state.FriendStoredReducer.myFriends;
		if (!friend) return true
		const array =
			Object.values(friend).filter((e) => e.friend_status === "friend").filter(f => f.name.includes(search))
			|| {};
		const idsMember = ignoreMember.map((e) => e._id);


		let getFriend = [];
		array.map((fr) => {
			let check = true;
			idsMember.forEach((item) => {
				if (fr._id === item) {
					check = false;
				}
			});
			if (check) {
				getFriend.push(fr);
			}
		});
		return getFriend;
	});
	const data = filterMember.map((e) => e._id);

	const [nameGroup, setNameGroup] = useState("");
	const ignoreIds = route.params.ignoreIds || {};
	const [resBack, setResBack] = useState('')
	const myFriends = useSelector((state) => {
		const myFriends = state.FriendStoredReducer.myFriends || {};
		return Object.values(myFriends)
			.filter((f) => {
				return f.friend_status === "friend";
			})
			.filter((f) => {
				return !ignoreIds[f];
			})
			.filter((f) => {
				return f.name.includes(search);
			})
			.map((f) => f._id);
	});

	const [selectedUserIds, setSelectedUserIds] = useState({});
	const userIds = Object.keys(selectedUserIds);
	const onChangeInput = (event) => {
		setSearch(event);
	};

	const chooseFriend = (_id) => {
		setSelectedUserIds((prev) => {
			return {
				...selectedUserIds,
				[_id]: true,
			};
		});
	};
	const unChooseFriend = (_id) => {
		let cloneSelected = { ...selectedUserIds };
		delete cloneSelected[_id];
		setSelectedUserIds(cloneSelected);
	};
	const renderItem = ({ item, index }) => {
		return (
			<ContactElement
				_id={item}
				isSelected={selectedUserIds[item]}
				chooseFriend={chooseFriend}
				unChooseFriend={unChooseFriend}
				what_doing="add-user-member"
			/>
		);
	};

	const keyExtractor = (item, index) => {
		return item
	}

	const handleCreateThreadGruop = () => {
		dispatch({
			type: ActionChat.API_CREATE_THREAD_GROUP,
			data: {
				name: nameGroup,
				contact_ids: userIds,
				navigation,

			},
		});
		// setSelectedUserIds({})
	};
	const handleAddMember = () => {
		dispatch({
			type: ActionChat.API_ADD_MEMBER_TO_THREAD,
			data: {
				selectedUsers: userIds,
				navigation,
			},
		});
		setSelectedUserIds({})
	};
	return (
		<SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
			{Platform.OS === "android" ? (
				<Text style={{ marginTop: 40 }}></Text>
			) : null}
			<View
				style={{
					height: 50,
					paddingHorizontal: 10,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					borderBottomWidth: 1,
					borderBottomColor: "#ddd",
				}}
			>
				<TouchableOpacity
					style={{}}
					onPress={() => {
						navigation.goBack();
					}}
				>
					<AntDesign color="#000" size={22} name="arrowleft" style={{}} />
				</TouchableOpacity>
				{Object.values(ignoreMember).length === 0 ? (
					<Text
						style={{
							fontSize: 17,
							color: "#000",
							fontWeight: "500",
							marginRight: '50%'
						}}
					>
						Tạo nhóm
					</Text>
				) : (
					<View style={{ marginRight: '40%' }}>
						<Text
							style={{
								fontSize: 17,
								fontWeight: "500",
								color: "#000",
							}}
						>
							Thêm thành viên
						</Text>
					</View>
				)}

				{ignoreMember.length === 0 ? (
					<TouchableOpacity onPress={handleCreateThreadGruop}>
						<View
							style={{
								height: "100%",
								alignItems: "center",
								justifyContent: "center",

							}}
						>
							<Text style={{ color: "#00A48D", fontSize: 17, fontWeight: "500" }}>
								Hoàn tất
							</Text>
						</View>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={handleAddMember}>
						<View
							style={{
								height: "100%",
								paddingLeft: 10,
								paddingRight: 5,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text style={{ fontSize: 17, fontWeight: "500", color: "#00A48D" }}>
								Thêm
							</Text>
						</View>
					</TouchableOpacity>
				)}
			</View>
			{ignoreMember.length === 0 ? (
				<View
					style={{
						borderBottomColor: "#ccc",
						borderBottomWidth: 1,
						borderRadius: 20,
						// margin: 10,
						height: 40,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<View style={{
						marginLeft: 4,
						flex:1,
						// width: '60%'
					}}>
						<TextInput
							onChangeText={(e) => setNameGroup(e)}
							placeholder="Đặt tên nhóm"
							placeholderTextColor="#ccc"
							style={{
								flex: 1,
								fontSize: 15,
								fontWeight: "400",
								width: '100%',
								paddingHorizontal: 10,
								color: "#000"
							}}
						/>
					</View>
					<View style={{ marginTop: 0, paddingLeft: 10, paddingRight: 10 }}><Ionicons name="pencil" size={20} color="#00A48D" /></View>
				</View>
			) : null}
			<View style={{
				flexDirection: 'row',
				justifyContent: 'center', marginTop: 10, marginBottom: 10,
				marginLeft: 0,
				justifyContent: 'space-between',
			}}>
				<View
					style={{
						marginTop: 5,
						marginLeft: 10,
						paddingHorizontal: 20,
						height: 40,
						width: "95.5%",
						borderRadius: 20,
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						borderWidth: 1,
						borderColor: "#eee",
						backgroundColor: "#eee",

					}}
				>
					<TextInput
						placeholder='Tìm tên hoặc số điện thoại'
						onChangeText={onChangeInput}
						placeholderTextColor="#bbb"
						style={{
							fontSize: 15,
							fontWeight: "400",
							width: '100%',
							paddingVertical: 10,
							color: "#000"
						}} />
				</View>
			</View>
			{ignoreMember.length === 0 ? (
				<View
					style={{
						backgroundColor: "#fff",
						borderRadius: 10,
						flex: 1,
						// height: '100%',
						// width: '100%',
						overflow: 'scroll',
						paddingHorizontal: 10,

					}}
				>
					<FlatList
						data={myFriends}
						renderItem={renderItem}
						keyExtractor={keyExtractor}
						removeClippedSubviews={true}
					/>
				</View>
			) : (
				<View
					style={{
						backgroundColor: "#fff",
						borderRadius: 10,
						flex: 1,
						// height: '100%',
						// width: '100%',
						paddingHorizontal: 10,
					}}
				>
					<FlatList
						data={data}
						renderItem={renderItem}
						keyExtractor={keyExtractor}
						removeClippedSubviews={true}
					/>
				</View>
			)}
		</SafeAreaView>
	);
}

export default TotalCreateThreadGruop;
