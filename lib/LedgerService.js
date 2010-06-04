require('./Ledger');
var querystring = require('querystring');
var url = require('url');
LedgerService = function(){};
LedgerService.prototype.ledger = new Ledger();
LedgerService.prototype.server = undefined;
LedgerService.prototype.halt_service = function() {
  this.server.removeAllListeners('request');
  this.server.removeAllListeners('listening');
  this.server.close(); 
};
LedgerService.prototype.POST = {
  init:function(request,response) {
    var self = this;
    self.payload = "";
    self.request = request;
    self.response = response;
    self.request.addListener('data',function(chunk) {
      self.data.apply(self,[chunk]);
    });
    request.addListener('end',function() {
      self.end.apply(self);
    });
  },
  data:function(chunk) {
    var self = this;
    self.payload += chunk;
  },
  end:function() {
    var self = this;
    var uri = url.parse(self.request.url,true)
    var payload = querystring.parse(self.payload);
    function extract(key,hash) {
      return hash[key];
    }
    // default error conditions
    var json = {'error': "'json' not found in payload : " +JSON.stringify(payload)}
    var callback = 'raise_error';
    if ('callback' in payload) {
      callback = extract('callback',payload);
    }
    if ('json' in payload) {
      json = JSON.parse(extract('json',payload));
    }
    LedgerService.prototype.ledger.append(json,function(err,docs) {
      var out = ";"+callback+"("+JSON.stringify(docs)+");";
      self.response.writeHead(200, 
                              'from one post to another - walking the way',{
                                'Access-Control-Allow-Origin': 'http://ledger.robotarmyma.de:3000',
                                  'Content-Length': out.length,
                                'Content-Type': 'application/javascript;charset=utf-8',
                                'Connection' : 'like a leaf fluttering on the surface',
                                'Error' : err,
                              });
                              self.response.write(out,'utf8');
                              self.response.end();
    }); 
  }
};

LedgerService.prototype.OPTIONS = {
  init:function(request,response) {
    var self = this;
    RH(request);
    response.writeHead(200, {
      'Content-Length':0,
      'Access-Control-Allow-Origin': 'http://ledger.robotarmyma.de:3000',
    });
      response.end();
  },
  end:function() {}
};

LedgerService.prototype.GET = {
  init:function(request,response) {
    var self = this;
    self.request = request;
    self.response = response;
    self.end();
  },
  end:function(){
    var self = this;
    LedgerService.prototype.ledger.find_all(function(err,items){
      var body = "";
      var callback = undefined;
      var query = url.parse(self.request.url,true).query
      if (query != undefined)
        callback = query['callback'];
      if (callback != undefined){
        var body = ";"+callback+"("+J(items)+");";
      }
      self.response.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://ledger.robotarmyma.de:3000',
          'Content-Length': body.length,
        'Content-Type': 'application/json;charset=utf-8'
      });
      self.response.write(body,'utf8')
      self.response.end();
    }); 
  },
};

LedgerService.prototype.service =  function() {
  var self = this;
  var http = require('http'),
  sys = require('sys');
  self.server = http.createServer();
  self.server.addListener('request',function(request,response) {
    var data = "";
    var method = request.method;
    request.setEncoding('UTF8');
    self[method].init.apply(self[method],[request,response]);
  });
  self.server.addListener('close',function(errno) {
    sys.puts('close ' + errno);
  });
  self.server.listen(7001);
};

new LedgerService().service();
