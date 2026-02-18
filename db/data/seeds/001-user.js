const { pwList, makeSalt, makeHashedPW } = require('../../makepw');

const hashedPWList = pwList.map((ele) => {
  const salt = makeSalt();
  return { salt, password_hash: makeHashedPW(ele) };
});
console.log(hashedPWList);

exports.seed = async function (knex) {
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      name: 'test_user01',
      email: 'test_user01@example.com',
      salt: hashedPWList[0].salt,
      password_hash: hashedPWList[0].password_hash,
    },
    {
      id: 2,
      name: 'test_user02',
      email: 'test_user02@example.com',
      salt: hashedPWList[1].salt,
      password_hash: hashedPWList[1].password_hash,
    },
    {
      id: 3,
      name: 'test_user03',
      email: 'test_user03@example.com',
      salt: hashedPWList[2].salt,
      password_hash: hashedPWList[2].password_hash,
    },
  ]);
};
