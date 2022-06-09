import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { RNCamera } from "react-native-camera";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Clipboard from "@react-native-community/clipboard";
import { useDispatch, useSelector } from "react-redux";
import * as AuthAction from "../../auth/controllers/actionTypes";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const QRScannerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [flashMode, setFlashMode] = useState(false);
  const [cameraLayout, setCameraLayout] = useState(null);
  const [scanLayout, setScanLayout] = useState(null);
  const [decodeData, setDecodeData] = useState("");

  // const [highlights, setHighL]
  const url = `/public/viewECardByLink/`;

  useEffect(() => {
    if (decodeData) {
      processDecodeData();
    }
  }, [decodeData]);

  const processDecodeData = () => {

  };

  const onBarCodeRead = (e) => {
    const { bounds, data } = e;
    let width, height;
    let x, y;

    const { origin, size } = bounds;
    let stemp = origin;
    if (stemp.length) {
      x = (WINDOW_WIDTH * 2) / 3 - 50;
      y = (WINDOW_WIDTH * 2) / 3 - 50;
    } else {
      x = origin.x;
      y = origin.y;
    }

    if (size) {
      width = size.width;
      height = size.height;
    } else {
      width = 40;
      height = 40;
    }

    //Tỉ lệ barcode phải nằm trong vùng quét thì mới nhận diện
    if (
      // !decodeData &&
      scanLayout.x <= Number(x) &&
      scanLayout.x + scanLayout.width >= Number(x) + Number(width) &&
      scanLayout.y <= Number(y) &&
      scanLayout.y + scanLayout.height >= Number(y) + Number(height)
    ) {
      setDecodeData(data);
    } //Tỉ lệ barcode phải nằm trong vùng quét thì mới nhận diện
    else if (
      // !decodeData &&
      scanLayout.x <= Number(x) &&
      scanLayout.x + scanLayout.width >= Number(x) + Number(width) &&
      scanLayout.y + scanLayout.height >= Number(y) + Number(height)
    ) {
      setDecodeData(data);
    } else {
      console.log("loi qr");
    }
  };

  //dùng để đo kích thước của màn hình camera
  const onCameraLayout = (e) => {
    try {
      setCameraLayout(e.nativeEvent.layout);
    } catch (error) {}
  };

  //dùng để đo kích thước của vùng quét barcode
  //vì chỉ cho quét ở 1 vùng
  //nếu cho quét toàn màn hình thì có thể sẽ quét được nhiều barcode
  //dẫn đến két quả ko đúng
  const onScanLayout = (e) => {
    try {
      setScanLayout({
        ...e.nativeEvent.layout,
        y: (WINDOW_HEIGHT - (WINDOW_WIDTH * 2) / 3) / 2, //Vì y luôn =0 nên phải tính lại cho khớp y
      });
    } catch (error) {}
  };

  const goBack = () => {
    try {
      //trigger 2 lần goback
      //lần 1 là trong stack
      //lần 2 là bỏ cái fakescreen trong component Home
      navigation.goBack();
      route.params.goBack();
    } catch (error) {
      navigation.goBack();
    }
  };

  const triggerFlash = () => {
    setFlashMode(!flashMode);
  };

  const copyText = () => {
    Clipboard.setString(decodeData);
    dispatch({
      type: AuthAction.UPDATE_NOTIFICATION,
      data: "Sao chép nội dung thành công",
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={goBack}
        style={{
          position: "absolute",
          left: 0,
          top: 20,
          paddingHorizontal: 20,
          paddingVertical: 20,
          zIndex: 2,
        }}
      >
        <AntDesign name="closecircle" size={20} color={"#fff"} />
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={triggerFlash}
        style={{
          position: "absolute",
          right: 0,
          top: 20,
          paddingHorizontal: 20,
          paddingVertical: 20,
          zIndex: 2,
        }}
      >
        {/* <MaterialCommunityIcons name={flashMode ? 'flash' : 'flash-outline'} size={20} color={'#fff'} /> */}
      </TouchableOpacity>
      <RNCamera
        onLayout={onCameraLayout}
        style={{
          flex: 1,
        }}
        onBarCodeRead={onBarCodeRead}
        flashMode={
          flashMode
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== "READY") return null;
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Vùng ở trên */}
              <View
                style={{
                  width: WINDOW_WIDTH,
                  height:
                    cameraLayout && scanLayout
                      ? (cameraLayout.height - scanLayout.height) / 2
                      : 0,
                  alignItems: "center",
                }}
              >
                {/* Vùng tối ở trên */}
                <View
                  style={{
                    width: WINDOW_WIDTH,
                    height:
                      cameraLayout && scanLayout
                        ? (cameraLayout.height - scanLayout.height) / 2
                        : 0,
                    backgroundColor: "#000",
                    opacity: 0.5,
                  }}
                />

                {/* Nội dung sau khi quét */}
                {decodeData && !decodeData.includes(url) ? (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 10,
                      width: WINDOW_WIDTH - 40,
                      paddingVertical: 20,
                      borderRadius: 10,
                      backgroundColor: "#fff",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: 10,
                      }}
                    >
                      <Text style={{}}>Nội dung</Text>
                      <Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={{ color: "#aaa" }}
                      >
                        {decodeData}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={copyText}
                      style={{
                        paddingHorizontal: 6,
                        paddingVertical: 3,
                        marginRight: 5,
                        borderWidth: 2,
                        borderRadius: 15,
                        borderColor: "#00A48D",
                        backgroundColor: "#00A48D",
                      }}
                    >
                      <Text style={{ color: "#fff", fontSize: 14 }}>
                        Sao chép
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {decodeData && decodeData.includes(url)
                  ? navigation.navigate("ECardScan", {
                      goBack,
                      decodeData: decodeData,
                      setDecodeData,
                    })
                  : null}
              </View>

              {/* Vùng camera và vùng tối 2 bên */}
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width:
                      cameraLayout && scanLayout
                        ? (cameraLayout.width - scanLayout.width) / 2
                        : 0,
                    height: scanLayout ? scanLayout.height : 0,
                    backgroundColor: "#000",
                    opacity: 0.5,
                  }}
                />
                <View
                  onLayout={onScanLayout}
                  style={{
                    width: (WINDOW_WIDTH * 2) / 3,
                    height: (WINDOW_WIDTH * 2) / 3,
                    borderWidth: 2,
                    borderColor: "#fff",
                  }}
                ></View>
                <View
                  style={{
                    width:
                      cameraLayout && scanLayout
                        ? (cameraLayout.width - scanLayout.width) / 2
                        : 0,
                    height: scanLayout ? scanLayout.height : 0,
                    backgroundColor: "#000",
                    opacity: 0.5,
                  }}
                />
              </View>

              {/* Vùng tối ở dưới */}
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Làm khoảng mờ */}
                <View
                  style={{
                    width: WINDOW_WIDTH,
                    height:
                      cameraLayout && scanLayout
                        ? (cameraLayout.height - scanLayout.height) / 2
                        : 0,
                    backgroundColor: "#000",
                    opacity: 0.5,
                  }}
                ></View>
                {cameraLayout && scanLayout ? (
                  <View
                    style={{
                      position: "absolute",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={triggerFlash}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 50,
                        height: 50,
                        borderWidth: 2,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    >
                      <MaterialCommunityIcons
                        name={flashMode ? "flash" : "flash-outline"}
                        size={25}
                        color={"#fff"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        paddingTop: 10,
                        color: "#fff",
                      }}
                    >
                      {flashMode ? "Tắt" : "Bật"} đèn flash
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

const QRScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate("QRScannerScreen", {
      goBack,
    });
  });

  const goBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return null;
};

export { QRScreen };

export default QRScannerScreen;
