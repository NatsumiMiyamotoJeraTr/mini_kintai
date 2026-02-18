const sanitizer = require('../sanitizer');

function createUserController(service) {
  const list = async (req, res) => {
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const result = await service.list(limit);
    res.status(200).json({ data: result.map((ele) => sanitizer(ele)) });
  };

  const find = async (req, res) => {
    const result = await service.find(Number(req.params.id));

    if (result.ok) {
      res.status(200).json({ data: sanitizer(result.data) });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  };

  return { list, find };
}

module.exports = { createUserController };
