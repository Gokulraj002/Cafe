/**
 * The café menu. Prices are in the café's local currency, shown without a
 * symbol in the design.
 */
const menu = [
  {
    id: 'espresso-bar',
    title: 'Espresso Bar',
    note: 'House blend or the single origin of the week.',
    items: [
      { name: 'Espresso', description: 'A double ristretto, dense and sweet.', price: '3.5' },
      { name: 'Macchiato', description: 'A double shot, marked with a spoonful of foam.', price: '3.9' },
      { name: 'Cortado', description: 'Equal parts espresso and silky steamed milk.', price: '4.2' },
      { name: 'Flat White', description: 'Micro-foam over a double shot, poured thin.', price: '4.6', signature: true },
      { name: 'Cappuccino', description: 'Classic ratio, dusted with nothing at all.', price: '4.6' },
      { name: 'Café Latte', description: 'Whole milk or oat, with a rosetta on top.', price: '4.8' },
    ],
  },
  {
    id: 'slow-bar',
    title: 'Slow Bar',
    note: 'Hand-brewed to order. Please allow a few minutes.',
    items: [
      { name: 'Pour Over', description: 'V60, brewed with the single origin of your choice.', price: '6.0' },
      { name: 'Chemex for Two', description: 'Clean, bright, shared at the table.', price: '10.5' },
      { name: 'Cold Brew', description: 'Steeped eighteen hours, served over one clear cube.', price: '5.5' },
      { name: 'Siphon', description: 'Our slowest coffee — theatre included.', price: '8.0', signature: true },
    ],
  },
  {
    id: 'signatures',
    title: 'Signatures',
    note: 'The drinks we are known for.',
    items: [
      { name: 'Lente Latte', description: 'Espresso, brown-butter milk, a pinch of sea salt.', price: '5.8', signature: true },
      { name: 'Honey Oat Cortado', description: 'Wildflower honey, oat milk, single origin shot.', price: '5.2' },
      { name: 'Espresso Tonic', description: 'Citrus tonic, espresso poured over ice.', price: '5.5' },
      { name: 'Cascara Soda', description: 'Dried coffee cherry, steeped cold and lightly sparkling.', price: '4.8' },
      { name: 'Affogato', description: 'Vanilla bean gelato drowned in a double shot.', price: '6.5' },
    ],
  },
  {
    id: 'patisserie',
    title: 'Patisserie',
    note: 'Baked in-house before sunrise.',
    items: [
      { name: 'Butter Croissant', description: 'Seventy-two hour laminated dough.', price: '3.8', signature: true },
      { name: 'Almond Croissant', description: 'Baked twice, with frangipane and toasted almonds.', price: '4.8' },
      { name: 'Pain au Chocolat', description: 'Two bars of dark chocolate, always.', price: '4.2' },
      { name: 'Cardamom Bun', description: 'Knotted, glazed, still warm.', price: '4.5' },
      { name: 'Basque Cheesecake', description: 'Burnt top, soft centre, served by the slice.', price: '6.8' },
    ],
  },
];

export default menu;
