import commonModule from '../../../commonModule';
import LoadMask from '../react-components/loadMaskReact';

/**
 * @ngdoc directive
 * @name loadMask
 * @author Alien Fernandez Fuentes <alienfernandez85@gmail.com>
 * @version 1.0.0
 *
 * @description Directive load mask application
 *
 */
class LoadMaskDirective {
    constructor() {
        let directive = {
            restrict: 'E',
            replace: true,
            template: '<div data-role="loadMask" class="load-mask"></div>',
            link: this.link
        };

        return directive;
    }

    link($scope, element, $attrs) {
        let elRender  = ($attrs.el) ? $attrs.el : 'body';
        var options = {
            message: ($attrs.message) ? $attrs.message : 'Espere por favor...',
            id: $attrs.id
        }
        React.render(
            React.createElement(LoadMask, options), element[0]
        );
        //ReactRenderer.append(
        //    React.createElement(LoadMask, options), $('#testttttt')[0]
        //);
    }
}

commonModule.directive('loadMask', () => new LoadMaskDirective());

export default commonModule;
