const {
  getAll: getAllTodo,
  add: addTodo,
  del: delTodo,
  update: updateTodo,
} = require("../../database/todoRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */

async function getTodos(ctx) {
  try {
    const todos = getAllTodo();
    ctx.body = {
      data: todos,
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function saveTodo(ctx) {
  try {
    const postData = ctx.request.body;
    const data = addTodo(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data: data,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */

async function deleteTodo(ctx) {
  try {
    const nonValid = ctx.params.id;
    const validateId = nonValid
      .split(",")
      .map((item) => (item = parseInt(item)));
    const del = delTodo({ ids: validateId });
    if (del === false) {
      return (ctx.body = {
        success: false,
      });
    } else {
      ctx.status = 200;
      return (ctx.body = {
        success: true,
        data: del,
      });
    }
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */

async function updateTodos(ctx) {
  try {
    const nonValid = ctx.params.id;
    const postData = ctx.request.body;
    const validateId = nonValid
      .split(",")
      .map((item) => (item = parseInt(item)));

    const dataUpdated = updateTodo({ data: postData, ids: validateId });
    console.log(dataUpdated);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: dataUpdated,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

module.exports = { getTodos, saveTodo, deleteTodo, updateTodos };
