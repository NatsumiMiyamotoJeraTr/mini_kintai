function createUserService(repository) {
  const list = async (limit) => {
    return await repository.list(limit);
  };

  const find = async (id) => {
    const result = await repository.findById(id);
    if (!result) return { ok: false, status: 404, message: "id not found" };

    return { ok: true, data: result };
  };

  return { list, find };
}

module.exports = { createUserService };
