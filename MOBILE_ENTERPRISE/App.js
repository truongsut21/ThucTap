import 'react-native-gesture-handler';
import React, { createContext } from 'react';
import Navigator from './src/addons/navigator/components';
import { Provider } from 'react-redux';
import store from './src/addons/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThemeProvider from './src/addons/base/components/ThemeProvider';

const persistor = persistStore(store);

const App = () => {


    return (<Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
                <ThemeProvider>
                    <Navigator />
                </ThemeProvider>
            </SafeAreaProvider>
        </PersistGate>
    </Provider>)
}
// class App extends React.Component {
//     render() {


//     }
// }

export default App;
