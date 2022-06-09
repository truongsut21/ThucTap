import React, { useEffect, useCallback, useState } from 'react';
import { Image } from 'react-native';
import { SvgXml } from 'react-native-svg';

const SVGWrapper = ({ uri = '', width = "0", height = "0", style = {} }) => {

    useEffect(() => {
    }, [uri]);

    try {
        return <Image
            source={{ uri: uri }}
            style={style}
        />
    } catch (error) {
        return null;
    }

}

export default SVGWrapper;