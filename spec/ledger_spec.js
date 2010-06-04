
config = {
  host:'localhost',
  port:'7000',
};
var sys = require('sys');
var http = require('http');
describe('Ledger', function(){
  function clean_db() {
    var ledger = new Ledger();
    ledger.collection(function(err,collection,client) {
      collection.remove();
      client.close();
    });
  };
  afterEach(function () {
    clean_db();
  });
  beforeEach(function () {
    clean_db();
  });

  it('it accepst post on port 7001',function() {
  runs(function() { 
    var client = http.createClient(7001, 'localhost');
    var jpost = {name:'A Thing', value: "A Value"};
    var request = client.request('POST', '/?json='+JSON.stringify(jpost) ,{'host': 'localhost'});
    request.addListener('response', function (response) {
      response.setEncoding('utf8');
      expect(response.statusCode).toEqual(200);
      expect(response.headers["content-type"]).toEqual('application/json;charset=utf-8');
 response.addListener('data', function (chunk) {
    sys.puts('BODY: ' + chunk);
  });
      
    });
    request.end();
  });
  waits(600);
  });
  it('it accepts GET via jsonp on port 7001', function() {
    runs(function() {
    var ledger = new Ledger();
    ledger.append({name:'A Thing', value: "A Value"},function(err,items){});
    ledger.append({horse:'pony',value:'cake'},function(err,items){});

    var client = http.createClient(7001, 'localhost');
    var request = client.request('GET', '/?callback=jsonp',{'host': 'localhost'});
    request.addListener('response', function (response) {
      var message_body = ""; // perf
      response.setEncoding('utf8');
      response.addListener('data', function (chunk) {
        message_body += chunk;
      });
      response.addListener('end',function() {
        function jsonp(j) { return j};
        data = eval(message_body);
        expect(data.length).toEqual(2);
      });
      expect(response.statusCode).toEqual(200);
      expect(response.headers["content-type"]).toEqual('application/json;charset=utf-8');
    });
    request.end();
    });
    waits(600);
  });

  it('can recieve an item', function(){
    
    runs(function() {
      var ledger = new Ledger();

    saved_callback = function(err,item) {
      item = item[0];
      expect(item._id != undefined).toEqual(true);
      expect(item.name =='A Thing').toEqual(true);
      expect(item.value == 'A Value').toEqual(true);
    };
    ledger.append({name:'A Thing', value: "A Value"},saved_callback);
    });
    waits(600);
  });

   it('can find all of its items', function(){
     runs(function() {
    var ledger = new Ledger();
    ledger.append({1:2,2:3},function(err,items) {
      ledger.find_all(function(error,items) {
        expect(items.length == 1).toEqual(true)
      });
    });
     });
     waits(600);
  });

});


