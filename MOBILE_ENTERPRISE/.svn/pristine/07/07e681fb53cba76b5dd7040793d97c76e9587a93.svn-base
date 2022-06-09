import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState, } from 'react';
import {
    SafeAreaView,
    View, Text, TouchableOpacity,
    Animated, Platform, Dimensions,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TodoNoteDetail from './TodoNoteDetail';


const TodoNoteDetailScreen = () => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [show, setShow] = useState(false);

    useEffect(() => {
        //nếu ko chờ 200ms thì dễ bị giật
        setTimeout(() => {
            setShow(true);
        }, 0);
    }, []);

    const goBack = () => {
        setShow(false);
        setTimeout(() => {
            navigation.goBack()
        }, 200);
    }

    return <React.Fragment>
        <Modal
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            isVisible={show}
            avoidKeyboard={true}
            backdropOpacity={0.5}
            useNativeDriver={true}
            useNativeDriverForBackdrop={true}
            style={{ margin: 0 }}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    flex: 1,
                    flexDirection: 'row',    //bắt buộc phải có cái này
                    alignItems: 'flex-end',

                }}
                onPress={goBack}
            >
                <View style={{
                    flex: 1,
                    height: 350,
                    paddingBottom: insets.bottom,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    backgroundColor: '#fff',
                }}>
                    <TodoNoteDetail />
                </View>
            </TouchableOpacity>
        </Modal>
    </React.Fragment>
}

export default TodoNoteDetailScreen;