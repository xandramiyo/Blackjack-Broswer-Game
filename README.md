# BlackJack

This is a simple game of Blackjack that performs the minimum functionalities. This game is played with a single deck that is shuffled at the start of every game. 

![image of the startup screen with the play button that will render the game](https://user-images.githubusercontent.com/118208853/210888204-0cab851c-bdb6-4452-85df-fb1cc555d429.png)

Once the play button is pressed, the player and the "dealer" are dealt two cards, with the first of the dealer's cards being hidden. The player is able to hit or stay and the dealer will only act once the player either hits until their hand totals exactly 21 or they click the stay button.

![image of the initial hands that are drawn once play is pressed](https://user-images.githubusercontent.com/118208853/210888598-9f783f25-5ed3-495c-9687-73a0dc5f7079.png)

A message will also be rendered at the end of every round to compare the two hands and display the winner. A message may also appear when the player is dealt a blackjack, however, the dealer is still given a chance to push. Additionally, a button will be rendered alongside the message to allow the player to continue playing. 

![example image of the player winning](https://user-images.githubusercontent.com/118208853/210889653-3875f312-e6f9-461b-adb5-3e09e6278bf1.png)
![example image of the dealer winning](https://user-images.githubusercontent.com/118208853/210889660-62032561-eff1-4826-8d62-2e0a4d964e5e.png)
![example image of player getting a Blackjack](https://user-images.githubusercontent.com/118208853/210889758-0bf2f4c7-1816-4ebe-902a-8ced05779b7c.png)

For those who are curious about the text and icon at the bottom of the table, I lightly themed my game around my favorite piece of fiction so it's a little easter egg for anyone who may recognize it. 

## Technologies Used

- HTML

- CSS

- Javascript

## Play the Game! 

[Click here to play](https://xandramiyo.github.io/Project-1/)

## Future Enhancements

Add functionality for insurance in the case of possible dealer Blackjack. I would also like to add the options to split and double down.

## Current Bugs

In some cases, if the player hand has face cards, the game will incorrectly render a "player bust" message even if the sum of the hand is under 21 and will subsequently reduce the current earnings pool. 

The game also occassionally incorrectly subtracts a bet, causing the player's earning pool to be reduced by double the bet. 
