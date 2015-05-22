({
    baseUrl: "src/main/resources/static/js/app",
    paths: {
        jquery: "../lib/jquery",
        lib: "../lib",
        requireLib: "../lib/require.min"
    },
    name: "../demo",
    out: "src/main/resources/static/js/demo-built.js",
    include: "requireLib",
    shim: {
        'Templates': ['lib/grooscript.min','lib/grooscript-tools'],
        'bookDemo': ['lib/chartist.min', 'lib/sweet-alert.min', 'lib/sockjs-0.3.4', 'lib/stomp', 'Templates']
    }
})