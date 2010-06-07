(function(){
  $(document).ready(function(){

    //-----------------------------------------------
    module("LedgerService");

    var item = {pony :'cake', name : 'biscuit'};
    $.ajaxSetup({
      url: 'http://ledger.robotarmyma.de:7001',
        dataType:'jsonp',
    });

    asyncTest("POST one with jsonp", 3, function(){
      $.ajax({
        type:'POST',
        data: {'json' :JSON.stringify(item)},
        success: function(data,status,xhr) {
          ok(true,"Cross Domain Access-Control-Allow-Origin");
          same('success',status);
          ok(data[0]._id != undefined, 'RESPONSE HAS _ID');
        },
      });
      setTimeout(function() {  
        start();  
      }, 1000);  

    });

    asyncTest("Get Find _ID of POST with callback", 1, function(){
      $.ajax({
        type:'POST',
        data: {'json' : JSON.stringify(item)},
        success: function(data,status,xhr) {
          $.ajax({
            type:'GET',
            data: {'find' : {'_id':data[0]._id} },
            success: function(jarray) {
              delete jarray[0]['_id'];
              same(jarray,[item]);
            },
          });
        },
      });
      setTimeout(function() {  
        start();  
      }, 1000);  

    });

  });
})();


