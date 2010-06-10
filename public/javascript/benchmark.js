var Benchmark = function(){};
Benchmark.constructor = Benchmark;
Benchmark.prototype = {};
Benchmark.prototype.run = function(count,callback) {
  var self = this;
  self.records['start'] = new Date().getTime();
  self.count = count;
  for(var i = 0; i < count; i++) {
    callback.apply(self,[i]);
  }
};
Benchmark.prototype.records = {};
Benchmark.prototype.update_record_start = function(rid,start) {
  var self = this;

  self.records[rid] = {};
  self.records[rid].start = start
};
Benchmark.prototype.update_record_end = function(rid,end) {
  var self = this;
  self.records[rid].end = end; 
  self.records[rid].delta = end - self.records[rid].start ; 
  if (self.count-1 == rid) {
    self.records['finish'] = new Date().getTime();
    self.results('body article');
  }
};
Benchmark.prototype.graph = function(selector) {
  var self = this,
  paper = Raphael(selector),
  data = [];
  baseline = [];
  for (el in self.records){
    data[data.length] = parseInt(self.records[el].delta,10);
    baseline[baseline.length] = 0;
  };
  // relate everything to 10,000 ms
  baseline[baseline.length-1] = 3000;
  paper.g.text(100,10,"Ajax Roundtrip Time in ms");
  paper.g.barchart(10,0,640,480,[data,baseline]);
};
Benchmark.prototype.results = function(element) {
  var self = this;
  var div = $('<div></div>');
  setTimeout(function() {
    var tally = 0;
    var length = 0;
    var bstart =self.records.start;
    var bend = self.records.finish;
    delete self.records['start'];
    delete self.records['finish'];
    div.append($('<div> Real Elapsed Time '+((bend-bstart)/1000)+' seconds</div>'));
               for(var rec in self.records) {
                 tally += self.records[rec].delta;
                 length++; 
               }
               if (length != self.count) 
                 throw "Count Mismatch";
               var calls = self.count;
               var average = tally / calls;
               div.append($('<div>'+tally+' ms</div>'));
               div.append($('<div>'+average+' average ms</div>'));
               div.append($('<div>'+calls+' calls</span>'));
               div.append($("<div id='graph'></div>"));
               $(element).append(div);
  },1);
  setTimeout(function() {
    self.graph('graph');  
  },1);
};
