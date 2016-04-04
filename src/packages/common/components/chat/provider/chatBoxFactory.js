import commonModule from '../../../commonModule';
import moment from 'moment';

class ChatBoxesFactory {

    constructor($document, $rootScope, lodash, $compile, $window) {
        this.chatBoxes = [];
        this.chatBoxesVisibles = 0;
        this.chatboxPrefix = "chatbox_";
        this.iconClsMaximize = "fa-plus";
        this.iconClsMinimize = "fa-minus";
        this.chatBoxWidth = 250;
        this.chatBoxStart = 250;
        this.$document = $document;
        this.$rootScope = $rootScope;
        this._ = lodash;
        this.$compile = $compile;
        this.$window = $window;
    }

    /*ngInject*/
    static instance($document, $rootScope, lodash, $compile, $window) {
        return new ChatBoxesFactory($document, $rootScope, lodash, $compile, $window);
    }

    create(title, minimizeChatBox = false) {
        let jid = this._.clone(title);
        let titleChatBox = title.replace('@', '_');
        let selector = "#" + this.chatboxPrefix + titleChatBox;
        if ($(selector).length > 0) {
            if ($(selector).css('display') == 'none') {
                $(selector).css('display', 'block');
                this.restructureChatBoxes();
            }
            return;
        }
        let template = angular.element('<chatbox title="' + jid + '"></chatbox>');
        let chatboxExist = this.$document.find(selector);
        let element;
        ////Check exist chatbox in DOM
        if (!chatboxExist.length) {
            element = this.$compile(template)(this.$rootScope);
            this.$document.find('body').prepend(element);
        } else {
            element = chatboxExist;
        }
        //Init chat box to create
        this.initChatBox(element, jid, minimizeChatBox);
        if (element) {
            element.show();
        }
    }

    initChatBox(element, jid, minimizeChatBox) {
        let title = this._.clone(jid).replace('@', '_');
        let selector = "#" + this.chatboxPrefix + title;
        element.css('bottom', '0px');
        for (let chatbox in this.chatBoxes) {
            if ($(selector + this.chatBoxes[chatbox].title).css('display') != 'none') {
                this.chatBoxesVisibles++;
            }
        }
        if (this.chatBoxesVisibles == 0) {
            element.css('right', this.chatBoxStart + 'px');
        } else {
            let width = (this.chatBoxesVisibles) * (this.chatBoxWidth + 7) + this.chatBoxStart;
            element.css('right', width + 'px');
        }
        var chatbox = {
            title: title,
            jid: jid,
            minimized: false,
            maximized: true,
            focused: false
        };

        this.chatBoxes.push(chatbox);
        if (minimizeChatBox) {
            this.onChatBoxMinimizedElement(element, title);
        }
    }

    restructureChatBoxes() {
        let align = 0;
        for (let chatbox in this.chatBoxes) {
            let chatboxtitle = this.chatBoxes[chatbox].title;
            let selector = "#" + this.chatboxPrefix + chatboxtitle;
            if ($(selector).css('display') != 'none') {
                if (align == 0) {
                    $(selector).css('right', this.chatBoxStart + 'px');
                } else {
                    let width = (align) * (this.chatBoxWidth + 7) + this.chatBoxStart;
                    $(selector).css('right', width + 'px');
                }
                align++;
            }
        }
    }

    closeChatBox(chatboxtitle) {
        $("#" + this.chatboxPrefix + chatboxtitle).css('display', 'none');
        this.restructureChatBoxes();
    }

    onChatBoxBlur(title) {
        let chatbox = this.getChatBoxByTitle(title);
        if (chatbox) {
            chatbox.focused = false;
        }
    }

    onChatBoxMinimizedElement(element, title) {
        element.find('div.chatboxcontent').css('display', 'none');
        element.find('.box-footer').css('display', 'none');
        element.find('button[data-role="maxmin"]').find('i').removeClass(this.iconClsMinimize).addClass(this.iconClsMaximize);
        let chatbox = this.getChatBoxByTitle(title);
        chatbox.minimized = true;
        chatbox.maximized = false;
    }

    onChatBoxMinimized(title) {
        let element = $("#" + this.chatboxPrefix + title);
        this.onChatBoxMinimizedElement(element, title);
    }

    onChatBoxMaximized(title) {
        let element = $("#" + this.chatboxPrefix + title);
        element.find('div.chatboxcontent').css('display', 'block');
        element.find('.box-footer').css('display', 'block');
        element.find('button[data-role="maxmin"]').find('i').removeClass(this.iconClsMaximize).addClass(this.iconClsMinimize);
        let chatbox = this.getChatBoxByTitle(title);
        chatbox.minimized = false;
        chatbox.maximized = true;
    }

    getChatBoxByTitle(title) {
        return this._.find(this.chatBoxes, function (chatbox) {
            return chatbox.title === title;
        })
    }

    show(selector) {
        if (angular.element(selector)) {
            angular.element(selector).show();
        }
    }

    addMessage(from, message, chatbox, orientation = 'left') {
        let orientationStr = (orientation == 'left') ? 'left = 1' : 'right = 1';
        let time = moment().format('DD MMM, hh:mm a');
        let tpl = '<chat-message ' + orientationStr + ' message="' + message + '" from="' + from +
            '" time="' + time + '"></chat-message>';
        let templateMsg = angular.element(tpl);
        let element = this.$compile(templateMsg)(this.$rootScope);
        $("#" + this.chatboxPrefix + chatbox.title).find('div.direct-chat-messages').append(element);
    }

}

commonModule.factory('ChatBoxes', ChatBoxesFactory.instance);

export default commonModule;
