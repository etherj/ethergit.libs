define(function(require) {
    main.consumes = ['Plugin', 'ui'];
    main.provides = ['ethergit.libs'];

    return main;

    function main(options, imports, register) {
        var Plugin = imports.Plugin;
        var ui = imports.ui;

        var async = require('async');
        
        var plugin = new Plugin('Ethergit', main.consumes);

        var lodash = (require('./lodash.min'), window._);
        //var BigNumber = (require('./bignumber'), window.BigNumber);
        //var web3 = (require('./web3-light'), window.web3);

        async.series({
            jquery: function(cb) {
                require(['./jquery.min'], function() {
                    cb(null, window.jQuery);
                });
            },
            bootstrap: function(cb) {
                require(['./bootstrap/js/bootstrap'], function() {
                    cb();
                });
            },
            BigNumber: function(cb) {
                require(['./bignumber'], function(bignum) {
                    window.BigNumber = bignum;
                    cb(null, bignum);
                });
            },
            web3: function(cb) {
                require(['./web3-light'], function() {
                    cb(null, window.web3);
                });
            },
            'ethereumjs-tx': function(cb) {
                require(['./ethereumjs-tx'], function(ethTx) {
                    window.EthTx = ethTx;
                    cb();
                });
            },
            'blockapps-web3': function(cb) {
                require(['./blockapps-web3'], function(blockappsweb3) {
                    cb();
                });
            }
        }, function(err, libs) {
            plugin.freezePublicAPI({
                jquery: function() { return libs.jquery; },
                lodash: function() { return lodash; },
                web3: function() { return libs.web3; }
            });

            register(null, {
                'ethergit.libs': plugin
            });
        });
    }
});
