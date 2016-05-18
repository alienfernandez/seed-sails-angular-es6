import systemModule from '../systemModule';

class SocketIoService {

    constructor($timeout, $state, AuthenticationService) {
        this.$timeout = $timeout;
        this.$state = $state;
        this.AuthenticationService = AuthenticationService;
        this.connect();
    }

    /*ngInject*/
    static instance($timeout, $state, AuthenticationService) {
        return new SocketIoService($timeout, $state, AuthenticationService);
    }

    /**
     * Connect to Socket.io server
     */
    connect() {
        // Connect only when authenticated
        if (this.AuthenticationService.user) {
            //this.socket = io();
            this.socket = io.sails.connect();
            console.log("this.socket", this.socket)
        }
    }

    /**
     * Wrap the Socket.io 'on' method
     * @param eventName
     * @param callback
     */
    on(eventName, callback) {
        if (this.socket) {
            this.socket.on(eventName, (data) => {
                this.$timeout(() => {
                    callback(data);
                });
            });
        }
    }

    /**
     * Wrap the Socket.io 'emit' method
     * @param eventName
     * @param data
     */
    emit(eventName, data) {
        if (this.socket) {
            this.socket.emit(eventName, data);
        }
    }

    /**
     * Wrap the Socket.io 'removeListener' method
     * @param eventName
     */
    removeListener(eventName) {
        if (this.socket) {
            this.socket.removeListener(eventName);
        }
    }
}

systemModule.factory('Socket', SocketIoService.instance);

export default systemModule;
