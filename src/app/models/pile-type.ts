export class PileType {
  deck: string;
  waste: string;
  foundation: string;
  tableau: string;
}

export const PILETYPE: PileType = new PileType();
PILETYPE.deck = 'deck';
PILETYPE.waste = 'waste';
PILETYPE.foundation = 'foundation';
PILETYPE.tableau = 'tableau';
