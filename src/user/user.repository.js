function createUserRepository(knex, table = 'users') {
  const list = async (limit = 20) => {
    const user = await knex(table).select('*').limit(limit);
    return user;
  };

  const findById = async (id) => {
    const user = await knex(table).select('*').where({ id: id });
    return user[0];
  };

  return { list, findById };
}

module.exports = { createUserRepository };
