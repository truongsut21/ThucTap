import React, { useEffect, useState, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ThemeContext = createContext('light');

export { ThemeContext }

//Dùng Context để làm trung gian để trong trường hợp bất cứ data nào của reducer đổi thì chỉ có
//1 context component check change data đó trong reducer, ko bị trigger nhiều lần, ko bị giảm hiệu năng
//Nếu dùng useTheme và value của theme lấy từ reducer thì mỗi lần reducer có data đổi sẽ bị check lại rất mệt

const ThemeProvider = ({ children }) => {
    const themeValueInReducer = useSelector(state => {
        const theme = state.BaseStoredReducer.theme;
        if (theme && theme === 'dark') return 'dark';
        return 'light';
    }, (prev, next) => prev === next);
    const [currentTheme, setCurrentTheme] = useState(themeValueInReducer);

    useEffect(() => {
        if (themeValueInReducer !== currentTheme) setCurrentTheme(themeValueInReducer);
    }, [themeValueInReducer]);

    return <ThemeContext.Provider value={currentTheme}>
        {children ? children : null}
    </ThemeContext.Provider>

}

export default ThemeProvider;