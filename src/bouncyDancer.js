var BouncyDancer = function(top, left, timeBetweenSteps){
  Dancer.call(this, top, left, timeBetweenSteps/7);
  this.$node.addClass('bouncy');
  this.bounce = true;
};


BouncyDancer.prototype = Object.create(Dancer.prototype);

BouncyDancer.prototype.constructor = BouncyDancer;

BouncyDancer.prototype.step = function(){
  Dancer.prototype.step.bind(this)();
  if(this.bounce){
    this.$node.animate({top: '-=100px'}, 100);
    this.bounce = false;
  } else {
    this.$node.animate({top: '+=100px'}, 100);
    this.bounce = true;
  }
};

