import io from 'socket.io-client';
import * as config from './config.json';

// dev.tomahosoft.com
const socket = io(config.socket_url, {
    jsonp: config.socket_jsonp,
    transports: config.socket_transports,
});
export { socket }