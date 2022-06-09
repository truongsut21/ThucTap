import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Image, TouchableOpacity, PanResponder } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Canvas from 'react-native-canvas';

const DrawFeature = ({ layers, addNewDrawLayer }) => {
    const insets = useSafeAreaInsets();
    const [isDrawing, setIsDrawing] = useState(false);
    const canvaRef = useRef(null);
    const contextCanvaRef = useRef(null);
    const hasBeginPath = useRef(false);

    const setHandleCanvaByRef = (canvas) => {
        try {
            canvas.width = 400;
            canvas.height = 400;

            // canvas.style.width = `400px`;
            // canvas.style.height = `400px`;

            canvaRef.current = canvas;

            const ctx = canvas.getContext('2d');
            // ctx.scale(2, 2);
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 5;

            // canvaRef.current.width = 400;
            // canvaRef.current.height = 400;

            // canvaRef.current.lineCap = 'round';
            // canvaRef.current.strokeStyle = '#000';
            // canvaRef.current.lineWidth = 5;

            contextCanvaRef.current = ctx;
        } catch (error) {

        }
    }

    const onMoveFinger = (evt, gestureState) => {
        try {
            if (gestureState.numberActiveTouches !== 1) return true;
            // const { offsetX, offsetY } = evt.nativeEvent;
            const { moveX, moveY } = gestureState;
            // console.log(moveX, moveY);

            // canvaRef.current.lineCap = 'round';
            // canvaRef.current.strokeStyle = '#000';
            // canvaRef.current.lineWidth = 5;
            if (!hasBeginPath.current) {
                contextCanvaRef.current.beginPath();
                contextCanvaRef.current.moveTo(moveX, moveY);
                hasBeginPath.current = true;
            } else {
                contextCanvaRef.current.lineTo(moveX, moveY);
                contextCanvaRef.current.stroke();
            }

            // canvaRef.current.fillStyle = 'purple';
            // canvaRef.current.fillRect(0, 0, 100, 100);
        } catch (error) {

        }
    }

    const onReleaseFinger = async () => {
        canvaRef.current.toDataURL('image/png', 1.0).then(res => {
            addNewDrawLayer(res);
            setIsDrawing(false);
        }).catch(error => {
        })
    }

    //Đưa Canva component nào memo để có thể truyền component như 1 variable bình thường
    const DrawingCanva = useMemo(() => {
        // if (isDrawing){
        return <Canvas ref={setHandleCanvaByRef} />
        // }
        // return null;
    }, []);

    const panResponder = React.useRef(
        PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderGrant: (evt, gestureState) => {
                setIsDrawing(true);
                return true;
            },
            onPanResponderMove: (evt, gestureState) => {
                // The most recent move distance is gestureState.move{X,Y}
                // The accumulated gesture distance since becoming responder is
                // gestureState.d{x,y}
                onMoveFinger(evt, gestureState)
            },
            onPanResponderTerminationRequest: (evt, gestureState) =>
                true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                onReleaseFinger();
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            }
        })
    ).current;

    return <View
        {...panResponder.panHandlers}
        style={{ flex: 1, backgroundColor: 'red' }}
    >
        {layers.map((Layer, index) => {
            return <SingleDrawImage key={index} data={Layer} />
        })}
        {/* {
            isDrawing ? <Canvas ref={handleDrawingCanvas} /> : null
        } */}
        {/* {canvaComponent} */}
        {/* {DrawingCanva} */}
        {
            isDrawing ? <View
                style={{
                    flex: 1,
                    position: 'absolute'
                }}
            >
                {DrawingCanva}
            </View> : null
        }
        {/* <Canvas ref={handleDrawingCanvas} /> */}
    </View>
}

const SingleDrawImage = ({ data }) => {
    //Nếu ko replace double quote thì ko bao giờ show được
    //Chẳng hiểu vì sao double quote lại có trong đó
    const [base64, setBase64] = useState(data.replaceAll('"', ""));
    useEffect(() => {
        if (base64 !== data) {
            setBase64(data.replaceAll('"', ""));
        }
    }, [data]);

    return <View
        style={{
            flex: 1,
            position: 'absolute',
        }}>
        <Image
            source={{ uri: base64 }}
            style={{ width: 400, height: 400, }}
            resizeMode="cover"
        />
    </View>;
}

export default DrawFeature;