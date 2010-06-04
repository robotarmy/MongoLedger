(function(){
  $(document).ready(function(){

    //-----------------------------------------------
    module("LedgerService");

    var item = {pony :'cake', name : 'biscuit'};
    $.ajaxSetup({
      url: 'http://ledger.robotarmyma.de:7001',
        dataType:'jsonp',
    });
    asyncTest("POST one with jsonp", 2, function(){
      $.ajax({
        type:'POST',
        data: {JSON:JSON.stringify(item)},
        success: function(data,status,xhr) {
          ok(true,"Cross Domain Access-Control-Allow-Origin");
          same('success',status);
        },
        error:function() {
          ok(true);
          ok(false,"error - on post");
        },
      });
      setTimeout(function() {  
        start();  
      }, 2000);  

    });

    asyncTest("Get All After POST with callback", 1, function(){
      $.ajax({
        type:'POST',
        data: JSON.stringify(item),
        success: function(data,status,xhr) {
          $.ajax({
            type:'GET',
            success: function(jarray) {
              same(jarray,item);
            },
          });
        },
      });
      setTimeout(function() {  
        start();  
      }, 2000);  

    });

  });
})();


