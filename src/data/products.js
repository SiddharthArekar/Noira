export const products = [
  {
    id: 'ring-01',
    name: 'Eternal Solitaire Diamond Ring',
    price: 3499,
    category: 'Rings',
    image: '/images/ring.png',
    description: 'A stunning luxury diamond engagement ring set in 18k gold. The epitome of everyday elegance.',
    material: '18k Gold',
  },
  {
    id: 'necklace-01',
    name: 'Emerald Cascade Gold Necklace',
    price: 2150,
    category: 'Necklaces',
    image: '/images/necklace.png',
    description: 'An elegant 18k gold necklace with a delicate pendant featuring a small, brilliant emerald.',
    material: '18k Gold & Emerald',
  },
  {
    id: 'earrings-01',
    name: 'Teardrop Pearl Elegance',
    price: 1850,
    category: 'Earrings',
    image: '/images/earrings.png',
    description: 'Gorgeous luxury pearl drop earrings with yellow gold accents, perfect for evening wear.',
    material: '18k Gold & Pearl',
  },
  {
    id: 'bracelet-01',
    name: 'Aura Gold Chain Bracelet',
    price: 890,
    category: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    description: 'A beautifully crafted minimal gold chain bracelet, suitable for stacking or wearing solo.',
    material: '14k Gold',
  },
  {
    id: 'ring-02',
    name: 'Noir Onyx Signet',
    price: 1200,
    category: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b454bf?auto=format&fit=crop&q=80&w=800',
    description: 'A bold, modern black onyx signet ring crafted to make a statement.',
    material: '18k Gold & Onyx',
  },
  {
    id: 'necklace-02',
    name: 'Luna Pendant',
    price: 1450,
    category: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1599643478524-fb66fa5320e5?auto=format&fit=crop&q=80&w=800',
    description: 'A minimalist diamond crescent pendant that brings light to any outfit.',
    material: 'White Gold',
  }
];

export const getProductsByCategory = (category) => {
  return products.filter((product) => product.category === category);
};

export const getProductById = (id) => {
  return products.find((product) => product.id === id);
};
