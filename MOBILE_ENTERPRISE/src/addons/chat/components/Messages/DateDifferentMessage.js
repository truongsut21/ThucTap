import React from 'react';
import { View, Text } from 'react-native';
import isEqual from 'react-fast-compare';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { WIDTH } from '../../controllers/utils';
import { useSelector } from 'react-redux';
import useTheme from '../../../base/components/useTheme';

const TIME = 300000;

const DateMessage = ({ mid, newer_mid }) => {
    const theme = useTheme();
    const compareTime = useSelector(state => {
        try {
            return state.ChatStoredReducer.fullMessages[mid].create_date;
        } catch (error) {
            return 0;
        }
    }, (prev, next) => prev === next); //số cách nhau 1000 mili giây mới tính
    const showTime = useSelector(state => {
        try {
            if (!newer_mid) return state.ChatStoredReducer.fullMessages[mid].create_date
            return state.ChatStoredReducer.fullMessages[newer_mid].create_date;
        } catch (error) {
            return 0;
        }
    }, (prev, next) => prev === next); //số cách nhau 1000 mili giây mới tính

    if (Math.abs(differenceInCalendarDays(showTime, compareTime)) === 0) {
        if (showTime - compareTime >= TIME) {
            if (Math.abs(differenceInCalendarDays(showTime, new Date()))) {
                return (<View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 20,
                    marginTop: -10,
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <View style={{
                        backgroundColor: theme.backgroundSystemMessageColor,
                        borderRadius: 15,
                        paddingVertical: 7, paddingHorizontal: 10,
                        alignItems: 'center', justifyContent: 'center',
                        maxWidth: WIDTH * 0.8,
                    }}>
                        <Text style={{
                            borderRadius: 5,
                            color: theme.textSystemMessageColor,
                            textAlign: 'center',
                            fontSize: 13,
                            fontWeight: '600'
                        }}>
                            {format(new Date(showTime), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        </Text>
                    </View>
                </View>)
            }
            return (<View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 20,
                marginTop: -10,
                flex: 1,
                flexDirection: 'row'
            }}>
                <View style={{
                    backgroundColor: theme.backgroundSystemMessageColor,
                    borderRadius: 15,
                    paddingVertical: 7, paddingHorizontal: 10,
                    alignItems: 'center', justifyContent: 'center',
                    maxWidth: WIDTH * 0.8,
                }}>
                    <Text style={{
                        borderRadius: 5,
                        color: theme.textSystemMessageColor,
                        textAlign: 'center',
                        fontSize: 13,
                        fontWeight: '600'
                    }}>
                        {format(new Date(showTime), 'HH:mm', { locale: vi })}
                    </Text>
                </View>
            </View>)
        }
        return null;
    } else {
        return (<View style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
            marginTop: -10,
            flex: 1,
            flexDirection: 'row'
        }}>
            <View style={{
                backgroundColor: theme.backgroundSystemMessageColor,
                borderRadius: 15,
                paddingVertical: 7, paddingHorizontal: 10,
                alignItems: 'center', justifyContent: 'center',
                maxWidth: WIDTH * 0.8,
            }}>
                <Text style={{
                    borderRadius: 5,
                    color: theme.textSystemMessageColor,
                    textAlign: 'center',
                    fontSize: 13,
                    fontWeight: '600'
                }}>
                    {format(new Date(showTime), 'dd/MM/yyyy', { locale: vi })}
                </Text>
            </View>
        </View>)
    }
}

export default React.memo(DateMessage, (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
})
