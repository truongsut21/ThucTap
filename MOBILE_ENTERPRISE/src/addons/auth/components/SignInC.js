
import React, { useState, useEffect, useRef, } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    SafeAreaView, View, Text, TouchableOpacity,
    TextInput, ActivityIndicator,
    KeyboardAvoidingView,
    Platform, Image, TouchableWithoutFeedback, Keyboard,
    LayoutAnimation, UIManager, ScrollView
} from 'react-native';
import instance from '@react-native-firebase/iid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import StatusBar from '../../base/components/StatusBar';
import * as Action from '../controllers/actionTypes';
import styles from '../static/styles';
import ShowCodeConfirm from './ShowCodeConfirm';
import { useNavigation } from '@react-navigation/core';

var _ = require('lodash');
var image = require('../static/logo.png')




if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SignIn = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [loadingSignIn, setLoadingSignIn] = useState(false);
    const [userId, setUserID] = useState('');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showNewStepSecurity, setShowNewStepSecurity] = useState(false);
    // show bang nhap code
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [showShowLogo, setShowShowLogo] = useState(true);

    const onChangeUsername = text => {
        setUsername(text);
    }

    // //////////////////////////////////


    // //////////////////////////
    //RENDER LOGO 
    const renderLogo = () => {
        return (<React.Fragment>
            {
                showShowLogo
                    ?
                    <View style={{
                        height: 150,
                        marginTop: 10,
                        marginBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // backgroundColor:"red",
                    }}>
                        <Image

                            style={styles.ae}
                            source={image}
                        />
                    </View>
                    :
                    <View style={{ paddingTop: 40 }}></View>
            }
        </React.Fragment>)
    }

    // HANDLE SHOW KEYBOARD

    // const _keyboardWillShow = (e) => {
    //     LayoutAnimation.configureNext({
    //         duration: 200,
    //         create: {
    //             type: LayoutAnimation.Types.linear,
    //             property: LayoutAnimation.Properties.opacity,
    //         },
    //         update: {
    //             type: LayoutAnimation.Types.linear,
    //             property: LayoutAnimation.Properties.opacity,
    //         },
    //         delete: {
    //             type: LayoutAnimation.Types.linear,
    //             property: LayoutAnimation.Properties.opacity,
    //         },
    //     });
    //     setShowKeyboard(true)
    // }
    // const _keyboardWillHide = (e) => {
    //     setShowKeyboard(false)
    // }
    // const _keyboardDidShow = (e) => {
    //     setShowKeyboard(true)
    // }
    // const _keyboardDidHide = (e) => {
    //     setShowKeyboard(false)
    // }



    // xử lí submit
    const forwardAction = () => {
        if (!username && !password) {
            dispatch({
                type: Action.UPDATE_ERROR,
                data: {
                    error: "Vui lòng điền đầy đủ thông tin",
                }
            })
        }
        else {
            dispatch({
                type: Action.API_SIGN_IN,
                data: {
                    username: username,
                    password: password,
                },
                setUserID,
                setLoadingSignIn,
                setShowNewStepSecurity,

            })
        }

        // Keyboard.dismiss();
    }

    // render footer
    const renderFooter = () => {
        return (<React.Fragment>
            {!showKeyboard
                ?
                <View style={{
                    height: 100,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: 20,
                    paddingBottom: 20,
                }}>
                    <View style={{
                        backgroundColor: '#fff',
                        padding: 7,
                        alignItems: 'center'
                        // borderRadius: 20,
                        // borderWidth: 2,
                        // borderColor: '#00A48D'
                    }}>
                        <Text style={{
                            fontSize: 15,
                            color: '#aaa',
                            fontWeight: '500'
                        }}>
                            Bởi
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            color: '#00A48D',
                            fontWeight: '600'
                        }}>
                            TOMAHO JSC.
                        </Text>
                    </View>
                </View>
                :
                null}
        </React.Fragment>)
    }
    // useEffect(() => {
    // if (Platform.OS !== 'android') {

    //     let keyboardWillShowListener = Keyboard.addListener(
    //         'keyboardWillShow',
    //         _keyboardWillShow,
    //     );

    //     let keyboardWillHideListener = Keyboard.addListener(
    //         'keyboardWillHide',
    //         _keyboardWillHide,
    //     );
    // }
    // else {
    //     let keyboardDidShowListener = Keyboard.addListener(
    //         'keyboardDidShow',
    //         _keyboardDidShow,
    //     );
    //     const keyboardDidHideListener = Keyboard.addListener(
    //         'keyboardDidHide',
    //         _keyboardDidHide,
    //     );

    // }
    //     return () => {

    //         if (Platform.OS !== 'android') {
    //             if (keyboardWillShowListener) {
    //                 keyboardWillShowListener.remove();
    //             }
    //             if (keyboardWillHideListener) {
    //                 keyboardWillHideListener.remove();
    //             }
    //         }
    //         else {
    //             if (keyboardDidShowListener) {
    //                 keyboardDidShowListener.remove();
    //             }
    //             if (keyboardDidHideListener) {
    //                 keyboardDidHideListener.remove();
    //             }
    //         }
    //     }
    // }, [])
    const handleOffLogo = () => {
        setShowShowLogo(false)
    }
    const handleOnLogo = () => {
        setShowShowLogo(true)

    }
    return (
        <React.Fragment>
            <SafeAreaView style={styles.aa} />
            <SafeAreaView style={styles.ab}>
                <StatusBar barStyle='light-content' backgroundColor='#00A48D' />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'android' ? 'padding' : 'padding'}
                    keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 44}
                    style={styles.ac}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                        }}>
                            {renderLogo()}
                            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                                <React.Fragment>
                                    <View style={{
                                        height: 45, flexDirection: 'row',
                                        marginBottom: 5,
                                        borderRadius: 20,
                                        borderWidth: 1,
                                        borderColor: '#00A48D',


                                    }}>
                                        <View style={{
                                            height: 45, width: 45,
                                            justifyContent: 'center',
                                            alignItems: 'center',


                                        }}>
                                            <MaterialCommunityIcons color='#00A48D' name='account' size={20} />
                                        </View>
                                        <TextInput
                                            // ref={login => this.login = login}
                                            autoCapitalize={'none'}
                                            style={{
                                                flex: 1,
                                                color: '#333',
                                                paddingVertical: Platform.OS === 'android' ? 7 : 12,
                                                paddingRight: 10,

                                            }}
                                            onFocus={handleOffLogo}
                                            onBlur={handleOnLogo}
                                            placeholder='Nhập tài khoản...'
                                            placeholderTextColor='#737373'
                                            onChangeText={onChangeUsername}
                                            value={username}
                                            editable={true}
                                            onSubmitEditing={() => { }}
                                            keyboardType='email-address'
                                            autoCompleteType='off'
                                            autoCorrect={false}
                                        />
                                    </View>
                                    <View style={{
                                        height: 45, flexDirection: 'row',
                                        marginBottom: 5,
                                        borderRadius: 20,
                                        borderWidth: 1,
                                        borderColor: '#00A48D',
                                        marginTop: 10,
                                    }}>
                                        <View style={{
                                            height: 45, width: 45,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                            <Entypo color='#00A48D' name='lock' size={20} />
                                        </View>
                                        <TextInput
                                            onFocus={handleOffLogo}
                                            onBlur={handleOnLogo}
                                            autoCapitalize={'none'}
                                            secureTextEntry={true}
                                            style={{
                                                fontFamily: 'Helvetica',
                                                flex: 1,
                                                color: '#333',
                                                paddingVertical: Platform.OS === 'android' ? 7 : 12,
                                                paddingRight: 10,
                                            }}
                                            placeholder='Nhập mật khẩu...'
                                            placeholderTextColor='#737373'
                                            onChangeText={password => setPassword(password)}
                                            value={password}
                                            autoCompleteType='off'
                                            autoCorrect={false}
                                        />
                                    </View>
                                    <TouchableOpacity onPress={forwardAction} style={{
                                        height: 45, flexDirection: 'row',
                                        marginBottom: 5,
                                        borderRadius: 20,
                                        borderWidth: 1,
                                        borderColor: '#00A48D',
                                        marginTop: 40,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: '#00A48D',
                                    }}>
                                        <Text style={{
                                            color: "#fff",
                                            fontWeight: "700",
                                        }}>Đăng nhập</Text>
                                    </TouchableOpacity>
                                </React.Fragment>

                                <React.Fragment>
                                    <View style={styles.ao}>
                                        <TouchableOpacity
                                            style={styles.as}
                                            onPress={async () => {

                                                try {

                                                    navigation.navigate('SignUp');
                                                }
                                                catch (error) {

                                                }
                                            }}
                                            delayPressOut={0} delayPressIn={0}>
                                            <Text style={styles.at}>
                                                CHƯA CÓ TÀI KHOẢN?
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.ap}
                                            onPress={() => {
                                                //     this.props.dispatch({
                                                //         type: 'UPDATE_RESET_PASSWORD_STATUS',
                                                //         message: '',
                                                //         data: false,
                                                //     })
                                                navigation.navigate('ResetPassword');
                                            }}
                                            delayPressOut={0} delayPressIn={0}>
                                            <Text style={styles.aq}>
                                                Quên mật khẩu
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </React.Fragment>
                            </View>
                            {
                                showShowLogo ? renderFooter() : null
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>

            <ShowCodeConfirm
                userId={userId}
                showNewStepSecurity={showNewStepSecurity}
                setShowNewStepSecurity={setShowNewStepSecurity}
            />


            {
                loadingSignIn ?
                    <View style={{
                        padding: 10,
                        alignItems: 'center'
                    }}>
                        <View style={{
                            backgroundColor: '#00A48D',
                            width: 40, height: 40,
                            borderRadius: 40,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ActivityIndicator size='small' color={'#fff'} />
                        </View>
                    </View> : null
            }
        </React.Fragment>
    )
}

// function mapStateToProps(state) {
//     return {
//         // activeUser: state.AuthStoredReducer.activeUser,
//         // loggedUsers: state.AuthStoredReducer.loggedUsers,
//         errorMessage: state.AuthUnstoredReducer.errorMessage,
//         loadingSignIn: state.AuthUnstoredReducer.loadingSignIn,
//     }
// }
// export default connect(mapStateToProps)(SignIn);

export default SignIn;