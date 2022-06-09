import React from 'react';
import {
    View,
} from 'react-native';
import styles from '../../chat/static/style';
import { WIDTH } from '../../chat/controllers/utils';


const Header = ({ headerComp, headerLeft, headerCenter, headerRight, }) => {
    return (<View style={headerComp || headerLeft || headerCenter || headerRight ? styles.aac : {}}>
        {
            headerLeft || headerCenter || headerRight ?
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        maxWidth: WIDTH * 1,
                    }}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        {headerLeft}
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {headerCenter}
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: 'center'
                    }}>
                        {headerRight}
                    </View>
                </View>
                :
                { headerComp }
        }
    </View>)
}

export default React.memo(Header);

