const suits: string[] = ["Hearts", "Clubs", "Spades", "Diamonds"];

export interface Card {
	suit: string;
	value: number;
	name: string | number;
}

export type Deck = Card[];

let deck: Deck = [];
suits.forEach((item) => {
	for (let i = 2; i < 15; i++) {
		let name;
		if (i < 11) {
			name = i;
		} else if (i === 11) {
			name = "Jack";
		} else if (i === 12) {
			name = "Queen";
		} else if (i === 13) {
			name = "King";
		} else if (i === 14) {
			name = "Ace";
		}
		deck.push({
			suit: item,
			value: i,
			name: name,
		});
	}
});

const shuffleDeck = (): Card[] => {
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}
	return deck;
};

export const shuffledDeck: Card[] = shuffleDeck();
