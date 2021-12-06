var faker = require("faker");
var fs = require("fs");

let products = [];
for (var i = 0; i < 10; i++) {
  products.push({
    id: faker.datatype.number(),
    text: faker.lorem.lines(),
    isCompleted: faker.datatype.boolean(),
  });
}
fs.writeFileSync(
  "./src/database/todo.json",
  JSON.stringify({
    data: products,
  })
);
