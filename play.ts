import { shuffledDeck, Deck, Card } from "./utils/deck";
const inquirer = require("inquirer");

// Create the user's and opponent's decks.
const deal = (): Deck[] => {
	let myDeck: Deck = [];
	let yourDeck: Deck = [];

	for (let i = 0; i < 52; i++) {
		i % 2 === 0 ? myDeck.push(shuffledDeck[i]) : yourDeck.push(shuffledDeck[i]);
	}
	return [myDeck, yourDeck];
};

let roundNumber = 0;
let gameNumber = 0;
let myWins = 0;
let yourWins = 0;
let myDeck: Deck = [];
let yourDeck: Deck = [];

const startGame = () => {
	[myDeck, yourDeck] = deal();

	// Reverse the order of the deck so you can just use the 0 index
	myDeck.reverse();
	yourDeck.reverse();

	newTurn();
};

const newTurn = () => {
	inquirer
		.prompt({
			type: "list",
			message: "What would you like to do?",
			name: "action",
			choices: ["Flip a Card", "See Stats"],
		})
		.then(({ action }) => {
			if (action === "Flip a Card") {
				flipCard();
			} else {
				console.log(
					`You have ${myDeck.length} cards in your deck.
Your opponent has ${yourDeck.length} cards in their deck.
You've played ${roundNumber} rounds.
You've won ${myWins} games
You've lost ${yourWins} games`
				);
				newTurn();
			}
		});
};

const flipCard = () => {
	roundNumber += 1;
	let loot: Card[] = [];
	let myCard = myDeck[0];
	let yourCard = yourDeck[0];
	loot.push(myCard);
	loot.push(yourCard);

	myDeck = myDeck.slice(1);
	yourDeck = yourDeck.slice(1);

	showDown(myCard, yourCard, loot);

	if (myDeck.length > 0 && myDeck.length < 52) {
		newTurn();
	} else if (myDeck.length === 0) {
		console.log(`You've lost the game after ${roundNumber} rounds.`);
		playAgain();
	} else {
		console.log(`You've won the game after ${roundNumber} rounds.`);
		playAgain();
	}
};

const showDown = (myCard, yourCard, loot) => {
	if (myCard.value > yourCard.value) {
		console.log(
			`Your ${myCard.name} of ${myCard.suit} beat your opponent's ${yourCard.name} of ${yourCard.suit}`
		);
		myDeck = myDeck.concat(loot);
	} else if (myCard.value < yourCard.value) {
		console.log(
			`Your opponent's ${yourCard.name} of ${yourCard.suit} beat your ${myCard.name} of ${myCard.suit}`
		);
		yourDeck = yourDeck.concat(loot);
	} else {
		console.log(
			`Draw! Your ${myCard.name} of ${myCard.suit} matches your opponent's ${yourCard.name} of ${yourCard.suit}`
		);
		draw(loot);
	}
};

const draw = (loot) => {
	let myCards, yourCards;

	// Make sure the deck is greater than three cards.
	// If not, then the final card is used to settle up.
	if (myDeck.length > 3) {
		myCards = myDeck.slice(0, 3);
		myDeck = myDeck.slice(3);
	} else {
		myCards = myDeck.slice(0, myDeck.length - 2);
		myDeck = [myDeck[myDeck.length - 2]];
	}
	if (yourDeck.length > 3) {
		yourCards = yourDeck.slice(0, 3);
		yourDeck = yourDeck.slice(3);
	} else {
		yourCards = yourDeck.slice(0, yourDeck.length - 2);
		yourDeck = [yourDeck[yourDeck.length - 2]];
	}

	loot = loot.concat(myCards, yourCards);

	let myCard = myDeck[0];
	let yourCard = yourDeck[0];
	showDown(myCard, yourCard, loot);
};

const playAgain = () => {
	inquirer
		.prompt({
			type: "list",
			message: "Would you like to play again?",
			name: "action",
			choices: ["Yes", "No"],
		})
		.then(({ action }) => {
			if (action === "Yes") {
				startGame();
			}
		});
};
startGame();
