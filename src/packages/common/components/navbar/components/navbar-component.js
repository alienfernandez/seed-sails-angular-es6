import commonModule from '../../../commonModule';

//Import template
import NavBarTpl from '../views/navbar-view.tpl';
//console.log("NavBarTpl", NavBarTpl);
/**
 * @ngdoc component
 * @name navbar
 * @author Alien Fernandez Fuentes <alienfernandez85@gmail.com>
 * @version 1.0.0
 *
 * @description navbar
 *
 */
commonModule.component('navbar', {
    restrict: 'E',
    //replace: true,
    templateUrl: ($element, $attrs) => {
        //console.log("NavBarTpl.name", NavBarTpl.name);
        return NavBarTpl.name;
    },
    controller: 'NavbarController as navbarCtrl',
    bindings: {
        user: '='
    }
});

export default commonModule;
