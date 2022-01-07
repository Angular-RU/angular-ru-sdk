/* eslint-disable */
const CI = process.env['CI'] === 'true';

// @ts-ignore
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            // @ts-ignore
            require('karma-jasmine'),
            // @ts-ignore
            require('karma-chrome-launcher'),
            // @ts-ignore
            require('karma-jasmine-html-reporter'),
            // @ts-ignore
            require('karma-coverage-istanbul-reporter'),
            // @ts-ignore
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../../coverage/cdk-stream'),
            reports: ['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths: true
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        singleRun: CI,
        autoWatch: true,
        logLevel: config.LOG_INFO,
        restartOnFileChange: true,
        browsers: [CI ? 'ChromeHeadless' : 'Chrome']
    });
};
