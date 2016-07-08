var turn = 'X';

function generateGame(){

	// Getting Variables
	var game_type = document.getElementById('game_type').value;

	// Clearing board for new game
	document.getElementById('game-board').innerHTML = '';

	// Generating board
	for (x=0; x<game_type; x++){
		for (y=0; y<game_type; y++) {
			var button = document.createElement("input");
			button.setAttribute("value", ' ');
			button.setAttribute("name", 'grid');
			button.setAttribute("class", 'grid-box');
			button.setAttribute("type", 'button');
			button.setAttribute("onclick", "markCheck(this)");
			document.getElementById('game-board').appendChild(button);
		}
		var breakline = document.createElement("br");
			document.getElementById('game-board').appendChild(breakline);
	}

}


function markCheck(obj){
	obj.value = turn;

	if (turn == 'X' ) {
		obj.setAttribute("class", 'green-player');
	} else {
		obj.setAttribute("class", 'red-player');
	}

	obj.setAttribute("disabled", 'disabled');
	changeTurn();
}

function changeTurn(){
	if (turn == 'X') turn = 'Y';
	else turn = 'X';
}
