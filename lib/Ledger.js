var url = require('url');
var mongo = require('../deps/mongodb/index');

var sys = require('sys');
Db = mongo.Db;
Server = mongo.Server;
exports.P = P = function(o) {
  sys.puts(o);
}
exports.J = J = function(ob) {
  return JSON.stringify(ob)
};
exports.PJ = PJ = function(o) {
  P(J(o));
};
exports.RH = RH = function(r) {
  var uri = url.parse(r.url,true)
  PJ(uri);
  PJ(r.headers);
}
Ledger = function(){};

Ledger.prototype.collection = function(callback) {
  var client = new Db('experiment',new Server("127.0.0.1", 27017, {},{strict:true}));
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
    collection.update({'_id':item._id},item,{},callback);
  });
};

Ledger.prototype.append = function(item, callback) {
  return this.add(item, callback);
};

Ledger.prototype.update = function(item,callback) {
  return this.up(item,callback);
};
Ledger.prototype.prepare_find_query = function(query) {
  if(query['_id'] != undefined) {
    query['_id'] = mongo.ObjectID.createFromHexString(query['_id']);
  }
  return query;
}
Ledger.prototype.find = function(query,callback) {
  var self = this;
  query= self.prepare_find_query(query);
  self.collection(function(err, collection) {
    collection.find(query,function(err, cursor) {
      cursor.toArray(function(err, docs) {
        callback.apply(this,[err,docs]);
      });                   
    });
  });
};

exports.Ledger = Ledger;
