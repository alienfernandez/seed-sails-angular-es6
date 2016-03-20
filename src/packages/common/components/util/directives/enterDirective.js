import commonModule from '../../../commonModule';

class NgEnterDirective {

    /*ngInject*/
    constructor() {
        return (scope, element, attrs) => {
            element.bind("keydown keypress", (event) => {
                if (event.which === 13) {
                    scope.$apply(() => {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    }
}

commonModule.directive('ngEnter', () => new NgEnterDirective());

export default commonModule;
