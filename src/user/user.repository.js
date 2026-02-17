function createCustomerRepository(knex, table = "customer") {
  /**
   * @param {number} limit - ユーザデータの最大数（制限）
   * @return {Promise<Array>} - すべてのユーザデータ
   */
  const list = async (limit = 100) => {
    const customer = await knex(table).select("*").limit(limit);
    return customer;
  };

  /**
   * @param {number} id - ユーザの ID
   * @return {Promise<Object|undefined>} id に合致するユーザデータ、不合致の場合は undefined
   */
  const findById = async (id) => {
    const customer = await knex(table).select("*").where({ id: id });
    return customer[0];
  };

  return { list, findById };
}

module.exports = { createCustomerRepository };
