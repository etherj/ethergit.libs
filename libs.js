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
      bignumber: function(cb) {
        require(['./bignumber'], function(BN) {
          window.BigNumber = BN;
          cb();
        });
      },
      web3: function(cb) {
        require(['./web3'], function() {
          cb(null, window.Web3);
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
