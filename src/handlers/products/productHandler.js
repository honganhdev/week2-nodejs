const {
  getProducts: get,
  add: addProduct,
  update: updateProduct,
  del: delProduct,
  get: getProduct,
} = require("../../database/productRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */

async function getProducts(ctx) {
  try {
    const limit = ctx.query.limit;
    const sort = ctx.query.sort;
    const product = get({ sort, limit });
    ctx.body = {
      data: product,
    };
  } catch (error) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
  return;
}

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */

async function saveProduct(ctx) {
  try {
    const postData = ctx.request.body;
    addProduct(postData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
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

async function updateProductById(ctx) {
  try {
    const { id } = ctx.params;
    const postData = ctx.request.body;
    const update = updateProduct({ postData, id });
    if (update === false) {
      return (ctx.body = {
        success: false,
      });
    } else {
      ctx.status = 200;
      return (ctx.body = {
        success: true,
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
async function deleteProduct(ctx) {
  try {
    const { id } = ctx.params;
    const del = delProduct(id);
    if (del === false) {
      return (ctx.body = {
        success: false,
      });
    } else {
      ctx.status = 200;
      return (ctx.body = {
        success: true,
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

async function getProductById(ctx) {
  try {
    const fields = ctx.query.fields;
    const { id } = ctx.params;
    const product = getProduct({ fields, id });
    if (product === false) {
      return (ctx.body = {
        success: false,
      });
    } else {
      ctx.status = 201;
      return (ctx.body = {
        data: product,
      });
    }
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

module.exports = {
  getProducts,
  saveProduct,
  updateProductById,
  deleteProduct,
  getProductById,
};
