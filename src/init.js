$(document).ready(function(){
  window.dancers = [];
  window.distances = {};

  var calculateDistance = function(update){
    for(var dancer in dancers){
      var x1 = dancers[dancer].$node.offset().left;
      var y1 = dancers[dancer].$node.offset().top;
      for(var neighbor in dancers){
        if(dancer !== neighbor && (update || !dancers[neighbor] || !dancers[neighbor][dancer])){
          var x2 = dancers[neighbor].$node.offset().left;
          var y2 = dancers[neighbor].$node.offset().top;
          var d = Math.sqrt(Math.pow(x1 - x2, 2) - Math.pow(y1 - y2, 2));
          if(!distances[dancer]){
            distances[dancer] = {};
          }
          distances[dancer][neighbor] = d;
        }
      }
    }
  };

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random offset

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    dancers.push(dancer);
    $('body').append(dancer.$node);
  });

  
  $('.lineUp').on('click', function (){
    var x = 200;
    var y = 200;
    for(var i = 0; i < dancers.length; i++){
      dancers[i].setPosition(y,x);
      x += 20;
    }
  });

  $('.pairUp').on('click', function (){
    calculateDistance(false);
    var visited = new Array(dancers.length);
    var increment = 30;
    for(var dancer in dancers){
      var closestNeighbor;
      var x = 0;
      var y = 0;
      for(var neighbor in distances[dancer]){
        if (closestNeighbor === undefined){
          if(dancers[neighbor].$node.offset().left !== 0){
            closestNeighbor = neighbor;
            x = dancers[neighbor].$node.offset().left;
            y = dancers[neighbor].$node.offset().top;
          }
        } else if(distances[dancer][neighbor] < distances[dancer][closestNeighbor] && dancers[neighbor].$node.offset().left !== 0) {
          closestNeighbor = neighbor;
          x = dancers[neighbor].$node.offset().left;
          y = dancers[neighbor].$node.offset().top;
        }
      }
      if(x !== 0){
        dancers[dancer].setPosition(y, x+increment);
      }
    }

   });

  $('.pairUp2').on('click', function (){
    coupler();
  });

  $('body').on('mouseenter', '.bouncy', function() {
    $(this).stop().animate({ 
      'width': "+=40px",
      'left': "-=20px",
      'height': "+=40px",
      'top': "-=20px"
    }, 100);
  });
});










function coupler (){

var info = {};

function distance(X, Y) {
  var xx = parseFloat(X.css('left'));
  var yx = parseFloat(Y.css('left'));
  var xy = parseFloat(X.css('top'));
  var yy = parseFloat(Y.css('top'));
  var dist = Math.sqrt((xx - yx) * (xx - yx) + (xy - yy) * (xy - yy));
  return dist;
}

function arrayOfDistFrom(dancerIndex){
  var set = [];
  for (var i = 0; i < dancers.length; i++){
    if(dancerIndex === i){
      set.push(999999);
    } else {
      var dist = distance(dancers[dancerIndex].$node, dancers[i].$node);
      set.push(dist);
    }
  }
  info[dancerIndex] = set;
}


function completeInfo(){
  for (var i = 0; i < dancers.length; i++){
    arrayOfDistFrom(i);
  }
}

function findSmallest(array){
  var result = 99999999;
  var smallestIndex;
  for(var i = 0; i < array.length; i++){
    if(array[i] < result){
      result = array[i];
      smallestIndex = i;
    }
  }
  return smallestIndex;
}

function smallestInfo(){
  for(var dancerId in info){
    info[dancerId] = findSmallest(info[dancerId]);
  }
}

function setUp() {
  var y = 10;
  var x = 10;
  for(var key in info){
    var maleId = info[key];
    var femaleId = key;
    dancers[maleId].setPosition(y, x);
    dancers[femaleId].setPosition(y, x);
    x += 200;
    if(x > 1200){
      x = 10;
      y += 200;
    }
  }
}

completeInfo();
smallestInfo();
setUp();


}







