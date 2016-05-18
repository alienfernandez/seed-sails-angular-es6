import chatModule from '../chatModule';

class ChatController {

    /*ngInject*/
    constructor($scope, $location, Socket, AuthenticationService, $appConstants, toastr) { //ChatBoxes, ChatXmpp,
        //ChatBoxes.create('alien');
        this.toastr = toastr;
        //this.ChatBoxes = ChatBoxes;
        //this.ChatXmpp = ChatXmpp;
        //Init bosh service
        //ChatXmpp.init($appConstants.xmpp.boshHttpService, {});
        ////Connect to jabber chat
        //ChatXmpp.getXmppCore().connect(AuthenticationService.user.jid, AuthenticationService.user.jidPassword);
        //$scope.$on('onRoster', (event, data) => {
        //    $scope.$apply(() => {
        //        //angular.forEach(data.roster.roster, function (data) {
        //        //    UsersService.findUserByJid(data.contact.jid).then(function () {
        //        //
        //        //    });
        //        //});
        //        this.roster = data.roster;
        //    });
        //});

        //$scope.$on('onPresence', (event, data) => {
        //    this.toastr.clear();
        //    let _user = data.from.split('@');
        //    if (data.show == 'unavailable') {
        //        this.toastr.info(_user[0] + ' is disconnected.');
        //    }
        //    if (data.show == 'available') {
        //        this.toastr.info(_user[0] + ' is ' + data.show + '.');
        //    }
        //    $scope.$apply(() => {
        //        this.roster = ChatXmpp.getXmppCore()._user.roster;
        //    });
        //});

        this.$location = $location;
        this.Socket = Socket;
        this.AuthenticationService = AuthenticationService;
        this.user = AuthenticationService.user;
        // Create a messages array
        this.messages = [];

        // If user is not signed in then redirect back home
        if (!this.AuthenticationService.user) {
            $location.path('/');
        }

        // Make sure the Socket is connected
        if (!this.Socket.socket) {
            this.Socket.connect();
        }
        // Add an event listener to the 'chatMessage' event
        this.Socket.on('chatMessage', (message) => {
            this.messages.unshift(message);
        });
        // Remove the event listener when the controller instance is destroyed
        $scope.$on('$destroy', () => {
            this.Socket.removeListener('chatMessage');
        });
    }

    createChat(jid) {
        //this.ChatBoxes.create(jid);
    }

    sendMessage() {
        // Create a new message object
        let message = {
            text: this.messageText
        };

        // Emit a 'chatMessage' message event
        this.Socket.emit('chatMessage', message);

        // Clear the message text
        this.messageText = '';
    }

}

chatModule.controller('ChatController', ChatController);

export default chatModule;
