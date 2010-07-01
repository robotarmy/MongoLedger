var Graph = function() {};
Graph.constructor = Graph;
Graph.prototype = {};
Graph.prototype.name =""/*
*  selector : dom id
*  records : [{:delta: "11"},...]
*
*/
Graph.prototype.graph_line = function(name,selector,xarray,yarray,labels) {
  paper = Raphael(selector),
  colors = Raphael.fn.g.colors;
  if (labels != undefined) {
   for(i = 0; i < labels.length; i++){
     var c = colors[i];
    paper.g.text(400,10*2*(i+1),labels[i]).attr({fill: c});
   };
  };
  paper.g.text(200,10,name);
  paper.g.linechart(50,10,800,600,xarray,yarray,{axis : '0 0 1 1'});

}

  Graph.prototype.graph = function(selector,records,max) {
  var self = this;
  self.records = records;
  data = [];
  x = [];
  for (el in self.records){
    x[x.length] = x.length+1;
    data[data.length] = self.records[el].delta;
  };
  self.graph_line(self.name,selector,[x],[data]);
};

