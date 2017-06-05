import { Suit } from './suit';

export class Card {
  suit: Suit;
  rank: number;
  up: boolean;
  next: any = null;

  constructor(suit: Suit, rank: number, up: boolean) {
    this.suit = suit;
    this.rank = rank;
    this.up = up;
  }
}
