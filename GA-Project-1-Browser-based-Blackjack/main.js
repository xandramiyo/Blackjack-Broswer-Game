
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


/*----- event listeners -----*/
 
hitBtn.addEventListener('click', hit)
stayBtn.addEventListener('click', stay)
splitBtn.addEventListener('click',split)


/*----- functions -----*/

function init() {
    turn = 1
    generateDeck()
    shuffleDeck()
    drawHands()
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
    if (sumHand(playerHand) >= 21) {
        hitBtn.setAttribute("disabled", "")
        stayBtn.setAttribute("disabled", "")
        splitBtn.setAttribute("disabled", "")
        changeTurn()
    }
}

//This will generate a full deck of 52
// function renderDeck() {
//     deck.forEach(card => {
//         const cardEl = document.createElement('div')
//         cardEl.className = 'card ' + card.face
//         document.querySelector('body').append(cardEl)
//     })
// }

function renderHands() {
    document.querySelector('.playerHand').innerHTML = " "
    playerHand.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.className = 'card ' + card.face
        document.querySelector('.playerHand').append(cardEl)
})}

function hit() {
    playerHand.push(deck.shift())
    if (sumHand(playerHand) >= 21) {
        hitBtn.setAttribute("disabled", "")
        stayBtn.setAttribute("disabled", "")
        splitBtn.setAttribute("disabled", "")
        changeTurn()
    }
}

function stay() {
    changeTurn()
    stayBtn.setAttribute("disabled", "")
    hitBtn.setAttribute("disabled", "")
    splitBtn.setAttribute("disabled", "")
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
    if (sumHand(dealerHand) < 17) {
        dealerHand.push(deck.shift());
    } else { stay();
    }
}

function checkWinner() {
    if (sumHand(playerHand) > sumHand(dealerHand)) {
        winner = PLAYERS
    }
} 

init()