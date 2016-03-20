import 'ui-router-extras';
import Common from './lagoProvider';
//import debug from 'debug';
function routing(module, futureRoutes) {
    module.requires.push('ct.ui.router.extras.future');
    module.requires.push(Common.name);

    let RouterConfig = ["$stateProvider", "$futureStateProvider", "lagoProvider", ($stateProvider, $futureStateProvider, lagoProvider) => {
        $futureStateProvider.stateFactory('load', ['$q', '$ocLazyLoad', 'futureState', ($q, $ocLazyLoad, futureState) => {
            let def = $q.defer();
            let views = JSON.stringify(eval('(' + futureState.views + ')'));
            //debug(futureState.stateName);
            if (futureState.parent) {
                lagoProvider.parent(futureState.parent);
                //console.log('Padre desde la routing: ' + lagoProvider.parent());
            }
            System.import(futureState.src)
                .then(loaded => {
                    var newModule = loaded;
                    if (!loaded.name) {
                        var key = Object.keys(loaded);
                        newModule = loaded[key[0]];
                    }

                    $ocLazyLoad.load(newModule).then(function () {
                        def.resolve(newModule);
                    })
                        .catch(error => {
                            //debug(error);
                            def.reject(error);
                        });
                })
                .catch(error => {
                    //debug(error);
                    def.reject(error);
                });
            return def.promise;
        }]);

        futureRoutes.forEach(function (r) {
            $futureStateProvider.futureState(r);
        });
    }];

    return RouterConfig;
};

export default routing;
