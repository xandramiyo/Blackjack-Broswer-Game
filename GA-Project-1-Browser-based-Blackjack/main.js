const suits = ['d', 'h', 'c', 's']
const faces = ['A', 'K', 'Q', 'J', '10', '09', '08', '07', '06', '05', '04', '03', '02']
const deck = []

function generateDeck() {
    suits.forEach(suit => {
        faces.forEach(face => {
            // let sum = if (face === 'K' || 'Q' || 'J') {
            //     score = 10
            // }
            deck.push({ 
                'face': suit + face
                // VALUE SHOULD EQUAL SCORE TO DETERMINE BUST OR NOT
                // 'value': null;
            })
        })
    })
}

//This will generate a full deck of 52
function renderDeck() {
    deck.forEach(card => {
        const cardEl = document.createElement('div')
        cardEl.className = 'card ' + card.face
        document.querySelector('body').append(cardEl)
    })
}

generateDeck()
renderDeck()