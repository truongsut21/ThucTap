import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, ActivityIndicator, TextInput, TouchableOpacity, FlatList } from 'react-native';
import * as AuthAction from '../controllers/actionTypes';
import Octicons from 'react-native-vector-icons/Octicons';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/core';

const ShowCodeConfirmSignUp = ({userId,setShowModalConfirm}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [showPromt, setShowPromt] = useState(true);
    const [securityCode,setSecurityCode]=useState("");

    const confirmSecurityCode = () => {
        
        dispatch({
            type: AuthAction.API_SEND_SECURITY_CODE_FOR_SIGN_UP,
            data: {
                userId,
                securityCode: securityCode,
            },
            // setListCompany
            setShowPromt,
            setShowModalConfirm,
            navigation,
        })
    }

    const handleCancelModel = ()=>{
                setShowPromt(false);
                setShowModalConfirm(false);
                setSecurityCode("");
    }
    return (
        
        <Modal isVisible={showPromt}
            onBackButtonPress={handleCancelModel}
            onBackdropPress={handleCancelModel}
            style={{ justifyContent: "center", alignItems: "center", }}
        >
            <View style={{
                borderRadius: 6,
                backgroundColor: "#fff",
                width: "80%",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
            }}>
                <Text>Nhập mã xác nhận từ email</Text>
                <TextInput
                
                    style={{
                        marginHorizontal: 10,
                        marginVertical: 10,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        backgroundColor: '#f3f3f3',
                        padding: 0,
                        height: 50,
                        color: '#000',
                        width: "100%",
                    }}
                    placeholder="Nhập mã..."
                    onChangeText={(e) => {
                        setSecurityCode(e);
                    }}
                />
                <View style={{
                    flexDirection:"row"
                }}>
                    <TouchableOpacity style={{marginRight:6}} 
                    onPress={confirmSecurityCode}

                    >
                        <Text style={{ fontSize: 16, color: '#00A48D' }}>
                            Xác nhận
                                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={handleCancelModel}

                    >
                        <Text style={{ fontSize: 16, color: '#00A48D',color:"red" }}>
                            Hủy bỏ
                                </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>)
    
}

export default ShowCodeConfirmSignUp
