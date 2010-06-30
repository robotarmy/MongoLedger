(function(){
  $(document).ready(function(){
    //-----------------------------------------------
    module("Single Post Benchmark");
    urls = [
      'http://ledger.robotarmyma.de:7001',
      'http://ledger.robotarmyma.de:9000/ledgers',
      'http://ledger.robotarmyma.de:5000/ledgers',
    //  'http://ledger.robotarmyma.de:5001/ledgers',
    // 'http://ledger.robotarmyma.de:5002/ledgers',
    //  'http://ledger.robotarmyma.de:5003/ledgers'
    ];
    LABELS = [
      'NODE.JS + node-mongo-native driver + glue',
      'This + Rackup + ActiveRecord',
     // '1 Thin Rails + Mongomapper ',
     // '1 Thin Rails + Mysql',
     // '1 Thin Rails + PostGreSQL',
      '1 Thin Rails + SQLITE'
    ];
    
    var NumberOfCalls = 1000;

    var doc = {
      name: 'This is a String value',
      name2: 'This is a String value2',
      number: 1000099042,
      number2: 199042,
      counter: 0
    };
    var fullGraph = function(records) {
      if (this._history == undefined){
        this._history = [];
        this._x = [];
      }
      var hlength = this._history.length;
      this._history[hlength] = [];
      for (el in records) {
        this._history[hlength][this._history[hlength].length] = records[el].delta;
      }
      var x = [];
      for(var i = 0; i < NumberOfCalls; i++){
        x[i] = i+1 ;
      }
      this._x[this._x.length] = x;
      if (this._history.length == urls.length)
        {
          var graph_id = new Date().getTime();
          var div = $("<div class='all_graph' id='graph_"+graph_id+"'></div>");
          $('#all_graph').append(div);
          var name = "All Servers rountrip Time in MS ";
          new Graph().graph_line(name,'graph_'+graph_id,this._x,this._history,LABELS);  
          this._history = undefined; 
        }  
    };
    for(i = 0; i < urls.length; i++) {
      (function(url,fg) { 
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
        asyncTest("POST ", 0, function(){
          var at = this;
          var finished_callback = function() {
            var self = this;
            var graph_id = new Date().getTime();
            var div = $("<div id='"+graph_id+"'><div class='graph' id='graph_"+graph_id+"'></div></div>");
            $('body article').append(div);
            self.results('body article #'+graph_id);
            new Graph().graph('graph_'+graph_id,self.records,500);  
            fg(self.records);
            start();
          };
          insert.run(NumberOfCalls,url,callback,finished_callback);
        });
      })(urls[i],fullGraph);
    }
  });
})();


