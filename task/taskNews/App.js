import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {Dimensions} from 'react-native';

import {
  SafeAreaView,
  StatusBar,
  View,
  Image,
  TextInput,
  Text,
} from 'react-native';

import AvataInfo from './components/AvataInfo';
import IconPost from './components/IconPost';
import Content from './components/Content';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

Feather.loadFont();
const App = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#E9E9E9'}}>
      <StatusBar style="light" />

      <View>
        <View // Đăng bài viết
          style={{
            flexDirection: 'row',
            margin: 30,
            paddingTop: 20,
            paddingLeft: 10,
            borderColor: '#5f9ea0',
            borderWidth: 2,
            borderRadius: 20,
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
            }}
            style={{width: 40, height: 40, margin: 'auto', marginBottom: 15}}
          />

          <TextInput
            style={{
              height: 45,
              width: '70%',
              marginLeft: 10,
              marginTop: -10,
            }}
            // Adding hint in TextInput using Placeholder option.
            placeholder=" Đăng bài viết"
            // Making the Under line Transparent.
            underlineColorAndroid="transparent"
          />
        </View>
      </View>

      <View style={{backgroundColor: '#f0f8ff', margin: 20, borderRadius: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20,
            marginBottom: 0,
          }}>
          <AvataInfo
            name="Nhat linh"
            time="22thg 1,2022"
            img="https://cdn-icons-png.flaticon.com/512/147/147142.png"
          />

          <Feather
            name="menu"
            size={30}
            style={{
              color: '#bb3',
            }}
          />
        </View>
        <View style={{margin: 20, marginTop: 0, marginBottom: 0}}>
          <Content />
        </View>
        <View>
          <Image
            source={{
              uri: 'https://res.cloudinary.com/kimwy/image/upload/v1624063424/easyfrontend/lo-trinh-fe_zzhxml.png',
            }}
            style={{
              maxWidth: '100%',
              height: windowHeight - windowHeight * 0.7,
              margin: 20,
              marginTop: 0,
              marginBottom: 0,
              resizeMode: 'contain',
            }}
          />
        </View>
        <IconPost />

        <View style={{marginLeft: 30}}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
            }}
            style={{width: 25, height: 25, marginBottom: 15}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
