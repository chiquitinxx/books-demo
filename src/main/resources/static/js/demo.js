requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app',
        jquery: 'jquery'
    }
});

requirejs(['jquery', 'grooscript.min', 'grooscript-tools', 'app/gstemplates'], function($) {
    $(document).ready(function() {
        console.log("All loaded.");
    });
});