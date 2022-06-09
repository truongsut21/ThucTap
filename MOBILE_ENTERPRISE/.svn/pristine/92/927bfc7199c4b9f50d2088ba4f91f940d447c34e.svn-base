import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Checkbox = ({ isChecked }) => {
    if (isChecked) {
        return (<AntDesign name="checkcircle" size={25} color="#00A48D" />)
    } else {
        return (<View
            style={{
                width: 25,
                height: 25,
                borderRadius: 13,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: '#aaa',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }} />)
    }
}

const PollOption = ({ data, forwardRef, isCreatePollScreen, isChecked,
    onChangeTextOption, onClickCheckBox, onClickDeleteOption }) => {
    const [check,setCheck] = useState()
    const changeText = (e) => {
        onChangeTextOption(data._id, e);
    }
    useEffect(()=>{
        if(isChecked){
            setCheck(true);
        }
    },[])
    const onClickCheck = (e) => {
        if(!check){
            onClickCheckBox(data._id);
            setCheck(true);
        }
        else
        {
            onClickCheckBox(data._id);
            setCheck(false);  
        }
    }

    const onDeleteOption = (e) => {
        onClickDeleteOption(data._id);
        setCheck(false);
    }
    return (<View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 7,
    }}>
        {
            !isCreatePollScreen ?
                <TouchableOpacity style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                    activeOpacity={1}
                    onPress={onClickCheck}>
                    <Checkbox 
                    isChecked={check} 
                    
                    />
                </TouchableOpacity>
                :
                null
        }
        <View style={{
            flex: 1,
            height: 40,
            marginLeft: isCreatePollScreen ? 0 : 10,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 0.5,
            borderBottomColor: '#ddd',
        }}>
            {
                !data.isDraft ?
                    <Text style={{ fontSize: 16 }}>
                        {data.title}
                    </Text>
                    :
                    <React.Fragment>
                        <TextInput
                            ref={forwardRef}
                            style={{
                                flex: 1,
                                fontSize: 17,
                            }}
                            placeholder={'Điền câu trả lời'}
                            placeholderTextColor='#a3a3a3'
                            // multiline={true}
                            onChangeText={changeText}
                            autoCorrect={false}
                            value={data.title} />
                        {
                            data.isDraft && !data.fromTemplate ?
                                <TouchableOpacity onPress={onDeleteOption}>
                                    <AntDesign name="closecircle" size={18} color="#aaa" />
                                </TouchableOpacity>
                                :
                                null
                        }
                    </React.Fragment>
            }
        </View>
    </View>);
}

// export default React.memo(PollOption);
export default PollOption;