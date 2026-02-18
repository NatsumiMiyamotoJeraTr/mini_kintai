const authMiddleware = (req, res, next) => {
  // 将来JWTトークンからuser_idを取得したい

  req.user = { id: req.query.user_id || 1 };
  next();
};

module.exports = { authMiddleware };
