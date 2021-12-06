const fs = require("fs");
const pick = require("../helpers/pick");

const { data: products } = require("./products.json");

/**
 * @query sort
 * @returns {[{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number},{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number}{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number}]}
 */

function getProducts({ sort, limit }) {
  let result = products;
  if (sort === "desc") {
    result = result.sort((a, b) => {
      a.createdAt - b.createdAt;
    });
  }
  if (sort === "asc") {
    result = result.sort((a, b) => {
      b.createdAt - a.createdAt;
    });
  }
  if (limit) {
    result = result.slice(0, limit);
  }

  return result;
}

/**
 * @param data
 * @returns {[{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number},{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number}{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number}]}
 */
function add(data) {
  const mergeData = { ...data, createdAt: new Date() };
  const updateProduct = [...products, mergeData];
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updateProduct,
    })
  );
}

/**
 * @param data
 * @param id
 * @returns {[{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number},{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number}{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number}]}
 */

function update({ data, id }) {
  const product = products.find((product) => {
    if (product.id === parseInt(id)) return product;
  });
  if (!product) return false;
  products.splice(products.indexOf(product), 1, data);

  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: products,
    })
  );
}

/**
 * @param id
 * @returns {[{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number},{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number}{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number}]}
 */

function del(id) {
  const product = products.find((product) => {
    if (product.id === parseInt(id)) return product;
  });
  if (!product) return false;
  products.splice(products.indexOf(product), 1);
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: products,
    })
  );
}

/**
 * @query fields
 * @returns {[{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number},{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number}{description: string,color:string,img:string,createdAt:time,price:string,product: string, name: string, id: number}]}
 */
function get({ fields, id }) {
  const product = products.find((product) => {
    if (product.id === parseInt(id)) return product;
  });
  if (!product) return false;
  let result = product;
  if (fields) {
    const field = fields.split(",");
    result = pick(product, field);
  }
  return result;
}
module.exports = {
  getProducts,
  add,
  update,
  del,
  get,
};
