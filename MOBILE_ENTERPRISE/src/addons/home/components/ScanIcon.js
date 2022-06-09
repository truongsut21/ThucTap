import React from 'react';
import { View} from 'react-native';
import LottieView from 'lottie-react-native';
import isEqual from "react-fast-compare";
const QRScannerIcon = require('../../../static/qr-scanner-tab-icon.json');

const ScanIcon = ({}) => {
    return <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 43,
        height: 43,
        borderColor: '#00A48D',
        borderWidth: 5,
        borderRadius: 20
    }}>
        <LottieView source={QRScannerIcon}
            style={{
                width: 45,
            }}
            speed={0.5}
            autoPlay
            loop
        />
    </View>;
}

export default React.memo(ScanIcon, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})