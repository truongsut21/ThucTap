import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import { connect, useDispatch, useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import AntIcon from 'react-native-vector-icons/AntDesign';
import PopupStep2 from "./popupStep2";
import * as Action from "../controllers/actionTypes";
import { useNavigation } from "@react-navigation/core";
import StatusBar from '../../base/components/StatusBar';

var _ = require("lodash");


const ResetPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [UserName, setUserName] = useState("")
  const [ShowNewStepSecurity, setShowNewStepSecurity] = useState(false)
  const [userID, setUserID] = useState('')
  const [showNewPassword, setShownewPassword] = useState(false)
  const [securityCode, setSecurityCode] = useState("")

  const [newPassword, setNewPassword] = useState("")
  const [reNewPassword, setReNewPassword] = useState("")


  const resetPassword = () => {
    if (!UserName) {
      dispatch({
        type: Action.UPDATE_ERROR,
        data: {
          error: "Vui lòng điền đầy đủ thông tin",
        }
      })

    }
    dispatch({
      type: Action.API_RESET_REQUEST_PASSWORD_SUCCESS,
      data: {
        UserName: UserName,
      },
      setUserID: setUserID,
      setShowNewStepSecurity: setShowNewStepSecurity
    })
  }
  const handleRestPassword = () => {
    if (reNewPassword === newPassword) {
      dispatch({
        type: Action.API_RESET_PASSWORD,
        data: {
          newPassword,
          userID: userID,
          code: securityCode,
        },
        navigation,
      })
    }
    else {
      dispatch({
        type: Action.UPDATE_ERROR,
        data: {
          error: "Mật khẩu không trùng khớp",
        }
      })
    }
  }


  return (

    <SafeAreaView style={{
      backgroundColor: "#fff",
      height: "100%",
    }}>
      <StatusBar backgroundColor='#00ccaf' barStyle={'dark-content'} />
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
              <Text style={{ fontSize: 17, color: '#000', fontWeight: '500' }}>
                Quên mật khẩu
              </Text>
            </View>
          </View>


        </View>
      </View>

      <View style={{ paddingTop: 30, alignItems: "center", }}>
        <Text
          style={{
            fontSize: 19,
            color: "#737373",
            fontWeight: "bold",
            justifyContent: 'center',

          }}
        >
          ĐẶT LẠI MẬT KHẨU
        </Text>

      </View>

      {
        showNewPassword ? (<View style={{ paddingHorizontal: 20, paddingTop: 30  }}>
          <View>

            <Text style={{
              // marginTop:10,
              // paddingVertical:10,
              fontSize: 16,
              fontWeight: '600',
              color: "#00ccaf",
              fontStyle: "italic",
            }}>
              Tài khoản: {UserName}
            </Text>

          </View>
          <Text style={{
            // marginTop:10,
            paddingVertical: 10,
            fontSize: 16,
            fontWeight: '600',
            color: "#00ccaf",
            // marginLeft:20,
          }}
          >Mật khẩu mới
          </Text>
          <TextInput
            style={{
              borderRadius: 20,
              paddingHorizontal: 15,
              // color: "#f1f",
              borderWidth: 1,
              borderColor: "#00ccaf",
              padding: 10,
              height: 45
            }}
            keyboardType="email-address"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            autoCapitalize={"none"}
            autoCorrect={false}
            placeholder='Nhập mât khẩu mới'
          />
          <Text style={{
            // marginTop:10,
            paddingVertical: 10,
            fontSize: 16,
            fontWeight: '600',
            color: "#00ccaf",
            height: 45
            // marginLeft:20,
          }}
          >Nhập lại mật khẩu
          </Text>
          <TextInput
            style={{
              borderRadius: 20,
              paddingHorizontal: 15,
              // color: "#f1f",
              borderWidth: 1,
              borderColor: "#00ccaf",
              padding: 10,
              height: 45
            }}
            keyboardType="email-address"
            value={reNewPassword}
            onChangeText={(text) => setReNewPassword(text)}
            autoCapitalize={"none"}
            autoCorrect={false}
            placeholder='Nhập lại mât khẩu mới'
          />
        </View>) : <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
          <Text style={{
            fontSize: 14,
            fontWeight: '600',
            color: "#00ccaf",
            paddingBottom: 10,
          }}
          >TÊN ĐĂNG NHẬP
          </Text>
          <TextInput
            placeholderTextColor={"#ccc"}
            style={{
              borderRadius: 20,
              paddingHorizontal: 15,
              // color: "#f1f",
              borderWidth: 1,
              borderColor: "#00ccaf",
              padding: 10,
              color: "#000",
              height: 45
            }}
            keyboardType="email-address"
            value={UserName}
            onChangeText={(UserName) => setUserName(UserName)}
            autoCapitalize={"none"}
            autoCorrect={false}
            placeholder='Nhập tên ...'
          />
        </View>
      }
      <TouchableOpacity
        style={{
          alignSelf: "flex-end",
          flexDirection: "row",
          alignItems: "center",
          marginRight: 20,
          marginTop: 30
        }}
        onPress={() => {
          navigation.navigate("Auth");

        }}
        delayPressIn={0}
        delayPressOut={0}
      >
        <View>
          <Text style={{ fontSize: 16, color: "#555" }}>
            Đã có tài khoản?
          </Text>
        </View>
      </TouchableOpacity>

      {
        showNewPassword ? (<TouchableOpacity
          style={{
            backgroundColor: '#00ccaf',
            minHeight: 50,
            flexDirection: "row",
            justifyContent: "center",
            borderWidth: 1,
            borderRadius: 20,
            marginTop: 10,
            borderColor: '#00ccaf',
            marginHorizontal: 20
          }}
          delayPressIn={0}
          delayPressOut={0}
          onPress={handleRestPassword}

        >
          <View
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 17,
              }}
            >
              Đặt lại mật khẩu
            </Text>
          </View>
        </TouchableOpacity>) : (<TouchableOpacity
          style={{
            height: 45, flexDirection: 'row',
            marginBottom: 5,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#00ccaf',
            marginTop: 5,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: '#00ccaf',
            marginHorizontal: 20
          }}
          delayPressIn={0}
          delayPressOut={0}
          onPress={resetPassword}

        >
          <View
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 17,
              }}
            >
              Lấy lại mật khẩu

            </Text>
          </View>
        </TouchableOpacity>)
      }
      {
        ShowNewStepSecurity ? <PopupStep2
          cancelSecurity={() => setUserID('')}
          userID={userID}
          setShownewPassword={setShownewPassword}
          setShowNewStepSecurity={setShowNewStepSecurity}
          setSecurityCode={setSecurityCode}
        /> : null
      }


    </SafeAreaView>



  )
}

export default ResetPassword

// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Dimensions,
//   Platform,
//   Image,
// } from "react-native";
// import Modal from "react-native-modal";
// import { connect, useDispatch, useSelector } from "react-redux";
// import { WebView } from "react-native-webview";
// import AntIcon from 'react-native-vector-icons/AntDesign';
// import PopupStep2 from "./popupStep2";
// import * as Action from "../controllers/actionTypes";
// import { useNavigation } from "@react-navigation/core";
// import StatusBar from '../../base/components/StatusBar';

// var _ = require("lodash");


// const ResetPassword = ()=>{
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [UserName,setUserName] = useState("")
//   const [ShowNewStepSecurity,setShowNewStepSecurity] = useState(false)
//   const [userID,setUserID] = useState('')
//   const [showNewPassword,setShownewPassword] = useState(false)
//   const [securityCode,setSecurityCode]=useState("")

//   const [newPassword,setNewPassword] = useState ("")
//   const [reNewPassword,setReNewPassword] = useState ("")


//   const resetPassword = () => {
//     if(!UserName)
//     {
//       dispatch({
//         type:Action.UPDATE_ERROR,
//         data:{
//             error:"Vui lòng điền đầy đủ thông tin",
//         }
//       })

//     }
//     dispatch({
//       type:Action.API_RESET_REQUEST_PASSWORD_SUCCESS,
//       data: {
//             UserName: UserName,
//         },
//         setUserID: setUserID,
//         setShowNewStepSecurity:setShowNewStepSecurity
//     })
// }
// const handleRestPassword = () => {
//   if(reNewPassword===newPassword)
//   {
//     dispatch({
//       type: Action.API_RESET_PASSWORD,
//       data:{
//         newPassword,
//         userID: userID,
//         code:securityCode,
//       },
//       navigation,
//     })
//   }
//   else
//   {
//     dispatch({
//       type:Action.UPDATE_ERROR,
//       data:{
//           error:"Mật khẩu không trùng khớp",
//       }
//     })
//   }
// }


//   return (
    
//     <SafeAreaView style={{
//       backgroundColor:"#fff",
//       height:"100%",
//     }}>
//     <StatusBar backgroundColor='#00A48D' barStyle={'dark-content'} />
//                         <View style={{
//                             height: 50,
//                             backgroundColor: '#fff',
//                             position: 'relative',
//                             flexDirection: 'row',
//                             alignItems: 'center',
//                             justifyContent: 'space-between',
//                             borderBottomWidth: 0.5,
//                             borderBottomColor: '#ddd'
//                         }}>
//                             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                 <View style={{ marginRight: 5 }}>
//                                     <TouchableOpacity delayPressIn={0} delayPressOut={0} style={{ padding: 10 }} onPress={() => navigation.goBack()}>
//                                         <AntIcon color='#00A48D' size={22} name='arrowleft' style={{}} />
//                                     </TouchableOpacity>
//                                 </View>
                              
//                                         <View style={{}}>
//                                             <View style={{ paddingVertical: 2 }}>
//                                                 <Text style={{ fontSize: 17, color: '#000', fontWeight: '500' }}>
//                                                     Quên mật khẩu
//                                                 </Text>
//                                             </View>
//                                         </View>
                                
                  
//                             </View>
//                         </View>

//     <View style={{paddingTop:30,alignItems: "center",  }}>
//     <Text
//       style={{
//         fontSize: 19,
//         color: "#737373",
//         fontWeight: "bold",
//         justifyContent:'center',
       
//       }}
//     >
//       ĐẶT LẠI MẬT KHẨU
//     </Text>
  
//     </View>
 
//             {
//               showNewPassword ? (   <View style={{padding:30}}>
//         <View>

//         <Text style={{
//               // marginTop:10,
//               // paddingVertical:10,
//               fontSize: 16,
//               fontWeight:'600',
//               color: "#00A48D",
//               fontStyle:"italic",
//               }}>
//               Tài khoản: {UserName}
//         </Text>
       
//         </View>
//          <Text style={{
//               // marginTop:10,
//               paddingVertical:10,
//               fontSize: 16,
//               fontWeight:'600',
//               color: "#00A48D",
//               // marginLeft:20,
//               }}
//             >Mật khẩu mới
//             </Text>
//             <TextInput
//                    style={{
//                   borderRadius:20,
//                   paddingHorizontal: 15,
//                     // color: "#f1f",
//                     borderWidth:1,
//                     borderColor:"#00A48D",
//                     padding:10,
//                   }}
//                   keyboardType="email-address"
//                   value={newPassword}
//                   onChangeText={(text) => setNewPassword(text)}
//                   autoCapitalize={"none"}
//                   autoCorrect={false}
//                   placeholder='Nhập mât khẩu mới'
//                 />
//               <Text style={{
//               // marginTop:10,
//               paddingVertical:10,
//               fontSize: 16,
//               fontWeight:'600',
//               color: "#00A48D",
//               // marginLeft:20,
//               }}
//             >Nhập lại mật khẩu
//             </Text>
//               <TextInput
//                    style={{
//                   borderRadius:20,
//                   paddingHorizontal: 15,
//                     // color: "#f1f",
//                     borderWidth:1,
//                     borderColor:"#00A48D",
//                     padding:10,
//                   }}
//                   keyboardType="email-address"
//                   value={reNewPassword}
//                   onChangeText={(text) => setReNewPassword(text)}
//                   autoCapitalize={"none"}
//                   autoCorrect={false}
//                   placeholder='Nhập lại mât khẩu mới'
//                 /> 
//             </View>) :     <View style={{padding:30}}>
//             <Text style={{
//                 fontSize: 14,
//                 fontWeight:'600',
//                 color: "#00A48D",
//                 paddingBottom:10,
                
//               }}
//             >TÊN ĐĂNG NHẬP
//             </Text>
//             <TextInput
//             placeholderTextColor={"#ccc"}
//                   style={{
//                   borderRadius:20,
//                   paddingHorizontal: 15,
//                     // color: "#f1f",
//                     borderWidth:1,
//                     borderColor:"#00A48D",
//                     padding:10,
//                     color:"#000"
//                   }}
//                   keyboardType="email-address"
//                   value={UserName}
//                   onChangeText={(UserName) => setUserName(UserName)}
//                   autoCapitalize={"none"}
//                   autoCorrect={false}
//                   placeholder='Nhập tên ...'
//                 />
//             </View>
//             }
//             <TouchableOpacity
//                 style={{
//                   alignSelf: "flex-end",
//                   marginTop: 10,
//                   flexDirection: "row",
//                   alignItems: "center",
//                   marginRight:10,
//                 }}
//                 onPress={() => {
//                   navigation.navigate("Auth");
                
//                 }}
//                 delayPressIn={0}
//                 delayPressOut={0}
//               >
//                 <View
//                   style={{
//                     paddingVertical: 10,
//                   }}
//                 >
//                   <Text style={{ fontSize: 16, color: "#555" }}>
//                     Đã có tài khoản?
//                   </Text>
//                 </View>
//               </TouchableOpacity>
          
//           {
//             showNewPassword ? (  <TouchableOpacity
//                 style={{
//                   backgroundColor:'#00A48D',
//                   minHeight: 50,
//                   flexDirection: "row",
//                   justifyContent: "center",
//                   borderWidth: 1,
//                   borderRadius: 20,
//                   marginTop:20,
//                   width:300,
//                   marginLeft:50,
//                   borderColor: '#00A48D',
//                 }}
//                 delayPressIn={0}
//                 delayPressOut={0}
//                 onPress={handleRestPassword}
             
//               >
//                 <View
//                   style={{ alignItems: "center", justifyContent: "center" }}
//                 >
//                   <Text
//                     style={{
//                       color:"#fff",
//                       fontWeight:"700",
//                       fontSize:20,
//                     }}
//                   >
//                    Đặt lại mật khẩu
//                   </Text>
//                 </View>
//               </TouchableOpacity>) : (  <TouchableOpacity
//                 style={{
//                   backgroundColor:'#00A48D',
//                   minHeight: 50,
//                   flexDirection: "row",
//                   justifyContent: "center",
//                   borderWidth: 1,
//                   borderRadius: 20,
//                   marginTop:20,
//                   width:300,
//                   marginLeft:50,
//                   borderColor: '#00A48D',
//                 }}
//                 delayPressIn={0}
//                 delayPressOut={0}
//                 onPress={resetPassword}
             
//               >
//                 <View
//                   style={{ alignItems: "center", justifyContent: "center" }}
//                 >
//                   <Text
//                     style={{
//                       color:"#fff",
//                       fontWeight:"700",
//                       fontSize:20,
//                     }}
//                   >
//                     Lấy lại mật khẩu
                   
//                   </Text>
//                 </View>
//               </TouchableOpacity>)
//           }
//               {
//                 ShowNewStepSecurity ?  <PopupStep2
//                  cancelSecurity={() => setUserID('')}
//                  userID={userID}
//                  setShownewPassword={setShownewPassword}
//                  setShowNewStepSecurity={setShowNewStepSecurity}
//                  setSecurityCode={setSecurityCode}
//                 /> : null
//               }

             
//   </SafeAreaView>



//   )
// }

// export default ResetPassword