const userMiddleware = (req, res, next) => {
  if (req.user.role !== 'user' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden access. Unauthorized role.' });
  }

  next();
};

module.exports = userMiddleware;