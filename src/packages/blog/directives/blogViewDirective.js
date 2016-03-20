import blogModule from '../blogModule';

import BlogView from '../react-components/blogViewReact';

/**
 * @ngdoc directive
 * @name BlogViewDirective
 * @author Alien Fernandez Fuentes <alienfernandez85@gmail.com>
 * @version 1.0.0
 *
 * @description Directive article view
 *
 */
class BlogViewDirective {

    constructor() {
        let directive = {
            restrict: 'E',
            replace: true,
            //controller: DataViewController,
            template: '<div data-role="transclude"></div>',
            scope: {
                options: '='
            },
            link: ($scope, $element, $attrs, ngModel, transclude) => {
                //Render component with options

                React.render(
                    React.createElement(BlogView, $scope.options),
                    $element[0]
                );
            }
        };

        return directive;
    }
}

blogModule.directive('blogview', () => new BlogViewDirective());

export default blogModule;
