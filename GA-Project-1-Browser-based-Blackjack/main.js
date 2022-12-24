
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

//stay?

/*----- cached element references -----*/
const hitBtn = document.getElementById('hit')
const stayBtn = document.getElementById('stay')
const splitBtn = document.getElementById('split')


/*----- event listeners -----*/
 
hitBtn.addEventListener('click', hit)
stayBtn.addEventListener('click', stay)
splitBtn.addEventListener('click',split)


/*----- functions -----*/

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
        deck[i] = deck[j];
    }
}

function drawHands() {
    for(let i = 0; i < 2; i++) {
        
    }
}

//This will generate a full deck of 52
function renderDeck() {
    deck.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.className = 'card ' + card.face
        document.querySelector('deck').append(cardEl)
    })
}

// function hit() {

// }

// function stay() {

// }

// function split() {

// }