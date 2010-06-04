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
      if(err) 
        return callback.apply(this,[err,null]);
      client.collection('ledger', function(err, collection) {
        if(err) 
          return callback.apply(this,[err,null]);
        callback.apply(this,[err,collection,client]);
      });
    });
  });
};
Ledger.prototype.add = function(item,callback) {
  this.collection(function(err, collection,client) {
    if(err) 
      return callback.apply(this,[err,null]);
    collection.insert(item, callback);
  });
};
Ledger.prototype.up = function(item, callback) {
  this.collection(function(err, collection) {
       if(err) 
        return callback.apply(this,[err,null]);
    collection.update({'_id':item.id},item,{},callback);
  });
};

Ledger.prototype.append = function(item, callback) {
  return this.add(item, callback);
};

Ledger.prototype.update = function(item,callback) {
  return this.up(item,callback);
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

exports.Ledger = Ledger;
