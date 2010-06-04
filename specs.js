var kiwi = require('kiwi')
var jasmine = kiwi.require('jasmine');
var sys = require('sys');
var LedgerService = require('./LedgerService');
var Ledger = require('./Ledger');
// this is needed for asyncSpecWait and asyncSpecDone
for(var key in jasmine) {
  global[key] = jasmine[key];
}

jasmine.run(__dirname);
