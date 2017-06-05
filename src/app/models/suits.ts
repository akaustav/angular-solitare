import { Suit } from './suit';

class Suits {
  club: Suit;
  diamond: Suit;
  spade: Suit;
  heart: Suit;
}

const suit = new Suits();
suit.club = new Suit('club', '♣', 'black');
suit.diamond = new Suit('diamond', '♦', 'red');
suit.spade = new Suit('spade', '♠', 'black');
suit.heart = new Suit('heart', '♥', 'red');

export const SUITS: Suit[] = [suit.club, suit.diamond, suit.spade, suit.heart];
