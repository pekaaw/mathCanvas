export default class EventDispatcher {
    constructor(sender) {
        this._sender = sender;
        this._listeners = [];
    }

    attach(listener) {
        this._listeners.push(listener);
    }

    notify(...args) {
        var results = [];
        for (var i = 0, length = this._listeners.length; i < length; ++i) {
            results[results.length] = this._listeners[i].apply(this._sender, args);
        }
        return results;
    }
}
