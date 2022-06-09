import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import * as Action from "../controllers/actionTypes";
import useTheme from '../../base/components/useTheme';

const EditMyUserInfor = () => {
	const theme = useTheme();
	const myUserInfo = useSelector((state) => state.AuthStoredReducer.myUserInfo);

	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [newName, setNewName] = useState("");

	const handleChangeUserInforName = () => {
		if (newName.length > 0) {
			dispatch({
				type: Action.API_UPDATE_MY_USER_NEW_NAME,
				data: {
					newName,
				},
				setShowModal,
			});
			setNewName("");
		} else {
			setShowModal(false);
			dispatch({
				type: "UPDATE_ERROR",
				data: {
					error: "Vui lòng điền tên thay đổi",
				},
			});
		}
	};

	const renderModal = () => {
		try {
			return (
				<Modal
					isVisible={showModal}
					onBackButtonPress={() => {
						setShowModal(false);
						setNewName("");
					}}
					onBackdropPress={() => {
						setShowModal(false);
						setNewName("");
					}}
					style={{ justifyContent: "center", alignItems: "center" }}
				>
					<View
						style={{
							borderRadius: 6,
							backgroundColor: "#fff",
							width: "80%",
							justifyContent: "center",
							alignItems: "center",
							padding: 10,
						}}
					>
						<Text>Đổi tên</Text>
						<TextInput
							placeholderTextColor="#000"
							style={{
								marginHorizontal: 10,
								marginVertical: 10,
								paddingHorizontal: 10,
								borderRadius: 5,
								backgroundColor: "#f3f3f3",
								padding: 0,
								height: 50,
								color: "#000",
								width: "100%",
							}}
							underlineColorAndroid="green"
							placeholder="Đặt tên mới"
							onChangeText={(e) => {
								setNewName(e);
							}}
						/>
						<TouchableOpacity onPress={handleChangeUserInforName}>
							<Text style={{ fontSize: 16, color: "#00A48D" }}>Xác nhận</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			);
		} catch (error) {
			return null;
		}
	};
	return (
		<React.Fragment>
			<View
				style={{
					height: 50,
					flexDirection: "row",
					backgroundColor: theme.backgroundColor,
				}}
			>
				<View
					style={{
						width: 50,
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "row",
					}}
				>
					<FontAwesome name="user-o" size={20} color="#2e7d32" />
				</View>

				<View
					style={{
						flex: 1,
						// marginRight: 30,
						justifyContent: "center",
					}}
				>
					<View
						style={{
							justifyContent: "flex-start",
							flexDirection: "row",
						}}
					>
						<Text style={{
							flex: 1,
							color:theme.textColor
						}}>{myUserInfo.name}</Text>
						<TouchableOpacity
							style={{
								paddingHorizontal: 10,
							}}
							onPress={() => {
								setShowModal(!showModal);
							}}
						>
							<AntDesign name="edit" size={20} color={theme.iconColor} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
			{renderModal()}
		</React.Fragment>
	);
};

export default EditMyUserInfor;
