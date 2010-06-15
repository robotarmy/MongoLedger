var Graph = function() {};
Graph.constructor = Graph;
Graph.prototype = {};
/*
*  selector : dom id
*  records : [{:delta: "11"},...]
*
*/
Graph.prototype.graph = function(selector,records,max) {
  var self = this;
  self.records = records;
  paper = Raphael(selector),
  data = [];
  baseline = [];
  x = [];
  y = [];
  for (el in self.records){
    x[x.length] = x.length;
    data[data.length] = self.records[el].delta;

    baseline[baseline.length] = max;
  };
  paper.g.text(100,10,"Ajax Roundtrip Time in ms");
  paper.g.linechart(25,10,640,640,x,[data,baseline],{axis : '0 0 1 1'});

};

