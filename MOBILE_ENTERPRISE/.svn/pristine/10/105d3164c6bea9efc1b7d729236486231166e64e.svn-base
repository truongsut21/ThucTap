import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import isEqual from "react-fast-compare";

import Splash from "./Splash";
// import SwitchAccount from "../../auth/components/SwitchAccount";
import Loading from "../../auth/components/Loading";
import Landing from "../../auth/components/Landing";
import SignIn from "../../auth/components/SignIn";
import SignUp from "../../auth/components/SignUp";
import SignInStep2 from "../../auth/components/SignInStep2";
import SignUpStep2 from "../../auth/components/SignUpStep2";

import StartScreen from "../../auth/components/startScreen";
import ResetPassword from "../../auth/components/ResetPassword";
import Home from "../../home/components";
import FindFriend from "../../friend/component/FindFriend";
import Invitation from "../../friend/component/Invitation";
// import User from '../../setting/components/UserInfo';
import ChatBox from "../../chat/components/ChatBox/Chatbox";
// import AddUserBeforeCreateGroup from '../../chat/components/AddUserBeforeCreateGroup';
// import MessageInfo from "../../chat/components/MessageInfo";
import PopupUserInfo from "../../chat/components/PopupUserInfo";
// import PopupImage from '../../chat/components/popupComponents/PopupMessageImage';
import PopupImage from "../../chat/components/popupComponents/PopupImage";
import SearchThreadList from "../../chat/components/searchComponents/SearchThreadList";
import MoreInput from "../../chat/components/InputBox/MoreInput";

import PinMessageList from "../../chat/components/PinMessageComps/PinMessageList";
import Poll from "../../chat/components/pollMessage/PollScreen";
import PopupMessageLongPress from "../../chat/components/popupComponents/LongPressMessage";

import { navigationRef } from "../StaticNavigator";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createNativeStackNavigator } from 'react-native-screens/native-stack';
// import { enableScreens } from 'react-native-screens';
import { connect } from "react-redux";
import { HEIGHT } from "../../chat/controllers/utils";
import TotalCreateThreadGruop from "../../chat/components/CreateThreadGroup";
// import ThreadMembers from '../../chat/components/ThreadInformation/ThreadMembers';
import ThreadInformation from "../../chat/components/ThreadInformation/ThreadInformation";
import ChangeInformation from "../../chat/components/ThreadInformation/ChangeInformation";
import SettingThread from "../../chat/components/ThreadInformation/SettingThread";
import ThreadMembers from "../../chat/components/ThreadInformation/ThreadMembers";
import Error from "../../base/components/Error/Error";
import SendError from "../../setting/components/SendError";
import BeautifulLoading from "../../base/components/BeautifulLoading";
import ErrorContainer from "../../base/components/Error/ErrorContainer";
import ShowNotifiCation from "../../base/components/Error/ShowNotifiCation";
import ThreadImageLibrary from "../../chat/components/ThreadInformation/ThreadImageLibrary";
import ThreadFileLibrary from "../../chat/components/ThreadInformation/ThreadFileLibrary";
import ThreadSearchLibrary from "../../chat/components/ThreadInformation/ThreadSearchLibrary";

import ReplyingMessage from "../../chat/components/InputBox/ReplyingMessage";
import Details from "../../chat/components/popupComponents/Details";
import DetailsReaction from "../../chat/components/popupComponents/DetailsReaction";
// import ThreadList from '../../chat/components/ThreadList';
import PollDetails from "../../chat/components/pollMessage/PollDetails";
import ImageGalleryPicker from "./ImageGalleryPicker";
import ECardStore from "../../ecard/components/ECardStore";
import MyEcard from "../../ecard/components/MyEcard";

import QRScannerScreen from "./QRScannerScreen";
import Setting from "../../setting/components/UserInfo";
import ChangePassWord from "../../setting/components/ChangePassWord";
import TodoNoteDetailScreen from "../../note/components/TodoNoteDetailScreen";
import FriendList from "../../friend/component/Friend";
import EditECard from "../../ecard/components/EditECard";
import ECardOther from "../../ecard/components/ECardOther";
import ECardScan from "../../ecard/components/ECardScan";
import ChooseTheme from '../../setting/components/ChooseThemeScreen';
import PostScreen from "../../social/component/PostScreen";
import NewPost from "../../social/component/NewPost"
import PostOption from "../../social/component/PostOption"

const Stack = createStackNavigator();
const Root = createNativeStackNavigator();

const Navigator = () => {
  let { token, landingUser, myUserInfo, splash, startScreen } = useSelector(
    (state) => {
      let landingUser = state.AuthStoredReducer.landingUser,
        token = state.AuthStoredReducer.token,
        myUserInfo = state.AuthStoredReducer.myUserInfo,
        splash = state.AuthUnstoredReducer.splash;
      startScreen = state.AuthStoredReducer.startScreen;
      return {
        landingUser,
        token,
        myUserInfo,
        splash,
        startScreen
      };
    },
    (prev, next) => isEqual(prev, next)
  );

  return (
    <React.Fragment>
      <BeautifulLoading />

      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 50,
          zIndex: 99999,
          alignItems: "center",
          elevation: 10,
        }}
      >
        <ErrorContainer />
        <ShowNotifiCation />
      </View>

      <NavigationContainer
        // theme={ThemeLight}
        ref={navigationRef}
        linking={{
          prefixes: ["tomaho.enterprise://"],
          config: {
            screens: {
              // Call: {
              //     path: 'call/:user/:roomId/:name',
              //     stringify: {

              //     },
              //     parse: {
              //         user: (user) => user.toString(),
              //         roomId: (roomId) => roomId.toString(),
              //         name: (name) => name.toString(),
              //     }
              // },
              ChatBox: {
                path: "chatbox/:threadId",
                parse: {
                  threadId: (threadId) => threadId,
                },
              },
            },
          },
        }}
      >
        {myUserInfo && token && landingUser ? (
          // this.props.activeUserId && this.props.landingUser[this.props.activeUserId] &&
          // this.props.loggedUsers[this.props.activeUserId]._id &&
          // this.props.loggedUsers[this.props.activeUserId].token
          // main app
          <Root.Navigator
            mode="card"
            screenOptions={{
              headerShown: false,
              animationTypeForReplace: "push",
              // ...TransitionPresets.SlideFromRightIOS
            }}
          >
            <Root.Screen name="Home" options={{}} component={Home} />
            <Root.Screen
              name="SendError"
              options={{
                animation: "slide_from_right",
              }}
              component={SendError}
            />
            <Root.Screen
              name="FindFriend"
              options={{
                animation: "slide_from_right",
              }}
              component={FindFriend}
            />
            <Root.Screen
              name="Invitation"
              options={{
                animation: "slide_from_right",
              }}
              component={Invitation}
            />
            <Root.Screen
              name="ThreadInformation"
              options={{
                animation: "slide_from_right",
                unmountOnBlur: true,
              }}
              component={ThreadInformation}
            />
            <Root.Screen
              name="ChangeInformation"
              options={{}}
              component={ChangeInformation}
            />
            <Root.Screen
              name="TotalCreateThreadGruop"
              options={{
                animation: "slide_from_right",
              }}
              component={TotalCreateThreadGruop}
            />
            <Root.Screen
              name="SettingThread"
              options={{
                animation: "slide_from_right",
              }}
              component={SettingThread}
            />
            <Root.Screen
              name="ChangePassWord"
              options={{
                animation: "slide_from_right",
              }}
              component={ChangePassWord}
            />
            <Root.Screen
              name="PinMessageList"
              options={{
                animation: "slide_from_right",
              }}
              component={PinMessageList}
            />

            <Root.Screen
              name="MessageReader"
              options={{
                presentation: "containedTransparentModal",
                animation: "none",
                gestureEnabled: false,
              }}
              component={Details}
            />
            <Root.Screen
              name="DetailsReaction"
              options={{
                presentation: "containedTransparentModal",
                animation: "none",
                gestureEnabled: false,
              }}
              component={DetailsReaction}
            />
            <Root.Screen
              name="ThreadMembers"
              options={{
                animation: "slide_from_right",
              }}
              component={ThreadMembers}
            />
            <Root.Screen
              name="PopupMessageLongPress"
              options={{
                presentation: "containedTransparentModal",
                animation: "none",
                gestureEnabled: false,
              }}
              component={PopupMessageLongPress}
            />
            <Root.Screen
              name="ChatBox"
              options={{
                gestureVelocityImpact: 0.5,
                animation: "slide_from_right",
              }}
              component={ChatBox}
            />
            <Root.Screen
              name="PopupUserInfo"
              options={{
                presentation: "containedTransparentModal",
                animation: "none",
                gestureEnabled: false,
              }}
              component={PopupUserInfo}
            />
            <Root.Screen
              name="PopupImage"
              options={{
                animation: "none",
                cardOverlayEnabled: true,
                presentation: "containedTransparentModal",
                gestureEnabled: false,
              }}
              component={PopupImage}
            />
            <Root.Screen
              name="ThreadImageLibrary"
              options={{
                cardOverlayEnabled: true,
                animation: "slide_from_right",
              }}
              component={ThreadImageLibrary}
            />
            <Root.Screen
              name="ThreadFileLibrary"
              options={{
                cardOverlayEnabled: true,
                animation: "slide_from_right",
              }}
              component={ThreadFileLibrary}
            />
            <Root.Screen
              name="ThreadSearchLibrary"
              options={{
                cardOverlayEnabled: true,
                animation: "slide_from_right",
              }}
              component={ThreadSearchLibrary}
            />
            <Root.Screen
              name="MoreInput"
              options={{
                presentation: "containedTransparentModal",
                animation: "none",
                gestureEnabled: false,
              }}
              component={MoreInput}
            />
            <Root.Screen
              name="Poll"
              options={{
                cardOverlayEnabled: true,
                animation: "slide_from_right",
              }}
              component={Poll}
            />
            <Root.Screen
              name="PollDetails"
              options={{
                presentation: "containedTransparentModal",
                animation: "none",
                gestureEnabled: false,
              }}
              component={PollDetails}
            />
            <Root.Screen
              name="SearchThreadList"
              options={{
                animation: "fade",
              }}
              component={SearchThreadList}
            />
            <Root.Screen
              name="ImageGalleryPicker"
              options={{
                presentation: "containedTransparentModal",
                animation: "none",
              }}
              component={ImageGalleryPicker}
            />
            <Root.Screen
              name="ECardStore"
              options={{
                presentation: "modal",
              }}
              component={ECardStore}
            />
            <Root.Screen
              name="MyEcard"
              options={{
                presentation: "modal",
              }}
              component={MyEcard}
            />
            <Root.Screen
              name="ECardOther"
              options={{
                presentation: "modal",
              }}
              component={ECardOther}
            />
            <Root.Screen
              name="ECardScan"
              options={{
                presentation: "modal",
              }}
              component={ECardScan}
            />
            <Root.Screen
              name="EditECard"
              options={{
                presentation: "modal",
              }}
              component={EditECard}
            />
            <Root.Screen
              name="QRScannerScreen"
              options={{
                animation: "slide_from_bottom",
              }}
              component={QRScannerScreen}
            />
            <Root.Screen
              name="Setting"
              options={{
                animation: "slide_from_bottom",
              }}
              component={Setting}
            />
            <Root.Screen
              name="TodoNoteDetailScreen"
              options={{
                presentation: "transparentModal",
                animation: "none",
              }}
              component={TodoNoteDetailScreen}
            />
            <Root.Screen
              name="FriendList"
              options={{
                animation: "slide_from_bottom",
              }}
              component={FriendList}
            />
            <Root.Screen
              name="ChooseTheme"
              options={{
                animation: "slide_from_right",
              }}
              component={ChooseTheme}
            />
            <Root.Screen
              name="Newsfeed"
              component={PostScreen}
            />
            <Root.Screen
              name="NewPost"
              component={NewPost}
            />
            <Root.Screen
              name="PostOption"
              options={{
                animation: "slide_from_right",
              }}
              component={PostOption}
            />
            
          </Root.Navigator>
        ) : (
          // main auth
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Khi chưa đăng nhập */}
            {!token ? (
              <React.Fragment>
                {startScreen ? null : <Stack.Screen
                  name="StartScreen"
                  options={{
                    headerTitle: null,
                    headerLeft: null,
                    headerRight: null,
                    title: null,
                    swipeEnabled: false,
                    gesturesEnabled: false,
                  }}
                  component={StartScreen}
                />}

                <Stack.Screen
                  name="Auth"
                  options={{
                    headerTitle: null,
                    headerLeft: null,
                    headerRight: null,
                    title: null,
                    swipeEnabled: false,
                    gesturesEnabled: false,
                  }}
                  component={SignIn}
                />

                <Stack.Screen
                  name="ResetPassword"
                  options={{
                    headerTitle: null,
                    headerLeft: null,
                    headerRight: null,
                    title: null,
                    swipeEnabled: false,
                    gesturesEnabled: false,
                  }}
                  component={ResetPassword}
                />


                <Stack.Screen
                  name="SignInStep2"
                  options={{
                    headerTitle: null,
                    headerLeft: null,
                    headerRight: null,
                    title: null,
                    swipeEnabled: false,
                    gesturesEnabled: false,
                  }}
                  component={SignInStep2}
                />
                <Stack.Screen
                  name="SignUpStep2"
                  options={{
                    headerTitle: null,
                    headerLeft: null,
                    headerRight: null,
                    title: null,
                    swipeEnabled: false,
                    gesturesEnabled: false,
                  }}
                  component={SignUpStep2}
                />
                <Stack.Screen
                  name="SignUp"
                  options={{
                    headerTitle: null,
                    headerLeft: null,
                    headerRight: null,
                    title: null,
                    swipeEnabled: false,
                    gesturesEnabled: false,
                  }}
                  component={SignUp}
                />
                {/* <Stack.Screen
                  name="SwitchAccount"
                  options={{
                    headerTitle: null,
                    headerLeft: null,
                    headerRight: null,
                    title: null,
                  }}
                  component={SwitchAccount}
                /> */}
              </React.Fragment>
            ) : null}

            {/* Vừa đăng nhập trên tài khoản */}
            {token && !myUserInfo ? (
              <Stack.Screen
                name="Loading"
                options={{ headerLeft: null, swipeEnabled: false }}
                component={Loading}
              />
            ) : null}

            {/* Khi vừa đăng nhập lần đầu tiên của tài khoản trên app  */}
            {/* Phải tải thông tin của thread,message,... */}
            {token && myUserInfo && !landingUser ? (
              <Stack.Screen
                name="Landing"
                options={{ headerLeft: null, swipeEnabled: false }}
                component={Landing}
              />
            ) : null}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </React.Fragment>
  );
};

export default Navigator;

// class Navigator extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false,
//             // error :false,
//             // showError:"",
//         }
//         this.hasChatBotScreenInStack = false;
//     }

//     componentDidMount() {
//         // if (this.props.activeUserId && this.props.landingUser[this.props.activeUserId] &&
//         //     this.props.loggedUsers[this.props.activeUserId]._id &&
//         //     this.props.loggedUsers[this.props.activeUserId].token) {
//         //     console.log('--------------------------case 1')
//         // }
//         // if (this.props.activeUserId && this.props.loggedUsers[this.props.activeUserId].token &&
//         //     this.props.loggedUsers[this.props.activeUserId]._id &&
//         //     !this.props.landingUser[this.props.activeUserId]) {
//         //     console.log('--------------------------case 2')
//         // }
//         // if (this.props.activeUserId && this.props.loggedUsers[this.props.activeUserId].token &&
//         //     !this.props.loggedUsers[this.props.activeUserId]._id) {
//         //     console.log('--------------------------case 3');
//         // }
//         // if (!this.props.activeUserId) {
//         //     console.log('--------------------------case 4');
//         // }
//     }
//     handleShowError() {
//         // if(this.state.error)

//         setTimeout(() => {
//             return (
//                 <View style={{
//                     position: "absolute",
//                     left: 0,
//                     right: 0,
//                     top: 50,
//                     zIndex: 99999,
//                     alignItems: "center",
//                 }}>
//                     <Error />
//                 </View>
//             )
//         }, 3000);

//     }
//     render() {
//         // let showError;
//         // if (this.props.activeUserId && this.props.landingUser[this.props.activeUserId] &&
//         //     this.props.loggedUsers[this.props.activeUserId]._id &&
//         //     this.props.loggedUsers[this.props.activeUserId].token) {
//         //     console.log('--------------------------case 1')
//         // }
//         // if (this.props.activeUserId && this.props.loggedUsers[this.props.activeUserId].token &&
//         //     this.props.loggedUsers[this.props.activeUserId]._id &&
//         //     !this.props.landingUser[this.props.activeUserId]) {
//         //     console.log('--------------------------case 2')
//         // }
//         // if (this.props.activeUserId && this.props.loggedUsers[this.props.activeUserId].token &&
//         //     !this.props.loggedUsers[this.props.activeUserId]._id) {
//         //     console.log('--------------------------case 3');
//         // }
//         // if (!this.props.activeUserId) {
//         //     console.log('--------------------------case 4');
//         // }
//         try {
//             // if (this.props.splash) {
//             //     return (
//             //         <React.Fragment>
//             //             <Splash />
//             //         </React.Fragment>
//             //     )
//             // }
//             return (
//                 <React.Fragment>
//                     {this.state.showError}
//                     <NavigationContainer ref={navigationRef} linking={{
//                         prefixes: ['tomaho.enterprise://'],
//                         config: {
//                             screens: {
//                                 // Call: {
//                                 //     path: 'call/:user/:roomId/:name',
//                                 //     stringify: {

//                                 //     },
//                                 //     parse: {
//                                 //         user: (user) => user.toString(),
//                                 //         roomId: (roomId) => roomId.toString(),
//                                 //         name: (name) => name.toString(),
//                                 //     }
//                                 // },
//                                 ChatBox: {
//                                     path: 'chatbox/:thread',
//                                     parse: {
//                                         force_thread_id: (thread) => thread
//                                     }
//                                 }
//                             }
//                         }
//                     }}>
//                         {
//                             this.props.myUserInfo && this.props.token
//                                 && this.props.landingUser

//                                 // this.props.activeUserId && this.props.landingUser[this.props.activeUserId] &&
//                                 // this.props.loggedUsers[this.props.activeUserId]._id &&
//                                 // this.props.loggedUsers[this.props.activeUserId].token
//                                 ?
//                                 // main app
//                                 <Root.Navigator mode='card' screenOptions={{
//                                     headerShown: false,
//                                     // ...TransitionPresets.SlideFromRightIOS
//                                 }}>
//                                     <Root.Screen name='Home' options={{}}
//                                         component={Home} />
//                                     <Root.Screen name='FindFriend' options={{}}
//                                         component={FindFriend} />
//                                     <Root.Screen name='Invitation' options={{}}
//                                         component={Invitation} />
//                                     <Root.Screen name='ThreadInformation' options={{}}
//                                         component={ThreadInformation} />
//                                     <Root.Screen name='ChangeInformation' options={{}}
//                                         component={ChangeInformation} />
//                                     <Root.Screen name='TotalCreateThreadGruop' options={{}}
//                                         component={TotalCreateThreadGruop} />
//                                     <Root.Screen name='SettingThread' options={{}}
//                                         component={SettingThread} />
//                                     <Root.Screen name='ThreadMembers' options={{}}
//                                         component={ThreadMembers} />
//                                     <Root.Screen name='PopupMessageLongPress'
//                                         options={{
//                                             // cardOverlayEnabled: true,
//                                             // cardStyle: { backgroundColor: "transparent" },
//                                             // cardStyleInterpolator: ScaleFromCenter,
//                                             presentation: 'transparentModal',
//                                             animation: 'fade'
//                                         }}
//                                         component={PopupMessageLongPress} />
//                                     {/* <Root.Screen name='User' options={{}}
//                                     component={User} /> */}
//                                     {/* <Root.Screen name='AddUserBeforeCreateGroup' options={{}}
//                                     component={AddUserBeforeCreateGroup} /> */}
//                                     <Root.Screen name='ChatBox'
//                                         options={{
//                                             gestureVelocityImpact: 0.5,
//                                             // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
//                                             // gestureDirection: 'horizontal',
//                                             // transitionSpec: {
//                                             //     open: AnimationInConfig,
//                                             //     close: AniOutTiming
//                                             // }
//                                             // transitionSpec: {
//                                             //     open: AnimationInConfig,
//                                             //     close: AnimationOutConfig,
//                                             // },
//                                         }}
//                                         component={ChatBox} />
//                                     <Root.Screen name='PopupUserInfo' options={{
//                                         cardOverlayEnabled: true,
//                                         // cardStyle: { backgroundColor: "transparent" },
//                                         // cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
//                                         // presentation: 'containedTransparentModal',
//                                         // animation: 'fade_from_bottom'
//                                     }}
//                                         component={PopupUserInfo} />

//                                     {/* <Root.Screen name='ThreadMembers' options={{}}
//                                     component={ThreadMembers} /> */}

//                                     {/* <Root.Screen name='PopupMessageLongPress'
//                                     options={{
//                                         // cardOverlayEnabled: true,
//                                         // cardStyle: { backgroundColor: "transparent" },
//                                         // cardStyleInterpolator: ScaleFromCenter,
//                                         presentation: 'transparentModal',
//                                         animation: 'fade'
//                                     }}
//                                     component={PopupMessageLongPress} />

//                                 <Root.Screen name='ThreadMoreInformation' options={{}}
//                                     component={ThreadMoreInformation} />

//                                 <Root.Screen name='ThreadMemberList' options={{}}
//                                     component={ThreadMemberList} />
//                                 <Root.Screen name='ThreadImageList' options={{}}
//                                     component={ThreadImageList} />
//                                 <Root.Screen name='ThreadFileList' options={{}}
//                                     component={ThreadFileList} />
//                                 <Root.Screen name='SearchMessageBox' options={{}}
//                                     component={SearchMessageBox} />
//                                 <Root.Screen name='User' options={{}}
//                                     component={User} />
//                                 <Root.Screen name='MessageInfo' options={{}}
//                                     component={MessageInfo} />
//                                 <Root.Screen name='PopupUserInfo' options={{
//                                     cardOverlayEnabled: true,
//                                     // cardStyle: { backgroundColor: "transparent" },
//                                     // cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
//                                     presentation: 'containedTransparentModal',
//                                     animation: 'fade_from_bottom'
//                                 }}
//                                     component={PopupUserInfo} />
//                                 <Root.Screen name='MessageReaction' options={{
//                                     cardOverlayEnabled: true,
//                                     // cardStyle: { backgroundColor: 'transparent' },
//                                     // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
//                                     presentation: 'containedTransparentModal',
//                                     animation: 'fade_from_bottom'
//                                 }} component={MessageReaction} />
//                                 <Root.Screen name='AttachTypeSelection' options={{
//                                     // cardOverlayEnabled: true,
//                                     // cardStyle: { backgroundColor: "transparent" },
//                                     // cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
//                                     presentation: 'containedTransparentModal',
//                                     animation: 'fade_from_bottom'
//                                 }}
//                                     component={AttachTypeSelection} />
//                                 <Root.Screen name='PopupImage'
//                                     options={{
//                                         // gestureEnabled: true,
//                                         gestureDirection: 'vertical',
//                                         // gestureResponseDistance: {
//                                         //     vertical: HEIGHT
//                                         // },
//                                         // cardStyleInterpolator: PopUpImageAnimationOut,
//                                         presentation: 'containedModal',
//                                         animation: 'fade_from_bottom',
//                                         // stackAnimation: 'fade'

//                                     }}
//                                     component={PopupImage} />
//                                 <Root.Screen name='SearchThreadList' options={{
//                                     gestureEnabled: false,
//                                     // cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
//                                     presentation: 'push',
//                                     animation: 'fade'
//                                 }}
//                                     component={SearchThreadList} />
//                                 <Root.Screen name='PinMessageList' options={{
//                                     // cardStyleInterpolator: PopUpImageAnimationOut,
//                                     presentation: 'push',
//                                     animation: 'fade'
//                                 }}
//                                     component={PinMessageList} />
//                                 <Root.Screen name='PollScreen' options={{
//                                     // cardStyleInterpolator: PopUpImageAnimationOut,
//                                 }}
//                                     component={PollScreen} />
//                                 <Stack.Screen
//                                     name='SwitchAccount'
//                                     options={{
//                                         headerTitle: null, headerLeft: null, headerRight: null,
//                                         title: null,
//                                     }}
//                                     component={SwitchAccount}
//                                 /> */}
//                                 </Root.Navigator>
//                                 :
//                                 // main auth
//                                 <Stack.Navigator screenOptions={{ headerShown: false }}>

//                                     {/* Khi chưa đăng nhập */}
//                                     {
//                                         !this.props.token
//                                             ?
//                                             <React.Fragment>
//                                                 <Stack.Screen name='Auth'
//                                                     options={{
//                                                         headerTitle: null, headerLeft: null, headerRight: null,
//                                                         title: null, swipeEnabled: false, gesturesEnabled: false,
//                                                     }}
//                                                     component={SignIn} />
//                                                 <Stack.Screen name='ResetPassword' options={{
//                                                     headerTitle: null, headerLeft: null,
//                                                     headerRight: null, title: null, swipeEnabled: false, gesturesEnabled: false
//                                                 }}
//                                                     component={ResetPassword} />
//                                                 <Stack.Screen name='SignUp' options={{
//                                                     headerTitle: null, headerLeft: null,
//                                                     headerRight: null, title: null, swipeEnabled: false, gesturesEnabled: false
//                                                 }}
//                                                     component={SignUp} />
//                                                 <Stack.Screen
//                                                     name='SwitchAccount'
//                                                     options={{
//                                                         headerTitle: null, headerLeft: null, headerRight: null,
//                                                         title: null,
//                                                     }}
//                                                     component={SwitchAccount}
//                                                 />
//                                             </React.Fragment>
//                                             :
//                                             null
//                                     }

//                                     {/* Vừa đăng nhập trên tài khoản */}
//                                     {
//                                         this.props.token && !this.props.myUserInfo
//                                             ?
//                                             <Stack.Screen name='Loading'
//                                                 options={{ headerLeft: null, swipeEnabled: false, }}
//                                                 component={Loading} />
//                                             :
//                                             null
//                                     }

//                                     {/* Khi vừa đăng nhập lần đầu tiên của tài khoản trên app  */}
//                                     {/* Phải tải thông tin của thread,message,... */}
//                                     {
//                                         this.props.token && this.props.myUserInfo && !this.props.landingUser
//                                             ?
//                                             <Stack.Screen name='Landing'
//                                                 options={{ headerLeft: null, swipeEnabled: false, }}
//                                                 component={Landing} />
//                                             :
//                                             null
//                                     }

//                                 </Stack.Navigator>
//                         }
//                     </NavigationContainer>
//                 </React.Fragment>
//             )
//         }
//         catch (error) {
//             return (
//                 <SafeAreaView>
//                     <Text>
//                         {error.toString()}
//                     </Text>
//                 </SafeAreaView>
//             )
//         }
//     }
// }

// function mapStateToProps(state) {
//     // let activeUserId = state.AuthStoredReducer.activeUserId;
//     // let loggedUsers = state.AuthStoredReducer.loggedUsers;
//     // let activeUserId = state.AuthStoredReducer.activeUserId;
//     let landingUser = state.AuthStoredReducer.landingUser;
//     // let activeUser, activeUserSawLandingScreen;
//     let token = state.AuthStoredReducer.token;
//     let myUserInfo = state.AuthStoredReducer.myUserInfo;

//     return {

//         splash: state.AuthUnstoredReducer.splash,
//         token,
//         myUserInfo,
//         landingUser
//     }
// }
// export default connect(mapStateToProps)(Navigator);
