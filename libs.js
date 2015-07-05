define(function(require) {
    main.consumes = ['Plugin', 'ui'];
    main.provides = ['ethergit.libs'];

    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var ui = imports.ui;

        var plugin = new Plugin('Ethergit', main.consumes);

        var jquery = (require('./jquery.min'), window.jQuery); // Leave global jquery
        var lodash = (require('./lodash.min'), window._);

        require('./bootstrap/js/bootstrap');
        
        plugin.freezePublicAPI({
            jquery: function() { return jquery; },
            lodash: function() { return lodash; }
        });
        
        register(null, {
            'ethergit.libs': plugin
        });
    }
});
