module.exports = (req, res, next) => {
  const product = req.body;

  if (!product) return res.status(400).json({ message: 'fields not passed' });

  return next();
};