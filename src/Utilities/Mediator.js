let singleton = null;
export default class Mediator {
    constructor() {
        if (singleton === null) singleton = this;
        singleton.channels = {};
    }

    subscribe (channel, callback) {
        if (!singleton.channels[channel]) singleton.channels[channel] = [];
        singleton.channels[channel].push({ context: this, callback: callback });
        return this;
    }

    publish (channel, ...args) {
        if (!singleton.channels[channel]) return false;
        for (var i = 0, length = singleton.channels[channel].length; i < length; ++i) {
            var subscription = singleton.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
        return this;
    }

    installTo (obj) {
        obj.subscribe = this.subscribe;
        obj.publish = this.publish;
    }
}
