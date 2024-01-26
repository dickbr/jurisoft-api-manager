const errorHandler = (err, req, res, next) => {

  const message = err.message;
  const statusCode = err.code ?? 500;

  if (statusCode === 500) {
    console.log(err)
  }


  return res.status(statusCode).json({ message });
}

module.exports = errorHandler;