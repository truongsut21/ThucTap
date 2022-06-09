import { all } from 'redux-saga/effects';

import { watcherAuth } from '../auth/controllers/watcher';
import { watcherChat } from '../chat/controllers/watcher';
import { watcherStateReaction } from '../chat/controllers/watcherStateReaction';
// import { watcherChatUtils } from '../chat/controllers/watcherThreadUtil';
import { watcherMessages } from '../chat/controllers/watcherMessage';
import { watcherThread } from '../chat/controllers/watcherThread';
import { watcherContact } from '../chat/controllers/watcherContact';
import { watcherPin } from '../chat/controllers/watcherPin';
import { watcherMessageState } from '../chat/controllers/watcherMessageState';
import { watcherReaction } from '../chat/controllers/watcherReaction';
import { watcherSetting } from '../setting/controllers/watcher';
import { watcherInit } from '../chat/controllers/watcherInit'
// import { watcherCall } from '../call/controllers/watcher';
// import { watcherTask } from '../task/controllers/watcher';
import { watcherFriend } from '../friend/controllers/watcher';
import { watcherBase } from '../base/controllers/watcher';
import { watcherECard } from '../ecard/controllers/watcher';

export default function* rootSaga() {
    yield all([
        watcherInit(),
        watcherAuth(),
        watcherFriend(),
        watcherChat(),
        watcherStateReaction(),
        // watcherChatUtils(),
        watcherMessages(),
        watcherThread(),
        watcherContact(),

        watcherPin(),
        watcherMessageState(),
        watcherReaction(),
        watcherSetting(),
        watcherBase(),
        watcherECard(),
        // watcherCall(),
        // watcherTask(),
    ])
}