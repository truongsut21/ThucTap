/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

let mytextvar =
  ' Tuyển dụng frontend Đến học công nghệ mới và kiếm thêm thu nhập thêm một nguồn nhập kiếm thêm thu nhập. Tuyển dụng nhân viên kế hoạ ch sản xuất, vận Tuyển dụng frontend Đến học công nghệ mới và kiếm thêm thu nhập thêm một nguồn nhập kiếm thêm thu nhập. Tuyển dụng nhân viên kế hoạ ch sản xuất, vận';
export default function Content(props) {
  return (
    <View>
      <Text>
        {mytextvar.length > 170
          ? mytextvar.substring(0, 170 - 3) + '...'
          : mytextvar}
      </Text>

      
    </View>
  );
}
