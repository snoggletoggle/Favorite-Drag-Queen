var jsonqueens;
var queens = [];
var checkboxes = [];

var randomLeft;
var sameRight = true;
var randomRight;
var seasonLeft = '';
var seasonRight = '';
var queensTotal;
var queensEliminated;
var queensRemaining;


const numSeasons = 9;

$(document).ready(function() {
  //sets up elements by hiding/disabling/checking
  setup();
});

function setup() {
	setupButtons();

  $('#helpContent').hide();
  $('#all').prop('checked', true);


  for (var i = 1; i <= numSeasons; i++) {
    checkboxes.push($('#s' + i));
    checkboxes[i - 1].prop('disabled', true);
  }
  $.getJSON('queens.json', function(data) {
    jsonqueens = JSON.parse(JSON.stringify(data));
  })
}

function clickAll() {
  if ($('#all').is(':checked')) {
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i]
        .prop('checked', false)
        .prop('disabled', true);
    }
  } else {
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i]
        .prop('disabled', false);
    }
  }
};

function start() {
  queens = [];
  if (
    $('#all').is(':checked') || (
      $('#s1').is(':checked') &&
      $('#s2').is(':checked') &&
      $('#s3').is(':checked') &&
      $('#s4').is(':checked') &&
      $('#s5').is(':checked') &&
      $('#s6').is(':checked') &&
      $('#s7').is(':checked') &&
      $('#s8').is(':checked') &&
      $('#s9').is(':checked')
    )) {
    for (var i = 1; i <= numSeasons; i++) {
      for (var j = 0; j < (jsonqueens[i - 1][1].length); j++) {
        queens.push(jsonqueens[i - 1][1][j]);
      }
    }
		queensTotal = queens.length;
		queensEliminated = 0;
		queensRemaining = queensTotal;
		gameButtons();
    newQueens();
  } else if (
    $('#s1').is(':checked') ||
    $('#s2').is(':checked') ||
    $('#s3').is(':checked') ||
    $('#s4').is(':checked') ||
    $('#s5').is(':checked') ||
    $('#s6').is(':checked') ||
    $('#s7').is(':checked') ||
    $('#s8').is(':checked') ||
    $('#s9').is(':checked')) {
    for (var i = 1; i <= numSeasons; i++) {
      if ($('#s' + i).is(':checked')) {
        for (var j = 0; j < (jsonqueens[i - 1][1].length); j++) {
          queens.push(jsonqueens[i - 1][1][j]);
        }
      }
    }
		queensTotal = queens.length;
		queensEliminated = 0;
		queensRemaining = queensTotal;
		gameButtons();
    newQueens();
  } else {
    $('#title').html('Invalid season choices! Pick at least one!');
  }
}

function gameButtons(){
	$('#skip').show();
	$('#start').hide();
	$('#left').show();
	$('#right').show();
	$('#score').show();
	$('#title').html('Select your favorite queen!');
	updateScore();
};

function updateScore(){
	$('#score').html(queensEliminated + ' of ' +queensTotal + ' queens eliminated');
}

function setupButtons(){
	$('#skip').hide();
	$('#start').show();
	$('#score').hide();
	$('#left').hide();
	$('#right').hide();
};

function newRandoms(){
	randomLeft = Math.floor(Math.random() * queens.length);
	sameRight = true;
	seasonLeft = '';
	seasonRight = '';
	while (sameRight) {
		randomRight = Math.floor(Math.random() * queens.length);
		if (randomRight !== randomLeft) {
			sameRight = false;
		}
	}
};

function newQueens() {
	newRandoms();
  $('#left').html('<img class="img-responsive" src="images/' + queens[randomLeft][1] + '">');
  $('#right').html('<img class="img-responsive" src="images/' + queens[randomRight][1] + '">');
};

function declareWinner(arg){
	$(arg == '#left' ? '#right' : '#left').hide();
	//only one queen left, 0, named [0]
	$('#title').html(queens[0][0] + ' has won!');
	$(arg)
		.css('border-color', 'gold')
		.css('border-width', '20px');
}

function clickLeft(){
	if(queensRemaining > 1){
		queens.splice(randomRight, 1);
		queensEliminated++;
		queensRemaining--;
		if(queensEliminated !== queensTotal - 1){
			newQueens();
			updateScore();
		} else{
			updateScore();
			declareWinner('#left');
		}
	}
};


function clickRight(){
	if(queensRemaining > 1){
		queens.splice(randomLeft, 1);
		queensEliminated++;
		queensRemaining--;
		if(queensEliminated !== queensTotal - 1){
			newQueens();
			updateScore();
		} else{
			updateScore();
			declareWinner('#right');
		}
	}
};

function skip(){
	if(queensRemaining > 1){
		newQueens();
	}
};

$('#skip').on('click', skip);
$('#left').on('click', clickLeft);
$('#right').on('click', clickRight);
$('#start').on('click', start);
$('#all').on('click', clickAll);

$('#helpButton').on('click', function() {
  if ($('#helpButton').html() === 'Help') {
    $('#helpButton').html('Hide Help');
    $('#helpContent').show();
  } else {
    $('#helpButton').html('Help');
    $('#helpContent').hide();
  }
});

$(document).keydown(function(e) {
  if (e.which == 37) {
    $('#left').click();
    return false;
  } else if (e.which == 39) {
    $('#right').click();
    return false;
  } else if (e.which == 40 || e.which == 38) {
    $('#skip').click();
    return false;
  }
});
