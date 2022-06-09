import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  InteractionManager,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import isEqual from "react-fast-compare";
import { tail } from "lodash";
import IsTyping from "./IsTyping";


function TitleIstyping({_id}) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { Thread_id } = useSelector(
        (state) => {
            const myThreadTypers = state.ChatUnstoredReducer.myThreadTypers || {};
            let ThreadId = myThreadTypers[_id] || {};
            let Thread_id = Object.values(ThreadId).map((t) => t.name) || [];
    
          
           
          return {
            Thread_id,
          };
        },
        (prev, next) => isEqual(prev, next)
      );

     

  return (
    <View><Text style={{fontSize:13,color:"#70757a"}}>{Thread_id}:
    {/* đang gõ */}
  <IsTyping/>
     </Text></View>
  )
}

export default TitleIstyping