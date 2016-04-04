import commonModule from '../../../commonModule';

class ChatboxController {

    /*ngInject*/
    constructor(ChatBoxes, ChatXmpp) {
        this.ChatBoxes = ChatBoxes;
        this.ChatXmpp = ChatXmpp;

    }

    closeChatBox(title) {
        this.ChatBoxes.closeChatBox(title);
    }

    onChatBoxToggle(title) {
        this.chatbox = this.ChatBoxes.getChatBoxByTitle(title);
        if (this.chatbox.minimized) {
            this.ChatBoxes.onChatBoxMaximized(title);
        } else {
            this.ChatBoxes.onChatBoxMinimized(title);
        }
    }

    onChatBoxMinimized(title) {
        this.ChatBoxes.onChatBoxMinimized(title);
    }

    onChatBoxMaximized(title) {
        this.ChatBoxes.onChatBoxMaximized(title);
    }

    onChatBoxBlur(title) {
        this.ChatBoxes.onChatBoxBlur(title);
    }

    sendMessage() {
        this.chatbox = this.ChatBoxes.getChatBoxByTitle(this.title);
        //console.log("this.chatbox", this.chatbox);
        let to = this.chatbox.jid;
        let xmppCore = this.ChatXmpp.getXmppCore();
        xmppCore._connection.send($msg({
            to: to, from: xmppCore._connection.jid, type: 'chat'
        }).c('body').t(this.message).tree());

        this.ChatBoxes.addMessage(xmppCore._connection.authcid, this.message, this.chatbox);
        this.message = '';
    }
}

commonModule.controller('ChatboxController', ChatboxController);

export default commonModule;
