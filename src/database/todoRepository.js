const fs = require("fs");
const { data: todos } = require("./todo.json");
const faker = require("faker");

/**
 *
 * @returns {[{text: string,  id: number},{text: string,  id: number},{text: string,  id: number} ]}
 */
function getAll() {
  return todos;
}

/**
 *
 * @returns {[{text: string,  id: number},{text: string,  id: number},{text: string,  id: number} ]}
 */

function add(data) {
  const mergeData = {
    ...data,
    isCompleted: false,
    id: faker.datatype.number(),
  };
  const updateTodo = [...todos, mergeData];
  fs.writeFileSync(
    "./src/database/todo.json",
    JSON.stringify({
      data: updateTodo,
    })
  );
  return mergeData;
}

/**
 *
 * @returns {[{text: string,  id: number},{text: string,  id: number},{text: string,  id: number} ]}
 */
function del(id) {
  const todo = todos.find((todo) => {
    if (todo.id === parseInt(id)) return todo;
  });
  if (!todo) return false;
  todos.splice(todos.indexOf(todo), 1);
  fs.writeFileSync(
    "./src/database/todo.json",
    JSON.stringify({
      data: todos,
    })
  );
  return todo;
}
/**
 *
 * @returns {[{text: string,  id: number},{text: string,  id: number},{text: string,  id: number} ]}
 */

function update({ data, id }) {
  id = parseInt(id);
  console.log("data", data, id);
  const todo = todos.find((todo) => {
    if (todo.id === parseInt(id)) return todo;
  });
  if (!todo) return false;
  const updateData = { ...todo, ...data };
  const updatedTodos = todos.map((todoItem) => {
    if (id === todoItem.id) return updateData;
    return todoItem;
  });

  fs.writeFileSync(
    "./src/database/todo.json",
    JSON.stringify({
      data: updatedTodos,
    })
  );
  return updateData;
}

module.exports = {
  getAll,
  add,
  del,
  update,
};
