import React, { useState, useEffect } from "react";
import {
	FlatList,
	TextInput,
	StatusBar,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import isEqual from "react-fast-compare";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/core";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import ContactElement from './ContactElement';
import { WIDTH } from '../../chat/controllers/utils';
var _ = require("lodash");

const SearchBar = ({ searchValue, setSearchValue, thread_id }) => {

	return (<View style={{
		justifyContent: 'center',
		alignItems: 'center'
	}}>
		<View
			style={{
				// flex: 1,
				width: WIDTH - 20,
				height: 40,
				paddingHorizontal: 10,
				borderRadius: 20,
				borderWidth: 1,
				borderColor: "#eee",
				backgroundColor: "#eee",
				flexDirection: 'row',
				marginTop: 10,
			}}
		>
			<TextInput
				placeholder="Tìm liên hệ trong danh sách"
				placeholderTextColor="#aaa"
				onChangeText={(e) => setSearchValue(e)}
				value={searchValue}
				style={{
					fontSize: 16,
					flex: 1,
					paddingLeft: 10,
					color: "#000"
				}}
			/>
			{searchValue.length > 0 ? (
				<TouchableOpacity
					style={{
						height: 35,
						padding: 5,
						justifyContent: "center",
						alignItems: "center",
					}}
					onPress={() => setSearchValue("")}
				>
					<View style={{ height: 35, justifyContent: "center" }}>
						<FontAwesome name="remove" size={20} color="#ccc" style={{}} />
					</View>

				</TouchableOpacity>
			) : null}
		</View>
	</View>)
}



const FindFriendAndInvitationSummary = ({ }) => {
	const navigation = useNavigation();
	const countInvitation = useSelector((state) => {
		let myFriends = state.FriendStoredReducer.myFriends || {};
		let friends = Object.values(myFriends);
		return friends.filter((f) => f.friend_status === "invitation").length;
	}, (prev, next) => isEqual(prev, next));

	const goInvite = () => {
		navigation.navigate("Invitation")
	}

	const goFind = () => {
		navigation.navigate("FindFriend")
	}

	return (<View>
		<TouchableOpacity
			onPress={goInvite}
			style={{
				flexDirection: "row",
				height: 60,
				paddingHorizontal: 10,
				alignItems: "center",
			}}
		>
			<View
				style={{
					width: 40,
					height: 40,
					marginRight: 10,
					borderRadius: 20,
					backgroundColor: "#00A48D",
					alignItems: "center",
					justifyContent: "center",
				}}
			>

				<AntDesign name="addusergroup" size={20} color="#fff" />
			</View>
			<View>
				<Text
					style={{
						fontSize: 16,
						fontWeight: "500",
					}}
				>
					Lời mời kết bạn
					<Text
						style={{
							color: "red",
							fontSize: 16,
						}}
					>
						{" "}
						({countInvitation})
					</Text>
				</Text>
			</View>
		</TouchableOpacity>
		<TouchableOpacity
			onPress={goFind}
			style={{
				flexDirection: "row",
				height: 60,
				paddingHorizontal: 10,
				alignItems: "center",
			}}
		>
			<View
				style={{
					width: 40,
					height: 40,
					marginRight: 10,
					borderRadius: 20,
					backgroundColor: "#00A48D",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<AntDesign name="search1" size={20} color="#fff" />
			</View>
			<View>
				<Text
					style={{
						fontSize: 16,
						fontWeight: "500",
					}}
				>
					Tìm bạn bè
				</Text>
			</View>
		</TouchableOpacity>
	</View>);
}



const Friend = ({ }) => {
	//kết quả nhập vào ô input
	const navigation = useNavigation();
	const route = useRoute();
	const thread_id = route.params && route.params.thread_id;
	const [searchValue, setSearchValue] = useState("");

	//lay danh sach  ban
	const Friends = useSelector((state) => {
		let myFriends = state.FriendStoredReducer.myFriends || {};
		let friends = Object.values(myFriends);
		let sortedFriends = _.orderBy(friends, "name", "asc");
		return sortedFriends.filter((f) => f.friend_status === "friend");
	}, (prev, next) => isEqual(prev, next));
	const [dataMyFriends, setDataMyFriends] = useState(Friends);

	// set data copy từ friend reducer để dùng đẻ filter
	// lay ra so loi moi ket ban
	//  moi vao cap nhat ds ban cap nhat lai friend khi Myfriend thay doi 



	useEffect(() => {
		setDataMyFriends(Friends)
	}, [Friends])

	// xử lí tìm bạn
	useEffect(() => {
		if (searchValue.length > 0) {
			let resultSearch = Friends.filter(
				(f) => f.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
			);
			setDataMyFriends(resultSearch);
		} else {
			setDataMyFriends(Friends);
		}
	}, [searchValue]);
	
	// hàm render friend trong flatlist
	const renderItem = ({ item, index }) => {
		return <ContactElement
			what_doing="render-friend"
			thread_id={thread_id}
			_id={item._id}
		/>;
	};

	const keyExtractor = (item, index) => item._id;
	const ListEmptyComponent = () => {
		if (searchValue.length > 0) {
			return (
				<View
					style={{
						// justifyContent:"center",
						// backgroundColor: "#ccc",
						height: "100%",
						alignItems: "center",
					}}
				>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "500",
						}}
					>
						Không tìm thấy bạn nào!!!
					</Text>
				</View>
			)
		}
		return (
			<View
				style={{
					// justifyContent:"center",
					// backgroundColor: "#ccc",
					height: "100%",
					alignItems: "center",
				}}
			>
				<View
					style={{
						justifyContent: "center",
						// backgroundColor:"#ccc",
						alignItems: "center",
						flexDirection: "row",
					}}
				>
					<Text
						style={{
							fontSize: 16,
							fontWeight: "500",
						}}
					>
						Bạn chưa có bạn nào!!!
					</Text>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("FindFriend");
						}}
					>
						<Text
							style={{
								fontSize: 16,
								fontWeight: "500",
								paddingLeft: 4,
								// backgroundColor:"#ccc",
								color: "red",
							}}
						>
							Tìm bạn?
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
	const getItemLayout = ({ item, index }) => {
		return { length: 50, offset: 50 * index, index }
	}

	const goBackWhenOnShareFriendView = () => {
		navigation.goBack();
	}

	// let deafautHeight = "100%";
	// if (Height) {
	// 	deafautHeight = Height;
	// }
	return (
		<SafeAreaView style={{
			backgroundColor: "#fff",
			flex: 1,
			// height: deafautHeight
		}}>
			{/* <View style={{
				top: 0,
			}}> */}
			<StatusBar backgroundColor="#fff" barStyle={"dark-content"} />

			<View
				style={{
					height: 50,
					backgroundColor: "#fff",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					borderBottomWidth: 1,
					borderBottomColor: "#ddd",
					paddingHorizontal: 10
					// marginBottom: 10,
				}}
			>
				{/* <View style={{ flexDirection: "row", alignItems: "center" }}> */}

				{/* <View style={{ paddingVertical: 2 }}> */}
				<View>
					<Text
						style={{
							// paddingLeft: 10,
							fontSize: 18,
							color: "#000",
							fontWeight: "500",
						}}
					>
						{
							thread_id ? 'Chia sẻ một danh thiếp' : 'Danh sách bạn bè'
						}
					</Text>
				</View>
				{
					thread_id ?

						<TouchableOpacity
							onPress={goBackWhenOnShareFriendView}
						>
							<Text style={{
								fontSize:17,
								color: '#00A48D',
								fontWeight:'bold'
							}}>Trở về</Text>
						</TouchableOpacity>
						:
						null
				}
				{/* </View> */}
				{/* {thread_id ?
							<TouchableOpacity
								onPress={() => navigation.goBack()}
							>
								<Text style={{ marginLeft: 237 }}>X</Text>
							</TouchableOpacity>
							: null} */}
				{/* </View> */}
			</View>

			{/* search */}



			{/* search */}
			{/* </View> */}

			{
				!thread_id
					?
					<React.Fragment>
						<FindFriendAndInvitationSummary />
						<View style={{ height: 1, backgroundColor: '#ddd' }} />
					</React.Fragment>
					: null
			}

			<SearchBar
				thread_id={thread_id}
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>

			{/* <View style={{ height: 1, backgroundColor: "#ddd" }}></View> */}
			<View
				style={{
					flex: 1,
					// height: "70%",
					// backgroundColor:"red",
					marginHorizontal: 10,
				}}
			>

				<Text
					style={{
						fontSize: 16,
						fontWeight: "500",
						paddingVertical: 7,
						paddingTop: 15,
					}}
				>
					Bạn bè
					{Object.keys(Friends).length > 0 ? (
						<Text
							style={{
								fontWeight: "500",
							}}
						>
							{` (${Object.values(Friends).length})`}
						</Text>
					) : null}
				</Text>
				{/* css ban be */}
				<FlatList
					data={dataMyFriends}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
					ListEmptyComponent={ListEmptyComponent}
					// getItemLayout={getItemLayout}
					removeClippedSubviews={true}
				/>

			</View>
		</SafeAreaView>
	);
};
export default React.memo(Friend, (prevProps, nextProps) => {
	return isEqual(prevProps, nextProps);
});