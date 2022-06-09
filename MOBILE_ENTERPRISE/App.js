import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './src/addons/navigator/components';
import { Provider } from 'react-redux';
import store from './src/addons/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const persistor = persistStore(store)
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={
                    null
                } persistor={persistor}>
                    <SafeAreaProvider>
                        <Navigator />
                    </SafeAreaProvider>
                </PersistGate>
            </Provider>
        )

    }
}

export default App;
