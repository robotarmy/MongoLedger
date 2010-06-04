var url = require('url');
var mongodb = require('./lib/mongodb/index');

var sys = require('sys');
DStore = mongodb.Db;
Server = mongodb.Server;
exports.raise_if = raise_if = function(err) {
  if(err instanceof Error) {
    sys.puts("ERROR :" +err);
    throw err;
  }
};

exports.J = J = function(ob) {
  return JSON.stringify(ob)
};
exports.PJ = PJ = function(o) {
  sys.puts(J(o));
};
exports.RH = RH = function(r) {
  var uri = url.parse(r.url,true)
  PJ(uri);
  PJ(r.headers);
}
Ledger = function(){};

Ledger.prototype.collection = function(callback) {
  var client = new DStore('experiment',new Server("127.0.0.1", 27017, {},{strict:true}));
  client.open(function() {
    client.createCollection('ledger', function(err, collection) {
      raise_if(err);
      client.collection('ledger', function(err, collection) {
        raise_if(err);
        callback.apply(this,[err,collection,client]);
      });
    });
  });
};

Ledger.prototype.up = function(item, callback) {
  this.collection(function(err, collection) {
    inner_callback = function(err, doc) {
      callback.apply(this,[err,Array.isArray(doc)? doc[0] : doc]); 
    };
    if (item._id == undefined) {
      collection.insert(item, inner_callback)
    }else {
      collection.update({'_id':item.id},item,{},inner_callback);
    };
  });
};

Ledger.prototype.up_array = function(items, callback) {
  for(var i = 0; i < items.length; i++){
    el = items[i];
    this.up(el,callback); 
  };
};

Ledger.prototype.append = function(items, callback) {
  return this.up_array(Array.isArray(items) ? items : [items], callback);
};

Ledger.prototype.update = function(items,callback) {
  return this.up_array(Array.isArray(items) ? items : [items], callback);
};

Ledger.prototype.item_posted = function(items,callback) {
  return this.update(items,callback);
};

Ledger.prototype.find_all = function(callback) {
  this.collection(function(err, collection) {
    raise_if(err);
    collection.find(function(err, cursor) {
      raise_if(err);
      cursor.toArray(function(err, docs) {
        raise_if(err);
        callback.apply(this,[err,docs]);
      });                   
    });
  });
};


var querystring = require('querystring');
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
      PJ('data');
      self.data.apply(self,[chunk]);
    });
  request.addListener('end',function() {
      self.end.apply(self);
    PJ('end');
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
  RH(self.request)
  LedgerService.prototype.ledger.append(payload,function(err,docs) {
    var out = JSON.stringify(docs);
    self.response.writeHead(200, 
                            'from one post to another - walking the way',{
                            'Access-Control-Allow-Origin': 'http://ledger.robotarmyma.de:3000',
                            'Content-Length': out.length,
                            'Content-Type': 'application/javascript;charset=utf-8',
                            'Connection' : 'like a leaf fluttering on the surface',
                            'Error' : err,
                            });
                          PJ(docs);
    self.response.write(out,'utf8');
    self.response.end();
  });
}};
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
      PJ(body);
      PJ('SENT RESPONSE.END');
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
    PJ(method);
    request.setEncoding('UTF8');
    self[method].init.apply(self[method],[request,response]);
    });
  self.server.addListener('close',function(errno) {
    sys.puts('close ' + errno);
  });
  self.server.listen(7001);
};

new LedgerService().service();
