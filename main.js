
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

let turn, winner, playerHand, dealerHand, bet
let gameCount = 0
let winCount = 0
let earnings = 1000


/*----- cached element references -----*/
const dealerDiv=  document.querySelector('.dealer')
const hitBtn = document.getElementById('hit')
const stayBtn = document.getElementById('stay')
const resetBtnEl = document.createElement('button')
const ten = document.getElementById('ten')
const twenty = document.getElementById('twenty')
const fifty = document.getElementById('fifty')
const hundred = document.getElementById('hundred')
let games = document.getElementById('games')
let wins = document.getElementById('wins')
let bank = document.getElementById('bank')
let betAmount = document.getElementById('betAmount')

const betMsg = document.querySelector('.betMsg')
let betBtns = document.querySelectorAll('.betBtn')
let message = document.querySelector('h2')
let statText = document.querySelector('stats')
let streak = document.querySelector('streak')



/*----- event listeners -----*/
 
hitBtn.addEventListener('click', hit)
stayBtn.addEventListener('click', stay)
resetBtnEl.addEventListener('click', handleReset)


ten.addEventListener('click', function() {
    bet = 10
    betAmount.innerHTML = `Bet: $${bet}`
    placeBets()
})
twenty.addEventListener('click', function() {
    bet = 20
    betAmount.innerHTML = `Bet: $${bet}`
    placeBets()
})
fifty.addEventListener('click', function() {
    bet = 50
    betAmount.innerHTML = `Bet: $${bet}`
    placeBets()
})
hundred.addEventListener('click', function() {
    bet = 100
    betAmount.innerHTML = `Bet: $${bet}`
    placeBets()
})


/*----- functions -----*/

function init() {
    dealerDiv.classList.remove('hidden')
    bank.innerHTML = `Bank: $${earnings}`
    turn = 1    
    generateDeck()
    shuffleDeck()
    drawHands()
    renderPlayerHand()
    renderDealerHand()
    winStreak()
    message.innerText = " "
}

function placeBets() {
    if(earnings != 0) {
        handleReset()
        betBtnDisable()
    } else {
        message.innerText = "You lost all your money 🤧 Refresh the page to play again!"
    }
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
        let j = Math.floor(Math.random() * deck.length)
        let temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }
}

function drawHands() {
    playerHand = deck.splice(0, 2)
    dealerHand = deck.splice(0, 2) 
    if (sumHand(playerHand) === 21) {
        if(sumHand(dealerHand) !== 21) {
        playBtnsDisable()
        message.innerText = "BLACKJACK! Place a bet to play again!"
        earnings += (bet + (bet * 1.5))
        handleReset()
        } else if (sumHand(dealerHand) === 21) {
            message.innerText = "It's a Push!"
            handleReset()
        }
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
    dealerHand.forEach((card, idx) => {
        const cardEl = document.createElement('div')
        if(turn === 1 && idx === 0) {
          cardEl.className = 'card back'
        } else {
          cardEl.className = 'card ' + card.face
        }
        document.querySelector('.dealerHand').append(cardEl)
    })
}


function hit() {
    playerHand.push(deck.shift())
    renderPlayerHand()
    checkWinner()
}

function stay() {
    playBtnsDisable()
    if (turn === 1) {
        changeTurn()
        renderDealerHand()
        dealerPlay()
    }
}

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
            if (turn[i]['face'].substr(1) === 'K') temp = 10
            if (turn[i]['face'].substr(1) === 'Q') temp = 10
            if (turn[i]['face'].substr(1) === 'J') temp = 10
        }
        sum += temp
    }
    if (hasAce) {
       sum + 10 <= 21 ? sum += 10 : sum += 0
        }
    return sum;
}

function changeTurn() {
    turn *= -1
}

function dealerPlay() {
    renderDealerHand()
    if (sumHand(dealerHand) < 17) {
        while (sumHand(dealerHand) <= 16) {
            dealerHand.push(deck.shift())
          }
    } else if (sumHand(dealerHand) > 21) {
        message.innerText = "Dealer busts! Player wins! Place a bet to play again!"
    } else if (sumHand(dealerHand) >= 17) {  
        checkWinner()
    } 
    checkWinner()
}

function checkWinner() {
    renderDealerHand()
    if (turn === 1) {  
        if (sumHand(playerHand) === 21) {
            playBtnsDisable()
            changeTurn()
            dealerPlay()
        } else if (sumHand(playerHand) > 21) {
            playBtnsDisable()
            message.innerText = "Player busts! Dealer wins! Place a bet to play again!"
            changeTurn()
            renderDealerHand()
        } 
    }
    else if (turn === -1) {
        if (sumHand(dealerHand) === (sumHand(playerHand))) {
            message.innerText = "It's a Push! Place a bet to play again!"
        } else if (sumHand(dealerHand) > 21) {
            message.innerText = "Dealer busts! Player wins! Place a bet to play again!"
        } else if (sumHand(dealerHand) > sumHand(playerHand)) {
            message.innerText = "Dealer Wins! Place a bet to play again!"
        } else if (message.innerText === "BLACKJACK! Place a bet to play again!") {
            
        } else if (sumHand(dealerHand) < sumHand(playerHand)) {
            message.innerText = "Player Wins! Place a bet to play again!"
        } 
    }
    if (message.innerText !== "") {
        calcEarnings()
        betBtnEnable()
    }
} 

function handleReset() {
    resetBtnEl.remove()
    playBtnsEnable()
    init()
}

function winStreak() {
    if (betMsg.innerHTML = " ") {
        if(((sumHand(dealerHand) > 21) && (sumHand(playerHand) <= 21)) || ((sumHand(playerHand) > sumHand(dealerHand)) && (sumHand(playerHand) <= 21))) {
            gameCount += 1
            winCount += 1
            games.innerText = `Games: ${gameCount}`
            wins.innerText = `Wins: ${winCount}`
        } else {
            gameCount += 1
            games.innerText = `Games: ${gameCount}`
        }
    }
}

function calcEarnings() {
   if((sumHand(dealerHand) > 21) || ((sumHand(playerHand) > sumHand(dealerHand)) && (sumHand(playerHand) <= 21))) {
        earnings += bet
    } 
    else if( (sumHand(playerHand) > 21) || ((sumHand(playerHand) < sumHand(dealerHand)) && (sumHand(dealerHand) <= 21))) {
        earnings -= bet
    }
    bank.innerHTML = `Bank: $${earnings}`
}

function betBtnDisable() {
    ten.setAttribute("disabled", "")
    twenty.setAttribute("disabled", "")
    fifty.setAttribute("disabled", "")
    hundred.setAttribute("disabled", "")
}

function betBtnEnable() {
    ten.removeAttribute("disabled")
    twenty.removeAttribute("disabled")
    fifty.removeAttribute("disabled")
    hundred.removeAttribute("disabled")
    playBtnsDisable()
}

function playBtnsEnable() {
    hitBtn.removeAttribute("disabled")
    stayBtn.removeAttribute("disabled")
}

function playBtnsDisable() {
    hitBtn.setAttribute("disabled", "")
    stayBtn.setAttribute("disabled", "")
}