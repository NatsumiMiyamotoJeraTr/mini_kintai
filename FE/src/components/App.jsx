import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { TopPage } from '../pages/TopPage';
import { SummaryPage } from '../pages/SummaryPage';
import { EditPage } from '../pages/EditPage';
import { PrivateRoute } from './PrivateRoute';
import { AuthProvider } from '../contexts/AuthUserContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/top"
            element={
              <PrivateRoute>
                <TopPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <PrivateRoute>
                <SummaryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/attendances/:id/edit"
            element={
              <PrivateRoute>
                <EditPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TopPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
