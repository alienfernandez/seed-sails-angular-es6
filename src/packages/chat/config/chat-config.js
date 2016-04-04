/**
 * Module config
 */
class ChatConfig {

    constructor($stateProvider, Templates) {
        this.$stateProvider = $stateProvider;
        this.Templates = Templates;
    }

    /**
     * Set state provider
     * @param stateProvider
     */
    setStateProvider(stateProvider) {
        this.$stateProvider = stateProvider;
    }

    /**
     * Init module routes
     */
    initModuleRoutes() {
        this.$stateProvider.state('chat', {
            url: '/chat',
            controller: 'ChatController',
            controllerAs: 'chatCtrl',
            templateUrl: this.Templates.ChatTpl.name,
            data: {
                roles: ['user', 'admin']
            }
        });
    }
}

export default ChatConfig;
