import { Component } from '@angular/core';

import { SUITS } from './models/suits';
import { PILETYPE } from './models/pile-type';
import { Card } from './models/card';
import { Pile } from './models/pile';

import { DealerService } from './services/dealer.service';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    DealerService,
    TableService
  ]
})
export class AppComponent {
  title: string = SUITS[1].name;
  win = false;
  deck: Pile;
  waste: Pile;
  foundation: Pile[] = [];
  tableau: Pile[] = [];

  constructor(private dealer: DealerService, private table: TableService) {
    dealer.shuffle();

    // create the 4 foundation piles
    for (let i = 0; i < 4; ++i) {
      const pile: Pile = new Pile(PILETYPE.foundation, true, true);
      this.foundation.push(pile);
      table.addPile(pile);
    }

    // create the 7 tableau piles
    for (let i = 0; i < 7; ++i) {
      const pile: Pile = new Pile(PILETYPE.tableau, true, true);
      dealer.deal(pile, i + 1);
      pile.getLastCard().up = true;
      table.addPile(pile);
    }

    // create the deck pile
    this.deck = new Pile(PILETYPE.deck, false, false);
    dealer.deal(this.deck, 24);
    table.addPile(this.deck);

    // create the waste pile
    this.waste = new Pile(PILETYPE.waste, false, false);
    table.addPile(this.waste);

    // subscribe to game events
    // cardClickedEvent
    // cardDoubleClickedEvent
    // cardDroppedEvent
    // placeholderClickedEvent
  }

  checkWin(): void {
    const completedPiles = this.foundation
      .map(pile => pile.getLastCard())
      .filter(card => card && card.rank === 13)
      .length;

    if (completedPiles === 4) {
      new Audio('assets/sounds/sheen-just-winning-everyday-defeat-not-an-option.mp3').play();
      this.win = true;
    }
  }

  cardClicked(e): void {
    const card: Card = e.card;
    const pile: Pile = this.table.getPile(card);

    if (card.next || pile.type !== PILETYPE.deck) {
      return;
    }

    // top card in deck pile clicked... waste a card.
    card.up = true;
    this.table.moveCard(card, this.waste.getLastCard(true));
  }

  cardDoubleClicked(e): void {
    const card: Card = e.card;
    let pile: Pile = this.table.getPile(card);

    // ensure card is face up, top card, in waste or tableau piles
    if (!card.up || card.next || pile.type === PILETYPE.foundation) {
      return;
    }

    // attempt to find a foundation pile to place the card in
    pile = this.foundation
      .map(p => p.getLastCard(true))
      .filter(c => card.rank === 1 && c.type === PILETYPE.foundation || c.suit === card.suit && card.rank - c.rank === 1)[0];

    if (!pile) {
      return;
    }

    this.table.moveCard(card, pile, true);
    this.checkWin();
  }

  isValidMoveToTableau(card: Card, pile: Pile, pileLast: Card): boolean {
    if (pile.type !== PILETYPE.tableau) {
      return false;
    }

    if (pile.next) {
      return pileLast.rank - card.rank === 1 && pileLast.suit.color !== card.suit.color;
    }

    return card.rank === 13;
  }

  isValidMoveToFoundation(card: Card, pile: Pile, pileLast: Card): boolean {
    if (pile.type !== PILETYPE.foundation) {
      return false;
    }

    if (pile.next) {
      return card.rank - pileLast.rank === 1 && pileLast.suit === card.suit;
    }

    return card.rank === 1;
  }

  cardDropped(e): void {
    const card = e.card;
    const pile = e.pile;
    const pileLast = pile.getLastCard(true);

    if (this.isValidMoveToFoundation(card, pile, pileLast) || this.isValidMoveToTableau(card, pile, pileLast)) {
      this.table.moveCard(card, pileLast, true);
      this.checkWin();
    }
  }

  placeholderClicked(e): void {
    const pile = e.pile;

		// deck placeholder?
    if (pile !== this.deck || !this.waste.next) {
      return;
    }

		// reset the deck.
    this.table.flipPile(this.waste);
    this.table.moveCard(this.waste.next, this.deck);
  }

}
