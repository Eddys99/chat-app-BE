class CheckIf {

    static itIsString(data) {
        return (typeof data === 'string');
    }

    static itIsNotEmptyString(data) {
        return (typeof data === 'string' && data.length > 0);
    }

    static itIsArray(data) {
        return (Array.isArray(data));
    }

    static itIsArrayWithItems(data) {
        return (Array.isArray(data) && data.length > 0);
    }

    static itIsObject(data) {
        return (typeof data === 'object');
    }

    static itIsObjectWithKeys(data) {
        return (CheckIf.itIsObject(data) && !!data && Object.keys(data).length > 0);
    }
}

module.exports = CheckIf;
