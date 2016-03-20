import systemModule from '../../systemModule';

class AuthInterceptorFactory {

    constructor($q, $injector) {
        this.$q = $q;
        this.$injector = $injector;
    }

    /*ngInject*/
    static instance($q, $injector) {
        return new AuthInterceptorFactory($q, $injector);
    }

    static responseError(rejection) {
        if (!rejection.config.ignoreAuthModule) {
            switch (rejection.status) {
                case 401:
                    this.$injector.get('$state').transitionTo('authentication.signin');
                    break;
                case 403:
                    this.$injector.get('$state').transitionTo('forbidden');
                    break;
            }
        }
        // otherwise, default behaviour
        return this.$q.reject(rejection);
    }
}

systemModule.factory('AuthInterceptor', AuthInterceptorFactory.instance);

export default systemModule;
