var Benchmark = function(){};
Benchmark.constructor = Benchmark;
Benchmark.prototype = {};
Benchmark.prototype.run = function(count,url,callback,finished_callback) {
  var self = this;
  self['start'] = new Date().getTime();
  self.count = count;
  self.collected = 0;
  self.url = url;
  self.finished_callback = finished_callback;
  for(var i = 0; i < count; i++) {
    callback.apply(self,[i]);
  }
};
Benchmark.prototype.records = {};
Benchmark.prototype.update_record_start = function(rid,start) {
  var self = this;
  self.records[rid] = {};
  self.records[rid].start = start;
};
Benchmark.prototype.update_record_end = function(rid,end) {
  var self = this;
  self.records[rid].end = end; 
  self.records[rid].delta = end - self.records[rid].start ; 
  self.collected++;
  if (self.count == self.collected) {
    self['finish'] = new Date().getTime();
    self.finished_callback.apply(self,[]);
  }
};
Benchmark.prototype.results = function(element) {
  var self = this;
  var div = $('<div></div>');
  var tally = 0;
  var length = 0;
  var bstart = self.start;
  var bend =   self.finish;
  var elapsed_time_in_seconds = (bend-bstart) / 1000;
  div.append($('<div> Real Elapsed Time '+elapsed_time_in_seconds+' seconds</div>'));
  for(var rec in self.records) {
    if(self.records[rec].delta == undefined)
      throw 'missing delta '+ JSON.stringify(self.records[rec]);
    tally += self.records[rec].delta;
    length++; 
  }
  if (length != self.count) 
    throw "Count Mismatch";
  var calls = self.count;
  var average = tally / calls;
  div.append($("<h3>Calls : "+self.count+" --- "+self.url+"</h3>"));
  div.append($('<div>'+tally+' ms</div>'));
  div.append($('<div>'+average+' average ms</div>'));
  div.append($('<div>'+calls+' calls</div>'));
  //div.append($('<span>'+JSON.stringify(self.records)+'</span>'));
  $(element).append(div);
};
