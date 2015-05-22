requirejs.config({
    baseUrl: 'js/app',
    paths: {
        lib: '../lib',
        jquery: '../lib/jquery'
    },
    shim: {
        'Templates': ['lib/grooscript.min','lib/grooscript-tools'],
        'bookDemo': ['lib/chartist.min', 'lib/sweet-alert.min', 'lib/sockjs-0.3.4', 'lib/stomp', 'Templates']
    }
});

//requirejs(['jquery', 'lib/grooscript.min', 'lib/grooscript-tools', 'lib/sweet-alert.min', 'lib/chartist.min'], function($) {
//    requirejs(['Templates', 'lib/sockjs-0.3.4', 'lib/stomp', 'bookDemo']);
//});

requirejs(['jquery', 'bookDemo']);
