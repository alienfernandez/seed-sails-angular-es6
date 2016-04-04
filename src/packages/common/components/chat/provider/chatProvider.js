import commonModule from '../../../commonModule';

/**
 * @ngdoc provider
 * @name ChatProvider
 * @author Alien Fernandez Fuentes <alienfernandez85@gmail.com>
 * @version 1.0.0
 *
 * @description
 *
 */
class ChatBoxProvider {

    constructor() {
        this.chatBoxes = [];
        this.chatBoxesVisibles = 0;
        this.chatboxPrefix = "chatbox_";
    }

    restructureChatBoxes() {
        let align = 0;
        for (let chatbox in this.chatBoxes) {
            let chatboxtitle = this.chatBoxes[chatbox].title;
            let selector = "#" + this.chatboxPrefix + chatboxtitle;
            if ($(selector).css('display') != 'none') {
                if (align == 0) {
                    $(selector).css('right', '20px');
                } else {
                    let width = (align) * (225 + 7) + 20;
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

    initChatBox(element, title, minimizeChatBox) {
        let selector = "#" + this.chatboxPrefix + title;
        element.css('bottom', '0px');
        for (let chatbox in this.chatBoxes) {
            if ($(selector + this.chatBoxes[chatbox].title).css('display') != 'none') {
                this.chatBoxesVisibles++;
            }
        }
        if (this.chatBoxesVisibles == 0) {
            element.css('right', '20px');
        } else {
            let width = (this.chatBoxesVisibles) * (225 + 7) + 20;
            element.css('right', width + 'px');
        }
        this.chatBoxes.push({
            title: title,
            minimized: false,
            focused: false
        });
        if (minimizeChatBox) {
            element.find('div.chatboxcontent').css('display', 'none');
            element.find('.panel-footer').css('display', 'none');
        }
    }

    show(selector) {
        if (angular.element(selector)) {
            angular.element(selector).show();
        }
    }

    /*ngInject*/
    $get($document, $rootScope, lodash, $q, $compile) {
        let _ = lodash;
        //function getChatBoxByTitle(title) => {
        //    return _.find(function (chatbox) {
        //        return chatbox.title === title;
        //    })
        //}

        return {
            show: (selector) => {
                this.show(selector);
            },
            closeChatBox: (selector) => {
                this.closeChatBox(selector);
            },

            onChatBoxBlur: (title) => {

            },
            create: (title, minimizeChatBox = false) => {
                let selector = "#" + this.chatboxPrefix + title;
                if ($(selector).length > 0) {
                    if ($(selector).css('display') == 'none') {
                        $(selector).css('display', 'block');
                        this.restructureChatBoxes();
                    }
                    return;
                }
                let template = angular.element('<chatbox title="' + title + '"></chatbox>');
                let chatboxExist = $document.find(selector);
                let element;
                //Check exist chatbox in DOM
                if (!chatboxExist.length) {
                    element = $compile(template)($rootScope);
                    $document.find('body').prepend(element);
                } else {
                    element = chatboxExist;
                }
                //Init chat box to create
                this.initChatBox(element, title, minimizeChatBox);
                if (element) {
                    element.show();
                }
            }
        };
    }
}

commonModule.provider('ChatBoxes1', ChatBoxProvider);

export default commonModule;
