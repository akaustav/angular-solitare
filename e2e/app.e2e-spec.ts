import { AngularSolitarePage } from './app.po';

describe('angular-solitare App', () => {
  let page: AngularSolitarePage;

  beforeEach(() => {
    page = new AngularSolitarePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
