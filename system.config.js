System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "ag-grid": "github:ceolter/ag-grid@2.3.7",
    "angular": "github:angular/bower-angular@1.5.2",
    "angular-animate": "npm:angular-animate@1.5.2",
    "angular-cookies": "npm:angular-cookies@1.5.2",
    "angular-fancybox-plus": "github:igorlino/angular-fancybox-plus@1.0.3",
    "angular-highlightjs": "npm:angular-highlightjs@0.5.1",
    "angular-local-storage": "github:grevory/angular-local-storage@0.2.7",
    "angular-material": "github:angular/bower-material@0.11.4",
    "angular-mocks": "github:angular/bower-angular-mocks@1.5.2",
    "angular-modal-service": "github:dwmkerr/angular-modal-service@0.6.10",
    "angular-momentjs": "github:gdi2290/angular-momentjs@0.2.2",
    "angular-resource": "github:angular/bower-angular-resource@1.5.2",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.18",
    "angular-validation": "github:huei90/angular-validation@1.3.2",
    "babel": "npm:babel-core@5.8.35",
    "babel-runtime": "npm:babel-runtime@5.8.35",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "core-js": "npm:core-js@1.2.6",
    "css": "github:systemjs/plugin-css@0.1.20",
    "fancybox-plus": "github:igorlino/fancybox-plus@1.3.7",
    "font-awesome": "npm:font-awesome@4.5.0",
    "image": "github:systemjs/plugin-image@0.1.0",
    "jquery": "github:components/jquery@2.2.1",
    "jquery-ui": "npm:jquery-ui@1.10.5",
    "json": "github:systemjs/plugin-json@0.1.0",
    "lodash": "npm:lodash@3.10.1",
    "moment": "github:moment/moment@2.12.0",
    "ng-lodash": "npm:ng-lodash@0.2.3",
    "ng-select": "github:pc035860/ngSelect@1.0.0",
    "ocLazyLoad": "github:ocombe/ocLazyLoad@1.0.9",
    "plugin-css": "github:systemjs/plugin-css@0.1.20",
    "plugin-image": "github:systemjs/plugin-image@0.1.0",
    "plugin-json": "github:systemjs/plugin-json@0.1.0",
    "toastr": "npm:angular-toastr@1.7.0",
    "ui-router-extras": "npm:ui-router-extras@0.0.14",
    "ui-router-stateHelper": "github:marklagendijk/ui-router.stateHelper@1.3.1",
    "github:angular-ui/ui-router@0.2.18": {
      "angular": "github:angular/bower-angular@1.5.2"
    },
    "github:angular/bower-angular-animate@1.5.2": {
      "angular": "github:angular/bower-angular@1.5.2"
    },
    "github:angular/bower-angular-aria@1.5.2": {
      "angular": "github:angular/bower-angular@1.5.2"
    },
    "github:angular/bower-angular-mocks@1.5.2": {
      "angular": "github:angular/bower-angular@1.5.2"
    },
    "github:angular/bower-angular-resource@1.5.2": {
      "angular": "github:angular/bower-angular@1.5.2"
    },
    "github:angular/bower-material@0.11.4": {
      "angular": "github:angular/bower-angular@1.5.2",
      "angular-animate": "github:angular/bower-angular-animate@1.5.2",
      "angular-aria": "github:angular/bower-angular-aria@1.5.2",
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "github:components/jquery@2.2.1"
    },
    "npm:angular-animate@1.5.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:angular-highlightjs@0.5.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.35": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.6": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:font-awesome@4.5.0": {
      "css": "github:systemjs/plugin-css@0.1.20"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:jquery-ui@1.10.5": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:ng-lodash@0.2.3": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:ui-router-extras@0.0.14": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
