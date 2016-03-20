import commonModule from '../../../commonModule';

//Import template
import AppPanelTpl from '../views/app-panel-view.tpl';

/**
 * @ngdoc component
 * @name appPanel
 * @author Alien Fernandez Fuentes <alienfernandez85@gmail.com>
 * @version 1.0.0
 *
 * @description appPanel
 *
 */
commonModule.component('appPanel', {
    restrict: 'E',
    templateUrl: ($element, $attrs) => {
        return AppPanelTpl.name;
    },
    controller: 'AppPanelController as appPanelCtrl'
});

export default commonModule;
