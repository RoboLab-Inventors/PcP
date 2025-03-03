const eventTarget = new EventTarget();
const listeners = new Map();

const eventEmitter = {
  on: (event, callback) => {
    const listener = (e) => callback(e.detail);
    listeners.set(callback, listener);
    eventTarget.addEventListener(event, listener);
  },
  off: (event, callback) => {
    const listener = listeners.get(callback);
    if (listener) {
      eventTarget.removeEventListener(event, listener);
      listeners.delete(callback);
    }
  },
  emit: (event, data) => {
    eventTarget.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
};

export default eventEmitter;
