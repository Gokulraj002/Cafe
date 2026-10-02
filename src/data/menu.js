/**
 * The café menu. Prices are whole Indian Rupees, inclusive of GST, kept as
 * plain numeric strings — components render them through formatPrice().
 */
const menu = [
  {
    id: 'espresso-bar',
    title: 'Espresso Bar',
    note: 'House blend or the single estate of the week.',
    items: [
      { name: 'Espresso', description: 'A double ristretto, dense and sweet.', price: '180' },
      { name: 'Macchiato', description: 'A double shot, marked with a spoonful of foam.', price: '200' },
      { name: 'Cortado', description: 'Equal parts espresso and silky steamed milk.', price: '220' },
      { name: 'Flat White', description: 'Micro-foam over a double shot, poured thin.', price: '260', signature: true },
      { name: 'Cappuccino', description: 'Classic ratio, dusted with nothing at all.', price: '250' },
      { name: 'Café Latte', description: 'Full-cream, oat or almond milk, with a rosetta on top.', price: '270' },
    ],
  },
  {
    id: 'slow-bar',
    title: 'Slow Bar',
    note: 'Hand-brewed to order. Please allow a few minutes.',
    items: [
      { name: 'Filter Kaapi', description: 'Our own decoction and frothed milk, served in a brass davara tumbler.', price: '150' },
      { name: 'Pour Over', description: 'V60, brewed with the single estate of your choice.', price: '340' },
      { name: 'Chemex for Two', description: 'Clean, bright, shared at the table.', price: '600' },
      { name: 'Jaggery Cold Brew', description: 'Steeped eighteen hours, finished with a little jaggery.', price: '280' },
      { name: 'Siphon', description: 'Our slowest coffee — theatre included.', price: '420', signature: true },
    ],
  },
  {
    id: 'signatures',
    title: 'Signatures',
    note: 'The drinks we are known for.',
    items: [
      { name: 'Kela Latte', description: 'Espresso, brown-butter milk, a few flakes of sea salt.', price: '320', signature: true },
      { name: 'Elaichi Cortado', description: 'Green cardamom, jaggery, oat milk, single-estate shot.', price: '290', signature: true },
      { name: 'Espresso Tonic', description: 'Citrus tonic, espresso poured over ice.', price: '300' },
      { name: 'Cascara Soda', description: 'Dried Chikmagalur coffee cherry, steeped cold and lightly sparkling.', price: '280' },
      { name: 'Affogato', description: 'Tender-coconut ice cream drowned in a double shot.', price: '340' },
    ],
  },
  {
    id: 'patisserie',
    title: 'Patisserie',
    note: 'Baked in-house before sunrise. Eggless and vegan options daily.',
    items: [
      { name: 'Butter Croissant', description: 'Seventy-two hour laminated dough.', price: '220', signature: true },
      { name: 'Almond Croissant', description: 'Baked twice, with frangipane and toasted almonds.', price: '290' },
      { name: 'Pain au Chocolat', description: 'Two bars of dark chocolate, always.', price: '260' },
      { name: 'Cardamom Bun', description: 'Knotted, glazed with elaichi sugar, still warm.', price: '240' },
      { name: 'Banana Walnut Bread', description: 'Yelakki bananas and walnuts, eggless, by the slice.', price: '200' },
      { name: 'Basque Cheesecake', description: 'Burnt top, soft centre, served by the slice.', price: '380' },
    ],
  },
];

export default menu;
