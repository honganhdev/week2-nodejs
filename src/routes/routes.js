const Router = require("koa-router");
const bookHandler = require("../handlers/books/bookHandlers");
const productHandler = require("../handlers/products/productHandler");
const todoHandler = require("../handlers/todos/todoHandler");
const bookInputMiddleware = require("../middleware/bookInputMiddleware");
const productInputMiddleware = require("../middleware/productInputMiddleware");

// Prefix all routes with /books
const router = new Router({
  prefix: "/api",
});

// Routes will go here
router.get("/books", bookHandler.getBooks);
router.get("/books/:id", bookHandler.getBook);
router.post("/books", bookInputMiddleware, bookHandler.save);

//Route product
router.get("/products", productHandler.getProducts);
router.post("/products", productInputMiddleware, productHandler.saveProduct);
router.put(
  "/products/:id",
  productInputMiddleware,
  productHandler.updateProductById
);
router.delete("/products/:id", productHandler.deleteProduct);
router.get("/products/:id", productHandler.getProductById);

//Router todo
router.get("/todos", todoHandler.getTodos);
router.post("/todos", todoHandler.saveTodo);
router.patch("/todos/:id", todoHandler.updateTodos);
router.delete("/todos/:id", todoHandler.deleteTodo);
// router.get("/todos/:id", todosHandler.getProductById);

module.exports = router;
