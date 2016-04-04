import commonModule from '../../../commonModule';

/**
 * @ngdoc directive
 * @name ChatDirective
 * @author Alien Fernandez Fuentes <alienfernandez85@gmail.com>
 * @version 1.0.0
 *
 * @description
 *
 */
class ChatDirective {
    constructor() {
        let tpl = `
        <div class="chatbox" id="chatbox_{{title}}">
            <div class="box box-success direct-chat direct-chat-success">
                <div class="box-header with-border" id="id_{{title}}">
                    <h4 class="box-title">{{titleShow}}</h4>
                    <div class="box-tools pull-right">
                        <button type="button" class="btn btn-box-tool">
                            <i class="fa fa-cogs"></i></button>
                        <button type="button" class="btn btn-box-tool" ng-click="chatboxCtrl.onChatBoxToggle(title)"
                            data-role="maxmin">
                            <i class="fa fa-minus"></i>
                        </button>
                        <button type="button" class="btn btn-box-tool" ng-click="chatboxCtrl.closeChatBox(title)">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
                <!-- /.box-header -->
                <div class="box-body" style="display: block;">
                    <!-- Conversations are loaded here -->
                    <div class="direct-chat-messages chatboxcontent" id="chat_content_{{title}}">

                    </div>
                    <!--/.direct-chat-messages-->
                    <!-- /.direct-chat-pane -->
                </div>
                <!-- /.box-body -->
                <div class="box-footer" style="display: block;">
                    <form action="#" method="post">
                        <div class="input-group">
                            <input type="text" name="message" ng-model="chatboxCtrl.message" placeholder="Type Message ..."
                                   class="form-control chatboxtextarea" ng-enter="chatboxCtrl.sendMessage()"
                                   ng-blur="chatboxCtrl.onChatBoxBlur(title)" focus-if>
                                  <span class="input-group-btn">
                                    <button type="button" class="btn btn-xs btn-success btn-flat"
                                    ng-click="chatboxCtrl.sendMessage()" ng-disabled="!chatboxCtrl.message">Send</button>
                                  </span>
                        </div>
                    </form>
                </div>
                <!-- /.box-footer-->
            </div>
        </div>`;

        let directive = {
            restrict: 'E',
            replace: true,
            scope: {},
            controller: 'ChatboxController',
            controllerAs: 'chatboxCtrl',
            template: tpl,
            link: this.link
        };

        return directive;
    }

    link($scope, element, $attrs) {
        //console.log("element", element)
        //console.log("$scope", $scope)
        let title = $attrs.title;
        let user = title.split('@');
        let titleId = title.replace('@', '_');
        $scope.chatboxCtrl.title = titleId;
        $scope.title = titleId;
        $scope.titleShow = user[0];
        element.prependTo('body');
    }
}

commonModule.directive('chatbox', () => new ChatDirective());

export default commonModule;
