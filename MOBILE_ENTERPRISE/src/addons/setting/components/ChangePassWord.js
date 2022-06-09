import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from "react-native";

import { useDispatch } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ActionAuth from "../../auth/controllers/actionTypes";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";

var _ = require("lodash");

const ChangePassWord = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [reNewPassword, setReNewPassword] = useState("");

    const submitChangePassword = () => {
        if (reNewPassword.length > 0 && password.length > 0 && newPassword.length > 0) {
            if (reNewPassword !== newPassword) {
                dispatch({
                    type: ActionAuth.UPDATE_ERROR,
                    data: {
                        error: "Mật khẩu nhập lại không trùng",
                    }
                })
            }
            else {
                dispatch({
                    type: ActionAuth.API_CHANGE_PASSWORD,
                    data: {
                        password,
                        newPassword,
                        reNewPassword,
                    },
                });
            }
        } else {
            dispatch({
                type: ActionAuth.UPDATE_ERROR,
                data: {
                    error: "Vui lòng điền đầy đủ thông tin",
                }
            })
        }
    };

    return (
        <SafeAreaView
            style={{
                backgroundColor: "#fff",
                height: "100%",
            }}
        >
            <View
                style={{
                    height: 50,
                    backgroundColor: "#fff",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottomWidth: 0.5,
                    borderBottomColor: "#ddd",
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
                    <AntDesign color="#00A48D" size={22} name="arrowleft" style={{}} />
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingLeft: 10,
                    }}
                >
                    <Text style={{ fontSize: 17, color: "#000", fontWeight: "500" }}>
                        Đổi mật khẩu
                    </Text>
                </View>
                <View style={{ width: 50 }}></View>
            </View>
            <ScrollView style={{ padding: 20 }}>
                <Text
                    style={{
                        marginTop: 10,
                        paddingVertical: 10,
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#00ccaf",
                        // marginLeft:20,
                    }}
                >
                    Mật khẩu hiện tại
                </Text>
                <TextInput
                    style={{
                        borderRadius: 20,
                        paddingHorizontal: 15,
                        // color: "#f1f",
                        borderWidth: 1,
                        borderColor: "#00ccaf",
                        padding: 10,
                        height: 45,
                    }}
                    keyboardType="email-address"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    placeholder="Nhập mât hiện tại"
                />
                <Text
                    style={{
                        marginTop: 10,
                        paddingVertical: 10,
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#00ccaf",
                        // marginLeft:20,
                    }}
                >
                    Mật khẩu mới
                </Text>
                <TextInput
                    style={{
                        borderRadius: 20,
                        paddingHorizontal: 15,
                        // color: "#f1f",
                        borderWidth: 1,
                        borderColor: "#00ccaf",
                        padding: 10,
                        height: 45,
                    }}
                    keyboardType="email-address"
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    placeholder="Nhập mât khẩu mới"
                />
                <Text
                    style={{
                        marginTop: 10,
                        paddingVertical: 10,
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#00ccaf",
                        height: 45,
                        // marginLeft:20,
                    }}
                >
                    Nhập lại mật khẩu
                </Text>
                <TextInput
                    style={{
                        borderRadius: 20,
                        paddingHorizontal: 15,
                        // color: "#f1f",
                        borderWidth: 1,
                        borderColor: "#00ccaf",
                        padding: 10,
                        height: 45,
                    }}
                    keyboardType="email-address"
                    value={reNewPassword}
                    onChangeText={(text) => setReNewPassword(text)}
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    placeholder="Nhập lại mât khẩu mới"
                />
                <TouchableOpacity onPress={submitChangePassword} style={{
                    height: 45, flexDirection: 'row',
                    marginBottom: 5,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#00A48D',
                    marginTop: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: '#00A48D',
                }}>
                    <Text style={{
                        color: "#fff",
                        fontWeight: "700",
                    }}>Xác nhận</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ChangePassWord;
