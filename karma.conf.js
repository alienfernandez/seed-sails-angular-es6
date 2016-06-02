//jshint strict: false
module.exports = function (config) {
  config.set({

    basePath: './.tmp/public',

    /**
     * Available frameworks to use
     *  frameworks: https://npmjs.org/browse/keyword/karma-adapter
     */
    frameworks: ['jspm', 'jasmine'],

    //plugins: ['karma-jspm', 'karma-jasmine',  'karma-babel-preprocessor',  'karma-chrome-launcher',
    //  'karma-verbose-reporter', 'karma-phantomjs-launcher'],

    /**
     * Start these browsers
     * available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
     */
    browsers: ['PhantomJS'],//'Chrome'

    // test results reporter to use
    // possible values: 'dots', 'progress', 'coverage'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'verbose', 'coverage'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    files: [

      'jspm_packages/system.js',
      'jspm_packages/github/facebook/react@0.14.7/build/react-with-addons.min.js',
      'jspm_packages/github/JedWatson/classnames@2.2.3/index.js',
      'jspm_packages/github/strophe/strophejs@1.2.5/strophe.js'
    ],

    jspm: {
      // Edit this to your needs
      config: 'system.config.js',
      loadFiles: [
        'app/bootstrap.js',
        'app/**/unit-test/**/*.js'
      ],
      serveFiles: [
        'jspm_packages/github/facebook/react@0.14.7/build/react-with-addons.min.js',
        'jspm_packages/github/JedWatson/classnames@2.2.3/index.js',
        //'app/bootstrap.js',
        //'app/**/**',
        '**/*.+(js|html|css|json)'
      ]
    },

    proxies: {
      '/app': '/base/app',
      '/jspm_packages': '/base/jspm_packages'
    },

    reporters: ['dots', 'coverage'],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/unit-test/**/*.js': ['babel', 'coverage']
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
    },
    //babelPreprocessor: {
    //  options: {
    //    sourceMap: 'inline',
    //    modules: 'system'
    //  }
    //},

    reporters: ['dots', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      instrumenters: { isparta : require('isparta') },
      instrumenter: { 'app/**/*.js': 'isparta' },
      dir: '../reports/coverage/',
      reporters: [
        {type: 'html'}, {type: 'json'}, {type: 'lcov'}, {type: 'text-summary'}
      ]
    },

  });
};
