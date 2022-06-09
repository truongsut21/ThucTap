import React, { useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import isEqual from 'react-fast-compare';
import DispatchImage from '../../chat/components/DispatchImage';
import DefaultAvatar from '../../chat/static/default_ava.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Action from '../../chat/controllers/actionTypes';
import * as ActionFriend from '../../friend/controllers/actionType';

const FriendElement = ({ _id, thread_id }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { localAvatar, cloudAvatar,
    needToDownloadAvatar, someoneId, Someone
  } = useSelector(state => {
    const imageAvatars = state.ChatStoredReducer.imageAvatars
    const myFriends = state.FriendStoredReducer.myFriends;
    const myContacts = state.FriendStoredReducer.myContacts;

    //cá nhân
    let Someone = myFriends[_id] || myContacts[_id];
    let localAvatar,
      cloudAvatar,
      needToDownloadAvatar,
      someoneId;
    if (!Someone) {
      return { someoneId: _id }
    }
    if (Someone.avatar_url) {
      localAvatar = imageAvatars[Someone.avatar_url];
      cloudAvatar = Someone.avatar_url;
      needToDownloadAvatar = localAvatar ? false : true
    }

    return { localAvatar, cloudAvatar, needToDownloadAvatar, someoneId, Someone }
  }, (prev, next) => isEqual(prev, next));

  useEffect(() => {
    if (needToDownloadAvatar) {
      dispatch({
        type: Action.API_DOWNLOAD_AVATAR,
        data: {
          url: cloudAvatar,
        },
        dispatch: dispatch
      })
    }
    if (someoneId) {
      dispatch({
        type: ActionFriend.API_DOWNLOAD_CONTACT,
        data: {
          _ids: [someoneId]
        }
      })
    }
  }, []);

  useEffect(() => {
    if (needToDownloadAvatar) {
      dispatch({
        type: Action.API_DOWNLOAD_AVATAR,
        data: {
          url: cloudAvatar,
        },
        dispatch: dispatch
      })
    }
  }, [needToDownloadAvatar]);




  const onPress = () => {
    if (!thread_id) {
      dispatch({
        type: Action.CHAT_WITH_SOMEONE,
        data: { contact_id: _id },
        navigation
      })
    } else {
      dispatch({
        type: Action.API_SHARE_CONTACT,
        data: {
          someone_id: _id,
          thread_id,
          navigation
        }
      })
    }

  }

  return (
    <SafeAreaView>
      <View style={{
        height: 80,
        // backgroundColor:"blue",

      }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
            height: 80,
            flex: 1,
            alignItems: "center",
            marginBottom: 6,
            // backgroundColor: "#ebf4f7",
            padding: 10,
            borderRadius: 10,

          }}
        >
          {
            localAvatar
              ?
              <DispatchImage
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 50,
                  borderWidth: 0.7,
                  borderColor: '#ccc',


                }}
                source={localAvatar}
                type={'avatar'}
                data={{
                  cloudLink: cloudAvatar
                }}
              />
              :
              <Image
                source={DefaultAvatar}
                style={{
                  width: 55, height: 55,
                  borderRadius: 50,
                }} />
          }
          <View style={{
            paddingLeft: 10,
          }}>
            <Text style={{
              fontSize: 16,
              fontWeight: "500",
            }}>
              {Someone && Someone.name}
            </Text>
          </View>
          {!thread_id
            ?
            <View style={{
              flex: 1,
              justifyContent: "flex-end",

              alignItems: "flex-end",
            }}>
              <Ionicons color='#828282' size={25} name='chatbubble-ellipses-outline' style={{}} />
              {/* 828282 */}
            </View>
            : null
          }
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}
export default React.memo(FriendElement, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});