(function(){
  $(document).ready(function(){

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
