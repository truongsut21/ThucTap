
import React, { useEffect, useState } from 'react';
import {
    View, Image, ScrollView, TouchableOpacity as Touch,
    UIManager, LayoutAnimation,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import { WIDTH, HEIGHT } from '../../../controllers/utils';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const PreviewImage = ({ image, onPressImage }) => {
    const cacheImage = useSelector(state => {
        const cacheGalleryImage = state.ChatStoredReducer.cacheGalleryImage;
        return cacheGalleryImage[image.path];
    });

    useEffect(() => {
        LayoutAnimation.configureNext({
            duration: 300,
            create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
            delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity }
        });
        return () => {
            LayoutAnimation.configureNext({
                duration: 300,
                create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
                update: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
                delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity }
            });
        }
    }, []);

    const onPress = () => {
        onPressImage(image);
    }

    try {
        return <View style={{
            marginLeft: 5,
            marginVertical: 10,
            marginRight: 3,
            width: WIDTH / 5.6,
            height: HEIGHT / 7,
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor:"red",
            // padding:10,
        }}>

            <Image
                source={{ uri: cacheImage }}
                style={{
                    width: WIDTH / 5.3,
                    height: HEIGHT / 7,
                    borderRadius: 5,
                }}
            />
            <Touch onPress={onPress} style={{
                position: 'absolute',
                right: 5,
                top: 5,
                zIndex: 1,
                borderRadius: 10,
            }}>
                <AntDesign name="closecircleo" size={20} style={{ color: '#fff' }} />
            </Touch >
        </View>
    } catch (error) {
        return null;
    }
}

const MemoizedPreviewImage = React.memo(PreviewImage)

const PreviewImages = ({ previewImages, onPressImage }) => {

    try {
        return (<ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
                
            }}
            contentContainerStyle={{
                flexDirection: 'row',
                width: WIDTH,
                borderTopWidth: 0.4,
                borderColor: '#ddd'
            }}
        >

            {previewImages && previewImages.map(i => <MemoizedPreviewImage key={i.path} image={i} onPressImage={onPressImage} />)}
        </ScrollView>);
    } catch (error) {
        return null;
    }
}

export default PreviewImages;