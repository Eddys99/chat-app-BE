'use strict';

class SetDateObject {
    constructor(date = null) {
        const _date = (date) ? date : new Date();

        this.setTimestamp(_date);
        this.setDate(_date);
    }

    setTimestamp(date) {
        this.timestamp = date.getTime().toString();
    }

    setDate(date) {
        this.date = this.getDatePretty(date);
    }

    getDatePretty (date) {
        const _date = (date)
            ? date
            : new Date();

        let humanReadableDate = _date.toJSON()
            .replace('T', ' ')
            .replace('\.', '')
            .replace('Z', '');

        return humanReadableDate.slice(0, humanReadableDate.length - 3);
    }
}

module.exports = SetDateObject;
