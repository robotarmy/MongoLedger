var kiwi= require('kiwi')
var exp = kiwi.require('express');
var sys = require('sys');
var fs = require('fs');
require('express/plugins')

configure(function(){
  use(MethodOverride);
  use(ContentLength);
  use(Static);
  use(Logger);
  set('root', __dirname);
})

get('/sass/*.css', function(file){
  this.render(file + '.css.sass', { layout: false });
});

get('/', function(){
 var self = this;
  self.render('ledger.html.haml', {
    locals: {
      title: 'Egg',
    }
  });
});

run();
