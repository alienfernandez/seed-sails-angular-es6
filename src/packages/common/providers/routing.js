import 'ui-router-extras';
import _ from "lodash";
import Common from './lagoProvider';
//import debug from 'debug';
function routing(module, futureRoutes) {
    module.requires.push('ct.ui.router.extras.future');
    module.requires.push(Common.name);
  console.log("Common.name", Common.name)

    let RouterConfig = ["$stateProvider", "$futureStateProvider", "lagoProvider", ($stateProvider, $futureStateProvider, lagoProvider) => {
        $futureStateProvider.stateFactory('load', ['$q', '$ocLazyLoad', 'futureState', ($q, $ocLazyLoad, futureState) => {
            let def = $q.defer();
            //let views = JSON.stringify(eval('(' + futureState.views + ')'));
            //debug(futureState.stateName);
            if (futureState.parent) {
                lagoProvider.parent(futureState.parent);
            }
            System.import(futureState.src)
                .then(loaded => {
                    var newModule = loaded;
                    if (!loaded.name) {
                        if (!_.isEmpty(loaded.default)){
                          newModule = loaded.default;
                        }else {
                          var key = Object.keys(loaded);
                          newModule = loaded[key[0]];
                        }
                    }
                    $ocLazyLoad.load(newModule).then(function () {
                        def.resolve(newModule);
                    }).catch(error => {
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
