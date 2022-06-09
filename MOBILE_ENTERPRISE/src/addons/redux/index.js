import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import rootSaga from './watcher';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: [
        'AuthUnstoredReducer', 'ChatUnstoredReducer',
        'CallUnstoredReducer', 'TaskUnstoredReducer',
        'BaseUnstoredReducer'
    ],
};

const reducers = persistReducer(rootPersistConfig, rootReducer)
const saga = createSagaMiddleware();
const middleWares = [saga];
const store = createStore(
    reducers,
    // rootReducer,
    applyMiddleware(...middleWares)
);

saga.run(rootSaga);

export default store;