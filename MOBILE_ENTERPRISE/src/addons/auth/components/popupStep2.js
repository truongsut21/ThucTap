import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ActivityIndicator, TextInput, TouchableOpacity, FlatList } from 'react-native';
import * as AuthAction from '../controllers/actionTypes';
import Octicons from 'react-native-vector-icons/Octicons';
import Modal from 'react-native-modal';

const popupStep2  = ({ username,userID,setSecurityCode, security_code,setShownewPassword,setShowNewStepSecurity ,setState, ...props }) => {
    const dispatch = useDispatch();

    const [showPromt, setShowPromt] = useState(true);
    const [showSecurityPromt, setShowSecurityPromt] = useState(true);
    const [loadingSecurity, setShowLoadingSecurity] = useState(false);
    const [listCompany, setListCompany] = useState([])

    const [code1, setCode1] = useState(security_code ? security_code[0] : '');
    const [code2, setCode2] = useState(security_code ? security_code[1] : '');
    const [code3, setCode3] = useState(security_code ? security_code[2] : '');
    const [code4, setCode4] = useState(security_code ? security_code[3] : '');
    const [code5, setCode5] = useState(security_code ? security_code[4] : '');
    const [code6, setCode6] = useState(security_code ? security_code[5] : '');
    const code1Ref = useRef();
    const code2Ref = useRef();
    const code3Ref = useRef();
    const code4Ref = useRef();
    const code5Ref = useRef();
    const code6Ref = useRef();
    const confirmSecurityCode = () => {
        setShowLoadingSecurity(true);
        setSecurityCode(`${code1}${code2}${code3}${code4}${code5}${code6}`);
        dispatch({
            type: AuthAction.API_SEND_SECURITY_CODE_FORFINALIZER_FORGET,
            data: {
                userID: userID,
                securityCode: `${code1}${code2}${code3}${code4}${code5}${code6}`,
            },
            setShowLoadingSecurity,
            setShowSecurityPromt,
            setShownewPassword,
            setShowNewStepSecurity
        })  

    }
    const handleKeyPress = (e) => {
    };
    return (
        <Modal isVisible={showPromt}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {
                    showSecurityPromt
                    ?
                    (
                        loadingSecurity
                        ?
                        <ActivityIndicator color='#fff' size='large'/>
                        :
                        <React.Fragment>
                            <View style={{
                                backgroundColor: '#fff',
                                width: '90%',
                                alignItems: 'center',
                                borderRadius: 15,
                            }}>
                                <View style={{
                                    paddingVertical: 30,
                                    width: '90%',
                             
                                }}>
                                    <Text style={{
                                        fontSize: 17,
                                        fontWeight: '600',
                                        textAlign: 'center',
                                       
                                        
                               
                                    }}>
                                        Nhập mã bảo mật
                                       được gửi từ email
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    width: '90%',
                                    paddingBottom: 30,
                                }}>
                                    <TextInput ref={code1Ref}
                                        value={code1}
                                        data = {1}
                                        onKeyPress={
                                            handleKeyPress 
                                        }
                                    
                                        onChangeText={(e) => {
                                            if (e.length > 1) {
                                                code2Ref.current.focus()
                                            } else {
                                                setCode1(e);
                                                if (e.length === 1) {
                                                    code2Ref.current.focus();
                                                }
                                            }
                                        }}
                                        style={{
                                            width: 38,
                                            height: 40,
                                            textAlign: 'center',
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            borderColor: '#00A48D',
                                            fontSize: 22,
                                            padding: 0,
                                            color:'#00A48D',
                                        }} />
                                    <TextInput ref={code2Ref}
                                        value={code2}
                                        onKeyPress={
                                            handleKeyPress 
                                        }
                                        onChangeText={(e) => {
                                            if (e.length > 1) {
                                                code3Ref.current.focus()
                                            } else {
                                                setCode2(e);
                                                if (e.length === 1) {
                                                    code3Ref.current.focus();
                                                }
                                            }
                                        }}
                                        style={{
                                            width: 38,
                                            height: 40,
                                            textAlign: 'center',
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            borderColor: '#00A48D',
                                            fontSize: 22,
                                            padding: 0,
                                            color:'#00A48D',
                                        }} />
                                    <TextInput ref={code3Ref}
                                        value={code3}
                                        onKeyPress={
                                            handleKeyPress 
                                        }
                                        onChangeText={(e) => {
                                            if (e.length > 1) {
                                                code4Ref.current.focus()
                                            } else {
                                                setCode3(e);
                                                if (e.length === 1) {
                                                    code4Ref.current.focus();
                                                }
                                            }
                                        }}
                                        style={{
                                            width: 38,
                                            height: 40,
                                            textAlign: 'center',
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            borderColor: '#00A48D',
                                            fontSize: 22,
                                            padding: 0,
                                            color:'#00A48D',
                                        }} />
                                    <TextInput ref={code4Ref}
                                        value={code4}
                                        onKeyPress={
                                            handleKeyPress 
                                        }
                                        onChangeText={(e) => {
                                            if (e.length > 1) {
                                                code5Ref.current.focus()
                                            } else {
                                                setCode4(e);
                                                if (e.length === 1) {
                                                    code5Ref.current.focus();
                                                }
                                            }
                                        }}
                                        style={{
                                            width: 38,
                                            height: 40,
                                            textAlign: 'center',
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            borderColor: '#00A48D',
                                            fontSize: 22,
                                            padding: 0,
                                            color:'#00A48D',
                                        }} />
                                    <TextInput ref={code5Ref}
                                        value={code5}
                                        onKeyPress={
                                            handleKeyPress 
                                        }
                                        onChangeText={(e) => {
                                            if (e.length > 1) {
                                                code6Ref.current.focus()
                                            } else {
                                                setCode5(e);
                                                if (e.length === 1) {
                                                    code6Ref.current.focus();
                                                }
                                            }
                                        }}
                                        style={{
                                            width: 38,
                                            height: 40,
                                            textAlign: 'center',
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            borderColor: '#00A48D',
                                            fontSize: 22,
                                            padding: 0,
                                            color:'#00A48D',
                                        }} />
                                    <TextInput ref={code6Ref}
                                        value={code6}
                                        onKeyPress={
                                            handleKeyPress 
                                        }
                                        onChangeText={(e) => {
                                            if (e.length <= 1) {
                                                setCode6(e);
                                            }
                                        }}
                                        style={{
                                            width: 38,
                                            height: 40,
                                            textAlign: 'center',
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            borderColor: '#00A48D',
                                            fontSize: 22,
                                            padding: 0,
                                            color:'#00A48D',
                                        }} />
                                </View>
                                <View style={{
                                    borderTopWidth: 0.3,
                                    borderTopColor: '#ddd',
                                    flexDirection: 'row',

                                }}>
                                    <TouchableOpacity
                                        style={{
                                            width: '50%',
                                            height: 40,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRightWidth: 0.3,
                                            borderRightColor: '#ddd'
                                        }}
                                        onPress={() => {
                                            setShowPromt(false)
                                           
                                        }}
                                    >
                                        <Text style={{
                                            color: 'red',fontSize:18,
                                        }}>
                                            Đóng!!
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            width: '50%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                        onPress={confirmSecurityCode}
                                        disabled={!code1 || !code2 || !code3 || !code4 || !code5 || !code6}
                                    >
                                        {
                                            false ?
                                            <ActivityIndicator />
                                            :
                                            <Text style={{
                                                fontSize:18,
                                                color: !code1 || !code2 || !code3 || !code4 || !code5 || !code6
                                                    ? '#ccc' : '#00A48D'
                                            }}>
                                                Hoàn tất
                                            </Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </React.Fragment>
                    )
                    :
                    <View style={{
                        backgroundColor: '#fff',
                        width: '70%',
                        alignItems: 'center',
                        borderRadius: 10,
                    }}>
                        <FlatList 
                            style={{width: '100%'}}
                            data={listCompany}
                            keyExtractor={item => item._id}
                            renderItem={({item, index}) => {
                                return (
                                    <TouchableOpacity style={{
                                        paddingHorizontal: 15,
                                        height: 60,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }} onPress={() => {
                                        dispatch({
                                            type: AuthAction.UPDATE_LOGGING_IN_USER,
                                            data: {
                                                company_id: item._id,
                                                identical_domain_name: item.identical_domain_name,
                                            }
                                        })
                                        dispatch({
                                            type: AuthAction.API_V2_VALIDATE_AFTER_COMPANY,
                                            data: {
                                                username: username,
                                                securityCode: `${code1}${code2}${code3}${code4}${code5}${code6}`,
                                                identicalDomainName: item.identical_domain_name,
                                            },
                                            // company_id: item._id,
                                            setState,
                                            setShowPromt,
                                            closeNewStepSecurity,
                                        })
                                        
                                        // setState({
                                        //     identicalDomainName: item.identical_domain_name,
                                        //     method: 'step3',
                                        // })
                                        // setShowPromt(false)
                                        // closeNewStepSecurity()
                                    }}>
                                        <View style={{
                                            marginRight: 15
                                        }}>
                                            <Octicons name='organization' size={20} />
                                        </View>
                                        <View style={{flex: 1}}>
                                            <Text style={{
                                                fontSize: 14
                                            }} numberOfLines={1} ellipsizeMode='tail'>
                                                {item.name}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                        <TouchableOpacity style={{
                            marginTop: 10,
                            width: '100%',
                            paddingVertical: 10,
                            alignItems: 'center',
                        }} onPress={() => {
                            setShowPromt(false)
                            closeNewStepSecurity()
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: '#f00',
                                fontWeight: 'bold',
                            }}>
                                Hủy !
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </Modal>
    )
}


 export default popupStep2;