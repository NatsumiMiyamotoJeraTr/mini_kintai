import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { TopPage } from "../pages/TopPage";
import { SummaryPage } from "../pages/SummaryPage";
import { EditPage } from "../pages/EditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/top" element={<TopPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/attendances/:id/edit" element={<EditPage />} />
        <Route path="*" element={<Navigate to="/top" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
