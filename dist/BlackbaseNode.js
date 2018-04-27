"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class BlackbaseNode {
    constructor(_value = null) {
        this.events = new events_1.EventEmitter();
        this.value = null;
        this.set(_value);
    }
    get() {
        this.events.emit('get', this.value);
        return this.value;
    }
    set(_newValue) {
        this.events.emit('get', this.value, _newValue);
        if (typeof _newValue === 'object') {
            this.value = {};
            for (let _key of Object.keys(_newValue)) {
                Object.defineProperty(this.value, _key, {
                    value: new BlackbaseNode(_newValue[_key]),
                    configurable: true,
                    enumerable: true,
                    writable: false
                });
            }
        }
        else {
            this.value = _newValue;
        }
    }
    on(_event, _listener) {
        return this.events.on(_event, _listener);
    }
    once(_event, _listener) {
        return this.events.once(_event, _listener);
    }
    off(_event, _listener = null) {
        if (_listener !== null) {
            this.events.removeListener(_event, _listener);
        }
        else {
            this.events.removeAllListeners(_event);
        }
    }
}
exports.default = BlackbaseNode;
