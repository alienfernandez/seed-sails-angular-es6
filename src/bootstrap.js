//Import resources
import {angular} from './resources';
//Import common and routing module
import {commonModule} from './packages/common/common';
import {routing} from './packages/common/common';
import futureRoutes from './routes.json!';

//Import system module
import system from './packages/system';
import blog from './packages/blog';

var appModuleName = 'app';
var appDependencies = ['ui.router', 'ui.router.stateHelper', 'oc.lazyLoad', 'ngResource', 'ngAnimate',
  'LocalStorageModule', 'pascalprecht.translate', 'toastr', 'validation', 'validation.rule', 'angular-momentjs',
  'common', 'app.system'];

let app = angular.module(appModuleName, appDependencies);
/**
 * Add future routes
 */
app.config(routing(app, futureRoutes));

app.config(($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider, $validationProvider,
            toastrConfig, $translateProvider, FlashProvider) => {
  //------------- $httpProvider config ---------------
  $httpProvider.useApplyAsync(true);
  $urlRouterProvider.otherwise('/');

  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  //-------------------------------------------------------

  //------------- $translateProvider i18n config ---------------
  $translateProvider.useSanitizeValueStrategy('escapeParameters');
  $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
    'en': 'en', 'en_GB': 'en', 'en_US': 'en',
    'es': 'es', 'es_ES': 'es'
  });
  //Default language
  $translateProvider.preferredLanguage('en');
  //-------------------------------------------------------

  //----------- Validators config ---------------------------
  angular.extend($validationProvider, {
    validCallback: function (element) {
      //$(element).closest('div.form-group').find('label.has-error').hide();
      $(element).parents('.form-group:first').removeClass('has-error');
    },
    invalidCallback: function (element) {
      //Mover error para el tag con class form-group
      $(element).parents('.form-group:first').addClass('has-error');
    }
  });

  $validationProvider.setErrorHTML(function (msg) {
    return '<p class="control-label pull-left has-error">' + msg + '</p>';
  });
  $validationProvider.showSuccessMessage = false;
  //-------------------------------------------------------

  //----------- Toastr config ---------------------------
  let defaultOptions = FlashProvider.getDefaultOptions();
  angular.extend(toastrConfig, defaultOptions);
  //-------------------------------------------------------
});

/**
 * Execute app
 */
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash && window.location.hash === '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState('', document.title, window.location.pathname);
    } else {
      // Prevent scrolling by storing the page's current scroll offset
      var scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft
      };
      window.location.hash = '';
      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }
  angular.bootstrap(document.body, [app.name], {
    // strictDi: true
  });
});

export default app;
