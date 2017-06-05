import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { Pile } from '../models/pile';

@Injectable()
export class TableService {
  piles: Pile[];

  constructor() {
    this.piles = [];
  }

  addPile(pile: Pile): void {
    this.piles.push(pile);
  }

  getPile(card: Card): Pile {
    let i = this.piles.length;
    let c;

    while (i--) {
      c = this.piles[i].next;

      while (c && c !== card) {
        c = c.next;
      }

      if (c) {
        return this.piles[i];
      }
    }
  }

  flipPile(pile: Pile): void {
    let card = pile.next;
    const cards = [];
    let i = 0;

    // detach cards from the pile
    pile.next = null;

    // reverse the cards
    while (card) {
      cards.push(card);
      card = card.next;
    }
    cards.reverse();

    // re-create the cards
    card = pile;
    while (i < cards.length) {
      card.next = new Card(cards[i].suit, cards[i].rank, false);
      card = card.next;
      i++;
    }
  }

  cloneCard(card: Card): Card {
    const root: Card = new Card(card.suit, card.rank, card.up);
    let clone: Card = root;

    while (card.next) {
      card = card.next;
      clone = clone.next = new Card(card.suit, card.rank, card.up);
    }

    return root;
  }

  moveCard(card: Card, toCardPile: Pile, reveal?: boolean): void {
    const pile: Pile = this.getPile(card);
    let c: Pile = pile;

    while (c.next !== card) {
      c = c.next;
    }

    c.next = null;

    if (reveal) {
      // c.up = true;
    }

    toCardPile.next = this.cloneCard(card);
  }

}
