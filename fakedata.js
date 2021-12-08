var faker = require("faker");
var fs = require("fs");

let products = [];
for (var i = 0; i < 20; i++) {
  products.push({
    id: faker.datatype.number(),
    text: faker.random.words(),
    isCompleted: faker.datatype.boolean(),
  });
}
fs.writeFileSync(
  "./src/database/todo.json",
  JSON.stringify({
    data: products,
  })
);
