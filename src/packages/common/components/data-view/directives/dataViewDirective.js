import commonModule from '../../../commonModule';

import DataView from '../react-components/DataViewReact';

/**
 * @ngdoc directive
 * @name dataView
 * @author Alien Fernandez Fuentes <alienfernandez85@gmail.com>
 * @version 1.0.0
 *
 * @description Directive data view
 *
 */
class DataViewDirective {

    constructor($compile) {
        let directive = {
            restrict: 'E',
            replace: true,
            //controller: DataViewController,
            template: `<div data-role="transclude" class="dv-main">
                <span role="container"></span>
            </div>`,
            scope: {
                options: '='
            },
            link: ($scope, $element, $attrs, ngModel, transclude) => {
                //Render component with options
                React.render(
                    React.createElement(DataView, $scope.options),
                    $element.find('span[role="container"]')[0]
                );
                //Compile react.js source
                $compile($element[0])($scope);
            }
        };

        return directive;
    }
}

commonModule.directive('dataview', ['$compile', ($compile) => new DataViewDirective($compile)]);

export default commonModule;
