// var makeBlinkyDancer = function(top, left, timeBetweenSteps){
//   var blinkyDancer = makeDancer(top, left, timeBetweenSteps);
//   var oldStep = blinkyDancer.step;

//   blinkyDancer.step = function(){
//     oldStep();
//     blinkyDancer.$node.toggle();
//   };

//   return blinkyDancer;
// };

var BlinkyDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps);
};


BlinkyDancer.prototype = Object.create(Dancer.prototype);

BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.step = function(){
  Dancer.prototype.step.bind(this)();
  this.$node.toggle();
};