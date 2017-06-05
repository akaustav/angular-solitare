import { Injectable } from '@angular/core';
import { SUITS } from '../models/suits';
import { Card } from '../models/card';
import { Pile } from '../models/pile';

@Injectable()
export class DealerService {
  cards;

  constructor() {
    this.cards = [];
  }

  shuffle(): void {
    new Audio('assets/sounds/shuffling-cards.mp3').play();

    for (let suit = 0; suit < 4; ++suit) {
      for (let rank = 1; rank < 14; ++rank) {
        this.cards.push(new Card(SUITS[suit], rank, false));
      }
    }

    shuffle(this.cards);
  }

  deal(pile: Pile, count: number): void {
    const cards = this.cards.splice(0, count);

    while (count--) {
      cards[count].next = pile.next;
      pile.next = cards[count];
    }
  }
}

// Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
