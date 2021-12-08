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
function del({ ids }) {
  let returnData = [];
  ids.map((id) => {
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
    returnData = [...returnData, todo];
  });
  return returnData;
}
/**
 *
 * @returns {[{text: string,  id: number},{text: string,  id: number},{text: string,  id: number} ]}
 */

function update({ data, ids }) {
  let returnData = [];
  let updatedTodos = todos;
  ids.map((id) => {
    const todo = todos.find((todo) => {
      if (todo.id === id) return todo;
    });
    if (!todo) return false;
    const updateData = { ...todo, ...data };
    console.log(updateData);
    updatedTodos = updatedTodos.map((todoItem) => {
      if (id === todoItem.id) return updateData;
      return todoItem;
    });
    returnData = [...returnData, updateData];
  });

  fs.writeFileSync(
    "./src/database/todo.json",
    JSON.stringify({
      data: updatedTodos,
    })
  );
  return returnData;
}

module.exports = {
  getAll,
  add,
  del,
  update,
};
