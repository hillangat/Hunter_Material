import { HunterMaterialPage } from './app.po';

describe('hunter-material App', () => {
  let page: HunterMaterialPage;

  beforeEach(() => {
    page = new HunterMaterialPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
