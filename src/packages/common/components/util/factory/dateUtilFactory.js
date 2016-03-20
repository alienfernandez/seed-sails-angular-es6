import commonModule from '../../../commonModule';

class DateUtilFactory {

    constructor() {
    }

    /*ngInject*/
    static instance() {
        return new DateUtilFactory();
    }

    /**
     * Convert seconds to format (hour:minutes:seconds)
     * @param secs
     * @param showSeconds
     * @returns {string}
     */
    secondsToTime(secs, showSeconds) {
        var hours = Math.floor(secs / (60 * 60));
        var showSeconds = showSeconds || false;
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        //Set data
        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;

        var time = hours + ':' + minutes;
        time = (showSeconds) ? time + ':' + seconds : time;
        return time;
    }

    /**
     * Convert time format (hour:minutes:seconds) to seconds
     * @param time
     * @param padSeconds
     * @returns {*}
     */
    stringToSeconds(time, padSeconds) {
        if (time) {
            if (padSeconds) {
                time += ":00";
            }
            var sep1 = time.indexOf(":");
            var sep2 = time.lastIndexOf(":");
            var hour = time.substr(0, sep1);
            var min = time.substr(sep1 + 1, sep2 - sep1 - 1);
            var sec = time.substr(sep2 + 1);
            return (Number(sec) + (Number(min) * 60) + (Number(hour) * 3600));
        }

        return null;
    }

;
}

commonModule.factory('DateUtil', DateUtilFactory.instance);

export default commonModule;
