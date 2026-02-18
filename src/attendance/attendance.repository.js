function createAttendanceRepository(knex, table = 'attendances') {
  const findById = async (id) => {
    const result = await knex(table).select('*').where({ id }).first();
    return result;
  };

  const findByUserAndDate = async (userId, workDate) => {
    const result = await knex(table)
      .select('*')
      .where({ user_id: userId, work_date: workDate })
      .first();
    return result;
  };

  const findByUserId = async (userId, limit = 31) => {
    let query = knex(table).select('*').where({ user_id: userId });

    const results = await query.orderBy('work_date', 'asc').limit(limit);
    return results;
  };

  const create = async (payload) => {
    const result = await knex(table).insert(payload).returning('*');
    return result;
  };

  const update = async (id, payload) => {
    const result = await knex(table)
      .update(payload)
      .where({ id })
      .returning('*');
    return result;
  };

  return {
    findById,
    findByUserAndDate,
    findByUserId,
    create,
    update,
  };
}

module.exports = { createAttendanceRepository };
