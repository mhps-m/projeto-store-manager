const errorMap = {
  NotFound: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = (err, _req, res, _next) => {
  res.status(mapError(err.code)).json({ message: err.message });
};
