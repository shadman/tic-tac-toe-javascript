
var turn = 'X';
var game_type = 3;
var total_turns = 0;

var selections = new Array(); 
selections['X'] = new Array();
selections['Y'] = new Array();

// Resetting parameters on reseting game
function resetParams() {
	turn = 'X';
	game_type = '3';
	total_turns = 0;

	selections['X'] = new Array();
	selections['Y'] = new Array();
}

// Change turn after another
function changeTurn(){
	if (turn == 'X') turn = 'Y';
	else turn = 'X';
}

// Winner patterns, match selected patterns on every turn
function winnerPatterns() {
	var wins = Array();

	// 3 x 3 winning patterns;
	if (game_type==3) wins = [ 
								[11,12,13], [21,22,23], [31,32,33],
						 		[11,21,31], [12,22,32], [13,23,33], 
						 		[11,22,33], [13,22,31]
						 	];


	// 4 x 4 winning patterns;
	if (game_type==4) wins = [ 
								[11,12,13,14], [21,22,23,24],[31,32,33,34],[41,42,43,44],
						 		[11,21,31,41],[12,22,32,42],[13,23,33,43],[14,24,34,44],
						 		[14,23,32,41],[11,22,33,44]
						 	];

	return wins
}

// Checking winner of selected type on selection
function checkWinner() {

	var finished = false;

	var selected = selections[turn].sort();
	var win_patterns = winnerPatterns();

	for (var x=0; x < win_patterns.length; x++) {
		
		if (finished != true) { 
			finished = isWinner(win_patterns[x], selections[turn]);

			if ( finished === true ) {
				alert(turn+' Won !!');

				// On winning disabled all boxes
				disableAllBoxes();
				break;
			} 
		}
	}

	// If no one wins; declare DRAW
	if ( ( total_turns == (game_type*game_type) ) && finished === false ) { 
		alert('Draw!');
		disableAllBoxes(); 
	}
}

// Verifying each selections with winning pattern
function isWinner(win_pattern, selections){

	var match = 0;

	for (var x=0; x<win_pattern.length; x++) {
		for (var y=0; y<selections.length; y++) {
			if (win_pattern[x]==selections[y]) {
				match++;
			}
		}
	}
	console.log(match);
	if (match==win_pattern.length) return true;

	return false;
}

// Disable all boxes after winning/draw
function disableAllBoxes() {

	var elements = document.getElementsByClassName("grid-box");
	for (var i = 0; i < elements.length; i++) {
	  elements[i].disabled =true;
	}

}

// Generating a board for new game
function generateGame(){

	// Reseting all initialized params as user selected new game
	resetParams();

	// Getting Variables to update global param
	game_type = Number(document.getElementById('game_type').value);

	// Clearing board for new game
	document.getElementById('game-board').innerHTML = '';

	// Generating board
	for (var row=1; row<=game_type; row++){
		for (var col=1; col<=game_type; col++) {
			var unique_name = 'grid-'+row+'-'+col;
			var unique_id = row+''+col;
			var button = document.createElement("input");

			button.setAttribute("value", '');
			button.setAttribute("id", unique_id);
			button.setAttribute("name", unique_name);
			button.setAttribute("class", 'grid-box');
			button.setAttribute("type", 'button');
			button.setAttribute("onclick", "markCheck(this)");
			document.getElementById('game-board').appendChild(button);
		}
		var breakline = document.createElement("br");
			document.getElementById('game-board').appendChild(breakline);
	}

}

// Selecting check for desired position
function markCheck(obj){

	obj.value = turn;
	total_turns++;

	if (turn == 'X' ) {
		obj.setAttribute("class", 'green-player');
	} else {
		obj.setAttribute("class", 'red-player');
	}

	obj.setAttribute("disabled", 'disabled');
	selections[turn].push(Number(obj.id));
	console.log(turn+''+obj.id);

	checkWinner();
	changeTurn();

}




