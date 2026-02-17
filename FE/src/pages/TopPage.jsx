import { useState } from "react";
import { Header } from "../components/Header";

export const TopPage = () => {
  const user = { id: 1, name: "User01" }; // 後ほどログイン認証で取得予定

  const [message, setMessage] = useState("");
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isClockedOut, setIsClockedOut] = useState(false);

  const handleClockIn = async () => {
    const response = await fetch("/attendances/clock-in", {
      method: "POST",
      body: JSON.stringify({ user_id: user.id }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessage("出勤しました");
      setIsClockedIn(true);
      console.log("log: 出勤成功", data);
    } else {
      const data = await response.json();
      setMessage("出勤に失敗しました");
      console.log("log: 出勤エラー", data);
    }
  };

  const handleClockOut = async () => {
    const response = await fetch("/attendances/clock-in", {
      method: "POST",
      body: JSON.stringify({ user_id: user.id }),
    });

    if (response.ok) {
      setMessage("退勤しました");
      setIsClockedOut(true);
    } else {
      const data = await response.json();
      setMessage("退勤に失敗しました");
      console.log("log: 退勤エラー", data);
    }
  };

  return (
    <>
      <Header innerText="Mini-Kintai" />
      <div>
        <p>{user.name} さん お疲れさまです。</p>
        <p>{message}</p>
        <button onClick={handleClockIn} disabled={isClockedIn}>
          出勤
        </button>
        <button onClick={handleClockOut} disabled={isClockedOut}>
          退勤
        </button>
      </div>
    </>
  );
};
