
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
const playBtn = document.getElementById('play')
const ten = document.getElementById('ten')
const twenty = document.getElementById('twenty')
const fifty = document.getElementById('fifty')
const hundred = document.getElementById('hundred')

let games = document.getElementById('games')
let wins = document.getElementById('wins')
let bank = document.getElementById('bank')
let betBtns = document.querySelectorAll('.betBtn')
let message = document.querySelector('h2')
let statText = document.querySelector('stats')
let streak = document.querySelector('streak')



/*----- event listeners -----*/
 
hitBtn.addEventListener('click', hit)
stayBtn.addEventListener('click', stay)
resetBtnEl.addEventListener('click', handleReset)
playBtn.addEventListener('click', init)


ten.addEventListener('click', function() {
    bet = 10
    placeBets()
})
twenty.addEventListener('click', function() {
    bet = 20
    placeBets()
})
fifty.addEventListener('click', function() {
    bet = 50
    placeBets()
})
hundred.addEventListener('click', function() {
    bet = 100
    placeBets()
})


/*----- functions -----*/

function init() {
    dealerDiv.classList.remove('hidden')

    playBtnEnable()
    playBtn.innerHTML = " "
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
    handleReset()
    betBtnDisable()
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
        playBtnDisable()
        message.innerText = "BLACKJACK!"
        earnings += (bet + (bet * 1.5))
        renderDealerHand()
        // renderResetBtn()
        } else if (sumHand(dealerHand) === 21) {
            message.innerText = "It's a Push!"
            // renderResetBtn()
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
    playBtnDisable()
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
            setTimeout(renderDealerHand(), 1500)
          }
    } else if (sumHand(dealerHand) > 21) {
        message.innerText = "Dealer busts! Player wins!"
        // renderResetBtn()
    } else if (sumHand(dealerHand) >= 17) {  
        checkWinner()
    } 
    checkWinner()
}

function checkWinner() {
    renderDealerHand()
    if (turn === 1) {  
        if (sumHand(playerHand) === 21) {
            playBtnDisable()
            changeTurn()
            dealerPlay()
        } else if (sumHand(playerHand) > 21) {
            playBtnDisable()
            message.innerText = "Player busts! Dealer wins!"
            changeTurn()
            renderDealerHand()
        } 
    }
    else if (turn === -1) {
        if (sumHand(dealerHand) === (sumHand(playerHand))) {
            message.innerText = "It's a Push!"
        } else if (sumHand(dealerHand) > 21) {
            message.innerText = "Dealer busts! Player wins!"
        } else if (sumHand(dealerHand) > sumHand(playerHand)) {
            message.innerText = "Dealer Wins!"
        } else if (message.innerText === "BLACKJACK!") {
            
        } else if (sumHand(dealerHand) < sumHand(playerHand)) {
            message.innerText = "Player Wins!"
        } 
    }
    calcEarnings()
    betBtnEnable()
    if (message.innerText !== "") {
        // renderResetBtn()
    }
} 

// function renderResetBtn() {
//     resetBtnEl.innerText = "Play Again!"
//     document.querySelector(".message").append(resetBtnEl);
// }

function handleReset() {
    resetBtnEl.remove()
    playBtnEnable()
    init()
}

function winStreak() {
    if (playBtn.innerHTML = " ") {
        if ((message.innerText === "BLACKJACK!") || (message.innerText === "Player Wins!") || (message.innerText === "Dealer busts! Player wins!")) {
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
    console.log(bet)
    if((message.innerText === "BLACKJACK!")) {
        earnings += (bet + (bet * 1.5))
    } else if((message.innerText === "Player Wins!") || (message.innerText === "Dealer busts! Player wins!")) {
        earnings += bet
    } 
    else if((message.innerText === "Dealer Wins!") || (message.innerText = "Player busts! Dealer wins!")) {
        earnings -= bet
    }
    return earnings
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
    playBtnDisable()
}

function playBtnEnable() {
    hitBtn.removeAttribute("disabled")
    stayBtn.removeAttribute("disabled")
}

function playBtnDisable() {
    hitBtn.setAttribute("disabled", "")
    stayBtn.setAttribute("disabled", "")
}