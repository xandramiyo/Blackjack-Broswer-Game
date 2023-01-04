
/*----- constants -----*/

const suits = ['d', 'h', 'c', 's']
const faces = ['A', 'K', 'Q', 'J', '10', '09', '08', '07', '06', '05', '04', '03', '02']
const deck = []

const PLAYERS = {
    '1': {
        name: 'Player',
    },  

    '-1': {
        name: 'Dealer',
    },
}

/*----- app's state (variables) -----*/

let turn, winner, blackjack, playerHand, dealerHand


/*----- cached element references -----*/
const hitBtn = document.getElementById('hit')
const stayBtn = document.getElementById('stay')
const splitBtn = document.getElementById('split')
const resetBtnEl = document.createElement('button')
// const initGame = document.getElementbyId('play')

let message = document.querySelector('h2')
// let clear = document.querySelector('message')

/*----- event listeners -----*/
 
hitBtn.addEventListener('click', hit)
stayBtn.addEventListener('click', stay)
splitBtn.addEventListener('click',split)
resetBtnEl.addEventListener('click', handleReset)
// initGame.addEventListener('click', init)


/*----- functions -----*/


function init() {
    // clear.innerHTML = " "
    turn = 1
    generateDeck()
    shuffleDeck()
    drawHands()
    renderPlayerHand()
    renderDealerHand()
}

function generateDeck() {
    suits.forEach(suit => {
        faces.forEach(face => {
            deck.push({ 
                'face': suit + face
            })
        })
    })
}

function shuffleDeck() {
    for(let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function drawHands() {
    playerHand = deck.splice(0, 2)
    dealerHand = deck.splice(0, 2)
    if (sumHand(playerHand) === 21) {
        hitBtn.setAttribute("disabled", "")
        stayBtn.setAttribute("disabled", "")
        splitBtn.setAttribute("disabled", "")
        message.innerText = "BLACKJACK!"
        changeTurn()
        dealerPlay()
    }
}

function renderPlayerHand() {
    document.querySelector('.playerHand').innerHTML = " "
    playerHand.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.className = 'card ' + card.face
        document.querySelector('.playerHand').append(cardEl)
})}

function renderDealerHand() {
    document.querySelector('.dealerHand').innerHTML = " "
    dealerHand.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.className = 'card ' + card.face
        document.querySelector('.dealerHand').append(cardEl)
})}

function hit() {
    playerHand.push(deck.shift())
    renderPlayerHand()
    checkWinner()
}

function stay() {
    stayBtn.setAttribute("disabled", "")
    hitBtn.setAttribute("disabled", "")
    splitBtn.setAttribute("disabled", "")
    if (turn === 1) {
        changeTurn()
        dealerPlay()
    }
}

// function split() {

// }

function sumHand(turn) {
    let sum = 0
    hasAce = false
    for(let i=0; i < turn.length; i++) {
        temp = parseInt(turn[i]['face'].substr(1), 10)
        if (isNaN(temp)) {
            if (turn[i]['face'].substr(1) === 'A') {
                temp = 1;
                hasAce = true;
            };
            if (turn[i]['face'].substr(1) === 'K') temp = 10; 
            if (turn[i]['face'].substr(1) === 'Q') temp = 10;
            if (turn[i]['face'].substr(1) === 'J') temp = 10;
        }
        sum += temp
    }
    if (hasAce) {
       sum + 10 <= 21 ? sum += 10 : sum += 0;
        }
    return sum;
}

function changeTurn() {
    turn *= -1
}

function dealerPlay() {
  for (let i = sumHand(dealerHand); i <= 16; i++) {
    dealerHand.push(deck.shift())
    renderDealerHand()
  }
  
    // if (sumHand(dealerHand) < 17) {
    //     dealerHand.push(deck.shift())
    //     renderDealerHand()
    // } else { 
    //     stay()
    // }
    checkWinner()
}

function checkWinner() {
    if (turn === 1) {  
        if (sumHand(playerHand) === 21) {
            hitBtn.setAttribute("disabled", "")
            stayBtn.setAttribute("disabled", "")
            splitBtn.setAttribute("disabled", "")
            changeTurn()
        } else if (sumHand(playerHand) > 21) {
            hitBtn.setAttribute("disabled", "")
            stayBtn.setAttribute("disabled", "")
            splitBtn.setAttribute("disabled", "")
            message.innerText = 'Player busts! Dealer wins!'
        } 
    }
    if (turn === -1) {
        if (sumHand(dealerHand) === (sumHand(playerHand))) {
            message.innerText = "It's a Push!"
        } else if (sumHand(dealerHand) > 21) {
            message.innerText = "Dealer busts! Player wins!"
        } else if (sumHand(dealerHand) > sumHand(playerHand)) {
            message.innerText = "Dealer Wins!"
        } else if (sumHand(playerHand) > sumHand(dealerHand)) {
            message.innerText = "Player Wins!"
        }
    }
    if (message.innerText !== "") {
        renderResetBtn()
    }
} 

function renderResetBtn() {
    resetBtnEl.innerText = 'Play Again!'
    document.querySelector('.message').append(resetBtnEl);
}

function handleReset () {
    resetBtnEl.remove()
    message.innerText = " "
    hitBtn.removeAttribute("disabled")
    stayBtn.removeAttribute("disabled")
    splitBtn.removeAttribute("disabled")
    init()
}

init()