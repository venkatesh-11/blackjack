const valuesBJ = {
  'suits': ['H', 'D', 'C', 'S'],
  'ranks': ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'],
  'values': {'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'T': 10,'J': 10,'Q': 10,'K': 10,'A': 11}
};
 
var debitChips = 500;  //chips we taken
var plySum = 0;         // player value 0
var dealSum = 0;        // DEAL value 0
var bet = 0;            // BET value 0
var x, doubleChips;     // bet adding
document.querySelector('#hitbutton').disabled = true; // hit button disabled
document.querySelector('#standbutton').disabled = true; // stand button disblaled
// when hit button clicked the hit function reflects here
document.querySelector('#hitBtn button').addEventListener('click', hit); 


function hit() {
  x = ranCardGen(); //random card generates using rancardGen function
  let plyDiv = document.querySelector('#plyCards'); //plyCards class assign to plydiv variable
  let plyCardImg = document.createElement('img'); // it creates the img element and assign to variable plyCardimg
  plyCardImg.src = 'cards/' + x + '.png'; // it takes the card image from src which is in png format
  plyDiv.appendChild(plyCardImg);   //it adds the card to the player deck 

  plySum += valuesBJ['values'][x[0]]; 

  //player handle result value given to plysum
    document.querySelector('#plyHandResult').innerHTML = plySum;
  if (plySum > 21) { //player is greater then 21 it gives the player bust
    let plyBust = document.createElement('h1');
    plyBust.innerHTML = 'PLAYER BUST';
    plyBust.id = 'plybust';
    document.querySelector('#bust').appendChild(plyBust);
    document.querySelector('#hitbutton').disabled = true; // hit button disabled
    document.querySelector('#standbutton').disabled = true; // stand button disabled
    document.querySelector('#dealbutton').disabled = true; //deal button disabled
    setTimeout(refresh, 2500); // refresh the page in 4-sec
  }
}
// when Deal button clicked the Deal function reflects here
document.querySelector('#dealBtn button').addEventListener('click', deal);

function deal() {
  chips();    // chips function runs here
  x = ranCardGen(); //it generates the random card
  let dealBtnDiv = document.querySelector('#plyCards'); //dealbtndiv variable assign to player cards 
  let dealBtnCardImg = document.createElement('img'); //the element creates the image of the cards
  dealBtnCardImg.src = 'cards/' + x + '.png';   // it takes the card image from src which is in png format
  dealBtnDiv.appendChild(dealBtnCardImg);
      
    plySum += valuesBJ['values'][x[0]]; 

  //player handle result value given to plysum
  document.querySelector('#plyHandResult').innerHTML = plySum;
  document.querySelector('#dealbutton').disabled = true; // deal button disabled
  document.querySelector('#hitbutton').disabled = false; // hit button enable
  document.querySelector('#standbutton').disabled = false; // stand button enable
}
// when stand button clicked the Deal function reflects here
document.querySelector('#standBtn button').addEventListener('click', stand);

function stand() {
  document.querySelector('#dealbutton').disabled = true; // deal button enabled
  document.querySelector('#hitbutton').disabled = true; // hit button enabled
  document.querySelector('#standbutton').disabled = true; // stand button enabled
  if (plySum <= 21) {  //if the player has less than or equals to 21
    while (dealSum <= 17 && dealSum <= plySum) { // then deal cards should be less than 17 or <=player
      x = ranCardGen(); //it generates the random card
      let dealDiv = document.querySelector('#dealerCards');
      let dealCardImg = document.createElement('img');
      dealCardImg.src = 'cards/' + x + '.png'; // it takes the card image from src which is in png format
      dealDiv.appendChild(dealCardImg); // it add cards to the dealer card deck
      
        dealSum += valuesBJ['values'][x[0]];
    
      document.querySelector('#dealHandResult').innerHTML = dealSum;
    }
  }
  if (dealSum > 21) {
    let dealBust = document.createElement('h1');
    dealBust.innerHTML = 'DEALER BUST';
    dealBust.id = 'dealbust';
    document.querySelector('#bust').appendChild(dealBust);
    setTimeout(refresh, 2500);
  } else if (dealSum > plySum) {
    let dealWin = document.createElement('h1');
    dealWin.innerHTML = 'DEALER WIN';
    dealWin.id = 'dealwin';
    document.querySelector('#bust').appendChild(dealWin);
    setTimeout(refresh, 2500);
  } else if (dealSum < plySum) {
    let plyWin = document.createElement('h1');
    plyWin.innerHTML = 'PLAYER WIN';
    plyWin.id = 'plywin';
    document.querySelector('#bust').appendChild(plyWin);
    setTimeout(refresh, 2500);
  } else if (dealSum === plySum) {
    let draw = document.createElement('h1');
    draw.innerHTML = 'ITS A TIE';
    draw.id = 'drawID';
    document.querySelector('#bust').appendChild(draw);
    setTimeout(refresh, 2500);
  }
}

function refresh() { //function restart the game from starting 
  if (dealSum > 21) {
    document.querySelector('#dealbust').remove();
    removeImg();
    doubleChips = (bet * 2) + debitChips;
    document.querySelector('#chipCountResult').innerHTML = "$" + doubleChips;
    debitChips = doubleChips;
    document.querySelector('#dealbutton').disabled = false;
  } else if (dealSum > plySum) {
    document.querySelector('#dealwin').remove();
    removeImg();
    document.querySelector('#dealbutton').disabled = false;
  } else if (plySum > 21) {
    document.querySelector('#plybust').remove();
    removeImg();
    document.querySelector('#dealbutton').disabled = false;
  } else if (dealSum < plySum) {
    document.querySelector('#plywin').remove();
    removeImg();
    doubleChips = (bet * 2) + debitChips;
    document.querySelector('#chipCountResult').innerHTML = "$" + doubleChips;
    debitChips = doubleChips;
    document.querySelector('#dealbutton').disabled = false;
  } else if (dealSum === plySum) {
    document.querySelector('#drawID').remove();
    removeImg();
    doubleChips = bet + debitChips;
    document.querySelector('#chipCountResult').innerHTML = "$" + doubleChips;
    debitChips = doubleChips;
    document.querySelector('#dealbutton').disabled = false;
  }
  if (debitChips === 0) {
    document.querySelector('#noChipMsg').innerHTML = "<== YOU GAMBLED IT ALL AWAY || RELOAD TO START OVER ||"
    document.querySelector('#dealbutton').disabled = true;
  }
  bet = 0;
  plySum = 0;
  dealSum = 0;
  document.querySelector('#plyHandResult').innerHTML = plySum;
  document.querySelector('#dealHandResult').innerHTML = dealSum;
}

function removeImg() { // functions the all cards in the deck
  let u = document.querySelectorAll('.Cards img');
  for (let q = 0; q < u.length; q++) {
    u[q].remove();
  }
}

function chips() { // funtion used for betting purpose
  while (bet <= 0 || bet >= (debitChips + 1)) {
    bet = Math.round(prompt('HOW MUCH DO YOU WANT TO BET?'));
  }
  debitChips = (debitChips - bet);
  document.querySelector('#chipCountResult').innerHTML = "$" + debitChips;
}

function ranCardGen() { //function shufle the cards and gives the random card
  let deck = [];
  for (let i = 0; i < valuesBJ['suits'].length; i++) {
    for (let j = 0; j < valuesBJ['ranks'].length; j++) {
      deck.push(valuesBJ['ranks'][j] + valuesBJ['suits'][i]);
    }
  }
  return deck[Math.floor(Math.random() * 52)];
}
