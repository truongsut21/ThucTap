import React, { useMemo, useRef, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import DrawFeature from './DrawFeature';

const ImageEditor = ({ image_id, close }) => {
    const insets = useSafeAreaInsets();
    const [openingFeature, setOpeningFeature] = useState('');
    const [layers, setLayers] = useState({});
    const fixLayersCache = useRef({});

    const goBack = () => {
        close();
    }

    const addNewDrawLayer = (newLayer) => {
        let drawLayers = fixLayersCache.current.draw ? [...fixLayersCache.current.draw] : [];
        drawLayers.push(newLayer);
        let newLayers = {
            ...fixLayersCache.current,
            draw: drawLayers
        }
        fixLayersCache.current = newLayers;
        setLayers(fixLayersCache.current)
    }

    const undoDrawLayer = () => {
        if (!layers['draw'] || layers['draw'].length === 0) return true;
        let cloneLayers = { ...layers };
        let drawLayers = cloneLayers['draw'] ? [...cloneLayers['draw']] : [];
        drawLayers.pop();
        fixLayersCache.current = {
            ...cloneLayers,
            draw: [...drawLayers]
        }
        setLayers({
            ...cloneLayers,
            draw: [...drawLayers]
        })
    }

    const Header = useMemo(() => {
        if (openingFeature === 'draw') {
            return <View>
                <View style={{
                    backgroundColor: '#000',
                    height: insets.top
                }}
                />
                <View style={{
                    backgroundColor: '#000',
                    height: 50,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={undoDrawLayer}
                        style={{
                            padding: 10,
                        }}
                    >
                        {
                            layers['draw'] && layers['draw'].length > 0
                                ?
                                <AntDesign color="#fff" size={22} name="arrowleft" style={{}} />
                                :
                                null
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={e => setOpeningFeature('')}
                        style={{
                            padding: 10,
                        }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>Hoàn thành</Text>
                    </TouchableOpacity>

                </View>
            </View>
        }
        return <View>
            <View style={{
                backgroundColor: '#000',
                height: insets.top
            }}
            />
            <View style={{
                backgroundColor: '#000',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    onPress={goBack}
                    style={{
                        padding: 10,
                    }}
                >
                    <AntDesign color="#fff" size={22} name="arrowleft" style={{}} />
                </TouchableOpacity>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity style={{
                        padding: 10,
                    }}>
                        <Entypo color="#fff" size={22} name="language" style={{}} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={e => setOpeningFeature('draw')}
                        style={{
                            padding: 10,
                        }}>
                        <MaterialCommunityIcons color="#fff" size={22} name="draw" style={{}} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }, [openingFeature, layers]);

    const Body = useMemo(() => {
        if (openingFeature === 'draw') {
            return <DrawFeature
                layers={layers.draw || []}
                addNewDrawLayer={addNewDrawLayer}
            />
        }
        return null;
    }, [openingFeature, layers]);

    const Footer = useMemo(() => {
        return <View>
            <View style={{
                backgroundColor: '#000',
                height: 50,
            }}>

            </View>
            <View style={{
                backgroundColor: '#000',
                height: insets.bottom
            }} />
        </View>
    }, [openingFeature]);

    return <View style={{
        flex: 1,
    }}>
        {Header}
        <View style={{
            flex: 1,
            backgroundColor: '#fff'
        }}>
            {Body}
        </View>
        {Footer}
    </View >;
}

export default ImageEditor;