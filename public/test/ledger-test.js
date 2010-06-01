(function(){
  $(document).ready(function(){

    var item = {pony :'cake', name : 'biscuit'};
    var Max = function(){};
    Max.prototype.headroom = function(options) {
      var self = this;
      var method ='method',
          url = 'url';
      self[method] = options[method] || 'OPTIONS';
      self[url] = options[url];
      delete options[method];
      delete options[url];
      self.headers = options;
    };
    Max.prototype.complete= function() {
    };
    Max.prototype.request_returns = function() {
      Max.prototype.complete();
    };
    Max.prototype.json = function(jobj) {
      var self = this;
      var json = JSON.stringify(jobj);
      var xmlHttp = null;
      if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open(self.method,self.url,true);
        xmlHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlHttp.setRequestHeader('Content-Length',json.length);
        xmlHttp.onreadystatechange = self.request_returns;
        xmlHttp.send(json);
      }
      if(xmlHttp == null) throw 'Microsoft'; 
    }
    /*
    module('AJAX');
    asyncTest('OPTIONS',2,function(){
      var max = new Max(); 
      max.headroom({url:'http://ledger.robotarmyma.de:9000',method:'POST'});
      max.success = function(data,xhr) {
        ok(true,'Succuss')
      };
      max.error = function(error,xhr) {
        ok(false,'Error');
      }
      max.complete = function(status,xhr) {
        ok(true,'Complete');
        start();
      };
      max.json({JSON:item}); 
    });
 */


    //-----------------------------------------------
    module("LedgerService");
      var item = {pony :'cake', name : 'biscuit'};
      
    asyncTest("POST one with jsonp", 2, function(){
      $.ajax({
               url: 'http://ledger.robotarmyma.de:7001',
            type:'POST',
            data: {JSON:JSON.stringify(item) ,callback: 'hi'},
            dataType:'json',
            success: function(data,status,xhr) {
              ok(true,"Cross Domain Access-Control-Allow-Origin");
              ok(data != null,"Post Returned Something");
            },
            error:function() {
              ok(true);
              ok(false,"error - on post");
            },
            complete:function(xhr,status) {
              start();
            }
          });
    });

    asyncTest("Get all with callback", 1, function(){
       $.ajax({
                url: 'http://ledger.robotarmyma.de:7001',
            type:'GET',
            dataType:'jsonp',
            success: function(jarray) {
              same(jarray,[item]);
            },
            error: function(err) {equals("POST ERROR ",false);},
             complete:function(xhr,status) {
              start();
            }

          }); 
      });  
      


  }); 
  
})();
