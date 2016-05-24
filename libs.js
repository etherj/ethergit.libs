define(function(require) {
  main.consumes = ['Plugin', 'ui'];
  main.provides = ['ethergit.libs'];

  return main;

  function main(options, imports, register) {
    this.version = JSON.parse(require('text!./package.json')).version;
    
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
      web3: function(cb) {
        require(['./web3-browserify'], function(obj) {
          cb(null, obj);
        });
      }
    }, function(err, libs) {
      window.BigNumber = libs.web3.BigNumber;
      
      plugin.freezePublicAPI({
        jquery: function() { return libs.jquery; },
        lodash: function() { return lodash; },
        web3: function() { return libs.web3.web3; },
        SolidityEvent: function() { return libs.web3.SolidityEvent; },
        formatters: function() { return libs.web3.formatters; },
        BigNumber: function() { return libs.web3.BigNumber; }
      });

      register(null, {
        'ethergit.libs': plugin
      });
    });
  }
});
