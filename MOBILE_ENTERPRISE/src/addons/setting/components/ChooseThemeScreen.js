import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StatusBar
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import useTheme from '../../base/components/useTheme';
import * as BaseAction from '../../base/controllers/actionTypes';

const ChooseThemeScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const theme = useTheme();
    const currentTheme = useSelector(state => state.BaseStoredReducer.theme) || 'light';

    const changeTheme = (theme) => {
        dispatch({
            type: BaseAction.CHANGE_THEME,
            data: { theme: theme }
        })
    }

    return (<SafeAreaView style={{
        flex: 1,
        backgroundColor: theme.backgroundColor
    }}>
        <StatusBar barStyle={theme.statusBar} />
        <View
            style={{
                height: 50,
                backgroundColor: theme.backgroundColor,
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
                    Giao diện
                </Text>
            </View>
            <View style={{ width: 50 }}></View>
        </View>
        <View style={{
            flex: 1,
            backgroundColor: theme.backgroundColor,
            flexDirection: 'row'
        }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={e => changeTheme('light')}
                style={{
                    width: '50%',
                    height: 200,
                    // backgroundColor: 'red',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <View style={{ paddingBottom: 10, }}>
                    <Text style={{
                        fontSize: 15,
                        color: theme.textColor,
                        fontWeight: 'bold'
                    }}>
                        Sáng
                    </Text>
                </View>
                <View style={{
                    width: 80,
                    height: 80,
                    borderWidth: 5,
                    borderRadius: 10,
                    borderColor: '#00A48D',
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <MaterialCommunityIcons color="#00A48D" size={30} name="theme-light-dark" style={{}} />
                </View>
                <View style={{
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {
                        currentTheme && currentTheme === 'light'
                            ?
                            <Fontisto color="#00A48D" size={22} name="radio-btn-active" style={{}} />
                            :
                            <Fontisto color="#00A48D" size={22} name="radio-btn-passive" style={{}} />
                    }
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={e => changeTheme('dark')}
                style={{
                    width: '50%',
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <View style={{ paddingBottom: 10, }}>
                    <Text style={{
                        fontSize: 15,
                        color: theme.textColor,
                        fontWeight: 'bold'
                    }}>
                        Tối
                    </Text>
                </View>
                <View style={{
                    width: 80,
                    height: 80,
                    borderWidth: 5,
                    borderRadius: 10,
                    borderColor: '#999',
                    backgroundColor: '#eee',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <MaterialCommunityIcons color="#000" size={30} name="theme-light-dark" style={{}} />
                </View>
                <View style={{
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {
                        currentTheme && currentTheme === 'dark'
                            ?
                            <Fontisto color="#00A48D" size={22} name="radio-btn-active" style={{}} />
                            :
                            <Fontisto color="#00A48D" size={22} name="radio-btn-passive" style={{}} />
                    }
                </View>
            </TouchableOpacity>
        </View>
    </SafeAreaView>)
}

export default ChooseThemeScreen;