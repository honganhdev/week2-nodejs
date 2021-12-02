var faker = require("faker");
var fs = require("fs");

let products = [];
for (var i = 0; i < 1000; i++) {
  products.push({
    id: i + 1,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    product: faker.commerce.product(),
    color: faker.commerce.color(),
    createdAt: faker.date.recent(),
    image: faker.image.imageUrl(),
  });
}
fs.writeFileSync(
  "./src/database/products.json",
  JSON.stringify({
    data: products,
  })
);
