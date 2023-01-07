#!/usr/bin/env node


var path = require("path");
var fs = require("fs");

// var getStdin = require("get-stdin");

var args = require("minimist")(process.argv.slice(2),{
	boolean: ["help","in",],
	string: ["file",],
});
let turn = true;
let redScore = 12;
let whiteScore = 12;

var board = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}

const BASEPATH =
	path.resolve(process.env.BASEPATH || __dirname);


if (args.help || process.argv.length <= 2) {
	error(null,/*showHelp=*/true);
}
else if (args._.includes("-") || args.in) {
	// getStdin().then(processFile).catch(error);
}
else if (args.file) {
	let filePath = path.join(BASEPATH,args.file);
	// fs.readFile(filePath,function(err,contents){
	// 	if (err) error(err.toString());
	// 	else processFile(contents.toString());
	// 	console.log(contents)
	// });
	var array = fs.readFileSync(args.file).toString().split("\n");
	let newArr = []
	for(i in array) {
    	let arr = array[i].trim().split(',').map(n => Number(n));
		const width = 8;
		newArr.push([arr[0] + (arr[1] * 8), arr[2] + (arr[3] * 8)])
	}

	for (let arr of newArr) {
		selectedPiece.pieceId = board[arr[0]];
		selectedPiece.indexOfBoardPiece = arr[0];
		getAvailableSpaces()
		console.log(whiteScore)
		console.log(board)
		console.log(selectedPiece)
		// selectedPiece.pieceId = board[arr[1]];
		// selectedPiece.indexOfBoardPiece = arr[1];
		// console.log(selectedPiece)
	}
}
else {
	error("Usage incorrect.",/*showHelp=*/true);
}

function checkForWin() {
	console.log(redScore)
	console.log(whiteScore)
    if (whiteScore < 0) {
       console.log('red WINS')
    } else if (redScore < 0) {
       console.log('white WINS')
    }
    changePlayer();
}

function changePlayer() {
    if (turn) {
        turn = false;
    } else {
        turn = true;
    }
}

function getAvailableSpaces() {
    if (board[selectedPiece.indexOfBoardPiece + 7] === null 
		&& ![0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41, 43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63 ].includes(selectedPiece.indexOfBoardPiece + 14)) {
        selectedPiece.seventhSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece + 9] === null && ![0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41, 43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63 ].includes(selectedPiece.indexOfBoardPiece + 9)) {
        selectedPiece.ninthSpace = true;
    }
    if (board[selectedPiece.indexOfBoardPiece - 7] === null && ![0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41, 43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63 ].includes(selectedPiece.indexOfBoardPiece -7)) {
        selectedPiece.minusSeventhSpace = true;
    }
    if (board[selectedPiece.ninthSpace - 9] === null && ![0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41, 43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63 ].includes(selectedPiece.indexOfBoardPiece-9)) {
        selectedPiece.minusNinthSpace = true;
    }
	checkAvailableJumpSpaces()
}
function checkAvailableJumpSpaces() {
    if (board[selectedPiece.indexOfBoardPiece + 14] === null 
		&& ![0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41, 43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63 ].includes(selectedPiece.indexOfBoardPiece + 14)
        && board[selectedPiece.indexOfBoardPiece + 7] >= 12) {
            selectedPiece.fourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece + 18] === null 
			&& ![0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41, 43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63 ].includes(selectedPiece.indexOfBoardPiece + 18)
        && board[selectedPiece.indexOfBoardPiece + 9] >= 12) {
            selectedPiece.eighteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 14] === null 
			&& ![0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41, 43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63 ].includes(selectedPiece.indexOfBoardPiece - 14)
        && board[selectedPiece.indexOfBoardPiece - 7] >= 12) {
            selectedPiece.minusFourteenthSpace = true;
        }
        if (board[selectedPiece.indexOfBoardPiece - 18] === null 
			&& ![0, 2, 4, 6, 9, 11, 13, 15, 16, 18, 20, 22, 25, 27, 29, 31, 32, 34, 36, 38, 41, 43, 45, 47, 48, 50, 52, 54, 57, 59, 61, 63 ].includes(selectedPiece.indexOfBoardPiece - 18)
        && board[selectedPiece.indexOfBoardPiece - 9] >= 12) {
            selectedPiece.minusEighteenthSpace = true;
        }

		if (selectedPiece.seventhSpace) {
			makeMove(7)
		}
		if (selectedPiece.ninthSpace) {
			makeMove(9);
		}
		if (selectedPiece.fourteenthSpace) {
			makeMove(14)
		}
		if (selectedPiece.eighteenthSpace) {
			makeMove(18)
		}
		if (selectedPiece.minusSeventhSpace) {
			makeMove(-7)
		}
		if (selectedPiece.minusNinthSpace) {
			makeMove(-9)
		}
		if (selectedPiece.minusFourteenthSpace) {
			makeMove(-14)
		}
		if (selectedPiece.minusEighteenthSpace) {
			makeMove(-18)
		}
}

function makeMove(number) {
    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

// Changes the board states data on the back end
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(selectedPiece.pieceId);
    if (removePiece) {
        board[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            whiteScore--
        }
        if (!turn && selectedPiece.pieceId >= 12) {
            redScore--
        }
    }
}



// ************************************

function printHelp() {
	console.log("ex1 usage:");
	console.log("");
	console.log("--help                      print this help");
	console.log("-, --in                     read file from stdin");
	console.log("--file={FILENAME}           read file from {FILENAME}");
	console.log("");
	console.log("");
}

function error(err,showHelp = false) {
	process.exitCode = 1;
	console.error(err);
	if (showHelp) {
		console.log("");
		printHelp();
	}
}

function processFile(text) {
	text = text.toUpperCase();
	console.log(typeof text)
}
