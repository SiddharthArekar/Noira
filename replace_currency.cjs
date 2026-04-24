const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/pages/Wishlist.jsx',
  'src/pages/Shop.jsx',
  'src/pages/ProductDetail.jsx',
  'src/pages/Home.jsx',
  'src/pages/Checkout.jsx',
  'src/pages/Cart.jsx',
  'src/components/SearchModal.jsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace ${product.price or ${item.product.price or ${p.price
  content = content.replace(/\$\{([a-zA-Z0-9_.]+\.price(?:\.toLocaleString\(\)|\s*\*))/g, '₹{$1');
  
  // Replace ${cartTotal
  content = content.replace(/\$\{cartTotal\.toLocaleString\(\)\}/g, '₹{cartTotal.toLocaleString()}');
  
  // Replace ${(item.product.price * item.quantity).toLocaleString()}
  content = content.replace(/\$\{\(item\.product\.price \* item\.quantity\)\.toLocaleString\(\)\}/g, '₹{(item.product.price * item.quantity).toLocaleString()}');
  
  // Replace $0 with ₹0
  content = content.replace(/\$0/g, '₹0');

  fs.writeFileSync(filePath, content);
});

// Update products.js prices
const productsFile = path.join(process.cwd(), 'src/data/products.js');
let productsContent = fs.readFileSync(productsFile, 'utf8');

// The prices are integers like "price": 11048,
productsContent = productsContent.replace(/\"price\": (\d+)/g, (match, p1) => {
  return '\"price\": ' + (parseInt(p1) * 83);
});

fs.writeFileSync(productsFile, productsContent);

console.log('Update complete.');
