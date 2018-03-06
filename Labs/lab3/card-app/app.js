const
    cards = require('deck'),
    inquirer = require('inquirer')

const draw = (shuffle, n = 1) => {
    cards.deck(shuffle)
        .then(deck => cards.draw(deck.deck_id, n))
        .then(result => {
            console.log('-- CARDS --')
            result.cards.forEach(card => {
                console.log(`${card.value} of ${card.suit}`)
            })

            console.log('-- REMAING CARDS --')
            console.log(result.remaining)
        })
        .catch(err => console.log(err))
}

// HINT for #3 in Lab
const discardPrompt = (result) => {
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'select cards to throw away',
        name: 'cards',
        choices: result,        // implement choices array - look at the inquirer documentation,
        checked: true,
        validate: (select) => {
                if(select.length ==5)
                    return 'You cannot throw away all your cards'
                else
                    return true
        } 
    }])
}

// HINT for #4 in Lab
const findAndRemove = (current, throwaway) => {
     current.cards = current.cards.filter( card => !throwaway.includes(card))
     return current
}

// HINT for #6 in Lab
const print = cards => {
    console.log('-- CARDS --')
    cards.cards.forEach(card => {
        console.log(card)
    })

    console.log('-- REMAING CARDS --')
    console.log(cards.remaining)
}

const play = () => {
    cards.deck(true)
    .then(deck => cards.draw(deck.deck_id, 5))
    .then(result =>{
        const deck_id = result.deck_id
        result.cards = result.cards.map(card => `${card.value} ${card.suit}`)
        return discardPrompt(result.cards)
            .then(tossed =>findAndRemove(result,tossed.cards))
      
    })
    .then(leftovers => {
        
            cards.draw(leftovers.deck_id, 5-leftovers.cards.length)
        .then(result  =>{
           result.cards = result.cards.map(card =>`${card.value} ${card.suit}`).concat(leftovers.cards)
           print(result)
        })
       
        
    })
    .catch(err => console.log(err))
}

module.exports = {
    draw
}

module.exports = {
    play
}
