import Mediator from "./Mediator";

import Editor from "../Editor/Editor";
import SchemaController from "../Schema/SchemaController";
import PageController from "../Page/PageController";

let singleton = null;
export default class MediatorFacade {
    constructor(mediator) {
        if (!(mediator instanceof Mediator)) throw new Error ("MediatorFacade needs a Mediator!");
        if (singleton === null) singleton = this;
        this.mediator = mediator;

        this.permissions = { publish: [], subscribe: [] };

        this.addPermission('openSchema', 'publish', Editor);

    }

    subscribe(context, channel, callback) {
        if (singleton.hasPermission(context, channel, 'subscribe')) {
            console.info("Subscription:", context.constructor && context.constructor.name, "subscribed to \'" + channel + '\'.');
            return singleton.mediator.subscribe.call(context, channel, callback);
        }
        console.warn("Subscription access denied!", context.constructor && context.constructor.name || "Subscriber", 'applied for \'' + channel + '\'.');
        return false;
    }

    publish(context, channel, ...args) {
        if (singleton.hasPermission(context, channel, 'publish')) {
            console.info("Publication:", context.constructor && context.constructor.name, "published to \'" + channel + '\'.');
            return singleton.mediator.publish.apply(context, [channel, ...args]);
        }
        console.warn("Publish access denied!", context.constructor && context.constructor.name || "Publisher", 'emitted \'' + channel + '\'.');
        return false;
    }

    addPermission(channel, permission, caller) {
        if (permission !== 'publish' && permission !== 'subscribe') {
            throw new Error("Trying to add unvalid permission!");
        };
        this.permissions[permission][channel] = this.permissions[permission][channel] || [];
        this.permissions[permission][channel].push(caller);
    };

    hasPermission(context, channel, permission) {
        return this.permissions[permission] 
            && this.permissions[permission][channel]
            && this.permissions[permission][channel].some(caller => context instanceof caller);
    };
}
