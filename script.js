var origBaord;
const huplayer = '#';
const aiplay ='*';
const winCombs = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[6,4,8]
]
const cells = document.querySelectorAll('.cell');
startGame();
function startGame() {
	document.querySelector(".endgame").style.display ="none"
	origBaord = Array.from(Array(9).keys());
	for(var i = 0; i < cells.length;i++){
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click',turnClick,false);
	}
}

function turnClick(square){
	if(typeof origBaord[square.target.id] == 'number' ){
 	turn(square.target.id, huplayer);
	if(!checkTie()) turn(bestSpot(),aiplay);
	}
}
function turn(squareId,player){
	origBaord[squareId] = player;
	document.getElementById(squareId).innerText=player;
	let gameWon = checkWin(origBaord,player);
	if(gameWon) gameOver(gameWon)
}
function checkWin(board,player){
	let plays = board.reduce((a,e,i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for(let [index,win] of winCombs.entries()){
		if(win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player:player};
			break;
		} 
	}
	return gameWon;
}



function gameOver(gameWon){
	for(let index of winCombs[gameWon.index]){
		document.getElementById(index).style.backgroundColor =  
		gameWon.player == huplayer ? "aqua" : "red";
	}
	for(var i=0; i<cells.length;i++){
		cells[i].removeEventListener('click',trunClick,false);
	}
	declarWinner(gameWon.player == huplayer ? "You Win" : "You Lose.");
}





function declarWinner(who){
	document.querySelector(".endgame").style.display="block";
	document.querySelector(".endgame.text").innerText = who;
}
function emptySquares(){
	return origBaord.filter(s => typeof s == 'number');
}
function bestSpot(){
	return emptySquares()[0];
}
function checkTie(){
	if(emptySquares().length == 0){
		for(var i=0;i<cells.length;i++){
			cells[i].style.backgroundColor = 'green';
			cells[i].removeEventListener('click',trunClick,false);
		}
		declarWinner("Game Is TIE!");
		return true;
	}
	return false;
}
