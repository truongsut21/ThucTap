import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, View, Text, TouchableOpacity,
    TextInput, Dimensions,
    KeyboardAvoidingView,
    Platform, ScrollView,
    ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import AntIcon from 'react-native-vector-icons/AntDesign';

import StatusBar from '../../base/components/StatusBar';
import { connect } from 'react-redux';
import styles from '../static/styles';
import { useNavigation } from '@react-navigation/core';
import * as ActionAuth from '../controllers/actionTypes';
import ShowCodeConfirmSignUp from './ShowCodeConfirmSignUp';

var _ = require('lodash');




const SignUp = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [announcement, setAnnouncement] = useState(false)
    const [email, setEmail] = useState("")
    const [fullname, setFullName] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRePassword] = useState("")


    const [checkFull, setCheckFull] = useState(true);


    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserID] = useState("");
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    useEffect(() => {
        if (email && fullname && password && repassword) {
            setCheckFull(true);
        }
        else {
            setCheckFull(false);

        }

    }, [email, fullname, password, repassword])
    const handleShowSignUp = () => {

        setAnnouncement(true);

    }


    const doSignUp = () => {
        setAnnouncement(false)
        if (password !== repassword) {
            dispatch({
                type: ActionAuth.UPDATE_ERROR,
                data: {
                    error: "Password not match !!!",
                }
            })
        }
        else if (password.length < 4) {
            dispatch({
                type: ActionAuth.UPDATE_ERROR,
                data: {
                    error: "Minimum password length is 4!!!",
                }
            })
        }
        else {
            setIsLoading(true);

            dispatch({
                type: ActionAuth.API_SIGN_UP,
                data: {
                    email,
                    fullname,
                    mobile, 
                    password,

                },
                setIsLoading,
                setUserID,
                setShowModalConfirm
            })
        }
    }
    return (
        <React.Fragment>
            <SafeAreaView style={styles.az} />
            <SafeAreaView style={styles.ba}>
                <StatusBar barStyle='light-content' backgroundColor='#00ccaf' />
                <View style={{
                    height: 50,
                    backgroundColor: '#fff',
                    position: 'relative',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#ddd'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginRight: 5 }}>
                            <TouchableOpacity delayPressIn={0} delayPressOut={0} style={{ padding: 10 }} onPress={() => navigation.goBack()}>
                                <AntIcon color='#00ccaf' size={22} name='arrowleft' style={{}} />
                            </TouchableOpacity>
                        </View>

                        <View style={{}}>
                            <View style={{ paddingVertical: 2 }}>
                                {/* <Feather name='key' size={20} style={{ paddingRight: 7 }} /> */}
                                <View style={styles.bc}>
                                    <Text style={styles.bd}>
                                        Đăng ký tài khoản TOMAHO
                                    </Text>
                                </View>
                            </View>
                        </View>


                    </View>
                </View>
                {/* <View style={styles.bb}>
                
                </View> */}
                <View style={{
                    padding:10,
                }}></View>
                <KeyboardAvoidingView style={styles.be}
                    behavior={Platform.OS === 'android' ? '' : 'padding'}
                    keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 44}>
                    <ScrollView style={styles.bf} contentContainerStyle={{ justifyContent: 'center' }}>
                        {/* email */}
                        <View style={styles.bg}>
                            <View style={styles.bh}>
                                <Text style={styles.bi}>
                                    EMAIL
                            </Text>
                            </View>

                            <View style={styles.bj}>
                                <TextInput
                                    style={styles.bk}
                                    onChangeText={e => setEmail(e)}
                                    keyboardType='email-address'
                                    value={email}
                                    placeholder='example@gmail.com'
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    autoCorrect={false}
                                    blurOnSubmit={true}
                                    autoFocus={true}

                                />
                            </View>
                        </View>
                        <View style={styles.bl} />
                        {/* name */}
                        <View style={styles.bg}>
                            <View style={styles.bh}>
                                <Text style={styles.bi}>
                                    HỌ TÊN NGƯỜI ĐĂNG KÝ
                            </Text>
                            </View>

                            <View style={styles.bj}>
                                <TextInput
                                    style={styles.bk}
                                    onChangeText={fullname => setFullName(fullname)}
                                    value={fullname}
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    autoCorrect={false}
                                    blurOnSubmit={true}
                                // autoFocus={true}
                                />
                            </View>
                        </View>
                        <View style={styles.bl} />
                        {/* sdt */}
                        <View style={styles.bg}>
                            <View style={styles.bh}>
                                <Text style={styles.bi}>
                                    SỐ ĐIỆN THOẠI
                            </Text>
                            </View>

                            <View style={styles.bj}>
                                <TextInput
                                    style={styles.bk}
                                    onChangeText={mobile => setMobile(mobile)}
                                    keyboardType='numeric'
                                    maxLength={10}
                                    value={mobile}
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    autoCorrect={false}
                                    blurOnSubmit={true}
                                />
                            </View>
                        </View>
                        <View style={styles.bl} />
                        {/* password */}
                        <View style={styles.bg}>
                            <View style={styles.bh}>
                                <Text style={styles.bi}>
                                    MẬT KHẨU
                            </Text>
                            </View>

                            <View style={styles.bj}>
                                <TextInput
                                    style={styles.bk}
                                    onChangeText={password => setPassword(password)}
                                    secureTextEntry={true}
                                    value={password}
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    autoCorrect={false}
                                    blurOnSubmit={true}
                                />
                            </View>
                        </View>
                        <View style={styles.bl} />
                        {/* repassword */}

                        <View style={styles.bg}>
                            <View style={styles.bh}>
                                <Text style={styles.bi}>
                                    NHẬP LẠI MẬT KHẨU
                            </Text>
                            </View>

                            <View style={styles.bj}>
                                <TextInput
                                    style={styles.bk}
                                    onChangeText={repassword => setRePassword(repassword)}
                                    secureTextEntry={true}
                                    value={repassword}
                                    autoCapitalize='none'
                                    autoCompleteType='off'
                                    autoCorrect={false}
                                    blurOnSubmit={true}
                                />
                            </View>
                        </View>
                        <View style={styles.bl} />

                        <TouchableOpacity
                            style={styles.bm}
                            onPress={() => {
                                navigation.navigate('Auth')
                            }}
                            delayPressIn={0}
                            delayPressOut={0}>
                            <FontAwesome name='user-o' size={14} style={styles.bn} />
                            <View style={styles.bo}>

                                <Text style={styles.bp}>
                                    Đã có tài khoản ?
                            </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.bq}>
                            {
                                isLoading ?

                                    <ActivityIndicator size="large" color="#00ff00" />
                                    :

                                    <TouchableOpacity
                                        style={[{ borderColor: checkFull ? '#00ccaf' : '#fff', backgroundColor: checkFull ? '#00ccaf' : '#ccc' }, styles.br]}

                                        delayPressIn={0}
                                        delayPressOut={0}
                                        onPress={handleShowSignUp}
                                        disabled={!checkFull}
                                    >
                                        <View style={styles.bs}>
                                            <Text style={[{ color: checkFull ? '#fff' : '#fff' }, styles.bt]}>
                                                {/* <Text style={styles.bt}> */}
                                    Đăng ký
                                </Text>
                                        </View>
                                    </TouchableOpacity>

                            }
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

            </SafeAreaView>
            {
                showModalConfirm ?

                    <ShowCodeConfirmSignUp
                        userId={userId}
                        setShowModalConfirm={setShowModalConfirm}
                    />
                    : null
            }


            <Modal isVisible={announcement} style={{ margin: 0 }}
                onBackButtonPress={() => {
                    navigation.navigate('Auth')
                    setAnnouncement(false)
                }}
                onBackdropPress={() => {
                    navigation.navigate('Auth')
                    setAnnouncement(false)
                }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{
                        // minHeight: 80,
                        maxWidth: Dimensions.get('window').width / 10 * 7,
                        backgroundColor: '#fff',
                        borderRadius: 13,
                    }}>
                        <View style={{
                            // flex: 1, 
                            justifyContent: 'center', alignItems: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderBottomWidth: 1, borderColor: '#eee'
                        }}>
                            <Text style={{ color: '#333', fontSize:16, padding: 10,fontWeight: Platform.OS === 'android' ? 'bold' : '600' }}>
                                Hoàn tất đăng ký
                        </Text>
                            {/* <Text style={{fontSize: 12}}>
                            Chuyển về màn hình đăng nhập
                        </Text> */}
                        </View>
                        <View style={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            // backgroundColor:"#ccc",
                            padding: 10,
                        }}>

                            <TouchableOpacity
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 20,
                                    paddingVertical: 5,
                                    backgroundColor: "#00ccaf",
                                    borderRadius: 6,
                                }}
                                onPress={doSignUp}

                                delayPressIn={0}
                                delayPressOut={0}>
                                <Text style={{ color: '#fff', fontWeight: Platform.OS === 'android' ? 'bold' : '500' }}>
                                    OK
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', padding: 0, marginLeft: 10 }}
                                onPress={() => {
                                    // navigation.navigate('Auth')
                                    setAnnouncement(false)
                                }}
                                delayPressIn={0}
                                delayPressOut={0}>
                                <Text style={{ color: '#ff471a', fontWeight: Platform.OS === 'android' ? 'bold' : '500' }}>
                                    Hủy bỏ
                            </Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </View>
            </Modal>

        </React.Fragment>
    )
}

export default SignUp





// class SignUp extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ready: false,
//             email: '',
//             errorEmail: false,
//             company: '',
//             errorCompany: false,
//             fullname: '',
//             errorFullname: false,
//             mobile: '',
//             errorMobile: false,
//             password: '',
//             errorPassword: false,
//             repassword: '',
//             announcement: false,
//             announcementError: false,
//         }
//     }
//     doSignUp = () => {
//         if (this.state.ready) {
//             this.props.dispatch({
//                 type: 'SIGN_UP',
//                 data: {
//                     name: this.state.fullname,
//                     password: this.state.password,
//                     phone: this.state.mobile,
//                     company: this.state.company,
//                     email: this.state.email,
//                     address: 'blank',
//                 }
//             })
//         }
//     }
//     componentDidMount() {
//         if (this.state.email && this.state.company && this.state.fullname && this.state.mobile && this.state.password && this.state.repassword && !this.state.ready) {
//             this.setState({
//                 ready: true
//             })
//         }
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (this.state.email && this.state.company && this.state.fullname && this.state.mobile && this.state.password && this.state.repassword && !prevState.ready) {
//             if (this.state.password === this.state.repassword) {
//                 this.setState({
//                     ready: true,
//                     errorEmail: false,
//                     errorCompany: false,
//                     errorFullname: false,
//                     errorMobile: false,
//                     errorPassword: false,
//                 })
//             }
//             else {

//             }
//         }

//         if (prevState.ready && (!this.state.email || !this.state.company || !this.state.fullname || !this.state.mobile || !this.state.password || !this.state.repassword)) {
//             this.setState({
//                 ready: false
//             })
//         }

//         if (this.state.password && this.state.repassword && this.state.password !== this.state.repassword && !prevState.errorPassword) {
//             this.setState({
//                 ready: false,
//                 errorPassword: true
//             })
//         }

//         if (this.state.password && this.state.repassword && this.state.password === this.state.repassword && prevState.errorPassword) {
//             this.setState({
//                 ready: true,
//                 errorPassword: false,
//             })
//         }

//         if (this.props.signUpSuccess && !prevProps.signUpSuccess) {
//             this.setState({
//                 announcement: true
//             })
//         }

//         if (this.props.signUpMessage && !_.isEqual(this.props.signUpMessage, prevProps.signUpMessage)) {
//             this.setState({
//                 announcementError: true,
//             })
//         }
//     }

//     componentWillUnmount() {

//     }

//     render() {
//         // return <WebView source={{ uri: 'https://www.tomahosoft.com/yeu-cau-dung-thu' }}/>
//         return (
//             <React.Fragment>
//                 <SafeAreaView style={styles.az} />
//                 <SafeAreaView style={styles.ba}>
//                     <StatusBar barStyle='light-content' backgroundColor='#00ccaf' />
//                     <View style={styles.bb}>
//                         <Feather name='key' size={20} style={{paddingRight: 7}}/>
//                         <View style={styles.bc}>
//                             <Text style={styles.bd}>
//                                 ĐĂNG KÝ TÀI KHOẢN TOMAHO
//                             </Text>
//                         </View>
//                     </View>

//                     <KeyboardAvoidingView style={styles.be}
//                         behavior={Platform.OS === 'android' ? '' : 'padding'} keyboardVerticalOffset={Platform.OS === 'android' ? 0 : 44}>
//                         <ScrollView style={styles.bf} contentContainerStyle={{justifyContent :'center'}}>
//                             <View style={styles.bg}>
//                                 <View style={styles.bh}>
//                                     <Text style={styles.bi}>
//                                         EMAIL
//                                     </Text>
//                                 </View>

//                                 <View style={styles.bj}>
//                                     <TextInput 
//                                         style={styles.bk}
//                                         onChangeText={email => this.setState({ email })}
//                                         keyboardType='email-address'
//                                         value={this.state.email}
//                                         placeholder='example@gmail.com'
//                                         autoCapitalize='none'
//                                         autoCompleteType='off'
//                                         autoCorrect={false}
//                                         blurOnSubmit={true}
//                                     />
//                                 </View>
//                             </View>
//                             <View style={styles.bl}/>

//                             {/* <View style={styles.bg}>
//                                 <View style={styles.bh}>
//                                     <Text style={styles.bi}>
//                                         TÊN CÔNG TY
//                                     </Text>
//                                 </View>

//                                 <View style={styles.bj}>
//                                     <TextInput 
//                                         style={styles.bk}
//                                         onChangeText={company => this.setState({ company })}
//                                         value={this.state.company}
//                                         autoCapitalize='none'
//                                         autoCompleteType='off'
//                                         autoCorrect={false}
//                                         blurOnSubmit={true}
//                                     />
//                                 </View>
//                             </View> */}
//                             <View style={styles.bl}/>

//                             <View style={styles.bg}>
//                                 <View style={styles.bh}>
//                                     <Text style={styles.bi}>
//                                         HỌ TÊN NGƯỜI ĐĂNG KÝ
//                                     </Text>
//                                 </View>

//                                 <View style={styles.bj}>
//                                     <TextInput 
//                                         style={styles.bk}
//                                         onChangeText={fullname => this.setState({ fullname })}
//                                         value={this.state.fullname}
//                                         autoCapitalize='none'
//                                         autoCompleteType='off'
//                                         autoCorrect={false}
//                                         blurOnSubmit={true}
//                                     />
//                                 </View>
//                             </View>
//                             <View style={styles.bl}/>

//                             <View style={styles.bg}>
//                                 <View style={styles.bh}>
//                                     <Text style={styles.bi}>
//                                         SỐ ĐIỆN THOẠI
//                                     </Text>
//                                 </View>

//                                 <View style={styles.bj}>
//                                     <TextInput 
//                                         style={styles.bk}
//                                         onChangeText={mobile => this.setState({ mobile })}
//                                         keyboardType='numeric'
//                                         maxLength={10}
//                                         value={this.state.mobile}
//                                         autoCapitalize='none'
//                                         autoCompleteType='off'
//                                         autoCorrect={false}
//                                         blurOnSubmit={true}
//                                     />
//                                 </View>
//                             </View>
//                             <View style={styles.bl}/>

//                             <View style={styles.bg}>
//                                 <View style={styles.bh}>
//                                     <Text style={styles.bi}>
//                                         MẬT KHẨU
//                                     </Text>
//                                 </View>

//                                 <View style={styles.bj}>
//                                     <TextInput 
//                                         style={styles.bk}
//                                         onChangeText={password => this.setState({ password })}
//                                         secureTextEntry={true}
//                                         value={this.state.password}
//                                         autoCapitalize='none'
//                                         autoCompleteType='off'
//                                         autoCorrect={false}
//                                         blurOnSubmit={true}
//                                     />
//                                 </View>
//                             </View>
//                             <View style={styles.bl}/>

//                             <View style={styles.bg}>
//                                 <View style={styles.bh}>
//                                     <Text style={styles.bi}>
//                                         NHẬP LẠI MẬT KHẨU
//                                     </Text>
//                                 </View>

//                                 <View style={styles.bj}>
//                                     <TextInput 
//                                         style={styles.bk}
//                                         onChangeText={repassword => this.setState({ repassword })}
//                                         secureTextEntry={true}
//                                         value={this.state.repassword}
//                                         autoCapitalize='none'
//                                         autoCompleteType='off'
//                                         autoCorrect={false}
//                                         blurOnSubmit={true}
//                                     />
//                                 </View>
//                             </View>
//                             <View style={styles.bl}/>

//                             <TouchableOpacity 
//                                 style={styles.bm}
//                                 onPress={() => {
//                                     this.props.navigation.navigate('Auth')
//                                 }}
//                                 delayPressIn={0}
//                                 delayPressOut={0}>
//                                 <FontAwesome name='user-o' size={14} style={styles.bn}/>
//                                 <View style={styles.bo}>

//                                     <Text style={styles.bp}>
//                                         Đã có tài khoản ?
//                                     </Text>
//                                 </View>
//                             </TouchableOpacity>

//                             <View style={styles.bq}>
//                                 <TouchableOpacity style={[{borderColor: this.state.ready ? '#00ccaf' : '#fff', backgroundColor: this.state.ready ? '#00ccaf' : '#ccc'}, styles.br]}
//                                     delayPressIn={0}
//                                     delayPressOut={0} 
//                                     onPress={this.doSignUp}
//                                     disabled={!this.state.ready}>
//                                     <View style={styles.bs}>
//                                         <Text style={[{color: this.state.ready ? '#fff' : '#fff'}, styles.bt]}>
//                                             Đăng ký
//                                         </Text>
//                                     </View>
//                                 </TouchableOpacity>
//                             </View>
//                         </ScrollView>
//                     </KeyboardAvoidingView>
//                 </SafeAreaView>

//                 <Modal isVisible={this.state.announcement} style={{margin: 0}}
//                     onBackButtonPress={() => {
//                         this.props.navigation.navigate('Auth')
//                         this.setState({
//                             announcement: false
//                         })
//                     }}
//                     onBackdropPress={() => {
//                         this.props.navigation.navigate('Auth')
//                         this.setState({
//                             announcement: false,
//                         })
//                     }}>
//                     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//                         <View style={{
//                             minHeight: 100,
//                             maxWidth: Dimensions.get('window').width / 10 * 7,
//                             backgroundColor: '#fff',
//                             borderRadius: 13,
//                         }}>
//                             <View style={{
//                                 flex: 1, 
//                                 justifyContent: 'center', alignItems: 'center', 
//                                 paddingVertical: 12,
//                                 paddingHorizontal: 25, 
//                                 borderBottomWidth: 1, borderColor: '#eee'}}>
//                                 <Text style={{color: '#333', fontWeight: Platform.OS === 'android' ? 'bold' : '600' }}>
//                                     Hoàn tất
//                                 </Text>
//                                 <Text style={{fontSize: 12}}>
//                                     Chuyển về màn hình đăng nhập
//                                 </Text>
//                             </View>
//                             <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 0}} 
//                                 onPress={() => {
//                                     this.props.navigation.navigate('Auth')
//                                     this.setState({
//                                         announcement: false,
//                                     })
//                                 }}
//                                 delayPressIn={0} 
//                                 delayPressOut={0}>
//                                 <Text style={{color: '#00ccaf', fontWeight: Platform.OS === 'android' ? 'bold' : '500'}}>
//                                     OK
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </Modal>

//                 <Modal isVisible={this.state.announcementError} style={{margin: 0}}
//                     onBackButtonPress={() => {
//                         this.props.navigation.navigate('Auth')
//                         this.setState({
//                             announcementError: false
//                         })
//                     }}
//                     onBackdropPress={() => {
//                         this.props.navigation.navigate('Auth')
//                         this.setState({
//                             announcementError: false,
//                         })
//                     }}>
//                     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//                         <View style={{
//                             minHeight: 100,
//                             minWidth: 200,
//                             maxWidth: Dimensions.get('window').width / 10 * 7,
//                             backgroundColor: '#fff',
//                             borderRadius: 13,
//                         }}>
//                             <View style={{
//                                 flex: 1, 
//                                 justifyContent: 'center', alignItems: 'center', 
//                                 paddingVertical: 12,
//                                 paddingHorizontal: 25, 
//                                 borderBottomWidth: 1, borderColor: '#eee'}}>
//                                 <Text style={{color: '#333', fontWeight: Platform.OS === 'android' ? 'bold' : '600', fontSize: 15 }}>
//                                     Lỗi
//                                 </Text>
//                                 <Text style={{fontSize: 12}}>
//                                     {this.props.signUpMessage}
//                                 </Text>
//                             </View>
//                             <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 0}} 
//                                 onPress={() => {
//                                     this.props.dispatch({
//                                         type: 'UPDATE_SIGN_UP_STATUS',
//                                         message: '',
//                                         data: false,
//                                     })
//                                     this.setState({
//                                         announcementError: false,
//                                     })
//                                 }}
//                                 delayPressIn={0} 
//                                 delayPressOut={0}>
//                                 <Text style={{color: '#00ccaf', fontWeight: Platform.OS === 'android' ? 'bold' : '500'}}>
//                                     Quay về
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </Modal>
//             </React.Fragment>
//         )
//     }
// }

// function mapStateToProps(state) {
//     return {
//         signUpMessage: state.AuthStoredReducer.signUpMessage,
//         signUpSuccess: state.AuthStoredReducer.signUpSuccess,
//     }
// }
// export default connect(mapStateToProps)(SignUp);