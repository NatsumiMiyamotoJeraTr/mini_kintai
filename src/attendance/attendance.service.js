function createAttendanceService(repository) {
  // (helper)日本時間で本日の日付を取得 (YYYY-MM-DD)
  const getTodayDateStr = () => {
    const todayStr = new Date().toLocaleString('ja-JP', {
      timeZone: 'Asia/Tokyo',
    });
    return todayStr.split(' ')[0].replaceAll('/', '-');
  };

  // (helper)ユーザーの本日の勤務記録を取得
  const getTodayAttendance = async (userId) => {
    const today = getTodayDateStr();
    const record = await repository.findByUserAndDate(userId, today);
    return record;
  };

  // 出勤
  const clockIn = async (userId) => {
    // 本日の記録が既にあるか確認
    const existing = await getTodayAttendance(userId);
    if (existing) {
      return {
        ok: false,
        status: 409,
        message: '本日は既に出勤済みです。',
      };
    }

    const today = getTodayDateStr();
    const clockInTime = new Date();

    const payload = {
      user_id: userId,
      work_date: today,
      clock_in: clockInTime,
      break_minutes: 0,
    };

    try {
      const created = await repository.create(payload);
      return { ok: true, data: created };
    } catch (error) {
      return {
        ok: false,
        status: 500,
        message: error.message,
      };
    }
  };

  // 退勤
  const clockOut = async (userId) => {
    // 本日の出勤記録があるか確認
    const existing = await getTodayAttendance(userId);
    if (!existing) {
      return {
        ok: false,
        status: 400,
        message: '出勤記録がありません。出勤ボタンを押下して出勤してください。',
      };
    }

    if (existing.clock_out) {
      return {
        ok: false,
        status: 409,
        message: '本日は退勤済みです。',
      };
    }

    const clockOutTime = new Date();
    const updated = await repository.update(existing.id, {
      clock_out: clockOutTime,
    });

    return { ok: true, data: updated };
  };

  // 一覧
  const listByUser = async (userId, limit = 50) => {
    const records = await repository.findByUserId(userId, limit);
    return records;
  };

  // id検索
  const findById = async (id) => {
    const record = await repository.findById(id);
    if (!record) {
      return { ok: false, status: 404, message: '記録が見つかりませんでした' };
    }
    return { ok: true, data: record };
  };

  // update
  const update = async (recordId, userId, payload) => {
    const record = await repository.findById(recordId);
    if (!record) {
      return { ok: false, status: 404, message: '記録が見つかりませんでした' };
    }

    // 更新可能な項目: break_minutes, clock_in, clock_out
    const allowedFields = ['break_minutes', 'clock_in', 'clock_out'];
    const dataToUpdate = {};

    // {break_minutes: 60, clock_out: 20260218090015}みたいなのを作る
    for (const field of allowedFields) {
      if (field in payload) {
        dataToUpdate[field] = payload[field];
      }
    }

    const updated = await repository.update(recordId, dataToUpdate);
    return { ok: true, data: updated };
  };

  return {
    clockIn,
    clockOut,
    listByUser,
    findById,
    update,
  };
}

module.exports = { createAttendanceService };
