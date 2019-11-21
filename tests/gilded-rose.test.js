const { Shop, Item } = require("../src/gilded-rose");

describe("Gilded Rose", () => {
  it("should degrade the quality twice as fast after sell by date", () => {
    //setup
    const itemName = "Normal Item";
    const sellIn = 0;
    const quality = 5;
    const shop = new Shop([new Item(itemName, sellIn, quality)]);

    //invoke
    const items = shop.updateQuality();

    //assert
    expect(items[0]).toEqual(new Item("Normal Item", -1, 3));
  });

  it("should not decrease an item's quality below zero", () => {
    const shop = new Shop([new Item("Normal Item", 3, 0)]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(new Item("Normal Item", 2, 0));
  });

  it("should increase the quality of 'Aged Brie' the older it gets", () => {
    const shop = new Shop([new Item("Aged Brie", 3, 3)]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(new Item("Aged Brie", 2, 4));
  });

  it("should not increase an item's quality above 50", () => {
    const shop = new Shop([new Item("Aged Brie", 3, 50)]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(new Item("Aged Brie", 2, 50));
  });

  it("should increase an item's quality above 50", () => {
    const shop = new Shop([new Item("Aged Brie", 0, 40)]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(new Item("Aged Brie", -1, 42));
  });

  it("should not decrease or increase the sell in or quality of Sulfuras a legendary item with quality < 50 ", () => {
    const shop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 3, 30)]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", 3, 30));
  });

  it("should not decrease or increase the sell in or quality of Sulfuras a legendary item with quality > 50", () => {
    const shop = new Shop([new Item("Sulfuras, Hand of Ragnaros", 3, 60)]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(new Item("Sulfuras, Hand of Ragnaros", 3, 60));
  });

  it("should increase the quality of 'Backstage passes' by 2, 10 - 6 days before the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30)
    ]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 32)
    );
  });

  it("should increase the quality of 'Backstage passes' by 2, 9  days before the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 30)
    ]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 8, 32)
    );
  });

  it("should not increase the quality of 'Backstage passes' by 2, 5 days before the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30)
    ]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 33)
    );
  });

  it("should increase the quality of 'Backstage passes' by 3, 5 - 1 day before the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 3, 30)
    ]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 2, 33)
    );
  });

  it("should increase the quality of 'Backstage passes' by 3, 4 day before the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 30)
    ]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", 3, 33)
    );
  });

  it("should decrease the quality of 'Backstage passes' to 0, after the concert", () => {
    const shop = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30)
    ]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0)
    );
  });

  it("should decrease the quality of 'conjured' twice as fast as normal items before expiry", () => {
    const shop = new Shop([new Item("conjured items", 4, 30)]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(new Item("conjured items", 3, 29));
  });

  it("should decrease the quality of 'conjured' twice as fast as normal items after expiry", () => {
    const shop = new Shop([new Item("conjured items", 0, 30)]);
    const items = shop.updateQuality();

    expect(items[0]).toEqual(new Item("conjured items", -1, 28));
  });
});
