import commonModule from '../../../commonModule';

class ValidatorFieldController {

    /*ngInject*/
    constructor(lodash) {
        //Vars
        this._ = lodash;
    }


}

class ValidatorFieldDirective {
    /*ngInject*/
    constructor(lodash, $compile, $parse) {
        this._ = lodash;
        this.$compile = $compile;
        this.$parse = $parse;
        let directive = {
            restrict: 'A',
            replace: false,
            terminal: true,
            priority: 1000,
            compile: function compile(element, attrs) {
                function generateValidator(validator, element) {
                    validator = _.trim(validator);
                    switch (validator) {
                        case 'required':
                            element.attr('validator', validator);
                            element.attr('required-error-message', "Campo requerido");
                            break;
                    }
                }

                function validatorsField(validators, element) {
                    if (validators) {
                        validators.split(',');
                        if (validators.length > 0) {
                            //Array validators
                            if (_.isArray(validators)) {
                                validators.forEach(function (validator) {
                                    generateValidator(validator, element);
                                });
                            } else {
                                generateValidator(validators, element);
                            }
                        }
                    }
                }

                return {
                    pre: function preLink(scope, iElement, attrs, controller) {
                        var validators = $parse(attrs.validatorField)(scope);
                        if (validators) {
                            validatorsField(validators, iElement);
                        }
                        element.removeAttr("validator-field");
                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        $compile(iElement)(scope);
                    }
                };
            }
        };

        return directive;
    }
}

commonModule.directive('validatorField', () => new ValidatorFieldDirective(lodash, $compile, $parse));

export default commonModule;
