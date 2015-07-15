define(function(require) {
    main.consumes = ['Plugin', 'ui'];
    main.provides = ['ethergit.libs'];

    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var ui = imports.ui;

        var async = require('async');
        
        var plugin = new Plugin('Ethergit', main.consumes);

        var jquery = (require('./jquery.min'), window.jQuery); // Leave global jquery
        var lodash = (require('./lodash.min'), window._);

        // bootstrap depends on jquery, but mini_require doesn't allow to define dependency.
        setTimeout(function() { require('./bootstrap/js/bootstrap'); }, 1000);
        
        plugin.freezePublicAPI({
            jquery: function() { return jquery; },
            lodash: function() { return lodash; }
        });
        
        register(null, {
            'ethergit.libs': plugin
        });
    }
});
