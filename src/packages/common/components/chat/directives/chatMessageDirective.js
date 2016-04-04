import commonModule from '../../../commonModule';

/**
 * @ngdoc directive
 * @name ChatMessageDirective
 * @author Alien Fernandez Fuentes <alienfernandez85@gmail.com>
 * @version 1.0.0
 *
 * @description
 *
 */
class ChatMessageDirective {
    constructor() {

        let tpl = `
        <div class="direct-chat-msg" ng-class="{right: right}">
            <div class="direct-chat-info clearfix">
                <span class="direct-chat-name " ng-class="{'pull-left': left, 'pull-right': right}">{{from}}</span>
                <span class="direct-chat-timestamp" ng-class="{'pull-left': right, 'pull-right': left}">{{time}}</span>
            </div>
            <!-- /.direct-chat-info -->
            <img class="direct-chat-img" src="http://placehold.it/128x128" alt="message user image"><!-- /.direct-chat-img -->
            <div class="direct-chat-text">
                {{message}}
            </div>
            <!-- /.direct-chat-text -->
        </div>`;

        let directive = {
            restrict: 'E',
            replace: true,
            scope: {
                left: '@',
                right: '@',
                message: '@',
                time: '@',
                from: '@'
            },
            controller: 'ChatboxMessageController',
            controllerAs: 'chatboxMsgCtrl',
            template: tpl,
            link: this.link
        };

        return directive;
    }

    link($scope, element, $attrs) {

    }
}

commonModule.directive('chatMessage', () => new ChatMessageDirective());

export default commonModule;
