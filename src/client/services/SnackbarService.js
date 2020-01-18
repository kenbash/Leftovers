
import { EventEmitter } from 'fbemitter';

const snackbarEmitter = new EventEmitter();

export function sendSnackbar(props) {
  snackbarEmitter.emit('event', props);
}

export function onSnackbarSent(listener) {
  snackbarEmitter.addListener('event', listener);
}
