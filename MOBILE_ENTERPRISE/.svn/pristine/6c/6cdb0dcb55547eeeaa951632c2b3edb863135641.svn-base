import React, { useEffect } from "react";
import { useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	// StyleSheet,
	// Image,
	// Platform,
	TouchableOpacity,
	// TextInput,
	ScrollView,
	StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Foundation from "react-native-vector-icons/Foundation";
import Modal from "react-native-modal";
import * as ActionAuth from "../../auth/controllers/actionTypes";
import EditMyUserInfor from "./EditMyUserInfor";
import EditAvatar from "./EditAvatar";
import useTheme from '../../base/components/useTheme';

var _ = require("lodash");
var RNFS = require("react-native-fs");
const UserInfo = () => {
	const theme = useTheme();
	const myUserInfo = useSelector((state) => state.AuthStoredReducer.myUserInfo);
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [showModalLogout, setShowModalLogout] = useState(false);

	//thực hiện show modal logout;

	const modalLogout = () => {
		try {
			return (
				<Modal
					isVisible={showModalLogout}
					onBackButtonPress={() => {
						setShowModalLogout(false);
					}}
					onBackdropPress={() => {
						setShowModalLogout(false);
					}}
					style={{ justifyContent: "center", alignItems: "center" }}
				>
					<View
						style={{
							backgroundColor: "#fff",
							width: "70%",
							height: "auto",
							borderRadius: 10,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<View
							style={{
								width: "100%",
								alignItems: "center",
								borderBottomWidth: 1,
								borderBottomColor: "#ccc",
								paddingBottom: 2,
							}}
						>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "400",
									textAlign: "center",
									padding: 10,
								}}
							>
								Bạn có chắc chắn muốn đăng xuất tài khoản?
							</Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								width: "100%",
								justifyContent: "space-around",
								paddingVertical: 5,

								alignItems: "center",
							}}
						>
							<TouchableOpacity
								style={{
									backgroundColor: "#00A48D",
									paddingVertical: 4,
									paddingHorizontal: 6,
									borderRadius: 10,
								}}
								onPress={handleLogout}
							>
								<Text
									style={{
										color: "#fff",

										fontSize: 16,
									}}
								>
									Đồng ý
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									padding: 4,
								}}
								onPress={() => setShowModalLogout(false)}
							>
								<Text
									style={{
										color: "red",
										fontSize: 16,
										borderWidth: 0.5,
										paddingVertical: 4,
										paddingHorizontal: 6,
										borderColor: "red",
										borderRadius: 10,
									}}
								>
									Hủy bỏ
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			);
		} catch (error) {
			return null;
		}
	};

	//thuc hien show modal logout
	const handleShowModal = () => {
		setShowModalLogout(true);
	};
	// thực hiên logout
	const handleLogout = async () => {
		dispatch({
			type: ActionAuth.API_SIGN_OUT,
		});
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
			<StatusBar barStyle={theme.statusBar} />
			<View
				style={{
					height: 50,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					borderBottomWidth: 0.5,
					borderBottomColor: theme.borderColor,
				}}
			>
				<TouchableOpacity
					delayPressIn={0}
					delayPressOut={0}
					style={{
						padding: 10,
						width: 50,
					}}
					onPress={() => navigation.goBack()}
				>
					<AntDesign color={theme.iconColor} size={22} name="arrowleft" style={{}} />
				</TouchableOpacity>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						paddingLeft: 10,
					}}
				>
					<Text style={{
						fontSize: 17,
						color: theme.textColor,
						fontWeight: "500"
					}}>
						Người dùng
					</Text>
				</View>
				<View style={{ width: 50 }}></View>
			</View>
			<View
				style={{
					height: "100%",
				}}
			>
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						paddingVertical: 15,
					}}
				>
					<EditAvatar />
					<Text
						style={{
							paddingTop: 10,
							fontSize: 20,
							fontWeight: "500",
							color: theme.textColor
						}}
					>
						{myUserInfo.name}
					</Text>
				</View>
				<ScrollView>

					<EditMyUserInfor />
					<View
						style={{
							height: 50,
							flexDirection: "row",
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
							<AntDesign name="mail" size={20} color="#F06050" />
						</View>

						<View
							style={{
								flex: 1,
								justifyContent: "center",
							}}
						>
							<Text style={{
								color: theme.textColor
							}}>{myUserInfo.username}</Text>
						</View>
					</View>
					<View
						style={{
							height: 50,
							flexDirection: "row",
						}}
					>
						<View
							style={{
								width: 50,
								flexDirection: "row",
								justifyContent: "center",
								alignItems: 'center',
							}}
						>
							<Ionicons name="ios-call-outline" size={20} color="#F4A460" />
						</View>

						<View
							style={{
								flex: 1,
								justifyContent: "center",
							}}
						>

							<Text style={{
								color: theme.textColor
							}}>{myUserInfo.phone}</Text>
						</View>
					</View>


					{/* <View style={{ height: 1, backgroundColor: "#ddd" }} /> */}
					<View
						style={{
							height: 50,
							flexDirection: "row",
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
							<Ionicons name="key" size={20} color="#F4A460" />
						</View>

						<TouchableOpacity
							style={{
								flex: 1,
								marginRight: 30,
								justifyContent: "center",
							}}
							onPress={() =>
								navigation.navigate("ChangePassWord", {
									userID: myUserInfo._id,
								})
							}
						>
							<Text style={{
								color: theme.textColor
							}}>Đổi mật khẩu</Text>
						</TouchableOpacity>
					</View>
					<View
						style={{
							height: 50,
							flexDirection: "row",
						}}
						delayPressIn={0}
						delayPressOut={0}
					>
						<View
							style={{
								width: 50,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<AntDesign name="setting" size={20} color="#6CC1ED" />
						</View>
						<View
							style={{
								flex: 1,
								justifyContent: "center",
							}}
						>
							<Text
								style={{
									// fontSize: 14,
									color: theme.textColor
								}}
							>
								Thiết lập
							</Text>
						</View>
					</View>
					<View
						style={{
							height: 50,
							flexDirection: "row",
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
							<Foundation name="paint-bucket" size={20} color="#00A48D" />
						</View>

						<TouchableOpacity
							style={{
								flex: 1,
								marginRight: 30,
								justifyContent: "center",
							}}
							onPress={() =>
								navigation.navigate("ChooseTheme")
							}
						>
							<Text style={{
								color: theme.textColor
							}}>Giao diện</Text>
						</TouchableOpacity>
					</View>
					

					<TouchableOpacity
						style={{
							height: 50,
							flexDirection: "row",
						}}
						delayPressIn={0}
						delayPressOut={0}
						onPress={() => {
							navigation.navigate("SendError");
						}}
					>
						<View
							style={{
								width: 50,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<MaterialIcons size={20} name="error-outline" color="red" />
						</View>
						<View
							style={{
								flex: 1,
								// paddingHorizontal: 10,
								justifyContent: "center",
							}}
						>
							<Text
								style={{
									color: theme.textColor
								}}
							>
								Báo lỗi
							</Text>
						</View>
						<View
							style={{
								width: 50,
								justifyContent: "center",
								alignItems: "center",
							}}
						></View>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							height: 50,
							flexDirection: "row",
						}}
						delayPressIn={0}
						delayPressOut={0}
						onPress={handleShowModal}
					>
						<View
							style={{
								width: 50,
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<AntDesign name="logout" size={20} color="#EB7E7F" />
						</View>
						<View
							style={{
								flex: 1,
								justifyContent: "center",
							}}
						>
							<Text
								style={{
									color: theme.textColor
								}}
							>
								Đăng xuất
							</Text>
						</View>
						<View
							style={{
								width: 50,
								justifyContent: "center",
								alignItems: "center",
							}}
						></View>
					</TouchableOpacity>
				</ScrollView>
			</View>

			{modalLogout()}
		</SafeAreaView>
	);
};

export default UserInfo;
