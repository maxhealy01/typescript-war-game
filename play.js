"use strict";
exports.__esModule = true;
var deck_1 = require("./utils/deck");
var inquirer = require("inquirer");
// Create the user's and opponent's decks.
var deal = function () {
    var myDeck = [];
    var yourDeck = [];
    for (var i = 0; i < 52; i++) {
        i % 2 === 0 ? myDeck.push(deck_1.shuffledDeck[i]) : yourDeck.push(deck_1.shuffledDeck[i]);
    }
    return [myDeck, yourDeck];
};
var roundNumber = 0;
var gameNumber = 0;
var myWins = 0;
var yourWins = 0;
var myDeck = [];
var yourDeck = [];
var startGame = function () {
    var _a;
    _a = deal(), myDeck = _a[0], yourDeck = _a[1];
    // Reverse the order of the deck so you can just use the 0 index
    myDeck.reverse();
    yourDeck.reverse();
    newTurn();
};
var newTurn = function () {
    inquirer
        .prompt({
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["Flip a Card", "See Stats"]
    })
        .then(function (_a) {
        var action = _a.action;
        if (action === "Flip a Card") {
            flipCard();
        }
        else {
            console.log("You have ".concat(myDeck.length, " cards in your deck.\nYour opponent has ").concat(yourDeck.length, " cards in their deck.\nYou've played ").concat(roundNumber, " rounds.\nYou've won ").concat(myWins, " games\nYou've lost ").concat(yourWins, " games"));
            newTurn();
        }
    });
};
var flipCard = function () {
    roundNumber += 1;
    var loot = [];
    var myCard = myDeck[0];
    var yourCard = yourDeck[0];
    loot.push(myCard);
    loot.push(yourCard);
    myDeck = myDeck.slice(1);
    yourDeck = yourDeck.slice(1);
    showDown(myCard, yourCard, loot);
    if (myDeck.length > 0 && myDeck.length < 52) {
        newTurn();
    }
    else if (myDeck.length === 0) {
        console.log("You've lost the game after ".concat(roundNumber, " rounds."));
        playAgain();
    }
    else {
        console.log("You've won the game after ".concat(roundNumber, " rounds."));
        playAgain();
    }
};
var showDown = function (myCard, yourCard, loot) {
    if (myCard.value > yourCard.value) {
        console.log("Your ".concat(myCard.name, " of ").concat(myCard.suit, " beat your opponent's ").concat(yourCard.name, " of ").concat(yourCard.suit));
        myDeck = myDeck.concat(loot);
    }
    else if (myCard.value < yourCard.value) {
        console.log("Your opponent's ".concat(yourCard.name, " of ").concat(yourCard.suit, " beat your ").concat(myCard.name, " of ").concat(myCard.suit));
        yourDeck = yourDeck.concat(loot);
    }
    else {
        console.log("Draw! Your ".concat(myCard.name, " of ").concat(myCard.suit, " matches your opponent's ").concat(yourCard.name, " of ").concat(yourCard.suit));
        draw(loot);
    }
};
var draw = function (loot) {
    var myCards, yourCards;
    // Make sure the deck is greater than three cards.
    // If not, then the final card is used to settle up.
    if (myDeck.length > 3) {
        myCards = myDeck.slice(0, 3);
        myDeck = myDeck.slice(3);
    }
    else {
        myCards = myDeck.slice(0, myDeck.length - 2);
        myDeck = [myDeck[myDeck.length - 2]];
    }
    if (yourDeck.length > 3) {
        yourCards = yourDeck.slice(0, 3);
        yourDeck = yourDeck.slice(3);
    }
    else {
        yourCards = yourDeck.slice(0, yourDeck.length - 2);
        yourDeck = [yourDeck[yourDeck.length - 2]];
    }
    loot = loot.concat(myCards, yourCards);
    myCards.map(function (card) {
        console.log("Your ".concat(card.name, " of ").concat(card.suit, " is on the table"));
    });
    yourCards.map(function (card) {
        console.log("Your opponent's ".concat(card.name, " of ").concat(card.suit, " is on the table"));
    });
    var myCard = myDeck[0];
    var yourCard = yourDeck[0];
    showDown(myCard, yourCard, loot);
};
var playAgain = function () {
    inquirer
        .prompt({
        type: "list",
        message: "Would you like to play again?",
        name: "action",
        choices: ["Yes", "No"]
    })
        .then(function (_a) {
        var action = _a.action;
        if (action === "Yes") {
            startGame();
        }
    });
};
startGame();
