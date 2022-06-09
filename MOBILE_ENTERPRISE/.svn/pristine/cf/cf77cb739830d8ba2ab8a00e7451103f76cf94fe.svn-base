
import { useNavigation } from '@react-navigation/core';
import React, { useState,useEffect } from 'react';
import {
    SafeAreaView, Text, View, TextInput,
    TouchableOpacity, FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Error from './Error';
const ErrorContainer = () => {
    const [showError, setShowError] = useState(false);
    let errorApp = useSelector(state => state.BaseUnstoredReducer.errorApp);
    useEffect(() => {
        if (errorApp && errorApp.length > 0) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 2000);
        }
        else {
            setShowError(false)
        }
    }, [errorApp]);
    if(!errorApp && errorApp.length===0||!showError)
    {
        return null;
    }
    else
    {
        return (
            <View style={{
                width:"100%",
            }}> 
            {
                showError?
                <Error/>
                :null
            }   
             
            
            </View>
        )

    }
}
export default ErrorContainer
