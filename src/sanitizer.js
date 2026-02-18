// 機密情報を除く関数
const sanitizer = (data) => {
  const { salt, password_hash, ...rest } = data;
  return rest;
};

module.exports = sanitizer;
