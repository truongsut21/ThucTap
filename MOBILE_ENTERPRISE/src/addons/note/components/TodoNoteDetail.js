import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, TouchableOpacity,
    Modal, Dimensions,
    TextInput,
    ScrollView,
    Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AntDesign from "react-native-vector-icons/AntDesign";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import vi from 'date-fns/locale/vi'
import * as Action from '../controllers/actionTypes';
import * as BaseAction from '../../base/controllers/actionTypes';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const TodoNoteDetail = () => {
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const spinDateRef = useRef(null);

    useEffect(() => {
        spinDateRef.current = null;
    }, [showPicker]);

    const onSpinTime = (e, selectedValue) => {
        spinDateRef.current = selectedValue;
    }

    const chooseDate = () => {
        if (spinDateRef.current !== null) {
            setDate(spinDateRef.current);
        }
        setShowPicker(false);
    }

    const createTodo = () => {
        dispatch({
            type: Action.API_CREATE_TODO_NOTE,
            data: {
                newTodo: {
                    note_title: title,
                    note_description: description,
                    deadline_date: date ? date : '',
                }
            }
        })
    }

    return <React.Fragment>
        {/* Phải dùng cái touchopacity to để ko bị dính cái opacity ở ngoài sẽ làm đóng modal */}
        <TouchableOpacity
            activeOpacity={1}
            style={{
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                backgroundColor: '#fff',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 40,
                borderBottomWidth: 0.5,
                borderColor: '#ddd'
            }}>
            <View style={{ width: 50 }}>

            </View>
            <TouchableOpacity
                activeOpacity={1}
                onPress={e => { e.preventDefault(); Keyboard.dismiss() }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: '500'
                }}>Tạo Todo</Text>
            </TouchableOpacity>
            <View style={{ width: 50 }}>

            </View>
        </TouchableOpacity>
        <ScrollView style={{
            height: 200,
            paddingHorizontal: 10,
            paddingVertical: 5,
        }}>
            <TextInput
                onChangeText={content => setTitle(content)}
                placeholder='Tiêu đề'
                placeholderTextColor='#ddd'
                style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: 10,
                }} />
            <TextInput
                onChangeText={content => setDescription(content)}
                placeholder='Mô tả'
                placeholderTextColor='#ddd'
                style={{
                    fontSize: 18,
                }} />
        </ScrollView>
        <TouchableOpacity
            activeOpacity={1}
            onPress={e => setShowPicker(true)}
            style={{
                height: 50,
                paddingVertical: 5,
                paddingHorizontal: 10,
                justifyContent: 'center',
            }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 5
            }}>
                <View style={{
                    paddingRight: 5,
                }}>
                    <AntDesign name="clockcircleo" size={15} />
                </View>
                <View style={{
                }}>
                    <Text style={{
                        fontSize: 16,
                    }}>
                        Thời gian đến hạn
                    </Text>
                </View>
            </View>
            <DateToVNString date={date} />
        </TouchableOpacity>

        <TouchableOpacity
            onPress={createTodo}
            activeOpacity={0.5}
            style={{
                margin: 10,
                height: 45,
                backgroundColor: '#00A48D',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Text style={{
                color: '#fff',
                fontSize: 16,
                fontWeight: 'bold'
            }}>
                Hoàn thành
            </Text>
        </TouchableOpacity>


        <Modal
            transparent={true}
            animationType={'fade'}
            visible={showPicker}
            onRequestClose={e => setShowPicker(false)}
        >

            <TouchableOpacity
                onPress={e => setShowPicker(false)}
                activeOpacity={1}
                style={{
                    flex: 1,
                    flexDirection: 'row',    //bắt buộc phải có cái này
                    alignItems: 'flex-end',
                }}
            >
                {/* View này là nền đen ở dưới khi chọn ngày tháng */}
                <View style={{
                    width: WINDOW_WIDTH,
                    height: WINDOW_HEIGHT,
                    zIndex: 0,
                    position: 'absolute',
                    backgroundColor: '#000',
                    opacity: 0.5
                }} />


                <View style={{
                    zIndex: 1,
                    flex: 1,
                    height: 350,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}>
                    <View style={{
                        height: 40,
                        borderBottomWidth: 0.5,
                        borderColor: '#ddd',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '500'
                        }}>
                            Chọn hạn kết thúc Todo
                        </Text>
                    </View>
                    <RNDateTimePicker
                        style={{
                            flex: 1,
                        }}
                        locale='vi-VN'
                        value={date}
                        mode="datetime"
                        display={'spinner'}
                        is24Hour={true}
                        onChange={onSpinTime}
                    />

                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            onPress={e => setShowPicker(false)}
                            style={{
                                flex: 1,
                                height: 40,
                                margin: 10,
                                backgroundColor: '#fff',
                                borderColor: '#00A48D',
                                borderWidth: 3,
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{
                                color: '#00A48D',
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                Đóng
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={chooseDate}
                            style={{
                                flex: 1,
                                height: 40,
                                margin: 10,
                                backgroundColor: '#00A48D',
                                borderRadius: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                Chọn
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    </React.Fragment>;
}

export default TodoNoteDetail;

const DateToVNString = ({ date }) => {
    return <React.Fragment>
        <Text
            style={{
                fontSize: 17,
                // fontWeight: 'bold',
                color: '#aaa'
            }}>
            {`${new Date(date).getDate() === new Date().getDate() ? 'Hôm nay' : format(new Date(date), 'EEEE', { locale: vi })}, ngày ${new Date(date).getDate()} tháng ${new Date(date).getMonth() + 1}${new Date().getFullYear() !== new Date(date).getFullYear() ? ` năm ${new Date(date).getFullYear()}` : ''} lúc ${format(new Date(date), 'HH:mm')}`}
        </Text>
    </React.Fragment>
}