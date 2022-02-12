// Parallel processing
module.exports = (errors) =>
  errors.map((error) => ({
    field: error.param,
    message: error.msg,
  }))[0];