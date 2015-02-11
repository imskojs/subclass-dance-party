var WigglyDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node.addClass('wiggly');
};


WigglyDancer.prototype = Object.create(Dancer.prototype);

WigglyDancer.prototype.constructor = WigglyDancer;

WigglyDancer.prototype.step = function(){
  Dancer.prototype.step.bind(this)();
  this.$node.toggle();
};
