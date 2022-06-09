import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const LightTheme = {
    textColor: '#333',
    textPlaceholderColor: '#AAA',
    dimTextColor: '#CCC',
    backgroundColor: '#FFF',
    backgroundPlaceholderColor: '#EEE',
    dimBackgroundColor: '#EFEFEF',
    borderColor: '#DDD',
    iconColor: '#00A48D',
    statusBar: 'dark-content',

    //For DateDiffMessage, SystemMessage
    backgroundSystemMessageColor: 'rgba(0,0,0,0.2)',
    textSystemMessageColor: '#FFF',
    //End

    //For TextMessage ở Other
    backgroundTextMessageColor: '#EEE',
    textMessageColor: '#333',
    //End

    //For inputbar
    backgroundInputBarColor: '#FFF',
    //End
}

const DarkTheme = {
    textColor: '#FFF',
    textPlaceholderColor: '#9A999E',
    dimTextColor: '#CCC',
    backgroundColor: '#000',
    backgroundPlaceholderColor: '#1D1D1F',
    dimBackgroundColor: '#EFEFEF',
    borderColor: '#DDD',
    iconColor: '#00A48D',
    statusBar: 'light-content',

    //For DateDiffMessage, SystemMessage
    backgroundSystemMessageColor: '#1D1D1F',
    textSystemMessageColor: '#9A999E',
    //End

    //For TextMessage ở Other
    backgroundTextMessageColor: '#1D1D1F',
    textMessageColor: '#FFF',
    //End

    //For inputbar
    backgroundInputBarColor: '#1D1D1F',
    //End
}

const useTheme = () => {
    const currentTheme = useContext(ThemeContext);

    if (!currentTheme || currentTheme === 'light') return LightTheme;
    return DarkTheme;
}

export default useTheme;