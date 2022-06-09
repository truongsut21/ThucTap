import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ActivityIndicator, TextInput, TouchableOpacity, FlatList } from 'react-native';
import * as AuthAction from '../controllers/actionTypes';
import Octicons from 'react-native-vector-icons/Octicons';
import Modal from 'react-native-modal';

const PopupShowCode  = ({ setShowNewStepSecurity,closeNewStepSecurity,userId,navigation,...props }) => {
    const dispatch = useDispatch();
    // check click back 2 lan;
    const [showPromt, setShowPromt] = useState(true);
    const [showSecurityPromt, setShowSecurityPromt] = useState(true);
    const [loadingSecurity, setShowLoadingSecurity] = useState(false);
    const [listCompany, setListCompany] = useState([])
    // set click;
    const [click,setClick] = useState(0)
    const [code1, setCode1] = useState('');
    const [code2, setCode2] = useState('');
    const [code3, setCode3] = useState('');
    const [code4, setCode4] = useState('');
    const [code5, setCode5] = useState('');
    const [code6, setCode6] = useState('');
    const code1Ref = useRef();
    const code2Ref = useRef();
    const code3Ref = useRef();
    const code4Ref = useRef();
    const code5Ref = useRef();
    const code6Ref = useRef();
    const allCodeRef = [code1Ref,code2Ref,code3Ref,code4Ref,code5Ref,code6Ref]
    
    
    const confirmSecurityCode = () => {
        setShowLoadingSecurity(true);
        dispatch({
            type: AuthAction.API_SEND_SECURITY_CODE_FOR_LOGIN,
            data: {
                userId,
                securityCode: `${code1}${code2}${code3}${code4}${code5}${code6}`,
            },
            // setListCompany,
            setShowLoadingSecurity,
            setShowSecurityPromt,
            setShowNewStepSecurity,
            navigation,
        })
    }
    // let click = 0;
    const handleKeyPress = (e) => {
        let keyValue = e.nativeEvent.key;
      
        let index = (parseInt(e.target._internalFiberInstanceHandleDEV.pendingProps.data))-1;
    
        if(keyValue === 'Backspace')
      {
            setClick(click=>click+1);
            let newClick = click
            if(newClick >= 2)
            {
                if(index>0&&index<6){
                        
                        allCodeRef[index-1].current.focus();
                        setClick(1)
                }
                else
                {
                    allCodeRef[index].current.focus();
                    setClick(1)

                }
            }
          
        }
    };
    return (
        <Modal isVisible={showPromt}>
            <View style={{
                flex: 1,
                alignItems: 'center',
                // justifyContent: 'center',
                paddingTop:50,
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
                                    paddingVertical: 16,
                                    width: '90%',
                             
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: '600',
                                        textAlign: 'center',
                                        color:'#00A48D',
                                        
                                        
                               
                                    }}>
                                        Nhập mã bảo mật
                                       
                                    </Text>
                                    <Text style={{
                                        fontSize:12,
                                        paddingTop:10,
                                        paddingBottom:0,
                                       
                                        textAlign:"center",
                                    }}>Mã bảo mật sẽ được gửi đến email của bạn </Text>
                                </View>
                                <View style={{
                                    // borderColor:"#ccc",
                                    // borderWidth:1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    width: '94%',
                                    paddingBottom:30,
                                    paddingTop:10,
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
                                            } 
                                            else {
                                                setCode1(e);
                                                if (e.length === 1) {
                                                    code2Ref.current.focus();
                                             }
                                            }
                                        }}
                                        style={{
                                            width: 36,
                                            height: 40,
                                            textAlign: 'center',
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: '#00A48D',
                                            fontSize: 22,
                                            marginRight:2,
                                            color:'#00A48D',
                                        }} />
                                    <TextInput ref={code2Ref}
                                        value={code2}
                                        data = {2}
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
                                            width: 36,
                                            height: 40,
                                            marginRight:2,
                                            textAlign: 'center',
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: '#00A48D',
                                            fontSize: 22,
                                            padding: 0,
                                            color:'#00A48D',
                                        }} />
                                    <TextInput ref={code3Ref}
                                        value={code3}
                                        data = {3}
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
                                            width: 36,
                                            height: 40,
                                            marginRight:2,

                                            textAlign: 'center',
                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: '#00A48D',
                                            fontSize: 22,
                                            padding: 0,
                                            color:'#00A48D',
                                        }} />
                                    <TextInput ref={code4Ref}
                                        value={code4}
                                        data = {4}
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
                                            width: 36,
                                            height: 40,
                                            textAlign: 'center',
                                            marginRight:2,

                                            borderRadius: 10,
                                            borderWidth: 1,
                                            borderColor: '#00A48D',
                                            fontSize: 22,
                                            padding: 0,
                                            color:'#00A48D',
                                        }} />
                                    <TextInput ref={code5Ref}
                                        value={code5}
                                        data = {5}
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
                                            width: 36,
                                            height: 40,
                                            textAlign: 'center',
                                            borderRadius: 10,
                                            marginRight:2,

                                            borderWidth: 1,
                                            borderColor: '#00A48D',
                                            fontSize: 22,
                                            padding: 0,
                                            color:'#00A48D',
                                        }} />
                                    <TextInput ref={code6Ref}
                                        value={code6}
                                        data = {6}
                                        onKeyPress={
                                            handleKeyPress 
                                        }
                                        onChangeText={(e) => {
                                            
                                            
                                            if (e.length <= 1) {
                                                setCode6(e);
                                            }
                                        }}
                                        style={{
                                            width: 36,
                                            height: 40,
                                            textAlign: 'center',
                                            borderRadius: 10,
                                            marginRight:2,

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
                                            closeNewStepSecurity()
                                        }}
                                    >
                                        <Text style={{
                                            color: 'red',fontSize:14,
                                        }}>
                                            Đóng
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
                                                fontSize:14,
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
                                Hủy
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </Modal>
    )
}


 export default PopupShowCode;