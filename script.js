var jsonqueens;
var queens = [];
var checkboxes = [];


const numSeasons = 9;

$(document).ready(function() {
	//sets up elements by hiding/disabling/checking
	setup();
});

function setup(){
	$('#helpContent').hide();
	$('#all').prop('checked', true);
	for(var i = 1; i <= numSeasons; i++){
		checkboxes.push($('#s' + i));
		checkboxes[i-1].prop('disabled', true);
	}
	$.getJSON('queens.json', function(data){
		jsonqueens = JSON.parse(JSON.stringify(data));
	})
	$('#left').hide();
	$('#right').hide();
}

function clickAll(){
	if($('#all').is(':checked')){
		for(var i = 0; i < checkboxes.length; i++){
			checkboxes[i]
				.prop('checked', false)
				.prop('disabled', true);
		}
	}else{
		for(var i = 0; i < checkboxes.length; i++){
			checkboxes[i]
				.prop('disabled', false);
		}
	}
};

function start(){
	queens = [];
	if(
  $('#all').is(':checked') ||(
	$('#s1').is(':checked') &&
	$('#s2').is(':checked') &&
	$('#s3').is(':checked') &&
	$('#s4').is(':checked') &&
	$('#s5').is(':checked') &&
	$('#s6').is(':checked') &&
	$('#s7').is(':checked') &&
	$('#s8').is(':checked') &&
	$('#s9').is(':checked')
	)){
		for(var i = 1; i <= numSeasons; i++){
			for(var j = 0; j < (jsonqueens[i-1][1].length); j++){
				queens.push(jsonqueens[i-1][1][j]);
			}
		}
		startGame();
	}
	else if(
	$('#s1').is(':checked') ||
	$('#s2').is(':checked') ||
	$('#s3').is(':checked') ||
	$('#s4').is(':checked') ||
	$('#s5').is(':checked') ||
	$('#s6').is(':checked') ||
	$('#s7').is(':checked') ||
	$('#s8').is(':checked') ||
	$('#s9').is(':checked')){
		for(var i = 1; i <= numSeasons; i++){
				if($('#s' + i).is(':checked')){
					for(var j = 0; j < (jsonqueens[i-1][1].length); j++){
						queens.push(jsonqueens[i-1][1][j]);
					}
				}
		console.log(queens);
		startGame();
		}
	}
	else{
		$('#title').html('Invalid season choices! Pick at least one!');
	}
}

function startGame(){
	var randomLeft = Math.floor(Math.random() * queens.length);
	var sameRight = true;
	var randomRight;
	while(sameRight){
		randomRight = Math.floor(Math.random() * queens.length);
		if(randomRight !== randomLeft){
			sameRight = false;
		}
	}
	$('#left').html('');
	$('#left').html('');

};


$('#startButton').on('click', start);
$('#all').on('click', clickAll);

$('#helpButton').on('click', function(){
	if($('#helpButton').html() === 'Help'){
		$('#helpButton').html('Hide Help');
		$('#helpContent').show();
	}else{
		$('#helpButton').html('Help');
		$('#helpContent').hide();
	}
});
