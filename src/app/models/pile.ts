export class Pile {
  type: string;
  canDrag: boolean;
  canDrop: boolean;
  next = null;

  constructor(type: string, canDrag: boolean, canDrop: boolean) {
    this.type = type;
    this.canDrag = canDrag;
    this.canDrop = canDrop;
  }

  getLastCard(orSelf?: boolean, nextToLast?: boolean) {
    let card = orSelf ? this : this.next;

    while (card && card.next && (!nextToLast || card.next.next)) {
      card = card.next;
    }

    return card;
  }
}
