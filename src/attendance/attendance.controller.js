function createAttendanceController(service) {
  // 出勤
  const clockIn = async (req, res) => {
    const userId = req.user.id;
    const result = await service.clockIn(userId);
    if (result.ok) {
      res.status(201).json({ data: result.data });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  };

  // 退勤
  const clockOut = async (req, res) => {
    const userId = req.user.id;
    const result = await service.clockOut(userId);
    if (result.ok) {
      res.status(201).json({ data: result.data });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  };

  // 一覧取得
  const list = async (req, res) => {
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const result = await service.listByUser(req.user.id, limit);
    res.status(200).json({ data: result });
  };

  // 一件idで取得
  const find = async (req, res) => {
    const result = await service.findById(Number(req.params.id));

    if (result.ok) {
      res.status(200).json({ data: result });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  };

  // 更新
  const update = async (req, res) => {
    const result = await service.update(
      Number(req.params.id),
      req.user.id,
      req.body
    );
    if (result.ok) {
      res.status(200).json({ data: result.data });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  };

  return { clockIn, clockOut, list, find, update };
}

module.exports = { createAttendanceController };
