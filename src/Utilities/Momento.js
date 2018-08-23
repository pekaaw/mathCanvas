import CloneDeep from "lodash/cloneDeep";

export default class Momento {
    constructor(data) {
        this._data = CloneDeep(data);
    }

    getData() {
        return this._data;
    }
}
