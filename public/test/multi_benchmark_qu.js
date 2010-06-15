(function(){
  $(document).ready(function(){
    //-----------------------------------------------
    module("Single Post Benchmark");
    urls = [
      'http://ledger.robotarmyma.de:7001',
      'http://ledger.robotarmyma.de:5000/ledgers',
       'http://ledger.robotarmyma.de:5001/ledgers',
        'http://ledger.robotarmyma.de:5002/ledgers',
           'http://ledger.robotarmyma.de:5003/ledgers'
    ];
    var doc = {
      name: 'This is a String value',
      name2: 'This is a String value2',
      number: 1000099042,
      number2: 199042,
      counter: 0
    };
    var j = 0;
    for(i = 0; i < urls.length; i++) {
      (function(url) { 
        module("["+url+"] Insert");
        var insert = new Benchmark();
        var callback = function(current_count) {
          var self = this;
          self.update_record_start(current_count,new Date().getTime());
          doc.counter = current_count;
          $.ajax({
            url: self.url,
            type: 'POST',
            dataType:'jsonp',
            data: {json: JSON.stringify(doc)},
            success : function(data) { 
              var end = new Date().getTime();
              self.update_record_end(current_count,end);
            }
          });
        }
        asyncTest("POST 10", 0, function(){
          var at = this;
          var finished_callback = function() {
            var self = this;
            var graph_id = new Date().getTime();
            var div = $("<div id='"+graph_id+"'><div id='graph_"+graph_id+"'></div></div>");
            $('body article').append(div);
            self.results('body article #'+graph_id);
            new Graph().graph('graph_'+graph_id,self.records,500);  
            start();
          };
          insert.run(100,url,callback,finished_callback);

        });
      })(urls[i]);
    }
  });
})();


