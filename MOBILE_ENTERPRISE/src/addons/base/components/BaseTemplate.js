import React from 'react';
import {
    SafeAreaView,
} from 'react-native';
import HeaderTemplate from './HeaderTemplate';
import FooterTemplate from './FooterTemplate';
import StatusBar from './StatusBar';

const BaseTemplate = ({
    headerComp,
    headerLeft,
    headerCenter,
    headerRight,

    children,

    footerComp,
    footerLeft,
    footerCenter,
    footerRight
}) => {

    return (
        <React.Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: '#fff',
    }}>
    <StatusBar backgroundColor='#fff' barStyle={'dark-content'} />
        <HeaderTemplate
            headerComp={headerComp}
            headerLeft={headerLeft}
            headerCenter={headerCenter}
            headerRight={headerRight}
        />
        <React.Fragment>
            {children ? children : null}
        </React.Fragment>
        <FooterTemplate
            footerComp={footerComp}
            footerLeft={footerLeft}
            footerCenter={footerCenter}
            footerRight={footerRight}
        />
    </SafeAreaView>
    </React.Fragment>);
}

export default React.memo(BaseTemplate);