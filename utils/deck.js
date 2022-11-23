"use strict";
exports.__esModule = true;
exports.shuffledDeck = void 0;
var suits = ["Hearts", "Clubs", "Spades", "Diamonds"];
var deck = [];
suits.forEach(function (item) {
    for (var i = 2; i < 15; i++) {
        var name_1 = void 0;
        if (i < 11) {
            name_1 = i;
        }
        else if (i === 11) {
            name_1 = "Jack";
        }
        else if (i === 12) {
            name_1 = "Queen";
        }
        else if (i === 13) {
            name_1 = "King";
        }
        else if (i === 14) {
            name_1 = "Ace";
        }
        deck.push({
            suit: item,
            value: i,
            name: name_1
        });
    }
});
var shuffleDeck = function () {
    var _a;
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [deck[j], deck[i]], deck[i] = _a[0], deck[j] = _a[1];
    }
    return deck;
};
exports.shuffledDeck = shuffleDeck();
