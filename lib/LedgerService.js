require('Ledger');
var mongo = require('mongodb');
var querystring = require('querystring');
var url = require('url');


Method = function() {};
Method.constructor = Method;
Method.prototype = new Function;
Method.prototype.extract = function(key,hash,_default) {
  var val = hash[key];
  if (val == undefined)
    val = _default;
  return val;
}

LedgerService = function(){};
LedgerService.constructor = LedgerService;
LedgerService.prototype = new Function;
LedgerService.prototype.ledger = new Ledger();
LedgerService.prototype.server = undefined;
LedgerService.prototype.halt_service = function() {
  this.server.removeAllListeners('request');
  this.server.removeAllListeners('listening');
  this.server.close(); 
};

Method.POST = function(){};
Method.POST.constructor = Method.POST;
Method.POST.prototype = new Method;
Method.POST.prototype.init = function(request,response) {
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
};
Method.POST.prototype.data = function(chunk) {
  var self = this;
  self.payload += chunk;
};
Method.POST.prototype.end = function() {
  var self = this;
  var uri = url.parse(self.request.url,true)
  var payload = querystring.parse(self.payload);
  // default error conditions
  var json = {'error': "'json' not found in payload : " +JSON.stringify(payload)}
  var callback = 'post_response';
  callback = self.extract('callback',payload,callback);
  try {
  json = JSON.parse(self.extract('json',payload,json));
  }catch(e)
  {
    PJ(payload);
  }
  LedgerService.prototype.ledger.append(json,function(err,docs) {
    var out = ";"+callback+"("+J(docs)+");";
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
};

Method.OPTIONS = function(){};
Method.OPTIONS.constructor = Method.OPTIONS;
Method.OPTIONS.prototype = new Method;
Method.OPTIONS.prototype.init = function(request,response) {
    var self = this;
    RH(request);
    response.writeHead(200, {
      'Content-Length':0,
      'Access-Control-Allow-Origin': 'http://ledger.robotarmyma.de:3000',
    });
      response.end();
  };
Method.OPTIONS.prototype.end = function() {};


Method.GET = function() {};
Method.GET.constructor = Method.GET;
Method.GET.prototype = new Method;
Method.GET.prototype.init = function(request,response) {
    var self = this;
    self.request = request;
    self.response = response;
    self.end();
  };
Method.GET.prototype.end = function(){
    var self = this;
    var query = url.parse(self.request.url,true).query
    var find = self.extract('find',query,{});
    var callback = self.extract('callback',query,'get_response');
    LedgerService.prototype.ledger.find(find,function(err,items){
      var body = ";"+callback+"("+J(items)+");";
      self.response.writeHead(200, {
        'Access-Control-Allow-Origin': 'http://ledger.robotarmyma.de:3000',
          'Content-Length': body.length,
        'Content-Type': 'application/json;charset=utf-8'
      });
      self.response.write(body,'utf8')
      self.response.end();
    }); 
};

LedgerService.prototype.service =  function() {
  var self = this;
  var http = require('http'),
  sys = require('sys');
  self.server = http.createServer();
  self.server.addListener('request',function(request,response) {
    var data = "";
    var method_type = request.method;
    request.setEncoding('UTF8');
    var method = new Method[method_type]();
    method.init.apply(method,[request,response]);
  });
  self.server.addListener('close',function(errno) {
    sys.puts('close ' + errno);
  });
  self.server.listen(7001);
  P('++ Listen on 7001');
};

new LedgerService().service();
