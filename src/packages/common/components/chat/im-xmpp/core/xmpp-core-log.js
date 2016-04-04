class ChatXmppCoreLog {

    constructor(debug) {
        // Enable debug logging
        if (debug) {
            if (typeof window.console !== undefined && typeof window.console.log !== undefined) {
                if (Function.prototype.bind) {
                    this.log = Function.prototype.bind.call(console.log, console);
                } else {
                    this.log = function () {
                        Function.prototype.apply.call(console.log, console, arguments);
                    };
                }
            }
            this.log("[Init] Debugging enabled");
        } else {
            /** Function: log
             * Overridden to do something useful if debug is set to true.
             *
             * See: ChatXMPP.Core#init
             */
            this.log = function () {

            }
        }
        return this.log;
    }

}

export default ChatXmppCoreLog;
