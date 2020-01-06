class Loggable {
    constructor(title, active) {
        this._title = title;
        this._active = active;
    }

    getDate() {
        var today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth() + 1,
            yyyy = today.getFullYear(),
            HH = today.getHours(),
            MM = today.getMinutes(),
            SS = today.getSeconds(),
            date = null;

        if (dd < 10) { dd = '0' + dd }
        if (mm < 10) { mm = '0' + mm }

        date = `${dd}.${mm}.${yyyy} ${HH}:${MM}:${SS}`;
        return date;
    }

    log(message) {
        if (!this._active) {
            return;
        }

        var date = this.getDate(),
            logMessage = `[${date}][${this._title}] ${message}`;

        console.log(logMessage);
    }

    error(message) {
        var date = this.getDate(),
            logMessage = `[${date}][${this._title}] ${message}`;

        console.error(logMessage);
    }
}

export default Loggable;
