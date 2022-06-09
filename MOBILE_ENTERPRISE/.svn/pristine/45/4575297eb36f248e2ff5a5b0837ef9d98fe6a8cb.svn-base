import React, { useState, useEffect, useRef, useDispatch } from 'react';
import { connect } from 'react-redux';
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
import PopupStep2 from './popupStep2';
var _ = require('lodash');
var image = require('../static/logo.png')



if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}
const SignIn = ({ navigation }) => {

    // const dispatch = useDispatch()


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showNewStepSecurity, setShowNewStepSecurity] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [error, SetError] = useState(false);
    const [errorMessage, SetErrorMessage] = useState("");
    const onChangeUsername = text => {
        setUsername(text);
    }
    const closeNewStepSecurity = () => {
        setShowNewStepSecurity(false);
    }
    //RENDER LOGO 
    const renderLogo = () => {
        return (<React.Fragment>
            {
                !showKeyboard
                    ?
                    <View style={{
                        height: 80,
                        marginTop: 10,
                        marginBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image
                            style={styles.ae}
                            source={image}
                        />
                    </View>
                    :
                    null
            }
        </React.Fragment>)
    }

    // HANDLE SHOW KEYBOARD
    const _keyboardWillHide = (e) => {
        setShowKeyboard(false)
    }
    const _keyboardDidShow = (e) => {
        setShowKeyboard(true)
    }
    const _keyboardDidHide = (e) => {
        setShowKeyboard(false)
    }
    // xử lí submit
    const forwardAction = () => {
        // lay data nguoi dung

        //
        if (username === "") {
            setUsername({
                error: true,
                errorMessage: "Vui lòng nhập đầy đủ thông tin",
            })
        }
        const dispatch = useDispatch()

        dispatch(() => {
            type: Action.API_VALIDATE_USERNAME
            data: {
                username: username
            }
            setUsername: setUsername
        })



        // if(username===" ")
        // {
        //     this.setState({
        //         error: true,
        //         errorMessage: "Vui lòng nhập đầy đủ thông tin",
        //     })
        // }

        // if (username && username.trim().length > 0) {
        //             dispatch({
        //                 type: Action.API_VALIDATE_USERNAME,
        //                 data: {
        //                     username: username
        //                 },
        //                 setState: setState
        //             })
        //         }
        // nếu đang là step 1 thì xử lí
        // if (this.state.method === 'step1') {
        //     if (this.state.username && this.state.username.trim().length > 0) {
        //         this.props.dispatch({
        //             type: Action.API_VALIDATE_USERNAME,
        //             data: {
        //                 username: this.state.username
        //             },
        //             setState: this.setState
        //         })
        //     }
        // }



        // nếu step 2 thì xử lý

        // else if (this.state.method === 'step2') {
        //     if (this.state.identicalDomainName && this.state.identicalDomainName.trim().length > 0) {
        //         this.props.dispatch({
        //             type: Action.API_VALIDATE_COMPANY,
        //             data: {
        //                 username: this.state.username,
        //                 identicalDomainName: this.state.identicalDomainName
        //             },
        //             setState: this.setState
        //         })
        //     }
        // }
        // nếu step 3 thì xử lí 
        // else {

        //     this.onPress();
        // }


        Keyboard.dismiss();
    }
    // render footer
    const renderFooter = () => {
        return (<React.Fragment>
            {showKeyboard
                ?
                <View style={{
                    height: 80,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: 20,
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
                                            // ref={password => {
                                            //     if (password) {
                                            //         password.setNativeProps({
                                            //             style: {
                                            //                 fontFamily: 'System'
                                            //             }
                                            //         })
                                            //     }
                                            //     this.password = password
                                            // }}
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
                                        borderColor: '#5299e0',
                                        marginTop: 40,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: '#5299e0',
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
                                            // onPress={() => {
                                            //     this.props.dispatch({
                                            //         type: 'UPDATE_RESET_PASSWORD_STATUS',
                                            //         message: '',
                                            //         data: false,
                                            //     })
                                            //     this.props.navigation.navigate('ResetPassword');
                                            // }}
                                            delayPressOut={0} delayPressIn={0}>
                                            <Text style={styles.aq}>
                                                Quên mật khẩu
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </React.Fragment>
                            </View>

                            {renderFooter()}

                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>

            <Modal isVisible={error}>
                <View style={styles.au}>
                    <View style={styles.av}>
                        <View style={styles.aw}>
                            <Text style={styles.ax}>
                                {errorMessage}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{}}
                            delayPressIn={0}
                            delayPressOut={0}
                            onPress={() => {
                                // this.setState({ error: false, errorMessage: '' });
                                // this.props.dispatch({
                                //     type: Action.UPDATE_ERROR_MESSAGE_WHILE_AUTH,
                                //     data: ''
                                // })
                            }}>
                            <Text style={styles.ay}>
                                Quay lại
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {
                showNewStepSecurity
                    ?
                    <PopupStep2
                        username={username}
                        password={password}
                        closeNewStepSecurity={closeNewStepSecurity}
                    // setState={this.setState}

                    />
                    :
                    null
            }
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        activeUser: AuthStoredReducer.activeUser,
        loggedUsers: AuthStoredReducer.loggedUsers,
        errorMessage: AuthUnstoredReducer.errorMessage,
        loadingSignIn: AuthUnstoredReducer.loadingSignIn,
    }
}
export default connect(mapStateToProps)(SignIn);































import React, { useState, useEffect, useRef, useDispatch } from 'react';
import { connect } from 'react-redux';
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
import PopupStep2 from './popupStep2';
var _ = require('lodash');
var image = require('../static/logo.png')

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}


class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            // identicalDomainName: '',
            showStickyUsername: false,
            // showUsernameInput: true,
            // showCompanyChoice: false,
            // showPasswordInput: false,
            error: false,
            errorMessage: '',
            showKeyboard: false,
            method: 'step1',
            showNewStepSecurity: false,
            newStepSecurity: '',
            loadingSignIn: false,
        };
        this.setState = this.setState.bind(this);
        this.login = React.createRef();
        this.password = React.createRef();
        this.company = React.createRef();
    }
    closeNewStepSecurity = () => {
        this.setState({
            showNewStepSecurity: false,
        })
    }
    // set pass word 
    onChangeUsername = text => {
        this.setState({
            username: text
        })
    }
    //set ten cong ty 
    // onChangeCompany = (text) => {
    //     this.setState({
    //         identicalDomainName: text
    //     })
    // }

    validateCompany = () => {

        if (this.state.identicalDomainName && this.state.identicalDomainName.trim().length > 0) {
            this.props.dispatch({
                type: Action.API_VALIDATE_COMPANY,
                data: {
                    username: this.state.username,
                    identicalDomainName: this.state.identicalDomainName
                },
                setState: this.setState
            })
        }
    }

    // click chuyển qua step 2 nhưng thừa

    // clickNext = () => {
    //     if (this.state.username && this.state.username.trim().length > 0) {
    //         this.props.dispatch({
    //             type: Action.API_VALIDATE_USERNAME,
    //             data: {
    //                 username: this.state.username
    //             },
    //             setState: this.setState
    //         })
    //     }


    //}


    // nut trở lại nhưng thừa không sử dụng nữa
    backwardAction = () => {

        // if (this.state.method === 'step1') {

        // }
        // else if (this.state.method === 'step2') {
        //     this.setState({
        //         username: '',
        //         identicalDomainName: '',
        //         method: 'step1',
        //     })
        // }
        // else {
        //     this.setState({
        //         password: '',
        //         identicalDomainName: '',
        //         method: 'step1',
        //     })
        // }
    }

    // nút submid khi điền đủ thông tin
    forwardAction = () => {

        if (this.state.username === "") {
            this.setState({
                error: true,
                errorMessage: "Vui lòng nhập đầy đủ thông tin",
            })
        }

        if (this.state.username && this.state.username.trim().length > 0) {
            this.props.dispatch({
                type: Action.API_VALIDATE_USERNAME,
                data: {
                    username: this.state.username
                },
                setState: this.setState
            })
        }
        // nếu đang là step 1 thì xử lí
        // if (this.state.method === 'step1') {
        //     if (this.state.username && this.state.username.trim().length > 0) {
        //         this.props.dispatch({
        //             type: Action.API_VALIDATE_USERNAME,
        //             data: {
        //                 username: this.state.username
        //             },
        //             setState: this.setState
        //         })
        //     }
        // }



        // nếu step 2 thì xử lý

        // else if (this.state.method === 'step2') {
        //     if (this.state.identicalDomainName && this.state.identicalDomainName.trim().length > 0) {
        //         this.props.dispatch({
        //             type: Action.API_VALIDATE_COMPANY,
        //             data: {
        //                 username: this.state.username,
        //                 identicalDomainName: this.state.identicalDomainName
        //             },
        //             setState: this.setState
        //         })
        //     }
        // }
        // nếu step 3 thì xử lí 
        // else {

        //     this.onPress();
        // }


        Keyboard.dismiss();
    }
    // xu li du lieu khi ok het :D
    onPress = () => {
        try {
            if (!this.state.username) {
                throw ('Vui lòng nhập tài khoản')
            }
            if (!this.state.password) {
                throw ('Vui lòng nhập mật khẩu')
            }
            if (!this.state.identicalDomainName) {
                throw ('Vui lòng nhập mã công ty')
            }
            this.setState({
                loadingSignIn: true
            })
            var self = this;
            // setTimeout(() => {
            //     self.props.dispatch({
            //         type: Action.API_SIGN_IN,
            //         data: {
            //             username: self.state.username,
            //             password: self.state.password,
            //             identicalDomainName: self.state.identicalDomainName,
            //             securityCode: self.state.newStepSecurity
            //         },
            //         navigation: this.props.navigation,
            //         setState: this.setState,
            //     })
            // }, 500);
        }
        catch (error) {
            this.setState({
                error: true,
                errorMessage: error,
            })
        }
    }
    _keyboardWillShow = (e) => {
        // Animated.timing(this.animateHeight, {
        //     toValue: 0,
        //     duration: 200,
        //     easing: Animated.EasingNode.linear,
        //     useNativeDriver: true
        // }).start(res => { })
        LayoutAnimation.configureNext({
            duration: 200,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            delete: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
        });
        this.setState({
            showKeyboard: true
        })
    }
    _keyboardWillHide = (e) => {
        // Animated.timing(this.animateHeight, {
        //     toValue: 200,
        //     duration: 150,
        //     easing: Animated.EasingNode.linear,
        //     useNativeDriver: true
        // }).start(res => { })
        this.setState({
            showKeyboard: false
        })
    }
    componentDidMount() {
        this.props.navigation.addListener('state', ({ data }) => {
            if (data.state.routes[0].params) {
                let { username, identical_domain_name } = data.state.routes[0].params[0]
                if (username && identical_domain_name) {
                    this.setState({
                        username: username,
                        identicalDomainName: identical_domain_name,
                        method: 'step3',
                    })
                }
            }
        })
        instance().deleteToken()
            .then(response => {
                AsyncStorage.removeItem('@firebaseToken');
            })
            .catch(error => {
            })

        if (Platform.OS !== 'android') {
            // this.keyboardDidShowListener = Keyboard.addListener(
            //     'keyboardDidShow',
            //     this._keyboardDidShow,
            // );
            this.keyboardWillShowListener = Keyboard.addListener(
                'keyboardWillShow',
                this._keyboardWillShow,
            );
            // this.keyboardDidHideListener = Keyboard.addListener(
            //     'keyboardDidHide',
            //     this._keyboardDidHide,
            // );
            this.keyboardWillHideListener = Keyboard.addListener(
                'keyboardWillHide',
                this._keyboardWillHide,
            );
        }
        else {
            this.keyboardDidShowListener = Keyboard.addListener(
                'keyboardDidShow',
                this._keyboardDidShow,
            );
            this.keyboardDidHideListener = Keyboard.addListener(
                'keyboardDidHide',
                this._keyboardDidHide,
            );
            // if (this.password.current) {
            //     this.password.current.setNativeProps({
            //         style: { fontFamily: 'sans-serif' } 
            //     })
            // }
        }
        this.setState({
            error: this.props.errorMessage ? true : false,
            errorMessage: this.props.errorMessage ? this.props.errorMessage : '',
        })
    }
    _keyboardDidShow = (e) => {
        this.setState({
            showKeyboard: true
        })
    }
    _keyboardDidHide = (e) => {
        this.setState({
            showKeyboard: false
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.errorMessage && !_.isEqual(prevProps.errorMessage, this.props.errorMessage)) {
            this.setState({
                error: true,
                errorMessage: this.props.errorMessage,
            })
        }

        // if (this.state.showPasswordInput && !prevState.showPasswordInput) {
        //     if (Platform.OS === 'android') {
        //         if (this.password.current) {
        //             this.password.current.setNativeProps({
        //                 style: { fontFamily: "roboto-regular" }
        //             })
        //         }
        //         if (this.company.current) {
        //             this.company.current.setNativeProps({
        //                 style: { fontFamily: "roboto-regular" }
        //             })
        //         }
        //     }
        // }
    }

    componentWillUnmount() {
        if (Platform.OS !== 'android') {
            this.keyboardWillShowListener.remove();
            this.keyboardWillHideListener.remove();
        }
        else {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }
        this.props.dispatch({
            type: Action.UPDATE_LOGGING_IN_USER,
            data: ''
        })
    }

    renderLogo() {
        return (<React.Fragment>
            {
                !this.state.showKeyboard
                    ?
                    <View style={{
                        height: 80,
                        marginTop: 10,
                        marginBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image
                            style={styles.ae}
                            source={image}
                        />
                    </View>
                    :
                    null
            }
        </React.Fragment>)
    }

    renderArrowNextPrev() {
        return (<React.Fragment>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {
                    this.state.loadingSignIn
                        ?
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
                        </View>
                        :
                        <React.Fragment>
                        </React.Fragment>
                }
            </View>
        </React.Fragment>)
    }

    renderFooter() {
        return (<React.Fragment>
            {!this.state.showKeyboard
                ?
                <View style={{
                    height: 80,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: 20,
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

    render() {
        return (
            <React.Fragment>
                <SafeAreaView style={styles.aa} />
                <SafeAreaView style={styles.ab}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'android' ? 'padding' : 'padding'}
                        keyboardVerticalOffset={Platform.OS === 'android' ? -500 : 44}
                        style={styles.ac}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                            }}>
                                {this.renderLogo()}
                                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                                    {
                                        this.state.showStickyUsername
                                            ?
                                            <React.Fragment>
                                                <View style={{
                                                    alignItems: 'center',
                                                    borderRadius: 10,
                                                }}>
                                                    <Text style={{
                                                        // backgroundColor: '#f3f3f3',
                                                        padding: 12,
                                                        overflow: 'hidden',
                                                        borderRadius: 20,
                                                        color: '#00A48D',
                                                        fontSize: 13,
                                                        fontWeight: '500'
                                                    }}>
                                                        {this.state.username}
                                                    </Text>
                                                </View>
                                            </React.Fragment>
                                            :
                                            null
                                    }
                                    {/* Step đầu tiên, nhập tên đăng nhập */}
                                    {
                                        this.state.method === 'step1'
                                            ?
                                            <React.Fragment>
                                                <View style={{
                                                    height: 45, flexDirection: 'row',
                                                    marginBottom: 5,
                                                    borderRadius: 20,
                                                    borderWidth: 1,
                                                    borderColor: '#5299e0',


                                                }}>
                                                    <View style={{
                                                        height: 45, width: 45,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',


                                                    }}>
                                                        <MaterialCommunityIcons color='#00A48D' name='account' size={20} />
                                                    </View>
                                                    <TextInput
                                                        ref={login => this.login = login}
                                                        autoCapitalize={'none'}
                                                        style={{
                                                            flex: 1,
                                                            color: '#333',
                                                            paddingVertical: Platform.OS === 'android' ? 7 : 12,
                                                            paddingRight: 10,

                                                        }}
                                                        placeholder='Nhập tài khoản...'
                                                        placeholderTextColor='#737373'
                                                        onChangeText={this.onChangeUsername}
                                                        value={this.state.username}
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
                                                    borderColor: '#5299e0',
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
                                                        ref={password => {
                                                            if (password) {
                                                                password.setNativeProps({
                                                                    style: {
                                                                        fontFamily: 'System'
                                                                    }
                                                                })
                                                            }
                                                            this.password = password
                                                        }}
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
                                                        onChangeText={password => this.setState({ password })}
                                                        value={this.state.password}
                                                        autoCompleteType='off'
                                                        autoCorrect={false}
                                                    />
                                                </View>
                                                <TouchableOpacity onPress={this.forwardAction} style={{
                                                    height: 45, flexDirection: 'row',
                                                    marginBottom: 5,
                                                    borderRadius: 20,
                                                    borderWidth: 1,
                                                    borderColor: '#5299e0',
                                                    marginTop: 20,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: '#5299e0',
                                                }}>
                                                    <Text style={{
                                                        color: "#fff",
                                                        fontWeight: "700",
                                                    }}>Đăng nhập</Text>
                                                </TouchableOpacity>
                                            </React.Fragment>
                                            :
                                            (
                                                this.state.username
                                                    ?
                                                    <React.Fragment>
                                                        <View style={{
                                                            height: 45, flexDirection: 'row',
                                                            marginBottom: 5,
                                                            borderRadius: 7,
                                                            borderWidth: 1,
                                                            borderColor: '#fff',
                                                        }}>
                                                            <View style={{
                                                                height: 45, width: 45,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                            }}>
                                                                <MaterialCommunityIcons color='#00A48D' name='account' size={20} />
                                                            </View>
                                                            <TextInput
                                                                ref={login => this.login = login}
                                                                autoCapitalize={'none'}
                                                                style={{
                                                                    flex: 1,
                                                                    color: '#00A48D',
                                                                    paddingVertical: Platform.OS === 'android' ? 7 : 12,
                                                                    paddingRight: 10,
                                                                }}
                                                                placeholder='Nhập tài khoản...'
                                                                placeholderTextColor='#737373'
                                                                onChangeText={this.onChangeUsername}
                                                                value={this.state.username}
                                                                editable={false}
                                                                keyboardType='email-address'
                                                                autoCompleteType='off'
                                                                autoCorrect={false}
                                                            />

                                                        </View>

                                                    </React.Fragment>
                                                    :
                                                    null
                                            )
                                    }
                                    {/* {
                                        this.state.method === 'step2'
                                            ?
                                            <React.Fragment>
                                                <View style={{
                                                    height: 45, flexDirection: 'row',
                                                    marginBottom: 5,
                                                    borderRadius: 7,
                                                    borderWidth: 1,
                                                    borderColor: '#5299e0',
                                                }}>
                                                    <View style={{
                                                        height: 45, width: 45,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                        <MaterialIcons color='#00A48D' name='work' size={20} />
                                                    </View>
                                                    <TextInput
                                                        ref={company => {
                                                            if (company) {
                                                                company.setNativeProps({
                                                                    style: {
                                                                        fontFamily: 'System'
                                                                    }
                                                                })
                                                            }
                                                            this.company = company
                                                        }}
                                                        autoCapitalize={'none'}
                                                        secureTextEntry={true}
                                                        style={{
                                                            flex: 1,
                                                            color: '#333',
                                                            paddingVertical: Platform.OS === 'android' ? 7 : 12,
                                                            paddingRight: 10,
                                                        }}
                                                        placeholder='Nhập mã công ty...'
                                                        placeholderTextColor='#737373'
                                                        onChangeText={this.onChangeCompany}
                                                        value={this.state.identicalDomainName}
                                                        autoCompleteType='off'
                                                        autoCorrect={false}
                                                    />
                                                </View>
                                            </React.Fragment>
                                            :
                                            (
                                                this.state.identicalDomainName
                                                    ?
                                                    <React.Fragment>
                                                        <View style={{
                                                            height: 45, flexDirection: 'row',
                                                            marginBottom: 5,
                                                            borderRadius: 7,
                                                            borderWidth: 1,
                                                            borderColor: '#fff',
                                                        }}>
                                                            <View style={{
                                                                height: 45, width: 45,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                            }}>
                                                                <MaterialIcons color='#00A48D' name='work' size={20} />
                                                            </View>
                                                            <TextInput
                                                                ref={company => {
                                                                    if (company) {
                                                                        company.setNativeProps({
                                                                            style: {
                                                                                fontFamily: 'System'
                                                                            }
                                                                        })
                                                                    }
                                                                    this.company = company
                                                                }}
                                                                autoCapitalize={'none'}
                                                                secureTextEntry={true}
                                                                style={{
                                                                    flex: 1,
                                                                    color: '#00A48D',
                                                                    paddingVertical: Platform.OS === 'android' ? 7 : 12,
                                                                    paddingRight: 10,
                                                                }}
                                                                placeholder='Nhập mã công ty...'
                                                                editable={false}
                                                                placeholderTextColor='#737373'
                                                                onChangeText={this.onChangeCompany}
                                                                value={this.state.identicalDomainName}
                                                                autoCompleteType='off'
                                                                autoCorrect={false}
                                                            />
                                                        </View>
                                                    </React.Fragment>
                                                    :
                                                    null
                                            )
                                    } */}
                                    {/* Nhập mật khẩu */}
                                    {
                                        this.state.method === 'step3'
                                            ?
                                            <React.Fragment>
                                                <View style={{
                                                    height: 45, flexDirection: 'row',
                                                    marginBottom: 5,
                                                    borderRadius: 7,
                                                    borderWidth: 1,
                                                    borderColor: '#5299e0',
                                                }}>
                                                    <View style={{
                                                        height: 45, width: 45,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}>
                                                        <Entypo color='#00A48D' name='lock' size={20} />
                                                    </View>
                                                    <TextInput
                                                        ref={password => {
                                                            if (password) {
                                                                password.setNativeProps({
                                                                    style: {
                                                                        fontFamily: 'System'
                                                                    }
                                                                })
                                                            }
                                                            this.password = password
                                                        }}
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
                                                        onChangeText={password => this.setState({ password })}
                                                        value={this.state.password}
                                                        autoCompleteType='off'
                                                        autoCorrect={false}
                                                    />

                                                </View>

                                            </React.Fragment>
                                            :
                                            null
                                    }
                                    {this.renderArrowNextPrev()}

                                    <React.Fragment>
                                        <View style={styles.ao}>
                                            <TouchableOpacity
                                                style={styles.as}
                                                onPress={async () => {
                                                    try {

                                                        this.props.navigation.navigate('SignUp');
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
                                                    this.props.dispatch({
                                                        type: 'UPDATE_RESET_PASSWORD_STATUS',
                                                        message: '',
                                                        data: false,
                                                    })
                                                    this.props.navigation.navigate('ResetPassword');
                                                }}
                                                delayPressOut={0} delayPressIn={0}>
                                                <Text style={styles.aq}>
                                                    Quên mật khẩu
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        {
                                            Array.isArray(Object.values(this.props.loggedUsers)) &&
                                                Object.values(this.props.loggedUsers).filter(u => u.token).length > 0
                                                ?
                                                <TouchableOpacity style={{
                                                    padding: 10
                                                }} delayPressOut={0} delayPressIn={0} onPress={() => {
                                                    this.setState({
                                                        username: '',
                                                        password: '',
                                                        identicalDomainName: '',
                                                        showStickyUsername: false,
                                                        // showUsernameInput: true,
                                                        // showCompanyChoice: false,
                                                        // showPasswordInput: false,
                                                        error: false,
                                                        errorMessage: '',
                                                    }, () => this.props.navigation.navigate('SwitchAccount'))
                                                }}>
                                                    <Text style={{
                                                        color: '#00A48D',
                                                        fontSize: 14,
                                                        fontStyle: 'italic',
                                                        textDecorationLine: 'underline'
                                                    }}>
                                                        Chuyển đổi tài khoản
                                                    </Text>
                                                </TouchableOpacity>
                                                :
                                                null
                                        }

                                    </React.Fragment>
                                </View>

                                {this.renderFooter()}

                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </SafeAreaView>

                <Modal isVisible={this.state.error}>
                    <View style={styles.au}>
                        <View style={styles.av}>
                            <View style={styles.aw}>
                                <Text style={styles.ax}>
                                    {this.state.errorMessage}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{}}
                                delayPressIn={0}
                                delayPressOut={0}
                                onPress={() => {
                                    this.setState({ error: false, errorMessage: '' });
                                    this.props.dispatch({
                                        type: Action.UPDATE_ERROR_MESSAGE_WHILE_AUTH,
                                        data: ''
                                    })
                                }}>
                                <Text style={styles.ay}>
                                    Quay lại
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {
                    this.state.showNewStepSecurity
                        ?
                        <PopupStep2
                            username={this.state.username}
                            password={this.state.password}
                            closeNewStepSecurity={this.closeNewStepSecurity}
                            setState={this.setState}

                        />
                        :
                        null
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeUser: state.AuthStoredReducer.activeUser,
        loggedUsers: state.AuthStoredReducer.loggedUsers,
        errorMessage: state.AuthUnstoredReducer.errorMessage,
        loadingSignIn: state.AuthUnstoredReducer.loadingSignIn,
    }
}
export default connect(mapStateToProps)(SignIn);