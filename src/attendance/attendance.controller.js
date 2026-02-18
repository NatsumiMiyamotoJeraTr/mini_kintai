function createAttendanceController(service) {
  // 出勤
  const clockIn = async (req, res) => {
    const userId = req.body.user_id;
    const result = await service.clockIn(userId);
    if (result.ok) {
      res.status(201).json({ data: result.data });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  };

  // 退勤
  const clockOut = async (req, res) => {
    const userId = req.body.user_id;
    const result = await service.clockOut(userId);
    if (result.ok) {
      res.status(201).json({ data: result.data });
    } else {
      res.status(result.status).json({ error: result.message });
    }
  };

  return { clockIn, clockOut, list, find, update };
}

module.exports = { createAttendanceController };
