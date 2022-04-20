var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;

let ai = 'X';
let human = 'O';
let currentPlayer = human;

function setup() {
  w = canvas.width / 3;
  h = canvas.height / 3;
  bestMove();
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed(evt) {
  if (currentPlayer == human) {
    // Human make turn
    let i = Math.floor(evt.x / w);
    let j = Math.floor(evt.y / h);
    // If valid turn
    if (board[i][j] == '') {
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
}

canvas.addEventListener('click', mousePressed);

var animateId = null;

//bestMove();

setup();
draw();

function draw() {
  rect(0, 0, canvas.width, canvas.height, "lightgray");
  animateId = requestAnimationFrame(draw);

  line(w, 0, w, canvas.height);
  line(w * 2, 0, w * 2, canvas.height);
  line(0, h, canvas.width, h);
  line(0, h * 2, canvas.width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      let r = w / 4;
      if (spot == human) {
        circle(x, y, r * 1.5);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let resultP = document.getElementById("result");
  let result = checkWinner();
  if (result != null) {
    cancelAnimationFrame(animateId);
    if (result == 'tie') {
      resultP.innerHTML = 'Tie!';
    } else {
      resultP.innerHTML = `${result} wins!`;
    }
  }
}
 
function rect(x, y, width, height, color="black"){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}
  
function line(x1, y1, x2, y2){
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
  
function circle(x, y, radius){
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.stroke();
}